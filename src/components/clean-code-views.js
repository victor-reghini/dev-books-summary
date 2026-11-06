import { cleanCodeChaptersData } from "../../books/clean-code/explanations/chapters-data.js";
import { cleanCodeOverview, smellsCatalog } from "../../books/clean-code/explanations/book-overview.js";
import { cleanCodeAnimations } from "../../books/clean-code/examples/clean-code-animations.js";
import { cleanCodeLabs } from "../../books/clean-code/examples/clean-code-labs.js";
import { renderPatternExercises, renderQuizzesPage } from "./quiz-engine.js";
import { getStudiedPatterns, togglePatternStudied } from "./sidebar.js";
import { renderPatternVisualizer, stopActiveVisualizerTimer } from "./pattern-visualizer.js";
import { highlightCode } from "../utils/code-highlighter.js";
import { icons } from "./icons.js";

function getPartLabel(cat) {
  if (cat === "criacional") return "Parte 1 • Fundamentos";
  if (cat === "estrutural") return "Parte 2 • Design & Qualidade";
  if (cat === "comportamental") return "Parte 3 • Arquitetura & Escala";
  return "Parte 4 • Casos & Heurísticas";
}

function getCategoryBadgeClass(cat) {
  if (cat === "criacional") return "badge-creational";
  if (cat === "estrutural") return "badge-structural";
  return "badge-behavioral";
}

