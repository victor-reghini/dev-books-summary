/**
 * Views dedicadas do livro "Node.js: Guia Completo de Versões, Event Loop & Frameworks":
 * - Catálogo Principal dos 12 Capítulos em 4 Partes (#/node)
 * - Página de Detalhe do Capítulo (#/node/capitulo/:id)
 * - Tabela Interativa de Versões do Node.js & Frameworks (Express, Fastify, NestJS, Hono & Koa) (#/node/versoes-e-frameworks)
 * - Hub de Laboratórios Interativos (#/node/laboratorios)
 * - Sobre os Autores & Bibliografia (#/node/referencias)
 */

import { nodeChaptersData } from "../../books/node/explanations/chapters-data.js";
import { nodeBookOverview, nodeVersionsMatrix, nodeFrameworksHistory } from "../../books/node/explanations/book-overview.js";
import { nodeLabs } from "../../books/node/examples/node-labs.js";
import { highlightCode } from "../utils/code-highlighter.js";
import { getStudiedPatterns, togglePatternStudied } from "./sidebar.js";
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
    "event-loop-libuv": { pt: "Event Loop & libuv", en: "Event Loop & libuv", es: "Event Loop y libuv", it: "Event Loop e libuv", fr: "Event Loop et libuv" },
    "buffers-es6": { pt: "Buffers & ES2015", en: "Buffers & ES2015", es: "Buffers y ES2015", it: "Buffers ed ES2015", fr: "Buffers et ES2015" },
    "async-await-napi": { pt: "async/await & N-API", en: "async/await & N-API", es: "async/await y N-API", it: "async/await e N-API", fr: "async/await et N-API" },
    "worker-threads-esm": { pt: "Worker Threads & ESM", en: "Worker Threads & ESM", es: "Worker Threads y ESM", it: "Worker Threads e ESM", fr: "Worker Threads et ESM" },
    "asynclocalstorage-exports": { pt: "AsyncLocalStorage & Exports", en: "AsyncLocalStorage & Exports", es: "AsyncLocalStorage y Exports", it: "AsyncLocalStorage e Exports", fr: "AsyncLocalStorage et Exports" },
    "abortcontroller-node-prefix": { pt: "AbortController & node:", en: "AbortController & node:", es: "AbortController y node:", it: "AbortController e node:", fr: "AbortController et node:" },
    "fetch-test-runner": { pt: "Fetch & Test Runner", en: "Fetch & Test Runner", es: "Fetch y Test Runner", it: "Fetch e Test Runner", fr: "Fetch et Test Runner" },
    "permission-env-file": { pt: "Permission & .env", en: "Permission & .env", es: "Permission y .env", it: "Permission e .env", fr: "Permission et .env" },
    "require-esm-sqlite": { pt: "require(esm) & SQLite", en: "require(esm) & SQLite", es: "require(esm) y SQLite", it: "require(esm) e SQLite", fr: "require(esm) et SQLite" },
    "express-pipeline": { pt: "Express 5 & Koa", en: "Express 5 & Koa", es: "Express 5 y Koa", it: "Express 5 e Koa", fr: "Express 5 et Koa" },
    "fastify-radix": { pt: "Fastify 5 & Schemas", en: "Fastify 5 & Schemas", es: "Fastify 5 y Schemas", it: "Fastify 5 e Schemas", fr: "Fastify 5 et Schemas" },
    "nestjs-hono": { pt: "NestJS 11 & Hono 4", en: "NestJS 11 & Hono 4", es: "NestJS 11 y Hono 4", it: "NestJS 11 e Hono 4", fr: "NestJS 11 et Hono 4" }
  };
  return map[scopeKey]?.[lang] || map[scopeKey]?.pt || scopeKey;
}

