import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { BOOKS_REGISTRY } from "../books/registry.js";
import { cleanCodeBook } from "../books/clean-code/index.js";
import { designPatternsBook } from "../books/design-patterns/index.js";
import { grokkingAlgorithmsBook } from "../books/grokking-algorithms/index.js";
import { javaBook } from "../books/java/index.js";
import { nodeBook } from "../books/node/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

test("Estrutura obrigatória por livro: cada livro tem sua pasta com explanations, examples e exercises", () => {
  for (const bookId of ["clean-code", "design-patterns", "grokking-algorithms", "java", "node"]) {
    const bookDir = path.join(rootDir, "books", bookId);
    assert.ok(fs.existsSync(bookDir), `Pasta do livro ${bookId} deve existir`);
    assert.ok(fs.existsSync(path.join(bookDir, "explanations")), `${bookId}/explanations deve existir`);
    assert.ok(fs.existsSync(path.join(bookDir, "examples")), `${bookId}/examples deve existir`);
    assert.ok(fs.existsSync(path.join(bookDir, "exercises")), `${bookId}/exercises deve existir`);
  }
  assert.equal(BOOKS_REGISTRY.length, 5);
});

test("Padrões de Projeto (GoF): incorpora 100% do app original (23 padrões, 23 animações, 9 labs, quizzes, cenários e prática)", () => {
  assert.equal(designPatternsBook.patternsData.length, 23);
  assert.equal(Object.keys(designPatternsBook.patternAnimations).length, 23);
  assert.equal(Object.keys(designPatternsBook.labs).length, 9);
  assert.ok(designPatternsBook.quizzesData.length >= 25);
  assert.ok(designPatternsBook.scenariosData.length >= 10);
  assert.ok(designPatternsBook.practicalExercisesData.length >= 6);

  for (const pattern of designPatternsBook.patternsData) {
    assert.ok(designPatternsBook.patternAnimations[pattern.id], `Animação ausente para ${pattern.id}`);
    assert.ok(pattern.codeExamples.typescript, `Código TS ausente para ${pattern.id}`);
    assert.ok(pattern.codeExamples.java, `Código Java ausente para ${pattern.id}`);
    assert.ok(pattern.codeExamples.python, `Código Python ausente para ${pattern.id}`);
  }
});

test("Código Limpo (Clean Code): construído nos mesmos moldes (17 capítulos, 17 animações de 5 etapas, 6 labs gráficos, 66 heurísticas, código Sujo vs. Java/TS/Python e exercícios)", () => {
  assert.equal(cleanCodeBook.cleanCodeChaptersData.length, 17);
  assert.equal(Object.keys(cleanCodeBook.cleanCodeAnimations).length, 17);
  assert.equal(Object.keys(cleanCodeBook.cleanCodeLabs).length, 6);
  assert.equal(cleanCodeBook.smellsCatalog.length, 66);
  assert.ok(cleanCodeBook.cleanCodeQuizzesData.length >= 34);
  assert.ok(cleanCodeBook.cleanCodeScenariosData.length >= 5);
  assert.ok(cleanCodeBook.cleanCodePracticalExercisesData.length >= 4);

  for (let i = 0; i < 17; i++) {
    const ch = cleanCodeBook.cleanCodeChaptersData[i];
    assert.equal(ch.number, i + 1);
    assert.ok(ch.intent.length > 20, `Cap. ${ch.number} precisa de intenção/tese`);
    assert.ok(ch.problemAndMotivation.length > 20, `Cap. ${ch.number} precisa de problema/motivação`);
    assert.ok(ch.solution.length > 20, `Cap. ${ch.number} precisa de solução`);
    assert.ok(ch.codeExamples.dirty.length > 20, `Cap. ${ch.number} precisa de código sujo (Antes)`);
    assert.ok(ch.codeExamples.java.length > 20, `Cap. ${ch.number} precisa de código Java limpo`);
    assert.ok(ch.codeExamples.typescript.length > 20, `Cap. ${ch.number} precisa de código TS limpo`);
    assert.ok(ch.codeExamples.python.length > 20, `Cap. ${ch.number} precisa de código Python limpo`);

    const anim = cleanCodeBook.cleanCodeAnimations[ch.id];
    assert.ok(anim, `Cap. ${ch.number} precisa de especificação de animação SVG`);
    assert.equal(anim.steps.length, 5, `Cap. ${ch.number} precisa de 5 etapas animadas`);
  }
});

