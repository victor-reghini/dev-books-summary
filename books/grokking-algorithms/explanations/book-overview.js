/**
 * Dados e conteudos completos sobre o livro classico:
 * "Entendendo Algoritmos: Um guia ilustrado para programadores e outros curiosos"
 * (Grokking Algorithms: An illustrated guide for programmers and other curious people - Aditya Y. Bhargava)
 */

export const grokkingAlgorithmsOverview = {
  title: "Entendendo Algoritmos",
  subtitle: "Um Guia Ilustrado para Programadores e Outros Curiosos",
  originalTitle: "Grokking Algorithms: An illustrated guide for programmers and other curious people",
  publicationYear: 2016,
  editionPt: "Novatec Editora (2017 / Manning Publications)",
  authors: [
    {
      name: "Aditya Y. Bhargava",
      bio: "Engenheiro de software na Etsy e formado em Ciencias da Computacao pela University of Chicago. Autor do consagrado blog ilustrado de tecnologia adit.io.",
      avatar: "AB"
    }
  ],
  forewordBy: "Aditya Y. Bhargava (Prefacio sobre o poder de ensinar conceitos complexos de computacao atraves de ilustracoes, metaforas visuais e exemplos praticos)",
  inspiration: "Thomas H. Cormen (CLRS), Donald Knuth (The Art of Computer Programming) e Gilbert Strang",
  corePrinciples: [
    {
      id: "big-o-growth",
      title: "1. Notacao Big O e Taxa de Crescimento de Operacoes",
      original: "Big O notation doesn't tell you the speed in seconds. It tells you how quickly the runtime grows with the number of items.",
      summary: "A rapidez de um algoritmo nao e medida em segundos de relogio, mas pelo ritmo de crescimento do numero de operacoes a medida que a entrada aumenta. Enquanto a pesquisa simples cresce a O(n), a pesquisa binaria opera em tempo logaritmico O(log n), reduzindo buscas em 4 bilhoes de itens de 4 bilhoes de operacoes para meras 32 tentativas.",
      benefits: [
        "Permite avaliar escalabilidade antes de escrever uma unica linha de codigo em producao.",
        "Mede sempre o pior cenario (worst case) garantindo limites maximos de execucao.",
        "Demonstra quando otimizacoes de hardware sao inuteis perante uma escolha algoritmica inadequada (ex: O(n!) do caixeiro-viajante)."
      ],
      badPractice: "for (int i = 0; i < n; i++) { if (arr[i] == target) return i; } // O(n) linear em lista ordenada",
      goodPractice: "while (low <= high) { mid = (low + high) / 2; if (arr[mid] == target) return mid; } // O(log n) binario"
    },
    {
      id: "divide-and-conquer",
      title: "2. Dividir para Conquistar (D&C) e Recursao Estruturada",
      original: "Divide and conquer algorithms are recursive. Figure out the base case, then divide until you reach it.",
      summary: "Dividir para Conquistar (D&C) e um meta-algoritmo de resolucao de problemas: identificar o caso-base mais trivial possivel (geralmente arrays vazios ou unitarios) e progressivamente particionar o problema maior em subproblemas identicos menores ate convergir ao caso-base. O quicksort exemplifica essa abordagem com tempo medio O(n log n).",
      benefits: [
        "Transforma problemas combinatorios assustadores em particionamentos naturais e elegantes.",
        "Base formal de algoritmos rapidos de ordenacao e transformadas matematicas.",
        "A recursao melhora a clareza e produtividade do programador ao modelar o fluxo em pilhas logicas."
      ],
      badPractice: "def loop_sort(arr): # Multiplos loops aninhados com estados mutaveis e ponteiros confusos",
      goodPractice: "def quicksort(arr): return quicksort([x for x in arr[1:] if x <= pivo]) + [pivo] + quicksort([x for x in arr[1:] if x > pivo])"
    },
    {
      id: "graph-modeling",
      title: "3. Modelagem por Grafos e Menor Caminho (BFS vs. Dijkstra)",
      original: "When I want to solve a problem, I start with two plans of attack: 'Can I use a hash table?' and 'Can I model this as a graph?'",
      summary: "Redes de conexoes do mundo real (cidades, rotas de onibus, amizades, redes neurais e dependencias de tarefas) sao modeladas intuitivamente com grafos. Para caminhos minimos sem pesos (menor numero de saltos), a pesquisa em largura (BFS) com filas FIFO e imbativel (O(V+A)). Para grafos ponderados positivos, o algoritmo de Dijkstra computa o trajeto de menor custo total.",
      benefits: [
        "Capacidade de mapear problemas complexos de infraestrutura, roteamento e IA.",
        "Resolucao de dependencias em compiladores e pipelines atraves de ordenacao topologica.",
        "Deteccao de caminhos mais curtos em mapas, transacoes e logistica."
      ],
      badPractice: "Pesquisar caminhos ponderados usando BFS ou tentar aplicar Dijkstra com arestas de peso negativo.",
      goodPractice: "Usar BFS para menor numero de passos em grafos nao ponderados e Dijkstra para peso minimo em DAGs ponderados positivos."
    },
    {
      id: "dynamic-programming-knapsack",
      title: "4. Programacao Dinamica e Subproblemas Discretos",
      original: "Dynamic programming is useful when you're trying to optimize something given a constraint. Subproblems must be discrete.",
      summary: "A programacao dinamica comeca resolvendo subproblemas menores em uma grade/tabela e utiliza os resultados intermediarios memorizados para resolver o problema geral. E a solucao ideal para otimizacao com limites (como a mochila 0/1 com itens indivisiveis) e comparacao de sequencias (maior substring e subsequencia comum LCS em DNA e git diff).",
      benefits: [
        "Transforma o custo exponencial O(2^n) de forca bruta em complexidade polinomial tratavel em tabela.",
        "Subproblemas discretos impedem recalculacoes redundantes via memorizacao e preenchimento sistematico.",
        "Aplicavel diretamente em bioinformatica, corretores ortograficos e alocacao otimizada de recursos."
      ],
      badPractice: "Tentar resolver o problema da mochila 0/1 com algoritmo guloso (que pode selecionar item pesado e subotimo).",
      goodPractice: "Preencher tabela celular: celula[i][j] = max(anterior, valor_atual + celula[i-1][j-peso_atual])."
    }
  ],
  bigOComplexityScale: [
    { notation: "O(1)", name: "Tempo Constante", example: "Acesso por indice em array, busca em tabela hash (caso medio), push/pop em pilha", speed: "Instantaneo" },
    { notation: "O(log n)", name: "Tempo Logaritmico", example: "Pesquisa binaria em lista ordenada (1 bilhao de itens em 30 passos)", speed: "Extremamente Rapido" },
    { notation: "O(n)", name: "Tempo Linear", example: "Pesquisa simples, leitura sequencial de lista encadeada", speed: "Moderado" },
    { notation: "O(n log n)", name: "Tempo Linear-Logaritmico", example: "Quicksort (caso medio), Merge sort", speed: "Rapido para Ordenacao" },
    { notation: "O(n^2)", name: "Tempo Quadratico", example: "Ordenacao por selecao (Selection Sort), loops aninhados", speed: "Lento" },
    { notation: "O(2^n)", name: "Tempo Exponencial", example: "Conjunto de partes (Power set), forca bruta de cobertura de conjuntos", speed: "Intratavel para n medio" },
    { notation: "O(n!)", name: "Tempo Fatorial", example: "O caixeiro-viajante por forca bruta (100 cidades ultrapassa a idade do universo)", speed: "Impossivel para n > 20" }
  ],
  keyTechniques: [
    {
      name: "Pesquisa Binaria (Binary Search)",
      complexity: "O(log n)",
      chapter: "Capitulo 1",
      summary: "Chuta sempre o valor mediano de um conjunto ordenado eliminando metade das possibilidades a cada tentativa."
    },
    {
      name: "Ordenacao por Selecao (Selection Sort)",
      complexity: "O(n^2)",
      chapter: "Capitulo 2",
      summary: "Encontra o menor elemento da lista a cada iteracao e o anexa a uma nova colecao ordenada."
    },
    {
      name: "Dividir para Conquistar (D&C)",
      complexity: "Recursivo",
      chapter: "Capitulo 4",
      summary: "Decompoe um problema em subproblemas menores identicos ate atingir o caso-base trivial."
    },
    {
      name: "Quicksort",
      complexity: "O(n log n) medio / O(n^2) pior",
      chapter: "Capitulo 4",
      summary: "Escolhe um elemento pivo, particiona em menores e maiores e recombina recursivamente com constante baixa."
    },
    {
      name: "Tabelas Hash (Hash Tables)",
      complexity: "O(1) busca / insercao",
      chapter: "Capitulo 5",
      summary: "Mapeia chaves para posicoes de memoria com funcoes hash para busca instantanea e caching."
    },
    {
      name: "Pesquisa em Largura (BFS)",
      complexity: "O(V + A)",
      chapter: "Capitulo 6",
      summary: "Explora nos de uma rede camada por camada usando fila FIFO para achar o menor numero de passos."
    },
    {
      name: "Algoritmo de Dijkstra",
      complexity: "O(A + V log V)",
      chapter: "Capitulo 7",
      summary: "Computa o caminho de menor peso acumulado em grafos ponderados dirigidos sem pesos negativos."
    },
    {
      name: "Algoritmos Gulosos (Greedy)",
      complexity: "Aproximacao O(n^2)",
      chapter: "Capitulo 8",
      summary: "Faz a escolha otima local imediata a cada passo na tentativa de produzir uma boa aproximacao global."
    },
    {
      name: "Programacao Dinamica",
      complexity: "Polinomial via Grade",
      chapter: "Capitulo 9",
      summary: "Resolve subproblemas discretos em matriz tabular para alcancar a combinacao global perfeita."
    },
    {
      name: "K-Vizinhos Mais Proximos (KNN)",
      complexity: "Calculo de Distancia",
      chapter: "Capitulo 10",
      summary: "Classifica e estima valores (regressao) baseando-se na proximidade espacial Euclidiana dos K vizinhos."
    }
  ]
};

