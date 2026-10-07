// Les données plantes vivent uniquement dans js/plants-data.js (chargé avant ce script).
const plants = window.EcoBalconPlants || [];

const labels = {
  exposition: {
    soleil: "plein soleil",
    "mi-ombre": "mi-ombre",
    ombre: "ombre"
  },
  vent: {
    abrite: "balcon abrité",
    modere: "balcon un peu exposé",
    fort: "balcon très exposé au vent"
  },
  place: {
    petit: "petit espace",
    moyen: "espace moyen",
    grand: "balcon spacieux"
  },
  objectif: {
    aromatiques: "des aromatiques",
    legumes: "des légumes utiles",
    fleurs: "un rendu fleuri",
    facile: "quelque chose de très simple"
  }
};

const monthNames = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const currentMonth = new Date().getMonth() + 1;
const monthlyGuides = {
  4: "../articles/que-planter-en-avril-sur-un-balcon/",
  5: "../articles/que-planter-en-mai-sur-un-balcon/",
  6: "../articles/que-faire-en-juin-potager-balcon/",
  8: "../articles/que-planter-en-aout-sur-un-balcon/",
  10: "../articles/que-planter-en-octobre-sur-un-balcon/",
  11: "../articles/que-planter-en-novembre-sur-un-balcon/"
};
const seasonalGuide = monthlyGuides[currentMonth] || "../articles/calendrier-du-jardin-de-balcon/";
const STORAGE_KEY = "ecobalcon-simulateur";

const expositionEl = document.getElementById("exposition");
const ventEl = document.getElementById("vent");
const placeEl = document.getElementById("place");
const objectifEl = document.getElementById("objectif");
const resultsEl = document.getElementById("results");
const resultsPanelEl = document.getElementById("resultsPanel");
const summaryEl = document.getElementById("summary");
const emptyStateEl = document.getElementById("emptyState");
const noteEl = document.getElementById("note");
const gearRecommendationsEl = document.getElementById("gearRecommendations");
const diagnosticResultEl = document.getElementById("diagnosticResult");
const resetBtn = document.getElementById("resetBtn");
const potPlantEl = document.getElementById("potPlant");
const plantCountEl = document.getElementById("plantCount");
const potCalcBtn = document.getElementById("potCalcBtn");
const potResultEl = document.getElementById("potResult");
const absenceDaysEl = document.getElementById("absenceDays");
const heatLevelEl = document.getElementById("heatLevel");
const waterCalcBtn = document.getElementById("waterCalcBtn");
const waterResultEl = document.getElementById("waterResult");
const compostPotEl = document.getElementById("compostPot");
const compostCultureEl = document.getElementById("compostCulture");
const compostCalcBtn = document.getElementById("compostCalcBtn");
const compostResultEl = document.getElementById("compostResult");
const plantSearchEl = document.getElementById("plantSearch");
const libraryExposureEl = document.getElementById("libraryExposure");
const libraryGoalEl = document.getElementById("libraryGoal");
const libraryPotEl = document.getElementById("libraryPot");
const librarySeasonEl = document.getElementById("librarySeason");
const plantLibraryEl = document.getElementById("plantLibrary");
const librarySummaryEl = document.getElementById("librarySummary");
const absencePlantEl = document.getElementById("absencePlant");
const absencePotsEl = document.getElementById("absencePots");
const wateringAidEl = document.getElementById("wateringAid");
const compostSpaceEl = document.getElementById("compostSpace");
const compostTimeEl = document.getElementById("compostTime");
const compostSmellEl = document.getElementById("compostSmell");
const compostRecommendationEl = document.getElementById("compostRecommendation");
const compostRowsEl = document.getElementById("compostRows");
const plantJourneyEl = document.getElementById("plantJourney");
const diagnosticDetailsEl = document.getElementById("diagnosticDetails");
const gearDetailsEl = document.getElementById("gearDetails");
const formStatusEl = document.getElementById("formStatus");

function showTool(name) {
  document.querySelectorAll("[data-tool-view]").forEach((panel) => {
    panel.hidden = panel.dataset.toolView !== name;
  });
  document.querySelectorAll("[data-tool]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.tool === name));
  });
}

