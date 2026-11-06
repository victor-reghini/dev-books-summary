import { patternsData } from "../../books/design-patterns/explanations/patterns-data.js";
import { patternAnimations } from "../../books/design-patterns/examples/pattern-animations.js";
import { cleanCodeChaptersData } from "../../books/clean-code/explanations/chapters-data.js";
import { t } from "../../books/design-patterns/explanations/i18n.js";
import { stopActiveVisualizerTimer } from "./pattern-visualizer.js";
import { renderBookshelfPage } from "./bookshelf-view.js";
import { handleGofRoute } from "./gof-views.js";
import { handleCleanCodeRoute } from "./clean-code-views.js";

export function updateHeaderTelemetry(hash) {
  const badgeEl = document.getElementById("header-active-module");
  const brandTitleEl = document.getElementById("brand-title");
  const brandSubEl = document.getElementById("brand-subtitle");
  if (!badgeEl) return;

  if (hash === "#/" || hash === "#/estante" || hash === "") {
    if (brandTitleEl) brandTitleEl.textContent = "Dev Books Summary";
    if (brandSubEl) brandSubEl.textContent = "Estante Interativa • GoF & Clean Code";
    badgeEl.innerHTML = `<span class="header-status-dot"></span> <span class="header-now-label">ESTANTE PRINCIPAL:</span> <strong>2 LIVROS (GOF + CLEAN CODE)</strong>`;
    return;
  }

  if (hash.startsWith("#/clean-code")) {
    if (brandTitleEl) brandTitleEl.textContent = "Código Limpo (Clean Code)";
    if (brandSubEl) brandSubEl.textContent = "Robert C. Martin • 17 Capítulos & 66 Heurísticas";

    if (hash.startsWith("#/clean-code/capitulo/")) {
      const id = hash.replace("#/clean-code/capitulo/", "").trim();
      const ch = cleanCodeChaptersData.find((item) => item.id === id);
      if (ch) {
        badgeEl.innerHTML = `<span class="header-status-dot"></span> <span class="header-now-label">ESTUDANDO AGORA:</span> <strong>${ch.code} · ${ch.name.toUpperCase()}</strong>`;
        return;
      }
    }
    badgeEl.innerHTML = `<span class="header-status-dot"></span> <span class="header-now-label">LIVRO ATIVO:</span> <strong>17 CAPÍTULOS + 66 HEURÍSTICAS</strong>`;
    return;
  }

  // Design Patterns (GoF)
  if (brandTitleEl) brandTitleEl.textContent = t("appTitle");
  if (brandSubEl) brandSubEl.textContent = t("appSubtitle");

  if (hash.startsWith("#/padrao/")) {
    const id = hash.replace("#/padrao/", "").trim();
    const p = patternsData.find((item) => item.id === id);
    const anim = patternAnimations[id];
    if (p) {
      const code = anim ? anim.code : "DP";
      badgeEl.innerHTML = `<span class="header-status-dot"></span> <span class="header-now-label">${t("nowLearning")}:</span> <strong>${code} · ${p.name.toUpperCase()}</strong>`;
      return;
    }
  }
  badgeEl.innerHTML = `<span class="header-status-dot"></span> <span class="header-now-label">${t("overviewLabel")}:</span> <strong>23 GOF PATTERNS</strong>`;
}

export function handleRoute(contentArea) {
  stopActiveVisualizerTimer();
  const hash = window.location.hash || "#/";
  updateHeaderTelemetry(hash);

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (hash === "#/" || hash === "#/estante" || hash === "") {
    renderBookshelfPage(contentArea);
    return;
  }

  if (hash.startsWith("#/clean-code")) {
    handleCleanCodeRoute(contentArea, hash);
    return;
  }

  handleGofRoute(contentArea, hash);
}

