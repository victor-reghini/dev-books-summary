/**
 * Views dedicadas do livro "Entendendo Algoritmos" (Aditya Y. Bhargava):
 * - Catálogo Principal dos 11 Capítulos em 4 Partes (#/grokking-algorithms)
 * - Página de Detalhe do Capítulo (#/grokking-algorithms/capitulo/:id)
 * - Tabela Comparativa de Complexidade Big O (#/grokking-algorithms/complexidade)
 * - Hub de Laboratórios Interativos (#/grokking-algorithms/laboratorios)
 * - Sobre o Autor & Referências (#/grokking-algorithms/referencias)
 */

import { grokkingChaptersData } from "../../books/grokking-algorithms/explanations/chapters-data.js";
import { grokkingBookOverview, bigOScaleTable } from "../../books/grokking-algorithms/explanations/book-overview.js";
import { grokkingAlgorithmsLabs } from "../../books/grokking-algorithms/examples/grokking-algorithms-labs.js";
import { grokkingAlgorithmsAnimations } from "../../books/grokking-algorithms/examples/grokking-algorithms-animations.js";
import { highlightCode } from "../utils/code-highlighter.js";
import { getStudiedPatterns, togglePatternStudied, updateSidebarProgress } from "./sidebar.js";
import { renderPatternExercises, renderQuizzesPage } from "./quiz-engine.js";
import { renderPatternVisualizer } from "./pattern-visualizer.js";
import { initStickyNav } from "../utils/sticky-nav.js";
import { icons } from "./icons.js";
import { getLang, t, patternI18n } from "../../books/design-patterns/explanations/i18n.js";

function formatParagraphs(text) {
  if (!text) return "";
  return String(text)
    .split("\n\n")
    .map((p) => p.replace(/\n• /g, "<br>• "))
    .join("</p><p style='margin-top:0.75rem;'>");
}

function getLocalizedScope(scopeKey, lang) {
  const map = {
    "pesquisa-complexidade": {
      pt: "Pesquisa & Big O",
      en: "Search & Big O",
      es: "Búsqueda & Big O",
      it: "Ricerca & Big O",
      fr: "Recherche & Grand O"
    },
    "memoria-ordenacao": {
      pt: "Memória & Ordenação",
      en: "Memory & Sorting",
      es: "Memoria & Ordenación",
      it: "Memoria & Ordinamento",
      fr: "Mémoire & Tri"
    },
    "recursao-callstack": {
      pt: "Recursão & Pilha",
      en: "Recursion & Stack",
      es: "Recursión & Pila",
      it: "Ricorsione & Stack",
      fr: "Récursivité & Pile"
    },
    "dividir-conquistar": {
      pt: "Dividir & Conquistar",
      en: "Divide & Conquer",
      es: "Dividir & Conquistar",
      it: "Dividi & Impera",
      fr: "Diviser & Régner"
    },
    "hashing-cache": {
      pt: "Tabelas Hash & Cache",
      en: "Hash Tables & Cache",
      es: "Tablas Hash & Caché",
      it: "Tabelle Hash & Cache",
      fr: "Tables Hash & Cache"
    },
    "grafos-bfs": {
      pt: "Grafos & BFS",
      en: "Graphs & BFS",
      es: "Grafos & BFS",
      it: "Grafi & BFS",
      fr: "Graphes & BFS"
    },
    "grafos-dijkstra": {
      pt: "Grafos Ponderados",
      en: "Weighted Graphs",
      es: "Grafos Ponderados",
      it: "Grafi Pesati",
      fr: "Graphes Pondérés"
    },
    "algoritmos-gulosos": {
      pt: "Gulosos & NP-Completo",
      en: "Greedy & NP-Complete",
      es: "Voraces & NP-Completo",
      it: "Golosi & NP-Completo",
      fr: "Gloutons & NP-Complet"
    },
    "programacao-dinamica": {
      pt: "Programação Dinâmica",
      en: "Dynamic Programming",
      es: "Programación Dinámica",
      it: "Programmazione Dinamica",
      fr: "Programmation Dynamique"
    },
    "machine-learning": {
      pt: "KNN & Machine Learning",
      en: "KNN & Machine Learning",
      es: "KNN & Machine Learning",
      it: "KNN & Machine Learning",
      fr: "KNN & Machine Learning"
    },
    "estruturas-proximos-passos": {
      pt: "Estruturas Avançadas",
      en: "Advanced Structures",
      es: "Estructuras Avanzadas",
      it: "Strutture Avanzate",
      fr: "Structures Avancées"
    }
  };
  return map[scopeKey]?.[lang] || map[scopeKey]?.pt || scopeKey;
}

function getPartLabel(category) {
  const lang = getLang();
  const labels = {
    foundations: {
      pt: "Parte 1 • Fundamentos & Estruturas Lineares",
      en: "Part 1 • Foundations & Linear Structures",
      es: "Parte 1 • Fundamentos & Estructuras Lineales",
      it: "Parte 1 • Fondamenti & Strutture Lineari",
      fr: "Partie 1 • Fondamentaux & Structures Linéaires"
    },
    "divide-hash": {
      pt: "Parte 2 • Dividir para Conquistar & Hash",
      en: "Part 2 • Divide and Conquer & Hash Tables",
      es: "Parte 2 • Dividir para Conquistar & Hash",
      it: "Parte 2 • Dividi ed Impera & Hash",
      fr: "Partie 2 • Diviser pour Régner & Hachage"
    },
    graphs: {
      pt: "Parte 3 • Algoritmos em Grafos (BFS & Dijkstra)",
      en: "Part 3 • Graph Algorithms (BFS & Dijkstra)",
      es: "Parte 3 • Algoritmos en Grafos (BFS & Dijkstra)",
      it: "Parte 3 • Algoritmi su Grafi (BFS & Dijkstra)",
      fr: "Partie 3 • Algorithmes de Graphes (BFS & Dijkstra)"
    },
    advanced: {
      pt: "Parte 4 • Algoritmos Complexos & Próximos Passos",
      en: "Part 4 • Complex Algorithms & Next Steps",
      es: "Parte 4 • Algoritmos Complejos & Próximos Pasos",
      it: "Parte 4 • Algoritmi Complessi & Prossimi Passi",
      fr: "Partie 4 • Algorithmes Complexes & Prochaines Étapes"
    }
  };
  return labels[category]?.[lang] || labels[category]?.pt || category;
}

