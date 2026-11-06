/**
 * Banco Completo de Exercícios de Fixação, Cenários de Refatoração e Exercícios Práticos (Mão na Massa)
 * para o livro "Código Limpo" (Clean Code • Robert C. Martin).
 * Totalmente compatível com `quiz-engine.js`.
 */

import { cleanCodeExercises } from "./index.js";

const chapterCategoryMap = {
  "cap-1": "criacional",
  "cap-2": "criacional",
  "cap-3": "criacional",
  "cap-4": "criacional",
  "cap-5": "criacional",
  "cap-6": "estrutural",
  "cap-7": "estrutural",
  "cap-8": "estrutural",
  "cap-9": "estrutural",
  "cap-10": "comportamental",
  "cap-11": "comportamental",
  "cap-12": "comportamental",
  "cap-13": "comportamental",
  "cap-14": "estudos-de-caso",
  "cap-15": "estudos-de-caso",
  "cap-16": "estudos-de-caso",
  "cap-17": "estudos-de-caso"
};

export const cleanCodeQuizzesData = Object.entries(cleanCodeExercises).flatMap(([chapterId, items]) =>
  items.map((item, idx) => ({
    id: item.id,
    patternId: chapterId,
    category: chapterCategoryMap[chapterId] || "principios",
    difficulty: idx === 0 ? "facil" : item.codeSnippet ? "dificil" : "medio",
    question: item.codeSnippet
      ? `${item.question}\n\nTrecho analisado:\n${item.codeSnippet}`
      : item.question,
    options: item.options.map((optText, optIdx) => ({
      text: optText,
      isCorrect: optIdx === item.correctIndex
    })),
    explanation: item.explanation
  }))
);

