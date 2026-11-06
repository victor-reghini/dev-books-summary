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

test("Estante Principal e botão no topo do cabeçalho estão presentes com as capas dos dois livros", () => {
  const indexHtml = fs.readFileSync(path.join(rootDir, "index.html"), "utf8");
  assert.ok(indexHtml.includes('id="btn-estante-principal"'), "Botão Estante Principal deve existir no header");
  assert.ok(indexHtml.includes('href="#/estante"'), "Link para #/estante deve existir no header");

  const bookshelfJs = fs.readFileSync(path.join(rootDir, "src/components/bookshelf-view.js"), "utf8");
  assert.ok(bookshelfJs.includes("book-gof-theme"), "Capa do livro Padrões de Projeto deve existir na Estante Principal");
  assert.ok(bookshelfJs.includes("book-cleancode-theme"), "Capa do livro Código Limpo deve existir na Estante Principal");
  assert.ok(bookshelfJs.includes('href="#/design-patterns"'), "Link para abrir Padrões de Projeto deve existir na Estante");
  assert.ok(bookshelfJs.includes('href="#/clean-code"'), "Link para abrir Código Limpo deve existir na Estante");
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
