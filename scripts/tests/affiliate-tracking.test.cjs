const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');

// Run the actual consent script with a minimal DOM: no network or analytics call.
function fixture(consent, { gaId = 'G-TEST', pathname = '/articles/test/' } = {}) {
  const listeners = new Map();
  const nodes = new Map();
  const scripts = new Map();
  const idle = [];
  class Element {
    constructor() { this.dataset = {}; this.listeners = new Map(); }
    addEventListener(name, callback) { this.listeners.set(name, callback); }
    querySelector(selector) {
      if (!nodes.has(selector)) nodes.set(selector, new Element());
      return nodes.get(selector);
    }
    closest(selector) {
      if (selector === 'a[href]') return this.anchor || null;
      if (selector === '#gearRecommendations') return this.inGear ? this : null;
      return null;
    }
  }
  const storage = new Map();
  if (consent) storage.set('ecobalcon_cookie_preferences_v1', JSON.stringify(consent));
  const document = {
    currentScript: { dataset: { gaId, clarityId: 'TEST' } },
    readyState: 'complete', cookie: '',
    createElement: () => new Element(),
    getElementById: id => scripts.get(id),
    querySelector: () => null, querySelectorAll: () => [],
    head: { appendChild: script => scripts.set(script.id, script) },
    body: { appendChild() {} },
    addEventListener: (name, callback) => listeners.set(name, callback)
  };
  const window = {
    location: { hostname: 'ecobalcon.com', pathname, href: `https://ecobalcon.com${pathname}?private=secret`, reload() {} },
    requestIdleCallback: callback => idle.push(callback), addEventListener() {}
  };
  const context = { document, window, Element, navigator: {}, URL, Date,
    requestIdleCallback: window.requestIdleCallback, setTimeout: callback => idle.push(callback),
    localStorage: { getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value), removeItem: key => storage.delete(key) }
  };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'js/cookie-consent.js'), 'utf8'), context);
  return {
    window, scripts, idle, nodes,
    click(href = 'https://amzn.to/42G8qDp', options = {}) {
      const anchor = new Element();
      anchor.href = href;
      anchor.inGear = options.inGear;
      const child = new Element();
      child.anchor = anchor;
      const type = options.type || 'click';
      listeners.get(type)({ type, button: options.button ?? 0, target: child, defaultPrevented: options.defaultPrevented || false });
    },
    events() { return (window.dataLayer || []).filter(args => args[0] === 'event' && args[1] === 'affiliate_click'); }
  };
}
const accepted = () => ({ audience: true, updatedAt: new Date().toISOString() });

test('no affiliate event or tracker without current audience consent', () => {
  for (const consent of [null, { ...accepted(), audience: false }, { audience: true, updatedAt: '2000-01-01T00:00:00Z' }]) {
    const f = fixture(consent);
    f.click();
    f.idle.forEach(callback => callback());
    assert.equal(f.events().length, 0);
    assert.equal(f.scripts.size, 0);
  }
});

test('accepted click from nested content works before the idle tracker load', () => {
  const f = fixture(accepted());
  f.click();
  assert.equal(f.events().length, 1);
  const payload = f.events()[0][2];
  assert.equal(payload.affiliate_id, '42G8qDp');
  assert.equal(payload.affiliate_context, 'article');
  assert.equal(payload.page_path, '/articles/test/');
  assert.equal(JSON.stringify(payload).includes('secret'), false);
  assert.equal(f.scripts.has('ecobalcon-ga4-loader'), true);
  f.idle.forEach(callback => callback());
  assert.equal(f.events().length, 1);
});

test('simulator middle click identifies the product and placement', () => {
  const f = fixture(accepted(), { pathname: '/simulateur/index.html' });
  f.click('https://www.amazon.fr/product/dp/B09KM8VJC4?tag=ecobalcon-21&private=secret', { type: 'auxclick', button: 1, inGear: true });
  const payload = f.events()[0][2];
  assert.equal(payload.affiliate_id, 'B09KM8VJC4');
  assert.equal(payload.affiliate_context, 'simulator');
  assert.equal(payload.affiliate_placement, 'recommendation');
  assert.equal(JSON.stringify(payload).includes('tag='), false);
});

test('internal, lookalike, non-http, cancelled and right clicks are ignored', () => {
  const f = fixture(accepted());
  for (const url of ['https://ecobalcon.com/articles/test/', 'https://amazon.fr.evil.example/dp/B09KM8VJC4', 'https://amzn.to.evil.example/a', 'ftp://amzn.to/a']) f.click(url);
  f.click(undefined, { defaultPrevented: true });
  f.click(undefined, { type: 'auxclick', button: 2 });
  assert.equal(f.events().length, 0);
});

test('rejecting consent blocks pending idle loads and later clicks', () => {
  const f = fixture(accepted());
  f.nodes.get('[data-cookie-reject]').listeners.get('click')();
  f.idle.forEach(callback => callback());
  f.click();
  assert.equal(f.events().length, 0);
  assert.equal(f.scripts.size, 0);
});

test('accepting consent starts measurement; missing GA ID stays safe', () => {
  const f = fixture(null);
  f.click();
  f.nodes.get('[data-cookie-accept]').listeners.get('click')();
  f.click();
  assert.equal(f.events().length, 1);
  const withoutId = fixture(accepted(), { gaId: '' });
  withoutId.click();
  assert.equal(withoutId.events().length, 0);
});

const simulator = fs.readFileSync(path.join(root, 'js/simulateur.js'), 'utf8');
const gearCode = simulator.slice(simulator.indexOf('function getGearRecommendations('), simulator.indexOf('function getPlantText('));
const gear = { gearRecommendationsEl: { hidden: true, innerHTML: '' } };
vm.createContext(gear);
vm.runInContext(gearCode, gear);

test('vegetables never recommend the seed compost or small-pot affiliate link', () => {
  for (const vent of ['faible', 'fort']) {
    const picks = gear.getGearRecommendations({ objectif: 'legumes', place: 'petit', exposition: 'soleil', vent });
    assert.ok(picks.some(item => item.id === 'pots'));
    assert.ok(picks.some(item => item.id === 'soil'));
    assert.ok(picks.every(item => !/42G8qDp|3YXjTvS/.test(item.link)));
    if (vent === 'fort') assert.equal(picks[0].id, 'wind');
  }
});

test('strong wind does not recommend bird nets or hanging planters', () => {
  const picks = gear.getGearRecommendations({ objectif: 'fleurs', place: 'petit', exposition: 'soleil', vent: 'fort' });
  assert.equal(picks[0].id, 'wind');
  assert.ok(picks.every(item => item.id !== 'planters' && !/3EV8sxW/.test(item.link)));
});

test('affiliate rendering distinguishes purchases from internal guides and resets', () => {
  gear.renderGearRecommendations({ objectif: 'fleurs', place: 'petit', exposition: 'ombre', vent: 'faible' });
  assert.match(gear.gearRecommendationsEl.innerHTML, /sponsored/);
  assert.match(gear.gearRecommendationsEl.innerHTML, /caractéristiques annoncées des produits/);
  gear.renderGearRecommendations({ objectif: 'legumes', place: 'petit', vent: 'fort' });
  assert.doesNotMatch(gear.gearRecommendationsEl.innerHTML, /rel="nofollow sponsored/);
  assert.doesNotMatch(gear.gearRecommendationsEl.innerHTML, /Liens affiliés Amazon/);
  gear.renderGearRecommendations(null);
  assert.equal(gear.gearRecommendationsEl.hidden, true);
  assert.equal(gear.gearRecommendationsEl.innerHTML, '');
});