function getLocalizedChapter(ch) {
  const lang = getLang();
  const baseName = ch.name.replace(/^Cap\.\s*\d+\s*•\s*/i, "");
  if (lang === "pt") {
    return {
      name: baseName,
      subtitle: ch.ptName,
      intent: ch.intent,
      problem: ch.problemAndMotivation,
      solution: ch.solution,
      pros: ch.consequences.pros,
      cons: ch.consequences.cons
    };
  }
  const tr = patternI18n[ch.id]?.[lang];
  if (!tr) {
    return {
      name: baseName,
      subtitle: ch.ptName,
      intent: ch.intent,
      problem: ch.problemAndMotivation,
      solution: ch.solution,
      pros: ch.consequences.pros,
      cons: ch.consequences.cons
    };
  }
  return {
    name: tr.name || tr.localName || baseName,
    subtitle: tr.subtitle || ch.ptName,
    intent: tr.intent || ch.intent,
    problem: tr.problem || ch.problemAndMotivation,
    solution: tr.solution || ch.solution,
    pros: tr.pros || ch.consequences.pros,
    cons: tr.cons || ch.consequences.cons
  };
}

/**
 * 1. PÁGINA PRINCIPAL DE ENTENDENDO ALGORITMOS (#/grokking-algorithms)
 */
