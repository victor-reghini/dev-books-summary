import { cleanCodeChaptersData } from "../../books/clean-code/explanations/chapters-data.js";
import { cleanCodeOverview, smellsCatalog } from "../../books/clean-code/explanations/book-overview.js";
import { cleanCodeAnimations } from "../../books/clean-code/examples/clean-code-animations.js";
import { cleanCodeLabs } from "../../books/clean-code/examples/clean-code-labs.js";
import { cleanCodeI18n } from "../../books/clean-code/explanations/clean-code-i18n.js";
import { renderPatternExercises, renderQuizzesPage } from "./quiz-engine.js";
import { getStudiedPatterns, togglePatternStudied } from "./sidebar.js";
import { renderPatternVisualizer, stopActiveVisualizerTimer } from "./pattern-visualizer.js";
import { highlightCode } from "../utils/code-highlighter.js";
import { initStickyNav } from "../utils/sticky-nav.js";
import { icons } from "./icons.js";
import { getLang, t, patternI18n } from "../../books/design-patterns/explanations/i18n.js";

function getCleanCodeLocalized(ch) {
  const lang = getLang();
  const tr = cleanCodeI18n[ch.id]?.[lang] || patternI18n[ch.id]?.[lang];
  if (!tr || lang === "pt") {
    return {
      name: ch.name,
      subtitle: ch.subtitle || ch.ptName,
      intent: ch.intent,
      problem: ch.problemAndMotivation,
      solution: ch.solution,
      pros: ch.consequences?.pros || [],
      cons: ch.consequences?.cons || []
    };
  }
  return {
    name: tr.name || tr.localName || ch.name,
    subtitle: tr.subtitle || ch.subtitle || ch.ptName,
    intent: tr.intent || ch.intent,
    problem: tr.problem || ch.problemAndMotivation,
    solution: tr.solution || ch.solution,
    pros: tr.pros || ch.consequences?.pros || [],
    cons: tr.cons || ch.consequences?.cons || []
  };
}

function getChapterNumberLabel(num, lang) {
  if (lang === "en") return `Ch. ${num}`;
  if (lang === "fr") return `Chap. ${num}`;
  return `Cap. ${num}`;
}

function getLocalizedScope(scope, lang) {
  const map = {
    profissionalismo: { pt: "PROFISSIONALISMO", en: "PROFESSIONALISM", es: "PROFESIONALISMO", it: "PROFESSIONALITÀ", fr: "PROFESSIONNALISME" },
    identificadores: { pt: "IDENTIFICADORES", en: "IDENTIFIERS", es: "IDENTIFICADORES", it: "IDENTIFICATORI", fr: "IDENTIFIANTS" },
    funções: { pt: "FUNÇÕES", en: "FUNCTIONS", es: "FUNCIONES", it: "FUNZIONI", fr: "FONCTIONS" },
    comunicação: { pt: "COMENTÁRIOS", en: "COMMENTS", es: "COMENTARIOS", it: "COMMENTI", fr: "COMMENTAIRES" },
    formatação: { pt: "FORMATAÇÃO", en: "FORMATTING", es: "FORMATO", it: "FORMATTAZIONE", fr: "FORMATAGE" },
    abstração: { pt: "OBJETOS & DADOS", en: "OBJECTS & DATA", es: "OBJETOS Y DATOS", it: "OGGETTI E DATI", fr: "OBJETS ET DONNÉES" },
    resiliência: { pt: "TRATAMENTO DE ERROS", en: "ERROR HANDLING", es: "MANEJO DE ERRORES", it: "GESTIONE ERRORI", fr: "GESTION DES ERREURS" },
    fronteiras: { pt: "FRONTEIRAS", en: "BOUNDARIES", es: "LÍMITES", it: "CONFINI", fr: "FRONTIÈRES" },
    testes: { pt: "TESTES LIMPOS", en: "CLEAN TESTS", es: "PRUEBAS LIMPIAS", it: "TEST PULITI", fr: "TESTS PROPRES" },
    classes: { pt: "CLASSES", en: "CLASSES", es: "CLASES", it: "CLASSI", fr: "CLASSES" },
    sistemas: { pt: "SISTEMAS", en: "SYSTEMS", es: "SISTEMAS", it: "SISTEMI", fr: "SYSTÈMES" },
    emergência: { pt: "EMERGÊNCIA", en: "EMERGENCE", es: "EMERGENCIA", it: "EMERGENZA", fr: "ÉMERGENCE" },
    concorrência: { pt: "CONCORRÊNCIA", en: "CONCURRENCY", es: "CONCURRENCIA", it: "CONCORRENZA", fr: "CONCURRENCE" },
    refatoração: { pt: "REFATORAÇÃO", en: "REFACTORING", es: "REFACTORIZACIÓN", it: "REFACTORING", fr: "REFACTORISATION" },
    heurísticas: { pt: "ODORES & HEURÍSTICAS", en: "SMELLS & HEURISTICS", es: "OLORES Y HEURÍSTICAS", it: "ODORI ED EURISTICHE", fr: "ODEURS ET HEURISTIQUES" }
  };
  const key = (scope || "").toLowerCase().trim();
  return map[key]?.[lang] || map[key]?.pt || (scope || "").toUpperCase();
}

