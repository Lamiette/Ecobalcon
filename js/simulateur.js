const plants = window.EcoBalconPlants || [
  {
    name: "Basilic",
    exposure: ["soleil", "mi-ombre"],
    wind: ["abrite", "modere"],
    space: ["petit", "moyen", "grand"],
    goals: ["aromatiques", "facile"],
    tags: ["Aromatique", "Facile", "Pot"],
    description: "Une valeur s&ucirc;re sur balcon si vous avez de la lumi&egrave;re et des arrosages r&eacute;guliers.",
    tips: ["Arrosez d&egrave;s que la surface s&egrave;che", "Pincez les tiges pour le faire ramifier"]
  },
  {
    name: "Menthe",
    exposure: ["mi-ombre", "ombre"],
    wind: ["abrite", "modere"],
    space: ["petit", "moyen", "grand"],
    goals: ["aromatiques", "facile"],
    tags: ["Aromatique", "Tol&egrave;re l'ombre", "Vigoureuse"],
    description: "Tr&egrave;s simple &agrave; cultiver, id&eacute;ale pour un balcon moins ensoleill&eacute;.",
    tips: ["Gardez-la en pot s&eacute;par&eacute;", "Arrosez r&eacute;guli&egrave;rement en &eacute;t&eacute;"]
  },
  {
    name: "Persil",
    exposure: ["mi-ombre", "ombre"],
    wind: ["abrite", "modere", "fort"],
    space: ["petit", "moyen", "grand"],
    goals: ["aromatiques", "facile"],
    tags: ["Aromatique", "Compact", "D&eacute;butant"],
    description: "Une bonne option pour les petits espaces et les expositions douces.",
    tips: ["Semez ou achetez un plant d&eacute;j&agrave; form&eacute;", "Coupez les tiges ext&eacute;rieures en priorit&eacute;"]
  },
  {
    name: "Tomate cerise",
    exposure: ["soleil"],
    wind: ["abrite", "modere"],
    space: ["moyen", "grand"],
    goals: ["legumes"],
    tags: ["L&eacute;gume", "Productif", "Soleil"],
    description: "Tr&egrave;s int&eacute;ressante en balcon ensoleill&eacute; avec un pot profond et un tuteur.",
    tips: ["Utilisez un grand pot", "Arrosez r&eacute;guli&egrave;rement sans d&eacute;tremper"]
  },
  {
    name: "Fraisier",
    exposure: ["soleil", "mi-ombre"],
    wind: ["abrite", "modere"],
    space: ["petit", "moyen", "grand"],
    goals: ["legumes", "facile"],
    tags: ["Fruit", "Petit espace", "Accessible"],
    description: "Un classique facile &agrave; placer en jardini&egrave;re ou en suspension.",
    tips: ["Retirez les feuilles ab&icirc;m&eacute;es", "Apportez un peu d'engrais en saison"]
  },
  {
    name: "Radis",
    exposure: ["soleil", "mi-ombre"],
    wind: ["abrite", "modere", "fort"],
    space: ["petit", "moyen", "grand"],
    goals: ["legumes", "facile"],
    tags: ["L&eacute;gume", "Rapide", "D&eacute;butant"],
    description: "Pratique pour d&eacute;buter : pousse vite et demande peu de place.",
    tips: ["Semez peu mais souvent", "&Eacute;claircissez si les semis sont serr&eacute;s"]
  },
  {
    name: "Laitue &agrave; couper",
    exposure: ["mi-ombre", "soleil"],
    wind: ["abrite", "modere"],
    space: ["petit", "moyen", "grand"],
    goals: ["legumes", "facile"],
    tags: ["L&eacute;gume", "Petit espace", "Simple"],
    description: "Tr&egrave;s bien pour r&eacute;colter au fil des besoins sans gros mat&eacute;riel.",
    tips: ["&Eacute;vitez les fortes chaleurs sans arrosage", "R&eacute;coltez feuille par feuille"]
  },
  {
    name: "G&eacute;ranium",
    exposure: ["soleil", "mi-ombre"],
    wind: ["abrite", "modere", "fort"],
    space: ["petit", "moyen", "grand"],
    goals: ["fleurs", "facile"],
    tags: ["Fleur", "Robuste", "Balcon"],
    description: "Une plante tr&egrave;s classique de balcon, florif&egrave;re et assez tol&eacute;rante.",
    tips: ["Retirez les fleurs fan&eacute;es", "Arrosez plus souvent pendant les fortes chaleurs"]
  },
  {
    name: "P&eacute;tunia",
    exposure: ["soleil"],
    wind: ["abrite", "modere"],
    space: ["petit", "moyen", "grand"],
    goals: ["fleurs"],
    tags: ["Fleur", "Tr&egrave;s florif&egrave;re", "Suspension"],
    description: "Parfait pour donner rapidement un effet g&eacute;n&eacute;reux et color&eacute;.",
    tips: ["Supprimez les fleurs fan&eacute;es", "Nourrissez un peu en p&eacute;riode de floraison"]
  },
  {
    name: "B&eacute;gonia",
    exposure: ["mi-ombre", "ombre"],
    wind: ["abrite", "modere"],
    space: ["petit", "moyen", "grand"],
    goals: ["fleurs", "facile"],
    tags: ["Fleur", "Ombre", "D&eacute;coratif"],
    description: "Tr&egrave;s utile pour fleurir un balcon lumineux mais sans soleil br&ucirc;lant.",
    tips: ["&Eacute;vitez l'exc&egrave;s d'eau stagnante", "Placez-le &agrave; l'abri du soleil de midi"]
  },
  {
    name: "Lavande",
    exposure: ["soleil"],
    wind: ["abrite", "modere", "fort"],
    space: ["moyen", "grand"],
    goals: ["fleurs", "facile", "aromatiques"],
    tags: ["M&eacute;diterran&eacute;enne", "Soleil", "Peu d'eau"],
    description: "Excellente en plein soleil, surtout sur balcon chaud et bien drain&eacute;.",
    tips: ["Choisissez un substrat drainant", "Arrosez sans exc&egrave;s"]
  },
  {
    name: "Ciboulette",
    exposure: ["soleil", "mi-ombre"],
    wind: ["abrite", "modere", "fort"],
    space: ["petit", "moyen", "grand"],
    goals: ["aromatiques", "facile"],
    tags: ["Aromatique", "Tr&egrave;s simple", "Compacte"],
    description: "Une des aromatiques les plus faciles &agrave; garder en pot.",
    tips: ["Coupez r&eacute;guli&egrave;rement pour stimuler la repousse", "Divisez la touffe si elle grossit"]
  },
  {
    name: "Thym",
    exposure: ["soleil"],
    wind: ["abrite", "modere", "fort"],
    space: ["petit", "moyen", "grand"],
    goals: ["aromatiques", "facile"],
    tags: ["Aromatique", "Soleil", "Peu d'eau"],
    description: "Une aromatique sobre et tr&egrave;s adapt&eacute;e aux balcons lumineux et bien drain&eacute;s.",
    tips: ["Arrosez avec mod&eacute;ration", "Taillez l&eacute;g&egrave;rement apr&egrave;s la floraison"]
  },
  {
    name: "Romarin",
    exposure: ["soleil"],
    wind: ["abrite", "modere", "fort"],
    space: ["moyen", "grand"],
    goals: ["aromatiques", "facile"],
    tags: ["Aromatique", "M&eacute;diterran&eacute;enne", "Robuste"],
    description: "Parfait pour les balcons ensoleill&eacute;s si le pot est assez profond et drainant.",
    tips: ["Placez-le dans un substrat l&eacute;ger", "&Eacute;vitez les arrosages trop fr&eacute;quents"]
  },
  {
    name: "Origan",
    exposure: ["soleil", "mi-ombre"],
    wind: ["abrite", "modere", "fort"],
    space: ["petit", "moyen", "grand"],
    goals: ["aromatiques", "facile"],
    tags: ["Aromatique", "Compact", "Cuisine"],
    description: "Une aromatique tr&egrave;s simple qui pousse bien en jardini&egrave;re ou en petit pot.",
    tips: ["Pincez les extr&eacute;mit&eacute;s pour densifier", "Laissez s&eacute;cher la surface entre deux arrosages"]
  },
  {
    name: "Sauge",
    exposure: ["soleil"],
    wind: ["abrite", "modere", "fort"],
    space: ["moyen", "grand"],
    goals: ["aromatiques", "facile"],
    tags: ["Aromatique", "Soleil", "Durable"],
    description: "Une plante parfum&eacute;e, robuste et bien adapt&eacute;e aux expositions chaudes.",
    tips: ["&Eacute;vitez l'exc&egrave;s d'eau", "Taillez un peu au printemps pour garder une forme compacte"]
  },
  {
    name: "Coriandre",
    exposure: ["soleil", "mi-ombre"],
    wind: ["abrite", "modere"],
    space: ["petit", "moyen", "grand"],
    goals: ["aromatiques"],
    tags: ["Aromatique", "Fra&icirc;che", "Cuisine"],
    description: "Int&eacute;ressante pour les balcons doux ou l&eacute;g&egrave;rement ombrag&eacute;s, surtout hors grosse chaleur.",
    tips: ["Semez en petites quantit&eacute;s successives", "Gardez le terreau frais sans l'alourdir"]
  },
  {
    name: "Poivron",
    exposure: ["soleil"],
    wind: ["abrite", "modere"],
    space: ["moyen", "grand"],
    goals: ["legumes"],
    tags: ["L&eacute;gume", "Soleil", "Pot profond"],
    description: "Un bon choix sur balcon chaud et lumineux, avec un contenant stable et profond.",
    tips: ["Pr&eacute;voyez un pot assez grand", "Maintenez une humidit&eacute; r&eacute;guli&egrave;re en &eacute;t&eacute;"]
  },
  {
    name: "Épinard",
    exposure: ["mi-ombre", "soleil"],
    wind: ["abrite", "modere"],
    space: ["petit", "moyen", "grand"],
    goals: ["legumes", "facile"],
    tags: ["L&eacute;gume", "Feuilles", "Mi-ombre"],
    description: "Tr&egrave;s utile pour les balcons peu br&ucirc;lants, surtout au printemps et en automne.",
    tips: ["Semez dans un terreau frais", "R&eacute;coltez les feuilles au fur et &agrave; mesure"]
  },
  {
    name: "Roquette",
    exposure: ["soleil", "mi-ombre"],
    wind: ["abrite", "modere", "fort"],
    space: ["petit", "moyen", "grand"],
    goals: ["legumes", "facile"],
    tags: ["L&eacute;gume", "Rapide", "Coupe"],
    description: "Une culture tr&egrave;s pratique pour r&eacute;colter vite sans prendre beaucoup de place.",
    tips: ["Semez peu mais souvent", "R&eacute;coltez jeune pour garder des feuilles tendres"]
  },
  {
    name: "Haricot nain",
    exposure: ["soleil"],
    wind: ["abrite", "modere"],
    space: ["moyen", "grand"],
    goals: ["legumes"],
    tags: ["L&eacute;gume", "Et&eacute;", "Productif"],
    description: "Une option int&eacute;ressante pour produire sur balcon sans avoir besoin d'une grande hauteur.",
    tips: ["Semez quand les temp&eacute;ratures sont bien douces", "Arrosez r&eacute;guli&egrave;rement pendant la floraison"]
  },
  {
    name: "Pois nain",
    exposure: ["soleil", "mi-ombre"],
    wind: ["abrite", "modere"],
    space: ["moyen", "grand"],
    goals: ["legumes", "facile"],
    tags: ["L&eacute;gume", "Printemps", "Accessible"],
    description: "Adapt&eacute; aux balcons frais de d&eacute;but de saison, avec un petit support si besoin.",
    tips: ["Semez t&ocirc;t dans la saison", "Aidez les tiges &agrave; grimper si n&eacute;cessaire"]
  },
  {
    name: "Blette",
    exposure: ["soleil", "mi-ombre"],
    wind: ["abrite", "modere", "fort"],
    space: ["moyen", "grand"],
    goals: ["legumes", "facile"],
    tags: ["L&eacute;gume", "Feuillage", "Longue r&eacute;colte"],
    description: "Une plante g&eacute;n&eacute;reuse qui tient bien en bac et permet des r&eacute;coltes prolong&eacute;es.",
    tips: ["Coupez les grandes feuilles ext&eacute;rieures en premier", "Gardez un pot assez profond"]
  },
  {
    name: "Capucine",
    exposure: ["soleil", "mi-ombre"],
    wind: ["abrite", "modere"],
    space: ["moyen", "grand"],
    goals: ["fleurs", "facile"],
    tags: ["Fleur", "Comestible", "Balcon"],
    description: "Une fleur facile et g&eacute;n&eacute;reuse qui apporte vite de la couleur sur balcon.",
    tips: ["&Eacute;vitez les pots trop riches en engrais", "Palissez l&eacute;g&egrave;rement si elle s'allonge"]
  },
  {
    name: "Souci",
    exposure: ["soleil", "mi-ombre"],
    wind: ["abrite", "modere", "fort"],
    space: ["petit", "moyen", "grand"],
    goals: ["fleurs", "facile"],
    tags: ["Fleur", "Rustique", "Mellif&egrave;re"],
    description: "Une fleur simple &agrave; vivre, pratique pour un balcon fleuri et assez tol&eacute;rant.",
    tips: ["Retirez les fleurs fan&eacute;es pour prolonger la floraison", "Semez ou replantez facilement au printemps"]
  },
  {
    name: "Impatiens",
    exposure: ["mi-ombre", "ombre"],
    wind: ["abrite", "modere"],
    space: ["petit", "moyen", "grand"],
    goals: ["fleurs", "facile"],
    tags: ["Fleur", "Ombre", "Tr&egrave;s simple"],
    description: "Une valeur s&ucirc;re pour donner vite de la couleur sur un balcon peu ensoleill&eacute;.",
    tips: ["Gardez le terreau frais en p&eacute;riode chaude", "Supprimez les tiges ab&icirc;m&eacute;es au fur et &agrave; mesure"]
  },
  {
    name: "Fuchsia",
    exposure: ["mi-ombre", "ombre"],
    wind: ["abrite", "modere"],
    space: ["petit", "moyen", "grand"],
    goals: ["fleurs"],
    tags: ["Fleur", "Ombre", "Retombant"],
    description: "Tr&egrave;s d&eacute;coratif en suspension ou en pot, surtout sur balcon lumineux sans soleil fort.",
    tips: ["&Eacute;vitez les expositions tr&egrave;s chaudes", "Arrosez d&egrave;s que le m&eacute;lange s&egrave;che en surface"]
  }
];

