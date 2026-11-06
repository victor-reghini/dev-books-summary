import { patternsData } from "../../books/design-patterns/explanations/patterns-data.js";
import { patternAnimations } from "../../books/design-patterns/examples/pattern-animations.js";
import { getLang, t, patternI18n } from "../../books/design-patterns/explanations/i18n.js";
import { cleanCodeChaptersData } from "../../books/clean-code/explanations/chapters-data.js";
import { icons } from "./icons.js";

const STUDIED_KEY_GOF = "gof_studied_patterns";
const STUDIED_KEY_CC = "cleancode_studied_chapters";

export function getActiveBookFromHash(hash = window.location.hash) {
  const h = hash || "#/";
  if (h === "#/" || h === "#/estante" || h === "#") return "estante";
  if (h.startsWith("#/clean-code")) return "clean-code";
  return "design-patterns";
}

export function getStudiedPatterns(bookId = null) {
  const active = bookId || (getActiveBookFromHash() === "clean-code" ? "clean-code" : "design-patterns");
  const key = active === "clean-code" ? STUDIED_KEY_CC : STUDIED_KEY_GOF;
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

export function togglePatternStudied(itemId) {
  const isCC = String(itemId).startsWith("cap-");
  const bookId = isCC ? "clean-code" : "design-patterns";
  const key = isCC ? STUDIED_KEY_CC : STUDIED_KEY_GOF;
  const studied = getStudiedPatterns(bookId);
  const idx = studied.indexOf(itemId);
  if (idx === -1) {
    studied.push(itemId);
  } else {
    studied.splice(idx, 1);
  }
  try {
    localStorage.setItem(key, JSON.stringify(studied));
  } catch {
    // ignore storage errors
  }
  updateSidebarProgress();
  return studied.includes(itemId);
}

export function renderSidebar(sidebarEl, currentHash = "") {
  const targetEl = sidebarEl || document.getElementById("app-sidebar");
  if (!targetEl) return;

  const hash = currentHash || window.location.hash || "#/";
  const activeBook = getActiveBookFromHash(hash);

  if (activeBook === "estante") {
    renderBookshelfSidebar(targetEl, hash);
    return;
  }

  if (activeBook === "clean-code") {
    renderCleanCodeSidebar(targetEl, hash);
    return;
  }

  renderGofSidebar(targetEl, hash);
}

function renderBookshelfSidebar(sidebarEl, currentHash) {
  const gofStudied = getStudiedPatterns("design-patterns").length;
  const ccStudied = getStudiedPatterns("clean-code").length;
  const totalStudied = gofStudied + ccStudied;
  const totalItems = patternsData.length + cleanCodeChaptersData.length;
  const progressPercent = Math.round((totalStudied / totalItems) * 100);

  sidebarEl.innerHTML = `
    <div class="study-tracker">
      <div class="study-tracker-row">
        <span class="study-tracker-label">PROGRESSO GERAL DA ESTANTE</span>
        <strong id="study-count-text">${totalStudied}/${totalItems} (${progressPercent}%)</strong>
      </div>
      <div class="study-progress-bar-bg" role="progressbar" aria-valuenow="${progressPercent}" aria-valuemin="0" aria-valuemax="100">
        <div class="study-progress-bar-fill" id="study-progress-fill" style="width: ${progressPercent}%;"></div>
      </div>
    </div>

    <nav class="sidebar-nav" id="sidebar-nav-container" aria-label="Navegação da Estante Principal">
      <div class="sidebar-group">
        <button type="button" class="sidebar-group-title" data-group="estante" aria-expanded="true">
          <span>ESTANTE DE LIVROS (2 OBRAS)</span>
          <span class="chevron">${icons.chevronRight}</span>
        </button>
        <div class="sidebar-items-group is-open" id="group-estante">
          <div class="sidebar-items-inner">
            <a href="#/design-patterns" class="sidebar-item">
              <span class="sidebar-item-left">
                <span class="sidebar-code-pill cat-estrutural">DP</span>
                <span class="sidebar-item-name">Padrões de Projeto (GoF)</span>
              </span>
              <span class="sidebar-item-right">
                <span class="scope-mini-tag">${gofStudied}/23</span>
              </span>
            </a>
            <a href="#/clean-code" class="sidebar-item">
              <span class="sidebar-item-left">
                <span class="sidebar-code-pill cat-criacional">CC</span>
                <span class="sidebar-item-name">Código Limpo (Clean Code)</span>
              </span>
              <span class="sidebar-item-right">
                <span class="scope-mini-tag">${ccStudied}/17</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  `;

  const groupTitle = sidebarEl.querySelector(".sidebar-group-title");
  const groupEl = sidebarEl.querySelector("#group-estante");
  if (groupTitle && groupEl) {
    groupTitle.addEventListener("click", () => {
      const isOpen = groupEl.classList.toggle("is-open");
      groupTitle.setAttribute("aria-expanded", String(isOpen));
    });
  }
}

function renderGofSidebar(sidebarEl, currentHash) {
  const studied = getStudiedPatterns("design-patterns");
  const totalPatterns = patternsData.length;
  const studiedCount = studied.length;
  const progressPercent = Math.round((studiedCount / totalPatterns) * 100);

  const creational = patternsData.filter(p => p.category === "criacional");
  const structural = patternsData.filter(p => p.category === "estrutural");
  const behavioral = patternsData.filter(p => p.category === "comportamental");

  let activeGroup = "criacional";
  if (currentHash.startsWith("#/padrao/")) {
    const pid = currentHash.replace("#/padrao/", "").trim();
    const p = patternsData.find(item => item.id === pid);
    if (p) activeGroup = p.category;
  } else if (["#/design-patterns", "#/livro", "#/principios", "#/remodelacao", "#/lexi", "#/matriz", "#/relacionamentos"].includes(currentHash)) {
    activeGroup = "geral";
  } else if (["#/laboratorios", "#/quizzes", "#/referencias"].includes(currentHash)) {
    activeGroup = "pratica";
  }

  const isGroupOpen = (grp) => grp === activeGroup;

  sidebarEl.innerHTML = `
    <div class="sidebar-search-box">
      <div class="search-input-wrapper">
        <span class="search-icon">${icons.search}</span>
        <input
          type="search"
          id="sidebar-filter-input"
          placeholder="${t("searchPlaceholder")}"
          aria-label="${t("searchPlaceholder")}"
        />
      </div>
    </div>

    <div class="study-tracker">
      <div class="study-tracker-row">
        <span class="study-tracker-label">${t("learningProgress")}</span>
        <strong id="study-count-text">${studiedCount}/${totalPatterns} ${t("completeLabel")} (${progressPercent}%)</strong>
      </div>
      <div class="study-progress-bar-bg" role="progressbar" aria-valuenow="${progressPercent}" aria-valuemin="0" aria-valuemax="100">
        <div class="study-progress-bar-fill" id="study-progress-fill" style="width: ${progressPercent}%;"></div>
      </div>
    </div>

    <div class="sidebar-empty-state" id="sidebar-empty-state" hidden>
      <p>${t("searchNoResults")}</p>
      <button type="button" class="pe-ctrl-btn" id="sidebar-clear-filter-btn">${t("clearFilter")}</button>
    </div>

    <nav class="sidebar-nav" id="sidebar-nav-container" aria-label="GoF Design Patterns Navigation">
      <!-- Creational (5) -->
      <div class="sidebar-group">
        <button type="button" class="sidebar-group-title" data-group="criacional" aria-expanded="${isGroupOpen("criacional")}">
          <span>${t("groupCreational")}</span>
          <span class="chevron">${icons.chevronRight}</span>
        </button>
        <div class="sidebar-items-group ${isGroupOpen("criacional") ? "is-open" : ""}" id="group-criacional">
          <div class="sidebar-items-inner">
            ${creational.map(p => renderPatternItem(p, currentHash, studied)).join("")}
          </div>
        </div>
      </div>

      <!-- Structural (7) -->
      <div class="sidebar-group">
        <button type="button" class="sidebar-group-title" data-group="estrutural" aria-expanded="${isGroupOpen("estrutural")}">
          <span>${t("groupStructural")}</span>
          <span class="chevron">${icons.chevronRight}</span>
        </button>
        <div class="sidebar-items-group ${isGroupOpen("estrutural") ? "is-open" : ""}" id="group-estrutural">
          <div class="sidebar-items-inner">
            ${structural.map(p => renderPatternItem(p, currentHash, studied)).join("")}
          </div>
        </div>
      </div>

      <!-- Behavioral (11) -->
      <div class="sidebar-group">
        <button type="button" class="sidebar-group-title" data-group="comportamental" aria-expanded="${isGroupOpen("comportamental")}">
          <span>${t("groupBehavioral")}</span>
          <span class="chevron">${icons.chevronRight}</span>
        </button>
        <div class="sidebar-items-group ${isGroupOpen("comportamental") ? "is-open" : ""}" id="group-comportamental">
          <div class="sidebar-items-inner">
            ${behavioral.map(p => renderPatternItem(p, currentHash, studied)).join("")}
          </div>
        </div>
      </div>

      <!-- Foundations & Book Overview -->
      <div class="sidebar-group">
        <button type="button" class="sidebar-group-title" data-group="geral" aria-expanded="${isGroupOpen("geral")}">
          <span>${t("groupFoundations")}</span>
          <span class="chevron">${icons.chevronRight}</span>
        </button>
        <div class="sidebar-items-group ${isGroupOpen("geral") ? "is-open" : ""}" id="group-geral">
          <div class="sidebar-items-inner">
            <a href="#/design-patterns" class="sidebar-item ${currentHash === "#/design-patterns" || currentHash === "#/livro" ? "active" : ""}">
              <span class="sidebar-item-left">
                <span class="sidebar-code-pill">00</span>
                <span>${t("navHome")}</span>
              </span>
            </a>
            <a href="#/principios" class="sidebar-item ${currentHash === "#/principios" ? "active" : ""}">
              <span class="sidebar-item-left">
                <span class="sidebar-code-pill">OO</span>
                <span>${t("navPrinciples")}</span>
              </span>
            </a>
            <a href="#/remodelacao" class="sidebar-item ${currentHash === "#/remodelacao" ? "active" : ""}">
              <span class="sidebar-item-left">
                <span class="sidebar-code-pill">8C</span>
                <span>${t("navRedesign")}</span>
              </span>
            </a>
            <a href="#/lexi" class="sidebar-item ${currentHash === "#/lexi" ? "active" : ""}">
              <span class="sidebar-item-left">
                <span class="sidebar-code-pill">LX</span>
                <span>${t("navLexi")}</span>
              </span>
            </a>
            <a href="#/matriz" class="sidebar-item ${currentHash === "#/matriz" ? "active" : ""}">
              <span class="sidebar-item-left">
                <span class="sidebar-code-pill">MX</span>
                <span>${t("navMatrix")}</span>
              </span>
            </a>
            <a href="#/relacionamentos" class="sidebar-item ${currentHash === "#/relacionamentos" ? "active" : ""}">
              <span class="sidebar-item-left">
                <span class="sidebar-code-pill">GR</span>
                <span>${t("navRelationships")}</span>
              </span>
            </a>
          </div>
        </div>
      </div>

      <!-- Labs & Evaluation -->
      <div class="sidebar-group">
        <button type="button" class="sidebar-group-title" data-group="pratica" aria-expanded="${isGroupOpen("pratica")}">
          <span>${t("groupPractice")}</span>
          <span class="chevron">${icons.chevronRight}</span>
        </button>
        <div class="sidebar-items-group ${isGroupOpen("pratica") ? "is-open" : ""}" id="group-pratica">
          <div class="sidebar-items-inner">
            <a href="#/laboratorios" class="sidebar-item ${currentHash === "#/laboratorios" ? "active" : ""}">
              <span class="sidebar-item-left">
                <span class="sidebar-code-pill">LB</span>
                <span>${t("navLabs")}</span>
              </span>
              <span class="item-badge">9 LABS</span>
            </a>
            <a href="#/quizzes" class="sidebar-item ${currentHash === "#/quizzes" ? "active" : ""}">
              <span class="sidebar-item-left">
                <span class="sidebar-code-pill">QZ</span>
                <span>${t("navQuizzes")}</span>
              </span>
              <span class="item-badge">QUIZ</span>
            </a>
            <a href="#/referencias" class="sidebar-item ${currentHash === "#/referencias" ? "active" : ""}">
              <span class="sidebar-item-left">
                <span class="sidebar-code-pill">RF</span>
                <span>${t("navReferences")}</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  `;

  attachFilterAndAccordionHandlers(sidebarEl, activeGroup);
}

function renderCleanCodeSidebar(sidebarEl, currentHash) {
  const studied = getStudiedPatterns("clean-code");
  const totalChapters = cleanCodeChaptersData.length;
  const studiedCount = studied.length;
  const progressPercent = Math.round((studiedCount / totalChapters) * 100);

  const part1 = cleanCodeChaptersData.filter(c => c.category === "criacional");
  const part2 = cleanCodeChaptersData.filter(c => c.category === "estrutural");
  const part3 = cleanCodeChaptersData.filter(c => c.category === "comportamental");
  const part4 = cleanCodeChaptersData.filter(c => c.category === "estudos-de-caso");

  let activeGroup = "criacional";
  if (currentHash.startsWith("#/clean-code/capitulo/")) {
    const cid = currentHash.replace("#/clean-code/capitulo/", "").trim();
    const ch = cleanCodeChaptersData.find(item => item.id === cid);
    if (ch) activeGroup = ch.category;
  } else if (
    [
      "#/clean-code",
      "#/clean-code/principios",
      "#/clean-code/emergencia",
      "#/clean-code/estudos-de-caso",
      "#/clean-code/matriz-odores",
      "#/clean-code/graficos"
    ].includes(currentHash)
  ) {
    activeGroup = "geral";
  } else if (
    ["#/clean-code/laboratorios", "#/clean-code/quizzes", "#/clean-code/referencias"].includes(currentHash)
  ) {
    activeGroup = "pratica";
  }

  const isGroupOpen = (grp) => grp === activeGroup;

  sidebarEl.innerHTML = `
    <div class="sidebar-search-box">
      <div class="search-input-wrapper">
        <span class="search-icon">${icons.search}</span>
        <input
          type="search"
          id="sidebar-filter-input"
          placeholder="Buscar capítulo ou odor (ex: G23, TDD)..."
          aria-label="Buscar capítulo ou heurística"
        />
      </div>
    </div>

    <div class="study-tracker">
      <div class="study-tracker-row">
        <span class="study-tracker-label">PROGRESSO EM CÓDIGO LIMPO</span>
        <strong id="study-count-text">${studiedCount}/${totalChapters} ${t("completeLabel")} (${progressPercent}%)</strong>
      </div>
      <div class="study-progress-bar-bg" role="progressbar" aria-valuenow="${progressPercent}" aria-valuemin="0" aria-valuemax="100">
        <div class="study-progress-bar-fill" id="study-progress-fill" style="width: ${progressPercent}%;"></div>
      </div>
    </div>

    <div class="sidebar-empty-state" id="sidebar-empty-state" hidden>
      <p>${t("searchNoResults")}</p>
      <button type="button" class="pe-ctrl-btn" id="sidebar-clear-filter-btn">${t("clearFilter")}</button>
    </div>

    <nav class="sidebar-nav" id="sidebar-nav-container" aria-label="Clean Code Chapters Navigation">
      <!-- Parte 1: Fundamentos (5) -->
      <div class="sidebar-group">
        <button type="button" class="sidebar-group-title" data-group="criacional" aria-expanded="${isGroupOpen("criacional")}">
          <span>${t("cleanCodePart1") || "1. FUNDAMENTOS (5)"}</span>
          <span class="chevron">${icons.chevronRight}</span>
        </button>
        <div class="sidebar-items-group ${isGroupOpen("criacional") ? "is-open" : ""}" id="group-criacional">
          <div class="sidebar-items-inner">
            ${part1.map(c => renderCleanCodeItem(c, currentHash, studied)).join("")}
          </div>
        </div>
      </div>

      <!-- Parte 2: Design & Qualidade (4) -->
      <div class="sidebar-group">
        <button type="button" class="sidebar-group-title" data-group="estrutural" aria-expanded="${isGroupOpen("estrutural")}">
          <span>${t("cleanCodePart2") || "2. DESIGN & TESTES (4)"}</span>
          <span class="chevron">${icons.chevronRight}</span>
        </button>
        <div class="sidebar-items-group ${isGroupOpen("estrutural") ? "is-open" : ""}" id="group-estrutural">
          <div class="sidebar-items-inner">
            ${part2.map(c => renderCleanCodeItem(c, currentHash, studied)).join("")}
          </div>
        </div>
      </div>

      <!-- Parte 3: Arquitetura & Escala (4) -->
      <div class="sidebar-group">
        <button type="button" class="sidebar-group-title" data-group="comportamental" aria-expanded="${isGroupOpen("comportamental")}">
          <span>${t("cleanCodePart3") || "3. ARQUITETURA & ESCALA (4)"}</span>
          <span class="chevron">${icons.chevronRight}</span>
        </button>
        <div class="sidebar-items-group ${isGroupOpen("comportamental") ? "is-open" : ""}" id="group-comportamental">
          <div class="sidebar-items-inner">
            ${part3.map(c => renderCleanCodeItem(c, currentHash, studied)).join("")}
          </div>
        </div>
      </div>

      <!-- Parte 4: Estudos de Caso & Heurísticas (4) -->
      <div class="sidebar-group">
        <button type="button" class="sidebar-group-title" data-group="estudos-de-caso" aria-expanded="${isGroupOpen("estudos-de-caso")}">
          <span>${t("cleanCodePart4") || "4. CASOS & HEURÍSTICAS (4)"}</span>
          <span class="chevron">${icons.chevronRight}</span>
        </button>
        <div class="sidebar-items-group ${isGroupOpen("estudos-de-caso") ? "is-open" : ""}" id="group-estudos-de-caso">
          <div class="sidebar-items-inner">
            ${part4.map(c => renderCleanCodeItem(c, currentHash, studied)).join("")}
          </div>
        </div>
      </div>

      <!-- Fundamentos & Visão Geral do Livro -->
      <div class="sidebar-group">
        <button type="button" class="sidebar-group-title" data-group="geral" aria-expanded="${isGroupOpen("geral")}">
          <span>${t("cleanCodeGeneral") || "VISÃO GERAL & ARQUITETURA"}</span>
          <span class="chevron">${icons.chevronRight}</span>
        </button>
        <div class="sidebar-items-group ${isGroupOpen("geral") ? "is-open" : ""}" id="group-geral">
          <div class="sidebar-items-inner">
            <a href="#/clean-code" class="sidebar-item ${currentHash === "#/clean-code" ? "active" : ""}">
              <span class="sidebar-item-left">
                <span class="sidebar-code-pill">00</span>
                <span>Catálogo (17 Capítulos)</span>
              </span>
            </a>
            <a href="#/clean-code/principios" class="sidebar-item ${currentHash === "#/clean-code/principios" ? "active" : ""}">
              <span class="sidebar-item-left">
                <span class="sidebar-code-pill">5S</span>
                <span>Filosofia 5S, Escoteiro & SOLID</span>
              </span>
            </a>
            <a href="#/clean-code/emergencia" class="sidebar-item ${currentHash === "#/clean-code/emergencia" ? "active" : ""}">
              <span class="sidebar-item-left">
                <span class="sidebar-code-pill">4R</span>
                <span>As 4 Regras de Beck & TDD</span>
              </span>
            </a>
            <a href="#/clean-code/estudos-de-caso" class="sidebar-item ${currentHash === "#/clean-code/estudos-de-caso" ? "active" : ""}">
              <span class="sidebar-item-left">
                <span class="sidebar-code-pill">CS</span>
                <span>Estudos: Args, JUnit & DayDate</span>
              </span>
            </a>
            <a href="#/clean-code/matriz-odores" class="sidebar-item ${currentHash === "#/clean-code/matriz-odores" ? "active" : ""}">
              <span class="sidebar-item-left">
                <span class="sidebar-code-pill">66</span>
                <span>Catálogo 66 Odores (C1–T9)</span>
              </span>
            </a>
            <a href="#/clean-code/graficos" class="sidebar-item ${currentHash === "#/clean-code/graficos" ? "active" : ""}">
              <span class="sidebar-item-left">
                <span class="sidebar-code-pill">GR</span>
                <span>Gráficos & Curva Wading</span>
              </span>
            </a>
          </div>
        </div>
      </div>

      <!-- Laboratórios & Prática -->
      <div class="sidebar-group">
        <button type="button" class="sidebar-group-title" data-group="pratica" aria-expanded="${isGroupOpen("pratica")}">
          <span>LABORATÓRIOS & PRÁTICA</span>
          <span class="chevron">${icons.chevronRight}</span>
        </button>
        <div class="sidebar-items-group ${isGroupOpen("pratica") ? "is-open" : ""}" id="group-pratica">
          <div class="sidebar-items-inner">
            <a href="#/clean-code/laboratorios" class="sidebar-item ${currentHash === "#/clean-code/laboratorios" ? "active" : ""}">
              <span class="sidebar-item-left">
                <span class="sidebar-code-pill">LB</span>
                <span>Labs & Gráficos Interativos</span>
              </span>
              <span class="item-badge">6 LABS</span>
            </a>
            <a href="#/clean-code/quizzes" class="sidebar-item ${currentHash === "#/clean-code/quizzes" ? "active" : ""}">
              <span class="sidebar-item-left">
                <span class="sidebar-code-pill">QZ</span>
                <span>Quizzes, Cenários & Prática</span>
              </span>
              <span class="item-badge">QUIZ</span>
            </a>
            <a href="#/clean-code/referencias" class="sidebar-item ${currentHash === "#/clean-code/referencias" ? "active" : ""}">
              <span class="sidebar-item-left">
                <span class="sidebar-code-pill">RF</span>
                <span>Bibliografia & Referências</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  `;

  attachFilterAndAccordionHandlers(sidebarEl, activeGroup);
}

function attachFilterAndAccordionHandlers(sidebarEl, initialActiveGroup) {
  let activeGroup = initialActiveGroup;
  const filterInput = sidebarEl.querySelector("#sidebar-filter-input");
  const emptyState = sidebarEl.querySelector("#sidebar-empty-state");
  const clearBtn = sidebarEl.querySelector("#sidebar-clear-filter-btn");
  const groupTitles = sidebarEl.querySelectorAll(".sidebar-group-title");

  function applyFilter(term) {
    const clean = term.toLowerCase().trim();
    let visibleCount = 0;

    if (clean) {
      groupTitles.forEach(title => {
        const grpId = title.getAttribute("data-group");
        const groupEl = sidebarEl.querySelector(`#group-${grpId}`);
        if (!groupEl) return;

        let hasMatch = false;
        groupEl.querySelectorAll(".sidebar-item").forEach(item => {
          const text = item.textContent.toLowerCase();
          if (text.includes(clean)) {
            item.style.display = "flex";
            hasMatch = true;
            visibleCount++;
          } else {
            item.style.display = "none";
          }
        });

        if (hasMatch) {
          groupEl.classList.add("is-open");
          title.setAttribute("aria-expanded", "true");
        } else {
          groupEl.classList.remove("is-open");
          title.setAttribute("aria-expanded", "false");
        }
      });
    } else {
      sidebarEl.querySelectorAll(".sidebar-item").forEach(item => {
        item.style.display = "flex";
        visibleCount++;
      });
      groupTitles.forEach(title => {
        const grpId = title.getAttribute("data-group");
        const groupEl = sidebarEl.querySelector(`#group-${grpId}`);
        if (!groupEl) return;
        const open = grpId === activeGroup;
        if (open) {
          groupEl.classList.add("is-open");
          title.setAttribute("aria-expanded", "true");
        } else {
          groupEl.classList.remove("is-open");
          title.setAttribute("aria-expanded", "false");
        }
      });
    }

    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
    }
  }

  if (filterInput) {
    filterInput.addEventListener("input", e => applyFilter(e.target.value));
  }

  if (clearBtn && filterInput) {
    clearBtn.addEventListener("click", () => {
      filterInput.value = "";
      applyFilter("");
      filterInput.focus();
    });
  }

  groupTitles.forEach(title => {
    title.addEventListener("click", () => {
      const grpId = title.getAttribute("data-group");
      const groupEl = sidebarEl.querySelector(`#group-${grpId}`);
      if (!groupEl) return;

      const isCurrentlyOpen = groupEl.classList.contains("is-open");

      groupTitles.forEach(otherTitle => {
        const otherId = otherTitle.getAttribute("data-group");
        const otherGroupEl = sidebarEl.querySelector(`#group-${otherId}`);
        if (!otherGroupEl) return;

        if (otherId === grpId) {
          const nextState = !isCurrentlyOpen;
          if (nextState) {
            otherGroupEl.classList.add("is-open");
            otherTitle.setAttribute("aria-expanded", "true");
            activeGroup = grpId;
          } else {
            otherGroupEl.classList.remove("is-open");
            otherTitle.setAttribute("aria-expanded", "false");
          }
        } else {
          otherGroupEl.classList.remove("is-open");
          otherTitle.setAttribute("aria-expanded", "false");
        }
      });
    });
  });
}