export function renderGrokkingHomePage(container) {
  const studied = getStudiedPatterns("grokking-algorithms");
  const lang = getLang();
  const part1 = grokkingChaptersData.filter((c) => c.category === "foundations");
  const part2 = grokkingChaptersData.filter((c) => c.category === "divide-hash");
  const part3 = grokkingChaptersData.filter((c) => c.category === "graphs");
  const part4 = grokkingChaptersData.filter((c) => c.category === "advanced");

  const ui = {
    pt: {
      badge: `${grokkingBookOverview.authors[0].name} • ${grokkingBookOverview.edition}`,
      subtitle: `${grokkingBookOverview.originalTitle} (${grokkingBookOverview.publisher}). Explore de forma visual e interativa os 11 capítulos sobre Pesquisa Binária, Notação Big O, Recursão, Quicksort, Tabelas Hash, Pesquisa em Largura (BFS), Algoritmo de Dijkstra, Algoritmos Gulosos, Programação Dinâmica e K-Vizinhos Mais Próximos (KNN).`,
      ctaExplore: "Explorar os 11 Capítulos",
      ctaBigO: "Tabela de Complexidade Big O",
      ctaLabs: "8 Simuladores Interativos",
      ctaQuizzes: "Quizzes & Exercícios Oficiais",
      allParts: `Todas as Partes (${grokkingChaptersData.length})`,
      p1Tab: `1. Fundamentos & Lineares (${part1.length})`,
      p2Tab: `2. Dividir & Tabelas Hash (${part2.length})`,
      p3Tab: `3. Grafos: BFS & Dijkstra (${part3.length})`,
      p4Tab: `4. Gulosos, DP & KNN (${part4.length})`,
      p1Title: "Parte 1 • Fundamentos, Memória, Ordenação & Recursão (Capítulos 1 a 3)",
      p2Title: "Parte 2 • Dividir para Conquistar, Quicksort & Tabelas Hash (Capítulos 4 a 5)",
      p3Title: "Parte 3 • Algoritmos em Grafos: Pesquisa em Largura & Dijkstra (Capítulos 6 a 7)",
      p4Title: "Parte 4 • Algoritmos Gulosos, Programação Dinâmica, KNN & Próximos Passos (Capítulos 8 a 11)",
      pillarsTitle: "Os 6 Pilares de Entendendo Algoritmos",
      authorsTitle: "Autor & Abordagem Ilustrada"
    },
    en: {
      badge: `${grokkingBookOverview.authors[0].name} • ${grokkingBookOverview.edition}`,
      subtitle: `${grokkingBookOverview.originalTitle} (${grokkingBookOverview.publisher}). Visually and interactively explore all 11 chapters covering Binary Search, Big O Notation, Recursion, Quicksort, Hash Tables, Breadth-First Search (BFS), Dijkstra's Algorithm, Greedy Algorithms, Dynamic Programming, and K-Nearest Neighbors (KNN).`,
      ctaExplore: "Explore All 11 Chapters",
      ctaBigO: "Big O Complexity Scale",
      ctaLabs: "8 Interactive Simulators",
      ctaQuizzes: "Quizzes & Book Exercises",
      allParts: `All Parts (${grokkingChaptersData.length})`,
      p1Tab: `1. Foundations (${part1.length})`,
      p2Tab: `2. D&C & Hash Tables (${part2.length})`,
      p3Tab: `3. Graphs: BFS & Dijkstra (${part3.length})`,
      p4Tab: `4. Greedy, DP & KNN (${part4.length})`,
      p1Title: "Part 1 • Foundations, Memory, Selection Sort & Recursion (Chapters 1 to 3)",
      p2Title: "Part 2 • Divide and Conquer, Quicksort & Hash Tables (Chapters 4 to 5)",
      p3Title: "Part 3 • Graph Algorithms: Breadth-First Search & Dijkstra (Chapters 6 to 7)",
      p4Title: "Part 4 • Greedy Algorithms, Dynamic Programming, KNN & Next Steps (Chapters 8 to 11)",
      pillarsTitle: "The 6 Core Pillars of Grokking Algorithms",
      authorsTitle: "Author & Illustrated Philosophy"
    }
  }[lang] || {
    badge: `${grokkingBookOverview.authors[0].name} • ${grokkingBookOverview.edition}`,
    subtitle: `${grokkingBookOverview.originalTitle} (${grokkingBookOverview.publisher}). Explore all 11 chapters interactively.`,
    ctaExplore: "Explore All 11 Chapters",
    ctaBigO: "Big O Complexity Scale",
    ctaLabs: "8 Interactive Simulators",
    ctaQuizzes: "Quizzes & Book Exercises",
    allParts: `All Parts (${grokkingChaptersData.length})`,
    p1Tab: `1. Foundations (${part1.length})`,
    p2Tab: `2. D&C & Hash Tables (${part2.length})`,
    p3Tab: `3. Graphs: BFS & Dijkstra (${part3.length})`,
    p4Tab: `4. Greedy, DP & KNN (${part4.length})`,
    p1Title: "Part 1 • Foundations, Memory, Selection Sort & Recursion (Chapters 1 to 3)",
    p2Title: "Part 2 • Divide and Conquer, Quicksort & Hash Tables (Chapters 4 to 5)",
    p3Title: "Part 3 • Graph Algorithms: Breadth-First Search & Dijkstra (Chapters 6 to 7)",
    p4Title: "Part 4 • Greedy Algorithms, Dynamic Programming, KNN & Next Steps (Chapters 8 to 11)",
    pillarsTitle: "The 6 Core Pillars of Grokking Algorithms",
    authorsTitle: "Author & Illustrated Philosophy"
  };

  container.innerHTML = `
    <div class="pe-home-wrapper">
      <div class="pe-hero">
        <div class="pe-hero-badge">${ui.badge}</div>
        <h1 class="pe-hero-title">${grokkingBookOverview.title}: ${grokkingBookOverview.subtitle}</h1>
        <p class="pe-hero-subtitle">${ui.subtitle}</p>
        <div class="pe-hero-ctas">
          <a href="#/grokking-algorithms/capitulo/ga-cap-1" class="pe-cta-btn primary">${ui.ctaExplore}</a>
          <a href="#/grokking-algorithms/complexidade" class="pe-cta-btn secondary">${ui.ctaBigO}</a>
          <a href="#/grokking-algorithms/laboratorios" class="pe-cta-btn secondary">${ui.ctaLabs}</a>
          <a href="#/grokking-algorithms/quizzes" class="pe-cta-btn secondary">${ui.ctaQuizzes}</a>
          <a href="https://link.amazon/B04UCSIMC" target="_blank" rel="noopener noreferrer" class="pe-cta-btn amazon-buy-btn" title="${t("buyBookTooltip") || "Comprar livro físico ou Kindle na Amazon"}">
            ${icons.shoppingCart} <span>${t("buyOnAmazon") || "Comprar na Amazon"}</span>
          </a>
        </div>
      </div>

      <!-- Barra de Filtro e Salto Rápido Fixa no Topo ao Rolar -->
      <div class="pe-filter-bar" role="tablist" aria-label="Partes de Entendendo Algoritmos" id="ga-sticky-tabs">
        <button type="button" class="pe-filter-tab active" data-cat-filter="todos" data-target-sec="all">${ui.allParts}</button>
        <button type="button" class="pe-filter-tab" data-cat-filter="foundations" data-target-sec="sec-part-1">${ui.p1Tab}</button>
        <button type="button" class="pe-filter-tab" data-cat-filter="divide-hash" data-target-sec="sec-part-2">${ui.p2Tab}</button>
        <button type="button" class="pe-filter-tab" data-cat-filter="graphs" data-target-sec="sec-part-3">${ui.p3Tab}</button>
        <button type="button" class="pe-filter-tab" data-cat-filter="advanced" data-target-sec="sec-part-4">${ui.p4Tab}</button>
      </div>

      <!-- Capítulos Agrupados por Seções Temáticas -->
      <div class="cc-chapters-container" id="ga-chapters-grid">
        ${[
      { id: "sec-part-1", cat: "foundations", title: ui.p1Title, items: part1 },
      { id: "sec-part-2", cat: "divide-hash", title: ui.p2Title, items: part2 },
      { id: "sec-part-3", cat: "graphs", title: ui.p3Title, items: part3 },
      { id: "sec-part-4", cat: "advanced", title: ui.p4Title, items: part4 }
    ]
      .map(
        (part) => `
          <section class="cc-chapter-section" id="${part.id}" data-section-cat="${part.cat}">
            <h2 class="cc-section-header">
              <span class="cc-section-dot cat-${part.cat}"></span>
              <span class="cc-section-title">${part.title}</span>
            </h2>
            <div class="pe-patterns-grid">
              ${part.items.map((ch) => renderChapterCard(ch, studied)).join("")}
            </div>
          </section>
        `
      )
      .join("")}
      </div>

      <!-- Pilares Centrais -->
      <section class="mt-4">
        <h2 class="section-title">${ui.pillarsTitle}</h2>
        <div class="grid-2">
          ${grokkingBookOverview.corePrinciples
      .map(
        (p) => `
            <div class="info-card">
              <h4>${p.title}</h4>
              <p>${p.description}</p>
            </div>
          `
      )
      .join("")}
        </div>
      </section>

      <!-- Autor -->
      <section class="mt-4">
        <h2 class="section-title">${ui.authorsTitle}</h2>
        <div class="authors-grid">
          ${grokkingBookOverview.authors
      .map(
        (a) => `
            <div class="author-card">
              <div class="author-avatar">${a.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)}</div>
              <h4>${a.name}</h4>
              <div class="author-role">${a.role}</div>
              <p style="font-size:0.86rem; color:var(--text-secondary); margin-top:0.5rem;">${a.bio}</p>
            </div>
          `
      )
      .join("")}
        </div>
      </section>
    </div>
  `;

  container.querySelectorAll(".pe-filter-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      container.querySelectorAll(".pe-filter-tab").forEach((b) => b.classList.remove("active"));
      tab.classList.add("active");
      const cat = tab.getAttribute("data-cat-filter");
      const sections = container.querySelectorAll(".cc-chapter-section");
      sections.forEach((sec) => {
        const secCat = sec.getAttribute("data-section-cat");
        sec.style.display = cat === "todos" || secCat === cat ? "block" : "none";
      });
    });
  });
}

