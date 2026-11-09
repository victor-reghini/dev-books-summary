/**
 * Especificacao de Animacao Interativa Passo a Passo para os 11 Capitulos de "Entendendo Algoritmos" (Aditya Y. Bhargava)
 * Totalmente compativel com o motor Protocol Explorer (pattern-visualizer.js): Topologia SVG,
 * Pacotes Animados, Call Stack e Inspetor de Estado JSON em Tempo Real.
 */

export const grokkingAlgorithmsAnimations = {
  "ga-cap-1": {
    code: "A01",
    layerIndex: 1,
    scopeType: "Pesquisa & Complexidade Big O",
    nodes: [
      { id: "Searcher", label: "Pesquisador", stereo: "«client»", x: 130, y: 140, addr: "0xGA01", methods: ["pesquisaSimples()", "pesquisaBinaria()"] },
      { id: "ListArray", label: "Array Ordenado (1..128)", stereo: "«indexed»", x: 440, y: 80, addr: "0xGA02", methods: ["get(mid)", "slice()"] },
      { id: "Bisector", label: "Calculador Mediano", stereo: "«log2»", x: 440, y: 240, addr: "0xGA03", methods: ["mid = (low + high) / 2"] },
      { id: "BigOMeter", label: "Medidor Big O", stereo: "«complexity»", x: 750, y: 160, addr: "0xGA04", methods: ["etapasMax = log2(n)"] }
    ],
    links: [
      { from: "Searcher", to: "ListArray", label: "1. busca alvo (73)" },
      { from: "ListArray", to: "Bisector", label: "2. calcula indice medio" },
      { from: "Bisector", to: "ListArray", label: "3. descarta metade" },
      { from: "Bisector", to: "BigOMeter", label: "4. computa etapas" }
    ],
    steps: [
      {
        title: "Inicializacao dos Limites (low = 0, high = 127)",
        narration: "Buscando o numero 73 em um array ordenado de 128 elementos. Definimos os limites nos extremos do array. A pesquisa simples precisaria de ate 128 etapas no pior caso.",
        from: "Searcher", to: "ListArray", call: "pesquisaBinaria(lista, 73)",
        activeNodes: ["Searcher", "ListArray"],
        stack: ["main()", "pesquisaBinaria(0, 127, target=73)"],
        state: { low: 0, high: 127, mid: "indefinido", chute: "indefinido", candidatosRestantes: 128, maxEtapas: 7 }
      },
      {
        title: "Primeiro Corte: Chute no Ponto Medio 64",
        narration: "O calculador define mid = (0 + 127) / 2 = 63 (valor 64). O chute 64 e menor que 73 ('muito baixo'). Eliminamos toda a metade inferior de 0 a 63 de uma so vez.",
        from: "ListArray", to: "Bisector", call: "mid = floor((0 + 127) / 2) -> 63",
        activeNodes: ["ListArray", "Bisector"],
        stack: ["pesquisaBinaria()", "avaliarChute(64 < 73)"],
        state: { low: 64, high: 127, mid: 63, valorMid: 64, resultado: "Muito baixo! low = mid + 1", candidatosRestantes: 64 }
      },
      {
        title: "Segundo Corte: Chute no Ponto Medio 96",
        narration: "Novo intervalo de 64 a 127. Calculamos mid = (64 + 127) / 2 = 95 (valor 96). O chute 96 e maior que 73 ('muito alto'). A metade superior de 96 a 127 e descartada.",
        from: "Bisector", to: "ListArray", call: "mid = floor((64 + 127) / 2) -> 95",
        activeNodes: ["Bisector", "ListArray"],
        stack: ["pesquisaBinaria()", "avaliarChute(96 > 73)"],
        state: { low: 64, high: 94, mid: 95, valorMid: 96, resultado: "Muito alto! high = mid - 1", candidatosRestantes: 31 }
      },
      {
        title: "Convergencia Rapida: Ajuste Fino",
        narration: "Em apenas mais 3 rodadas rapidas (cortando para 15, 7 e 3 candidatos), os ponteiros se estreitam diretamente sobre a posicao exata.",
        from: "Bisector", to: "BigOMeter", call: "registrarRodada(5)",
        activeNodes: ["Bisector", "BigOMeter"],
        stack: ["pesquisaBinaria()", "estreitarIntervalo()"],
        state: { low: 72, high: 74, mid: 72, valorMid: 73, resultado: "Alvo encontrado!", rodadaAtual: 6 }
      },
      {
        title: "Alvo Encontrado em Tempo Logaritmico O(log n)",
        narration: "O elemento 73 foi localizado na posicao 72 em apenas 6 etapas. Enquanto a busca simples percorreria 73 comparacoes lineares, a busca binaria garantiu no maximo log2(128) = 7 operacoes.",
        from: "BigOMeter", to: "Searcher", call: "retornarIndice(72)",
        activeNodes: ["BigOMeter", "Searcher"],
        stack: ["pesquisaBinaria() -> return 72"],
        state: { indiceEncontrado: 72, comparacoesRealizadas: 6, complexidade: "O(log n)", economiaOperacoes: "91.8%" }
      }
    ]
  },

  "ga-cap-2": {
    code: "A02",
    layerIndex: 2,
    scopeType: "Memoria & Ordenacao por Selecao",
    nodes: [
      { id: "Client", label: "Catalogo de Musicas", stereo: "«dataset»", x: 130, y: 140, addr: "0xGA05", methods: ["ordenarPorPlayCount()"] },
      { id: "Unsorted", label: "Array Nao Ordenado", stereo: "«memory»", x: 440, y: 80, addr: "0xGA06", methods: ["buscaMenor()", "pop(idx)"] },
      { id: "Scanner", label: "Varredor de Minimo", stereo: "«scanner»", x: 440, y: 240, addr: "0xGA07", methods: ["comparar(a, b)"] },
      { id: "Sorted", label: "Novo Array Ordenado", stereo: "«result»", x: 750, y: 160, addr: "0xGA08", methods: ["append(menor)"] }
    ],
    links: [
      { from: "Client", to: "Unsorted", label: "1. envia 5 faixas" },
      { from: "Unsorted", to: "Scanner", label: "2. varre n elementos" },
      { from: "Scanner", to: "Sorted", label: "3. transfere menor item" },
      { from: "Sorted", to: "Client", label: "4. lista ordenada O(n^2)" }
    ],
    steps: [
      {
        title: "Estado Inicial: Memoria e Array Desordenado",
        narration: "Temos uma lista com 5 faixas e seus contadores de reproducao: [156, 141, 35, 94, 88]. O objetivo e ordenar da menos ouvida para a mais ouvida.",
        from: "Client", to: "Unsorted", call: "ordenarPorSelecao(lista)",
        activeNodes: ["Client", "Unsorted"],
        stack: ["main()", "ordenarPorSelecao(itens=[156, 141, 35, 94, 88])"],
        state: { listaOriginal: [156, 141, 35, 94, 88], novaLista: [], comparacoes: 0, tamanho: 5 }
      },
      {
        title: "Primeira Passada: Encontrando o Menor Elemento (35)",
        narration: "O varredor percorre todos os 5 elementos. Compara 156 com 141, 141 com 35, 35 com 94 e 35 com 88. O menor valor absoluto e 35 no indice 2.",
        from: "Unsorted", to: "Scanner", call: "buscaMenor([156, 141, 35, 94, 88])",
        activeNodes: ["Unsorted", "Scanner"],
        stack: ["ordenarPorSelecao()", "buscaMenor() -> min=35 (idx=2)"],
        state: { menorValor: 35, menorIndice: 2, comparacoesFeitas: 5, arrayRestante: [156, 141, 94, 88] }
      },
      {
        title: "Transferencia para o Novo Array",
        narration: "O item 35 e removido da lista original e anexado ao inicio da nova lista ordenada. A lista original agora contem 4 itens restantes.",
        from: "Scanner", to: "Sorted", call: "novaLista.push(pop(2))",
        activeNodes: ["Scanner", "Sorted"],
        stack: ["ordenarPorSelecao()", "novaLista.push(35)"],
        state: { novaLista: [35], itensRestantes: 4, memoriaLiberada: "1 slot realocado" }
      },
      {
        title: "Passadas Subsequentes: 88, 94 e 141",
        narration: "A busca repete: varre 4 itens e acha 88; varre 3 itens e acha 94; varre 2 itens e acha 141. O total de comparacoes e 5 + 4 + 3 + 2 + 1 = 15 operacoes.",
        from: "Unsorted", to: "Sorted", call: "repetirVarredura()",
        activeNodes: ["Unsorted", "Sorted"],
        stack: ["ordenarPorSelecao()", "loopExterno(iteracoes=4)"],
        state: { novaLista: [35, 88, 94, 141], ultimoPendente: 156, formula: "n * (n/2) comparacoes medias" }
      },
      {
        title: "Conclusao da Ordenacao por Selecao O(n^2)",
        narration: "O ultimo item (156) e inserido. A lista esta completamente ordenada. Como a busca precisou de n etapas repetidas n vezes, a complexidade e O(n^2).",
        from: "Sorted", to: "Client", call: "retornarLista([35, 88, 94, 141, 156])",
        activeNodes: ["Sorted", "Client"],
        stack: ["ordenarPorSelecao() -> finalizado"],
        state: { resultadoFinal: [35, 88, 94, 141, 156], complexidadeFormal: "O(n^2)", operacoesTotais: 15 }
      }
    ]
  },

  "ga-cap-3": {
    code: "A03",
    layerIndex: 3,
    scopeType: "Recursao & Call Stack",
    nodes: [
      { id: "App", label: "Chamador Principal", stereo: "«entry»", x: 130, y: 140, addr: "0xGA09", methods: ["calcularFatorial(3)"] },
      { id: "StackFrame", label: "Pilha de Chamada (RAM)", stereo: "«LIFO»", x: 440, y: 80, addr: "0xGA10", methods: ["push(frame)", "pop()"] },
      { id: "BaseCase", label: "Avaliador de Caso-Base", stereo: "«guard»", x: 440, y: 240, addr: "0xGA11", methods: ["isBaseCase(x == 1)"] },
      { id: "Result", label: "Resolucao de Retorno", stereo: "«unwind»", x: 750, y: 160, addr: "0xGA12", methods: ["multiplicar(x, sub)"] }
    ],
    links: [
      { from: "App", to: "StackFrame", label: "1. empilha fat(3)" },
      { from: "StackFrame", to: "BaseCase", label: "2. testa caso-base" },
      { from: "BaseCase", to: "StackFrame", label: "3. empilha fat(2), fat(1)" },
      { from: "StackFrame", to: "Result", label: "4. desempilha multiplicando" }
    ],
    steps: [
      {
        title: "Invocacao Inicial: fat(3) empilhado na memoria",
        narration: "A funcao fat(3) e invocada. O computador aloca um quadro de memoria na pilha com x = 3 e pausa a execucao para resolver fat(2).",
        from: "App", to: "StackFrame", call: "fat(3)",
        activeNodes: ["App", "StackFrame"],
        stack: ["main()", "fat(x=3)"],
        state: { pilha: ["fat(x=3)"], casoBaseAlcancado: false, pendente: "3 * fat(2)" }
      },
      {
        title: "Chamada Recursiva: fat(2) no topo da pilha",
        narration: "Como x=2 nao e o caso-base, uma nova caixa de memoria fat(2) e colocada no topo da pilha. A caixa de fat(3) continua aguardando abaixo.",
        from: "StackFrame", to: "BaseCase", call: "x == 1 ? false : fat(2)",
        activeNodes: ["StackFrame", "BaseCase"],
        stack: ["main()", "fat(x=3)", "fat(x=2)"],
        state: { pilha: ["fat(x=3)", "fat(x=2)"], profundidade: 2, pendente: "2 * fat(1)" }
      },
      {
        title: "Caso-Base Atingido: fat(1) retorna 1",
        narration: "Invocamos fat(1). A condicao de guarda identifica que x == 1. Esse e o caso-base! Nenhuma nova chamada e feita: a funcao retorna 1 imediatamente.",
        from: "BaseCase", to: "StackFrame", call: "retornar 1 (caso-base)",
        activeNodes: ["BaseCase", "StackFrame"],
        stack: ["main()", "fat(x=3)", "fat(x=2)", "fat(x=1)"],
        state: { pilha: ["fat(x=3)", "fat(x=2)", "fat(x=1)"], casoBaseAlcancado: true, valorRetornado: 1 }
      },
      {
        title: "Desempilhando: Resolucao de fat(2)",
        narration: "O quadro fat(1) e desempilhado. Agora fat(2) retoma sua execucao: calcula 2 * 1 = 2 e devolve esse resultado para quem a chamou.",
        from: "StackFrame", to: "Result", call: "fat(2) = 2 * 1 -> 2",
        activeNodes: ["StackFrame", "Result"],
        stack: ["main()", "fat(x=3)", "fat(x=2) [desempilhando]"],
        state: { pilha: ["fat(x=3)"], resultadoParcial: 2, memoriaRecuperada: "1 frame descartado" }
      },
      {
        title: "Conclusao do Fatorial: fat(3) = 6",
        narration: "A caixa original fat(3) desempilha e calcula 3 * 2 = 6. A pilha esta limpa e a resposta 6 e entregue com sucesso ao chamador.",
        from: "Result", to: "App", call: "retornar 6",
        activeNodes: ["Result", "App"],
        stack: ["main()"],
        state: { resultadoFinal: 6, pilhaVazia: true, riscoStackOverflow: "Evitado pelo caso-base" }
      }
    ]
  },

  "ga-cap-4": {
    code: "A04",
    layerIndex: 4,
    scopeType: "Dividir para Conquistar & Quicksort",
    nodes: [
      { id: "ArrayInput", label: "Array Bruto [33, 15, 10]", stereo: "«input»", x: 130, y: 140, addr: "0xGA13", methods: ["quicksort()"] },
      { id: "PivotSelector", label: "Seletor de Pivo (33)", stereo: "«pivot»", x: 440, y: 80, addr: "0xGA14", methods: ["escolherPivo()"] },
      { id: "Partitioner", label: "Particionador D&C", stereo: "«subarrays»", x: 440, y: 240, addr: "0xGA15", methods: ["menores", "maiores"] },
      { id: "Merger", label: "Concatenador Final", stereo: "«sorted»", x: 750, y: 160, addr: "0xGA16", methods: ["concat(menores, pivo, maiores)"] }
    ],
    links: [
      { from: "ArrayInput", to: "PivotSelector", label: "1. seleciona pivo" },
      { from: "PivotSelector", to: "Partitioner", label: "2. divide em subarrays" },
      { from: "Partitioner", to: "Partitioner", label: "3. recursao D&C" },
      { from: "Partitioner", to: "Merger", label: "4. concatena metades" }
    ],
    steps: [
      {
        title: "Caso-Base de D&C e Escolha do Pivo",
        narration: "Recebemos o array [33, 15, 10]. Como o tamanho e maior que 1, aplicamos D&C. Escolhemos o primeiro elemento (33) como pivo provisorio.",
        from: "ArrayInput", to: "PivotSelector", call: "pivo = array[0] -> 33",
        activeNodes: ["ArrayInput", "PivotSelector"],
        stack: ["quicksort([33, 15, 10])"],
        state: { pivo: 33, itensParaParticionar: [15, 10], profundidadeArvore: 1 }
      },
      {
        title: "Particionamento: Menores e Maiores",
        narration: "Comparamos os elementos restantes com o pivo 33: 15 <= 33 (menor) e 10 <= 33 (menor). Nenhum elemento e maior. Subarrays formados: menores = [15, 10], maiores = [].",
        from: "PivotSelector", to: "Partitioner", call: "particionar(pivo=33)",
        activeNodes: ["PivotSelector", "Partitioner"],
        stack: ["quicksort([33, 15, 10])", "particionar()"],
        state: { menores: [15, 10], pivo: 33, maiores: [], particionamento: "Concluido" }
      },
      {
        title: "Recursao no Subarray Menores: [15, 10]",
        narration: "Invocamos quicksort([15, 10]). Escolhemos 15 como pivo. O elemento 10 vai para menores; maiores fica vazio. menores = [10], pivo = 15.",
        from: "Partitioner", to: "Partitioner", call: "quicksort([15, 10])",
        activeNodes: ["Partitioner"],
        stack: ["quicksort([33, 15, 10])", "quicksort([15, 10])"],
        state: { pivoSub: 15, subMenores: [10], subMaiores: [], casoBaseAtingido: "[10] tem 1 item" }
      },
      {
        title: "Resolucao dos Casos-Base",
        narration: "O subarray [10] atinge o caso-base (1 elemento = ordenado). Concatenamos: quicksort([10]) + [15] + [] = [10, 15].",
        from: "Partitioner", to: "Merger", call: "concat([10], [15], []) -> [10, 15]",
        activeNodes: ["Partitioner", "Merger"],
        stack: ["quicksort([33, 15, 10])", "unwind()"],
        state: { subResultado: [10, 15], pivoRaiz: 33, maioresRaiz: [] }
      },
      {
        title: "Concatenacao Global O(n log n)",
        narration: "Juntamos tudo no nivel superior: [10, 15] + [33] + [] = [10, 15, 33]. Em media, a profundidade da arvore e O(log n) com n comparacoes por nivel = O(n log n).",
        from: "Merger", to: "ArrayInput", call: "retornar [10, 15, 33]",
        activeNodes: ["Merger", "ArrayInput"],
        stack: ["quicksort() -> [10, 15, 33]"],
        state: { arrayOrdenado: [10, 15, 33], complexidadeMedia: "O(n log n)", piorCasoEvitado: "Pivo aleatorio" }
      }
    ]
  },

  "ga-cap-5": {
    code: "A05",
    layerIndex: 5,
    scopeType: "Tabelas Hash & Fator de Carga",
    nodes: [
      { id: "ClientKey", label: "Requisicao ('maca')", stereo: "«key»", x: 130, y: 140, addr: "0xGA17", methods: ["set('maca', 1.50)", "get('maca')"] },
      { id: "HashFunc", label: "Funcao Hash", stereo: "«hash()»", x: 440, y: 80, addr: "0xGA18", methods: ["hash('maca') % capacidade"] },
      { id: "Buckets", label: "Array de Baldes (Slots)", stereo: "«storage»", x: 440, y: 240, addr: "0xGA19", methods: ["slot[2] -> lista"] },
      { id: "LoadMonitor", label: "Monitor de Fator de Carga", stereo: "«resizer»", x: 750, y: 160, addr: "0xGA20", methods: ["loadFactor = itens / slots"] }
    ],
    links: [
      { from: "ClientKey", to: "HashFunc", label: "1. envia string chave" },
      { from: "HashFunc", to: "Buckets", label: "2. mapeia para indice 2" },
      { from: "Buckets", to: "LoadMonitor", label: "3. incrementa total de itens" },
      { from: "LoadMonitor", to: "Buckets", label: "4. aciona redimensionamento se > 0.7" }
    ],
    steps: [
      {
        title: "Insercao da Chave 'maca' e Calculo do Indice",
        narration: "Queremos guardar o preco da 'maca' (R$ 1.50). A chave 'maca' passa pela funcao hash, que calcula o codigo hash e aplica o modulo pelo total de slots (4), resultando no indice 2.",
        from: "ClientKey", to: "HashFunc", call: "hash('maca') % 4 -> slot 2",
        activeNodes: ["ClientKey", "HashFunc"],
        stack: ["tabelaHash.put('maca', 1.50)", "calcularIndice()"],
        state: { chave: "maca", valor: 1.50, slotsTotais: 4, slotAlvo: 2 }
      },
      {
        title: "Armazenamento no Slot e Acesso O(1)",
        narration: "O par ['maca', 1.50] e alocado diretamente no slot 2. A leitura futura sera instantanea em O(1), sem necessidade de busca linear ou binaria.",
        from: "HashFunc", to: "Buckets", call: "slots[2].append(['maca', 1.50])",
        activeNodes: ["HashFunc", "Buckets"],
        stack: ["tabelaHash.put()", "gravarBucket()"],
        state: { slotsOcupados: 1, slotsTotais: 4, itens: 1, fatorDeCarga: 0.25 }
      },
      {
        title: "Ocorrencia de Colisao: Inserindo 'abacate'",
        narration: "Inserimos 'abacate'. Por coincidencia matematica, hash('abacate') % 4 tambem resulta no slot 2. O mecanismo de encadeamento adiciona 'abacate' na lista vinculada do slot 2.",
        from: "ClientKey", to: "Buckets", call: "colisaoDetectada: slots[2].encadear('abacate')",
        activeNodes: ["ClientKey", "Buckets"],
        stack: ["tabelaHash.put('abacate', 3.00)", "resolverColisaoPorLista()"],
        state: { slot2Contem: ["maca", "abacate"], tipoTratamento: "Encadeamento (Chaining)", itens: 2, fatorDeCarga: 0.50 }
      },
      {
        title: "Monitoramento do Fator de Carga (0.75 > 0.7)",
        narration: "Ao inserir 'leite', o total de itens sobe para 3 em 4 slots. Fator de carga = 3 / 4 = 0.75. Como ultrapassou o limiar de seguranca de 0.7, o monitor dispara o alerta de redimensionamento.",
        from: "Buckets", to: "LoadMonitor", call: "verificarCarga(3 / 4 = 0.75)",
        activeNodes: ["Buckets", "LoadMonitor"],
        stack: ["tabelaHash.verificarCapacidade()", "alertaResize()"],
        state: { fatorDeCarga: 0.75, limiteSeguranca: 0.70, acaoRequerida: "Duplicar array para 8 slots" }
      },
      {
        title: "Redimensionamento e Rehash Completo",
        narration: "A tabela cria um novo array de 8 slots e recalcula os indices de todos os itens existentes. As colisoes diminuem e o fator de carga recua para 3 / 8 = 0.375, preservando a velocidade O(1).",
        from: "LoadMonitor", to: "Buckets", call: "rehashAll(novaCapacidade=8)",
        activeNodes: ["LoadMonitor", "Buckets"],
        stack: ["tabelaHash.redimensionar(8) -> concluido"],
        state: { slotsTotais: 8, itens: 3, novoFatorDeCarga: 0.375, custoAmortizado: "O(1) por operacao" }
      }
    ]
  },

  "ga-cap-6": {
    code: "A06",
    layerIndex: 6,
    scopeType: "Grafos & Pesquisa em Largura (BFS)",
    nodes: [
      { id: "Voce", label: "Voce (Origem)", stereo: "«source»", x: 130, y: 140, addr: "0xGA21", methods: ["pesquisarVendedorManga()"] },
      { id: "QueueFIFO", label: "Fila de Espera FIFO", stereo: "«queue»", x: 440, y: 80, addr: "0xGA22", methods: ["enqueue(amigo)", "dequeue()"] },
      { id: "CheckedSet", label: "Conjunto de Visitados", stereo: "«set»", x: 440, y: 240, addr: "0xGA23", methods: ["has(pessoa)", "add(pessoa)"] },
      { id: "TargetNode", label: "Thom (Vendedor de Manga)", stereo: "«target»", x: 750, y: 160, addr: "0xGA24", methods: ["eValido() -> true"] }
    ],
    links: [
      { from: "Voce", to: "QueueFIFO", label: "1. enfileira amigos de 1º grau" },
      { from: "QueueFIFO", to: "CheckedSet", label: "2. verifica se ja visitou" },
      { from: "QueueFIFO", to: "QueueFIFO", label: "3. enfileira amigos de 2º grau" },
      { from: "QueueFIFO", to: "TargetNode", label: "4. encontra caminho mais curto" }
    ],
    steps: [
      {
        title: "Inicializacao da BFS e Enfileiramento de 1º Grau",
        narration: "Voce quer achar um vendedor de manga. Adicionamos seus amigos diretos de primeiro grau (Alice, Bob e Claire) na fila FIFO.",
        from: "Voce", to: "QueueFIFO", call: "fila.push('Alice', 'Bob', 'Claire')",
        activeNodes: ["Voce", "QueueFIFO"],
        stack: ["main()", "bfs('Voce')"],
        state: { fila: ["Alice", "Bob", "Claire"], visitados: ["Voce"], grauAtual: 1 }
      },
      {
        title: "Verificando Alice e Evitando Ciclos",
        narration: "Desenfileiramos Alice. Alice nao vende manga. Registramos Alice no conjunto de visitados para nunca mais reprocessa-la caso ocorram ciclos no grafo.",
        from: "QueueFIFO", to: "CheckedSet", call: "verificar('Alice') -> falso; visitados.add('Alice')",
        activeNodes: ["QueueFIFO", "CheckedSet"],
        stack: ["bfs()", "testarPessoa('Alice')"],
        state: { pessoaAtual: "Alice", vendeManga: false, visitados: ["Voce", "Alice"], filaRestante: ["Bob", "Claire"] }
      },
      {
        title: "Adicionando Conexoes de 2º Grau na Fila",
        narration: "Como Alice nao e a vendedora, adicionamos os amigos dela (Peggy) no final da fila. A fila FIFO garante que Bob e Claire serao avaliados ANTES de Peggy.",
        from: "QueueFIFO", to: "QueueFIFO", call: "fila.push(amigosDeAlice=['Peggy'])",
        activeNodes: ["QueueFIFO"],
        stack: ["bfs()", "enfileirarVizinhos('Alice')"],
        state: { fila: ["Bob", "Claire", "Peggy"], ordemGarantida: "1º grau antes de 2º grau" }
      },
      {
        title: "Avaliacao de Claire e Descoberta de Thom",
        narration: "Bob nao vende manga. Passamos para Claire, que tambem nao vende manga, mas tem como vizinho Thom. Thom e enfileirado no final da fila.",
        from: "QueueFIFO", to: "QueueFIFO", call: "fila.push('Thom', 'Jonny')",
        activeNodes: ["QueueFIFO"],
        stack: ["bfs()", "processar('Claire')"],
        state: { fila: ["Peggy", "Thom", "Jonny"], visitados: ["Voce", "Alice", "Bob", "Claire"] }
      },
      {
        title: "Vendedor Localizado com Menor Numero de Saltos",
        narration: "Ao processar Thom (cujo nome termina com 'm'), confirmamos que ele e vendedor de mangas! A BFS garante que Thom e a conexao mais proxima possivel.",
        from: "QueueFIFO", to: "TargetNode", call: "ehVendedor('Thom') -> TRUE!",
        activeNodes: ["QueueFIFO", "TargetNode"],
        stack: ["bfs() -> encontrou 'Thom' em 2 saltos"],
        state: { caminhoMaisCurto: "Voce -> Claire -> Thom", distancia: "2 saltos", complexidadeTotal: "O(V + E)" }
      }
    ]
  },

  "ga-cap-7": {
    code: "A07",
    layerIndex: 7,
    scopeType: "Grafos Ponderados & Algoritmo de Dijkstra",
    nodes: [
      { id: "Start", label: "Inicio (Livro)", stereo: "«origin»", x: 130, y: 140, addr: "0xGA25", methods: ["custo = 0"] },
      { id: "CostTable", label: "Tabela de Custos & Pais", stereo: "«costs»", x: 440, y: 80, addr: "0xGA26", methods: ["getMaisBarato()", "atualizarCusto()"] },
      { id: "Relaxation", label: "Relaxamento de Arestas", stereo: "«relax»", x: 440, y: 240, addr: "0xGA27", methods: ["novoCusto < custoAtual"] },
      { id: "Piano", label: "Destino (Piano)", stereo: "«goal»", x: 750, y: 160, addr: "0xGA28", methods: ["custoFinal = 35"] }
    ],
    links: [
      { from: "Start", to: "CostTable", label: "1. inicializa custos diretos" },
      { from: "CostTable", to: "Relaxation", label: "2. seleciona no mais barato" },
      { from: "Relaxation", to: "CostTable", label: "3. atualiza vizinhos" },
      { from: "CostTable", to: "Piano", label: "4. extrai rota otima (R$ 35)" }
    ],
    steps: [
      {
        title: "Inicializacao da Tabela de Custos",
        narration: "Rama quer trocar o livro pelo piano. Vizinhos diretos do Inicio: Disco (custo 5) e Poster (custo 0). O destino Piano recebe custo infinito.",
        from: "Start", to: "CostTable", call: "inicializar(custos, pais)",
        activeNodes: ["Start", "CostTable"],
        stack: ["main()", "dijkstra(grafo, 'Inicio', 'Piano')"],
        state: { custos: { Disco: 5, Poster: 0, Piano: "infinito" }, pais: { Disco: "Inicio", Poster: "Inicio", Piano: null }, processados: [] }
      },
      {
        title: "Etapa 1: Processar o No Mais Barato (Poster)",
        narration: "O no nao processado de menor custo e o Poster (custo 0). Examinamos os vizinhos do Poster: Guitarra (peso 30) e Bateria (peso 35).",
        from: "CostTable", to: "Relaxation", call: "acharMaisBarato() -> Poster (custo 0)",
        activeNodes: ["CostTable", "Relaxation"],
        stack: ["dijkstra()", "processarNo('Poster')"],
        state: { noAtual: "Poster", custosAtualizados: { Guitarra: 30, Bateria: 35 }, processados: ["Poster"] }
      },
      {
        title: "Etapa 2: Processar o Disco (Custo 5)",
        narration: "O proximo no mais barato e o Disco (custo 5). Seus vizinhos: Guitarra (aresta de peso 15). Custo total pelo Disco: 5 + 15 = 20. Como 20 < 30, atualizamos!",
        from: "Relaxation", to: "CostTable", call: "atualizar: Guitarra (20 < 30), pai = Disco",
        activeNodes: ["Relaxation", "CostTable"],
        stack: ["dijkstra()", "relaxarAresta('Disco' -> 'Guitarra')"],
        state: { noAtual: "Disco", menorCustoGuitarra: 20, novoPaiGuitarra: "Disco", processados: ["Poster", "Disco"] }
      },
      {
        title: "Etapa 3: Processar a Guitarra e Chegar ao Piano",
        narration: "No mais barato: Guitarra (custo 20). Da Guitarra para o Piano a aresta custa 20. Custo total ate o Piano: 20 + 20 = 40. Pai do Piano = Guitarra.",
        from: "CostTable", to: "Piano", call: "atualizar: Piano (40 < infinito)",
        activeNodes: ["CostTable", "Piano"],
        stack: ["dijkstra()", "relaxarAresta('Guitarra' -> 'Piano')"],
        state: { custos: { Piano: 40 }, pais: { Piano: "Guitarra" }, processados: ["Poster", "Disco", "Guitarra"] }
      },
      {
        title: "Conclusao e Reconstrucao do Caminho Mais Barato",
        narration: "Avaliando Bateria e caminhos finais, o menor custo consolidado para o Piano e atingido. Rastreamos os pais de tras para frente para exibir a rota ideal.",
        from: "Piano", to: "Start", call: "reconstruirCaminho('Piano' ate 'Inicio')",
        activeNodes: ["Piano", "Start"],
        stack: ["dijkstra() -> rota otima"],
        state: { rotaVencedora: "Inicio -> Disco -> Guitarra -> Piano", custoTotal: 35, garantiaDijkstra: "Pesos estritamente positivos" }
      }
    ]
  },

  "ga-cap-8": {
    code: "A08",
    layerIndex: 8,
    scopeType: "Algoritmos Gulosos & NP-Completude",
    nodes: [
      { id: "StatesNeeded", label: "Estados Pendentes", stereo: "«states»", x: 130, y: 140, addr: "0xGA29", methods: ["estadosRestantes()"] },
      { id: "GreedySelector", label: "Seletor Ganancioso", stereo: "«greedy»", x: 440, y: 80, addr: "0xGA30", methods: ["melhorEstacao()", "intersecao(&)"] },
      { id: "StationPool", label: "Estacoes de Radio", stereo: "«stations»", x: 440, y: 240, addr: "0xGA31", methods: ["kone, ktwo, kthree..."] },
      { id: "FinalCoverage", label: "Cobertura Escolhida", stereo: "«solution»", x: 750, y: 160, addr: "0xGA32", methods: ["adicionarEstacao()"] }
    ],
    links: [
      { from: "StatesNeeded", to: "GreedySelector", label: "1. estados nao cobertos" },
      { from: "StationPool", to: "GreedySelector", label: "2. compara coberturas" },
      { from: "GreedySelector", to: "FinalCoverage", label: "3. elege estacao localmente ideal" },
      { from: "FinalCoverage", to: "StatesNeeded", label: "4. remove estados cobertos" }
    ],
    steps: [
      {
        title: "Problema da Cobertura de Conjuntos (Set Covering)",
        narration: "Precisamos cobrir 8 estados americanos com o menor numero de estacoes de radio. Testar todos os subconjuntos exigiria 2^n combinacoes (NP-Completo). Adotamos uma solucao gulosa.",
        from: "StatesNeeded", to: "GreedySelector", call: "estadosPendentes = {'id', 'nv', 'ut', 'wa', 'mt', 'or', 'ca', 'az'}",
        activeNodes: ["StatesNeeded", "GreedySelector"],
        stack: ["main()", "coberturaGulosa()"],
        state: { totalEstados: 8, estacoesDisponiveis: 5, complexidadeForcaBruta: "2^n (inviavel)" }
      },
      {
        title: "Primeira Escolha Gananciosa: Estacao k_one",
        narration: "Testamos cada estacao contra os estados pendentes. A estacao k_one cobre 3 estados ('id', 'nv', 'ut'), sendo o maior ganho imediato entre todas.",
        from: "StationPool", to: "GreedySelector", call: "k_one & estadosPendentes -> 3 estados",
        activeNodes: ["StationPool", "GreedySelector"],
        stack: ["coberturaGulosa()", "avaliarEstacao('k_one')"],
        state: { melhorEstacao: "k_one", estadosCobertos: ["id", "nv", "ut"], criterio: "Maximo de estados novos" }
      },
      {
        title: "Atualizacao dos Estados Pendentes",
        narration: "Adicionamos k_one a lista final e removemos 'id', 'nv' e 'ut' do conjunto de estados necessarios. Restam 5 estados para cobrir.",
        from: "GreedySelector", to: "StatesNeeded", call: "estadosPendentes -= {'id', 'nv', 'ut'}",
        activeNodes: ["GreedySelector", "StatesNeeded"],
        stack: ["coberturaGulosa()", "subtrairConjuntos()"],
        state: { estacoesEscolhidas: ["k_one"], estadosRestantes: ["wa", "mt", "or", "ca", "az"] }
      },
      {
        title: "Escolhas Subsequentes: k_two e k_three",
        narration: "Na rodada seguinte, k_two cobre 'wa', 'id', 'mt', mas como 'id' ja foi coberto, seu ganho liquido e 2 estados. A gulosa elege k_two, depois k_three.",
        from: "StationPool", to: "FinalCoverage", call: "adicionar('k_two', 'k_three')",
        activeNodes: ["StationPool", "FinalCoverage"],
        stack: ["coberturaGulosa()", "iteracoesRodada()"],
        state: { estacoesEscolhidas: ["k_one", "k_two", "k_three"], estadosRestantes: ["ca", "az"] }
      },
      {
        title: "Solucao de Aproximação em Tempo Polinomial O(n^2)",
        narration: "A estacao k_five e selecionada para cobrir os ultimos estados. Em tempo O(n^2), encontramos 4 estacoes que cobrem 100% dos estados, muito proximo do otimo absoluto.",
        from: "FinalCoverage", to: "StatesNeeded", call: "estadosPendentes.clear()",
        activeNodes: ["FinalCoverage", "StatesNeeded"],
        stack: ["coberturaGulosa() -> concluido"],
        state: { resultadoFinal: ["k_one", "k_two", "k_three", "k_five"], tempoGasto: "O(n^2)", precisaoAproximacao: "O(log n) do otimo" }
      }
    ]
  },

  "ga-cap-9": {
    code: "A09",
    layerIndex: 9,
    scopeType: "Programacao Dinamica (DP)",
    nodes: [
      { id: "Items", label: "Itens da Loja", stereo: "«items»", x: 130, y: 140, addr: "0xGA33", methods: ["Violao(1lb)", "Som(4lb)", "Notebook(3lb)"] },
      { id: "DPGrid", label: "Grade de Subproblemas (DP)", stereo: "«grid»", x: 440, y: 80, addr: "0xGA34", methods: ["grid[item][peso]", "max(anterior, novo)"] },
      { id: "SubEvaluator", label: "Avaliador de Restante", stereo: "«subproblem»", x: 440, y: 240, addr: "0xGA35", methods: ["valor + grid[i-1][resto]"] },
      { id: "MaxBag", label: "Mochila Otimizada (4 lb)", stereo: "«optimal»", x: 750, y: 160, addr: "0xGA36", methods: ["valorTotal = 3500"] }
    ],
    links: [
      { from: "Items", to: "DPGrid", label: "1. introduz item linha a linha" },
      { from: "DPGrid", to: "SubEvaluator", label: "2. consulta subcapacidade anterior" },
      { from: "SubEvaluator", to: "DPGrid", label: "3. grava valor maximo na celula" },
      { from: "DPGrid", to: "MaxBag", label: "4. extrai combinacao global otima" }
    ],
    steps: [
      {
        title: "Construcao da Grade da Mochila 0/1",
        narration: "Mochila suporta 4 libras. Construimos uma grade onde as colunas sao capacidades parciais (1, 2, 3 e 4 lb) e as linhas sao os itens disponiveis.",
        from: "Items", to: "DPGrid", call: "inicializarGrade(linhas=3, colunas=4)",
        activeNodes: ["Items", "DPGrid"],
        stack: ["main()", "mochilaDP()"],
        state: { capacidadeMaxima: 4, itens: ["Violao (1lb, 1500)", "Som (4lb, 3000)", "Notebook (3lb, 2000)"] }
      },
      {
        title: "Linha 1: Preenchimento com o Violao (1 lb, R$ 1.500)",
        narration: "O Violao pesa 1 lb. Ele cabe em todas as capacidades de 1 a 4 lb. Como e o unico item por enquanto, todas as celulas da primeira linha recebem R$ 1.500.",
        from: "Items", to: "DPGrid", call: "linhaViolao: preencher [1500, 1500, 1500, 1500]",
        activeNodes: ["Items", "DPGrid"],
        stack: ["mochilaDP()", "processarLinha(Violao)"],
        state: { linha1: [1500, 1500, 1500, 1500], melhorValor4lb: 1500 }
      },
      {
        title: "Linha 2: Aparelho de Som (4 lb, R$ 3.000)",
        narration: "O Som pesa 4 lb. Nas colunas 1, 2 e 3 lb ele nao cabe, mantendo o valor do Violao (1500). Na coluna de 4 lb, ele cabe sozinho e vale 3000 > 1500. A celula atualiza para 3000.",
        from: "DPGrid", to: "DPGrid", call: "celula[Som][4] = max(1500, 3000) -> 3000",
        activeNodes: ["DPGrid"],
        stack: ["mochilaDP()", "processarLinha(Som)"],
        state: { linha2: [1500, 1500, 1500, 3000], melhorValor4lb: 3000 }
      },
      {
        title: "Linha 3: Notebook (3 lb, R$ 2.000) e o Subproblema",
        narration: "Na coluna 4 lb: o Notebook pesa 3 lb. Sobra 4 - 3 = 1 lb de capacidade! Consultamos a linha anterior na coluna 1 lb (Violao, R$ 1500). Total: 2000 + 1500 = 3500!",
        from: "DPGrid", to: "SubEvaluator", call: "valorNotebook (2000) + grid[Som][1lb] (1500) -> 3500",
        activeNodes: ["DPGrid", "SubEvaluator"],
        stack: ["mochilaDP()", "avaliarSubproblema(capacidadeRestante=1lb)"],
        state: { comparacao: "Manter 3000 vs Novo 3500", valorVencedor: 3500, itensCombinados: ["Notebook", "Violao"] }
      },
      {
        title: "Solucao Otima Consolidada R$ 3.500",
        narration: "A celula inferior direita crava o resultado global otimo: R$ 3.500 com Violao + Notebook, aproveitando perfeitamente as 4 libras sem deixar espaco vago.",
        from: "SubEvaluator", to: "MaxBag", call: "retornarSolucao(itens=['Violao', 'Notebook'], valor=3500)",
        activeNodes: ["SubEvaluator", "MaxBag"],
        stack: ["mochilaDP() -> solucao encontrada"],
        state: { itensFinais: ["Violao", "Notebook"], pesoTotal: 4, valorMaximo: 3500, aplicacoesLCS: "git diff e DNA" }
      }
    ]
  },

  "ga-cap-10": {
    code: "A10",
    layerIndex: 10,
    scopeType: "Aprendizado de Maquina & KNN",
    nodes: [
      { id: "NewSample", label: "Nova Amostra Desconhecida", stereo: "«query»", x: 130, y: 140, addr: "0xGA37", methods: ["classificar(fruta)", "preverVendas(dia)"] },
      { id: "DistanceEngine", label: "Motor Euclidiano", stereo: "«metric»", x: 440, y: 80, addr: "0xGA38", methods: ["distancia(p1, p2)", "sqrt(sum(diff^2))"] },
      { id: "NeighborRank", label: "Seletor de K Vizinhos", stereo: "«topK»", x: 440, y: 240, addr: "0xGA39", methods: ["ordenarPorDistancia()", "pegarTop(K=3)"] },
      { id: "OutputVote", label: "Decisor (Voto / Media)", stereo: "«decision»", x: 750, y: 160, addr: "0xGA40", methods: ["maioriaVotos()", "mediaRegressao()"] }
    ],
    links: [
      { from: "NewSample", to: "DistanceEngine", label: "1. envia vetor de caracteristicas" },
      { from: "DistanceEngine", to: "NeighborRank", label: "2. calcula distancias euclidianas" },
      { from: "NeighborRank", to: "OutputVote", label: "3. isola os 3 vizinhos mais proximos" },
      { from: "OutputVote", to: "NewSample", label: "4. retorna classe ou valor previsto" }
    ],
    steps: [
      {
        title: "Extracao de Caracteristicas Vetoriais",
        narration: "Queremos classificar uma fruta misteriosa. Extraimos duas caracteristicas numericas: tamanho = 4.2 e cor avermelhada = 3.8.",
        from: "NewSample", to: "DistanceEngine", call: "extrairFeatures() -> [4.2, 3.8]",
        activeNodes: ["NewSample", "DistanceEngine"],
        stack: ["main()", "knn.classificar([4.2, 3.8])"],
        state: { featuresAmostra: { tamanho: 4.2, vermelhidao: 3.8 }, kDefinido: 3 }
      },
      {
        title: "Calculo da Distancia Euclidiana para Todos os Pontos",
        narration: "Calculamos a distancia para cada fruta previamente catalogada na base: sqrt((x1 - x2)^2 + (y1 - y2)^2).",
        from: "DistanceEngine", to: "NeighborRank", call: "calcularDistancias(baseDeDados)",
        activeNodes: ["DistanceEngine", "NeighborRank"],
        stack: ["knn()", "calcularDistanciaEuclidiana()"],
        state: { distancias: [{ id: "FrutaA", d: 0.3 }, { id: "FrutaB", d: 0.5 }, { id: "FrutaC", d: 0.7 }, { id: "FrutaD", d: 2.9 }] }
      },
      {
        title: "Isolamento dos K Vizinhos Mais Proximos (K = 3)",
        narration: "Ordenamos as distancias em ordem crescente e pegamos os 3 pontos mais proximos da nossa fruta: Fruta A (d=0.3), Fruta B (d=0.5) e Fruta C (d=0.7).",
        from: "NeighborRank", to: "OutputVote", call: "filtrarTopK(3)",
        activeNodes: ["NeighborRank", "OutputVote"],
        stack: ["knn()", "obterVizinhosProximos()"],
        state: { topKVizinhos: ["FrutaA: Toranja", "FrutaB: Toranja", "FrutaC: Laranja"] }
      },
      {
        title: "Votacao por Maioria (Classificacao)",
        narration: "Entre os 3 vizinhos mais proximos, temos: 2 votos para Toranja e 1 voto para Laranja. A maioria vence o escrutinio.",
        from: "OutputVote", to: "OutputVote", call: "apurarVotos: Toranja=2, Laranja=1",
        activeNodes: ["OutputVote"],
        stack: ["knn()", "computarVotoMajoritario()"],
        state: { contagemVotos: { Toranja: 2, Laranja: 1 }, classeVencedora: "Toranja" }
      },
      {
        title: "Classificacao Confirmada e Modo Regressao",
        narration: "A fruta e confiavelmente classificada como Toranja. Se o objetivo fosse prever vendas de pao (regressao), o KNN calcularia a media das vendas dos 3 vizinhos.",
        from: "OutputVote", to: "NewSample", call: "resultado: 'Toranja' (confianca: 66.7%)",
        activeNodes: ["OutputVote", "NewSample"],
        stack: ["knn() -> 'Toranja'"],
        state: { resultadoClassificacao: "Toranja", modoAlternativo: "Regressao por media", aplicacoesReais: "OCR, Recomendacoes Netflix" }
      }
    ]
  },

  "ga-cap-11": {
    code: "A11",
    layerIndex: 11,
    scopeType: "Proximos Passos & Estruturas Avancadas",
    nodes: [
      { id: "LargeScaleData", label: "Fluxo Massivo de Dados", stereo: "«stream»", x: 130, y: 140, addr: "0xGA41", methods: ["consultarElemento()", "contarUnicos()"] },
      { id: "BloomFilter", label: "Filtro de Bloom (Bits)", stereo: "«probabilistic»", x: 440, y: 80, addr: "0xGA42", methods: ["multiHash(k)", "testBitArray()"] },
      { id: "InvertedIndex", label: "Indice Invertido", stereo: "«search»", x: 440, y: 240, addr: "0xGA43", methods: ["palavra -> [docs]"] },
      { id: "ModernInfra", label: "Infraestrutura Distribuida", stereo: "«cluster»", x: 750, y: 160, addr: "0xGA44", methods: ["MapReduce", "SHA-256", "Simplex"] }
    ],
    links: [
      { from: "LargeScaleData", to: "BloomFilter", label: "1. consulta presenca de URL" },
      { from: "BloomFilter", to: "InvertedIndex", label: "2. evita consulta cara em disco" },
      { from: "InvertedIndex", to: "ModernInfra", label: "3. mapeia busca distribuida" },
      { from: "ModernInfra", to: "LargeScaleData", label: "4. resposta em milissegundos" }
    ],
    steps: [
      {
        title: "O Desafio da Escala Extrema",
        narration: "Com bilhoes de paginas na web, estruturas de dados convencionais consomem memoria excessiva ou afogam os discos. Aditya Bhargava apresenta estruturas probabilisticas e avancadas.",
        from: "LargeScaleData", to: "BloomFilter", call: "consultarURL('https://exemplo.com')",
        activeNodes: ["LargeScaleData", "BloomFilter"],
        stack: ["main()", "crawler.jaVisitou(url)"],
        state: { escalaDados: "1 bilhao de URLs", memoriaDisponivel: "Restrita" }
      },
      {
        title: "Filtro de Bloom: Resposta Instantanea sem Disco",
        narration: "A URL passa por 3 funcoes hash que ativam bits em um array compacto. Se algum bit for 0, temos certeza absoluta: 'URL definitivamente NAO foi visitada'. Poupamos uma busca pesada no banco.",
        from: "BloomFilter", to: "BloomFilter", call: "testarBits(h1, h2, h3) -> bit 4 e zero",
        activeNodes: ["BloomFilter"],
        stack: ["bloomFilter.contains(url)"],
        state: { garantiaMatematica: "Zero falsos negativos", falsoPositivoPossivel: "Raro (~1%)", economiaIO: "99% das leituras evitadas" }
      },
      {
        title: "Indice Invertido nos Motores de Busca",
        narration: "Quando a busca prossegue, o motor consulta o Indice Invertido: uma tabela que mapeia termos diretamente para listas de documentos onde aparecem.",
        from: "BloomFilter", to: "InvertedIndex", call: "buscarTermo('algoritmo')",
        activeNodes: ["BloomFilter", "InvertedIndex"],
        stack: ["searchEngine.query('algoritmo')"],
        state: { indiceInvertido: { algoritmo: ["doc_12", "doc_84", "doc_991"] }, operacaoIntersecao: "O(1)" }
      },
      {
        title: "Processamento Distribuido com MapReduce",
        narration: "A agregacao de dados opera sobre clusters atraves de MapReduce: servidores mapeiam contagens locais em paralelo (map) e combinam os resultados consolidados (reduce).",
        from: "InvertedIndex", to: "ModernInfra", call: "mapReduce(cluster)",
        activeNodes: ["InvertedIndex", "ModernInfra"],
        stack: ["distribuirTarefas()", "map()", "reduce()"],
        state: { nosExecutando: 100, particionamento: "Paralelo", algoritmosConexos: "Transformada de Fourier, HyperLogLog" }
      },
      {
        title: "A Jornada do Conhecimento Algoritmico",
        narration: "De pesquisa binaria a criptografia Diffie-Hellman e Programacao Linear, algoritmos sao os blocos construtores que capacitam o desenvolvedor a resolver qualquer desafio computacional.",
        from: "ModernInfra", to: "LargeScaleData", call: "concluirGuiaIlustrado()",
        activeNodes: ["ModernInfra", "LargeScaleData"],
        stack: ["livroConcluido() -> 11 capitulos dominados"],
        state: { proximaFase: "B-Trees, FFT, Criptografia SHA", maestria: "Entendendo Algoritmos dominado com sucesso" }
      }
    ]
  }
};