const compostMethods = [
  {
    name: "Compost partagé + bioseau",
    space: "petit",
    time: "faible",
    smell: "forte",
    place: "Très faible",
    care: "Sortie régulière",
    strengths: "Propre, peu coûteux, parfait en appartement",
    avoid: "Vous n'avez aucun point de collecte accessible"
  },
  {
    name: "Bokashi",
    space: "petit",
    time: "moyen",
    smell: "moyenne",
    place: "Faible",
    care: "Vidange et jus à gérer",
    strengths: "Compact, accepte beaucoup de déchets de cuisine",
    avoid: "Vous ne savez pas où vider le digestat"
  },
  {
    name: "Lombricomposteur compact",
    space: "moyen",
    time: "fort",
    smell: "moyenne",
    place: "Moyenne",
    care: "Suivi vivant",
    strengths: "Produit un amendement utile et pédagogique",
    avoid: "Balcon brûlant, gel fréquent ou suivi irrégulier"
  },
  {
    name: "Grand bac de compostage",
    space: "grand",
    time: "fort",
    smell: "faible",
    place: "Élevée",
    care: "Mélange et surveillance",
    strengths: "Possible seulement sur grand espace bien ventilé",
    avoid: "Petit balcon, voisins proches ou copropriété stricte"
  }
];

const plantArticles = {
  "Basilic": "../articles/guide-basilic-sur-son-balcon/",
  "Tomate cerise": "../articles/tomates-cerises-balcon/",
  "Fraisier": "../articles/guide-fraises-sur-son-balcon/",
  "Radis": "../articles/guide-radis-sur-son-balcon/",
  "Laitue à couper": "../articles/guide-laitues-sur-son-balcon/",
  "Poivron": "../articles/guide-poivrons-sur-son-balcon/",
  "Épinard": "../articles/guide-epinards-sur-son-balcon/",
  "Menthe": "../articles/menthe-pot-balcon/",
  "Haricot nain": "../articles/haricots-nains-pot-balcon/",
  "Concombre": "../articles/concombre-pot-balcon/",
  "Courgette": "../articles/courgette-pot-balcon/",
  "Pomme de terre": "../articles/pommes-de-terre-balcon/"
};

function isPlantableNow(plant) {
  return Array.isArray(plant.months) && plant.months.includes(currentMonth);
}

function formatMonths(months) {
  if (!Array.isArray(months) || !months.length) {
    return "selon saison";
  }

  const sorted = [...new Set(months)].sort((left, right) => left - right);
  const ranges = [];
  let start = sorted[0];
  let end = sorted[0];

  for (let index = 1; index <= sorted.length; index += 1) {
    if (sorted[index] === end + 1) {
      end = sorted[index];
    } else {
      ranges.push(start === end ? monthNames[start - 1] : `${monthNames[start - 1]} à ${monthNames[end - 1]}`);
      start = sorted[index];
      end = sorted[index];
    }
  }

  return ranges.join(", ");
}

function buildSummary(filters, results) {
  const parts = [];

  if (filters.exposition) {
    parts.push(labels.exposition[filters.exposition]);
  }
  if (filters.vent) {
    parts.push(labels.vent[filters.vent]);
  }
  if (filters.place) {
    parts.push(labels.place[filters.place]);
  }
  if (filters.objectif) {
    parts.push(labels.objectif[filters.objectif]);
  }

  const count = results.length;
  const sentence = parts.length ? parts.join(" · ") : "vos critères";
  const inSeason = results.filter(isPlantableNow).length;
  const seasonInfo = inSeason ? `, dont ${inSeason} à planter en ${monthNames[currentMonth - 1]}` : "";
  return `${count} suggestion${count > 1 ? "s" : ""} trouvée${count > 1 ? "s" : ""} pour ${sentence}${seasonInfo}.`;
}

