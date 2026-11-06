// Parte 4: Estudos de Caso e Catálogo de Odores e Heurísticas (Capítulos 14 a 17)
// Refinamento Sucessivo (Args), Internals do JUnit (ComparisonCompactor), SerialDate e Odores C1-T9.

export const part4Chapters = [
  {
    id: 'cap-14',
    number: 14,
    part: 'Estudos de Caso e Heurísticas',
    partColor: 'terracotta',
    title: 'Refinamento Sucessivo',
    subtitle: 'Estudo de caso do parser Args: de rascunho em crescimento para design limpo e extensível',
    readingTime: '12 min',
    smellRefs: ['G5', 'G23', 'G30', 'G34'],
    teacherIntro:
      'Para escrever código limpo, você primeiro escreve código sujo que funciona e depois o limpa. Programadores iniciantes param assim que o "primeiro rascunho" passa nos testes e seguem para a próxima tarefa; programadores profissionais sabem que parar no rascunho é suicídio profissional.',
    keyTakeaways: [
      'Quando o código começa a apodrecer, é muito mais barato limpar a bagunça hoje do que daqui a cinco minutos.',
      'Refatore em passos minúsculos guiados por TDD: nunca quebre o sistema por dias; mantenha todos os testes unitários e de aceitação passando após cada micro-alteração.',
      'O padrão na evolução do Args: substituir três mapas paralelos (booleanArgs, stringArgs, intArgs) por uma interface polimórfica ArgumentMarshaler e um único Map<Character, ArgumentMarshaler>.',
      'Isolamento de Erros: extrair toda a formatação e códigos de erro para ArgsException deixa o módulo principal Args focado apenas em analisar o esquema e os argumentos.'
    ],
    sections: [
      {
        heading: 'Como uma "Pilha Apodrecida" Começa',
        body: 'Na primeira versão do utilitário Args, que precisava suportar apenas argumentos booleanos (como -l), uma única classe simples era suficiente. Quando surgiu o segundo tipo (String, ex: -d /logs) e o terceiro (Integer, ex: -p 8080), o código continuou funcionando, mas começou a duplicar mapas, métodos de parse, métodos de get e tratamentos de exceção para cada tipo.'
      },
      {
        heading: 'A Estratégia do Incrementalismo com TDD',
        body: 'Ao perceber que adicionar mais dois tipos (double e String[]) tornaria a classe insustentável, Robert C. Martin parou de adicionar funcionalidades e iniciou o refinamento sucessivo:',
        bullets: [
          'Passo 1: Criar o esqueleto de ArgumentMarshaler e mover os booleanos para BooleanArgumentMarshaler sem quebrar nenhum teste.',
          'Passo 2: Migrar Strings e Integers para a mesma hierarquia e consolidar os três HashMaps em um único Map<Character, ArgumentMarshaler>.',
          'Passo 3: Substituir o índice numérico currentArgument compartilhado por um Iterator<String> passado diretamente para o método set(Iterator<String> currentArgument) de cada Marshaler.',
          'Passo 4: Separar completamente ArgsException em seu próprio arquivo, permitindo adicionar novos tipos de argumentos com mínimo toque no código existente (OCP).'
        ]
      }
    ],
    interactiveWidget: {
      type: 'args-evolution-timeline',
      title: 'Linha do Tempo do Refinamento Sucessivo (Args)',
      description: 'Navegue pelas 4 fases da evolução do módulo Args e veja como o TDD protege cada micro-passo.'
    }
  },
  {
    id: 'cap-15',
    number: 15,
    part: 'Estudos de Caso e Heurísticas',
    partColor: 'terracotta',
    title: 'Internals do JUnit',
    subtitle: 'Aplicando a Regra do Escoteiro no módulo ComparisonCompactor de Kent Beck e Erich Gamma',
    readingTime: '9 min',
    smellRefs: ['N6', 'N7', 'G9', 'G28', 'G29', 'G30', 'G31', 'G33'],
    teacherIntro:
      'Mesmo um módulo excelente, 100% coberto por testes e escrito por dois autores lendários (Kent Beck e Erich Gamma), pode ficar ainda mais claro quando aplicamos a Regra do Escoteiro.',
    keyTakeaways: [
      'Remova prefixos de escopo obsoletos [N6]: fContextLength e fExpected tornam-se contextLength e expected.',
      'Encapsule condicionais e evite duplas negativas [G28, G29]: transforme if (expected == null || actual == null || areStringsEqual()) em if (shouldBeCompacted()).',
      'Revele efeitos completos no nome [N7]: renomeie compact(message) para formatCompactedComparison(message), pois o método formata a mensagem final além de compactar as strings.',
      'Elimine acoplamento temporal oculto [G31] e aritmética de contorno confusa (+ 1) [G33]: unifique findCommonPrefixAndSuffix() e substitua suffixIndex (base 1) por suffixLength (base 0).'
    ],
    sections: [
      {
        heading: 'O que Faz o ComparisonCompactor?',
        body: 'Quando um teste falha comparando duas strings grandes como "abcde" e "abXde", o JUnit exibe "ab[c]de" vs "ab[X]de" para destacar exatamente a diferença. A classe original já era bem estruturada, mas continha pequenos tropeços de leitura.'
      },
      {
        heading: 'Decisões de Refatoração Passo a Passo (e Reversões Naturais)',
        body: 'Durante a refatoração, uma crítica vital emerge: refatorar é um processo iterativo de tentativa e erro onde frequentemente voltamos atrás em uma decisão anterior para chegar a um design superior:',
        bullets: [
          'Separação de Responsabilidades [G30]: o método original compact() compactava as strings E formatava a mensagem de assert do JUnit. Ao separar compactExpectedAndActual() de formatCompactedComparison(), a intenção ficou transparente.',
          'Tornando o Acoplamento Temporal Explícito [G31]: originalmente, findCommonSuffix() dependia silenciosamente de que findCommonPrefix() tivesse sido chamado antes (pois usava a variável fPrefix). Ao criar findCommonPrefixAndSuffix(), a ordem obrigatória fica garantida por construção.',
          'Corrigindo Condições de Contorno [G33, G9]: o índice fSuffix não era realmente um índice baseado em zero, mas um comprimento baseado em 1, o que obrigava o código a espalhar + 1 e - 1 em várias expressões e mantinha uma verificação condicional morta que nunca era verdadeira.'
        ]
      }
    ],
    interactiveWidget: {
      type: 'scout-rule-stepper',
      title: 'Passo a Passo: Regra do Escoteiro no ComparisonCompactor',
      description: 'Inspecione cada uma das 6 transformações aplicadas ao código original do JUnit e os odores eliminados.'
    }
  },
  {
    id: 'cap-16',
    number: 16,
    part: 'Estudos de Caso e Heurísticas',
    partColor: 'terracotta',
    title: 'Refatorando SerialDate',
    subtitle: 'Primeiro faça funcionar (cobertura e bugs de contorno), depois faça certo (abstração e enums)',
    readingTime: '11 min',
    smellRefs: ['C1', 'G7', 'G14', 'G15', 'G18', 'G19', 'G20', 'G25', 'J2', 'J3', 'N1', 'N2'],
    teacherIntro:
      'No Capítulo 16, Robert C. Martin analisa e refatora a classe SerialDate (da biblioteca JCommon de David Gilbert). É uma demonstração de revisão técnica profissional: crítica rigorosa ao código, respeito total ao autor e disciplina de testes.',
    keyTakeaways: [
      'Passo 1 ("Primeiro Faça Funcionar"): a suíte existente cobria apenas ~50% da classe. Ao escrever novos testes unitários (chegando a 92% de cobertura), vários bugs reais de condição de contorno foram descobertos e corrigidos.',
      'Escolha nomes no nível correto de abstração [N2]: SerialDate sugere implementação com número serial inteiro, mas a classe é abstrata. DayDate expressa melhor o conceito.',
      'Quebre ciclos entre Classe Base e Derivada [G7]: a classe abstrata SerialDate instanciava diretamente sua filha concreta SpreadsheetDate. Isso foi resolvido com uma Abstract Factory (DayDateFactory).',
      'Substitua interfaces de constantes e inteiros mágicos por Enums ricos [J2, J3, G25]: Month, Day, DateInterval, WeekInMonth e WeekdayRange.'
    ],
    sections: [
      {
        heading: '1. Primeiro Faça Funcionar: Encontrando Bugs nas Fronteiras [G3, T5]',
        body: 'Ao escrever testes unitários sistemáticos para cada método, Martin descobriu que stringToMonthCode retornava códigos errados para abreviações ambíguas, e que getFollowingDayOfWeek(SATURDAY) chamado em um sábado retornava o próprio sábado em vez do sábado seguinte (um erro clássico de < vs <= em condição de contorno).'
      },
      {
        heading: '2. Depois Faça Certo: Limpeza Arquitetural e Semântica',
        body: 'Com a rede de testes protegendo o comportamento, a refatoração limpou dezenas de odores estruturais:',
        bullets: [
          'Fim das Interfaces de Constantes [J2, J3]: herdar de MonthConstants para usar JANUARY = 1 permitia passar qualquer int inválido. O enum Month passou a conter quarter(), toInt(), fromInt() e parse() [G14 Feature Envy resolvido].',
          'Imutabilidade Explícita e Métodos de Instância [G18, G20]: o método estático SerialDate.addDays(int, SerialDate) parecia mutar a data e não tinha razão para ser estático. Ele virou um método de instância date.plusDays(int).',
          'Variáveis Explicativas [G19]: cálculos complexos de calendário (como leapYearCount e ordinalDay) ganharam variáveis temporárias com nomes autoexplicativos em vez de expressões matemáticas densas em uma linha só.'
        ]
      }
    ],
    interactiveWidget: {
      type: 'serialdate-transformation',
      title: 'Painel de Refatoração: De SerialDate para DayDate',
      description: 'Compare as decisões de design antes e depois nas 6 dimensões críticas do estudo de caso.'
    }
  },
  {
    id: 'cap-17',
    number: 17,
    part: 'Estudos de Caso e Heurísticas',
    partColor: 'terracotta',
    title: 'Odores e Heurísticas',
    subtitle: 'O catálogo completo de 66 regras práticas (C1–C5, E1–E2, F1–F4, G1–G36, J1–J3, N1–N7, T1–T9)',
    readingTime: '15 min',
    smellRefs: [
      'C1', 'C5', 'E1', 'E2', 'F1', 'F3', 'G5', 'G6', 'G7', 'G14',
      'G19', 'G23', 'G25', 'G28', 'G30', 'G31', 'G33', 'G34', 'G36',
      'J2', 'J3', 'N1', 'N2', 'N6', 'N7', 'T1', 'T5', 'T9'
    ],
    teacherIntro:
      'Partindo da ideia de "Code Smells" de Martin Fowler em Refactoring, este capítulo final consolida todas as regras, armadilhas e heurísticas usadas ao longo do livro em um índice de consulta rápida para revisões de código (Code Reviews).',
    keyTakeaways: [
      'Comentários (C1 a C5): elimine metadados de versão, comentários obsoletos, redundantes, mal escritos e código comentado.',
      'Ambiente (E1 a E2) e Funções (F1 a F4): build e testes devem rodar com um único comando; funções devem evitar excesso de parâmetros, parâmetros de saída, flags booleanas e código morto.',
      'Geral (G1 a G36): de DRY [G5], polimorfismo [G23] e encapsulamento de condicionais [G28] até acoplamento temporal [G31], condições de contorno [G33] e Lei de Demeter [G36].',
      'Java/Tipagem (J1 a J3), Nomes (N1 a N7) e Testes (T1 a T9): prefira enums a constantes soltas, escolha nomes proporcionais ao escopo e ao nível de abstração, e garanta testes rápidos que validem fronteiras.'
    ],
    sections: [
      {
        heading: 'Como Usar Este Catálogo no Dia a Dia',
        body: 'Durante um Pull Request ou ao refatorar um módulo legado, use os códigos (ex: [F3] Argumento Flag, [G14] Feature Envy, [G31] Acoplamento Temporal) como vocabulário compartilhado da equipe. Isso transforma opiniões subjetivas ("não gostei desse método") em diagnósticos objetivos ("este método mistura dois níveis de abstração [G34] e recebe uma flag booleana [F3]").'
      },
      {
        heading: 'A Essência do Profissionalismo (Conclusão)',
        body: 'Regras e heurísticas não substituem o cuidado humano, mas dão forma concreta ao sistema de valores de um artesão de software. A limpeza não é uma fase separada no fim do projeto; é a maneira como escrevemos e revisamos cada linha.'
      }
    ],
    interactiveWidget: {
      type: 'smells-explorer-embed',
      title: 'Catálogo Interativo Completo (66 Odores e Heurísticas: C1 a T9)',
      description: 'Filtre por categoria, pesquise por código ou palavra-chave e navegue diretamente para o capítulo relacionado.'
    }
  }
];

