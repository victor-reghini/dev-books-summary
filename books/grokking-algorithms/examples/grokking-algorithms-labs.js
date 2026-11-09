/**
 * Laboratorios Interativos, Graficos e Simuladores Visuais para "Entendendo Algoritmos" (Grokking Algorithms)
 * Baseado nas ilustracoes e conceitos didaticos de Aditya Y. Bhargava.
 */

export const grokkingAlgorithmsLabs = {
  // 1. Simulador Interativo de Pesquisa Binaria vs Linear (Cap. 1)
  "ga-binary-search-lab": {
    name: "Simulador Visual: Pesquisa Binaria vs. Pesquisa Simples (Cap. 1)",
    patternId: "ga-cap-1",
    render(container) {
      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Simulador Interativo • Capitulo 1</span>
            <h4>Pesquisa Binaria O(log n) vs. Pesquisa Linear O(n)</h4>
            <p>Escolha um numero alvo ou digite um valor entre 1 e 128. Acompanhe os ponteiros <strong>low</strong>, <strong>high</strong> e <strong>mid</strong> cortando metade dos candidatos a cada rodada.</p>
          </div>

          <div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center; margin-bottom:1.25rem;">
            <label style="font-size:0.9rem; font-weight:600;">
              Numero Alvo (1 a 128):
              <input type="number" id="bs-target-input" min="1" max="128" value="73" style="width:80px; padding:0.4rem 0.6rem; border-radius:6px; border:1px solid var(--border-subtle); margin-left:0.5rem;" />
            </label>
            <button id="bs-step-btn" class="btn btn-primary" style="padding:0.4rem 1rem;">Proximo Passo</button>
            <button id="bs-auto-btn" class="btn btn-outline" style="padding:0.4rem 1rem;">Animar Tudo</button>
            <button id="bs-reset-btn" class="btn btn-outline" style="padding:0.4rem 1rem;">Reiniciar</button>
          </div>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:1rem; margin-bottom:1.25rem;">
            <div style="background:var(--bg-surface); padding:1rem; border-radius:8px; border:1px solid var(--border-subtle);">
              <h5 style="margin:0 0 0.5rem 0; color:var(--cat-creational);">Pesquisa Binaria O(log n)</h5>
              <div id="bs-binary-stats" style="font-size:0.88rem; line-height:1.6;">
                Status: Pronto.<br />
                Intervalo: [0 .. 127]<br />
                Etapas Executadas: <strong>0</strong> (Maximo teórico: 7)
              </div>
            </div>
            <div style="background:var(--bg-surface); padding:1rem; border-radius:8px; border:1px solid var(--border-subtle);">
              <h5 style="margin:0 0 0.5rem 0; color:var(--accent-warning);">Pesquisa Simples O(n)</h5>
              <div id="bs-linear-stats" style="font-size:0.88rem; line-height:1.6;">
                Status: Aguardando.<br />
                Comparacoes Necessarias: <strong>73</strong> operacoes<br />
                Pior Caso: 128 operacoes
              </div>
            </div>
          </div>

          <div id="bs-array-display" style="display:flex; flex-wrap:wrap; gap:4px; max-height:220px; overflow-y:auto; padding:0.75rem; background:var(--bg-primary); border:1px solid var(--border-subtle); border-radius:8px;">
          </div>

          <div id="bs-log" style="margin-top:1rem; font-size:0.85rem; font-family:monospace; background:var(--bg-surface); padding:0.75rem; border-radius:6px; border:1px solid var(--border-subtle); min-height:48px;">
            Clique em 'Proximo Passo' para iniciar a busca binaria pelo numero 73.
          </div>
        </div>
      `;

      let low = 0;
      let high = 127;
      let steps = 0;
      let done = false;
      const array = Array.from({ length: 128 }, (_, i) => i + 1);

      function renderArray(target, midIdx = -1) {
        const arrContainer = container.querySelector("#bs-array-display");
        if (!arrContainer) return;
        arrContainer.innerHTML = array
          .map((val, idx) => {
            const isEliminated = idx < low || idx > high;
            const isMid = idx === midIdx;
            const isTarget = val === target;

            let bg = "var(--bg-surface)";
            let border = "1px solid var(--border-subtle)";
            let opacity = isEliminated ? "0.25" : "1";

            if (isMid) {
              bg = isTarget ? "#10b981" : "#f59e0b";
              border = "2px solid #fff";
            } else if (isTarget && done) {
              bg = "#10b981";
            }

            return `<div style="width:36px; height:28px; display:flex; align-items:center; justify-content:center; font-size:0.72rem; border-radius:4px; background:${bg}; border:${border}; opacity:${opacity}; font-weight:${isMid ? "bold" : "normal"}; color:${isMid ? "#fff" : "inherit"};" title="Indice: ${idx}, Valor: ${val}">${val}</div>`;
          })
          .join("");
      }

      function updateStats(target, midVal = null, msg = "") {
        const binaryStats = container.querySelector("#bs-binary-stats");
        const linearStats = container.querySelector("#bs-linear-stats");
        const log = container.querySelector("#bs-log");

        if (binaryStats) {
          binaryStats.innerHTML = `
            Status: ${done ? "<strong>Alvo Encontrado!</strong>" : "Buscando..."}<br />
            Intervalo Ativo: [${low} .. ${high}] (${Math.max(0, high - low + 1)} itens)<br />
            Etapas Executadas: <strong>${steps}</strong> de no maximo 7
          `;
        }

        if (linearStats) {
          linearStats.innerHTML = `
            Comparacoes na Busca Simples: <strong>${target}</strong> etapas<br />
            Economia com Busca Binaria: <strong>${Math.max(0, target - steps)}</strong> comparacoes poupadas (${target > 0 ? ((1 - steps / target) * 100).toFixed(1) : 0}%)
          `;
        }

        if (log && msg) {
          log.innerHTML = msg;
        }
      }

      function step() {
        if (done) return;
        const targetInput = container.querySelector("#bs-target-input");
        const target = parseInt(targetInput?.value || "73", 10);

        if (low > high) {
          done = true;
          updateStats(target, null, `Fim da busca: elemento ${target} nao existe no array.`);
          return;
        }

        steps++;
        const mid = Math.floor((low + high) / 2);
        const guess = array[mid];

        if (guess === target) {
          done = true;
          renderArray(target, mid);
          updateStats(target, guess, `<strong>Bingo!</strong> Elemento ${target} localizado no indice ${mid} em apenas ${steps} etapas!`);
        } else if (guess > target) {
          const oldHigh = high;
          high = mid - 1;
          renderArray(target, mid);
          updateStats(target, guess, `Etapa ${steps}: Chute no indice ${mid} (valor ${guess}) foi <strong>MUITO ALTO</strong>. Descartada metade superior [${mid} .. ${oldHigh}].`);
        } else {
          const oldLow = low;
          low = mid + 1;
          renderArray(target, mid);
          updateStats(target, guess, `Etapa ${steps}: Chute no indice ${mid} (valor ${guess}) foi <strong>MUITO BAIXO</strong>. Descartada metade inferior [${oldLow} .. ${mid}].`);
        }
      }

      function reset() {
        low = 0;
        high = 127;
        steps = 0;
        done = false;
        const target = parseInt(container.querySelector("#bs-target-input")?.value || "73", 10);
        renderArray(target);
        updateStats(target, null, `Busca reiniciada para o alvo ${target}. Clique em 'Proximo Passo'.`);
      }

      container.querySelector("#bs-step-btn")?.addEventListener("click", step);
      container.querySelector("#bs-reset-btn")?.addEventListener("click", reset);
      container.querySelector("#bs-target-input")?.addEventListener("change", reset);
      container.querySelector("#bs-auto-btn")?.addEventListener("click", () => {
        reset();
        const timer = setInterval(() => {
          if (done) clearInterval(timer);
          else step();
        }, 600);
      });

      reset();
    }
  },

  // 2. Simulador de Ordenacao por Selecao (Cap. 2)
  "ga-selection-sort-lab": {
    name: "Simulador de Ordenacao por Selecao O(n^2) (Cap. 2)",
    patternId: "ga-cap-2",
    render(container) {
      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Simulador Interativo • Capitulo 2</span>
            <h4>Ordenacao por Selecao: Da Memoria Desordenada ao Array Final</h4>
            <p>Acompanhe a varredura linear que busca o menor elemento repetidas vezes. Observe como o numero de operacoes totaliza <strong>n * (n/2) = O(n^2)</strong>.</p>
          </div>

          <div style="display:flex; gap:0.75rem; margin-bottom:1rem;">
            <button id="ss-step-btn" class="btn btn-primary">Proxima Passada</button>
            <button id="ss-reset-btn" class="btn btn-outline">Embaralhar & Reiniciar</button>
          </div>

          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1.25rem; margin-bottom:1rem;">
            <div>
              <h5 style="margin:0 0 0.5rem 0;">Array de Origem (Nao Ordenado):</h5>
              <div id="ss-unsorted-view" style="display:flex; gap:6px; min-height:48px; padding:0.5rem; background:var(--bg-primary); border-radius:6px; border:1px solid var(--border-subtle); align-items:center;"></div>
            </div>
            <div>
              <h5 style="margin:0 0 0.5rem 0; color:var(--cat-creational);">Array de Destino (Ordenado):</h5>
              <div id="ss-sorted-view" style="display:flex; gap:6px; min-height:48px; padding:0.5rem; background:var(--bg-primary); border-radius:6px; border:1px solid var(--border-subtle); align-items:center;"></div>
            </div>
          </div>

          <div id="ss-stats" style="font-size:0.88rem; background:var(--bg-surface); padding:0.75rem; border-radius:6px; border:1px solid var(--border-subtle);">
            Comparacoes acumuladas: <strong>0</strong> | Itens restantes: <strong>6</strong>
          </div>
        </div>
      `;

      let unsorted = [156, 141, 35, 94, 88, 204];
      let sorted = [];
      let totalComparisons = 0;

      function render() {
        const uView = container.querySelector("#ss-unsorted-view");
        const sView = container.querySelector("#ss-sorted-view");
        const stats = container.querySelector("#ss-stats");

        if (uView) {
          uView.innerHTML = unsorted
            .map(
              (n) =>
                `<span style="padding:0.4rem 0.75rem; background:#3b82f6; color:#fff; border-radius:4px; font-weight:bold; font-size:0.85rem;">${n}</span>`
            )
            .join("");
        }
        if (sView) {
          sView.innerHTML = sorted
            .map(
              (n) =>
                `<span style="padding:0.4rem 0.75rem; background:#10b981; color:#fff; border-radius:4px; font-weight:bold; font-size:0.85rem;">${n}</span>`
            )
            .join("");
        }
        if (stats) {
          stats.innerHTML = `
            Comparacoes acumuladas: <strong>${totalComparisons}</strong> |
            Itens no destino: <strong>${sorted.length}</strong> |
            Itens pendentes: <strong>${unsorted.length}</strong>
            ${unsorted.length === 0 ? " • <strong>Ordenacao 100% Concluida em O(n^2)!</strong>" : ""}
          `;
        }
      }

      function step() {
        if (unsorted.length === 0) return;
        totalComparisons += unsorted.length;
        let minIdx = 0;
        for (let i = 1; i < unsorted.length; i++) {
          if (unsorted[i] < unsorted[minIdx]) minIdx = i;
        }
        const [smallest] = unsorted.splice(minIdx, 1);
        sorted.push(smallest);
        render();
      }

      function reset() {
        unsorted = [156, 141, 35, 94, 88, 204].sort(() => Math.random() - 0.5);
        sorted = [];
        totalComparisons = 0;
        render();
      }

      container.querySelector("#ss-step-btn")?.addEventListener("click", step);
      container.querySelector("#ss-reset-btn")?.addEventListener("click", reset);
      render();
    }
  },

  // 3. Simulador da Pilha de Chamada e Recursao (Cap. 3)
  "ga-recursion-stack-lab": {
    name: "Inspetor da Pilha de Chamada (Call Stack) & Fatorial (Cap. 3)",
    patternId: "ga-cap-3",
    render(container) {
      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Simulador Interativo • Capitulo 3</span>
            <h4>Anatomia da Call Stack: Empilhando (Push) e Desempilhando (Pop)</h4>
            <p>Escolha um numero de 1 a 5 para calcular o fatorial recursivo. Observe como cada chamada aloca um bloco na memoria RAM e como o caso-base dispara o desempilhamento.</p>
          </div>

          <div style="display:flex; gap:0.75rem; align-items:center; margin-bottom:1rem;">
            <label style="font-size:0.9rem; font-weight:600;">
              Fatorial de:
              <select id="rec-input" style="padding:0.4rem; border-radius:6px; border:1px solid var(--border-subtle); margin-left:0.5rem;">
                <option value="3">fat(3)</option>
                <option value="4" selected>fat(4)</option>
                <option value="5">fat(5)</option>
              </select>
            </label>
            <button id="rec-step-btn" class="btn btn-primary">Passo a Passo</button>
            <button id="rec-reset-btn" class="btn btn-outline">Reiniciar</button>
          </div>

          <div style="display:grid; grid-template-columns: 240px 1fr; gap:1.25rem;">
            <div>
              <h5 style="margin:0 0 0.5rem 0;">Pilha de Chamada (RAM):</h5>
              <div id="rec-stack-view" style="display:flex; flex-direction:column-reverse; gap:6px; min-height:180px; padding:0.75rem; background:var(--bg-primary); border:2px dashed var(--border-subtle); border-radius:8px;">
              </div>
            </div>
            <div>
              <h5 style="margin:0 0 0.5rem 0;">Registro de Execucao:</h5>
              <div id="rec-log" style="font-size:0.85rem; font-family:monospace; background:var(--bg-surface); padding:0.75rem; border-radius:6px; border:1px solid var(--border-subtle); min-height:160px; line-height:1.6;">
              </div>
            </div>
          </div>
        </div>
      `;

      let n = 4;
      let phase = "push"; // 'push' or 'pop'
      let currentX = 4;
      let stack = [];
      let logMessages = [];
      let accumulator = 1;

      function render() {
        const stackView = container.querySelector("#rec-stack-view");
        const logView = container.querySelector("#rec-log");

        if (stackView) {
          stackView.innerHTML = stack
            .map(
              (item) =>
                `<div style="padding:0.5rem; background:#6366f1; color:#fff; border-radius:6px; font-weight:600; font-size:0.82rem; text-align:center;">
                  Quadro: fat(x = ${item})<br/><small style="opacity:0.8;">pendente: ${item} * fat(${item - 1})</small>
                </div>`
            )
            .join("");
        }

        if (logView) {
          logView.innerHTML = logMessages.join("<br />");
        }
      }

      function step() {
        if (phase === "push") {
          stack.push(currentX);
          logMessages.push(`[PUSH] Empilha fat(${currentX}). Alocando quadro na memoria.`);
          if (currentX === 1) {
            logMessages.push(`<strong>[CASO-BASE ATINGIDO]</strong> fat(1) retorna 1 imediatamente. Iniciando desempilhamento.`);
            phase = "pop";
            accumulator = 1;
          } else {
            currentX--;
          }
        } else if (phase === "pop") {
          if (stack.length > 0) {
            const popped = stack.pop();
            accumulator *= popped;
            logMessages.push(`[POP] Desempilha fat(${popped}). Calculo: ${popped} * resultado anterior = <strong>${accumulator}</strong>.`);
            if (stack.length === 0) {
              logMessages.push(`<strong>[FIM]</strong> Pilha limpa. Resultado final: fat(${n}) = <strong>${accumulator}</strong>.`);
            }
          }
        }
        render();
      }

      function reset() {
        n = parseInt(container.querySelector("#rec-input")?.value || "4", 10);
        currentX = n;
        phase = "push";
        stack = [];
        logMessages = [`Iniciando calculo recursivo de fat(${n})...`];
        accumulator = 1;
        render();
      }

      container.querySelector("#rec-step-btn")?.addEventListener("click", step);
      container.querySelector("#rec-reset-btn")?.addEventListener("click", reset);
      container.querySelector("#rec-input")?.addEventListener("change", reset);
      reset();
    }
  },

  // 4. Simulador de Quicksort e Particionamento D&C (Cap. 4)
  "ga-quicksort-lab": {
    name: "Particionamento D&C e Quicksort O(n log n) (Cap. 4)",
    patternId: "ga-cap-4",
    render(container) {
      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Simulador Interativo • Capitulo 4</span>
            <h4>Particionamento Quicksort: Pivo, Menores e Maiores</h4>
            <p>Veja como o elemento pivo divide um array em dois subarrays independentes. A escolha equilibrada do pivo garante arvore de altura <strong>log2(n)</strong>.</p>
          </div>

          <div style="margin-bottom:1rem;">
            <button id="qs-step-btn" class="btn btn-primary">Particionar Exemplo</button>
            <button id="qs-shuffle-btn" class="btn btn-outline">Novo Array</button>
          </div>

          <div id="qs-display" style="background:var(--bg-primary); padding:1rem; border-radius:8px; border:1px solid var(--border-subtle); margin-bottom:1rem;">
          </div>

          <div id="qs-explanation" style="font-size:0.88rem; line-height:1.6; background:var(--bg-surface); padding:0.75rem; border-radius:6px; border:1px solid var(--border-subtle);">
            Clique em 'Particionar Exemplo' para ver a divisao em acao.
          </div>
        </div>
      `;

      let arr = [33, 15, 10, 42, 8, 27];

      function renderPartition() {
        const disp = container.querySelector("#qs-display");
        const exp = container.querySelector("#qs-explanation");
        if (!disp) return;

        const pivot = arr[0];
        const rest = arr.slice(1);
        const less = rest.filter((x) => x <= pivot);
        const greater = rest.filter((x) => x > pivot);

        disp.innerHTML = `
          <div style="margin-bottom:0.75rem; font-size:0.85rem; color:var(--text-muted);">Array Inicial: [ ${arr.join(", ")} ]</div>
          <div style="display:flex; align-items:center; gap:0.75rem; flex-wrap:wrap;">
            <div style="padding:0.75rem; background:#3b82f622; border:1px solid #3b82f6; border-radius:6px;">
              <span style="font-size:0.75rem; font-weight:bold; color:#3b82f6;">SUBARRAY MENORES (<= ${pivot}):</span>
              <div style="font-weight:bold; margin-top:4px;">[ ${less.join(", ") || "vazio"} ]</div>
            </div>

            <div style="padding:0.75rem; background:#f59e0b22; border:2px solid #f59e0b; border-radius:6px; text-align:center;">
              <span style="font-size:0.75rem; font-weight:bold; color:#f59e0b;">PIVO ELEITO:</span>
              <div style="font-size:1.1rem; font-weight:bold; margin-top:2px;">${pivot}</div>
            </div>

            <div style="padding:0.75rem; background:#10b98122; border:1px solid #10b981; border-radius:6px;">
              <span style="font-size:0.75rem; font-weight:bold; color:#10b981;">SUBARRAY MAIORES (> ${pivot}):</span>
              <div style="font-weight:bold; margin-top:4px;">[ ${greater.join(", ") || "vazio"} ]</div>
            </div>
          </div>
        `;

        if (exp) {
          exp.innerHTML = `
            <strong>Recursao D&C:</strong> O quicksort agora e invocado recursivamente para [${less.join(", ")}] e [${greater.join(", ")}].<br />
            Formula de combinacao: <code>quicksort(menores) + [${pivot}] + quicksort(maiores)</code>.<br />
            Como os dois subarrays sao menores, o algoritmo converge rapidamente para o caso-base (arrays de tamanho 0 ou 1).
          `;
        }
      }

      function shuffle() {
        arr = Array.from({ length: 6 }, () => Math.floor(Math.random() * 90) + 10);
        renderPartition();
      }

      container.querySelector("#qs-step-btn")?.addEventListener("click", renderPartition);
      container.querySelector("#qs-shuffle-btn")?.addEventListener("click", shuffle);
      renderPartition();
    }
  },

  // 5. Tabela Hash e Simulador de Fator de Carga (Cap. 5)
  "ga-hash-table-lab": {
    name: "Tabela Hash, Colisoes & Fator de Carga (Cap. 5)",
    patternId: "ga-cap-5",
    render(container) {
      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Simulador Interativo • Capitulo 5</span>
            <h4>Tabela Hash: Buckets, Encadeamento e Alerta de Redimensionamento</h4>
            <p>Insira produtos e precos na tabela. Acompanhe as colisoes resolvidas por lista vinculada e o <strong>fator de carga (itens / slots)</strong>. Ao ultrapassar 0.7, a tabela dobra de tamanho!</p>
          </div>

          <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:1rem;">
            <input type="text" id="ht-key-input" placeholder="Chave (ex: maca)" value="maca" style="padding:0.4rem; border-radius:6px; border:1px solid var(--border-subtle); width:130px;" />
            <input type="number" id="ht-val-input" placeholder="Preco" value="1.50" step="0.25" style="padding:0.4rem; border-radius:6px; border:1px solid var(--border-subtle); width:90px;" />
            <button id="ht-add-btn" class="btn btn-primary">Inserir Chave O(1)</button>
            <button id="ht-seed-btn" class="btn btn-outline">Inserir Lote Demo</button>
            <button id="ht-reset-btn" class="btn btn-outline">Limpar</button>
          </div>

          <div id="ht-meter-box" style="margin-bottom:1rem; padding:0.75rem; background:var(--bg-surface); border-radius:6px; border:1px solid var(--border-subtle);">
          </div>

          <div id="ht-buckets-view" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:0.75rem;">
          </div>
        </div>
      `;

      let capacity = 4;
      let buckets = Array.from({ length: capacity }, () => []);

      function hash(str) {
        let code = 0;
        for (let i = 0; i < str.length; i++) code += str.charCodeAt(i);
        return code % capacity;
      }

      function render() {
        const meter = container.querySelector("#ht-meter-box");
        const bView = container.querySelector("#ht-buckets-view");

        const totalItems = buckets.reduce((acc, b) => acc + b.length, 0);
        const loadFactor = totalItems / capacity;
        const isOverloaded = loadFactor > 0.7;

        if (meter) {
          meter.innerHTML = `
            <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:bold; margin-bottom:0.3rem;">
              <span>Fator de Carga: ${(loadFactor * 100).toFixed(1)}% (${totalItems} itens em ${capacity} slots)</span>
              <span style="color:${isOverloaded ? "var(--accent-warning)" : "var(--cat-creational)"};">
                ${isOverloaded ? "Alerta: > 70%! Redimensionamento recomendado!" : "Saudavel (<= 70%)"}
              </span>
            </div>
            <div style="height:10px; background:var(--bg-primary); border-radius:5px; overflow:hidden;">
              <div style="width:${Math.min(100, loadFactor * 100)}%; height:100%; background:${isOverloaded ? "#f59e0b" : "#10b981"}; transition:width 0.3s;"></div>
            </div>
          `;
        }

        if (bView) {
          bView.innerHTML = buckets
            .map(
              (bucket, idx) => `
              <div style="background:var(--bg-primary); border:1px solid var(--border-subtle); border-radius:6px; padding:0.6rem;">
                <div style="font-size:0.75rem; font-weight:bold; color:var(--text-muted); margin-bottom:0.4rem;">Slot #${idx} (${bucket.length} itens)</div>
                <div style="display:flex; flex-direction:column; gap:4px;">
                  ${
                    bucket.length === 0
                      ? `<span style="font-size:0.75rem; color:var(--text-subtle); font-style:italic;">Vazio</span>`
                      : bucket
                          .map(
                            ([k, v]) =>
                              `<div style="font-size:0.8rem; background:var(--bg-surface); padding:0.25rem 0.5rem; border-radius:4px; border:1px solid var(--border-subtle); display:flex; justify-content:space-between;">
                                <strong>${k}</strong> <span>R$ ${parseFloat(v).toFixed(2)}</span>
                              </div>`
                          )
                          .join("")
                  }
                </div>
              </div>`
            )
            .join("");
        }
      }

      function resize() {
        const oldBuckets = buckets;
        capacity *= 2;
        buckets = Array.from({ length: capacity }, () => []);
        for (const bucket of oldBuckets) {
          for (const [k, v] of bucket) {
            const idx = hash(k);
            buckets[idx].push([k, v]);
          }
        }
      }

      function addKey(k, v) {
        if (!k) return;
        const idx = hash(k);
        // atualiza se ja existir
        const existing = buckets[idx].find((item) => item[0] === k);
        if (existing) {
          existing[1] = v;
        } else {
          buckets[idx].push([k, v]);
        }

        const totalItems = buckets.reduce((acc, b) => acc + b.length, 0);
        if (totalItems / capacity > 0.7) {
          resize();
        }
        render();
      }

      container.querySelector("#ht-add-btn")?.addEventListener("click", () => {
        const k = container.querySelector("#ht-key-input")?.value.trim();
        const v = container.querySelector("#ht-val-input")?.value;
        addKey(k, v);
      });

      container.querySelector("#ht-seed-btn")?.addEventListener("click", () => {
        addKey("abacate", 3.0);
        addKey("leite", 4.5);
        addKey("laranja", 2.2);
        addKey("cenoura", 1.8);
      });

      container.querySelector("#ht-reset-btn")?.addEventListener("click", () => {
        capacity = 4;
        buckets = Array.from({ length: capacity }, () => []);
        render();
      });

      addKey("maca", 1.5);
    }
  },

  // 6. Simulador de BFS e Rede de Amigos (Cap. 6)
  "ga-bfs-graph-lab": {
    name: "Rede Social: Vendedor de Manga & Pesquisa em Largura (Cap. 6)",
    patternId: "ga-cap-6",
    render(container) {
      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Simulador Interativo • Capitulo 6</span>
            <h4>Pesquisa em Largura (BFS): Fila FIFO e Menor Distancia em Saltos</h4>
            <p>Voce procura um vendedor de manga (alguem cujo nome termina com 'm'). Acompanhe o enfileiramento das conexoes de 1º grau antes das de 2º grau e o registro no conjunto de visitados.</p>
          </div>

          <div style="display:flex; gap:0.75rem; margin-bottom:1rem;">
            <button id="bfs-step-btn" class="btn btn-primary">Desenfileirar Proximo (FIFO)</button>
            <button id="bfs-reset-btn" class="btn btn-outline">Reiniciar Busca</button>
          </div>

          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem; margin-bottom:1rem;">
            <div style="background:var(--bg-surface); padding:0.75rem; border-radius:6px; border:1px solid var(--border-subtle);">
              <h5 style="margin:0 0 0.4rem 0; color:var(--cat-creational);">Fila de Espera FIFO:</h5>
              <div id="bfs-queue-view" style="display:flex; gap:6px; flex-wrap:wrap; min-height:36px; align-items:center;"></div>
            </div>
            <div style="background:var(--bg-surface); padding:0.75rem; border-radius:6px; border:1px solid var(--border-subtle);">
              <h5 style="margin:0 0 0.4rem 0; color:var(--text-muted);">Conjunto de Visitados:</h5>
              <div id="bfs-checked-view" style="display:flex; gap:6px; flex-wrap:wrap; min-height:36px; align-items:center;"></div>
            </div>
          </div>

          <div id="bfs-log" style="font-size:0.85rem; font-family:monospace; background:var(--bg-primary); padding:0.75rem; border-radius:6px; border:1px solid var(--border-subtle); min-height:48px;">
            Clique no botao para desenfileirar o primeiro candidato.
          </div>
        </div>
      `;

      const graph = {
        Voce: ["Alice", "Bob", "Claire"],
        Bob: ["Anuj", "Peggy"],
        Alice: ["Peggy"],
        Claire: ["Thom", "Jonny"],
        Anuj: [],
        Peggy: [],
        Thom: [],
        Jonny: []
      };

      let queue = [...graph["Voce"]];
      let checked = new Set(["Voce"]);
      let found = null;

      function render(msg = "") {
        const qView = container.querySelector("#bfs-queue-view");
        const cView = container.querySelector("#bfs-checked-view");
        const log = container.querySelector("#bfs-log");

        if (qView) {
          qView.innerHTML =
            queue.length === 0
              ? `<span style="font-size:0.8rem; color:var(--text-subtle);">Fila Vazia</span>`
              : queue
                  .map(
                    (p, idx) =>
                      `<span style="padding:0.25rem 0.5rem; background:#3b82f6; color:#fff; border-radius:4px; font-size:0.8rem; font-weight:${idx === 0 ? "bold" : "normal"};">${p}${idx === 0 ? " (topo)" : ""}</span>`
                  )
                  .join("");
        }

        if (cView) {
          cView.innerHTML = Array.from(checked)
            .map(
              (p) =>
                `<span style="padding:0.25rem 0.5rem; background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:4px; font-size:0.8rem;">${p}</span>`
            )
            .join("");
        }

        if (log && msg) {
          log.innerHTML = msg;
        }
      }

      function step() {
        if (found) return;
        if (queue.length === 0) {
          render("Busca encerrada: nenhum vendedor de manga encontrado.");
          return;
        }

        const person = queue.shift();
        if (checked.has(person)) {
          render(`Pessoa '${person}' ja foi visitada anteriormente. Ignorando para evitar ciclos.`);
          return;
        }

        checked.add(person);

        if (person.endsWith("m")) {
          found = person;
          render(`<strong>VITORIA!</strong> ${person} e um vendedor de mangas! Localizado pelo caminho mais curto em saltos via BFS!`);
        } else {
          const neighbors = graph[person] || [];
          for (const n of neighbors) {
            if (!checked.has(n)) queue.push(n);
          }
          render(`Avaliado: '${person}' (nao vende manga). Amigos adicionados ao final da fila: [${neighbors.join(", ") || "nenhum"}].`);
        }
      }

      function reset() {
        queue = [...graph["Voce"]];
        checked = new Set(["Voce"]);
        found = null;
        render("Busca reiniciada. Amigos diretos de 'Voce' enfileirados: Alice, Bob, Claire.");
      }

      container.querySelector("#bfs-step-btn")?.addEventListener("click", step);
      container.querySelector("#bfs-reset-btn")?.addEventListener("click", reset);
      reset();
    }
  },

  // 7. Simulador de Algoritmo de Dijkstra (Cap. 7)
  "ga-dijkstra-lab": {
    name: "Algoritmo de Dijkstra: Caminho Mais Barato no Grafo Ponderado (Cap. 7)",
    patternId: "ga-cap-7",
    render(container) {
      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Simulador Interativo • Capitulo 7</span>
            <h4>Algoritmo de Dijkstra: Tabela de Custos e Pais (Parents)</h4>
            <p>Acompanhe a troca do Livro de Musica pelo Piano pelo menor custo acumulado. Observe as 4 etapas: achar o mais barato, atualizar vizinhos e marcar como processado.</p>
          </div>

          <div style="display:flex; gap:0.75rem; margin-bottom:1rem;">
            <button id="djk-step-btn" class="btn btn-primary">Processar No Mais Barato</button>
            <button id="djk-reset-btn" class="btn btn-outline">Reiniciar</button>
          </div>

          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem; margin-bottom:1rem;">
            <div style="background:var(--bg-surface); padding:0.75rem; border-radius:6px; border:1px solid var(--border-subtle);">
              <h5 style="margin:0 0 0.5rem 0;">Tabela de Custos:</h5>
              <div id="djk-costs-table" style="font-size:0.85rem;"></div>
            </div>
            <div style="background:var(--bg-surface); padding:0.75rem; border-radius:6px; border:1px solid var(--border-subtle);">
              <h5 style="margin:0 0 0.5rem 0;">Tabela de Pais:</h5>
              <div id="djk-parents-table" style="font-size:0.85rem;"></div>
            </div>
          </div>

          <div id="djk-log" style="font-size:0.85rem; font-family:monospace; background:var(--bg-primary); padding:0.75rem; border-radius:6px; border:1px solid var(--border-subtle);">
            Clique em 'Processar No Mais Barato' para iniciar.
          </div>
        </div>
      `;

      const graph = {
        Inicio: { Disco: 5, Poster: 0 },
        Disco: { Guitarra: 15, Bateria: 20 },
        Poster: { Guitarra: 30, Bateria: 35 },
        Guitarra: { Piano: 20 },
        Bateria: { Piano: 10 },
        Piano: {}
      };

      let costs = { Disco: 5, Poster: 0, Guitarra: Infinity, Bateria: Infinity, Piano: Infinity };
      let parents = { Disco: "Inicio", Poster: "Inicio", Guitarra: null, Bateria: null, Piano: null };
      let processed = [];

      function render(msg = "") {
        const cTable = container.querySelector("#djk-costs-table");
        const pTable = container.querySelector("#djk-parents-table");
        const log = container.querySelector("#djk-log");

        if (cTable) {
          cTable.innerHTML = Object.entries(costs)
            .map(
              ([node, cost]) => `
              <div style="display:flex; justify-content:space-between; padding:3px 0; border-bottom:1px solid var(--border-subtle); ${processed.includes(node) ? "opacity:0.5;" : ""}">
                <span>${node} ${processed.includes(node) ? "✓" : ""}</span>
                <strong>${cost === Infinity ? "∞" : "R$ " + cost}</strong>
              </div>`
            )
            .join("");
        }

        if (pTable) {
          pTable.innerHTML = Object.entries(parents)
            .map(
              ([node, parent]) => `
              <div style="display:flex; justify-content:space-between; padding:3px 0; border-bottom:1px solid var(--border-subtle);">
                <span>${node}</span>
                <span style="color:var(--cat-creational); font-weight:600;">${parent || "-"}</span>
              </div>`
            )
            .join("");
        }

        if (log && msg) log.innerHTML = msg;
      }

      function findLowestCostNode() {
        let lowest = Infinity;
        let lowestNode = null;
        for (const node in costs) {
          const cost = costs[node];
          if (cost < lowest && !processed.includes(node)) {
            lowest = cost;
            lowestNode = node;
          }
        }
        return lowestNode;
      }

      function step() {
        const node = findLowestCostNode();
        if (!node || node === "Piano") {
          render(`<strong>Fim do Algoritmo de Dijkstra!</strong> Custo final para o Piano: <strong>R$ ${costs["Piano"]}</strong>. Rota otima: Inicio -> Disco -> Guitarra -> Piano.`);
          return;
        }

        const cost = costs[node];
        const neighbors = graph[node];
        for (const n in neighbors) {
          const newCost = cost + neighbors[n];
          if (costs[n] > newCost) {
            costs[n] = newCost;
            parents[n] = node;
          }
        }
        processed.push(node);
        render(`Processado no '${node}' (custo R$ ${cost}). Vizinhos avaliados e custos relaxados.`);
      }

      function reset() {
        costs = { Disco: 5, Poster: 0, Guitarra: Infinity, Bateria: Infinity, Piano: Infinity };
        parents = { Disco: "Inicio", Poster: "Inicio", Guitarra: null, Bateria: null, Piano: null };
        processed = [];
        render("Estado reiniciado. Custos diretos do Inicio definidos.");
      }

      container.querySelector("#djk-step-btn")?.addEventListener("click", step);
      container.querySelector("#djk-reset-btn")?.addEventListener("click", reset);
      reset();
    }
  },

  // 8. Matriz de Programacao Dinamica (Cap. 9)
  "ga-knapsack-dp-lab": {
    name: "Grade Interativa da Mochila 0/1 (Programacao Dinamica) (Cap. 9)",
    patternId: "ga-cap-9",
    render(container) {
      container.innerHTML = `
        <div class="lab-card">
          <div class="lab-header">
            <span class="lab-badge">Simulador Interativo • Capitulo 9</span>
            <h4>Programacao Dinamica (DP): Grade da Mochila 0/1</h4>
            <p>Capacidade maxima de 4 lb. Preencha a grade linha por linha e observe como a formula <code>max(acima, item + acima[restante])</code> resolve o problema em tempo polinomial.</p>
          </div>

          <div style="margin-bottom:1rem;">
            <button id="dp-step-btn" class="btn btn-primary">Preencher Proxima Linha</button>
            <button id="dp-reset-btn" class="btn btn-outline">Limpar Grade</button>
          </div>

          <div style="overflow-x:auto; margin-bottom:1rem;">
            <table id="dp-table" style="width:100%; border-collapse:collapse; font-size:0.85rem; text-align:center;">
              <thead>
                <tr style="background:var(--bg-surface); border-bottom:2px solid var(--border-subtle);">
                  <th style="padding:8px; text-align:left;">Item (Peso / Valor)</th>
                  <th style="padding:8px;">1 lb</th>
                  <th style="padding:8px;">2 lb</th>
                  <th style="padding:8px;">3 lb</th>
                  <th style="padding:8px;">4 lb</th>
                </tr>
              </thead>
              <tbody id="dp-body">
              </tbody>
            </table>
          </div>

          <div id="dp-log" style="font-size:0.85rem; font-family:monospace; background:var(--bg-surface); padding:0.75rem; border-radius:6px; border:1px solid var(--border-subtle);">
            Clique em 'Preencher Proxima Linha' para calcular o valor dos itens.
          </div>
        </div>
      `;

      const items = [
        { name: "Violao", weight: 1, val: 1500 },
        { name: "Som", weight: 4, val: 3000 },
        { name: "Notebook", weight: 3, val: 2000 }
      ];

      let currentRow = 0;
      const grid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ];

      function renderTable(msg = "") {
        const tbody = container.querySelector("#dp-body");
        const log = container.querySelector("#dp-log");

        if (tbody) {
          tbody.innerHTML = items
            .map((item, rowIdx) => {
              const isFilled = rowIdx < currentRow;
              return `
              <tr style="border-bottom:1px solid var(--border-subtle); background:${rowIdx === currentRow - 1 ? "#3b82f615" : "transparent"};">
                <td style="padding:8px; text-align:left; font-weight:600;">${item.name} (${item.weight}lb, R$ ${item.val})</td>
                ${[0, 1, 2, 3]
                  .map((col) => {
                    const val = grid[rowIdx][col];
                    const text = isFilled ? `R$ ${val}` : "-";
                    return `<td style="padding:8px; font-weight:${val > 0 ? "bold" : "normal"}; color:${rowIdx === 2 && col === 3 && isFilled ? "#10b981" : "inherit"};">${text}</td>`;
                  })
                  .join("")}
              </tr>`;
            })
            .join("");
        }

        if (log && msg) log.innerHTML = msg;
      }

      function step() {
        if (currentRow >= items.length) {
          renderTable("Grade completamente preenchida! Solucao otima: <strong>R$ 3.500</strong> com Violao + Notebook.");
          return;
        }

        const item = items[currentRow];
        for (let col = 0; col < 4; col++) {
          const cap = col + 1;
          const prev = currentRow > 0 ? grid[currentRow - 1][col] : 0;
          if (item.weight <= cap) {
            const remaining = cap - item.weight;
            const remainingVal = remaining > 0 && currentRow > 0 ? grid[currentRow - 1][remaining - 1] : 0;
            grid[currentRow][col] = Math.max(prev, item.val + remainingVal);
          } else {
            grid[currentRow][col] = prev;
          }
        }
        currentRow++;
        renderTable(`Linha '${item.name}' preenchida avaliando capacidades de 1lb a 4lb.`);
      }

      function reset() {
        currentRow = 0;
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 4; c++) grid[r][c] = 0;
        }
        renderTable("Grade limpa. Clique em 'Preencher Proxima Linha'.");
      }

      container.querySelector("#dp-step-btn")?.addEventListener("click", step);
      container.querySelector("#dp-reset-btn")?.addEventListener("click", reset);
      renderTable();
    }
  }
};
