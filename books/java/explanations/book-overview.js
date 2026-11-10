/**
 * Dados e conteudos completos sobre o Guia Definitivo da Plataforma Java:
 * "Java: Guia Completo de Versoes, JVM & Ecossistema"
 * (Do JDK 1.0 ao Java 25 LTS, Retrocompatibilidade Binaria, Spring Boot, Quarkus, Jakarta EE e Micronaut)
 */

export const javaVersionsMatrix = [
  {
    version: "JDK 1.0 / 1.1",
    year: "1996-1997",
    lts: "Legado",
    classMajor: "45 (0x2D)",
    highlights: "Genese da JVM, Bytecode .class, Garbage Collector Mark-and-Sweep, Applets, AWT, Inner Classes, JavaBeans, JDBC e Reflection API.",
    howToUse: "Compilacao basica com javac e execucao interpretada no java. Introducao de contratos de serializacao (Serializable) e drivers JDBC.",
    retrocompatibility: "Bytecode compilado no JDK 1.0 (major 45) ainda pode ser carregado e executado pelas JVMs modernas (Java 21/25), exceto APIs de Applets/SecurityManager removidas."
  },
  {
    version: "J2SE 1.2 / 1.3",
    year: "1998-2000",
    lts: "Legado",
    classMajor: "46-47",
    highlights: "Collections Framework (List, Map, Set, ArrayList, HashMap), HotSpot JVM (compilador JIT adaptativo C1/C2), Swing, strictfp, JNDI e Dynamic Proxies.",
    howToUse: "Substituir Vector e Hashtable sincronizados por ArrayList e HashMap; usar java.lang.reflect.Proxy para interceptacao dinamica.",
    retrocompatibility: "Vector e Hashtable foram retrofittados para implementar List e Map, preservando 100% do codigo legado do JDK 1.0/1.1."
  },
  {
    version: "J2SE 1.4",
    year: "2002",
    lts: "Legado",
    classMajor: "48 (0x30)",
    highlights: "Java NIO (Channels, Buffers, Selectors non-blocking), Expressoes Regulares (java.util.regex), palavra-chave assert, Chained Exceptions, JAXP e Java Web Start.",
    howToUse: "Usar ByteBuffer e SocketChannel para I/O de rede de alta performance; encadear causas raiz de erro via new RuntimeException(msg, cause).",
    retrocompatibility: "A palavra reservada assert podia conflitar com identificadores antigos, exigindo a flag -source 1.4 na transicao gradual."
  },
  {
    version: "Java 5 (J2SE 5.0)",
    year: "2004",
    lts: "Historico",
    classMajor: "49 (0x31)",
    highlights: "Generics com Type Erasure, Annotations (@interface), Enums tipados, Autoboxing/Unboxing, Varargs (...), for-each, java.util.concurrent (Doug Lea) e JMM (JSR-133).",
    howToUse: "Tipar colecoes List<String>, criar pools com ExecutorService, mapas concorrentes com ConcurrentHashMap e anotacoes de metadados.",
    retrocompatibility: "Type Erasure e Bridge Methods garantiram compatibilidade binaria total: bibliotecas Java 1.4 funcionavam ao lado de codigo Java 5 sem recompilacao."
  },
  {
    version: "Java 6 (Java SE 6)",
    year: "2006",
    lts: "Historico",
    classMajor: "50 (0x32)",
    highlights: "Compiler API (JSR-199), Pluggable Annotation Processing (JSR-269), JAX-WS 2.0, JDBC 4.0 (auto-discovery de drivers), Scripting JSR-223 e melhorias de sincronizacao na JVM.",
    howToUse: "Processadores de anotacoes em tempo de compilacao (base do Lombok e MapStruct) e carregamento automatico de drivers JDBC sem Class.forName().",
    retrocompatibility: "Introduziu StackMapTable no bytecode (major 50) para verificacao rapida de tipos em tempo de carga, mantendo fallback para classes antigas."
  },
  {
    version: "Java 7 (Java SE 7)",
    year: "2011",
    lts: "Historico",
    classMajor: "51 (0x33)",
    highlights: "Project Coin: try-with-resources (AutoCloseable), Diamond Operator (<>), multi-catch, Strings em switch, literais binarios, NIO.2 (Path, Files), ForkJoinPool e bytecode invokedynamic.",
    howToUse: "Declarar recursos em try (var conn = ds.getConnection()) para fechamento deterministico com excecoes suprimidas; usar Files.readAllLines(Path.of(...)).",
    retrocompatibility: "Closeable passou a estender AutoCloseable automaticamente; File ganhou o metodo ponte toPath() para migracao indolor para NIO.2."
  },
  {
    version: "Java 8 (LTS)",
    year: "2014",
    lts: "LTS",
    classMajor: "52 (0x34)",
    highlights: "Expressoes Lambda, Streams API, Functional Interfaces, Default & Static Methods em interfaces, Optional<T>, java.time (JSR-310), CompletableFuture e substituicao da PermGen pelo Metaspace.",
    howToUse: "Processar dados com list.stream().filter(...).map(...).toList(), manipular datas imutaveis com LocalDate/Instant e compor assincronismo com CompletableFuture.",
    retrocompatibility: "Default methods permitiram adicionar .stream() e .forEach() na interface Collection de 1998 sem quebrar nenhuma classe implementadora existente no mundo."
  },
  {
    version: "Java 9 / Java 10",
    year: "2017-2018",
    lts: "Non-LTS",
    classMajor: "53-54",
    highlights: "Java Platform Module System (JPMS / Project Jigsaw), JShell REPL, Factory Methods (List.of, Map.of), Compact Strings (byte[]), G1GC como padrao, AppCDS e inferencia local com var (Java 10).",
    howToUse: "Modularizar com module-info.java, criar imagens enxutas com jlink, instanciar colecoes imutaveis com List.of() e simplificar variaveis locais com var.",
    retrocompatibility: "O Classpath continuou funcionando via Unnamed Module, mas o encapsulamento de internals do JDK exigiu flags --add-opens para bibliotecas baseadas em reflexao profunda."
  },
  {
    version: "Java 11 (LTS)",
    year: "2018",
    lts: "LTS",
    classMajor: "55 (0x37)",
    highlights: "Novo java.net.http.HttpClient (HTTP/2 e WebSocket nativos), execucao direta de arquivo fonte unico (java App.java), var em lambdas, novos metodos String (isBlank, lines, strip), JFR open-source e ZGC experimental.",
    howToUse: "Fazer chamadas HTTP/2 sincronas ou reativas com HttpClient.newHttpClient() e rodar scripts utilitarios diretamente com java Script.java.",
    retrocompatibility: "Remocao definitiva dos modulos Java EE (JAXB javax.xml.bind, JAX-WS, javax.annotation) e CORBA do JDK. Exige adicionar dependencias Maven/Gradle explicitas na migracao do Java 8."
  },
  {
    version: "Java 12 a 16",
    year: "2019-2021",
    lts: "Non-LTS",
    classMajor: "56-60",
    highlights: "Switch Expressions (-> e yield), Text Blocks (\"\"\"), Helpful NullPointerExceptions, Records (Java 16), Pattern Matching para instanceof (Java 16), jpackage e ZGC/Shenandoah de baixa latencia.",
    howToUse: "Modelar DTOs e Value Objects imutaveis com public record Cliente(Long id, String nome) {} e escrever queries SQL/JSON multilinhas com Text Blocks.",
    retrocompatibility: "JEP 396 (Java 16) mudou o padrao de --illegal-access de permit para deny, preparando o encapsulamento forte definitivo do Java 17."
  },
  {
    version: "Java 17 (LTS)",
    year: "2021",
    lts: "LTS",
    classMajor: "61 (0x3D)",
    highlights: "Sealed Classes & Interfaces (permits), Encapsulamento Forte dos internos do JDK (JEP 403), nova API de geradores pseudoaleatorios (RandomGenerator), restauracao da semantica always-strictfp e remocao do Applet API/RMI Activation.",
    howToUse: "Modelar hierarquias algebricas fechadas com public sealed interface Pagamento permits Pix, Cartao, Boleto {} para exaustividade garantida pelo compilador.",
    retrocompatibility: "Baseline obrigatorio do Spring Boot 3.x e Quarkus 3.x. A flag --illegal-access foi desativada; acesso reflexivo a java.lang.*/sun.* exige --add-opens explicito."
  },
  {
    version: "Java 18 a 20",
    year: "2022-2023",
    lts: "Non-LTS",
    classMajor: "62-64",
    highlights: "UTF-8 como charset padrao em todas as APIs (JEP 400), Simple Web Server (jwebserver), tags @snippet no JavaDoc e incubacao avancada dos projetos Loom, Panama e Amber.",
    howToUse: "Subir servidor estatico instantaneo com jwebserver -p 8080 e garantir leitura de arquivos em UTF-8 consistente entre Windows, Linux e macOS.",
    retrocompatibility: "Sistemas legados em Windows que dependiam implicitamente de windows-1252 em FileReader podem precisar definir -Dfile.encoding=COMPAT."
  },
  {
    version: "Java 21 (LTS)",
    year: "2023",
    lts: "LTS",
    classMajor: "65 (0x41)",
    highlights: "Virtual Threads definitivas (Project Loom • JEP 444), Pattern Matching for switch (JEP 441), Record Patterns (JEP 440), Sequenced Collections (JEP 431), Generational ZGC (JEP 439) e Key Encapsulation Mechanism API.",
    howToUse: "Escalar milhoes de requisicoes bloqueantes com Executors.newVirtualThreadPerTaskExecutor(), desestruturar records no switch com guardas when e usar list.getFirst()/getLast().",
    retrocompatibility: "VirtualThread e subclasse direta de java.lang.Thread, preservando 100% das bibliotecas JDBC, Socket e frameworks existentes sem exigir async/await."
  },
  {
    version: "Java 22 a 24",
    year: "2024-2025",
    lts: "Non-LTS",
    classMajor: "66-68",
    highlights: "Foreign Function & Memory API (Panama • JEP 454), Unnamed Variables & Patterns (_) (JEP 456), Launch Multi-File Source-Code Programs, Markdown em JavaDoc (///), Stream Gatherers (JEP 485), Class-File API (JEP 484) e sincronizacao de Virtual Threads sem Pinning (JEP 491).",
    howToUse: "Invocar bibliotecas C nativas com Arena e MemorySegment sem JNI, descartar variaveis nao usadas com _ e criar operacoes intermediarias customizadas com stream.gather(...).",
    retrocompatibility: "JEP 491 no Java 24 elimina o gargalo historico de Thread Pinning dentro de blocos synchronized em Virtual Threads; Security Manager foi permanentemente desabilitado."
  },
  {
    version: "Java 25 (LTS)",
    year: "2025",
    lts: "LTS",
    classMajor: "69 (0x45)",
    highlights: "Consolidacao LTS de nova geracao: Scoped Values para compartilhamento imutavel em Virtual Threads, Structured Concurrency, Compact Object Headers (Project Lilliput), Flexible Constructor Bodies (instrucoes antes de super()), Primitive Types em Pattern Matching e Leyden AOT Cache.",
    howToUse: "Substituir ThreadLocal pesado por ScopedValue.where(...).run(...), validar argumentos antes de super() no construtor e habilitar Compact Object Headers para reduzir 20% de RAM.",
    retrocompatibility: "Carregamento dinamico de Java Agents e chamadas JNI sem permissao emitem alertas ou exigem --enable-native-access, fortalecendo a integridade por padrao (Integrity by Default)."
  }
];