function getFiveSLocalized(lang) {
  const fiveSData = {
    pt: [
      { name: "Seiri", meaning: "Organização (Sort)", desc: "Saber exatamente onde as coisas estão e descartar o que é inútil • aplicando nomes que revelam intenção (Cap. 2) e removendo código morto [G9] e comentado [C5]." },
      { name: "Seiton", meaning: "Ordem (Systematize)", desc: "Um lugar para cada pedaço de código e cada pedaço de código em seu lugar • distância vertical, afinidade conceitual (Cap. 5) e colocação onde o leitor espera [G17]." },
      { name: "Seiso", meaning: "Limpeza (Shine)", desc: "Manter a área de trabalho livre de fios soltos, resíduos e comentários mentirosos ou obsoletos [C1-C5] (Cap. 4)." },
      { name: "Seiketsu", meaning: "Padronização (Standardize)", desc: "A equipe concorda sobre convenções consistentes de estilo, formatação e arquitetura [G24], fazendo todo o sistema parecer escrito por uma só mente." },
      { name: "Shutsuke", meaning: "Autodisciplina (Sustain)", desc: "Ter a disciplina diária de seguir as práticas (3 Leis do TDD, Regra do Escoteiro e Refinamento Sucessivo) e refletir constantemente sobre o próprio trabalho." }
    ],
    en: [
      { name: "Seiri", meaning: "Organization (Sort)", desc: "Knowing exactly where things are and eliminating what is useless • choosing intention-revealing names (Ch. 2) and deleting dead code [G9] and commented-out code [C5]." },
      { name: "Seiton", meaning: "Order (Systematize)", desc: "A place for every piece of code and every piece of code in its place • vertical distance, conceptual affinity (Ch. 5) and placing code where readers expect it [G17]." },
      { name: "Seiso", meaning: "Cleanliness (Shine)", desc: "Keeping the workspace free of clutter, debris and misleading or obsolete comments [C1-C5] (Ch. 4)." },
      { name: "Seiketsu", meaning: "Standardization (Standardize)", desc: "The team converges on consistent standards of formatting, style and architecture [G24], making the entire codebase feel authored by a single mind." },
      { name: "Shutsuke", meaning: "Self-Discipline (Sustain)", desc: "Practicing daily discipline in following professional craft (3 Laws of TDD, Boy Scout Rule and Successive Refinement) and reflecting on your code." }
    ],
    es: [
      { name: "Seiri", meaning: "Organización (Sort)", desc: "Saber exactamente dónde están las cosas y descartar lo inútil • nombres que revelan intención (Cap. 2) y eliminación de código muerto [G9] y comentado [C5]." },
      { name: "Seiton", meaning: "Orden (Systematize)", desc: "Un lugar para cada fragmento de código y cada fragmento en su lugar • distancia vertical, afinidad conceptual (Cap. 5) y ubicación esperada [G17]." },
      { name: "Seiso", meaning: "Limpieza (Shine)", desc: "Mantener el área de trabajo libre de desorden, residuos y comentarios obsoletos o engañosos [C1-C5] (Cap. 4)." },
      { name: "Seiketsu", meaning: "Estandarización (Standardize)", desc: "El equipo adopta convenciones consistentes de estilo, formato y arquitectura [G24], haciendo que el sistema parezca escrito por una sola mente." },
      { name: "Shutsuke", meaning: "Autodisciplina (Sustain)", desc: "Disciplina diaria para aplicar las prácticas (3 Leyes de TDD, Regla del Boy Scout y Refinamiento Sucesivo) y reflexionar continuamente." }
    ],
    it: [
      { name: "Seiri", meaning: "Organizzazione (Sort)", desc: "Sapere esattamente dove si trovano le cose ed eliminare l'inutile • usare nomi che rivelano l'intenzione (Cap. 2) ed eliminare codice morto [G9] e commentato [C5]." },
      { name: "Seiton", meaning: "Ordine (Systematize)", desc: "Un posto per ogni riga di codice e ogni riga al suo posto • distanza verticale, affinità concettuale (Cap. 5) e coerenza di collocazione [G17]." },
      { name: "Seiso", meaning: "Pulizia (Shine)", desc: "Mantenere l'area di lavoro libera da residui e commenti obsoleti o fuorvianti [C1-C5] (Cap. 4)." },
      { name: "Seiketsu", meaning: "Standardizzazione (Standardize)", desc: "Il team concorda standard coerenti di stile, formattazione e architettura [G24], facendo apparire l'intero sistema come scritto da una sola mente." },
      { name: "Shutsuke", meaning: "Autodisciplina (Sustain)", desc: "Avere la disciplina quotidiana di seguire le pratiche (3 Leggi del TDD, Regola del Boy Scout e Raffinamento Successivo) e riflettere costantemente." }
    ],
    fr: [
      { name: "Seiri", meaning: "Organisation (Trier)", desc: "Savoir exactement où sont les choses et jeter l'inutile • noms révélant l'intention (Chap. 2) et suppression du code mort [G9] ou commenté [C5]." },
      { name: "Seiton", meaning: "Ordre (Ranger)", desc: "Une place pour chaque élément et chaque élément à sa place • proximité verticale, affinité conceptuelle (Chap. 5) et lisibilité naturelle [G17]." },
      { name: "Seiso", meaning: "Propreté (Nettoyer)", desc: "Garder l'espace de travail net, sans scories ni commentaires obsolètes ou trompeurs [C1-C5] (Chap. 4)." },
      { name: "Seiketsu", meaning: "Standardisation (Standardiser)", desc: "L'équipe s'accorde sur des conventions strictes de style, formatage et architecture [G24], donnant l'impression d'un code produit par un esprit unique." },
      { name: "Shutsuke", meaning: "Discipline (Pérenniser)", desc: "Pratiquer avec rigueur au quotidien (3 Lois du TDD, Règle du Boy-Scout et Raffinement Successif) et maintenir une veille continue." }
    ]
  };
  return fiveSData[lang] || fiveSData.pt;
}

function getPartLabel(cat) {
  if (cat === "criacional") return t("cleanCodePart1") || "Parte 1 • Fundamentos";
  if (cat === "estrutural") return t("cleanCodePart2") || "Parte 2 • Design & Qualidade";
  if (cat === "comportamental") return t("cleanCodePart3") || "Parte 3 • Arquitetura & Escala";
  return t("cleanCodePart4") || "Parte 4 • Casos & Heurísticas";
}

function getCategoryBadgeClass(cat) {
  if (cat === "criacional") return "badge-creational";
  if (cat === "estrutural") return "badge-structural";
  return "badge-behavioral";
}

function renderChapterCard(ch, studied, lang) {
  const isStudied = studied.includes(ch.id);
  const loc = getCleanCodeLocalized(ch);
  const chapterNumber = ch.id.replace("cap-", "").padStart(2, "0");
  const chapterPrefix = getChapterNumberLabel(chapterNumber, lang);
  return `
    <a href="#/clean-code/capitulo/${ch.id}" class="pe-pattern-card cat-${ch.category}" data-card-cat="${ch.category}">
      <div class="pe-card-top">
        <span class="pe-card-code cat-${ch.category}">${ch.code}</span>
        <div class="pe-card-badges">
          <span class="pe-mini-scope">${getLocalizedScope(ch.scope, lang)}</span>
          <span class="pe-mini-page">P. ${ch.gofPage}</span>
          ${isStudied ? `<span class="pe-mini-studied" title="${t("completedTooltip") || "Concluído"}">✓</span>` : ""}
        </div>
      </div>
      <h3 class="pe-card-title">${chapterPrefix} • ${loc.name}</h3>
      <div class="pe-card-subtitle">${loc.subtitle}</div>
      <p class="pe-card-intent">${loc.intent}</p>
      <div class="pe-card-footer">
        <span class="pe-card-cat-tag">${getPartLabel(ch.category)}</span>
        <span class="pe-card-explore">${t("heroCardExplore") || "Explorar"} →</span>
      </div>
    </a>
  `;
}