export const smellsCatalog = [
  // Comentários (C1-C5)
  { code: 'C1', category: 'Comentários', title: 'Informação Inapropriada', chapter: 'cap-4', summary: 'Metadados como histórico de alterações, autor e número de ticket devem ficar no Git e no Issue Tracker, nunca em comentários no código.' },
  { code: 'C2', category: 'Comentários', title: 'Comentário Obsoleto', chapter: 'cap-4', summary: 'Comentários envelhecem rápido e ficam incorretos quando o código muda. Atualize ou apague imediatamente.' },
  { code: 'C3', category: 'Comentários', title: 'Comentário Redundante', chapter: 'cap-4', summary: 'Se o comentário descreve algo que o próprio código já diz claramente (ex: i++; // incrementa i), ele é ruído visual.' },
  { code: 'C4', category: 'Comentários', title: 'Comentário Mal Escrito', chapter: 'cap-4', summary: 'Se um comentário realmente merece ser escrito, escolha as palavras com cuidado, seja conciso e use gramática correta.' },
  { code: 'C5', category: 'Comentários', title: 'Código Comentado', chapter: 'cap-4', summary: 'Trechos de código comentados apodrecem e confundem quem lê. Delete sem medo: o controle de versão guarda tudo.' },

  // Ambiente (E1-E2)
  { code: 'E1', category: 'Ambiente', title: 'Build Requer Mais de Um Passo', chapter: 'cap-17', summary: 'Você deve conseguir fazer checkout do sistema com um comando e construir tudo com outro comando único.' },
  { code: 'E2', category: 'Ambiente', title: 'Testes Requerem Mais de Um Passo', chapter: 'cap-9', summary: 'Rodar todos os testes unitários deve exigir apenas um clique na IDE ou um único comando no terminal.' },

  // Funções (F1-F4)
  { code: 'F1', category: 'Funções', title: 'Argumentos Demais', chapter: 'cap-3', summary: 'Funções devem ter zero, um ou dois argumentos. Três ou mais devem ser evitados ou agrupados em um objeto de conceito.' },
  { code: 'F2', category: 'Funções', title: 'Argumentos de Saída', chapter: 'cap-3', summary: 'Argumentos são naturalmente lidos como entradas. Se uma função precisa mudar estado, mude o estado do objeto ao qual pertence.' },
  { code: 'F3', category: 'Funções', title: 'Argumentos Flag (Booleanos)', chapter: 'cap-3', summary: 'Um parâmetro booleano declara que a função faz duas coisas diferentes. Divida-a em duas funções com nomes explícitos.' },
  { code: 'F4', category: 'Funções', title: 'Função Morta', chapter: 'cap-3', summary: 'Métodos que nunca são chamados devem ser descartados imediatamente para não poluir a base de código.' },

  // Geral (G1-G36)
  { code: 'G1', category: 'Geral', title: 'Múltiplas Linguagens em um Arquivo', chapter: 'cap-17', summary: 'Minimize a mistura de Java/JS, HTML, XML, SQL e CSS dentro de um mesmo arquivo fonte.' },
  { code: 'G2', category: 'Geral', title: 'Comportamento Óbvio Não Implementado', chapter: 'cap-16', summary: 'Siga o Princípio da Menor Surpresa: qualquer função ou classe deve implementar os comportamentos que outro dev razoavelmente espera.' },
  { code: 'G3', category: 'Geral', title: 'Comportamento Incorreto nas Fronteiras', chapter: 'cap-16', summary: 'Não confie na intuição para cantos e limites (zero, null, vazio, bissexto, máximo). Escreva testes para cada condição de contorno.' },
  { code: 'G4', category: 'Geral', title: 'Mecanismos de Segurança Ignorados', chapter: 'cap-9', summary: 'Desligar avisos do compilador ou ignorar testes falhando é abrir mão da segurança e convidar falhas em produção.' },
  { code: 'G5', category: 'Geral', title: 'Duplicação (DRY)', chapter: 'cap-12', summary: 'Regra fundamental: extraia linhas repetidas em métodos, substitua switch/if repetidos por polimorfismo e algoritmos similares por Template Method.' },
  { code: 'G6', category: 'Geral', title: 'Código no Nível Errado de Abstração', chapter: 'cap-6', summary: 'Conceitos gerais ficam nas classes/interfaces base; detalhes específicos de implementação pertencem às derivadas.' },
  { code: 'G7', category: 'Geral', title: 'Classes Base Dependendo de Derivadas', chapter: 'cap-16', summary: 'Classes pai nunca devem importar ou conhecer suas classes filhas. Use polimorfismo e Abstract Factory.' },
  { code: 'G8', category: 'Geral', title: 'Excesso de Informação', chapter: 'cap-6', summary: 'Interfaces bem definidas são estreitas e fazem muito com poucos métodos expostos. Esconda dados, utilitários e constantes internas.' },
  { code: 'G9', category: 'Geral', title: 'Código Morto', chapter: 'cap-15', summary: 'Condições if que nunca ocorrem, blocos catch de exceções nunca lançadas e variáveis sem leitura devem ser removidos.' },
  { code: 'G10', category: 'Geral', title: 'Separação Vertical', chapter: 'cap-5', summary: 'Variáveis e funções privadas devem ser definidas perto de onde são utilizadas.' },
  { code: 'G11', category: 'Geral', title: 'Inconsistência', chapter: 'cap-2', summary: 'Se você faz algo de um jeito (ex: processVerificationRequest), faça coisas similares usando a mesma convenção em todo o projeto.' },
  { code: 'G12', category: 'Geral', title: 'Entulho (Clutter)', chapter: 'cap-4', summary: 'Construtores padrão sem implementação, variáveis não usadas e comentários sem valor são entulho que deve ser limpo.' },
  { code: 'G13', category: 'Geral', title: 'Acoplamento Artificial', chapter: 'cap-11', summary: 'Módulos que não dependem um do outro não devem ser amarrados por enums, constantes ou funções posicionadas no lugar errado.' },
  { code: 'G14', category: 'Geral', title: 'Inveja de Recursos (Feature Envy)', chapter: 'cap-16', summary: 'Os métodos de uma classe devem se interessar pelas variáveis da própria classe, e não manipular obsessivamente os dados internos de outro objeto.' },
  { code: 'G15', category: 'Geral', title: 'Argumentos Seletores', chapter: 'cap-3', summary: 'Evite passar booleanos, inteiros ou enums apenas para selecionar qual comportamento uma função vai executar; prefira funções separadas ou polimorfismo.' },
  { code: 'G16', category: 'Geral', title: 'Intenção Obscurecida', chapter: 'cap-2', summary: 'Expressões compactas ao extremo, notação húngara e números mágicos escondem a intenção do autor.' },
  { code: 'G17', category: 'Geral', title: 'Responsabilidade Deslocada', chapter: 'cap-10', summary: 'Coloque cada constante e função onde o leitor naturalmente esperaria encontrá-la (Princípio da Menor Surpresa).' },
  { code: 'G18', category: 'Geral', title: 'Static Inapropriado', chapter: 'cap-16', summary: 'Prefira métodos não-estáticos. Só use static quando tiver certeza absoluta de que o método nunca precisará de comportamento polimórfico nem opera em estado de instância.' },
  { code: 'G19', category: 'Geral', title: 'Use Variáveis Explicativas', chapter: 'cap-16', summary: 'Quebre cálculos complexos ou expressões longas em variáveis intermediárias com nomes descritivos que documentem cada etapa.' },
  { code: 'G20', category: 'Geral', title: 'Nomes de Funções Devem Dizer o que Fazem', chapter: 'cap-16', summary: 'Se você precisa abrir a implementação para saber se date.add(5) soma 5 dias ou 5 horas e se altera o objeto, o nome falhou (use date.plusDays(5)).' },
  { code: 'G21', category: 'Geral', title: 'Entenda o Algoritmo', chapter: 'cap-15', summary: 'Não pare quando o código "passar nos testes" por tentativa e erro. Certifique-se de compreender exatamente como e por que o algoritmo funciona.' },
  { code: 'G22', category: 'Geral', title: 'Torne Dependências Lógicas em Físicas', chapter: 'cap-10', summary: 'Se um módulo depende de uma informação de outro (como tamanho de página), ele deve pedir explicitamente via método, nunca fazer suposições silenciosas.' },
  { code: 'G23', category: 'Geral', title: 'Prefira Polimorfismo a If/Else ou Switch/Case', chapter: 'cap-3', summary: 'Regra "UM SWITCH": pode haver no máximo um switch para um determinado tipo de seleção, usado apenas para criar objetos polimórficos.' },
  { code: 'G24', category: 'Geral', title: 'Siga Convenções Padrão', chapter: 'cap-5', summary: 'Toda equipe deve seguir um padrão de codificação consistente de nomes, chaves, tamanho de linha e organização.' },
  { code: 'G25', category: 'Geral', title: 'Substitua Números Mágicos por Constantes Nomeadas', chapter: 'cap-2', summary: 'Números como 86400 ou 55.0 soltos no código devem ser substituídos por SECONDS_PER_DAY ou Enums expressivos.' },
  { code: 'G26', category: 'Geral', title: 'Seja Preciso', chapter: 'cap-7', summary: 'Não use float para representar dinheiro, não ignore bloqueios concorrentes e não deixe ambiguidades sobre se um retorno pode ser null.' },
  { code: 'G27', category: 'Geral', title: 'Estrutura sobre Convenção', chapter: 'cap-6', summary: 'Imponha decisões de design através da estrutura de tipos (classes abstratas e métodos obrigatórios) em vez de depender apenas de convenções verbais.' },
  { code: 'G28', category: 'Geral', title: 'Encapsule Condicionais', chapter: 'cap-15', summary: 'Extraia expressões booleanas combinadas para funções que expliquem a intenção: if (shouldBeDeleted(timer)) é muito mais claro que uma expressão longa.' },
  { code: 'G29', category: 'Geral', title: 'Evite Condicionais Negativas', chapter: 'cap-15', summary: 'Condicionais positivas são mais fáceis de processar mentalmente: prefira if (buffer.shouldCompact()) a if (!buffer.shouldNotCompact()).' },
  { code: 'G30', category: 'Geral', title: 'Funções Devem Fazer Uma Coisa', chapter: 'cap-3', summary: 'Se uma função possui várias seções que realizam tarefas distintas em sequência, divida-a em funções menores especializadas.' },
  { code: 'G31', category: 'Geral', title: 'Acoplamentos Temporais Ocultos', chapter: 'cap-15', summary: 'Quando a função B precisa obrigatoriamente rodar após A, torne isso explícito fazendo A retornar o argumento que B exige (bucket brigade).' },
  { code: 'G32', category: 'Geral', title: 'Não Seja Arbitrário', chapter: 'cap-10', summary: 'A estrutura do código deve refletir motivos reais de arquitetura e escopo, nunca caprichos pessoais.' },
  { code: 'G33', category: 'Geral', title: 'Encapsule Condições de Contorno', chapter: 'cap-15', summary: 'Não espalhe + 1 e - 1 pelo código; guarde o deslocamento em uma variável dedicada como int nextLevel = level + 1.' },
  { code: 'G34', category: 'Geral', title: 'Funções Devem Descer Apenas Um Nível de Abstração', chapter: 'cap-3', summary: 'Todas as instruções dentro de uma função devem estar exatamente um nível de abstração abaixo do nome da própria função.' },
  { code: 'G35', category: 'Geral', title: 'Mantenha Dados Configuráveis em Níveis Altos', chapter: 'cap-11', summary: 'Constantes de configuração e parâmetros de execução devem ficar no topo do sistema e ser passados para baixo, nunca enterrados em funções de baixo nível.' },
  { code: 'G36', category: 'Geral', title: 'Evite Navegação Transitiva (Lei de Demeter)', chapter: 'cap-6', summary: 'Escreva código "tímido" (Shy Code): um módulo deve conhecer apenas seus colaboradores imediatos, evitando cadeias a.getB().getC().' },

  // Java / Tipagem (J1-J3)
  { code: 'J1', category: 'Java', title: 'Evite Listas Longas de Import', chapter: 'cap-17', summary: 'Quando usar várias classes de um mesmo pacote, simplifique o cabeçalho para não poluir o topo do arquivo.' },
  { code: 'J2', category: 'Java', title: 'Não Herde Constantes', chapter: 'cap-16', summary: 'Nunca implemente uma interface apenas para ganhar acesso direto às constantes dela; isso polui a hierarquia de tipos. Use enums ou import estático.' },
  { code: 'J3', category: 'Java', title: 'Constantes vs. Enums', chapter: 'cap-16', summary: 'Em vez de public static final int, use enums que oferecem segurança de tipos em tempo de compilação e podem conter métodos e atributos.' },

  // Nomes (N1-N7)
  { code: 'N1', category: 'Nomes', title: 'Escolha Nomes Descritivos', chapter: 'cap-2', summary: 'Não escolha nomes às pressas. Revise os identificadores periodicamente para garantir que continuam expressando o papel exato.' },
  { code: 'N2', category: 'Nomes', title: 'Nomes no Nível Apropriado de Abstração', chapter: 'cap-2', summary: 'Escolha nomes que reflitam a abstração da interface (ex: connect(connectionLocator)) e não detalhes da implementação atual (ex: dial(phoneNumber)).' },
  { code: 'N3', category: 'Nomes', title: 'Use Nomenclatura Padrão Onde Possível', chapter: 'cap-12', summary: 'Use nomes consagrados de padrões (Factory, Adapter, Visitor) e a linguagem ubíqua do domínio de negócio.' },
  { code: 'N4', category: 'Nomes', title: 'Nomes Não-Ambíguos', chapter: 'cap-2', summary: 'Escolha nomes que deixem inequívoco o funcionamento e o propósito da função ou variável.' },
  { code: 'N5', category: 'Nomes', title: 'Nomes Longos para Escopos Longos', chapter: 'cap-2', summary: 'Variáveis de 1 ou 2 letras perdem seu significado se o escopo passar de 5 linhas. Quanto maior o escopo, mais descritivo deve ser o nome.' },
  { code: 'N6', category: 'Nomes', title: 'Evite Codificações', chapter: 'cap-2', summary: 'Não codifique informações de tipo (Notação Húngara) ou escopo (m_, f) dentro dos nomes.' },
  { code: 'N7', category: 'Nomes', title: 'Nomes Devem Descrever Efeitos Colaterais', chapter: 'cap-3', summary: 'Se um método cria um recurso caso ele não exista, chame-o de createOrReturnOos() e não apenas de getOos().' },

  // Testes (T1-T9)
  { code: 'T1', category: 'Testes', title: 'Testes Insuficientes', chapter: 'cap-9', summary: 'Uma suíte de testes deve testar tudo o que poderia razoavelmente quebrar. Enquanto houver condições inexploradas, os testes são insuficientes.' },
  { code: 'T2', category: 'Testes', title: 'Use uma Ferramenta de Cobertura', chapter: 'cap-16', summary: 'Ferramentas de cobertura revelam visualmente lacunas na estratégia de testes e blocos if/catch nunca exercitados.' },
  { code: 'T3', category: 'Testes', title: 'Não Pule Testes Triviais', chapter: 'cap-9', summary: 'Eles são fáceis de escrever e seu valor documental é maior do que o custo de criá-los.' },
  { code: 'T4', category: 'Testes', title: 'Um Teste Ignorado é uma Pergunta sobre Ambiguidade', chapter: 'cap-9', summary: 'Usar @Ignore (ou test.skip) expressa explicitamente que um requisito está em aberto sem perder o caso de teste.' },
  { code: 'T5', category: 'Testes', title: 'Teste Condições de Contorno', chapter: 'cap-16', summary: 'Erros de índice (+1/-1) e limites de intervalo são os mais comuns; teste sempre as bordas.' },
  { code: 'T6', category: 'Testes', title: 'Teste Exaustivamente Perto de Bugs', chapter: 'cap-16', summary: 'Bugs tendem a se agrupar na mesma função ou módulo. Quando encontrar um bug em uma função, teste todos os cantos dela.' },
  { code: 'T7', category: 'Testes', title: 'Padrões de Falha são Reveladores', chapter: 'cap-9', summary: 'Casos de teste bem ordenados e abrangentes permitem diagnosticar a causa raiz apenas observando quais testes falharam e quais passaram.' },
  { code: 'T8', category: 'Testes', title: 'Padrões de Cobertura são Reveladores', chapter: 'cap-16', summary: 'Olhar quais linhas são ou não executadas durante um teste falhando frequentemente aponta direto para o bug.' },
  { code: 'T9', category: 'Testes', title: 'Testes Devem Ser Rápidos', chapter: 'cap-9', summary: 'Um teste lento é um teste que deixará de ser executado quando o prazo apertar. Faça de tudo para manter a suíte veloz.' }
];