export const javaFrameworksHistory = {
  springBoot: [
    {
      version: "Spring Boot 1.0 a 1.5",
      year: "2014-2017",
      minJava: "Java 6 / 7 / 8",
      keyFeatures: "Revolucao Convention-over-Configuration: eliminacao do XML via @SpringBootApplication, Starters opinativos (spring-boot-starter-web), Servidor Tomcat/Jetty embarcado em Fat JAR executavel e Spring Boot Actuator 1.x.",
      breakingAndCompat: "Baseado em Spring Framework 4.x e Servlet 3.1 (javax.servlet). Introduziu spring.factories para descoberta automatica de autoconfiguracoes."
    },
    {
      version: "Spring Boot 2.0 a 2.7",
      year: "2018-2022",
      minJava: "Java 8 (suporte a 11 e 17)",
      keyFeatures: "Baseline Java 8, stack reativa nao-bloqueante Spring WebFlux com Project Reactor e Netty, reformulacao do Actuator com Micrometer (metricas nativas Prometheus/Grafana), suporte a Kotlin, Layered JARs para Docker e probes de Liveness/Readiness para Kubernetes.",
      breakingAndCompat: "Spring Boot 2.7 iniciou a transicao de META-INF/spring.factories para META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports."
    },
    {
      version: "Spring Boot 3.0",
      year: "Nov 2022",
      minJava: "Java 17 (minimo obrigatorio)",
      keyFeatures: "Marco historico: migracao completa para Jakarta EE 10 (pacote jakarta.*), motor de processamento AOT (Ahead-of-Time) e suporte oficial de primeira classe para GraalVM Native Images, Observability API unificada (Micrometer Tracing) e suporte a ProblemDetails (RFC 7807).",
      breakingAndCompat: "Quebra binaria planejada de namespace: todo codigo que importava javax.persistence.*, javax.servlet.* ou javax.validation.* precisa ser atualizado para jakarta.*."
    },
    {
      version: "Spring Boot 3.1",
      year: "Mai 2023",
      minJava: "Java 17+",
      keyFeatures: "Integracao nativa com Docker Compose em modo de desenvolvimento e @ServiceConnection para Testcontainers (configuracao zero de propriedades dinamicas em testes de integracao), alem de configuracao centralizada de SSL Bundles.",
      breakingAndCompat: "Substitui o padrao legado de @DynamicPropertySource manual em testes com containers por beans @ServiceConnection fortemente tipados."
    },
    {
      version: "Spring Boot 3.2",
      year: "Nov 2023",
      minJava: "Java 17+ (otimizado p/ Java 21)",
      keyFeatures: "Suporte nativo a Virtual Threads do Java 21 via propriedade unica (spring.threads.virtual.enabled=true), novo RestClient sincrono fluente, JdbcClient unificado e suporte preliminar a checkpoints CRaC (Coordinated Restore at Checkpoint).",
      breakingAndCompat: "RestClient oferece alternativa moderna e ergonomica ao RestTemplate legado sem exigir a dependencia reativa do WebClient."
    },
    {
      version: "Spring Boot 3.3 / 3.4+",
      year: "2024-2025",
      minJava: "Java 17 / 21 / 25",
      keyFeatures: "Class Data Sharing (CDS) facilitado para startup rapido na JVM padrao, Structured Logging nativo (ECS, Logstash, JSON direto sem bibliotecas extras), melhorias de Virtual Threads no OTLP/Undertow, suporte a múltiplos Docker Compose files e integracao madura com Spring AI.",
      breakingAndCompat: "Totalmente compativel com a serie 3.x; validação de configuracao com @ConfigurationProperties mais rigorosa e otimizacao de memoria em imagens OCI/Paketo."
    }
  ],
  quarkus: [
    {
      version: "Quarkus 1.0 a 1.13",
      year: "2019-2021",
      minJava: "Java 8 / 11",
      keyFeatures: "Nascimento do 'Supersonic Subatomic Java': arquitetura Build-Time Augmentation que move parsing de configuracao, escaneamento de classpath e injecao de dependencia (ArC CDI) para o tempo de compilacao, gerando binarios GraalVM com startup em milissegundos.",
      breakingAndCompat: "Adotou especificacoes Eclipse MicroProfile e JPA com Hibernate ORM with Panache (padroes Active Record e Repository simplificados)."
    },
    {
      version: "Quarkus 2.0 a 2.16",
      year: "2021-2023",
      minJava: "Java 11 / 17",
      keyFeatures: "Motor I/O unificado sobre Eclipse Vert.x e Netty (despacho automatico entre worker threads e event-loop), RESTEasy Reactive, Dev UI 2.0, Continuous Testing no terminal e Dev Services (provisionamento automatico de bancos e Kafka via Testcontainers sem configuracao).",
      breakingAndCompat: "Ultima linha baseada no namespace legado javax.*. Introduziu programacao reativa expressiva com a biblioteca Mutiny (Uni<T> e Multi<T>)."
    },
    {
      version: "Quarkus 3.0 / 3.2 LTS",
      year: "2023",
      minJava: "Java 17+",
      keyFeatures: "Migracao para Jakarta EE 10 (jakarta.*), Hibernate ORM 6, MicroProfile 6, nova Dev UI extensivel e suporte aprimorado à anotacao @RunOnVirtualThread para executar endpoints bloqueantes em Virtual Threads.",
      breakingAndCompat: "Ferramenta oficial 'quarkus update' baseada em OpenRewrite automatiza a reescrita de pacotes javax.* para jakarta.* e atualizacao do pom.xml/build.gradle."
    },
    {
      version: "Quarkus 3.8 LTS / 3.15 LTS+",
      year: "2024-2025",
      minJava: "Java 17 / 21 (minimo 17)",
      keyFeatures: "Renomeacao e consolidacao da stack web para quarkus-rest (antigo RESTEasy Reactive), suporte pleno ao Java 21 LTS e Virtual Threads, Quarkus LangChain4j (integracao declarativa de LLMs em tempo de build) e compilacao nativa com Mandrel / GraalVM para JDK 21+.",
      breakingAndCompat: "Mantem compatibilidade com extensoes Jakarta EE 10, desencorajando o uso do quarkus-resteasy classico em favor do quarkus-rest unificado."
    }
  ],
  jakartaAndMicronaut: [
    {
      version: "J2EE 1.2 a 1.4",
      year: "1999-2003",
      minJava: "Java 1.2 a 1.4",
      keyFeatures: "Era dos Application Servers pesados (WebLogic, WebSphere, JBoss): Servlets, JSP, EJB 1.x/2.x distribuidos com interfaces Home/Remote e descritores XML extensos.",
      breakingAndCompat: "A complexidade excessiva do EJB 2.x motivou Rod Johnson a criar o Spring Framework em 2002-2004 baseado em POJOs simples."
    },
    {
      version: "Java EE 5 a Java EE 8",
      year: "2006-2017",
      minJava: "Java 5 a Java 8",
      keyFeatures: "Grande simplificacao inspirada no Spring/Hibernate: EJB 3.0 com anotacoes, surgimento da JPA (Java Persistence API), JAX-RS para REST, CDI (Contexts and Dependency Injection • JSR-299/365) e Bean Validation.",
      breakingAndCompat: "Java EE 8 (2017) foi a ultima versao sob governanca da Oracle (JCP) usando o pacote historico javax.*, antes da doacao para a Eclipse Foundation."
    },
    {
      version: "Jakarta EE 8 & Jakarta EE 9",
      year: "2019-2020",
      minJava: "Java 8 / 11",
      keyFeatures: "Jakarta EE 8 manteve paridade binaria 100% com Java EE 8. Jakarta EE 9 executou o 'Big Bang' de engenharia: renomeacao legal e tecnica do namespace javax.* para jakarta.* em todas as especificacoes.",
      breakingAndCompat: "Binarios compilados contra javax.servlet nao rodam diretamente em containers Jakarta EE 9+ (ex: Tomcat 10+, Jetty 11+) sem recompilacao ou bytecode transformer (Eclipse Transformer)."
    },
    {
      version: "Jakarta EE 10 & Jakarta EE 11",
      year: "2022-2025",
      minJava: "Java 17 / Java 21",
      keyFeatures: "Jakarta EE 10 trouxe o Core Profile para microsservicos e CDI Lite com BuildCompatibleExtension (suporte a compilacao AOT em Quarkus/Micronaut). Jakarta EE 11 adota Java 21, Virtual Threads e a nova especificacao Jakarta Data.",
      breakingAndCompat: "Elimina APIs obsoletas (EJB Entity Beans antigos, SOAP attachments legados) e alinha o padrao corporativo com runtimes Cloud-Native."
    },
    {
      version: "Micronaut 1.x a 4.x",
      year: "2018-2025",
      minJava: "Java 8 -> Java 17/21 (4.x)",
      keyFeatures: "Criado pelos autores do Grails (OCI): pioneiro em Dependency Injection e AOP 100% em tempo de compilacao via Annotation Processors (JSR-269) sem nenhuma reflexao em runtime. Micronaut 4 adota Java 17+, Jakarta EE, Virtual Threads e Micronaut Serialization.",
      breakingAndCompat: "Zero proxies reflexivos dinamicos em runtime: o tempo de startup e consumo de memoria permanecem constantes independentemente do tamanho da base de codigo."
    }
  ]
};