export function handleCleanCodeRoute(contentArea, hash = window.location.hash || "#/clean-code") {
  stopActiveVisualizerTimer();

  if (window.__ccScrollSpyHandler) {
    window.removeEventListener("scroll", window.__ccScrollSpyHandler);
    window.__ccScrollSpyHandler = null;
  }
  if (window.__chapterScrollSpyHandler) {
    window.removeEventListener("scroll", window.__chapterScrollSpyHandler);
    window.__chapterScrollSpyHandler = null;
  }

  if (hash === "#/clean-code") {
    renderCleanCodeHomePage(contentArea);
  } else if (hash === "#/clean-code/principios") {
    renderCleanCodePrinciplesPage(contentArea);
  } else if (hash === "#/clean-code/emergencia") {
    renderCleanCodeEmergencePage(contentArea);
  } else if (hash === "#/clean-code/estudos-de-caso") {
    renderCleanCodeCaseStudiesPage(contentArea);
  } else if (hash === "#/clean-code/matriz-odores") {
    renderCleanCodeSmellsMatrixPage(contentArea);
  } else if (hash === "#/clean-code/graficos") {
    renderCleanCodeChartsPage(contentArea);
  } else if (hash === "#/clean-code/laboratorios") {
    renderCleanCodeLabsHubPage(contentArea);
  } else if (hash === "#/clean-code/quizzes") {
    renderQuizzesPage(contentArea, { book: "clean-code" });
  } else if (hash === "#/clean-code/referencias") {
    renderCleanCodeReferencesPage(contentArea);
  } else if (hash.startsWith("#/clean-code/capitulo/")) {
    const chapterId = hash.replace("#/clean-code/capitulo/", "").trim();
    renderCleanCodeChapterPage(contentArea, chapterId);
  } else {
    renderCleanCodeHomePage(contentArea);
  }
}

function renderCleanCodeHomePage(container) {
  const studied = getStudiedPatterns("clean-code");
  const lang = getLang();

  const parts = [
    { id: "sec-fundamentos", cat: "criacional", title: t("ccFilterPart1") || "1. Fundamentos (Cap. 1-5)" },
    { id: "sec-design", cat: "estrutural", title: t("ccFilterPart2") || "2. Design & Testes (Cap. 6-9)" },
    { id: "sec-arquitetura", cat: "comportamental", title: t("ccFilterPart3") || "3. Arquitetura & Concorrência (Cap. 10-13)" },
    { id: "sec-estudos-de-caso", cat: "estudos-de-caso", title: t("ccFilterPart4") || "4. Estudos de Caso & Odores (Cap. 14-17)" }
  ];

  container.innerHTML = `
    <!-- Protocol Explorer Style Hero Banner for Clean Code -->
    <section class="pe-home-hero" id="sec-hero">
      <div class="pe-hero-top-row">
        <span class="pe-hero-kicker">${t("ccHeroKicker")}</span>
        <div class="pe-hero-stats">
          <span class="pe-stat-chip">${t("ccStatChapters")}</span>
          <span class="pe-stat-chip">${t("ccStatHeuristics")}</span>
          <span class="pe-stat-chip">${t("ccStatSteps")}</span>
          <span class="pe-stat-chip">${t("ccStatDirtyClean")}</span>
        </div>
      </div>

      <h1 class="pe-hero-title">${t("ccHeroTitle")}</h1>
      <p class="pe-hero-desc">
        ${t("ccHeroSubtitle")}
      </p>

      <div class="pe-hero-actions">
        <a href="#/clean-code/capitulo/cap-1" class="pe-cta-btn primary">${t("ccCtaStart")}</a>
        <a href="#/clean-code/laboratorios" class="pe-cta-btn secondary">${t("ccCtaLabs")}</a>
        <a href="#/clean-code/matriz-odores" class="pe-cta-btn secondary">${t("ccCtaSmells")}</a>
        <a href="#/clean-code/quizzes" class="pe-cta-btn secondary">${t("ccCtaQuizzes")}</a>
        <a href="https://link.amazon/B0b1hcoN2" target="_blank" rel="noopener noreferrer" class="pe-cta-btn amazon-buy-btn" title="${t("buyBookTooltip") || "Comprar livro físico ou Kindle na Amazon"}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <span>${t("buyBook") || "Comprar Livro (Amazon)"}</span>
        </a>
      </div>
    </section>

    <!-- Category Filter Bar (Sticky ScrollSpy Navigation) -->
    <div class="pe-filter-bar" role="tablist" aria-label="Navegar pelos capítulos por parte" id="cc-sticky-tabs">
      <button type="button" class="pe-filter-tab active" data-cat-filter="all" data-target-sec="sec-hero">${t("ccFilterAll")}</button>
      <button type="button" class="pe-filter-tab" data-cat-filter="criacional" data-target-sec="sec-fundamentos">${t("ccFilterPart1")}</button>
      <button type="button" class="pe-filter-tab" data-cat-filter="estrutural" data-target-sec="sec-design">${t("ccFilterPart2")}</button>
      <button type="button" class="pe-filter-tab" data-cat-filter="comportamental" data-target-sec="sec-arquitetura">${t("ccFilterPart3")}</button>
      <button type="button" class="pe-filter-tab" data-cat-filter="estudos-de-caso" data-target-sec="sec-estudos-de-caso">${t("ccFilterPart4")}</button>
    </div>

    <!-- 17 Chapters Grouped by Part with Sticky ScrollSpy Targets -->
    <div class="cc-chapters-container" id="cc-chapters-grid">
      ${parts
        .map((part) => {
          const partChapters = cleanCodeChaptersData.filter((c) => c.category === part.cat);
          return `
            <section class="cc-chapter-section" id="${part.id}" data-section-cat="${part.cat}">
              <h2 class="cc-section-header">
                <span class="cc-section-dot cat-${part.cat}"></span>
                <span class="cc-section-title">${part.title}</span>
              </h2>
              <div class="pe-patterns-grid">
                ${partChapters.map((ch) => renderChapterCard(ch, studied, lang)).join("")}
              </div>
            </section>
          `;
        })
        .join("")}
    </div>

    <!-- Book Authors & Core Philosophy Overview -->
    <h2 class="section-title mt-5">Autoria & Equipe Object Mentor • ${cleanCodeOverview.originalTitle} (${cleanCodeOverview.publicationYear})</h2>
    <div class="authors-grid">
      ${cleanCodeOverview.authors
        .map(
          (a) => `
        <div class="author-card">
          <div class="author-avatar">${a.avatar}</div>
          <div>
            <strong>${a.name}</strong>
            <p class="text-muted" style="font-size: 0.82rem; margin-top: 0.2rem">${a.bio}</p>
          </div>
        </div>
      `
        )
        .join("")}
    </div>

    <h2 class="section-title mt-4">${t("ccFiveSTitle")}</h2>
    <div class="grid-2 mt-3">
      ${getFiveSLocalized(lang)
        .map(
          (s) => `
        <div class="info-card">
          <h4 style="color: var(--accent-primary)">${s.name} • ${s.meaning}</h4>
          <p style="font-size: 0.9rem">${s.desc}</p>
        </div>
      `
        )
        .join("")}
    </div>
  `;

  const filterTabs = container.querySelectorAll(".pe-filter-tab");
  const filterBar = container.querySelector("#cc-sticky-tabs");
  const heroSection = container.querySelector("#sec-hero");
  if (filterBar) initStickyNav(filterBar);

  const navSections = [
    { target: "all", id: "sec-hero", el: heroSection },
    ...parts.map((p) => ({ target: p.cat, id: p.id, el: container.querySelector("#" + p.id) }))
  ];

  let isAutoScrolling = false;
  let scrollTimer = null;

  function setActiveTab(cat) {
    filterTabs.forEach((tab) => {
      const isMatch = tab.getAttribute("data-cat-filter") === cat;
      tab.classList.toggle("active", isMatch);
      if (isMatch && filterBar) {
        const barRect = filterBar.getBoundingClientRect();
        const tabRect = tab.getBoundingClientRect();
        if (tabRect.left < barRect.left || tabRect.right > barRect.right) {
          tab.scrollIntoView({ inline: "nearest", behavior: "smooth", block: "nearest" });
        }
      }
    });
  }

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const cat = tab.getAttribute("data-cat-filter");
      const targetSecId = tab.getAttribute("data-target-sec");
      const targetEl = container.querySelector("#" + targetSecId);

      setActiveTab(cat);

      if (targetEl) {
        isAutoScrolling = true;
        clearTimeout(scrollTimer);
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        scrollTimer = setTimeout(() => {
          isAutoScrolling = false;
        }, 850);
      }
    });
  });

  function onScroll() {
    if (isAutoScrolling) return;
    const headerOffset = 135;
    const scrollPos = window.scrollY + headerOffset;

    let activeCat = "all";

    if (heroSection && window.scrollY > heroSection.offsetHeight * 0.45) {
      for (let i = 1; i < navSections.length; i++) {
        const item = navSections[i];
        if (item.el && item.el.offsetTop <= scrollPos) {
          activeCat = item.target;
        }
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        activeCat = navSections[navSections.length - 1].target;
      }
    }

    setActiveTab(activeCat);
  }

  if (window.__ccScrollSpyHandler) {
    window.removeEventListener("scroll", window.__ccScrollSpyHandler);
  }
  window.__ccScrollSpyHandler = onScroll;
  window.addEventListener("scroll", onScroll, { passive: true });
}