function getDiagnostic(filters, results) {
  const first = results[0];
  const potNeed = first && first.potLiters ? `${first.potLiters} L minimum pour ${first.name}` : "un volume de pot adapté à la culture principale";
  const waterLevel = filters.exposition === "soleil" || filters.vent === "fort" ? "priorité forte à l'arrosage régulier et au paillage" : "arrosage à surveiller sans saturer le terreau";
  const spaceAdvice = filters.place === "petit" ? "limitez-vous à 3 ou 4 pots vraiment utiles" : "organisez les grands pots au fond et les cultures rapides devant";
  const inSeason = results.filter(isPlantableNow).length;
  const seasonAdvice = inSeason
    ? `${inSeason} de ces suggestions se plante${inSeason > 1 ? "nt" : ""} encore en ${monthNames[currentMonth - 1]}`
    : `peu de plantations en ${monthNames[currentMonth - 1]} : profitez-en pour préparer la saison suivante`;
  const nextGuide = filters.exposition === "ombre"
    ? "../articles/balcon-a-lombre-plantes-et-culture/"
    : filters.vent === "fort"
      ? "../articles/balcon-venteux-plantes-protection-pots/"
      : "../articles/le-materiel-essentiel-pour-commencer/";

  return `
    <ul class="article-list">
      <li><strong>Culture prioritaire :</strong> ${first ? first.name : "choisir une plante simple et robuste"}.</li>
      <li><strong>Pot :</strong> ${potNeed}.</li>
      <li><strong>Eau :</strong> ${waterLevel}.</li>
      <li><strong>Saison :</strong> ${seasonAdvice} (<a href="${seasonalGuide}">voir le guide du moment</a>).</li>
      <li><strong>Organisation :</strong> ${spaceAdvice}.</li>
      <li><strong>Prochaine lecture :</strong> <a href="${nextGuide}">ouvrir le guide le plus utile</a>.</li>
    </ul>
  `;
}

function getMatchBadges(plant, filters) {
  const badges = [];

  if (filters.exposition && plant.exposure.includes(filters.exposition)) {
    badges.push({ type: "ok", text: `OK ${labels.exposition[filters.exposition]}` });
  }

  if (filters.vent === "fort" || filters.vent === "modere") {
    if (plant.wind.includes(filters.vent)) {
      badges.push({ type: "ok", text: filters.vent === "fort" ? "Tient le vent fort" : "Supporte un peu de vent" });
    } else {
      badges.push({ type: "warn", text: "À placer à l'abri du vent" });
    }
  }

  if (filters.place) {
    if (!plant.space.includes(filters.place)) {
      badges.push({ type: "warn", text: "Demande plus de place" });
    } else if (filters.place === "petit") {
      badges.push({ type: "ok", text: "OK petit balcon" });
    }
  }

  if (isPlantableNow(plant)) {
    badges.push({ type: "season", text: `À planter en ${monthNames[currentMonth - 1]}` });
  } else if (Array.isArray(plant.months) && plant.months.length) {
    badges.push({ type: "muted", text: `Plantation : ${formatMonths(plant.months)}` });
  }

  return badges;
}

function renderResults(plantsToShow, filters) {
  resultsEl.innerHTML = "";

  const more = document.createElement("details");
  more.className = "simulator-disclosure simulator-more-results";
  more.innerHTML = `<summary>Voir les ${plantsToShow.length - 3} autres suggestions</summary><div class="simulator-results"></div>`;
  plantsToShow.forEach((plant, index) => {
    const article = document.createElement("article");
    article.className = "simulator-result";
    const guide = plantArticles[plant.name];
    const badges = getMatchBadges(plant, filters);
    const badgesHtml = badges.length
      ? `<div class="simulator-match">${badges.map((badge) => `<span class="simulator-match-tag simulator-match-${badge.type}">${badge.text}</span>`).join("")}</div>`
      : "";
    article.innerHTML = `
      <h3>${plant.name}</h3>
      <p class="simulator-plant-facts">Pot : <strong>${plant.potLiters || "?"} L minimum</strong> · ${plant.difficulty || "difficulté à vérifier"}</p>
      ${badgesHtml}
      <details class="simulator-disclosure">
        <summary>Conseils pour ${plant.name}</summary>
        <p>${plant.description}</p>
        <ul class="simulator-tips">${plant.tips.map((tip) => `<li>${tip}</li>`).join("")}</ul>
      </details>
      ${guide ? `<a class="simulator-guide-link" href="${guide}" aria-label="Voir le guide dédié pour ${plant.name}">Voir le guide dédié</a>` : ""}
      <button type="button" class="simulator-pot-link" data-pot-plant="${plant.name}">Calculer le pot pour ${plant.name}</button>
    `;
    if (index < 3) resultsEl.appendChild(article);
    else more.querySelector(".simulator-results").appendChild(article);
  });
  if (plantsToShow.length > 3) resultsEl.appendChild(more);
}

