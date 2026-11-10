/**
 * Views dedicadas do livro "Java: Guia Completo de Versões, JVM & Ecossistema":
 * - Catálogo Principal dos 12 Capítulos em 4 Partes (#/java)
 * - Página de Detalhe do Capítulo (#/java/capitulo/:id)
 * - Tabela Interativa de Versões do Java & Frameworks (Spring Boot, Quarkus, Jakarta) (#/java/versoes-e-frameworks)
 * - Hub de Laboratórios Interativos (#/java/laboratorios)
 * - Sobre os Autores & Bibliografia (#/java/referencias)
 */

import { javaChaptersData } from "../../books/java/explanations/chapters-data.js";
import { javaBookOverview, javaVersionsMatrix, javaFrameworksHistory } from "../../books/java/explanations/book-overview.js";
import { javaLabs } from "../../books/java/examples/java-labs.js";
import { javaAnimations } from "../../books/java/examples/java-animations.js";
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
    "jvm-bytecode": { pt: "JVM & Bytecode", en: "JVM & Bytecode", es: "JVM y Bytecode", it: "JVM e Bytecode", fr: "JVM et Bytecode" },
    "generics-concurrency": { pt: "Generics & Concorrência", en: "Generics & Concurrency", es: "Generics y Concurrencia", it: "Generics e Concorrenza", fr: "Generics et Concurrence" },
    "coin-nio2": { pt: "Coin & NIO.2", en: "Coin & NIO.2", es: "Coin y NIO.2", it: "Coin e NIO.2", fr: "Coin et NIO.2" },
    "lambdas-streams": { pt: "Lambdas & Streams", en: "Lambdas & Streams", es: "Lambdas y Streams", it: "Lambdas e Streams", fr: "Lambdas et Streams" },
    "jpms-jigsaw": { pt: "JPMS & Modularização", en: "JPMS & Modularity", es: "JPMS y Modularidad", it: "JPMS e Modularità", fr: "JPMS et Modularité" },
    "http2-modern-jdk": { pt: "HttpClient & JDK 11", en: "HttpClient & JDK 11", es: "HttpClient y JDK 11", it: "HttpClient e JDK 11", fr: "HttpClient et JDK 11" },
    "records-sealed": { pt: "Records & Sealed", en: "Records & Sealed", es: "Records y Sealed", it: "Records e Sealed", fr: "Records et Sealed" },
    "virtual-threads": { pt: "Virtual Threads (Loom)", en: "Virtual Threads (Loom)", es: "Virtual Threads (Loom)", it: "Virtual Threads (Loom)", fr: "Virtual Threads (Loom)" },
    "panama-native": { pt: "FFM Panama & Nativo", en: "FFM Panama & Native", es: "FFM Panama y Nativo", it: "FFM Panama e Nativo", fr: "FFM Panama et Natif" },
    "springboot-evolution": { pt: "Spring Boot 1 a 3.4+", en: "Spring Boot 1 to 3.4+", es: "Spring Boot 1 a 3.4+", it: "Spring Boot 1 a 3.4+", fr: "Spring Boot 1 à 3.4+" },
    "quarkus-buildtime": { pt: "Quarkus 1 a 3.15 LTS", en: "Quarkus 1 to 3.15 LTS", es: "Quarkus 1 a 3.15 LTS", it: "Quarkus 1 a 3.15 LTS", fr: "Quarkus 1 à 3.15 LTS" },
    "jakarta-micronaut": { pt: "Jakarta EE & Micronaut", en: "Jakarta EE & Micronaut", es: "Jakarta EE y Micronaut", it: "Jakarta EE e Micronaut", fr: "Jakarta EE et Micronaut" }
  };
  return map[scopeKey]?.[lang] || map[scopeKey]?.pt || scopeKey;
}

