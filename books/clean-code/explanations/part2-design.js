// Parte 2: Design e Qualidade (Capítulos 6 a 9)
// Objetos e Estruturas de Dados, Tratamento de Erros, Fronteiras e Testes Unitários.

export const part2Chapters = [
  {
    id: 'cap-6',
    number: 6,
    part: 'Design e Qualidade',
    partColor: 'teal',
    title: 'Objetos e Estruturas de Dados',
    subtitle: 'Abstração de dados, anti-simetria objeto vs. estrutura e a Lei de Demeter',
    readingTime: '10 min',
    smellRefs: ['G8', 'G14', 'G23', 'G36'],
    teacherIntro:
      'Esconder a implementação não se resume a colocar variáveis privadas entre uma camada de getters e setters. Abstração real consiste em expor interfaces que permitem manipular a essência dos dados sem conhecer sua representação interna.',
    keyTakeaways: [
      'Abstração de Dados: prefira getPercentFuelRemaining() (abstrato) a getGallonsOfGasoline() (que expõe o tipo e a estrutura interna do tanque).',
      'Anti-simetria Dados/Objetos: Objetos escondem dados e expõem comportamentos; Estruturas de Dados expõem dados e não possuem comportamentos significativos.',
      'Lei de Demeter ("Fale com amigos, não com estranhos"): evite "acidentes de trem" (train wrecks) como ctxt.getOptions().getScratchDir().getAbsolutePath().',
      'Evite Híbridos: classes metade objeto e metade estrutura de dados (com funções de negócio misturadas a acessores públicos para tudo) reúnem o pior dos dois mundos.'
    ],
    sections: [
      {
        heading: 'A Dicotomia Fundamental: Objetos vs. Estruturas de Dados',
        body: 'Programadores maduros sabem que a ideia de que "tudo deve ser um objeto" é um mito. Cada abordagem facilita um tipo de mudança e dificulta o oposto:',
        bullets: [
          'Código Procedural (Estruturas de Dados): torna fácil adicionar novas funções sem alterar as estruturas existentes, mas torna difícil adicionar novas estruturas de dados porque todas as funções precisam mudar.',
          'Código Orientado a Objetos: torna fácil adicionar novas classes sem alterar as funções existentes, mas torna difícil adicionar novas funções porque todas as classes da hierarquia precisam implementá-las.'
        ],
        callout: {
          type: 'info',
          title: 'Quando usar qual?',
          text: 'Em sistemas onde novos tipos de dados surgem com frequência, prefira Objetos e Polimorfismo. Onde novas operações sobre os mesmos dados surgem o tempo todo, Estruturas de Dados (ou o padrão Visitor) funcionam melhor.'
        }
      },
      {
        heading: 'A Lei de Demeter e os Acidentes de Trem (Train Wrecks)',
        body: 'A Lei de Demeter afirma que um método f de uma classe C só deve invocar métodos de: (1) a própria C, (2) um objeto criado por f, (3) um objeto passado como argumento para f, ou (4) um objeto mantido em variável de instância de C. Encadeamentos como a.getB().getC().doSomething() acoplam o cliente à navegação interna de três classes diferentes [G36]. Em vez de perguntar pelos dados internos para agir, peça diretamente ao objeto principal que realize a tarefa: ctxt.createScratchFileStream(classFileName).'
      },
      {
        heading: 'DTOs e Active Records',
        body: 'Data Transfer Objects (DTOs) são estruturas legítimas com variáveis públicas (ou beans simples) usadas para comunicação com bancos de dados ou sockets. Active Records são DTOs com métodos de navegação como save() e find(). O erro comum é colocar regras de negócio dentro do Active Record; trate-o como estrutura de dados e mantenha a lógica de negócio em objetos de domínio separados.'
      }
    ],
    interactiveWidget: {
      type: 'antisymmetry-matrix',
      title: 'Matriz Interativa: Anti-Simetria Objeto vs. Estrutura de Dados',
      description: 'Simule a adição de uma nova forma geométrica (Triângulo) ou de uma nova operação (perímetro) para visualizar o impacto em código Procedural vs. Polimórfico.'
    }
  },
  {
    id: 'cap-7',
    number: 7,
    part: 'Design e Qualidade',
    partColor: 'teal',
    title: 'Tratamento de Erros',
    subtitle: 'Exceções unchecked, wrappers de terceiros, Special Case Pattern e proibição de null',
    readingTime: '9 min',
    smellRefs: ['G26', 'G30'],
    teacherIntro:
      'O tratamento de erros é uma das coisas que todo programa real precisa fazer. Porém, se o tratamento de erros obscurece a lógica principal do sistema, ele foi mal projetado.',
    keyTakeaways: [
      'Use Exceções em vez de Códigos de Retorno: separar o algoritmo principal do fluxo de erro deixa ambos independentes e legíveis.',
      'Escreva seu try-catch-finally primeiro: blocos try funcionam como transações. Comece definindo o escopo transacional com TDD.',
      'Prefira Exceções Unchecked: Checked Exceptions violam o Princípio Aberto-Fechado (OCP), pois uma alteração em uma função de baixo nível força mudanças na assinatura de todos os métodos até o topo.',
      'Não retorne null e não passe null: retornar null obriga cada chamador a espalhar if (x != null). Retorne uma lista vazia ou um Special Case Object.'
    ],
    sections: [
      {
        heading: 'Defina Classes de Exceção pelas Necessidades do Chamador',
        body: 'Ao chamar uma biblioteca externa como ACMEPort.open(), que lança três tipos diferentes de exceção de rede, não duplique blocos catch gigantes por todo o código. Crie um Wrapper (LocalPort) que captura as exceções de baixo nível e lança uma única exceção de domínio (PortDeviceFailure). Isso desacopla seu negócio do fornecedor.',
        callout: {
          type: 'tip',
          title: 'Vantagem Arquitetural do Wrapper',
          text: 'Empacotar APIs de terceiros facilita criar mocks nos testes e trocar de biblioteca no futuro alterando apenas uma classe.'
        }
      },
      {
        heading: 'Defina o Fluxo Normal (Special Case Pattern)',
        body: 'Muitas vezes usamos exceções para tratar regras de negócio especiais. No exemplo de despesas de alimentação, se o funcionário não apresentou nota fiscal, o método getMeals() lançava MealExpensesNotFound e o bloco catch somava a diária padrão (getMealPerDiem()). Aplicando o padrão Special Case (de Martin Fowler), o DAO retorna sempre um objeto MealExpenses; quando não há notas, ele retorna uma instância de PerDiemMealExpenses cujo método getTotal() já devolve o valor padrão sem nenhum try/catch.'
      },
      {
        heading: 'Por que Null é a Raiz de Muitos Bugs',
        body: 'Quando você retorna null, está criando trabalho extra para si mesmo e armadilhas de NullPointerException para seus colegas. Se um método retorna uma coleção, devolva Collections.emptyList(). E evite passar null como argumento: sem uma convenção rígida que proíba null por padrão, não há maneira limpa de lidar com argumentos nulos inesperados.'
      }
    ],
    interactiveWidget: {
      type: 'error-flow-comparator',
      title: 'Fluxo de Controle: Null / Return Codes vs. Special Case Pattern',
      description: 'Compare o número de ramificações ciclomáticas ao eliminar retornos nulos e exceções de fluxo de negócio.'
    }
  },
  {
    id: 'cap-8',
    number: 8,
    part: 'Design e Qualidade',
    partColor: 'teal',
    title: 'Fronteiras',
    subtitle: 'Encapsulando código de terceiros, testes de aprendizado e o padrão Adapter',
    readingTime: '8 min',
    smellRefs: ['G8', 'G36'],
    teacherIntro:
      'Raramente controlamos todo o software de um sistema. Compramos pacotes, usamos bibliotecas open-source ou dependemos de subsistemas de outras equipes. Precisamos manter as fronteiras (boundaries) desse código externo limpas e bem delimitadas.',
    keyTakeaways: [
      'Encapsule Interfaces Genéricas: provedores de bibliotecas buscam máxima flexibilidade (ex: java.util.Map), enquanto sua aplicação precisa de uma interface restrita ao domínio.',
      'Não passe objetos de fronteira (como Map) pelo sistema: esconda-os dentro de uma classe de domínio (como Sensors) que exponha apenas getById(id).',
      'Testes de Aprendizado (Learning Tests): em vez de testar uma biblioteca nova direto no código de produção, escreva testes unitários isolados para explorar e validar a API.',
      'Programe para a interface que você gostaria de ter: quando uma API externa ainda não existe, crie sua própria interface e conecte-a depois via Adapter.'
    ],
    sections: [
      {
        heading: 'A Tensão na Fronteira: Map vs. Sensors',
        body: 'A interface java.util.Map possui métodos como clear(), put() e remove(). Se você passa um Map<String, Sensor> por dezenas de classes, qualquer parte do sistema pode apagar sensores acidentalmente, além de acoplar o código ao tipo genérico. Ao encapsular o Map dentro da classe Sensors, as regras de negócio e conversões de tipo ficam protegidas em um só lugar.'
      },
      {
        heading: 'Testes de Aprendizado Custam Menos que Zero',
        body: 'Aprender uma API de terceiros (como o pacote Apache log4j no exemplo do livro) sempre exige tempo de experimentação. Escrever testes automatizados que verificam nossa compreensão dessa API não custa mais do que fazer experimentos manuais, e ainda entrega uma bateria de regressão gratuita: sempre que uma nova versão da biblioteca for lançada, basta rodar os Learning Tests para descobrir imediatamente se houve alguma mudança incompatível de comportamento.'
      },
      {
        heading: 'Código que Ainda Não Existe e o Padrão Adapter',
        body: 'No projeto de um sistema de rádio, a equipe do subsistema de transmissão ainda não havia definido a API de hardware. Em vez de ficar bloqueado, o time definiu a interface Transmitter com o método transmit(frequency, stream) exatamente nos termos do próprio domínio. Isso permitiu testar o CommunicationsController usando um FakeTransmitter. Quando a API real ficou pronta, bastou escrever um TransmitterAdapter para ligar os dois mundos.'
      }
    ],
    interactiveWidget: {
      type: 'boundary-adapter',
      title: 'Diagrama de Fronteira: Isolamento via Adapter e Fake',
      description: 'Visualize como proteger o núcleo de domínio contra mudanças em bibliotecas externas ou APIs ainda não construídas.'
    }
  },
  {
    id: 'cap-9',
    number: 9,
    part: 'Design e Qualidade',
    partColor: 'teal',
    title: 'Testes Unitários',
    subtitle: 'As 3 Leis do TDD, testes limpos, padrão Build-Operate-Check e regras F.I.R.S.T.',
    readingTime: '11 min',
    smellRefs: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9'],
    teacherIntro:
      'Testes sujos são equivalentes a, ou piores do que, não ter testes. Os testes também mudam conforme o código de produção evolui; quanto mais sujos forem os testes, mais difícil será mantê-los, até que a equipe acaba desativando a suíte e perde a rede de segurança.',
    keyTakeaways: [
      'São os testes unitários que mantêm seu código flexível, manutenível e reutilizável, pois permitem refatorar sem medo de introduzir bugs.',
      'O que torna um teste limpo? Três coisas: legibilidade, legibilidade e legibilidade (clareza, simplicidade e densidade de expressão).',
      'Use o padrão BUILD-OPERATE-CHECK (Construir dados, Operar sobre eles, Verificar o resultado) apoiado por funções utilitárias que formam uma DSL de teste.',
      'Teste um único conceito por função de teste e mantenha o número de asserts por conceito o menor possível.'
    ],
    sections: [
      {
        heading: 'As Três Leis do TDD',
        body: 'O Desenvolvimento Orientado a Testes mantém você em um ciclo de aproximadamente 30 segundos entre teste e produção:',
        bullets: [
          'Primeira Lei: você não pode escrever código de produção até que tenha escrito um teste unitário que falhe.',
          'Segunda Lei: você não pode escrever mais de um teste unitário do que o suficiente para falhar (e não compilar é falhar).',
          'Terceira Lei: você não pode escrever mais código de produção do que o suficiente para passar no teste que está falhando.'
        ]
      },
      {
        heading: 'Linguagem de Teste Específica de Domínio e Padrão Duplo',
        body: 'Em vez de expor dezenas de chamadas de API cruas dentro de cada teste (addPage, PageData, PathParser, StringBuffer), extraia funções auxiliares expressivas para que o teste leia quase como texto humano. Além disso, existe um Padrão Duplo (Dual Standard) válido para engenharia de performance: o código de teste roda em ambiente controlado e não precisa seguir as mesmas restrições rígidas de memória ou CPU do código embarcado de produção, desde que nunca comprometa a limpeza e a clareza (como representar o estado dos dispositivos de hardware com uma string compacta "HBchL" onde maiúscula significa ligado e minúscula significa desligado).'
      },
      {
        heading: 'As Cinco Regras F.I.R.S.T.',
        body: 'Testes limpos seguem cinco propriedades fundamentais:',
        bullets: [
          'Fast (Rápidos): testes devem rodar rápido. Se demorarem, você não os executará com frequência.',
          'Independent (Independentes): um teste não deve preparar o estado para o próximo. Você deve poder rodar qualquer teste isoladamente e em qualquer ordem.',
          'Repeatable (Repetíveis): devem funcionar no seu notebook, no servidor de CI e dentro de um avião sem rede ou banco de dados externo.',
          'Self-Validating (Auto-validáveis): devem ter uma saída booleana (passou ou falhou). Você não deve precisar ler um arquivo de log para saber se o teste passou.',
          'Timely (Oportunos): devem ser escritos imediatamente antes do código de produção que os faz passar. Se você deixar para depois, o código de produção será difícil de testar.'
        ]
      }
    ],
    interactiveWidget: {
      type: 'tdd-first-inspector',
      title: 'Laboratório TDD & Diagnóstico F.I.R.S.T.',
      description: 'Percorra o ciclo das 3 Leis do TDD e avalie cenários reais de suítes de teste contra cada critério F.I.R.S.T.'
    }
  }
];

