'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');

const root = path.resolve(__dirname, '../..');
const feature = path.join(root, 'specs/001-expliquer-resultats-simulateur');
const referencePath = path.join(__dirname, 'fixtures/simulateur-selection-reference.json');
const sourcePaths = ['js/plants-data.js', 'js/simulateur.js'];
const sources = Object.fromEntries(sourcePaths.map(file => [file, fs.readFileSync(path.join(root, file), 'utf8')]));
const page = fs.readFileSync(path.join(root, 'simulateur/index.html'), 'utf8');
const choices = {
  exposition: ['', 'soleil', 'mi-ombre', 'ombre'],
  objectif: ['', 'aromatiques', 'legumes', 'fleurs', 'facile'],
  vent: ['', 'abrite', 'modere', 'fort'],
  place: ['', 'petit', 'moyen', 'grand']
};

// A small structural DOM for these scripts. It does not measure layout, CSS,
// browser announcements, or native keyboard behavior: those need browser checks.
const voidTags = new Set(['AREA', 'BASE', 'BR', 'COL', 'EMBED', 'HR', 'IMG', 'INPUT', 'LINK', 'META', 'PARAM', 'SOURCE', 'TRACK', 'WBR']);
function decode(text) {
  const named = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00a0', eacute: 'é', agrave: 'à', ecirc: 'ê', ugrave: 'ù' };
  return text.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (whole, key) => {
    if (key[0] === '#') return String.fromCodePoint(parseInt(key.slice(key[1].toLowerCase() === 'x' ? 2 : 1), key[1].toLowerCase() === 'x' ? 16 : 10));
    return named[key] ?? whole;
  });
}
function escape(text) { return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
class TextNode {
  constructor(text, document) { this.nodeType = 3; this.textContent = text; this.ownerDocument = document; this.parentNode = null; }
}
class Element {
  constructor(tag, document) {
    this.nodeType = 1; this.tagName = tag.toUpperCase(); this.ownerDocument = document;
    this.parentNode = null; this.childNodes = []; this.attributes = new Map();
    this.style = {}; this.listeners = new Map(); this.scrollCalls = [];
  }
  get children() { return this.childNodes.filter(node => node.nodeType === 1); }
  get id() { return this.getAttribute('id') || ''; }
  set id(value) { this.setAttribute('id', value); }
  get className() { return this.getAttribute('class') || ''; }
  set className(value) { this.setAttribute('class', value); }
  get classList() {
    const element = this;
    const update = (name, present) => {
      const names = new Set(element.className.split(/\s+/).filter(Boolean));
      if (present) names.add(name); else names.delete(name);
      element.className = [...names].join(' ');
      return present;
    };
    return {
      contains: name => element.className.split(/\s+/).includes(name),
      add: (...names) => names.forEach(name => update(name, true)),
      remove: (...names) => names.forEach(name => update(name, false)),
      toggle: (name, force) => update(name, force === undefined ? !element.classList.contains(name) : Boolean(force))
    };
  }
  get dataset() {
    return Object.fromEntries([...this.attributes].filter(([name]) => name.startsWith('data-')).map(([name, value]) => [name.slice(5).replace(/-([a-z])/g, (_, c) => c.toUpperCase()), value]));
  }
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  hasAttribute(name) { return this.attributes.has(name); }
  removeAttribute(name) { this.attributes.delete(name); }
  get hidden() { return this.hasAttribute('hidden'); }
  set hidden(value) { if (value) this.setAttribute('hidden', ''); else this.removeAttribute('hidden'); }
  get open() { return this.hasAttribute('open'); }
  set open(value) { if (value) this.setAttribute('open', ''); else this.removeAttribute('open'); }
  get min() { return this.getAttribute('min') || ''; }
  get max() { return this.getAttribute('max') || ''; }
  get value() {
    if (this.tagName === 'SELECT') {
      if (this._value !== undefined) return this._value;
      const options = this.querySelectorAll('option');
      return (options.find(option => option.hasAttribute('selected')) || options[0])?.value || '';
    }
    return this._value ?? this.getAttribute('value') ?? (this.tagName === 'OPTION' ? this.textContent : '');
  }
  set value(value) {
    value = String(value);
    this._value = this.tagName === 'SELECT' && !this.querySelectorAll('option').some(option => option.value === value) ? '' : value;
    if (this.tagName === 'OPTION') this.setAttribute('value', value);
  }
  get textContent() { return this.childNodes.map(node => node.textContent).join(''); }
  set textContent(value) { this.replaceChildren(new TextNode(String(value), this.ownerDocument)); }
  get innerHTML() {
    return this.childNodes.map(node => node.nodeType === 3 ? escape(node.textContent) : node.outerHTML).join('');
  }
  set innerHTML(value) { this.replaceChildren(); parseInto(this, String(value)); }
  get outerHTML() {
    const attributes = [...this.attributes].map(([name, value]) => ' ' + name + '="' + escape(value) + '"').join('');
    return '<' + this.tagName.toLowerCase() + attributes + '>' + (voidTags.has(this.tagName) ? '' : this.innerHTML + '</' + this.tagName.toLowerCase() + '>');
  }
  appendChild(node) {
    if (node.parentNode) node.parentNode.removeChild(node);
    node.parentNode = this; this.childNodes.push(node); return node;
  }
  append(...nodes) { nodes.forEach(node => this.appendChild(typeof node === 'string' ? new TextNode(node, this.ownerDocument) : node)); }
  removeChild(node) { this.childNodes.splice(this.childNodes.indexOf(node), 1); node.parentNode = null; return node; }
  replaceChildren(...nodes) { this.childNodes.forEach(node => { node.parentNode = null; }); this.childNodes = []; this.append(...nodes); }
  remove() { this.parentNode?.removeChild(this); }
  matches(selector) {
    let rest = selector.trim();
    const tag = rest.match(/^[a-z][\w-]*/i);
    if (tag) { if (this.tagName !== tag[0].toUpperCase()) return false; rest = rest.slice(tag[0].length); }
    while (rest) {
      let match;
      if ((match = rest.match(/^#([\w-]+)/))) { if (this.id !== match[1]) return false; }
      else if ((match = rest.match(/^\.([\w-]+)/))) { if (!this.classList.contains(match[1])) return false; }
      else if ((match = rest.match(/^\[([\w-]+)(?:=["']?([^\]"']*)["']?)?\]/))) {
        if (!this.hasAttribute(match[1]) || (match[2] !== undefined && this.getAttribute(match[1]) !== match[2])) return false;
      } else throw new Error('Unsupported test DOM selector: ' + selector);
      rest = rest.slice(match[0].length);
    }
    return true;
  }
  querySelectorAll(selector) {
    const selectors = selector.split(',').map(value => value.trim());
    const matches = [];
    const visit = element => element.children.forEach(child => {
      if (selectors.some(value => child.matches(value))) matches.push(child);
      visit(child);
    });
    visit(this); return matches;
  }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
  closest(selector) { for (let element = this; element; element = element.parentNode) if (element.nodeType === 1 && element.matches(selector)) return element; return null; }
  addEventListener(type, listener) { if (!this.listeners.has(type)) this.listeners.set(type, []); this.listeners.get(type).push(listener); }
  dispatch(type, options = {}) {
    const event = { type, target: this, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; }, ...options };
    for (let element = this; element; element = element.parentNode) {
      event.currentTarget = element;
      for (const listener of element.listeners?.get(type) || []) listener(event);
    }
    if (type === 'click' && this.tagName === 'SUMMARY' && !event.defaultPrevented) this.parentNode.open = !this.parentNode.open;
    return event;
  }
  click() { return this.dispatch('click'); }
  focus() { this.ownerDocument.activeElement = this; }
  scrollIntoView(options) { this.scrollCalls.push(options); }
  checkValidity() {
    const value = Number(this.value);
    return this.value !== '' && Number.isFinite(value) && Number.isInteger(value)
      && (!this.min || value >= Number(this.min)) && (!this.max || value <= Number(this.max));
  }
}
function parseInto(parent, html) {
  const stack = [parent];
  for (const token of html.match(/<!--[\s\S]*?-->|<![^>]*>|<\/?[^>]+>|[^<]+/g) || []) {
    if (token.startsWith('<!')) continue;
    if (token.startsWith('</')) {
      const name = token.slice(2, -1).trim().toUpperCase();
      const position = stack.findLastIndex(node => node.tagName === name);
      if (position > 0) stack.length = position;
    } else if (token.startsWith('<')) {
      const name = token.match(/^<([\w-]+)/)?.[1];
      if (!name) continue;
      const element = new Element(name, parent.ownerDocument);
      const attributes = token.slice(name.length + 1, -1).replace(/\/$/, '');
      for (const match of attributes.matchAll(/([^\s=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s]+)))?/g)) element.setAttribute(match[1], decode(match[2] ?? match[3] ?? match[4] ?? ''));
      stack.at(-1).appendChild(element);
      if (!voidTags.has(element.tagName) && !token.endsWith('/>')) stack.push(element);
    } else stack.at(-1).appendChild(new TextNode(decode(token), parent.ownerDocument));
  }
}
function fixture({ month = 11, query = '', saved = null, storageUnavailable = false, storageErrors = [] } = {}) {
  const document = { activeElement: null };
  const tree = new Element('document', document);
  document.createElement = tag => new Element(tag, document);
  document.querySelectorAll = selector => tree.querySelectorAll(selector);
  document.querySelector = selector => tree.querySelector(selector);
  document.getElementById = id => tree.querySelector('#' + id);
  const body = page.match(/<body\b[^>]*>[\s\S]*?<\/body>/i)?.[0];
  assert.ok(body, 'Actual simulator page contains its body');
  parseInto(tree, body.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ''));
  document.body = document.querySelector('body'); document.activeElement = document.body;
  const location = new URL('https://ecobalcon.com/simulateur/' + query);
  const storage = new Map(saved === null ? [] : [['ecobalcon-simulateur', typeof saved === 'string' ? saved : JSON.stringify(saved)]]);
  const localStorage = Object.fromEntries(['getItem', 'setItem', 'removeItem'].map(method => [method, (key, value) => {
    if (storageUnavailable || storageErrors.includes(method)) throw new Error('Storage disabled in this test: ' + method);
    if (method === 'getItem') return storage.get(key) ?? null;
    if (method === 'setItem') storage.set(key, String(value)); else storage.delete(key);
  }]));
  class FixedDate extends Date { constructor(...args) { super(...(args.length ? args : [2026, month - 1, 15, 12, 0, 0])); } static now() { return new FixedDate().getTime(); } }
  const history = { replaceState(_state, _title, url) { location.href = new URL(url, location.href).href; } };
  const window = { document, location, history, localStorage };
  const context = vm.createContext({ window, document, localStorage, history, URL, URLSearchParams, Date: FixedDate, console });
  for (const file of sourcePaths) vm.runInContext(sources[file], context, { filename: file });
  return {
    document, window, storage, context,
    node: id => document.getElementById(id),
    evaluate: code => vm.runInContext(code, context),
    setFilters(filters = {}) { for (const field of Object.keys(choices)) document.getElementById(field).value = filters[field] || ''; },
    run(filters = {}) { this.setFilters(filters); this.evaluate('runSimulation()'); return this.names(); },
    submit(filters = {}) { this.setFilters(filters); this.node('plantForm').dispatch('submit'); return this.names(); },
    cards() { return this.node('results').querySelectorAll('.simulator-result'); },
    names() { return this.cards().map(card => card.querySelector('h3').textContent); }
  };
}
function* combinations() {
  for (const exposition of choices.exposition) for (const objectif of choices.objectif)
    for (const vent of choices.vent) for (const place of choices.place) yield { exposition, objectif, vent, place };
}
function essentialText(element) {
  if (element.nodeType === 3) return element.textContent;
  if (element.hidden || element.style.display === 'none' || element.tagName === 'DETAILS') return '';
  return element.childNodes.map(essentialText).join(' ').replace(/\s+/g, ' ').trim();
}
function git(...args) { return execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim(); }
function researchIdentity() {
  const text = fs.readFileSync(path.join(feature, 'research.md'), 'utf8');
  const tick = String.fromCharCode(96);
  const commit = text.match(new RegExp('Commit : ' + tick + '([a-f0-9]{40})' + tick))?.[1];
  const blobs = Object.fromEntries(sourcePaths.map(file => [file, text.match(new RegExp('Blob Git de ' + tick + file.replace(/\./g, '\\.') + tick + ' : ' + tick + '([a-f0-9]{40})' + tick))?.[1]]));
  assert.ok(commit && Object.values(blobs).every(Boolean), 'Research declares commit and source blobs');
  return { commit, blobs };
}
function captureReference() {
  const expected = researchIdentity();
  assert.equal(git('rev-parse', 'HEAD'), expected.commit, 'Refuse capture from an unreviewed commit');
  for (const [file, blob] of Object.entries(expected.blobs)) assert.equal(git('hash-object', '--path=' + file, path.join(root, file)), blob, 'Refuse capture after source change: ' + file);
  assert.equal(fs.existsSync(referencePath), false, 'Reference already exists; normal tests must never regenerate it');
  const cases = [];
  for (let month = 1; month <= 12; month++) {
    const f = fixture({ month });
    for (const filters of combinations()) cases.push({ month, filters, names: f.run(filters) });
  }
  const reference = {
    schema: 1, commit: expected.commit, blobs: expected.blobs,
    sha256: Object.fromEntries(sourcePaths.map(file => [file, crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex')])),
    runtime: { node: process.version, icu: process.versions.icu, collation: new Intl.Collator('fr').resolvedOptions(), localTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone },
    fixedDate: '2026, month - 1, 15, 12:00:00 in local time; currentMonth captured during load',
    choices, cases
  };
  assert.equal(cases.length, 3840);
  fs.mkdirSync(path.dirname(referencePath), { recursive: true });
  fs.writeFileSync(referencePath, JSON.stringify(reference, null, 2) + '\n');
  console.log('Reference captured from unchanged production code: ' + cases.length + ' tuples.');
}

// Deliberate one-time operation, never part of node --test. Refuses an existing
// reference and any source that differs from the reviewed research blobs.
if (process.argv.includes('--write-reference')) {
  captureReference();
} else {
  const reference = JSON.parse(fs.readFileSync(referencePath, 'utf8'));
  test('reference provenance, runtime and exhaustive input space remain explicit', () => {
    assert.equal(reference.schema, 1);
    assert.equal(reference.commit, researchIdentity().commit);
    assert.deepEqual(reference.blobs, researchIdentity().blobs);
    assert.equal(reference.runtime.node, process.version, 'Use the reviewed runtime instead of silently regenerating');
    assert.equal(reference.runtime.icu, process.versions.icu);
    assert.deepEqual(reference.runtime.collation, new Intl.Collator('fr').resolvedOptions());
    assert.deepEqual(reference.choices, choices);
    assert.equal(reference.cases.length, 3840);
    assert.equal(new Set(reference.cases.map(row => JSON.stringify([row.month, row.filters]))).size, 3840);
    const plantsFile = 'js/plants-data.js';
    assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root, plantsFile))).digest('hex'), reference.sha256[plantsFile], 'Published plant data must remain byte-identical');
  });
  test('all 3,840 response/month combinations keep ordered production selections', () => {
    let compared = 0;
    for (let month = 1; month <= 12; month++) {
      const f = fixture({ month });
      const rows = reference.cases.filter(row => row.month === month);
      assert.equal(rows.length, 320);
      for (const row of rows) {
        assert.deepEqual(f.run(row.filters), row.names, 'Selection mismatch: ' + JSON.stringify({ month, ...row.filters }));
        assert.ok(f.cards().length <= 8);
        compared++;
      }
    }
    assert.equal(compared, 3840);
  });
  test('production rendering keeps three direct cards and an exact disclosure only above three', () => {
    const f = fixture();
    const cases = [
      { filters: { exposition: 'ombre', objectif: 'legumes' }, count: 0 },
      { filters: { exposition: 'ombre', objectif: 'aromatiques' }, count: 2 },
      { filters: { exposition: 'ombre', objectif: 'fleurs' }, count: 3 },
      { filters: { exposition: 'soleil', objectif: 'legumes', vent: 'fort', place: 'petit' }, count: 8 }
    ];
    for (const { filters, count } of cases) {
      f.run(filters);
      const results = f.node('results');
      assert.equal(f.cards().length, count);
      assert.equal(results.children.filter(card => card.classList.contains('simulator-result')).length, Math.min(count, 3));
      const more = results.querySelector('.simulator-more-results');
      assert.equal(Boolean(more), count > 3);
      if (more) {
        assert.equal(more.open, false);
        assert.equal(more.querySelectorAll('.simulator-result').length, count - 3);
        assert.match(more.querySelector('summary').textContent, new RegExp('\\b' + (count - 3) + '\\b'));
      }
    }
  });
  test('actual submission and pot/reset listeners run in the structural fixture', () => {
    const f = fixture();
    f.submit({ exposition: 'soleil', objectif: 'legumes' });
    assert.equal(f.document.activeElement, f.node('resultsTitle'));
    const button = f.cards()[0].querySelector('[data-pot-plant]');
    const name = button.dataset.potPlant;
    button.click();
    assert.equal(f.node('potPlant').value, name);
    assert.equal(f.node('plantCount').value, '1');
    assert.equal(f.document.activeElement, f.node('potPlant'));
    f.node('resetBtn').click();
    assert.equal(f.node('resultsPanel').hidden, true);
    assert.equal(f.cards().length, 0);
    assert.equal(f.document.activeElement, f.node('objectif'));
  });

  test('US1: a visible common explanation distinguishes selection, order and the bounded list', () => {
    const f = fixture();
    f.run({ exposition: 'soleil', objectif: 'legumes', vent: 'fort', place: 'petit' });
    const explanation = f.node('resultsExplanation');
    assert.ok(explanation, 'Common explanation exists in the actual simulator HTML');
    assert.equal(explanation.closest('#resultsPanel'), f.node('resultsPanel'));
    assert.equal(explanation.closest('details'), null, 'Essential explanation cannot require a disclosure');
    assert.equal(explanation.hidden, false);
    const text = essentialText(explanation).toLowerCase();
    for (const term of ['exposition', 'objectif', 'vent', 'place', 'mois']) assert.ok(text.includes(term), 'Explains role of ' + term);
    assert.match(text, /sélection|sélectionn|reten|choisi/);
    assert.match(text, /ordre|class|priorit/);
    assert.match(text, /huit|\b8\b/);
    assert.equal(f.node('summary').getAttribute('role'), 'status');
    assert.equal(f.node('results').getAttribute('aria-live'), null, 'Do not announce all cards as a live region');
  });
  test('US1: every direct and additional card relates its suggestion to the known exposure and goal', () => {
    const f = fixture();
    f.run({ exposition: 'soleil', objectif: 'legumes', vent: 'fort', place: 'petit' });
    const summary = f.node('summary').textContent.toLowerCase();
    for (const term of ['soleil', 'légume', 'vent', 'petit']) assert.ok(summary.includes(term), 'Summary recalls ' + term);
    assert.equal(f.cards().length, 8);
    for (const card of f.cards()) {
      const text = essentialText(card).toLowerCase();
      const name = card.querySelector('h3').textContent;
      assert.match(text, /soleil/, name + ': exposure reason visible without opening advice');
      assert.match(text, /légume/, name + ': goal reason visible without opening advice');
      assert.equal(card.getAttribute('aria-live'), null);
      assert.ok(card.querySelector('details'), name + ': existing advice remains available');
      assert.ok(card.querySelector('[data-pot-plant]'), name + ': existing pot action remains available');
    }
  });
  test('US1: wind and space reserves remain visible even on cards inside the additional-results disclosure', () => {
    const f = fixture();
    f.run({ exposition: 'soleil', objectif: 'legumes', vent: 'fort', place: 'petit' });
    const byName = new Map(f.cards().map(card => [card.querySelector('h3').textContent, essentialText(card).toLowerCase()]));
    const spaceReserve = /(?:plus|davantage) de place|espace[^.]*insuffisant/;
    assert.match(byName.get('Blette'), spaceReserve);
    assert.match(byName.get('Épinard'), /abri|protéger[^.]*vent/);
    for (const name of ['Concombre', 'Courgette']) {
      assert.match(byName.get(name), spaceReserve);
      assert.match(byName.get(name), /abri|protéger[^.]*vent/);
    }
  });
  test('US1: open criteria never become a confirmed exposure, wind or space match', () => {
    const f = fixture();
    f.run({});
    for (const card of f.cards()) assert.doesNotMatch(essentialText(card), /\bOK\b|Tient le vent|Supporte un peu de vent|Adapté au petit balcon/i);
    f.evaluate('renderResults([window.EcoBalconPlants[0]], { exposition: "soleil", objectif: "aromatiques", vent: "", place: "" })');
    assert.equal(f.cards().length, 1, 'Presentation fixture covers a single card without changing the catalogue');
    assert.equal(f.node('results').querySelector('.simulator-more-results'), null);
    assert.match(essentialText(f.cards()[0]).toLowerCase(), /aromatique/, 'Single-card rendering has the same goal explanation');
    assert.equal(f.window.EcoBalconPlants.length, 30);
  });

  test('US2: current-period and out-of-period cards give distinct planting information', () => {
    const filters = { exposition: 'soleil', objectif: 'aromatiques', vent: '', place: '' };
    const current = fixture({ month: 5 });
    current.evaluate('renderResults([window.EcoBalconPlants[0]], ' + JSON.stringify(filters) + ')');
    const now = essentialText(current.cards()[0]).toLowerCase();
    assert.match(now, /mai/);
    assert.match(now, /semer|semis|planter|plantation/);
    const later = fixture({ month: 11 });
    later.evaluate('renderResults([window.EcoBalconPlants[0]], ' + JSON.stringify(filters) + ')');
    const future = essentialText(later.cards()[0]).toLowerCase();
    assert.match(future, /avril à juillet/);
    assert.match(future, /hors|pas[^.]*mois|autre[^.]*période|prépar|plus tard|attendre/, 'Explain why an out-of-period suggestion remains useful');
    const explanation = essentialText(later.node('resultsExplanation')).toLowerCase();
    assert.match(explanation, /semer[^.]*graines/);
    assert.match(explanation, /semis[^.]*plantation/);
    assert.match(explanation, /récolte/);
    assert.match(explanation, /repère|indicati/);
    assert.match(explanation, /pas[^.]*garanti|ne[^.]*garanti/, 'Planting period does not guarantee success');
  });
  test('US2: no known seasonal suggestion is explicit and distinct from no matching plant', () => {
    const f = fixture({ month: 11 });
    f.run({ exposition: 'soleil', objectif: 'legumes', vent: 'fort', place: 'petit' });
    assert.equal(f.cards().length, 8);
    const message = (f.node('summary').textContent + ' ' + f.node('note').textContent).toLowerCase();
    assert.match(message, /aucun(?:e)?[^.]*?(?:saison|semer|planter|plantation)/, 'Explicitly distinguish no seasonal option from no selection');
    assert.doesNotMatch(message, /aucune correspondance/);
    f.run({ exposition: 'ombre', objectif: 'legumes' });
    assert.equal(f.cards().length, 0);
    assert.doesNotMatch(f.node('note').textContent, /8 suggestions|huit suggestions/);
  });
  test('US2: February remains a mixed selection rather than an absolute seasonal-first list', () => {
    const f = fixture({ month: 2 });
    assert.deepEqual(f.run({ vent: 'fort', place: 'moyen' }), ['Blette', 'Ciboulette', 'Géranium', 'Lavande', 'Origan', 'Persil', 'Pois nain', 'Radis']);
    const peas = f.cards().find(card => card.querySelector('h3').textContent === 'Pois nain');
    assert.match(essentialText(peas).toLowerCase(), /février/);
    assert.match(essentialText(peas).toLowerCase(), /semer|semis|planter|plantation/);
    const chard = f.cards()[0];
    assert.match(essentialText(chard).toLowerCase(), /avril à août/);
    assert.match(essentialText(chard).toLowerCase(), /hors|pas[^.]*mois|autre[^.]*période|prépar|plus tard|attendre/);
    const common = essentialText(f.node('resultsExplanation')).toLowerCase();
    assert.doesNotMatch(common, /toutes[^.]*saison[^.]*en premier|toujours[^.]*saison[^.]*en premier/);
  });
  test('US2: missing and empty planting periods remain unknown in the visible card', () => {
    const f = fixture();
    for (const months of ['undefined', '[]']) {
      f.evaluate('renderResults([{...window.EcoBalconPlants[0], months: ' + months + '}], {exposition:"soleil",objectif:"aromatiques",vent:"abrite",place:"petit"})');
      const text = essentialText(f.cards()[0]).toLowerCase();
      assert.match(text, /période[^.]*à vérifier/);
      assert.doesNotMatch(text, /undefined|nan|toute l'année|à semer en novembre|à planter en novembre|hors période/);
    }
    assert.equal(f.window.EcoBalconPlants[0].months.join(','), '4,5,6,7', 'Presentation copies do not mutate source plant');
  });
  test('US2: pot volume means a finite positive minimum and unknown values never become invented liters', () => {
    const f = fixture();
    for (const value of ['undefined', 'null', '0', '-1', 'Number.POSITIVE_INFINITY', 'Number.NaN']) {
      f.evaluate('renderResults([{...window.EcoBalconPlants[0], potLiters: ' + value + '}], {exposition:"soleil",objectif:"aromatiques",vent:"abrite",place:"petit"})');
      const text = essentialText(f.cards()[0]).toLowerCase();
      assert.match(text, /volume[^.]*pot[^.]*à vérifier|pot[^.]*volume[^.]*à vérifier/);
      assert.doesNotMatch(text, /\?\s*l minimum|undefined|nan|infinity|-1\s*l|\b0\s*l minimum/);
    }
    f.evaluate('renderResults([window.EcoBalconPlants[0]], {exposition:"soleil",objectif:"aromatiques",vent:"abrite",place:"petit"})');
    assert.match(essentialText(f.cards()[0]).toLowerCase(), /pot[^.]*5\s*(?:l|litres)[^.]*minimum/);
  });
  test('US2: difficulty is identified as cultivation difficulty and missing values remain to verify', () => {
    const f = fixture();
    for (const value of ['undefined', 'null', '""', '"   "']) {
      f.evaluate('renderResults([{...window.EcoBalconPlants[0], difficulty: ' + value + '}], {exposition:"soleil",objectif:"aromatiques",vent:"abrite",place:"petit"})');
      const text = essentialText(f.cards()[0]).toLowerCase();
      assert.match(text, /difficulté[^.]*culture[^.]*à vérifier|culture[^.]*difficulté[^.]*à vérifier/);
      assert.doesNotMatch(text, /undefined|null|nan/);
    }
    f.evaluate('renderResults([window.EcoBalconPlants[0]], {exposition:"soleil",objectif:"aromatiques",vent:"abrite",place:"petit"})');
    assert.match(essentialText(f.cards()[0]).toLowerCase(), /difficulté[^.]*culture[^.]*facile|culture[^.]*facile/);
  });
  test('US2: advice, conditional guide, pot action, start plan and accessory destinations remain available', () => {
    const f = fixture();
    f.run({ exposition: 'soleil', objectif: 'aromatiques' });
    const basil = f.cards().find(card => card.querySelector('h3').textContent === 'Basilic');
    assert.ok(basil.querySelector('details').querySelector('summary').textContent.includes('Basilic'));
    assert.equal(basil.querySelector('.simulator-guide-link').getAttribute('href'), '../articles/guide-basilic-sur-son-balcon/');
    const action = basil.querySelector('[data-pot-plant]');
    assert.equal(action.dataset.potPlant, 'Basilic');
    action.click();
    assert.equal(f.node('potPlant').value, 'Basilic');
    assert.equal(f.node('plantCount').value, '1');
    assert.match(f.node('potResult').textContent, /5 L minimum/);
    assert.equal(f.document.activeElement, f.node('potPlant'));
    assert.equal(f.node('diagnosticDetails').hidden, false);
    assert.ok(f.node('diagnosticResult').querySelectorAll('a').length >= 2);
    assert.equal(f.node('gearDetails').hidden, false);
    assert.ok(f.node('gearRecommendations').querySelectorAll('a').every(link => link.getAttribute('href')));
    f.evaluate('renderResults([{...window.EcoBalconPlants[0], name:"Plante de test sans guide"}], {exposition:"soleil",objectif:"aromatiques",vent:"abrite",place:"petit"})');
    assert.equal(f.cards()[0].querySelector('.simulator-guide-link'), null, 'Missing guides never become fictitious links');
  });

  test('US3: unknown exposure, strong wind and no seasonal option coexist instead of overwriting one another', () => {
    const f = fixture({ month: 11 });
    f.run({ vent: 'fort' });
    const note = f.node('note').textContent.toLowerCase();
    assert.match(note, /soleil direct|observe[^.]*soleil|exposition[^.]*affiner/);
    assert.match(note, /vent/);
    assert.match(note, /aucun(?:e)?[^.]*?(?:saison|semer|planter|plantation)/);
    assert.equal(f.node('note').style.display === 'none', false);
    assert.ok(f.cards().length);
  });
  test('US3: a zero-response submission is exploration without a fabricated objective or balcony match', () => {
    const f = fixture();
    f.submit({});
    const expected = reference.cases.find(row => row.month === 11 && Object.values(row.filters).every(value => value === ''));
    assert.deepEqual(f.names(), expected.names);
    assert.match(f.node('summary').textContent.toLowerCase(), /explor|sans critère|aucun critère/);
    assert.doesNotMatch(f.node('summary').textContent.toLowerCase(), /plein soleil|balcon abrité|petit espace|des légumes|des aromatiques/);
    assert.match(f.node('note').textContent.toLowerCase(), /soleil direct|observe[^.]*soleil|exposition[^.]*affiner/);
    for (const card of f.cards()) assert.doesNotMatch(essentialText(card), /ton objectif \((?:des|un)|\bOK\b|Tient le vent/i);
  });
  test('US3: empty results replace previous cards and give a visible explicit catalogue action with search focus', () => {
    const f = fixture();
    assert.equal(f.node('emptyState').hidden, true);
    const button = f.node('resultsLibraryBtn');
    assert.ok(button, 'Catalogue button exists in the actual HTML');
    assert.equal(button.getAttribute('type'), 'button');
    assert.equal(button.closest('form'), null);
    assert.match(button.textContent.toLowerCase(), /catalogue|bibliothèque/);
    f.submit({ vent: 'fort' });
    f.submit({ exposition: 'ombre', objectif: 'legumes' });
    assert.equal(f.cards().length, 0);
    assert.equal(f.node('emptyState').hidden, false, 'Remove the hidden attribute, not only style.display');
    assert.notEqual(f.node('emptyState').style.display, 'none');
    assert.equal(f.node('diagnosticDetails').hidden, true);
    assert.equal(f.node('gearDetails').hidden, true);
    assert.equal(f.document.activeElement, f.node('resultsTitle'));
    const message = [f.node('summary'), f.node('note'), f.node('emptyState')].map(node => node.textContent).join(' ').toLowerCase();
    assert.match(message, /catalogue/);
    assert.match(message, /aucune correspondance|pas de correspondance|ne correspond|aucune plante/);
    assert.doesNotMatch(message, /exposition plus large|changer[^.]*exposition|balcon venteux/);
    button.click();
    assert.equal(f.node('tool-library').hidden, false);
    assert.equal(f.document.activeElement, f.node('plantSearch'));
  });
  test('US3: edits leave the last search untouched until submission and then remove obsolete reserves', () => {
    const f = fixture();
    f.submit({ vent: 'fort', place: 'petit', objectif: 'legumes' });
    const previous = { names: f.names(), summary: f.node('summary').textContent, note: f.node('note').textContent, cards: f.node('results').innerHTML };
    const next = { exposition: 'soleil', objectif: 'aromatiques', vent: 'abrite', place: 'grand' };
    f.setFilters(next);
    for (const key of Object.keys(next)) f.node(key).dispatch('change');
    assert.deepEqual(f.names(), previous.names);
    assert.equal(f.node('summary').textContent, previous.summary);
    assert.equal(f.node('note').textContent, previous.note);
    assert.equal(f.node('results').innerHTML, previous.cards);
    assert.match(f.node('formStatus').textContent.toLowerCase(), /modifi|actualiser|relanc/);
    f.node('plantForm').dispatch('submit');
    assert.match(f.node('summary').textContent.toLowerCase(), /soleil/);
    assert.match(f.node('summary').textContent.toLowerCase(), /aromatique/);
    assert.doesNotMatch(f.node('note').textContent.toLowerCase(), /soleil direct|observe[^.]*soleil|balcon venteux/);
    assert.equal(f.node('emptyState').hidden, true);
    assert.equal(f.node('formStatus').textContent, '');
    for (const card of f.cards()) assert.doesNotMatch(essentialText(card).toLowerCase(), /demande plus de place|à l'abri du vent/);
  });
  test('US3: reset clears every active explanation, empty-state action, persisted criteria and URL', () => {
    const f = fixture();
    f.submit({ vent: 'fort' });
    f.submit({ exposition: 'ombre', objectif: 'legumes' });
    f.node('resetBtn').click();
    assert.equal(f.node('resultsPanel').hidden, true);
    assert.equal(f.node('emptyState').hidden, true);
    assert.equal(f.cards().length, 0);
    assert.equal(f.node('summary').textContent, '');
    assert.equal(f.node('note').textContent, '');
    assert.equal(f.node('gearRecommendations').textContent, '');
    assert.equal(f.node('diagnosticDetails').hidden, true);
    assert.equal(f.node('gearDetails').hidden, true);
    assert.equal(f.node('extraCriteria').open, false);
    for (const field of Object.keys(choices)) assert.equal(f.node(field).value, '');
    assert.equal(f.storage.has('ecobalcon-simulateur'), false);
    assert.equal(f.window.location.search, '');
    assert.equal(f.document.activeElement, f.node('objectif'));
    f.submit({ exposition: 'ombre', objectif: 'aromatiques' });
    assert.deepEqual(f.names(), ['Menthe', 'Persil']);
    assert.equal(f.node('emptyState').hidden, true);
    assert.doesNotMatch(f.node('note').textContent.toLowerCase(), /vent fort|balcon venteux|soleil direct/);
  });
  test('US3: complete and partial nonempty URL choices take priority over saved answers without merging', () => {
    const saved = { exposition: 'soleil', objectif: 'legumes', vent: 'fort', place: 'petit' };
    const complete = fixture({ query: '?exposition=ombre&objectif=aromatiques&vent=abrite&place=grand', saved });
    assert.deepEqual(complete.names(), ['Menthe', 'Persil']);
    assert.equal(complete.node('exposition').value, 'ombre');
    assert.equal(complete.node('vent').value, 'abrite');
    assert.equal(complete.node('place').value, 'grand');
    assert.equal(complete.document.activeElement, complete.document.body, 'Restoration must not force focus');
    const partial = fixture({ query: '?vent=fort', saved });
    assert.equal(partial.node('exposition').value, '');
    assert.equal(partial.node('objectif').value, '');
    assert.equal(partial.node('place').value, '');
    assert.equal(partial.node('vent').value, 'fort');
    assert.doesNotMatch(partial.node('summary').textContent.toLowerCase(), /plein soleil|petit espace|des légumes/);
    assert.equal(partial.document.activeElement, partial.document.body);
  });
  test('US3: unknown restored choices are sanitized without a false compatibility or changed fallback', () => {
    const mixed = fixture({ query: '?exposition=inconnue&objectif=aromatiques&vent=fort&place=invalide' });
    assert.equal(mixed.node('exposition').value, '');
    assert.equal(mixed.node('place').value, '');
    assert.equal(mixed.node('objectif').value, 'aromatiques');
    assert.equal(mixed.node('vent').value, 'fort');
    assert.doesNotMatch(mixed.node('summary').textContent.toLowerCase(), /inconnue|invalide/);
    assert.match(mixed.node('note').textContent.toLowerCase(), /soleil direct|observe[^.]*soleil|exposition[^.]*affiner/);
    const invalid = fixture({ query: '?exposition=invalide', saved: { exposition: 'soleil', objectif: 'legumes' } });
    assert.equal(invalid.node('resultsPanel').hidden, true, 'A nonempty invalid URL does not fall back to a conflicting saved simulation');
    assert.equal(invalid.node('exposition').value, '');
    assert.equal(invalid.cards().length, 0);
    assert.equal(invalid.document.activeElement, invalid.document.body);
  });
  test('US3: saved answers are restored with the loading month and only four answers are persisted', () => {
    const saved = { exposition: '', objectif: '', vent: 'fort', place: 'moyen' };
    const f = fixture({ month: 2, saved });
    const expected = reference.cases.find(row => row.month === 2 && JSON.stringify(row.filters) === JSON.stringify(saved));
    assert.ok(expected);
    assert.deepEqual(f.names(), expected.names);
    assert.match(f.node('summary').textContent.toLowerCase(), /février/);
    assert.equal(f.document.activeElement, f.document.body);
    const persisted = JSON.parse(f.storage.get('ecobalcon-simulateur'));
    assert.deepEqual(persisted, saved);
    assert.deepEqual([...new URLSearchParams(f.window.location.search).keys()].sort(), ['place', 'vent']);
    assert.deepEqual(Object.keys(persisted).sort(), Object.keys(choices).sort());
    assert.equal(Object.hasOwn(persisted, 'month'), false);
    assert.equal(Object.hasOwn(persisted, 'currentMonth'), false);
  });
  test('US3: corrupt and nonusable local storage never blocks a fresh explicit search', () => {
    for (const saved of ['{broken', '"not an object"', { exposition: 'invalide', vent: 'invalide' }]) {
      const f = fixture({ saved });
      assert.equal(f.node('resultsPanel').hidden, true);
      assert.equal(f.cards().length, 0);
      assert.equal(f.document.activeElement, f.document.body);
      f.submit({ exposition: 'ombre', objectif: 'aromatiques' });
      assert.deepEqual(f.names(), ['Menthe', 'Persil']);
    }
  });
  test('US3: getItem, setItem and removeItem failures preserve their existing URL and UI fallbacks', () => {
    const unreadable = fixture({ saved: { exposition: 'soleil' }, storageErrors: ['getItem'] });
    assert.equal(unreadable.node('resultsPanel').hidden, true);
    unreadable.submit({ exposition: 'ombre', objectif: 'aromatiques' });
    assert.deepEqual(unreadable.names(), ['Menthe', 'Persil']);
    const unwritable = fixture({ storageErrors: ['setItem'] });
    unwritable.submit({ exposition: 'ombre', objectif: 'aromatiques' });
    assert.deepEqual(unwritable.names(), ['Menthe', 'Persil']);
    assert.equal(unwritable.storage.has('ecobalcon-simulateur'), false);
    assert.equal(new URLSearchParams(unwritable.window.location.search).get('objectif'), 'aromatiques');
    const unremovable = fixture({ saved: { exposition: 'soleil' }, storageErrors: ['removeItem'] });
    unremovable.node('resetBtn').click();
    assert.equal(unremovable.node('resultsPanel').hidden, true);
    assert.equal(unremovable.window.location.search, '');
    assert.equal(unremovable.document.activeElement, unremovable.node('objectif'));
    assert.equal(unremovable.storage.has('ecobalcon-simulateur'), true, 'A failed removal cannot claim that browser storage was erased');
    const unavailable = fixture({ storageUnavailable: true });
    unavailable.submit({ exposition: 'ombre', objectif: 'aromatiques' });
    assert.deepEqual(unavailable.names(), ['Menthe', 'Persil']);
    unavailable.node('resetBtn').click();
    assert.equal(unavailable.window.location.search, '');
    assert.equal(unavailable.node('resultsPanel').hidden, true);
  });
}
