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
  8: "../articles/que-planter-en-aout-sur-un-balcon/"
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
const runBtn = document.getElementById("runBtn");
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

function getFallbackAdvice(exposition) {
  if (exposition === "soleil") {
    return "Votre balcon semble très ensoleillé : commencez avec lavande, géranium, ciboulette ou fraisier si vous voulez quelque chose d'accessible.";
  }

  if (exposition === "ombre") {
    return "Avec peu de soleil direct, privilégiez des plantes comme la menthe, le persil ou le bégonia, généralement plus tolérantes à l'ombre.";
  }

  return "Avec une exposition intermédiaire, essayez des plantes polyvalentes comme fraisier, basilic, ciboulette ou géranium.";
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

  plantsToShow.forEach((plant) => {
    const article = document.createElement("article");
    article.className = "simulator-result";
    const guide = plantArticles[plant.name];
    const badges = getMatchBadges(plant, filters);
    const badgesHtml = badges.length
      ? `<div class="simulator-match">${badges.map((badge) => `<span class="simulator-match-tag simulator-match-${badge.type}">${badge.text}</span>`).join("")}</div>`
      : "";
    article.innerHTML = `
      <h4>${plant.name}</h4>
      <div class="simulator-tags">${plant.tags.map((tag) => `<span class="simulator-tag">${tag}</span>`).join("")}</div>
      <p>${plant.description}</p>
      <ul class="simulator-tips">${plant.tips.map((tip) => `<li>${tip}</li>`).join("")}</ul>
      ${badgesHtml}
      ${guide ? `<a class="simulator-guide-link" href="${guide}" aria-label="Voir le guide dédié pour ${plant.name}">Voir le guide dédié</a>` : ""}
    `;
    resultsEl.appendChild(article);
  });
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
      title: "Des pots au bon volume",
      text: "Le plus rentable si les plantes sèchent trop vite ou manquent de place.",
      link: "https://amzn.to/3YXjTvS",
      label: "voir des pots de tailles variées"
    },
    planters: {
      id: "planters",
      badge: "Petit espace",
      title: "Des jardinières simples",
      text: "Utile pour aligner aromatiques, fleurs compactes ou salades sans bloquer la circulation.",
      link: "https://amzn.to/4jAkY50",
      label: "voir des jardinières basiques"
    },
    soil: {
      id: "soil",
      badge: "Substrat",
      title: "Un terreau potager fiable",
      text: "Prioritaire pour les légumes, les fraisiers et les pots qui s’épuisent vite.",
      link: "https://amzn.to/42G8qDp",
      label: "voir le terreau potager"
    },
    wateringCan: {
      id: "wateringCan",
      badge: "Arrosage",
      title: "Un arrosoir maniable",
      text: "Le choix simple quand l’arrosage quotidien devient imprécis ou pénible.",
      link: "https://amzn.to/3EPUPjG",
      label: "voir un arrosoir compact"
    },
    drip: {
      id: "drip",
      badge: "Vacances",
      title: "Un kit goutte à goutte à tester",
      text: "Intéressant si vous partez souvent, surtout sur balcon chaud ou venté.",
      link: "https://amzn.to/3QO15OK",
      label: "voir un kit goutte à goutte"
    },
    ollas: {
      id: "ollas",
      badge: "Chaleur",
      title: "Des ollas pour stabiliser l’eau",
      text: "À envisager pour les gros pots en plein soleil qui alternent sec et trop arrosé.",
      link: "https://amzn.to/4o0h748",
      label: "voir des ollas"
    },
    herbs: {
      id: "herbs",
      badge: "Aromatiques",
      title: "Un kit d’herbes aromatiques",
      text: "Pratique si vous voulez démarrer vite avec des cultures faciles à récolter.",
      link: "https://amzn.to/3Sjt2Lu",
      label: "voir un kit d’herbes aromatiques"
    },
    protection: {
      id: "protection",
      badge: "Protection",
      title: "Un filet léger",
      text: "À garder pour les jeunes pousses exposées aux coups de vent ou aux passages répétés près des bacs.",
      link: "https://amzn.to/3EV8sxW",
      label: "voir un filet de protection"
    }
  };

  if (filters.place === "petit") {
    add(gear.planters);
  } else if (filters.place) {
    add(gear.pots);
  }

  if (filters.objectif === "legumes") {
    add(gear.soil);
  } else if (filters.objectif === "aromatiques") {
    add(gear.herbs);
  } else if (filters.objectif === "fleurs") {
    add(gear.planters);
  } else if (filters.objectif === "facile") {
    add(gear.wateringCan);
  }

  if (filters.exposition === "soleil") {
    add(gear.ollas);
  }

  if (filters.vent === "fort") {
    add(gear.pots);
    add(gear.protection);
  }

  if (filters.objectif === "legumes") {
    add(gear.pots);
  } else if (filters.objectif === "aromatiques") {
    add(filters.place === "petit" ? gear.planters : gear.pots);
  } else if (filters.objectif === "fleurs") {
    add(gear.protection);
  } else if (filters.objectif === "facile") {
    add(gear.soil);
  }

  if (!picks.length) {
    add(gear.soil);
    add(gear.wateringCan);
  }

  if (picks.length < 3) {
    add(gear.wateringCan);
  }

  if (picks.length < 3) {
    add(gear.soil);
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
    <p class="gear-recommendations-intro">Ces choix suivent vos critères. L’idée reste de compléter seulement ce qui règle un vrai problème sur votre balcon.</p>
    <p class="gear-recommendations-disclosure">Liens affiliés Amazon. En tant que Partenaire Amazon, EcoBalcon peut recevoir une commission sur les achats éligibles.</p>
    <div class="gear-recommendation-grid">
      ${recommendations.map((item) => `
        <article class="gear-recommendation-card">
          <span>${item.badge}</span>
          <strong>${item.title}</strong>
          <p>${item.text}</p>
          <p><a href="${item.link}" target="_blank" rel="nofollow sponsored noopener noreferrer">${item.label}</a></p>
        </article>
      `).join("")}
    </div>
    <a class="gear-recommendations-guide" href="../articles/le-materiel-essentiel-pour-commencer/">Voir le guide matériel complet</a>
  `;
}

function getPlantText(plant) {
  return [
    plant.name,
    plant.difficulty,
    plant.harvest,
    plant.description,
    plant.tags.join(" "),
    plant.tips.join(" ")
  ].map((value) => (value || "").toString()).join(" ").toLowerCase();
}

function hasActiveLibrarySearch() {
  return Boolean(
    plantSearchEl.value.trim() ||
    libraryExposureEl.value ||
    libraryGoalEl.value ||
    libraryPotEl.value ||
    librarySeasonEl.value
  );
}

function renderPlantLibrary() {
  const query = plantSearchEl.value.trim().toLowerCase();
  const exposure = libraryExposureEl.value;
  const goal = libraryGoalEl.value;
  const potLimit = Number(libraryPotEl.value) || 0;
  const seasonOnly = librarySeasonEl.value === "now";

  plantLibraryEl.innerHTML = "";

  if (!hasActiveLibrarySearch()) {
    librarySummaryEl.textContent = "Lancez une recherche ou choisissez un filtre pour afficher les plantes adaptées.";
    return;
  }

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
      <div class="simulator-tags">${plant.tags.map((tag) => `<span class="simulator-tag">${tag}</span>`).join("")}</div>
      <div class="plant-library-meta">
        <span>Pot : ${plant.potLiters || "?"} L min.</span>
        <span>Difficulté : ${plant.difficulty || "à vérifier"}</span>
        <span>Récolte/floraison : ${plant.harvest || "selon saison"}</span>
        <span>Plantation : ${formatMonths(plant.months)}</span>
      </div>
      ${seasonBadge}
      <p>${plant.description}</p>
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
    runSimulation();
  }
}

function scrollToResultsPanel() {
  if (resultsPanelEl && typeof resultsPanelEl.scrollIntoView === "function" && window.matchMedia("(max-width: 960px)").matches) {
    resultsPanelEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function runSimulation(options) {
  const shouldScroll = Boolean(options && options.scroll);
  const filters = {
    exposition: expositionEl.value,
    vent: ventEl.value,
    place: placeEl.value,
    objectif: objectifEl.value
  };

  const selectedFilters = Object.values(filters).filter(Boolean).length;

  persistFilters(filters);
  emptyStateEl.style.display = "none";
  noteEl.style.display = "none";
  noteEl.textContent = "";
  renderGearRecommendations(null);

  if (!selectedFilters) {
    resultsEl.innerHTML = "";
    summaryEl.style.display = "block";
    summaryEl.textContent = "Choisissez au moins un critère pour lancer le simulateur.";
    noteEl.style.display = "block";
    noteEl.textContent = "Commencez par l'exposition : c'est souvent le repère le plus utile pour faire un premier tri sur un balcon.";
    diagnosticResultEl.textContent = "Lancez le simulateur pour obtenir un plan simple et adapté à votre balcon.";
    return;
  }

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
    noteEl.textContent = getFallbackAdvice(filters.exposition);
    diagnosticResultEl.innerHTML = getDiagnostic(filters, results);
    renderGearRecommendations(filters);
    if (shouldScroll) {
      scrollToResultsPanel();
    }
    return;
  }

  summaryEl.style.display = "block";
  summaryEl.textContent = buildSummary(filters, results);
  renderResults(results, filters);
  renderGearRecommendations(filters);
  diagnosticResultEl.innerHTML = getDiagnostic(filters, results);

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

function calculatePot() {
  const plant = getPlantByName(potPlantEl.value);

  if (!plant) {
    return;
  }

  const count = Math.max(1, Number(plantCountEl.value) || 1);
  const liters = Math.ceil((plant.potLiters || 5) * count);
  potResultEl.innerHTML = `<strong>${liters} L minimum</strong><br>${count > 1 ? "Pour plusieurs plants, séparez si possible les cultures gourmandes." : plant.harvest || "Choisissez un pot percé et stable."}`;
}

function calculateWaterRisk() {
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
runBtn.addEventListener("click", () => runSimulation({ scroll: true }));
resetBtn.addEventListener("click", resetSimulation);
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