function getGearRecommendations(filters) {
  if (!filters) {
    return [];
  }

  const picks = [];
  const add = (item) => {
    if (!picks.some((pick) => pick.id === item.id)) {
      picks.push(item);
    }
  };

  const gear = {
    pots: {
      id: "pots",
      badge: "Contenants",
      title: "Choisir le volume avant le pot",
      text: "Pour les légumes, pars des besoins de la plante, puis vérifie profondeur, drainage et poids du pot arrosé.",
      check: "Un petit pot de semis ne convient pas à une tomate adulte. Réutilise un contenant adapté si tu en as déjà un.",
      link: "../articles/le-materiel-essentiel-pour-commencer/#choisir-un-contenant",
      label: "Choisir un contenant adapté"
    },
    planters: {
      id: "planters",
      badge: "Petit espace",
      title: "Une balconnière pour cultures compactes",
      text: "Exemple documentaire : Elho Vibia Campana Allin1, pour fleurs compactes ou petites cultures selon le volume choisi.",
      check: "Vérifie les dimensions, le volume et la compatibilité des fixations avec ton garde-corps. Si elle ne convient pas, garde un pot posé au sol, côté intérieur.",
      link: "https://amzn.to/4jAkY50",
      label: "Voir la balconnière Elho sur Amazon",
      affiliate: true
    },
    soil: {
      id: "soil",
      badge: "Substrat",
      title: "Un substrat adapté à la culture",
      text: "Le substrat de culture compte davantage qu’un accessoire. Choisis un usage indiqué sur le sac, adapté aux plantes et à la plantation en bac.",
      check: "Le terreau de semis sert au démarrage : ne le choisis pas par défaut pour remplir tous les grands pots.",
      link: "../articles/rempoter-plantes-balcon/",
      label: "Choisir son pot et son terreau"
    },
    wateringCan: {
      id: "wateringCan",
      badge: "Arrosage",
      title: "Un arrosoir maniable",
      text: "Exemple documentaire : l’arrosoir à fleurs greemotion, si tu cherches un outil simple pour arroser à la main.",
      check: "Vérifie la contenance, l’encombrement et le poids rempli. Garde ton arrosoir actuel s’il permet déjà un arrosage précis.",
      link: "https://amzn.to/3EPUPjG",
      label: "Voir l’arrosoir greemotion sur Amazon",
      affiliate: true
    },
    heat: {
      id: "heat",
      badge: "Chaleur",
      title: "Limiter le dessèchement d’abord",
      text: "Sur un balcon au soleil, ajuste le volume des pots, le paillage et l’exposition avant de choisir un système d’appoint.",
      check: "Si tu t’absentes, teste tout système dans tes conditions réelles et prévois une personne pour les pots sensibles.",
      link: "../articles/arroser-plantes-balcon-vacances/",
      label: "Préparer l’arrosage et les absences"
    },
    herbs: {
      id: "herbs",
      badge: "Aromatiques",
      title: "Choisir les aromatiques avant le kit",
      text: "Basilic, menthe et thym n’ont pas les mêmes besoins. Choisis d’abord les espèces adaptées à ton exposition.",
      check: "Des plants déjà développés permettent une récolte plus rapide qu’un kit de graines. Tu peux aussi récupérer une bouture.",
      link: "../articles/plantes-aromatiques-sur-balcon/",
      label: "Choisir ses aromatiques"
    },
    wind: {
      id: "wind",
      badge: "Vent",
      title: "Stabiliser avant d’équiper",
      text: "Vérifie la stabilité des pots, place les plantes hautes à l’abri et choisis des supports compatibles avec le balcon.",
      check: "Un filet anti-oiseaux n’est pas un brise-vent. N’ajoute pas de grande prise au vent sans fixation adaptée.",
      link: "../articles/balcon-venteux-plantes-protection-pots/",
      label: "Sécuriser un balcon venteux"
    }
  };

  // Wind and edible crops take priority over optional shopping suggestions.
  if (filters.vent === "fort") {
    add(gear.wind);
  }
  if (filters.objectif === "legumes") {
    add(gear.pots);
    add(gear.soil);
  } else if (filters.place === "petit" && filters.vent !== "fort") {
    add(gear.planters);
  } else if (filters.place) {
    add(gear.pots);
  }

  if (filters.objectif === "aromatiques") {
    add(gear.herbs);
  } else if (filters.objectif === "fleurs" && filters.vent !== "fort") {
    add(gear.planters);
  } else if (filters.objectif === "facile") {
    add(gear.wateringCan);
  }

  if (filters.exposition === "soleil") {
    add(gear.heat);
  }

  if (!picks.length) {
    add(gear.soil);
    add(gear.wateringCan);
  }

  return picks.slice(0, 3);
}