const labels = {
  exposition: {
    soleil: "plein soleil",
    "mi-ombre": "mi-ombre",
    ombre: "ombre"
  },
  vent: {
    abrite: "balcon abrit&eacute;",
    modere: "balcon un peu expos&eacute;",
    fort: "balcon tr&egrave;s expos&eacute; au vent"
  },
  place: {
    petit: "petit espace",
    moyen: "espace moyen",
    grand: "balcon spacieux"
  },
  objectif: {
    aromatiques: "des aromatiques",
    legumes: "des l&eacute;gumes utiles",
    fleurs: "un rendu fleuri",
    facile: "quelque chose de tr&egrave;s simple"
  }
};

const expositionEl = document.getElementById("exposition");
const ventEl = document.getElementById("vent");
const placeEl = document.getElementById("place");
const objectifEl = document.getElementById("objectif");
const resultsEl = document.getElementById("results");
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
  "Laitue \u00e0 couper": "../articles/guide-laitues-sur-son-balcon/",
  "Laitue à couper": "../articles/guide-laitues-sur-son-balcon/",
  "Poivron": "../articles/guide-poivrons-sur-son-balcon/",
  "Épinard": "../articles/guide-epinards-sur-son-balcon/"
};

function decodeHtml(value) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = value;
  return textarea.value;
}

