/**
 * Laboratórios Interativos e Simuladores Visuais para "Node.js: Guia Completo de Versões, Event Loop & Frameworks".
 * Inclui 6 simuladores práticos manipuláveis no DOM.
 */

export const nodeLabs = {
  // 1. Simulador Interativo da Ordem de Execução do Event Loop (Cap. 1)
  "nd-event-loop-lab": {
    name: "Simulador do Event Loop: Call Stack, nextTick, Promises, Timers, Poll & Check (Cap. 1)",
    patternId: "nd-cap-1",
    render(container) {
      const scenarios = {
        basic: {
          label: "Cenário 1: Topo do Script (nextTick vs Promise vs Timer vs Immediate)",
          code: `console.log("1. Síncrono (Call Stack)");
setTimeout(() => console.log("5. Fase Timers (setTimeout 0)"), 0);
setImmediate(() => console.log("6. Fase Check (setImmediate)"));
Promise.resolve().then(() => console.log("4. Microtask (Promise.then)"));
process.nextTick(() => console.log("3. Microtask Prioritária (process.nextTick)"));
console.log("2. Fim do Script Síncrono");`,
          steps: [
            { phase: "Call Stack (V8)", queue: "main()", output: "1. Síncrono (Call Stack)", note: "Executado imediatamente na pilha síncrona do V8." },
            { phase: "Call Stack (V8)", queue: "main()", output: "2. Fim do Script Síncrono", note: "Timers, Immediate, Promise e nextTick foram agendados; o script principal termina." },
            { phase: "nextTickQueue", queue: "process.nextTick", output: "3. Microtask Prioritária (process.nextTick)", note: "A fila process.nextTick é sempre drenada antes das Promises e antes do Event Loop avançar!" },
            { phase: "Microtask Queue", queue: "Promise.then", output: "4. Microtask (Promise.then)", note: "A fila de microtasks de Promises roda logo após a nextTickQueue esvaziar." },
            { phase: "Fase 1: Timers", queue: "setTimeout(0)", output: "5. Fase Timers (setTimeout 0)", note: "O Event Loop entra na Fase 1 (Timers) e executa o callback expirado." },
            { phase: "Fase 5: Check", queue: "setImmediate()", output: "6. Fase Check (setImmediate)", note: "Após passar pela Fase Poll, o Event Loop entra na Fase Check e executa setImmediate()." }
          ]
        },
        ioCallback: {
          label: "Cenário 2: Dentro de I/O (fs.readFile: por que setImmediate vence setTimeout?)",
          code: `import fs from "node:fs";
fs.readFile("config.json", () => {
  console.log("1. Callback Fase Poll (fs.readFile)");
  setTimeout(() => console.log("4. Fase Timers (Próximo Tick do Loop)"), 0);
  setImmediate(() => console.log("3. Fase Check (Imediatamente após Poll!)"));
  process.nextTick(() => console.log("2. process.nextTick (Transição Poll -> Check)"));
});`,
          steps: [
            { phase: "Fase 4: Poll (I/O)", queue: "fs.readFile cb", output: "1. Callback Fase Poll (fs.readFile)", note: "Estamos exatamente dentro da Fase 4 (Poll) da libuv!" },
            { phase: "nextTickQueue", queue: "process.nextTick", output: "2. process.nextTick (Transição Poll -> Check)", note: "Drenado imediatamente ao final do callback de fs.readFile, antes de mudar de fase." },
            { phase: "Fase 5: Check", queue: "setImmediate()", output: "3. Fase Check (Imediatamente após Poll!)", note: "Como a fase seguinte à Poll é SEMPRE a Fase Check, setImmediate() roda antes de setTimeout() de forma determinística!" },
            { phase: "Fase 1: Timers", queue: "setTimeout(0)", output: "4. Fase Timers (Próximo Tick do Loop)", note: "O Event Loop inicia uma nova volta completa para chegar à Fase 1 (Timers)." }
          ]
        }
      };

      let currentScenarioKey = "basic";
      let stepIdx = 0;

      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Simulador Interativo • Capítulo 1</span>
            <h4>Motor de Execução V8 + libuv: Ordem Exata das Filas e Fases</h4>
            <p>Selecione um cenário de código e avance passo a passo para ver qual fila ou fase do Event Loop executa cada linha no console.</p>
          </div>

          <div style="display:flex; flex-wrap:wrap; gap:0.75rem; align-items:center; margin-bottom:1rem;">
            <select id="el-scenario-select" style="padding:0.45rem 0.75rem; border-radius:6px; border:1px solid var(--border-subtle); background:var(--bg-surface); color:var(--text-primary); font-weight:600;">
              <option value="basic">${scenarios.basic.label}</option>
              <option value="ioCallback">${scenarios.ioCallback.label}</option>
            </select>
            <button type="button" id="el-step-btn" class="btn btn-primary" style="padding:0.45rem 1rem;">Executar Próximo Passo</button>
            <button type="button" id="el-all-btn" class="btn btn-outline" style="padding:0.45rem 1rem;">Executar Tudo</button>
            <button type="button" id="el-reset-btn" class="btn btn-outline" style="padding:0.45rem 1rem;">Reiniciar</button>
          </div>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:1rem; margin-bottom:1rem;">
            <div style="background:var(--bg-primary); padding:0.85rem; border-radius:8px; border:1px solid var(--border-subtle);">
              <div style="font-size:0.78rem; color:var(--text-secondary); margin-bottom:0.4rem; font-weight:600;">CÓDIGO EM EXECUÇÃO:</div>
              <pre id="el-code-box" style="margin:0; font-size:0.8rem; white-space:pre-wrap; font-family:var(--font-mono);"></pre>
            </div>
            <div style="background:var(--bg-surface); padding:0.85rem; border-radius:8px; border:1px solid var(--border-subtle);">
              <div style="font-size:0.78rem; color:var(--text-secondary); margin-bottom:0.4rem; font-weight:600;">SAÍDA DO CONSOLE (ORDEM REAL):</div>
              <div id="el-console-box" style="font-family:var(--font-mono); font-size:0.82rem; line-height:1.7; min-height:120px;"></div>
            </div>
          </div>

          <div id="el-note-box" style="background:var(--bg-surface); padding:0.75rem 1rem; border-radius:6px; border:1px solid var(--border-subtle); font-size:0.86rem;">
            Clique em <strong>Executar Próximo Passo</strong> para inspecionar a fila ativa.
          </div>
        </div>
      `;

      const codeBox = container.querySelector("#el-code-box");
      const consoleBox = container.querySelector("#el-console-box");
      const noteBox = container.querySelector("#el-note-box");
      const selectEl = container.querySelector("#el-scenario-select");

      function renderState() {
        const scen = scenarios[currentScenarioKey];
        codeBox.textContent = scen.code;
        const executed = scen.steps.slice(0, stepIdx);
        consoleBox.innerHTML = executed.length
          ? executed
              .map(
                (s, idx) =>
                  `<div><span class="badge badge-scope" style="margin-right:0.4rem;">#${idx + 1} • ${s.phase}</span> <strong>${s.output}</strong></div>`
              )
              .join("")
          : `<span class="text-muted">Nenhum callback drenado ainda (0/${scen.steps.length})...</span>`;

        if (stepIdx > 0) {
          const last = scen.steps[stepIdx - 1];
          noteBox.innerHTML = `<strong>Fase/Fila Ativa (${last.phase}):</strong> ${last.note}`;
        } else {
          noteBox.innerHTML = `Clique em <strong>Executar Próximo Passo</strong> para acompanhar a transição entre Call Stack, Microtasks e fases da libuv.`;
        }
      }

      selectEl.addEventListener("change", () => {
        currentScenarioKey = selectEl.value;
        stepIdx = 0;
        renderState();
      });

      container.querySelector("#el-step-btn").addEventListener("click", () => {
        const scen = scenarios[currentScenarioKey];
        if (stepIdx < scen.steps.length) {
          stepIdx++;
          renderState();
        }
      });

      container.querySelector("#el-all-btn").addEventListener("click", () => {
        const scen = scenarios[currentScenarioKey];
        stepIdx = scen.steps.length;
        renderState();
      });

      container.querySelector("#el-reset-btn").addEventListener("click", () => {
        stepIdx = 0;
        renderState();
      });

      renderState();
    }
  },

  // 2. Simulador de Streams & Backpressure vs Bufferização Completa na RAM (Cap. 3)
  "nd-streams-backpressure-lab": {
    name: "Simulador de Memória RAM: fs.readFile vs. stream.pipeline com Backpressure (Cap. 3)",
    patternId: "nd-cap-3",
    render(container) {
      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Simulador de Memória & I/O • Capítulo 3</span>
            <h4>Bufferização em RAM (fs.readFile) vs. stream.pipeline() com highWaterMark</h4>
            <p>Ajuste o tamanho do arquivo e o número de usuários simultâneos fazendo download/processamento para calcular o impacto direto na memória RAM do container Node.js.</p>
          </div>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:1rem; margin-bottom:1.25rem;">
            <label style="font-size:0.88rem; font-weight:600;">
              Tamanho do Arquivo (MB): <span id="st-file-val">250 MB</span>
              <input type="range" id="st-file-range" min="10" max="1000" step="10" value="250" style="width:100%; margin-top:0.4rem;" />
            </label>
            <label style="font-size:0.88rem; font-weight:600;">
              Requisições Concorrentes: <span id="st-users-val">20 usuários</span>
              <input type="range" id="st-users-range" min="1" max="100" step="1" value="20" style="width:100%; margin-top:0.4rem;" />
            </label>
            <label style="font-size:0.88rem; font-weight:600;">
              Stream highWaterMark (KiB):
              <select id="st-hwm-select" style="width:100%; margin-top:0.4rem; padding:0.35rem; border-radius:6px; border:1px solid var(--border-subtle); background:var(--bg-surface); color:var(--text-primary);">
                <option value="16">16 KiB (Padrão Node 0.10 a Node 20)</option>
                <option value="64" selected>64 KiB (Novo Padrão Node 22 / Node 24)</option>
                <option value="256">256 KiB (Alto Throughput Disco)</option>
              </select>
            </label>
          </div>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:1rem;" id="st-results-grid"></div>
        </div>
      `;

      const fileRange = container.querySelector("#st-file-range");
      const usersRange = container.querySelector("#st-users-range");
      const hwmSelect = container.querySelector("#st-hwm-select");
      const fileVal = container.querySelector("#st-file-val");
      const usersVal = container.querySelector("#st-users-val");
      const resultsGrid = container.querySelector("#st-results-grid");

      function updateCalc() {
        const fileMB = Number(fileRange.value);
        const users = Number(usersRange.value);
        const hwmKB = Number(hwmSelect.value);

        fileVal.textContent = `${fileMB} MB`;
        usersVal.textContent = `${users} usuários`;

        const baseRamMB = 45;
        const bufferedRamMB = baseRamMB + fileMB * users;
        const streamRamMB = baseRamMB + Number(((users * hwmKB * 2) / 1024).toFixed(2));
        const isCrash = bufferedRamMB > 1024;

        resultsGrid.innerHTML = `
          <div style="background:var(--bg-surface); padding:1rem; border-radius:8px; border:2px solid ${isCrash ? "#ef4444" : "#f59e0b"};">
            <h5 style="margin:0 0 0.5rem 0; color:${isCrash ? "#ef4444" : "#f59e0b"};">Abordagem Bufferizada: await fs.promises.readFile()</h5>
            <div style="font-size:0.88rem; line-height:1.65;">
              Pico de Memória Alocada: <strong>${bufferedRamMB.toLocaleString("pt-BR")} MB</strong><br />
              Status em Container de 1 GB: <strong>${isCrash ? "💥 CRASH OOMKilled (Exit 137)" : "⚠️ Risco Elevado de GC Pause"}</strong><br />
              Motivo: Carrega ${fileMB} MB inteiros para cada um dos ${users} clientes simultâneos.
            </div>
          </div>
          <div style="background:var(--bg-surface); padding:1rem; border-radius:8px; border:2px solid #10b981;">
            <h5 style="margin:0 0 0.5rem 0; color:#10b981;">Abordagem Otimizada: await stream.pipeline(src, dst)</h5>
            <div style="font-size:0.88rem; line-height:1.65;">
              Pico de Memória Alocada: <strong>${streamRamMB.toFixed(2)} MB</strong><br />
              Status em Container de 1 GB: <strong>✔ Estável O(1) c/ Backpressure</strong><br />
              Economia de RAM: <strong>${(((bufferedRamMB - streamRamMB) / bufferedRamMB) * 100).toFixed(2)}%</strong> (apenas ${hwmKB} KiB por buffer ativo).
            </div>
          </div>
        `;
      }

      fileRange.addEventListener("input", updateCalc);
      usersRange.addEventListener("input", updateCalc);
      hwmSelect.addEventListener("change", updateCalc);
      updateCalc();
    }
  },

  // 3. Simulador de Worker Threads vs Bloqueio da Main Thread (Cap. 4)
  "nd-worker-threads-lab": {
    name: "Simulador Multi-Core: Bloqueio de CPU na Main Thread vs. Worker Threads Pool (Cap. 4)",
    patternId: "nd-cap-4",
    render(container) {
      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Simulador de Concorrência • Capítulo 4</span>
            <h4>Impacto de Tarefa CPU-Bound na Latência de Requisições HTTP Leves</h4>
            <p>Simule o que acontece com 50 requisições rápidas de Healthcheck/Login quando chega 1 requisição pesada de CPU (ex: geração de hash/relatório de 400ms) na thread principal vs. em um Pool de Worker Threads.</p>
          </div>

          <div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center; margin-bottom:1.25rem;">
            <label style="font-size:0.88rem; font-weight:600;">
              Duração da Tarefa de CPU (ms):
              <input type="number" id="wt-cpu-ms" min="50" max="3000" step="50" value="400" style="width:90px; padding:0.35rem 0.5rem; border-radius:6px; border:1px solid var(--border-subtle); margin-left:0.4rem;" />
            </label>
            <label style="font-size:0.88rem; font-weight:600;">
              Workers no Pool (Cores):
              <select id="wt-cores-select" style="padding:0.35rem 0.6rem; border-radius:6px; border:1px solid var(--border-subtle); background:var(--bg-surface); color:var(--text-primary); margin-left:0.4rem;">
                <option value="2">2 Worker Threads</option>
                <option value="4" selected>4 Worker Threads</option>
                <option value="8">8 Worker Threads</option>
              </select>
            </label>
            <button type="button" id="wt-run-btn" class="btn btn-primary" style="padding:0.4rem 1rem;">Recalcular Latência p99</button>
          </div>

          <div id="wt-comparison-mount" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:1rem;"></div>
        </div>
      `;

      const cpuInput = container.querySelector("#wt-cpu-ms");
      const coresSelect = container.querySelector("#wt-cores-select");
      const mount = container.querySelector("#wt-comparison-mount");

      function renderMetrics() {
        const cpuMs = Math.max(50, Number(cpuInput.value) || 400);
        const cores = Number(coresSelect.value) || 4;
        const blockedHealthCheckLatency = cpuMs + 2;
        const workerHealthCheckLatency = 2;
        const throughput4TasksBlocked = Math.round(1000 / (cpuMs * 4 / 4));
        const throughput4TasksPool = Math.round((1000 / cpuMs) * cores);

        mount.innerHTML = `
          <div style="background:var(--bg-surface); padding:1rem; border-radius:8px; border:1px solid var(--border-subtle);">
            <h5 style="margin:0 0 0.5rem 0; color:#ef4444;">Sem Worker Threads (Síncrono na Main Thread)</h5>
            <div style="font-size:0.88rem; line-height:1.65;">
              Event Loop Lag: <strong>${cpuMs} ms (CONGELADO)</strong><br />
              Latência das Rotas Leves (/health): <strong>${blockedHealthCheckLatency} ms</strong><br />
              Capacidade CPU Paralela: <strong>${throughput4TasksBlocked} tarefas/seg</strong> (usa apenas 1 core)
            </div>
          </div>
          <div style="background:var(--bg-surface); padding:1rem; border-radius:8px; border:1px solid var(--border-subtle);">
            <h5 style="margin:0 0 0.5rem 0; color:#10b981;">Com Pool de ${cores} Worker Threads (Node 12+)</h5>
            <div style="font-size:0.88rem; line-height:1.65;">
              Event Loop Lag na Main Thread: <strong>0.3 ms (LIVRE)</strong><br />
              Latência das Rotas Leves (/health): <strong>${workerHealthCheckLatency} ms</strong><br />
              Capacidade CPU Paralela: <strong>${throughput4TasksPool} tarefas/seg</strong> (${cores}x ganho multi-core)
            </div>
          </div>
        `;
      }

      container.querySelector("#wt-run-btn").addEventListener("click", renderMetrics);
      cpuInput.addEventListener("input", renderMetrics);
      coresSelect.addEventListener("change", renderMetrics);
      renderMetrics();
    }
  },

  // 4. Simulador de Resolução de Módulos: CommonJS vs ESM vs require(esm) no Node 22/24 (Cap. 9)
  "nd-cjs-esm-resolver-lab": {
    name: "Simulador de Módulos: CommonJS, ES Modules, Package Exports & require(esm) (Cap. 9)",
    patternId: "nd-cap-9",
    render(container) {
      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Simulador de Resolução de Módulos • Capítulo 9</span>
            <h4>Diagnóstico de Interoperabilidade: require() vs. import em Diferentes Versões do Node</h4>
            <p>Escolha quem está importando, o formato do pacote alvo e a versão do Node.js para ver exatamente como o resolvedor de módulos se comporta.</p>
          </div>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap:0.85rem; margin-bottom:1rem;">
            <label style="font-size:0.85rem; font-weight:600;">
              1. Formato do Arquivo Chamador:
              <select id="mod-caller" style="width:100%; margin-top:0.35rem; padding:0.4rem; border-radius:6px; border:1px solid var(--border-subtle); background:var(--bg-surface); color:var(--text-primary);">
                <option value="cjs-require">CommonJS usando require()</option>
                <option value="cjs-dynamic">CommonJS usando await import()</option>
                <option value="esm-import">ES Module usando import estático</option>
              </select>
            </label>
            <label style="font-size:0.85rem; font-weight:600;">
              2. Tipo do Módulo Alvo:
              <select id="mod-target" style="width:100%; margin-top:0.35rem; padding:0.4rem; border-radius:6px; border:1px solid var(--border-subtle); background:var(--bg-surface); color:var(--text-primary);">
                <option value="esm-sync">Pacote ESM Síncrono (sem Top-Level await)</option>
                <option value="esm-tla">Pacote ESM com Top-Level await</option>
                <option value="ts-native">Arquivo .ts Direto (Erasable Syntax)</option>
                <option value="private-subpath">Subpath Não Listado em "exports"</option>
              </select>
            </label>
            <label style="font-size:0.85rem; font-weight:600;">
              3. Versão do Runtime Node.js:
              <select id="mod-version" style="width:100%; margin-top:0.35rem; padding:0.4rem; border-radius:6px; border:1px solid var(--border-subtle); background:var(--bg-surface); color:var(--text-primary);">
                <option value="node16">Node.js 16 / 18 / 20 LTS</option>
                <option value="node22" selected>Node.js 22.12+ LTS / Node 24</option>
              </select>
            </label>
          </div>

          <div id="mod-verdict-box" style="background:var(--bg-surface); padding:1rem; border-radius:8px; border:1px solid var(--border-subtle);"></div>
        </div>
      `;

      const callerSel = container.querySelector("#mod-caller");
      const targetSel = container.querySelector("#mod-target");
      const versionSel = container.querySelector("#mod-version");
      const verdictBox = container.querySelector("#mod-verdict-box");

      function evaluateResolution() {
        const caller = callerSel.value;
        const target = targetSel.value;
        const ver = versionSel.value;

        let status = "✔ Sucesso";
        let color = "#10b981";
        let detail = "";

        if (target === "private-subpath") {
          status = "✖ Bloqueado: ERR_PACKAGE_PATH_NOT_EXPORTED";
          color = "#ef4444";
          detail = "Desde o Node 14+, quando um pacote define o campo \"exports\" no package.json, qualquer tentativa de importar um arquivo interno não listado explicitamente é bloqueada pelo encapsulamento estrito.";
        } else if (target === "ts-native") {
          if (ver === "node22") {
            status = "✔ Executado Nativamente via Type Stripping (SWC/Amaro)";
            color = "#10b981";
            detail = "No Node 22.6+ (com flag) e Node 23.6+ / Node 24 (por padrão sem flag!), o Node remove as anotações de tipo TypeScript em memória instantaneamente sem precisar de ts-node ou tsc.";
          } else {
            status = "✖ Erro: ERR_UNKNOWN_FILE_EXTENSION (.ts)";
            color = "#ef4444";
            detail = "Nas versões Node 16, 18 e 20, o runtime não possuía Type Stripping nativo embutido, exigindo compilação prévia com tsc ou loaders externos como tsx.";
          }
        } else if (caller === "cjs-require" && target === "esm-sync") {
          if (ver === "node22") {
            status = "✔ Sucesso via require(esm) Nativo (Node 22.12+ / Node 24)";
            color = "#10b981";
            detail = "Marco histórico do Node 22 LTS e Node 24: como o módulo ES alvo não possui Top-Level await, require() carrega o grafo ESM de forma 100% síncrona sem precisar de flags!";
          } else {
            status = "✖ Erro: ERR_REQUIRE_ESM";
            color = "#ef4444";
            detail = "Até o Node 20, chamar require() em um pacote distribuído exclusivamente como ES Module lançava ERR_REQUIRE_ESM, obrigando o uso de await import() assíncrono.";
          }
        } else if (caller === "cjs-require" && target === "esm-tla") {
          status = "✖ Erro: ERR_REQUIRE_ASYNC_MODULE";
          color = "#ef4444";
          detail = "Mesmo no Node 22 e Node 24, require() é síncrono por contrato. Se o módulo ESM usar Top-Level await, ele não pode ser carregado de forma síncrona; use await import() para consumi-lo.";
        } else {
          status = "✔ Resolução Assíncrona / Estática Padrão Concluída";
          color = "#10b981";
          detail = "Tanto o import estático em ESM quanto o dynamic await import() em CJS suportam módulos síncronos e módulos com Top-Level await em todas as versões modernas do Node.";
        }

        verdictBox.innerHTML = `
          <div style="font-weight:700; font-size:0.98rem; color:${color}; margin-bottom:0.4rem;">${status}</div>
          <p style="margin:0; font-size:0.88rem; line-height:1.6;">${detail}</p>
        `;
      }

      callerSel.addEventListener("change", evaluateResolution);
      targetSel.addEventListener("change", evaluateResolution);
      versionSel.addEventListener("change", evaluateResolution);
      evaluateResolution();
    }
  },

  // 5. Simulador de Arquitetura e Performance de Frameworks (Cap. 11 & 12)
  "nd-frameworks-bench-lab": {
    name: "Comparador Arquitetural: Express 5 vs. Fastify 5 vs. NestJS 11 vs. Hono 4 (Cap. 11 & 12)",
    patternId: "nd-cap-11",
    render(container) {
      const profiles = {
        throughput: {
          title: "Perfil 1: Microsserviço de Alto Throughput & Validação JSON Schema",
          winner: "Fastify 5.x (ou NestJS 11 com FastifyAdapter)",
          metrics: [
            { fw: "Fastify 5.0", rps: "~72.000 req/s", router: "Radix Tree O(k) (find-my-way)", json: "JIT fast-json-stringify + Ajv", notes: "Ideal para baixa latência p99, validação automática e logger Pino." },
            { fw: "Hono 4.x (@hono/node-server)", rps: "~68.000 req/s", router: "RegExpRouter / SmartRouter", json: "Web Response.json() + Zod", notes: "Portável entre Node, Cloudflare Workers, Deno e Bun." },
            { fw: "NestJS 11 (FastifyAdapter)", rps: "~58.000 req/s", router: "Fastify 5 Radix Tree", json: "Pipes + Fastify Serializer", notes: "Une DI corporativo completo com o motor HTTP do Fastify 5." },
            { fw: "Express 5.0", rps: "~24.000 req/s", router: "Linear Layer Regex (path-to-regexp v8)", json: "JSON.stringify() padrão V8", notes: "Excelente compatibilidade e simplicidade, agora com async/await nativo." }
          ]
        },
        enterprise: {
          title: "Perfil 2: Plataforma Enterprise Modular (Monorepo, 30+ Desenvolvedores, Kafka/gRPC)",
          winner: "NestJS 11.x",
          metrics: [
            { fw: "NestJS 11.x", rps: "Alta Governança", router: "Controllers Decorados (@Get, @Version)", json: "ValidationPipe / SWC Compiler", notes: "Container IoC nativo, Guards, Interceptors, Microsserviços (Kafka/gRPC) e testes padronizados." },
            { fw: "Fastify 5.x (c/ Autoload)", rps: "Alta Performance", router: "Plugins Encapsulados (avvio DAG)", json: "TypeBox / Zod Type Providers", notes: "Ótimo para times disciplinados que preferem composição funcional a Decorators." },
            { fw: "Hono 4.x (RPC)", rps: "Full-Stack Type-Safe", router: "Encadeamento Tipado (hc<AppType>)", json: "@hono/zod-validator", notes: "Compartilha tipos de contrato instantaneamente com frontends React/Next/Vite." },
            { fw: "Express 5.0", rps: "Flexibilidade Livre", router: "express.Router() modular", json: "Middlewares customizados", notes: "Exige definir manualmente a arquitetura de pastas, injeção e validação." }
          ]
        }
      };

      let activeProfile = "throughput";

      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Comparador de Frameworks • Capítulos 10, 11 e 12</span>
            <h4>Matriz Interativa: Express 5 vs. Fastify 5 vs. NestJS 11 vs. Hono 4</h4>
            <p>Alterne entre os perfis de projeto para comparar o motor de roteamento, serialização JSON e trade-offs arquiteturais.</p>
          </div>

          <div style="display:flex; gap:0.75rem; flex-wrap:wrap; margin-bottom:1rem;">
            <button type="button" class="btn btn-primary" id="fw-prof-throughput">1. Foco em Throughput & Latência</button>
            <button type="button" class="btn btn-outline" id="fw-prof-enterprise">2. Foco em Arquitetura Enterprise & Edge</button>
          </div>

          <div id="fw-table-mount"></div>
        </div>
      `;

      const mount = container.querySelector("#fw-table-mount");
      const btnTp = container.querySelector("#fw-prof-throughput");
      const btnEnt = container.querySelector("#fw-prof-enterprise");

      function renderTable() {
        const prof = profiles[activeProfile];
        mount.innerHTML = `
          <div style="margin-bottom:0.75rem; font-size:0.9rem;">
            <strong>Recomendação Principal para este Cenário:</strong> <span class="badge badge-creational">${prof.winner}</span>
          </div>
          <div class="table-responsive">
            <table class="gof-table">
              <thead>
                <tr>
                  <th>Framework</th>
                  <th>Escala / Perfil</th>
                  <th>Motor de Roteamento</th>
                  <th>Validação & Serialização</th>
                  <th>Destaque Arquitetural</th>
                </tr>
              </thead>
              <tbody>
                ${prof.metrics
                  .map(
                    (m) => `
                  <tr>
                    <td><strong>${m.fw}</strong></td>
                    <td style="font-family:var(--font-mono);">${m.rps}</td>
                    <td>${m.router}</td>
                    <td>${m.json}</td>
                    <td>${m.notes}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        `;
      }

      btnTp.addEventListener("click", () => {
        activeProfile = "throughput";
        btnTp.className = "btn btn-primary";
        btnEnt.className = "btn btn-outline";
        renderTable();
      });

      btnEnt.addEventListener("click", () => {
        activeProfile = "enterprise";
        btnEnt.className = "btn btn-primary";
        btnTp.className = "btn btn-outline";
        renderTable();
      });

      renderTable();
    }
  },

  // 6. Verificador Interativo de Migração e Retrocompatibilidade (Cap. 10)
  "nd-migration-compat-lab": {
    name: "Inspetor de Migração: Express 4 -> Express 5 & APIs Legadas do Node (Cap. 10)",
    patternId: "nd-cap-10",
    render(container) {
      const rules = [
        {
          id: "wildcard",
          title: "Rota Coringa (Wildcard Catch-All)",
          legacy: `// Express 4 (Quebra no Express 5 com PathError!)\napp.get("*", (req, res) => {\n  res.sendFile(indexHtml);\n});`,
          modern: `// Express 5 (path-to-regexp v8 exige nome explícito no wildcard)\napp.get("/*splat", (req, res) => {\n  res.sendFile(indexHtml);\n});`,
          explanation: "No Express 5, o caractere coringa '*' precisa obrigatoriamente de um identificador nomeado (como /*splat ou /*filepath) para eliminar ambiguidades e proteger contra ReDoS."
        },
        {
          id: "optionalParam",
          title: "Parâmetros de Rota Opcionais",
          legacy: `// Express 4 (Sintaxe :param? antiga)\napp.get("/relatorio/:ano/:formato?", (req, res) => {\n  res.json({ params: req.params });\n});`,
          modern: `// Express 5 (Agrupamento explícito com chaves {})\napp.get("/relatorio/:ano{/:formato}", (req, res) => {\n  res.json({ params: req.params });\n});`,
          explanation: "O modificador '?' solto ao final do parâmetro foi substituído no Express 5 por blocos delimitados por chaves '{/:formato}' ou '{.:ext}'."
        },
        {
          id: "asyncError",
          title: "Tratamento de Erros em Rotas async/await",
          legacy: `// Express 4 (Exigia try/catch manual ou express-async-errors)\napp.get("/pedidos/:id", async (req, res, next) => {\n  try {\n    const pedido = await buscarPedido(req.params.id);\n    res.status(200).json(pedido);\n  } catch (err) {\n    next(err);\n  }\n});`,
          modern: `// Express 5 (Captura rejeições de Promises nativamente!)\napp.get("/pedidos/:id", async (req, res) => {\n  const pedido = await buscarPedido(req.params.id);\n  res.status(200).json(pedido); // Se buscarPedido rejeitar, vai direto ao error middleware!\n});`,
          explanation: "O roteador do Express 5 detecta automaticamente que o handler retornou uma Promise (thenable) e anexa .catch(next) internamente."
        },
        {
          id: "resSendStatus",
          title: "Assinaturas de Resposta HTTP (res.send / res.json)",
          legacy: `// Express 4 (Assinaturas invertidas ou numéricas depreciadas)\nres.json(201, { criado: true });\nres.send(204);`,
          modern: `// Express 5 (Encadeamento explícito obrigatório)\nres.status(201).json({ criado: true });\nres.sendStatus(204);`,
          explanation: "O Express 5 removeu definitivamente res.json(status, obj), res.send(status, body) e res.send(number) para garantir contratos previsíveis."
        }
      ];

      let selectedRule = rules[0];

      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Guia Prático de Migração • Capítulo 10</span>
            <h4>Transformador de Código: Express 4.x para Express 5.0</h4>
            <p>Selecione um padrão de código legado para visualizar a refatoração exata exigida na atualização para o Express 5 (e NestJS 11 com Express 5).</p>
          </div>

          <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:1rem;" id="mig-tabs">
            ${rules
              .map(
                (r, idx) =>
                  `<button type="button" class="btn ${idx === 0 ? "btn-primary" : "btn-outline"}" data-rule="${r.id}" style="font-size:0.82rem; padding:0.4rem 0.8rem;">${idx + 1}. ${r.title}</button>`
              )
              .join("")}
          </div>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:1rem; margin-bottom:0.85rem;">
            <div style="background:var(--bg-primary); padding:0.85rem; border-radius:8px; border:1px solid #ef4444;">
              <div style="font-size:0.78rem; font-weight:700; color:#ef4444; margin-bottom:0.4rem;">ANTES (EXPRESS 4 • LEGADO):</div>
              <pre id="mig-legacy-code" style="margin:0; font-size:0.8rem; white-space:pre-wrap; font-family:var(--font-mono);"></pre>
            </div>
            <div style="background:var(--bg-primary); padding:0.85rem; border-radius:8px; border:1px solid #10b981;">
              <div style="font-size:0.78rem; font-weight:700; color:#10b981; margin-bottom:0.4rem;">DEPOIS (EXPRESS 5 • MODERNO):</div>
              <pre id="mig-modern-code" style="margin:0; font-size:0.8rem; white-space:pre-wrap; font-family:var(--font-mono);"></pre>
            </div>
          </div>

          <div id="mig-explanation" style="background:var(--bg-surface); padding:0.75rem 1rem; border-radius:6px; border:1px solid var(--border-subtle); font-size:0.86rem;"></div>
        </div>
      `;

      const legacyPre = container.querySelector("#mig-legacy-code");
      const modernPre = container.querySelector("#mig-modern-code");
      const expBox = container.querySelector("#mig-explanation");
      const buttons = container.querySelectorAll("#mig-tabs button");

      function updateView() {
        legacyPre.textContent = selectedRule.legacy;
        modernPre.textContent = selectedRule.modern;
        expBox.innerHTML = `<strong>Motivo Técnico da Mudança:</strong> ${selectedRule.explanation}`;
      }

      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          buttons.forEach((b) => (b.className = "btn btn-outline"));
          btn.className = "btn btn-primary";
          const id = btn.getAttribute("data-rule");
          selectedRule = rules.find((r) => r.id === id) || rules[0];
          updateView();
        });
      });

      updateView();
    }
  }
};
