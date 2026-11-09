// Parte 4: Algoritmos Complexos & Proximos Passos (Capitulos 8 a 11)
// Baseado no livro "Entendendo Algoritmos" de Aditya Y. Bhargava

export const part4Chapters = [
  {
    id: "ga-cap-8",
    number: 8,
    part: "Algoritmos Avancados",
    partColor: "rose",
    title: "Algoritmos Gulosos",
    subtitle: "A estratégia gananciosa, o problema da cobertura de conjuntos e a fronteira dos problemas NP-Completos",
    readingTime: "16 min",
    keyConcepts: [
      "Algoritmo Guloso (Greedy)",
      "Otimo Local vs Otimo Global",
      "Problema da Cobertura de Conjuntos (Set Cover)",
      "Algoritmos de Aproximacao",
      "Problemas NP-Completos",
      "O Problema do Caixeiro-Viajante"
    ],
    teacherIntro:
      "Algoritmos gulosos sao intuitivos e diretos: a cada rodada, escolha a opcao que parece ser a melhor naquele exato momento (o otimo local). Embora nem sempre atinjam a perfeicao absoluta, eles sao indispensaveis para resolver problemas NP-completos onde uma solucao exata levaria milenios.",
    keyTakeaways: [
      "Uma estrategia gulosa seleciona o melhor passo imediato sem se preocupar com as consequencias futuras.",
      "Para problemas complexos como a Cobertura de Conjuntos, a forca bruta exige avaliar 2^n combinacoes, tornando o calculo exato inviavel.",
      "Algoritmos de aproximacao gulosos encontram solucoes muito proximas da otima em tempo polinomial aceitavel.",
      "Reconhecer um problema NP-Completo poupa semanas de esforco inutil tentando formular um algoritmo exato veloz.",
      "Sintomas classicos de NP-Completude: combinacoes de itens, cobertura de conjuntos, sequenciamento de cidades e explosao exponencial quando n cresce."
    ],
    sections: [
      {
        heading: "A Filosofia do Algoritmo Guloso",
        body: "Em termos tecnicos: a cada etapa, um algoritmo guloso escolhe o passo localmente ideal. No problema da programacao de salas de aula, para alocar o maximo de aulas em uma sala, a regra gulosa e simples: escolha sempre a aula que terminar primeiro. Essa heuristica simples produz a solucao globalmente perfeita.",
        callout: {
          type: "tip",
          title: "Quando o Guloso Falha",
          text: "No Problema da Mochila 0/1, escolher sempre o item mais caro que couber nem sempre resulta no valor maximo, pois pode deixar espacos vazios que poderiam ser preenchidos por combinacoes melhores de itens menores."
        }
      },
      {
        heading: "O Problema da Cobertura de Conjuntos (Set Covering)",
        body: "Voce esta lancando um programa de radio e precisa alcançar ouvintes em todos os 50 estados dos EUA. Cada estacao de transmissao cobre uma lista especifica de estados e possui um custo. Qual o menor numero de estacoes necessarias para cobrir todo o pais?",
        bullets: [
          "Forca Bruta: O conjunto potencia de 50 estacoes gera 2^50 combinacoes (mais de 1 quatrilhao de testes).",
          "Aproximacao Gulosa: 1. Escolha a estacao que cobre o maior numero de estados ainda nao cobertos; 2. Adicione-a a solucao e remova esses estados da lista de pendencias; 3. Repita ate cobrir todos os estados.",
          "Desempenho: O algoritmo roda em O(n^2) e entrega uma aproximacao garantida muito proxima do resultado matematico perfeito."
        ]
      },
      {
        heading: "Como Identificar Problemas NP-Completos",
        body: "Identificar quando um problema pertence a classe NP-Completo e crucial para evitar a busca impossivel por um algoritmo rapido exato:",
        bullets: [
          "Seu algoritmo roda velozmente para 5 itens, mas trava completamente quando a entrada chega a 20 ou 30 itens.",
          "O enunciado exige encontrar 'todos os subconjuntos possiveis' ou 'todas as permutacoes'.",
          "O desafio envolve cobrir um conjunto com itens menores ou agendar tarefas sem sobreposicao.",
          "O problema pode ser mapeado como o Caixeiro-Viajante ou a Cobertura de Conjuntos."
        ]
      },
      {
        heading: "O Caixeiro-Viajante Revisitado",
        body: "O problema do vendedor que precisa percorrer n cidades volta a tona: encontrar a rota perfeita e O(n!). A solucao na vida real e a aproximacao gulosa: parta de uma cidade qualquer e viaje sempre para a cidade mais proxima ainda nao visitada. A rota resultante pode nao ser a absoluta menor, mas sera encontrada em frações de segundo e extremamente eficiente.",
        callout: {
          type: "warning",
          title: "Pragmatismo na Engenharia de Software",
          text: "Em computacao pratica, 'bom o bastante e rapido agora' vence 'perfeito mas entregue apos o fim do universo'."
        }
      }
    ]
  },
  {
    id: "ga-cap-9",
    number: 9,
    part: "Algoritmos Avancados",
    partColor: "rose",
    title: "Programação Dinâmica",
    subtitle: "A construção de tabelas, o problema da mochila, substrings e subsequências comuns mais longas",
    readingTime: "18 min",
    keyConcepts: [
      "Programacao Dinamica (DP)",
      "Grade de Subproblemas (DP Grid)",
      "Problema da Mochila 0/1",
      "Substring Comum Mais Longa",
      "Maior Subsequencia Comum (LCS)",
      "Independencia de Subproblemas",
      "Git Diff e Analise de DNA"
    ],
    teacherIntro:
      "A programacao dinamica e uma das tecnicas mais poderosas da ciencia da computacao. Ela resolve problemas complexos quebrando-os em subproblemas menores, resolvendo cada um uma unica vez e combinando seus resultados atraves de uma grade de memorizacao.",
    keyTakeaways: [
      "A programacao dinamica comeca resolvendo subproblemas e vai construindo a solucao do problema maior.",
      "Toda solucao de DP envolve o preenchimento de uma grade (matriz) onde cada celula representa a solucao de um subproblema discreto.",
      "No Problema da Mochila 0/1, a grade compara o valor de manter a combinacao anterior contra o valor de incluir o novo item mais a capacidade remanescente.",
      "A programacao dinamica so e aplicavel quando os subproblemas sao discretos e completamente independentes entre si.",
      "A Maior Subsequencia Comum (LCS) e a base matematica por tras do comando 'git diff', corretores ortograficos e alinhamento de cadeias de DNA."
    ],
    sections: [
      {
        heading: "O Problema da Mochila 0/1",
        body: "Um ladrao invade uma loja com uma mochila que suporta no maximo 4 libras de carga. Ele pode roubar: um Violao (1 lb, R$ 1.500), um Aparelho de Som (4 lb, R$ 3.000) e um Notebook (3 lb, R$ 2.000). A combinacao otima e o Violao (1 lb) + Notebook (3 lb) = R$ 3.500, ocupando perfeitamente as 4 libras.",
        callout: {
          type: "info",
          title: "A Formula da Celula da Grade",
          text: "celula[i][j] = max(celula_acima, valor_do_item_atual + celula_acima_na_capacidade_restante). Essa formula simples preenche a grade inteira em tempo estritamente polinomial."
        }
      },
      {
        heading: "Substring Comum Mais Longa vs. Subsequencia Comum",
        body: "Ao digitar uma busca errada como 'hish', o motor quer saber se o usuario pretendia buscar 'fish' ou 'vista':",
        bullets: [
          "Substring Comum: Letras consecutivas continuas. Se letras coincidirem: celula[i][j] = celula[i-1][j-1] + 1; se diferirem, zera.",
          "Subsequencia Comum Mais Longa (LCS): Letras que aparecem na mesma ordem relativa, mesmo com espacos no meio. Se letras coincidirem: celula[i][j] = celula[i-1][j-1] + 1; se diferirem: max(celula_acima, celula_a_esquerda).",
          "Resultado: 'hish' e 'fish' compartilham 3 letras em subsequencia; 'hish' e 'vista' apenas 2. O sistema sugere 'fish'."
        ]
      },
      {
        heading: "Aplicacoes no Mundo Real",
        body: "A programacao dinamica nao e apenas um exercicio teorico; ela opera no cerne de servicos cotidianos:",
        bullets: [
          "Controle de Versao: O utilitario 'git diff' calcula a menor sequencia de adicoes e remocoes comparando duas versoes de um arquivo atraves de LCS.",
          "Biologia Computacional: Alinhamento de proteinas e sequencias de genoma humano no sequenciamento de DNA.",
          "Processamento de Linguagem Natural: Corretores ortograficos que sugerem correcoes por Distancia de Levenshtein."
        ]
      },
      {
        heading: "A Regra de Ouro da Programacao Dinamica",
        body: "A DP so funciona se os subproblemas forem independentes. Se o valor ou custo de um item mudar em funcao da escolha de outro item (como alugar uma sala de ensaio que reduz o preco das guitarras), os subproblemas tornam-se acoplados e a programacao dinamica falha.",
        callout: {
          type: "warning",
          title: "Subproblemas Acoplados",
          text: "Certifique-se sempre de que a escolha em uma celula da grade nao altera as restricoes das celulas subsequentes."
        }
      }
    ]
  },
  {
    id: "ga-cap-10",
    number: 10,
    part: "Algoritmos Avancados",
    partColor: "rose",
    title: "K-Vizinhos Mais Próximos",
    subtitle: "Classificação, regressão, extração de características e recomendações com KNN",
    readingTime: "15 min",
    keyConcepts: [
      "K-Vizinhos Mais Proximos (KNN)",
      "Classificacao vs Regressao",
      "Extracao de Caracteristicas (Features)",
      "Distancia Euclidiana",
      "Similaridade de Cossenos",
      "Sistemas de Recomendacao",
      "Reconhecimento de Caracteres (OCR)"
    ],
    teacherIntro:
      "O algoritmo K-Nearest Neighbors (KNN) e a porta de entrada para o aprendizado de maquina. Ele segue um principio popular consagrado: 'diga-me com quem andas e te direi quem es'. Analisando os K vizinhos mais proximos de um elemento no espaco de caracteristicas, podemos classificar o que ele e ou prever valores numericos com notavel precisao.",
    keyTakeaways: [
      "KNN serve para duas finalidades principais: classificacao (agrupar em categorias) e regressao (prever uma resposta numerica continua).",
      "A chave para o sucesso do KNN reside na correta extracao de caracteristicas (features numericas relevantes).",
      "A proximidade entre dois pontos e mensurada tipicamente atraves da formula da Distancia Euclidiana.",
      "Para recomendacoes onde usuarios tem escalas de notas diferentes, a Similaridade de Cossenos mede o angulo dos vetores, evitando distorcoes.",
      "KNN e aplicado em filtros de spam, leitura automatica de CEPs em envelopes (OCR) e recomendacoes de filmes e musicas."
    ],
    sections: [
      {
        heading: "Classificando Toranjas e Laranjas",
        body: "Imagine um cesto de frutas misteriosas. Como diferenciar toranjas de laranjas? Medimos duas caracteristicas: o diametro (tamanho) e a intensidade da cor avermelhada. Plotamos as frutas em um grafico cartesiano bidimensional. Para classificar uma nova fruta, localizamos seus vizinhos mais proximos: se 3 dos seus vizinhos mais proximos forem toranjas, ela quase certamente e uma toranja.",
        callout: {
          type: "info",
          title: "A Escolha do K",
          text: "Se K for muito pequeno (ex: K=1), o algoritmo fica vulneravel a ruido e anomalias. Se K for grande demais, a classe majoritaria dominara. Em problemas binarios, usa-se com frequencia um K impar (ex: 3 ou 5) para desempatar votos."
        }
      },
      {
        heading: "Regressao: Prevendo Valores Continuos",
        body: "Alem de categorizar (classificacao), KNN pode prever valores quantitativos (regressao). Se voce gerencia uma padaria e quer prever quantos paes assar amanha, selecione os dias passados com condicoes climaticas e sazonalidades mais parecidas e calcule a media de vendas desses K vizinhos.",
        bullets: [
          "Classificacao: Votacao por maioria entre os K vizinhos (ex: Filme de Comedia vs Drama).",
          "Regressao: Calculo da media aritmetica (ou ponderada pelo inverso da distancia) entre os valores dos K vizinhos."
        ]
      },
      {
        heading: "Calculando a Distancia Euclidiana",
        body: "Para medir a proximidade entre dois perfis no espaco n-dimensional, calcula-se a raiz quadrada da soma dos quadrados das diferencas de cada dimensao: sqrt((x1 - x2)^2 + (y1 - y2)^2 + ... + (zn1 - zn2)^2).",
        callout: {
          type: "tip",
          title: "Normalizacao de Escala",
          text: "Se uma variavel varia de 1 a 5 (notas de filmes) e outra varia de 1 a 1.000.000 (salario anual), a segunda dominara a formula da distancia. Por isso, todas as variaveis devem ser normalizadas para a mesma escala (ex: 0 a 1)."
        }
      },
      {
        heading: "Aplicacoes: OCR e Filtros de Spam",
        body: "Nos correios, maquinas leem digitos manuscritos em cartas atraves de OCR. Uma imagem de 32x32 pixels e convertida em um vetor de 1.024 caracteristicas binarias (linhas, curvas, lacos). O digito desenhado e comparado com milhares de exemplos catalogados: o digito de menor distancia revela o numero correto.",
        callout: {
          type: "warning",
          title: "Filtro de Spam e Naive Bayes",
          text: "Para triagem de e-mails, o classificador Naive Bayes analisa a probabilidade condicional de palavras tipicas de spam ('gratis', 'premio', 'urgente'), complementando algoritmos de vizinhanca."
        }
      }
    ]
  },
  {
    id: "ga-cap-11",
    number: 11,
    part: "Algoritmos Avancados",
    partColor: "rose",
    title: "Próximos Passos",
    subtitle: "Estruturas probabilísticas, árvores de busca, transformadas de Fourier e o horizonte da computação",
    readingTime: "17 min",
    keyConcepts: [
      "Arvores Binarias de Busca (BST) e B-Trees",
      "Indice Invertido (Inverted Index)",
      "Transformada de Fourier (FFT)",
      "MapReduce e Processamento Paralelo",
      "Filtros de Bloom",
      "HyperLogLog",
      "Criptografia SHA e Diffie-Hellman",
      "Programacao Linear e Algoritmo Simplex"
    ],
    teacherIntro:
      "Aditya Bhargava conclui o livro abrindo uma janela panorâmica sobre o vasto territorio que se estende apos os algoritmos fundamentais. De estruturas probabilisticas que economizam gigabytes de memoria a transformadas matematicas que tornam a musica digital possivel, aqui estao as 10 grandes ferramentas que todo desenvolvedor senior deve conhecer.",
    keyTakeaways: [
      "Arvores Binarias de Busca (BST) e B-Trees combinam a velocidade de insercao de listas encadeadas com a busca logaritmica O(log n) de arrays ordenados.",
      "Indices invertidos mapeiam palavras para os documentos onde ocorrem, formando o mecanismo basico dos motores de busca como o Google.",
      "A Transformada Rapida de Fourier (FFT) decompõe ondas de som em frequencias individuais, tornando possivel a compressao MP3 e a remocao de ruidos.",
      "Filtros de Bloom e HyperLogLog sao estruturas probabilisticas que respondem consultas massivas em frações de segundo com consumo minimo de memoria.",
      "A criptografia de chave publica (Diffie-Hellman e RSA) e os hashes criptograficos (SHA-256) sustentam a seguranca da internet e assinaturas digitais."
    ],
    sections: [
      {
        heading: "Arvores Binarias de Busca e B-Trees",
        body: "Em um array ordenado, a busca e O(log n), mas a insercao e O(n). Em uma lista, a insercao e O(1), mas a busca e O(n). A Arvore Binaria de Busca (BST) equilibra ambos: tanto busca quanto insercao e delecao ocorrem em O(log n) no caso equilibrado (Red-Black Trees). Bancos de dados relacionais usam B-Trees para manter bilhoes de registros indexados em disco de modo veloz.",
        callout: {
          type: "info",
          title: "Importancia do Balanceamento",
          text: "Se os itens forem inseridos em ordem crescente em uma BST simples, a arvore degenera em uma lista encadeada vertical O(n). Arvores balanceadas (AVL ou Red-Black) corrigem isso automaticamente por meio de rotacoes."
        }
      },
      {
        heading: "Indice Invertido e Motores de Busca",
        body: "Como o Google encontra milhoes de paginas que contem uma palavra em milesimos de segundo? Em vez de ler cada pagina da web a cada busca, ele mantem um Indice Invertido: uma tabela hash onde a chave e cada palavra catalogada ('algoritmo') e o valor e uma lista de todos os links de paginas onde essa palavra aparece.",
        bullets: [
          "Indexacao Previa: Feita por crawlers na fase de processamento em lote.",
          "Consulta Instantanea: Pesquisar por 'python' e 'algoritmo' resume-se a calcular a intersecao de dois conjuntos em O(1)."
        ]
      },
      {
        heading: "Filtros de Bloom e HyperLogLog",
        body: "Quando a escala de dados e gigantesca, estruturas tradicionais consomem memoria excessiva. As estruturas de dados probabilisticas resolvem isso com maestria:",
        bullets: [
          "Filtro de Bloom: Tabela hash probabilistica compacta. Pode retornar falsos positivos ('o item pode estar no conjunto'), mas NUNCA falsos negativos ('com certeza absoluta nao esta'). Util para evitar consultas desnecessarias ao disco.",
          "HyperLogLog: Estima a quantidade de usuarios unicos (cardinalidade) em um fluxo de bilhoes de acessos usando apenas 1.5 KB de memoria com precisao de 98%."
        ]
      },
      {
        heading: "MapReduce, Fourier e Criptografia",
        body: "A fronteira moderna da computacao se desdobra em tres grandes pilares:",
        bullets: [
          "MapReduce: Dividir o processamento de petabytes de dados em milhares de servidores paralelos (map) e agregar os resultados finais (reduce).",
          "Transformada de Fourier: Separa um sinal complexo (uma musica gravada) em notas e frequencias puras. Essencial para compressao JPG, MP3 e analise sismica.",
          "Criptografia SHA e Diffie-Hellman: Funcoes hash de via unica (SHA-256) garantem a integridade de senhas e transacoes blockchain, enquanto Diffie-Hellman permite que duas partes combinem uma chave secreta sobre um canal publico inseguro."
        ]
      }
    ]
  }
];