function buildSummary(filters, count) {
  const parts = [];

  if (filters.exposition) {
    parts.push(decodeHtml(labels.exposition[filters.exposition]));
  }
  if (filters.vent) {
    parts.push(decodeHtml(labels.vent[filters.vent]));
  }
  if (filters.place) {
    parts.push(decodeHtml(labels.place[filters.place]));
  }
  if (filters.objectif) {
    parts.push(decodeHtml(labels.objectif[filters.objectif]));
  }

  const sentence = parts.length ? parts.join(" \u00b7 ") : "vos crit\u00e8res";
  return `${count} suggestion${count > 1 ? "s" : ""} trouv\u00e9e${count > 1 ? "s" : ""} pour ${sentence}.`;
}

function getFallbackAdvice(exposition) {
  if (exposition === "soleil") {
    return "Votre balcon semble tr\u00e8s ensoleill\u00e9 : commencez avec lavande, g\u00e9ranium, ciboulette ou fraisier si vous voulez quelque chose d'accessible.";
  }

  if (exposition === "ombre") {
    return "Avec peu de soleil direct, privil\u00e9giez des plantes comme la menthe, le persil ou le b\u00e9gonia, g\u00e9n\u00e9ralement plus tol\u00e9rantes \u00e0 l'ombre.";
  }

  return "Avec une exposition interm\u00e9diaire, essayez des plantes polyvalentes comme fraisier, basilic, ciboulette ou g\u00e9ranium.";
}