export function handleCleanCodeRoute(contentArea, hash = window.location.hash || "#/clean-code") {
  stopActiveVisualizerTimer();

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

  container.innerHTML = `
    <!-- Protocol Explorer Style Hero Banner for Clean Code -->
    <section class="pe-home-hero">
      <div class="pe-hero-top-row">
        <span class="pe-hero-kicker">ROBERT C. MARTIN (UNCLE BOB) • ARTESANATO DE SOFTWARE ÁGIL</span>
        <div class="pe-hero-stats">
          <span class="pe-stat-chip">17 Capítulos</span>
          <span class="pe-stat-chip">66 Heurísticas (C1–T9)</span>
          <span class="pe-stat-chip">85 Etapas Animadas</span>
          <span class="pe-stat-chip">Antes (Sujo) vs. Java · TS · Python</span>
        </div>
      </div>

      <h1 class="pe-hero-title">Código Limpo: Habilidades Práticas do Agile Software</h1>
      <p class="pe-hero-subtitle">
        Explore interativamente os 17 capítulos de <em>Clean Code</em> com simuladores visuais de execução e refatoração passo a passo, gráficos da curva de produtividade (Wading vs. Regra do Escoteiro), código comparativo Antes vs. Depois, laboratórios práticos e catálogo completo dos 66 Odores e Heurísticas.
      </p>

      <div class="pe-hero-actions">
        <a href="#/clean-code/capitulo/cap-1" class="pe-cta-btn primary">Iniciar pelo Capítulo 01 (Código Limpo) →</a>
        <a href="#/clean-code/laboratorios" class="pe-cta-btn secondary">6 Playgrounds & Gráficos</a>
        <a href="#/clean-code/matriz-odores" class="pe-cta-btn secondary">Catálogo 66 Odores (C1–T9)</a>
        <a href="#/clean-code/quizzes" class="pe-cta-btn secondary">Quizzes, Cenários & Prática</a>
      </div>
    </section>

    <!-- Category Filter Bar -->
    <div class="pe-filter-bar" role="tablist" aria-label="Filtrar capítulos por parte">
      <button type="button" class="pe-filter-tab active" data-cat-filter="all">Todos os Capítulos (17)</button>
      <button type="button" class="pe-filter-tab" data-cat-filter="criacional">1. Fundamentos (Cap. 1–5)</button>
      <button type="button" class="pe-filter-tab" data-cat-filter="estrutural">2. Design & Testes (Cap. 6–9)</button>
      <button type="button" class="pe-filter-tab" data-cat-filter="comportamental">3. Arquitetura & Concorrência (Cap. 10–13)</button>
      <button type="button" class="pe-filter-tab" data-cat-filter="estudos-de-caso">4. Estudos de Caso & Odores (Cap. 14–17)</button>
    </div>

    <!-- 17 Chapters Interactive Grid -->
    <div class="pe-patterns-grid" id="cc-chapters-grid">
      ${cleanCodeChaptersData
        .map((ch) => {
          const isStudied = studied.includes(ch.id);
          return `
            <a href="#/clean-code/capitulo/${ch.id}" class="pe-pattern-card cat-${ch.category}" data-card-cat="${ch.category}">
              <div class="pe-card-top">
                <span class="pe-card-code cat-${ch.category}">${ch.code}</span>
                <div class="pe-card-badges">
                  <span class="pe-mini-scope">${ch.scope.toUpperCase()}</span>
                  <span class="pe-mini-page">P. ${ch.gofPage}</span>
                  ${isStudied ? `<span class="pe-mini-studied" title="Concluído">✓</span>` : ""}
                </div>
              </div>
              <h3 class="pe-card-title">${ch.name}</h3>
              <div class="pe-card-subtitle">${ch.ptName}</div>
              <p class="pe-card-intent">${ch.intent}</p>
              <div class="pe-card-footer">
                <span class="pe-card-cat-tag">${getPartLabel(ch.category)}</span>
                <span class="pe-card-arrow">Explorar →</span>
              </div>
            </a>
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

    <h2 class="section-title mt-4">A Filosofia 5S Aplicada ao Código (Prefácio de James O. Coplien)</h2>
    <div class="grid-2 mt-3">
      ${cleanCodeOverview.fiveSPhilosophy
        .map(
          (s) => `
        <div class="info-card">
          <h4 style="color: var(--accent-primary)">${s.japanese} • ${s.pt}</h4>
          <p style="font-size: 0.9rem">${s.description}</p>
        </div>
      `
        )
        .join("")}
    </div>
  `;

  const filterTabs = container.querySelectorAll(".pe-filter-tab");
  const cards = container.querySelectorAll(".pe-pattern-card");
  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      filterTabs.forEach((btn) => btn.classList.remove("active"));
      tab.classList.add("active");
      const cat = tab.getAttribute("data-cat-filter");
      cards.forEach((card) => {
        if (cat === "all" || card.getAttribute("data-card-cat") === cat) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
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

  const studied = getStudiedPatterns("clean-code");
  const isStudied = studied.includes(ch.id);
  const categoryBadgeClass = getCategoryBadgeClass(ch.category);

  container.innerHTML = `
    <!-- Top Navigation & Completion Bar -->
    <div class="page-action-header">
      <div class="pager-buttons">
        ${
          prevChapter
            ? `<a href="#/clean-code/capitulo/${prevChapter.id}" class="pager-btn">← Anterior: ${prevChapter.name}</a>`
            : `<a href="#/clean-code" class="pager-btn">← Catálogo Código Limpo</a>`
        }
      </div>

      <button type="button" class="bookmark-action-btn ${isStudied ? "marked" : ""}" id="btn-toggle-bookmark">
        ${isStudied ? `${icons.bookmarkCheck} <span>Concluído</span>` : `${icons.bookmark} <span>Marcar como Estudado</span>`}
      </button>

      <div class="pager-buttons">
        ${
          nextChapter
            ? `<a href="#/clean-code/capitulo/${nextChapter.id}" class="pager-btn next-btn">Próximo: ${nextChapter.name} →</a>`
            : `<a href="#/clean-code/quizzes" class="pager-btn next-btn">Quizzes & Prática →</a>`
        }
      </div>
    </div>

    <!-- Chapter Header Summary -->
    <div class="pattern-header-card">
      <div class="pattern-meta-badges">
        <span class="badge ${categoryBadgeClass}">${ch.code} • ${getPartLabel(ch.category)}</span>
        <span class="badge badge-scope">ESCOPO: ${ch.scope.toUpperCase()}</span>
        <span class="badge badge-scope">Pág. Clean Code: ${ch.gofPage}</span>
        ${ch.smellRefs?.length ? `<span class="badge badge-scope">Heurísticas: ${ch.smellRefs.join(", ")}</span>` : ""}
      </div>

      <h1 class="page-title">${ch.name} <small class="pattern-local-subtitle">(${ch.ptName})</small></h1>

      <div class="callout callout-info" style="margin-top: 0.75rem; margin-bottom: 0">
        <h5>Tese Central & Regra de Ouro (Robert C. Martin)</h5>
        <p style="font-size: 1.02rem; font-weight: 500">${ch.intent}</p>
      </div>
    </div>

    <!-- Quick Jump Workspace Tabs -->
    <nav class="pe-section-jump-nav" aria-label="Seções do Capítulo">
      <a href="#sec-visualizer" class="pe-jump-link active" data-jump="sec-visualizer">1. Simulador Visual & Fluxo</a>
      <a href="#sec-architecture" class="pe-jump-link" data-jump="sec-architecture">2. Problema, Solução & Regras</a>
      <a href="#sec-code" class="pe-jump-link" data-jump="sec-code">3. Código Sujo vs. Limpo (4 Abas)</a>
      <a href="#sec-quiz" class="pe-jump-link" data-jump="sec-quiz">4. Laboratório Gráfico & Quiz</a>
    </nav>

    <!-- 1. Interactive Step-by-Step Visualizer & Object Inspector -->
    <div id="sec-visualizer">
      <div id="pattern-visualizer-mount"></div>
    </div>

    <!-- 2. Problem, Solution & Structure -->
    <div id="sec-architecture">
      <h2 class="section-title">Problema, Sintomas de Código Sujo & Motivação</h2>
      <div class="info-card">
        <p style="white-space: pre-line; line-height: 1.65">${ch.problemAndMotivation}</p>
      </div>

      <h2 class="section-title">Solução & Disciplina de Código Limpo</h2>
      <div class="info-card">
        <p style="white-space: pre-line; line-height: 1.65">${ch.solution}</p>
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

      <h2 class="section-title">Consequências e Trade-offs</h2>
      <div class="tradeoffs-container">
        <div class="tradeoff-card tradeoff-pros">
          <h5>Benefícios Diretos (Prós)</h5>
          <ul>
            ${ch.consequences.pros.map((pro) => `<li>${pro}</li>`).join("")}
          </ul>
        </div>
        <div class="tradeoff-card tradeoff-cons">
          <h5>Cuidados & Disciplina Exigida</h5>
          <ul>
            ${ch.consequences.cons.map((con) => `<li>${con}</li>`).join("")}
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

  // Section Jump Links
  container.querySelectorAll(".pe-jump-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      container.querySelectorAll(".pe-jump-link").forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
      const targetId = link.getAttribute("data-jump");
      const targetEl = container.querySelector(`#${targetId}`);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

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
