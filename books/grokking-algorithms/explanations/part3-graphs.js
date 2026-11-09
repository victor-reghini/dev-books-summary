// Parte 3: Algoritmos em Grafos (Capitulos 6 e 7)
// Baseado no livro "Entendendo Algoritmos" de Aditya Y. Bhargava

export const part3Chapters = [
  {
    id: "ga-cap-6",
    number: 6,
    part: "Algoritmos em Grafos",
    partColor: "emerald",
    title: "Pesquisa em Largura",
    subtitle: "Grafos, filas FIFO, o vendedor de mangas e a busca pelo caminho mais curto",
    readingTime: "16 min",
    keyConcepts: [
      "Grafo (Vertices e Arestas)",
      "Grafo Direcionado vs Nao-Direcionado",
      "Pesquisa em Largura (BFS)",
      "Fila FIFO (First In, First Out)",
      "Caminho Mais Curto (Menor Numero de Saltos)",
      "Ordenacao Topologica",
      "Complexidade O(V + E)"
    ],
    teacherIntro:
      "A pesquisa em largura (Breadth-First Search) e um dos algoritmos fundamentais da ciencia da computacao. Ela responde a duas perguntas cruciais sobre redes de conexao: 'Existe um caminho entre o ponto A e o ponto B?' e 'Qual e o caminho mais curto com o menor numero de etapas?'.",
    keyTakeaways: [
      "Grafos sao modelos matematicos que representam redes de conexoes atraves de vertices (nos) e arestas (ligacoes).",
      "A pesquisa em largura (BFS) explora relacoes em ondas concentricas de primeiro grau, depois segundo grau, garantindo a descoberta do caminho com menos saltos.",
      "Para implementar a BFS, utiliza-se obrigatoriamente uma fila FIFO (First In, First Out), processando candidatos na exata ordem em que foram descobertos.",
      "E indispensavel manter uma lista de visitados (hash set) para evitar loops infinitos quando houver ciclos na rede.",
      "O tempo de execucao da BFS e O(V + E), onde V e a contagem de vertices e E e a contagem de arestas.",
      "A ordenacao topologica pode ser aplicada sobre grafos aciclicos direcionados para organizar dependencias de tarefas (como ordem de vestir roupas ou build de pacotes)."
    ],
    sections: [
      {
        heading: "O que e um Grafo?",
        body: "Um grafo e composto por nos (vertices) interconectados por linhas (arestas). Em redes sociais, os nos sao pessoas e as arestas sao amizades. Nos grafos direcionados, as conexoes tem sentido unidirecional (como seguir alguem no Twitter). Nos grafos nao-direcionados, a aresta representa reciprocidade mutua.",
        callout: {
          type: "info",
          title: "Representacao em Codigo",
          text: "Grafos sao representados de forma simples atraves de tabelas hash onde cada chave e um no e o valor e uma lista de seus vizinhos diretos (lista de adjacencia)."
        }
      },
      {
        heading: "O Vendedor de Mangas e a Fila FIFO",
        body: "Voce precisa encontrar um vendedor de mangas em sua rede de contatos. Primeiro, verifica seus amigos diretos (1º grau). Se nenhum for vendedor de mangas, verifica os amigos dos seus amigos (2º grau). Para que as conexoes de 1º grau sejam avaliadas antes das de 2º grau, enfileiram-se os contatos em uma fila FIFO.",
        bullets: [
          "Fila (Queue): Primeiro que entra e o primeiro a sair (FIFO), como uma fila de banco.",
          "Pilha (Stack): Ultimo que entra e o primeiro a sair (LIFO), como uma pilha de pratos.",
          "Pesquisa em Ondas: Garante que um amigo de 1º grau seja priorizado sobre um de 2º grau, achando a conexao mais proxima."
        ]
      },
      {
        heading: "Prevencao de Ciclos e Lista de Visitados",
        body: "Se Peggy for amiga de Thom e Thom for amigo de Peggy, sem um controle rigoroso o algoritmo ficara preso em um ciclo infinito verificando os mesmos dois contatos para sempre. Antes de verificar uma pessoa, deve-se consultar uma tabela hash de 'visitados'. Se ja tiver sido verificada, ela e simplesmente ignorada.",
        callout: {
          type: "warning",
          title: "Armadilha Classica de Ciclos",
          text: "Nunca execute BFS sem registrar os elementos ja processados em um conjunto (Set). Ciclos em grafos sem visitados causam travamentos por estouro de memoria."
        }
      },
      {
        heading: "Complexidade O(V + E) e Ordenacao Topologica",
        body: "Verificar cada pessoa consome O(V), pois cada vertice e desenfileirado no maximo uma vez. Percorrer as arestas para adicionar vizinhos a fila consome O(E). Somando as duas fases, o custo total e O(V + E). Alem da busca de menor caminho, grafos orientados sem ciclos (DAGs) permitem a ordenacao topologica: uma lista ordenada onde tarefas dependentes so aparecem apos suas precondicoes.",
        callout: {
          type: "tip",
          title: "Exemplo de Ordenacao Topologica",
          text: "Acordar -> Tomar banho -> Colocar meias -> Colocar sapatos -> Sair de casa. Voce nao pode calcar sapatos antes de colocar meias; o grafo de dependencias resolve essa ordem perfeitamente."
        }
      }
    ]
  },
  {
    id: "ga-cap-7",
    number: 7,
    part: "Algoritmos em Grafos",
    partColor: "emerald",
    title: "Algoritmo de Dijkstra",
    subtitle: "Grafos ponderados, menor tempo de percurso, grafos acíclicos e o perigo das arestas negativas",
    readingTime: "18 min",
    keyConcepts: [
      "Grafo Ponderado",
      "Pesos de Arestas",
      "Algoritmo de Dijkstra",
      "Grafo Aciclico Direcionado (DAG)",
      "Tabela de Custos e Pais (Parents)",
      "Arestas Negativas",
      "Algoritmo de Bellman-Ford"
    ],
    teacherIntro:
      "A pesquisa em largura encontra o caminho com o menor numero de passos, mas e se passos tiverem duracoes ou custos distintos? Pegar 3 voos curtos pode ser mais rapido do que 1 voo longo com escala de 10 horas. O algoritmo de Dijkstra e o campeao absoluto para encontrar o menor custo em grafos ponderados.",
    keyTakeaways: [
      "A BFS descobre o caminho com o menor numero de arestas (segmentos); o Algoritmo de Dijkstra descobre o caminho com o menor peso total acumulado.",
      "Dijkstra opera em 4 etapas sistematicas: 1. Achar o vertice mais barato nao processado; 2. Atualizar custos dos vizinhos; 3. Marcar o vertice como processado; 4. Repetir ate cobrir todo o grafo.",
      "Para reconstruir a rota vencedora, mantem-se uma tabela de custos e uma tabela de pais (parents).",
      "Dijkstra so funciona confiavelmente em Grafos Aciclicos Direcionados (DAGs) ou grafos sem ciclos de peso positivo, e NUNCA aceita pesos negativos.",
      "Se o grafo contiver arestas com valores negativos (como descontos ou cashback), Dijkstra falha; nesses cenarios deve-se empregar o algoritmo de Bellman-Ford."
    ],
    sections: [
      {
        heading: "Grafos Ponderados vs. Nao Ponderados",
        body: "Um grafo ponderado atribui um numero (peso) a cada aresta. Se os pesos representarem minutos necessarios para ir de uma cidade a outra, o objetivo nao e o menor numero de conexoes, mas o menor tempo total de viagem acumulada.",
        callout: {
          type: "info",
          title: "A Troca do Livro de Piano do Rama",
          text: "No livro de Aditya Bhargava, Rama quer trocar um livro de musica por um piano com o menor custo financeiro possivel. O caminho direto custa R$ 50, mas a rota atraves de um disco raro e de um violao reduz o gasto total para R$ 35. Dijkstra localiza esse percurso otimo com precisao."
        }
      },
      {
        heading: "As Quatro Etapas do Algoritmo de Dijkstra",
        body: "O algoritmo mantem tres estruturas: o grafo ponderado, uma tabela de custos ate cada no e uma tabela de pais para rastrear o percurso:",
        bullets: [
          "Etapa 1: Encontre o no mais barato na tabela de custos que ainda nao foi marcado como processado.",
          "Etapa 2: Percorra os vizinhos desse no e calcule se a rota passando por ele oferece um custo menor que o custo registrado atualmente.",
          "Etapa 3: Se o custo for menor, atualize o custo do vizinho e aponte o pai desse vizinho para o no atual.",
          "Etapa 4: Marque o no atual como processado para que nunca mais seja reavaliado. Repita ate que todos os nos alcancaveis tenham sido processados."
        ]
      },
      {
        heading: "O Perigo Fatal das Arestas de Peso Negativo",
        body: "Dijkstra e um algoritmo ganancioso: uma vez que um no e marcado como processado, ele assume que encontrou o caminho definitivo mais barato para aquele no e nunca mais recalcula sua entrada. Se existir uma aresta negativa mais adiante na rede, ela poderia reduzir retroativamente o custo de um no ja fechado, corrompendo toda a solucao.",
        callout: {
          type: "warning",
          title: "Quando Usar Bellman-Ford",
          text: "Se houver qualquer aresta com peso negativo no seu grafo, NUNCA use Dijkstra. Utilize o algoritmo de Bellman-Ford, que tolera arestas negativas e detecta ciclos negativos infinitos."
        }
      },
      {
        heading: "Reconstruindo o Caminho Final",
        body: "Ao final da execucao, o custo minimo para o destino esta calculado. Para exibir o percurso passo a passo (ex: Inicio -> Disco -> Violao -> Piano), basta partir do no destino e consultar recursivamente a tabela de pais ate encontrar o no de partida, invertendo a sequencia obtida.",
        callout: {
          type: "tip",
          title: "Complexidade",
          text: "Implementado com uma fila de prioridade (min-heap), o Algoritmo de Dijkstra atinge excelente desempenho de O((V + E) * log V)."
        }
      }
    ]
  }
];