test("Entendendo Algoritmos (Grokking Algorithms): construído nos mesmos moldes (11 capítulos, 11 animações de 5 etapas, 8 labs gráficos, código Naive vs. Java/TS/Python e exercícios oficiais)", () => {
  assert.equal(grokkingAlgorithmsBook.grokkingChaptersData.length, 11);
  assert.equal(Object.keys(grokkingAlgorithmsBook.grokkingAlgorithmsAnimations).length, 11);
  assert.ok(Object.keys(grokkingAlgorithmsBook.grokkingAlgorithmsLabs).length >= 6);
  assert.ok(grokkingAlgorithmsBook.grokkingQuizzesData.length >= 22);
  assert.ok(grokkingAlgorithmsBook.grokkingScenariosData.length >= 5);
  assert.ok(grokkingAlgorithmsBook.grokkingPracticalExercisesData.length >= 4);

  for (let i = 0; i < 11; i++) {
    const ch = grokkingAlgorithmsBook.grokkingChaptersData[i];
    assert.equal(ch.number, i + 1);
    assert.ok(ch.intent.length > 20, `Cap. ${ch.number} precisa de intenção/tese`);
    assert.ok(ch.problemAndMotivation.length > 20, `Cap. ${ch.number} precisa de problema/motivação`);
    assert.ok(ch.solution.length > 20, `Cap. ${ch.number} precisa de solução`);
    assert.ok(ch.codeExamples.dirty.length > 20, `Cap. ${ch.number} precisa de código naive/procedural`);
    assert.ok(ch.codeExamples.java.length > 20, `Cap. ${ch.number} precisa de código Java`);
    assert.ok(ch.codeExamples.typescript.length > 20, `Cap. ${ch.number} precisa de código TS`);
    assert.ok(ch.codeExamples.python.length > 20, `Cap. ${ch.number} precisa de código Python`);

    const anim = grokkingAlgorithmsBook.grokkingAlgorithmsAnimations[ch.id];
    assert.ok(anim, `Cap. ${ch.number} precisa de especificação de animação SVG`);
    assert.equal(anim.steps.length, 5, `Cap. ${ch.number} precisa de 5 etapas animadas`);
  }

  const grokkingViewsJs = fs.readFileSync(path.join(rootDir, "src/components/grokking-views.js"), "utf8");
  assert.ok(grokkingViewsJs.includes("pe-pattern-card"), "Catálogo deve usar cards estilizados .pe-pattern-card");
  assert.ok(grokkingViewsJs.includes("code-block-wrapper"), "Bloco de código deve usar .code-block-wrapper");
  assert.ok(grokkingViewsJs.includes("tradeoffs-container"), "Prós e contras devem usar .tradeoffs-container");
  assert.ok(grokkingViewsJs.includes("info-card"), "Blocos de texto devem usar .info-card");
  assert.ok(grokkingViewsJs.includes("gof-table"), "Tabelas devem usar .gof-table");

  const visualizerJs = fs.readFileSync(path.join(rootDir, "src/components/pattern-visualizer.js"), "utf8");
  assert.ok(visualizerJs.includes("grokkingAlgorithmsAnimations"), "Pattern visualizer deve suportar animações de Grokking Algorithms");

  const quizEngineJs = fs.readFileSync(path.join(rootDir, "src/components/quiz-engine.js"), "utf8");
  assert.ok(quizEngineJs.includes("grokkingQuizzesData"), "Quiz engine deve suportar quizzes de Grokking Algorithms");
});