function renderCleanCodeChapterPage(container, chapterId) {
  const chIndex = cleanCodeChaptersData.findIndex((c) => c.id === chapterId);
  const ch = cleanCodeChaptersData[chIndex];

  if (!ch) {
    container.innerHTML = `
      <div class="callout callout-warning">
        <h4>Capítulo não encontrado</h4>
        <p><a href="#/clean-code">Voltar ao Catálogo de Código Limpo</a></p>
      </div>
    `;
    return;
  }

  const prevChapter = chIndex > 0 ? cleanCodeChaptersData[chIndex - 1] : null;
  const nextChapter = chIndex < cleanCodeChaptersData.length - 1 ? cleanCodeChaptersData[chIndex + 1] : null;
  const prevLoc = prevChapter ? getCleanCodeLocalized(prevChapter) : null;
  const nextLoc = nextChapter ? getCleanCodeLocalized(nextChapter) : null;
  const lang = getLang();

  const studied = getStudiedPatterns("clean-code");
  const isStudied = studied.includes(ch.id);
  const categoryBadgeClass = getCategoryBadgeClass(ch.category);
  const loc = getCleanCodeLocalized(ch);
  const chapterNumber = ch.id.replace("cap-", "").padStart(2, "0");
  const chapterPrefix = getChapterNumberLabel(chapterNumber, lang);

  container.innerHTML = `
    <!-- Top Navigation & Completion Bar -->
    <div class="page-action-header">
      <div class="pager-buttons">
        ${
          prevChapter
            ? `<a href="#/clean-code/capitulo/${prevChapter.id}" class="pager-btn">← ${t("navPrev") || "Anterior"}: ${prevLoc.name}</a>`
            : `<a href="#/clean-code" class="pager-btn">← ${t("navCleanCodeCatalog") || "Catálogo Código Limpo"}</a>`
        }
      </div>

      <button type="button" class="bookmark-action-btn ${isStudied ? "marked" : ""}" id="btn-toggle-bookmark">
        ${isStudied ? `${icons.bookmarkCheck} <span>${t("completedLabel") || "Concluído"}</span>` : `${icons.bookmark} <span>${t("markAsStudied") || "Marcar como Estudado"}</span>`}
      </button>

      <div class="pager-buttons">
        ${
          nextChapter
            ? `<a href="#/clean-code/capitulo/${nextChapter.id}" class="pager-btn next-btn">${t("navNext") || "Próximo"}: ${nextLoc.name} →</a>`
            : `<a href="#/clean-code/quizzes" class="pager-btn next-btn">${t("quizzesPractice") || "Quizzes & Prática"} →</a>`
        }
      </div>
    </div>

    <!-- Chapter Header Summary -->
    <div class="pattern-header-card">
      <div class="pattern-meta-badges">
        <span class="badge ${categoryBadgeClass}">${ch.code} • ${getPartLabel(ch.category)}</span>
        <span class="badge badge-scope">${t("scopeLabel") || "ESCOPO"}: ${getLocalizedScope(ch.scope, lang)}</span>
        <span class="badge badge-scope">${t("pageLabel") || "Pág."} Clean Code: ${ch.gofPage}</span>
        ${ch.smellRefs?.length ? `<span class="badge badge-scope">Heurísticas: ${ch.smellRefs.join(", ")}</span>` : ""}
      </div>

      <h1 class="page-title">${chapterPrefix} • ${loc.name} <small class="pattern-local-subtitle">(${loc.subtitle})</small></h1>

      <div class="callout callout-info" style="margin-top: 0.75rem; margin-bottom: 0">
        <h5>${t("intentTitle") || "Tese Central & Regra de Ouro (Robert C. Martin)"}</h5>
        <p style="font-size: 1.02rem; font-weight: 500">${loc.intent}</p>
      </div>
    </div>

    <!-- Quick Jump Workspace Tabs (Sticky ScrollSpy Navigation) -->
    <nav class="pe-section-jump-nav" aria-label="Seções do Capítulo">
      <a href="#sec-visualizer" class="pe-jump-link active" data-jump="sec-visualizer">${t("tabVisualizer")}</a>
      <a href="#sec-architecture" class="pe-jump-link" data-jump="sec-architecture">${t("tabArchitecture")}</a>
      <a href="#sec-code" class="pe-jump-link" data-jump="sec-code">${t("tabCode")}</a>
      <a href="#sec-quiz" class="pe-jump-link" data-jump="sec-quiz">${t("tabLabQuiz")}</a>
    </nav>

    <!-- 1. Interactive Step-by-Step Visualizer & Object Inspector -->
    <div id="sec-visualizer">
      <div id="pattern-visualizer-mount"></div>
    </div>

    <!-- 2. Problem, Solution & Structure -->
    <div id="sec-architecture">
      <h2 class="section-title">${t("problemTitle") || "Problema, Sintomas de Código Sujo & Motivação"}</h2>
      <div class="info-card">
        <p style="white-space: pre-line; line-height: 1.65">${loc.problem}</p>
      </div>

      <h2 class="section-title">${t("solutionTitle") || "Solução & Disciplina de Código Limpo"}</h2>
      <div class="info-card">
        <p style="white-space: pre-line; line-height: 1.65">${loc.solution}</p>
      </div>

      <h2 class="section-title">Diretrizes & Conceitos-Chave do Capítulo</h2>
      <div class="info-card">
        <h5>Pilares e Regras Fundamentais:</h5>
        <ul style="padding-left: 1.25rem; font-size: 0.92rem; margin: 0.75rem 0; display: flex; flex-direction: column; gap: 0.5rem">
          ${ch.structure.participants
            .map((part) => `<li><strong>${part.name}:</strong> ${part.role}</li>`)
            .join("")}
        </ul>
        <p class="text-muted" style="font-size: 0.88rem; margin-top: 0.75rem"><strong>Aplicação no Caso de Uso:</strong> ${ch.structure.collaborations}</p>
      </div>

      <h2 class="section-title">Quando Aplicar & Pragmatismo</h2>
      <div class="info-card">
        <ul style="padding-left: 1.25rem; font-size: 0.92rem; display: flex; flex-direction: column; gap: 0.5rem">
          ${ch.applicability.map((app) => `<li>${app}</li>`).join("")}
        </ul>
      </div>

      <h2 class="section-title">${t("consequencesTitle") || "Consequências e Trade-offs"}</h2>
      <div class="tradeoffs-container">
        <div class="tradeoff-card tradeoff-pros">
          <h5>${t("prosTitle") || "Benefícios Diretos (Prós)"}</h5>
          <ul>
            ${loc.pros.map((pro) => `<li>${pro}</li>`).join("")}
          </ul>
        </div>
        <div class="tradeoff-card tradeoff-cons">
          <h5>${t("consTitle") || "Cuidados & Disciplina Exigida"}</h5>
          <ul>
            ${loc.cons.map((con) => `<li>${con}</li>`).join("")}
          </ul>
        </div>
      </div>

      <h2 class="section-title">Checklist de Revisão & Heurísticas Relacionadas (Cap. 17)</h2>
      <div class="info-card">
        <ul style="padding-left: 1.25rem; font-size: 0.92rem; display: flex; flex-direction: column; gap: 0.5rem">
          ${ch.implementationNotes.map((note) => `<li>${note}</li>`).join("")}
        </ul>
      </div>
    </div>

    <!-- 3. Multi-Language Code Examples (Dirty vs Clean Java / TS / Python) -->
    <div id="sec-code">
      <h2 class="section-title">Comparação de Código: Antes (Sujo) vs. Depois (Limpo em Java, TypeScript e Python)</h2>
      <div class="code-block-wrapper" id="pattern-code-box">
        <div class="code-header">
          <div class="code-tabs" role="tablist" aria-label="Seletor de versão e linguagem">
            <button type="button" class="code-tab-btn active" data-lang="java">Java Limpo (Depois)</button>
            <button type="button" class="code-tab-btn" data-lang="dirty">Código Sujo (Antes - Anti-Pattern)</button>
            <button type="button" class="code-tab-btn" data-lang="typescript">TypeScript (Clean)</button>
            <button type="button" class="code-tab-btn" data-lang="python">Python 3 (Clean)</button>
          </div>
          <button type="button" class="copy-btn" id="btn-copy-code">${icons.copy} <span>Copiar Código</span></button>
        </div>
        <pre class="code-content"><code id="code-snippet-el"></code></pre>
      </div>

      <h2 class="section-title">Aplicações Reais em Engenharia de Software</h2>
      <div class="info-card">
        <ul style="padding-left: 1.25rem; font-size: 0.92rem; display: flex; flex-direction: column; gap: 0.5rem">
          ${ch.realWorldUses.map((use) => `<li>${use}</li>`).join("")}
        </ul>
      </div>

      <h2 class="section-title">Capítulos Relacionados</h2>
      <div class="info-card">
        <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
          ${ch.relatedPatterns
            .map((relId) => {
              const target = cleanCodeChaptersData.find((c) => c.id === relId);
              return target
                ? `<a href="#/clean-code/capitulo/${target.id}" class="btn btn-sm btn-outline">${target.name}</a>`
                : "";
            })
            .join("")}
        </div>
      </div>
    </div>

    <!-- 4. Interactive Playground & Quiz -->
    <div id="sec-quiz">
      ${
        ch.hasPlayground && cleanCodeLabs[ch.playgroundId]
          ? `
        <h2 class="section-title">Laboratório Visual & Gráfico Interativo</h2>
        <div id="inline-lab-container"></div>
      `
          : ""
      }

      <h2 class="section-title">Exercícios de Fixação & Diagnóstico do Capítulo</h2>
      <div id="inline-quiz-container"></div>

      <h2 class="section-title">Referências Bibliográficas</h2>
      <div class="info-card">
        <ul style="padding-left: 1.25rem; font-size: 0.88rem; color: var(--text-secondary)">
          ${ch.references.map((ref) => `<li><strong>${ref.book}</strong> • ${ref.chapter} (${ref.pages}): ${ref.summary}</li>`).join("")}
        </ul>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <div class="page-action-header mt-5">
      <div class="pager-buttons">
        ${
          prevChapter
            ? `<a href="#/clean-code/capitulo/${prevChapter.id}" class="pager-btn">← Anterior: ${prevChapter.name}</a>`
            : `<a href="#/clean-code" class="pager-btn">← Catálogo Código Limpo</a>`
        }
      </div>
      <div class="pager-buttons">
        ${
          nextChapter
            ? `<a href="#/clean-code/capitulo/${nextChapter.id}" class="pager-btn next-btn">Próximo: ${nextChapter.name} →</a>`
            : `<a href="#/clean-code/quizzes" class="pager-btn next-btn">Quizzes & Prática →</a>`
        }
      </div>
    </div>
  `;

  // Mount Interactive Visualizer
  const vizMount = container.querySelector("#pattern-visualizer-mount");
  if (vizMount) {
    renderPatternVisualizer(vizMount, ch);
  }

  // Section Jump Links with Smooth Scroll and ScrollSpy
  const jumpNav = container.querySelector(".pe-section-jump-nav");
  if (jumpNav) initStickyNav(jumpNav);
  const jumpLinks = container.querySelectorAll(".pe-jump-link");
  const jumpSections = [
    { id: "sec-visualizer", el: container.querySelector("#sec-visualizer") },
    { id: "sec-architecture", el: container.querySelector("#sec-architecture") },
    { id: "sec-code", el: container.querySelector("#sec-code") },
    { id: "sec-quiz", el: container.querySelector("#sec-quiz") }
  ];

  let isAutoScrollingJump = false;
  let jumpScrollTimer = null;

  function setActiveJumpLink(targetId) {
    jumpLinks.forEach((link) => {
      const match = link.getAttribute("data-jump") === targetId;
      link.classList.toggle("active", match);
      if (match && jumpNav) {
        const navRect = jumpNav.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();
        if (linkRect.left < navRect.left || linkRect.right > navRect.right) {
          link.scrollIntoView({ inline: "nearest", behavior: "smooth", block: "nearest" });
        }
      }
    });
  }

  jumpLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("data-jump");
      setActiveJumpLink(targetId);

      const targetEl = container.querySelector(`#${targetId}`);
      if (targetEl) {
        isAutoScrollingJump = true;
        clearTimeout(jumpScrollTimer);
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        jumpScrollTimer = setTimeout(() => {
          isAutoScrollingJump = false;
        }, 850);
      }
    });
  });

  function onChapterScroll() {
    if (isAutoScrollingJump) return;
    const headerOffset = 135;
    const scrollPos = window.scrollY + headerOffset;

    let activeId = jumpSections[0].id;
    for (let i = 0; i < jumpSections.length; i++) {
      const sec = jumpSections[i];
      if (sec.el && sec.el.offsetTop <= scrollPos) {
        activeId = sec.id;
      }
    }
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
      activeId = jumpSections[jumpSections.length - 1].id;
    }
    setActiveJumpLink(activeId);
  }

  if (window.__chapterScrollSpyHandler) {
    window.removeEventListener("scroll", window.__chapterScrollSpyHandler);
  }
  window.__chapterScrollSpyHandler = onChapterScroll;
  window.addEventListener("scroll", onChapterScroll, { passive: true });

  // Bookmark Toggle
  const btnBookmark = container.querySelector("#btn-toggle-bookmark");
  if (btnBookmark) {
    btnBookmark.addEventListener("click", () => {
      const isNowStudied = togglePatternStudied(ch.id);
      if (isNowStudied) {
        btnBookmark.classList.add("marked");
        btnBookmark.innerHTML = `${icons.bookmarkCheck} <span>Concluído</span>`;
      } else {
        btnBookmark.classList.remove("marked");
        btnBookmark.innerHTML = `${icons.bookmark} <span>Marcar como Estudado</span>`;
      }
    });
  }

  // Code Tabs
  const codeEl = container.querySelector("#code-snippet-el");
  const tabButtons = container.querySelectorAll(".code-tab-btn");
  const btnCopy = container.querySelector("#btn-copy-code");

  function switchCode(langKey) {
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    const activeBtn = container.querySelector(`.code-tab-btn[data-lang="${langKey}"]`);
    if (activeBtn) activeBtn.classList.add("active");
    if (codeEl) {
      const rawCode = ch.codeExamples[langKey] || "// Trecho indisponível.";
      const syntaxLang = langKey === "dirty" ? "java" : langKey;
      codeEl.innerHTML = highlightCode(rawCode, syntaxLang);
    }
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      switchCode(btn.getAttribute("data-lang"));
    });
  });

  if (btnCopy && codeEl) {
    btnCopy.addEventListener("click", () => {
      navigator.clipboard.writeText(codeEl.textContent);
      btnCopy.innerHTML = `${icons.check} <span>Copiado!</span>`;
      setTimeout(() => {
        btnCopy.innerHTML = `${icons.copy} <span>Copiar Código</span>`;
      }, 2000);
    });
  }

  switchCode("java");

  // Render Inline Lab
  if (ch.hasPlayground && cleanCodeLabs[ch.playgroundId]) {
    const labContainer = container.querySelector("#inline-lab-container");
    if (labContainer) {
      cleanCodeLabs[ch.playgroundId].render(labContainer);
    }
  }

  // Render Inline Quiz & Scenarios
  const inlineQuizContainer = container.querySelector("#inline-quiz-container");
  if (inlineQuizContainer) {
    renderPatternExercises(inlineQuizContainer, ch.id);
  }
}