export const javaBookOverview = {
  title: "Java: Guia Completo de Versões, JVM & Ecossistema",
  subtitle: "Do JDK 1.0 ao Java 25 LTS, Virtual Threads, Garbage Collectors e Frameworks Enterprise (Spring Boot & Quarkus)",
  originalTitle: "The Java Language & Platform Evolution: Releases, Backward Compatibility & Modern Frameworks",
  edition: "Edição Completa • JDK 1.0 a 25 + Spring Boot 3 & Quarkus 3",
  editionPt: "Guia Interativo de Engenharia • Oracle / OpenJDK",
  publisher: "OpenJDK / JCP / Enterprise Press",
  publicationYear: 2025,
  authors: [
    {
      name: "James Gosling",
      role: "Criador da Linguagem Java & Arquiteto Original da JVM",
      bio: "Liderou o Green Team na Sun Microsystems em 1991-1995, projetando o compilador original, o formato de bytecode .class e a maquina virtual que materializou o lema Write Once, Run Anywhere.",
      avatar: "JG"
    },
    {
      name: "Brian Goetz",
      role: "Java Language Architect na Oracle & Lider dos Projetos Amber e Lambda",
      bio: "Arquiteto-chefe da evolucao da linguagem Java desde o Java 8. Conduziu a introducao de Lambdas, Streams, Records, Sealed Classes, Pattern Matching e Data-Oriented Programming na JVM.",
      avatar: "BG"
    },
    {
      name: "Doug Lea & Ron Pressler",
      role: "Arquitetos de Concorrência (java.util.concurrent & Project Loom)",
      bio: "Doug Lea projetou a biblioteca java.util.concurrent (JSR-166) e o ForkJoinPool; Ron Pressler liderou o Project Loom, trazendo Virtual Threads M:N e Structured Concurrency para o Java 21+.",
      avatar: "DL"
    },
    {
      name: "Rod Johnson & Equipe Quarkus/Red Hat",
      role: "Pioneiros dos Frameworks Enterprise (Spring Boot & Quarkus)",
      bio: "Rod Johnson revolucionou o Java corporativo criando o Spring Framework em contraposicao ao J2EE pesado, abrindo caminho para o Spring Boot, Quarkus (Build-Time CDI), Micronaut e Jakarta EE moderno.",
      avatar: "RJ"
    }
  ],
  forewordBy: "Comunidade OpenJDK, Java Community Process (JCP) e Arquitetos de Sistemas Distribuidos",
  inspiration: "Java Language Specification (JLS), JVM Specification (JVMS), Effective Java (Joshua Bloch) e Java Concurrency in Practice (Brian Goetz)",
  corePrinciples: [
    {
      id: "backward-compatibility",
      title: "1. Retrocompatibilidade Binaria como Contrato Sagrado",
      description: "Arquivos .class compilados ha mais de duas decadas continuam executando em JVMs modernas gracas ao versionamento estrito do ClassFile, Type Erasure nos Generics, Default Methods em interfaces e depreciacao responsavel.",
      original: "Please don't break my code: Binary compatibility allows existing class files to link and run without recompilation.",
      summary: "Diferente de linguagens que quebram o ecossistema a cada versao principal, o Java evolui preservando o investimento em sistemas criticos. A introduçao de Generics no Java 5 via Type Erasure e Bridge Methods, e das Lambdas no Java 8 via invokedynamic + Default Methods, provou que e possivel modernizar radicalmente uma linguagem mantendo 100% de compatibilidade com bibliotecas legadas.",
      benefits: [
        "Atualizacao de runtime JVM (ex: ganhar melhorias de GC e JIT do Java 21) com risco minimo de regressao em bibliotecas de terceiros.",
        "Uso da flag --release N no compilador javac garante compatibilidade tanto de sintaxe quanto da assinatura exata da API historica.",
        "Politica clara de JEP Deprecation for Removal avisa com anos de antecedencia antes de descontinuar APIs inseguras como o SecurityManager."
      ],
      badPractice: "javac -source 8 -target 8 MeuCodigo.java // Perigoso: permite chamar metodos do JDK 21 que causarao NoSuchMethodError no Java 8!",
      goodPractice: "javac --release 8 MeuCodigo.java // Seguro: valida sintaxe, gera bytecode 52 e restringe chamadas exatamente a tabela de simbolos do JDK 8."
    },
    {
      id: "jvm-jit-and-gc",
      title: "2. A Maquina Virtual Adaptativa: HotSpot JIT e Coletores de Lixo",
      description: "O codigo Java comeca interpretado, e perfilado em tempo real e compilado para codigo de maquina nativo otimizado (C1/C2 Tiered Compilation), acompanhado por GCs de baixa latencia como G1GC e Generational ZGC.",
      original: "Dynamic adaptive compilation optimizes the code paths that actually run in production, not just static assumptions.",
      summary: "A JVM HotSpot observa quais metodos sao executados com frequencia (hot spots), aplica Inlining agressivo, Escape Analysis (alocando objetos efemeros na stack ou registradores) e desotimizacao segura caso novas classes sejam carregadas. Aliada ao ZGC Generacional no Java 21+, entrega pausas de coleta de lixo inferiores a 1 milissegundo mesmo em heaps de multiplos Terabytes.",
      benefits: [
        "Otimizacoes guiadas por perfil real de trafego (PGO em tempo de execucao) que superam compilacao estatica tradicional em cargas longas.",
        "Escolha de coletor sob medida: G1GC para equilibrio geral, ZGC/Shenandoah para latencia sub-milissegundo e ParallelGC para batch throughput.",
        "Compact Object Headers no Java 24/25 (Project Lilliput) encolhem o cabecalho de cada objeto de 128/96 bits para 64 bits."
      ],
      badPractice: "Forcar System.gc() manualmente em rotas HTTP criticas ou configurar -Xms diferente de -Xmx em servidores de baixa latencia.",
      goodPractice: "java -XX:+UseZGC -XX:+ZGenerational -Xms8g -Xmx8g -jar app.jar // Pausas sub-milissegundo previsiveis."
    },
    {
      id: "data-oriented-programming",
      title: "3. Data-Oriented Programming (Records, Sealed Classes & Pattern Matching)",
      description: "Com o Project Amber (Java 14 a 25), o Java deixou de exigir boilerplate verboso e passou a modelar dados imutaveis como cidadaos de primeira classe atraves de Tipos Algebricos de Dados (ADTs).",
      original: "Model data as data: Records are transparent carriers of immutable state, and Sealed Classes define exhaustive domain boundaries.",
      summary: "A combinacao de Records (soma de campos transparentes), Sealed Interfaces (escolha fechada de subtipos permitidos) e Pattern Matching para switch com desestruturacao permite escrever logica de dominio concisa, imutavel e verificada pelo compilador. Se um novo subtipo for adicionado a uma hierarquia selada, o compilador aponta imediatamente todos os switches que precisam trata-lo, sem depender de um default silencioso.",
      benefits: [
        "Eliminacao de centenas de linhas de getters, setters, equals, hashCode e toString propensos a erro.",
        "Serializacao segura por construcao: Records sao desserializados exclusivamente pelo construtor canonico validado.",
        "Exaustividade matematica verificada em tempo de compilacao em switches sobre tipos selados."
      ],
      badPractice: "Classes DTO mutaveis com 15 setters publicos e cadeias de if (obj instanceof TipoA) { TipoA a = (TipoA) obj; ... }.",
      goodPractice: "sealed interface Resultado permits Ok, Erro {} • switch (res) { case Ok(var dados) -> processar(dados); case Erro(var msg) -> log(msg); }"
    },
    {
      id: "virtual-threads-loom",
      title: "4. Concorrencia Massiva Simples com Virtual Threads (Project Loom)",
      description: "Virtual Threads desacoplam as threads do Java das threads pesadas do Sistema Operacional (modelo M:N), permitindo criar milhoes de fluxos concorrentes mantendo o codigo imperativo simples.",
      original: "Write synchronous, blocking-style code that scales like asynchronous reactive code, with full stack traces and debugger support.",
      summary: "Durante anos, escalar alem de 5.000 requisicoes simultaneas exigia abandonar o modelo thread-per-request e adotar callbacks reativos complexos (WebFlux/RxJava), perdendo stack traces legiveis. No Java 21+, quando uma Virtual Thread executa uma operacao de I/O bloqueante (JDBC, HTTP, Socket), a JVM desmonta sua continuacao da Carrier Thread do SO e libera a CPU para outra tarefa instantaneamente.",
      benefits: [
        "Escala para centenas de milhares de conexoes simultaneas com consumo de memoria de poucos kilobytes por pilha.",
        "Preserva 100% da observabilidade: debuggers passo a passo, JFR thread dumps e stack traces funcionam normalmente.",
        "Zero 'coloracao de funcoes': nao exige reescrever assinaturas de metodos para Future/Mono/Uni."
      ],
      badPractice: "Criar pool fixo de 16 Virtual Threads ou usar ThreadLocal pesado com objetos mutaveis em milhoes de Virtual Threads.",
      goodPractice: "try (var executor = Executors.newVirtualThreadPerTaskExecutor()) { executor.submit(() -> chamarBancoERede()); }"
    },
    {
      id: "modular-and-native-interop",
      title: "5. Encapsulamento Forte (JPMS) e Interoperabilidade Nativa Segura (Panama)",
      description: "A plataforma evoluiu da permissividade insegura (sun.misc.Unsafe e JNI fragil) para a arquitetura Integrity by Default com modulos JPMS e a Foreign Function & Memory API (Java 22+).",
      original: "Strong encapsulation of JDK internals and memory-safe off-heap native interop without brittle C glue code.",
      summary: "O sistema de modulos do Java 9+ e o encapsulamento forte do Java 17+ protegeram as entranhas da JVM, permitindo evoluir a implementacao interna sem quebrar clientes. Paralelamente, o Project Panama (FFM API no Java 22) substituiu o JNI e o ByteBuffer Direct por Arena e MemorySegment, oferecendo acesso deterministico a memoria off-heap e bibliotecas C/Rust com desempenho de ponteiro nativo e seguranca contra use-after-free.",
      benefits: [
        "Imagens de runtime customizadas com jlink contendo apenas os modulos necessarios (35 MB em vez de 300 MB).",
        "Desalocacao deterministica e thread-safe de memoria off-heap ao fechar o bloco try (Arena arena = Arena.ofConfined()).",
        "Class-File API oficial no Java 24+ elimina a necessidade de embutir copias defasadas da biblioteca ASM em frameworks."
      ],
      badPractice: "Usar sun.misc.Unsafe.allocateMemory() ou escrever wrappers JNI em C sujeitos a segmentation fault na JVM.",
      goodPractice: "try (Arena arena = Arena.ofConfined()) { MemorySegment buf = arena.allocate(1024); buf.set(ValueLayout.JAVA_INT, 0, 42); }"
    },
    {
      id: "modern-enterprise-frameworks",
      title: "6. Evolucao Enterprise: De Servidores J2EE a Spring Boot 3, Quarkus 3 & GraalVM",
      description: "O ecossistema corporativo migrou de servidores monoliticos pesados para microsservicos auto-contidos, processamento em tempo de compilacao (Build-Time Augmentation) e compilacao nativa AOT.",
      original: "Move framework reflection, classpath scanning and wiring from runtime startup to build-time compilation.",
      summary: "A jornada de J2EE 1.4 ate Jakarta EE 10/11, Spring Boot 3.4 e Quarkus 3.15 reflete a adaptacao do Java para a nuvem e Kubernetes. Enquanto a JVM JIT (HotSpot C2) continua imbativel em throughput de pico para servicos de longa duracao, o processamento AOT em tempo de build do Quarkus, Micronaut e Spring Boot 3 permite gerar executaveis nativos GraalVM ou caches CRaC/Leyden que iniciam em menos de 50 milissegundos.",
      benefits: [
        "Produtividade imediata com Dev Services, Live Reload e integracao nativa com Testcontainers.",
        "Liberdade arquitetural: o mesmo codigo Jakarta/Spring pode rodar na JVM HotSpot tradicional com Virtual Threads ou como binario nativo GraalVM.",
        "Ferramentas de migracao automatizada (OpenRewrite / quarkus update) reduzem drasticamente o custo de atualizacao entre grandes versoes."
      ],
      badPractice: "Manter aplicacoes presas no Java 8 e Spring Boot 2.x sem patch de seguranca por receio da migracao javax -> jakarta.",
      goodPractice: "Aplicar receitas automatizadas do OpenRewrite para migrar para Java 21 LTS + Spring Boot 3.4 / Quarkus 3.15 com Virtual Threads habilitadas."
    }
  ],
  javaVersionsMatrix,
  javaFrameworksHistory
};

export const bookOverview = javaBookOverview;
