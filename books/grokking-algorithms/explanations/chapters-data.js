/**
 * Base de Dados Completa dos 11 Capitulos de "Entendendo Algoritmos" (Aditya Y. Bhargava)
 * Estruturada no mesmo molde arquitetural: Intencao, Problema/Motivacao,
 * Solucao, Participantes/Conceitos, Aplicabilidade, Pros/Contras, Codigo Sujo vs. Java/TS/Python e Labs.
 */

import { part1Chapters } from "./part1-foundations.js";
import { part2Chapters } from "./part2-divide-hash.js";
import { part3Chapters } from "./part3-graphs.js";
import { part4Chapters } from "./part4-advanced.js";
import { grokkingAlgorithmsExamples } from "../examples/index.js";

const rawChapters = [
  ...part1Chapters,
  ...part2Chapters,
  ...part3Chapters,
  ...part4Chapters
];

const chapterMetaMap = {
  "ga-cap-1": {
    code: "A01",
    category: "foundations",
    partLabel: "Parte 1 • Fundamentos",
    scope: "pesquisa-complexidade",
    gofPage: 19,
    playgroundId: "ga-binary-search-lab",
    aliases: ["Pesquisa Binaria", "Notacao Big O", "Logaritmos", "Caixeiro-Viajante"],
    relatedPatterns: ["ga-cap-2", "ga-cap-4"],
    realWorldUses: [
      "Consultas indexadas em bancos de dados relacionais (B-Trees / binary search).",
      "Git bisect para localizar commits que introduziram bugs em histórico de versoes.",
      "Busca de simbolos e funcoes em tabelas de bibliotecas compiladas."
    ],
    typescript: `export function binarySearch<T>(list: readonly T[], item: T): number | null {
  let low = 0;
  let high = list.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const guess = list[mid];

    if (guess === item) {
      return mid;
    }
    if (guess > item) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return null;
}`,
    python: `def pesquisa_binaria(lista, item):
    baixo = 0
    alto = len(lista) - 1

    while baixo <= alto:
        meio = (baixo + alto) // 2
        chute = lista[meio]
        if chute == item:
            return meio
        if chute > item:
            alto = meio - 1
        else:
            baixo = meio + 1
    return None`
  },

  "ga-cap-2": {
    code: "A02",
    category: "foundations",
    partLabel: "Parte 1 • Fundamentos",
    scope: "memoria-ordenacao",
    gofPage: 45,
    playgroundId: "ga-selection-sort-lab",
    aliases: ["Selection Sort", "Arrays vs Listas Encadeadas", "Acesso Aleatorio", "Gavetas de Memoria"],
    relatedPatterns: ["ga-cap-1", "ga-cap-4"],
    realWorldUses: [
      "Compreensao fundamental de alocacao contigua (arrays) vs alocacao dispersa (linked lists).",
      "Sistemas embarcados com memoria ultra restrita onde mover poucos elementos compensa simplicidade de codigo.",
      "Ordenacao de pequenas colecoes estaticas."
    ],
    typescript: `export function selectionSort<T>(arr: readonly T[]): T[] {
  const items = [...arr];
  const sorted: T[] = [];

  while (items.length > 0) {
    let smallestIdx = 0;
    for (let i = 1; i < items.length; i++) {
      if (items[i] < items[smallestIdx]) {
        smallestIdx = i;
      }
    }
    sorted.push(items.splice(smallestIdx, 1)[0]);
  }

  return sorted;
}`,
    python: `def busca_menor(arr):
    menor = arr[0]
    menor_indice = 0
    for i in range(1, len(arr)):
        if arr[i] < menor:
            menor = arr[i]
            menor_indice = i
    return menor_indice

def ordenacaopor_selecao(arr):
    novo_arr = []
    copia = list(arr)
    for _ in range(len(copia)):
        menor = busca_menor(copia)
        novo_arr.append(copia.pop(menor))
    return novo_arr`
  },

  "ga-cap-3": {
    code: "A03",
    category: "foundations",
    partLabel: "Parte 1 • Fundamentos",
    scope: "recursao-callstack",
    gofPage: 63,
    playgroundId: "ga-recursion-stack-lab",
    aliases: ["Recursao", "Caso-Base", "Caso Recursivo", "Pilha de Chamada", "Stack Overflow"],
    relatedPatterns: ["ga-cap-4", "ga-cap-6"],
    realWorldUses: [
      "Navegacao e travessia de estruturas em arvore (DOM do navegador, sistema de arquivos em pastas).",
      "Processamento de estruturas aninhadas JSON e analisadores sintaticos (parsers).",
      "Algoritmos classicos de backtracking (sudoku, resolvedor de labirintos)."
    ],
    typescript: `export function factorial(x: number): number {
  if (x <= 1) {
    return 1; // Caso-base obrigatorio
  }
  return x * factorial(x - 1); // Caso recursivo
}

export function countdown(i: number): void {
  console.log(i);
  if (i <= 0) return; // Caso-base
  countdown(i - 1); // Caso recursivo
}`,
    python: `def fat(x):
    if x <= 1:
        return 1
    else:
        return x * fat(x - 1)

def regressiva(i):
    print(i)
    if i <= 1:
        return
    else:
        regressiva(i - 1)`
  },

  "ga-cap-4": {
    code: "A04",
    category: "divide-hash",
    partLabel: "Parte 2 • Dividir para Conquistar",
    scope: "dividir-conquistar",
    gofPage: 79,
    playgroundId: "ga-quicksort-lab",
    aliases: ["Quicksort", "Dividir para Conquistar (D&C)", "Algoritmo de Euclides", "Particionamento"],
    relatedPatterns: ["ga-cap-1", "ga-cap-2", "ga-cap-3"],
    realWorldUses: [
      "Implementacao interna do Array.prototype.sort e qsort em C/C++.",
      "Processamento distribuido de ordenacao em pipelines de Big Data.",
      "Algoritmos de selecao rapida (Quickselect) para encontrar a mediana em O(n)."
    ],
    typescript: `export function quicksort(arr: readonly number[]): number[] {
  if (arr.length < 2) {
    return [...arr]; // Caso-base: arrays com 0 ou 1 elemento ja estao ordenados
  }

  const pivot = arr[0];
  const rest = arr.slice(1);
  const less = rest.filter((item) => item <= pivot);
  const greater = rest.filter((item) => item > pivot);

  return [...quicksort(less), pivot, ...quicksort(greater)];
}`,
    python: `def quicksort(arr):
    if len(arr) < 2:
        return arr
    else:
        pivo = arr[0]
        menores = [i for i in arr[1:] if i <= pivo]
        maiores = [i for i in arr[1:] if i > pivo]
        return quicksort(menores) + [pivo] + quicksort(maiores)`
  },

  "ga-cap-5": {
    code: "A05",
    category: "divide-hash",
    partLabel: "Parte 2 • Tabelas Hash",
    scope: "hashing-cache",
    gofPage: 105,
    playgroundId: "ga-hash-table-lab",
    aliases: ["Tabela Hash", "Hash Map", "Fator de Carga", "Colisoes", "Cache Web"],
    relatedPatterns: ["ga-cap-6", "ga-cap-11"],
    realWorldUses: [
      "Camadas de caching em memoria (Redis, Memcached) e caches de navegadores.",
      "Tabelas de simbolos de compiladores e interpretadores de linguagens.",
      "Roteamento de URLs e resolucao DNS em servicos de rede de alta velocidade."
    ],
    typescript: `export class SimpleHashTable<V> {
  private buckets: Array<Array<[string, V]>>;
  private capacity: number;
  private size: number = 0;

  constructor(initialCapacity = 8) {
    this.capacity = initialCapacity;
    this.buckets = Array.from({ length: initialCapacity }, () => []);
  }

  private hash(key: string): number {
    let hashVal = 0;
    for (let i = 0; i < key.length; i++) {
      hashVal = (hashVal << 5) - hashVal + key.charCodeAt(i);
      hashVal |= 0;
    }
    return Math.abs(hashVal) % this.capacity;
  }

  public set(key: string, value: V): void {
    const idx = this.hash(key);
    const bucket = this.buckets[idx];
    const found = bucket.find((entry) => entry[0] === key);
    if (found) {
      found[1] = value;
    } else {
      bucket.push([key, value]);
      this.size++;
      if (this.size / this.capacity > 0.7) {
        this.resize();
      }
    }
  }

  public get(key: string): V | undefined {
    const idx = this.hash(key);
    const entry = this.buckets[idx].find((e) => e[0] === key);
    return entry ? entry[1] : undefined;
  }

  private resize(): void {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.size = 0;
    for (const b of oldBuckets) {
      for (const [k, v] of b) {
        this.set(k, v);
      }
    }
  }
}`,
    python: `voted = {}

def check_voter(name):
    if voted.get(name):
        print("Mande embora!")
    else:
        voted[name] = True
        print("Deixe votar!")

# Exemplo de Cache Web
cache = {}

def get_page(url):
    if cache.get(url):
        return cache[url]
    else:
        data = get_data_from_server(url)
        cache[url] = data
        return data`
  },

  "ga-cap-6": {
    code: "A06",
    category: "graphs",
    partLabel: "Parte 3 • Algoritmos em Grafos",
    scope: "grafos-bfs",
    gofPage: 129,
    playgroundId: "ga-bfs-graph-lab",
    aliases: ["Pesquisa em Largura", "BFS", "Grafos", "Fila FIFO", "Vendedor de Mangas"],
    relatedPatterns: ["ga-cap-7", "ga-cap-8"],
    realWorldUses: [
      "Motores de rastreamento web (web crawlers) explorando links nivel por nivel.",
      "Redes sociais calculando graus de separacao e sugestoes de conexao de 2º grau.",
      "Localizadores de caminho mais curto em jogos e tabuleiros de xadrez/damas."
    ],
    typescript: `export function breadthFirstSearch(
  graph: Record<string, readonly string[]>,
  start: string,
  isTarget: (node: string) => boolean
): string | null {
  const queue: string[] = [...(graph[start] || [])];
  const visited = new Set<string>([start]);

  while (queue.length > 0) {
    const person = queue.shift()!;
    if (!visited.has(person)) {
      if (isTarget(person)) {
        return person; // Encontrou o alvo mais proximo em saltos
      }
      visited.add(person);
      for (const neighbor of graph[person] || []) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
        }
      }
    }
  }

  return null;
}`,
    python: `from collections import deque

def pesquisa_vendedor(grafo, inicio):
    fila_de_pesquisa = deque()
    fila_de_pesquisa += grafo[inicio]
    verificados = set([inicio])

    while fila_de_pesquisa:
        pessoa = fila_de_pesquisa.popleft()
        if pessoa not in verificados:
            if pessoa_e_vendedora(pessoa):
                print(f"{pessoa} e um vendedor de manga!")
                return True
            else:
                fila_de_pesquisa += grafo.get(pessoa, [])
                verificados.add(pessoa)
    return False

def pessoa_e_vendedora(nome):
    return nome.endswith('m')`
  },

  "ga-cap-7": {
    code: "A07",
    category: "graphs",
    partLabel: "Parte 3 • Algoritmos em Grafos",
    scope: "grafos-dijkstra",
    gofPage: 153,
    playgroundId: "ga-dijkstra-lab",
    aliases: ["Algoritmo de Dijkstra", "Grafos Ponderados", "Relaxamento", "Bellman-Ford", "Troca do Piano"],
    relatedPatterns: ["ga-cap-6", "ga-cap-8"],
    realWorldUses: [
      "Roteamento de pacotes na internet (protocolo OSPF - Open Shortest Path First).",
      "Sistemas de navegacao GPS (Google Maps, Waze) calculando rota mais rapida em minutos.",
      "Roteamento de companhias aereas e cadeias de suprimentos logisticos."
    ],
    typescript: `export interface WeightedGraph {
  [node: string]: { [neighbor: string]: number };
}

export function dijkstra(
  graph: WeightedGraph,
  start: string,
  end: string
): { cost: number; path: string[] } {
  const costs: Record<string, number> = {};
  const parents: Record<string, string | null> = {};
  const processed = new Set<string>();

  for (const node of Object.keys(graph)) {
    costs[node] = Infinity;
    parents[node] = null;
  }
  for (const [neighbor, weight] of Object.entries(graph[start] || {})) {
    costs[neighbor] = weight;
    parents[neighbor] = start;
  }
  processed.add(start);

  const findLowestCostNode = () => {
    let lowestCost = Infinity;
    let lowestNode: string | null = null;
    for (const node in costs) {
      if (costs[node] < lowestCost && !processed.has(node)) {
        lowestCost = costs[node];
        lowestNode = node;
      }
    }
    return lowestNode;
  };

  let node = findLowestCostNode();
  while (node) {
    const cost = costs[node];
    const neighbors = graph[node] || {};
    for (const n in neighbors) {
      const newCost = cost + neighbors[n];
      if (costs[n] > newCost) {
        costs[n] = newCost;
        parents[n] = node;
      }
    }
    processed.add(node);
    node = findLowestCostNode();
  }

  const path: string[] = [];
  let curr: string | null = end;
  while (curr) {
    path.unshift(curr);
    curr = parents[curr];
  }

  return { cost: costs[end], path };
}`,
    python: `def dijkstra(grafo, inicio, fim):
    custos = {}
    pais = {}
    processados = set()

    for no in grafo:
        custos[no] = float("inf")
    for vizinho, peso in grafo[inicio].items():
        custos[vizinho] = peso
        pais[vizinho] = inicio

    def achar_no_mais_barato():
        menor_custo = float("inf")
        nodo_mais_barato = None
        for nodo, custo in custos.items():
            if custo < menor_custo and nodo not in processados:
                menor_custo = custo
                nodo_mais_barato = nodo
        return nodo_mais_barato

    nodo = achar_no_mais_barato()
    while nodo is not None:
        custo = custos[nodo]
        vizinhos = grafo.get(nodo, {})
        for v, p in vizinhos.items():
            novo_custo = custo + p
            if custos.get(v, float("inf")) > novo_custo:
                custos[v] = novo_custo
                pais[v] = nodo
        processados.add(nodo)
        nodo = achar_no_mais_barato()

    return custos[fim], pais`
  },

  "ga-cap-8": {
    code: "A08",
    category: "advanced",
    partLabel: "Parte 4 • Algoritmos Avancados",
    scope: "algoritmos-gulosos",
    gofPage: 179,
    playgroundId: "ga-greedy-set-cover-lab",
    aliases: ["Algoritmos Gulosos", "Greedy", "Cobertura de Conjuntos", "NP-Completo", "Aproximacao"],
    relatedPatterns: ["ga-cap-7", "ga-cap-9"],
    realWorldUses: [
      "Compressao de dados (Codificacao de Huffman para compactacao de texto e imagens).",
      "Alocacao de largura de banda e espectro de frequencias de radiofm e 5G.",
      "Algoritmos de aproximacao para problemas industriais NP-completos de agendamento."
    ],
    typescript: `export function greedySetCover(
  statesNeeded: ReadonlySet<string>,
  stations: Record<string, ReadonlySet<string>>
): Set<string> {
  const remainingStates = new Set<string>(statesNeeded);
  const finalStations = new Set<string>();

  while (remainingStates.size > 0) {
    let bestStation: string | null = null;
    let statesCovered = new Set<string>();

    for (const [station, statesForStation] of Object.entries(stations)) {
      const covered = new Set(
        [...statesForStation].filter((state) => remainingStates.has(state))
      );

      if (covered.size > statesCovered.size) {
        bestStation = station;
        statesCovered = covered;
      }
    }

    if (!bestStation) break;

    for (const state of statesCovered) {
      remainingStates.delete(state);
    }
    finalStations.add(bestStation);
  }

  return finalStations;
}`,
    python: `def cobertura_de_conjuntos(estados_abranger, estacoes):
    estados_necessarios = set(estados_abranger)
    estacoes_finais = set()

    while estados_necessarios:
        melhor_estacao = None
        estados_cobertos = set()
        for estacao, estados in estacoes.items():
            cobertos = estados_necessarios & estados
            if len(cobertos) > len(estados_cobertos):
                melhor_estacao = estacao
                estados_cobertos = cobertos

        estados_necessarios -= estados_cobertos
        estacoes_finais.add(melhor_estacao)

    return estacoes_finais`
  },

  "ga-cap-9": {
    code: "A09",
    category: "advanced",
    partLabel: "Parte 4 • Algoritmos Avancados",
    scope: "programacao-dinamica",
    gofPage: 205,
    playgroundId: "ga-knapsack-dp-lab",
    aliases: ["Programacao Dinamica", "DP", "Problema da Mochila 0/1", "LCS", "Git Diff"],
    relatedPatterns: ["ga-cap-8", "ga-cap-10"],
    realWorldUses: [
      "Comparador de versoes do Git (git diff) usando Maior Subsequencia Comum.",
      "Correcao ortografica e sugestoes de busca baseadas em Distancia de Levenshtein.",
      "Bioinformatica: alinhamento global e local de sequencias de proteinas e DNA."
    ],
    typescript: `export function knapsack01(
  capacity: number,
  weights: readonly number[],
  values: readonly number[]
): number {
  const n = weights.length;
  const grid: number[][] = Array.from({ length: n + 1 }, () =>
    Array(capacity + 1).fill(0)
  );

  for (let i = 1; i <= n; i++) {
    const weight = weights[i - 1];
    const value = values[i - 1];

    for (let c = 1; c <= capacity; c++) {
      if (weight <= c) {
        grid[i][c] = Math.max(grid[i - 1][c], value + grid[i - 1][c - weight]);
      } else {
        grid[i][c] = grid[i - 1][c];
      }
    }
  }

  return grid[n][capacity];
}`,
    python: `def mochila_dp(capacidade, pesos, valores):
    n = len(pesos)
    grid = [[0] * (capacidade + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        peso = pesos[i - 1]
        valor = valores[i - 1]
        for c in range(1, capacidade + 1):
            if peso <= c:
                grid[i][c] = max(grid[i - 1][c], valor + grid[i - 1][c - peso])
            else:
                grid[i][c] = grid[i - 1][c]

    return grid[n][capacidade]`
  },

  "ga-cap-10": {
    code: "A10",
    category: "advanced",
    partLabel: "Parte 4 • Algoritmos Avancados",
    scope: "machine-learning",
    gofPage: 235,
    playgroundId: "ga-knn-lab",
    aliases: ["KNN", "K-Nearest Neighbors", "Classificacao", "Regressao", "Distancia Euclidiana"],
    relatedPatterns: ["ga-cap-9", "ga-cap-11"],
    realWorldUses: [
      "Sistemas de recomendacao de streaming de audio e video (Netflix, Spotify).",
      "Reconhecimento optico de caracteres manuscritos (OCR) em agencias postais.",
      "Diagnostico medico preliminar por similaridade de sintomas e biomarcadores."
    ],
    typescript: `export interface LabeledPoint {
  readonly features: readonly number[];
  readonly label: string;
}

export function knnClassify(
  query: readonly number[],
  dataset: readonly LabeledPoint[],
  k: number
): string {
  const euclideanDistance = (a: readonly number[], b: readonly number[]) =>
    Math.sqrt(a.reduce((sum, val, idx) => sum + Math.pow(val - b[idx], 2), 0));

  const sortedNeighbors = dataset
    .map((point) => ({
      label: point.label,
      dist: euclideanDistance(query, point.features)
    }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, k);

  const votes = new Map<string, number>();
  for (const n of sortedNeighbors) {
    votes.set(n.label, (votes.get(n.label) || 0) + 1);
  }

  let topLabel = "";
  let maxVotes = -1;
  for (const [label, count] of votes.entries()) {
    if (count > maxVotes) {
      maxVotes = count;
      topLabel = label;
    }
  }

  return topLabel;
}`,
    python: `import math
from collections import Counter

def distancia_euclidiana(p1, p2):
    return math.sqrt(sum((a - b) ** 2 for a, b in zip(p1, p2)))

def knn_classificar(ponto_consulta, base_dados, k):
    # base_dados: lista de tuplas ([features], 'label')
    distancias = []
    for features, rotulo in base_dados:
        d = distancia_euclidiana(ponto_consulta, features)
        distancias.append((d, rotulo))

    distancias.sort(key=lambda x: x[0])
    k_vizinhos = [rotulo for _, rotulo in distancias[:k]]
    return Counter(k_vizinhos).most_common(1)[0][0]`
  },

  "ga-cap-11": {
    code: "A11",
    category: "advanced",
    partLabel: "Parte 4 • Algoritmos Avancados",
    scope: "estruturas-proximos-passos",
    gofPage: 257,
    playgroundId: "ga-bloom-filter-lab",
    aliases: ["Filtros de Bloom", "HyperLogLog", "B-Trees", "Indice Invertido", "Transformada de Fourier"],
    relatedPatterns: ["ga-cap-5", "ga-cap-10"],
    realWorldUses: [
      "Motores de busca web (Google) mapeando bilhoes de paginas com Indices Invertidos.",
      "Bancos de dados relacionais (PostgreSQL, MySQL) indexando tabelas com B-Trees.",
      "Google Chrome usando Filtros de Bloom para prevencao instantanea contra URLs maliciosas."
    ],
    typescript: `export class FastBloomFilter {
  private bits: Uint8Array;
  private size: number;

  constructor(sizeInBits = 1024) {
    this.size = sizeInBits;
    this.bits = new Uint8Array(Math.ceil(sizeInBits / 8));
  }

  private hashFn(key: string, seed: number): number {
    let h = seed;
    for (let i = 0; i < key.length; i++) {
      h = Math.imul(h ^ key.charCodeAt(i), 0x5bd1e995);
      h ^= h >>> 15;
    }
    return Math.abs(h) % this.size;
  }

  public add(key: string): void {
    for (const seed of [31, 131, 257]) {
      const idx = this.hashFn(key, seed);
      this.bits[Math.floor(idx / 8)] |= 1 << (idx % 8);
    }
  }

  public mightContain(key: string): boolean {
    for (const seed of [31, 131, 257]) {
      const idx = this.hashFn(key, seed);
      if ((this.bits[Math.floor(idx / 8)] & (1 << (idx % 8))) === 0) {
        return false; // Certeza absoluta que nao existe!
      }
    }
    return true; // Pode existir (falso positivo aceitavel)
  }
}`,
    python: `class FiltroDeBloomSimples:
    def __init__(self, tamanho=1000):
        self.tamanho = tamanho
        self.bits = [False] * tamanho

    def _hashes(self, item):
        h1 = hash(item) % self.tamanho
        h2 = hash(item + "_sal") % self.tamanho
        h3 = hash(item + "_pimenta") % self.tamanho
        return [h1, h2, h3]

    def adicionar(self, item):
        for h in self._hashes(item):
            self.bits[h] = True

    def contem_possivelmente(self, item):
        # Se qualquer bit for False, o item definitivamente nunca foi visto
        return all(self.bits[h] for h in self._hashes(item))`
  }
};

