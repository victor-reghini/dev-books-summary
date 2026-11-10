// Parte 2: Revolucao Funcional, Modularizacao & Cadencia LTS (Capitulos 4 a 6: Java 8 a Java 11)

export const part2Chapters = [
  {
    id: "jv-cap-4",
    number: 4,
    part: "Java Funcional & Modular",
    partColor: "blue",
    title: "Java 8 (LTS): Lambdas, Streams API, Optional, CompletableFuture & java.time",
    subtitle: "Programação funcional na JVM, Default Methods em interfaces, Metaspace e datas imutáveis JSR-310",
    readingTime: "18 min",
    keyConcepts: [
      "Expressoes Lambda & Functional Interfaces",
      "Streams API (Lazy Evaluation & Collectors)",
      "Default Methods em Interfaces",
      "Optional<T> & java.time (JSR-310)",
      "CompletableFuture & Metaspace"
    ],
    teacherIntro:
      "Lancado em marco de 2014 sob a lideranca de Brian Goetz, o Java 8 (LTS) transformou profundamente o idioma da linguagem ao unir programacao orientada a objetos com programacao funcional, pipelines declarativos de Streams, datas imutaveis e composicao assincrona, mantendo 100% de retrocompatibilidade gracas aos Default Methods e ao invokedynamic.",
    keyTakeaways: [
      "Expressoes Lambda nao sao sintaxe acucarada para classes internas anonimas (que geravam arquivos MeuServico$1.class no disco): elas sao compiladas usando a instrucao invokedynamic e sintetizadas em memoria pela LambdaMetafactory apenas quando invocadas.",
      "A Streams API separa operacoes intermediarias preguicosas (filter, map, flatMap, sorted) de operacoes terminais (collect, reduce, findFirst, count), processando dados sem mutar a colecao original.",
      "Default Methods permitiram adicionar novos metodos com implementacao padrao dentro de interfaces antigas (como Collection.stream() e Iterable.forEach()) sem quebrar milhoes de classes existentes.",
      "A API java.time (JSR-310, inspirada no Joda-Time de Stephen Colebourne) corrigiu os defeitos historicos de java.util.Date e Calendar com tipos imutaveis e thread-safe (Instant, LocalDate, LocalDateTime, ZonedDateTime, Duration).",
      "Na JVM HotSpot, a antiga regiao de memoria PermGen (que sofria com OutOfMemoryError: PermGen space frequentes) foi extinta e substituida pelo Metaspace alocado em memoria nativa."
    ],
    sections: [
      {
        heading: "Novidades da Versão: O Salto Funcional do Java 8 (LTS)",
        body: "O Java 8 introduziu as Interfaces Funcionais (qualquer interface com exatamente um metodo abstrato, anotada opcionalmente com @FunctionalInterface, como Predicate<T>, Function<T,R>, Consumer<T> e Supplier<T>) como tipo-alvo para Expressoes Lambda (x -> x * 2) e Method References (Cliente::getNome). A Streams API (java.util.stream) trouxe processamento declarativo de colecoes com suporte a execucao sequencial ou paralela (.parallelStream() sobre o ForkJoinPool.commonPool()). Para combater o erro de um bilhao de dolares (NullPointerException), surgiu o container Optional<T>. No assincronismo, o antigo Future<T> bloqueante do Java 5 foi superado pelo CompletableFuture<T>, permitindo encadear callbacks nao-bloqueantes (thenApply, thenCompose, thenCombine, exceptionally). Por fim, a JSR-310 entregou java.time e a JVM substituiu a PermGen pelo Metaspace.",
        bullets: [
          "Pacote java.util.function: 43 interfaces funcionais padronizadas, incluindo especializacoes primitivas (IntPredicate, ToDoubleFunction) que evitam o custo de Autoboxing.",
          "Streams API & Collectors: Agrupamentos complexos em uma linha com Collectors.groupingBy(), partitioningBy(), joining() e mapping().",
          "java.time (JSR-310): Separa claramente tempo de maquina (Instant, Duration) de tempo humano e fusos horarios (LocalDate, LocalTime, ZonedDateTime, Period).",
          "CompletableFuture: Programacao assincrona composicional com suporte a combinar multiplos futuros (allOf, anyOf) e tratamento declarativo de falhas.",
          "Fim da PermGen -> Metaspace: Os metadados de classes passaram a residir em memoria nativa redimensionada dinamicamente, controlada opcionalmente por -XX:MaxMetaspaceSize."
        ],
        callout: {
          type: "info",
          title: "Por que Lambdas usam invokedynamic em vez de Inner Classes?",
          text: "Se cada lambda gerasse uma classe anonima .class na compilacao, o JAR inchadia e a estrategia ficaria congelada para sempre no bytecode. Com invokedynamic + LambdaMetafactory.metafactory(), o bytecode descreve apenas a receita da lambda, permitindo que JVMs futuras otimizem a alocacao em runtime sem recompilar o codigo!"
        }
      },
      {
        heading: "Como Utilizar na Prática: Pipelines de Streams, Optional Idiomático e CompletableFuture",
        body: "Para extrair o maximo do Java 8, escreva funcoes puras sem efeitos colaterais (side-effects) dentro das operacoes de Stream: nunca modifique uma lista externa dentro de um .forEach() ou .map(); em vez disso, colete o resultado em uma nova colecao com .collect(Collectors.toList()). Ao usar Optional<T>, trate-o exclusivamente como tipo de retorno de metodos para sinalizar ausencia legitima de valor: evite chamar optional.get() sem checagem ou repetir if (opt.isPresent()); prefira o encadeamento funcional opt.map(...).filter(...).orElseThrow(() -> new EntidadeNaoEncontradaException()). Com CompletableFuture, passe sempre um Executor customizado como segundo argumento em chamadas de I/O (supplyAsync(tarefa, ioExecutor)) para nao saturar o ForkJoinPool.commonPool() da JVM.",
        bullets: [
          "Streams sem Autoboxing: Use mapToInt(Pedido::getQuantidade).sum() ou IntStream.range(0, 100) para operar sobre int/long/double primitivos sem alocar wrappers no heap.",
          "Anti-padroes de Optional: NUNCA use Optional<T> como campo de entidade JPA/classe (nao e Serializable e adiciona indirecao na memoria) nem como parametro de metodo.",
          "orElse() vs orElseGet(): opt.orElse(criarPadraoCaro()) avalia o metodo criarPadraoCaro() SEMPRE, mesmo quando o Optional esta preenchido! Use opt.orElseGet(() -> criarPadraoCaro()) para avaliacao preguicosa.",
          "Paralelismo Consciente: Nao use .parallelStream() para tarefas que fazem I/O de rede/banco ou para listas pequenas; ele brilha apenas em processamento intensivo de CPU sobre estruturas facilmente divisíveis (ArrayList/arrays)."
        ],
        callout: {
          type: "tip",
          title: "Composicao de Datas Imutaveis com java.time",
          text: "Diferente do antigo java.util.Date (onde date.setMonth() alterava o objeto compartilhado em outras threads e janeiro era mes 0!), em java.time toda operacao retorna uma nova instancia: LocalDate vencimento = LocalDate.of(2025, Month.MARCH, 15).plusDays(30);"
        }
      },
      {
        heading: "Retrocompatibilidade: A Engenharia dos Default Methods e Interfaces Antigas",
        body: "O maior desafio de engenharia do Java 8 era como permitir que uma interface criada em 1998 (java.util.Collection) ganhasse o metodo .stream() sem quebrar as centenas de milhares de implementacoes customizadas de Collection espalhadas em bibliotecas como Hibernate, Apache Commons, Guava e sistemas bancarios. Se .stream() fosse adicionado como metodo abstrato comum, qualquer classe que implementasse Collection falharia ao carregar com AbstractMethodError. A solucao foi introduzir os Default Methods (originalmente chamados de Virtual Extension Methods) na JVM: metodos declarados na propria interface com a palavra-chave default e corpo completo, que sao herdados automaticamente por todas as classes implementadoras caso nao sejam sobrescritos!",
        bullets: [
          "Regras de Resolucao de Conflito (Diamond Problem): (1) Classes vencem sempre qualquer default method de interface; (2) Interfaces mais especificas (sub-interfaces) vencem super-interfaces; (3) Em caso de empate entre duas interfaces independentes, o compilador exige que a classe sobrescreva o metodo e escolha explicitamente via InterfaceA.super.metodo().",
          "Conversao Transparente (SAM Conversion): Qualquer biblioteca escrita no Java 1.0 a 7 que recebia uma interface de um unico metodo (ex: java.lang.Runnable de 1996, java.util.Comparator de 1998 ou java.util.concurrent.Callable de 2004) passou a aceitar expressoes Lambda instantaneamente sem alterar uma linha da biblioteca antiga!",
          "Metodos Ponte com Date/Calendar e IO: Para facilitar a adocao gradual nas bases legadas, classes antigas ganharam pontes diretas para o Java 8, como Date.toInstant(), Calendar.toInstant(), BufferedReader.lines() (retornando Stream<String>) e Collection.removeIf(Predicate)."
        ],
        callout: {
          type: "warning",
          title: "Compatibilidade Binaria vs Conflitos de Assinatura",
          text: "Adicionar um default method a uma interface existente e 100% binariamente compativel (arquivos .class antigos continuam rodando), mas em raros casos pode gerar incompatibilidade de compilacao se uma subclasse pre-existente ja possuia um metodo de mesmo nome porem com visibilidade mais restrita ou retorno incompativel."
        }
      }
    ]
  },
  {
    id: "jv-cap-5",
    number: 5,
    part: "Java Funcional & Modular",
    partColor: "blue",
    title: "Java 9 & Java 10: Sistema de Módulos JPMS (Jigsaw), JShell, Factory Methods & var",
    subtitle: "Modularização do JDK, Compact Strings, G1GC padrão, inferência local de tipos com var e AppCDS",
    readingTime: "16 min",
    keyConcepts: [
      "JPMS / Project Jigsaw (module-info.java)",
      "Unnamed Module & Automatic Modules",
      "Compact Strings (byte[] + coder)",
      "Colecoes Imutaveis (List.of, Map.of)",
      "Inferencia Local de Tipos (var no Java 10)"
    ],
    teacherIntro:
      "O Java 9 (2017) quebrou o monolito historico do rt.jar em modulos explicitos com o Project Jigsaw (JPMS), reduziu o consumo de RAM de Strings pela metade com Compact Strings e adotou o G1GC como coletor padrao, enquanto o Java 10 (2018) inaugurou a nova cadencia semestral de releases e trouxe a inferencia de tipos locais com var.",
    keyTakeaways: [
      "O Java Platform Module System (JPMS) adicionou uma camada de configuracao confiavel e encapsulamento forte acima dos pacotes, declarada no descritor module-info.java (requires, exports, opens, provides/uses).",
      "Para nao quebrar o ecossistema mundial baseado em Classpath, o Java 9 criou o Unnamed Module (Modulo Sem Nome): qualquer JAR colocado no -classpath tradicional continua funcionando e enxergando todos os modulos exportados.",
      "As Compact Strings (JEP 254) trocaram o array interno da classe String de char[] (sempre 2 bytes UTF-16 por caractere) para byte[] acompanhado de uma flag de codificacao (LATIN-1 de 1 byte ou UTF-16), economizando ate 40% do heap da JVM automaticamente.",
      "Os Factory Methods de colecoes (List.of(), Set.of(), Map.of()) criam estruturas verdaderamente imutaveis, ultracompactas na memoria e que rejeitam elementos null.",
      "No Java 10, a palavra reservada contextual var permite inferencia de tipos para variaveis locais mantendo a tipagem estatica forte 100% em tempo de compilacao."
    ],
    sections: [
      {
        heading: "Novidades por Versão: Java 9 (Jigsaw) e Java 10 (var & Containers)",
        body: "No Java 9 (setembro de 2017), o antigo arquivo monolitico rt.jar de mais de 60 MB foi substituido por mais de 70 modulos independentes do JDK (sendo java.base o modulo primordial do qual todos dependem). A ferramenta jlink passou a permitir construir imagens customizadas da JVM contendo apenas os modulos requeridos pela aplicacao (gerando runtimes de ~35 MB ideais para containers). A biblioteca padrao ganhou List.of(), Set.of(), Map.of(), melhorias em Stream (takeWhile, dropWhile, ofNullable), Optional (ifPresentOrElse, or, stream), ProcessHandle API, StackWalker API eficiente, Reactive Streams (java.util.concurrent.Flow) e a ferramenta interativa JShell (REPL). Na JVM, o G1GC (Garbage-First) substituiu o ParallelGC como coletor padrao e surgiram as Compact Strings. Seis meses depois, o Java 10 (marco de 2018) entregou Local-Variable Type Inference (var), List.copyOf() / Collectors.toUnmodifiableList(), Application Class-Data Sharing (AppCDS) e deteccao automatica de limites de CPU/RAM de containers Docker/cgroups.",
        bullets: [
          "Java 9 • JPMS & jlink: Declaracao explicita de dependencias e superficie publica de API em module-info.java, eliminando o 'JAR Hell' em tempo de inicializacao.",
          "Java 9 • Compact Strings & G1GC: Economia imediata de memoria para textos ISO-8859-1/ASCII sem exigir mudanca no codigo da aplicacao, aliada a pausas previsiveis do G1GC.",
          "Java 9 • Factory Methods Imutaveis: List.of('A', 'B') e Map.of('k1', 1, 'k2', 2) usam implementacoes internas especializadas sem overhead de nos extras.",
          "Java 10 • Inferencia com var (JEP 286): Reduz verbosidade em variaveis locais com inicializador (var conexoes = new HashMap<String, List<Socket>>()), gerando exatamente o mesmo bytecode que a declaracao explicita.",
          "Java 10 • Container Awareness: A JVM passou a ler automaticamente as cotas de memoria e CPU do cgroup no Linux/Kubernetes para dimensionar o heap e os pools de threads."
        ],
        callout: {
          type: "info",
          title: "Por que var NAO e tipagem dinamica como no JavaScript?",
          text: "Em Java 10+, var nao altera nada na JVM nem cria tipos dinamicos: o compilador javac deduz o tipo exato da expressao à direita no momento da compilacao e grava o tipo estatico real no arquivo .class. Tentar atribuir uma String a uma variavel declarada com var x = 10 resulta em erro imediato de compilacao."
        }
      },
      {
        heading: "Como Utilizar na Prática: module-info.java, jlink, Coleções Imutáveis e var",
        body: "Ao estruturar uma biblioteca ou aplicacao modular, crie o arquivo module-info.java na raiz do source set definindo quais modulos sao requeridos (requires) e apenas quais pacotes internos devem ser visiveis para o mundo externo (exports). Se um framework como Spring ou Hibernate precisar instanciar suas classes privadas via Reflection em tempo de execucao, utilize a diretiva opens meu.pacote.entidades to org.hibernate.orm.core, mantendo o encapsulamento de compilacao mas autorizando a introspeccao reflexiva. Para colecoes constantes e retornos defensivos, prefira sempre List.of() e List.copyOf(colecaoEntrada) (que nao faz copia se a lista original ja for imutavel de List.of!). No uso do var, aplique-o quando o nome da variavel ou o construtor à direita ja deixarem o tipo obvio.",
        bullets: [
          "Criando Runtime Enxuto com jlink: jlink --module-path $JAVA_HOME/jmods:mods --add-modules com.empresa.app --output runtime-customizado --strip-debug --compress=2.",
          "Diferenca entre Arrays.asList() e List.of(): Arrays.asList() (Java 1.2) permite substituir elementos com .set(i, val) e aceita null; List.of() (Java 9) e totalmente imutavel e lanca NullPointerException se receber null.",
          "Onde usar e onde NAO usar var: var e permitido apenas em variaveis locais inicializadas, loops for e try-with-resources; NAO pode ser usado em campos de classe, parametros de metodos ou tipos de retorno.",
          "Cuidado com var + Diamond Operator: Escrever var lista = new ArrayList<>(); infere ArrayList<Object>! Especifique sempre o tipo no diamante: var lista = new ArrayList<Cliente>();"
        ],
        callout: {
          type: "tip",
          title: "var com Tipos Interseccao e Objetos Anonimos",
          text: "Uma capacidade unica do var no Java 10+ e preservar o tipo exato de objetos anonimos ou intersecoes de tipos: var contexto = new Object() { int id = 42; String status = 'OK'; }; permite acessar contexto.id e contexto.status diretamente no escopo do metodo!"
        }
      },
      {
        heading: "Retrocompatibilidade e Quebras Controladas na Transição Java 8 -> Java 9/10",
        body: "A transicao do Java 8 para o Java 9 foi a atualizacao mais desafiadora da historia da plataforma ate entao, nao por mudancas na linguagem, mas porque muitos frameworks do ecossistema violavam limites internos da JVM. Ate o Java 8, qualquer biblioteca podia usar setAccessible(true) para invadir classes privadas do JDK ou assumir que o ClassLoader do sistema era uma instancia de URLClassLoader (para injetar JARs dinamicamente). Com o JPMS no Java 9, os pacotes internos do JDK deixaram de ser abertos por padrao e o Application ClassLoader deixou de herdar de URLClassLoader. Para evitar que o ecossistema quebrasse da noite para o dia, os engenheiros do OpenJDK criaram tres pontes fundamentais de retrocompatibilidade.",
        bullets: [
          "1. Unnamed Module (Compatibilidade Total do Classpath): Se voce executar java -cp app.jar:libs/* Main sem nenhum module-info.java, todas as classes entram no Unnamed Module, que le automaticamente todos os modulos do JDK sem exigir migracao para o Module Path.",
          "2. Automatic Modules e Multi-Release JARs (JEP 238): Um JAR tradicional colocado no --module-path transforma-se em um Modulo Automatico (ou define Automatic-Module-Name no MANIFEST.MF). Ja os Multi-Release JARs permitem empacotar implementacoes Java 8 na raiz do JAR e versoes otimizadas para Java 9+ dentro de META-INF/versions/9/ no mesmo artefato!",
          "3. Valvula de Escape --illegal-access e --add-opens: No Java 9 a 15, o JDK manteve o modo --illegal-access=permit por padrao (emitindo apenas um warning no console quando bibliotecas como versoes antigas do Spring, Netty ou Lombok faziam reflexao profunda no JDK). Para autorizar explicitamente um pacote, usa-se --add-opens java.base/java.lang=ALL-UNNAMED.",
          "Preservacao do sun.misc.Unsafe (JEP 260): Como bibliotecas vitais de alta performance (Netty, Hazelcast, Cassandra, Mockito) dependiam de sun.misc.Unsafe, ele foi mantido acessivel no modulo jdk.unsupported enquanto o Java 9 introduzia a alternativa oficial segura: VarHandle (java.lang.invoke.VarHandle)."
        ],
        callout: {
          type: "warning",
          title: "Por que var nao quebrou codigos antigos que tinham variaveis chamadas 'var'?",
          text: "No Java 10, 'var' NAO foi adicionado como keyword reservada tradicional (como int ou class), mas sim como um 'identificador de tipo reservado contextual'. Assim, codigos legados que possuiam metodos ou variaveis chamados int var = 5; continuaram compilando sem nenhum erro! Apenas declarar uma classe chamada class var {} passou a ser proibido."
        }
      }
    ]
  },
  {
    id: "jv-cap-6",
    number: 6,
    part: "Java Funcional & Modular",
    partColor: "blue",
    title: "Java 11 (LTS): HttpClient HTTP/2 Nativo, Execução Direta .java, Strings & Flight Recorder",
    subtitle: "Cadência semestral de releases, novo java.net.http.HttpClient reativo, JFR open-source e remoção do Java EE do JDK",
    readingTime: "16 min",
    keyConcepts: [
      "java.net.http.HttpClient (HTTP/2 & WebSocket)",
      "Execucao Direta (java Script.java • JEP 330)",
      "Remocao de Modulos Java EE / JAXB (JEP 320)",
      "JDK Flight Recorder (JFR) Open-Source",
      "Novas APIs de String & Files"
    ],
    teacherIntro:
      "Lancado em setembro de 2018 como a primeira versao Long-Term Support (LTS) do novo modelo de cadencia semestral, o Java 11 aposentou definitivamente o arcaico HttpURLConnection com um cliente HTTP/2 moderno, abriu o codigo do profiler de producao JDK Flight Recorder (JFR) e concluiu a limpeza do JDK ao remover os antigos modulos Java EE e CORBA.",
    keyTakeaways: [
      "O novo java.net.http.HttpClient (JEP 321, incubado no Java 9 e padronizado no Java 11) suporta nativamente HTTP/1.1, HTTP/2 multiplexado, WebSockets e chamadas sincronas (send) ou assincronas nao-bloqueantes (sendAsync com CompletableFuture).",
      "A JEP 330 permitiu executar arquivos de codigo-fonte Java diretamente pelo comando java MeuScript.java (e via Shebang #!/usr/bin/java --source 11 no Linux), compilando em memoria sem gerar arquivo .class em disco.",
      "O JDK Flight Recorder (JFR) e o JDK Mission Control foram abertos no OpenJDK 11, oferecendo profiling continuo em producao com overhead inferior a 1% de CPU.",
      "A JEP 320 removeu definitivamente do JDK os 6 modulos de Java EE e CORBA (como javax.xml.bind / JAXB e javax.annotation), que haviam sido marcados como @Deprecated(forRemoval=true) no Java 9.",
      "A sintaxe var foi estendida para parametros de expressoes Lambda ((@Nonnull var x, var y) -> x + y), permitindo aplicar anotacoes de validacao ou nulidade sem precisar escrever o tipo completo."
    ],
    sections: [
      {
        heading: "Novidades da Versão: O que Chegou no Java 11 (LTS)",
        body: "O Java 11 consolidou todas as melhorias das versoes 9 e 10 em uma base LTS robusta e trouxe adicoes essenciais para o desenvolvimento moderno em nuvem. A principal estrela da biblioteca padrao foi a padronizacao do pacote java.net.http (HttpClient, HttpRequest, HttpResponse e WebSocket), eliminando a necessidade de bibliotecas externas apenas para fazer chamadas REST JSON. A classe String recebeu metodos utilitarios conscientes de Unicode (isBlank(), lines() retornando Stream<String>, strip(), stripLeading(), stripTrailing() e repeat(int)). A classe java.nio.file.Files ganhou Files.readString(Path) e Files.writeString(Path, CharSequence), enquanto Predicate recebeu o metodo estatico Predicate.not(Predicate). Na camada da JVM, entraram o controle de acesso baseado em Nests para classes internas (Nest-Based Access Control • JEP 181), o coletor de lixo experimental de baixissima latencia ZGC (JEP 333), o coletor No-Op Epsilon GC (JEP 318, util para benchmarks de alocacao) e o JDK Flight Recorder (JFR) integrado gratuitamente ao OpenJDK.",
        bullets: [
          "java.net.http.HttpClient (JEP 321): Imutavel, thread-safe, fluente (Builder pattern), com suporte nativo a HTTP/2, TLS 1.3 (JEP 332), compressao e Reactive Streams.",
          "Metodos Modernos em String & Files: strip() (que reconhece todo espaco em branco Unicode via Character.isWhitespace(), superando o antigo trim() que so olhava caracteres ASCII <= U+0020), isBlank(), lines(), repeat() e Files.readString().",
          "Execucao de Arquivo Unico (JEP 330): java Calculadora.java compila a classe em memoria e invoca o main() instantaneamente, transformando o Java em uma excelente ferramenta para scripts DevOps e CLI.",
          "Nest-Based Access Control (JEP 181): Elimina a necessidade do compilador gerar metodos sinteticos package-private (access$000) quando uma classe interna acessa membros privados da classe externa.",
          "Observabilidade de Producao com JFR: java -XX:StartFlightRecording=duration=60s,filename=perfil.jfr -jar app.jar captura eventos de GC, locks, I/O e alocacao com custo quase zero."
        ],
        callout: {
          type: "info",
          title: "Por que String.strip() e superior ao antigo String.trim()?",
          text: "O metodo String.trim() foi escrito no JDK 1.0 quando o Unicode ainda engatinhava: ele remove apenas caracteres com codigo <= U+0020 (espaco ASCII simples). Se uma string contiver um espaco ideografico ou non-breaking space Unicode (como U+2000), trim() nao o remove! Ja String.strip() do Java 11 usa Character.isWhitespace() seguindo o padrao Unicode completo."
        }
      },
      {
        heading: "Como Utilizar na Prática: HttpClient, Utilitários Funcionais e Scripts",
        body: "Em microsservicos Java 11+, crie uma unica instancia compartilhada de HttpClient (com pool de conexoes e timeout configurados) e reutilize-a em toda a aplicacao. Para chamadas sincronas simples, utilize client.send(request, BodyHandlers.ofString()); para fluxos nao-bloqueantes de alto throughput, utilize client.sendAsync(request, BodyHandlers.ofString()).thenApply(HttpResponse::body). Na transformacao de colecoes para arrays tipados, utilize o novo metodo default Collection.toArray(IntFunction<T[]>): String[] nomes = lista.toArray(String[]::new) em vez do antigo lista.toArray(new String[0]). Ao filtrar Streams com negacao de method references, use .filter(Predicate.not(String::isBlank)) para manter a leitura fluida.",
        bullets: [
          "Construcao de HttpRequest: HttpRequest.newBuilder().uri(URI.create(url)).timeout(Duration.ofSeconds(5)).header('Content-Type', 'application/json').POST(BodyPublishers.ofString(json)).build().",
          "Leitura e Escrita Rapida de Arquivos: String conteudo = Files.readString(Path.of('config.json')); Files.writeString(Path.of('saida.txt'), resultado);",
          "Conversao de Optional: opt.isEmpty() (adicionado no Java 11 como par semantico direto de opt.isPresent()) melhora a legibilidade de validacoes.",
          "Parametros Lambda Anotados (JEP 323): (@NonNull var req, @Valid var payload) -> processar(req, payload) combina inferencia de tipos com validadores estaticos."
        ],
        callout: {
          type: "tip",
          title: "Diagnosticando Vazamentos e Latencia com JFR sem Reiniciar a JVM",
          text: "No Java 11+, voce pode iniciar uma gravacao do Flight Recorder em um processo que ja esta rodando em producao usando jcmd <PID> JFR.start name=diagnostico duration=120s filename=/tmp/dump.jfr sem precisar reiniciar o container!"
        }
      },
      {
        heading: "Retrocompatibilidade e Guia Prático de Migração: Java 8 LTS -> Java 11 LTS",
        body: "Para a grande maioria das empresas que saltaram diretamente do Java 8 LTS para o Java 11 LTS, o ponto mais critico de retrocompatibilidade foi a JEP 320: a remocao definitiva dos modulos Java EE e CORBA que historicamente vinham embutidos no JDK desde o Java 6. Aplicacoes que utilizavam anotacoes como @PostConstruct / @PreDestroy (javax.annotation), mapeamento XML com JAXB (javax.xml.bind.JAXBContext, frequentemente usado internamente pelo Hibernate 5 e clientes SOAP JAX-WS) ou ativacao JAF (javax.activation) passaram a lancar java.lang.NoClassDefFoundError: javax/xml/bind/JAXBException ao subir no Java 11. Felizmente, a solucao nao exige reescrever codigo: basta declarar explicitamente essas bibliotecas como dependencias normais no pom.xml (Maven) ou build.gradle!",
        bullets: [
          "Modulos Removidos na JEP 320: java.xml.bind (JAXB), java.xml.ws (JAX-WS), java.xml.ws.annotation (Common Annotations como @PostConstruct/@Resource), java.activation (JAF), java.transaction (JTA) e java.corba.",
          "Como Resolver JAXB e @PostConstruct no Maven/Gradle: Adicione jakarta.xml.bind:jakarta.xml.bind-api:2.3.3, org.glassfish.jaxb:jaxb-runtime:2.3.8 e jakarta.annotation:jakarta.annotation-api:1.3.5 (que no Java 11 ainda exportam os pacotes javax.* com total compatibilidade binaria!).",
          "Atualizacao de Ferramentas de Build e Bytecode: Ao migrar do Java 8 para o 11, atualize o maven-compiler-plugin para >= 3.8.1 (usando <release>11</release>), Lombok para >= 1.18.4, Mockito/ByteBuddy e Jacoco para versoes que suportem o bytecode major 55.",
          "Remocao de Fontes no Docker Alpine/Slim: Imagens base do OpenJDK 11 deixaram de incluir pacotes de fontes do sistema operacional por padrao; relatorios legados JasperReports ou Apache POI que geram planilhas/PDFs precisam instalar fontconfig e ttf-dejavu no Dockerfile."
        ],
        callout: {
          type: "warning",
          title: "Auditor de Dependencias Internas: Use o comando jdeps antes de migrar",
          text: "Antes de atualizar uma aplicacao do Java 8 para o Java 11+, execute a ferramenta oficial do JDK sobre o seu JAR: jdeps --jdk-internals --multi-release 11 meu-app.jar. O jdeps lista exatamente quais classes do seu projeto ou de bibliotecas de terceiros chamam APIs internas ou removidas e sugere o substituto oficial!"
        }
      }
    ]
  }
];