function getPartLabel(category) {
  const lang = getLang();
  const labels = {
    "classic-jvm": {
      pt: "Parte 1 • Gênese da JVM & Fundamentos Clássicos",
      en: "Part 1 • JVM Genesis & Classical Foundations",
      es: "Parte 1 • Génesis de la JVM y Fundamentos Clásicos",
      it: "Parte 1 • Genesi della JVM e Fondamenti Classici",
      fr: "Partie 1 • Genèse de la JVM et Fondamentaux Classiques"
    },
    "functional-modular": {
      pt: "Parte 2 • Revolução Funcional & Modular",
      en: "Part 2 • Functional & Modular Revolution",
      es: "Parte 2 • Revolución Funcional y Modular",
      it: "Parte 2 • Rivoluzione Funzionale e Modulare",
      fr: "Partie 2 • Révolution Fonctionnelle et Modulaire"
    },
    "modern-lts": {
      pt: "Parte 3 • Java Moderno, Records & Virtual Threads",
      en: "Part 3 • Modern Java, Records & Virtual Threads",
      es: "Parte 3 • Java Moderno, Records y Virtual Threads",
      it: "Parte 3 • Java Moderno, Records e Virtual Threads",
      fr: "Partie 3 • Java Moderne, Records et Virtual Threads"
    },
    "frameworks-ecosystem": {
      pt: "Parte 4 • Frameworks Enterprise & Ecossistema Moderno",
      en: "Part 4 • Enterprise Frameworks & Ecosystem",
      es: "Parte 4 • Frameworks Enterprise y Ecosistema Moderno",
      it: "Parte 4 • Framework Enterprise ed Ecosistema Moderno",
      fr: "Partie 4 • Frameworks Enterprise et Écosystème Moderne"
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
 * 1. PÁGINA PRINCIPAL DO LIVRO JAVA (#/java)
 */
export function renderJavaHomePage(container) {
  const studied = getStudiedPatterns("java");
  const lang = getLang();
  const part1 = javaChaptersData.filter((c) => c.category === "classic-jvm");
  const part2 = javaChaptersData.filter((c) => c.category === "functional-modular");
  const part3 = javaChaptersData.filter((c) => c.category === "modern-lts");
  const part4 = javaChaptersData.filter((c) => c.category === "frameworks-ecosystem");

  container.innerHTML = `
    <div class="pe-home-wrapper">
      <div class="pe-hero">
        <div class="pe-hero-badge">${javaBookOverview.authors[0].name} • ${javaBookOverview.edition}</div>
        <h1 class="pe-hero-title">${javaBookOverview.title}</h1>
        <p class="pe-hero-subtitle">${javaBookOverview.subtitle}</p>
        <div class="pe-hero-ctas">
          <a href="#/java/capitulo/jv-cap-1" class="pe-cta-btn primary">Explorar os 12 Capítulos</a>
          <a href="#/java/versoes-e-frameworks" class="pe-cta-btn secondary">Versões & Frameworks (Spring / Quarkus)</a>
          <a href="#/java/laboratorios" class="pe-cta-btn secondary">6 Laboratórios Interativos</a>
          <a href="#/java/quizzes" class="pe-cta-btn secondary">Quizzes & Prática</a>
        </div>
      </div>

      <!-- Barra de Filtro e Salto Rápido Fixa no Topo -->
      <div class="pe-filter-bar" role="tablist" aria-label="Partes do Livro Java" id="jv-sticky-tabs">
        <button type="button" class="pe-filter-tab active" data-cat-filter="todos">Todas as Partes (${javaChaptersData.length})</button>
        <button type="button" class="pe-filter-tab" data-cat-filter="classic-jvm">1. Gênese & JVM (${part1.length})</button>
        <button type="button" class="pe-filter-tab" data-cat-filter="functional-modular">2. Funcional & JPMS (${part2.length})</button>
        <button type="button" class="pe-filter-tab" data-cat-filter="modern-lts">3. Moderno & Loom (${part3.length})</button>
        <button type="button" class="pe-filter-tab" data-cat-filter="frameworks-ecosystem">4. Frameworks Enterprise (${part4.length})</button>
      </div>

      <!-- Capítulos Agrupados por Seções Temáticas -->
      <div class="cc-chapters-container" id="jv-chapters-grid">
        ${[
      { id: "sec-part-1", cat: "classic-jvm", title: "Parte 1 • Gênese da JVM, Bytecode & Fundamentos (JDK 1.0 a 7)", items: part1 },
      { id: "sec-part-2", cat: "functional-modular", title: "Parte 2 • Revolução Funcional, Modularização JPMS & JDK 11 LTS (Java 8 a 11)", items: part2 },
      { id: "sec-part-3", cat: "modern-lts", title: "Parte 3 • Java Moderno, Records, Virtual Threads & FFM Panama (Java 17 a 25 LTS)", items: part3 },
      { id: "sec-part-4", cat: "frameworks-ecosystem", title: "Parte 4 • Frameworks Enterprise: Spring Boot 3, Quarkus 3, Jakarta EE 11 & Micronaut", items: part4 }
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
        <h2 class="section-title">Os 6 Pilares de Engenharia da Plataforma Java</h2>
        <div class="grid-2">
          ${javaBookOverview.corePrinciples
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
        <h2 class="section-title">Arquitetos & Pioneiros da Plataforma</h2>
        <div class="authors-grid">
          ${javaBookOverview.authors
      .map(
        (a) => `
            <div class="author-card">
              <div class="author-avatar">${a.avatar || "JV"}</div>
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
    <a href="#/java/capitulo/${ch.id}" class="pe-pattern-card cat-${ch.category}" data-card-cat="${ch.category}">
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
 * 2. PÁGINA DE DETALHE DO CAPÍTULO (#/java/capitulo/:id)
 */
export function renderJavaChapterPage(container, chapterId) {
  const ch = javaChaptersData.find((item) => item.id === chapterId);
  if (!ch) {
    container.innerHTML = `
      <div class="callout callout-danger">
        <h5>Capítulo não encontrado</h5>
        <p>O capítulo solicitado ("${chapterId}") não existe no livro Java. <a href="#/java">Voltar ao catálogo</a>.</p>
      </div>
    `;
    return;
  }

  const studied = getStudiedPatterns("java");
  const isStudied = studied.includes(ch.id);
  const lang = getLang();
  const loc = getLocalizedChapter(ch);
  const hasVisualizer = Boolean(javaAnimations[ch.id]);
  const badgeClass =
    ch.category === "classic-jvm"
      ? "badge-creational"
      : ch.category === "functional-modular"
        ? "badge-structural"
        : ch.category === "modern-lts"
          ? "badge-behavioral"
          : "badge-scope";

  const idx = javaChaptersData.findIndex((item) => item.id === ch.id);
  const prevCh = idx > 0 ? javaChaptersData[idx - 1] : null;
  const nextCh = idx < javaChaptersData.length - 1 ? javaChaptersData[idx + 1] : null;

  container.innerHTML = `
    <div class="page-action-header">
      <div class="pager-buttons">
        ${prevCh
      ? `<a href="#/java/capitulo/${prevCh.id}" class="pager-btn">← ${t("navPrev") || "Anterior"}: ${prevCh.name}</a>`
      : `<a href="#/java" class="pager-btn">← Catálogo Java</a>`
    }
      </div>

      <button type="button" class="bookmark-action-btn ${isStudied ? "marked" : ""}" id="btn-toggle-bookmark">
        ${isStudied ? `${icons.bookmarkCheck} <span>${t("completedLabel") || "Concluído"}</span>` : `${icons.bookmark} <span>${t("markAsStudied") || "Marcar como Estudado"}</span>`}
      </button>

      <div class="pager-buttons">
        ${nextCh
      ? `<a href="#/java/capitulo/${nextCh.id}" class="pager-btn next-btn">${t("navNext") || "Próximo"}: ${nextCh.name} →</a>`
      : `<a href="#/java/quizzes" class="pager-btn next-btn">${t("quizzesPractice") || "Quizzes & Prática"} →</a>`
    }
      </div>
    </div>

    <div class="pattern-header-card">
      <div class="pattern-meta-badges">
        <span class="badge ${badgeClass}">${ch.code} • ${getPartLabel(ch.category)}</span>
        <span class="badge badge-scope">ESCOPO: ${getLocalizedScope(ch.scope, lang)}</span>
        <span class="badge badge-scope">Pág. ${ch.gofPage}</span>
        <span class="badge badge-scope">Leitura: ${ch.readingTime}</span>
      </div>

      <h1 class="page-title">${loc.name} <small class="pattern-local-subtitle">(${loc.subtitle})</small></h1>

      <p class="text-muted" style="font-size:0.86rem; margin-top:0.4rem; margin-bottom:0.75rem;">
        <strong>Conceitos & Tópicos Centrais:</strong> ${ch.aliases.join(", ")}
      </p>

      <div class="callout callout-info" style="margin-top: 0.75rem; margin-bottom: 0">
        <h5>Tese Central & Evolução na Plataforma</h5>
        <p style="font-size: 1.02rem; font-weight: 500">${loc.intent}</p>
      </div>
    </div>

    <!-- Quick Jump Workspace Tabs -->
    <nav class="pe-section-jump-nav" aria-label="Seções do Capítulo">
      ${hasVisualizer ? `<a href="#sec-visualizer" class="pe-jump-link active" data-jump="sec-visualizer">${t("tabVisualizer")}</a>` : ""}
      <a href="#sec-architecture" class="pe-jump-link ${hasVisualizer ? "" : "active"}" data-jump="sec-architecture">${t("tabArchitecture")}</a>
      <a href="#sec-code" class="pe-jump-link" data-jump="sec-code">${t("tabCode")}</a>
      <a href="#sec-quiz" class="pe-jump-link" data-jump="sec-quiz">${t("tabLabQuiz")}</a>
    </nav>

    <!-- 1. Interactive Step-by-Step Visualizer -->
    ${hasVisualizer
      ? `
    <div id="sec-visualizer">
      <div id="pattern-visualizer-mount"></div>
    </div>`
      : ""
    }

    <!-- 2. Problem, Solution & Architecture -->
    <div id="sec-architecture">
      <h2 class="section-title">1. Novidades por Versão & Motivação Arquitetural</h2>
      <div class="info-card">
        <p>${formatParagraphs(loc.problem)}</p>
      </div>

      <h2 class="section-title mt-4">2. Como Utilizar na Prática & Análise Técnica</h2>
      ${ch.sections && ch.sections.length > 0
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
      <p class="text-muted mb-3">Compare a implementação moderna recomendada com o código legado da plataforma e os equivalentes em TypeScript e Python:</p>

      <div class="code-block-wrapper" id="pattern-code-box">
        <div class="code-header">
          <div class="code-tabs" role="tablist" aria-label="Linguagem do Exemplo">
            <button type="button" class="code-tab-btn active" data-lang="java">Java Moderno (Recomendado)</button>
            <button type="button" class="code-tab-btn" data-lang="dirty">Antes / Java Legado (Retrocompatibilidade)</button>
            <button type="button" class="code-tab-btn" data-lang="typescript">TypeScript / Config Equivalente</button>
            <button type="button" class="code-tab-btn" data-lang="python">Python / Script Equivalente</button>
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
        const rel = javaChaptersData.find((item) => item.id === relId);
        return rel
          ? `<a href="#/java/capitulo/${rel.id}" class="btn btn-sm btn-outline">${rel.name}</a>`
          : "";
      })
      .join("")}
        </div>
      </div>
    </div>

    <!-- 4. Interactive Playground & Quiz -->
    <div id="sec-quiz">
      ${ch.playgroundId && javaLabs[ch.playgroundId]
      ? `
        <h2 class="section-title mt-4">Laboratório Visual & Gráfico Interativo</h2>
        <div id="inline-lab-container"></div>
      `
      : ""
    }

      <h2 class="section-title mt-4">Exercícios de Fixação & Diagnóstico do Capítulo</h2>
      <div id="inline-quiz-container"></div>

      <h2 class="section-title mt-4">Referências Bibliográficas & JSRs</h2>
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
  if (vizMount && hasVisualizer) {
    renderPatternVisualizer(vizMount, ch);
  }

  // Code Tab Handler
  let activeLang = "java";
  const codeEl = container.querySelector("#code-snippet-el");
  const updateCodeView = (langKey) => {
    activeLang = langKey;
    const rawCode = ch.codeExamples[langKey] || ch.codeExamples.java || "";
    const syntaxLang = langKey === "dirty" ? "java" : langKey;
    codeEl.innerHTML = highlightCode(rawCode, syntaxLang);
  };
  updateCodeView("java");

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
  if (labContainer && ch.playgroundId && javaLabs[ch.playgroundId]) {
    javaLabs[ch.playgroundId].render(labContainer);
  }

  // Quiz Mount
  const inlineQuizContainer = container.querySelector("#inline-quiz-container");
  if (inlineQuizContainer) {
    renderPatternExercises(inlineQuizContainer, ch.id);
  }

  // Jump Nav Sticky & Smooth Scroll
  const jumpNav = container.querySelector(".pe-section-jump-nav");
  if (jumpNav) initStickyNav(jumpNav);
  const jumpLinks = container.querySelectorAll(".pe-jump-link");

  function setActiveJumpLink(targetId) {
    jumpLinks.forEach((link) => {
      const match = link.getAttribute("data-jump") === targetId;
      link.classList.toggle("active", match);
    });
  }

  jumpLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("data-jump");
      setActiveJumpLink(targetId);
      const targetSec = container.querySelector(`#${targetId}`);
      if (targetSec) {
        const headerOffset = 110;
        const rect = targetSec.getBoundingClientRect();
        const top = window.pageYOffset + rect.top - headerOffset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });
}

/**
 * 3. PÁGINA DE VERSÕES DO JAVA E FRAMEWORKS ENTERPRISE (#/java/versoes-e-frameworks)
 */
export function renderJavaVersionsAndFrameworksPage(container) {
  container.innerHTML = `
    <div class="content-page">
      <div class="breadcrumb">
        <a href="#/java">Java</a>
        <span>/</span>
        <span>Versões & Frameworks</span>
      </div>

      <h1 class="page-title">Histórico Completo de Versões do Java & Frameworks Enterprise</h1>
      <p class="page-subtitle">
        Explore a evolução técnica de cada versão do Java (JDK 1.0 ao Java 25 LTS) com suas novidades, como utilizar, impacto na retrocompatibilidade e a evolução dos frameworks Spring Boot, Quarkus, Jakarta EE e Micronaut.
      </p>

      <h2 class="section-title mt-4">1. Matriz Completa de Versões do Java (JDK 1.0 a Java 25 LTS)</h2>
      <div class="table-responsive">
        <table class="gof-table">
          <thead>
            <tr>
              <th>Versão</th>
              <th>Ano</th>
              <th>Status LTS</th>
              <th>Major Bytecode</th>
              <th>Principais Novidades</th>
              <th>Como Utilizar na Prática</th>
              <th>Garantia de Retrocompatibilidade</th>
            </tr>
          </thead>
          <tbody>
            ${javaVersionsMatrix
      .map(
        (v) => `
              <tr>
                <td><span class="badge ${v.lts === "LTS" ? "badge-creational" : "badge-scope"}" style="font-family:var(--font-mono); font-weight:700;">${v.version}</span></td>
                <td>${v.year}</td>
                <td><strong>${v.lts}</strong></td>
                <td><code>${v.classMajor}</code></td>
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

      <h2 class="section-title mt-5">2. Histórico de Versões do Spring Boot (1.x a 3.4+)</h2>
      <p class="text-muted mb-3">Da eliminação de configurações XML no Spring Boot 1.0 à adoção de Virtual Threads, baseline Java 17/21 e compilação nativa no Spring Boot 3.x:</p>
      <div class="table-responsive">
        <table class="gof-table">
          <thead>
            <tr>
              <th>Versão do Spring Boot</th>
              <th>Ano</th>
              <th>Java Mínimo</th>
              <th>Principais Implementações & Recursos</th>
              <th>Quebras & Notas de Retrocompatibilidade</th>
            </tr>
          </thead>
          <tbody>
            ${javaFrameworksHistory.springBoot
      .map(
        (sb) => `
              <tr>
                <td><strong>${sb.version}</strong></td>
                <td>${sb.year}</td>
                <td><code>${sb.minJava}</code></td>
                <td>${sb.keyFeatures}</td>
                <td><small style="color:var(--text-secondary);">${sb.breakingAndCompat}</small></td>
              </tr>
            `
      )
      .join("")}
          </tbody>
        </table>
      </div>

      <h2 class="section-title mt-5">3. Histórico de Versões do Quarkus (1.x a 3.15 LTS)</h2>
      <p class="text-muted mb-3">Supersonic Subatomic Java: arquitetura de injeção de dependência em tempo de compilação (Build-Time Augmentation), Dev Services e GraalVM Native:</p>
      <div class="table-responsive">
        <table class="gof-table">
          <thead>
            <tr>
              <th>Versão do Quarkus</th>
              <th>Ano</th>
              <th>Java Mínimo</th>
              <th>Principais Recursos & Arquitetura</th>
              <th>Quebras & Notas de Migração</th>
            </tr>
          </thead>
          <tbody>
            ${javaFrameworksHistory.quarkus
      .map(
        (qk) => `
              <tr>
                <td><strong>${qk.version}</strong></td>
                <td>${qk.year}</td>
                <td><code>${qk.minJava}</code></td>
                <td>${qk.keyFeatures}</td>
                <td><small style="color:var(--text-secondary);">${qk.breakingAndCompat}</small></td>
              </tr>
            `
      )
      .join("")}
          </tbody>
        </table>
      </div>

      <h2 class="section-title mt-5">4. Evolução Jakarta EE (J2EE a 11) & Micronaut (1.x a 4.x)</h2>
      <div class="table-responsive">
        <table class="gof-table">
          <thead>
            <tr>
              <th>Especificação / Framework</th>
              <th>Período</th>
              <th>Java Mínimo</th>
              <th>Marcos Arquiteturais</th>
              <th>Compatibilidade & Impacto na Indústria</th>
            </tr>
          </thead>
          <tbody>
            ${javaFrameworksHistory.jakartaAndMicronaut
      .map(
        (jm) => `
              <tr>
                <td><strong>${jm.version}</strong></td>
                <td>${jm.year}</td>
                <td><code>${jm.minJava}</code></td>
                <td>${jm.keyFeatures}</td>
                <td><small style="color:var(--text-secondary);">${jm.breakingAndCompat}</small></td>
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
 * 4. HUB DE LABORATÓRIOS INTERATIVOS (#/java/laboratorios)
 */
export function renderJavaLabsHubPage(container) {
  const labKeys = Object.keys(javaLabs);

  container.innerHTML = `
    <div class="content-page">
      <div class="breadcrumb">
        <a href="#/java">Java</a>
        <span>/</span>
        <span>Laboratórios Interativos</span>
      </div>

      <h1 class="page-title">6 Laboratórios & Simuladores da Plataforma Java</h1>
      <p class="page-subtitle">
        Experimente os mecanismos internos da JVM: Type Erasure em Generics, execução reativa de Streams, evolução dos Garbage Collectors, concorrência massiva com Virtual Threads e compilação nativa.
      </p>

      <div class="factory-selector-tabs mb-4" id="jv-labs-selector-tabs">
        ${labKeys
      .map(
        (key, idx) => `
          <button type="button" class="btn btn-tab ${idx === 0 ? "active" : ""}" data-lab="${key}">
            ${idx + 1}. ${javaLabs[key].name}
          </button>
        `
      )
      .join("")}
      </div>

      <div id="jv-active-lab-render-area"></div>
    </div>
  `;

  const renderArea = container.querySelector("#jv-active-lab-render-area");
  const tabs = container.querySelectorAll("#jv-labs-selector-tabs .btn-tab");

  function loadLab(labId) {
    const lab = javaLabs[labId];
    if (!lab || !renderArea) return;
    renderArea.innerHTML = `
      <div class="mb-2" style="display:flex; justify-content:space-between; align-items:center;">
        <span class="text-muted" style="font-size:0.85rem;">Laboratório vinculado ao capítulo:</span>
        <a href="#/java/capitulo/${lab.patternId}" class="btn btn-sm btn-outline">Abrir Capítulo Completo →</a>
      </div>
      <div id="jv-lab-inner-mount"></div>
    `;
    const innerMount = renderArea.querySelector("#jv-lab-inner-mount");
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
 * 5. PÁGINA SOBRE AUTORES & BIBLIOGRAFIA (#/java/referencias)
 */
export function renderJavaReferencesPage(container) {
  container.innerHTML = `
    <div class="content-page">
      <div class="breadcrumb">
        <a href="#/java">Java</a>
        <span>/</span>
        <span>Autores & Bibliografia</span>
      </div>

      <h1 class="page-title">Arquitetos & Obras Clássicas da Plataforma Java</h1>
      <p class="page-subtitle">
        Conheça os principais criadores da linguagem, compilador e máquina virtual HotSpot, além das obras que fundamentam a engenharia de software na JVM.
      </p>

      <div class="authors-grid mt-4">
        ${javaBookOverview.authors
      .map(
        (a) => `
          <div class="author-card">
            <div class="author-avatar">${a.avatar || "JV"}</div>
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
          <h4>Effective Java (3rd Edition)</h4>
          <p class="text-primary mb-2" style="font-size:0.85rem; font-weight:600;">Joshua Bloch • Addison-Wesley</p>
          <p class="text-muted" style="font-size:0.88rem;">O guia canônico de design idiomático na linguagem Java, cobrindo imutabilidade, generics, lambdas e tratamento robusto de exceções.</p>
        </div>
        <div class="info-card">
          <h4>Java Concurrency in Practice</h4>
          <p class="text-primary mb-2" style="font-size:0.85rem; font-weight:600;">Brian Goetz, Doug Lea & Equipe • Addison-Wesley</p>
          <p class="text-muted" style="font-size:0.88rem;">A referência definitiva sobre o Java Memory Model (JSR-133), publicação segura de objetos, coleções concorrentes e threads.</p>
        </div>
        <div class="info-card">
          <h4>The Java Virtual Machine Specification</h4>
          <p class="text-primary mb-2" style="font-size:0.85rem; font-weight:600;">Tim Lindholm, Frank Yellin, Gilad Bracha, Alex Buckley • Oracle</p>
          <p class="text-muted" style="font-size:0.88rem;">A especificação formal do formato de arquivo .class, verificador de bytecode, conjunto de instruções e execução da JVM.</p>
        </div>
        <div class="info-card">
          <h4>Optimizing Java</h4>
          <p class="text-primary mb-2" style="font-size:0.85rem; font-weight:600;">Benjamin J. Evans, James Gough & Chris Newland • O'Reilly</p>
          <p class="text-muted" style="font-size:0.88rem;">Compilação JIT C1/C2 em profundidade, ajuste fino de Garbage Collection (G1, ZGC) e técnicas de medição com JMH.</p>
        </div>
      </div>
    </div>
  `;
}

/**
 * Roteador de rotas de Java (#/java)
 */
export function handleJavaRoute(contentArea, hash = window.location.hash || "#/java") {
  if (hash === "#/java") {
    renderJavaHomePage(contentArea);
  } else if (hash === "#/java/versoes-e-frameworks") {
    renderJavaVersionsAndFrameworksPage(contentArea);
  } else if (hash === "#/java/laboratorios") {
    renderJavaLabsHubPage(contentArea);
  } else if (hash === "#/java/quizzes") {
    renderQuizzesPage(contentArea, { book: "java" });
  } else if (hash === "#/java/referencias") {
    renderJavaReferencesPage(contentArea);
  } else if (hash.startsWith("#/java/capitulo/")) {
    const chapterId = hash.replace("#/java/capitulo/", "").trim();
    renderJavaChapterPage(contentArea, chapterId);
  } else {
    renderJavaHomePage(contentArea);
  }
}
