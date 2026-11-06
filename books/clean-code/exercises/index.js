// Exercícios Interativos por Capítulo (Diagnóstico Conceitual + Desafio de Refatoração)
// Inspirado na prática ativa do W3Schools aplicada a cada capítulo de Clean Code.

export const cleanCodeExercises = {
  'cap-1': [
    {
      id: 'q-1-1',
      type: 'quiz',
      question: 'De acordo com o Capítulo 1, qual é a proporção aproximada de tempo gasta lendo código existente versus escrevendo código novo, e qual é a implicação direta disso?',
      options: [
        'Proporção superior a 10:1; portanto, tornar o código fácil de ler é a única forma real de escrever rápido.',
        'Proporção de 1:1; ler e digitar código consomem exatamente o mesmo tempo na rotina diária.',
        'Proporção de 1:5; passamos 80% do tempo digitando novas linhas e 20% lendo.',
        'A leitura só ocorre durante fases formais de auditoria antes do lançamento.'
      ],
      correctIndex: 0,
      explanation: 'Passamos mais de 10 vezes mais tempo lendo código ao redor do ponto que vamos editar do que digitando linhas novas. Facilitar a leitura acelera diretamente a escrita.'
    },
    {
      id: 'q-1-2',
      type: 'refactor-choice',
      question: 'Um gerente pede para pular a refatoração hoje e "limpar o módulo no próximo trimestre". Qual princípio do Capítulo 1 explica o risco dessa decisão?',
      codeSnippet: `// TODO: código feito às pressas para a demo de sexta-feira.
// Limpar depois que o projeto estabilizar.`,
      options: [
        'Lei de LeBlanc ("Depois é igual a nunca") combinada com a queda assintótica de produtividade causada pelo wading.',
        'A Regra de Demeter para encapsulamento de objetos.',
        'O Princípio da Inversão de Dependência (DIP).',
        'O padrão Special Case de Martin Fowler.'
      ],
      correctIndex: 0,
      explanation: 'A Lei de LeBlanc mostra que "depois" raramente chega, e o acúmulo de bagunça reduz a velocidade da equipe até paralisar novas entregas.'
    }
  ],
  'cap-2': [
    {
      id: 'q-2-1',
      type: 'quiz',
      question: 'Qual é o problema principal de ter métodos chamados getActiveAccount(), getActiveAccounts() e getActiveAccountInfo() na mesma base de código?',
      options: [
        'Falta de distinção significativa: palavras de ruído como Info não dizem ao programador qual método chamar.',
        'Nomes de métodos deveriam ser substantivos e não começar com verbos.',
        'Os nomes não utilizam Notação Húngara para indicar o tipo de retorno.',
        'Os métodos deveriam ter nomes de 1 letra para economizar espaço.'
      ],
      correctIndex: 0,
      explanation: 'Palavras como Info, Data e Object são ruído indistinto. Sem abrir a implementação ou documentação, outro desenvolvedor não consegue distinguir a diferença entre eles.'
    },
    {
      id: 'q-2-2',
      type: 'refactor-choice',
      question: 'Qual refatoração corrige os odores de nomenclatura [N1, N6] na declaração abaixo?',
      codeSnippet: `public interface IShapeFactory {
  int m_maxShapes = 100;
  Shape make(int d); // d = código da dimensão
}`,
      options: [
        'Renomear a interface para ShapeFactory (sem prefixo I), remover m_ e chamar o parâmetro de dimensionCode.',
        'Renomear a interface para CShapeFactory e manter int d com comentário.',
        'Adicionar prefixo str_ e int_ em todos os parâmetros (Notação Húngara).',
        'Renomear o método make para ShapeBuilderManagerInfo.'
      ],
      correctIndex: 0,
      explanation: 'O Capítulo 2 recomenda evitar o prefixo I em interfaces (para não expor detalhes ao cliente), eliminar prefixos de membro m_ e usar nomes que revelem a intenção sem depender de comentários.'
    }
  ],
  'cap-3': [
    {
      id: 'q-3-1',
      type: 'quiz',
      question: 'Por que argumentos booleanos (Flag Arguments), como em render(boolean isSuite), são considerados uma má prática no Capítulo 3 [F3]?',
      options: [
        'Porque declaram abertamente que a função faz mais de uma coisa (uma se true, outra se false) e dificultam a leitura no ponto de chamada.',
        'Porque tipos booleanos consomem mais memória na pilha da JVM.',
        'Porque funções nunca devem receber menos de três parâmetros.',
        'Porque o compilador não permite testar métodos com parâmetros booleanos.'
      ],
      correctIndex: 0,
      explanation: 'Quem lê render(true) não sabe o que true significa sem inspecionar a assinatura, e a função inevitavelmente faz duas coisas. O correto é dividir em renderForSuite() e renderForSingleTest().'
    },
    {
      id: 'q-3-2',
      type: 'refactor-choice',
      question: 'Analise o método checkPassword abaixo. Qual princípio fundamental do Capítulo 3 ele viola?',
      codeSnippet: `public boolean checkPassword(String userName, String password) {
  User user = UserGateway.findByName(userName);
  if (user != User.NULL && user.hasMatchingPassword(password)) {
    Session.initialize();
    return true;
  }
  return false;
}`,
      options: [
        'Gera um efeito colateral oculto e acoplamento temporal ao chamar Session.initialize() dentro de uma verificação de senha.',
        'Usa o padrão Special Case (User.NULL) em vez de retornar null.',
        'Possui poucos argumentos (apenas dois).',
        'Não utiliza um switch/case para validar a senha.'
      ],
      correctIndex: 0,
      explanation: 'O nome checkPassword diz que a função apenas verifica a senha. Inicializar a sessão apaga dados de uma sessão existente, criando um efeito colateral oculto (se realmente necessário, deveria se chamar checkPasswordAndInitializeSession).'
    }
  ],
  'cap-4': [
    {
      id: 'q-4-1',
      type: 'quiz',
      question: 'Em qual das situações abaixo um comentário é considerado BOM e justificado segundo o Capítulo 4?',
      options: [
        'Alertar sobre uma consequência não óbvia, como avisar que uma instância de SimpleDateFormat não é thread-safe.',
        'Manter um bloco de código antigo comentado caso seja necessário reativá-lo na próxima semana.',
        'Adicionar um cabeçalho de histórico de commits e nome do autor no início de cada classe.',
        'Escrever um Javadoc obrigatório em cada getter e setter repetindo o nome do atributo.'
      ],
      correctIndex: 0,
      explanation: 'Alertas de consequência evitam bugs graves de concorrência ou performance. Já código comentado [C5], histórico manual [C1] e comentários redundantes [C3] devem ser eliminados.'
    },
    {
      id: 'q-4-2',
      type: 'refactor-choice',
      question: 'Qual é a ação correta ao encontrar este trecho durante uma revisão de código?',
      codeSnippet: `// Verifica se o pedido expirou (mais de 24h sem pagamento)
if (order.getStatus() == 0 && (now - order.getCreatedAt()) > 86400000L) {
  cancelOrder(order);
}`,
      options: [
        'Apagar o comentário e encapsular a condição no método order.isExpired(now) usando constantes nomeadas.',
        'Manter o código idêntico e traduzir o comentário para inglês.',
        'Adicionar um comentário de fechamento } // end if para melhorar a leitura.',
        'Transformar o comentário em um bloco Javadoc de 5 linhas.'
      ],
      correctIndex: 0,
      explanation: 'Em vez de explicar uma expressão obscura com um comentário, extraia a expressão para um método cujo nome diga exatamente o que o comentário dizia [G28].'
    }
  ],
  'cap-5': [
    {
      id: 'q-5-1',
      type: 'quiz',
      question: 'Na "Metáfora do Jornal" e nas regras de distância vertical do Capítulo 5, onde devem ficar os métodos privados chamados por um método público?',
      options: [
        'Logo abaixo do método público que os chama, formando uma leitura fluida de cima para baixo.',
        'Em ordem estritamente alfabética no final do arquivo.',
        'No topo da classe, antes do construtor e das variáveis de instância.',
        'Sempre em outro pacote utilitário separado, mesmo que tenham 3 linhas.'
      ],
      correctIndex: 0,
      explanation: 'Posicionar a função chamada imediatamente abaixo da função chamadora mantém os conceitos dependentes verticalmente próximos [G10] e preserva a leitura narrativa.'
    },
    {
      id: 'q-5-2',
      type: 'refactor-choice',
      question: 'Por que Robert C. Martin desencoraja o alinhamento horizontal em colunas como no exemplo abaixo?',
      codeSnippet: `private   Socket          socket;
private   InputStream     input;
protected OutputStream    output;
private   Request         request;`,
      options: [
        'Porque atrai o olho para a lista de nomes ignorando os tipos, dificulta refatorações automáticas e mascara classes com atributos demais.',
        'Porque o compilador Java rejeita mais de um espaço entre o tipo e o identificador.',
        'Porque variáveis de instância deveriam ser declaradas no rodapé da classe.',
        'Porque todas as variáveis deveriam ficar na mesma linha separadas por vírgula.'
      ],
      correctIndex: 0,
      explanation: 'O alinhamento tabular enfatiza a coluna errada. Se o alinhamento parece necessário para organizar a lista, o verdadeiro problema é o tamanho excessivo da classe.'
    }
  ],
  'cap-6': [
    {
      id: 'q-6-1',
      type: 'quiz',
      question: 'Considerando a anti-simetria entre Objetos e Estruturas de Dados (Capítulo 6), quando uma abordagem orientada a objetos polimórfica é mais vantajosa do que estruturas de dados procedurais?',
      options: [
        'Quando é mais provável adicionarmos novos tipos de dados (novas classes) do que novas funções sobre os tipos existentes.',
        'Quando os tipos de dados são fixos e precisamos adicionar dezenas de novas funções toda semana sem tocar nas classes.',
        'Quando queremos expor todos os campos internos via getters e setters públicos em todas as classes.',
        'Quando queremos encadear chamadas getA().getB().getC() livremente.'
      ],
      correctIndex: 0,
      explanation: 'Objetos polimórficos facilitam adicionar novas classes sem modificar funções existentes. Já estruturas de dados procedurais facilitam adicionar novas funções sem modificar as estruturas de dados.'
    },
    {
      id: 'q-6-2',
      type: 'refactor-choice',
      question: 'Qual princípio é violado pelo encadeamento abaixo e como corrigi-lo?',
      codeSnippet: `final String zipCode = order.getCustomer().getAddress().getPostalCode().getDigits();`,
      options: [
        'Viola a Lei de Demeter [G36] (Train Wreck); em vez de navegar pela estrutura interna de quatro objetos, peça ao objeto de domínio a operação necessária.',
        'Viola a Primeira Lei do TDD; deveria usar variáveis públicas sem métodos.',
        'Viola a regra de formatação horizontal por ter menos de 120 caracteres.',
        'Viola a regra de exceções checked.'
      ],
      correctIndex: 0,
      explanation: 'A navegação transitiva acopla o chamador a toda a cadeia Customer -> Address -> PostalCode. Diga ao objeto o que fazer em vez de perguntar por sua estrutura interna.'
    }
  ],
  'cap-7': [
    {
      id: 'q-7-1',
      type: 'quiz',
      question: 'Por que o Capítulo 7 recomenda usar Exceções Unchecked em vez de Checked Exceptions em grandes sistemas?',
      options: [
        'Porque Checked Exceptions violam o Princípio Aberto-Fechado (OCP) e quebram o encapsulamento, forçando mudanças nas assinaturas de toda a cadeia de chamadas.',
        'Porque Checked Exceptions não podem ser capturadas com blocos catch.',
        'Porque Exceções Unchecked ignoram automaticamente erros de banco de dados.',
        'Porque linguagens modernas proíbem o uso de blocos try-finally.'
      ],
      correctIndex: 0,
      explanation: 'Se um método de nível baixo passa a lançar uma nova Checked Exception, todos os métodos intermediários até a camada de apresentação precisam declarar throws ou capturar algo que não sabem tratar.'
    },
    {
      id: 'q-7-2',
      type: 'refactor-choice',
      question: 'Qual é a forma limpa de substituir o retorno null no método de busca abaixo?',
      codeSnippet: `public List<Employee> getEmployeesByDepartment(String deptId) {
  if (!departmentExists(deptId)) {
    return null;
  }
  return repository.findByDepartment(deptId);
}`,
      options: [
        'Retornar Collections.emptyList(), eliminando a necessidade de verificações if (employees != null) em todos os chamadores.',
        'Retornar uma lista contendo um elemento null dentro dela.',
        'Retornar um código inteiro -1 junto com a lista.',
        'Manter o retorno null e documentar em um comentário que o chamador deve ter cuidado.'
      ],
      correctIndex: 0,
      explanation: 'Retornar uma coleção vazia permite que o chamador itere diretamente com for (Employee e : employees) sem risco de NullPointerException e sem poluir o fluxo.'
    }
  ],
  'cap-8': [
    {
      id: 'q-8-1',
      type: 'quiz',
      question: 'Qual é o benefício principal dos "Testes de Aprendizado" (Learning Tests) descritos no Capítulo 8 ao integrar uma biblioteca de terceiros?',
      options: [
        'Permitem aprender a API isoladamente e funcionam como testes automatizados gratuitos que detectam quebras de compatibilidade quando a biblioteca é atualizada.',
        'Substituem a necessidade de escrever testes unitários para as regras de negócio da nossa própria aplicação.',
        'Aumentam a velocidade de compilação do código da biblioteca de terceiros.',
        'Permitem expor a interface da biblioteca externa diretamente em todas as classes de domínio.'
      ],
      correctIndex: 0,
      explanation: 'Testes de aprendizado verificam que o pacote externo funciona como esperamos. Quando sai uma versão nova da dependência, basta rodar os testes para saber na hora se o comportamento mudou.'
    },
    {
      id: 'q-8-2',
      type: 'refactor-choice',
      question: 'Você precisa desenvolver um módulo que conversa com o sistema de pagamento de um parceiro, mas a equipe do parceiro ainda não definiu a API. Qual estratégia do Capítulo 8 deve ser aplicada?',
      codeSnippet: `// API externa do parceiro ainda não disponível.
// Como avançar com o PaymentController sem bloquear a sprint?`,
      options: [
        'Definir a interface que gostaríamos de ter no nosso domínio, testar com um Fake e depois conectar a API real através de um Adapter.',
        'Pausar o desenvolvimento do módulo até que o parceiro entregue a documentação final.',
        'Espalhar blocos if (partnerApi != null) em todas as classes de negócio.',
        'Escrever chamadas HTTP cruas com parâmetros adivinhados diretamente no Controller.'
      ],
      correctIndex: 0,
      explanation: 'Desenhar a interface a partir da necessidade do nosso código mantém o domínio limpo, permite testes imediatos via Fake e concentra a tradução futura em um único Adapter.'
    }
  ],
  'cap-9': [
    {
      id: 'q-9-1',
      type: 'quiz',
      question: 'No acrônimo F.I.R.S.T. para testes unitários limpos (Capítulo 9), o que significam as letras I e R?',
      options: [
        'Independent (um teste não depende de outro) e Repeatable (repetível em qualquer ambiente, mesmo sem rede).',
        'Integrated (integrado ao banco de produção) e Random (executado com dados aleatórios sem seed).',
        'Internal (testa apenas métodos privados) e Redundant (repete o código de produção).',
        'Immediate (escrito após o deploy) e Manual-Review (validado lendo logs no console).'
      ],
      correctIndex: 0,
      explanation: 'Testes devem ser Independentes (rodar isoladamente em qualquer ordem) e Repetíveis em qualquer ambiente (sem depender de serviços externos indisponíveis).'
    },
    {
      id: 'q-9-2',
      type: 'refactor-choice',
      question: 'Qual problema estrutural viola as boas práticas do Capítulo 9 no teste abaixo?',
      codeSnippet: `@Test
public void testUserLifecycle() {
  User u = service.register("ana@dev.io");
  assertTrue(u.isActive());

  service.upgradeToPremium(u.getId());
  assertEquals(Plan.PREMIUM, u.getPlan());

  service.cancelAccount(u.getId());
  assertFalse(u.isActive());
}`,
      options: [
        'Testa três conceitos distintos (registro, upgrade e cancelamento) dentro de uma única função de teste.',
        'Usa nomes descritivos nos métodos do serviço.',
        'Não faz conexão direta com banco de dados em produção.',
        'Executa rápido demais.'
      ],
      correctIndex: 0,
      explanation: 'A regra "Um Único Conceito por Teste" diz que cada função de teste deve verificar apenas um comportamento isolado (ex: shouldRegisterActiveUser, shouldUpgradeToPremium, shouldCancelAccount).'
    }
  ],
  'cap-10': [
    {
      id: 'q-10-1',
      type: 'quiz',
      question: 'Como medimos o tamanho de uma classe segundo o Capítulo 10 e como identificar que ela está grande demais?',
      options: [
        'Contando responsabilidades (motivos para mudar); nomes vagos como Manager, Processor ou Super indicam excesso de responsabilidades.',
        'Contando apenas o número de imports no topo do arquivo.',
        'Verificando se a classe implementa alguma interface.',
        'Contando quantos construtores a classe possui.'
      ],
      correctIndex: 0,
      explanation: 'De acordo com o Princípio da Responsabilidade Única (SRP), uma classe deve ter um único motivo para mudar. Se a descrição da classe precisa das palavras "e", "ou", "mas", ela acumula responsabilidades demais.'
    },
    {
      id: 'q-10-2',
      type: 'refactor-choice',
      question: 'A classe Portfolio abaixo é difícil de testar porque depende de uma cotação externa que muda a cada segundo. Qual princípio do Capítulo 10 resolve isso?',
      codeSnippet: `public class Portfolio {
  private TokyoStockExchange exchange = new TokyoStockExchange();

  public Money getTotalValue() {
    return exchange.currentPrice("AAPL").multiply(shares);
  }
}`,
      options: [
        'Aplicar o Princípio da Inversão de Dependência (DIP): depender de uma interface StockExchange injetada no construtor.',
        'Tornar o método getTotalValue() estático.',
        'Juntar o código de TokyoStockExchange dentro da classe Portfolio.',
        'Desativar os testes unitários de Portfolio.'
      ],
      correctIndex: 0,
      explanation: 'Seguindo o DIP, nossas classes devem depender de abstrações (StockExchange) e não de detalhes concretos (TokyoStockExchange), permitindo injetar um FixedStockExchangeStub nos testes.'
    }
  ],
  'cap-11': [
    {
      id: 'q-11-1',
      type: 'quiz',
      question: 'No Capítulo 11 (Sistemas), quando devemos usar o padrão Abstract Factory na separação entre construção e uso?',
      options: [
        'Quando a aplicação precisa controlar QUANDO uma instância é criada, mas queremos manter os detalhes de COMO ela é construída isolados fora da regra de negócio.',
        'Quando queremos colocar instruções new ConcreteClass() espalhadas por todos os métodos de domínio.',
        'Apenas quando o sistema não possui testes unitários.',
        'Quando queremos acoplar a classe de domínio diretamente ao banco de dados.'
      ],
      correctIndex: 0,
      explanation: 'No exemplo de OrderProcessing criando um LineItem, a aplicação decide o momento da criação durante a execução, mas delega a instanciação para a interface LineItemFactory injetada pelo main.'
    },
    {
      id: 'q-11-2',
      type: 'refactor-choice',
      question: 'Como arquiteturas limpas modernas lidam com preocupações transversais (como transações, segurança e logging) sem poluir a lógica de negócio?',
      codeSnippet: `// Como adicionar controle transacional e auditoria ao método transfer()
// sem misturar código de infraestrutura dentro do POJO BankAccount?`,
      options: [
        'Mantendo a lógica em POJOs puros e aplicando preocupações transversais de forma modular via Decorators, Proxies dinâmicos ou AOP.',
        'Fazendo todas as entidades de domínio herdarem de uma superclasse gigante de infraestrutura.',
        'Copiando e colando blocos de beginTransaction/commit/log em todos os métodos do sistema.',
        'Colocando toda a regra de negócio dentro de triggers no banco de dados.'
      ],
      correctIndex: 0,
      explanation: 'POJOs permanecem simples, focados no domínio e fáceis de testar, enquanto aspectos, proxies e containers de DI cuidam das preocupações transversais de forma declarativa.'
    }
  ],
  'cap-12': [
    {
      id: 'q-12-1',
      type: 'quiz',
      question: 'Qual é a ordem exata de importância das 4 Regras de Design Simples de Kent Beck apresentadas no Capítulo 12?',
      options: [
        '1. Executa todos os testes -> 2. Não contém duplicação -> 3. Expressa a intenção do programador -> 4. Minimiza o número de classes e métodos.',
        '1. Minimiza o número de classes -> 2. Executa os testes -> 3. Usa comentários -> 4. Otimiza CPU.',
        '1. Expressa a intenção -> 2. Minimiza classes -> 3. Não contém duplicação -> 4. Executa os testes.',
        'As quatro regras possuem prioridade idêntica e opcional.'
      ],
      correctIndex: 0,
      explanation: 'Passar em todos os testes vem em primeiro lugar, seguido de eliminar duplicação e garantir expressividade. Minimizar classes e métodos é a última regra, servindo como freio contra o excesso de engenharia.'
    },
    {
      id: 'q-12-2',
      type: 'refactor-choice',
      question: 'Dois métodos possuem passos idênticos no início e no fim, diferindo apenas no cálculo intermediário. Qual padrão o Capítulo 12 destaca para eliminar essa duplicação [G5]?',
      codeSnippet: `void exportPdf() { fetchData(); formatAsPdf(); sendFile(); }
void exportCsv() { fetchData(); formatAsCsv(); sendFile(); }`,
      options: [
        'Padrão Template Method (ou Strategy), extraindo o fluxo comum para um método base e isolando apenas a variação.',
        'Padrão Singleton com variáveis globais.',
        'Adicionar um parâmetro int formatType = 1 ou 2 e duplicar o método inteiro.',
        'Manter a duplicação porque tem menos de 20 linhas.'
      ],
      correctIndex: 0,
      explanation: 'O Template Method captura o esqueleto do algoritmo na classe base e delega o passo variável para subclasses (ou Strategy por composição), eliminando a duplicação estrutural.'
    }
  ],
  'cap-13': [
    {
      id: 'q-13-1',
      type: 'quiz',
      question: 'Quais são as 4 condições necessárias para que ocorra um Deadlock (Capítulo 13) e como evitá-lo?',
      options: [
        'Exclusão Mútua, Lock & Wait, Sem Preempção e Espera Circular; quebrar qualquer uma dessas quatro condições impede o deadlock.',
        'Polimorfismo, Herança, Encapsulamento e Abstração; evitar interfaces impede o deadlock.',
        'Uso de variáveis locais, objetos imutáveis, AtomicInteger e ConcurrentHashMap.',
        'Apenas rodar o sistema em máquinas com um único núcleo de processador.'
      ],
      correctIndex: 0,
      explanation: 'Um deadlock só acontece quando todas as 4 condições estão presentes simultaneamente. Por exemplo, impor uma ordem global consistente para aquisição de recursos quebra a Espera Circular.'
    },
    {
      id: 'q-13-2',
      type: 'refactor-choice',
      question: 'Por que o código abaixo falha sob múltiplas threads mesmo quando getNextOrNull não é usado, e qual estratégia de bloqueio resolve o problema?',
      codeSnippet: `// Thread A e Thread B compartilham a mesma instância de iterator:
if (iterator.hasNext()) {
   Widget w = iterator.next();
}`,
      options: [
        'A condição entre hasNext() e next() não é atômica; a melhor defesa é Server-Based Locking (um método atômico único como getNextOrNull() no servidor).',
        'O método hasNext() deveria retornar um inteiro em vez de boolean.',
        'Basta remover o if (iterator.hasNext()) e capturar NullPointerException.',
        'Problemas de concorrência em iteradores são eventos isolados que podem ser ignorados.'
      ],
      correctIndex: 0,
      explanation: 'Entre o retorno true de hasNext() na Thread A e a chamada next(), a Thread B pode consumir o último elemento. Unificar a operação em um método sincronizado no servidor elimina a janela de corrida.'
    }
  ],
  'cap-14': [
    {
      id: 'q-14-1',
      type: 'quiz',
      question: 'Qual é a lição central do estudo de caso Args no Capítulo 14 (Refinamento Sucessivo)?',
      options: [
        'Escrever código limpo exige refinamento incremental: primeiro fazemos funcionar e em seguida limpamos em pequenos passos mantendo os testes sempre verdes.',
        'Programadores experientes escrevem a arquitetura final perfeita na primeira tentativa sem nunca refatorar.',
        'Para refatorar um módulo grande, devemos quebrar todos os testes durante duas semanas e só compilar no final.',
        'É melhor manter mapas separados (booleanArgs, stringArgs, intArgs) do que usar polimorfismo.'
      ],
      correctIndex: 0,
      explanation: 'Soluções elegantes raramente nascem prontas no primeiro rascunho. A disciplina profissional consiste em limpar a estrutura incrementalmente, amparado por TDD.'
    },
    {
      id: 'q-14-2',
      type: 'refactor-choice',
      question: 'No estudo de caso Args, qual abstração substituiu os múltiplos HashMaps por tipo (boolean, String, int, double)?',
      codeSnippet: `// Como armazenar e converter diferentes tipos de argumentos de linha de comando
// sem criar um novo Map e novos switches a cada tipo adicionado?`,
      options: [
        'Uma interface ArgumentMarshaler combinada com um único Map<Character, ArgumentMarshaler>.',
        'Um array bidimensional de Object[][] com casts manuais.',
        'Uma única String concatenada separada por ponto e vírgula.',
        'Herança múltipla na classe ArgsException.'
      ],
      correctIndex: 0,
      explanation: 'A interface ArgumentMarshaler permitiu que BooleanArgumentMarshaler, StringArgumentMarshaler e IntegerArgumentMarshaler fossem tratados uniformemente em um único mapa.'
    }
  ],
  'cap-15': [
    {
      id: 'q-15-1',
      type: 'quiz',
      question: 'No Capítulo 15 (Internals do JUnit), por que Robert C. Martin renomeou o método compact(String message) para formatCompactedComparison(String message)?',
      options: [
        'Porque o método não apenas compactava as strings, mas construía a mensagem formatada final do JUnit; o nome antigo escondia esse comportamento [N7, G30].',
        'Porque nomes de métodos em Java precisam ter pelo menos 25 caracteres.',
        'Porque a palavra compact é uma palavra reservada da linguagem Java.',
        'Para seguir a Notação Húngara adicionando prefixo de tipo.'
      ],
      correctIndex: 0,
      explanation: 'O nome formatCompactedComparison descreve com precisão a responsabilidade principal do método, deixando compact() para a função auxiliar que realmente apenas compacta uma string.'
    },
    {
      id: 'q-15-2',
      type: 'refactor-choice',
      question: 'Qual heurística [G28, G29] foi aplicada para melhorar a legibilidade da condicional abaixo no ComparisonCompactor?',
      codeSnippet: `if (expected == null || actual == null || areStringsEqual())
  return Assert.format(message, expected, actual);`,
      options: [
        'Encapsular a condicional em um método positivo expressivo if (shouldBeCompacted()) para destacar o fluxo principal.',
        'Substituir os operadores || por operadores bitwise |.',
        'Adicionar um comentário de 4 linhas acima do if explicando cada cláusula.',
        'Lançar uma NullPointerException quando expected for null.'
      ],
      correctIndex: 0,
      explanation: 'Encapsular condicionais [G28] e preferir formas afirmativas [G29] como shouldBeCompacted() reduz a carga cognitiva de quem lê o método.'
    }
  ],
  'cap-16': [
    {
      id: 'q-16-1',
      type: 'quiz',
      question: 'Na refatoração de SerialDate (Capítulo 16), qual foi o primeiro passo executado antes de alterar qualquer linha de design da classe?',
      options: [
        'Medir a cobertura de testes existente (~50%) e escrever uma suíte abrangente de testes unitários (92%), descobrindo e corrigindo bugs nas condições de contorno.',
        'Apagar todos os testes antigos para refatorar mais rápido sem erros de compilação.',
        'Renomear todas as variáveis privadas usando busca e substituição global sem rodar testes.',
        'Reescrever a biblioteca do zero em outra linguagem.'
      ],
      correctIndex: 0,
      explanation: 'A metodologia é "Primeiro Faça Funcionar, Depois Faça Certo". A bateria de testes revelou bugs de contorno em métodos de datas antes de iniciar as refatorações estruturais.'
    },
    {
      id: 'q-16-2',
      type: 'refactor-choice',
      question: 'A classe abstrata SerialDate instanciava diretamente sua subclasse concreta SpreadsheetDate dentro de createInstance(). Qual odor [G7] isso representa e como foi resolvido?',
      codeSnippet: `public abstract class SerialDate {
  public static SerialDate createInstance(final int serial) {
    return new SpreadsheetDate(serial); // Classe base conhece a subclasse!
  }
}`,
      options: [
        'Odor G7 (Classes Base Dependendo de suas Derivadas); resolvido extraindo a criação para uma Abstract Factory (DayDateFactory).',
        'Odor C5 (Código Comentado); resolvido adicionando Javadoc.',
        'Odor F3 (Argumento Flag); resolvido adicionando um boolean.',
        'Odor J1 (Lista Longa de Imports); resolvido com wildcard.'
      ],
      correctIndex: 0,
      explanation: 'Classes abstratas base nunca devem depender de suas implementações concretas. Extrair DayDateFactory inverte a dependência e isola a criação.'
    }
  ],
  'cap-17': [
    {
      id: 'q-17-1',
      type: 'quiz',
      question: 'No catálogo de Odores e Heurísticas (Capítulo 17), o que caracteriza a "Inveja de Recursos" (Feature Envy [G14])?',
      options: [
        'Um método de uma classe que usa excessivamente os getters e manipuladores de outro objeto para realizar um cálculo que deveria pertencer àquele próprio objeto.',
        'Uma classe que não possui nenhum método público.',
        'Um teste unitário que executa em menos de 10 milissegundos.',
        'O uso de enums em vez de constantes inteiras.'
      ],
      correctIndex: 0,
      explanation: 'No exemplo HourlyPayCalculator, o método acessava diversos campos internos de Employee para calcular o pagamento. Mover o comportamento para a classe que detém os dados elimina a Feature Envy.'
    },
    {
      id: 'q-17-2',
      type: 'refactor-choice',
      question: 'Qual odor é eliminado quando fazemos a primeira função retornar o objeto que a segunda função exige como parâmetro, conforme abaixo?',
      codeSnippet: `// Antes:
applyFilter();
renderFilteredOutput(); // Falha se applyFilter() não foi chamado antes!

// Depois (Bucket Brigade):
FilteredData data = applyFilter(rawData);
renderOutput(data);`,
      options: [
        'G31: Acoplamento Temporal Oculto (tornado explícito via Bucket Brigade).',
        'E1: Build Requer Mais de Um Passo.',
        'J2: Herança de Constantes.',
        'C1: Informação Inapropriada em Comentários.'
      ],
      correctIndex: 0,
      explanation: 'Transformar a sequência em uma "brigada de baldes" (onde cada função produz o resultado consumido pela próxima) torna impossível chamar as funções fora de ordem.'
    }
  ]
};

