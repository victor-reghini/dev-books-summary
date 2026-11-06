import { initTheme, toggleTheme, updateThemeButton } from "./components/theme.js";
import { renderSidebar } from "./components/sidebar.js";
import { handleRoute } from "./components/router.js";
import { initStickyNav } from "./utils/sticky-nav.js";
import { getLang, setLang, t, SUPPORTED_LANGS } from "../books/design-patterns/explanations/i18n.js";

function updateStaticChromeLabels() {
  const lang = getLang();
  document.documentElement.lang = lang === "pt" ? "pt-BR" : lang;

  const currentMeta = SUPPORTED_LANGS.find((l) => l.code === lang) || SUPPORTED_LANGS[0];
  const flagEl = document.getElementById("current-lang-flag");
  const codeEl = document.getElementById("current-lang-code");
  if (flagEl) flagEl.textContent = currentMeta.flag || "🇧🇷";
  if (codeEl) codeEl.textContent = currentMeta.short || "PT";

  document.querySelectorAll(".lang-menu-item").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
  });
}

function initMobileSidebar() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const sidebar = document.getElementById("app-sidebar");
  const backdrop = document.getElementById("sidebar-backdrop");

  if (!menuBtn || !sidebar || !backdrop) return;

  function closeSidebar() {
    sidebar.classList.remove("mobile-open", "open");
    backdrop.classList.remove("visible");
  }

  menuBtn.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("mobile-open");
    sidebar.classList.toggle("open", isOpen);
    backdrop.classList.toggle("visible", isOpen);
  });

  backdrop.addEventListener("click", closeSidebar);

  sidebar.addEventListener("click", (e) => {
    if (e.target.closest("a.sidebar-link") || e.target.closest("a.sidebar-item")) {
      closeSidebar();
    }
  });
}

function initLanguageSwitcher() {
  const container = document.getElementById("lang-dropdown-container");
  const trigger = document.getElementById("lang-dropdown-trigger");
  if (!container || !trigger) return;

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = container.classList.toggle("is-open");
    trigger.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".lang-menu-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const nextLang = btn.getAttribute("data-lang");
      setLang(nextLang);
      container.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
      updateStaticChromeLabels();
      updateThemeButton();
      const sidebar = document.getElementById("app-sidebar");
      const content = document.getElementById("main-content-area");
      renderSidebar(sidebar, window.location.hash || "#/");
      handleRoute(content);
    });
  });

  document.addEventListener("click", (e) => {
    if (!container.contains(e.target)) {
      container.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && container.classList.contains("is-open")) {
      container.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
      trigger.focus();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateStaticChromeLabels();
  initTheme();
  initMobileSidebar();
  initLanguageSwitcher();

  const themeBtn = document.getElementById("theme-toggle-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      toggleTheme();
    });
  }

  const sidebar = document.getElementById("app-sidebar");
  const contentArea = document.getElementById("main-content-area");

  function onRouteChange() {
    const hash = window.location.hash || "#/";
    renderSidebar(sidebar, hash);
    handleRoute(contentArea);
    contentArea.querySelectorAll(".pe-section-jump-nav, .pe-catalog-toolbar, .pe-filter-bar").forEach((el) => {
      initStickyNav(el);
    });
  }

  window.addEventListener("hashchange", onRouteChange);
  onRouteChange();
});