export const grokkingBookOverview = grokkingAlgorithmsOverview;
export const bookOverview = grokkingAlgorithmsOverview;
export const bigOScaleTable = [
  { notation: "O(1)", name: "Tempo Constante", example: "Tabela Hash / Acesso a Array por índice", n10: "1 op", n1000: "1 op", n1000000: "1 op", verdict: "Instantâneo em qualquer escala" },
  { notation: "O(log n)", name: "Tempo Logarítmico", example: "Pesquisa Binária (Cap. 1)", n10: "3 ou 4 ops", n1000: "10 ops", n1000000: "20 ops", verdict: "Extremamente rápido; divide pela metade" },
  { notation: "O(n)", name: "Tempo Linear", example: "Pesquisa Simples / Leitura de Lista (Cap. 1 e 2)", n10: "10 ops", n1000: "1.000 ops", n1000000: "1.000.000 ops", verdict: "Cresce proporcionalmente à entrada" },
  { notation: "O(n log n)", name: "Tempo Linear-Logarítmico", example: "Quicksort (Cap. 4) / Mergesort", n10: "33 ops", n1000: "10.000 ops", n1000000: "20.000.000 ops", verdict: "Excelente velocidade para ordenação" },
  { notation: "O(n²)", name: "Tempo Quadrático", example: "Ordenação por Seleção (Cap. 2)", n10: "100 ops", n1000: "1.000.000 ops", n1000000: "1 trilhão ops", verdict: "Lento; evitar em grandes volumes" },
  { notation: "O(2ⁿ)", name: "Tempo Exponencial", example: "Subconjuntos / Cobertura de Conjuntos (Cap. 8)", n10: "1.024 ops", n1000: "Incalculável", n1000000: "Impossível", verdict: "Intratável; exige aproximação gulosa" },
  { notation: "O(n!)", name: "Tempo Fatorial", example: "Caixeiro-Viajante por Força Bruta (Cap. 1 e 8)", n10: "3.628.800 ops", n1000: "Ultrapassa o universo", n1000000: "Impossível", verdict: "Inviável; classe NP-Completo" }
];
