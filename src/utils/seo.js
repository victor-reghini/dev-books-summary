import { patternsData } from "../../books/design-patterns/explanations/patterns-data.js";
import { cleanCodeChaptersData } from "../../books/clean-code/explanations/chapters-data.js";
import { grokkingChaptersData } from "../../books/grokking-algorithms/explanations/chapters-data.js";
import { javaChaptersData } from "../../books/java/explanations/chapters-data.js";
import { nodeChaptersData } from "../../books/node/explanations/chapters-data.js";
import { getLang, t, patternI18n } from "../../books/design-patterns/explanations/i18n.js";
import { cleanCodeI18n } from "../../books/clean-code/explanations/clean-code-i18n.js";
import { grokkingAlgorithmsI18n } from "../../books/grokking-algorithms/explanations/grokking-algorithms-i18n.js";
import { javaI18n } from "../../books/java/explanations/java-i18n.js";
import { nodeI18n } from "../../books/node/explanations/node-i18n.js";

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
  let pageTitle = "DevBooks • Plataforma Interativa de Livros e Engenharia de Software";
  let pageDesc = "Plataforma interativa de engenharia de software: Clean Code, Padrões de Projeto GoF, Entendendo Algoritmos, Java (JDK 1.0 ao 25 LTS) e Node.js (0.10 ao 24). 75 capítulos e módulos animados com simuladores visuais SVG, labs e testes práticos.";

  if (hash === "#/" || hash === "#/estante" || hash === "") {
    pageTitle = "DevBooks • Estante Interativa: Código Limpo, Padrões GoF, Algoritmos, Java & Node.js";
    pageDesc = "Estante interativa com os clássicos e plataformas de engenharia de software: Clean Code, Padrões de Projeto (GoF), Entendendo Algoritmos, Java (JDK 1.0 a 25 LTS + Spring Boot) e Node.js (0.10 a 24 + Express 5). Simuladores visuais e prática.";
  } else if (hash.startsWith("#/java/capitulo/")) {
    const id = hash.replace("#/java/capitulo/", "").trim();
    const ch = javaChaptersData.find((c) => c.id === id);
    if (ch) {
      const tr = javaI18n[ch.id]?.[lang] || patternI18n[ch.id]?.[lang];
      const name = tr?.name || ch.name;
      const intent = tr?.intent || ch.intent;
      pageTitle = `Cap. ${ch.number} ${name} • Java & JVM | DevBooks`;
      pageDesc = `Capítulo ${ch.number} de Java: ${name}. ${intent} Simulador visual passo a passo, código multi-linguagem, matriz de compatibilidade e frameworks.`;
    }
  } else if (hash.startsWith("#/java/versoes-e-frameworks")) {
    pageTitle = "Histórico de Versões do Java & Frameworks (Spring Boot, Quarkus) | DevBooks";
    pageDesc = "Matriz completa de versões do JDK 1.0 ao 25 LTS, Spring Boot 1 a 3.4+, Quarkus e Jakarta EE com novidades técnicas e retrocompatibilidade.";
  } else if (hash.startsWith("#/java/laboratorios")) {
    pageTitle = "Laboratórios & Simuladores • Java & JVM | DevBooks";
    pageDesc = "Playgrounds interativos de Java: Type Erasure em Generics, Pipeline de Streams, Garbage Collection, Virtual Threads e compilação nativa GraalVM.";
  } else if (hash.startsWith("#/java/quizzes")) {
    pageTitle = "Quizzes & Exercícios Práticos • Java & JVM | DevBooks";
    pageDesc = "Teste seus conhecimentos em Java (JDK 1.0 ao 25 LTS, Spring Boot e Quarkus) com 24 quizzes comentados, cenários de arquitetura e desafios práticos.";
  } else if (hash.startsWith("#/java")) {
    pageTitle = "Java: Guia Completo de Versões, JVM & Ecossistema • 12 Capítulos | DevBooks";
    pageDesc = "Explore a evolução do Java do JDK 1.0 ao 25 LTS, Spring Boot, Quarkus e Jakarta EE: simuladores visuais SVG, código moderno vs. legado e laboratórios.";
  } else if (hash.startsWith("#/node/capitulo/")) {
    const id = hash.replace("#/node/capitulo/", "").trim();
    const ch = nodeChaptersData.find((c) => c.id === id);
    if (ch) {
      const tr = nodeI18n[ch.id]?.[lang] || patternI18n[ch.id]?.[lang];
      const name = tr?.name || ch.name;
      const intent = tr?.intent || ch.intent;
      pageTitle = `Cap. ${ch.number} ${name} • Node.js & Event Loop | DevBooks`;
      pageDesc = `Capítulo ${ch.number} de Node.js: ${name}. ${intent} Simulador visual passo a passo, código multi-linguagem, matriz de compatibilidade e frameworks.`;
    }
  } else if (hash.startsWith("#/node/versoes-e-frameworks")) {
    pageTitle = "Histórico de Versões do Node.js & Frameworks (Express, Fastify, NestJS) | DevBooks";
    pageDesc = "Matriz completa de versões do Node.js 0.10 ao 24, Express 1 a 5, Fastify, NestJS e Hono com novidades técnicas e retrocompatibilidade.";
  } else if (hash.startsWith("#/node/laboratorios")) {
    pageTitle = "Laboratórios & Simuladores • Node.js & Event Loop | DevBooks";
    pageDesc = "Playgrounds interativos de Node.js: Fases do Event Loop, Streams Backpressure, Worker Threads, CJS vs ESM, benchmark de frameworks e migração.";
  } else if (hash.startsWith("#/node/quizzes")) {
    pageTitle = "Quizzes & Exercícios Práticos • Node.js & Event Loop | DevBooks";
    pageDesc = "Teste seus conhecimentos em Node.js (0.10 ao 24, Express, Fastify e NestJS) com 24 quizzes comentados, cenários de concorrência e desafios práticos.";
  } else if (hash.startsWith("#/node")) {
    pageTitle = "Node.js: Guia Completo de Versões, Event Loop & Frameworks • 12 Capítulos | DevBooks";
    pageDesc = "Explore a evolução do Node.js do 0.10 ao 24, V8 + libuv, Express 5, Fastify e NestJS: simuladores visuais SVG, código moderno vs. legado e laboratórios.";
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