function renderChapterCard(ch, studiedList) {
  const isStudied = studiedList.includes(ch.id);
  const lang = getLang();
  const loc = getLocalizedChapter(ch);
  const chapterPrefix = `Cap. ${String(ch.number).padStart(2, "0")}`;

  return `
    <a href="#/grokking-algorithms/capitulo/${ch.id}" class="pe-pattern-card cat-${ch.category}" data-card-cat="${ch.category}">
      <div class="pe-card-top">
        <span class="pe-card-code cat-${ch.category}">${ch.code}</span>
        <div class="pe-card-badges">
          <span class="pe-mini-scope">${getLocalizedScope(ch.scope, lang)}</span>
          <span class="pe-mini-page">P. ${ch.gofPage}</span>
          ${isStudied ? `<span class="pe-mini-studied" title="${t("markedStudied") || "Concluído"}">✓</span>` : ""}
        </div>
      </div>
      <h3 class="pe-card-title">${chapterPrefix} • ${loc.name}</h3>
      <div class="pe-card-subtitle">${loc.subtitle}</div>
      <p class="pe-card-intent">${loc.intent}</p>
      <div class="pe-card-footer">
        <span class="pe-card-cat-tag cat-${ch.category}">${getPartLabel(ch.category)}</span>
        <span class="pe-card-explore">${t("heroCardExplore") || "Explorar"} →</span>
      </div>
    </a>
  `;
}

/**
 * 2. PÁGINA DE DETALHE DO CAPÍTULO (#/grokking-algorithms/capitulo/:id)
 */
