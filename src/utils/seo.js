import { patternsData } from "../../books/design-patterns/explanations/patterns-data.js";
import { cleanCodeChaptersData } from "../../books/clean-code/explanations/chapters-data.js";
import { grokkingChaptersData } from "../../books/grokking-algorithms/explanations/chapters-data.js";
import { getLang, t, patternI18n } from "../../books/design-patterns/explanations/i18n.js";
import { cleanCodeI18n } from "../../books/clean-code/explanations/clean-code-i18n.js";
import { grokkingAlgorithmsI18n } from "../../books/grokking-algorithms/explanations/grokking-algorithms-i18n.js";

function setMetaTag(nameOrProperty, value, isProperty = false) {
  if (!value) return;
  const selector = isProperty
    ? `meta[property="${nameOrProperty}"]`
    : `meta[name="${nameOrProperty}"]`;
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    if (isProperty) {
      el.setAttribute("property", nameOrProperty);
    } else {
      el.setAttribute("name", nameOrProperty);
    }
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

export function updatePageSEO(hash = window.location.hash || "#/") {
  const lang = getLang();
  let pageTitle = "DevBooks • Código Limpo (Clean Code) & Padrões de Projeto (GoF) Interativos";
  let pageDesc = "Plataforma interativa de engenharia de software: Código Limpo (Robert C. Martin / Uncle Bob) e Padrões de Projeto (Gang of Four - GoF). 40 capítulos e padrões com simuladores visuais SVG, labs e testes práticos.";

  if (hash === "#/" || hash === "#/estante" || hash === "") {
    pageTitle = "DevBooks • Estante Interativa: Código Limpo, Padrões de Projeto & Entendendo Algoritmos";
    pageDesc = "Estante interativa com os clássicos da engenharia de software: Clean Code (Robert C. Martin), Padrões de Projeto (GoF) e Entendendo Algoritmos (Aditya Bhargava). Simuladores visuais e prática.";
  } else if (hash.startsWith("#/grokking-algorithms/capitulo/")) {
    const id = hash.replace("#/grokking-algorithms/capitulo/", "").trim();
    const ch = grokkingChaptersData.find((c) => c.id === id);
    if (ch) {
      const tr = grokkingAlgorithmsI18n[ch.id]?.[lang] || patternI18n[ch.id]?.[lang];
      const name = tr?.name || ch.name;
      const intent = tr?.intent || ch.intent;
      pageTitle = `Cap. ${ch.number} ${name} • Entendendo Algoritmos | DevBooks`;
      pageDesc = `Capítulo ${ch.number} de Entendendo Algoritmos de Aditya Bhargava: ${name}. ${intent} Simulador visual passo a passo, código Multi-Linguagem e exercícios oficiais.`;
    }
  } else if (hash.startsWith("#/grokking-algorithms/laboratorios")) {
    pageTitle = "Laboratórios & Simuladores • Entendendo Algoritmos | DevBooks";
    pageDesc = "Playgrounds interativos de Entendendo Algoritmos: Pesquisa Binária, Selection Sort, Quicksort D&C, Hash Tables com Fator de Carga, BFS e Dijkstra.";
  } else if (hash.startsWith("#/grokking-algorithms/complexidade")) {
    pageTitle = "Escala de Complexidade Big O • Entendendo Algoritmos | DevBooks";
    pageDesc = "Tabela comparativa da notação Big O: O(1), O(log n), O(n), O(n log n), O(n^2) e O(n!) com exemplos ilustrados e taxas de crescimento.";
  } else if (hash.startsWith("#/grokking-algorithms/quizzes")) {
    pageTitle = "Quizzes & Exercícios Oficiais • Entendendo Algoritmos | DevBooks";
    pageDesc = "Teste seus conhecimentos com as questões e desafios oficiais de Entendendo Algoritmos (Aditya Y. Bhargava) com gabarito comentado.";
  } else if (hash.startsWith("#/grokking-algorithms")) {
    pageTitle = "Entendendo Algoritmos (Aditya Bhargava) • 11 Capítulos Ilustrados | DevBooks";
    pageDesc = "Guia visual completo dos 11 capítulos de Entendendo Algoritmos (Grokking Algorithms) de Aditya Bhargava: animações SVG, código em Python/Java/TS e simuladores.";
  } else if (hash.startsWith("#/clean-code/capitulo/")) {
    const id = hash.replace("#/clean-code/capitulo/", "").trim();
    const ch = cleanCodeChaptersData.find((c) => c.id === id);
    if (ch) {
      const tr = cleanCodeI18n[ch.id]?.[lang] || patternI18n[ch.id]?.[lang];
      const name = tr?.name || ch.name;
      const intent = tr?.intent || ch.intent;
      pageTitle = `Cap. ${ch.number} ${name} • Código Limpo (Clean Code) | DevBooks`;
      pageDesc = `Capítulo ${ch.number} de Código Limpo (Clean Code) de Robert C. Martin: ${name}. ${intent} Simulador visual passo a passo, código Sujo vs. Limpo e exercícios.`;
    }
  } else if (hash.startsWith("#/clean-code/laboratorios")) {
    pageTitle = "Laboratórios & Gráficos Interativos • Código Limpo (Clean Code) | DevBooks";
    pageDesc = "Laboratórios visuais de Clean Code: Gráfico de Produtividade vs. Tempo (Curva Wading), simulador da Lei de Demeter, TDD Three Laws e CAS Concorrência.";
  } else if (hash.startsWith("#/clean-code/quizzes")) {
    pageTitle = "Quizzes & Exercícios Práticos • Código Limpo (Clean Code) | DevBooks";
    pageDesc = "Teste seus conhecimentos em Clean Code (Robert C. Martin): 34 questões conceituais, cenários de diagnóstico de odores e heurísticas de código.";
  } else if (hash.startsWith("#/clean-code")) {
    pageTitle = "Código Limpo (Clean Code - Robert C. Martin) • 17 Capítulos Interativos | DevBooks";
    pageDesc = "Explore interativamente os 17 capítulos de Código Limpo (Clean Code) de Robert C. Martin (Uncle Bob): simuladores visuais, 66 odores e heurísticas, código Sujo vs. Java/TS/Python e exercícios.";
  } else if (hash.startsWith("#/padrao/")) {
    const id = hash.replace("#/padrao/", "").trim();
    const p = patternsData.find((item) => item.id === id);
    if (p) {
      const tr = patternI18n[p.id]?.[lang];
      const name = tr?.name || p.name;
      const intent = tr?.intent || p.intent;
      const cat = p.category.charAt(0).toUpperCase() + p.category.slice(1);
      pageTitle = `${name} (${p.name}) • Padrão de Projeto GoF ${cat} | DevBooks`;
      pageDesc = `Padrão de Projeto ${p.name} (Gang of Four - GoF): ${intent} Simulador SVG interativo em 5 etapas, estrutura UML, código em TypeScript, Java e Python.`;
    }
  } else if (hash.startsWith("#/laboratorios")) {
    pageTitle = "9 Laboratórios Práticos Interativos • Padrões de Projeto (GoF) | DevBooks";
    pageDesc = "9 playgrounds interativos com simulação em tempo real dos padrões de projeto GoF: Undo/Redo com Command, State vs. Strategy, Pub/Sub Observer e mais.";
  } else if (hash.startsWith("#/quizzes")) {
    pageTitle = "Quizzes, Cenários & Exercícios Práticos • Padrões de Projeto (GoF) | DevBooks";
    pageDesc = "Banco de exercícios interativos sobre os 23 padrões de projeto GoF: quizzes conceituais, cenários arquiteturais e editor prático com correção imediata.";
  } else if (hash.startsWith("#/design-patterns")) {
    pageTitle = "Padrões de Projeto (Design Patterns - GoF) • Catálogo dos 23 Padrões | DevBooks";
    pageDesc = "Catálogo interativo completo dos 23 Padrões de Projeto GoF (Gang of Four: Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides): Criacionais, Estruturais e Comportamentais com simuladores SVG.";
  }

  document.title = pageTitle;
  setMetaTag("description", pageDesc);
  setMetaTag("og:title", pageTitle, true);
  setMetaTag("og:description", pageDesc, true);
  setMetaTag("twitter:title", pageTitle);
  setMetaTag("twitter:description", pageDesc);
}