export const grokkingChaptersData = rawChapters.map((ch) => {
  const meta = chapterMetaMap[ch.id];
  const exList = grokkingAlgorithmsExamples[ch.id] || [];
  const primaryEx = exList[0] || {
    dirtyCode: "// Exemplo naive/procedural inicial\n",
    cleanCode: "// Exemplo idiomatico\n",
    context: ch.subtitle,
    refactoringNotes: []
  };

  return {
    id: ch.id,
    number: ch.number,
    code: meta.code,
    name: `Cap. ${String(ch.number).padStart(2, "0")} • ${ch.title}`,
    ptName: ch.subtitle,
    originalName: `Chapter ${ch.number}: ${ch.title}`,
    category: meta.category,
    partLabel: meta.partLabel,
    scope: meta.scope,
    gofPage: meta.gofPage,
    readingTime: ch.readingTime,
    hasPlayground: true,
    playgroundId: meta.playgroundId,
    aliases: meta.aliases,
    intent: ch.teacherIntro,
    problemAndMotivation: ch.sections[0]
      ? `${ch.sections[0].heading}: ${ch.sections[0].body}${
          ch.sections[0].callout ? `\n\n${ch.sections[0].callout.title}: ${ch.sections[0].callout.text}` : ""
        }`
      : ch.teacherIntro,
    solution: ch.sections
      .slice(1)
      .map((s) => {
        const bulletsText = s.bullets ? "\n• " + s.bullets.join("\n• ") : "";
        const calloutText = s.callout
          ? `\n• ${s.callout.title}: ${s.callout.text}`
          : "";
        return `${s.heading}: ${s.body}${bulletsText}${calloutText}`;
      })
      .join("\n\n"),
    structure: {
      participants: ch.keyTakeaways.map((tk, idx) => {
        const parts = tk.split(":");
        if (parts.length > 1) {
          return {
            name: parts[0].trim(),
            role: parts.slice(1).join(":").trim()
          };
        }
        return {
          name: `Conceito Chave #${idx + 1}`,
          role: tk
        };
      }),
      collaborations:
        primaryEx.context +
        (primaryEx.refactoringNotes?.length
          ? " Insights praticos: " + primaryEx.refactoringNotes.join(" ")
          : "")
    },
    applicability: [
      ...ch.keyTakeaways,
      `Conceito central no capitulo ${ch.number} (Pag. ${meta.gofPage} de Entendendo Algoritmos).`
    ],
    consequences: {
      pros: ch.keyTakeaways.slice(0, 3),
      cons: [
        "Requer atencao as condicoes de contorno e suposicoes matematicas do algoritmo.",
        "A escolha inadequada da estrutura de dados subjacente pode degradar o desempenho assintotico."
      ]
    },
    implementationNotes: [
      ...(primaryEx.refactoringNotes || []),
      `Consulte a secao de exercicios no final do capitulo ${ch.number} para consolidacao pratica.`
    ],
    codeExamples: {
      dirty: primaryEx.dirtyCode,
      java: primaryEx.cleanCode,
      typescript: meta.typescript,
      python: meta.python
    },
    extraExamples: exList,
    sections: ch.sections,
    realWorldUses: meta.realWorldUses,
    relatedPatterns: meta.relatedPatterns,
    references: [
      {
        book: "Entendendo Algoritmos: Um guia ilustrado para programadores e outros curiosos (Aditya Y. Bhargava)",
        chapter: `Capitulo ${ch.number}: ${ch.title}`,
        pages: `Pag. ${meta.gofPage}`,
        summary: ch.subtitle
      },
      {
        book: "Introduction to Algorithms (CLRS)",
        chapter: "Analise Formal e Fundamentacao Assintotica",
        pages: "Secoes correspondentes",
        summary: "Prova matematica rigorosa das complexidades discutidas."
      }
    ]
  };
});