function getPartLabel(category) {
  const lang = getLang();
  const labels = {
    "core-eventloop": {
      pt: "Parte 1 • Fundamentos do Runtime, Event Loop & Streams",
      en: "Part 1 • Runtime Foundations, Event Loop & Streams",
      es: "Parte 1 • Fundamentos del Runtime, Event Loop y Streams",
      it: "Parte 1 • Fondamenti del Runtime, Event Loop e Streams",
      fr: "Partie 1 • Fondamentaux du Runtime, Event Loop et Streams"
    },
    "esm-concurrency": {
      pt: "Parte 2 • Módulos ESM, Concorrência & Worker Threads",
      en: "Part 2 • ESM Modules, Concurrency & Worker Threads",
      es: "Parte 2 • Módulos ESM, Concurrencia y Worker Threads",
      it: "Parte 2 • Moduli ESM, Concorrenza e Worker Threads",
      fr: "Partie 2 • Modules ESM, Concurrence et Worker Threads"
    },
    "modern-runtime": {
      pt: "Parte 3 • Runtime Moderno, Test Runner & TypeScript",
      en: "Part 3 • Modern Runtime, Test Runner & TypeScript",
      es: "Parte 3 • Runtime Moderno, Test Runner y TypeScript",
      it: "Parte 3 • Runtime Moderno, Test Runner e TypeScript",
      fr: "Partie 3 • Runtime Moderne, Test Runner et TypeScript"
    },
    "node-frameworks": {
      pt: "Parte 4 • Frameworks Web: Express 5, Fastify, NestJS & Hono",
      en: "Part 4 • Web Frameworks: Express 5, Fastify, NestJS & Hono",
      es: "Parte 4 • Frameworks Web: Express 5, Fastify, NestJS y Hono",
      it: "Parte 4 • Framework Web: Express 5, Fastify, NestJS e Hono",
      fr: "Partie 4 • Frameworks Web: Express 5, Fastify, NestJS et Hono"
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
 * 1. PÁGINA PRINCIPAL DO LIVRO NODE.JS (#/node)
 */
export function renderNodeHomePage(container) {
  const studied = getStudiedPatterns("node");
  const lang = getLang();
  const part1 = nodeChaptersData.filter((c) => c.category === "core-eventloop");
  const part2 = nodeChaptersData.filter((c) => c.category === "esm-concurrency");
  const part3 = nodeChaptersData.filter((c) => c.category === "modern-runtime");
  const part4 = nodeChaptersData.filter((c) => c.category === "node-frameworks");

  container.innerHTML = `
    <div class="pe-home-wrapper">
      <div class="pe-hero">
        <div class="pe-hero-badge">${nodeBookOverview.authors[0].name} • ${nodeBookOverview.edition}</div>
        <h1 class="pe-hero-title">${nodeBookOverview.title}</h1>
        <p class="pe-hero-subtitle">${nodeBookOverview.subtitle}</p>
        <div class="pe-hero-ctas">
          <a href="#/node/capitulo/nd-cap-1" class="pe-cta-btn primary">Explorar os 12 Capítulos</a>
          <a href="#/node/versoes-e-frameworks" class="pe-cta-btn secondary">Versões & Frameworks (Express / Fastify)</a>
          <a href="#/node/laboratorios" class="pe-cta-btn secondary">6 Laboratórios Interativos</a>
          <a href="#/node/quizzes" class="pe-cta-btn secondary">Quizzes & Prática</a>
        </div>
      </div>

      <!-- Barra de Filtro e Salto Rápido Fixa no Topo -->
      <div class="pe-filter-bar" role="tablist" aria-label="Partes do Livro Node.js" id="nd-sticky-tabs">
        <button type="button" class="pe-filter-tab active" data-cat-filter="todos">Todas as Partes (${nodeChaptersData.length})</button>
        <button type="button" class="pe-filter-tab" data-cat-filter="core-eventloop">1. Event Loop & Streams (${part1.length})</button>
        <button type="button" class="pe-filter-tab" data-cat-filter="esm-concurrency">2. ESM & Concorrência (${part2.length})</button>
        <button type="button" class="pe-filter-tab" data-cat-filter="modern-runtime">3. Runtime Moderno & TS (${part3.length})</button>
        <button type="button" class="pe-filter-tab" data-cat-filter="node-frameworks">4. Frameworks HTTP (${part4.length})</button>
      </div>

      <!-- Capítulos Agrupados por Seções Temáticas -->
      <div class="cc-chapters-container" id="nd-chapters-grid">
        ${[
          { id: "sec-part-1", cat: "core-eventloop", title: "Parte 1 • Arquitetura V8, libuv, Event Loop & Streams (Node 0.10 a 10)", items: part1 },
          { id: "sec-part-2", cat: "esm-concurrency", title: "Parte 2 • Módulos ES, Worker Threads & AsyncLocalStorage (Node 12 a 16)", items: part2 },
          { id: "sec-part-3", cat: "modern-runtime", title: "Parte 3 • Runtime Moderno, Test Runner, TypeScript & SQLite (Node 18 a 24)", items: part3 },
          { id: "sec-part-4", cat: "node-frameworks", title: "Parte 4 • Frameworks HTTP: Express 5, Fastify 5, NestJS 11 & Hono 4", items: part4 }
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

      <!-- Pilares Fundamentais -->
      <section class="mt-4">
        <h2 class="section-title">Os 6 Pilares de Engenharia do Ecossistema Node.js</h2>
        <div class="grid-2">
          ${nodeBookOverview.corePrinciples
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

      <!-- Autores e Arquitetos -->
      <section class="mt-4">
        <h2 class="section-title">Arquitetos & Pioneiros do Runtime</h2>
        <div class="authors-grid">
          ${nodeBookOverview.authors
            .map(
              (a) => `
            <div class="author-card">
              <div class="author-avatar">${a.avatar || "ND"}</div>
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
    <a href="#/node/capitulo/${ch.id}" class="pe-pattern-card cat-${ch.category}" data-card-cat="${ch.category}">
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
 * 2. PÁGINA DE DETALHE DO CAPÍTULO (#/node/capitulo/:id)
 */
export function renderNodeChapterPage(container, chapterId) {
  const ch = nodeChaptersData.find((item) => item.id === chapterId);
  if (!ch) {
    container.innerHTML = `
      <div class="callout callout-danger">
        <h5>Capítulo não encontrado</h5>
        <p>O capítulo solicitado ("${chapterId}") não existe no livro Node.js. <a href="#/node">Voltar ao catálogo</a>.</p>
      </div>
    `;
    return;
  }

  const studied = getStudiedPatterns("node");
  const isStudied = studied.includes(ch.id);
  const lang = getLang();
  const loc = getLocalizedChapter(ch);
  const badgeClass =
    ch.category === "core-eventloop"
      ? "badge-creational"
      : ch.category === "esm-concurrency"
      ? "badge-structural"
      : ch.category === "modern-runtime"
      ? "badge-behavioral"
      : "badge-scope";

  const idx = nodeChaptersData.findIndex((item) => item.id === ch.id);
  const prevCh = idx > 0 ? nodeChaptersData[idx - 1] : null;
  const nextCh = idx < nodeChaptersData.length - 1 ? nodeChaptersData[idx + 1] : null;

  container.innerHTML = `
    <div class="page-action-header">
      <div class="pager-buttons">
        ${
          prevCh
            ? `<a href="#/node/capitulo/${prevCh.id}" class="pager-btn">← ${t("navPrev") || "Anterior"}: ${prevCh.name}</a>`
            : `<a href="#/node" class="pager-btn">← Catálogo Node.js</a>`
        }
      </div>

      <button type="button" class="bookmark-action-btn ${isStudied ? "marked" : ""}" id="btn-toggle-bookmark">
        ${isStudied ? `${icons.bookmarkCheck} <span>${t("completedLabel") || "Concluído"}</span>` : `${icons.bookmark} <span>${t("markAsStudied") || "Marcar como Estudado"}</span>`}
      </button>

      <div class="pager-buttons">
        ${
          nextCh
            ? `<a href="#/node/capitulo/${nextCh.id}" class="pager-btn">${t("navNext") || "Próximo"}: ${nextCh.name} →</a>`
            : `<a href="#/node" class="pager-btn">Início ↑</a>`
        }
      </div>
    </div>

    <!-- Cabeçalho do Capítulo -->
    <div class="pattern-header-card">
      <div class="pattern-header-badges">
        <span class="badge ${badgeClass}">${getPartLabel(ch.category)}</span>
        <span class="badge badge-scope">Página ${ch.gofPage}</span>
        <span class="badge badge-scope">${ch.code}</span>
      </div>

      <h1 class="pattern-title">${ch.name}</h1>
      <p class="pattern-pt-name">${loc.subtitle}</p>
      <p class="pattern-intent-lead">${loc.intent}</p>
    </div>

    <!-- Quick Jump Workspace Tabs -->
    <nav class="pe-section-jump-nav" aria-label="Seções do Capítulo">
      <a href="#sec-visualizer" class="pe-jump-link active" data-jump="sec-visualizer">${t("tabVisualizer")}</a>
      <a href="#sec-architecture" class="pe-jump-link" data-jump="sec-architecture">${t("tabArchitecture")}</a>
      <a href="#sec-code" class="pe-jump-link" data-jump="sec-code">${t("tabCode")}</a>
      <a href="#sec-quiz" class="pe-jump-link" data-jump="sec-quiz">${t("tabLabQuiz")}</a>
    </nav>

    <!-- 1. Interactive Step-by-Step Visualizer -->
    <div id="sec-visualizer">
      <div id="pattern-visualizer-mount"></div>
    </div>

    <!-- 2. Problem, Solution & Architecture -->
    <div id="sec-architecture">
      <h2 class="section-title">1. Novidades por Versão & Motivação Arquitetural</h2>
      <div class="info-card">
        <p>${formatParagraphs(loc.problem)}</p>
      </div>

      <h2 class="section-title mt-4">2. Como Utilizar na Prática & Análise Técnica</h2>
      ${
        ch.sections && ch.sections.length > 0
          ? ch.sections
              .map(
                (sec, sIdx) => `
            <div class="info-card" style="margin-bottom: 1rem;">
              <h4>2.${sIdx + 1}. ${sec.heading}</h4>
              <p>${formatParagraphs(sec.body)}</p>
              ${
                sec.bullets && sec.bullets.length
                  ? `<ul>${sec.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>`
                  : ""
              }
              ${
                sec.callout
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

      <h2 class="section-title mt-4">Diretrizes & Conceitos-Chave do Capítulo</h2>
      <div class="info-card">
        <h5>Pilares Fundamentais:</h5>
        <ul>
          ${ch.structure.participants
            .map((p) => `<li><strong>${p.name}:</strong> ${p.role}</li>`)
            .join("")}
        </ul>
        <h5 class="mt-3">Dinâmica de Execução & Retrocompatibilidade:</h5>
        <p>${ch.structure.collaborations}</p>
      </div>

      <h2 class="section-title mt-4">Garantias & Impactos de Retrocompatibilidade</h2>
      <div class="tradeoffs-container">
        <div class="tradeoff-card tradeoff-pros">
          <h5>✓ Vantagens & Benefícios de Desempenho</h5>
          <ul>
            ${loc.pros.map((pro) => `<li>${pro}</li>`).join("")}
          </ul>
        </div>
        <div class="tradeoff-card tradeoff-cons">
          <h5>! Cuidados, Transições & Pontos de Atenção</h5>
          <ul>
            ${loc.cons.map((con) => `<li>${con}</li>`).join("")}
          </ul>
        </div>
      </div>

      <h2 class="section-title mt-4">Notas de Implementação & Boas Práticas</h2>
      <div class="info-card">
        <ul>
          ${ch.implementationNotes.map((note) => `<li>${note}</li>`).join("")}
        </ul>
      </div>
    </div>

    <!-- 3. Exemplos de Código Multi-Linguagem -->
    <div id="sec-code">
      <h2 class="section-title mt-4">Implementações de Código & Comparativo de Evolução</h2>
      <p class="text-muted mb-3">Compare a implementação moderna recomendada com o código legado do ecossistema e os equivalentes em Java e Python:</p>

      <div class="code-block-wrapper" id="pattern-code-box">
        <div class="code-header">
          <div class="code-tabs" role="tablist" aria-label="Linguagem do Exemplo">
            <button type="button" class="code-tab-btn active" data-lang="typescript">Node.js Moderno (TS/ESM)</button>
            <button type="button" class="code-tab-btn" data-lang="dirty">Antes / Node Legado (CJS)</button>
            <button type="button" class="code-tab-btn" data-lang="java">Equivalente Java / JVM</button>
            <button type="button" class="code-tab-btn" data-lang="python">Equivalente Python</button>
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
              const rel = nodeChaptersData.find((item) => item.id === relId);
              return rel
                ? `<a href="#/node/capitulo/${rel.id}" class="btn btn-sm btn-outline">${rel.name}</a>`
                : "";
            })
            .join("")}
        </div>
      </div>
    </div>

    <!-- 4. Interactive Playground & Quiz -->
    <div id="sec-quiz">
      ${
        ch.playgroundId && nodeLabs[ch.playgroundId]
          ? `
        <h2 class="section-title mt-4">Laboratório Visual & Gráfico Interativo</h2>
        <div id="inline-lab-container"></div>
      `
          : ""
      }

      <h2 class="section-title mt-4">Exercícios de Fixação & Diagnóstico do Capítulo</h2>
      <div id="inline-quiz-container"></div>

      <h2 class="section-title mt-4">Referências Bibliográficas & RFCs</h2>
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
  `;

  // Visualizer Mount
  const vizMount = container.querySelector("#pattern-visualizer-mount");
  if (vizMount) {
    renderPatternVisualizer(vizMount, ch);
  }

  // Code Tab Handler
  let activeLang = "typescript";
  const codeEl = container.querySelector("#code-snippet-el");
  const updateCodeView = (langKey) => {
    activeLang = langKey;
    const rawCode = ch.codeExamples[langKey] || ch.codeExamples.typescript || "";
    const syntaxLang = langKey === "dirty" ? "javascript" : langKey;
    codeEl.innerHTML = highlightCode(rawCode, syntaxLang);
  };
  updateCodeView("typescript");

  container.querySelectorAll(".code-tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      container.querySelectorAll(".code-tab-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      updateCodeView(btn.getAttribute("data-lang"));
    });
  });

  // Copy Button
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

  // Bookmark Button
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

  // Lab Mount
  const labContainer = container.querySelector("#inline-lab-container");
  if (labContainer && ch.playgroundId && nodeLabs[ch.playgroundId]) {
    nodeLabs[ch.playgroundId].render(labContainer);
  }

  // Quiz Mount
  const inlineQuizContainer = container.querySelector("#inline-quiz-container");
  if (inlineQuizContainer) {
    renderPatternExercises(inlineQuizContainer, ch.id);
  }

  // Jump Nav Sticky
  const jumpNav = container.querySelector(".pe-section-jump-nav");
  if (jumpNav) initStickyNav(jumpNav);
}

/**
 * 3. PÁGINA DE VERSÕES DO NODE.JS E FRAMEWORKS HTTP (#/node/versoes-e-frameworks)
 */
export function renderNodeVersionsAndFrameworksPage(container) {
  container.innerHTML = `
    <div class="content-page">
      <div class="breadcrumb">
        <a href="#/node">Node.js</a>
        <span>/</span>
        <span>Versões & Frameworks</span>
      </div>

      <h1 class="page-title">Histórico Completo de Versões do Node.js & Frameworks Web</h1>
      <p class="page-subtitle">
        Explore a evolução técnica de cada versão do Node.js (Node 0.10 ao Node 24) com suas novidades, como utilizar, impacto na retrocompatibilidade e a evolução dos frameworks Express.js, Fastify, NestJS, Hono e Koa.
      </p>

      <h2 class="section-title mt-4">1. Matriz Completa de Versões do Node.js (Node 0.10 a Node 24)</h2>
      <div class="table-responsive">
        <table class="gof-table">
          <thead>
            <tr>
              <th>Versão</th>
              <th>Codename</th>
              <th>Ano</th>
              <th>Motor V8</th>
              <th>Principais Novidades</th>
              <th>Como Utilizar na Prática</th>
              <th>Garantia de Retrocompatibilidade</th>
            </tr>
          </thead>
          <tbody>
            ${nodeVersionsMatrix
              .map(
                (v) => `
              <tr>
                <td><span class="badge ${v.codename.includes("LTS") ? "badge-creational" : "badge-scope"}" style="font-family:var(--font-mono); font-weight:700;">${v.version}</span></td>
                <td><strong>${v.codename}</strong></td>
                <td>${v.year}</td>
                <td><code>${v.v8Version}</code></td>
                <td>${v.highlights}</td>
                <td><small>${v.howToUse}</small></td>
                <td><small style="color:var(--text-secondary);">${v.retrocompatibility}</small></td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>

      <h2 class="section-title mt-5">2. Histórico de Versões do Express.js (1.x a 5.x) & Koa</h2>
      <p class="text-muted mb-3">Do pipeline linear de middlewares e callbacks em 2010 ao tratamento nativo de Promises e novo parser de rotas no Express 5.0:</p>
      <div class="table-responsive">
        <table class="gof-table">
          <thead>
            <tr>
              <th>Versão do Framework</th>
              <th>Ano</th>
              <th>Node Mínimo</th>
              <th>Principais Implementações & Recursos</th>
              <th>Quebras & Notas de Retrocompatibilidade</th>
            </tr>
          </thead>
          <tbody>
            ${nodeFrameworksHistory.express
              .map(
                (ex) => `
              <tr>
                <td><strong>${ex.version}</strong></td>
                <td>${ex.year}</td>
                <td><code>${ex.minNode}</code></td>
                <td>${ex.keyFeatures}</td>
                <td><small style="color:var(--text-secondary);">${ex.breakingAndCompat}</small></td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>

      <h2 class="section-title mt-5">3. Histórico de Versões do Fastify (1.x a 5.x)</h2>
      <p class="text-muted mb-3">Throughput extremo, roteamento via Radix Tree, validação por JSON Schema compilado e Type Providers em TypeScript:</p>
      <div class="table-responsive">
        <table class="gof-table">
          <thead>
            <tr>
              <th>Versão do Fastify</th>
              <th>Ano</th>
              <th>Node Mínimo</th>
              <th>Principais Recursos & Arquitetura</th>
              <th>Quebras & Notas de Migração</th>
            </tr>
          </thead>
          <tbody>
            ${nodeFrameworksHistory.fastify
              .map(
                (fy) => `
              <tr>
                <td><strong>${fy.version}</strong></td>
                <td>${fy.year}</td>
                <td><code>${fy.minNode}</code></td>
                <td>${fy.keyFeatures}</td>
                <td><small style="color:var(--text-secondary);">${fy.breakingAndCompat}</small></td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>

      <h2 class="section-title mt-5">4. Evolução do NestJS (1.x a 11.x) & Hono (1.x a 4.x)</h2>
      <div class="table-responsive">
        <table class="gof-table">
          <thead>
            <tr>
              <th>Framework / Versão</th>
              <th>Ano</th>
              <th>Node Mínimo</th>
              <th>Marcos Arquiteturais & Filosofia</th>
              <th>Compatibilidade & Impacto no Ecossistema</th>
            </tr>
          </thead>
          <tbody>
            ${nodeFrameworksHistory.nestjs
              .map(
                (ns) => `
              <tr>
                <td><strong>${ns.version}</strong></td>
                <td>${ns.year}</td>
                <td><code>${ns.minNode}</code></td>
                <td>${ns.keyFeatures}</td>
                <td><small style="color:var(--text-secondary);">${ns.breakingAndCompat}</small></td>
              </tr>
            `
              )
              .join("")}
            ${nodeFrameworksHistory.honoAndKoa
              .map(
                (hk) => `
              <tr>
                <td><strong>${hk.version}</strong></td>
                <td>${hk.year}</td>
                <td><code>${hk.minNode}</code></td>
                <td>${hk.keyFeatures}</td>
                <td><small style="color:var(--text-secondary);">${hk.breakingAndCompat}</small></td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

/**
 * 4. HUB DE LABORATÓRIOS INTERATIVOS (#/node/laboratorios)
 */
export function renderNodeLabsHubPage(container) {
  const labKeys = Object.keys(nodeLabs);

  container.innerHTML = `
    <div class="content-page">
      <div class="breadcrumb">
        <a href="#/node">Node.js</a>
        <span>/</span>
        <span>Laboratórios Interativos</span>
      </div>

      <h1 class="page-title">6 Laboratórios & Simuladores da Plataforma Node.js</h1>
      <p class="page-subtitle">
        Experimente os mecanismos internos do runtime: fases do Event Loop, controle de backpressure em Streams, isolamento de CPU com Worker Threads, resolução CommonJS vs ESM, benchmark de frameworks e diagnóstico de migração.
      </p>

      <div class="factory-selector-tabs mb-4" id="nd-labs-selector-tabs">
        ${labKeys
          .map(
            (key, idx) => `
          <button type="button" class="btn btn-tab ${idx === 0 ? "active" : ""}" data-lab="${key}">
            ${idx + 1}. ${nodeLabs[key].name}
          </button>
        `
          )
          .join("")}
      </div>

      <div id="nd-active-lab-render-area"></div>
    </div>
  `;

  const renderArea = container.querySelector("#nd-active-lab-render-area");
  const tabs = container.querySelectorAll("#nd-labs-selector-tabs .btn-tab");

  function loadLab(labId) {
    const lab = nodeLabs[labId];
    if (!lab || !renderArea) return;
    renderArea.innerHTML = `
      <div class="mb-2" style="display:flex; justify-content:space-between; align-items:center;">
        <span class="text-muted" style="font-size:0.85rem;">Laboratório vinculado ao capítulo:</span>
        <a href="#/node/capitulo/${lab.patternId}" class="btn btn-sm btn-outline">Abrir Capítulo Completo →</a>
      </div>
      <div id="nd-lab-inner-mount"></div>
    `;
    const innerMount = renderArea.querySelector("#nd-lab-inner-mount");
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
 * 5. PÁGINA SOBRE AUTORES & BIBLIOGRAFIA (#/node/referencias)
 */
export function renderNodeReferencesPage(container) {
  container.innerHTML = `
    <div class="content-page">
      <div class="breadcrumb">
        <a href="#/node">Node.js</a>
        <span>/</span>
        <span>Autores & Bibliografia</span>
      </div>

      <h1 class="page-title">Arquitetos & Obras Clássicas do Ecossistema Node.js</h1>
      <p class="page-subtitle">
        Conheça os principais criadores do runtime, mantenedores de bibliotecas fundamentais e as obras que definem as melhores práticas de engenharia assíncrona.
      </p>

      <div class="authors-grid mt-4">
        ${nodeBookOverview.authors
          .map(
            (a) => `
          <div class="author-card">
            <div class="author-avatar">${a.avatar || "ND"}</div>
            <h4>${a.name}</h4>
            <div class="author-role">${a.role}</div>
            <p style="font-size:0.88rem; color:var(--text-secondary); margin-top:0.5rem;">${a.bio}</p>
          </div>
        `
          )
          .join("")}
      </div>

      <h2 class="section-title mt-5">Obras Fundamentais Recomendadas</h2>
      <div class="grid-2">
        <div class="info-card">
          <h4>Node.js Design Patterns (3rd Edition)</h4>
          <p class="text-primary mb-2" style="font-size:0.85rem; font-weight:600;">Mario Casciaro & Luciano Mammino • Packt Publishing</p>
          <p class="text-muted" style="font-size:0.88rem;">O guia canônico de padrões de projeto assíncronos no Node.js, cobrindo Streams, Event Loop, Reactive Patterns e interoperabilidade ESM/CommonJS.</p>
        </div>
        <div class="info-card">
          <h4>Distributed Systems with Node.js</h4>
          <p class="text-primary mb-2" style="font-size:0.85rem; font-weight:600;">Thomas Hunter II • O'Reilly</p>
          <p class="text-muted" style="font-size:0.88rem;">A referência definitiva para escalabilidade em produção: clusters, observabilidade, tracing com OpenTelemetry e resiliência de microsserviços.</p>
        </div>
        <div class="info-card">
          <h4>Node.js in Action (2nd Edition)</h4>
          <p class="text-primary mb-2" style="font-size:0.85rem; font-weight:600;">Alex Young, Bradley Meck, Mike Cantelon • Manning</p>
          <p class="text-muted" style="font-size:0.88rem;">Fundamentos práticos de arquitetura de servidores web, bancos de dados, testes automatizados e deploy em ambientes corporativos.</p>
        </div>
        <div class="info-card">
          <h4>Production-Ready Microservices with Node.js</h4>
          <p class="text-primary mb-2" style="font-size:0.85rem; font-weight:600;">Matteo Collina & Equipe Fastify • OpenJS</p>
          <p class="text-muted" style="font-size:0.88rem;">Arquitetura de alta performance, otimização do V8, validação com JSON Schema compilado e melhores práticas para APIs de baixa latência.</p>
        </div>
      </div>
    </div>
  `;
}

/**
 * Roteador de rotas de Node.js (#/node)
 */
export function handleNodeRoute(contentArea, hash = window.location.hash || "#/node") {
  if (hash === "#/node") {
    renderNodeHomePage(contentArea);
  } else if (hash === "#/node/versoes-e-frameworks") {
    renderNodeVersionsAndFrameworksPage(contentArea);
  } else if (hash === "#/node/laboratorios") {
    renderNodeLabsHubPage(contentArea);
  } else if (hash === "#/node/quizzes") {
    renderQuizzesPage(contentArea, { book: "node" });
  } else if (hash === "#/node/referencias") {
    renderNodeReferencesPage(contentArea);
  } else if (hash.startsWith("#/node/capitulo/")) {
    const chapterId = hash.replace("#/node/capitulo/", "").trim();
    renderNodeChapterPage(contentArea, chapterId);
  } else {
    renderNodeHomePage(contentArea);
  }
}