export function renderGrokkingChapterPage(container, chapterId) {
  const ch = grokkingChaptersData.find((item) => item.id === chapterId);
  if (!ch) {
    container.innerHTML = `
      <div class="callout callout-danger">
        <h5>Capítulo não encontrado</h5>
        <p>O capítulo solicitado ("${chapterId}") não existe no catálogo de Entendendo Algoritmos. <a href="#/grokking-algorithms">Voltar ao catálogo</a>.</p>
      </div>
    `;
    return;
  }

  const studied = getStudiedPatterns("grokking-algorithms");
  const isStudied = studied.includes(ch.id);
  const lang = getLang();
  const loc = getLocalizedChapter(ch);
  const hasVisualizer = Boolean(grokkingAlgorithmsAnimations[ch.id]);
  const badgeClass =
    ch.category === "foundations"
      ? "badge-creational"
      : ch.category === "divide-hash"
        ? "badge-structural"
        : "badge-behavioral";

  const idx = grokkingChaptersData.findIndex((item) => item.id === ch.id);
  const prevCh = idx > 0 ? grokkingChaptersData[idx - 1] : null;
  const nextCh = idx < grokkingChaptersData.length - 1 ? grokkingChaptersData[idx + 1] : null;

  container.innerHTML = `
    <!-- Top Navigation & Completion Bar -->
    <div class="page-action-header">
      <div class="pager-buttons">
        ${prevCh
      ? `<a href="#/grokking-algorithms/capitulo/${prevCh.id}" class="pager-btn">← ${t("navPrev") || "Anterior"}: ${prevCh.name}</a>`
      : `<a href="#/grokking-algorithms" class="pager-btn">← Catálogo Entendendo Algoritmos</a>`
    }
      </div>

      <button type="button" class="bookmark-action-btn ${isStudied ? "marked" : ""}" id="btn-toggle-bookmark">
        ${isStudied ? `${icons.bookmarkCheck} <span>${t("completedLabel") || "Concluído"}</span>` : `${icons.bookmark} <span>${t("markAsStudied") || "Marcar como Estudado"}</span>`}
      </button>

      <div class="pager-buttons">
        ${nextCh
      ? `<a href="#/grokking-algorithms/capitulo/${nextCh.id}" class="pager-btn next-btn">${t("navNext") || "Próximo"}: ${nextCh.name} →</a>`
      : `<a href="#/grokking-algorithms/quizzes" class="pager-btn next-btn">${t("quizzesPractice") || "Quizzes & Prática"} →</a>`
    }
      </div>
    </div>

    <!-- Chapter Header Summary -->
    <div class="pattern-header-card">
      <div class="pattern-meta-badges">
        <span class="badge ${badgeClass}">${ch.code} • ${getPartLabel(ch.category)}</span>
        <span class="badge badge-scope">${t("scopeLabel") || "ESCOPO"}: ${getLocalizedScope(ch.scope, lang)}</span>
        <span class="badge badge-scope">Pág. ${ch.gofPage}</span>
        ${ch.readingTime ? `<span class="badge badge-scope">Leitura: ${ch.readingTime}</span>` : ""}
      </div>

      <h1 class="page-title">Cap. ${String(ch.number).padStart(2, "0")} • ${loc.name} <small class="pattern-local-subtitle">(${loc.subtitle})</small></h1>

      <p class="text-muted" style="font-size:0.86rem; margin-top:0.4rem; margin-bottom:0.75rem;">
        <strong>Conceitos & Tópicos Relacionados:</strong> ${ch.aliases.join(", ")}
      </p>

      <div class="callout callout-info" style="margin-top: 0.75rem; margin-bottom: 0">
        <h5>${t("intentTitle") || "Tese Central & Regra do Algoritmo"}</h5>
        <p style="font-size: 1.02rem; font-weight: 500">${loc.intent}</p>
      </div>
    </div>

    <!-- Quick Jump Workspace Tabs (Sticky ScrollSpy Navigation) -->
    <nav class="pe-section-jump-nav" aria-label="Seções do Capítulo">
      ${hasVisualizer ? `<a href="#sec-visualizer" class="pe-jump-link active" data-jump="sec-visualizer">${t("tabVisualizer")}</a>` : ""}
      <a href="#sec-architecture" class="pe-jump-link ${hasVisualizer ? "" : "active"}" data-jump="sec-architecture">${t("tabArchitecture")}</a>
      <a href="#sec-code" class="pe-jump-link" data-jump="sec-code">${t("tabCode")}</a>
      <a href="#sec-quiz" class="pe-jump-link" data-jump="sec-quiz">${t("tabLabQuiz")}</a>
    </nav>

    <!-- 1. Interactive Step-by-Step Visualizer & Object Inspector -->
    ${hasVisualizer
      ? `
    <div id="sec-visualizer">
      <div id="pattern-visualizer-mount"></div>
    </div>`
      : ""
    }

    <!-- 2. Problem, Solution & Structure -->
    <div id="sec-architecture">
      <h2 class="section-title">${t("problemTitle") || "1. O Problema & Motivação"}</h2>
      <div class="info-card">
        <p>${formatParagraphs(loc.problem)}</p>
      </div>

      <h2 class="section-title mt-4">${t("solutionTitle") || "2. Funcionamento Passo a Passo & Análise Ilustrada"}</h2>
      ${lang === "pt" && ch.sections && ch.sections.length > 0
      ? ch.sections
        .map(
          (sec, sIdx) => `
            <div class="info-card" style="margin-bottom: 1rem;">
              <h4>2.${sIdx + 1}. ${sec.heading}</h4>
              <p>${formatParagraphs(sec.body)}</p>
              ${sec.bullets && sec.bullets.length
              ? `<ul>${sec.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>`
              : ""
            }
              ${sec.callout
              ? `
                <div class="callout callout-${sec.callout.type === "warning" ? "warning" : "info"}" style="margin-top:0.85rem; margin-bottom:0;">
                  <h5>${sec.callout.title}</h5>
                  <p>${sec.callout.text}</p>
                </div>
              `
              : ""
            }
            </div>
          `
        )
        .join("")
      : `
            <div class="info-card">
              <p>${formatParagraphs(loc.solution)}</p>
            </div>
          `
    }

      <!-- 3. PILARES E REGRAS ESSENCIAIS -->
      <h2 class="section-title mt-4">Diretrizes & Conceitos-Chave do Capítulo</h2>
      <div class="info-card">
        <h5>Pilares e Regras Fundamentais:</h5>
        <ul>
          ${ch.structure.participants
      .map((p) => `<li><strong>${p.name}:</strong> ${p.role}</li>`)
      .join("")}
        </ul>
        <h5 class="mt-3">Dinâmica de Execução e Complexidade:</h5>
        <p>${ch.structure.collaborations}</p>
      </div>

      <!-- 4. QUANDO APLICAR -->
      <h2 class="section-title mt-4">Quando Aplicar & Pragmatismo</h2>
      <div class="info-card">
        <ul>
          ${ch.applicability.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>

      <!-- 5. PRÓS E CONTRAS -->
      <h2 class="section-title mt-4">${t("consequencesTitle") || "Vantagens vs. Cuidados Assintóticos"}</h2>
      <div class="tradeoffs-container">
        <div class="tradeoff-card tradeoff-pros">
          <h5>${t("prosTitle") || "✓ Vantagens & Ganhos de Desempenho"}</h5>
          <ul>
            ${loc.pros.map((pro) => `<li>${pro}</li>`).join("")}
          </ul>
        </div>
        <div class="tradeoff-card tradeoff-cons">
          <h5>${t("consTitle") || "! Cuidados, Limitações & Suposições"}</h5>
          <ul>
            ${loc.cons.map((con) => `<li>${con}</li>`).join("")}
          </ul>
        </div>
      </div>

      <!-- 6. NOTAS DE IMPLEMENTAÇÃO -->
      <h2 class="section-title mt-4">Notas de Implementação & Detalhes Técnicos</h2>
      <div class="info-card">
        <ul>
          ${ch.implementationNotes.map((note) => `<li>${note}</li>`).join("")}
        </ul>
      </div>
    </div>

    <!-- 3. EXEMPLOS DE CÓDIGO MULTI-LINGUAGEM -->
    <div id="sec-code">
      <h2 class="section-title mt-4">Implementações de Código (Python Oficial, Java, TypeScript & Comparativo Naive)</h2>
      <p class="text-muted mb-3">Compare a implementação oficial em Python (livro de Aditya Bhargava) com as versões otimizadas em Java, TypeScript e a abordagem Ingênua/Força Bruta:</p>

      <div class="code-block-wrapper" id="pattern-code-box">
        <div class="code-header">
          <div class="code-tabs" role="tablist" aria-label="Linguagem do Exemplo">
            <button type="button" class="code-tab-btn active" data-lang="python">Python 3 (Livro Oficial)</button>
            <button type="button" class="code-tab-btn" data-lang="java">Java (Otimizado)</button>
            <button type="button" class="code-tab-btn" data-lang="typescript">TypeScript</button>
            <button type="button" class="code-tab-btn" data-lang="dirty">Abordagem Naive / Força Bruta</button>
          </div>
          <button type="button" class="copy-btn" id="btn-copy-code">${icons.copy} <span>Copiar Código</span></button>
        </div>
        <pre class="code-content"><code id="code-snippet-el"></code></pre>
      </div>

      <h2 class="section-title mt-4">Aplicações no Mundo Real (Sistemas em Produção)</h2>
      <div class="info-card">
        <div class="grid-3" style="margin: 0;">
          ${ch.realWorldUses
      .map(
        (use, idx) => `
            <div>
              <span class="badge badge-scope mb-2">Aplicação #${idx + 1}</span>
              <p style="font-size: 0.92rem;">${use}</p>
            </div>
          `
      )
      .join("")}
        </div>
      </div>

      <h2 class="section-title mt-4">Capítulos Relacionados</h2>
      <div class="info-card">
        <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
          ${ch.relatedPatterns
      .map((relId) => {
        const rel = grokkingChaptersData.find((item) => item.id === relId);
        return rel
          ? `<a href="#/grokking-algorithms/capitulo/${rel.id}" class="btn btn-sm btn-outline">${rel.name}</a>`
          : "";
      })
      .join("")}
        </div>
      </div>
    </div>

    <!-- 4. Interactive Playground & Quiz -->
    <div id="sec-quiz">
      ${ch.playgroundId && grokkingAlgorithmsLabs[ch.playgroundId]
      ? `
        <h2 class="section-title mt-4">Laboratório Visual & Gráfico Interativo</h2>
        <div id="inline-lab-container"></div>
      `
      : ""
    }

      <h2 class="section-title mt-4">Exercícios de Fixação & Diagnóstico do Capítulo</h2>
      <div id="inline-quiz-container"></div>

      <h2 class="section-title mt-4">Referências Bibliográficas</h2>
      <div class="info-card">
        <ul>
          ${ch.references
      .map(
        (ref) => `
            <li>
              <strong>${ref.book}</strong> • ${ref.chapter} (${ref.pages}): ${ref.summary}
            </li>
          `
      )
      .join("")}
        </ul>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <div class="page-action-header mt-5">
      <div class="pager-buttons">
        ${prevCh
      ? `<a href="#/grokking-algorithms/capitulo/${prevCh.id}" class="pager-btn">← Anterior: ${prevCh.name}</a>`
      : `<a href="#/grokking-algorithms" class="pager-btn">← Catálogo Entendendo Algoritmos</a>`
    }
      </div>
      <div class="pager-buttons">
        ${nextCh
      ? `<a href="#/grokking-algorithms/capitulo/${nextCh.id}" class="pager-btn next-btn">Próximo: ${nextCh.name} →</a>`
      : `<a href="#/grokking-algorithms/quizzes" class="pager-btn next-btn">Quizzes & Prática →</a>`
    }
      </div>
    </div>
  `;

  // 0. Inicializa o Fluxograma Interativo
  const vizMount = container.querySelector("#pattern-visualizer-mount");
  if (vizMount && hasVisualizer) {
    renderPatternVisualizer(vizMount, ch);
  }

  // 1. Inicializa o código com Python por padrão
  let activeLang = "python";
  const codeEl = container.querySelector("#code-snippet-el");
  const updateCodeView = (langKey) => {
    activeLang = langKey;
    const rawCode = ch.codeExamples[langKey] || ch.codeExamples.python || "";
    const syntaxLang = langKey === "dirty" ? "java" : langKey;
    codeEl.innerHTML = highlightCode(rawCode, syntaxLang);
  };
  updateCodeView("python");

  container.querySelectorAll(".code-tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      container.querySelectorAll(".code-tab-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      updateCodeView(btn.getAttribute("data-lang"));
    });
  });

  // 2. Botão de Copiar Código
  const copyBtn = container.querySelector("#btn-copy-code");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const raw = ch.codeExamples[activeLang] || "";
      navigator.clipboard.writeText(raw).then(() => {
        copyBtn.innerHTML = `${icons.check} <span>Copiado!</span>`;
        setTimeout(() => {
          copyBtn.innerHTML = `${icons.copy} <span>Copiar Código</span>`;
        }, 1800);
      });
    });
  }

  // 3. Botão Marcar como Estudado (Bookmark)
  const btnBookmark = container.querySelector("#btn-toggle-bookmark");
  if (btnBookmark) {
    btnBookmark.addEventListener("click", () => {
      const isNowStudied = togglePatternStudied(ch.id);
      if (isNowStudied) {
        btnBookmark.classList.add("marked");
        btnBookmark.innerHTML = `${icons.bookmarkCheck} <span>${t("completedLabel") || "Concluído"}</span>`;
      } else {
        btnBookmark.classList.remove("marked");
        btnBookmark.innerHTML = `${icons.bookmark} <span>${t("markAsStudied") || "Marcar como Estudado"}</span>`;
      }
    });
  }

  // 4. Renderiza o Simulador Interativo
  const labContainer = container.querySelector("#inline-lab-container");
  if (labContainer && ch.playgroundId && grokkingAlgorithmsLabs[ch.playgroundId]) {
    grokkingAlgorithmsLabs[ch.playgroundId].render(labContainer);
  }

  // 5. Renderiza Exercícios e Cenários do Capítulo
  const inlineQuizContainer = container.querySelector("#inline-quiz-container");
  if (inlineQuizContainer) {
    renderPatternExercises(inlineQuizContainer, ch.id);
  }

  // 6. Sub-navegação suave entre seções com ScrollSpy e Sticky Navigation
  const jumpNav = container.querySelector(".pe-section-jump-nav");
  if (jumpNav) initStickyNav(jumpNav);
  const jumpLinks = container.querySelectorAll(".pe-jump-link");
  const jumpSections = [
    { id: "sec-visualizer", el: container.querySelector("#sec-visualizer") },
    { id: "sec-architecture", el: container.querySelector("#sec-architecture") },
    { id: "sec-code", el: container.querySelector("#sec-code") },
    { id: "sec-quiz", el: container.querySelector("#sec-quiz") }
  ].filter((s) => Boolean(s.el));

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

  if (window.__gaChapterScrollSpyHandler) {
    window.removeEventListener("scroll", window.__gaChapterScrollSpyHandler);
  }
  window.__gaChapterScrollSpyHandler = onChapterScroll;
  window.addEventListener("scroll", onChapterScroll, { passive: true });
}