test("Java (JVM & Ecossistema): construído nos mesmos moldes (12 capítulos, 12 animações de 5 etapas, 6 labs, matriz de versões JDK 1.0–25 LTS, Spring Boot, Quarkus e 24 quizzes)", () => {
  assert.equal(javaBook.javaChaptersData.length, 12);
  assert.equal(Object.keys(javaBook.javaAnimations).length, 12);
  assert.equal(Object.keys(javaBook.javaLabs).length, 6);
  assert.ok(javaBook.javaQuizzesData.length >= 24);
  assert.ok(javaBook.javaScenariosData.length >= 4);
  assert.ok(javaBook.javaPracticalExercisesData.length >= 2);
  assert.ok(javaBook.bookOverview.javaVersionsMatrix.length >= 12);
  assert.ok(javaBook.bookOverview.javaFrameworksHistory.springBoot.length >= 4);
  assert.ok(javaBook.bookOverview.javaFrameworksHistory.quarkus.length >= 4);

  for (let i = 0; i < 12; i++) {
    const ch = javaBook.javaChaptersData[i];
    assert.equal(ch.number, i + 1);
    assert.ok(ch.intent.length > 20, `Cap. ${ch.number} precisa de intenção/tese`);
    assert.ok(ch.problemAndMotivation.length > 20, `Cap. ${ch.number} precisa de problema/motivação`);
    assert.ok(ch.solution.length > 20, `Cap. ${ch.number} precisa de solução`);
    assert.ok(ch.codeExamples.dirty.length > 20, `Cap. ${ch.number} precisa de código Java legado (Antes)`);
    assert.ok(ch.codeExamples.java.length > 20, `Cap. ${ch.number} precisa de código Java moderno`);
    assert.ok(ch.codeExamples.typescript.length > 20, `Cap. ${ch.number} precisa de código TS equivalente`);
    assert.ok(ch.codeExamples.python.length > 20, `Cap. ${ch.number} precisa de código Python equivalente`);

    const anim = javaBook.javaAnimations[ch.id];
    assert.ok(anim, `Cap. ${ch.number} precisa de especificação de animação SVG`);
    assert.equal(anim.steps.length, 5, `Cap. ${ch.number} precisa de 5 etapas animadas`);
  }

  const javaViewsJs = fs.readFileSync(path.join(rootDir, "src/components/java-views.js"), "utf8");
  assert.ok(javaViewsJs.includes("pe-pattern-card"), "Catálogo Java deve usar cards estilizados .pe-pattern-card");
  assert.ok(javaViewsJs.includes("code-block-wrapper"), "Bloco de código deve usar .code-block-wrapper");
  assert.ok(javaViewsJs.includes("tradeoffs-container"), "Prós e contras devem usar .tradeoffs-container");
  assert.ok(javaViewsJs.includes("info-card"), "Blocos de texto devem usar .info-card");
  assert.ok(javaViewsJs.includes("gof-table"), "Tabelas devem usar .gof-table");

  const visualizerJs = fs.readFileSync(path.join(rootDir, "src/components/pattern-visualizer.js"), "utf8");
  assert.ok(visualizerJs.includes("javaAnimations"), "Pattern visualizer deve suportar animações de Java");

  const quizEngineJs = fs.readFileSync(path.join(rootDir, "src/components/quiz-engine.js"), "utf8");
  assert.ok(quizEngineJs.includes("javaQuizzesData"), "Quiz engine deve suportar quizzes de Java");
});

test("Node.js (Event Loop & Frameworks): construído nos mesmos moldes (12 capítulos, 12 animações de 5 etapas, 6 labs, matriz de versões 0.10–24, Express 5, Fastify, NestJS e 24 quizzes)", () => {
  assert.equal(nodeBook.nodeChaptersData.length, 12);
  assert.equal(Object.keys(nodeBook.nodeAnimations).length, 12);
  assert.equal(Object.keys(nodeBook.nodeLabs).length, 6);
  assert.ok(nodeBook.nodeQuizzesData.length >= 24);
  assert.ok(nodeBook.nodeScenariosData.length >= 4);
  assert.ok(nodeBook.nodePracticalExercisesData.length >= 2);
  assert.ok(nodeBook.bookOverview.nodeVersionsMatrix.length >= 12);
  assert.ok(nodeBook.bookOverview.nodeFrameworksHistory.express.length >= 3);
  assert.ok(nodeBook.bookOverview.nodeFrameworksHistory.fastify.length >= 3);

  for (let i = 0; i < 12; i++) {
    const ch = nodeBook.nodeChaptersData[i];
    assert.equal(ch.number, i + 1);
    assert.ok(ch.intent.length > 20, `Cap. ${ch.number} precisa de intenção/tese`);
    assert.ok(ch.problemAndMotivation.length > 20, `Cap. ${ch.number} precisa de problema/motivação`);
    assert.ok(ch.solution.length > 20, `Cap. ${ch.number} precisa de solução`);
    assert.ok(ch.codeExamples.dirty.length > 20, `Cap. ${ch.number} precisa de código Node legado (Antes)`);
    assert.ok(ch.codeExamples.typescript.length > 20, `Cap. ${ch.number} precisa de código Node moderno TS/ESM`);
    assert.ok(ch.codeExamples.java.length > 20, `Cap. ${ch.number} precisa de código Java equivalente`);
    assert.ok(ch.codeExamples.python.length > 20, `Cap. ${ch.number} precisa de código Python equivalente`);

    const anim = nodeBook.nodeAnimations[ch.id];
    assert.ok(anim, `Cap. ${ch.number} precisa de especificação de animação SVG`);
    assert.equal(anim.steps.length, 5, `Cap. ${ch.number} precisa de 5 etapas animadas`);
  }

  const nodeViewsJs = fs.readFileSync(path.join(rootDir, "src/components/node-views.js"), "utf8");
  assert.ok(nodeViewsJs.includes("pe-pattern-card"), "Catálogo Node deve usar cards estilizados .pe-pattern-card");
  assert.ok(nodeViewsJs.includes("code-block-wrapper"), "Bloco de código deve usar .code-block-wrapper");
  assert.ok(nodeViewsJs.includes("tradeoffs-container"), "Prós e contras devem usar .tradeoffs-container");
  assert.ok(nodeViewsJs.includes("info-card"), "Blocos de texto devem usar .info-card");
  assert.ok(nodeViewsJs.includes("gof-table"), "Tabelas devem usar .gof-table");

  const visualizerJs = fs.readFileSync(path.join(rootDir, "src/components/pattern-visualizer.js"), "utf8");
  assert.ok(visualizerJs.includes("nodeAnimations"), "Pattern visualizer deve suportar animações de Node.js");

  const quizEngineJs = fs.readFileSync(path.join(rootDir, "src/components/quiz-engine.js"), "utf8");
  assert.ok(quizEngineJs.includes("nodeQuizzesData"), "Quiz engine deve suportar quizzes de Node.js");
});