function renderCleanCodePrinciplesPage(container) {
  container.innerHTML = `
    <div class="page-action-header">
      <a href="#/clean-code" class="pager-btn">← Catálogo Código Limpo</a>
      <a href="#/clean-code/emergencia" class="pager-btn next-btn">Próximo: 4 Regras de Beck & TDD →</a>
    </div>

    <h1 class="page-title">Filosofia 5S, Regra do Escoteiro & Princípios SOLID</h1>
    <p class="page-subtitle">Os pilares éticos e arquiteturais que separam código profissional sustentável de projetos que colapsam sob dívida técnica.</p>

    ${cleanCodeOverview.corePrinciples
      .map(
        (p) => `
      <div class="info-card mt-4" style="border-left: 4px solid var(--accent-primary)">
        <h3>${p.title}</h3>
        <p class="text-muted" style="font-style: italic; margin-bottom: 0.8rem">"${p.original}"</p>
        <p>${p.summary}</p>
        <ul style="padding-left: 1.25rem; font-size: 0.9rem; margin-top: 0.6rem">
          ${p.benefits.map((b) => `<li>${b}</li>`).join("")}
        </ul>
        <div class="tradeoffs-container mt-3">
          <div class="tradeoff-card tradeoff-cons">
            <h5>Anti-Pattern (Código Sujo / Acoplado)</h5>
            <code>${p.badPractice}</code>
          </div>
          <div class="tradeoff-card tradeoff-pros">
            <h5>Código Limpo (Artesanato Profissional)</h5>
            <code>${p.goodPractice}</code>
          </div>
        </div>
      </div>
    `
      )
      .join("")}

    <h2 class="section-title">Os 5 Pilares do TPM / Lean Software (Prefácio)</h2>
    <div class="table-responsive">
      <table class="gof-table">
        <thead>
          <tr>
            <th>Pilar Japonês</th>
            <th>Equivalente em Código Limpo</th>
            <th>Aplicação Direta no Dia a Dia</th>
          </tr>
        </thead>
        <tbody>
          ${cleanCodeOverview.fiveSPhilosophy
            .map(
              (s) => `
            <tr>
              <td><strong>${s.japanese}</strong></td>
              <td>${s.pt}</td>
              <td>${s.description}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderCleanCodeEmergencePage(container) {
  container.innerHTML = `
    <div class="page-action-header">
      <a href="#/clean-code/principios" class="pager-btn">← Filosofia 5S & Escoteiro</a>
      <a href="#/clean-code/estudos-de-caso" class="pager-btn next-btn">Próximo: Estudos de Caso →</a>
    </div>

    <h1 class="page-title">As 4 Regras de Design Simples (Kent Beck) & As 3 Leis do TDD</h1>
    <p class="page-subtitle">Capítulos 9 e 12: como fazer emergir uma arquitetura limpa e testável em ciclos de 30 segundos.</p>

    <div class="grid-2 mt-4">
      ${cleanCodeOverview.beckSimpleDesignRules
        .map(
          (r) => `
        <div class="info-card">
          <span class="badge badge-creational">Prioridade #0${r.priority}</span>
          <h4 class="mt-2" style="font-size: 1.05rem">${r.rule}</h4>
          <p class="text-muted" style="font-size: 0.9rem; margin-top: 0.5rem">${r.impact}</p>
        </div>
      `
        )
        .join("")}
    </div>

    <h2 class="section-title mt-5">Laboratório Interativo: Ciclo TDD & Diagnóstico F.I.R.S.T.</h2>
    <div id="emergence-tdd-lab"></div>
  `;

  const labEl = container.querySelector("#emergence-tdd-lab");
  if (labEl && cleanCodeLabs["tdd-first-lab"]) {
    cleanCodeLabs["tdd-first-lab"].render(labEl);
  }
}

function renderCleanCodeCaseStudiesPage(container) {
  const cs = cleanCodeOverview.caseStudiesSummary;

  container.innerHTML = `
    <div class="page-action-header">
      <a href="#/clean-code/emergencia" class="pager-btn">← 4 Regras de Beck & TDD</a>
      <a href="#/clean-code/matriz-odores" class="pager-btn next-btn">Próximo: Catálogo 66 Odores →</a>
    </div>

    <h1 class="page-title">${cs.title}</h1>
    <p class="page-subtitle">${cs.description}</p>

    <div class="lexi-challenges-list">
      ${cs.studies
        .map(
          (s, idx) => `
        <div class="info-card mt-3">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem">
            <h4 style="margin: 0">${s.name}</h4>
            <span class="badge badge-scope">${s.chapter}</span>
          </div>
          <p class="mt-2 text-muted" style="font-size: 0.92rem"><strong>Problema Inicial:</strong> ${s.problem}</p>
          <div class="callout callout-success mt-2" style="margin-bottom: 0.5rem">
            <strong>Refatoração Aplicada (<a href="#/clean-code/capitulo/cap-${14 + idx}">Abrir ${s.chapter}</a>):</strong>
            <p style="margin-top: 0.3rem">${s.solution}</p>
            <div style="display:flex; gap:0.4rem; flex-wrap:wrap; margin-top:0.5rem;">
              ${s.smellsFixed.map((sm) => `<span class="badge badge-scope">${sm}</span>`).join("")}
            </div>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

function renderCleanCodeSmellsMatrixPage(container) {
  const categories = ["Todas", "Comentários", "Ambiente", "Funções", "Geral", "Java", "Nomes", "Testes"];

  container.innerHTML = `
    <div class="page-action-header">
      <a href="#/clean-code/estudos-de-caso" class="pager-btn">← Estudos de Caso</a>
      <a href="#/clean-code/graficos" class="pager-btn next-btn">Próximo: Gráficos & Métricas →</a>
    </div>

    <h1 class="page-title">Matriz Completa dos 66 Odores e Heurísticas (C1 a T9)</h1>
    <p class="page-subtitle">Capítulo 17 de Código Limpo: vocabulário técnico objetivo para revisões de código (Pull Requests) e refatoração contínua.</p>

    <div class="info-card mt-3">
      <div style="display:flex; flex-wrap:wrap; gap:0.75rem; align-items:center; justify-content:space-between;">
        <input
          type="search"
          id="smells-search-input"
          class="form-input"
          placeholder="Filtrar por código (ex: G23, F3, N1) ou termo (ex: Demeter, Switch, Contorno)..."
          style="max-width:460px; flex:1;"
        />
        <div class="factory-selector-tabs" id="smells-cat-tabs">
          ${categories
            .map(
              (c, i) =>
                `<button type="button" class="btn btn-tab ${i === 0 ? "active" : ""}" data-smell-cat="${c}">${c}</button>`
            )
            .join("")}
        </div>
      </div>
    </div>

    <div class="table-responsive mt-3">
      <table class="gof-table" id="smells-matrix-table">
        <thead>
          <tr>
            <th style="width: 10%">Código</th>
            <th style="width: 15%">Categoria</th>
            <th style="width: 25%">Regra / Odor</th>
            <th style="width: 38%">Diretriz Prática (Uncle Bob)</th>
            <th style="width: 12%">Capítulo</th>
          </tr>
        </thead>
        <tbody id="smells-tbody"></tbody>
      </table>
    </div>
  `;

  const searchInput = container.querySelector("#smells-search-input");
  const catBtns = container.querySelectorAll("#smells-cat-tabs .btn-tab");
  const tbody = container.querySelector("#smells-tbody");
  let activeCat = "Todas";

  function refreshRows() {
    const q = (searchInput.value || "").trim().toLowerCase();
    const filtered = smellsCatalog.filter((item) => {
      const matchCat = activeCat === "Todas" || item.category === activeCat;
      const matchQuery =
        !q ||
        item.code.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });

    tbody.innerHTML = filtered
      .map(
        (s) => `
      <tr>
        <td><span class="badge badge-creational">${s.code}</span></td>
        <td><strong>${s.category}</strong></td>
        <td><strong>${s.title}</strong></td>
        <td>${s.summary}</td>
        <td><a href="#/clean-code/capitulo/${s.chapter}" class="btn btn-sm btn-outline">${s.chapter.toUpperCase()}</a></td>
      </tr>
    `
      )
      .join("");
  }

  searchInput.addEventListener("input", refreshRows);
  catBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      catBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeCat = btn.getAttribute("data-smell-cat");
      refreshRows();
    });
  });

  refreshRows();
}

