import { patternsData } from "../../books/design-patterns/explanations/patterns-data.js";
import { cleanCodeChaptersData } from "../../books/clean-code/explanations/chapters-data.js";
import { getStudiedPatterns } from "./sidebar.js";

export function renderBookshelfPage(container) {
  const gofStudied = getStudiedPatterns("design-patterns").length;
  const gofTotal = patternsData.length;
  const gofPct = Math.round((gofStudied / gofTotal) * 100);

  const ccStudied = getStudiedPatterns("clean-code").length;
  const ccTotal = cleanCodeChaptersData.length;
  const ccPct = Math.round((ccStudied / ccTotal) * 100);

  container.innerHTML = `
    <section class="pe-home-hero">
      <div class="pe-hero-top-row">
        <span class="pe-hero-kicker">ESTANTE PRINCIPAL • ENGENHARIA & ARQUITETURA DE SOFTWARE INTERATIVA</span>
        <div class="pe-hero-stats">
          <span class="pe-stat-chip">2 Livros Clássicos Completos</span>
          <span class="pe-stat-chip">40 Módulos Animados (200 Etapas)</span>
          <span class="pe-stat-chip">15 Playgrounds & Gráficos</span>
          <span class="pe-stat-chip">Quizzes, Cenários & Mão na Massa</span>
        </div>
      </div>

      <h1 class="pe-hero-title">Estante Principal • Livros Interativos de Engenharia de Software</h1>
      <p class="pe-hero-subtitle">
        Selecione um livro na estante abaixo clicando sobre sua capa para acessar o guia interativo completo com simuladores passo a passo de topologia e execução, exemplos visuais e gráficos, código comparativo multi-linguagem, laboratórios práticos e exercícios.
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
            <span class="badge badge-scope">PT · EN · ES</span>
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
            <span class="pe-stat-chip">115 Etapas Animadas</span>
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
            <a href="#/design-patterns" class="pe-cta-btn primary">Abrir Livro: Padrões de Projeto →</a>
            <a href="#/laboratorios" class="pe-cta-btn secondary">9 Labs GoF</a>
            <a href="#/quizzes" class="pe-cta-btn secondary">Exercícios GoF</a>
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
            <span class="pe-stat-chip">85 Etapas Animadas</span>
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
            <a href="#/clean-code" class="pe-cta-btn primary">Abrir Livro: Código Limpo →</a>
            <a href="#/clean-code/laboratorios" class="pe-cta-btn secondary">6 Labs & Gráficos</a>
            <a href="#/clean-code/quizzes" class="pe-cta-btn secondary">Exercícios Clean Code</a>
          </div>
        </div>
      </article>
    </div>
  `;
}
