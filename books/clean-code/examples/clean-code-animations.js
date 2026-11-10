/**
 * Especificação de Animação Interativa Passo a Passo para Capítulos com Fluxo Estrutural
 * do livro "Código Limpo" (Clean Code)
 * Compatível com o motor Protocol Explorer (pattern-visualizer.js).
 */

export const cleanCodeAnimations = {
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
  }
};
