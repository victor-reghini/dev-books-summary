// Parte 2: Dividir para Conquistar & Tabelas Hash (Capitulos 4 e 5)
// Baseado no livro "Entendendo Algoritmos" de Aditya Y. Bhargava

export const part2Chapters = [
  {
    id: "ga-cap-4",
    number: 4,
    part: "Dividir para Conquistar",
    partColor: "blue",
    title: "Quicksort",
    subtitle: "A estratégia Dividir para Conquistar (D&C), o algoritmo de ordenação rápida e o impacto das constantes",
    readingTime: "15 min",
    keyConcepts: [
      "Dividir para Conquistar (D&C)",
      "Algoritmo de Euclides",
      "Quicksort",
      "Escolha do Pivo",
      "Particionamento",
      "Caso Medio O(n log n) vs Pior Caso O(n^2)"
    ],
    teacherIntro:
      "Quando confrontado com um novo problema de algoritmos, nao entre em panico: pergunte se pode aplicar Dividir para Conquistar (D&C). Essa estrategia elegante reduz problemas complexos a condicoes-base triviais e culmina no Quicksort, um dos algoritmos de ordenacao mais rapidos e influentes da computacao.",
    keyTakeaways: [
      "A tecnica D&C funciona dividindo o problema em subproblemas menores da mesma natureza ate atingir um caso-base trivial.",
      "O Quicksort elege um elemento pivo e particiona a matriz em dois subarray: elementos menores e elementos maiores que o pivo.",
      "O Quicksort tem complexidade media de O(n log n) e pior caso de O(n^2).",
      "A escolha do pivo e decisiva: escolher um pivo aleatorio ou mediano garante a profundidade da arvore de chamadas em O(log n), evitando o pior caso de O(n^2).",
      "A constante oculta do Big O no Quicksort e consideravelmente menor que a do Mergesort, tornando-o mais veloz na maioria esmagadora dos cenarios praticos."
    ],
    sections: [
      {
        heading: "A Filosofia Dividir para Conquistar (D&C)",
        body: "D&C nao e apenas um algoritmo unico, mas uma mentalidade de solucao de problemas estruturada em duas etapas fundamentais: 1. Identificar o caso-base mais simples possivel; 2. Dividir ou diminuir o problema progressivamente ate que ele se torne o caso-base.",
        callout: {
          type: "tip",
          title: "O Fazendeiro e as Parcelas Quadradas (Algoritmo de Euclides)",
          text: "Um fazendeiro deseja dividir um lote de 1680m x 640m em quadrados identicos do maior tamanho possivel. O caso-base seria um lado ser multiplo exato do outro. Aplicando D&C: cabem dois quadrados de 640m, restando um segmento de 640m x 400m. Reduzimos o problema ao mesmo desafio original, mas em escala menor, ate achar quadrados de 80m x 80m."
        }
      },
      {
        heading: "Exemplos D&C Classicos: Soma, Contagem e Maximo",
        body: "Qualquer operacao iterativa sobre listas pode ser formulada atraves de D&C:",
        bullets: [
          "Soma: Se a lista estiver vazia, a soma e 0 (caso-base). Caso contrario, a soma e o primeiro elemento mais a soma recursiva do restante da lista.",
          "Contagem: Se a lista for vazia, tamanho 0; caso contrario, 1 + contagem do restante.",
          "Valor Maximo: Se restarem 2 itens, o maior entre eles e a resposta; caso contrario, compare o primeiro item com o maximo do restante."
        ]
      },
      {
        heading: "Como Funciona o Quicksort",
        body: "Para ordenar um array com Quicksort: 1. O caso-base sao arrays com 0 ou 1 elemento (ja estao ordenados); 2. Escolha um elemento pivo; 3. Particione o array em dois subarrays: elementos menores ou iguais ao pivo e elementos maiores; 4. Invoque o Quicksort recursivamente para ambas as metades e concatene: quicksort(menores) + [pivo] + quicksort(maiores).",
        callout: {
          type: "info",
          title: "Importancia do Pivo e Profundidade da Pilha",
          text: "Se escolher sempre o primeiro elemento de uma lista ja ordenada, a pilha tera profundidade n (altura da arvore), gerando desempenho O(n^2). Escolhendo o pivo no ponto medio ou aleatorio, a pilha tera altura O(log n), com cada nivel processando n elementos, resultando no excelente O(n log n)."
        }
      },
      {
        heading: "Quicksort vs. Mergesort: As Constantes Escondidas",
        body: "Tanto Quicksort quanto Mergesort possuem complexidade O(n log n). Porem, a notacao Big O descarta constantes multiplicativas fixas (c * n). O Quicksort possui constantes muito menores que o Mergesort e melhor localidade de referencia de cache na CPU, justificando sua ampla utilizacao em bibliotecas padrao de compiladores modernos.",
        callout: {
          type: "warning",
          title: "Pior Caso Existe",
          text: "O pior caso do Quicksort e O(n^2), que ocorre quando o particionamento e completamente desbalanceado a cada chamada. Para neutralizar isso, implementacoes reais usam a tecnica 'Mediana de Tres' ou pivos aleatorios."
        }
      }
    ]
  },
  {
    id: "ga-cap-5",
    number: 5,
    part: "Tabelas Hash",
    partColor: "purple",
    title: "Tabelas Hash",
    subtitle: "Funções hash, colisão, fator de carga e implementação de caches ultrarrápidos",
    readingTime: "14 min",
    keyConcepts: [
      "Funcao Hash",
      "Tabela Hash (Hash Map)",
      "Colisoes",
      "Tratamento por Encadeamento (Chaining)",
      "Fator de Carga (Load Factor)",
      "Redimensionamento (Resizing)",
      "Cache de Dados"
    ],
    teacherIntro:
      "Se arrays oferecem busca instantanea por indice e listas facilitam insercoes flexiveis, tabelas hash combinam o melhor dos dois mundos: busca, insercao e delecao em tempo medio instantaneo O(1) usando qualquer palavra-chave como identificador.",
    keyTakeaways: [
      "Uma funcao hash mapeia sequencias de texto ou objetos em posicoes numericas de um array interno.",
      "Boas funcoes hash distribuem chaves uniformemente para evitar concentracoes indesejadas em poucos indices.",
      "Colisoes sao inevitaveis pelo principio da casa dos pombos; a solucao classica e o encadeamento atraves de listas vinculadas nos buckets.",
      "O fator de carga e a razao entre o numero de itens e o total de slots na tabela (itens / slots). Se ultrapassar 0.7, a tabela deve ser redimensionada para manter o desempenho O(1).",
      "Tabelas hash sao a espinha dorsal de caches web, indexadores DNS, verificacao de unicidade e mapas associativos em todas as linguagens modernas."
    ],
    sections: [
      {
        heading: "A Balconista Maggie e a Busca Instantanea",
        body: "Imagine a atendente de mercearia Maggie procurando o preco de uma maca em um livro desordenado: busca linear O(n). Se o livro estiver alfabetizado: pesquisa binaria O(log n). Mas se Maggie tiver uma assistente que instantaneamente olha para a palavra 'maca' e diz 'slot 42', o preco e consultado em O(1). Essa assistente e a funcao hash.",
        callout: {
          type: "info",
          title: "Requisitos de uma Funcao Hash Valida",
          text: "1. Deve ser deterministica: a mesma chave de entrada sempre deve retornar o mesmo indice numerico; 2. Deve distribuir chaves de maneira uniforme pelo array; 3. Deve mapear apenas dentro do intervalo de indices validos da matriz interna."
        }
      },
      {
        heading: "Casos de Uso Praticos",
        body: "Tabelas hash estao presentes em praticamente todos os sistemas computacionais:",
        bullets: [
          "Mapeamento Chave-Valor: Agenda telefonica ('Jenny' -> 8675309) ou dicionarios de traducao.",
          "Filtragem de Duplicatas e Unicidade: Garantir que um eleitor nao vote duas vezes em uma secao eleitoral.",
          "Cache de Servidores Web: Guardar respostas de paginas pesadas na memoria indexadas pela URL requisitada, dispensando reprocessamento no banco de dados.",
          "Resolucao de Nomes DNS: Traduzir 'google.com' em enderecos IP '172.217.16.206'."
        ]
      },
      {
        heading: "Colisoes e a Estrategia de Encadeamento",
        body: "Por mais sofisticada que seja a funcao hash, duas chaves distintas eventualmente receberao o mesmo indice (ex: 'maca' e 'abacate' caindo no slot 2). A solucao padrao e iniciar uma lista encadeada naquele slot. Se a lista crescer demais, a busca se degrada para O(n). Por isso, uma distribuicao uniforme e fundamental.",
        callout: {
          type: "warning",
          title: "Desempenho no Pior Caso",
          text: "No caso medio, tabelas hash executam operacoes em O(1). No pior caso patologico (quando todos os itens caem na mesma lista encadeada), o tempo decai para O(n)."
        }
      },
      {
        heading: "Fator de Carga e Redimensionamento (Resizing)",
        body: "O fator de carga e calculado como: total de itens armazenados / total de slots no array. Uma tabela com 100 slots e 100 itens tem fator de carga 1.0. A regra de ouro estabelece que, quando o fator de carga superar 0.7, a tabela deve alocar um novo array com o dobro do tamanho e redistribuir todas as chaves (rehashing).",
        callout: {
          type: "tip",
          title: "Regra Pratica de Dimensionamento",
          text: "Redimensionar tem custo pontual O(n), mas ocorre raramente. Amortizado ao longo de milhares de insercoes, o custo medio por operacao permanece estritamente O(1)."
        }
      }
    ]
  }
];

