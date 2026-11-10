/**
 * Especificacao de Animacao Interativa Passo a Passo para Capitulos com Fluxo Estrutural
 * do livro "Java: Guia Completo de Versoes, JVM & Ecossistema".
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
        stack: ["JlinkTask.run()", "ImagePluginStack.visitImage()"],
        state: { modulosEmbarcados: ["java.base", "java.sql"], tamanhoFinalImagemMB: 35, tempoInicializacaoMs: 38 }
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
  }
};