function renderPatternItem(p, currentHash, studied) {
  const isStudied = studied.includes(p.id);
  const isActive = currentHash === `#/padrao/${p.id}`;
  const anim = patternAnimations[p.id];
  const code = anim ? anim.code : p.name.slice(0, 2).toUpperCase();
  const scopeShort = anim && anim.scopeType === "CLASS" ? "CLS" : "OBJ";

  return `
    <a href="#/padrao/${p.id}" class="sidebar-item ${isActive ? "active" : ""}" data-pattern-id="${p.id}">
      <span class="sidebar-item-left">
        <span class="sidebar-code-pill cat-${p.category}">${code}</span>
        <span class="sidebar-item-name">${p.name}</span>
      </span>
      <span class="sidebar-item-right">
        ${isStudied ? `<span class="read-check" title="${t("markedStudied")}">${icons.check}</span>` : `<span class="scope-mini-tag">${scopeShort}</span>`}
      </span>
    </a>
  `;
}

function renderCleanCodeItem(ch, currentHash, studied) {
  const isStudied = studied.includes(ch.id);
  const isActive = currentHash === `#/clean-code/capitulo/${ch.id}`;
  const lang = getLang();
  const tr = patternI18n[ch.id]?.[lang];
  const displayName = tr?.name || tr?.localName || ch.name;

  return `
    <a href="#/clean-code/capitulo/${ch.id}" class="sidebar-item ${isActive ? "active" : ""}" data-pattern-id="${ch.id}">
      <span class="sidebar-item-left">
        <span class="sidebar-code-pill cat-${ch.category}">${ch.code}</span>
        <span class="sidebar-item-name">${displayName}</span>
      </span>
      <span class="sidebar-item-right">
        ${isStudied ? `<span class="read-check" title="${t("markedStudied")}">${icons.check}</span>` : `<span class="scope-mini-tag">P.${ch.gofPage}</span>`}
      </span>
    </a>
  `;
}