/**
 * 3. TABELA COMPARATIVA DE COMPLEXIDADE BIG O (#/grokking-algorithms/complexidade)
 */
export function renderGrokkingComplexityScalePage(container) {
  container.innerHTML = `
    <div class="content-page">
      <div class="breadcrumb">
        <a href="#/grokking-algorithms">Entendendo Algoritmos</a>
        <span>/</span>
        <span>Tabela de Complexidade Big O</span>
      </div>

      <h1 class="page-title">Tabela Completa de Complexidade Assintótica (Big O)</h1>
      <p class="page-subtitle">
        A notação Big O não mede o tempo em segundos, mas sim a velocidade com que o número de operações cresce à medida que o tamanho da entrada (<em>n</em>) aumenta. Compare abaixo os principais algoritmos e estruturas de dados de Aditya Y. Bhargava.
      </p>

      <h2 class="section-title mt-4">1. As 5 Grandes Classes de Tempo de Execução do Livro</h2>
      <div class="table-responsive">
        <table class="gof-table">
          <thead>
            <tr>
              <th>Notação Big O</th>
              <th>Nome da Classe</th>
              <th>Algoritmo Exemplo</th>
              <th>n = 10 itens</th>
              <th>n = 1.000 itens</th>
              <th>n = 1.000.000 itens</th>
              <th>Comportamento Prático</th>
            </tr>
          </thead>
          <tbody>
            ${bigOScaleTable
      .map(
        (row) => `
              <tr>
                <td><span class="badge badge-creational" style="font-family:var(--font-mono);">${row.notation}</span></td>
                <td><strong>${row.name}</strong></td>
                <td>${row.example}</td>
                <td style="font-family:var(--font-mono);">${row.n10}</td>
                <td style="font-family:var(--font-mono);">${row.n1000}</td>
                <td style="font-family:var(--font-mono);">${row.n1000000}</td>
                <td>${row.verdict}</td>
              </tr>
            `
      )
      .join("")}
          </tbody>
        </table>
      </div>

      <h2 class="section-title mt-4">2. Comparativo de Estruturas de Dados Fundamentais</h2>
      <div class="table-responsive">
        <table class="gof-table">
          <thead>
            <tr>
              <th>Estrutura de Dados</th>
              <th>Leitura / Busca</th>
              <th>Inserção</th>
              <th>Remoção</th>
              <th>Capítulo & Destaque Arquitetural</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Array (Desordenado)</strong></td>
              <td><code>O(n)</code> (Acesso por índice: <code>O(1)</code>)</td>
              <td><code>O(n)</code></td>
              <td><code>O(n)</code></td>
              <td><a href="#/grokking-algorithms/capitulo/ga-cap-2">Cap. 02</a> • Alocação contígua em memória RAM; leitura instantânea por posição.</td>
            </tr>
            <tr>
              <td><strong>Array Ordenado (Pesquisa Binária)</strong></td>
              <td><code>O(log n)</code></td>
              <td><code>O(n)</code></td>
              <td><code>O(n)</code></td>
              <td><a href="#/grokking-algorithms/capitulo/ga-cap-1">Cap. 01</a> • Divide o espaço de busca pela metade a cada tentativa.</td>
            </tr>
            <tr>
              <td><strong>Lista Encadeada (Linked List)</strong></td>
              <td><code>O(n)</code></td>
              <td><code>O(1)</code></td>
              <td><code>O(1)</code></td>
              <td><a href="#/grokking-algorithms/capitulo/ga-cap-2">Cap. 02</a> • Nós espalhados na memória ligados por ponteiros; ótima para filas.</td>
            </tr>
            <tr>
              <td><strong>Tabela Hash (Caso Médio)</strong></td>
              <td><code>O(1)</code></td>
              <td><code>O(1)</code></td>
              <td><code>O(1)</code></td>
              <td><a href="#/grokking-algorithms/capitulo/ga-cap-5">Cap. 05</a> • Mantém fator de carga &lt; 0,7 com boa função hash.</td>
            </tr>
            <tr>
              <td><strong>Tabela Hash (Pior Caso • Colisão Total)</strong></td>
              <td><code>O(n)</code></td>
              <td><code>O(n)</code></td>
              <td><code>O(n)</code></td>
              <td><a href="#/grokking-algorithms/capitulo/ga-cap-5">Cap. 05</a> • Degrada para uma lista encadeada quando todas as chaves colidem.</td>
            </tr>
            <tr>
              <td><strong>Árvore Binária Balanceada / B-Tree</strong></td>
              <td><code>O(log n)</code></td>
              <td><code>O(log n)</code></td>
              <td><code>O(log n)</code></td>
              <td><a href="#/grokking-algorithms/capitulo/ga-cap-11">Cap. 11</a> • Equilíbrio entre busca logarítmica e inserção eficiente sem realocação.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="section-title mt-4">3. Resumo de Complexidade por Algoritmo do Livro</h2>
      <div class="grid-2">
        <div class="info-card">
          <h4>Ordenação: Seleção O(n²) vs. Quicksort O(n log n)</h4>
          <p>Enquanto a <a href="#/grokking-algorithms/capitulo/ga-cap-2">Ordenação por Seleção</a> varre toda a lista <em>n</em> vezes exigindo <code>O(n²)</code> operações, o <a href="#/grokking-algorithms/capitulo/ga-cap-4">Quicksort</a> utiliza Dividir para Conquistar com pivôs balanceados para ordenar em <code>O(n log n)</code> no caso médio.</p>
        </div>
        <div class="info-card">
          <h4>Grafos: BFS O(V + E) vs. Dijkstra</h4>
          <p>A <a href="#/grokking-algorithms/capitulo/ga-cap-6">Pesquisa em Largura (BFS)</a> encontra o caminho com menos arestas em grafos não-ponderados em <code>O(V + E)</code>. Já o <a href="#/grokking-algorithms/capitulo/ga-cap-7">Algoritmo de Dijkstra</a> calcula a rota de menor custo acumulado em grafos ponderados com pesos positivos.</p>
        </div>
      </div>
    </div>
  `;
}