function renderCleanCodeChartsPage(container) {
  container.innerHTML = `
    <div class="page-action-header">
      <a href="#/clean-code/matriz-odores" class="pager-btn">← Catálogo 66 Odores</a>
      <a href="#/clean-code/laboratorios" class="pager-btn next-btn">Próximo: 6 Playgrounds →</a>
    </div>

    <h1 class="page-title">Gráficos & Métricas Visuais de Código Limpo</h1>
    <p class="page-subtitle">Visualizações quantitativas e diagramas interativos das métricas fundamentais apresentadas por Robert C. Martin.</p>

    <div id="charts-wading-mount" class="mt-4"></div>

    <div class="grid-2 mt-4">
      <div class="info-card">
        <h4>Proporção de Tempo: Leitura vs. Escrita (10:1)</h4>
        <p class="text-muted" style="font-size:0.86rem;">No Capítulo 1, Uncle Bob demonstra que um desenvolvedor passa mais de 90% do tempo lendo código existente ao redor do ponto de edição.</p>
        <svg viewBox="0 0 420 120" style="width:100%; height:auto; margin-top:0.75rem;" role="img" aria-label="Gráfico 10 para 1 Leitura vs Escrita">
          <rect x="10" y="20" width="355" height="34" rx="6" fill="#82b99e"/>
          <text x="22" y="42" fill="#121214" font-size="12" font-weight="700">Leitura & Compreensão de Código Existente (~91% • 10x)</text>
          <rect x="369" y="20" width="41" height="34" rx="6" fill="#84a6cc"/>
          <text x="10" y="82" fill="#94a3b8" font-size="11.5">Escrita de Novas Linhas (~9% • 1x) • Facilitar a leitura é a forma mais rápida de programar.</text>
        </svg>
      </div>

      <div class="info-card">
        <h4>Aridade de Funções: Custo Cognitivo por Nº de Argumentos (Cap. 3)</h4>
        <p class="text-muted" style="font-size:0.86rem;">Cada argumento adicional multiplica a complexidade de leitura e o esforço combinatório de mocks nos testes unitários [F1].</p>
        <svg viewBox="0 0 420 135" style="width:100%; height:auto; margin-top:0.5rem;" role="img" aria-label="Gráfico de Aridade de Funções">
          <rect x="10" y="12" width="70" height="20" rx="4" fill="#82b99e"/>
          <text x="90" y="26" fill="#e2e8f0" font-size="11.5">0 args (Niládica) • Ideal: mínima carga cognitiva</text>
          <rect x="10" y="40" width="130" height="20" rx="4" fill="#82adc4"/>
          <text x="150" y="54" fill="#e2e8f0" font-size="11.5">1 arg (Monádica) • Excelente (pergunta/transformação)</text>
          <rect x="10" y="68" width="210" height="20" rx="4" fill="#b7a8d6"/>
          <text x="230" y="82" fill="#e2e8f0" font-size="11.5">2 args (Diádica) • Exige ordenação natural (ex: Point)</text>
          <rect x="10" y="96" width="380" height="20" rx="4" fill="#d2948f"/>
          <text x="20" y="110" fill="#121214" font-size="11" font-weight="700">3+ args (Triádica/Poliádica [F1]) • Alto Risco: extraia um Objeto de Conceito!</text>
        </svg>
      </div>
    </div>
  `;

  const wadingMount = container.querySelector("#charts-wading-mount");
  if (wadingMount && cleanCodeLabs["wading-curve-lab"]) {
    cleanCodeLabs["wading-curve-lab"].render(wadingMount);
  }
}

