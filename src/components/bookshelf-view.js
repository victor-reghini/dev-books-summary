import { patternsData } from "../../books/design-patterns/explanations/patterns-data.js";
import { cleanCodeChaptersData } from "../../books/clean-code/explanations/chapters-data.js";
import { grokkingChaptersData } from "../../books/grokking-algorithms/explanations/chapters-data.js";
import { javaChaptersData } from "../../books/java/explanations/chapters-data.js";
import { nodeChaptersData } from "../../books/node/explanations/chapters-data.js";
import { getStudiedPatterns } from "./sidebar.js";
import { t } from "../../books/design-patterns/explanations/i18n.js";
import { icons } from "./icons.js";

export function renderBookshelfPage(container) {
  const gofStudied = getStudiedPatterns("design-patterns").length;
  const gofTotal = patternsData.length;
  const gofPct = Math.round((gofStudied / gofTotal) * 100);

  const ccStudied = getStudiedPatterns("clean-code").length;
  const ccTotal = cleanCodeChaptersData.length;
  const ccPct = Math.round((ccStudied / ccTotal) * 100);

  const gaStudied = getStudiedPatterns("grokking-algorithms").length;
  const gaTotal = grokkingChaptersData.length;
  const gaPct = Math.round((gaStudied / gaTotal) * 100);

  const jvStudied = getStudiedPatterns("java").length;
  const jvTotal = javaChaptersData.length;
  const jvPct = Math.round((jvStudied / jvTotal) * 100);

  const ndStudied = getStudiedPatterns("node").length;
  const ndTotal = nodeChaptersData.length;
  const ndPct = Math.round((ndStudied / ndTotal) * 100);

  container.innerHTML = `
    <section class="pe-home-hero">
      <div class="pe-hero-top-row">
        <span class="pe-hero-kicker">${t("mainBookshelfTag")}</span>
        <div class="pe-hero-stats">
          <span class="pe-stat-chip">5 Livros Clássicos Completos</span>
          <span class="pe-stat-chip">53 Fluxogramas Estruturais (265 Etapas)</span>
          <span class="pe-stat-chip">35 Playgrounds & Gráficos</span>
          <span class="pe-stat-chip">Quizzes, Cenários & Mão na Massa</span>
        </div>
      </div>

      <h1 class="pe-hero-title">${t("mainBookshelfHeadline")}</h1>
      <p class="pe-hero-subtitle">
        ${t("mainBookshelfSub")}
      </p>
    </section>

    <div class="bookshelf-showcase-grid">
      <!-- LIVRO 1: PADRÕES DE PROJETO (GoF) -->
      <article class="bookshelf-item-card" data-book-target="#/design-patterns">
        <a href="#/design-patterns" class="book-cover-link" aria-label="Abrir livro Padrões de Projeto (Design Patterns GoF)">
          <div class="book-3d-frame book-gof-theme">
            <div class="book-spine"></div>
            <div class="book-cover-face">
              <div class="gof-cover-header">
                <span class="gof-publisher-tag">ADDISON-WESLEY • BOOKMAN</span>
                <span class="gof-authors-top">Erich Gamma • Richard Helm • Ralph Johnson • John Vlissides</span>
              </div>

              <div class="gof-cover-art">
                <svg viewBox="0 0 260 155" class="book-cover-svg" role="img" aria-label="Arte da capa de Padrões de Projeto GoF">
                  <defs>
                    <linearGradient id="gofArtBg" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stop-color="#1e293b"/>
                      <stop offset="100%" stop-color="#0f172a"/>
                    </linearGradient>
                  </defs>
                  <rect width="260" height="155" rx="4" fill="url(#gofArtBg)" stroke="#64748b" stroke-width="1"/>
                  <!-- Padrão Geométrico Arquitetural Clássico GoF -->
                  <g stroke="#82adc4" stroke-width="1.3" fill="none" opacity="0.85">
                    <polygon points="45,125 85,35 125,125"/>
                    <polygon points="95,125 135,35 175,125"/>
                    <polygon points="145,125 185,35 225,125"/>
                    <rect x="42" y="32" width="176" height="94" stroke="#94a3b8" stroke-dasharray="3 3"/>
                    <circle cx="85" cy="80" r="22" stroke="#82b99e"/>
                    <circle cx="135" cy="80" r="22" stroke="#84a6cc"/>
                    <circle cx="185" cy="80" r="22" stroke="#b7a8d6"/>
                    <line x1="85" y1="80" x2="135" y2="80" stroke="#e2e8f0" stroke-width="1.8"/>
                    <line x1="135" y1="80" x2="185" y2="80" stroke="#e2e8f0" stroke-width="1.8"/>
                  </g>
                  <text x="130" y="143" text-anchor="middle" fill="#cbd5e1" font-size="9.5" font-family="JetBrains Mono, monospace">23 GOF ARCHITECTURAL PATTERNS</text>
                </svg>
              </div>

              <div class="gof-cover-title-band">
                <span class="cover-main-title">Padrões de Projeto</span>
                <span class="cover-sub-title">Soluções Reutilizáveis de Software Orientado a Objetos</span>
                <span class="cover-orig-title">Design Patterns: Elements of Reusable OO Software</span>
              </div>

              <div class="gof-cover-footer">
                <span>Prefácio de Grady Booch</span>
                <span class="cover-year-pill">Edição Clássica • 1994</span>
              </div>
            </div>
          </div>
        </a>

        <div class="bookshelf-item-details">
          <div class="bookshelf-meta-top">
            <span class="badge badge-structural">CATÁLOGO GOF COMPLETO • 23 PADRÕES</span>
            <span class="badge badge-scope">PT · EN · ES · IT · FR</span>
          </div>

          <h2 class="bookshelf-book-title">
            <a href="#/design-patterns">Padrões de Projeto (Design Patterns • Gang of Four)</a>
          </h2>
          <p class="bookshelf-book-authors">
            <strong>Autores:</strong> Erich Gamma, Richard Helm, Ralph Johnson e John Vlissides
          </p>
          <p class="bookshelf-book-desc">
            A obra seminal de arquitetura orientada a objetos completa: todos os 23 padrões Criacionais (5), Estruturais (7) e Comportamentais (11) com simulador de execução e memória em tempo real, estudo de caso do editor Lexi, as 8 causas de remodelação, 9 playgrounds interativos e códigos em TypeScript, Java 21, Python 3 e C++.
          </p>

          <div class="bookshelf-feature-chips">
            <span class="pe-stat-chip">23 Padrões GoF</span>
            <span class="pe-stat-chip">23 Fluxogramas GoF (115 Etapas)</span>
            <span class="pe-stat-chip">9 Playgrounds</span>
            <span class="pe-stat-chip">Quizzes, Cenários & Mão na Massa</span>
          </div>

          <div class="bookshelf-progress-box">
            <div class="study-tracker-row">
              <span class="study-tracker-label">SEU PROGRESSO NESTE LIVRO</span>
              <strong>${gofStudied}/${gofTotal} padrões (${gofPct}%)</strong>
            </div>
            <div class="study-progress-bar-bg">
              <div class="study-progress-bar-fill" style="width: ${gofPct}%;"></div>
            </div>
          </div>

          <div class="bookshelf-cta-row">
            <a href="#/design-patterns" class="pe-cta-btn primary bookshelf-icon-btn" title="${t("openBookGof") || "Abrir Livro: Padrões de Projeto"}" aria-label="${t("openBookGof") || "Abrir Livro: Padrões de Projeto"}">
              ${icons.bookOpen}
            </a>
            <a href="#/laboratorios" class="pe-cta-btn secondary bookshelf-icon-btn" title="${t("labsGof") || "9 Labs GoF"}" aria-label="${t("labsGof") || "9 Labs GoF"}">
              ${icons.flask}
            </a>
            <a href="#/quizzes" class="pe-cta-btn secondary bookshelf-icon-btn" title="${t("exercisesGof") || "Exercícios GoF"}" aria-label="${t("exercisesGof") || "Exercícios GoF"}">
              ${icons.puzzle}
            </a>
            <a href="https://link.amazon/B056h6M84" target="_blank" rel="noopener noreferrer" class="pe-cta-btn secondary bookshelf-icon-btn amazon-buy-btn" title="${t("buyBookTooltip") || "Comprar livro na Amazon"}" aria-label="${t("buyBook") || "Comprar Livro (Amazon)"}">
              ${icons.cart}
            </a>
          </div>
        </div>
      </article>

      <!-- LIVRO 2: CÓDIGO LIMPO (CLEAN CODE) -->
      <article class="bookshelf-item-card" data-book-target="#/clean-code">
        <a href="#/clean-code" class="book-cover-link" aria-label="Abrir livro Código Limpo (Clean Code • Robert C. Martin)">
          <div class="book-3d-frame book-cleancode-theme">
            <div class="book-spine"></div>
            <div class="book-cover-face">
              <div class="cc-cover-header">
                <span class="cc-series-ribbon">ROBERT C. MARTIN SERIES • ALTA BOOKS</span>
                <span class="cc-authors-top">Robert C. Martin ("Uncle Bob")</span>
              </div>

              <div class="cc-cover-art">
                <svg viewBox="0 0 260 155" class="book-cover-svg" role="img" aria-label="Arte da capa de Código Limpo (Clean Code)">
                  <defs>
                    <radialGradient id="ccNebula" cx="50%" cy="45%" r="65%">
                      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.55"/>
                      <stop offset="45%" stop-color="#3b0764" stop-opacity="0.85"/>
                      <stop offset="100%" stop-color="#090d16" stop-opacity="1"/>
                    </radialGradient>
                  </defs>
                  <rect width="260" height="155" rx="4" fill="url(#ccNebula)" stroke="#475569" stroke-width="1"/>
                  <!-- Galáxia / Nebulosa Clássica da Capa de Clean Code + Estrutura Cristalina -->
                  <circle cx="130" cy="72" r="46" fill="none" stroke="rgba(130,185,158,0.45)" stroke-dasharray="4 3" stroke-width="1.4"/>
                  <circle cx="130" cy="72" r="26" fill="none" stroke="rgba(132,166,204,0.75)" stroke-width="1.6"/>
                  <circle cx="130" cy="72" r="7" fill="#f8fafc"/>
                  <circle cx="72" cy="42" r="2" fill="#e2e8f0"/>
                  <circle cx="195" cy="36" r="2.5" fill="#bae6fd"/>
                  <circle cx="64" cy="106" r="1.8" fill="#cbd5e1"/>
                  <circle cx="204" cy="102" r="2.2" fill="#82b99e"/>
                  <circle cx="105" cy="48" r="2" fill="#f8fafc"/>
                  <circle cx="162" cy="92" r="2" fill="#f8fafc"/>
                  <path d="M72,42 L105,48 L130,72 L162,92 L204,102" fill="none" stroke="#82b99e" stroke-width="1.3"/>
                  <text x="130" y="143" text-anchor="middle" fill="#e2e8f0" font-size="9.5" font-family="JetBrains Mono, monospace">17 CHAPTERS • 66 HEURISTICS (C1–T9)</text>
                </svg>
              </div>

              <div class="cc-cover-title-band">
                <span class="cover-main-title">Código Limpo</span>
                <span class="cover-sub-title">Habilidades Práticas do Agile Software</span>
                <span class="cover-orig-title">Clean Code: A Handbook of Agile Software Craftsmanship</span>
              </div>

              <div class="cc-cover-footer">
                <span>Prefácio de James O. Coplien</span>
                <span class="cover-year-pill">Edição Completa • 2008</span>
              </div>
            </div>
          </div>
        </a>

        <div class="bookshelf-item-details">
          <div class="bookshelf-meta-top">
            <span class="badge badge-creational">17 CAPÍTULOS + 66 HEURÍSTICAS (C1–T9)</span>
            <span class="badge badge-scope">ANTES vs. DEPOIS</span>
          </div>

          <h2 class="bookshelf-book-title">
            <a href="#/clean-code">Código Limpo (Clean Code • Robert C. Martin)</a>
          </h2>
          <p class="bookshelf-book-authors">
            <strong>Autor:</strong> Robert C. Martin (Uncle Bob) & Equipe Object Mentor
          </p>
          <p class="bookshelf-book-desc">
            O guia definitivo de artesanato de software construído nos mesmos moldes visuais e interativos: todos os 17 capítulos com animações passo a passo de execução e refatoração, gráfico interativo da Curva de Produtividade vs. Tempo (Wading vs. Escoteiro), código Sujo (Antes) vs. Limpo (Java, TypeScript e Python), estudos de caso (Args, JUnit e SerialDate), matriz das 66 heurísticas e desafios práticos.
          </p>

          <div class="bookshelf-feature-chips">
            <span class="pe-stat-chip">17 Capítulos</span>
            <span class="pe-stat-chip">66 Odores (C1–T9)</span>
            <span class="pe-stat-chip">11 Fluxogramas de Arquitetura (55 Etapas)</span>
            <span class="pe-stat-chip">6 Labs & Gráficos</span>
            <span class="pe-stat-chip">Quizzes & Refatoração</span>
          </div>

          <div class="bookshelf-progress-box">
            <div class="study-tracker-row">
              <span class="study-tracker-label">SEU PROGRESSO NESTE LIVRO</span>
              <strong>${ccStudied}/${ccTotal} capítulos (${ccPct}%)</strong>
            </div>
            <div class="study-progress-bar-bg">
              <div class="study-progress-bar-fill" style="width: ${ccPct}%;"></div>
            </div>
          </div>

          <div class="bookshelf-cta-row">
            <a href="#/clean-code" class="pe-cta-btn primary bookshelf-icon-btn" title="${t("openBookCC") || "Abrir Livro: Código Limpo"}" aria-label="${t("openBookCC") || "Abrir Livro: Código Limpo"}">
              ${icons.bookOpen}
            </a>
            <a href="#/clean-code/laboratorios" class="pe-cta-btn secondary bookshelf-icon-btn" title="${t("labsCC") || "6 Labs & Gráficos"}" aria-label="${t("labsCC") || "6 Labs & Gráficos"}">
              ${icons.flask}
            </a>
            <a href="#/clean-code/quizzes" class="pe-cta-btn secondary bookshelf-icon-btn" title="${t("exercisesCC") || "Exercícios Clean Code"}" aria-label="${t("exercisesCC") || "Exercícios Clean Code"}">
              ${icons.puzzle}
            </a>
            <a href="https://link.amazon/B0b1hcoN2" target="_blank" rel="noopener noreferrer" class="pe-cta-btn secondary bookshelf-icon-btn amazon-buy-btn" title="${t("buyBookTooltip") || "Comprar livro na Amazon"}" aria-label="${t("buyBook") || "Comprar Livro (Amazon)"}">
              ${icons.cart}
            </a>
          </div>
        </div>
      </article>

      <!-- LIVRO 3: ENTENDENDO ALGORITMOS (GROKKING ALGORITHMS) -->
      <article class="bookshelf-item-card" data-book-target="#/grokking-algorithms">
        <a href="#/grokking-algorithms" class="book-cover-link" aria-label="Abrir livro Entendendo Algoritmos (Grokking Algorithms)">
          <div class="book-3d-frame book-grokking-theme">
            <div class="book-spine"></div>
            <div class="book-cover-face">
              <div class="gof-cover-header">
                <span class="ga-publisher-tag">MANNING • NOVATEC</span>
                <span class="gof-authors-top">Aditya Y. Bhargava</span>
              </div>

              <div class="ga-cover-art">
                <svg viewBox="0 0 260 155" class="book-cover-svg" role="img" aria-label="Arte da capa de Entendendo Algoritmos">
                  <defs>
                    <linearGradient id="gaArtBg" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stop-color="#292524"/>
                      <stop offset="100%" stop-color="#0f172a"/>
                    </linearGradient>
                  </defs>
                  <rect width="260" height="155" rx="4" fill="url(#gaArtBg)" stroke="#d97706" stroke-width="1"/>
                  <!-- Ilustracao de Grafo & Pesquisa Binaria estilo Aditya Bhargava -->
                  <g stroke="#f59e0b" stroke-width="1.4" fill="none" opacity="0.9">
                    <circle cx="55" cy="50" r="14" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
                    <circle cx="130" cy="35" r="14" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
                    <circle cx="205" cy="50" r="14" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
                    <circle cx="90" cy="105" r="14" fill="#1e293b" stroke="#8b5cf6" stroke-width="2"/>
                    <circle cx="170" cy="105" r="14" fill="#1e293b" stroke="#ec4899" stroke-width="2"/>
                    <line x1="68" y1="46" x2="117" y2="38" stroke="#cbd5e1" stroke-width="1.8"/>
                    <line x1="143" y1="38" x2="192" y2="46" stroke="#cbd5e1" stroke-width="1.8"/>
                    <line x1="63" y1="62" x2="82" y2="93" stroke="#cbd5e1" stroke-width="1.8"/>
                    <line x1="197" y1="62" x2="178" y2="93" stroke="#cbd5e1" stroke-width="1.8"/>
                    <line x1="104" y1="105" x2="156" y2="105" stroke="#cbd5e1" stroke-width="1.8"/>
                    <text x="92" y="38" fill="#fcd34d" font-size="8" font-weight="bold" font-family="JetBrains Mono, monospace">6</text>
                    <text x="168" y="38" fill="#fcd34d" font-size="8" font-weight="bold" font-family="JetBrains Mono, monospace">2</text>
                    <text x="65" y="82" fill="#fcd34d" font-size="8" font-weight="bold" font-family="JetBrains Mono, monospace">1</text>
                    <text x="194" y="82" fill="#fcd34d" font-size="8" font-weight="bold" font-family="JetBrains Mono, monospace">5</text>
                    <text x="130" y="100" fill="#fcd34d" font-size="8" font-weight="bold" font-family="JetBrains Mono, monospace">3</text>
                  </g>
                  <text x="130" y="143" text-anchor="middle" fill="#fcd34d" font-size="9.5" font-family="JetBrains Mono, monospace">11 CHAPTERS • ILLUSTRATED ALGORITHMS</text>
                </svg>
              </div>

              <div class="ga-cover-title-band">
                <span class="cover-main-title">Entendendo Algoritmos</span>
                <span class="cover-sub-title">Um Guia Ilustrado para Programadores e Outros Curiosos</span>
                <span class="cover-orig-title">Grokking Algorithms: An Illustrated Guide</span>
              </div>

              <div class="gof-cover-footer">
                <span>Tradução e Edição Novatec</span>
                <span class="cover-year-pill">Edição Ilustrada • 2016</span>
              </div>
            </div>
          </div>
        </a>

        <div class="bookshelf-item-details">
          <div class="bookshelf-meta-top">
            <span class="badge badge-behavioral">11 CAPÍTULOS ILUSTRADOS • GUIA COMPLETO</span>
            <span class="badge badge-scope">PT · EN · ES · IT · FR</span>
          </div>

          <h2 class="bookshelf-book-title">
            <a href="#/grokking-algorithms">Entendendo Algoritmos (Grokking Algorithms • Aditya Bhargava)</a>
          </h2>
          <p class="bookshelf-book-authors">
            <strong>Autor:</strong> Aditya Y. Bhargava (Engenheiro de Software & Ilustrador)
          </p>
          <p class="bookshelf-book-desc">
            O guia visual e ilustrado definitivo de algoritmos e estruturas de dados: da pesquisa binaria O(log n) e ordenacao por selecao ao Quicksort D&C, tabelas hash com controle de fator de carga, grafos com BFS e Dijkstra, algoritmos gulosos de aproximacao, programacao dinamica (mochila 0/1 e LCS), aprendizado de maquina com KNN e estruturas probabilisticas (Filtros de Bloom e HyperLogLog).
          </p>

          <div class="bookshelf-feature-chips">
            <span class="pe-stat-chip">11 Capítulos</span>
            <span class="pe-stat-chip">Notação Big O</span>
            <span class="pe-stat-chip">10 Fluxogramas de Algoritmos (50 Etapas)</span>
            <span class="pe-stat-chip">8 Labs & Simuladores</span>
            <span class="pe-stat-chip">Exercícios Oficiais do Livro</span>
          </div>

          <div class="bookshelf-progress-box">
            <div class="study-tracker-row">
              <span class="study-tracker-label">SEU PROGRESSO NESTE LIVRO</span>
              <strong>${gaStudied}/${gaTotal} capítulos (${gaPct}%)</strong>
            </div>
            <div class="study-progress-bar-bg">
              <div class="study-progress-bar-fill" style="width: ${gaPct}%;"></div>
            </div>
          </div>

          <div class="bookshelf-cta-row">
            <a href="#/grokking-algorithms" class="pe-cta-btn primary bookshelf-icon-btn" title="Abrir Livro: Entendendo Algoritmos" aria-label="Abrir Livro: Entendendo Algoritmos">
              ${icons.bookOpen}
            </a>
            <a href="#/grokking-algorithms/laboratorios" class="pe-cta-btn secondary bookshelf-icon-btn" title="8 Labs & Simuladores" aria-label="8 Labs & Simuladores">
              ${icons.flask}
            </a>
            <a href="#/grokking-algorithms/quizzes" class="pe-cta-btn secondary bookshelf-icon-btn" title="Quizzes e Exercícios do Livro" aria-label="Quizzes e Exercícios do Livro">
              ${icons.puzzle}
            </a>
            <a href="https://link.amazon/B04UCSIMC" target="_blank" rel="noopener noreferrer" class="pe-cta-btn secondary bookshelf-icon-btn amazon-buy-btn" title="${t("buyBookTooltip") || "Comprar livro na Amazon"}" aria-label="${t("buyBook") || "Comprar Livro (Amazon)"}">
              ${icons.cart}
            </a>
          </div>
        </div>
      </article>

      <!-- LIVRO 4: JAVA: GUIA COMPLETO DE VERSÕES, JVM & ECOSSISTEMA -->
      <article class="bookshelf-item-card" data-book-target="#/java">
        <a href="#/java" class="book-cover-link" aria-label="Abrir livro Java: Guia Completo de Versões, JVM e Ecossistema">
          <div class="book-3d-frame book-java-theme">
            <div class="book-spine"></div>
            <div class="book-cover-face">
              <div class="gof-cover-header">
                <span class="ga-publisher-tag">ORACLE • ADDISON-WESLEY</span>
                <span class="gof-authors-top">James Gosling • Brian Goetz • Joshua Bloch</span>
              </div>

              <div class="ga-cover-art">
                <svg viewBox="0 0 260 155" class="book-cover-svg" role="img" aria-label="Arte da capa de Java: JVM e Ecossistema">
                  <defs>
                    <linearGradient id="jvArtBg" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stop-color="#3b1d11"/>
                      <stop offset="100%" stop-color="#0f172a"/>
                    </linearGradient>
                  </defs>
                  <rect width="260" height="155" rx="4" fill="url(#jvArtBg)" stroke="#ea580c" stroke-width="1"/>
                  <g stroke="#f97316" stroke-width="1.4" fill="none" opacity="0.9">
                    <path d="M70,110 C70,125 140,125 140,110 L140,65 L70,65 Z" fill="#1e293b" stroke="#f97316" stroke-width="2"/>
                    <path d="M140,75 C160,75 160,95 140,100" stroke="#f97316" stroke-width="2"/>
                    <path d="M85,55 C85,40 95,45 95,30" stroke="#38bdf8" stroke-width="2"/>
                    <path d="M105,55 C105,40 115,45 115,30" stroke="#38bdf8" stroke-width="2"/>
                    <path d="M125,55 C125,40 135,45 135,30" stroke="#38bdf8" stroke-width="2"/>
                    <circle cx="195" cy="50" r="14" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
                    <circle cx="195" cy="85" r="14" fill="#1e293b" stroke="#a855f7" stroke-width="2"/>
                    <circle cx="195" cy="120" r="14" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
                    <text x="195" y="54" fill="#38bdf8" font-size="8" font-weight="bold" text-anchor="middle" font-family="JetBrains Mono, monospace">JIT</text>
                    <text x="195" y="89" fill="#a855f7" font-size="8" font-weight="bold" text-anchor="middle" font-family="JetBrains Mono, monospace">LTS</text>
                    <text x="195" y="124" fill="#10b981" font-size="8" font-weight="bold" text-anchor="middle" font-family="JetBrains Mono, monospace">AOT</text>
                  </g>
                  <text x="130" y="145" text-anchor="middle" fill="#fdba74" font-size="9" font-family="JetBrains Mono, monospace">JDK 1.0 TO 25 LTS • SPRING & QUARKUS</text>
                </svg>
              </div>

              <div class="ga-cover-title-band">
                <span class="cover-main-title">Java: JVM & Ecossistema</span>
                <span class="cover-sub-title">JDK 1.0 ao 25 LTS, Spring Boot & Quarkus</span>
                <span class="cover-orig-title">Java: The Definitive Platform & Modern Frameworks</span>
              </div>

              <div class="gof-cover-footer">
                <span>OpenJDK & Enterprise Architecture</span>
                <span class="cover-year-pill">Edição Completa • 2025</span>
              </div>
            </div>
          </div>
        </a>

        <div class="bookshelf-item-details">
          <div class="bookshelf-meta-top">
            <span class="badge badge-creational">12 CAPÍTULOS • JDK 1.0 A 25 LTS + FRAMEWORKS</span>
            <span class="badge badge-scope">PT · EN · ES · IT · FR</span>
          </div>

          <h2 class="bookshelf-book-title">
            <a href="#/java">Java: Guia Completo de Versões, JVM & Ecossistema</a>
          </h2>
          <p class="bookshelf-book-authors">
            <strong>Autores:</strong> James Gosling, Brian Goetz, Joshua Bloch e Comunidade OpenJDK
          </p>
          <p class="bookshelf-book-desc">
            A evolução arquitetural completa da plataforma Java: do JDK 1.0 clássico ao Java 25 LTS, passando por Generics (J2SE 5.0), Lambdas e Streams (Java 8), Modularização JPMS (Java 9), Records e Sealed Classes (Java 17), Virtual Threads Projeto Loom (Java 21) e FFM Foreign Function & Memory (Java 22/25). Inclui histórico detalhado de versões e migrações do Spring Boot 1 a 3.4+, Quarkus 1 a 3.15 LTS, Jakarta EE 11 e Micronaut.
          </p>

          <div class="bookshelf-feature-chips">
            <span class="pe-stat-chip">12 Capítulos</span>
            <span class="pe-stat-chip">JDK 1.0 a 25 LTS</span>
            <span class="pe-stat-chip">5 Fluxogramas JVM & Pipelines (25 Etapas)</span>
            <span class="pe-stat-chip">6 Labs Interativos</span>
            <span class="pe-stat-chip">Spring Boot & Quarkus</span>
          </div>

          <div class="bookshelf-progress-box">
            <div class="study-tracker-row">
              <span class="study-tracker-label">SEU PROGRESSO NESTE LIVRO</span>
              <strong>${jvStudied}/${jvTotal} capítulos (${jvPct}%)</strong>
            </div>
            <div class="study-progress-bar-bg">
              <div class="study-progress-bar-fill" style="width: ${jvPct}%;"></div>
            </div>
          </div>

          <div class="bookshelf-cta-row">
            <a href="#/java" class="pe-cta-btn primary bookshelf-icon-btn" title="Abrir Livro: Java" aria-label="Abrir Livro: Java">
              ${icons.bookOpen}
            </a>
            <a href="#/java/laboratorios" class="pe-cta-btn secondary bookshelf-icon-btn" title="6 Labs & Simuladores JVM" aria-label="6 Labs & Simuladores JVM">
              ${icons.flask}
            </a>
            <a href="#/java/quizzes" class="pe-cta-btn secondary bookshelf-icon-btn" title="Quizzes e Exercícios de Java" aria-label="Quizzes e Exercícios de Java">
              ${icons.puzzle}
            </a>
            <a href="https://link.amazon/B0JAVA21LTS" target="_blank" rel="noopener noreferrer" class="pe-cta-btn secondary bookshelf-icon-btn amazon-buy-btn" title="${t("buyBookTooltip") || "Comprar livro na Amazon"}" aria-label="${t("buyBook") || "Comprar Livro (Amazon)"}">
              ${icons.cart}
            </a>
          </div>
        </div>
      </article>

      <!-- LIVRO 5: NODE.JS: GUIA COMPLETO DE VERSÕES, EVENT LOOP & FRAMEWORKS -->
      <article class="bookshelf-item-card" data-book-target="#/node">
        <a href="#/node" class="book-cover-link" aria-label="Abrir livro Node.js: Guia Completo de Versões, Event Loop e Frameworks">
          <div class="book-3d-frame book-node-theme">
            <div class="book-spine"></div>
            <div class="book-cover-face">
              <div class="gof-cover-header">
                <span class="ga-publisher-tag">OPENJS FOUNDATION • JOYENT</span>
                <span class="gof-authors-top">Ryan Dahl • Matteo Collina • Kamil Mysliwiec</span>
              </div>

              <div class="ga-cover-art">
                <svg viewBox="0 0 260 155" class="book-cover-svg" role="img" aria-label="Arte da capa de Node.js: Event Loop e Frameworks">
                  <defs>
                    <linearGradient id="ndArtBg" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stop-color="#14301d"/>
                      <stop offset="100%" stop-color="#0f172a"/>
                    </linearGradient>
                  </defs>
                  <rect width="260" height="155" rx="4" fill="url(#ndArtBg)" stroke="#22c55e" stroke-width="1"/>
                  <g stroke="#22c55e" stroke-width="1.4" fill="none" opacity="0.9">
                    <polygon points="85,35 125,58 125,102 85,125 45,102 45,58" fill="#1e293b" stroke="#22c55e" stroke-width="2"/>
                    <circle cx="85" cy="80" r="14" fill="#0f172a" stroke="#4ade80" stroke-width="1.8"/>
                    <text x="85" y="83" fill="#4ade80" font-size="7" font-weight="bold" text-anchor="middle" font-family="JetBrains Mono, monospace">LOOP</text>
                    <circle cx="170" cy="45" r="12" fill="#1e293b" stroke="#38bdf8" stroke-width="1.8"/>
                    <circle cx="215" cy="45" r="12" fill="#1e293b" stroke="#eab308" stroke-width="1.8"/>
                    <circle cx="170" cy="85" r="12" fill="#1e293b" stroke="#a855f7" stroke-width="1.8"/>
                    <circle cx="215" cy="85" r="12" fill="#1e293b" stroke="#ef4444" stroke-width="1.8"/>
                    <line x1="125" y1="80" x2="158" y2="80" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="2 2"/>
                    <text x="170" y="49" fill="#38bdf8" font-size="7" font-weight="bold" text-anchor="middle" font-family="JetBrains Mono, monospace">V8</text>
                    <text x="215" y="49" fill="#eab308" font-size="7" font-weight="bold" text-anchor="middle" font-family="JetBrains Mono, monospace">UV</text>
                    <text x="170" y="89" fill="#a855f7" font-size="7" font-weight="bold" text-anchor="middle" font-family="JetBrains Mono, monospace">ESM</text>
                    <text x="215" y="89" fill="#ef4444" font-size="7" font-weight="bold" text-anchor="middle" font-family="JetBrains Mono, monospace">HTTP</text>
                  </g>
                  <text x="130" y="145" text-anchor="middle" fill="#86efac" font-size="9" font-family="JetBrains Mono, monospace">NODE 0.10 TO 24 • EXPRESS, FASTIFY & NEST</text>
                </svg>
              </div>

              <div class="ga-cover-title-band">
                <span class="cover-main-title">Node.js: Event Loop & Frameworks</span>
                <span class="cover-sub-title">Node 0.10 a 24, Express 5, Fastify & NestJS</span>
                <span class="cover-orig-title">Node.js: Modern Runtime & HTTP Frameworks</span>
              </div>

              <div class="gof-cover-footer">
                <span>OpenJS Foundation & Server Runtime</span>
                <span class="cover-year-pill">Edição Completa • 2025</span>
              </div>
            </div>
          </div>
        </a>

        <div class="bookshelf-item-details">
          <div class="bookshelf-meta-top">
            <span class="badge badge-structural">12 CAPÍTULOS • NODE 0.10 A 24 + FRAMEWORKS</span>
            <span class="badge badge-scope">PT · EN · ES · IT · FR</span>
          </div>

          <h2 class="bookshelf-book-title">
            <a href="#/node">Node.js: Guia Completo de Versões, Event Loop & Frameworks</a>
          </h2>
          <p class="bookshelf-book-authors">
            <strong>Autores:</strong> Ryan Dahl, Matteo Collina, Kamil Mysliwiec e OpenJS TSC
          </p>
          <p class="bookshelf-book-desc">
            A evolução do runtime assíncrono líder mundial: da arquitetura original V8 + libuv no Node 0.10 ao Node 24, abrangendo Error-First Callbacks, Streams2/3 com backpressure, async/await nativo e N-API, Worker Threads, AsyncLocalStorage, Test Runner nativo, require(esm), TypeScript nativo e SQLite embutido. Com histórico completo de versões do Express.js 1 a 5, Fastify 1 a 5, NestJS 1 a 11 e Hono 4.
          </p>

          <div class="bookshelf-feature-chips">
            <span class="pe-stat-chip">12 Capítulos</span>
            <span class="pe-stat-chip">Node 0.10 a 24</span>
            <span class="pe-stat-chip">4 Fluxogramas Event Loop & Concorrência (20 Etapas)</span>
            <span class="pe-stat-chip">6 Labs Interativos</span>
            <span class="pe-stat-chip">Express, Fastify & NestJS</span>
          </div>

          <div class="bookshelf-progress-box">
            <div class="study-tracker-row">
              <span class="study-tracker-label">SEU PROGRESSO NESTE LIVRO</span>
              <strong>${ndStudied}/${ndTotal} capítulos (${ndPct}%)</strong>
            </div>
            <div class="study-progress-bar-bg">
              <div class="study-progress-bar-fill" style="width: ${ndPct}%;"></div>
            </div>
          </div>

          <div class="bookshelf-cta-row">
            <a href="#/node" class="pe-cta-btn primary bookshelf-icon-btn" title="Abrir Livro: Node.js" aria-label="Abrir Livro: Node.js">
              ${icons.bookOpen}
            </a>
            <a href="#/node/laboratorios" class="pe-cta-btn secondary bookshelf-icon-btn" title="6 Labs & Simuladores Node" aria-label="6 Labs & Simuladores Node">
              ${icons.flask}
            </a>
            <a href="#/node/quizzes" class="pe-cta-btn secondary bookshelf-icon-btn" title="Quizzes e Exercícios de Node.js" aria-label="Quizzes e Exercícios de Node.js">
              ${icons.puzzle}
            </a>
            <a href="https://link.amazon/B0NODE22LTS" target="_blank" rel="noopener noreferrer" class="pe-cta-btn secondary bookshelf-icon-btn amazon-buy-btn" title="${t("buyBookTooltip") || "Comprar livro na Amazon"}" aria-label="${t("buyBook") || "Comprar Livro (Amazon)"}">
              ${icons.cart}
            </a>
          </div>
        </div>
      </article>
    </div>
  `;
}