function renderGearRecommendations(filters) {
  const recommendations = getGearRecommendations(filters);

  if (!recommendations.length) {
    gearRecommendationsEl.hidden = true;
    gearRecommendationsEl.innerHTML = "";
    return;
  }

  gearRecommendationsEl.hidden = false;
  gearRecommendationsEl.innerHTML = `
    <h3>Matériel utile à prévoir</h3>
    <p class="gear-recommendations-intro">Ces pistes suivent tes critères et les caractéristiques annoncées des produits. Réutilise ce que tu possèdes et complète seulement ce qui répond à un besoin. Vérifie la variante et ses caractéristiques avant l’achat.</p>
    ${recommendations.some((item) => item.affiliate) ? '<p class="gear-recommendations-disclosure">Liens affiliés Amazon. En tant que Partenaire Amazon, je réalise un bénéfice sur les achats remplissant les conditions requises.</p>' : ""}
    <div class="gear-recommendation-grid">
      ${recommendations.map((item) => `
        <article class="gear-recommendation-card">
          <span>${item.badge}</span>
          <strong>${item.title}</strong>
          <p>${item.text}</p>
          <p>${item.check}</p>
          <p><a href="${item.link}"${item.affiliate ? ' target="_blank" rel="nofollow sponsored noopener noreferrer"' : ""}>${item.label}</a></p>
        </article>
      `).join("")}
    </div>
    <a class="gear-recommendations-guide" href="../articles/le-materiel-essentiel-pour-commencer/">Voir le guide matériel complet</a>
  `;
}

function normalizeSearch(value) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function getPlantText(plant) {
  return [
    plant.name,
    plant.difficulty,
    plant.harvest,
    plant.description,
    plant.tags.join(" "),
    plant.tips.join(" ")
  ].map((value) => normalizeSearch((value || "").toString())).join(" ");
}

function renderPlantLibrary() {
  const query = normalizeSearch(plantSearchEl.value.trim());
  const exposure = libraryExposureEl.value;
  const goal = libraryGoalEl.value;
  const potLimit = Number(libraryPotEl.value) || 0;
  const seasonOnly = librarySeasonEl.value === "now";

  plantLibraryEl.innerHTML = "";

  const matches = plants
    .filter((plant) => !query || getPlantText(plant).includes(query))
    .filter((plant) => !exposure || plant.exposure.includes(exposure))
    .filter((plant) => !goal || plant.goals.includes(goal))
    .filter((plant) => !potLimit || (plant.potLiters || 99) <= potLimit)
    .filter((plant) => !seasonOnly || isPlantableNow(plant))
    .sort((left, right) => left.name.localeCompare(right.name, "fr"));

  librarySummaryEl.textContent = `${matches.length} plante${matches.length > 1 ? "s" : ""} affichée${matches.length > 1 ? "s" : ""}.`;

  if (!matches.length) {
    librarySummaryEl.textContent = "Aucune plante ne correspond à ces critères. Essayez un filtre moins strict.";
    return;
  }

  matches.forEach((plant) => {
    const card = document.createElement("article");
    card.className = "plant-library-card";
    const guide = plantArticles[plant.name];
    const seasonBadge = isPlantableNow(plant)
      ? `<div class="simulator-match"><span class="simulator-match-tag simulator-match-season">À planter en ${monthNames[currentMonth - 1]}</span></div>`
      : "";
    card.innerHTML = `
      <h3>${plant.name}</h3>
      <div class="plant-library-meta">
        <span>Pot : ${plant.potLiters || "?"} L min.</span>
        <span>Difficulté : ${plant.difficulty || "à vérifier"}</span>
      </div>
      ${seasonBadge}
      <details class="simulator-disclosure"><summary>Conseils pour ${plant.name}</summary>
      <div class="plant-library-meta">
        <span>Récolte/floraison : ${plant.harvest || "selon saison"}</span>
        <span>Plantation : ${formatMonths(plant.months)}</span>
      </div>
      <p>${plant.description}</p>
      </details>
      ${guide ? `<a class="simulator-guide-link" href="${guide}">Lire le guide</a>` : ""}
    `;
    plantLibraryEl.appendChild(card);
  });
}

