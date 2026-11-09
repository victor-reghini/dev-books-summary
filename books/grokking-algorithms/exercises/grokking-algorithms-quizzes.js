/**
 * Banco Completo de Exercicios de Fixacao, Cenarios Algoritmicos e Desafios Praticos (Mao na Massa)
 * para o livro "Entendendo Algoritmos" (Aditya Y. Bhargava).
 * Totalmente compativel com `quiz-engine.js`.
 */

import { grokkingAlgorithmsExercises } from "./index.js";

const chapterCategoryMap = {
  "ga-cap-1": "fundamentos",
  "ga-cap-2": "fundamentos",
  "ga-cap-3": "fundamentos",
  "ga-cap-4": "dividir-conquistar",
  "ga-cap-5": "tabelas-hash",
  "ga-cap-6": "grafos",
  "ga-cap-7": "grafos",
  "ga-cap-8": "avancados",
  "ga-cap-9": "avancados",
  "ga-cap-10": "avancados",
  "ga-cap-11": "avancados"
};

export const grokkingQuizzesData = Object.entries(grokkingAlgorithmsExercises).flatMap(([chapterId, items]) =>
  items.map((item, idx) => ({
    id: item.id,
    patternId: chapterId,
    category: chapterCategoryMap[chapterId] || "fundamentos",
    difficulty: idx === 0 ? "facil" : idx === 1 ? "medio" : "dificil",
    question: item.question,
    options: item.options.map((optText, optIdx) => ({
      text: optText,
      isCorrect: optIdx === item.correctIndex
    })),
    explanation: item.explanation
  }))
);

export const grokkingScenariosData = [
  {
    id: "ga-scen-1",
    title: "Cenario 1: Sistema de Autenticacao e Caching de Alta Escala",
    patternId: "ga-cap-5",
    context: "Sua plataforma SaaS recebe 50.000 requisicoes por segundo para validar sessoes de usuarios a partir de tokens opacos. A consulta direta ao banco PostgreSQL em disco esta gerando lentidao extrema e timeout.",
    question: "Qual estrutura de dados e estrategia algoritmica deve ser adotada na camada de memoria para garantir consultas em tempo O(1) com seguranca de capacidade?",
    options: [
      { text: "Tabela Hash (Redis) monitorando o fator de carga para que permaneca abaixo de 0.7.", isCorrect: true },
      { text: "Array ordenado com pesquisa binaria O(log n) executada a cada clique.", isCorrect: false },
      { text: "Pilha LIFO alocada na memoria dinamica do processo.", isCorrect: false },
      { text: "Grafo direcionado percorrido por Pesquisa em Largura.", isCorrect: false }
    ],
    explanation: "Uma tabela hash em memoria (como Redis ou Map chave-valor) oferece leitura O(1) media instantanea, eliminando I/O de disco. O controle do fator de carga abaixo de 0.7 evita degradacao por colisoes."
  },
  {
    id: "ga-scen-2",
    title: "Cenario 2: Roteamento de Entregas com Pedagios e Minutos",
    patternId: "ga-cap-7",
    context: "Um aplicativo de delivery urbano precisa calcular o trajeto mais rapido para os entregadores. As ruas tem tempos de percurso variados e algumas pontes cobram pedagios.",
    question: "Qual algoritmo deve ser utilizado para determinar a rota de menor custo/tempo?",
    options: [
      { text: "Algoritmo de Dijkstra sobre um grafo orientado ponderado.", isCorrect: true },
      { text: "Pesquisa em Largura (BFS) tradicional com fila FIFO.", isCorrect: false },
      { text: "Quicksort particionando as esquinas pelo ponto medio.", isCorrect: false },
      { text: "Ordenacao por Selecao comparando cada via.", isCorrect: false }
    ],
    explanation: "A BFS so funciona para grafos nao ponderados (menor numero de ruas). Como cada via tem minutos ou custos diferentes, o Algoritmo de Dijkstra e o indicado para encontrar o menor peso acumulado."
  },
  {
    id: "ga-scen-3",
    title: "Cenario 3: Otimizacao de Espaco em Satelite de Sensoriamento",
    patternId: "ga-cap-9",
    context: "Um satelite de observacao tem apenas 16 GB de buffer disponivel antes de transmitir dados para a Terra. Ele possui 20 imagens de alta resolucao com tamanhos e valores cientificos distintos.",
    question: "Como o computador de bordo deve selecionar as imagens para maximizar o retorno cientifico?",
    options: [
      { text: "Grade de Programacao Dinamica (Problema da Mochila 0/1).", isCorrect: true },
      { text: "Algoritmo guloso pegando sempre a imagem com maior valor.", isCorrect: false },
      { text: "Algoritmo do Caixeiro-Viajante em O(n!).", isCorrect: false },
      { text: "Filtro de Bloom probabilistico.", isCorrect: false }
    ],
    explanation: "O algoritmo guloso pode escolher um arquivo enorme que bloqueie a inclusao de combinacoes mais vantajosas. A Programacao Dinamica preenche a grade de subproblemas e garante a combinacao globalmente perfeita."
  },
  {
    id: "ga-scen-4",
    title: "Cenario 4: Auditoria de Links em Web Crawler Massivo",
    patternId: "ga-cap-11",
    context: "Um motor de busca processa 5 bilhoes de URLs. Consultar o banco em disco para verificar se uma URL ja foi visitada antes de baixa-la causaria colapso do cluster de banco de dados.",
    question: "Qual estrutura de dados probabilistica deve atuar como barreira de protecao em memoria?",
    options: [
      { text: "Filtro de Bloom: garante zero falsos negativos e responde em memoria em frações de segundo.", isCorrect: true },
      { text: "Array contiguo de strings de 5 bilhoes de posicoes.", isCorrect: false },
      { text: "Arvore Binaria de Busca simples sem balanceamento.", isCorrect: false },
      { text: "Fila FIFO com todos os links armazenados.", isCorrect: false }
    ],
    explanation: "O Filtro de Bloom usa apenas alguns megabytes e responde com certeza absoluta se uma URL NAO esta presente, descartando 99% das consultas desnecessarias ao banco de dados."
  },
  {
    id: "ga-scen-5",
    title: "Cenario 5: Agendamento de Antenas de Telecomunicacao (Set Cover)",
    patternId: "ga-cap-8",
    context: "Uma operadora de telefonia precisa instalar o menor numero de antenas para cobrir 100 municipios. Testar todos os subconjuntos exigiria 2^100 operacoes (impossivel).",
    question: "Qual abordagem de engenharia de software e recomendada por Aditya Bhargava no Capitulo 8?",
    options: [
      { text: "Algoritmo de aproximacao guloso: selecionar a cada etapa a antena que atende mais municipios pendentes.", isCorrect: true },
      { text: "Insistir na forca bruta contratando servidores em nuvem por anos.", isCorrect: false },
      { text: "Trocar o problema por uma pesquisa binaria simples.", isCorrect: false },
      { text: "Implementar uma tabela hash sem funcao hash.", isCorrect: false }
    ],
    explanation: "Por se tratar de um problema NP-Completo (cobertura de conjuntos), a busca pela solucao exata e inviavel. A aproximacao gulosa roda em O(n^2) e entrega uma cobertura muito proxima da otima."
  }
];

