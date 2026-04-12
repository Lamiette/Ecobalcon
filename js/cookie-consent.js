(() => {
  const STORAGE_KEY = "ecobalcon_cookie_preferences_v1";
  const CONSENT_TTL_DAYS = 180;
  const STATIC_COOKIE_NAMES = [
    "_ga",
    "_gid",
    "_gat",
    "_gcl_au",
    "_clck",
    "_clsk",
    "CLID",
    "ANONCHK",
    "MR",
    "MUID",
    "SM"
  ];
  const COOKIE_PREFIXES = ["_ga_", "_cl"];
  const trackerScript = document.currentScript || document.querySelector('script[src*="cookie-consent.js"]');
  const sitePrefix = trackerScript?.dataset?.sitePrefix || "";
  const gtmId = trackerScript?.dataset?.gtmId || "";
  const gaMeasurementId = trackerScript?.dataset?.gaId || "";
  const clarityProjectId = trackerScript?.dataset?.clarityId || "";
  const canUseStorage = (() => {
    try {
      localStorage.setItem("__ecobalcon_cookie_test__", "1");
      localStorage.removeItem("__ecobalcon_cookie_test__");
      return true;
    } catch (error) {
      return false;
    }
  })();
  const state = {
    consent: null,
    trackersLoaded: false,
    ui: null
  };

  function readConsent() {
    if (!canUseStorage) {
      return null;
    }

    try {
      const rawValue = localStorage.getItem(STORAGE_KEY);
      if (!rawValue) {
        return null;
      }

      const parsed = JSON.parse(rawValue);
      if (!parsed || typeof parsed !== "object" || typeof parsed.audience !== "boolean" || !parsed.updatedAt) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }

      const timestamp = Date.parse(parsed.updatedAt);
      if (Number.isNaN(timestamp)) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }

      const maxAgeMs = CONSENT_TTL_DAYS * 24 * 60 * 60 * 1000;
      if ((Date.now() - timestamp) > maxAgeMs) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }

      return {
        audience: parsed.audience,
        updatedAt: parsed.updatedAt
      };
    } catch (error) {
      return null;
    }
  }

  function persistConsent(consent) {
    if (!canUseStorage) {
      return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      audience: Boolean(consent.audience),
      updatedAt: consent.updatedAt
    }));
  }

  function getPolicyUrl() {
    return `${sitePrefix}politique-confidentialite/`;
  }

  function getCookieDomainCandidates() {
    const hostname = window.location.hostname;
    const domains = new Set([""]);

    if (!hostname) {
      return Array.from(domains);
    }

    domains.add(hostname);
    domains.add(`.${hostname}`);

    const parts = hostname.split(".");
    for (let index = 0; index < parts.length - 1; index += 1) {
      const domain = parts.slice(index).join(".");
      domains.add(domain);
      domains.add(`.${domain}`);
    }

    return Array.from(domains);
  }

  function expireCookie(name) {
    const expires = "Thu, 01 Jan 1970 00:00:00 GMT";
    const domainCandidates = getCookieDomainCandidates();

    domainCandidates.forEach((domain) => {
      const domainPart = domain ? `; domain=${domain}` : "";
      document.cookie = `${name}=; expires=${expires}; path=/${domainPart}; SameSite=Lax`;
    });
  }

  function deleteAudienceCookies() {
    const existingNames = document.cookie
      .split(";")
      .map((entry) => entry.split("=")[0].trim())
      .filter(Boolean);

    const cookieNames = new Set([...STATIC_COOKIE_NAMES, ...existingNames]);

    cookieNames.forEach((name) => {
      const matchesStaticName = STATIC_COOKIE_NAMES.includes(name);
      const matchesPrefix = COOKIE_PREFIXES.some((prefix) => name.startsWith(prefix));

      if (matchesStaticName || matchesPrefix) {
        expireCookie(name);
      }
    });
  }

  function loadGtm() {
    if (!gtmId || document.getElementById("ecobalcon-gtm-loader")) {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "ecobalcon_cookie_consent_granted"
    });

    const script = document.createElement("script");
    script.id = "ecobalcon-gtm-loader";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
    document.head.appendChild(script);
  }

  function loadClarity() {
    if (!clarityProjectId || document.getElementById("ecobalcon-clarity-loader")) {
      return;
    }

    const script = document.createElement("script");
    script.id = "ecobalcon-clarity-loader";
    script.type = "text/javascript";
    script.text = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${clarityProjectId}");
    `;
    document.head.appendChild(script);
  }

  function enableAudienceMeasurement() {
    if (state.trackersLoaded) {
      return;
    }

    state.trackersLoaded = true;
    loadGtm();
    loadClarity();
  }

  function disableAudienceMeasurement(shouldReload) {
    if (gaMeasurementId) {
      window[`ga-disable-${gaMeasurementId}`] = true;
    }

    deleteAudienceCookies();

    if (shouldReload && state.trackersLoaded) {
      window.location.reload();
    }
  }

  function buildUi() {
    if (state.ui) {
      return state.ui;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "cookie-consent";
    wrapper.hidden = true;
    wrapper.innerHTML = `
      <section class="cookie-consent__surface" aria-labelledby="cookie-consent-title">
        <span class="cookie-consent__eyebrow">Cookies</span>
        <h2 class="cookie-consent__title" id="cookie-consent-title">Choisir les cookies</h2>
        <p class="cookie-consent__copy">
          EcoBalcon utilise uniquement les traceurs n&eacute;cessaires par d&eacute;faut.
          Avec votre accord, nous activons nos outils de mesure d'audience.
        </p>
        <div class="cookie-consent__actions">
          <button class="cookie-consent__action cookie-consent__action--reject" type="button" data-cookie-reject>Tout refuser</button>
          <button class="cookie-consent__action cookie-consent__action--accept" type="button" data-cookie-accept>Tout accepter</button>
          <button class="cookie-consent__action cookie-consent__action--customize" type="button" data-cookie-customize>Personnaliser</button>
        </div>
        <p class="cookie-consent__meta">
          Votre choix est m&eacute;moris&eacute; pendant 6 mois et peut &ecirc;tre modifi&eacute; &agrave; tout moment.
          <a href="${getPolicyUrl()}">En savoir plus</a>
        </p>
        <div class="cookie-consent__details" data-cookie-details hidden>
          <div class="cookie-consent__options">
            <div class="cookie-consent__option">
              <div>
                <strong>Cookies essentiels</strong>
                <p>N&eacute;cessaires au fonctionnement du site et &agrave; la m&eacute;morisation de votre choix.</p>
              </div>
              <span class="cookie-consent__status">Toujours actifs</span>
            </div>
            <div class="cookie-consent__option">
              <div>
                <strong>Mesure d'audience</strong>
                <p>Google Tag Manager, Google Analytics 4 et Microsoft Clarity, seulement apr&egrave;s consentement.</p>
              </div>
              <label class="cookie-switch" for="cookie-audience-toggle">
                <input id="cookie-audience-toggle" type="checkbox" data-cookie-audience>
                <span class="cookie-switch-track" aria-hidden="true"></span>
                <span class="sr-only">Activer la mesure d'audience</span>
              </label>
            </div>
          </div>
          <div class="cookie-consent__detail-actions">
            <button class="cookie-consent__save" type="button" data-cookie-save>Enregistrer mes choix</button>
            <button class="cookie-consent__ghost" type="button" data-cookie-save-reject>Tout refuser</button>
            <button class="cookie-consent__link" type="button" data-cookie-close>Fermer</button>
          </div>
        </div>
      </section>
    `;

    document.body.appendChild(wrapper);

    const ui = {
      wrapper,
      details: wrapper.querySelector("[data-cookie-details]"),
      audienceToggle: wrapper.querySelector("[data-cookie-audience]"),
      rejectButton: wrapper.querySelector("[data-cookie-reject]"),
      acceptButton: wrapper.querySelector("[data-cookie-accept]"),
      customizeButton: wrapper.querySelector("[data-cookie-customize]"),
      saveButton: wrapper.querySelector("[data-cookie-save]"),
      saveRejectButton: wrapper.querySelector("[data-cookie-save-reject]"),
      closeButton: wrapper.querySelector("[data-cookie-close]")
    };

    ui.rejectButton.addEventListener("click", () => saveConsent(false));
    ui.acceptButton.addEventListener("click", () => saveConsent(true));
    ui.customizeButton.addEventListener("click", () => toggleDetails(true));
    ui.saveButton.addEventListener("click", () => saveConsent(ui.audienceToggle.checked));
    ui.saveRejectButton.addEventListener("click", () => saveConsent(false));
    ui.closeButton.addEventListener("click", () => {
      if (!state.consent) {
        toggleDetails(false);
        return;
      }

      hideBanner();
    });

    state.ui = ui;
    syncUi();
    return ui;
  }

  function syncUi() {
    if (!state.ui) {
      return;
    }

    state.ui.audienceToggle.checked = Boolean(state.consent?.audience);
  }

  function toggleDetails(forceOpen) {
    const ui = buildUi();
    const shouldOpen = typeof forceOpen === "boolean" ? forceOpen : ui.details.hidden;
    ui.details.hidden = !shouldOpen;
  }

  function showBanner(openDetails) {
    const ui = buildUi();
    syncUi();
    ui.wrapper.hidden = false;
    toggleDetails(Boolean(openDetails));
  }

  function hideBanner() {
    if (!state.ui) {
      return;
    }

    state.ui.wrapper.hidden = true;
    state.ui.details.hidden = true;
  }

  function saveConsent(audience) {
    const hadLoadedTrackers = state.trackersLoaded;
    state.consent = {
      audience: Boolean(audience),
      updatedAt: new Date().toISOString()
    };

    persistConsent(state.consent);

    if (state.consent.audience) {
      enableAudienceMeasurement();
      hideBanner();
      return;
    }

    disableAudienceMeasurement(hadLoadedTrackers);
    hideBanner();
  }

  function ensureFooterButton() {
    const footerLinks = document.querySelector(".footer-links");
    if (!footerLinks || footerLinks.querySelector("[data-cookie-preferences-button]")) {
      return;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "footer-cookie-button";
    button.setAttribute("data-cookie-preferences-button", "");
    button.innerHTML = "G&eacute;rer mes cookies";
    button.addEventListener("click", () => showBanner(true));
    footerLinks.appendChild(button);
  }

  function init() {
    state.consent = readConsent();
    ensureFooterButton();
    buildUi();

    if (state.consent?.audience) {
      enableAudienceMeasurement();
      hideBanner();
      return;
    }

    if (state.consent) {
      hideBanner();
      return;
    }

    showBanner(false);
  }

  init();
})();
