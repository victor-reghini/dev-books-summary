/**
 * Laboratórios Interativos, Gráficos e Simuladores Visuais para "Código Limpo" (Clean Code)
 * Segue o mesmo padrão visual e arquitetural de `labs.js` do livro Padrões de Projeto.
 */

import { highlightCode } from "../../../src/utils/code-highlighter.js";

export const cleanCodeLabs = {
  // 1. Wading Curve & Boy Scout Simulator (Cap. 1 & 5)
  "wading-curve-lab": {
    name: "Gráfico Interativo: Curva Produtividade vs. Tempo (Figura 1-1)",
    patternId: "cap-1",
    render(container) {
      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Simulador Gráfico • Capítulos 1 & 5</span>
            <h4>Curva de Produtividade vs. Tempo (Wading vs. Regra do Escoteiro)</h4>
            <p>Ajuste a pressão por atalhos ("Rápido e Sujo") e a disciplina da <strong>Regra do Escoteiro</strong> para visualizar no gráfico SVG o impacto acumulado sobre o throughput da equipe ao longo de 24 meses.</p>
          </div>

          <div class="cc-lab-controls-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin-bottom: 1.25rem;">
            <div class="cc-slider-box" style="background: var(--bg-surface); padding: 0.9rem 1rem; border-radius: 8px; border: 1px solid var(--border-subtle);">
              <label for="cc-shortcut-rate" style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:600; margin-bottom:0.4rem;">
                <span>Taxa de Atalhos / Dívida ("Fazer Rápido"):</span>
                <strong id="cc-shortcut-val" style="color:var(--accent-warning);">65%</strong>
              </label>
              <input type="range" id="cc-shortcut-rate" min="15" max="95" value="65" style="width:100%;" />
            </div>

            <div class="cc-slider-box" style="background: var(--bg-surface); padding: 0.9rem 1rem; border-radius: 8px; border: 1px solid var(--border-subtle);">
              <label for="cc-scout-rate" style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:600; margin-bottom:0.4rem;">
                <span>Disciplina da Regra do Escoteiro (5S):</span>
                <strong id="cc-scout-val" style="color:var(--cat-creational);">85%</strong>
              </label>
              <input type="range" id="cc-scout-rate" min="20" max="100" value="85" style="width:100%;" />
            </div>
          </div>

          <div class="cc-chart-wrapper" style="background: var(--bg-primary); border: 1px solid var(--border-subtle); border-radius: 10px; padding: 1rem; margin-bottom: 1rem;">
            <svg id="cc-productivity-svg" viewBox="0 0 760 270" style="width:100%; height:auto; display:block;" role="img" aria-label="Gráfico de Produtividade versus Tempo"></svg>
          </div>

          <div id="cc-wading-metrics" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.75rem;"></div>
        </div>
      `;

      const shortcutInput = container.querySelector("#cc-shortcut-rate");
      const scoutInput = container.querySelector("#cc-scout-rate");
      const shortcutVal = container.querySelector("#cc-shortcut-val");
      const scoutVal = container.querySelector("#cc-scout-val");
      const svgEl = container.querySelector("#cc-productivity-svg");
      const metricsEl = container.querySelector("#cc-wading-metrics");

      function updateChart() {
        const debtRate = parseInt(shortcutInput.value, 10) / 100;
        const scoutRate = parseInt(scoutInput.value, 10) / 100;
        shortcutVal.textContent = `${Math.round(debtRate * 100)}%`;
        scoutVal.textContent = `${Math.round(scoutRate * 100)}%`;

        const months = [0, 3, 6, 9, 12, 15, 18, 21, 24];
        const padLeft = 58;
        const padRight = 30;
        const padTop = 26;
        const padBottom = 38;
        const chartW = 760 - padLeft - padRight;
        const chartH = 270 - padTop - padBottom;

        const dirtyPts = [];
        const cleanPts = [];

        months.forEach((m, idx) => {
          const x = padLeft + (idx / (months.length - 1)) * chartW;
          const dirtyPct = Math.max(4, Math.round(100 * Math.exp(-debtRate * (m / 6.2))));
          const cleanPct = Math.min(98, Math.max(62, Math.round(86 + scoutRate * 10 - (1 - scoutRate) * m * 0.9)));

          const yDirty = padTop + chartH - (dirtyPct / 100) * chartH;
          const yClean = padTop + chartH - (cleanPct / 100) * chartH;

          dirtyPts.push({ m, x, y: yDirty, pct: dirtyPct });
          cleanPts.push({ m, x, y: yClean, pct: cleanPct });
        });

        const dirtyPath = dirtyPts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
        const cleanPath = cleanPts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

        const gridLines = [0, 25, 50, 75, 100]
          .map((pct) => {
            const y = padTop + chartH - (pct / 100) * chartH;
            return `
              <line x1="${padLeft}" y1="${y}" x2="${760 - padRight}" y2="${y}" stroke="rgba(148,163,184,0.16)" stroke-dasharray="4 4"/>
              <text x="${padLeft - 10}" y="${y + 4}" text-anchor="end" fill="#94a3b8" font-size="11" font-family="JetBrains Mono, monospace">${pct}%</text>
            `;
          })
          .join("");

        const xLabels = dirtyPts
          .map(
            (p) => `
            <text x="${p.x}" y="${270 - 10}" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="JetBrains Mono, monospace">Mês ${p.m}</text>
          `
          )
          .join("");

        const dirtyDots = dirtyPts
          .map(
            (p) => `<circle cx="${p.x}" cy="${p.y}" r="4.5" fill="#d2948f" stroke="#121214" stroke-width="1.5"><title>Mês ${p.m}: ${p.pct}% (Código Sujo)</title></circle>`
          )
          .join("");

        const cleanDots = cleanPts
          .map(
            (p) => `<circle cx="${p.x}" cy="${p.y}" r="4.5" fill="#82b99e" stroke="#121214" stroke-width="1.5"><title>Mês ${p.m}: ${p.pct}% (Código Limpo)</title></circle>`
          )
          .join("");

        svgEl.innerHTML = `
          ${gridLines}
          ${xLabels}
          <path d="${dirtyPath}" fill="none" stroke="#d2948f" stroke-width="3" stroke-linecap="round"/>
          <path d="${cleanPath}" fill="none" stroke="#82b99e" stroke-width="3" stroke-linecap="round"/>
          ${dirtyDots}
          ${cleanDots}
          <g transform="translate(${padLeft + 14}, ${padTop + 8})">
            <rect x="0" y="0" width="320" height="46" rx="6" fill="rgba(18,18,20,0.88)" stroke="rgba(148,163,184,0.2)"/>
            <circle cx="16" cy="15" r="5" fill="#82b99e"/>
            <text x="28" y="19" fill="#e2e8f0" font-size="11.5" font-weight="600">Código Limpo + Regra do Escoteiro (${cleanPts[8].pct}% no Mês 24)</text>
            <circle cx="16" cy="33" r="5" fill="#d2948f"/>
            <text x="28" y="37" fill="#e2e8f0" font-size="11.5" font-weight="600">Código Sujo / Wading (${dirtyPts[8].pct}% no Mês 24 • Paralisia)</text>
          </g>
        `;

        const m12Dirty = dirtyPts[4].pct;
        const m24Dirty = dirtyPts[8].pct;
        const m24Clean = cleanPts[8].pct;

        metricsEl.innerHTML = `
          <div class="stat-pill-box" style="background:var(--bg-surface); padding:0.75rem; border-radius:8px; border:1px solid var(--border-subtle);">
            <div style="font-size:0.75rem; color:var(--text-muted);">Velocidade no Mês 12 (Sujo)</div>
            <div style="font-size:1.15rem; font-weight:700; color:#d2948f;">${m12Dirty}% de Throughput</div>
          </div>
          <div class="stat-pill-box" style="background:var(--bg-surface); padding:0.75rem; border-radius:8px; border:1px solid var(--border-subtle);">
            <div style="font-size:0.75rem; color:var(--text-muted);">Velocidade no Mês 24 (Limpo)</div>
            <div style="font-size:1.15rem; font-weight:700; color:#82b99e;">${m24Clean}% Sustentável</div>
          </div>
          <div class="stat-pill-box" style="background:var(--bg-surface); padding:0.75rem; border-radius:8px; border:1px solid var(--border-subtle);">
            <div style="font-size:0.75rem; color:var(--text-muted);">Diagnóstico Arquitetural</div>
            <div style="font-size:0.9rem; font-weight:600; color:var(--text-primary);">
              ${m24Dirty <= 12 ? "Colapso Assintótico (Risco de Grande Redesign!)" : "Degradação Moderada por Wading"}
            </div>
          </div>
        `;
      }

      shortcutInput.addEventListener("input", updateChart);
      scoutInput.addEventListener("input", updateChart);
      updateChart();
    }
  },

  // 2. Naming, Stepdown & Flag Argument Refactoring Lab (Cap. 2, 3 & 4)
  "naming-stepdown-lab": {
    name: "Laboratório Visual: Nomes, Regra Decrescente (Stepdown) e Extração de Funções",
    patternId: "cap-3",
    render(container) {
      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Refatorador Interativo • Capítulos 2, 3 & 4</span>
            <h4>Transformador de Intenção, Stepdown Rule e Eliminação de Flags [N1, F3, G28, G34]</h4>
            <p>Ative cada etapa de refatoração para ver a árvore visual de abstração e o código evoluírem em tempo real.</p>
          </div>

          <div class="decorator-options" style="display:flex; flex-wrap:wrap; gap:0.75rem; margin-bottom:1rem;">
            <label class="checkbox-card" style="cursor:pointer;">
              <input type="checkbox" class="cc-ref-step" value="names" checked />
              <span class="cb-label">1. Revelar Intenção nos Nomes [N1]</span>
              <span class="cb-price">getFlaggedCells</span>
            </label>
            <label class="checkbox-card" style="cursor:pointer;">
              <input type="checkbox" class="cc-ref-step" value="predicate" checked />
              <span class="cb-label">2. Encapsular Condicional & Apagar Comentário [G28, C3]</span>
              <span class="cb-price">cell.isFlagged()</span>
            </label>
            <label class="checkbox-card" style="cursor:pointer;">
              <input type="checkbox" class="cc-ref-step" value="noflag" />
              <input type="checkbox" class="cc-ref-step" value="stepdown" checked />
              <span class="cb-label">3. Eliminar Flag Booleana & Aplicar Stepdown Rule [F3, G34]</span>
              <span class="cb-price">1 Nível/Função</span>
            </label>
          </div>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:1rem; align-items:start;">
            <div style="background:var(--bg-primary); border:1px solid var(--border-subtle); border-radius:8px; padding:0.9rem;">
              <h6 style="margin:0 0 0.6rem 0; font-size:0.82rem; text-transform:uppercase; color:var(--text-muted);">Árvore de Níveis de Abstração (Stepdown Rule)</h6>
              <div id="cc-stepdown-tree"></div>
            </div>
            <div style="background:var(--bg-primary); border:1px solid var(--border-subtle); border-radius:8px; padding:0.9rem;">
              <h6 style="margin:0 0 0.6rem 0; font-size:0.82rem; text-transform:uppercase; color:var(--text-muted);">Código Resultante</h6>
              <pre style="margin:0; font-size:0.8rem; overflow-x:auto;"><code id="cc-ref-code-preview"></code></pre>
            </div>
          </div>
        </div>
      `;

      const checkboxes = container.querySelectorAll(".cc-ref-step");
      const treeEl = container.querySelector("#cc-stepdown-tree");
      const codeEl = container.querySelector("#cc-ref-code-preview");

      function updateView() {
        const active = new Set(
          Array.from(checkboxes)
            .filter((c) => c.checked)
            .map((c) => c.value)
        );

        const hasNames = active.has("names");
        const hasPredicate = active.has("predicate");
        const hasStepdown = active.has("stepdown");

        const fnName = hasNames ? "getFlaggedCells" : "getThem";
        const listName = hasNames ? "gameBoard" : "theList";
        const itemType = hasPredicate ? "Cell" : "int[]";
        const itemVar = hasNames ? "cell" : "x";
        const cond = hasPredicate
          ? `${itemVar}.isFlagged()`
          : `${itemVar}[0] == 4 // 4 = flagged`;

        let code = `public List<${itemType}> ${fnName}() {\n  List<${itemType}> result = new ArrayList<>();\n  for (${itemType} ${itemVar} : ${listName}) {\n    if (${cond}) {\n      result.add(${itemVar});\n    }\n  }\n  return result;\n}`;

        if (hasStepdown) {
          code += `\n\n// Sem Flag Argument [F3] + Stepdown Rule [G34]:\npublic String renderPageForSuite(PageData pageData) {\n  return includeSuiteSetupAndTeardown(pageData);\n}`;
        } else {
          code += `\n\n// Viola [F3] Flag Argument:\npublic String render(PageData d, boolean isSuite) {\n  if (isSuite) { /* mistura níveis */ }\n}`;
        }

        codeEl.innerHTML = highlightCode(code, "java");

        treeEl.innerHTML = `
          <div style="display:flex; flex-direction:column; gap:0.55rem; font-size:0.84rem;">
            <div style="padding:0.6rem 0.8rem; border-radius:6px; background:rgba(130,185,158,0.12); border-left:3px solid #82b99e;">
              <strong>Nível 1 (Alto • Intenção Pública):</strong> <code>${fnName}()</code> & <code>${hasStepdown ? "renderPageForSuite()" : "render(d, isSuite)"}</code>
            </div>
            <div style="padding:0.6rem 0.8rem; border-radius:6px; background:rgba(130,173,196,0.12); border-left:3px solid #82adc4; margin-left:1.2rem;">
              <strong>Nível 2 (Intermediário • Domínio):</strong> <code>${hasPredicate ? "cell.isFlagged()" : "x[0] == 4 (Baixo nível vazando!)"}</code>
            </div>
            <div style="padding:0.6rem 0.8rem; border-radius:6px; background:rgba(183,168,214,0.12); border-left:3px solid #b7a8d6; margin-left:2.4rem;">
              <strong>Nível 3 (Baixo • Detalhe Encapsulado):</strong> <code>status == FLAGGED_CONSTANT</code>
            </div>
          </div>
        `;
      }

      checkboxes.forEach((cb) => cb.addEventListener("change", updateView));
      updateView();
    }
  },

  // 3. Law of Demeter, Special Case & Boundary Lab (Cap. 6, 7 & 8)
  "demeter-boundary-lab": {
    name: "Simulador Visual: Lei de Demeter, Special Case e Fronteiras",
    patternId: "cap-6",
    render(container) {
      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Simulador Arquitetural • Capítulos 6, 7 & 8</span>
            <h4>Eliminando Train Wrecks [G36], Retornos Null e Vazamento de Fronteiras [G8]</h4>
            <p>Alterne entre a arquitetura acoplada (Acidente de Trem + Exceções de Fluxo + Map exposto) e a arquitetura Limpa.</p>
          </div>

          <div class="factory-os-tabs" style="margin-bottom:1rem;">
            <button class="os-tab active" data-mode="clean">Arquitetura Limpa (Tell-Don't-Ask + Special Case + Wrapper)</button>
            <button class="os-tab" data-mode="dirty">Arquitetura Acoplada (Train Wreck + Null + Map Cru)</button>
          </div>

          <div id="cc-demeter-stage"></div>
        </div>
      `;

      const tabs = container.querySelectorAll(".os-tab");
      const stage = container.querySelector("#cc-demeter-stage");

      function renderMode(mode) {
        if (mode === "clean") {
          stage.innerHTML = `
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:0.85rem; margin-bottom:1rem;">
              <div style="background:var(--bg-surface); padding:0.9rem; border-radius:8px; border-left:3px solid #82b99e;">
                <strong style="color:#82b99e;">Cap. 6 • Lei de Demeter [G36]</strong>
                <p style="font-size:0.83rem; margin:0.4rem 0 0;"><code>ctxt.createScratchFileStream(name)</code> • Acoplado a apenas <strong>1 colaborador imediato</strong>.</p>
              </div>
              <div style="background:var(--bg-surface); padding:0.9rem; border-radius:8px; border-left:3px solid #82adc4;">
                <strong style="color:#82adc4;">Cap. 7 • Special Case Pattern</strong>
                <p style="font-size:0.83rem; margin:0.4rem 0 0;"><code>PerDiemMealExpenses</code> • <strong>0 blocos try/catch</strong> e <strong>0 retornos null</strong> no fluxo de negócio.</p>
              </div>
              <div style="background:var(--bg-surface); padding:0.9rem; border-radius:8px; border-left:3px solid #b7a8d6;">
                <strong style="color:#b7a8d6;">Cap. 8 • Fronteira Encapsulada</strong>
                <p style="font-size:0.83rem; margin:0.4rem 0 0;"><code>Sensors.getById(id)</code> • <code>java.util.Map</code> oculto; métodos perigosos como <code>clear()</code> bloqueados.</p>
              </div>
            </div>
          `;
        } else {
          stage.innerHTML = `
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:0.85rem; margin-bottom:1rem;">
              <div style="background:var(--bg-surface); padding:0.9rem; border-radius:8px; border-left:3px solid #d2948f;">
                <strong style="color:#d2948f;">Violação G36 (Train Wreck)</strong>
                <p style="font-size:0.83rem; margin:0.4rem 0 0;"><code>ctxt.getOptions().getScratchDir().getAbsolutePath()</code> • Acoplado a <strong>4 classes internas</strong>.</p>
              </div>
              <div style="background:var(--bg-surface); padding:0.9rem; border-radius:8px; border-left:3px solid #d2948f;">
                <strong style="color:#d2948f;">Fluxo Poluído por Catch/Null</strong>
                <p style="font-size:0.83rem; margin:0.4rem 0 0;"><code>catch (MealExpensesNotFound e)</code> • Usa exceção como condicional de regra de negócio.</p>
              </div>
              <div style="background:var(--bg-surface); padding:0.9rem; border-radius:8px; border-left:3px solid #d2948f;">
                <strong style="color:#d2948f;">Fronteira Vazada [G8]</strong>
                <p style="font-size:0.83rem; margin:0.4rem 0 0;"><code>(Sensor) map.get(id)</code> • Casts repetidos em 30 classes e risco de <code>map.clear()</code>.</p>
              </div>
            </div>
          `;
        }
      }

      tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          tabs.forEach((t) => t.classList.remove("active"));
          tab.classList.add("active");
          renderMode(tab.getAttribute("data-mode"));
        });
      });

      renderMode("clean");
    }
  },

  // 4. TDD 3 Laws & F.I.R.S.T. Radar Lab (Cap. 9 & 12)
  "tdd-first-lab": {
    name: "Laboratório Gráfico: Ciclo TDD & Diagnóstico F.I.R.S.T.",
    patternId: "cap-9",
    render(container) {
      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Diagnóstico Gráfico • Capítulos 9 & 12</span>
            <h4>As 3 Leis do TDD, Padrão BUILD-OPERATE-CHECK e Métricas F.I.R.S.T. [T1–T9]</h4>
            <p>Simule a saúde da suíte de testes ativando ou desativando cada propriedade <strong>F.I.R.S.T.</strong> e veja o gráfico de barras de confiabilidade.</p>
          </div>

          <div class="decorator-options" style="display:flex; flex-wrap:wrap; gap:0.65rem; margin-bottom:1rem;">
            <label class="checkbox-card" style="cursor:pointer;"><input type="checkbox" class="first-prop" value="F" checked /><span class="cb-label">Fast (Rápidos [T9])</span></label>
            <label class="checkbox-card" style="cursor:pointer;"><input type="checkbox" class="first-prop" value="I" checked /><span class="cb-label">Independent (Isolados)</span></label>
            <label class="checkbox-card" style="cursor:pointer;"><input type="checkbox" class="first-prop" value="R" checked /><span class="cb-label">Repeatable (Repetíveis)</span></label>
            <label class="checkbox-card" style="cursor:pointer;"><input type="checkbox" class="first-prop" value="S" checked /><span class="cb-label">Self-Validating (Booleanos)</span></label>
            <label class="checkbox-card" style="cursor:pointer;"><input type="checkbox" class="first-prop" value="T" checked /><span class="cb-label">Timely (Escritos Antes)</span></label>
          </div>

          <div id="cc-first-bars" style="background:var(--bg-primary); padding:1rem; border-radius:8px; border:1px solid var(--border-subtle);"></div>
        </div>
      `;

      const cbs = container.querySelectorAll(".first-prop");
      const barsEl = container.querySelector("#cc-first-bars");

      const labels = {
        F: { name: "Fast (Velocidade da Suíte)", good: "420ms (Execução contínua)", bad: "14 min (Devs param de rodar [T9])" },
        I: { name: "Independent (Desacoplamento)", good: "Ordem livre (100% isolados)", bad: "Falha em cascata se mudar a ordem" },
        R: { name: "Repeatable (Determinismo)", good: "Roda offline / CI / avião", bad: "Flaky: depende de banco/rede externa" },
        S: { name: "Self-Validating (Automação)", good: "Verde/Vermelho automático", bad: "Exige inspeção manual de logs TXT" },
        T: { name: "Timely (Design Testável)", good: "Escrito 30s antes (1ª Lei TDD)", bad: "Pós-produção: código difícil de testar" }
      };

      function refresh() {
        const active = new Set(Array.from(cbs).filter((c) => c.checked).map((c) => c.value));
        const score = Math.round((active.size / 5) * 100);

        barsEl.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem;">
            <strong>Índice de Saúde da Suíte F.I.R.S.T.:</strong>
            <span style="font-size:1.1rem; font-weight:700; color:${score >= 80 ? "#82b99e" : "#d2948f"};">${score}% (${active.size}/5 propriedades)</span>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.55rem;">
            ${Object.entries(labels)
              .map(([k, info]) => {
                const ok = active.has(k);
                return `
                  <div style="display:flex; justify-content:space-between; align-items:center; padding:0.5rem 0.75rem; background:var(--bg-surface); border-radius:6px; border-left:3px solid ${ok ? "#82b99e" : "#d2948f"};">
                    <span style="font-weight:600; font-size:0.84rem;">[${k}] ${info.name}</span>
                    <span style="font-size:0.8rem; color:${ok ? "#82b99e" : "#d2948f"};">${ok ? info.good : info.bad}</span>
                  </div>
                `;
              })
              .join("")}
          </div>
        `;
      }

      cbs.forEach((cb) => cb.addEventListener("change", refresh));
      refresh();
    }
  },

  // 5. Concurrency ++lastIdUsed vs AtomicInteger CAS Lab (Cap. 10, 11 & 13)
  "concurrency-cas-lab": {
    name: "Simulador de Concorrência: Race Condition (++lastIdUsed) vs. AtomicInteger (CAS)",
    patternId: "cap-13",
    render(container) {
      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Simulador Multithread • Capítulos 10, 11 & 13</span>
            <h4>Intercalação de Bytecode em <code>++lastIdUsed</code> (12.870 Caminhos) vs. <code>AtomicInteger</code></h4>
            <p>Dispare duas threads simultâneas partindo de <code>lastIdUsed = 42</code> e compare a colisão de estado com a operação atômica Compare-And-Swap (CAS).</p>
          </div>

          <div style="display:flex; gap:0.75rem; flex-wrap:wrap; margin-bottom:1rem;">
            <button id="btn-sim-race" class="btn btn-secondary">Simular ++lastIdUsed (Sem Sincronização)</button>
            <button id="btn-sim-cas" class="btn btn-primary">Simular AtomicInteger.incrementAndGet() (CAS)</button>
          </div>

          <div id="cc-concurrency-output" style="background:var(--bg-primary); border:1px solid var(--border-subtle); border-radius:8px; padding:1rem;"></div>
        </div>
      `;

      const outEl = container.querySelector("#cc-concurrency-output");

      function renderSim(mode) {
        if (mode === "race") {
          outEl.innerHTML = `
            <div style="color:#d2948f; font-weight:700; margin-bottom:0.6rem;">COLISÃO DETECTADA (Race Condition em ++lastIdUsed):</div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:0.75rem; font-size:0.83rem; font-family:var(--font-mono);">
              <div style="background:var(--bg-surface); padding:0.75rem; border-radius:6px;">
                <strong>Thread-1 (Bytecode JVM):</strong><br/>
                1. GETFIELD lastIdUsed &rarr; 42<br/>
                2. ICONST_1 + IADD &rarr; 43<br/>
                3. PUTFIELD lastIdUsed = 43
              </div>
              <div style="background:var(--bg-surface); padding:0.75rem; border-radius:6px;">
                <strong>Thread-2 (Intercalada!):</strong><br/>
                1. GETFIELD lastIdUsed &rarr; 42 (leu antes do PUT!)<br/>
                2. ICONST_1 + IADD &rarr; 43<br/>
                3. PUTFIELD lastIdUsed = 43 (sobrescreveu!)
              </div>
            </div>
            <p style="margin:0.75rem 0 0; font-size:0.85rem;">Resultado: Ambas as threads receberam o <strong>mesmo ID 43</strong>! (1 doscaminhos defeituosos dentre os 12.870 possíveis para <code>int</code>).</p>
          `;
        } else {
          outEl.innerHTML = `
            <div style="color:#82b99e; font-weight:700; margin-bottom:0.6rem;">EXECUÇÃO THREAD-SAFE (AtomicInteger Compare-And-Swap):</div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:0.75rem; font-size:0.83rem; font-family:var(--font-mono);">
              <div style="background:var(--bg-surface); padding:0.75rem; border-radius:6px;">
                <strong>Thread-1 (CAS Nativo):</strong><br/>
                1. Lê valor atual = 42<br/>
                2. CAS(esperado=42, novo=43) &rarr; SUCESSO!<br/>
                3. Retorna <strong>ID 43</strong>
              </div>
              <div style="background:var(--bg-surface); padding:0.75rem; border-radius:6px;">
                <strong>Thread-2 (CAS Retry):</strong><br/>
                1. Tentativa CAS(42 &rarr; 43) falha (valor já é 43)<br/>
                2. Reexecuta CAS(43 &rarr; 44) &rarr; SUCESSO!<br/>
                3. Retorna <strong>ID 44</strong>
              </div>
            </div>
            <p style="margin:0.75rem 0 0; font-size:0.85rem;">Resultado: Thread-1 recebe <strong>43</strong> e Thread-2 recebe <strong>44</strong> sem bloqueio pesado de mutex e com zero corrupção de estado.</p>
          `;
        }
      }

      container.querySelector("#btn-sim-race").addEventListener("click", () => renderSim("race"));
      container.querySelector("#btn-sim-cas").addEventListener("click", () => renderSim("cas"));
      renderSim("cas");
    }
  },

  // 6. Args Successive Refinement Parser Lab (Cap. 14, 15, 16 & 17)
  "args-marshaler-lab": {
    name: "Simulador Interativo: Parser Polimórfico Args (ArgumentMarshaler)",
    patternId: "cap-14",
    render(container) {
      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Campo de Prática • Capítulos 14, 15, 16 & 17</span>
            <h4>Parser de Linha de Comando <code>Args</code> com <code>Map&lt;Character, ArgumentMarshaler&gt;</code></h4>
            <p>Edite a linha de comando abaixo e execute o parser refatorado do Capítulo 14 para inspecionar o despacho polimórfico de cada <code>ArgumentMarshaler</code>.</p>
          </div>

          <div class="chain-input-box" style="margin-bottom:1rem;">
            <label for="cc-args-input">Argumentos de Entrada (Schema fixo: <code>l,p#,d*</code>):</label>
            <div class="input-with-button">
              <input type="text" id="cc-args-input" value="-l -p 8080 -d /var/logs/clean" class="form-input" />
              <button id="btn-parse-args" class="btn btn-primary">Executar ArgumentMarshaler</button>
            </div>
          </div>

          <div id="cc-args-result" style="background:var(--bg-primary); border:1px solid var(--border-subtle); border-radius:8px; padding:1rem;"></div>
        </div>
      `;

      const inputEl = container.querySelector("#cc-args-input");
      const btnEl = container.querySelector("#btn-parse-args");
      const resEl = container.querySelector("#cc-args-result");

      function runParser() {
        const tokens = inputEl.value.trim().split(/\s+/).filter(Boolean);
        let lVal = false;
        let pVal = 0;
        let dVal = "";
        let error = null;

        for (let i = 0; i < tokens.length; i++) {
          const t = tokens[i];
          if (t === "-l") {
            lVal = true;
          } else if (t === "-p") {
            const next = tokens[++i];
            const parsed = Number(next);
            if (!next || Number.isNaN(parsed)) {
              error = `ArgsException: INVALID_INTEGER para '-p' (recebido: '${next || "vazio"}')`;
              break;
            }
            pVal = parsed;
          } else if (t === "-d") {
            const next = tokens[++i];
            if (!next) {
              error = "ArgsException: MISSING_STRING para '-d'";
              break;
            }
            dVal = next;
          } else {
            error = `ArgsException: UNEXPECTED_ARGUMENT '${t}'`;
            break;
          }
        }

        if (error) {
          resEl.innerHTML = `<div style="color:#d2948f; font-weight:700;">${error}</div>`;
          return;
        }

        resEl.innerHTML = `
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:0.75rem; font-size:0.84rem;">
            <div style="background:var(--bg-surface); padding:0.75rem; border-radius:6px; border-left:3px solid #82b99e;">
              <strong>'l' &rarr; BooleanArgumentMarshaler</strong><br/>
              <code>getBoolean('l') === ${lVal}</code>
            </div>
            <div style="background:var(--bg-surface); padding:0.75rem; border-radius:6px; border-left:3px solid #82adc4;">
              <strong>'p#' &rarr; IntegerArgumentMarshaler</strong><br/>
              <code>getInt('p') === ${pVal}</code>
            </div>
            <div style="background:var(--bg-surface); padding:0.75rem; border-radius:6px; border-left:3px solid #b7a8d6;">
              <strong>'d*' &rarr; StringArgumentMarshaler</strong><br/>
              <code>getString('d') === "${dVal}"</code>
            </div>
          </div>
        `;
      }

      btnEl.addEventListener("click", runParser);
      inputEl.addEventListener("input", runParser);
      runParser();
    }
  }
};