function persistFilters(filters) {
  const active = Object.entries(filters).filter(([, value]) => Boolean(value));

  try {
    if (active.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    /* stockage indisponible (navigation privée) : on garde au moins l'URL */
  }

  const query = new URLSearchParams(active).toString();
  history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
}

function readSavedFilters() {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = {
    exposition: params.get("exposition") || "",
    vent: params.get("vent") || "",
    place: params.get("place") || "",
    objectif: params.get("objectif") || ""
  };

  if (Object.values(fromUrl).some(Boolean)) {
    return fromUrl;
  }

  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (stored && typeof stored === "object") {
      return {
        exposition: stored.exposition || "",
        vent: stored.vent || "",
        place: stored.place || "",
        objectif: stored.objectif || ""
      };
    }
  } catch (error) {
    /* stockage indisponible ou corrompu : on repart de zéro */
  }

  return null;
}

function restoreFilters() {
  const saved = readSavedFilters();

  if (!saved) {
    return;
  }

  const sanitize = (value, map) => (value && map[value] ? value : "");
  expositionEl.value = sanitize(saved.exposition, labels.exposition);
  ventEl.value = sanitize(saved.vent, labels.vent);
  placeEl.value = sanitize(saved.place, labels.place);
  objectifEl.value = sanitize(saved.objectif, labels.objectif);

  if (expositionEl.value || ventEl.value || placeEl.value || objectifEl.value) {
    document.getElementById("extraCriteria").open = Boolean(ventEl.value || placeEl.value);
    runSimulation();
  }
}

function scrollToResultsPanel() {
  document.getElementById("resultsTitle").focus({ preventScroll: true });
  resultsPanelEl.scrollIntoView({ behavior: "auto", block: "start" });
}

function runSimulation(options) {
  const shouldScroll = Boolean(options && options.scroll);
  const filters = {
    exposition: expositionEl.value,
    vent: ventEl.value,
    place: placeEl.value,
    objectif: objectifEl.value
  };

  persistFilters(filters);
  resultsPanelEl.hidden = false;
  plantJourneyEl.classList.add("has-results");
  formStatusEl.textContent = "";
  diagnosticDetailsEl.hidden = true;
  diagnosticDetailsEl.open = false;
  gearDetailsEl.hidden = true;
  gearDetailsEl.open = false;
  emptyStateEl.style.display = "none";
  noteEl.style.display = "none";
  noteEl.textContent = "";
  renderGearRecommendations(null);

  const results = plants
    .filter((plant) => {
      if (filters.exposition && !plant.exposure.includes(filters.exposition)) {
        return false;
      }

      if (filters.objectif && !plant.goals.includes(filters.objectif)) {
        return false;
      }

      return true;
    })
    .map((plant) => {
      let score = 0;

      if (filters.exposition && plant.exposure.includes(filters.exposition)) {
        score += 4;
      }

      if (filters.objectif && plant.goals.includes(filters.objectif)) {
        score += 3;
      }

      if (filters.vent && plant.wind.includes(filters.vent)) {
        score += 2;
      }

      if (filters.place && plant.space.includes(filters.place)) {
        score += 1;
      }

      if (isPlantableNow(plant)) {
        score += 2;
      }

      return { plant, score };
    })
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return left.plant.name.localeCompare(right.plant.name, "fr");
    })
    .slice(0, 8)
    .map((item) => item.plant);

  if (!results.length) {
    resultsEl.innerHTML = "";
    summaryEl.style.display = "block";
    summaryEl.textContent = "Aucune correspondance directe avec cette combinaison de critères.";
    noteEl.style.display = "block";
    noteEl.textContent = "Essaie une autre priorité ou une exposition plus large. Le catalogue permet aussi d’explorer toutes les plantes.";
    if (shouldScroll) {
      scrollToResultsPanel();
    }
    return;
  }

  summaryEl.style.display = "block";
  summaryEl.textContent = buildSummary(filters, results);
  renderResults(results, filters);
  renderGearRecommendations(filters);
  gearDetailsEl.hidden = gearRecommendationsEl.hidden;
  diagnosticDetailsEl.hidden = false;
  diagnosticResultEl.innerHTML = getDiagnostic(filters, results);

  if (!filters.exposition) {
    noteEl.style.display = "block";
    noteEl.textContent = "Ces idées restent à affiner : observe le soleil direct sur ton balcon avant de choisir une plante.";
  }

  if (filters.vent === "fort") {
    noteEl.style.display = "block";
    noteEl.textContent = "Balcon venteux : choisissez des pots assez lourds, évitez les plantes trop fragiles et surveillez le dessèchement du terreau.";
  }

  if (shouldScroll) {
    scrollToResultsPanel();
  }
}

