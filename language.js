(function () {
  const STORAGE_KEY = "dueyama-profile-language";
  const pageLanguage = document.documentElement.lang.toLowerCase().startsWith("ja") ? "ja" : "en";

  function readStoredLanguage() {
    try {
      const value = window.localStorage.getItem(STORAGE_KEY);
      return value === "ja" || value === "en" ? value : null;
    } catch (_error) {
      return null;
    }
  }

  function browserLanguage() {
    const languages = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || ""];
    return languages.some((language) => language.toLowerCase().startsWith("ja")) ? "ja" : "en";
  }

  function isSearchCrawler() {
    const userAgent = navigator.userAgent || "";
    return /(?:bot|crawler|spider|crawling|Google-InspectionTool|GoogleOther)/i.test(userAgent);
  }

  function readUrlLanguage() {
    const value = new URLSearchParams(window.location.search).get("lang");
    return value === "ja" || value === "en" || value === "auto" ? value : null;
  }

  function storeLanguage(language) {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch (_error) {
      // Browser detection still works when localStorage is unavailable.
    }
  }

  const urlLanguage = readUrlLanguage();
  if (urlLanguage === "auto") {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (_error) {
      // Browser detection still works when localStorage is unavailable.
    }
  } else if (urlLanguage) {
    storeLanguage(urlLanguage);
  }

  // Each language has its own URL. Let crawlers read that URL's source language
  // instead of applying the browser-language redirect intended for visitors.
  if (!urlLanguage && isSearchCrawler()) return;

  const desiredLanguage =
    urlLanguage === "auto" ? browserLanguage() : urlLanguage || readStoredLanguage() || browserLanguage();

  if (desiredLanguage === pageLanguage) {
    if (urlLanguage && window.history.replaceState) {
      window.history.replaceState(null, "", window.location.pathname + window.location.hash);
    }
    return;
  }

  const target = desiredLanguage === "en" ? "en/" : "../";
  window.location.replace(target + window.location.hash);
})();
