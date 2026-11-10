/**
 * 6 Laboratorios Interativos e Simuladores Visuais para "Java: Guia Completo de Versoes, JVM & Ecossistema"
 * Permite experimentar Type Erasure, Streams Lazy Evaluation, Garbage Collectors (G1GC vs Generational ZGC),
 * Virtual Threads (Project Loom), Benchmark Spring Boot 3 vs Quarkus 3 e Assistente de Migracao LTS.
 */

export const javaLabs = {
  // 1. Simulador de Generics, Type Erasure, Bridge Methods & Bytecode Major Version (Cap. 1, 2 e 3)
  "jv-generics-erasure-lab": {
    name: "Simulador de Bytecode, Type Erasure & Retrocompatibilidade (Cap. 1 a 3)",
    patternId: "jv-cap-2",
    render(container) {
      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Simulador Interativo • Bytecode & Type Erasure</span>
            <h4>Inspecao de Type Erasure, Bridge Methods e Versao Major do .class</h4>
            <p>Escolha um cenario de codigo Java e a flag de compilacao (<code>--release</code>) para visualizar como o compilador <code>javac</code> transforma Generics, gera Bridge Methods ou aplica <code>try-with-resources</code> mantendo compatibilidade binaria com JVMs antigas.</p>
          </div>

          <div style="display:flex; flex-wrap:wrap; gap:0.75rem; align-items:center; margin-bottom:1.25rem;">
            <label style="font-size:0.88rem; font-weight:600;">
              Cenario de Codigo:
              <select id="jv-erasure-scenario" style="padding:0.45rem 0.7rem; border-radius:6px; border:1px solid var(--border-subtle); background:var(--bg-surface); color:var(--text-primary); margin-left:0.4rem;">
                <option value="generics">1. Generics & Checkcast (Java 5 • List&lt;String&gt;)</option>
                <option value="bridge">2. Bridge Method Sintetico (Comparable&lt;Cliente&gt;)</option>
                <option value="twr">3. try-with-resources & getSuppressed() (Java 7)</option>
                <option value="release">4. Flag --release 8 vs -source 8 -target 8 (Java 9+)</option>
              </select>
            </label>
            <button type="button" id="jv-erasure-compile-btn" class="btn btn-primary" style="padding:0.45rem 1rem;">Compilar & Descompilar (javap -c)</button>
          </div>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:1rem; margin-bottom:1rem;">
            <div style="background:var(--bg-surface); padding:1rem; border-radius:8px; border:1px solid var(--border-subtle);">
              <h5 style="margin:0 0 0.5rem 0; color:var(--cat-creational);">Codigo-Fonte Java (Visao do Desenvolvedor)</h5>
              <pre id="jv-erasure-source" style="font-size:0.8rem; font-family:var(--font-mono); white-space:pre-wrap; margin:0;"></pre>
            </div>
            <div style="background:var(--bg-surface); padding:1rem; border-radius:8px; border:1px solid var(--border-subtle);">
              <h5 style="margin:0 0 0.5rem 0; color:var(--accent-warning);">Bytecode Equivalente Apos Compilacao (Visao da JVM)</h5>
              <pre id="jv-erasure-bytecode" style="font-size:0.8rem; font-family:var(--font-mono); white-space:pre-wrap; margin:0;"></pre>
            </div>
          </div>

          <div id="jv-erasure-verdict" style="font-size:0.88rem; background:var(--bg-primary); padding:0.85rem 1rem; border-radius:8px; border:1px solid var(--border-subtle);"></div>
        </div>
      `;

      const scenarios = {
        generics: {
          source: `// Codigo Java 5+ com Generics fortemente tipado
List<String> nomes = new ArrayList<String>();
nomes.add("Ada Lovelace");
String autora = nomes.get(0);`,
          bytecode: `// Bytecode apos Type Erasure (Major 49 • Java 5)
// O parametro <String> foi apagado para Object!
List nomes = new ArrayList();
nomes.add("Ada Lovelace");
// O compilador inseriu a instrucao checkcast invisivelmente:
String autora = (String) nomes.get(0);`,
          verdict: "<strong>Garantia de Retrocompatibilidade:</strong> Como <code>ArrayList&lt;String&gt;</code> vira <code>ArrayList</code> bruto no bytecode (Type Erasure), voce pode passar essa lista para uma biblioteca compilada no Java 1.4 (ano 2002) sem precisar recompilar a biblioteca antiga!"
        },
        bridge: {
          source: `public class Cliente implements Comparable<Cliente> {
  private final int id;
  public Cliente(int id) { this.id = id; }

  @Override
  public int compareTo(Cliente outro) {
    return Integer.compare(this.id, outro.id);
  }
}`,
          bytecode: `public class Cliente implements Comparable {
  // Metodo original tipado:
  public int compareTo(Cliente outro) {
    return Integer.compare(this.id, outro.id);
  }

  // Bridge Method sintetico gerado pelo javac (ACC_BRIDGE | ACC_SYNTHETIC):
  public int compareTo(Object outro) {
    return this.compareTo((Cliente) outro); // checkcast + delegacao!
  }
}`,
          verdict: "<strong>Por que o Bridge Method existe?</strong> Apos o Type Erasure, a interface <code>Comparable</code> do Java 1.2 espera <code>compareTo(Object)</code>. Sem o metodo ponte sintetico gerado pelo compilador, chamar <code>Collections.sort(clientes)</code> quebraria o polimorfismo!"
        },
        twr: {
          source: `// Java 7: try-with-resources deterministico
try (Connection c = ds.getConnection()) {
  executarTransacao(c);
}`,
          bytecode: `// Codigo desdobrado pelo compilador Java 7 (Major 51):
Connection c = ds.getConnection();
Throwable primaryEx = null;
try {
  executarTransacao(c);
} catch (Throwable t) {
  primaryEx = t;
  throw t;
} finally {
  if (c != null) {
    if (primaryEx != null) {
      try { c.close(); } catch (Throwable closeEx) {
        primaryEx.addSuppressed(closeEx); // Nao apaga a excecao original!
      }
    } else { c.close(); }
  }
}`,
          verdict: "<strong>Evolucao Sem Quebra:</strong> No Java 7, <code>java.io.Closeable</code> passou a estender a nova <code>java.lang.AutoCloseable</code>. Todas as classes de I/O e JDBC criadas desde 1996 tornaram-se compativeis com <code>try-with-resources</code> instantaneamente!"
        },
        release: {
          source: `// Compilando no JDK 21 para rodar em producao no Java 8:
String limpo = texto.strip(); // Atenção: strip() so surgiu no Java 11!`,
          bytecode: `// Com 'javac -source 8 -target 8':
// COMPILA SEM AVISAR! Mas em producao no JRE 8 falha com:
// java.lang.NoSuchMethodError: java.lang.String.strip()Ljava/lang/String;

// Com 'javac --release 8' (Java 9+):
// ERRO DE COMPILACAO IMEDIATO:
// error: cannot find symbol: method strip() in class java.lang.String`,
          verdict: "<strong>Regra de Ouro de Build:</strong> Use sempre <code>&lt;release&gt;N&lt;/release&gt;</code> no Maven/Gradle. A flag <code>--release</code> valida o codigo contra a tabela historica exata de simbolos (arquivo <code>ct.sym</code> do JDK), impedindo <code>NoSuchMethodError</code> em producao."
        }
      };

      const selectEl = container.querySelector("#jv-erasure-scenario");
      const btnEl = container.querySelector("#jv-erasure-compile-btn");
      const sourceEl = container.querySelector("#jv-erasure-source");
      const bytecodeEl = container.querySelector("#jv-erasure-bytecode");
      const verdictEl = container.querySelector("#jv-erasure-verdict");

      function updateView() {
        const key = selectEl?.value || "generics";
        const data = scenarios[key] || scenarios.generics;
        if (sourceEl) sourceEl.textContent = data.source;
        if (bytecodeEl) bytecodeEl.textContent = data.bytecode;
        if (verdictEl) verdictEl.innerHTML = data.verdict;
      }

      selectEl?.addEventListener("change", updateView);
      btnEl?.addEventListener("click", updateView);
      updateView();
    }
  },

  // 2. Simulador de Streams API: Lazy Evaluation, Loop Fusion & Stream Gatherers (Cap. 4 e 9)
  "jv-streams-pipeline-lab": {
    name: "Simulador de Streams API: Lazy Evaluation, Curto-Circuito & Gatherers (Cap. 4 e 9)",
    patternId: "jv-cap-4",
    render(container) {
      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Simulador Interativo • Java 8 Streams & Java 24 Gatherers</span>
            <h4>Avaliacao Preguicosa (Lazy), Loop Fusion e Curto-Circuito vs. Colecoes Intermediarias</h4>
            <p>Compare quantas operacoes a JVM realmente executa ao processar uma lista de pedidos com <code>Stream.filter().map().limit(2)</code> (Java 8) ou <code>Stream.gather(Gatherers.windowFixed(2))</code> (Java 24) em comparacao a abordagem ansiosa (Eager).</p>
          </div>

          <div style="display:flex; flex-wrap:wrap; gap:0.75rem; align-items:center; margin-bottom:1.25rem;">
            <label style="font-size:0.88rem; font-weight:600;">
              Modo do Pipeline:
              <select id="jv-stream-mode" style="padding:0.45rem 0.7rem; border-radius:6px; border:1px solid var(--border-subtle); background:var(--bg-surface); color:var(--text-primary); margin-left:0.4rem;">
                <option value="lazy-limit">Java 8 Stream: filter() + map() + limit(2) (Loop Fusion + Short-Circuit)</option>
                <option value="eager">Abordagem Eager (Sem Stream): filtra todos, mapeia todos e pega 2</option>
                <option value="gatherer">Java 24 Stream Gatherer: gather(Gatherers.windowFixed(2))</option>
              </select>
            </label>
            <button type="button" id="jv-stream-run-btn" class="btn btn-primary" style="padding:0.45rem 1rem;">Executar Pipeline</button>
          </div>

          <div id="jv-stream-stats" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:0.75rem; margin-bottom:1rem;"></div>

          <div id="jv-stream-trace" style="font-size:0.84rem; font-family:var(--font-mono); background:var(--bg-surface); padding:0.9rem; border-radius:8px; border:1px solid var(--border-subtle); line-height:1.6;"></div>
        </div>
      `;

      const modeEl = container.querySelector("#jv-stream-mode");
      const runBtn = container.querySelector("#jv-stream-run-btn");
      const statsEl = container.querySelector("#jv-stream-stats");
      const traceEl = container.querySelector("#jv-stream-trace");

      const items = [
        { id: "P1", valor: 50, pago: false },
        { id: "P2", valor: 180, pago: true },
        { id: "P3", valor: 90, pago: false },
        { id: "P4", valor: 320, pago: true },
        { id: "P5", valor: 410, pago: true },
        { id: "P6", valor: 75, pago: false },
        { id: "P7", valor: 600, pago: true },
        { id: "P8", valor: 120, pago: true }
      ];

      function runSimulation() {
        const mode = modeEl?.value || "lazy-limit";
        let ops = 0;
        let intermediateLists = 0;
        const logs = [];
        let output = "";

        if (mode === "lazy-limit") {
          const found = [];
          for (const item of items) {
            ops++;
            logs.push(`[filter] Testando ${item.id} (pago=${item.pago})`);
            if (item.pago) {
              ops++;
              const mapped = `${item.id}:R$${item.valor}`;
              logs.push(`  ↳ [map] Transformado em "${mapped}" (Loop Fusion na mesma passada!)`);
              found.push(mapped);
              if (found.length === 2) {
                logs.push(`⚡ [limit(2) Short-Circuit] Limite de 2 atingido! Elementos P5, P6, P7 e P8 nem sequer foram lidos!`);
                break;
              }
            }
          }
          output = JSON.stringify(found);
        } else if (mode === "eager") {
          intermediateLists = 2;
          logs.push(`1ª Passada Completa (Filtra todos os 8 itens criando Lista Intermediaria #1):`);
          const filtered = items.filter((it) => {
            ops++;
            return it.pago;
          });
          logs.push(`  ↳ Filtrados (${filtered.length} itens): ${filtered.map((i) => i.id).join(", ")}`);
          logs.push(`2ª Passada Completa (Mapeia todos os ${filtered.length} itens criando Lista Intermediaria #2):`);
          const mapped = filtered.map((it) => {
            ops++;
            return `${it.id}:R$${it.valor}`;
          });
          logs.push(`3º Passo: Corta subList(0, 2) descartando o trabalho feito nos demais elementos.`);
          output = JSON.stringify(mapped.slice(0, 2));
        } else {
          intermediateLists = 0;
          const windows = [];
          let currentWindow = [];
          for (const item of items) {
            ops++;
            if (item.pago) {
              currentWindow.push(`${item.id}(R$${item.valor})`);
              logs.push(`[Gatherer.Integrator] Acumulando ${item.id} na janela atual: [${currentWindow.join(", ")}]`);
              if (currentWindow.length === 2) {
                windows.push([...currentWindow]);
                logs.push(`  ↳ [Downstream.push] Janela fixa de 2 emitida: [${currentWindow.join(", ")}]`);
                currentWindow = [];
              }
            }
          }
          if (currentWindow.length > 0) {
            windows.push([...currentWindow]);
            logs.push(`  ↳ [Finisher] Janela residual emitida: [${currentWindow.join(", ")}]`);
          }
          output = JSON.stringify(windows);
        }

        if (statsEl) {
          statsEl.innerHTML = `
            <div style="background:var(--bg-primary); padding:0.75rem; border-radius:6px; border:1px solid var(--border-subtle);">
              <div class="text-muted" style="font-size:0.78rem;">Operacoes Executadas</div>
              <div style="font-size:1.25rem; font-weight:700; color:var(--cat-creational);">${ops} ops</div>
            </div>
            <div style="background:var(--bg-primary); padding:0.75rem; border-radius:6px; border:1px solid var(--border-subtle);">
              <div class="text-muted" style="font-size:0.78rem;">Listas Intermediarias no Heap</div>
              <div style="font-size:1.25rem; font-weight:700; color:var(--accent-warning);">${intermediateLists}</div>
            </div>
            <div style="background:var(--bg-primary); padding:0.75rem; border-radius:6px; border:1px solid var(--border-subtle);">
              <div class="text-muted" style="font-size:0.78rem;">Resultado Final</div>
              <div style="font-size:0.88rem; font-weight:600; font-family:var(--font-mono);">${output}</div>
            </div>
          `;
        }

        if (traceEl) {
          traceEl.innerHTML = logs.join("<br/>");
        }
      }

      modeEl?.addEventListener("change", runSimulation);
      runBtn?.addEventListener("click", runSimulation);
      runSimulation();
    }
  },

  // 3. Simulador de Evolucao dos Garbage Collectors (Serial/Parallel, G1GC, ZGC & Generational ZGC) (Cap. 7)
  "jv-gc-evolution-lab": {
    name: "Simulador de Garbage Collectors: ParallelGC vs G1GC vs Generational ZGC (Cap. 5 a 9)",
    patternId: "jv-cap-7",
    render(container) {
      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Simulador Interativo • JVM Garbage Collectors</span>
            <h4>Comparativo de Pausa Stop-The-World (STW) e Throughput por Coletor e Tamanho de Heap</h4>
            <p>Ajuste o tamanho do Heap da JVM e escolha o Garbage Collector para inspecionar o tempo de pausa P99 (Stop-The-World), o consumo de CPU/RAM e a flag oficial de ativacao.</p>
          </div>

          <div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center; margin-bottom:1.25rem;">
            <label style="font-size:0.88rem; font-weight:600;">
              Garbage Collector:
              <select id="jv-gc-type" style="padding:0.45rem 0.7rem; border-radius:6px; border:1px solid var(--border-subtle); background:var(--bg-surface); color:var(--text-primary); margin-left:0.4rem;">
                <option value="genzgc">Generational ZGC (Java 21 / 25 LTS • Latencia Sub-ms)</option>
                <option value="g1gc">G1GC • Garbage-First (Padrao desde o Java 9+)</option>
                <option value="parallelgc">ParallelGC (Padrao no Java 8 • Foco em Throughput Batch)</option>
                <option value="serialgc">SerialGC (Single-Thread • Containers Micro / CLI)</option>
              </select>
            </label>

            <label style="font-size:0.88rem; font-weight:600;">
              Tamanho do Heap (-Xmx):
              <select id="jv-gc-heap" style="padding:0.45rem 0.7rem; border-radius:6px; border:1px solid var(--border-subtle); background:var(--bg-surface); color:var(--text-primary); margin-left:0.4rem;">
                <option value="2">2 GB (Microsservico Padrao)</option>
                <option value="16" selected>16 GB (Monolito / API de Alta Carga)</option>
                <option value="128">128 GB (Cache In-Memory / Big Data)</option>
              </select>
            </label>
          </div>

          <div id="jv-gc-metrics" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap:0.85rem; margin-bottom:1rem;"></div>
          <div id="jv-gc-details" style="font-size:0.88rem; background:var(--bg-surface); padding:1rem; border-radius:8px; border:1px solid var(--border-subtle);"></div>
        </div>
      `;

      const gcEl = container.querySelector("#jv-gc-type");
      const heapEl = container.querySelector("#jv-gc-heap");
      const metricsEl = container.querySelector("#jv-gc-metrics");
      const detailsEl = container.querySelector("#jv-gc-details");

      function updateGC() {
        const gc = gcEl?.value || "genzgc";
        const heap = parseInt(heapEl?.value || "16", 10);

        const profiles = {
          genzgc: {
            pause: heap === 2 ? "0.15 ms" : heap === 16 ? "0.25 ms" : "0.45 ms",
            throughput: "97.5%",
            flag: "-XX:+UseZGC -XX:+ZGenerational",
            architecture: "Ponteiros Coloridos (Colored Pointers) + Barreiras de Carga + Coleta Concorrente dividida em Geracao Jovem e Antiga.",
            recommendation: "Ideal para APIs financeiras, e-commerce de alta escala e sistemas com Heaps medios a gigantes (2 GB a 16 TB) que exigem latencia P99.9 previsivel abaixo de 1 milissegundo."
          },
          g1gc: {
            pause: heap === 2 ? "12 ms" : heap === 16 ? "45 ms" : "180 ms",
            throughput: "98.2%",
            flag: "-XX:+UseG1GC -XX:MaxGCPauseMillis=50",
            architecture: "Divide o Heap em centenas de regioes independentes (Eden, Survivor, Old, Humongous) e prioriza as regioes com mais lixo acumulado.",
            recommendation: "Coletor padrao equilibrado desde o Java 9. Excelente ponto de partida geral para a maioria das aplicacoes corporativas."
          },
          parallelgc: {
            pause: heap === 2 ? "65 ms" : heap === 16 ? "420 ms" : "3.800 ms (3.8s!)",
            throughput: "99.3%",
            flag: "-XX:+UseParallelGC",
            architecture: "Coletor Stop-The-World multi-thread que congela todas as threads da aplicacao durante a compactacao completa do Heap.",
            recommendation: "Excelente para jobs batch offline, processamento de relatorios noturnos e ETL onde pausas de segundos nao afetam usuarios, mas o tempo total de CPU importa."
          },
          serialgc: {
            pause: heap === 2 ? "140 ms" : heap === 16 ? "1.600 ms" : "14.500 ms",
            throughput: "94.0%",
            flag: "-XX:+UseSerialGC",
            architecture: "Usa uma unica thread de CPU para varrer e compactar a memoria, com overhead de estruturas internas quase zero.",
            recommendation: "Ativado automaticamente pela JVM em containers pequenos com <= 1 vCPU e < 1.5 GB de RAM."
          }
        };

        const p = profiles[gc] || profiles.genzgc;
        if (metricsEl) {
          metricsEl.innerHTML = `
            <div style="background:var(--bg-primary); padding:0.85rem; border-radius:8px; border:1px solid var(--border-subtle);">
              <div class="text-muted" style="font-size:0.78rem;">Pausa Maxima STW (Heap ${heap} GB)</div>
              <div style="font-size:1.3rem; font-weight:700; color:var(--cat-creational);">${p.pause}</div>
            </div>
            <div style="background:var(--bg-primary); padding:0.85rem; border-radius:8px; border:1px solid var(--border-subtle);">
              <div class="text-muted" style="font-size:0.78rem;">Throughput de Aplicacao</div>
              <div style="font-size:1.3rem; font-weight:700; color:var(--cat-structural);">${p.throughput}</div>
            </div>
            <div style="background:var(--bg-primary); padding:0.85rem; border-radius:8px; border:1px solid var(--border-subtle);">
              <div class="text-muted" style="font-size:0.78rem;">Flag da JVM</div>
              <div style="font-size:0.82rem; font-weight:600; font-family:var(--font-mono); margin-top:0.25rem;">${p.flag}</div>
            </div>
          `;
        }
        if (detailsEl) {
          detailsEl.innerHTML = `
            <p style="margin:0 0 0.5rem 0;"><strong>Como Funciona Internamente:</strong> ${p.architecture}</p>
            <p style="margin:0;"><strong>Quando Utilizar em Producao:</strong> ${p.recommendation}</p>
          `;
        }
      }

      gcEl?.addEventListener("change", updateGC);
      heapEl?.addEventListener("change", updateGC);
      updateGC();
    }
  },

  // 4. Simulador de Virtual Threads (Project Loom) vs Platform Threads (Cap. 8)
  "jv-virtual-threads-lab": {
    name: "Simulador de Concorrencia: Virtual Threads (Loom) vs. Platform Threads (Cap. 8)",
    patternId: "jv-cap-8",
    render(container) {
      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Simulador Interativo • Java 21+ Project Loom (JEP 444)</span>
            <h4>Lei de Little na Pratica: Platform Thread Pool (200 threads) vs. Virtual Threads M:N</h4>
            <p>Simule uma carga de requisicoes simultaneas que fazem I/O bloqueante (ex: consulta SQL + chamada REST externa levando 100 ms) em um servidor de 8 vCPUs.</p>
          </div>

          <div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center; margin-bottom:1.25rem;">
            <label style="font-size:0.88rem; font-weight:600;">
              Requisicoes Simultaneas:
              <select id="jv-vt-tasks" style="padding:0.45rem 0.7rem; border-radius:6px; border:1px solid var(--border-subtle); background:var(--bg-surface); color:var(--text-primary); margin-left:0.4rem;">
                <option value="200">200 tarefas concorrentes</option>
                <option value="2000">2.000 tarefas concorrentes</option>
                <option value="10000" selected>10.000 tarefas concorrentes</option>
                <option value="50000">50.000 tarefas concorrentes</option>
              </select>
            </label>
            <button type="button" id="jv-vt-calc-btn" class="btn btn-primary" style="padding:0.45rem 1rem;">Simular Execucao</button>
          </div>

          <div id="jv-vt-comparison" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:1rem;"></div>
        </div>
      `;

      const tasksEl = container.querySelector("#jv-vt-tasks");
      const calcBtn = container.querySelector("#jv-vt-calc-btn");
      const compEl = container.querySelector("#jv-vt-comparison");

      function simulateLoom() {
        const tasks = parseInt(tasksEl?.value || "10000", 10);
        const ioLatencySec = 0.1; // 100ms por tarefa
        const platformPoolSize = 200; // Padrao classico do Tomcat

        const batchesPlatform = Math.ceil(tasks / platformPoolSize);
        const totalTimePlatform = (batchesPlatform * ioLatencySec).toFixed(1);
        const throughputPlatform = Math.round(tasks / parseFloat(totalTimePlatform));
        const ramPlatformMB = Math.round(platformPoolSize * 1.0); // 1 MB por OS Thread

        const totalTimeVirtual = (ioLatencySec + tasks * 0.000015).toFixed(2);
        const throughputVirtual = Math.round(tasks / parseFloat(totalTimeVirtual));
        const ramVirtualMB = Math.max(4, Math.round((tasks * 0.8) / 1024)); // ~800 bytes por VT

        if (compEl) {
          compEl.innerHTML = `
            <div style="background:var(--bg-surface); padding:1rem; border-radius:8px; border:1px solid var(--border-subtle);">
              <h5 style="margin:0 0 0.6rem 0; color:var(--accent-warning);">1. Pool Classico de Platform Threads (200 OS Threads)</h5>
              <ul style="font-size:0.86rem; line-height:1.7; padding-left:1.2rem; margin:0;">
                <li><strong>Modelo:</strong> 1:1 com Kernel Threads do SO (bloqueia a thread no I/O)</li>
                <li><strong>Tempo Total p/ ${tasks.toLocaleString()} reqs:</strong> <strong>${totalTimePlatform} segundos</strong> (${batchesPlatform} ondas de 200)</li>
                <li><strong>Throughput Atingido:</strong> ~${throughputPlatform.toLocaleString()} req/s</li>
                <li><strong>Memoria de Stack Reservada:</strong> ~${ramPlatformMB} MB (para apenas 200 threads; criar ${tasks.toLocaleString()} threads do SO causaria <code>OutOfMemoryError</code>!)</li>
              </ul>
            </div>

            <div style="background:var(--bg-surface); padding:1rem; border-radius:8px; border:1px solid var(--border-subtle);">
              <h5 style="margin:0 0 0.6rem 0; color:var(--cat-creational);">2. Java 21+ Virtual Threads (newVirtualThreadPerTaskExecutor)</h5>
              <ul style="font-size:0.86rem; line-height:1.7; padding-left:1.2rem; margin:0;">
                <li><strong>Modelo:</strong> M:N (${tasks.toLocaleString()} Virtual Threads sobre apenas 8 Carrier Threads)</li>
                <li><strong>Tempo Total p/ ${tasks.toLocaleString()} reqs:</strong> <strong>~${totalTimeVirtual} segundos</strong> (todas aguardam I/O simultaneamente no Heap!)</li>
                <li><strong>Throughput Atingido:</strong> <strong>~${throughputVirtual.toLocaleString()} req/s</strong></li>
                <li><strong>Memoria de Stack no Heap:</strong> ~${ramVirtualMB} MB para todas as ${tasks.toLocaleString()} Virtual Threads</li>
              </ul>
            </div>
          `;
        }
      }

      tasksEl?.addEventListener("change", simulateLoom);
      calcBtn?.addEventListener("click", simulateLoom);
      simulateLoom();
    }
  },

  // 5. Comparador Arquitetural: Spring Boot 3 vs Quarkus 3 vs Micronaut 4 & JIT vs GraalVM Native (Cap. 10, 11 e 12)
  "jv-springboot-quarkus-lab": {
    name: "Simulador Enterprise: Spring Boot 3.4 vs. Quarkus 3.15 vs. GraalVM Native (Cap. 10 a 12)",
    patternId: "jv-cap-11",
    render(container) {
      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Simulador Interativo • Frameworks Enterprise & Runtimes</span>
            <h4>Comparativo de Tempo de Boot, Memoria RSS, Throughput e Modelo de Injeção</h4>
            <p>Selecione o perfil de arquitetura da sua aplicacao para comparar o comportamento real em producao entre Spring Boot 3.4, Quarkus 3.15 e os modos de execucao JVM HotSpot JIT, AppCDS/CRaC e GraalVM Native Image.</p>
          </div>

          <div style="display:flex; flex-wrap:wrap; gap:0.75rem; align-items:center; margin-bottom:1.25rem;">
            <label style="font-size:0.88rem; font-weight:600;">
              Perfil da Carga de Trabalho:
              <select id="jv-fw-workload" style="padding:0.45rem 0.7rem; border-radius:6px; border:1px solid var(--border-subtle); background:var(--bg-surface); color:var(--text-primary); margin-left:0.4rem;">
                <option value="microservice">Microsservico REST + JPA/PostgreSQL em Kubernetes</option>
                <option value="serverless">Funcao Serverless Scale-to-Zero (AWS Lambda / Cloud Run)</option>
                <option value="high-cpu">Motor Transacional 24x7 de Altissimo Throughput</option>
              </select>
            </label>
          </div>

          <div id="jv-fw-cards" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:0.85rem; margin-bottom:1rem;"></div>
          <div id="jv-fw-recommendation" style="font-size:0.88rem; background:var(--bg-primary); padding:0.9rem 1rem; border-radius:8px; border:1px solid var(--border-subtle);"></div>
        </div>
      `;

      const workloadEl = container.querySelector("#jv-fw-workload");
      const cardsEl = container.querySelector("#jv-fw-cards");
      const recEl = container.querySelector("#jv-fw-recommendation");

      function updateBenchmark() {
        const w = workloadEl?.value || "microservice";

        const data = {
          microservice: {
            sbJvm: { boot: "1.8 s (1.1s c/ CDS)", ram: "185 MB", peak: "Altissimo (JIT C2 + VT)", di: "Runtime + AOT opcional" },
            qkJvm: { boot: "0.65 s", ram: "88 MB", peak: "Altissimo (JIT C2 + VT)", di: "100% Build-Time (ArC)" },
            native: { boot: "0.025 s (25 ms)", ram: "38 MB", peak: "Bom (Sem PGO dinamico)", di: "Build-Time Closed-World" },
            verdict: "<strong>Recomendacao para Microsservicos Kubernetes:</strong> Tanto <strong>Spring Boot 3.4 (Java 21 + Virtual Threads + CDS)</strong> quanto <strong>Quarkus 3.15 (JVM Fast-JAR)</strong> entregam excelente equilibrio. Se a densidade de containers por no Kubernetes (economia de RAM) for a prioridade numero 1, o Quarkus 3 leva vantagem pelo processamento Build-Time."
          },
          serverless: {
            sbJvm: { boot: "2.1 s (Cold Start)", ram: "190 MB", peak: "Alto apos aquecer", di: "Runtime (ou SnapStart CRaC)" },
            qkJvm: { boot: "0.75 s (Cold Start)", ram: "92 MB", peak: "Alto apos aquecer", di: "100% Build-Time (ArC)" },
            native: { boot: "0.018 s (18 ms!)", ram: "32 MB", peak: "Imediato no 1º request", di: "AOT Nativo (Quarkus / Micronaut / Boot AOT)" },
            verdict: "<strong>Recomendacao para Serverless (Scale-to-Zero):</strong> <strong>GraalVM Native Image</strong> (com Quarkus 3, Micronaut 4 ou Spring Boot 3 AOT) ou <strong>AWS Lambda SnapStart (CRaC)</strong> eliminam completamente o Cold Start, respondendo na primeira requisicao em menos de 30 milissegundos!"
          },
          "high-cpu": {
            sbJvm: { boot: "2.2 s", ram: "512+ MB", peak: "Maximo (100% HotSpot C2 + Gen ZGC)", di: "Runtime / AOT" },
            qkJvm: { boot: "0.85 s", ram: "320+ MB", peak: "Maximo (100% HotSpot C2 + Gen ZGC)", di: "Build-Time (ArC)" },
            native: { boot: "0.035 s", ram: "140 MB", peak: "~75% a 85% do JIT C2", di: "Closed-World AOT" },
            verdict: "<strong>Recomendacao para Sistemas 24x7 de Alto Volume:</strong> Execute na <strong>JVM HotSpot Padrao (Java 21/25 LTS) com Generational ZGC</strong>! Para processos que ficam ligados continuamente, o compilador JIT C2 otimiza os caminhos quentes em tempo real superando o binario estatico AOT em throughput sustentado."
          }
        }[w];

        if (cardsEl && data) {
          cardsEl.innerHTML = `
            <div style="background:var(--bg-surface); padding:0.9rem; border-radius:8px; border:1px solid var(--border-subtle);">
              <h5 style="margin:0 0 0.5rem 0; color:var(--cat-creational);">Spring Boot 3.4 (JVM Java 21)</h5>
              <div style="font-size:0.84rem; line-height:1.6;">
                • Startup: <strong>${data.sbJvm.boot}</strong><br/>
                • Memoria RSS: <strong>${data.sbJvm.ram}</strong><br/>
                • Throughput: <strong>${data.sbJvm.peak}</strong><br/>
                • Injecao DI: ${data.sbJvm.di}
              </div>
            </div>
            <div style="background:var(--bg-surface); padding:0.9rem; border-radius:8px; border:1px solid var(--border-subtle);">
              <h5 style="margin:0 0 0.5rem 0; color:var(--cat-structural);">Quarkus 3.15 (JVM Fast-JAR)</h5>
              <div style="font-size:0.84rem; line-height:1.6;">
                • Startup: <strong>${data.qkJvm.boot}</strong><br/>
                • Memoria RSS: <strong>${data.qkJvm.ram}</strong><br/>
                • Throughput: <strong>${data.qkJvm.peak}</strong><br/>
                • Injecao DI: ${data.qkJvm.di}
              </div>
            </div>
            <div style="background:var(--bg-surface); padding:0.9rem; border-radius:8px; border:1px solid var(--border-subtle);">
              <h5 style="margin:0 0 0.5rem 0; color:var(--accent-warning);">GraalVM Native Image (AOT)</h5>
              <div style="font-size:0.84rem; line-height:1.6;">
                • Startup: <strong>${data.native.boot}</strong><br/>
                • Memoria RSS: <strong>${data.native.ram}</strong><br/>
                • Throughput: <strong>${data.native.peak}</strong><br/>
                • Injecao DI: ${data.native.di}
              </div>
            </div>
          `;
        }
        if (recEl && data) {
          recEl.innerHTML = data.verdict;
        }
      }

      workloadEl?.addEventListener("change", updateBenchmark);
      updateBenchmark();
    }
  },

  // 6. Assistente Interativo de Migracao e Retrocompatibilidade (Java 8 -> 11 -> 17 -> 21/25 & Boot 2 -> 3)
  "jv-migration-compat-lab": {
    name: "Assistente de Migracao & Retrocompatibilidade: Java 8/11 -> 21/25 LTS & Boot 2 -> 3 (Cap. 6 a 12)",
    patternId: "jv-cap-10",
    render(container) {
      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Diagnostico Interativo • Retrocompatibilidade & Migracao</span>
            <h4>Plano de Migracao de Versoes do Java e Frameworks Enterprise</h4>
            <p>Selecione a versao de origem do seu sistema legado para gerar a lista exata de pontos de atencao de retrocompatibilidade, dependencias removidas do JDK e mudancas de pacotes (<code>javax.*</code> -> <code>jakarta.*</code>).</p>
          </div>

          <div style="display:flex; flex-wrap:wrap; gap:0.75rem; align-items:center; margin-bottom:1.25rem;">
            <label style="font-size:0.88rem; font-weight:600;">
              Rota de Migracao:
              <select id="jv-mig-route" style="padding:0.45rem 0.7rem; border-radius:6px; border:1px solid var(--border-subtle); background:var(--bg-surface); color:var(--text-primary); margin-left:0.4rem;">
                <option value="8to11">1. Java 8 LTS -> Java 11 LTS (JEP 320 JAXB & JPMS)</option>
                <option value="11to17">2. Java 11 LTS -> Java 17 LTS (JEP 403 Encapsulamento Forte)</option>
                <option value="17to21">3. Java 17 LTS -> Java 21 / 25 LTS (Loom Virtual Threads & UTF-8)</option>
                <option value="boot2to3">4. Spring Boot 2.x / Quarkus 2.x -> 3.x (javax.* para jakarta.*)</option>
              </select>
            </label>
          </div>

          <div id="jv-mig-output" style="background:var(--bg-surface); padding:1rem; border-radius:8px; border:1px solid var(--border-subtle); font-size:0.88rem; line-height:1.65;"></div>
        </div>
      `;

      const routeEl = container.querySelector("#jv-mig-route");
      const outEl = container.querySelector("#jv-mig-output");

      const routes = {
        "8to11": `
          <h5 style="margin:0 0 0.5rem 0; color:var(--cat-creational);">Checklist: Migrando do Java 8 LTS (Major 52) para o Java 11 LTS (Major 55)</h5>
          <ul style="margin:0; padding-left:1.25rem;">
            <li><strong>1. Remocao do Java EE / JAXB do JDK (JEP 320):</strong> Se a aplicacao usa <code>javax.xml.bind</code> (JAXB) ou <code>@PostConstruct</code> (<code>javax.annotation</code>), adicione explicitamente no Maven/Gradle: <code>jakarta.xml.bind:jakarta.xml.bind-api:2.3.3</code> e <code>jakarta.annotation:jakarta.annotation-api:1.3.5</code>.</li>
            <li><strong>2. Fim da PermGen e Flags de GC Antigas:</strong> Remova flags depreciadas como <code>-XX:PermSize</code> ou <code>-XX:+UseConcMarkSweepGC</code>; o <strong>G1GC</strong> agora e o coletor padrao automatico.</li>
            <li><strong>3. ClassLoader nao e mais URLClassLoader:</strong> Codigos que faziam cast <code>(URLClassLoader) ClassLoader.getSystemClassLoader()</code> lancam <code>ClassCastException</code>.</li>
            <li><strong>4. Auditoria Automatica:</strong> Rode <code>jdeps --jdk-internals --multi-release 11 app.jar</code> para listar qualquer chamada a APIs internas da Sun.</li>
          </ul>
        `,
        "11to17": `
          <h5 style="margin:0 0 0.5rem 0; color:var(--cat-structural);">Checklist: Migrando do Java 11 LTS (Major 55) para o Java 17 LTS (Major 61)</h5>
          <ul style="margin:0; padding-left:1.25rem;">
            <li><strong>1. Encapsulamento Forte dos Internos do JDK (JEP 403):</strong> A flag <code>--illegal-access=permit</code> foi desativada! Bibliotecas antigas que fazem reflexao em campos privados de <code>java.lang.*</code> ou <code>java.io.*</code> lancam <code>InaccessibleObjectException</code>. Solucao: atualize Lombok (>= 1.18.22), Mockito, ByteBuddy e Gson, ou adicione <code>--add-opens java.base/java.lang=ALL-UNNAMED</code> se estritamente necessario.</li>
            <li><strong>2. Modernizacao para Records e Switch Expressions:</strong> Substitua DTOs mutaveis e boilerplate por <code>record</code> e <code>sealed interface</code>.</li>
            <li><strong>3. Baseline para Frameworks 3.x:</strong> O Java 17 e o requisito minimo obrigatorio para subir para o Spring Boot 3.x e Quarkus 3.x.</li>
          </ul>
        `,
        "17to21": `
          <h5 style="margin:0 0 0.5rem 0; color:var(--cat-creational);">Checklist: Migrando do Java 17 LTS para o Java 21 / 25 LTS (Major 65 a 69)</h5>
          <ul style="margin:0; padding-left:1.25rem;">
            <li><strong>1. Ativacao de Virtual Threads (JEP 444):</strong> No Spring Boot 3.2+, adicione <code>spring.threads.virtual.enabled=true</code>; no Quarkus 3+, use <code>@RunOnVirtualThread</code>. Evite fazer pool de Virtual Threads e evite <code>ThreadLocal</code> pesado (prefira <code>ScopedValue</code> no Java 25).</li>
            <li><strong>2. Thread Pinning em synchronized:</strong> No Java 21, evite operacoes de I/O longas dentro de blocos <code>synchronized</code> (troque por <code>ReentrantLock</code>). No Java 24/25 (JEP 491), o Pinning de <code>synchronized</code> foi eliminado na propria JVM!</li>
            <li><strong>3. UTF-8 por Padrao (JEP 400):</strong> APIs como <code>FileReader</code> agora usam UTF-8 em todos os sistemas operacionais.</li>
            <li><strong>4. Sequenced Collections (JEP 431):</strong> Se uma classe propria implementava simultaneamente <code>List</code> e <code>Deque</code> com retornos covariantes conflitantes em <code>reversed()</code>, ajuste a assinatura.</li>
          </ul>
        `,
        "boot2to3": `
          <h5 style="margin:0 0 0.5rem 0; color:var(--accent-warning);">Checklist: Migrando Spring Boot 2.7 / Quarkus 2.16 para a Serie 3.x (Jakarta EE 10)</h5>
          <ul style="margin:0; padding-left:1.25rem;">
            <li><strong>1. Transicao javax.* -> jakarta.*:</strong> Renomeie pacotes de especificacoes Java EE (<code>javax.persistence.*</code> -> <code>jakarta.persistence.*</code>, <code>javax.servlet.*</code> -> <code>jakarta.servlet.*</code>, <code>javax.validation.*</code> -> <code>jakarta.validation.*</code>). Mantenha <code>javax.sql.*</code> e <code>javax.crypto.*</code> intactos pois pertencem ao JDK!</li>
            <li><strong>2. AutoConfiguration no Spring Boot 3:</strong> Mova registros de <code>META-INF/spring.factories</code> para <code>META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports</code>.</li>
            <li><strong>3. Spring Security 6:</strong> Substitua <code>WebSecurityConfigurerAdapter</code> por um bean <code>SecurityFilterChain</code> usando Lambda DSL.</li>
            <li><strong>4. Automacao em 1 Comando:</strong> Use <code>quarkus update</code> para projetos Quarkus ou o plugin <code>org.openrewrite.maven:rewrite-maven-plugin</code> para projetos Spring Boot.</li>
          </ul>
        `
      };

      function renderRoute() {
        const key = routeEl?.value || "8to11";
        if (outEl) outEl.innerHTML = routes[key] || routes["8to11"];
      }

      routeEl?.addEventListener("change", renderRoute);
      renderRoute();
    }
  }
};