export function updateSidebarProgress() {
  const activeBook = getActiveBookFromHash();
  const isCC = activeBook === "clean-code";
  const studied = getStudiedPatterns(isCC ? "clean-code" : "design-patterns");
  const total = isCC ? cleanCodeChaptersData.length : patternsData.length;
  const count = studied.length;
  const percent = Math.round((count / total) * 100);

  const countText = document.getElementById("study-count-text");
  const fill = document.getElementById("study-progress-fill");

  if (countText) countText.textContent = `${count}/${total} ${t("completeLabel")} (${percent}%)`;
  if (fill) fill.style.width = `${percent}%`;

  document.querySelectorAll(".sidebar-item[data-pattern-id]").forEach(item => {
    const pid = item.getAttribute("data-pattern-id");
    const rightSpan = item.querySelector(".sidebar-item-right");
    if (!rightSpan) return;
    if (studied.includes(pid)) {
      rightSpan.innerHTML = `<span class="read-check" title="${t("markedStudied")}">${icons.check}</span>`;
    } else if (pid.startsWith("cap-")) {
      const ch = cleanCodeChaptersData.find(c => c.id === pid);
      rightSpan.innerHTML = `<span class="scope-mini-tag">P.${ch ? ch.gofPage : ""}</span>`;
    } else {
      const anim = patternAnimations[pid];
      const scopeShort = anim && anim.scopeType === "CLASS" ? "CLS" : "OBJ";
      rightSpan.innerHTML = `<span class="scope-mini-tag">${scopeShort}</span>`;
    }
  });
}