function renderCleanCodeLabsHubPage(container) {
  container.innerHTML = `
    <div class="page-action-header">
      <a href="#/clean-code/graficos" class="pager-btn">← Gráficos & Métricas</a>
      <a href="#/clean-code/quizzes" class="pager-btn next-btn">Próximo: Quizzes & Prática →</a>
    </div>

    <h1 class="page-title">Laboratórios Visuais & Gráficos de Código Limpo</h1>
    <p class="page-subtitle">6 simuladores interativos para experimentar refatoração, curva de produtividade, Lei de Demeter, F.I.R.S.T., concorrência CAS e o parser Args.</p>

    <div class="factory-selector-tabs mb-4" id="cc-labs-selector-tabs">
      <button type="button" class="btn btn-tab active" data-lab="wading-curve-lab">C01 · Curva Produtividade (Gráfico)</button>
      <button type="button" class="btn btn-tab" data-lab="naming-stepdown-lab">C03 · Nomes & Stepdown Rule</button>
      <button type="button" class="btn btn-tab" data-lab="demeter-boundary-lab">C06 · Lei de Demeter & Special Case</button>
      <button type="button" class="btn btn-tab" data-lab="tdd-first-lab">C09 · Ciclo TDD & F.I.R.S.T.</button>
      <button type="button" class="btn btn-tab" data-lab="concurrency-cas-lab">C13 · Concorrência ++lastId vs CAS</button>
      <button type="button" class="btn btn-tab" data-lab="args-marshaler-lab">C14 · Parser Polimórfico Args</button>
    </div>

    <div id="cc-active-lab-render-area"></div>
  `;

  const tabs = container.querySelectorAll("#cc-labs-selector-tabs .btn-tab");
  const area = container.querySelector("#cc-active-lab-render-area");

  function switchLab(labId) {
    tabs.forEach((t) => t.classList.remove("active"));
    const activeTab = container.querySelector(`#cc-labs-selector-tabs .btn-tab[data-lab="${labId}"]`);
    if (activeTab) activeTab.classList.add("active");
    if (area && cleanCodeLabs[labId]) {
      cleanCodeLabs[labId].render(area);
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => switchLab(tab.getAttribute("data-lab")));
  });

  switchLab("wading-curve-lab");
}