function resetSimulation() {
  expositionEl.value = "";
  ventEl.value = "";
  placeEl.value = "";
  objectifEl.value = "";
  resultsPanelEl.hidden = true;
  plantJourneyEl.classList.remove("has-results");
  document.getElementById("extraCriteria").open = false;
  diagnosticDetailsEl.hidden = true;
  gearDetailsEl.hidden = true;
  formStatusEl.textContent = "Tes critères ont été effacés. Tu peux recommencer.";
  resultsEl.innerHTML = "";
  summaryEl.style.display = "none";
  summaryEl.textContent = "";
  noteEl.style.display = "none";
  noteEl.textContent = "";
  renderGearRecommendations(null);
  emptyStateEl.style.display = "block";
  diagnosticResultEl.textContent = "Lancez le simulateur pour obtenir un plan simple et adapté à votre balcon.";

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    /* stockage indisponible : rien à nettoyer */
  }
  history.replaceState(null, "", window.location.pathname);
  objectifEl.focus();
}

function hydratePlantTools() {
  plants
    .slice()
    .sort((left, right) => left.name.localeCompare(right.name, "fr"))
    .forEach((plant) => {
      const option = document.createElement("option");
      option.value = plant.name;
      option.textContent = plant.name;
      potPlantEl.appendChild(option);

      const absenceOption = document.createElement("option");
      absenceOption.value = plant.name;
      absenceOption.textContent = plant.name;
      absencePlantEl.appendChild(absenceOption);
    });
}

function getPlantByName(name) {
  return plants.find((plant) => plant.name === name) || plants[0];
}

function validateNumbers(inputs, result) {
  const invalid = inputs.find((input) => !input.value || !input.checkValidity());
  if (!invalid) return true;
  const label = document.querySelector(`label[for="${invalid.id}"]`).textContent.trim();
  result.textContent = `${label} : indique un nombre entier de ${invalid.min} à ${invalid.max}.`;
  return false;
}

function calculatePot() {
  if (!validateNumbers([plantCountEl], potResultEl)) return;
  const plant = getPlantByName(potPlantEl.value);

  if (!plant) {
    return;
  }

  const count = Math.max(1, Number(plantCountEl.value) || 1);
  const liters = Math.ceil((plant.potLiters || 5) * count);
  potResultEl.innerHTML = `<strong>${liters} L minimum</strong><br>${count > 1 ? "Pour plusieurs plants, séparez si possible les cultures gourmandes." : plant.harvest || "Choisissez un pot percé et stable."}`;
}

function calculateWaterRisk() {
  if (!validateNumbers([absenceDaysEl, absencePotsEl], waterResultEl)) return;
  const plant = getPlantByName(absencePlantEl.value);

  if (!plant) {
    return;
  }

  const days = Math.max(1, Number(absenceDaysEl.value) || 1);
  const heat = heatLevelEl.value;
  const pots = Math.max(1, Number(absencePotsEl.value) || 1);
  const aid = wateringAidEl.value;
  let score = days + (plant.waterNeed || 3);
  if (heat === "chaud") score += 3;
  if (heat === "brulant") score += 6;
  if (pots >= 8) score += 1;
  if (aid === "paillage") score -= 2;
  if (aid === "reserve") score -= 4;
  if (aid === "person") score -= 6;
  const level = score >= 12 ? "risque fort" : score >= 7 ? "risque moyen" : "risque modéré";
  const liters = Math.max(2, Math.round((plant.potLiters || 5) * pots * 0.22));
  const action = score >= 12
    ? "prévoyez un passage humain ou une réserve testée, plus ombre légère et paillage"
    : score >= 7
      ? "paillez, regroupez les pots et testez une réserve d'eau au moins 48 h avant le départ"
      : "arrosez à fond avant départ et éloignez les pots du plein soleil direct";
  waterResultEl.innerHTML = `<strong>${level}</strong><br>${action}.<br>Repère utile : environ ${liters} L d'eau tampon à prévoir pour ${pots} pot${pots > 1 ? "s" : ""}, à adapter selon météo réelle.`;
}

