// Exemplos Praticos e Comparacoes de Codigo para "Entendendo Algoritmos" (Aditya Y. Bhargava)
// Cobre os 11 capitulos do livro com comparacao Naive / Ineficiente vs. Algoritmo Otimo

export { grokkingAlgorithmsAnimations } from "./grokking-algorithms-animations.js";
export { grokkingAlgorithmsLabs } from "./grokking-algorithms-labs.js";

export const grokkingAlgorithmsExamples = {
  "ga-cap-1": [
    {
      id: "ga-ex-1-1",
      title: "Pesquisa Linear O(n) vs. Pesquisa Binaria O(log n)",
      context: "Caso de uso: localizar o indice de um elemento em uma colecao previamente ordenada de 1 bilhao de registros.",
      dirtyLabel: "Antes: Pesquisa Simples Linear O(n)",
      dirtyCode: `public Integer pesquisaSimples(int[] lista, int item) {
  for (int i = 0; i < lista.length; i++) {
    if (lista[i] == item) {
      return i; // No pior caso, precisa percorrer todos os n elementos
    }
  }
  return null;
}`,
      cleanLabel: "Depois: Pesquisa Binaria O(log n)",
      cleanCode: `public Integer pesquisaBinaria(int[] lista, int item) {
  int baixo = 0;
  int alto = lista.length - 1;

  while (baixo <= alto) {
    int meio = (baixo + alto) / 2;
    int chute = lista[meio];

    if (chute == item) {
      return meio;
    }
    if (chute > item) {
      alto = meio - 1;
    } else {
      baixo = meio + 1;
    }
  }
  return null;
}`,
      refactoringNotes: [
        "A pesquisa binaria corta metade do espaco de busca a cada iteracao.",
        "Reduz 4 bilhoes de operacoes potenciais para no maximo 32 etapas no pior cenario.",
        "Exige estritamente que a colecao de entrada esteja previamente ordenada."
      ]
    }
  ],

  "ga-cap-2": [
    {
      id: "ga-ex-2-1",
      title: "Ordenacao por Selecao: Busca Repetida do Menor Item",
      context: "Caso de uso: ordenar um catalogo musical pelo numero de reproducoes (do menos ouvido ao mais ouvido).",
      dirtyLabel: "Antes: Procedural Desorganizado",
      dirtyCode: `public List<Integer> ordenarBaguncado(List<Integer> itens) {
  // Trocas manuais ineficientes sem clareza de ponteiros
  List<Integer> res = new ArrayList<>();
  while (!itens.isEmpty()) {
    int m = itens.get(0);
    int idx = 0;
    for (int j = 1; j < itens.size(); j++) {
      if (itens.get(j) < m) {
        m = itens.get(j);
        idx = j;
      }
    }
    res.add(itens.remove(idx));
  }
  return res;
}`,
      cleanLabel: "Depois: Funcoes Separadas e Expressivas",
      cleanCode: `public List<Integer> ordenacaoPorSelecao(List<Integer> arr) {
  List<Integer> copia = new ArrayList<>(arr);
  List<Integer> novoArr = new ArrayList<>();

  int tamanho = copia.size();
  for (int i = 0; i < tamanho; i++) {
    int menorIndice = buscaMenor(copia);
    novoArr.add(copia.remove(menorIndice));
  }
  return novoArr;
}

private int buscaMenor(List<Integer> arr) {
  int menor = arr.get(0);
  int menorIndice = 0;
  for (int i = 1; i < arr.size(); i++) {
    if (arr.get(i) < menor) {
      menor = arr.get(i);
      menorIndice = i;
    }
  }
  return menorIndice;
}`,
      refactoringNotes: [
        "Isola a responsabilidade de encontrar o menor indice na funcao pura buscaMenor().",
        "Apresenta formalmente a complexidade O(n^2), fundamental para contrastar com algoritmos O(n log n)."
      ]
    }
  ],

  "ga-cap-3": [
    {
      id: "ga-ex-3-1",
      title: "Recursao com Caso-Base e Caso Recursivo",
      context: "Caso de uso: calculo de fatorial demonstrando a pilha de chamada (call stack).",
      dirtyLabel: "Antes: Recursao Infinita sem Caso-Base (StackOverflow)",
      dirtyCode: `public int fatorialPerigoso(int x) {
  // Sem caso-base: a funcao chama a si mesma para sempre ate a memoria esgotar
  return x * fatorialPerigoso(x - 1);
}`,
      cleanLabel: "Depois: Caso-Base Claro e Condicao de Parada",
      cleanCode: `public int fat(int x) {
  if (x <= 1) {
    return 1; // Caso-base obrigadorio
  }
  return x * fat(x - 1); // Caso recursivo
}`,
      refactoringNotes: [
        "Toda funcao recursiva precisa de duas partes: o caso-base e o caso recursivo.",
        "Demonstra o modelo mental da pilha (LIFO): quadros de memoria sao empilhados ate x=1 e depois desempilhados."
      ]
    }
  ],

  "ga-cap-4": [
    {
      id: "ga-ex-4-1",
      title: "Quicksort: Dividir para Conquistar (D&C)",
      context: "Caso de uso: ordenar um array numerico de alta volumetria em tempo linear-logaritmico medio.",
      dirtyLabel: "Antes: Algoritmo Quadratic O(n^2)",
      dirtyCode: `public void bubbleSort(int[] arr) {
  for (int i = 0; i < arr.length; i++) {
    for (int j = 0; j < arr.length - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        int temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}`,
      cleanLabel: "Depois: Quicksort Elegante O(n log n)",
      cleanCode: `public List<Integer> quicksort(List<Integer> arr) {
  if (arr.size() < 2) {
    return arr; // Caso-base: 0 ou 1 elemento ja estao ordenados
  }

  int pivo = arr.get(0);
  List<Integer> menores = new ArrayList<>();
  List<Integer> maiores = new ArrayList<>();

  for (int i = 1; i < arr.size(); i++) {
    int item = arr.get(i);
    if (item <= pivo) {
      menores.add(item);
    } else {
      maiores.add(item);
    }
  }

  List<Integer> resultado = new ArrayList<>(quicksort(menores));
  resultado.add(pivo);
  resultado.addAll(quicksort(maiores));
  return resultado;
}`,
      refactoringNotes: [
        "Aplica os 2 passos de D&C: 1. Descobrir caso-base; 2. Diminuir o problema recursivamente.",
        "Em media, a arvore tem profundidade O(log n) e processa n elementos por nivel = O(n log n)."
      ]
    }
  ],

  "ga-cap-5": [
    {
      id: "ga-ex-5-1",
      title: "Tabela Hash: Cache Web e Evitando Consultas Redundantes",
      context: "Caso de uso: armazenar em cache respostas de paginas web caras indexadas pela URL.",
      dirtyLabel: "Antes: Busca Linear em Lista O(n)",
      dirtyCode: `public Page getPageLenta(List<CacheEntry> cache, String url) {
  for (CacheEntry entry : cache) {
    if (entry.url.equals(url)) {
      return entry.page; // Busca lenta O(n)
    }
  }
  Page page = fetchFromServer(url);
  cache.add(new CacheEntry(url, page));
  return page;
}`,
      cleanLabel: "Depois: Tabela Hash com Consulta O(1)",
      cleanCode: `private Map<String, Page> cache = new HashMap<>();

public Page getPage(String url) {
  if (cache.containsKey(url)) {
    return cache.get(url); // Acesso instantaneo O(1)
  }
  Page page = fetchFromServer(url);
  cache.put(url, page);
  return page;
}`,
      refactoringNotes: [
        "Troca a busca linear O(n) por chave indexada em O(1).",
        "Tabelas hash evitam processamento repetido e sao a espinha dorsal de caches web e bancos chave-valor."
      ]
    }
  ],

  "ga-cap-6": [
    {
      id: "ga-ex-6-1",
      title: "Pesquisa em Largura (BFS) em Grafo de Amizades",
      context: "Caso de uso: localizar a pessoa mais proxima em saltos que vende mangas.",
      dirtyLabel: "Antes: Busca sem Controle de Ciclos (Loop Infinito)",
      dirtyCode: `public boolean buscaIngenua(String pessoa, Map<String, List<String>> grafo) {
  // Sem fila FIFO e sem lista de visitados: trava se A for amigo de B e B de A
  for (String amigo : grafo.getOrDefault(pessoa, List.of())) {
    if (amigo.endsWith("m")) return true;
    buscaIngenua(amigo, grafo); // Risco de recursao infinita!
  }
  return false;
}`,
      cleanLabel: "Depois: BFS com Fila FIFO e Conjunto de Visitados",
      cleanCode: `public String pesquisaEmLargura(String inicio, Map<String, List<String>> grafo) {
  Queue<String> fila = new LinkedList<>(grafo.getOrDefault(inicio, List.of()));
  Set<String> verificados = new HashSet<>();
  verificados.add(inicio);

  while (!fila.isEmpty()) {
    String pessoa = fila.poll();
    if (!verificados.contains(pessoa)) {
      if (pessoa.endsWith("m")) {
        return pessoa; // Encontrou vendedor no menor numero de saltos!
      }
      fila.addAll(grafo.getOrDefault(pessoa, List.of()));
      verificados.add(pessoa);
    }
  }
  return null;
}`,
      refactoringNotes: [
        "A fila FIFO garante que conexoes de 1º grau sejam avaliadas antes de 2º grau.",
        "O conjunto 'verificados' previne loops infinitos causados por ciclos bidirecionais."
      ]
    }
  ],

  "ga-cap-7": [
    {
      id: "ga-ex-7-1",
      title: "Algoritmo de Dijkstra para Grafos Ponderados",
      context: "Caso de uso: encontrar o percurso de menor custo financeiro para trocar um livro por um piano.",
      dirtyLabel: "Antes: BFS Tradicional Ignora Pesos das Arestas",
      dirtyCode: `// BFS conta apenas saltos e escolheria a rota direta cara de R$ 50
// em vez da rota com 3 saltos que custa apenas R$ 35!`,
      cleanLabel: "Depois: Dijkstra com Tabela de Custos e Relaxamento",
      cleanCode: `public Map<String, Object> dijkstra(Map<String, Map<String, Integer>> grafo, String inicio, String fim) {
  Map<String, Integer> custos = new HashMap<>();
  Map<String, String> pais = new HashMap<>();
  Set<String> processados = new HashSet<>();

  // Inicializa custos diretos
  for (String no : grafo.keySet()) {
    custos.put(no, Integer.MAX_VALUE);
  }
  for (Map.Entry<String, Integer> e : grafo.get(inicio).entrySet()) {
    custos.put(e.getKey(), e.getValue());
    pais.put(e.getKey(), inicio);
  }

  String no = acharNoMaisBarato(custos, processados);
  while (no != null) {
    int custo = custos.get(no);
    Map<String, Integer> vizinhos = grafo.getOrDefault(no, Map.of());

    for (String vizinho : vizinhos.keySet()) {
      int novoCusto = custo + vizinhos.get(vizinho);
      if (custos.get(vizinho) > novoCusto) {
        custos.put(vizinho, novoCusto);
        pais.put(vizinho, no);
      }
    }
    processados.add(no);
    no = acharNoMaisBarato(custos, processados);
  }

  return Map.of("custoFinal", custos.get(fim), "pais", pais);
}`,
      refactoringNotes: [
        "Dijkstra avalia pesos continuos em vez de saltos discretos.",
        "Funciona apenas para pesos estritamente positivos (para pesos negativos use Bellman-Ford)."
      ]
    }
  ],

  "ga-cap-8": [
    {
      id: "ga-ex-8-1",
      title: "Algoritmo Guloso: Cobertura de Conjuntos (Set Covering)",
      context: "Caso de uso: cobrir todos os estados com o menor numero possivel de estacoes de radio.",
      dirtyLabel: "Antes: Forca Bruta Combinatoria O(2^n)",
      dirtyCode: `// Gerar todos os 2^n subconjuntos possiveis de estacoes de transmissao.
// Para 50 estacoes: 2^50 = 1.125.899.906.842.624 operacoes (computacionalmente inviavel).`,
      cleanLabel: "Depois: Aproximacao Gulosa O(n^2)",
      cleanCode: `public Set<String> coberturaGulosa(Set<String> estadosNecessarios, Map<String, Set<String>> estacoes) {
  Set<String> estadosPendentes = new HashSet<>(estadosNecessarios);
  Set<String> estacoesFinais = new HashSet<>();

  while (!estadosPendentes.isEmpty()) {
    String melhorEstacao = null;
    Set<String> estadosCobertos = new HashSet<>();

    for (Map.Entry<String, Set<String>> entry : estacoes.entrySet()) {
      Set<String> cobertos = new HashSet<>(entry.getValue());
      cobertos.retainAll(estadosPendentes); // Intersecao

      if (cobertos.size() > estadosCobertos.size()) {
        melhorEstacao = entry.getKey();
        estadosCobertos = cobertos;
      }
    }

    estadosPendentes.removeAll(estadosCobertos);
    estacoesFinais.add(melhorEstacao);
  }

  return estacoesFinais;
}`,
      refactoringNotes: [
        "A cada rodada escolhe a estacao que cobre a maior quantidade de estados pendentes (otimo local).",
        "Solucao de aproximacao roda em tempo polinomial O(n^2) em vez do intratavel 2^n."
      ]
    }
  ],

  "ga-cap-9": [
    {
      id: "ga-ex-9-1",
      title: "Programacao Dinamica: Problema da Mochila 0/1",
      context: "Caso de uso: maximizar o valor dos itens roubados respeitando a capacidade da mochila.",
      dirtyLabel: "Antes: Guloso Erroneo Escolhe Somente o Mais Caro",
      dirtyCode: `// Escolhe o Aparelho de Som (4 lb, R$ 3000) porque e o mais caro.
// Ocupa a mochila inteira (4 lb) e gera R$ 3000.
// Perde a combinacao otima: Violao (1 lb, R$ 1500) + Notebook (3 lb, R$ 2000) = R$ 3500!`,
      cleanLabel: "Depois: Grade de Programacao Dinamica",
      cleanCode: `public int mochilaDP(int capacidade, int[] pesos, int[] valores) {
  int n = pesos.length;
  int[][] grid = new int[n + 1][capacidade + 1];

  for (int i = 1; i <= n; i++) {
    int pesoAtual = pesos[i - 1];
    int valorAtual = valores[i - 1];

    for (int j = 1; j <= capacidade; j++) {
      if (pesoAtual <= j) {
        grid[i][j] = Math.max(grid[i - 1][j], valorAtual + grid[i - 1][j - pesoAtual]);
      } else {
        grid[i][j] = grid[i - 1][j];
      }
    }
  }

  return grid[n][capacidade]; // Retorna R$ 3.500
}`,
      refactoringNotes: [
        "Resolve subproblemas menores de capacidades parciais (1, 2, 3 e 4 lb).",
        "A formula max(acima, item + acima[restante]) garante a resposta globalmente otima."
      ]
    }
  ],

  "ga-cap-10": [
    {
      id: "ga-ex-10-1",
      title: "K-Vizinhos Mais Proximos (KNN): Classificacao Euclidiana",
      context: "Caso de uso: classificar uma fruta como Toranja ou Laranja com base em tamanho e cor.",
      dirtyLabel: "Antes: Regra Fixa Arbitaria (If-Else Fragil)",
      dirtyCode: `public String classificarSecreta(double tamanho, double vermelhidao) {
  // Limiares fixos que quebram facilmente com pequenas variacoes naturais
  if (tamanho > 4.0 && vermelhidao > 3.5) return "Toranja";
  return "Laranja";
}`,
      cleanLabel: "Depois: Classificador KNN com Distancia Euclidiana",
      cleanCode: `public String knnClassificar(double[] novaFruta, List<double[]> dados, List<String> classes, int k) {
  List<Neighbor> vizinhos = new ArrayList<>();

  for (int i = 0; i < dados.size(); i++) {
    double d = distanciaEuclidiana(novaFruta, dados.get(i));
    vizinhos.add(new Neighbor(d, classes.get(i)));
  }

  vizinhos.sort(Comparator.comparingDouble(n -> n.distancia));

  // Votacao por maioria entre os k mais proximos
  Map<String, Integer> votos = new HashMap<>();
  for (int i = 0; i < k; i++) {
    String classe = vizinhos.get(i).classe;
    votos.put(classe, votos.getOrDefault(classe, 0) + 1);
  }

  return Collections.max(votos.entrySet(), Map.Entry.comparingByValue()).getKey();
}

private double distanciaEuclidiana(double[] a, double[] b) {
  double soma = 0;
  for (int i = 0; i < a.length; i++) {
    soma += Math.pow(a[i] - b[i], 2);
  }
  return Math.sqrt(soma);
}`,
      refactoringNotes: [
        "Substitui heuristica manual rigida por aprendizado baseado em proximidade no espaco vetorial.",
        "Demonstra a aplicacao direta de KNN em OCR, recomendacao de filmes e triagem de dados."
      ]
    }
  ],

  "ga-cap-11": [
    {
      id: "ga-ex-11-1",
      title: "Filtro de Bloom: Consulta Probabilistica de Alta Escala",
      context: "Caso de uso: verificar se uma URL ja foi visitada por um web crawler sem consultar o banco em disco.",
      dirtyLabel: "Antes: Consulta em Banco Relacional O(log n) com I/O de Disco",
      dirtyCode: `public boolean urlJaVisitadaLenta(String url) {
  // Consulta pesada ao disco a cada link encontrado na web: afoga o banco de dados
  return database.query("SELECT COUNT(*) FROM urls WHERE link = ?", url) > 0;
}`,
      cleanLabel: "Depois: Filtro de Bloom em Memoria (Zero Falsos Negativos)",
      cleanCode: `public class BloomFilter {
  private BitSet bitSet;
  private int size;

  public BloomFilter(int size) {
    this.size = size;
    this.bitSet = new BitSet(size);
  }

  public void add(String item) {
    bitSet.set(hash1(item));
    bitSet.set(hash2(item));
    bitSet.set(hash3(item));
  }

  public boolean mightContain(String item) {
    // Se qualquer bit for falso, temos certeza matematica que o item nunca foi visto!
    if (!bitSet.get(hash1(item))) return false;
    if (!bitSet.get(hash2(item))) return false;
    return bitSet.get(hash3(item));
  }
}`,
      refactoringNotes: [
        "Economiza 99% das chamadas a banco de dados com custo desprezivel de memoria.",
        "Garante ausência total de falsos negativos: se disser que nao existe, nao existe."
      ]
    }
  ]
};

