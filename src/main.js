import { initTheme, toggleTheme, updateThemeButton } from "./components/theme.js";
import { renderSidebar } from "./components/sidebar.js";
import { handleRoute } from "./components/router.js";
import { getLang, setLang, t } from "../books/design-patterns/explanations/i18n.js";

function updateStaticChromeLabels() {
  const lang = getLang();
  document.documentElement.lang = lang === "pt" ? "pt-BR" : lang;

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
  });

  const estanteBtn = document.getElementById("btn-estante-principal");
  if (estanteBtn) {
    const labelSpan = estanteBtn.querySelector("span");
    if (labelSpan) {
      labelSpan.textContent =
        lang === "en" ? "Main Bookshelf" : lang === "es" ? "Estante Principal" : "Estante Principal";
    }
  }
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
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const nextLang = btn.getAttribute("data-lang");
      setLang(nextLang);
      updateStaticChromeLabels();
      updateThemeButton();
      const sidebar = document.getElementById("app-sidebar");
      const content = document.getElementById("main-content-area");
      renderSidebar(sidebar, window.location.hash || "#/");
      handleRoute(content);
    });
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
  }

  window.addEventListener("hashchange", onRouteChange);
  onRouteChange();
});
