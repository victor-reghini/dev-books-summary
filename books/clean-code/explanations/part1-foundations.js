// Parte 1: Fundamentos do Código Limpo (Capítulos 1 a 5)
// Explicações estruturadas como aulas visuais baseadas na obra de Robert C. Martin.

export const part1Chapters = [
  {
    id: 'cap-1',
    number: 1,
    part: 'Fundamentos',
    partColor: 'amber',
    title: 'Código Limpo',
    subtitle: 'O custo do código ruim, a atitude profissional e a Regra do Escoteiro',
    readingTime: '8 min',
    smellRefs: ['G5', 'G9', 'G12'],
    teacherIntro:
      'O código nunca desaparecerá porque ele representa a especificação formal, detalhada e inequívoca dos requisitos. Esperar que máquinas gerem tudo sem intervenção humana ignora que alguém sempre precisará especificar detalhes exatos.',
    keyTakeaways: [
      'A proporção de tempo gasta lendo versus escrevendo código passa de 10 para 1. Tornar o código fácil de ler é a forma mais rápida de escrever.',
      'Lei de LeBlanc: "Depois é igual a nunca" (Later equals never). O código ruim que você deixa para limpar depois nunca será limpo.',
      'A única maneira de andar rápido e cumprir prazos de forma sustentável é manter o código limpo o tempo todo.',
      'Regra do Escoteiro: deixe a área de acampamento (o módulo em que você tocou) um pouco mais limpa do que como você a encontrou.'
    ],
    sections: [
      {
        heading: 'A Armadilha da Produtividade e o Grande Redesign',
        body: 'Quando equipes correm sem cuidar da qualidade, cada nova entrega adiciona impedimentos (wading). Em poucos meses ou anos, a velocidade cai assintoticamente para perto de zero. A gerência então cria um "Tiger Team" para reescrever tudo do zero, iniciando uma corrida que pode durar anos apenas para alcançar o sistema antigo.',
        callout: {
          type: 'warning',
          title: 'Sintoma de Wading (Patinar no Código)',
          text: 'Você estima uma mudança simples em 2 horas, mas descobre que alterar uma linha quebra outros 4 módulos ocultos.'
        }
      },
      {
        heading: 'Filosofia 5S (Lean / TPM no Código)',
        body: 'No prefácio, James O. Coplien relaciona a manutenção de software ao sistema 5S japonês:',
        bullets: [
          'Seiri (Organização): saber onde as coisas estão usando nomes adequados.',
          'Seiton (Ordem): um lugar para cada pedaço de código e cada pedaço em seu lugar.',
          'Seiso (Limpeza): manter o local livre de fios soltos, comentários inúteis e código comentado.',
          'Seiketsu (Padronização): a equipe concorda sobre um estilo consistente.',
          'Shutsuke (Disciplina): ter o hábito diário de refletir e aplicar os padrões.'
        ]
      },
      {
        heading: 'O que os Mestres Dizem sobre Código Limpo',
        body: 'Robert C. Martin entrevistou referências da engenharia de software para sintetizar o conceito:',
        masters: [
          {
            author: 'Bjarne Stroustrup (Criador do C++)',
            quote: 'Código elegante e eficiente. A lógica deve ser direta para dificultar o esconderijo de bugs, as dependências mínimas para facilitar a manutenção e o tratamento de erros completo. Código limpo faz uma coisa bem feita.'
          },
          {
            author: 'Grady Booch (Autor de OO Analysis and Design)',
            quote: 'Código limpo é simples e direto. Ele é lido como uma prosa bem escrita, nunca obscurece a intenção do projetista e está repleto de abstrações nítidas.'
          },
          {
            author: 'Dave Thomas (Fundador da OTI / Pragmatic)',
            quote: 'Pode ser lido e aprimorado por outro desenvolvedor que não o autor original. Possui testes unitários e de aceitação, nomes significativos e uma API mínima.'
          },
          {
            author: 'Michael Feathers (Autor de Working Effectively with Legacy Code)',
            quote: 'Código limpo sempre parece que foi escrito por alguém que se importa.'
          },
          {
            author: 'Ward Cunningham (Inventor da Wiki e co-criador do XP)',
            quote: 'Você sabe que está trabalhando em código limpo quando cada rotina que você lê acaba sendo exatamente o que você esperava.'
          }
        ]
      }
    ],
    interactiveWidget: {
      type: 'productivity-simulator',
      title: 'Simulador: Curva de Produtividade vs. Tempo (Figura 1-1)',
      description: 'Compare o impacto acumulado no throughput da equipe entre acumular dívida técnica ("Fazer Rápido e Sujo") e aplicar a Regra do Escoteiro continuamente.'
    }
  },
  {
    id: 'cap-2',
    number: 2,
    part: 'Fundamentos',
    partColor: 'amber',
    title: 'Nomes Significativos',
    subtitle: 'Intenção clara, distinções reais, pronunciabilidade e contexto sem ruído',
    readingTime: '10 min',
    smellRefs: ['N1', 'N2', 'N3', 'N4', 'N5', 'N6', 'N7'],
    teacherIntro:
      'Escolher bons nomes leva tempo, mas economiza muito mais tempo do que leva. Se um nome exige um comentário explicativo ao lado, ele não revela sua intenção.',
    keyTakeaways: [
      'Responda três perguntas no próprio nome: por que existe, o que faz e como é usado.',
      'Evite desinformação e palavras de ruído: não chame um conjunto de accountList se não for uma lista, nem crie ProductInfo e ProductData sem distinção clara.',
      'Classes e objetos devem ter nomes de substantivos (Customer, WikiPage, AddressParser); métodos devem ter nomes de verbos (postPayment, deletePage, save).',
      'O tamanho de um nome deve ser proporcional ao tamanho do seu escopo: variáveis de 1 letra como i ou j só cabem em loops de poucas linhas.'
    ],
    sections: [
      {
        heading: '1. Revele a Intenção e Evite Desinformação',
        body: 'No exemplo clássico do jogo Campo Minado, um método chamado getThem() iterava sobre theList verificando se x[0] == 4. Nenhuma linha tinha lógica complexa, mas o propósito estava oculto. Ao renomear theList para gameBoard, o array int[] para uma classe Cell com isFlagged() e o método para getFlaggedCells(), a leitura torna-se imediata.',
        callout: {
          type: 'tip',
          title: 'Teste do Comentário',
          text: 'Sempre que escrever int d; // tempo decorrido em dias, apague o comentário e batize a variável de elapsedTimeInDays.'
        }
      },
      {
        heading: '2. Distinções Significativas, Pronunciabilidade e Busca',
        body: 'Usar a1, a2 nos parâmetros de cópia não informa quem é a origem e quem é o destino (use source e destination). Da mesma forma, nomes como genymdhms impedem conversas técnicas na equipe: prefira generationTimestamp. Constantes nomeadas como WORK_DAYS_PER_WEEK são fáceis de localizar com grep, ao contrário do número literal 5.',
        bullets: [
          'Sem Notação Húngara ou prefixos de membro (m_dsc): IDEs modernas e classes pequenas tornam codificações visuais obsoletas.',
          'Interfaces sem o prefixo I: prefira chamar a interface de ShapeFactory e a implementação concreta de ShapeFactoryImp para não vazar detalhes ao cliente.',
          'Uma palavra por conceito: não misture fetch, retrieve e get para operações equivalentes em classes diferentes.',
          'Sem trocadilhos (Do Not Pun): se add soma ou concatena dois valores em toda a base, não use add para inserir um item em uma coleção (use insert ou append).'
        ]
      },
      {
        heading: '3. Contexto Significativo vs. Contexto Gratuito',
        body: 'Variáveis como state sozinhas são ambíguas, mas dentro da classe Address ganham contexto claro. Por outro lado, se uma aplicação se chama "Gas Station Deluxe", prefixar todas as classes com GSD (GSDAccountAddress) polui o autocompletar da IDE e atrapalha a reutilização.'
      }
    ],
    interactiveWidget: {
      type: 'naming-inspector',
      title: 'Inspetor de Nomes: Antes vs. Depois',
      description: 'Inspecione identificadores reais do livro e veja qual regra de nomenclatura (N1 a N7) transforma código críptico em leitura fluente.'
    }
  },
  {
    id: 'cap-3',
    number: 3,
    part: 'Fundamentos',
    partColor: 'amber',
    title: 'Funções',
    subtitle: 'Funções pequenas, nível único de abstração, poucos argumentos e CQS',
    readingTime: '12 min',
    smellRefs: ['F1', 'F2', 'F3', 'F4', 'G23', 'G30', 'G34'],
    teacherIntro:
      'A primeira regra das funções é que elas devem ser pequenas. A segunda regra é que elas devem ser ainda menores do que isso. Funções curtas, com um único nível de abstração e nomes descritivos contam a história do sistema.',
    keyTakeaways: [
      'Faça apenas uma coisa (Do One Thing): se você consegue extrair outra função dela com um nome que não seja apenas uma paráfrase da implementação, ela faz mais de uma coisa.',
      'Regra Decrescente (Stepdown Rule): o código deve ser lido de cima para baixo como uma sequência de parágrafos "PARA...", descendo um nível de abstração por função.',
      'Argumentos são difíceis de ler e testar: o ideal é zero (niládica), seguido de um (monádica) ou dois (diádica). Três argumentos (triádica) exigem justificativa forte.',
      'Argumentos booleanos (Flag Arguments) gritam que a função faz duas coisas: divida render(boolean isSuite) em renderForSuite() e renderForSingleTest().'
    ],
    sections: [
      {
        heading: 'Um Nível de Abstração e a Regra Decrescente',
        body: 'Misturar conceitos de alto nível como getHtml() com detalhes intermediários como String pagePathName = PathParser.render(pagePath) e detalhes baixos como .append("\\n") dentro da mesma função confunde o leitor. Cada função deve introduzir apenas os passos imediatos situados um nível abaixo do seu próprio nome.'
      },
      {
        heading: 'Escondendo Instruções Switch com Polimorfismo',
        body: 'Um switch por tipo de funcionário (COMMISSIONED, HOURLY, SALARIED) dentro de calculatePay() viola o Princípio da Responsabilidade Única (SRP) e o Princípio Aberto-Fechado (OCP), além de se repetir em isPayday() e deliverPay(). A solução é enterrar o switch uma única vez dentro de uma Abstract Factory (EmployeeFactoryImpl) que retorna instâncias polimórficas de Employee.',
        callout: {
          type: 'info',
          title: 'Conexão com Padrões de Projeto',
          text: 'Esta refatoração aplica diretamente os padrões Factory Method e Abstract Factory para substituir condicionais por polimorfismo [G23].'
        }
      },
      {
        heading: 'Efeitos Colaterais, CQS e Tratamento de Erros',
        body: 'Funções não devem prometer uma coisa e fazer outra escondida:',
        bullets: [
          'Sem Efeitos Colaterais Ocultos: em checkPassword(userName, password), chamar Session.initialize() cria um acoplamento temporal invisível (a função só pode ser chamada quando for seguro reiniciar a sessão).',
          'Command Query Separation (CQS): uma função deve alterar o estado de um objeto (comando) OU retornar informações sobre ele (consulta), mas nunca ambos. Evite if (set("username", "unclebob")).',
          'Extraia Blocos Try/Catch: o tratamento de erro é "uma coisa". Uma função que possui um bloco try deve começar no try e terminar imediatamente após o catch/finally, delegando a lógica de negócio para outra função.'
        ]
      }
    ],
    interactiveWidget: {
      type: 'stepdown-visualizer',
      title: 'Visualizador da Regra Decrescente (Stepdown Rule)',
      description: 'Explore como uma função longa de 50 linhas é decomposta em uma árvore de leitura narrativa onde cada nível desce exatamente um degrau de abstração.'
    }
  },
  {
    id: 'cap-4',
    number: 4,
    part: 'Fundamentos',
    partColor: 'amber',
    title: 'Comentários',
    subtitle: 'Por que comentários mentem, como se explicar em código e quais comentários evitar',
    readingTime: '9 min',
    smellRefs: ['C1', 'C2', 'C3', 'C4', 'C5'],
    teacherIntro:
      '"Não comente código ruim, reescreva-o" (Kernighan e Plaugher). Comentários não compensam código mal escrito. Como o código evolui e é movido constantemente, comentários não são mantidos com o mesmo rigor e acabam se tornando mentiras enganosas.',
    keyTakeaways: [
      'A verdade só existe em um lugar: no código. Sempre que sentir vontade de escrever um comentário, tente primeiro refatorar o código para que o comentário se torne supérfluo.',
      'Explique-se em código: prefira if (employee.isEligibleForFullBenefits()) em vez de if ((employee.flags & HOURLY_FLAG) && (employee.age > 65)) com um comentário acima.',
      'Código comentado [C5] é uma abominação: ninguém ousa apagá-lo achando que é importante, e ele acumula sujeira. O sistema de controle de versão (Git) já guarda o histórico.',
      'Bons comentários são raros e cirúrgicos: avisos de consequências (ex: SimpleDateFormat não é thread-safe), explicação de intenção arquitetural ou esclarecimento de APIs externas.'
    ],
    sections: [
      {
        heading: 'Quando um Comentário é Realmente Bom?',
        body: 'Nem todo comentário é ruim, mas cada um precisa justificar sua existência:',
        bullets: [
          'Explicação de Intenção: documentar por que uma decisão de design ou ordenação específica foi tomada.',
          'Alerta de Consequências: avisar outros programadores sobre armadilhas de performance ou thread-safety.',
          'Esclarecimento: traduzir o significado de retornos de bibliotecas padrão que você não pode alterar (como testes de compareTo).',
          'TODOs Temporários: marcar um ponto específico de trabalho pendente, desde que revisados e limpos regularmente.'
        ]
      },
      {
        heading: 'A Galeria de Comentários Ruins',
        body: 'A grande maioria dos comentários cai nesta lista e deve ser removida ou substituída por código expressivo:',
        bullets: [
          'Murmúrio (Mumbling): comentários apressados em blocos catch que ninguém entende sem ler o resto do sistema.',
          'Comentários Redundantes e Ruído: Javadocs que apenas repetem o nome do método ou construtores padrão (/** Default constructor */).',
          'Comentários de Diário e Atribuição: listas de mudanças no topo do arquivo ou /* Adicionado por Fulano */. Esse é o papel do Git.',
          'Comentários de Fechamento de Chave: escrever } // fim do while indica que sua função está longa e aninhada demais.',
          'Código Comentado: apague imediatamente.'
        ]
      }
    ],
    interactiveWidget: {
      type: 'comment-auditor',
      title: 'Auditor de Comentários:Manter, Refatorar ou Deletar?',
      description: 'Analise trechos reais comentados e veja a decisão recomendada segundo as heurísticas C1 a C5.'
    }
  },
  {
    id: 'cap-5',
    number: 5,
    part: 'Fundamentos',
    partColor: 'amber',
    title: 'Formatação',
    subtitle: 'A metáfora do jornal, distância vertical, afinidade conceitual e regras de equipe',
    readingTime: '8 min',
    smellRefs: ['G10', 'G11', 'G24'],
    teacherIntro:
      'Formatação de código trata de comunicação, e comunicação é a primeira responsabilidade de um desenvolvedor profissional. A funcionalidade que você cria hoje pode mudar na próxima sprint, mas a legibilidade do seu estilo afetará todas as manutenções futuras.',
    keyTakeaways: [
      'Metáfora do Jornal: o topo do arquivo traz o título (nome da classe) e a sinopse (métodos públicos de alto nível); os detalhes técnicos aumentam gradualmente conforme se rola a página.',
      'Abertura vs. Densidade Vertical: use linhas em branco para separar conceitos distintos (pacotes, imports, métodos) e mantenha linhas intimamente relacionadas juntas.',
      'Distância Vertical: variáveis locais ficam no topo da função; variáveis de instância no topo da classe; funções dependentes ficam próximas, com a função chamadora acima da chamada.',
      'Regras da Equipe: um time de desenvolvedores deve concordar com um único estilo de formatação para que todo o software pareça ter sido escrito por uma só mente.'
    ],
    sections: [
      {
        heading: 'Formatação Vertical e Tamanho de Arquivo',
        body: 'Ao analisar projetos maduros como JUnit, FitNesse e Ant, Robert C. Martin mostra que é perfeitamente possível construir sistemas grandes com arquivos que têm em média de 65 a 100 linhas e raramente ultrapassam 200 a 500 linhas. Arquivos pequenos são mais fáceis de escanear e compreender.',
        callout: {
          type: 'info',
          title: 'Proximidade entre Chamador e Chamado',
          text: 'Quando uma função A chama a função B, posicione B logo abaixo de A. Isso cria um fluxo previsível sem forçar o leitor a saltar por dezenas de arquivos ou centenas de linhas [G10].'
        }
      },
      {
        heading: 'Formatação Horizontal e Alinhamento',
        body: 'Linhas devem permanecer curtas (idealmente entre 80 e 120 caracteres) para nunca exigir rolagem horizontal:',
        bullets: [
          'Espaçamento Horizontal: coloque espaço ao redor de operadores de atribuição (=) para separar o lado esquerdo do direito, mas não coloque espaço entre o nome do método e o parêntese de abertura.',
          'Não use Alinhamento Horizontal em Colunas: alinhar nomes de variáveis ou sinais de = em tabelas visuais atrai o olho para a coluna errada (ignora o tipo da variável) e mascara classes que têm atributos demais.',
          'Indentação Inegociável: nunca colapse instruções if, while ou funções curtas em uma única linha sem indentação.'
        ]
      }
    ],
    interactiveWidget: {
      type: 'newspaper-layout',
      title: 'Anatomia Visual: A Metáfora do Jornal no Código',
      description: 'Veja como organizar verticalmente uma classe para que qualquer leitor entenda o que ela faz nos primeiros 15 segundos.'
    }
  }
];