function getDiagnostic(filters, results) {
  const first = results[0];
  const potNeed = first && first.potLiters ? `${first.potLiters} L minimum pour ${first.name}` : "un volume de pot adapté à la culture principale";
  const waterLevel = filters.exposition === "soleil" || filters.vent === "fort" ? "priorité forte à l'arrosage régulier et au paillage" : "arrosage à surveiller sans saturer le terreau";
  const spaceAdvice = filters.place === "petit" ? "limitez-vous à 3 ou 4 pots vraiment utiles" : "organisez les grands pots au fond et les cultures rapides devant";
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
      <li><strong>Organisation :</strong> ${spaceAdvice}.</li>
      <li><strong>Prochaine lecture :</strong> <a href="${nextGuide}">ouvrir le guide le plus utile</a>.</li>
    </ul>
  `;
}

function renderResults(plantsToShow) {
  resultsEl.innerHTML = "";

  plantsToShow.forEach((plant) => {
    const article = document.createElement("article");
    article.className = "simulator-result";
    const plantName = decodeHtml(plant.name);
    const guide = plantArticles[plantName];
    article.innerHTML = `
      <h4>${plant.name}</h4>
      <div class="simulator-tags">${plant.tags.map((tag) => `<span class="simulator-tag">${tag}</span>`).join("")}</div>
      <p>${plant.description}</p>
      <ul class="simulator-tips">${plant.tips.map((tip) => `<li>${tip}</li>`).join("")}</ul>
      ${guide ? `<a class="simulator-guide-link" href="${guide}" aria-label="Voir le guide d&eacute;di&eacute; pour ${plant.name}">Voir le guide d&eacute;di&eacute;</a>` : ""}
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
  ].map((value) => decodeHtml(value || "")).join(" ").toLowerCase();
}