test("Estante Principal e navegação no cabeçalho estão presentes com as capas dos 5 livros", () => {
  const indexHtml = fs.readFileSync(path.join(rootDir, "index.html"), "utf8");
  assert.ok(indexHtml.includes('class="logo-brand"') && indexHtml.includes('href="#/estante"'), "Título DevBooks deve ter link para #/estante no header");
  assert.ok(indexHtml.includes('id="brand-title"'), "Identificador brand-title deve existir no header");

  const bookshelfJs = fs.readFileSync(path.join(rootDir, "src/components/bookshelf-view.js"), "utf8");
  assert.ok(bookshelfJs.includes("book-gof-theme"), "Capa do livro Padrões de Projeto deve existir na Estante Principal");
  assert.ok(bookshelfJs.includes("book-cleancode-theme"), "Capa do livro Código Limpo deve existir na Estante Principal");
  assert.ok(bookshelfJs.includes("book-grokking-theme"), "Capa do livro Entendendo Algoritmos deve existir na Estante Principal");
  assert.ok(bookshelfJs.includes("book-java-theme"), "Capa do livro Java deve existir na Estante Principal");
  assert.ok(bookshelfJs.includes("book-node-theme"), "Capa do livro Node.js deve existir na Estante Principal");
  assert.ok(bookshelfJs.includes('href="#/design-patterns"'), "Link para abrir Padrões de Projeto deve existir na Estante");
  assert.ok(bookshelfJs.includes('href="#/clean-code"'), "Link para abrir Código Limpo deve existir na Estante");
  assert.ok(bookshelfJs.includes('href="#/grokking-algorithms"'), "Link para abrir Entendendo Algoritmos deve existir na Estante");
  assert.ok(bookshelfJs.includes('href="#/java"'), "Link para abrir Java deve existir na Estante");
  assert.ok(bookshelfJs.includes('href="#/node"'), "Link para abrir Node.js deve existir na Estante");
  assert.ok(bookshelfJs.includes("https://link.amazon/B056h6M84"), "Link de associado Amazon para Padrões de Projeto deve existir");
  assert.ok(bookshelfJs.includes("https://link.amazon/B0b1hcoN2"), "Link de associado Amazon para Clean Code deve existir");
  assert.ok(bookshelfJs.includes("https://link.amazon/B04UCSIMC"), "Link de associado Amazon para Grokking Algorithms deve existir");
  assert.ok(bookshelfJs.includes("https://link.amazon/B0JAVA21LTS"), "Link de associado Amazon para Java deve existir");
  assert.ok(bookshelfJs.includes("https://link.amazon/B0NODE22LTS"), "Link de associado Amazon para Node.js deve existir");
  assert.equal(designPatternsBook.affiliateUrl, "https://link.amazon/B056h6M84");
  assert.equal(cleanCodeBook.affiliateUrl, "https://link.amazon/B0b1hcoN2");
  assert.equal(grokkingAlgorithmsBook.affiliateUrl, "https://link.amazon/B04UCSIMC");
  assert.equal(javaBook.affiliateUrl, "https://link.amazon/B0JAVA21LTS");
  assert.equal(nodeBook.affiliateUrl, "https://link.amazon/B0NODE22LTS");
});

