// Parte 1: Era Classica da JVM & Evolucao da Linguagem (Capitulos 1 a 3: Java 1.0 a Java 7)

export const part1Chapters = [
  {
    id: "jv-cap-1",
    number: 1,
    part: "Fundamentos da JVM & Era Classica",
    partColor: "amber",
    title: "Java 1.0 a 1.4: Gênese da JVM, Bytecode, Collections & NIO",
    subtitle: "Write Once Run Anywhere, HotSpot JIT, Collections Framework, Regex, NIO Non-Blocking e Serialização",
    readingTime: "15 min",
    keyConcepts: [
      "Bytecode .class (0xCAFEBABE)",
      "HotSpot JIT (C1/C2)",
      "Collections Framework (List, Set, Map)",
      "Java NIO (Channels, Buffers, Selectors)",
      "Compatibilidade Binaria (--release)"
    ],
    teacherIntro:
      "Entre 1996 e 2002, o Java transformou a industria de software ao substituir binarios acoplados a processadores especificos por uma Maquina Virtual portavel com gerenciamento automatico de memoria, verificacao de seguranca de bytecode e compilacao adaptativa Just-In-Time (HotSpot).",
    keyTakeaways: [
      "Arquivos .class iniciam com a assinatura magica 0xCAFEBABE seguida pelas versoes minor e major (45 no JDK 1.0/1.1 ate 69 no Java 25), garantindo que toda JVM nova execute bytecodes antigos.",
      "O Java Collections Framework (J2SE 1.2, projetado por Joshua Bloch) separou interfaces de contratos (List, Set, Map) de suas implementacoes algoritmicas (ArrayList, LinkedList, HashMap, TreeMap).",
      "A maquina virtual HotSpot (J2SE 1.3) introduziu compilacao adaptativa em tempo de execucao: o codigo comeca interpretado e apenas os trechos quentes (hot spots) sao compilados em codigo de maquina nativo.",
      "O Java NIO (J2SE 1.4) superou o limite de uma thread por socket bloqueante do java.io classico ao introduzir ByteBuffers, Channels e multiplexacao de I/O com Selector.",
      "Ao compilar codigo moderno para rodar em JVMs antigas, a flag --release N (Java 9+) e estritamente superior a combinacao legada -source N -target N por validar tambem a tabela de simbolos da API."
    ],
    sections: [
      {
        heading: "Novidades por Versão: Do JDK 1.0 ao J2SE 1.4",
        body: "As cinco primeiras versoes da plataforma construiram os alicerces que sustentam qualquer aplicacao corporativa ate hoje. O JDK 1.0 (1996) entregou a JVM inicial, o Garbage Collector Mark-and-Sweep, threads nativas e java.io/java.net. O JDK 1.1 (1997) adicionou Inner Classes, JavaBeans, JDBC para acesso a bancos relacionais, RMI, Reflection API e Serializacao de objetos. O J2SE 1.2 (1998) marcou o nascimento do Collections Framework, Swing, politica de memoria WeakReference/SoftReference e a keyword strictfp. O J2SE 1.3 (2000) tornou a JVM HotSpot padrao, trouxe JNDI e Dynamic Proxies (java.lang.reflect.Proxy, base de todos os frameworks de AOP e ORM como Spring e Hibernate). Por fim, o J2SE 1.4 (2002) adicionou New I/O (java.nio), Expressoes Regulares (java.util.regex), Chained Exceptions (getCause()), a keyword assert, parser XML integrado (JAXP) e Java Web Start.",
        bullets: [
          "JDK 1.0 (Major 45): JVM interpretada, AWT, Applets, java.io (InputStream/OutputStream) e sincronizacao via monitores (synchronized/wait/notify).",
          "JDK 1.1 (Major 45.3): JDBC (Connection, PreparedStatement, ResultSet), Reflection (Class, Method, Field), Inner Classes e Serializable.",
          "J2SE 1.2 (Major 46): Collections Framework unificado (Collection, List, Set, Map, Iterator), ArrayList e HashMap nao-sincronizados de alto desempenho.",
          "J2SE 1.3 (Major 47): HotSpot JVM com compiladores JIT Client (C1) e Server (C2), java.lang.reflect.Proxy e Timer/TimerTask.",
          "J2SE 1.4 (Major 48): Java NIO (ByteBuffer, FileChannel, SocketChannel, Selector), java.util.regex (Pattern, Matcher), Logging API e encadeamento de excecoes."
        ],
        callout: {
          type: "info",
          title: "Por que ArrayList e HashMap substituiram Vector e Hashtable?",
          text: "No JDK 1.0, todos os metodos de Vector e Hashtable eram synchronized. Mesmo quando acessados por uma unica thread, pagava-se o custo de aquisicao de lock a cada get() ou add(). No Java 1.2, ArrayList e HashMap nasceram sem sincronizacao embutida, delegando o controle concorrente para wrappers ou estruturas dedicadas."
        }
      },
      {
        heading: "Como Utilizar na Prática: ClassLoaders, Collections, NIO e Flags de Compilação",
        body: "Na pratica diaria, os recursos introduzidos ate o Java 1.4 definem como carregamos classes, organizamos colecoes em memoria e controlamos o nivel de bytecode gerado pelo javac. A hierarquia de ClassLoaders (Bootstrap -> Platform/Extension -> Application) segue o modelo de delegacao pai-primeiro, evitando que uma classe maliciosa substitua java.lang.Object. No uso de colecoes, programa-se sempre voltado para a interface (List, Map, Set) e escolhe-se a implementacao conforme a complexidade assintotica: ArrayList para acesso posicional O(1) e localidade de cache de CPU; HashMap para busca por chave O(1) exigindo implementacao coerente do contrato equals() e hashCode(). Para I/O intensivo de arquivos e rede, FileChannel.transferTo() delega a copia diretamente ao kernel do sistema operacional (zero-copy sendfile).",
        bullets: [
          "Contrato equals() e hashCode(): Objetos iguais por equals() DEVEM retornar exatamente o mesmo hashCode(); violar essa regra corrompe buscas em HashMap e HashSet.",
          "Dynamic Proxy (Java 1.3): Proxy.newProxyInstance(loader, interfaces, invocationHandler) permite interceptar chamadas de metodos em tempo de execucao para abrir e commitar transacoes (@Transactional).",
          "Java NIO Direct Buffers: ByteBuffer.allocateDirect(size) aloca memoria fora do heap da JVM, evitando copia intermediaria entre a JVM e as syscalls do Sistema Operacional.",
          "Compilacao Cruzada Segura: Use javac --release 8 MeuServico.java em vez de -source 8 -target 8 para impedir chamadas acidentais a metodos de APIs que so surgiram em JDKs posteriores."
        ],
        callout: {
          type: "tip",
          title: "Chained Exceptions (Java 1.4): Nunca Engula a Causa Raiz",
          text: "Ao capturar uma SQLException ou IOException e relanca-la como excecao de dominio, passe sempre a excecao original no construtor: throw new PedidoException('Falha ao persistir', e). Isso preserva toda a arvore de stack trace via getCause()."
        }
      },
      {
        heading: "Retrocompatibilidade e Evolução Binária: Formato .class, serialVersionUID e WORA",
        body: "A maior conquista arquitetural do Java 1.0 a 1.4 foi estabelecer regras rigorosas na Java Language Specification (JLS Capitulo 13: Binary Compatibility). Uma mudanca em uma classe ou biblioteca e binariamente compativel se classes compiladas anteriormente puderem se ligar (link) a nova versao sem necessidade de recompilacao. Adicionar novos metodos ou construtores a uma classe, ou transformar um metodo privado em publico, nunca quebra clientes compilados anteriormente. Quando o J2SE 1.2 introduziu o Collections Framework, a equipe nao deletou Vector nem Hashtable: eles foram retrofittados para implementar List e Map, permitindo que bibliotecas de 1996 operassem perfeitamente com APIs de 1999. Na serializacao binaria, declarar explicitamente private static final long serialVersionUID = 1L evita que pequenas adicoes de metodos utilitarios alterem o hash sintetico calculado pela JVM e lancem InvalidClassException.",
        bullets: [
          "Regra de Ouro do Bytecode: Uma JVM versao N (ex: Java 21, class version 65) aceita qualquer arquivo .class com versao <= 65 (desde 45 do JDK 1.0), mas rejeita versoes > 65 com UnsupportedClassVersionError.",
          "Transicao da keyword assert (Java 1.4): Como codigos antigos usavam assert como nome de variavel (int assert = 1;), o compilador do JDK 1.4 exigia -source 1.4 para ativar a nova palavra reservada, mantendo o modo 1.3 por padrao durante a transicao.",
          "Depreciacao sem Remocao Abrupta: Metodos problemáticos como Thread.stop() e Thread.suspend() foram marcados com @deprecated no Javadoc ja no JDK 1.2 (por causarem deadlocks e estados inconsistentes), mas permaneceram por mais de 20 anos para nao quebrar sistemas em producao."
        ],
        callout: {
          type: "warning",
          title: "Cuidado com Serializacao Nativa Java",
          text: "Embora ObjectInputStream/ObjectOutputStream (JDK 1.1) garantam retrocompatibilidade controlada via serialVersionUID, a desserializacao de fluxos nao confiaveis permite ataques de gadget chains. Em sistemas modernos, prefira formatos explicitos como JSON/Protobuf ou configure ObjectInputFilter (JEP 290)."
        }
      }
    ]
  },
  {
    id: "jv-cap-2",
    number: 2,
    part: "Fundamentos da JVM & Era Classica",
    partColor: "amber",
    title: "Java 5 (1.5): Generics, Annotations, Enums, Autoboxing & Concorrência",
    subtitle: "Type Erasure, Metadados @interface, java.util.concurrent (Doug Lea) e o Novo Java Memory Model (JSR-133)",
    readingTime: "16 min",
    keyConcepts: [
      "Generics & Type Erasure",
      "Bridge Methods Sinteticos",
      "PECS (? extends / ? super)",
      "java.util.concurrent (ExecutorService, ConcurrentHashMap)",
      "Java Memory Model (JSR-133 & Happens-Before)"
    ],
    teacherIntro:
      "Lancado em 2004 sob o codinome Tiger, o Java 5 (1.5) protagonizou a maior revolucao sintatica e de concorrencia da primeira decada da linguagem, introduzindo Generics, Annotations, Enums ricos e o pacote java.util.concurrent sem quebrar um unico arquivo .class do Java 1.4.",
    keyTakeaways: [
      "Os Generics em Java utilizam Type Erasure (apagamento de tipo em tempo de compilacao): List<String> e List<Integer> tornam-se a mesma classe bruta List no bytecode, inserindo casts seguros automaticamente.",
      "Para preservar o polimorfismo apos o Type Erasure, o compilador javac gera Bridge Methods sinteticos no bytecode, mantendo compatibilidade binaria irrestrita.",
      "A regra PECS (Producer Extends, Consumer Super) de Joshua Bloch governa o uso de wildcards: use List<? extends T> para ler dados de uma estrutura e List<? super T> para inserir dados nela.",
      "A JSR-133 reformulou o Java Memory Model (JMM), corrigindo a semantica de volatile e final e estabelecendo a relacao matematica de Happens-Before entre threads.",
      "O pacote java.util.concurrent substituiu a criacao manual de threads e synchronized grosseiros por ExecutorService, ConcurrentHashMap, ReentrantLock, Semaphore, CountDownLatch e variaveis Atomic."
    ],
    sections: [
      {
        heading: "Novidades da Versão: A Revolução do Java 5 (Tiger)",
        body: "Antes do Java 5, adicionar elementos em uma colecao exigia lidar com Object puro e realizar casts manuais sujeitos a ClassCastException em tempo de execucao. O Java 5 resolveu isso com Generics verificados em tempo de compilacao. Ao mesmo tempo, introduziu Annotations (@interface com RetentionPolicy SOURCE, CLASS ou RUNTIME), que permitiram aposentar milhares de linhas de arquivos XML em frameworks corporativos (dando origem ao EJB 3, JPA e configuracao declarativa do Spring). Os Enums deixaram de ser meras constantes inteiras frageis (int STATUS_ATIVO = 1) e passaram a ser classes completas com campos imutaveis, construtores privados e metodos polimorficos. A ergonomia diaria ganhou for-each (enhanced for loop baseando-se na interface Iterable<T>), Autoboxing/Unboxing automatico entre primitivos e wrappers, Varargs (String... args) e Static Imports.",
        bullets: [
          "Generics (JSR-14): Parametrizacao de tipos em classes, interfaces e metodos com verificacao estatica rigorosa pelo compilador.",
          "Annotations (JSR-175): Metadados estruturados inspecionaveis em tempo de compilacao ou em runtime via Reflection (@Override, @Deprecated, @SuppressWarnings e anotacoes customizadas).",
          "Enums Tipados: Subclasses de java.lang.Enum<E> thread-safe por natureza, suportando EnumSet (bit vectors ultrarrapidos) e EnumMap.",
          "java.util.concurrent (JSR-166): Pools de threads (ThreadPoolExecutor), colecoes concorrentes (ConcurrentHashMap, CopyOnWriteArrayList, BlockingQueue) e sincronizadores (CountDownLatch, CyclicBarrier, Semaphore).",
          "Java Memory Model (JSR-133): Garantias formais de visibilidade de memoria cache da CPU, atomicidade e ordenacao de instrucoes com volatile e campos final."
        ],
        callout: {
          type: "info",
          title: "A Armadilha do Autoboxing em Loops e Comparacoes",
          text: "A JVM faz cache de instancias de Integer entre -128 e 127 (IntegerCache). Comparar dois objetos Integer com == funciona por acidente para 100 == 100, mas falha para 1000 == 1000! Além disso, somar Long acumulado = 0L dentro de um loop de milhoes de iteracoes cria milhoes de objetos desnecessarios no heap."
        }
      },
      {
        heading: "Como Utilizar na Prática: PECS, ExecutorService, ConcurrentHashMap e JMM",
        body: "Em APIs genericas profissionais, como tipos genericos sao invariantes (List<Integer> NAO e subtipo de List<Number>), aplicamos bounded wildcards seguindo o acronimo PECS (Producer Extends, Consumer Super). Se um metodo apenas consome/le numeros da colecao para somar, declare double somar(List<? extends Number> origem); se o metodo produz/insere inteiros dentro de uma colecao destino, declare void adicionar(List<? super Integer> destino). Na concorrencia, nunca instancie new Thread(runnable).start() solto em producao: utilize ExecutorService com filas limitadas (ArrayBlockingQueue) para aplicar backpressure, ou ConcurrentHashMap que utiliza granularidade fina por bucket e operacoes CAS (Compare-And-Swap) sem travar o mapa inteiro em leituras.",
        bullets: [
          "PECS na pratica: Collections.copy(List<? super T> dest, List<? extends T> src) exemplifica perfeitamente a leitura do produtor (extends) e escrita no consumidor (super).",
          "ConcurrentHashMap: Nunca use Collections.synchronizedMap() em alta concorrencia; use map.computeIfAbsent(chave, k -> carregarValor(k)) para operacoes atomicas thread-safe.",
          "Volatile e Happens-Before: Uma escrita em um campo volatile estabelece uma relacao happens-before com qualquer leitura subsequente desse mesmo campo por outra thread, impedindo reordenacao de instrucoes pela CPU/JIT.",
          "Atomics sem Lock: AtomicInteger, AtomicLong e AtomicReference utilizam instrucoes nativas da CPU (CAS / cmpxchg) para contadores e acumuladores de altissimo throughput."
        ],
        callout: {
          type: "tip",
          title: "Garantia de Inicializacao Segura de Campos final (JSR-133)",
          text: "A partir do Java 5, se um objeto imutavel possui todos os seus campos declarados como final e a referencia 'this' nao escapa durante a execucao do construtor, qualquer outra thread vera os valores corretos dos campos final imediatamente, mesmo sem sincronizacao externa!"
        }
      },
      {
        heading: "Retrocompatibilidade: Como o Type Erasure Salvou o Ecossistema Java",
        body: "Quando a equipe de compiladores projetou os Generics para o Java 5, enfrentou um dilema crucial: se List<String> gerasse uma nova representacao incompativel no bytecode (como os templates de C++ ou a reificacao do C# .NET 2.0, que teve de criar um novo namespace System.Collections.Generic e abandonar o antigo), todas as bibliotecas existentes no mundo Java quebrariam ou exigiriam duplicacao da API padrao. A escolha pelo Type Erasure permitiu que java.util.ArrayList continuasse sendo exatamente a mesma classe em tempo de execucao! Uma aplicacao compilada no Java 5 usando List<String> podia passar essa mesma lista para uma biblioteca legado compilada no Java 1.4 que esperava um List bruto (Raw Type), e vice-versa, sem recompilar uma linha sequer das bibliotecas de terceiros.",
        bullets: [
          "Como o Type Erasure opera: O compilador substitui parametros de tipo ilimitados (<T>) por Object e parametros limitados (<T extends Comparable<T>>) pelo seu primeiro limite (Comparable), inserindo instrucoes checkcast apenas nos pontos de leitura.",
          "Bridge Methods Sinteticos: Se class NodoTexto implements Comparable<NodoTexto> define compareTo(NodoTexto o), o compilador gera invisivelmente um metodo ponte compareTo(Object o) que faz o cast e delega para compareTo(NodoTexto), preservando o polimorfismo com codigo legado.",
          "Raw Types (Tipos Brutos): Declarar List lista = new ArrayList() sem parametro de tipo permaneceu legal no Java 5 exclusivamente para manter compatibilidade com codigo 1.4, mas desliga a checagem de tipos e deve ser proibido em codigo novo.",
          "Heap Pollution e @SafeVarargs: Combinar varargs com tipos genericos (ex: T... itens) cria um array bruto em runtime que pode sofrer Heap Pollution; o compilador emite warnings que devem ser auditados com cuidado."
        ],
        callout: {
          type: "warning",
          title: "Limitacoes do Type Erasure que Todo Arquiteto Deve Conhecer",
          text: "Como o tipo generico e apagado no bytecode, nao e possivel fazer new T(), new T[10] ou if (lista instanceof List<String>) em runtime. Para preservar o tipo em metodos de desserializacao (como no Jackson ou Gson), passa-se um Class<T> explicito ou usa-se o padrao Super Type Token (new TypeReference<List<Cliente>>() {})."
        }
      }
    ]
  },
  {
    id: "jv-cap-3",
    number: 3,
    part: "Fundamentos da JVM & Era Classica",
    partColor: "amber",
    title: "Java 6 & Java 7: Project Coin, try-with-resources, NIO.2 & invokedynamic",
    subtitle: "Fechamento determinístico de recursos, Diamond Operator <>, ForkJoinPool Work-Stealing, Path/Files e JSR-292",
    readingTime: "15 min",
    keyConcepts: [
      "try-with-resources & AutoCloseable",
      "Excecoes Suprimidas (getSuppressed)",
      "NIO.2 (Path, Files, WatchService)",
      "ForkJoinPool (Work-Stealing)",
      "Bytecode invokedynamic (JSR-292)"
    ],
    teacherIntro:
      "Enquanto o Java 6 consolidou a performance da JVM, o processamento de anotacoes em tempo de compilacao e o JDBC 4.0, o Java 7 trouxe o Project Coin para eliminar armadilhas classicas de vazamento de recursos com try-with-resources, modernizou o sistema de arquivos com NIO.2 e plantou na JVM a instrucao invokedynamic que viabilizaria as Lambdas do Java 8.",
    keyTakeaways: [
      "O bloco try-with-resources (Java 7) garante o fechamento deterministico de qualquer recurso que implemente AutoCloseable na ordem inversa de declaracao, mesmo em caso de excecao.",
      "Diferente do bloco finally manual, o try-with-resources nao engole a excecao original caso o metodo close() tambem falhe: a excecao do close() e anexada como Suppressed Exception (Throwable.getSuppressed()).",
      "A API NIO.2 (java.nio.file.Path e Files) substituiu a classe java.io.File deficiente por operacoes atomicas, suporte completo a links simbolicos, atributos POSIX e monitoramento de diretorios (WatchService).",
      "O ForkJoinPool implementou o algoritmo de Work-Stealing (roubo de trabalho com deques duplos), maximizando o uso de todos os nucleos da CPU em tarefas recursivas dividir-para-conquistar.",
      "A instrucao invokedynamic (JSR-292) foi a primeira nova instrucao de bytecode desde o JDK 1.0, permitindo resolucao dinamica de chamadas via Bootstrap Methods e MethodHandles."
    ],
    sections: [
      {
        heading: "Novidades por Versão: Java 6 (Mustang) e Java 7 (Dolphin)",
        body: "O Java 6 (2006) focou em maturidade corporativa e ferramentas: introduziu a Pluggable Annotation Processing API (JSR-269), que permite inspecionar a AST durante a compilacao e gerar codigo fonte ou bytecode (mecanismo fundamental usado por MapStruct, Dagger, Micronaut e Lombok), a Java Compiler API (JSR-199), o ServiceLoader para arquiteturas de plugins desacopladas e o JDBC 4.0 (que dispensou o antigo Class.forName('org.postgresql.Driver')). Na JVM, trouxe Biased Locking, Lock Coarsening e o atributo StackMapTable para acelerar a verificacao de bytecode. Ja o Java 7 (2011) entregou o Project Coin (try-with-resources, Diamond Operator <>, multi-catch catch (IOException | SQLException e), Strings no switch e literais numericos com underscores 1_000_000), a API de arquivos NIO.2 (JSR-203), o framework Fork/Join para paralelismo em multicore e a instrucao de bytecode invokedynamic (JSR-292).",
        bullets: [
          "Java 6 • JSR-269 (Annotation Processing) & ServiceLoader: Base da geracao de codigo em tempo de compilacao moderna e descoberta automatica de implementacoes via META-INF/services.",
          "Java 7 • Project Coin: Melhorias ergonomicas de alta precisao que reduziram drasticamente bugs em tratamento de excecoes e fechamento de conexoes.",
          "Java 7 • NIO.2 (java.nio.file): Interfaces Path, Paths, Files e FileSystem para manipulacao moderna de arquivos, substituindo os retornos booleanos silenciosos do antigo java.io.File.",
          "Java 7 • ForkJoinPool & RecursiveTask: Deques de trabalho por thread onde threads ociosas roubam sub-tarefas da cauda da fila de threads ocupadas.",
          "Java 7 • JSR-292 (invokedynamic & MethodHandles): Infraestrutura de ligacao dinamica na JVM que preparou o terreno para as expressoes Lambda e concatenacao otimizada de Strings no Java 8 e 9."
        ],
        callout: {
          type: "info",
          title: "O Problema Historico do Bloco finally antes do Java 7",
          text: "No Java 1.0 a 6, se o codigo dentro do bloco try lancasse uma excecao de negocio e, logo em seguida, o conn.close() dentro do bloco finally tambem lancasse uma excecao de rede, a excecao do finally sobrescrevia e apagava completamente a excecao original! O try-with-resources corrigiu esse defeito historico preservando a excecao primaria e anexando a falha do close() via addSuppressed()."
        }
      },
      {
        heading: "Como Utilizar na Prática: try-with-resources, NIO.2 e ForkJoinPool",
        body: "Toda classe que gerencia conexoes de banco, sockets, arquivos ou cursores nativos deve implementar AutoCloseable e ser instanciada no cabecalho do try-with-resources. Multiplos recursos podem ser separados por ponto-e-virgula e sao fechados automaticamente na ordem exatamente inversa da abertura (como uma pilha LIFO). Para manipulacao de arquivos e diretorios, utilize sempre Path.of('dados', 'relatorio.csv') (ou Paths.get() no Java 7/8) combinado com os metodos utilitarios de java.nio.file.Files, garantindo excecoes detalhadas (NoSuchFileException, AccessDeniedException) em vez de um simples false. Em algoritmos intensivos em CPU, divida a carga recursivamente com RecursiveTask<V> ou RecursiveAction dentro de um ForkJoinPool.",
        bullets: [
          "Multiplos recursos no try: try (Connection c = ds.getConnection(); PreparedStatement ps = c.prepareStatement(sql); ResultSet rs = ps.executeQuery()) { ... } fecha primeiro rs, depois ps e por ultimo c.",
          "Inspecao de falhas suprimidas: No bloco catch (Exception e), percorra e.getSuppressed() para auditar eventuais falhas ocorridas durante o fechamento dos recursos.",
          "Operacoes de Arquivo Seguras: Use Files.copy(origem, destino, StandardCopyOption.REPLACE_EXISTING, StandardCopyOption.ATOMIC_MOVE) e Files.readAllBytes(path).",
          "MethodHandles (java.lang.invoke): MethodHandles.lookup().findVirtual(...) oferece uma alternativa tipada e muito mais rapida que a Reflection tradicional (Method.invoke), pois verifica permissoes de acesso uma unica vez na criacao do handle."
        ],
        callout: {
          type: "tip",
          title: "Diamond Operator <> e Inferencia de Tipos",
          text: "No Java 5 e 6 era obrigatorio repetir os tipos genericos na instanciacao: Map<String, List< Map<Long, Cliente>>> mapa = new HashMap<String, List<Map<Long, Cliente>>>(); Com o operador diamante <> do Java 7, basta escrever new HashMap<>() e o compilador infere os argumentos do contexto."
        }
      },
      {
        heading: "Retrocompatibilidade: Hierarquia AutoCloseable, File.toPath() e Bytecode Verifier",
        body: "Para que o try-with-resources funcionasse imediatamente no dia do lancamento do Java 7 com todas as bibliotecas escritas desde 1996 (InputStream, OutputStream, Reader, Writer, Connection, Statement, ResultSet), os arquitetos do JDK aplicaram uma engenharia de retrocompatibilidade brilhante na hierarquia de interfaces. Foi criada a nova interface java.lang.AutoCloseable (cujo metodo close() lanca Exception geral) e a interface pre-existente java.io.Closeable (do Java 5, cujo close() lanca IOException) foi alterada para estender AutoCloseable: public interface Closeable extends AutoCloseable. Como estender uma superinterface cujo metodo tem assinatura mais abrangente e 100% compativel em nivel binario e de codigo-fonte, todas as classes de I/O existentes passaram a funcionar no try-with-resources sem nenhuma recompilacao de bibliotecas externas! Da mesma forma, para integrar java.io.File com a nova API NIO.2, foram adicionados os metodos ponte File.toPath() e Path.toFile().",
        bullets: [
          "Coerencia de Excecoes em AutoCloseable: Enquanto AutoCloseable.close() declara throws Exception, implementacoes especificas podem estreitar ou omitir a clausula throws (para que seu fechamento nao force um catch desnecessario).",
          "Interoperabilidade File <-> Path: Bibliotecas antigas que recebem java.io.File convivem perfeitamente com codigo novo NIO.2 atraves da conversao instantanea path.toFile() e file.toPath().",
          "Verificador de Bytecode StackMapTable (Java 6/7): A partir do bytecode major 51 (Java 7), o uso do novo verificador linear por inferencia de tipos (StackMapTable) tornou-se obrigatorio para classes versao 51+, mas a JVM manteve internamente o verificador antigo como fallback automatico ao carregar arquivos .class de versoes <= 50."
        ],
        callout: {
          type: "warning",
          title: "Antiguidade de Manipuladores Bytecode no Java 7",
          text: "Bibliotecas muito antigas de instrumentacao de bytecode (como versoes legadas do ASM ou cglib anteriores a 2011) que geravam classes versao 51 sem recalcular os frames da StackMapTable causavam VerifyError: Expecting a stackmap frame no Java 7, impulsionando a modernizacao das ferramentas de geracao de bytecode."
        }
      }
    ]
  }
];
