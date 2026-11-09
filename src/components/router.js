import { patternsData } from "../../books/design-patterns/explanations/patterns-data.js";
import { patternAnimations } from "../../books/design-patterns/examples/pattern-animations.js";
import { cleanCodeChaptersData } from "../../books/clean-code/explanations/chapters-data.js";
import { grokkingChaptersData } from "../../books/grokking-algorithms/explanations/chapters-data.js";
import { t } from "../../books/design-patterns/explanations/i18n.js";
import { stopActiveVisualizerTimer } from "./pattern-visualizer.js";
import { updatePageSEO } from "../utils/seo.js";
import { renderBookshelfPage } from "./bookshelf-view.js";
import { handleGofRoute } from "./gof-views.js";
import { handleCleanCodeRoute } from "./clean-code-views.js";
import { handleGrokkingRoute } from "./grokking-views.js";

export function updateHeaderTelemetry(hash) {
  const badgeEl = document.getElementById("header-active-module");
  const brandTitleEl = document.getElementById("brand-title");
  if (brandTitleEl) brandTitleEl.textContent = "DevBooks";
  if (!badgeEl) return;

  if (hash === "#/" || hash === "#/estante" || hash === "") {
    badgeEl.innerHTML = `<span class="header-status-dot"></span> <span class="header-now-label">${(t("mainBookshelf") || "ESTANTE PRINCIPAL").toUpperCase()}</span>`;
    return;
  }

  if (hash.startsWith("#/clean-code")) {
    if (hash.startsWith("#/clean-code/capitulo/")) {
      const id = hash.replace("#/clean-code/capitulo/", "").trim();
      const ch = cleanCodeChaptersData.find((item) => item.id === id);
      if (ch) {
        badgeEl.innerHTML = `<span class="header-status-dot"></span> <span class="header-now-label">${t("activeStudying") || "ESTUDANDO AGORA:"}</span> <strong>${ch.code} · ${ch.name.toUpperCase()}</strong>`;
        return;
      }
    }
    badgeEl.innerHTML = `<span class="header-status-dot"></span> <span class="header-now-label">${t("activeBook") || "LIVRO ATIVO:"}</span> <strong>CÓDIGO LIMPO</strong>`;
    return;
  }

  if (hash.startsWith("#/grokking-algorithms")) {
    if (hash.startsWith("#/grokking-algorithms/capitulo/")) {
      const id = hash.replace("#/grokking-algorithms/capitulo/", "").trim();
      const ch = grokkingChaptersData.find((item) => item.id === id);
      if (ch) {
        badgeEl.innerHTML = `<span class="header-status-dot"></span> <span class="header-now-label">${t("activeStudying") || "ESTUDANDO AGORA:"}</span> <strong>${ch.code} · ${ch.name.toUpperCase()}</strong>`;
        return;
      }
    }
    badgeEl.innerHTML = `<span class="header-status-dot"></span> <span class="header-now-label">${t("activeBook") || "LIVRO ATIVO:"}</span> <strong>ENTENDENDO ALGORITMOS</strong>`;
    return;
  }

  // Design Patterns (GoF)
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
  updatePageSEO(hash);

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (hash === "#/" || hash === "#/estante" || hash === "") {
    renderBookshelfPage(contentArea);
    return;
  }

  if (hash.startsWith("#/clean-code")) {
    handleCleanCodeRoute(contentArea, hash);
    return;
  }

  if (hash.startsWith("#/grokking-algorithms")) {
    handleGrokkingRoute(contentArea, hash);
    return;
  }

  handleGofRoute(contentArea, hash);
}