test("Anti-Slop Gate (R-02): nenhum arquivo de conteúdo Clean Code, Grokking Algorithms, Java, Node ou interface usa travessão longo (em dash)", () => {
  const filesToCheck = [
    "index.html",
    "src/main.js",
    "src/components/bookshelf-view.js",
    "src/components/clean-code-views.js",
    "src/components/grokking-views.js",
    "src/components/java-views.js",
    "src/components/node-views.js",
    "src/components/router.js",
    "src/components/sidebar.js",
    "books/clean-code/explanations/part1-foundations.js",
    "books/clean-code/explanations/part2-design.js",
    "books/clean-code/explanations/part3-architecture.js",
    "books/clean-code/explanations/part4-casestudies.js",
    "books/clean-code/explanations/book-overview.js",
    "books/clean-code/explanations/chapters-data.js",
    "books/clean-code/examples/index.js",
    "books/clean-code/examples/clean-code-animations.js",
    "books/clean-code/examples/clean-code-labs.js",
    "books/clean-code/exercises/index.js",
    "books/clean-code/exercises/clean-code-quizzes.js",
    "books/grokking-algorithms/index.js",
    "books/grokking-algorithms/explanations/book-overview.js",
    "books/grokking-algorithms/explanations/part1-foundations.js",
    "books/grokking-algorithms/explanations/part2-divide-hash.js",
    "books/grokking-algorithms/explanations/part3-graphs.js",
    "books/grokking-algorithms/explanations/part4-advanced.js",
    "books/grokking-algorithms/explanations/chapters-data.js",
    "books/grokking-algorithms/explanations/grokking-algorithms-i18n.js",
    "books/grokking-algorithms/examples/index.js",
    "books/grokking-algorithms/examples/grokking-algorithms-animations.js",
    "books/grokking-algorithms/examples/grokking-algorithms-labs.js",
    "books/grokking-algorithms/exercises/index.js",
    "books/grokking-algorithms/exercises/grokking-algorithms-quizzes.js",
    "books/java/index.js",
    "books/java/explanations/book-overview.js",
    "books/java/explanations/part1-classic-jvm.js",
    "books/java/explanations/part2-functional-modular.js",
    "books/java/explanations/part3-modern-lts.js",
    "books/java/explanations/part4-frameworks.js",
    "books/java/explanations/chapters-data.js",
    "books/java/explanations/java-i18n.js",
    "books/java/examples/index.js",
    "books/java/examples/java-animations.js",
    "books/java/examples/java-labs.js",
    "books/java/exercises/index.js",
    "books/java/exercises/java-quizzes.js",
    "books/node/index.js",
    "books/node/explanations/book-overview.js",
    "books/node/explanations/part1-core-eventloop.js",
    "books/node/explanations/part2-esm-concurrency.js",
    "books/node/explanations/part3-modern-runtime.js",
    "books/node/explanations/part4-frameworks.js",
    "books/node/explanations/chapters-data.js",
    "books/node/explanations/node-i18n.js",
    "books/node/examples/index.js",
    "books/node/examples/node-animations.js",
    "books/node/examples/node-labs.js",
    "books/node/exercises/index.js",
    "books/node/exercises/node-quizzes.js"
  ];

  for (const rel of filesToCheck) {
    const content = fs.readFileSync(path.join(rootDir, rel), "utf8");
    assert.equal(content.includes("—"), false, `Arquivo ${rel} não deve conter em-dash (—)`);
  }
});

