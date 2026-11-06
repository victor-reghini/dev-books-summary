import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { BOOKS_REGISTRY } from "../books/registry.js";
import { cleanCodeBook } from "../books/clean-code/index.js";
import { designPatternsBook } from "../books/design-patterns/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

test("Estrutura obrigatória por livro: cada livro tem sua pasta com explanations, examples e exercises", () => {
  for (const bookId of ["clean-code", "design-patterns"]) {
    const bookDir = path.join(rootDir, "books", bookId);
    assert.ok(fs.existsSync(bookDir), `Pasta do livro ${bookId} deve existir`);
    assert.ok(fs.existsSync(path.join(bookDir, "explanations")), `${bookId}/explanations deve existir`);
    assert.ok(fs.existsSync(path.join(bookDir, "examples")), `${bookId}/examples deve existir`);
    assert.ok(fs.existsSync(path.join(bookDir, "exercises")), `${bookId}/exercises deve existir`);
  }
  assert.equal(BOOKS_REGISTRY.length, 2);
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

test("Estante Principal e navegação no cabeçalho estão presentes com as capas dos dois livros", () => {
  const indexHtml = fs.readFileSync(path.join(rootDir, "index.html"), "utf8");
  assert.ok(indexHtml.includes('class="logo-brand"') && indexHtml.includes('href="#/estante"'), "Título DevBooks deve ter link para #/estante no header");
  assert.ok(indexHtml.includes('id="brand-title"'), "Identificador brand-title deve existir no header");

  const bookshelfJs = fs.readFileSync(path.join(rootDir, "src/components/bookshelf-view.js"), "utf8");
  assert.ok(bookshelfJs.includes("book-gof-theme"), "Capa do livro Padrões de Projeto deve existir na Estante Principal");
  assert.ok(bookshelfJs.includes("book-cleancode-theme"), "Capa do livro Código Limpo deve existir na Estante Principal");
  assert.ok(bookshelfJs.includes('href="#/design-patterns"'), "Link para abrir Padrões de Projeto deve existir na Estante");
  assert.ok(bookshelfJs.includes('href="#/clean-code"'), "Link para abrir Código Limpo deve existir na Estante");
  assert.ok(bookshelfJs.includes("https://link.amazon/B056h6M84"), "Link de associado Amazon para Padrões de Projeto deve existir");
  assert.ok(bookshelfJs.includes("https://link.amazon/B0b1hcoN2"), "Link de associado Amazon para Clean Code deve existir");
  assert.equal(designPatternsBook.affiliateUrl, "https://link.amazon/B056h6M84");
  assert.equal(cleanCodeBook.affiliateUrl, "https://link.amazon/B0b1hcoN2");
});

test("Anti-Slop Gate (R-02): nenhum arquivo de conteúdo Clean Code ou interface usa travessão longo (em dash)", () => {
  const filesToCheck = [
    "index.html",
    "src/main.js",
    "src/components/bookshelf-view.js",
    "src/components/clean-code-views.js",
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
    "books/clean-code/exercises/clean-code-quizzes.js"
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