export const cleanCodeScenariosData = [
  {
    id: "cc-scen-1",
    title: "Folha de Pagamento com Switch Espalhado [G23]",
    patternId: "cap-3",
    category: "criacional",
    difficulty: "medio",
    context: "Em um sistema corporativo de RH, um enum EmployeeType (COMMISSIONED, HOURLY, SALARIED) é inspecionado em um switch/case dentro de calculatePay(), isPayday() e deliverPay(). Toda vez que surge uma nova modalidade de contratação, três métodos extensos precisam ser reabertos e modificados.",
    requirements: [
      "Eliminar a repetição do switch/case por tipo de funcionário nos métodos de negócio.",
      "Respeitar o Princípio da Responsabilidade Única (SRP) e o Princípio Aberto-Fechado (OCP).",
      "Isolar a criação das instâncias concretas em um único ponto."
    ],
    question: "Qual estratégia de refatoração do Capítulo 3 resolve este problema?",
    options: [
      { text: "Esconder um único switch dentro de uma Abstract Factory (EmployeeFactoryImpl) que retorna subclasses polimórficas de Employee [G23].", isCorrect: true },
      { text: "Adicionar comentários Javadoc detalhados acima de cada case do switch.", isCorrect: false },
      { text: "Alinhar as variáveis horizontalmente em colunas dentro de calculatePay().", isCorrect: false },
      { text: "Substituir o switch por uma cadeia de operadores ternários na mesma linha.", isCorrect: false }
    ],
    explanation: "Pela regra 'NO MÁXIMO UM SWITCH' [G23] do Capítulo 3, o switch deve aparecer apenas uma vez dentro de uma Abstract Factory para instanciar objetos polimórficos."
  },
  {
    id: "cc-scen-2",
    title: "Acidente de Trem (Train Wreck) em Diretório Temporário [G36]",
    patternId: "cap-6",
    category: "estrutural",
    difficulty: "facil",
    context: "Diversos módulos do compilador chamam ctxt.getOptions().getScratchDir().getAbsolutePath() para concatenar barras e abrir um BufferedOutputStream. Qualquer mudança na estrutura de Options ou ScratchDir quebra dezenas de classes clientes.",
    requirements: [
      "Eliminar o acoplamento transitivo a três classes internas estranhas (Options, ScratchDir, File).",
      "Aplicar a Lei de Demeter ('Fale apenas com seus amigos imediatos').",
      "Esconder a estrutura interna de dados e expor comportamento significativo."
    ],
    question: "Qual refatoração aplica corretamente o Capítulo 6 (Objetos e Estruturas de Dados)?",
    options: [
      { text: "Pedir diretamente ao objeto colaborador a operação necessária: BufferedOutputStream bos = ctxt.createScratchFileStream(classFileName) [G36].", isCorrect: true },
      { text: "Renomear ctxt para m_ctxt usando Notação Húngara.", isCorrect: false },
      { text: "Retornar null quando getScratchDir() não existir.", isCorrect: false },
      { text: "Tornar todas as variáveis de Options públicas para acessar ctxt.options.scratchDir.path.", isCorrect: false }
    ],
    explanation: "A Lei de Demeter [G36] evita encadeamentos getA().getB().getC(). Em vez de perguntar pelos dados internos para agir, diga diretamente a ctxt o que precisa ser feito."
  },
  {
    id: "cc-scen-3",
    title: "Exceção Usada como Regra de Negócio para Diárias (Cap. 7)",
    patternId: "cap-7",
    category: "estrutural",
    difficulty: "medio",
    context: "No fechamento de despesas, expenseReportDAO.getMeals(employee.getID()) lança MealExpensesNotFound quando o funcionário não apresentou recibos, e o bloco catch soma o valor da diária padrão getMealPerDiem().",
    requirements: [
      "Separar o fluxo principal de negócio de blocos try/catch desnecessários.",
      "Tratar a diária padrão como parte natural do cálculo sem condicionais nem exceções.",
      "Manter o código cliente limpo e direto."
    ],
    question: "Qual padrão recomendado no Capítulo 7 elimina essa exceção de fluxo?",
    options: [
      { text: "Special Case Pattern (Martin Fowler): fazer o DAO retornar uma instância de PerDiemMealExpenses cujo getTotal() devolve a diária padrão.", isCorrect: true },
      { text: "Retornar null no DAO e adicionar if (expenses != null) no cliente.", isCorrect: false },
      { text: "Retornar um código de erro inteiro -1 e verificar com switch.", isCorrect: false },
      { text: "Transformar MealExpensesNotFound em uma Checked Exception obrigatória em todas as camadas.", isCorrect: false }
    ],
    explanation: "O Special Case Pattern encapsula o caso especial ('sem notas -> diária padrão') dentro de um objeto polimórfico PerDiemMealExpenses, reduzindo o cliente a duas linhas limpas."
  },
  {
    id: "cc-scen-4",
    title: "Geração de IDs Duplicados Sob Carga Concorrente (Cap. 13)",
    patternId: "cap-13",
    category: "comportamental",
    difficulty: "dificil",
    context: "Um serviço web utiliza o método getNextId() com return ++lastIdUsed; em uma instância compartilhada. Durante picos de tráfego, duas threads ocasionalmente recebem exatamente o mesmo ID.",
    requirements: [
      "Impedir condições de corrida entre os 12.870 caminhos possíveis de intercalação de bytecode.",
      "Garantir que cada chamada receba um ID único de forma thread-safe.",
      "Isolar a sincronização da lógica de negócio."
    ],
    question: "Qual abordagem do Capítulo 13 resolve essa condição de corrida com máxima eficiência?",
    options: [
      { text: "Substituir o int mutável por AtomicInteger e chamar lastIdUsed.incrementAndGet() (baseado em Compare-And-Swap atômico).", isCorrect: true },
      { text: "Adicionar um comentário // Não chamar simultaneamente acima do método.", isCorrect: false },
      { text: "Trocar ++lastIdUsed por lastIdUsed = lastIdUsed + 1.", isCorrect: false },
      { text: "Ignorar a falha como um evento cósmico isolado.", isCorrect: false }
    ],
    explanation: "++lastIdUsed não é atômico no bytecode da JVM. O uso de AtomicInteger.incrementAndGet() garante atomicidade via instrução CAS sem corrupção de estado."
  },
  {
    id: "cc-scen-5",
    title: "Parser de Linha de Comando com Mapas Paralelos Inchados (Cap. 14)",
    patternId: "cap-14",
    category: "estudos-de-caso",
    difficulty: "dificil",
    context: "Um utilitário de linha de comando (Args) mantém três mapas separados (booleanArgs, stringArgs, intArgs) e dezenas de condicionais if/else repetidas para validar o schema, fazer parse e recuperar valores. Agora a equipe precisa adicionar suporte a Double e String[].",
    requirements: [
      "Eliminar os múltiplos HashMaps paralelos por tipo.",
      "Permitir adicionar novos tipos de argumentos sem modificar o fluxo central de parsing (OCP).",
      "Isolar toda a formatação de mensagens de erro fora da classe principal."
    ],
    question: "Qual arquitetura foi construída por Refinamento Sucessivo no Capítulo 14?",
    options: [
      { text: "Criar a interface polimórfica ArgumentMarshaler com um único Map<Character, ArgumentMarshaler>, usando Iterator<String> e isolando erros em ArgsException.", isCorrect: true },
      { text: "Adicionar mais dois HashMaps (doubleArgs e stringArrayArgs) na mesma classe monolítica.", isCorrect: false },
      { text: "Quebrar todos os testes durante duas semanas para reescrever sem TDD.", isCorrect: false },
      { text: "Armazenar todos os argumentos em uma única String global separada por vírgula.", isCorrect: false }
    ],
    explanation: "A abstração ArgumentMarshaler consolidou os mapas paralelos em um único mapa polimórfico e o isolamento de ArgsException deixou a classe Args limpa e aberta para extensão."
  }
];