test("Multi-idiomas: suporte aos 5 idiomas (PT, EN, ES, IT, FR) no dropdown, fluxogramas, questões e explicações", async () => {
  const i18n = await import("../books/design-patterns/explanations/i18n.js");
  const supported = i18n.SUPPORTED_LANGS;

  assert.equal(supported.length, 5, "Devem existir exatamente 5 idiomas suportados");
  const codes = supported.map(l => l.code);
  assert.deepEqual(codes, ["pt", "en", "es", "it", "fr"], "Idiomas devem ser PT, EN, ES, IT, FR");

  // Dropdown no HTML deve conter as 5 opções com códigos correspondentes
  const indexHtml = fs.readFileSync(path.join(rootDir, "index.html"), "utf8");
  assert.ok(indexHtml.includes('id="lang-dropdown-trigger"'), "Trigger do dropdown deve existir");
  for (const code of ["pt", "en", "es", "it", "fr"]) {
    assert.ok(indexHtml.includes(`data-lang="${code}"`), `Opção ${code} deve existir no menu do dropdown`);
  }

  // Traduções do motor de visualização e UI para todas as 5 línguas
  for (const code of ["pt", "en", "es", "it", "fr"]) {
    i18n.setLang(code);
    assert.equal(i18n.getLang(), code);
    assert.ok(i18n.t("overviewLabel"), `overviewLabel deve existir para ${code}`);
    assert.ok(i18n.t("btnPlay"), `btnPlay deve existir para ${code}`);
    assert.ok(i18n.t("mainBookshelf"), `mainBookshelf deve existir para ${code}`);
  }

  // Validação de tradução nos fluxogramas e animações
  const flowchartI18n = await import("../books/design-patterns/examples/flowchart-i18n.js");
  assert.ok(flowchartI18n.cleanCodeAnimStepsI18n["cap-1"].en, "Fluxograma Cap. 1 deve ter tradução EN");
  assert.ok(flowchartI18n.cleanCodeAnimStepsI18n["cap-1"].es, "Fluxograma Cap. 1 deve ter tradução ES");
  assert.ok(flowchartI18n.cleanCodeAnimStepsI18n["cap-1"].it, "Fluxograma Cap. 1 deve ter tradução IT");
  assert.ok(flowchartI18n.cleanCodeAnimStepsI18n["cap-1"].fr, "Fluxograma Cap. 1 deve ter tradução FR");

  // Validação de tradução nas questões e quizzes
  const quizzesI18n = await import("../books/design-patterns/exercises/quizzes-i18n.js");
  const sampleQuiz = {
    id: "q-principles-1",
    question: "Original PT",
    options: [{ text: "Opt 1" }, { text: "Opt 2" }, { text: "Opt 3" }, { text: "Opt 4" }],
    explanation: "Explicação PT"
  };

  for (const code of ["en", "es", "it", "fr"]) {
    const translated = quizzesI18n.getQuizTranslation(sampleQuiz, code);
    assert.notEqual(translated.question, "Original PT", `Questão deve ser traduzida para ${code}`);
    assert.notEqual(translated.explanation, "Explicação PT", `Explicação deve ser traduzida para ${code}`);
  }

  // Retorna para o idioma padrão PT
  i18n.setLang("pt");
});

test("Configuração de SEO: meta tags, OpenGraph e dados estruturados Schema.org (JSON-LD) para os livros", () => {
  const indexHtml = fs.readFileSync(path.join(rootDir, "index.html"), "utf8");
  assert.ok(indexHtml.includes('name="keywords"'), "Meta keywords deve estar presente");
  assert.ok(indexHtml.includes("robert c martin") && indexHtml.includes("clean code"), "Keywords de Clean Code devem estar presentes");
  assert.ok(indexHtml.includes("erich gamma") && indexHtml.includes("design patterns"), "Keywords de Padrões de Projeto (GoF) devem estar presentes");
  assert.ok(indexHtml.includes("aditya bhargava") && indexHtml.includes("grokking algorithms"), "Keywords de Entendendo Algoritmos devem estar presentes");
  assert.ok(indexHtml.includes("java") && indexHtml.includes("spring boot") && indexHtml.includes("quarkus"), "Keywords de Java devem estar presentes");
  assert.ok(indexHtml.includes("node.js") && indexHtml.includes("express") && indexHtml.includes("fastify"), "Keywords de Node.js devem estar presentes");
  assert.ok(indexHtml.includes('property="og:title"'), "Open Graph title deve estar presente");
  assert.ok(indexHtml.includes('name="twitter:card"'), "Twitter Card deve estar presente");
  assert.ok(indexHtml.includes('type="application/ld+json"'), "Schema.org JSON-LD deve estar presente");
  assert.ok(indexHtml.includes('"@type": "Book"'), "Dados estruturados de Livro (Schema.org) devem estar presentes");
  assert.ok(indexHtml.includes("Robert C. Martin") && indexHtml.includes("Erich Gamma") && indexHtml.includes("Aditya Y. Bhargava"), "Autores dos livros devem estar presentes no JSON-LD");
  assert.ok(indexHtml.includes("James Gosling") && indexHtml.includes("Ryan Dahl"), "Autores de Java e Node devem estar presentes no JSON-LD");
});
