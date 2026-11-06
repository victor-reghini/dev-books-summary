// Parte 3: Arquitetura, Emergência e Concorrência (Capítulos 10 a 13)
// Classes (SRP/OCP/DIP), Sistemas (DI/AOP), Emergência (4 Regras de Beck) e Concorrência.

export const part3Chapters = [
  {
    id: 'cap-10',
    number: 10,
    part: 'Arquitetura e Escala',
    partColor: 'cobalt',
    title: 'Classes',
    subtitle: 'Classes pequenas, Responsabilidade Única (SRP), coesão, OCP e Inversão de Dependência (DIP)',
    readingTime: '11 min',
    smellRefs: ['G5', 'G8', 'G14', 'G17', 'G23'],
    teacherIntro:
      'Assim como nas funções, a primeira regra das classes é que elas devem ser pequenas. A diferença está na unidade de medida: com funções medimos tamanho contando linhas físicas; com classes medimos tamanho contando responsabilidades.',
    keyTakeaways: [
      'Princípio da Responsabilidade Única (SRP): uma classe ou módulo deve ter um, e apenas um, motivo para mudar.',
      'Teste do Nome da Classe: se você não consegue criar um nome conciso ou precisa usar palavras vagas como Processor, Manager ou Super, a classe acumula responsabilidades demais.',
      'Mantenha a Coesão Alta: quando uma classe tem métodos que usam a maioria de suas variáveis de instância, ela é coesa. Quebrar funções grandes naturalmente divide uma classe inchada em várias classes pequenas e coesas.',
      'Organize para Mudança (OCP) e Isole de Detalhes (DIP): estruture classes para que novas funcionalidades sejam adicionadas estendendo o sistema (subclasses) e dependa de abstrações (interfaces), nunca de classes concretas voláteis.'
    ],
    sections: [
      {
        heading: 'Organização Interna e Encapsulamento',
        body: 'Seguindo a convenção clássica, uma classe começa com a lista de variáveis: constantes públicas estáticas, seguidas de variáveis privadas estáticas e variáveis privadas de instância. Logo abaixo vêm as funções públicas, e cada função utilitária privada aparece imediatamente abaixo da função pública que a chama (Regra Decrescente). Variáveis e funções devem ser privadas por padrão; afrouxar o encapsulamento para protected ou pacote é sempre um último recurso.'
      },
      {
        heading: 'SRP: Muitas Classes Pequenas vs. Poucas Classes Grandes',
        body: 'Muitos desenvolvedores temem que um grande número de classes pequenas e de propósito único dificulte entender o quadro geral. Na prática, um sistema com muitas classes pequenas não tem mais peças em movimento do que um sistema com poucas classes gigantes. A pergunta é: você prefere organizar suas ferramentas em caixas com muitas gavetas pequenas rotuladas com precisão ou jogar tudo dentro de duas gavetas enormes?'
      },
      {
        heading: 'OCP e DIP na Prática (Exemplos Sql e Portfolio)',
        body: 'Uma classe Sql que possui métodos create(), insert(), selectWithCriteria() em um só arquivo precisa ser reaberta e editada toda vez que surge um novo tipo de comando SQL, além de mudar quando mudam os detalhes de um comando existente. Ao dividir Sql em subclasses derivadas (CreateSql, InsertSql, SelectSql, Where, ColumnList), adicionar o comando UPDATE exige apenas criar a subclasse UpdateSql sem tocar em código existente (OCP). Da mesma forma, uma classe Portfolio que depende da interface StockExchange (em vez da classe concreta TokyoStockExchange) pode ser testada com um FixedStockExchangeStub sem sofrer com a volatilidade da cotação real (DIP).'
      }
    ],
    interactiveWidget: {
      type: 'srp-cohesion-splitter',
      title: 'Refatorador de Coesão: De Classe Monolítica para SRP + OCP',
      description: 'Inspecione como variáveis de instância agrupadas revelam fronteiras naturais para extrair classes coesas.'
    }
  },
  {
    id: 'cap-11',
    number: 11,
    part: 'Arquitetura e Escala',
    partColor: 'cobalt',
    title: 'Sistemas',
    subtitle: 'Separando construção de uso, Injeção de Dependência, AOP e crescimento incremental',
    readingTime: '10 min',
    smellRefs: ['G7', 'G13', 'G35'],
    teacherIntro:
      'Construir uma cidade inteira exige níveis de abstração diferentes de gerenciar um único cruzamento. No software, sistemas limpos separam claramente o processo de inicialização e montagem (construção de objetos) da lógica de execução em tempo real (uso).',
    keyTakeaways: [
      'Separe Construção de Uso: o processo de instanciar dependências e conectar o grafo de objetos não deve ficar espalhado pela lógica de negócio via Lazy Initialization acoplada.',
      'Três Mecanismos de Separação: (1) Separação do main, (2) Abstract Factories quando a aplicação precisa controlar o momento da criação, e (3) Injeção de Dependência (DI / Inversão de Controle).',
      'Preocupações Transversais (Cross-Cutting Concerns): persistência, transações, segurança e logging não devem poluir objetos de domínio (POJOs); use Aspect-Oriented Programming (AOP), Proxies ou Decorators.',
      'Adie Decisões até o Último Momento Responsável: evite o Big Design Up Front (BDUF). Comece simples com POJOs desacoplados e escale a arquitetura conforme a necessidade real for comprovada.'
    ],
    sections: [
      {
        heading: 'O Problema da Inicialização Preguiçosa (Lazy Initialization)',
        body: 'A expressão if (service == null) service = new MyServiceImpl(); parece conveniente, mas acopla a classe diretamente à implementação concreta MyServiceImpl, impede testes unitários isolados sem alterar o código e mistura a responsabilidade de construir o serviço com a lógica de execução diária.'
      },
      {
        heading: 'Escalando Arquiteturas: A Lição do EJB2 vs. POJOs + Spring',
        body: 'Nos primórdios do Java Enterprise (EJB2), uma classe de entidade como Bank precisava implementar interfaces pesadas do container, misturando regras de negócio com detalhes de transação, ciclo de vida e persistência. Os objetos não podiam ser instanciados nem testados fora do servidor de aplicação. A arquitetura moderna resolveu isso com POJOs puros combinados com Injeção de Dependência e Aspectos (Spring AOP / AspectJ / Proxies), onde persistência e segurança envolvem o objeto como Decorators sem que a regra de negócio saiba que eles existem.'
      }
    ],
    interactiveWidget: {
      type: 'system-wiring-diagram',
      title: 'Arquitetura de Sistema: Main, Abstract Factory e Container DI',
      description: 'Observe o fluxo das setas de dependência quando a construção é isolada no módulo Main/Container.'
    }
  },
  {
    id: 'cap-12',
    number: 12,
    part: 'Arquitetura e Escala',
    partColor: 'cobalt',
    title: 'Emergência',
    subtitle: 'Ficando limpo através das 4 Regras de Design Simples de Kent Beck',
    readingTime: '8 min',
    smellRefs: ['G5', 'N1', 'N3', 'T1'],
    teacherIntro:
      'Como garantir que um projeto inteiro tenha um bom design sem cair na paralisia do Big Design Up Front? Segundo Kent Beck, um design é "simples" e faz emergir boa arquitetura se seguir quatro regras em ordem estrita de prioridade.',
    keyTakeaways: [
      'Regra 1 (Prioridade Máxima): Executa todos os testes. Um sistema que é testado por completo precisa, por força da necessidade, ter classes pequenas, responsabilidade única e baixo acoplamento.',
      'Regra 2: Não contém duplicação (DRY). A duplicação representa trabalho extra, risco extra e complexidade desnecessária.',
      'Regra 3: Expressa a intenção do programador. Use bons nomes, funções curtas, nomenclatura padrão de Design Patterns e testes bem escritos.',
      'Regra 4 (Prioridade Mais Baixa): Minimiza o número de classes e métodos. Evite criar interfaces ou classes por puro dogmatismo quando não agregam valor.'
    ],
    sections: [
      {
        heading: 'Por que "Executa Todos os Testes" Governa a Arquitetura?',
        body: 'Um sistema com design perfeito no papel mas que não possui forma simples de ser validado é um sistema quebrado. Quando nos obrigamos a tornar cada classe testável isoladamente, somos levados naturalmente a aplicar Injeção de Dependência, interfaces, mocks e o Princípio da Responsabilidade Única. O acoplamento cai e a qualidade arquitetural emerge.'
      },
      {
        heading: 'Eliminando Duplicação Estrutural com Template Method',
        body: 'Duplicação não são apenas linhas idênticas copiadas e coladas. No exemplo de cálculo de férias (VacationPolicy), o método accrueUSDivisionVacation() e o método accrueEUDivisionVacation() tinham exatamente o mesmo algoritmo de 3 passos (calcular horas base, aplicar mínimo legal e atualizar registro), mudando apenas a regra do mínimo legal. Aplicando o padrão Template Method, a classe base define o algoritmo único accrueVacation() e delega apenas o passo alterToLegalMinimums() para as subclasses USVacationPolicy e EUVacationPolicy.'
      },
      {
        heading: 'Expressividade e Pragmatismo',
        body: 'A maior parte do custo de um projeto de software está na manutenção de longo prazo. Se uma classe funciona como um Command ou um Visitor, inclua o nome do padrão no identificador da classe para que outros desenvolvedores reconheçam imediatamente a estrutura [N3]. Contudo, lembre-se da Regra 4: mantenha o número de classes e métodos pequeno, aplicando as regras de refatoração sem cair em burocracia.'
      }
    ],
    interactiveWidget: {
      type: 'beck-rules-pyramid',
      title: 'Pirâmide de Emergência: As 4 Regras de Kent Beck',
      description: 'Interaja com cada camada das 4 Regras de Design Simples e veja como elas se reforçam mutuamente.'
    }
  },
  {
    id: 'cap-13',
    number: 13,
    part: 'Arquitetura e Escala',
    partColor: 'cobalt',
    title: 'Concorrência',
    subtitle: 'Desacoplando o que de quando, modelos de execução, deadlock e testes multithread',
    readingTime: '14 min',
    smellRefs: ['G26', 'G31'],
    teacherIntro:
      '"Objetos são abstrações de processamento. Threads são abstrações de agendamento" (James O. Coplien). Escrever programas concorrentes limpos é difícil porque o código que parece óbvio e correto em uma única thread pode falhar silenciosamente sob múltiplas threads.',
    keyTakeaways: [
      'Concorrência é uma estratégia de desacoplamento: ela separa O QUE é feito de QUANDO é feito, melhorando throughput quando há espera de I/O.',
      'Operações simples como ++lastIdUsed não são atômicas: com apenas 2 threads, existem 12.870 caminhos possíveis de execução no bytecode Java (e 2.704.156 para o tipo long).',
      'Mantenha o código de concorrência separado das regras de negócio (SRP), limite severamente o escopo de dados compartilhados e prefira dados imutáveis ou cópias.',
      'As 4 Condições de Deadlock: Exclusão Mútua, Lock & Wait, Sem Preempção e Espera Circular. Quebrar qualquer uma das quatro impede a ocorrência de deadlock.'
    ],
    sections: [
      {
        heading: 'Mitos e Equívocos sobre Concorrência',
        body: 'Concorrência nem sempre melhora a performance (ela introduz overhead de coordenação e troca de contexto) e muda drasticamente o design do sistema. Além disso, mesmo que você não gerencie threads manualmente, containers web (como Servlets) já executam seu código de forma concorrente.'
      },
      {
        heading: 'Princípios de Defesa e Conhecimento da Biblioteca',
        body: 'Para proteger o sistema contra corrupção de estado:',
        bullets: [
          'Limite o Escopo de Dados: quanto mais lugares podem atualizar um objeto compartilhado, maior a chance de esquecer um synchronized ou violar o DRY.',
          'Use Classes Thread-Safe Modernas: prefira ConcurrentHashMap em vez de HashMap ou Hashtable sincronizado; use AtomicInteger / AtomicLong (baseados em Compare-and-Swap não bloqueante) para contadores simples; utilize Executor, CountDownLatch e Semaphore.',
          'Evite Dependências entre Métodos Sincronizados: se uma classe compartilhada possui hasNext() e next(), duas threads podem colidir entre as duas chamadas. Prefira Server-Based Locking (criar um método único getNextOrNull() na classe servidora).'
        ]
      },
      {
        heading: 'Modelos Clássicos e Testes de Código Concorrente',
        body: 'Quase todo problema concorrente é uma variação de três problemas clássicos: Produtor-Consumidor (fila limitada), Leitores-Escritores (equilibrar throughput de leitura com atualização sem causar starvation) e Jantar dos Filósofos (competição circular por múltiplos recursos). Para testar código concorrente: nunca descarte uma falha intermitente como "evento cósmico isolado"; faça o código não-thread funcionar primeiro; rode os testes com mais threads do que núcleos de CPU; execute em sistemas operacionais diferentes; e instrumente o código (jiggling com Object.wait(), Thread.sleep(), Thread.yield() ou ferramentas de AOP) para forçar trocas de contexto.'
      }
    ],
    interactiveWidget: {
      type: 'concurrency-simulator',
      title: 'Simulador de Race Condition (++lastIdUsed) e Prevenção de Deadlock',
      description: 'Execute passo a passo o entrelaçamento de duas threads no incremento não-atômico e compare com AtomicInteger (CAS).'
    }
  }
];