export const cleanCodePracticalExercisesData = [
  {
    id: "cc-prac-1",
    patternId: "cap-2",
    title: "Desafio 1: Revelando a Intenção no Campo Minado (Cap. 2 & 3)",
    difficulty: "facil",
    category: "criacional",
    targetPatterns: ["Cap. 02 • Nomes [N1]", "Cap. 03 • Predicado [G28]"],
    scenario: "Refatore o método críptico getThem() abaixo para que os nomes revelem a intenção [N1], o array int[] seja substituído por uma abstração Cell e a condição mágica x[0] == 4 seja encapsulada em um predicado booleano [G25, G28].",
    steps: [
      "Renomear o método getThem() para getFlaggedCells() e theList para gameBoard.",
      "Substituir a estrutura bruta int[] pela classe Cell.",
      "Encapsular a comparação x[0] == 4 no método expressivo cell.isFlagged().",
      "Substituir o nome de ruído list1 por flaggedCells."
    ],
    starterCode: `// CÓDIGO SUJO (ANTES): Refatore para Código Limpo!
public List<int[]> getThem() {
  List<int[]> list1 = new ArrayList<int[]>();
  for (int[] x : theList)
    if (x[0] == 4)
      list1.add(x);
  return list1;
}`,
    hints: [
      "Comece trocando List<int[]> list1 por List<Cell> flaggedCells.",
      "Dentro do for, cada elemento é uma Cell cell : gameBoard.",
      "Crie o método booleano isFlagged() na classe Cell usando uma constante nomeada FLAGGED = 4."
    ],
    referenceSolution: `public class Cell {
  private static final int STATUS_INDEX = 0;
  private static final int FLAGGED = 4;
  private final int[] data;

  public Cell(int[] data) {
    this.data = data;
  }

  public boolean isFlagged() {
    return data[STATUS_INDEX] == FLAGGED;
  }
}

public List<Cell> getFlaggedCells() {
  List<Cell> flaggedCells = new ArrayList<Cell>();
  for (Cell cell : gameBoard) {
    if (cell.isFlagged()) {
      flaggedCells.add(cell);
    }
  }
  return flaggedCells;
}`
  },
  {
    id: "cc-prac-2",
    patternId: "cap-3",
    title: "Desafio 2: Eliminando Argumentos Flag e Condições de Contorno Soltas (Cap. 3 & 17)",
    difficulty: "medio",
    category: "criacional",
    targetPatterns: ["Cap. 03 • Sem Flags [F3]", "Cap. 17 • Contorno [G19, G33]"],
    scenario: "O método processPagination abaixo recebe um argumento flag booleano isExport [F3], usa o número mágico 20 [G25] e espalha aritmética de contorno (page + 1) * 20 no cabeçalho do loop [G19, G33]. Refatore-o!",
    steps: [
      "Dividir a função em duas funções especializadas: exportItems() e renderPage() [F3, G30].",
      "Extrair o número mágico 20 para a constante nomeada PAGE_SIZE [G25].",
      "Encapsular a condição de contorno em nextPageIndex = pageIndex + 1 [G33].",
      "Criar variáveis explicativas startIndex e endIndex antes do loop [G19]."
    ],
    starterCode: `// CÓDIGO SUJO (ANTES): Viola F3, G19, G25, G30 e G33
public void processPagination(List<Item> items, int page, boolean isExport) {
  if (isExport) {
    exportAll(items);
  } else {
    for (int i = page * 20; i < (page + 1) * 20 && i < items.size(); i++) {
      renderItem(items.get(i));
    }
  }
}`,
    hints: [
      "Quando uma função recebe boolean isExport e começa com if (isExport), divida-a em duas funções para que o chamador expresse claramente sua intenção.",
      "Use Math.min(nextPageIndex * PAGE_SIZE, items.size()) guardado na variável explicativa endIndex."
    ],
    referenceSolution: `private static final int PAGE_SIZE = 20;

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
}`
  },
  {
    id: "cc-prac-3",
    patternId: "cap-7",
    title: "Desafio 3: Substituindo Exceção de Fluxo por Special Case Pattern (Cap. 7)",
    difficulty: "medio",
    category: "estrutural",
    targetPatterns: ["Cap. 07 • Special Case", "Sem Prefixos [N6]"],
    scenario: "Elimine o bloco try/catch usado como fluxo de regra de negócio no cálculo de despesas de refeição aplicando o padrão Special Case (Martin Fowler).",
    steps: [
      "Remover o bloco try/catch(MealExpensesNotFound) do código cliente.",
      "Remover o prefixo obsoleto m_ de m_total [N6].",
      "Criar a classe PerDiemMealExpenses implementando MealExpenses.",
      "Fazer getTotal() em PerDiemMealExpenses retornar a diária padrão."
    ],
    starterCode: `// CÓDIGO SUJO (ANTES): Exceção usada como condicional de negócio
try {
  MealExpenses expenses = expenseReportDAO.getMeals(employee.getID());
  m_total += expenses.getTotal();
} catch (MealExpensesNotFound e) {
  m_total += getMealPerDiem();
}`,
    hints: [
      "E se expenseReportDAO.getMeals() sempre retornasse um objeto MealExpenses válido?",
      "Quando não houver notas fiscais, o DAO retorna new PerDiemMealExpenses()."
    ],
    referenceSolution: `// Cliente limpo (sem try/catch e sem prefixo m_):
MealExpenses expenses = expenseReportDAO.getMeals(employee.getID());
total += expenses.getTotal();

// Special Case Object retornado pelo DAO quando não há notas:
public class PerDiemMealExpenses implements MealExpenses {
  public int getTotal() {
    return DEFAULT_PER_DIEM_AMOUNT;
  }
}`
  },
  {
    id: "cc-prac-4",
    patternId: "cap-15",
    title: "Desafio 4: Regra do Escoteiro no ComparisonCompactor do JUnit (Cap. 15)",
    difficulty: "dificil",
    category: "estudos-de-caso",
    targetPatterns: ["Cap. 15 • JUnit", "Heurísticas N6, N7, G28, G31"],
    scenario: "Aplique as refatorações do Capítulo 15 ao método compact() do JUnit: remova os prefixos 'f' [N6], renomeie o método para revelar que ele formata a mensagem [N7], encapsule a condicional na forma positiva [G28, G29] e torne explícito o acoplamento temporal entre prefixo e sufixo [G31].",
    steps: [
      "Remover o prefixo f de fExpected e fActual [N6].",
      "Renomear compact(message) para formatCompactedComparison(message) [N7].",
      "Extrair a condicional positiva if (shouldBeCompacted()) [G28, G29].",
      "Unificar findCommonPrefix() e findCommonSuffix() em findCommonPrefixAndSuffix() [G31]."
    ],
    starterCode: `// CÓDIGO ANTES (JUnit Original):
public String compact(String message) {
  if (fExpected == null || fActual == null || areStringsEqual())
    return Assert.format(message, fExpected, fActual);

  findCommonPrefix();
  findCommonSuffix();
  String expected = compactString(fExpected);
  String actual = compactString(fActual);
  return Assert.format(message, expected, actual);
}`,
    hints: [
      "Comece inicializando compactExpected = expected e compactActual = actual.",
      "Se shouldBeCompacted() for verdadeiro, chame findCommonPrefixAndSuffix() e atualize compactExpected e compactActual.",
      "Finalize com um único return Assert.format(message, compactExpected, compactActual)."
    ],
    referenceSolution: `public String formatCompactedComparison(String message) {
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
}

private void findCommonPrefixAndSuffix() {
  findCommonPrefix();
  suffixLength = 0;
  for (; !suffixOverlapsPrefix(); suffixLength++) {
    if (charFromEnd(expected, suffixLength) != charFromEnd(actual, suffixLength))
      break;
  }
}`
  }
];
