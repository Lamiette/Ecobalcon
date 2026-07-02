(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
  const searchInput = document.getElementById("article-search");
  const articleCards = Array.from(document.querySelectorAll("#article-list .article-card"));
  const themeFilterList = document.getElementById("article-theme-filters");
  const articleListActions = document.getElementById("article-list-actions");
  const articleListToggle = document.getElementById("article-list-toggle");
  const emptyState = document.getElementById("search-empty");
  const currentUrl = new URL(window.location.href);
  const currentHashParams = new URLSearchParams(currentUrl.hash.startsWith("#") ? currentUrl.hash.slice(1) : "");
  const currentPath = currentUrl.pathname;
  const previewRowStep = 2;
  let visibleRowCount = previewRowStep;
  let articleListFullyRevealed = false;
  let previewRefreshFrame = 0;
  let activeTheme = "all";

  const initReveal = () => {
    if (!revealItems.length) {
      return;
    }

    if (reduceMotion) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    document.body.classList.add("reveal-ready");

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.12
    });

    revealItems.forEach((item) => observer.observe(item));
  };

  const normalizeText = (value) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const slugifyTheme = (value) =>
    normalizeText(value)
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const getSearchTokens = (value) =>
    normalizeText(value)
      .split(/\s+/)
      .filter(Boolean);

  const getCardThemeLabel = (card) => {
    const themePill = card.querySelector(".pill");
    return themePill ? themePill.textContent.trim() : "";
  };

  const getCardTitleText = (card) => {
    const titleLink = card.querySelector("h3 a");
    return titleLink ? normalizeText(titleLink.textContent) : "";
  };

  const resetArticlePreview = () => {
    visibleRowCount = previewRowStep;
    articleListFullyRevealed = false;
  };

  const articleThemeOptions = [
    { slug: "all", label: "Tous" },
    { slug: "fiches-techniques", label: "Fiches Techniques" },
    { slug: "plantes-semis", label: "Plantes & semis" },
    { slug: "entretien-astuces", label: "Entretien & astuces" },
    { slug: "amenagement-du-balcon", label: "Aménagement du balcon" }
  ];

  articleCards.forEach((card) => {
    const themeLabel = getCardThemeLabel(card);
    const themeSlug = slugifyTheme(themeLabel);
    const themePill = card.querySelector(".pill");

    if (themeSlug === "") {
      return;
    }

    card.dataset.theme = themeSlug;

    if (themePill) {
      themePill.dataset.themeFilter = themeSlug;
      themePill.classList.add("pill-filter-trigger");
      themePill.setAttribute("role", "button");
      themePill.tabIndex = 0;
      themePill.setAttribute("aria-label", "Afficher les articles du thème " + themeLabel);
    }
  });

  const themeButtonsBySlug = new Map();

  articleThemeOptions.forEach((themeOption) => {
    const themeButton = document.createElement("button");
    themeButton.type = "button";
    themeButton.className = "theme-filter-button";
    themeButton.dataset.themeFilter = themeOption.slug;
    themeButton.textContent = themeOption.label;
    themeButton.setAttribute("aria-pressed", "false");
    themeFilterList.appendChild(themeButton);
    themeButtonsBySlug.set(themeOption.slug, themeButton);
  });

  const themeFilterButtons = Array.from(themeButtonsBySlug.values());

  const updateThemeFilterButtons = () => {
    themeFilterButtons.forEach((button) => {
      const isActive = button.dataset.themeFilter === activeTheme;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  };

  const getMatchedCards = () => articleCards.filter((card) => !card.hidden);

  const updateArticlePreview = () => {
    const matchedCards = getMatchedCards();
    const hasSearchQuery = searchInput.value.trim() !== "";
    let rowIndex = 0;
    let lastRowTop = null;
    let hiddenCount = 0;

    articleCards.forEach((card) => {
      card.classList.remove("article-card-collapsed");
    });

    if (matchedCards.length === 0 || articleListFullyRevealed || hasSearchQuery) {
      articleListActions.hidden = true;
      articleListToggle.setAttribute("aria-expanded", String(articleListFullyRevealed || hasSearchQuery));
      return;
    }

    matchedCards.forEach((card) => {
      const cardTop = Math.round(card.offsetTop);

      if (lastRowTop === null || Math.abs(cardTop - lastRowTop) > 1) {
        rowIndex += 1;
        lastRowTop = cardTop;
      }

      const shouldCollapse = rowIndex > visibleRowCount;
      card.classList.toggle("article-card-collapsed", shouldCollapse);

      if (shouldCollapse) {
        hiddenCount += 1;
      }
    });

    articleListFullyRevealed = hiddenCount === 0;
    articleListActions.hidden = articleListFullyRevealed;
    articleListToggle.setAttribute("aria-expanded", String(articleListFullyRevealed));
  };

  const requestArticlePreviewRefresh = () => {
    if (previewRefreshFrame !== 0) {
      window.cancelAnimationFrame(previewRefreshFrame);
    }

    previewRefreshFrame = window.requestAnimationFrame(() => {
      previewRefreshFrame = 0;
      updateArticlePreview();
    });
  };

  const syncFilterParams = () => {
    const rawQuery = searchInput.value.trim();
    const nextHashParams = new URLSearchParams();

    if (rawQuery !== "") {
      nextHashParams.set("q", rawQuery);
    }

    if (activeTheme !== "all") {
      nextHashParams.set("theme", activeTheme);
    }

    const nextHash = nextHashParams.toString();
    window.history.replaceState({}, "", currentPath + (nextHash ? "#" + nextHash : ""));
  };

  const filterArticles = () => {
    const queryTokens = getSearchTokens(searchInput.value.trim());
    let visibleCount = 0;

    articleCards.forEach((card) => {
      const searchableTitle = getCardTitleText(card);
      const matchesTheme = activeTheme === "all" || card.dataset.theme === activeTheme;
      const matchesQuery = queryTokens.length === 0 || queryTokens.every((token) => searchableTitle.includes(token));
      const matches = matchesTheme && matchesQuery;
      card.hidden = !matches;

      if (matches) {
        visibleCount += 1;
      }
    });

    emptyState.hidden = visibleCount !== 0;
    requestArticlePreviewRefresh();
  };

  const applyThemeFilter = (themeSlug) => {
    if (!themeButtonsBySlug.has(themeSlug)) {
      return;
    }

    activeTheme = themeSlug;
    resetArticlePreview();
    updateThemeFilterButtons();
    filterArticles();
    syncFilterParams();
  };

  const initialQuery = currentHashParams.get("q") ?? currentUrl.searchParams.get("q");
  const initialTheme = currentHashParams.get("theme") ?? currentUrl.searchParams.get("theme");

  if (initialQuery) {
    searchInput.value = initialQuery;
  }

  if (initialTheme && themeButtonsBySlug.has(initialTheme)) {
    activeTheme = initialTheme;
  }

  updateThemeFilterButtons();
  filterArticles();
  initReveal();

  searchInput.addEventListener("input", () => {
    resetArticlePreview();
    filterArticles();
    syncFilterParams();
  });

  themeFilterList.addEventListener("click", (event) => {
    const targetButton = event.target.closest("[data-theme-filter]");

    if (!targetButton) {
      return;
    }

    applyThemeFilter(targetButton.dataset.themeFilter);
  });

  document.addEventListener("click", (event) => {
    const targetPill = event.target.closest("#article-list .pill-filter-trigger");

    if (!targetPill) {
      return;
    }

    applyThemeFilter(targetPill.dataset.themeFilter);
  });

  document.addEventListener("keydown", (event) => {
    const targetPill = event.target.closest("#article-list .pill-filter-trigger");

    if (!targetPill || (event.key !== "Enter" && event.key !== " ")) {
      return;
    }

    event.preventDefault();
    applyThemeFilter(targetPill.dataset.themeFilter);
  });

  articleListToggle.addEventListener("click", () => {
    visibleRowCount += previewRowStep;
    requestArticlePreviewRefresh();
  });

  window.addEventListener("resize", requestArticlePreviewRefresh);
  window.addEventListener("load", requestArticlePreviewRefresh, { once: true });
})();