/**
 * 4. HUB DE LABORATÓRIOS INTERATIVOS (#/grokking-algorithms/laboratorios)
 */
export function renderGrokkingLabsHubPage(container) {
  const labKeys = Object.keys(grokkingAlgorithmsLabs);

  container.innerHTML = `
    <div class="content-page">
      <div class="breadcrumb">
        <a href="#/grokking-algorithms">Entendendo Algoritmos</a>
        <span>/</span>
        <span>Laboratórios & Simuladores</span>
      </div>

      <h1 class="page-title">8 Laboratórios e Simuladores Visuais de Algoritmos</h1>
      <p class="page-subtitle">
        Experimente na prática cada estrutura de dados e algoritmo do livro: compare Pesquisa Binária vs. Linear passo a passo, visualize a Call Stack, particione com Quicksort, simule colisões em Tabelas Hash, explore Grafos com BFS e Dijkstra, resolva o Problema da Mochila 0/1 e classifique com KNN.
      </p>

      <div class="factory-selector-tabs mb-4" id="ga-labs-selector-tabs">
        ${labKeys
      .map(
        (key, idx) => `
          <button type="button" class="btn btn-tab ${idx === 0 ? "active" : ""}" data-lab="${key}">
            ${idx + 1}. ${grokkingAlgorithmsLabs[key].name.replace(/\s*\(Cap\.\s*\d+\)/i, "")}
          </button>
        `
      )
      .join("")}
      </div>

      <div id="ga-active-lab-render-area"></div>
    </div>
  `;

  const renderArea = container.querySelector("#ga-active-lab-render-area");
  const tabs = container.querySelectorAll("#ga-labs-selector-tabs .btn-tab");

  function loadLab(labId) {
    const lab = grokkingAlgorithmsLabs[labId];
    if (!lab || !renderArea) return;
    renderArea.innerHTML = `
      <div class="mb-2" style="display:flex; justify-content:space-between; align-items:center;">
        <span class="text-muted" style="font-size:0.85rem;">Simulador vinculado ao capítulo:</span>
        <a href="#/grokking-algorithms/capitulo/${lab.patternId}" class="btn btn-sm btn-outline">Abrir Capítulo Completo →</a>
      </div>
      <div id="ga-lab-inner-mount"></div>
    `;
    const innerMount = renderArea.querySelector("#ga-lab-inner-mount");
    lab.render(innerMount);
  }

  loadLab(labKeys[0]);

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((tBtn) => tBtn.classList.remove("active"));
      tab.classList.add("active");
      loadLab(tab.getAttribute("data-lab"));
    });
  });
}

