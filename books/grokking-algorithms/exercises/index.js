// Exercicios Interativos por Capitulo de "Entendendo Algoritmos" (Aditya Y. Bhargava)
// Baseado fielmente nos exercicios oficiais e respostas do livro (Paginas 321 a 336 do original).

export const grokkingAlgorithmsExercises = {
  "ga-cap-1": [
    {
      id: "ga-q-1-1",
      type: "quiz",
      question: "Exercicio 1.1: Suponha que voce tenha uma lista com 128 nomes e esteja fazendo uma pesquisa binaria. Qual o numero maximo de etapas que voce levaria para encontrar o nome?",
      options: [
        "7 etapas (pois log2(128) = 7).",
        "128 etapas (no pior caso).",
        "64 etapas (metade do total).",
        "1 etapa (se a lista estiver indexada)."
      ],
      correctIndex: 0,
      explanation: "A cada etapa, a pesquisa binaria corta a lista ao meio. 128 -> 64 -> 32 -> 16 -> 8 -> 4 -> 2 -> 1. Total de 7 etapas (2^7 = 128)."
    },
    {
      id: "ga-q-1-2",
      type: "quiz",
      question: "Exercicio 1.2: Suponha que voce duplique o tamanho da lista para 256 nomes. Qual sera o numero maximo de etapas agora?",
      options: [
        "8 etapas (apenas 1 etapa a mais que para 128).",
        "14 etapas (o dobro de 7).",
        "256 etapas.",
        "16 etapas."
      ],
      correctIndex: 0,
      explanation: "Duplicar o tamanho de uma lista em busca binaria adiciona apenas 1 unica comparacao adicional: log2(256) = 8 etapas (2^8 = 256)."
    },
    {
      id: "ga-q-1-3",
      type: "quiz",
      question: "Exercicios 1.3 a 1.6: Qual e o tempo de execucao Big O para: (1) Buscar um nome na agenda telefonica com pesquisa binaria; (2) Pesquisa simples na agenda; (3) Ler o numero de todas as pessoas da agenda?",
      options: [
        "(1) O(log n); (2) O(n); (3) O(n).",
        "(1) O(1); (2) O(n); (3) O(n^2).",
        "(1) O(log n); (2) O(log n); (3) O(n * log n).",
        "(1) O(n); (2) O(n); (3) O(n!)."
      ],
      correctIndex: 0,
      explanation: "A pesquisa binaria na agenda ordenada leva O(log n). A pesquisa simples linear leva O(n). Ler todos os n contatos requer percorrer a lista inteira, logo O(n)."
    }
  ],

  "ga-cap-2": [
    {
      id: "ga-q-2-1",
      type: "quiz",
      question: "Exercicio 2.1: Voce esta criando um aplicativo para registrar gastos. Todo dia insere novos gastos e, uma vez por mes, le todos eles para somar. O que e melhor usar: um Array ou uma Lista Encadeada?",
      options: [
        "Lista Encadeada (insercoes diarias rapidas O(1) e leitura sequencial mensal O(n)).",
        "Array (leituras rapidas O(1) compensam as insercoes mensais).",
        "Tabela Hash com chaves numericas.",
        "Grafo direcionado aciclico."
      ],
      correctIndex: 0,
      explanation: "Como as insercoes ocorrem frequentemente todos os dias e voce le todos os elementos sequencialmente de uma vez so no final do mes, listas encadeadas sao ideais pois inserem em O(1)."
    },
    {
      id: "ga-q-2-2",
      type: "quiz",
      question: "Exercicio 2.2: Um restaurante gerencia pedidos de clientes para a cozinha. Pedidos novos entram na fila e os cozinheiros atendem na ordem de chegada. Array ou Lista Encadeada?",
      options: [
        "Lista Encadeada (insercoes continuas no fim e remocoes no inicio em O(1) sem deslocar memoria).",
        "Array (pois a cozinha precisa de acesso aleatorio ao pedido 42).",
        "Pilha LIFO.",
        "Arvore Binaria de Busca."
      ],
      correctIndex: 0,
      explanation: "A cozinha opera como uma fila (Queue): itens entram no final e saem do inicio. Listas encadeadas suportam insercao e remocao nas pontas em O(1), enquanto arrays exigiriam realocacoes ou deslocamentos de itens vizinhos."
    }
  ],

  "ga-cap-3": [
    {
      id: "ga-q-3-1",
      type: "quiz",
      question: "Exercicio 3.1: Analisando uma pilha de chamadas, se uma funcao recursiva A chama B e B chama C, o que acontece com a memoria?",
      options: [
        "O quadro de C fica no topo; A e B permanecem pausadas em estado parcialmente completo na memoria.",
        "A e descartada imediatamente para economizar espaco.",
        "C substitui o espaco de memoria de A e B.",
        "A memoria e liberada automaticamente antes de C executar."
      ],
      correctIndex: 0,
      explanation: "A pilha opera em modo LIFO (Last In, First Out). Enquanto C executa, os quadros de contexto de A e B continuam alocados na RAM aguardando o retorno de suas chamadas subordinadas."
    },
    {
      id: "ga-q-3-2",
      type: "quiz",
      question: "Exercicio 3.2: O que acontece se uma funcao recursiva acidentalmente entrar em um loop infinito sem atingir o caso-base?",
      options: [
        "A pilha de chamadas cresce indefinidamente ate estourar o limite de memoria (Stack Overflow).",
        "O compilador converte silenciosamente a funcao em um loop while.",
        "O programa roda mais rapido devido ao cache da CPU.",
        "O sistema operacional ignora as chamadas subsequentes."
      ],
      correctIndex: 0,
      explanation: "Cada invocacao consome um novo bloco na pilha de chamada. Sem um caso-base que interrompa o processo, a memoria alocada para a pilha se esgota, resultando em um erro fatal de Stack Overflow."
    }
  ],

  "ga-cap-4": [
    {
      id: "ga-q-4-1",
      type: "quiz",
      question: "Exercicios 4.1 a 4.3: Como implementar recursivamente com Dividir para Conquistar (D&C): (1) A soma de uma lista; (2) Contar os itens de uma lista; (3) Encontrar o valor mais alto?",
      options: [
        "Caso-base: lista vazia ou 1 item; caso recursivo: processar primeiro elemento + chamada para o restante.",
        "Criar uma variavel acumuladora global e iterar com loop for.",
        "Converter a lista em array ordenado e usar busca binaria.",
        "Subdividir em matrizes quadradas pelo Algoritmo de Dijkstra."
      ],
      correctIndex: 0,
      explanation: "Em D&C: Soma = lista[0] + soma(lista[1:]); Contagem = 1 + contar(lista[1:]); Maximo = max(lista[0], maximo(lista[1:])). O caso-base e sempre uma lista vazia ou com 1 unico item."
    },
    {
      id: "ga-q-4-2",
      type: "quiz",
      question: "Exercicio 4.4: Qual e o caso-base para a pesquisa binaria formulada com a estrategia Dividir para Conquistar?",
      options: [
        "Um array com 1 elemento: se for igual ao alvo, encontramos; se for diferente, o item nao existe.",
        "Um array com 100 elementos.",
        "A lista nao ter elementos negativos.",
        "O pivo ser escolhido no inicio da lista."
      ],
      correctIndex: 0,
      explanation: "O caso-base da pesquisa binaria e quando o intervalo se reduz a um unico elemento (ou nenhum). Se coincidir com o alvo, bingo; caso contrario, o elemento nao esta no array."
    },
    {
      id: "ga-q-4-3",
      type: "quiz",
      question: "Exercicios 4.5 a 4.8: Qual o tempo Big O para: (1) Imprimir o valor de cada elemento de um array; (2) Duplicar o valor de cada elemento; (3) Duplicar apenas o primeiro elemento; (4) Criar uma tabela de multiplicacao de todos os elementos?",
      options: [
        "(1) O(n); (2) O(n); (3) O(1); (4) O(n^2).",
        "(1) O(1); (2) O(n); (3) O(n); (4) O(n log n).",
        "(1) O(n); (2) O(n^2); (3) O(1); (4) O(n!).",
        "(1) O(log n); (2) O(n); (3) O(1); (4) O(n^2)."
      ],
      correctIndex: 0,
      explanation: "Imprimir e duplicar todos os elementos percorre a lista uma vez: O(n). Modificar apenas o primeiro elemento acessa o indice 0 diretamente: O(1). A tabela de multiplicacao combina cada elemento com todos os outros: n * n = O(n^2)."
    }
  ],

  "ga-cap-5": [
    {
      id: "ga-q-5-1",
      type: "quiz",
      question: "Exercicios 5.1 a 5.4: Quais das seguintes funcoes hash sao consistentes (validas)? (A) Retorna 1 para qualquer entrada; (B) Retorna um numero aleatorio; (C) Retorna o indice da proxima posicao livre; (D) Retorna o comprimento da palavra.",
      options: [
        "A e D sao consistentes; B e C sao inconsistentes (invalidas).",
        "Todas sao validas.",
        "Apenas B e valida por espalhar os dados.",
        "Apenas C e valida."
      ],
      correctIndex: 0,
      explanation: "Uma funcao hash PRECISA ser deterministica e consistente: a mesma palavra DEVE sempre retornar o mesmo indice. A funcao A sempre retorna 1 (valida, embora gere muitas colisoes) e D sempre retorna o tamanho da palavra (consistente). B retorna numeros aleatorios e C varia conforme o estado da memoria, logo ambas sao invalidas."
    },
    {
      id: "ga-q-5-2",
      type: "quiz",
      question: "Exercicios 5.5 a 5.7: Para criar uma tabela hash para uma lista telefonica onde as chaves sao nomes: qual funcao hash distribui melhor: (A) Usar o comprimento do nome; (B) Usar a primeira letra do nome; (C) Mapear cada letra para um numero primo e somar modulo tamanho da tabela?",
      options: [
        "Opcao C oferece a melhor distribuicao uniforme com menor taxa de colisoes.",
        "Opcao A, pois nomes tem comprimentos muito variados.",
        "Opcao B, pois ha 26 letras no alfabeto.",
        "Todas apresentam desempenho identico."
      ],
      correctIndex: 0,
      explanation: "A opcao A concentraria a maioria dos nomes nos slots de 4 a 8 letras. A opcao B acumularia colisoes em letras comuns como J, M e S. A opcao C espalha os resultados uniformemente por todos os slots da matriz."
    }
  ],

  "ga-cap-6": [
    {
      id: "ga-q-6-1",
      type: "quiz",
      question: "Exercicio 6.1 e 6.2: Em um grafo de trajeto da casa ate o trabalho, qual e o comprimento do caminho mais curto encontrado pela Pesquisa em Largura (BFS)?",
      options: [
        "O caminho com o menor numero de arestas (saltos entre vertices).",
        "O caminho com o menor numero de semaforos.",
        "O caminho que passa por mais amigos.",
        "A rota calculada pela multiplicacao de matrizes."
      ],
      correctIndex: 0,
      explanation: "A Pesquisa em Largura (BFS) calcula estritamente o caminho com o menor numero de arestas (segmentos ou saltos) entre dois vertices em grafos nao ponderados."
    },
    {
      id: "ga-q-6-2",
      type: "quiz",
      question: "Exercicio 6.3: Dadas as tres listas de tarefas matinais: (A) Acordar -> Tomar Cafe -> Escovar Dentes; (B) Acordar -> Escovar Dentes -> Tomar Cafe; (C) Tomar Cafe -> Acordar. Quais sao ordenacoes topologicas validas?",
      options: [
        "A e B sao validas; C e invalida (pois ninguem pode tomar cafe antes de acordar!).",
        "Apenas A e valida.",
        "Apenas B e valida.",
        "Todas as tres sao validas."
      ],
      correctIndex: 0,
      explanation: "Em uma ordenacao topologica, se a tarefa U precisa ocorrer antes de V, U sempre deve preceder V na lista resultante. Nao e possivel tomar cafe antes de acordar em um grafo causal orientado."
    }
  ],

  "ga-cap-7": [
    {
      id: "ga-q-7-1",
      type: "quiz",
      question: "Exercicio 7.1: No grafo do Rama para a troca do livro pelo piano, por que a BFS escolheria a rota direta de R$ 50 enquanto o algoritmo de Dijkstra acha a rota otima de R$ 35?",
      options: [
        "Porque a BFS conta apenas o numero de arestas (1 salto de R$ 50), enquanto Dijkstra avalia a soma dos pesos numericos (3 saltos totalizando R$ 35).",
        "Porque a BFS comete erros de arredondamento em numeros impares.",
        "Porque Dijkstra inverte a ordem das conexoes.",
        "Porque grafos com instrumentos musicais exigem heuristica A*."
      ],
      correctIndex: 0,
      explanation: "A BFS e cega aos pesos das arestas e foca somente na menor quantidade de saltos (1 aresta direta vs 3 arestas compostas). Dijkstra considera os pesos reais e descobre que 5 + 15 + 15 = 35 e menor que 50."
    },
    {
      id: "ga-q-7-2",
      type: "quiz",
      question: "Por que o Algoritmo de Dijkstra falha catastroficamente se houver uma aresta com peso negativo no grafo?",
      options: [
        "Porque Dijkstra assume que, uma vez processado um vertice, o caminho mais barato para ele ja foi definitivamente encontrado.",
        "Porque numeros negativos causam divisao por zero na memoria.",
        "Porque filas de prioridade nao aceitam numeros negativos.",
        "Porque Dijkstra so aceita numeros fracionarios."
      ],
      correctIndex: 0,
      explanation: "Dijkstra e um algoritmo ganancioso. Ao marcar um no como processado, ele nunca mais reavalia suas conexoes. Uma aresta negativa posterior poderia reduzir o custo de um no ja fechado. Para pesos negativos deve-se usar Bellman-Ford."
    }
  ],

  "ga-cap-8": [
    {
      id: "ga-q-8-1",
      type: "quiz",
      question: "Exercicios 8.1 e 8.2: Voce esta arrumando uma mala para viajar e quer levar o maximo de roupas possivel respeitando o limite de peso. Trata-se de uma estrategia gulosa?",
      options: [
        "Sim, uma heuristica gulosa escolhe sucessivamente as pecas mais leves ate a mala encher.",
        "Nao, qualquer decisao sobre malas exige pesquisa binaria.",
        "Nao, trata-se de ordenacao topologica obrigatoria.",
        "Sim, mas apenas se a viagem for para fora do pais."
      ],
      correctIndex: 0,
      explanation: "A cada escolha, pegar o item mais leve que ainda couber e uma estrategia gulosa direta. Embora possa nao ser a combinacao perfeita para valor monetario (problema da mochila), para contagem simples de pecas ela funciona de forma muito eficiente."
    },
    {
      id: "ga-q-8-2",
      type: "quiz",
      question: "Exercicios 8.3 a 8.5: Quais dos seguintes problemas sao NP-Completos? (1) O Caixeiro-Viajante; (2) Encontrar o menor caminho com Dijkstra; (3) Cobertura de Conjuntos; (4) Encontrar o maior clique em uma rede social.",
      options: [
        "1, 3 e 4 sao NP-Completos; 2 e polinomial rapido resolvido por Dijkstra.",
        "Todos os 4 sao NP-Completos.",
        "Apenas o Caixeiro-Viajante e NP-Completo.",
        "Nenhum e NP-Completo."
      ],
      correctIndex: 0,
      explanation: "O Caixeiro-Viajante, a Cobertura de Conjuntos e o Maior Clique pertencem a famosa classe NP-Completo. Dijkstra, por sua vez, e um algoritmo polinomial rapido O((V + E) log V)."
    }
  ],

  "ga-cap-9": [
    {
      id: "ga-q-9-1",
      type: "quiz",
      question: "Exercicio 9.1: No Problema da Mochila 0/1 com capacidade de 4 lb, suponha que um novo item apareca: um MP3 Player pesando 1 lb e valendo R$ 1.000. Voce deve rouba-lo?",
      options: [
        "Nao. A combinacao Notebook (3 lb, R$ 2000) + Violao (1 lb, R$ 1500) continua valendo R$ 3.500, que e superior a Notebook + MP3 (R$ 3.000).",
        "Sim, porque o MP3 e muito leve.",
        "Sim, porque todo item novo substitui o mais antigo.",
        "A programacao dinamica nao permite adicionar novos itens a grade."
      ],
      correctIndex: 0,
      explanation: "Na grade de DP, a celula para capacidade 4 lb com o MP3 compara: manter R$ 3.500 vs MP3 (R$ 1000) + celula de 3 lb (Notebook, R$ 2000) = R$ 3.000. Como 3500 > 3000, o MP3 nao entra na combinacao otima."
    },
    {
      id: "ga-q-9-2",
      type: "quiz",
      question: "Exercicio 9.2: Suponha que voce va acampar com uma mochila de capacidade 6 lb. Os itens sao: Agua (3 lb, valor 10), Livro (1 lb, valor 3), Comida (2 lb, valor 9), Casaco (2 lb, valor 5), Camera (1 lb, valor 6). Qual e a combinacao otima calculada pela grade?",
      options: [
        "Agua (3 lb) + Comida (2 lb) + Camera (1 lb) = 6 lb com valor total 25.",
        "Todos os itens cabem simultaneamente.",
        "Apenas Agua e Livro.",
        "Casaco + Camera + Livro com valor 14."
      ],
      correctIndex: 0,
      explanation: "Agua (3 lb, 10) + Comida (2 lb, 9) + Camera (1 lb, 6) somam exatamente 6 lb e alcancam valor total de 25, a solucao global perfeita encontrada pela programacao dinamica."
    }
  ],

  "ga-cap-10": [
    {
      id: "ga-q-10-1",
      type: "quiz",
      question: "Exercicios 10.1 e 10.2: Na recomendacao de filmes da Netflix com KNN, se o usuario Fernando nao avaliou nenhum filme mas queremos recomendar algo, ou se uma usuaria der nota 5 para tudo e outro usuario for muito critico dando no maximo nota 3, o que devemos fazer?",
      options: [
        "Normalizar as notas dos usuarios e utilizar a Similaridade de Cossenos para comparar a inclinacao dos gostos.",
        "Excluir os dois usuarios do banco de dados.",
        "Atribuir nota zero a todos os filmes.",
        "Usar pesquisa binaria nas notas."
      ],
      correctIndex: 0,
      explanation: "A Similaridade de Cossenos avalia o angulo entre dois vetores de preferencias, tornando a comparacao imune ao fato de um usuario ser sistematicamente mais generoso ou mais rigoroso que o outro."
    },
    {
      id: "ga-q-10-2",
      type: "quiz",
      question: "Exercicio 10.3: Na leitura automatica de digitos manuscritos (OCR) em envelopes de cartas, como o algoritmo KNN descobre se o digito desenhado e o numero '7' ou o numero '1'?",
      options: [
        "Converte a imagem em um vetor de caracteristicas (linhas retas, curvas, tracos horizontais) e calcula a menor distancia euclidiana para exemplos catalogados.",
        "Pergunta para o remetente da carta por e-mail.",
        "Executa o algoritmo de Dijkstra nos tracos de tinta.",
        "Aplica Quicksort nos pixels da imagem."
      ],
      correctIndex: 0,
      explanation: "A imagem e dividida em uma grade (ex: 32x32 pixels) formando um vetor de atributos. O classificador KNN compara esse vetor com milhares de digitos previamente rotulados; os K vizinhos mais proximos determinam o caractere com alta acuracia."
    }
  ],

  "ga-cap-11": [
    {
      id: "ga-q-11-1",
      type: "quiz",
      question: "Qual e a caracteristica definidora de um Filtro de Bloom em comparacao com uma tabela hash tradicional?",
      options: [
        "O Filtro de Bloom e probabilistico: pode gerar falsos positivos ('o item pode estar presente'), mas NUNCA gera falsos negativos ('com certeza absoluta nao esta').",
        "O Filtro de Bloom nunca erra e ocupa o dobro de memoria.",
        "O Filtro de Bloom so funciona com numeros inteiros pares.",
        "O Filtro de Bloom requer desfragmentacao de disco a cada leitura."
      ],
      correctIndex: 0,
      explanation: "Filtros de Bloom utilizam um array de bits e multiplas funcoes hash. Se qualquer um dos bits correspondentes a chave for zero, temos certeza matematica absoluta de que o item nunca foi adicionado, dispensando leituras desnecessarias em disco."
    },
    {
      id: "ga-q-11-2",
      type: "quiz",
      question: "Como o algoritmo HyperLogLog consegue estimar a contagem de elementos unicos (cardinalidade) em um fluxo de bilhoes de registros usando apenas ~1.5 KB de memoria?",
      options: [
        "Atraves de aproximacao logaritmica probabilistica baseada no numero maximo de zeros consecutivos nos hashes dos elementos observados.",
        "Armazenando todos os bilhoes de registros compactados com gzip.",
        "Realizando amostragem aleatoria de 10 usuarios e multiplicando por 1 bilhao.",
        "Executando o algoritmo de Euclides nos identificadores."
      ],
      correctIndex: 0,
      explanation: "O HyperLogLog observa a distribuicao dos bits mais significativos dos hashes gerados. A probabilidade de encontrar uma sequencia de k zeros iniciais e 2^-k. Acompanhando esse padrao com registros (buckets), ele estima a cardinalidade com erro de apenas ~2%."
    }
  ]
};

