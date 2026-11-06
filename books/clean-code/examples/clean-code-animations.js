/**
 * Especificação de Animação Interativa Passo a Passo para os 17 Capítulos de "Código Limpo" (Clean Code)
 * Compatível com o motor Protocol Explorer (`pattern-visualizer.js`), incluindo Topologia SVG,
 * Pacotes Animados, Call Stack e Inspetor de Estado JSON em Tempo Real.
 */

export const cleanCodeAnimations = {
  "cap-1": {
    code: "C01",
    layerIndex: 1,
    scopeType: "Escoteiro • 5S",
    nodes: [
      { id: "Dev", label: "Developer (Boy Scout)", stereo: "«artisan»", x: 130, y: 100, addr: "0xCC01", methods: ["readCodeRatio10to1()", "applyBoyScoutRule()"] },
      { id: "Legacy", label: "DirtyOrderModule", stereo: "«wading»", x: 440, y: 85, addr: "0xCC02", methods: ["calc(o, t)"] },
      { id: "Clean", label: "CleanOrderService", stereo: "«5S-clean»", x: 440, y: 245, addr: "0xCC03", methods: ["calculateOrderTotal()", "priceWithTax()"] },
      { id: "Suite", label: "UnitTestSuite", stereo: "«safety-net»", x: 750, y: 170, addr: "0xCC04", methods: ["verifyAllGreen()"] }
    ],
    links: [
      { from: "Dev", to: "Legacy", label: "1. lê (proporção 10:1)" },
      { from: "Legacy", to: "Clean", label: "2. refatora (Seiri/Seiso)", style: "dashed" },
      { from: "Dev", to: "Clean", label: "3. entrega limpo" },
      { from: "Clean", to: "Suite", label: "4. valida regressão" }
    ],
    steps: [
      {
        title: "Leitura do Módulo (Proporção 10:1)",
        narration: "O desenvolvedor abre o módulo para uma tarefa. Como passamos >10x mais tempo lendo do que escrevendo, identificadores obscuros ('o', 't', '1.18') causam 'wading' (patinar na lama).",
        from: "Dev", to: "Legacy", call: "inspect(calc(o, t))",
        activeNodes: ["Dev", "Legacy"],
        stack: ["Developer.startTask()", "DirtyOrderModule.calc(o, 1)"],
        state: { readWriteRatio: "10:1", wadingPenalty: "Alta (lentidão progressiva)", leblancLaw: "Later === Never" }
      },
      {
        title: "Diagnóstico 5S (Seiri & Seiso)",
        narration: "Aplicando a filosofia 5S do prefácio, o desenvolvedor identifica números mágicos [G25] e variáveis de 1 letra [N1] que obscurecem a intenção.",
        from: "Legacy", to: "Clean", call: "extractConstants & rename()",
        activeNodes: ["Legacy", "Clean"],
        stack: ["Developer.apply5S()", "Refactor.replaceMagicNumber(1.18, ELECTRONICS_TAX_RATE)"],
        state: { smellsDetected: ["N1: Nomes curtos (o, t, r)", "G25: Número mágico 1.18"], boyScoutAction: "Em progresso" }
      },
      {
        title: "Extração de Método Expressivo",
        narration: "O cálculo unitário é extraído para 'priceWithTax(item, category)', transformando o loop principal em prosa legível (Grady Booch).",
        from: "Dev", to: "Clean", call: "calculateOrderTotal(order, ELECTRONICS)",
        activeNodes: ["Dev", "Clean"],
        stack: ["CleanOrderService.calculateOrderTotal()", "CleanOrderService.priceWithTax(item, ELECTRONICS)"],
        state: { methodExtracted: "priceWithTax()", taxConstant: 1.18, category: "Category.ELECTRONICS" }
      },
      {
        title: "Validação na Rede de Segurança",
        narration: "A suíte de testes unitários confirma que o comportamento externo permaneceu idêntico após a limpeza incremental.",
        from: "Clean", to: "Suite", call: "verifyAllGreen() -> PASS",
        activeNodes: ["Clean", "Suite"],
        stack: ["UnitTestSuite.verifyAllGreen()", "Assert.assertEquals(118.0, total)"],
        state: { testsPassed: 42, coverage: "96%", regressionRisk: "Zero" }
      },
      {
        title: "Regra do Escoteiro Concluída",
        narration: "O acampamento (módulo) foi deixado mais limpo do que quando foi encontrado, preservando a velocidade sustentável da equipe.",
        from: "Suite", to: "Dev", call: "return velocitySustained(95%)",
        activeNodes: ["Dev", "Clean", "Suite"],
        stack: ["Developer.commitCleanCode()"],
        state: { teamVelocity: "Estável (95%)", technicalDebtDelta: "-14%", status: "Acampamento mais limpo" }
      }
    ]
  },

  "cap-2": {
    code: "C02",
    layerIndex: 1,
    scopeType: "Nomes • N1–N7",
    nodes: [
      { id: "Caller", label: "GameController", stereo: "«client»", x: 130, y: 170, addr: "0xCC11", methods: ["renderFlagged()"] },
      { id: "DirtyBoard", label: "getThem(theList)", stereo: "«obscure»", x: 440, y: 80, addr: "0xCC12", methods: ["if (x[0] == 4)"] },
      { id: "CleanBoard", label: "GameBoard", stereo: "«domain»", x: 440, y: 255, addr: "0xCC13", methods: ["getFlaggedCells()"] },
      { id: "Cell", label: "Cell", stereo: "«value-object»", x: 750, y: 255, addr: "0xCC14", methods: ["isFlagged(): boolean"] }
    ],
    links: [
      { from: "Caller", to: "DirtyBoard", label: "antes: ambíguo", style: "dashed" },
      { from: "Caller", to: "CleanBoard", label: "1. getFlaggedCells()" },
      { from: "CleanBoard", to: "Cell", label: "2. cell.isFlagged()" }
    ],
    steps: [
      {
        title: "O Problema do Código Críptico (getThem)",
        narration: "Em 'getThem()', nada é complexo na sintaxe, mas o leitor precisa adivinhar o que é 'theList', o que é 'x[0]' e o que significa o valor 4.",
        from: "Caller", to: "DirtyBoard", call: "getThem() // O que é x[0] == 4?",
        activeNodes: ["Caller", "DirtyBoard"],
        stack: ["GameController.render()", "DirtyBoard.getThem()"],
        state: { identifier: "theList / x[0] == 4", mentalQuestions: ["O que está em theList?", "Por que 4 é importante?"] }
      },
      {
        title: "Revelando a Intenção no Nome [N1]",
        narration: "'theList' é renomeado para 'gameBoard' e o método torna-se 'getFlaggedCells()', respondendo o que faz e por que existe.",
        from: "Caller", to: "CleanBoard", call: "gameBoard.getFlaggedCells()",
        activeNodes: ["Caller", "CleanBoard"],
        stack: ["GameController.renderFlagged()", "GameBoard.getFlaggedCells()"],
        state: { oldName: "getThem()", newName: "getFlaggedCells()", collection: "gameBoard" }
      },
      {
        title: "Encapsulando int[] na Classe Cell",
        narration: "Em vez de manipular um array bruto 'int[] x', cada posição do tabuleiro é representada pelo substantivo de domínio 'Cell'.",
        from: "CleanBoard", to: "Cell", call: "cell.isFlagged()",
        activeNodes: ["CleanBoard", "Cell"],
        stack: ["GameBoard.getFlaggedCells()", "Cell.isFlagged()"],
        state: { cellAddress: "0xCC14", statusConstant: "FLAGGED = 4", isFlagged: true }
      },
      {
        title: "Eliminando Codificações e Ruído [N6]",
        narration: "Prefixos como 'm_' ou 'IShapeFactory' são descartados para manter os identificadores pronunciáveis e pesquisáveis.",
        from: "Cell", to: "CleanBoard", call: "return true",
        activeNodes: ["CleanBoard", "Cell"],
        stack: ["GameBoard.getFlaggedCells()"],
        state: { hungarianNotation: "Removida", searchableConstants: ["FLAGGED", "WORK_DAYS_PER_WEEK"] }
      },
      {
        title: "Leitura Fluente Concluída",
        narration: "O controlador recebe 'List<Cell> flaggedCells' sem precisar de nenhum comentário explicativo.",
        from: "CleanBoard", to: "Caller", call: "return flaggedCells (3 cells)",
        activeNodes: ["Caller", "CleanBoard"],
        stack: ["GameController.renderFlagged()"],
        state: { returnedType: "List<Cell>", count: 3, commentsNeeded: 0 }
      }
    ]
  },

  "cap-3": {
    code: "C03",
    layerIndex: 1,
    scopeType: "Funções • Stepdown",
    nodes: [
      { id: "Client", label: "PayrollService", stereo: "«high-level»", x: 130, y: 170, addr: "0xCC21", methods: ["runPayroll(record)"] },
      { id: "Factory", label: "EmployeeFactoryImpl", stereo: "«abstract-factory»", x: 430, y: 80, addr: "0xCC22", methods: ["makeEmployee(r)"] },
      { id: "Emp", label: "Employee (Abstract)", stereo: "«interface»", x: 430, y: 255, addr: "0xCC23", methods: ["isPayday()", "calculatePay()"] },
      { id: "Hourly", label: "HourlyEmployee", stereo: "«concrete»", x: 750, y: 255, addr: "0xCC24", methods: ["calculatePay(): Money"] }
    ],
    links: [
      { from: "Client", to: "Factory", label: "1. makeEmployee(r)" },
      { from: "Factory", to: "Hourly", label: "2. switch único instancia", style: "dashed" },
      { from: "Client", to: "Emp", label: "3. calculatePay()" },
      { from: "Emp", to: "Hourly", label: "4. polimorfismo" }
    ],
    steps: [
      {
        title: "Nível Alto de Abstração (Regra Decrescente)",
        narration: "PayrollService atua no nível mais alto de abstração e delega a criação para EmployeeFactory sem conhecer detalhes do tipo.",
        from: "Client", to: "Factory", call: "makeEmployee(record)",
        activeNodes: ["Client", "Factory"],
        stack: ["PayrollService.runPayroll()", "EmployeeFactoryImpl.makeEmployee(r)"],
        state: { abstractionLevel: "Alto", recordType: "HOURLY", flagArguments: 0 }
      },
      {
        title: "Escondendo o Único Switch na Fábrica [G23]",
        narration: "O switch(r.type) fica enterrado dentro de EmployeeFactoryImpl e nunca se repete em calculatePay() ou isPayday().",
        from: "Factory", to: "Hourly", call: "new HourlyEmployee(r)",
        activeNodes: ["Factory", "Hourly"],
        stack: ["EmployeeFactoryImpl.makeEmployee()", "HourlyEmployee.<init>()"],
        state: { switchLocation: "Isolado na Factory", createdInstance: "HourlyEmployee@0xCC24" }
      },
      {
        title: "Consulta Separada de Comando (CQS)",
        narration: "Seguindo Command Query Separation, 'isPayday()' apenas responde uma consulta booleana sem efeitos colaterais ocultos.",
        from: "Client", to: "Emp", call: "employee.isPayday() -> true",
        activeNodes: ["Client", "Emp"],
        stack: ["PayrollService.runPayroll()", "Employee.isPayday()"],
        state: { cqsCompliance: true, sideEffects: "Nenhum", isPayday: true }
      },
      {
        title: "Despacho Polimórfico (Uma Coisa Só [G30])",
        narration: "A chamada 'employee.calculatePay()' executa exclusivamente o cálculo de horista em uma função curta de 3 linhas.",
        from: "Emp", to: "Hourly", call: "calculatePay()",
        activeNodes: ["Emp", "Hourly"],
        stack: ["PayrollService.runPayroll()", "HourlyEmployee.calculatePay()"],
        state: { hoursWorked: 40, hourlyRate: 85.0, calculatedPay: "R$ 3.400,00" }
      },
      {
        title: "Retorno Limpo ao Chamador",
        narration: "O pagamento é calculado e entregue mantendo SRP, OCP e um único nível de abstração por método.",
        from: "Hourly", to: "Client", call: "return Money(3400.00)",
        activeNodes: ["Client", "Hourly"],
        stack: ["PayrollService.runPayroll()"],
        state: { srpCompliant: true, ocpCompliant: true, result: "R$ 3.400,00" }
      }
    ]
  },

  "cap-4": {
    code: "C04",
    layerIndex: 1,
    scopeType: "Comentários • C1–C5",
    nodes: [
      { id: "Reviewer", label: "CodeReviewer", stereo: "«auditor»", x: 130, y: 170, addr: "0xCC31", methods: ["auditComments()"] },
      { id: "Noisy", label: "CommentedBlock", stereo: "«smells-C1-C5»", x: 430, y: 80, addr: "0xCC32", methods: ["// check flags & age", "// oldCode()"] },
      { id: "Expressive", label: "EmployeeDomain", stereo: "«self-documenting»", x: 430, y: 255, addr: "0xCC33", methods: ["isEligibleForFullBenefits()"] },
      { id: "Git", label: "GitHistory", stereo: "«vcs»", x: 750, y: 170, addr: "0xCC34", methods: ["preserveDeletedLines()"] }
    ],
    links: [
      { from: "Reviewer", to: "Noisy", label: "1. detecta C3 e C5" },
      { from: "Noisy", to: "Git", label: "2. remove código morto", style: "dashed" },
      { from: "Reviewer", to: "Expressive", label: "3. extrai predicado [G28]" }
    ],
    steps: [
      {
        title: "Detecção de Comentário Compensatório",
        narration: "O revisor encontra '// Verifica se tem direito a benefícios' acima de '(flags & HOURLY_FLAG) && age > 65' e código antigo comentado [C5].",
        from: "Reviewer", to: "Noisy", call: "scanSmells(C1..C5)",
        activeNodes: ["Reviewer", "Noisy"],
        stack: ["CodeReviewer.auditComments()"],
        state: { detectedSmells: ["C3: Comentário explicando expressão ruim", "C5: Código comentado"], truthSource: "Apenas o código" }
      },
      {
        title: "Remoção de Código Comentado [C5]",
        narration: "O código comentado é apagado imediatamente; o controle de versão (Git) já preserva todo o histórico e autoria [C1].",
        from: "Noisy", to: "Git", call: "deleteCommentedOutCode()",
        activeNodes: ["Noisy", "Git"],
        stack: ["CodeReviewer.removeClutter()", "GitHistory.preserveCommit()"],
        state: { c5Removed: true, gitCommitRef: "a8f921c", clutterLinesDeleted: 14 }
      },
      {
        title: "Transformando o Comentário em Método [G28]",
        narration: "O texto do comentário vira o próprio nome do método booleano 'employee.isEligibleForFullBenefits()'.",
        from: "Reviewer", to: "Expressive", call: "extractMethod(isEligibleForFullBenefits)",
        activeNodes: ["Reviewer", "Expressive"],
        stack: ["EmployeeDomain.isEligibleForFullBenefits()"],
        state: { conditionEncapsulated: "isEligibleForFullBenefits()", commentDeleted: true }
      },
      {
        title: "Preservação Apenas de Alertas Legítimos",
        narration: "Apenas comentários cirúrgicos (como alerta de que SimpleDateFormat não é thread-safe) permanecem quando o código não pode expressar isso sozinho.",
        from: "Expressive", to: "Reviewer", call: "return cleanAndExpressive",
        activeNodes: ["Reviewer", "Expressive"],
        stack: ["CodeReviewer.verifyReadability()"],
        state: { remainingComments: 0, codeExpressiveness: "100%", liesEliminated: true }
      },
      {
        title: "Código Autoexplicativo Validado",
        narration: "A condicional agora lê como texto humano sem risco de o comentário envelhecer e mentir [C2].",
        from: "Expressive", to: "Git", call: "commitCleanPredicate()",
        activeNodes: ["Expressive", "Git"],
        stack: ["GitHistory.recordCleanState()"],
        state: { finalExpression: "if (employee.isEligibleForFullBenefits())", status: "Limpo" }
      }
    ]
  },

  "cap-5": {
    code: "C05",
    layerIndex: 1,
    scopeType: "Formatação • Jornal",
    nodes: [
      { id: "Headline", label: "Cabeçalho (Manchete)", stereo: "«newspaper-top»", x: 140, y: 90, addr: "0xCC41", methods: ["class FitNesseExpediter"] },
      { id: "Synopsis", label: "Métodos Públicos (Sinopse)", stereo: "«high-level»", x: 440, y: 90, addr: "0xCC42", methods: ["sendResponse()", "parseRequest()"] },
      { id: "Callee", label: "Métodos Privados (Detalhes)", stereo: "«stepdown-G10»", x: 440, y: 250, addr: "0xCC43", methods: ["validateHeader()", "writeBytes()"] },
      { id: "TeamRule", label: "Formatter da Equipe", stereo: "«G24-standard»", x: 750, y: 170, addr: "0xCC44", methods: ["enforce80to120Cols()"] }
    ],
    links: [
      { from: "Headline", to: "Synopsis", label: "1. abertura vertical" },
      { from: "Synopsis", to: "Callee", label: "2. chamador acima do chamado [G10]" },
      { from: "Callee", to: "TeamRule", label: "3. convenção única [G24]" }
    ],
    steps: [
      {
        title: "A Manchete do Jornal (Topo do Arquivo)",
        narration: "O nome da classe e suas variáveis privadas de instância ficam no topo, anunciando imediatamente o tema do módulo.",
        from: "Headline", to: "Synopsis", call: "readHeadline(FitNesseExpediter)",
        activeNodes: ["Headline", "Synopsis"],
        stack: ["Reader.scanTopOfFile()"],
        state: { fileLines: 95, maxLineLength: 100, horizontalAlignment: "Desativado" }
      },
      {
        title: "Sinopse Executiva (Funções Públicas)",
        narration: "Logo após os atributos, os métodos públicos apresentam o resumo de alto nível do que a classe faz, separados por linhas em branco (abertura vertical).",
        from: "Synopsis", to: "Callee", call: "sendResponse() -> validateHeader()",
        activeNodes: ["Synopsis", "Callee"],
        stack: ["FitNesseExpediter.sendResponse()", "FitNesseExpediter.validateHeader()"],
        state: { callerLine: 28, calleeLine: 36, verticalDistance: "8 linhas (Imediata)" }
      },
      {
        title: "Proximidade Vertical e Afinidade Conceitual [G10]",
        narration: "O método privado chamado fica posicionado imediatamente abaixo do método público que o invoca, evitando saltos pelo arquivo.",
        from: "Callee", to: "Synopsis", call: "return headerValid",
        activeNodes: ["Synopsis", "Callee"],
        stack: ["FitNesseExpediter.sendResponse()"],
        state: { conceptualAffinity: "Alta", callerAboveCallee: true }
      },
      {
        title: "Regras Coletivas da Equipe [G24]",
        narration: "Toda a equipe adota a mesma indentação, largura máxima (<120 colunas) e posicionamento de chaves, eliminando estilos individuais conflitantes.",
        from: "Callee", to: "TeamRule", call: "enforceTeamFormatting()",
        activeNodes: ["Callee", "TeamRule"],
        stack: ["TeamFormatter.checkStyle()"],
        state: { indentationPreserved: true, columnAlignmentSmell: "Eliminado", teamConsistency: "100%" }
      },
      {
        title: "Leitura Vertical Fluida Concluída",
        narration: "Qualquer membro do time compreende o arquivo nos primeiros 15 segundos de leitura de cima para baixo.",
        from: "TeamRule", to: "Headline", call: "return formattedFile",
        activeNodes: ["Headline", "Synopsis", "Callee", "TeamRule"],
        stack: ["Reader.completeScan()"],
        state: { readabilityScore: "A+", scrollHorizontal: "Zero" }
      }
    ]
  },

  "cap-6": {
    code: "C06",
    layerIndex: 2,
    scopeType: "Demeter • Objetos",
    nodes: [
      { id: "Client", label: "CompilerModule", stereo: "«caller»", x: 130, y: 170, addr: "0xCC51", methods: ["compileClass()"] },
      { id: "Wreck", label: "ctxt.getOptions().getScratchDir()", stereo: "«train-wreck-G36»", x: 440, y: 75, addr: "0xCC52", methods: ["getAbsolutePath()"] },
      { id: "Context", label: "CompilationContext", stereo: "«shy-object»", x: 440, y: 255, addr: "0xCC53", methods: ["createScratchFileStream()"] },
      { id: "Stream", label: "BufferedOutputStream", stereo: "«collaborator»", x: 750, y: 255, addr: "0xCC54", methods: ["writeBytecode()"] }
    ],
    links: [
      { from: "Client", to: "Wreck", label: "antes: acoplado a 3 classes", style: "dashed" },
      { from: "Client", to: "Context", label: "1. Tell, Don't Ask [G36]" },
      { from: "Context", to: "Stream", label: "2. encapsula criação" }
    ],
    steps: [
      {
        title: "O Acidente de Trem (Train Wreck [G36])",
        narration: "Chamar 'ctxt.getOptions().getScratchDir().getAbsolutePath()' viola a Lei de Demeter porque força o cliente a navegar por três objetos estranhos.",
        from: "Client", to: "Wreck", call: "getOptions().getScratchDir().getAbsolutePath()",
        activeNodes: ["Client", "Wreck"],
        stack: ["CompilerModule.compile()", "Options.getScratchDir()", "File.getAbsolutePath()"],
        state: { coupledClasses: ["Context", "Options", "ScratchDir"], demeterViolation: true }
      },
      {
        title: "Aplicando 'Diga, Não Pergunte' (Tell, Don't Ask)",
        narration: "Em vez de perguntar pelo diretório interno para abrir um arquivo, o cliente pede ao objeto amigo 'ctxt' que realize a operação diretamente.",
        from: "Client", to: "Context", call: "ctxt.createScratchFileStream(classFileName)",
        activeNodes: ["Client", "Context"],
        stack: ["CompilerModule.compileClass()", "CompilationContext.createScratchFileStream()"],
        state: { directCollaboratorOnly: "CompilationContext", internalDataHidden: true }
      },
      {
        title: "Encapsulamento Interno no Contexto",
        narration: "CompilationContext usa seus próprios dados internos para construir o BufferedOutputStream sem expor Options ou ScratchDir.",
        from: "Context", to: "Stream", call: "new BufferedOutputStream(fout)",
        activeNodes: ["Context", "Stream"],
        stack: ["CompilationContext.createScratchFileStream()", "BufferedOutputStream.<init>()"],
        state: { streamAddress: "0xCC54", exposedGetters: 0 }
      },
      {
        title: "Entrega do Recurso Pronto ao Cliente",
        narration: "O cliente recebe o stream pronto para escrita, mantendo acoplamento mínimo (código tímido / Shy Code).",
        from: "Context", to: "Client", call: "return bos",
        activeNodes: ["Client", "Context", "Stream"],
        stack: ["CompilerModule.compileClass()"],
        state: { couplingCount: 1, lawOfDemeter: "Respeitada [G36]" }
      },
      {
        title: "Anti-Simetria Objeto vs. Estrutura Preservada",
        narration: "O objeto de domínio esconde seus dados e expõe abstrações comportamentais claras.",
        from: "Client", to: "Stream", call: "bos.writeBytecode()",
        activeNodes: ["Client", "Stream"],
        stack: ["CompilerModule.compileClass()", "BufferedOutputStream.writeBytecode()"],
        state: { hybridSmell: "Nenhum", dataAbstraction: "Completa" }
      }
    ]
  },

  "cap-7": {
    code: "C07",
    layerIndex: 2,
    scopeType: "Erros • Special Case",
    nodes: [
      { id: "Report", label: "ExpenseReportService", stereo: "«client»", x: 130, y: 170, addr: "0xCC61", methods: ["addMealExpenses(empId)"] },
      { id: "DAO", label: "ExpenseReportDAO", stereo: "«repository»", x: 430, y: 170, addr: "0xCC62", methods: ["getMeals(empId): MealExpenses"] },
      { id: "PerDiem", label: "PerDiemMealExpenses", stereo: "«special-case»", x: 750, y: 95, addr: "0xCC63", methods: ["getTotal(): 65"] },
      { id: "Wrapper", label: "LocalPort (Wrapper)", stereo: "«adapter-port»", x: 750, y: 255, addr: "0xCC64", methods: ["open() throws PortFailure"] }
    ],
    links: [
      { from: "Report", to: "DAO", label: "1. getMeals(empId)" },
      { from: "DAO", to: "PerDiem", label: "2. sem notas -> Special Case" },
      { from: "Report", to: "Wrapper", label: "3. isola API externa" }
    ],
    steps: [
      {
        title: "Consulta Sem Try/Catch de Negócio",
        narration: "O serviço solicita as despesas de refeição ao DAO. Não há blocos try/catch nem verificações 'if (expenses != null)' poluindo a regra de negócio.",
        from: "Report", to: "DAO", call: "expenseReportDAO.getMeals(empId)",
        activeNodes: ["Report", "DAO"],
        stack: ["ExpenseReportService.addMealExpenses()", "ExpenseReportDAO.getMeals()"],
        state: { employeeId: "EMP-404", receiptsFound: false, nullReturned: false }
      },
      {
        title: "Instanciação do Special Case Object",
        narration: "Como o funcionário não apresentou notas, o DAO retorna uma instância de 'PerDiemMealExpenses' (Special Case Pattern de Martin Fowler) em vez de lançar exceção ou retornar null.",
        from: "DAO", to: "PerDiem", call: "new PerDiemMealExpenses()",
        activeNodes: ["DAO", "PerDiem"],
        stack: ["ExpenseReportDAO.getMeals()", "PerDiemMealExpenses.<init>()"],
        state: { pattern: "Special Case", returnedObject: "PerDiemMealExpenses@0xCC63" }
      },
      {
        title: "Cálculo Polimórfico Transparente",
        narration: "O cliente executa 'total += expenses.getTotal()' normalmente; o objeto Special Case devolve o valor da diária padrão (65).",
        from: "PerDiem", to: "Report", call: "getTotal() -> 65",
        activeNodes: ["Report", "PerDiem"],
        stack: ["ExpenseReportService.addMealExpenses()", "PerDiemMealExpenses.getTotal()"],
        state: { mealTotalAdded: 65, tryCatchBlocksInClient: 0 }
      },
      {
        title: "Empacotamento de Exceções de Terceiros (LocalPort)",
        narration: "Ao comunicar com portas externas (ACMEPort), a classe Wrapper 'LocalPort' captura as 3 exceções de biblioteca e traduz para uma única exceção unchecked de domínio.",
        from: "Report", to: "Wrapper", call: "localPort.open()",
        activeNodes: ["Report", "Wrapper"],
        stack: ["ExpenseReportService.sync()", "LocalPort.open()"],
        state: { thirdPartyVendor: "ACMEPort (Isolado)", domainException: "PortDeviceFailure (Unchecked)" }
      },
      {
        title: "Fluxo Principal 100% Limpo e Desacoplado",
        narration: "A lógica de negócio e o tratamento de erro permanecem independentes, sem retornos nulos e sem Checked Exceptions quebrando o OCP.",
        from: "Wrapper", to: "Report", call: "return connectionReady",
        activeNodes: ["Report", "PerDiem", "Wrapper"],
        stack: ["ExpenseReportService.complete()"],
        state: { nullChecks: 0, checkedExceptions: 0, status: "Resiliente" }
      }
    ]
  },

  "cap-8": {
    code: "C08",
    layerIndex: 2,
    scopeType: "Fronteiras • Adapter",
    nodes: [
      { id: "Domain", label: "CommunicationsController", stereo: "«domain-core»", x: 130, y: 170, addr: "0xCC71", methods: ["sendVoice(freq, stream)"] },
      { id: "Port", label: "Transmitter (Interface)", stereo: "«boundary»", x: 430, y: 95, addr: "0xCC72", methods: ["transmit(freq, stream)"] },
      { id: "Adapter", label: "TransmitterAdapter", stereo: "«adapter»", x: 750, y: 95, addr: "0xCC73", methods: ["transmit() -> API Externa"] },
      { id: "Sensors", label: "Sensors (Map Wrapper)", stereo: "«encapsulated»", x: 430, y: 255, addr: "0xCC74", methods: ["getById(id): Sensor"] }
    ],
    links: [
      { from: "Domain", to: "Port", label: "1. usa interface própria" },
      { from: "Port", to: "Adapter", label: "2. conecta pacote externo" },
      { from: "Domain", to: "Sensors", label: "3. esconde java.util.Map" }
    ],
    steps: [
      {
        title: "Encapsulando Coleções Genéricas na Fronteira",
        narration: "Em vez de passar 'Map<String, Sensor>' livremente pelo sistema (expondo clear() e remove()), a classe 'Sensors' encapsula o Map e oferece apenas 'getById(id)'.",
        from: "Domain", to: "Sensors", call: "sensors.getById('TEMP-01')",
        activeNodes: ["Domain", "Sensors"],
        stack: ["CommunicationsController.readSensor()", "Sensors.getById('TEMP-01')"],
        state: { rawMapExposed: false, allowedOperations: ["getById"], unsafeClearBlocked: true }
      },
      {
        title: "Programando para a Interface que Gostaríamos de Ter",
        narration: "Mesmo quando a API de rádio de terceiros não existe, o domínio conversa apenas com sua própria interface limpa 'Transmitter'.",
        from: "Domain", to: "Port", call: "transmitter.transmit(freq, stream)",
        activeNodes: ["Domain", "Port"],
        stack: ["CommunicationsController.sendVoice()", "Transmitter.transmit()"],
        state: { boundaryInterface: "Transmitter", domainBlockedByVendor: false }
      },
      {
        title: "Tradução Isolada no TransmitterAdapter",
        narration: "Quando a biblioteca externa fica pronta, 'TransmitterAdapter' concentra toda a tradução de parâmetros e tipos em um único ponto.",
        from: "Port", to: "Adapter", call: "delegateToVendorAPI()",
        activeNodes: ["Port", "Adapter"],
        stack: ["TransmitterAdapter.transmit()", "VendorRadioAPI.sendRawPacket()"],
        state: { adapterLocation: "0xCC73", vendorCouplingPoints: 1 }
      },
      {
        title: "Validação com Testes de Aprendizado (Learning Tests)",
        narration: "Uma suíte de Learning Tests verifica o comportamento da biblioteca externa isoladamente, detectando qualquer incompatibilidade em futuras atualizações.",
        from: "Adapter", to: "Port", call: "learningTestsPass() -> OK",
        activeNodes: ["Port", "Adapter"],
        stack: ["LearningTestSuite.verifyVendorUpgrade()"],
        state: { learningTests: "Passando", upgradeSafety: "Garantida gratuitamente" }
      },
      {
        title: "Fronteira Limpa e Protegida",
        narration: "O núcleo de negócio permanece blindado contra mudanças em pacotes externos.",
        from: "Port", to: "Domain", call: "return transmissionComplete",
        activeNodes: ["Domain", "Port", "Sensors"],
        stack: ["CommunicationsController.sendVoice()"],
        state: { boundaryHealth: "100% Isolada", status: "Concluído" }
      }
    ]
  },

  "cap-9": {
    code: "C09",
    layerIndex: 2,
    scopeType: "TDD • F.I.R.S.T.",
    nodes: [
      { id: "Red", label: "1. Teste Falhando (RED)", stereo: "«1st-law-TDD»", x: 130, y: 95, addr: "0xCC81", methods: ["makePages()", "submitRequest()"] },
      { id: "Green", label: "2. Código Mínimo (GREEN)", stereo: "«3rd-law-TDD»", x: 440, y: 95, addr: "0xCC82", methods: ["SerializedPageResponder"] },
      { id: "Refactor", label: "3. Limpeza (REFACTOR)", stereo: "«DSL-check»", x: 750, y: 95, addr: "0xCC83", methods: ["assertResponseContains()"] },
      { id: "FIRST", label: "Validador F.I.R.S.T.", stereo: "«T1–T9»", x: 440, y: 255, addr: "0xCC84", methods: ["Fast, Independent, Repeatable"] }
    ],
    links: [
      { from: "Red", to: "Green", label: "1. ciclo de 30s" },
      { from: "Green", to: "Refactor", label: "2. passa no teste" },
      { from: "Refactor", to: "FIRST", label: "3. Build-Operate-Check" },
      { from: "FIRST", to: "Red", label: "4. próximo conceito", style: "dashed" }
    ],
    steps: [
      {
        title: "1ª e 2ª Leis do TDD: Escrever o Teste Antes (RED)",
        narration: "Antes de qualquer linha de produção, escrevemos um teste curto usando a DSL de domínio no padrão BUILD-OPERATE-CHECK.",
        from: "Red", to: "Green", call: "makePages('PageOne') -> FAIL",
        activeNodes: ["Red", "Green"],
        stack: ["PageHierarchyTest.testGetHierarchyAsXml()", "DSL.makePages()"],
        state: { tddPhase: "RED", pattern: "BUILD-OPERATE-CHECK", conceptsInTest: 1 }
      },
      {
        title: "3ª Lei do TDD: Código de Produção Suficiente (GREEN)",
        narration: "Escrevemos apenas o código de produção necessário em SerializedPageResponder para fazer o teste passar.",
        from: "Green", to: "Refactor", call: "submitRequest('root', 'type:pages') -> PASS",
        activeNodes: ["Green", "Refactor"],
        stack: ["SerializedPageResponder.makeResponse()"],
        state: { tddPhase: "GREEN", responseType: "text/xml", executionTimeMs: 4 }
      },
      {
        title: "Refatoração e Limpeza da DSL de Teste (REFACTOR)",
        narration: "Com o teste verde, limpamos duplicações tanto no código de produção quanto no próprio teste ('assertResponseContains').",
        from: "Refactor", to: "FIRST", call: "assertResponseContains('<name>PageOne</name>')",
        activeNodes: ["Refactor", "FIRST"],
        stack: ["DSL.assertResponseIsXML()", "DSL.assertResponseContains()"],
        state: { tddPhase: "REFACTOR", linesInTestMethod: 4, readability: "Máxima" }
      },
      {
        title: "Auditoria contra as 5 Regras F.I.R.S.T.",
        narration: "O teste é validado como Rápido (4ms), Independente (sem estado compartilhado), Repetível (sem rede externa), Auto-validável (booleano) e Oportuno.",
        from: "FIRST", to: "Red", call: "verifyFIRSTCompliance() -> 5/5",
        activeNodes: ["FIRST", "Red"],
        stack: ["FIRSTValidator.auditSuite()"],
        state: { Fast: true, Independent: true, Repeatable: true, SelfValidating: true, Timely: true }
      },
      {
        title: "Rede de Segurança Pronta para Evolução",
        narration: "A suíte limpa permite refatorar qualquer parte da arquitetura sem medo de regressões.",
        from: "Red", to: "FIRST", call: "suiteGreen(100%)",
        activeNodes: ["Red", "Green", "Refactor", "FIRST"],
        stack: ["TestRunner.finish()"],
        state: { totalTests: 128, suiteDuration: "0.42s", fearOfChange: "Zero" }
      }
    ]
  },

  "cap-10": {
    code: "C10",
    layerIndex: 3,
    scopeType: "Classes • SRP/DIP",
    nodes: [
      { id: "Client", label: "Portfolio", stereo: "«domain-srp»", x: 130, y: 170, addr: "0xCC91", methods: ["getTotalValue()"] },
      { id: "Interface", label: "StockExchange", stereo: "«abstraction-DIP»", x: 440, y: 95, addr: "0xCC92", methods: ["currentPrice(symbol)"] },
      { id: "Stub", label: "FixedStockExchangeStub", stereo: "«test-double»", x: 750, y: 95, addr: "0xCC93", methods: ["currentPrice() -> $100"] },
      { id: "Sql", label: "InsertSql extends Sql", stereo: "«cohesive-OCP»", x: 440, y: 255, addr: "0xCC94", methods: ["generate(): String"] }
    ],
    links: [
      { from: "Client", to: "Interface", label: "1. depende de abstração (DIP)" },
      { from: "Interface", to: "Stub", label: "2. injetado no teste" },
      { from: "Client", to: "Sql", label: "3. classes pequenas (SRP/OCP)" }
    ],
    steps: [
      {
        title: "Medindo Classes por Responsabilidades (SRP)",
        narration: "Portfolio tem um único motivo para mudar: a regra de cálculo da carteira. Ele não conhece detalhes de rede da bolsa de Tóquio.",
        from: "Client", to: "Interface", call: "exchange.currentPrice('AAPL')",
        activeNodes: ["Client", "Interface"],
        stack: ["Portfolio.getTotalValue()", "StockExchange.currentPrice('AAPL')"],
        state: { reasonsToChange: 1, cohesion: "Alta", concreteCoupling: "Zero" }
      },
      {
        title: "Inversão de Dependência (DIP) em Ação",
        narration: "Através da interface 'StockExchange', o teste injeta 'FixedStockExchangeStub', garantindo cotação determinística de $100.",
        from: "Interface", to: "Stub", call: "currentPrice('AAPL') -> $100",
        activeNodes: ["Interface", "Stub"],
        stack: ["FixedStockExchangeStub.currentPrice('AAPL')"],
        state: { injectedImplementation: "FixedStockExchangeStub", symbol: "AAPL", price: 100 }
      },
      {
        title: "Cálculo Determinístico do Portfólio",
        narration: "Com 5 ações a $100, Portfolio calcula $500 de forma instantânea e 100% isolada de flutuações externas.",
        from: "Stub", to: "Client", call: "return Money(500)",
        activeNodes: ["Client", "Stub"],
        stack: ["Portfolio.getTotalValue()"],
        state: { shares: 5, totalPortfolioValue: "$500.00" }
      },
      {
        title: "Aberto para Extensão, Fechado para Modificação (OCP)",
        narration: "Para persistir a operação, em vez de uma classe monolítica 'Sql', usamos a subclasse coesa 'InsertSql' que implementa 'generate()'.",
        from: "Client", to: "Sql", call: "new InsertSql(table, cols, fields).generate()",
        activeNodes: ["Client", "Sql"],
        stack: ["InsertSql.generate()"],
        state: { sqlClass: "InsertSql", ocpStatus: "Adicionar UpdateSql não altera InsertSql" }
      },
      {
        title: "Arquitetura de Classes Coesas Concluída",
        narration: "Muitas classes pequenas e bem rotuladas mantêm o sistema organizado em 'gavetas precisas' com SRP, OCP e DIP.",
        from: "Sql", to: "Client", call: "return 'INSERT INTO portfolio...'",
        activeNodes: ["Client", "Interface", "Sql"],
        stack: ["Portfolio.saveSnapshot()"],
        state: { srp: true, ocp: true, dip: true }
      }
    ]
  },

  "cap-11": {
    code: "C11",
    layerIndex: 3,
    scopeType: "Sistemas • DI & AOP",
    nodes: [
      { id: "Main", label: "Main / DI Container", stereo: "«construction»", x: 130, y: 170, addr: "0xCCA1", methods: ["wireDependencies()"] },
      { id: "Proxy", label: "TransactionalProxy (AOP)", stereo: "«cross-cutting»", x: 430, y: 90, addr: "0xCCA2", methods: ["invokeWithTx()"] },
      { id: "Pojo", label: "OrderProcessor (POJO)", stereo: "«pure-domain»", x: 430, y: 255, addr: "0xCCA3", methods: ["process(order)"] },
      { id: "Service", label: "BillingService", stereo: "«injected»", x: 750, y: 255, addr: "0xCCA4", methods: ["charge(order)"] }
    ],
    links: [
      { from: "Main", to: "Pojo", label: "1. injeta dependências (DI)" },
      { from: "Main", to: "Proxy", label: "2. aplica aspecto transacional" },
      { from: "Proxy", to: "Pojo", label: "3. delega para POJO puro" },
      { from: "Pojo", to: "Service", label: "4. usa serviço injetado" }
    ],
    steps: [
      {
        title: "Separação entre Construção e Uso",
        narration: "O módulo Main / Container de DI instancia os serviços concretos e monta o grafo de objetos fora da lógica de negócio.",
        from: "Main", to: "Pojo", call: "new OrderProcessor(billingService)",
        activeNodes: ["Main", "Pojo"],
        stack: ["Main.bootstrap()", "OrderProcessor.<init>(billingService)"],
        state: { constructionSeparated: true, lazyInitCoupling: "Eliminado" }
      },
      {
        title: "Envolvimento de Preocupações Transversais (AOP / Proxy)",
        narration: "Transações, segurança e logging são configurados via Proxy/Decorator sem poluir o código do POJO de domínio.",
        from: "Main", to: "Proxy", call: "wrapWithTransactionProxy(processor)",
        activeNodes: ["Main", "Proxy"],
        stack: ["DIContainer.createProxy()", "TransactionalProxy.<init>()"],
        state: { crossCuttingConcerns: ["Transaction", "AuditLog"], pojoPollution: "Zero" }
      },
      {
        title: "Interceptação Transparente pelo Aspecto",
        narration: "Quando um pedido chega, o Proxy abre a transação automaticamente e repassa a chamada para o POJO limpo.",
        from: "Proxy", to: "Pojo", call: "beginTx() -> processor.process(order)",
        activeNodes: ["Proxy", "Pojo"],
        stack: ["TransactionalProxy.invoke()", "OrderProcessor.process(order)"],
        state: { transactionState: "ACTIVE", domainObject: "Pure POJO" }
      },
      {
        title: "Execução de Domínio Pura",
        narration: "OrderProcessor invoca 'billingService.charge(order)' sem saber se está rodando com Stripe real ou um Fake de teste.",
        from: "Pojo", to: "Service", call: "billingService.charge(order)",
        activeNodes: ["Pojo", "Service"],
        stack: ["OrderProcessor.process()", "BillingService.charge()"],
        state: { orderId: "ORD-901", chargedAmount: "R$ 420,00" }
      },
      {
        title: "Commit Transacional e Entrega",
        narration: "O Proxy finaliza o commit da transação, demonstrando como POJOs simples escalam sem o peso de containers intrusivos.",
        from: "Proxy", to: "Main", call: "commitTx() -> Receipt#901",
        activeNodes: ["Main", "Proxy", "Pojo", "Service"],
        stack: ["TransactionalProxy.commit()"],
        state: { transactionState: "COMMITTED", receipt: "Receipt#901" }
      }
    ]
  },

  "cap-12": {
    code: "C12",
    layerIndex: 3,
    scopeType: "Emergência • 4 Regras",
    nodes: [
      { id: "R1", label: "1. Roda Todos os Testes", stereo: "«priority-1»", x: 130, y: 95, addr: "0xCCB1", methods: ["verifyTestableDesign()"] },
      { id: "R2", label: "2. Zero Duplicação (DRY)", stereo: "«priority-2»", x: 430, y: 95, addr: "0xCCB2", methods: ["VacationPolicy (Template)"] },
      { id: "R3", label: "3. Expressa Intenção", stereo: "«priority-3»", x: 430, y: 255, addr: "0xCCB3", methods: ["alterToLegalMinimums()"] },
      { id: "R4", label: "4. Minimiza Classes/Métodos", stereo: "«priority-4»", x: 750, y: 175, addr: "0xCCB4", methods: ["avoidDogmatism()"] }
    ],
    links: [
      { from: "R1", to: "R2", label: "1. habilita refatoração" },
      { from: "R2", to: "R3", label: "2. extrai Template Method" },
      { from: "R3", to: "R4", label: "3. mantém simplicidade" }
    ],
    steps: [
      {
        title: "Regra 1 (Prioridade Máxima): Executa Todos os Testes",
        narration: "Garantir que o sistema inteiro seja testável força automaticamente classes pequenas (SRP) e desacopladas (DIP).",
        from: "R1", to: "R2", call: "runAllTests() -> 100% PASS",
        activeNodes: ["R1", "R2"],
        stack: ["SimpleDesignEngine.applyRule1_Tests()"],
        state: { beckRule1: "Todos os testes passando", coupling: "Baixo por construção" }
      },
      {
        title: "Regra 2: Eliminando Duplicação com Template Method [G5]",
        narration: "Os métodos duplicados 'accrueUSDivisionVacation' e 'accrueEUDivisionVacation' são unificados no Template Method 'accrueVacation()'.",
        from: "R2", to: "R3", call: "VacationPolicy.accrueVacation()",
        activeNodes: ["R2", "R3"],
        stack: ["VacationPolicy.accrueVacation()", "VacationPolicy.calculateBaseVacationHours()"],
        state: { beckRule2: "Sem duplicação (DRY)", patternApplied: "Template Method" }
      },
      {
        title: "Regra 3: Expressando a Intenção do Programador [N3]",
        narration: "O passo variável 'alterToLegalMinimums()' recebe um nome claro e utiliza a terminologia padrão de Design Patterns.",
        from: "R3", to: "R2", call: "EUVacationPolicy.alterToLegalMinimums()",
        activeNodes: ["R2", "R3"],
        stack: ["VacationPolicy.accrueVacation()", "EUVacationPolicy.alterToLegalMinimums()"],
        state: { beckRule3: "Alta expressividade", division: "EU", minimumHours: 160 }
      },
      {
        title: "Regra 4: Minimizando Classes e Métodos sem Dogmatismo",
        narration: "Verificamos se alguma classe ou interface foi criada apenas por burocracia; mantemos a estrutura enxuta e pragmática.",
        from: "R3", to: "R4", call: "pruneRedundantAbstractions()",
        activeNodes: ["R3", "R4"],
        stack: ["SimpleDesignEngine.applyRule4_Pragmatism()"],
        state: { beckRule4: "Estrutura enxuta", unnecessaryInterfaces: 0 }
      },
      {
        title: "Design Simples Emergente Concluído",
        narration: "As 4 Regras de Kent Beck produzem uma arquitetura limpa e adaptável sem paralisia de Big Design Up Front.",
        from: "R4", to: "R1", call: "verifyEmergentArchitecture() -> OK",
        activeNodes: ["R1", "R2", "R3", "R4"],
        stack: ["SimpleDesignEngine.complete()"],
        state: { emergentQuality: "Excelente", allTestsGreen: true }
      }
    ]
  },

  "cap-13": {
    code: "C13",
    layerIndex: 3,
    scopeType: "Concorrência • CAS",
    nodes: [
      { id: "T1", label: "Thread-1 (Worker A)", stereo: "«scheduler»", x: 130, y: 90, addr: "0xCCC1", methods: ["requestNextId()"] },
      { id: "T2", label: "Thread-2 (Worker B)", stereo: "«scheduler»", x: 130, y: 255, addr: "0xCCC2", methods: ["requestNextId()"] },
      { id: "Atomic", label: "AtomicInteger (CAS)", stereo: "«lock-free»", x: 450, y: 170, addr: "0xCCC3", methods: ["incrementAndGet()"] },
      { id: "Server", label: "ServerLockedQueue", stereo: "«server-lock»", x: 750, y: 170, addr: "0xCCC4", methods: ["getNextOrNull()"] }
    ],
    links: [
      { from: "T1", to: "Atomic", label: "1. incrementAndGet()" },
      { from: "T2", to: "Atomic", label: "2. CAS retry atômico" },
      { from: "Atomic", to: "Server", label: "3. Server-Based Locking" }
    ],
    steps: [
      {
        title: "O Risco de ++lastIdUsed (12.870 Caminhos de Bytecode)",
        narration: "No incremento comum '++lastIdUsed' (partindo de 42), duas threads podem ler 42 simultaneamente e retornar o mesmo ID 43.",
        from: "T1", to: "Atomic", call: "incrementAndGet() [expected=42 -> new=43]",
        activeNodes: ["T1", "Atomic"],
        stack: ["Thread1.requestNextId()", "AtomicInteger.incrementAndGet()"],
        state: { initialValue: 42, nonAtomicPathsForInt: 12870, thread1Id: 43 }
      },
      {
        title: "Compare-And-Swap (CAS) Atômico para Thread-2",
        narration: "Quando a Thread-2 tenta atualizar de 42 para 43, a instrução CAS detecta que o valor já mudou para 43 e reexecuta para 44 sem corrupção!",
        from: "T2", to: "Atomic", call: "CAS(43 -> 44) -> ID 44",
        activeNodes: ["T2", "Atomic"],
        stack: ["Thread2.requestNextId()", "AtomicInteger.compareAndSet(43, 44)"],
        state: { thread1Id: 43, thread2Id: 44, raceCondition: "Prevenida via CAS" }
      },
      {
        title: "Server-Based Locking (Evitando hasNext/next Separados)",
        narration: "Em vez de chamar 'hasNext()' e 'next()' em duas etapas vulneráveis, a fila expõe o método atômico único 'getNextOrNull()'.",
        from: "Atomic", to: "Server", call: "serverQueue.getNextOrNull()",
        activeNodes: ["Atomic", "Server"],
        stack: ["ServerLockedQueue.getNextOrNull()"],
        state: { lockingStrategy: "Server-Based Locking", windowOfVulnerability: "Zero" }
      },
      {
        title: "Quebrando a Espera Circular (Prevenção de Deadlock)",
        narration: "Os recursos compartilhados são adquiridos sempre na mesma ordem global, quebrando a 4ª condição de Deadlock (Espera Circular).",
        from: "Server", to: "T1", call: "deliverTask(Task#43)",
        activeNodes: ["T1", "Server"],
        stack: ["Thread1.processTask(43)"],
        state: { deadlockConditionsBroken: "Espera Circular eliminada", deadlockRisk: "Zero" }
      },
      {
        title: "Execução Multithread Determinística e Testada",
        narration: "Ambas as threads concluem sem colisão de estado e são validadas com testes instrumentados (jiggling).",
        from: "Server", to: "T2", call: "deliverTask(Task#44)",
        activeNodes: ["T1", "T2", "Atomic", "Server"],
        stack: ["ConcurrencyTestRunner.verifyNoCollisions()"],
        state: { processedIds: [43, 44], corruptedState: 0, status: "Thread-Safe" }
      }
    ]
  },

  "cap-14": {
    code: "C14",
    layerIndex: 3,
    scopeType: "Estudo Args • TDD",
    nodes: [
      { id: "Client", label: "ArgsMain", stereo: "«caller»", x: 130, y: 170, addr: "0xCCD1", methods: ["new Args('l,p#,d*', args)"] },
      { id: "Args", label: "Args (Clean Parser)", stereo: "«orchestrator»", x: 430, y: 95, addr: "0xCCD2", methods: ["parseSchema()", "parseArguments()"] },
      { id: "Marshaler", label: "ArgumentMarshaler", stereo: "«polymorphic-map»", x: 750, y: 95, addr: "0xCCD3", methods: ["set(Iterator<String>)"] },
      { id: "Ex", label: "ArgsException", stereo: "«isolated-error»", x: 430, y: 255, addr: "0xCCD4", methods: ["errorMessage()"] }
    ],
    links: [
      { from: "Client", to: "Args", label: "1. schema 'l,p#,d*'" },
      { from: "Args", to: "Marshaler", label: "2. Map<Char, Marshaler>" },
      { from: "Args", to: "Ex", label: "3. isola formatação de erro" }
    ],
    steps: [
      {
        title: "Substituição dos 3 Mapas Paralelos por Mapa Único",
        narration: "Em vez de 'booleanArgs', 'stringArgs' e 'intArgs', Args mantém um único 'Map<Character, ArgumentMarshaler>'.",
        from: "Client", to: "Args", call: "new Args('l,p#,d*', ['-l', '-p', '8080', '-d', '/logs'])",
        activeNodes: ["Client", "Args"],
        stack: ["Args.<init>()", "Args.parseSchema('l,p#,d*')"],
        state: { schema: "l,p#,d*", parallelMapsEliminated: 3, marshalersRegistered: ["l:Boolean", "p:Integer", "d:String"] }
      },
      {
        title: "Despacho Polimórfico via Iterator<String> [G23]",
        narration: "Ao encontrar '-p 8080', Args recupera o ArgumentMarshaler da letra 'p' e chama 'm.set(currentArgument)' sem precisar de switch por tipo.",
        from: "Args", to: "Marshaler", call: "marshalers.get('p').set(currentArgument)",
        activeNodes: ["Args", "Marshaler"],
        stack: ["Args.parseArgumentCharacter('p')", "IntegerArgumentMarshaler.set(it)"],
        state: { activeFlag: "-p", marshalerType: "IntegerArgumentMarshaler", parsedValue: 8080 }
      },
      {
        title: "Isolamento Completo em ArgsException [G30]",
        narration: "Toda a lógica de mensagens de erro e ErrorCodes vive isolada em 'ArgsException', deixando a classe 'Args' enxuta e coesa.",
        from: "Args", to: "Ex", call: "verifyNoErrors()",
        activeNodes: ["Args", "Ex"],
        stack: ["Args.parseArgumentStrings()"],
        state: { errorFormattingInArgs: "0 linhas (Movido para ArgsException)", srpCompliance: true }
      },
      {
        title: "Leitura Tipada pelo Cliente",
        narration: "O cliente recupera 'getBoolean('l')', 'getInt('p')' e 'getString('d')' com segurança e zero duplicação estrutural.",
        from: "Marshaler", to: "Client", call: "return { l: true, p: 8080, d: '/logs' }",
        activeNodes: ["Client", "Args", "Marshaler"],
        stack: ["Args.getBoolean('l')", "Args.getInt('p')", "Args.getString('d')"],
        state: { l: true, p: 8080, d: "/logs" }
      },
      {
        title: "Refinamento Sucessivo Protegido por TDD",
        narration: "Adicionar um novo tipo (ex: DoubleArgumentMarshaler '##') exige apenas uma nova classe sem alterar o motor de parsing (OCP).",
        from: "Args", to: "Client", call: "allAcceptanceTestsGreen()",
        activeNodes: ["Client", "Args", "Marshaler", "Ex"],
        stack: ["ArgsTestSuite.runAll()"],
        state: { tddSteps: "100% Verdes", openForExtension: true }
      }
    ]
  },

  "cap-15": {
    code: "C15",
    layerIndex: 3,
    scopeType: "JUnit • Escoteiro",
    nodes: [
      { id: "Assert", label: "JUnit Assert", stereo: "«caller»", x: 130, y: 170, addr: "0xCCE1", methods: ["assertEquals('abcde', 'abXde')"] },
      { id: "Compactor", label: "ComparisonCompactor", stereo: "«refactored»", x: 440, y: 95, addr: "0xCCE2", methods: ["formatCompactedComparison()"] },
      { id: "Guard", label: "shouldBeCompacted()", stereo: "«G28-G29»", x: 440, y: 255, addr: "0xCCE3", methods: ["!shouldNotBeCompacted()"] },
      { id: "Bounds", label: "findCommonPrefixAndSuffix()", stereo: "«G31-G33»", x: 750, y: 170, addr: "0xCCE4", methods: ["prefixLength", "suffixLength"] }
    ],
    links: [
      { from: "Assert", to: "Compactor", label: "1. renomeado [N7]" },
      { from: "Compactor", to: "Guard", label: "2. condicional positiva [G28]" },
      { from: "Compactor", to: "Bounds", label: "3. acoplamento explícito [G31]" }
    ],
    steps: [
      {
        title: "Renomeação para Revelar Responsabilidade Completa [N7]",
        narration: "O método 'compact(msg)' é renomeado para 'formatCompactedComparison(msg)' porque ele formata a mensagem final além de compactar as strings.",
        from: "Assert", to: "Compactor", call: "formatCompactedComparison(msg)",
        activeNodes: ["Assert", "Compactor"],
        stack: ["ComparisonCompactor.formatCompactedComparison()"],
        state: { prefixesRemoved: "fExpected -> expected [N6]", expected: "abcde", actual: "abXde" }
      },
      {
        title: "Encapsulando Condicional na Forma Positiva [G28, G29]",
        narration: "A expressão 'expected == null || actual == null || areStringsEqual()' é encapsulada no predicado afirmativo 'shouldBeCompacted()'.",
        from: "Compactor", to: "Guard", call: "shouldBeCompacted() -> true",
        activeNodes: ["Compactor", "Guard"],
        stack: ["ComparisonCompactor.formatCompactedComparison()", "ComparisonCompactor.shouldBeCompacted()"],
        state: { encapsulatedConditional: "shouldBeCompacted()", result: true }
      },
      {
        title: "Explicitação do Acoplamento Temporal [G31]",
        narration: "Como 'findCommonSuffix()' dependia de 'findCommonPrefix()' ter rodado antes, ambos são unidos em 'findCommonPrefixAndSuffix()'.",
        from: "Compactor", to: "Bounds", call: "findCommonPrefixAndSuffix()",
        activeNodes: ["Compactor", "Bounds"],
        stack: ["ComparisonCompactor.findCommonPrefixAndSuffix()"],
        state: { temporalCoupling: "Explícito", prefixLength: 2, suffixLength: 2 }
      },
      {
        title: "Correção de Condição de Contorno (Base 0) [G33, G9]",
        narration: "O antigo 'fSuffix' (baseado em 1, exigindo +1/-1 e gerando código morto) é substituído por 'suffixLength' (baseado em 0).",
        from: "Bounds", to: "Compactor", call: "compact('abcde') -> 'ab[c]de'",
        activeNodes: ["Compactor", "Bounds"],
        stack: ["ComparisonCompactor.compact()"],
        state: { compactExpected: "ab[c]de", compactActual: "ab[X]de", deadCodeRemoved: true }
      },
      {
        title: "Módulo JUnit Ainda Mais Limpo (Regra do Escoteiro)",
        narration: "A mensagem formatada é entregue ao JUnit com leitura cristalina e zero regressões.",
        from: "Compactor", to: "Assert", call: "return 'expected:<ab[c]de> but was:<ab[X]de>'",
        activeNodes: ["Assert", "Compactor"],
        stack: ["Assert.fail()"],
        state: { finalOutput: "expected:<ab[c]de> but was:<ab[X]de>", smellsEliminated: ["N6", "N7", "G9", "G28", "G29", "G31", "G33"] }
      }
    ]
  },

  "cap-16": {
    code: "C16",
    layerIndex: 3,
    scopeType: "DayDate • Enums",
    nodes: [
      { id: "Tests", label: "DayDateTestSuite (92%)", stereo: "«T5-boundaries»", x: 130, y: 170, addr: "0xCCF1", methods: ["testFollowingSaturday()"] },
      { id: "DayDate", label: "DayDate (Abstract)", stereo: "«N2-domain»", x: 430, y: 95, addr: "0xCCF2", methods: ["plusDays(int): DayDate"] },
      { id: "Factory", label: "DayDateFactory", stereo: "«G7-decoupled»", x: 750, y: 95, addr: "0xCCF3", methods: ["makeDate(ordinal)"] },
      { id: "Month", label: "enum Month", stereo: "«J2-J3-G14»", x: 430, y: 255, addr: "0xCCF4", methods: ["quarter()", "fromInt()"] }
    ],
    links: [
      { from: "Tests", to: "DayDate", label: "1. Primeiro Faça Funcionar" },
      { from: "DayDate", to: "Factory", label: "2. quebra ciclo G7" },
      { from: "DayDate", to: "Month", label: "3. Enum rico substitui int [J3]" }
    ],
    steps: [
      {
        title: "Passo 1: Primeiro Faça Funcionar (Cobertura 50% -> 92%)",
        narration: "Antes de refatorar, novos testes unitários de fronteira [G3, T5] descobrem e corrigem bugs reais em 'getFollowingDayOfWeek' e 'stringToMonthCode'.",
        from: "Tests", to: "DayDate", call: "verifyBoundaryConditions() -> Bugs Fixed",
        activeNodes: ["Tests", "DayDate"],
        stack: ["DayDateTest.testGetFollowingDayOfWeek()"],
        state: { initialCoverage: "50%", newCoverage: "92%", boundaryBugsFixed: 4 }
      },
      {
        title: "Renomeação no Nível Correto de Abstração [N2]",
        narration: "'SerialDate' expunha detalhes de implementação (número serial); 'DayDate' expressa a abstração pura de uma data baseada em dia.",
        from: "DayDate", to: "Month", call: "Month.JANUARY.quarter() -> 1",
        activeNodes: ["DayDate", "Month"],
        stack: ["Month.quarter()"],
        state: { oldClassName: "SerialDate", newClassName: "DayDate", monthType: "enum Month [J3]" }
      },
      {
        title: "Eliminando Herança de Constantes e Feature Envy [J2, G14]",
        narration: "A interface MonthConstants é substituída pelo 'enum Month', que assume os métodos 'quarter()' e 'fromInt()', eliminando isValidMonthCode().",
        from: "Month", to: "DayDate", call: "return Quarter(1)",
        activeNodes: ["DayDate", "Month"],
        stack: ["DayDate.getQuarter()"],
        state: { inheritedConstantsRemoved: true, isValidMonthCodeDeleted: true }
      },
      {
        title: "Quebrando a Dependência da Classe Base na Derivada [G7]",
        narration: "DayDate deixa de instanciar 'SpreadsheetDate' diretamente e delega a criação para 'DayDateFactory.makeDate()'.",
        from: "DayDate", to: "Factory", call: "date.plusDays(7) -> DayDateFactory.makeDate()",
        activeNodes: ["DayDate", "Factory"],
        stack: ["DayDate.plusDays(7)", "DayDateFactory.makeDate()"],
        state: { g7BaseDependsOnDerived: "Resolvido via Abstract Factory", methodName: "plusDays(7) [G18, G20]" }
      },
      {
        title: "Passo 2 Concluído: 'Depois Faça Certo'",
        narration: "A biblioteca DayDate emerge com 92% de cobertura, tipagem forte via Enums, variáveis explicativas [G19] e zero ciclos arquiteturais.",
        from: "Factory", to: "Tests", call: "return SpreadsheetDate (All Tests Green)",
        activeNodes: ["Tests", "DayDate", "Factory", "Month"],
        stack: ["DayDateTestSuite.runAll()"],
        state: { coverage: "92%", smellsResolved: 12, status: "Refatoração Concluída" }
      }
    ]
  },

  "cap-17": {
    code: "C17",
    layerIndex: 3,
    scopeType: "66 Heurísticas • C1–T9",
    nodes: [
      { id: "PR", label: "PullRequestDiff", stereo: "«dirty-code»", x: 130, y: 170, addr: "0xCCF5", methods: ["processPagination(items, page, isExport)"] },
      { id: "Scanner", label: "HeuristicScanner", stereo: "«66-rules»", x: 430, y: 95, addr: "0xCCF6", methods: ["detect(F3, G19, G33)"] },
      { id: "Split", label: "Funções Especializadas", stereo: "«F3-G30»", x: 750, y: 95, addr: "0xCCF7", methods: ["exportItems()", "renderPage()"] },
      { id: "Vars", label: "Variáveis Explicativas", stereo: "«G19-G33»", x: 750, y: 255, addr: "0xCCF8", methods: ["startIndex", "nextPageIndex", "endIndex"] }
    ],
    links: [
      { from: "PR", to: "Scanner", label: "1. analisa catálogo C1–T9" },
      { from: "Scanner", to: "Split", label: "2. elimina Flag [F3]" },
      { from: "Scanner", to: "Vars", label: "3. encapsula contorno [G19, G33]" }
    ],
    steps: [
      {
        title: "Inspeção com o Vocabulário das 66 Heurísticas",
        narration: "O método 'processPagination(items, page, boolean isExport)' é analisado usando o catálogo objetivo do Capítulo 17.",
        from: "PR", to: "Scanner", call: "diagnoseSmells(processPagination)",
        activeNodes: ["PR", "Scanner"],
        stack: ["HeuristicScanner.scanDiff()"],
        state: { detectedCodes: ["F3: Argumento Flag (isExport)", "G25: Número Mágico (20)", "G33: Contorno solto (page + 1)"] }
      },
      {
        title: "Eliminação do Argumento Flag Booleano [F3, G30]",
        narration: "O parâmetro 'boolean isExport' provava que a função fazia duas coisas; ela é dividida em 'exportItems(items)' e 'renderPage(items, pageIndex)'.",
        from: "Scanner", to: "Split", call: "splitInto(exportItems, renderPage)",
        activeNodes: ["Scanner", "Split"],
        stack: ["Refactor.removeFlagArgument()"],
        state: { ruleApplied: "F3 & G30", newMethods: ["exportItems()", "renderPage()"] }
      },
      {
        title: "Encapsulamento da Condição de Contorno [G33]",
        narration: "A expressão '(page + 1) * 20' ganha a constante 'PAGE_SIZE = 20' [G25] e a variável de contorno explícita 'nextPageIndex = pageIndex + 1' [G33].",
        from: "Scanner", to: "Vars", call: "nextPageIndex = pageIndex + 1",
        activeNodes: ["Scanner", "Vars"],
        stack: ["renderPage()", "encapsulateBoundary()"],
        state: { constant: "PAGE_SIZE = 20", boundaryVar: "nextPageIndex" }
      },
      {
        title: "Introdução de Variáveis Explicativas [G19]",
        narration: "Os limites do loop são decompostos em 'startIndex' e 'endIndex', tornando o cabeçalho do for imediatamente compreensível.",
        from: "Vars", to: "Split", call: "for (i = startIndex; i < endIndex; i++)",
        activeNodes: ["Split", "Vars"],
        stack: ["renderPage()"],
        state: { explanatoryVars: ["startIndex", "endIndex"], loopClarity: "100%" }
      },
      {
        title: "Revisão de Código Aprovada com Artesanato",
        narration: "O Pull Request é aprovado com zero odores e protegido por testes rápidos [T9] e de contorno [T5].",
        from: "Split", to: "PR", call: "approveCleanPullRequest()",
        activeNodes: ["PR", "Scanner", "Split", "Vars"],
        stack: ["CodeReview.approve()"],
        state: { totalCatalogRules: 66, smellsRemaining: 0, craftsmanship: "Verificado" }
      }
    ]
  }
};

