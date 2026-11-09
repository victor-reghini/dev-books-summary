// Parte 1: Fundamentos & Estruturas Lineares (Capitulos 1 a 3)
// Baseado no livro "Entendendo Algoritmos" de Aditya Y. Bhargava

export const part1Chapters = [
  {
    id: "ga-cap-1",
    number: 1,
    part: "Fundamentos",
    partColor: "amber",
    title: "Introdução a Algoritmos",
    subtitle: "Pesquisa binária, medição de desempenho e a notação Big O",
    readingTime: "10 min",
    keyConcepts: ["Pesquisa Binaria", "Notacao Big O", "Tempo Logaritmico O(log n)", "O Caixeiro-Viajante"],
    teacherIntro:
      "Um algoritmo e apenas um conjunto de instrucoes que realizam uma tarefa. Em vez de decorar simbolos arcanos, o foco e entender a taxa de crescimento das operacoes. Um algoritmo inteligente transforma 4 bilhoes de operacoes em meras 32 etapas.",
    keyTakeaways: [
      "A pesquisa binaria opera apenas sobre listas previamente ordenadas, chutando o elemento mediano e cortando metade dos candidatos a cada rodada.",
      "Para n elementos, a pesquisa binaria necessita de no maximo log2(n) etapas, enquanto a pesquisa simples (linear) precisa de ate n etapas.",
      "A notacao Big O nao informa o tempo em segundos de relogio, mas como a contagem de operacoes cresce em relacao ao aumento da entrada.",
      "O problema do caixeiro-viajante cresce a O(n!), tornando a forca bruta fisicamente impossivel para mais de algumas dezenas de cidades."
    ],
    sections: [
      {
        heading: "A Adivinhacao de Numeros e a Pesquisa Binaria",
        body: "Imagine adivinhar um numero entre 1 e 100 com dicas de 'muito alto' ou 'muito baixo'. Chutar 1, 2, 3... elimina um numero por vez (pesquisa simples, 100 palpites no pior caso). Chutar 50, depois 75 ou 25, corta metade das possibilidades a cada tentativa (pesquisa binaria, maximo de 7 chutes para 100 itens).",
        callout: {
          type: "tip",
          title: "Poder do Logaritmo",
          text: "Para uma lista de 4 bilhoes de registros (como a base de usuarios do Facebook ou Google), a pesquisa simples levaria 4 bilhoes de milissegundos (~46 dias). A pesquisa binaria resolve em 32 operacoes (~32 milissegundos)."
        }
      },
      {
        heading: "Entendendo a Notacao Big O",
        body: "Big O estabelece uma garantia formal sobre o pior cenario possivel. Se um algoritmo e O(n), mesmo que o item procurado seja o primeiro da lista (melhor caso instantaneo), a garantia formal assegura que a execucao nunca sera pior do que n operacoes.",
        bullets: [
          "O(log n) • Tempo logaritmico: extremamente rapido (ex: pesquisa binaria).",
          "O(n) • Tempo linear: proporcional a entrada (ex: pesquisa simples).",
          "O(n * log n) • Tempo linear-logaritmico: algoritmos rapidos de ordenacao (ex: quicksort no caso medio).",
          "O(n^2) • Tempo quadratico: ordenacao lenta (ex: ordenacao por selecao).",
          "O(n!) • Tempo fatorial: explosao combinatoria intratavel (ex: caixeiro-viajante)."
        ]
      },
      {
        heading: "O Limite da Forca Bruta: O Caixeiro-Viajante",
        body: "O vendedor Opus precisa visitar n cidades e encontrar a rota de menor distancia. Para 5 cidades ha 120 rotas possiveis (5!). Para 6 cidades, 720. Para 10 cidades, 3.628.800 rotas. Para 100 cidades, o numero de operacoes supera o numero de atomos no universo visivel. Nao existe solucao exata rapida; a unica saida pratica e recorrer a algoritmos de aproximacao.",
        callout: {
          type: "warning",
          title: "Problema NP-Completo",
          text: "O problema do caixeiro-viajante pertence a classe dos problemas NP-completos, discutidos em detalhes no Capitulo 8."
        }
      }
    ]
  },
  {
    id: "ga-cap-2",
    number: 2,
    part: "Fundamentos",
    partColor: "amber",
    title: "Ordenação por Seleção",
    subtitle: "Como a memória funciona, a batalha entre arrays e listas encadeadas, e o algoritmo de seleção",
    readingTime: "12 min",
    keyConcepts: ["Memoria e Gavetas", "Arrays Contiguos", "Listas Encadeadas", "Acesso Aleatorio vs Sequencial", "Selection Sort O(n^2)"],
    teacherIntro:
      "A memoria do computador e como uma gaveteira gigante onde cada slot tem um endereco. A forma como organizamos dados na memoria determina se o programa executara em frações de segundo ou se arrastara.",
    keyTakeaways: [
      "Em um array, todos os elementos sao alocados de forma contigua na memoria, permitindo acesso aleatorio instantaneo O(1) pelo indice.",
      "Em listas encadeadas, cada no pode residir em qualquer lugar da memoria e guarda um ponteiro para o proximo; insercoes e delecoes sao faceis O(1), mas a leitura exige travessia sequencial O(n).",
      "A pesquisa binaria exige arrays porque precisa saltar diretamente ao meio da lista instantaneamente.",
      "A ordenacao por selecao percorre a lista repetidamente para encontrar o menor (ou maior) item, resultando em complexidade O(n^2)."
    ],
    sections: [
      {
        heading: "Como a Memoria Funciona e a Reserva de Espaco",
        body: "Quando voce pede espaco ao computador para 3 itens, ele aloca 3 gavetas contiguas. Se um quarto amigo chegar para sentar junto e a proxima gaveta estiver ocupada, todo o array precisa ser movido para um novo espaco maior. Reservar espaco extra contorna isso temporariamente, mas desperdica memoria se nao usado.",
        callout: {
          type: "info",
          title: "Analogia do Cinema",
          text: "Array e sentar com todos os amigos em cadeiras consecutivas no cinema. Se mais alguem chegar e nao houver assento ao lado, todo o grupo precisa trocar de fileira. Lista encadeada e sentar cada um onde houver vaga, com um amigo dizendo onde esta o proximo."
        }
      },
      {
        heading: "Comparativo de Desempenho: Array vs. Lista Encadeada",
        body: "A escolha da estrutura correta depende da proporcao entre leituras e alteracoes na aplicacao:",
        bullets: [
          "Leitura: Array O(1) [acesso aleatorio instantaneo] vs. Lista O(n) [precisa percorrer do primeiro ate o alvo].",
          "Insercao: Array O(n) [precisa deslocar itens vizinhos] vs. Lista O(1) [basta atualizar o ponteiro].",
          "Delecao: Array O(n) [precisa compactar a memoria] vs. Lista O(1) [basta redirecionar o ponteiro anterior]."
        ]
      },
      {
        heading: "Como Funciona a Ordenacao por Selecao",
        body: "Para ordenar uma lista de musicas pelo contador de reproducoes (da mais ouvida para a menos ouvida), percorre-se a lista para achar a maior e adiciona-se em uma nova lista. Como essa busca consome n verificacoes e precisa ser repetida n vezes, a complexidade total e n * n = O(n^2).",
        callout: {
          type: "tip",
          title: "Por que O(n^2) se o array diminui a cada iteracao?",
          text: "Na media, analisa-se n/2 itens por passada. A formula e n * (1/2 * n) = 1/2 * n^2. Como constantes como 1/2 sao ignoradas na notacao Big O, o tempo e formalmente O(n^2)."
        }
      }
    ]
  },
  {
    id: "ga-cap-3",
    number: 3,
    part: "Fundamentos",
    partColor: "amber",
    title: "Recursão",
    subtitle: "O caso-base, o caso recursivo e o papel crítico da pilha de chamada (call stack)",
    readingTime: "11 min",
    keyConcepts: ["Recursao", "Caso-Base", "Caso Recursivo", "Pilha de Chamada (Call Stack)", "Stack Overflow"],
    teacherIntro:
      "A recursao e quando uma funcao chama a si mesma. Ela raramente traz ganhos de desempenho em relacao a loops convencionais, mas confere clareza extrema ao desenvolvedor para modelar estruturas auto-similares.",
    keyTakeaways: [
      "Toda funcao recursiva precisa de duas partes obrigatorias: o caso-base (quando a recursao para) e o caso recursivo (quando a funcao chama a si mesma).",
      "A falta de um caso-base bem formulado resulta em recursao infinita e estouro de memoria (Stack Overflow).",
      "O computador gerencia chamadas de funcao atraves de uma pilha LIFO (Last In, First Out), alocando caixas de contexto para cada invocacao parcial.",
      "Pilhas de chamada profundas consomem memoria substancial; nesses cenarios, loops iterativos ou tail recursion sao preferiveis."
    ],
    sections: [
      {
        heading: "A Caixa Trancada da Vovo: Loop vs. Recursao",
        body: "Imagine procurar uma chave em caixas aninhadas dentro de caixas. A abordagem iterativa com loop while mantém um monte de caixas em uma pilha explicita. A abordagem recursiva simplesmente olha a caixa atual: se achar outra caixa, chama a si mesma; se achar a chave, encerra.",
        callout: {
          type: "quote",
          title: "Leigh Caldwell (Stack Overflow)",
          text: "'Os loops podem melhorar o desempenho do seu programa. A recursao melhora o desempenho do seu programador. Escolha o que for mais importante para a sua situacao.'"
        }
      },
      {
        heading: "Anatomia da Pilha de Chamada (Call Stack)",
        body: "Quando a funcao sauda('maggie') invoca sauda2('maggie'), a execucao de sauda fica pausada em estado parcialmente concluido e empilha sauda2 no topo. Somente quando sauda2 retorna, o topo e desempilhado e sauda retoma de onde parou.",
        bullets: [
          "Push: adiciona um novo quadro de ativacao no topo da pilha.",
          "Pop: retira o elemento do topo e le seu retorno.",
          "Estado parcial: funcoes chamadas a partir de outras mantêm suas variaveis preservadas na memoria enquanto aguardam."
        ]
      },
      {
        heading: "Pilha com Recursao e Fatorial",
        body: "No calculo de fat(3), o programa empilha fat(3) com x=3, depois fat(2) com x=2 e por fim fat(1) com x=1 (caso-base). Apos atingir fat(1) = 1, as chamadas desempilham resolvendo as multiplicacoes pendentes: 1 -> 2 * 1 = 2 -> 3 * 2 = 6.",
        callout: {
          type: "warning",
          title: "Cuidado com o Estouro de Pilha",
          text: "Cada chamada aloca um bloco na memoria RAM. Funcoes com milhoes de iteracoes recursivas sem otimizacao de cauda excederao o limite de memoria e travarao a aplicacao."
        }
      }
    ]
  }
];