function calculateCompost() {
  if (!validateNumbers([compostPotEl], compostResultEl)) return;
  const liters = Math.max(2, Number(compostPotEl.value) || 2);
  const type = compostCultureEl.value;
  const ratio = type === "gourmande" ? 0.08 : type === "feuille" ? 0.04 : 0.02;
  const compost = Math.max(1, Math.round(liters * ratio));
  compostResultEl.innerHTML = `<strong>${compost} L maximum d'apport prudent</strong><br>Utilisez du compost mûr et mélangez légèrement plutôt que de charger la surface.`;
}

function compareCompost() {
  const space = compostSpaceEl.value;
  const time = compostTimeEl.value;
  const smell = compostSmellEl.value;
  const scoreValue = { petit: 1, moyen: 2, grand: 3, faible: 1, moyenne: 2, forte: 3, fort: 3 };

  const scored = compostMethods
    .map((method) => {
      let score = 0;
      if (scoreValue[method.space] <= scoreValue[space]) score += 3;
      if (scoreValue[method.time] <= scoreValue[time]) score += 3;
      if (scoreValue[method.smell] >= scoreValue[smell]) score += 2;
      if (method.name.includes("partagé") && space === "petit") score += 1;
      return { method, score };
    })
    .sort((left, right) => right.score - left.score);

  const best = scored[0].method;
  compostRecommendationEl.innerHTML = `<strong>Recommandation : ${best.name}</strong><br>${best.strengths}. À vérifier : ${best.avoid.toLowerCase()}.`;
  compostRowsEl.innerHTML = scored.map(({ method }) => `
    <tr>
      <td>${method.name}</td>
      <td>${method.place}</td>
      <td>${method.care}</td>
      <td>${method.strengths}</td>
      <td>${method.avoid}</td>
    </tr>
  `).join("");
}

hydratePlantTools();
renderPlantLibrary();
calculatePot();
calculateWaterRisk();
calculateCompost();
compareCompost();
restoreFilters();
document.getElementById("plantForm").addEventListener("submit", (event) => {
  event.preventDefault();
  runSimulation({ scroll: true });
});
document.querySelector(".simulator-tool-nav").hidden = false;
showTool("plants");
document.querySelectorAll("[data-tool]").forEach((button) => {
  button.addEventListener("click", () => showTool(button.dataset.tool));
});
resultsEl.addEventListener("click", (event) => {
  const button = event.target.closest("[data-pot-plant]");
  if (!button) return;
  potPlantEl.value = button.dataset.potPlant;
  plantCountEl.value = "1";
  calculatePot();
  showTool("pots");
  potPlantEl.focus();
});
document.getElementById("libraryReset").addEventListener("click", () => {
  [plantSearchEl, libraryExposureEl, libraryGoalEl, libraryPotEl, librarySeasonEl].forEach((element) => { element.value = ""; });
  renderPlantLibrary();
  plantSearchEl.focus();
});
resetBtn.addEventListener("click", resetSimulation);
[expositionEl, ventEl, placeEl, objectifEl].forEach((element) => {
  element.addEventListener("change", () => {
    if (!resultsPanelEl.hidden) formStatusEl.textContent = "Critères modifiés : clique sur Trouver mes plantes pour actualiser la sélection.";
  });
});
potCalcBtn.addEventListener("click", calculatePot);
waterCalcBtn.addEventListener("click", calculateWaterRisk);
compostCalcBtn.addEventListener("click", calculateCompost);
[plantSearchEl, libraryExposureEl, libraryGoalEl, libraryPotEl, librarySeasonEl].forEach((element) => {
  element.addEventListener("input", renderPlantLibrary);
  element.addEventListener("change", renderPlantLibrary);
});
[absencePlantEl, absencePotsEl, wateringAidEl, heatLevelEl, absenceDaysEl].forEach((element) => {
  element.addEventListener("input", calculateWaterRisk);
  element.addEventListener("change", calculateWaterRisk);
});
[compostSpaceEl, compostTimeEl, compostSmellEl].forEach((element) => {
  element.addEventListener("change", compareCompost);
});
