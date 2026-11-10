/**
 * Especificacao de Animacao Interativa Passo a Passo para os 12 Capitulos de "Java: Guia Completo de Versoes, JVM & Ecossistema"
 * Compativel com o motor Protocol Explorer (pattern-visualizer.js): Topologia SVG,
 * Pacotes Animados, Call Stack e Inspetor de Estado JSON em Tempo Real.
 */

export const javaAnimations = {
  "jv-cap-1": {
    code: "J01",
    layerIndex: 1,
    scopeType: "Bytecode, ClassLoader & HotSpot JIT (Java 1.0 a 1.4)",
    nodes: [
      { id: "Javac", label: "Compilador javac", stereo: "«compiler»", x: 130, y: 140, addr: "0xJV01", methods: ["compile(--release)", "emitClassFile()"] },
      { id: "ClassLoader", label: "ClassLoader & Verifier", stereo: "«loader»", x: 440, y: 80, addr: "0xJV02", methods: ["loadClass()", "verifyMagic(0xCAFEBABE)"] },
      { id: "Interpreter", label: "Interpretador & Profiler", stereo: "«runtime»", x: 440, y: 240, addr: "0xJV03", methods: ["executeBytecode()", "countInvocations()"] },
      { id: "HotSpotJIT", label: "Compilador JIT C1/C2", stereo: "«native»", x: 750, y: 160, addr: "0xJV04", methods: ["compileToNative()", "inlineMethods()"] }
    ],
    links: [
      { from: "Javac", to: "ClassLoader", label: "1. gera .class (Major 48)" },
      { from: "ClassLoader", to: "Interpreter", label: "2. verifica bytecode" },
      { from: "Interpreter", to: "HotSpotJIT", label: "3. detecta HotSpot" },
      { from: "HotSpotJIT", to: "Interpreter", label: "4. instala codigo nativo" }
    ],
    steps: [
      {
        title: "Compilacao Cruzada e Geracao do Bytecode .class",
        narration: "O compilador javac analisa o codigo-fonte e gera o bytecode independente de plataforma iniciado pelos bytes magicos 0xCAFEBABE e a versao Major (45 no JDK 1.0, 48 no Java 1.4).",
        from: "Javac", to: "ClassLoader", call: "javac --release 8 PedidoService.java",
        activeNodes: ["Javac", "ClassLoader"],
        stack: ["javac.main()", "ClassWriter.write(0xCAFEBABE)"],
        state: { magic: "0xCAFEBABE", majorVersion: 48, targetJdk: "1.4+", woraGuarantee: true }
      },
      {
        title: "Carregamento Hierarquico e Verificacao de Seguranca",
        narration: "O Application ClassLoader delega ao pai ate o Bootstrap ClassLoader e o Bytecode Verifier comprova que a pilha de operandos nao sofre underflow nem acessos ilegais de memoria.",
        from: "ClassLoader", to: "Interpreter", call: "ClassLoader.defineClass() -> verify()",
        activeNodes: ["ClassLoader", "Interpreter"],
        stack: ["ClassLoader.loadClass()", "Verifier.verifyBytecode()"],
        state: { classLoader: "AppClassLoader", parentDelegation: "Bootstrap -> Ext -> App", bytecodeValid: true }
      },
      {
        title: "Execucao Interpretada e Profiling de Frequencia",
        narration: "A JVM inicia executando as instrucoes de bytecode imediatamente no interpretador enquanto coleta estatisticas de quantas vezes cada metodo e loop e executado.",
        from: "Interpreter", to: "HotSpotJIT", call: "InvocationCounter.increment() > Threshold",
        activeNodes: ["Interpreter", "HotSpotJIT"],
        stack: ["Interpreter.loop()", "MethodCounters.inc(10000)"],
        state: { modoAtual: "Interpretado", invocacoesMetodo: 10000, hotSpotDetectado: true }
      },
      {
        title: "Compilacao Adaptativa Just-In-Time (C1 -> C2)",
        narration: "Ao atingir o limiar de aquecimento, o compilador HotSpot C2 compila o bytecode em instrucoes de maquina nativas (x86_64/ARM64), aplicando Method Inlining e Escape Analysis.",
        from: "HotSpotJIT", to: "Interpreter", call: "C2Compiler.compileMethod(inline=true)",
        activeNodes: ["HotSpotJIT", "Interpreter"],
        stack: ["CompileBroker.compilerThread()", "C2.optimizeAndEmitMachineCode()"],
        state: { compilador: "HotSpot Tier 4 (C2)", inliningAtivo: true, escapeAnalysis: "Stack Allocation" }
      },
      {
        title: "Execucao em Velocidade Nativa com Retrocompatibilidade",
        narration: "Todas as chamadas subsequentes saltam direto para o codigo de maquina nativo no CodeCache, mantendo a possibilidade de Deoptimization segura se uma nova subclasse for carregada.",
        from: "HotSpotJIT", to: "ClassLoader", call: "CodeCache.invokeNativeEntry()",
        activeNodes: ["HotSpotJIT", "ClassLoader"],
        stack: ["NativeCode.calcularFrete() [0.02ms]"],
        state: { modoAtual: "Nativo JIT C2", ganhoVelocidade: "18x mais rapido", compatibilidadeBinaria: "100% preservada" }
      }
    ]
  },

  "jv-cap-2": {
    code: "J02",
    layerIndex: 1,
    scopeType: "Generics, Type Erasure & Bridge Methods (Java 5)",
    nodes: [
      { id: "SourceJava5", label: "Codigo Java 5 (List<String>)", stereo: "«generic»", x: 130, y: 140, addr: "0xJV05", methods: ["add(String)", "String get(0)"] },
      { id: "TypeChecker", label: "Verificador de Tipos (PECS)", stereo: "«javac»", x: 440, y: 80, addr: "0xJV06", methods: ["checkBounds()", "validateWildcards()"] },
      { id: "ErasureEngine", label: "Motor de Type Erasure", stereo: "«erasure»", x: 440, y: 240, addr: "0xJV07", methods: ["eraseToRaw(Object)", "emitBridgeMethod()"] },
      { id: "LegacyLib14", label: "Biblioteca Legada Java 1.4", stereo: "«binary-compat»", x: 750, y: 160, addr: "0xJV08", methods: ["processarLista(List raw)"] }
    ],
    links: [
      { from: "SourceJava5", to: "TypeChecker", label: "1. valida tipos <T>" },
      { from: "TypeChecker", to: "ErasureEngine", label: "2. apaga parametros <T>" },
      { from: "ErasureEngine", to: "LegacyLib14", label: "3. gera bytecode compativel" },
      { from: "LegacyLib14", to: "SourceJava5", label: "4. checkcast automatico" }
    ],
    steps: [
      {
        title: "Verificacao Estatica Rigorosa em Tempo de Compilacao",
        narration: "O desenvolvedor declara List<String> nomes = new ArrayList<String>(). O compilador valida que apenas Strings entram na colecao e aplica regras PECS (? extends / ? super).",
        from: "SourceJava5", to: "TypeChecker", call: "TypeChecker.verify(List<String>)",
        activeNodes: ["SourceJava5", "TypeChecker"],
        stack: ["javac.attr()", "Check.checkType(String, List<String>)"],
        state: { tipoFonte: "List<String>", segurancaCompilacao: "Ativa", erroSeInserirInteger: true }
      },
      {
        title: "Type Erasure: Transformacao para Tipo Bruto no Bytecode",
        narration: "Para nao criar um novo ArrayList incompativel com o Java 1.4, o compilador apaga o parametro <String>, substituindo-o por Object no bytecode gerado.",
        from: "TypeChecker", to: "ErasureEngine", call: "Types.erasure(List<String>) -> List",
        activeNodes: ["TypeChecker", "ErasureEngine"],
        stack: ["TransTypes.translate()", "erasure(List<String>) -> java.util.List"],
        state: { tipoNoBytecode: "java.util.List (Raw)", assinaturaMetodo: "Object get(int)", novasClassesCriadas: 0 }
      },
      {
        title: "Geracao de Bridge Methods Sinteticos para Polimorfismo",
        narration: "Quando uma classe implementa Comparable<Cliente>, o compilador gera um metodo ponte sintetico compareTo(Object) que faz cast e chama compareTo(Cliente).",
        from: "ErasureEngine", to: "LegacyLib14", call: "emitBridge: compareTo(Object) -> compareTo(Cliente)",
        activeNodes: ["ErasureEngine", "LegacyLib14"],
        stack: ["TransTypes.addBridge()", "Method: ACC_BRIDGE | ACC_SYNTHETIC"],
        state: { metodoReal: "int compareTo(Cliente)", bridgeSintetico: "int compareTo(Object)", polimorfismoPreservado: true }
      },
      {
        title: "Interoperabilidade Direta com Bibliotecas Java 1.4",
        narration: "Como List<String> e apenas java.util.List em tempo de execucao, um JAR antigo compilado em 2002 recebe a lista sem precisar ser recompilado.",
        from: "ErasureEngine", to: "LegacyLib14", call: "LegacyLib14.processar(List)",
        activeNodes: ["ErasureEngine", "LegacyLib14"],
        stack: ["AppJava5.main()", "Biblioteca14.processar(List)"],
        state: { jarLegadoRecompilado: false, compatibilidadeBinaria: "100%", classVersion: 49 }
      },
      {
        title: "Insercao Automatica de checkcast na Leitura",
        narration: "Ao ler String s = nomes.get(0), o compilador insere invisivelmente a instrucao de bytecode checkcast java/lang/String, garantindo seguranca de tipos sem boilerplate.",
        from: "LegacyLib14", to: "SourceJava5", call: "invokeinterface List.get(0) + checkcast String",
        activeNodes: ["LegacyLib14", "SourceJava5"],
        stack: ["List.get(0) -> Object", "checkcast java/lang/String"],
        state: { instrucaoBytecode: "checkcast #String", retornoTipado: "String", castsManuaisNoCodigo: 0 }
      }
    ]
  },

  "jv-cap-3": {
    code: "J03",
    layerIndex: 1,
    scopeType: "try-with-resources, AutoCloseable & Suppressed Exceptions (Java 7)",
    nodes: [
      { id: "TryBlock", label: "Bloco try-with-resources", stereo: "«syntax»", x: 130, y: 140, addr: "0xJV09", methods: ["openResources()", "executeBody()"] },
      { id: "AutoCloseableRes", label: "Connection & Statement", stereo: "«AutoCloseable»", x: 440, y: 80, addr: "0xJV10", methods: ["executeQuery()", "close()"] },
      { id: "ExceptionGuard", label: "Gerenciador de Excecoes", stereo: "«compiler-gen»", x: 440, y: 240, addr: "0xJV11", methods: ["catchPrimary(t1)", "t1.addSuppressed(t2)"] },
      { id: "CallerCatch", label: "Bloco catch do Chamador", stereo: "«handler»", x: 750, y: 160, addr: "0xJV12", methods: ["getSuppressed()", "logRootCause()"] }
    ],
    links: [
      { from: "TryBlock", to: "AutoCloseableRes", label: "1. abre conn e stmt" },
      { from: "AutoCloseableRes", to: "ExceptionGuard", label: "2. falha na query (Ex1)" },
      { from: "ExceptionGuard", to: "AutoCloseableRes", label: "3. fecha em ordem LIFO" },
      { from: "ExceptionGuard", to: "CallerCatch", label: "4. entrega Ex1 + suprimida" }
    ],
    steps: [
      {
        title: "Abertura Deterministica de Multiplos Recursos",
        narration: "O cabecalho try (Connection c = ...; PreparedStatement ps = ...) abre os recursos em ordem sequencial. Ambos implementam a superinterface AutoCloseable do Java 7.",
        from: "TryBlock", to: "AutoCloseableRes", call: "new Connection() -> new PreparedStatement()",
        activeNodes: ["TryBlock", "AutoCloseableRes"],
        stack: ["tryWithResources()", "ds.getConnection()", "conn.prepareStatement()"],
        state: { pilhaRecursosAbertos: ["Connection (c)", "PreparedStatement (ps)"], hierarquia: "Closeable extends AutoCloseable" }
      },
      {
        title: "Ocorrencia da Excecao Primaria no Corpo do try",
        narration: "Durante a execucao da consulta, o banco lanca SQLException('Timeout na consulta'). O bloco sintetico gerado pelo compilador captura e guarda essa excecao primaria.",
        from: "AutoCloseableRes", to: "ExceptionGuard", call: "throw Primary: SQLException('Timeout')",
        activeNodes: ["AutoCloseableRes", "ExceptionGuard"],
        stack: ["ps.executeQuery()", "catch (Throwable primaryEx)"],
        state: { excecaoPrimaria: "SQLException: Timeout na consulta", recursosPendentesFechamento: 2 }
      },
      {
        title: "Fechamento Automatico em Ordem Inversa (LIFO)",
        narration: "Antes de sair do escopo, o bytecode chama ps.close() primeiro e c.close() por ultimo. Durante o c.close(), a conexao quebrada lanca outra excecao!",
        from: "ExceptionGuard", to: "AutoCloseableRes", call: "ps.close(); c.close() -> throws CloseEx",
        activeNodes: ["ExceptionGuard", "AutoCloseableRes"],
        stack: ["finallySynthesized()", "ps.close() [OK]", "c.close() [Falhou!]"],
        state: { ordemFechamento: "1º ps.close(), 2º c.close()", falhaNoClose: "SQLException: Conexao ja encerrada" }
      },
      {
        title: "Preservacao da Causa Raiz com addSuppressed()",
        narration: "Em vez de deixar a falha do close() apagar a excecao original (como acontecia no Java 6), o Java 7 anexa a falha secundaria via primaryEx.addSuppressed(closeEx).",
        from: "AutoCloseableRes", to: "ExceptionGuard", call: "primaryEx.addSuppressed(closeEx)",
        activeNodes: ["AutoCloseableRes", "ExceptionGuard"],
        stack: ["catch (Throwable closeEx)", "primaryEx.addSuppressed(closeEx)"],
        state: { excecaoPrincipalPreservada: "SQLException: Timeout", excecoesSuprimidas: ["SQLException: Conexao ja encerrada"] }
      },
      {
        title: "Entrega Completa para Diagnostico no Bloco catch",
        narration: "O chamador recebe a excecao primaria intacta e pode inspecionar e.getSuppressed() nos logs, garantindo zero vazamento de recursos e rastreabilidade total.",
        from: "ExceptionGuard", to: "CallerCatch", call: "throw primaryEx (with Suppressed[])",
        activeNodes: ["ExceptionGuard", "CallerCatch"],
        stack: ["catch (SQLException e)", "e.getSuppressed()"],
        state: { vazamentoDeConexao: false, causaRaizVisivel: true, suppressedCount: 1 }
      }
    ]
  },

  "jv-cap-4": {
    code: "J04",
    layerIndex: 2,
    scopeType: "Lambdas, invokedynamic, Default Methods & Streams (Java 8 LTS)",
    nodes: [
      { id: "CollectionIfc", label: "Interface Collection (1998)", stereo: "«default-method»", x: 130, y: 140, addr: "0xJV13", methods: ["default stream()", "default forEach()"] },
      { id: "LambdaFactory", label: "LambdaMetafactory (JVM)", stereo: "«invokedynamic»", x: 440, y: 80, addr: "0xJV14", methods: ["metafactory()", "linkCallSite()"] },
      { id: "StreamPipeline", label: "Pipeline Lazy (filter/map)", stereo: "«stream»", x: 440, y: 240, addr: "0xJV15", methods: ["filter(Predicate)", "map(Function)"] },
      { id: "TerminalCollector", label: "Operacao Terminal (collect)", stereo: "«collector»", x: 750, y: 160, addr: "0xJV16", methods: ["evaluatePipeline()", "Collectors.groupingBy()"] }
    ],
    links: [
      { from: "CollectionIfc", to: "LambdaFactory", label: "1. invoca default stream()" },
      { from: "LambdaFactory", to: "StreamPipeline", label: "2. sintetiza lambda em RAM" },
      { from: "StreamPipeline", to: "TerminalCollector", label: "3. fusao de loop preguicoso" },
      { from: "TerminalCollector", to: "CollectionIfc", label: "4. retorna resultado imutavel" }
    ],
    steps: [
      {
        title: "Evolucao Compativel via Default Method stream()",
        narration: "Qualquer lista (mesmo de uma biblioteca compilada no Java 1.2) herda automaticamente o default method Collection.stream() introduzido no Java 8 sem quebrar implementacoes.",
        from: "CollectionIfc", to: "LambdaFactory", call: "pedidos.stream()",
        activeNodes: ["CollectionIfc", "LambdaFactory"],
        stack: ["Collection.stream()", "StreamSupport.stream(spliterator(), false)"],
        state: { interfaceOrigem: "java.util.Collection", metodoDefault: "stream()", quebrouClassesAntigas: false }
      },
      {
        title: "Sintese Dinamica de Lambdas via invokedynamic",
        narration: "As expressoes p -> p.isPago() e Pedido::getValor usam a instrucao invokedynamic: a LambdaMetafactory sintetiza a classe funcional em memoria na primeira chamada sem gerar arquivos $1.class.",
        from: "LambdaFactory", to: "StreamPipeline", call: "invokedynamic -> LambdaMetafactory.metafactory()",
        activeNodes: ["LambdaFactory", "StreamPipeline"],
        stack: ["BootstrapMethod.invoke()", "LambdaMetafactory.metafactory() -> CallSite"],
        state: { mecanismoBytecode: "invokedynamic", classesAnonimasEmDisco: 0, instanciaLambdaReutilizada: true }
      },
      {
        title: "Construcao Preguicosa (Lazy) do Pipeline Intermediario",
        narration: "Encadear .filter(p -> p.isPago()).map(Pedido::getValor) apenas monta os estagios do pipeline em objetos leves; nenhum elemento da lista e percorrido ainda.",
        from: "StreamPipeline", to: "TerminalCollector", call: "ReferencePipeline.filter().map()",
        activeNodes: ["StreamPipeline", "TerminalCollector"],
        stack: ["Stream.filter()", "Stream.map() [Estagios Registrados]"],
        state: { estagiosRegistrados: ["filter(isPago)", "map(getValor)"], elementosProcessadosAteAqui: 0, avaliacao: "Lazy" }
      },
      {
        title: "Disparo da Operacao Terminal com Loop Fusion",
        narration: "Quando .collect(Collectors.toList()) e chamado, o Stream executa uma unica passada fundindo filter e map no mesmo ciclo (Loop Fusion) e aplicando curto-circuito se houver limit/findFirst.",
        from: "TerminalCollector", to: "StreamPipeline", call: "TerminalOp.evaluateSequential(spliterator)",
        activeNodes: ["TerminalCollector", "StreamPipeline"],
        stack: ["ReduceOp.evaluateSequential()", "Spliterator.forEachRemaining()"],
        state: { passadasNaColecao: 1, loopFusionAtivo: true, mutacaoNaListaOriginal: false }
      },
      {
        title: "Materializacao Limpa do Resultado Final",
        narration: "O Collector acumula os elementos transformados e entrega a nova colecao pronta, mantendo a lista de entrada intacta e o codigo livre de estados mutaveis externos.",
        from: "TerminalCollector", to: "CollectionIfc", call: "return List<BigDecimal> resultado",
        activeNodes: ["TerminalCollector", "CollectionIfc"],
        stack: ["Collectors.toList() -> return resultado"],
        state: { itensFiltrados: 42, listaOriginalIntacta: true, paradigma: "Funcional Declarativo" }
      }
    ]
  },

  "jv-cap-5": {
    code: "J05",
    layerIndex: 2,
    scopeType: "Sistema de Modulos JPMS, Unnamed Module & Compact Strings (Java 9 & 10)",
    nodes: [
      { id: "JavaBaseMod", label: "Modulo java.base (JDK)", stereo: "«explicit-module»", x: 130, y: 140, addr: "0xJV17", methods: ["exports java.lang", "encapsulates jdk.internal"] },
      { id: "AppModule", label: "module-info.java (App)", stereo: "«jpms»", x: 440, y: 80, addr: "0xJV18", methods: ["requires java.sql", "opens com.app.entity"] },
      { id: "UnnamedClasspath", label: "Unnamed Module (-classpath)", stereo: "«compat-bridge»", x: 440, y: 240, addr: "0xJV19", methods: ["readsAllModules()", "legacyJarSupport()"] },
      { id: "JLinkImage", label: "Runtime Customizado jlink", stereo: "«35MB-image»", x: 750, y: 160, addr: "0xJV20", methods: ["stripDebug()", "bundleRequiredModules()"] }
    ],
    links: [
      { from: "AppModule", to: "JavaBaseMod", label: "1. resolve grafo de modulos" },
      { from: "UnnamedClasspath", to: "JavaBaseMod", label: "2. ponte Classpath legado" },
      { from: "JavaBaseMod", to: "AppModule", label: "3. bloqueia acesso interno" },
      { from: "AppModule", to: "JLinkImage", label: "4. gera imagem de 35 MB" }
    ],
    steps: [
      {
        title: "Resolucao do Grafo de Modulos no Boot da JVM",
        narration: "Ao iniciar, o JPMS verifica todos os descritores module-info.java (requires e exports), detectando dependencias ausentes ou ciclos imediatamente antes de rodar o main().",
        from: "AppModule", to: "JavaBaseMod", call: "ModuleFinder.of() -> Configuration.resolve()",
        activeNodes: ["AppModule", "JavaBaseMod"],
        stack: ["ModuleBootstrap.boot()", "Resolver.resolveRequires()"],
        state: { moduloRaiz: "com.empresa.app", requeridos: ["java.base", "java.sql", "java.net.http"], grafoValido: true }
      },
      {
        title: "Retrocompatibilidade do Classpath via Unnamed Module",
        narration: "JARs tradicionais passados no -classpath entram automaticamente no Unnamed Module, que possui permissao para ler todos os pacotes exportados do JDK sem exigir module-info.java.",
        from: "UnnamedClasspath", to: "JavaBaseMod", call: "ClassLoader.getUnnamedModule().canRead(all)",
        activeNodes: ["UnnamedClasspath", "JavaBaseMod"],
        stack: ["BuiltinClassLoader.loadClass()", "UnnamedModule.readExportedPackages()"],
        state: { modoExecucao: "Classpath Hibrido", unnamedModuleAtivo: true, jarsLegadosFuncionando: true }
      },
      {
        title: "Encapsulamento Forte e Diretiva opens para Reflexao",
        narration: "Pacotes internos do JDK (jdk.internal.*) sao bloqueados contra reflexao indevida, enquanto o modulo da aplicacao usa 'opens com.app.entity to org.hibernate.orm.core' para autorizar o ORM.",
        from: "JavaBaseMod", to: "AppModule", call: "AccessibleObject.checkCanSetAccessible()",
        activeNodes: ["JavaBaseMod", "AppModule"],
        stack: ["Field.setAccessible(true)", "Module.isOpen(com.app.entity, hibernate)"],
        state: { pacotesInternosJdk: "Protegidos", pacotesEntidadesApp: "Abertos para Hibernate", compactStrings: "LATIN-1 (1 byte/char)" }
      },
      {
        title: "Inferencia de Tipos com var (Java 10) e List.of()",
        narration: "Dentro dos metodos, variaveis locais usam var mantendo tipagem estatica forte no bytecode, e colecoes constantes sao criadas com List.of() e Map.of() imutaveis.",
        from: "AppModule", to: "UnnamedClasspath", call: "var itens = List.of('A', 'B') -> ImmutableCollections$ListN",
        activeNodes: ["AppModule", "UnnamedClasspath"],
        stack: ["List.of('A', 'B')", "new ImmutableCollections.List12()"],
        state: { tipoInferidoPeloJavac: "List<String>", colecaoImutavel: true, aceitaNull: false }
      },
      {
        title: "Empacotamento de Imagem Enxuta com jlink",
        narration: "Com os modulos bem definidos, o jlink gera uma distribuicao autocontida da JVM contendo apenas java.base, java.sql e a aplicacao, reduzindo a imagem Docker de 300 MB para 35 MB.",
        from: "AppModule", to: "JLinkImage", call: "jlink --add-modules java.base,java.sql --output /jre-slim",
        activeNodes: ["AppModule", "JLinkImage"],
        stack: ["JlinkTask.run()", "ImageBuilder.storeFiles()"],
        state: { tamanhoJreOriginal: "310 MB", tamanhoImagemJlink: "35 MB", modulosIncluidos: 4 }
      }
    ]
  },

  "jv-cap-6": {
    code: "J06",
    layerIndex: 2,
    scopeType: "HttpClient HTTP/2, JFR & Migracao Java 8 -> 11 (Java 11 LTS)",
    nodes: [
      { id: "SourceScript", label: "App / Script Java 11", stereo: "«JEP-330»", x: 130, y: 140, addr: "0xJV21", methods: ["java Script.java", "String.strip()"] },
      { id: "HttpClient11", label: "java.net.http.HttpClient", stereo: "«HTTP/2»", x: 440, y: 80, addr: "0xJV22", methods: ["sendAsync()", "BodyHandlers.ofString()"] },
      { id: "MavenJakarta", label: "Dependencias JAXB / Jakarta", stereo: "«JEP-320-fix»", x: 440, y: 240, addr: "0xJV23", methods: ["jakarta.xml.bind-api", "jakarta.annotation-api"] },
      { id: "JFRProfiler", label: "JDK Flight Recorder (JFR)", stereo: "«observability»", x: 750, y: 160, addr: "0xJV24", methods: ["StartFlightRecording()", "dumpProfile(.jfr)"] }
    ],
    links: [
      { from: "SourceScript", to: "MavenJakarta", label: "1. supre JAXB removido" },
      { from: "SourceScript", to: "HttpClient11", label: "2. dispara HTTP/2 async" },
      { from: "HttpClient11", to: "JFRProfiler", label: "3. registra evento de rede" },
      { from: "JFRProfiler", to: "SourceScript", label: "4. retorna resposta + telemetria" }
    ],
    steps: [
      {
        title: "Resolucao dos Modulos Java EE Removidos (JEP 320)",
        narration: "Ao migrar do Java 8 para o Java 11, os modulos JAXB (javax.xml.bind) e @PostConstruct (javax.annotation) removidos do JDK sao supridos via dependencias explicitas no Maven/Gradle.",
        from: "SourceScript", to: "MavenJakarta", call: "resolve: jakarta.xml.bind-api:2.3.3",
        activeNodes: ["SourceScript", "MavenJakarta"],
        stack: ["MavenDependencyResolver.resolve()", "ClassLoader.findClass(javax.xml.bind.JAXBContext)"],
        state: { jep320Status: "Java EE removido do JDK", solucaoMaven: "jakarta.xml.bind-api adicionado", compatibilidadeBinaria: "Preservada" }
      },
      {
        title: "Construcao Imutavel de Chamada HTTP/2 Nativa",
        narration: "A aplicacao instancia o novo java.net.http.HttpClient com suporte nativo a HTTP/2 e TLS 1.3, construindo um HttpRequest imutavel com timeout de 5 segundos.",
        from: "SourceScript", to: "HttpClient11", call: "HttpClient.newHttpClient().sendAsync(req, ofString())",
        activeNodes: ["SourceScript", "HttpClient11"],
        stack: ["HttpClientImpl.sendAsync()", "Http2ClientImpl.getConnectionFor()"],
        state: { protocolo: "HTTP/2 (Multiplexado)", tlsVersion: "TLSv1.3", modo: "Assincrono Nao-Bloqueante" }
      },
      {
        title: "Processamento Reativo via CompletableFuture e String API",
        narration: "O retorno CompletableFuture<HttpResponse<String>> aplica HttpResponse::body, divide as linhas com String.lines() e limpa espacos Unicode com String.strip().",
        from: "HttpClient11", to: "SourceScript", call: "future.thenApply(HttpResponse::body).thenApply(String::strip)",
        activeNodes: ["HttpClient11", "SourceScript"],
        stack: ["SocketTube.readAvailable()", "CompletableFuture.uniApply(String::strip)"],
        state: { statusHttp: 200, metodosStringJava11: ["isBlank()", "strip()", "lines()"], threadsBloqueadas: 0 }
      },
      {
        title: "Monitoramento Continuo com JDK Flight Recorder (JFR)",
        narration: "O JFR open-source no Java 11 grava eventos de latencia de socket, alocacao de memoria e pausas do G1GC/ZGC em buffer circular com overhead inferior a 1% de CPU.",
        from: "HttpClient11", to: "JFRProfiler", call: "jdk.InstantEvent.commit(HttpRequestEvent)",
        activeNodes: ["HttpClient11", "JFRProfiler"],
        stack: ["EventInstrumentation.commit()", "JFRBuffer.writeEvent()"],
        state: { profilerAtivo: "JDK Flight Recorder", cpuOverhead: "< 0.8%", arquivoSaida: "producao.jfr" }
      },
      {
        title: "Execucao Direta de Scripts sem Compilacao Manual (JEP 330)",
        narration: "Para automacao e ferramentas DevOps, o comando 'java HealthCheck.java' compila o codigo em memoria e executa imediatamente sem deixar arquivos .class no diretorio.",
        from: "JFRProfiler", to: "SourceScript", call: "java HealthCheck.java -> MemoryClassLoader.run()",
        activeNodes: ["JFRProfiler", "SourceScript"],
        stack: ["SourceLauncher.main()", "MemoryContext.compileAndInvoke()"],
        state: { jep330SingleFile: true, classFileEmDisco: false, ltsBaseline: "Java 11 LTS" }
      }
    ]
  },

  "jv-cap-7": {
    code: "J07",
    layerIndex: 3,
    scopeType: "Records, Sealed Classes & Switch Expressions (Java 12 a 17 LTS)",
    nodes: [
      { id: "SealedDomain", label: "sealed interface Pagamento", stereo: "«JEP-409»", x: 130, y: 140, addr: "0xJV25", methods: ["permits Pix, Cartao, Boleto"] },
      { id: "RecordType", label: "record Pix(String chave, ...)", stereo: "«JEP-395»", x: 440, y: 80, addr: "0xJV26", methods: ["compactConstructor()", "equals/hashCode/toString()"] },
      { id: "SwitchExpr", label: "Switch Expression Exaustivo", stereo: "«JEP-361»", x: 440, y: 240, addr: "0xJV27", methods: ["case Pix p -> ...", "yield valorCalculado"] },
      { id: "StrongEncap", label: "JVM Encapsulamento Forte", stereo: "«JEP-403»", x: 750, y: 160, addr: "0xJV28", methods: ["verifyCanonicalCtor()", "blockIllegalReflect()"] }
    ],
    links: [
      { from: "SealedDomain", to: "RecordType", label: "1. restringe subtipos" },
      { from: "RecordType", to: "StrongEncap", label: "2. valida construtor compacto" },
      { from: "RecordType", to: "SwitchExpr", label: "3. avalia tipo sem break" },
      { from: "SwitchExpr", to: "SealedDomain", label: "4. garante exaustividade" }
    ],
    steps: [
      {
        title: "Modelagem Fechada de Dominio com Sealed Interface",
        narration: "A interface selada 'public sealed interface Pagamento permits Pix, Cartao, Boleto' declara ao compilador que nenhuma outra classe fora dessas tres pode implementar Pagamento.",
        from: "SealedDomain", to: "RecordType", call: "checkPermittedSubclasses(Pix, Cartao, Boleto)",
        activeNodes: ["SealedDomain", "RecordType"],
        stack: ["ClassVerifier.checkPermittedSubclasses()"],
        state: { interfaceSelada: "Pagamento", subtiposPermitidos: ["Pix", "Cartao", "Boleto"], subtiposExternosBloqueados: true }
      },
      {
        title: "Instanciacao Imutavel com Construtor Compacto do Record",
        narration: "O record Pix valida que o valor e positivo em seu construtor compacto e inicializa os campos private final automaticamente, gerando equals/hashCode via invokedynamic (ObjectMethods.bootstrap).",
        from: "RecordType", to: "StrongEncap", call: "new Pix('cpf@banco', new BigDecimal('150.00'))",
        activeNodes: ["RecordType", "StrongEncap"],
        stack: ["Pix.<init>(chave, valor)", "Objects.requireNonNull(chave)"],
        state: { record: "Pix", camposFinaisImutaveis: true, desserializacaoSeguraPeloConstrutor: true }
      },
      {
        title: "Pattern Matching para instanceof sem Cast Redundante",
        narration: "Ao testar 'if (pag instanceof Pix pix && pix.valor().signum() > 0)', o compilador faz o cast e disponibiliza a variavel 'pix' tipada no mesmo escopo logico.",
        from: "RecordType", to: "SwitchExpr", call: "if (pag instanceof Pix pix) -> smartCast(pix)",
        activeNodes: ["RecordType", "SwitchExpr"],
        stack: ["PatternMatching.instanceof(Pix)"],
        state: { variavelDePadrao: "pix", castManualNecessario: false, escopoSeguro: true }
      },
      {
        title: "Avaliacao com Switch Expression e yield (Sem Fall-Through)",
        narration: "A Switch Expression usa setas (->) que nunca vazam para o proximo case por esquecimento de break, e usa 'yield' quando um ramo precisa executar multiplas linhas antes de retornar.",
        from: "SwitchExpr", to: "SealedDomain", call: "taxa = switch (pag) { case Pix -> 0; ... }",
        activeNodes: ["SwitchExpr", "SealedDomain"],
        stack: ["SwitchBootstraps.typeSwitch()", "yield taxaCalculada"],
        state: { expressaoRetornaValor: true, riscoDeFallThrough: "Zero", defaultNecessario: false }
      },
      {
        title: "Exaustividade Garantida e Encapsulamento Forte (JEP 403)",
        narration: "Como Pagamento e selado, o compilador garante que todos os 3 subtipos foram cobertos sem precisar de default. Na JVM, a JEP 403 bloqueia reflexao ilegal interna sem --add-opens.",
        from: "StrongEncap", to: "SealedDomain", call: "Compiler.verifyExhaustiveness() + JEP403.enforce()",
        activeNodes: ["StrongEncap", "SealedDomain"],
        stack: ["Flow.checkExhaustiveSwitch()", "JVM.enforceStrongEncapsulation()"],
        state: { switchExaustivo: true, jep403IllegalAccess: "Removido (Encapsulamento Forte)", baselineEnterprise: "Spring Boot 3 / Quarkus 3" }
      }
    ]
  },

  "jv-cap-8": {
    code: "J08",
    layerIndex: 3,
    scopeType: "Virtual Threads M:N (Project Loom) & Pattern Matching (Java 21 LTS)",
    nodes: [
      { id: "VTExecutor", label: "VirtualThreadExecutor", stereo: "«JEP-444»", x: 130, y: 140, addr: "0xJV29", methods: ["newVirtualThreadPerTask()", "startVirtualThread()"] },
      { id: "CarrierPool", label: "Carrier Threads (ForkJoin)", stereo: "«OS-threads»", x: 440, y: 80, addr: "0xJV30", methods: ["mount(Continuation)", "unmountOnBlockingIO()"] },
      { id: "HeapContinuation", label: "Pilha Continuation no Heap", stereo: "«stack-chunk»", x: 440, y: 240, addr: "0xJV31", methods: ["yieldContinuation()", "thawStackFrames()"] },
      { id: "SocketPoller", label: "Poller NIO / Banco JDBC", stereo: "«non-blocking»", x: 750, y: 160, addr: "0xJV32", methods: ["registerEpoll/KQueue()", "unparkVirtualThread()"] }
    ],
    links: [
      { from: "VTExecutor", to: "CarrierPool", label: "1. monta Virtual Thread" },
      { from: "CarrierPool", to: "HeapContinuation", label: "2. desmonta ao bloquear em I/O" },
      { from: "HeapContinuation", to: "SocketPoller", label: "3. aguarda epoll/kqueue" },
      { from: "SocketPoller", to: "CarrierPool", label: "4. remonta quando dado chega" }
    ],
    steps: [
      {
        title: "Criacao Instantanea da Virtual Thread (Sem Pool Fixo)",
        narration: "Ao receber uma requisicao HTTP, o executor cria uma nova VirtualThread em menos de 1 microssegundo, alocando apenas ~300 bytes no heap em vez de 1 MB de stack do SO.",
        from: "VTExecutor", to: "CarrierPool", call: "Thread.ofVirtual().start(tarefaRequisicao)",
        activeNodes: ["VTExecutor", "CarrierPool"],
        stack: ["VirtualThread.start()", "ForkJoinPool.externalPush()"],
        state: { virtualThreadsAtivas: 100000, carrierThreadsSO: 8, memoriaPorVirtualThread: "~400 bytes" }
      },
      {
        title: "Montagem (Mount) na Carrier Thread do Sistema Operacional",
        narration: "Um worker do ForkJoinPool (Carrier Thread) monta a Virtual Thread e inicia a execucao do codigo imperativo normal ate encontrar uma chamada JDBC ou HTTP.",
        from: "CarrierPool", to: "SocketPoller", call: "Continuation.run() -> jdbcStatement.executeQuery()",
        activeNodes: ["CarrierPool", "SocketPoller"],
        stack: ["CarrierThread-1.mount(vt#84920)", "PedidoService.buscarNoBanco()"],
        state: { carrierThread: "ForkJoinPool-1-worker-1", montada: "VirtualThread[#84920]", estado: "RUNNING" }
      },
      {
        title: "Bloqueio de I/O: Desmontagem (Unmount) para o Heap",
        narration: "Quando o socket aguarda resposta do banco, a JVM intercepta a chamada, copia os quadros da pilha da Virtual Thread para o Heap (StackChunk) e DESMONTA da Carrier Thread!",
        from: "CarrierPool", to: "HeapContinuation", call: "Continuation.yield() -> unmountFromCarrier()",
        activeNodes: ["CarrierPool", "HeapContinuation"],
        stack: ["VirtualThread.park()", "Continuation.yield0() [Stack salva no Heap]"],
        state: { carrierThreadStatus: "LIVRE (pegou outra Virtual Thread!)", vt84920Status: "PARKED no Heap", nucleoCpuBloqueado: false }
      },
      {
        title: "Notificacao do Poller do SO quando o Dado Chega",
        narration: "Enquanto a Carrier Thread processou outras 500 requisicoes, o subsistema epoll/kqueue do SO avisa a JVM que os bytes do banco PostgreSQL chegaram no socket.",
        from: "HeapContinuation", to: "SocketPoller", call: "Poller.poll() -> LockSupport.unpark(vt#84920)",
        activeNodes: ["HeapContinuation", "SocketPoller"],
        stack: ["EPollPoller.processEvents()", "VirtualThread.unpark()"],
        state: { eventoRede: "Dados JDBC disponiveis", vt84920Status: "RUNNABLE (Pronta para remontar)" }
      },
      {
        title: "Remontagem Transparente e Conclusao da Requisicao",
        narration: "Qualquer Carrier Thread disponivel remonta os quadros de pilha da vt#84920 do heap e continua na linha exata apos o executeQuery(), preservando stack trace e debugger!",
        from: "SocketPoller", to: "CarrierPool", call: "CarrierThread-3.mount(vt#84920) -> resume()",
        activeNodes: ["SocketPoller", "CarrierPool"],
        stack: ["CarrierThread-3.mount(vt#84920)", "PedidoService.buscarNoBanco() -> return Pedido"],
        state: { carrierRemontada: "ForkJoinPool-1-worker-3", throughputTotal: "95.000 req/s", codigoReativoComplexo: "Desnecessario" }
      }
    ]
  },

  "jv-cap-9": {
    code: "J09",
    layerIndex: 3,
    scopeType: "Foreign Function & Memory (Panama), Gatherers & ScopedValue (Java 22 a 25 LTS)",
    nodes: [
      { id: "ScopedCtx", label: "ScopedValue & TaskScope", stereo: "«Java-25-LTS»", x: 130, y: 140, addr: "0xJV33", methods: ["ScopedValue.where()", "StructuredTaskScope"] },
      { id: "PanamaArena", label: "Arena & MemorySegment", stereo: "«JEP-454»", x: 440, y: 80, addr: "0xJV34", methods: ["Arena.ofConfined()", "allocateOffHeap()"] },
      { id: "NativeLinker", label: "Foreign Linker (C/Rust)", stereo: "«downcall»", x: 440, y: 240, addr: "0xJV35", methods: ["downcallHandle()", "invokeExact()"] },
      { id: "GathererPipe", label: "Stream.gather(Gatherers)", stereo: "«JEP-485»", x: 750, y: 160, addr: "0xJV36", methods: ["windowFixed(3)", "windowSliding(2)"] }
    ],
    links: [
      { from: "ScopedCtx", to: "PanamaArena", label: "1. abre contexto e Arena" },
      { from: "PanamaArena", to: "NativeLinker", label: "2. passa ponteiro seguro" },
      { from: "NativeLinker", to: "GathererPipe", label: "3. processa janelas Stream" },
      { from: "GathererPipe", to: "PanamaArena", label: "4. libera off-heap deterministico" }
    ],
    steps: [
      {
        title: "Propagacao Imutavel de Contexto com ScopedValue",
        narration: "Em vez de usar ThreadLocal pesado, o Java 25 vincula o contexto de seguranca em um ScopedValue imutavel que e herdado instantaneamente por todas as Virtual Threads filhas do StructuredTaskScope.",
        from: "ScopedCtx", to: "PanamaArena", call: "ScopedValue.where(CREDENCIAIS, token).run(...)",
        activeNodes: ["ScopedCtx", "PanamaArena"],
        stack: ["ScopedValue.runWith()", "StructuredTaskScope.ShutdownOnFailure.fork()"],
        state: { mecanismoContexto: "ScopedValue (Imutavel)", copiaDeMemoriaEmSubthreads: "Zero (O(1))", vazamentoDeThreadLocal: "Impossivel" }
      },
      {
        title: "Alocacao Off-Heap Segura com Arena Confinada (Panama)",
        narration: "Dentro de um try (var arena = Arena.ofConfined()), a aplicacao aloca um MemorySegment fora do heap da JVM com verificacao rigorosa de limites espaciais e temporais.",
        from: "PanamaArena", to: "NativeLinker", call: "MemorySegment seg = arena.allocateFrom('Payload Nativo')",
        activeNodes: ["PanamaArena", "NativeLinker"],
        stack: ["Arena.ofConfined()", "SegmentFactories.allocateNativeSegment()"],
        state: { regiaoMemoria: "Off-Heap Nativo", threadOwner: "VirtualThread-1", protecaoOutOfBounds: "Ativa" }
      },
      {
        title: "Chamada Direta a Biblioteca C/Rust sem JNI (Linker Downcall)",
        narration: "O Linker.nativeLinker() cria um MethodHandle tipado para a funcao C nativa (ex: strlen ou motor SIMD), invocando-a na velocidade de ponteiro nativo sem uma unica linha de C JNI.",
        from: "NativeLinker", to: "GathererPipe", call: "MethodHandle.invokeExact(seg) -> 14L",
        activeNodes: ["NativeLinker", "GathererPipe"],
        stack: ["Linker.downcallHandle(FunctionDescriptor)", "NativeEntryPoint.invoke()"],
        state: { mecanismoInterop: "FFM API (JEP 454)", codigoColaJniEmC: "Nenhum", retornoNativo: 14 }
      },
      {
        title: "Transformacao Intermediaria com Stream Gatherers (JEP 485)",
        narration: "Os resultados sao agrupados em janelas deslizantes usando stream.gather(Gatherers.windowSliding(3)) e variaveis descartadas usam o padrao anonimo _ (JEP 456).",
        from: "GathererPipe", to: "ScopedCtx", call: "stream.gather(Gatherers.windowFixed(3)).toList()",
        activeNodes: ["GathererPipe", "ScopedCtx"],
        stack: ["ReferencePipeline.gather()", "Gatherers$WindowFixed.integrator()"],
        state: { operacaoStream: "Gatherers.windowFixed(3)", variaveisAnonimas: "catch (Exception _)", objectHeaderSize: "64-bit (Lilliput)" }
      },
      {
        title: "Desalocacao Deterministica Imediata da Memoria Off-Heap",
        narration: "Ao sair do bloco try-with-resources da Arena, a memoria nativa e liberada instantaneamente sem depender do GC, e qualquer tentativa de uso posterior lanca IllegalStateException!",
        from: "GathererPipe", to: "PanamaArena", call: "arena.close() -> freeMemoryDeterministic()",
        activeNodes: ["GathererPipe", "PanamaArena"],
        stack: ["ConfinedSession.close()", "Unsafe.freeMemory()"],
        state: { memoriaOffHeapLiberada: true, riscoUseAfterFree: "Zero (Bloqueado pela Arena)", versaoPlataforma: "Java 25 LTS" }
      }
    ]
  },

  "jv-cap-10": {
    code: "J10",
    layerIndex: 4,
    scopeType: "Spring Boot (1.x a 3.4+): Auto-Configuration, AOT & Virtual Threads",
    nodes: [
      { id: "BootApp", label: "@SpringBootApplication", stereo: "«Boot-3.4»", x: 130, y: 140, addr: "0xJV37", methods: ["SpringApplication.run()", "loadAutoConfigImports()"] },
      { id: "ConditionEngine", label: "ConditionEvaluator & AOT", stereo: "«@Conditional»", x: 440, y: 80, addr: "0xJV38", methods: ["@ConditionalOnClass", "processAheadOfTime()"] },
      { id: "VirtualTomcat", label: "Tomcat + Virtual Threads", stereo: "«Java-21»", x: 440, y: 240, addr: "0xJV39", methods: ["spring.threads.virtual=true", "dispatchRequest()"] },
      { id: "RestAndData", label: "RestClient & Jakarta JPA", stereo: "«jakarta.*»", x: 750, y: 160, addr: "0xJV40", methods: ["restClient.get().retrieve()", "ProblemDetail.forStatus()"] }
    ],
    links: [
      { from: "BootApp", to: "ConditionEngine", label: "1. le AutoConfiguration.imports" },
      { from: "ConditionEngine", to: "VirtualTomcat", label: "2. configura Tomcat Virtual" },
      { from: "VirtualTomcat", to: "RestAndData", label: "3. executa Controller em VT" },
      { from: "RestAndData", to: "BootApp", label: "4. retorna Record / RFC 7807" }
    ],
    steps: [
      {
        title: "Descoberta de Auto-Configuration no Spring Boot 3.x",
        narration: "Ao iniciar, o Spring Boot 3 le META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports (que substituiu o antigo spring.factories do Boot 1.x/2.x).",
        from: "BootApp", to: "ConditionEngine", call: "ImportCandidates.load(AutoConfiguration.class)",
        activeNodes: ["BootApp", "ConditionEngine"],
        stack: ["SpringApplication.run()", "AutoConfigurationImportSelector.getCandidateConfigurations()"],
        state: { versaoSpringBoot: "3.4+", baselineJava: "Java 17 / 21", namespaceCorporativo: "jakarta.*" }
      },
      {
        title: "Avaliacao Condicional de Beans e Processamento AOT",
        narration: "O ConditionEvaluator verifica @ConditionalOnClass(DataSource.class) e @ConditionalOnMissingBean, instanciando automaticamente o HikariCP, Hibernate 6 e Micrometer Observation.",
        from: "ConditionEngine", to: "VirtualTomcat", call: "ConditionEvaluator.shouldSkip() -> registerBeans()",
        activeNodes: ["ConditionEngine", "VirtualTomcat"],
        stack: ["ConfigurationClassPostProcessor.processConfigBeanDefinitions()"],
        state: { hikariDataSource: "Auto-Configurado", securityFilterChain: "Lambda DSL Ativa", aotSuportado: true }
      },
      {
        title: "Ativacao de Virtual Threads com Uma Unica Propriedade",
        narration: "Com spring.threads.virtual.enabled=true no Java 21+, o Spring Boot reconfigura o ProtocolHandler do Tomcat/Jetty para despachar cada requisicao HTTP em uma Virtual Thread leve.",
        from: "VirtualTomcat", to: "RestAndData", call: "TomcatVirtualThreadExecutor.execute(HttpRequest)",
        activeNodes: ["VirtualTomcat", "RestAndData"],
        stack: ["VirtualThreadExecutor.execute()", "DispatcherServlet.doDispatch()"],
        state: { threadAtendendoHttp: "VirtualThread[#1042]/runnable@ForkJoinPool", poolDeSistemaBloqueado: false }
      },
      {
        title: "Chamada Externa com o Novo RestClient e Persistencia Jakarta",
        narration: "O Controller recebe um Java Record validado com @Valid (jakarta.validation), consulta o banco via JpaRepository e chama um servico externo usando o novo RestClient fluente do Boot 3.2+.",
        from: "RestAndData", to: "VirtualTomcat", call: "restClient.get().uri('/score/{cpf}').retrieve().body(ScoreRecord.class)",
        activeNodes: ["RestAndData", "VirtualTomcat"],
        stack: ["PedidoController.criar()", "DefaultRestClient.retrieve() [Unmount suave na VT]"],
        state: { clienteHttp: "RestClient (Boot 3.2+)", dtoImutavel: "Java Record", testcontainersDev: "@ServiceConnection" }
      },
      {
        title: "Resposta Padronizada (Record JSON ou ProblemDetails RFC 7807)",
        narration: "O Jackson serializa o Record de resposta ou, em caso de erro de regra de negocio, retorna um ProblemDetail padronizado pela RFC 7807 com traceId do Micrometer Tracing.",
        from: "RestAndData", to: "BootApp", call: "return ResponseEntity.ok(ResumoPedidoRecord)",
        activeNodes: ["RestAndData", "BootApp"],
        stack: ["RequestResponseBodyMethodProcessor.writeWithMessageConverters()"],
        state: { statusHttp: 200, padraoErro: "RFC 7807 ProblemDetails", observabilidade: "Micrometer + OpenTelemetry" }
      }
    ]
  },

  "jv-cap-11": {
    code: "J11",
    layerIndex: 4,
    scopeType: "Quarkus (1.x a 3.15 LTS): Build-Time Augmentation, ArC & GraalVM",
    nodes: [
      { id: "JandexBuild", label: "Indexador Jandex & BuildSteps", stereo: "«Build-Time»", x: 130, y: 140, addr: "0xJV41", methods: ["indexClasses()", "recordBytecode()"] },
      { id: "ArcCdi", label: "Container CDI ArC (AOT)", stereo: "«zero-reflection»", x: 440, y: 80, addr: "0xJV42", methods: ["validateInjectionAtBuild()", "generateBeanMetadata()"] },
      { id: "VertxEngine", label: "Motor Vert.x + quarkus-rest", stereo: "«I/O-Engine»", x: 440, y: 240, addr: "0xJV43", methods: ["routeOnEventLoop()", "@RunOnVirtualThread"] },
      { id: "NativeOrJvm", label: "Fast-JAR JVM / GraalVM Native", stereo: "«Subatomic»", x: 750, y: 160, addr: "0xJV44", methods: ["bootIn15ms()", "Panache.persist()"] }
    ],
    links: [
      { from: "JandexBuild", to: "ArcCdi", label: "1. analisa classes no build" },
      { from: "ArcCdi", to: "NativeOrJvm", label: "2. grava wiring em bytecode" },
      { from: "NativeOrJvm", to: "VertxEngine", label: "3. inicia em milissegundos" },
      { from: "VertxEngine", to: "NativeOrJvm", label: "4. executa Mutiny / VT" }
    ],
    steps: [
      {
        title: "Indexacao Jandex e Build-Time Augmentation na Compilacao",
        narration: "Durante o 'mvn package', o Quarkus nao espera o runtime: ele escaneia todas as anotacoes com o indexador Jandex e executa os @BuildStep das extensoes em tempo de compilacao.",
        from: "JandexBuild", to: "ArcCdi", call: "BuildStep.process(CombinedIndexBuildItem)",
        activeNodes: ["JandexBuild", "ArcCdi"],
        stack: ["QuarkusAugmentor.run()", "Index.getAnnotations(Path.class)"],
        state: { fase: "Build-Time (Compilacao)", escaneamentoEmRuntime: "Eliminado", parsersXmlCarregadosEmProducao: 0 }
      },
      {
        title: "Resolucao de Injecao de Dependencia CDI ArC sem Reflexao",
        narration: "O container ArC valida todos os pontos @Inject em tempo de compilacao (falhando o build se faltar um bean!) e gera classes de ligacao direta sem usar Field.setAccessible() em runtime.",
        from: "ArcCdi", to: "NativeOrJvm", call: "BeanProcessor.build() -> Gizmo.emitBytecode()",
        activeNodes: ["ArcCdi", "NativeOrJvm"],
        stack: ["ArcProcessor.validateBeans()", "BeanGenerator.generateClass()"],
        state: { reflexaoDinamicaCdi: "Zero", deteccaoErroDeInjecao: "Em Tempo de Compilacao", metadadosMortosEliminados: true }
      },
      {
        title: "Startup Instantaneo (JVM Fast-JAR ou Binario GraalVM Native)",
        narration: "Como todo o trabalho pesado de inicializacao ja foi gravado no bytecode, a aplicacao inicia em ~0.6s na JVM padrao ou em ~0.015s (15 ms!) como executavel nativo GraalVM.",
        from: "NativeOrJvm", to: "VertxEngine", call: "ApplicationImpl.doStart() [15ms]",
        activeNodes: ["NativeOrJvm", "VertxEngine"],
        stack: ["Quarkus.run()", "VertxCoreRecorder.start()"],
        state: { startupJvmFastJar: "620 ms (~75 MB RAM)", startupGraalVmNative: "15 ms (~28 MB RAM)", devServicesAtivoEmDev: true }
      },
      {
        title: "Roteamento Inteligente no quarkus-rest (Event Loop vs Virtual Thread)",
        narration: "Quando chega uma requisicao HTTP no Vert.x/Netty, endpoints reativos (Uni<T>) rodam direto na IO Thread sem troca de contexto, enquanto endpoints @RunOnVirtualThread rodam em Virtual Threads do Java 21.",
        from: "VertxEngine", to: "NativeOrJvm", call: "@RunOnVirtualThread -> VirtualThread.execute(PedidoResource::criar)",
        activeNodes: ["VertxEngine", "NativeOrJvm"],
        stack: ["QuarkusRestHandler.handle()", "VirtualThreadsRecorder.run()"],
        state: { extensaoWeb: "quarkus-rest (Quarkus 3.8+)", despacho: "@RunOnVirtualThread (Java 21)", bloqueioDeEventLoop: false }
      },
      {
        title: "Persistencia Simplificada com Hibernate ORM with Panache",
        narration: "A entidade persiste no banco com Pedido.persist() (Active Record) ou PanacheRepository, utilizando bytecode enhancement gerado no build para dirty-checking instantaneo.",
        from: "NativeOrJvm", to: "VertxEngine", call: "pedido.persist() -> HTTP 201 Created",
        activeNodes: ["NativeOrJvm", "VertxEngine"],
        stack: ["PanacheEntityBase.persist()", "HibernateOrmRecorder.commit()"],
        state: { orm: "Hibernate 6 + Panache", bytecodeEnhancement: "Ativo em Build-Time", migracao2Para3: "quarkus update (OpenRewrite)" }
      }
    ]
  },

  "jv-cap-12": {
    code: "J12",
    layerIndex: 4,
    scopeType: "Jakarta EE 11, Micronaut 4 & Runtime JIT C2 vs GraalVM AOT vs CRaC",
    nodes: [
      { id: "JakartaSpec", label: "Jakarta EE 10/11 & Micronaut 4", stereo: "«standards»", x: 130, y: 140, addr: "0xJV45", methods: ["jakarta.* namespace", "JSR-269 Compile-Time DI"] },
      { id: "HotSpotC2", label: "JVM HotSpot (JIT C2 + ZGC)", stereo: "«Peak-Throughput»", x: 440, y: 80, addr: "0xJV46", methods: ["profileGuidedInline()", "GenerationalZGC()"] },
      { id: "GraalAOT", label: "GraalVM Native Image (AOT)", stereo: "«Instant-Boot»", x: 440, y: 240, addr: "0xJV47", methods: ["closedWorldAnalysis()", "buildNativeBinary()"] },
      { id: "CracLeyden", label: "CRaC & Project Leyden Cache", stereo: "«Warm-Snapshot»", x: 750, y: 160, addr: "0xJV48", methods: ["checkpointRestore()", "loadAotCache()"] }
    ],
    links: [
      { from: "JakartaSpec", to: "HotSpotC2", label: "1. caminho A: JIT para 24x7" },
      { from: "JakartaSpec", to: "GraalAOT", label: "2. caminho B: AOT p/ Serverless" },
      { from: "HotSpotC2", to: "CracLeyden", label: "3. caminho C: snapshot aquecido" },
      { from: "CracLeyden", to: "JakartaSpec", label: "4. boot rapido + pico JIT" }
    ],
    steps: [
      {
        title: "Padronizacao no Namespace jakarta.* e Compile-Time DI",
        narration: "A aplicacao utiliza as APIs do Jakarta EE 10/11 (jakarta.persistence, jakarta.ws.rs, Jakarta Data) ou processadores de anotacao JSR-269 do Micronaut 4 para gerar metadados sem reflexao.",
        from: "JakartaSpec", to: "HotSpotC2", call: "javac -> AnnotationProcessor (BeanDefinitionWriter)",
        activeNodes: ["JakartaSpec", "HotSpotC2"],
        stack: ["JavaCompiler.processAnnotations()", "JakartaEE11.validateContracts()"],
        state: { especificacao: "Jakarta EE 10 / 11", namespace: "jakarta.*", injecaoMicronaut: "100% Compile-Time" }
      },
      {
        title: "Opcao 1: Execucao na JVM HotSpot (JIT C2 + Generational ZGC)",
        narration: "Para sistemas 24x7 de alto volume, a JVM HotSpot perfila o trafego real em producao, aplica otimizacoes especulativas agressivas no C2 e usa o ZGC Generacional para pausas < 1 ms.",
        from: "HotSpotC2", to: "JakartaSpec", call: "C2JIT.speculativeOptimize() + ZGC.collectYoung()",
        activeNodes: ["HotSpotC2", "JakartaSpec"],
        stack: ["C2Compiler.optimizeLoop()", "ZDriverMajor.gc() [pausa: 0.2ms]"],
        state: { perfilExecucao: "Servicos 24x7 Long-Lived", throughputDePico: "Maximo (100%)", latenciaP999: "< 1 ms (ZGC Generacional)" }
      },
      {
        title: "Opcao 2: Compilacao AOT para GraalVM Native Image",
        narration: "Para Serverless (AWS Lambda / Knative) e CLIs, o native-image aplica a Closed-World Assumption, removendo codigo nao alcancavel e gerando um executavel que liga em 15 ms sem JVM.",
        from: "JakartaSpec", to: "GraalAOT", call: "native-image --no-fallback -H:Name=servico-nativo",
        activeNodes: ["JakartaSpec", "GraalAOT"],
        stack: ["PointsToAnalysis.run()", "NativeImageHeapWriter.write()"],
        state: { perfilExecucao: "Serverless / Scale-to-Zero", tempoStartup: "15 a 40 ms", memoriaRssInicial: "25 a 50 MB" }
      },
      {
        title: "Opcao 3: Checkpoint / Restore (CRaC) e Project Leyden",
        narration: "Com CRaC e Project Leyden (Java 24/25), a aplicacao aquece na JVM HotSpot normal, fecha sockets abertos via Resource.beforeCheckpoint() e grava a memoria ja otimizada em disco.",
        from: "HotSpotC2", to: "CracLeyden", call: "Core.checkpointRestore() / -XX:AOTCache=app.aot",
        activeNodes: ["HotSpotC2", "CracLeyden"],
        stack: ["CRaC.beforeCheckpoint()", "JVM.dumpWarmMemoryImage()"],
        state: { classesPreCarregadas: true, codigoJitPreservado: true, restricaoClosedWorld: "Nenhuma" }
      },
      {
        title: "Convergencia Arquitetural: Startup Instantaneo com Forca Total da JVM",
        narration: "Ao escalar replicas no Kubernetes a partir do checkpoint CRaC ou cache Leyden, o container restaura em < 50 ms ja aquecido na velocidade maxima do JIT C2 e com compatibilidade total!",
        from: "CracLeyden", to: "JakartaSpec", call: "CRaC.afterRestore() -> Ready in 45ms at 100% JIT speed",
        activeNodes: ["CracLeyden", "JakartaSpec"],
        stack: ["CRaC.afterRestore()", "Server.acceptTrafficImmediately()"],
        state: { tempoRestauracao: "45 ms", throughputPosBoot: "100% Imediato (Sem Warmup)", ecossistemaCompativel: "Spring Boot 3 / Quarkus 3 / Micronaut 4" }
      }
    ]
  }
};