function hasActiveLibrarySearch() {
  return Boolean(
    plantSearchEl.value.trim() ||
    libraryExposureEl.value ||
    libraryGoalEl.value ||
    libraryPotEl.value
  );
}

function renderPlantLibrary() {
  const query = plantSearchEl.value.trim().toLowerCase();
  const exposure = libraryExposureEl.value;
  const goal = libraryGoalEl.value;
  const potLimit = Number(libraryPotEl.value) || 0;

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
    .sort((left, right) => decodeHtml(left.name).localeCompare(decodeHtml(right.name), "fr"));

  librarySummaryEl.textContent = `${matches.length} plante${matches.length > 1 ? "s" : ""} affichée${matches.length > 1 ? "s" : ""}.`;

  if (!matches.length) {
    librarySummaryEl.textContent = "Aucune plante ne correspond à ces critères. Essayez un filtre moins strict.";
    return;
  }

  matches.forEach((plant) => {
    const card = document.createElement("article");
    card.className = "plant-library-card";
    const name = decodeHtml(plant.name);
    const guide = plantArticles[name];
    card.innerHTML = `
      <h3>${plant.name}</h3>
      <div class="simulator-tags">${plant.tags.map((tag) => `<span class="simulator-tag">${tag}</span>`).join("")}</div>
      <div class="plant-library-meta">
        <span>Pot : ${plant.potLiters || "?"} L min.</span>
        <span>Difficulté : ${plant.difficulty || "à vérifier"}</span>
        <span>Récolte/floraison : ${plant.harvest || "selon saison"}</span>
      </div>
      <p>${plant.description}</p>
      ${guide ? `<a class="simulator-guide-link" href="${guide}">Lire le guide</a>` : ""}
    `;
    plantLibraryEl.appendChild(card);
  });
}