function renderCleanCodeReferencesPage(container) {
  container.innerHTML = `
    <div class="page-action-header">
      <a href="#/clean-code/quizzes" class="pager-btn">← Quizzes & Prática</a>
      <a href="#/clean-code" class="pager-btn next-btn">Catálogo Código Limpo →</a>
    </div>

    <h1 class="page-title">Bibliografia & Referências de Código Limpo</h1>
    <p class="page-subtitle">Obras fundamentais citadas por Robert C. Martin ao longo dos 17 capítulos.</p>

    <div class="grid-2 mt-4">
      <div class="info-card">
        <h4>1. Clean Code (Obra Principal)</h4>
        <p><strong>MARTIN, Robert C. et al.</strong></p>
        <p class="text-muted"><em>Clean Code: A Handbook of Agile Software Craftsmanship.</em> Prentice Hall, 2008 (Alta Books: <em>Código Limpo: Habilidades Práticas do Agile Software</em>, 2009).</p>
      </div>

      <div class="info-card">
        <h4>2. Refactoring</h4>
        <p><strong>FOWLER, Martin; BECK, Kent et al.</strong></p>
        <p class="text-muted"><em>Refactoring: Improving the Design of Existing Code.</em> Addison-Wesley, 1999 / 2018.</p>
      </div>

      <div class="info-card">
        <h4>3. Extreme Programming & TDD</h4>
        <p><strong>BECK, Kent.</strong></p>
        <p class="text-muted"><em>Test-Driven Development: By Example</em> (2002) & <em>Implementation Patterns</em> (2007).</p>
      </div>

      <div class="info-card">
        <h4>4. Working Effectively with Legacy Code</h4>
        <p><strong>FEATHERS, Michael C.</strong></p>
        <p class="text-muted"><em>Working Effectively with Legacy Code.</em> Prentice Hall, 2004.</p>
      </div>
    </div>
  `;
}
