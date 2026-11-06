// Casos de Uso e Comparações Antes vs. Depois (Código Sujo vs. Código Limpo)
// Um conjunto completo cobrindo todos os 17 capítulos de Clean Code.

export const cleanCodeExamples = {
  'cap-1': [
    {
      id: 'ex-1-1',
      title: 'Aplicando a Regra do Escoteiro em Cálculo de Pedido',
      context: 'Caso de uso: ao tocar em um módulo legado para corrigir um imposto, o desenvolvedor deixa o trecho mais limpo do que o encontrou.',
      smells: ['N1', 'G25', 'G19'],
      dirtyLabel: 'Antes (Código Acumulando Bagunça)',
      dirtyCode: `public double calc(Order o, int t) {
  double r = 0;
  for (int i = 0; i < o.items.size(); i++) {
    // 1 = eletronico, 2 = livro
    if (t == 1) {
      r += o.items.get(i).p * 1.18;
    } else {
      r += o.items.get(i).p;
    }
  }
  return r;
}`,
      cleanLabel: 'Depois (Regra do Escoteiro Aplicada)',
      cleanCode: `private static final double ELECTRONICS_TAX_RATE = 1.18;

public double calculateOrderTotal(Order order, Category category) {
  double total = 0.0;
  for (LineItem item : order.getItems()) {
    total += priceWithTax(item, category);
  }
  return total;
}

private double priceWithTax(LineItem item, Category category) {
  if (category == Category.ELECTRONICS) {
    return item.getPrice() * ELECTRONICS_TAX_RATE;
  }
  return item.getPrice();
}`,
      refactoringNotes: [
        'Substituiu variáveis de uma letra (o, t, r, p) por identificadores que revelam intenção.',
        'Eliminou o número mágico 1.18 e o código inteiro 1 com constante nomeada e enum Category.',
        'Separou o cálculo unitário em priceWithTax() para facilitar leitura rápida (proporção 10:1).'
      ]
    }
  ],
  'cap-2': [
    {
      id: 'ex-2-1',
      title: 'Tabuleiro do Campo Minado: Nomes que Revelam a Intenção',
      context: 'Caso de uso clássico do Capítulo 2: descobrir o que o método faz sem precisar adivinhar o significado de theList, x[0] e 4.',
      smells: ['N1', 'N4', 'G25'],
      dirtyLabel: 'Antes (Intenção Oculta)',
      dirtyCode: `public List<int[]> getThem() {
  List<int[]> list1 = new ArrayList<int[]>();
  for (int[] x : theList)
    if (x[0] == 4)
      list1.add(x);
  return list1;
}`,
      cleanLabel: 'Depois (Nomes que Revelam Intenção)',
      cleanCode: `public List<Cell> getFlaggedCells() {
  List<Cell> flaggedCells = new ArrayList<Cell>();
  for (Cell cell : gameBoard)
    if (cell.isFlagged())
      flaggedCells.add(cell);
  return flaggedCells;
}`,
      refactoringNotes: [
        'theList virou gameBoard e list1 virou flaggedCells.',
        'O array int[] com índice mágico x[0] == 4 foi encapsulado na classe Cell com o predicado isFlagged().'
      ]
    },
    {
      id: 'ex-2-2',
      title: 'Adicionando Contexto com Classe: GuessStatisticsMessage',
      context: 'Caso de uso: variáveis locais soltas em uma função longa ganham contexto imediato ao se tornarem campos de uma classe dedicada.',
      smells: ['N5', 'G30'],
      dirtyLabel: 'Antes (Variáveis sem Contexto Claro)',
      dirtyCode: `private void printGuessStatistics(char candidate, int count) {
  String number;
  String verb;
  String pluralModifier;
  if (count == 0) {
    number = "no";
    verb = "are";
    pluralModifier = "s";
  } else if (count == 1) {
    number = "1";
    verb = "is";
    pluralModifier = "";
  } else {
    number = Integer.toString(count);
    verb = "are";
    pluralModifier = "s";
  }
  String guessMessage = String.format(
    "There %s %s %s%s", verb, number, candidate, pluralModifier
  );
  print(guessMessage);
}`,
      cleanLabel: 'Depois (Contexto Explícito na Classe)',
      cleanCode: `public class GuessStatisticsMessage {
  private String number;
  private String verb;
  private String pluralModifier;

  public String make(char candidate, int count) {
    createPluralDependentMessageParts(count);
    return String.format(
      "There %s %s %s%s", verb, number, candidate, pluralModifier
    );
  }

  private void createPluralDependentMessageParts(int count) {
    if (count == 0) {
      thereAreNoLetters();
    } else if (count == 1) {
      thereIsOneLetter();
    } else {
      thereAreManyLetters(count);
    }
  }
}`,
      refactoringNotes: [
        'number, verb e pluralModifier agora pertencem comprovadamente a GuessStatisticsMessage.',
        'Cada ramo condicional delega para métodos curtos autoexplicativos.'
      ]
    }
  ],
  'cap-3': [
    {
      id: 'ex-3-1',
      title: 'Escondendo Switch em Abstract Factory (Folha de Pagamento)',
      context: 'Caso de uso: eliminar um switch que viola SRP e OCP em múltiplos métodos usando polimorfismo.',
      smells: ['G23', 'G30'],
      dirtyLabel: 'Antes (Switch Espalhado e Violando OCP)',
      dirtyCode: `public Money calculatePay(Employee e) throws InvalidEmployeeType {
  switch (e.type) {
    case COMMISSIONED:
      return calculateCommissionedPay(e);
    case HOURLY:
      return calculateHourlyPay(e);
    case SALARIED:
      return calculateSalariedPay(e);
    default:
      throw new InvalidEmployeeType(e.type);
  }
}`,
      cleanLabel: 'Depois (Polimorfismo + Abstract Factory)',
      cleanCode: `public abstract class Employee {
  public abstract boolean isPayday();
  public abstract Money calculatePay();
  public abstract void deliverPay(Money pay);
}

public class EmployeeFactoryImpl implements EmployeeFactory {
  public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType {
    switch (r.type) {
      case COMMISSIONED: return new CommissionedEmployee(r);
      case HOURLY:       return new HourlyEmployee(r);
      case SALARIED:     return new SalariedEmployee(r);
      default: throw new InvalidEmployeeType(r.type);
    }
  }
}`,
      refactoringNotes: [
        'O switch aparece uma única vez na fábrica para instanciar a subclasse polimórfica.',
        'calculatePay(), isPayday() e deliverPay() são despachados polimorficamente sem novos switches.'
      ]
    },
    {
      id: 'ex-3-2',
      title: 'Extraindo Blocos Try/Catch e Eliminando Efeitos Colaterais',
      context: 'Caso de uso: tratamento de erro deve ser a única tarefa de uma função que possui try/catch.',
      smells: ['G30', 'N7'],
      dirtyLabel: 'Antes (Try/Catch Misturado com Regra)',
      dirtyCode: `public void delete(Page page) {
  try {
    deletePage(page);
    registry.deleteReference(page.name);
    configKeys.deleteKey(page.name.makeKey());
  } catch (Exception e) {
    logger.log(e.getMessage());
  }
}`,
      cleanLabel: 'Depois (Separação entre Ação e Tratamento de Erro)',
      cleanCode: `public void delete(Page page) {
  try {
    deletePageAndAllReferences(page);
  } catch (Exception e) {
    logError(e);
  }
}

private void deletePageAndAllReferences(Page page) throws Exception {
  deletePage(page);
  registry.deleteReference(page.name);
  configKeys.deleteKey(page.name.makeKey());
}`,
      refactoringNotes: [
        'delete(Page) lida exclusivamente com a captura e registro de erro.',
        'deletePageAndAllReferences(Page) concentra apenas os passos da exclusão sem poluição visual.'
      ]
    }
  ],
  'cap-4': [
    {
      id: 'ex-4-1',
      title: 'Substituindo Comentários por Código Expressivo',
      context: 'Caso de uso: quando sentimos necessidade de comentar uma condição complexa, devemos extrair um método com o próprio texto do comentário.',
      smells: ['C3', 'G28'],
      dirtyLabel: 'Antes (Comentário Compensando Expressão Críptica)',
      dirtyCode: `// Verifica se o funcionário tem direito a benefícios completos
if ((employee.flags & HOURLY_FLAG) != 0 && (employee.age > 65)) {
  grantFullBenefits(employee);
}

// Código antigo desativado em 2024:
// employee.applyLegacyDeduction();`,
      cleanLabel: 'Depois (Autoexplicativo e Sem Código Comentado)',
      cleanCode: `if (employee.isEligibleForFullBenefits()) {
  grantFullBenefits(employee);
}`,
      refactoringNotes: [
        'A regra de elegibilidade virou o método booleano employee.isEligibleForFullBenefits() [G28].',
        'O código comentado [C5] foi deletado, pois o Git preserva o histórico.'
      ]
    }
  ],
  'cap-5': [
    {
      id: 'ex-5-1',
      title: 'Densidade Vertical e Ordem de Chamada (Metáfora do Jornal)',
      context: 'Caso de uso: remover comentários ruidosos que quebram a densidade vertical e posicionar métodos chamados logo abaixo do chamador.',
      smells: ['G10', 'C3'],
      dirtyLabel: 'Antes (Densidade Quebrada e Alinhamento Artificial)',
      dirtyCode: `public class ReporterConfig {
  /** O nome da classe do listener */
  private String       m_className;
  /** As propriedades do listener */
  private List<Property> m_properties = new ArrayList<Property>();

  private void validateProperty(Property p) { /* ... */ }

  public void addProperty(Property property) {
    validateProperty(property);
    m_properties.add(property);
  }
}`,
      cleanLabel: 'Depois (Densidade Limpa e Chamador Acima do Chamado)',
      cleanCode: `public class ReporterConfig {
  private String className;
  private List<Property> properties = new ArrayList<Property>();

  public void addProperty(Property property) {
    validateProperty(property);
    properties.add(property);
  }

  private void validateProperty(Property property) {
    // validação logo abaixo de quem a invoca
  }
}`,
      refactoringNotes: [
        'Atributos relacionados agrupados no topo sem Javadocs redundantes.',
        'Sem alinhamento artificial em colunas nem prefixo m_.',
        'O método público addProperty vem antes do método privado validateProperty que ele chama.'
      ]
    }
  ],
  'cap-6': [
    {
      id: 'ex-6-1',
      title: 'Resolvendo Train Wrecks (Lei de Demeter)',
      context: 'Caso de uso: eliminar navegação transitiva por objetos internos pedindo diretamente uma ação ao objeto colaborador.',
      smells: ['G36', 'G8'],
      dirtyLabel: 'Antes (Acidente de Trem / Violação de Demeter)',
      dirtyCode: `String outputDir = ctxt.getOptions().getScratchDir().getAbsolutePath();
String classFilePath = outputDir + "/" + className.replace('.', '/') + ".class";
FileOutputStream fout = new FileOutputStream(classFilePath);
BufferedOutputStream bos = new BufferedOutputStream(fout);`,
      cleanLabel: 'Depois (Diga ao Objeto o que Fazer, Não Pergunte Dados)',
      cleanCode: `BufferedOutputStream bos = ctxt.createScratchFileStream(classFileName);`,
      refactoringNotes: [
        'O cliente deixou de conhecer a estrutura interna de Options, ScratchDir e caminhos de arquivo.',
        'ctxt encapsula a responsabilidade de criar o stream no diretório temporário apropriado.'
      ]
    }
  ],
  'cap-7': [
    {
      id: 'ex-7-1',
      title: 'Special Case Pattern e Wrapper de Exceções',
      context: 'Caso de uso: eliminar try/catch usado como lógica de negócio para despesas de refeição.',
      smells: ['G26', 'G30'],
      dirtyLabel: 'Antes (Exceção Usada como Fluxo Normal)',
      dirtyCode: `try {
  MealExpenses expenses = expenseReportDAO.getMeals(employee.getID());
  m_total += expenses.getTotal();
} catch (MealExpensesNotFound e) {
  m_total += getMealPerDiem();
}`,
      cleanLabel: 'Depois (Special Case Pattern)',
      cleanCode: `MealExpenses expenses = expenseReportDAO.getMeals(employee.getID());
total += expenses.getTotal();

// Quando não há notas fiscais, o DAO retorna:
public class PerDiemMealExpenses implements MealExpenses {
  public int getTotal() {
    return DEFAULT_PER_DIEM_AMOUNT;
  }
}`,
      refactoringNotes: [
        'O cliente soma expenses.getTotal() sem condicional nem bloco catch.',
        'PerDiemMealExpenses encapsula o caso especial polimorficamente.'
      ]
    }
  ],
  'cap-8': [
    {
      id: 'ex-8-1',
      title: 'Encapsulando Fronteiras Genéricas (Map -> Sensors)',
      context: 'Caso de uso: proteger o domínio contra métodos perigosos como clear() e casts espalhados de java.util.Map.',
      smells: ['G8', 'G36'],
      dirtyLabel: 'Antes (Map Genérico Espalhado pelo Sistema)',
      dirtyCode: `Map sensors = new HashMap();
// Em dezenas de arquivos espalhados pelo sistema:
Sensor s = (Sensor) sensors.get(sensorId);
// Qualquer classe também pode chamar: sensors.clear();`,
      cleanLabel: 'Depois (Fronteira Encapsulada na Classe Sensors)',
      cleanCode: `public class Sensors {
  private final Map<String, Sensor> sensors = new HashMap<>();

  public Sensor getById(String id) {
    return sensors.get(id);
  }
}`,
      refactoringNotes: [
        'A interface Map não vaza para o restante da aplicação.',
        'Regras de acesso e evolução de tipos ficam restritas à classe Sensors.'
      ]
    }
  ],
  'cap-9': [
    {
      id: 'ex-9-1',
      title: 'Testes Limpos: Padrão BUILD-OPERATE-CHECK',
      context: 'Caso de uso: transformar um teste poluído de detalhes de infraestrutura em um teste legível de 3 linhas.',
      smells: ['T1', 'G5'],
      dirtyLabel: 'Antes (Teste Obscuro e Repetitivo)',
      dirtyCode: `public void testGetPageHieratchyAsXml() throws Exception {
  crawler.addPage(root, PathParser.parse("PageOne"));
  crawler.addPage(root, PathParser.parse("PageOne.ChildOne"));
  crawler.addPage(root, PathParser.parse("PageTwo"));
  request.setResource("root");
  request.addInput("type", "pages");
  Responder responder = new SerializedPageResponder();
  SimpleResponse response = (SimpleResponse) responder.makeResponse(
    new FitNesseContext(root), request
  );
  String xml = response.getContent();
  assertEquals("text/xml", response.getContentType());
  assertTrue(xml.indexOf("<name>PageOne</name>") != -1);
  assertTrue(xml.indexOf("<name>PageTwo</name>") != -1);
  assertTrue(xml.indexOf("<name>ChildOne</name>") != -1);
}`,
      cleanLabel: 'Depois (BUILD-OPERATE-CHECK com DSL de Teste)',
      cleanCode: `public void testGetPageHierarchyAsXml() throws Exception {
  makePages("PageOne", "PageOne.ChildOne", "PageTwo");

  submitRequest("root", "type:pages");

  assertResponseIsXML();
  assertResponseContains("<name>PageOne</name>", "<name>PageTwo</name>", "<name>ChildOne</name>");
}`,
      refactoringNotes: [
        'BUILD: makePages(...) constrói o cenário.',
        'OPERATE: submitRequest(...) executa a operação testada.',
        'CHECK: assertResponseIsXML() e assertResponseContains(...) validam o resultado com clareza imediata.'
      ]
    }
  ],
  'cap-10': [
    {
      id: 'ex-10-1',
      title: 'SRP e OCP: Refatorando a Classe Sql',
      context: 'Caso de uso: dividir uma classe que muda por vários motivos em uma hierarquia aberta para extensão e fechada para modificação.',
      smells: ['G5', 'G23'],
      dirtyLabel: 'Antes (Classe Monolítica Violando SRP e OCP)',
      dirtyCode: `public class Sql {
  public Sql(String table, Column[] columns) {}
  public String create() { /* ... */ }
  public String insert(Object[] fields) { /* ... */ }
  public String selectAll() { /* ... */ }
  public String select(Column column, String pattern) { /* ... */ }
  private String columnList(Column[] columns) { /* ... */ }
  private String valuesList(Object[] fields, final Column[] columns) { /* ... */ }
}`,
      cleanLabel: 'Depois (Subclasses Coesas + OCP)',
      cleanCode: `abstract public class Sql {
  public Sql(String table, Column[] columns) {}
  abstract public String generate();
}

public class CreateSql extends Sql {
  public String generate() { /* gera apenas CREATE TABLE */ }
}

public class InsertSql extends Sql {
  public String generate() { /* gera apenas INSERT */ }
}

public class Where {
  public String generate() { /* utilitário isolado em sua própria classe */ }
}`,
      refactoringNotes: [
        'Cada comando SQL vive em sua própria classe pequena e coesa (SRP).',
        'Adicionar UpdateSql não exige tocar em nenhuma das classes existentes (OCP).'
      ]
    }
  ],
  'cap-11': [
    {
      id: 'ex-11-1',
      title: 'Separando Construção de Uso com Injeção de Dependência',
      context: 'Caso de uso: substituir Lazy Initialization acoplada por injeção via construtor.',
      smells: ['G13', 'G35'],
      dirtyLabel: 'Antes (Construção Acoplada Dentro do Uso)',
      dirtyCode: `public class OrderProcessor {
  private BillingService service;

  public BillingService getBillingService() {
    if (service == null) {
      // Acoplamento direto à implementação concreta e credenciais fixas!
      service = new StripeBillingServiceImpl("prod-api-key");
    }
    return service;
  }
}`,
      cleanLabel: 'Depois (Injeção de Dependência Limpa)',
      cleanCode: `public class OrderProcessor {
  private final BillingService billingService;

  public OrderProcessor(BillingService billingService) {
    this.billingService = billingService;
  }

  public Receipt process(Order order) {
    return billingService.charge(order);
  }
}`,
      refactoringNotes: [
        'OrderProcessor desconhece como BillingService é instanciado.',
        'Em testes unitários, basta injetar um FakeBillingService no construtor.'
      ]
    }
  ],
  'cap-12': [
    {
      id: 'ex-12-1',
      title: 'Eliminando Duplicação de Algoritmo com Template Method',
      context: 'Caso de uso: aplicar a 2ª Regra de Design Simples de Kent Beck (Sem Duplicação) em regras regionais.',
      smells: ['G5', 'N3'],
      dirtyLabel: 'Antes (Fluxo Duplicado entre Divisões)',
      dirtyCode: `public class VacationPolicy {
  public void accrueUSDivisionVacation() {
    calculateBaseVacationHours();
    alterForUSLegalMinimums();
    applyToPayroll();
  }

  public void accrueEUDivisionVacation() {
    calculateBaseVacationHours();
    alterForEULegalMinimums();
    applyToPayroll();
  }
}`,
      cleanLabel: 'Depois (Padrão Template Method)',
      cleanCode: `abstract public class VacationPolicy {
  public void accrueVacation() {
    calculateBaseVacationHours();
    alterToLegalMinimums();
    applyToPayroll();
  }

  private void calculateBaseVacationHours() { /* ... */ }
  abstract protected void alterToLegalMinimums();
  private void applyToPayroll() { /* ... */ }
}

public class USVacationPolicy extends VacationPolicy {
  @Override protected void alterToLegalMinimums() { /* regra EUA */ }
}

public class EUVacationPolicy extends VacationPolicy {
  @Override protected void alterToLegalMinimums() { /* regra UE */ }
}`,
      refactoringNotes: [
        'O algoritmo principal fica definido uma única vez na superclasse.',
        'As subclasses implementam apenas a variação específica alterToLegalMinimums().'
      ]
    }
  ],
  'cap-13': [
    {
      id: 'ex-13-1',
      title: 'Concorrência: Incremento Atômico e Server-Based Locking',
      context: 'Caso de uso: eliminar condição de corrida em geração de IDs e iteração concorrente.',
      smells: ['G26', 'G31'],
      dirtyLabel: 'Antes (Race Condition em ++lastIdUsed)',
      dirtyCode: `public class IdGenerator {
  private int lastIdUsed = 42;

  // Duas threads chamando simultaneamente podem receber o mesmo ID (43)!
  public int getNextId() {
    return ++lastIdUsed;
  }
}`,
      cleanLabel: 'Depois (Thread-Safe com AtomicInteger / CAS)',
      cleanCode: `import java.util.concurrent.atomic.AtomicInteger;

public class IdGenerator {
  private final AtomicInteger lastIdUsed = new AtomicInteger(42);

  public int getNextId() {
    return lastIdUsed.incrementAndGet();
  }
}`,
      refactoringNotes: [
        '++lastIdUsed compila em múltiplas instruções de bytecode (leitura, soma, escrita) sujeitas a 12.870 intercalações.',
        'AtomicInteger.incrementAndGet() usa instrução atômica Compare-And-Swap (CAS) do processador.'
      ]
    }
  ],
  'cap-14': [
    {
      id: 'ex-14-1',
      title: 'Refinamento Sucessivo: Unificando Mapas no Parser Args',
      context: 'Caso de uso: substituir múltiplos mapas tipados e switches por polimorfismo via ArgumentMarshaler.',
      smells: ['G5', 'G23', 'G30'],
      dirtyLabel: 'Antes (Mapas Paralelos para Cada Tipo)',
      dirtyCode: `private Map<Character, Boolean> booleanArgs = new HashMap<>();
private Map<Character, String> stringArgs = new HashMap<>();
private Map<Character, Integer> intArgs = new HashMap<>();

private void parseSchemaElement(String element) throws ParseException {
  char elementId = element.charAt(0);
  String tail = element.substring(1);
  if (tail.length() == 0)
    booleanArgs.put(elementId, false);
  else if (tail.equals("*"))
    stringArgs.put(elementId, "");
  else if (tail.equals("#"))
    intArgs.put(elementId, 0);
}`,
      cleanLabel: 'Depois (Mapa Único + Interface ArgumentMarshaler)',
      cleanCode: `public interface ArgumentMarshaler {
  void set(Iterator<String> currentArgument) throws ArgsException;
}

private Map<Character, ArgumentMarshaler> marshalers = new HashMap<>();

private void parseSchemaElement(String element) throws ArgsException {
  char elementId = element.charAt(0);
  String elementTail = element.substring(1);
  if (elementTail.length() == 0)
    marshalers.put(elementId, new BooleanArgumentMarshaler());
  else if (elementTail.equals("*"))
    marshalers.put(elementId, new StringArgumentMarshaler());
  else if (elementTail.equals("#"))
    marshalers.put(elementId, new IntegerArgumentMarshaler());
}`,
      refactoringNotes: [
        'Os três mapas paralelos foram substituídos por um único Map<Character, ArgumentMarshaler>.',
        'Cada implementação de ArgumentMarshaler encapsula sua própria lógica de conversão e armazenamento.'
      ]
    }
  ],
  'cap-15': [
    {
      id: 'ex-15-1',
      title: 'JUnit ComparisonCompactor: Condicionais e Acoplamento Temporal',
      context: 'Caso de uso: refatoração do método compact do JUnit aplicando G28, G29, G30 e G31.',
      smells: ['N6', 'G28', 'G29', 'G31'],
      dirtyLabel: 'Antes (Prefixos f, Negativa e Acoplamento Oculto)',
      dirtyCode: `public String compact(String message) {
  if (fExpected == null || fActual == null || areStringsEqual())
    return Assert.format(message, fExpected, fActual);

  findCommonPrefix();
  findCommonSuffix(); // Depende silenciosamente de findCommonPrefix()!
  String expected = compactString(fExpected);
  String actual = compactString(fActual);
  return Assert.format(message, expected, actual);
}`,
      cleanLabel: 'Depois (Intenção Clara e Acoplamento Explícito)',
      cleanCode: `public String formatCompactedComparison(String message) {
  String compactExpected = expected;
  String compactActual = actual;
  if (shouldBeCompacted()) {
    findCommonPrefixAndSuffix();
    compactExpected = compact(expected);
    compactActual = compact(actual);
  }
  return Assert.format(message, compactExpected, compactActual);
}

private boolean shouldBeCompacted() {
  return !shouldNotBeCompacted();
}`,
      refactoringNotes: [
        'Renomeado para formatCompactedComparison() para refletir que o método formata o resultado [N7].',
        'findCommonPrefixAndSuffix() torna explícita a ordem obrigatória de execução [G31].'
      ]
    }
  ],
  'cap-16': [
    {
      id: 'ex-16-1',
      title: 'SerialDate -> DayDate: Enums Ricos e Nomes Explícitos',
      context: 'Caso de uso: eliminar constantes inteiras herdadas e métodos estáticos ambíguos na biblioteca de datas.',
      smells: ['J2', 'J3', 'G18', 'G20'],
      dirtyLabel: 'Antes (Constantes Int e Método Estático Ambíguo)',
      dirtyCode: `public abstract class SerialDate implements MonthConstants {
  public static boolean isValidMonthCode(final int code) {
    switch (code) {
      case JANUARY: case FEBRUARY: /* ... */ case DECEMBER:
        return true;
      default:
        return false;
    }
  }

  public static SerialDate addDays(final int days, final SerialDate base) {
    final int serialDayNumber = base.toSerial() + days;
    return SerialDate.createInstance(serialDayNumber);
  }
}`,
      cleanLabel: 'Depois (Enum Month e Método de Instância plusDays)',
      cleanCode: `public abstract class DayDate {
  public enum Month {
    JANUARY(1), FEBRUARY(2), /* ... */ DECEMBER(12);
    public final int index;
    Month(int index) { this.index = index; }
  }

  public DayDate plusDays(int days) {
    return DayDateFactory.makeDate(toOrdinalDay() + days);
  }
}`,
      refactoringNotes: [
        'O enum Month torna isValidMonthCode() desnecessário por segurança de tipos [J3].',
        'date.plusDays(5) é um método de instância e deixa claro que retorna um novo DayDate imutável [G18, G20].'
      ]
    }
  ],
  'cap-17': [
    {
      id: 'ex-17-1',
      title: 'Revisão Combinada: Aplicando Múltiplas Heurísticas (F3, G19, G33)',
      context: 'Caso de uso: revisão de código que elimina argumento flag booleano, número mágico e condição de contorno solta.',
      smells: ['F3', 'G19', 'G33'],
      dirtyLabel: 'Antes (Flag Booleana e Aritmética de Contorno Solta)',
      dirtyCode: `public void processPagination(List<Item> items, int page, boolean isExport) {
  if (isExport) {
    exportAll(items);
  } else {
    for (int i = page * 20; i < (page + 1) * 20 && i < items.size(); i++) {
      renderItem(items.get(i));
    }
  }
}`,
      cleanLabel: 'Depois (Funções Separadas + Variáveis Explicativas)',
      cleanCode: `private static final int PAGE_SIZE = 20;

public void exportItems(List<Item> items) {
  exportAll(items);
}

public void renderPage(List<Item> items, int pageIndex) {
  int startIndex = pageIndex * PAGE_SIZE;
  int nextPageIndex = pageIndex + 1;
  int endIndex = Math.min(nextPageIndex * PAGE_SIZE, items.size());

  for (int i = startIndex; i < endIndex; i++) {
    renderItem(items.get(i));
  }
}`,
      refactoringNotes: [
        'Eliminou o argumento booleano isExport dividindo em exportItems() e renderPage() [F3].',
        'Encapsulou a condição de contorno nextPageIndex = pageIndex + 1 e criou variáveis explicativas startIndex e endIndex [G19, G33].'
      ]
    }
  ]
};