function runSimulation() {
  const filters = {
    exposition: expositionEl.value,
    vent: ventEl.value,
    place: placeEl.value,
    objectif: objectifEl.value
  };

  const selectedFilters = Object.values(filters).filter(Boolean).length;

  emptyStateEl.style.display = "none";
  noteEl.style.display = "none";
  noteEl.textContent = "";
  renderGearRecommendations(null);

  if (!selectedFilters) {
    resultsEl.innerHTML = "";
    summaryEl.style.display = "block";
    summaryEl.textContent = "Choisissez au moins un crit\u00e8re pour lancer le simulateur.";
    noteEl.style.display = "block";
    noteEl.textContent = "Commencez par l'exposition : c'est souvent le rep\u00e8re le plus utile pour faire un premier tri sur un balcon.";
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

      return { plant, score };
    })
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return decodeHtml(left.plant.name).localeCompare(decodeHtml(right.plant.name), "fr");
    })
    .slice(0, 8)
    .map((item) => item.plant);

  if (!results.length) {
    resultsEl.innerHTML = "";
    summaryEl.style.display = "block";
    summaryEl.textContent = "Aucune correspondance directe avec cette combinaison de crit\u00e8res.";
    noteEl.style.display = "block";
    noteEl.textContent = getFallbackAdvice(filters.exposition);
    diagnosticResultEl.innerHTML = getDiagnostic(filters, results);
    renderGearRecommendations(filters);
    return;
  }

  summaryEl.style.display = "block";
  summaryEl.textContent = buildSummary(filters, results.length);
  renderResults(results);
  renderGearRecommendations(filters);
  diagnosticResultEl.innerHTML = getDiagnostic(filters, results);

  if (filters.vent === "fort") {
    noteEl.style.display = "block";
    noteEl.textContent = "Balcon venteux : choisissez des pots assez lourds, \u00e9vitez les plantes trop fragiles et surveillez le dess\u00e8chement du terreau.";
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
}

function hydratePlantTools() {
  plants
    .slice()
    .sort((left, right) => decodeHtml(left.name).localeCompare(decodeHtml(right.name), "fr"))
    .forEach((plant) => {
      const option = document.createElement("option");
      option.value = decodeHtml(plant.name);
      option.textContent = decodeHtml(plant.name);
      potPlantEl.appendChild(option);

      const absenceOption = document.createElement("option");
      absenceOption.value = decodeHtml(plant.name);
      absenceOption.textContent = decodeHtml(plant.name);
      absencePlantEl.appendChild(absenceOption);
    });
}

function getPlantByName(name) {
  return plants.find((plant) => decodeHtml(plant.name) === name) || plants[0];
}

function calculatePot() {
  const plant = getPlantByName(potPlantEl.value);
  const count = Math.max(1, Number(plantCountEl.value) || 1);
  const liters = Math.ceil((plant.potLiters || 5) * count);
  potResultEl.innerHTML = `<strong>${liters} L minimum</strong><br>${count > 1 ? "Pour plusieurs plants, séparez si possible les cultures gourmandes." : plant.harvest || "Choisissez un pot percé et stable."}`;
}

function calculateWaterRisk() {
  const days = Math.max(1, Number(absenceDaysEl.value) || 1);
  const heat = heatLevelEl.value;
  const plant = getPlantByName(absencePlantEl.value);
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
runBtn.addEventListener("click", runSimulation);
resetBtn.addEventListener("click", resetSimulation);
potCalcBtn.addEventListener("click", calculatePot);
waterCalcBtn.addEventListener("click", calculateWaterRisk);
compostCalcBtn.addEventListener("click", calculateCompost);
[plantSearchEl, libraryExposureEl, libraryGoalEl, libraryPotEl].forEach((element) => {
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