/**
 * 5. PÁGINA SOBRE O AUTOR & REFERÊNCIAS (#/grokking-algorithms/referencias)
 */
export function renderGrokkingReferencesPage(container) {
  container.innerHTML = `
    <div class="content-page">
      <div class="breadcrumb">
        <a href="#/grokking-algorithms">Entendendo Algoritmos</a>
        <span>/</span>
        <span>Autor & Bibliografia</span>
      </div>

      <h1 class="page-title">Sobre Aditya Y. Bhargava & Referências Bibliográficas</h1>
      <p class="page-subtitle">
        Conheça o autor de <em>Grokking Algorithms</em> (Manning Publications / Editora Novatec) e as obras clássicas de Ciência da Computação que fundamentam o livro.
      </p>

      <h2 class="section-title mt-4">Autor da Obra</h2>
      <div class="authors-grid">
        ${grokkingBookOverview.authors
      .map(
        (a) => `
          <div class="author-card">
            <div class="author-avatar">${a.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)}</div>
            <h4>${a.name}</h4>
            <div class="author-role">${a.role}</div>
            <p style="font-size:0.88rem; color:var(--text-secondary); margin-top:0.5rem;">${a.bio}</p>
          </div>
        `
      )
      .join("")}
      </div>

      <h2 class="section-title mt-4">Obras Complementares Recomendadas</h2>
      <div class="grid-2">
        <div class="info-card">
          <h4>Entendendo Algoritmos (Grokking Algorithms)</h4>
          <p class="text-primary mb-2" style="font-size:0.85rem; font-weight:600;">Aditya Y. Bhargava • Manning / Novatec (2016 / 2017)</p>
          <p class="text-muted" style="font-size:0.88rem;">Obra base deste guia interativo, estruturada em 11 capítulos com mais de 400 ilustrações passo a passo e exemplos práticos em Python.</p>
        </div>
        <div class="info-card">
          <h4>Algoritmos: Teoria e Prática (CLRS)</h4>
          <p class="text-primary mb-2" style="font-size:0.85rem; font-weight:600;">Cormen, Leiserson, Rivest & Stein • MIT Press</p>
          <p class="text-muted" style="font-size:0.88rem;">A referência acadêmica definitiva recomendada por Bhargava no Capítulo 11 para aprofundamento matemático formal em árvores, grafos e demonstrações assintóticas.</p>
        </div>
        <div class="info-card">
          <h4>Algorithms (4th Edition)</h4>
          <p class="text-primary mb-2" style="font-size:0.85rem; font-weight:600;">Robert Sedgewick & Kevin Wayne • Addison-Wesley</p>
          <p class="text-muted" style="font-size:0.88rem;">Abordagem prática orientada a estruturas de dados, ordenação, tabelas de símbolos e algoritmos em grafos com implementações industriais em Java.</p>
        </div>
        <div class="info-card">
          <h4>The Algorithm Design Manual</h4>
          <p class="text-primary mb-2" style="font-size:0.85rem; font-weight:600;">Steven S. Skiena • Springer</p>
          <p class="text-muted" style="font-size:0.88rem;">Focado na modelagem prática de problemas reais e no catálogo de problemas algorítmicos, incluindo heurísticas para problemas NP-Completos.</p>
        </div>
      </div>
    </div>
  `;
}

/**
 * Roteador de rotas de Entendendo Algoritmos (#/grokking-algorithms)
 */
export function handleGrokkingRoute(contentArea, hash = window.location.hash || "#/grokking-algorithms") {
  if (hash === "#/grokking-algorithms") {
    renderGrokkingHomePage(contentArea);
  } else if (hash === "#/grokking-algorithms/complexidade") {
    renderGrokkingComplexityScalePage(contentArea);
  } else if (hash === "#/grokking-algorithms/laboratorios") {
    renderGrokkingLabsHubPage(contentArea);
  } else if (hash === "#/grokking-algorithms/quizzes") {
    renderQuizzesPage(contentArea, { book: "grokking-algorithms" });
  } else if (hash === "#/grokking-algorithms/referencias") {
    renderGrokkingReferencesPage(contentArea);
  } else if (hash.startsWith("#/grokking-algorithms/capitulo/")) {
    const chapterId = hash.replace("#/grokking-algorithms/capitulo/", "").trim();
    renderGrokkingChapterPage(contentArea, chapterId);
  } else {
    renderGrokkingHomePage(contentArea);
  }
}