export const grokkingPracticalExercisesData = [
  {
    id: "ga-prac-1",
    patternId: "ga-cap-1",
    title: "Desafio 1: Implementando a Pesquisa Binaria Pura",
    difficulty: "facil",
    category: "fundamentos",
    targetPatterns: ["Cap. 1 • Pesquisa Binaria", "Notacao Big O • O(log n)"],
    scenario: "Escreva uma funcao binarySearch(list, item) que recebe um array ordenado e um item alvo, retornando o indice onde o item se encontra ou null se nao estiver presente.",
    steps: [
      "Definir baixo = 0 e alto = lista.length - 1.",
      "Criar o loop while (baixo <= alto).",
      "Calcular o ponto medio com Math.floor((baixo + alto) / 2).",
      "Se o chute for igual ao item, retornar o indice do meio.",
      "Ajustar baixo ou alto cortando a metade inadequada."
    ],
    starterCode: `// IMPLEMENTE A PESQUISA BINARIA
function binarySearch(list, item) {
  // TODO: implemente aqui
  return null;
}`,
    hints: [
      "Lembre-se de calcular mid = Math.floor((low + high) / 2).",
      "Se guess > item, faca high = mid - 1.",
      "Se guess < item, faca low = mid + 1."
    ],
    referenceSolution: `function binarySearch(list, item) {
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
}`
  },
  {
    id: "ga-prac-2",
    patternId: "ga-cap-4",
    title: "Desafio 2: Quicksort com Dividir para Conquistar (D&C)",
    difficulty: "medio",
    category: "dividir-conquistar",
    targetPatterns: ["Cap. 4 • Quicksort", "D&C • O(n log n)"],
    scenario: "Implemente o Quicksort funcional elegante: se a lista tiver menos de 2 elementos, retorne-a; senao, eleja um pivo, particione em menores e maiores e concatene o resultado recursivo.",
    steps: [
      "Identificar o caso-base: se array.length < 2, retorne o array.",
      "Escolher o primeiro elemento como pivo.",
      "Filtrar os elementos restantes em dois subarrays: menores e maiores que o pivo.",
      "Retornar [...quicksort(menores), pivo, ...quicksort(maiores)]."
    ],
    starterCode: `function quicksort(arr) {
  // TODO: implemente o algoritmo D&C
  return arr;
}`,
    hints: [
      "O caso-base e indispensavel para evitar estouro de pilha.",
      "Use filter() para separar os elementos menores ou iguais e os maiores que o pivo."
    ],
    referenceSolution: `function quicksort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  const pivot = arr[0];
  const rest = arr.slice(1);
  const less = rest.filter(x => x <= pivot);
  const greater = rest.filter(x => x > pivot);

  return [...quicksort(less), pivot, ...quicksort(greater)];
}`
  },
  {
    id: "ga-prac-3",
    patternId: "ga-cap-6",
    title: "Desafio 3: Pesquisa em Largura (BFS) em Grafo com Fila FIFO",
    difficulty: "medio",
    category: "grafos",
    targetPatterns: ["Cap. 6 • Grafos", "BFS • Fila FIFO • Prevencao de Ciclos"],
    scenario: "Implemente a funcao bfs(graph, startNode, targetPredicate) que percorre o grafo em ondas de primeiro grau e segundo grau, usando uma fila FIFO e um conjunto para registrar nos ja visitados.",
    steps: [
      "Inicializar a fila com os vizinhos diretos do no inicial.",
      "Criar um Set() de visitados contendo o no inicial.",
      "Enquanto a fila nao estiver vazia, retirar o primeiro elemento com shift().",
      "Se o elemento satisfizer targetPredicate, retorne-o.",
      "Caso contrario, marque como visitado e enfileire seus vizinhos nao visitados."
    ],
    starterCode: `function bfs(graph, startNode, targetPredicate) {
  // TODO: implemente a BFS com fila FIFO e controle de visitados
  return null;
}`,
    hints: [
      "Use um Set() para rastrear os nos ja processados e prevenir loops.",
      "Desenfileire sempre da frente da fila usando queue.shift()."
    ],
    referenceSolution: `function bfs(graph, startNode, targetPredicate) {
  const queue = [...(graph[startNode] || [])];
  const visited = new Set([startNode]);

  while (queue.length > 0) {
    const current = queue.shift();
    if (!visited.has(current)) {
      if (targetPredicate(current)) {
        return current;
      }
      visited.add(current);
      for (const neighbor of graph[current] || []) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
        }
      }
    }
  }

  return null;
}`
  },
  {
    id: "ga-prac-4",
    patternId: "ga-cap-9",
    title: "Desafio 4: Programacao Dinamica para a Mochila 0/1",
    difficulty: "dificil",
    category: "avancados",
    targetPatterns: ["Cap. 9 • Programacao Dinamica", "Grade de Subproblemas"],
    scenario: "Escreva a funcao knapsackDP(capacity, weights, values) que preenche uma matriz bidimensional resolvendo subproblemas de capacidades parciais de 1 ate capacity, retornando o valor maximo acumulavel.",
    steps: [
      "Criar uma matriz grid[n + 1][capacity + 1] preenchida com zeros.",
      "Iterar sobre cada item de 1 ate n.",
      "Para cada capacidade c de 1 ate capacity, verificar se o item cabe.",
      "Se couber, celula = max(grid[i-1][c], valor + grid[i-1][c - peso]).",
      "Se nao couber, celula = grid[i-1][c].",
      "Retornar grid[n][capacity]."
    ],
    starterCode: `function knapsackDP(capacity, weights, values) {
  // TODO: implemente o preenchimento da matriz de programacao dinamica
  return 0;
}`,
    hints: [
      "A linha anterior representa a solucao sem o item atual.",
      "grid[i-1][c - weight] contem o valor maximo obtido com o peso restante."
    ],
    referenceSolution: `function knapsackDP(capacity, weights, values) {
  const n = weights.length;
  const grid = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const weight = weights[i - 1];
    const val = values[i - 1];

    for (let c = 1; c <= capacity; c++) {
      if (weight <= c) {
        grid[i][c] = Math.max(grid[i - 1][c], val + grid[i - 1][c - weight]);
      } else {
        grid[i][c] = grid[i - 1][c];
      }
    }
  }

  return grid[n][capacity];
}`
  }
];

