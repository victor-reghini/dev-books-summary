// Parte 3: Java Moderno, Data-Oriented Programming, Virtual Threads & Panama (Capitulos 7 a 9: Java 12 a Java 25 LTS)

export const part3Chapters = [
  {
    id: "jv-cap-7",
    number: 7,
    part: "Java Moderno & LTS (Java 17 a 25)",
    partColor: "emerald",
    title: "Java 12 a 17 (LTS): Records, Sealed Classes, Switch Expressions & Text Blocks",
    subtitle: "Data-Oriented Programming na JVM, Pattern Matching para instanceof, Helpful NPEs, ZGC e Encapsulamento Forte",
    readingTime: "18 min",
    keyConcepts: [
      "Records Imutaveis (JEP 395)",
      "Sealed Classes & Interfaces (JEP 409)",
      "Switch Expressions & yield (JEP 361)",
      "Text Blocks Multilinhas (JEP 378)",
      "Encapsulamento Forte do JDK (JEP 403)"
    ],
    teacherIntro:
      "Entre o Java 12 (2019) e o Java 17 LTS (2021), o Project Amber redesenhou a expressividade da linguagem com Switch Expressions, Text Blocks, Pattern Matching para instanceof, Records e Sealed Classes, inaugurando a Programacao Orientada a Dados (Data-Oriented Programming) e tornando o Java 17 o baseline obrigatorio do Spring Boot 3 e Quarkus 3.",
    keyTakeaways: [
      "Records (Java 16, JEP 395) sao portadores transparentes e imutaveis de dados: uma unica linha gera campos private final, construtor canonico, metodos de acesso (nome() em vez de getNome()) e implementacoes otimizadas de equals(), hashCode() e toString().",
      "Sealed Classes e Interfaces (Java 17, JEP 409) restringem explicitamente quais classes podem estende-las ou implementa-las atraves da clausula permits, formando Tipos Algebricos de Dados (Sum Types) verificados pelo compilador.",
      "Switch Expressions (Java 14, JEP 361) transformaram o switch em uma expressao que retorna valor usando setas (->) sem risco de fall-through acidental por esquecimento de break, alem da palavra contextual yield para blocos multilinhas.",
      "Text Blocks (Java 15, JEP 378) utilizam aspas triplas (\"\"\") com remocao inteligente de indentacao incidental, erradicando a poluicao de barras invertidas em strings JSON, SQL, HTML e GraphQL.",
      "A JEP 403 no Java 17 ativou o Encapsulamento Forte definitivo dos pacotes internos do JDK, removendo a flag --illegal-access=permit e exigindo --add-opens explicito para reflexao profunda."
    ],
    sections: [
      {
        heading: "Novidades por Versão: A Evolução do Java 12 ao Java 17 (LTS)",
        body: "Cada release semestral entre 2019 e 2021 entregou tijolos fundamentais ate culminar no Java 17 LTS. O Java 12 trouxe Collectors.teeing() (que combina dois coletores em uma unica passada do Stream) e String.indent()/transform(). O Java 13 aprimorou o ZGC para devolver memoria nao usada ao sistema operacional. O Java 14 finalizou as Switch Expressions (JEP 361) e introduziu as preciosissimas Helpful NullPointerExceptions (JEP 358: a JVM passou a analisar o bytecode no momento da falha e informar exatamente qual variavel ou metodo da cadeia a.b().c().d() retornou null!). O Java 15 padronizou os Text Blocks (JEP 378), introduziu Hidden Classes (JEP 371, para geracao dinamica de classes por frameworks) e promoveu os coletores ZGC e Shenandoah para producao. O Java 16 padronizou os Records (JEP 395), o Pattern Matching para instanceof (JEP 394), o metodo direto Stream.toList() e a ferramenta jpackage. Finalmente, o Java 17 LTS (setembro de 2021) padronizou as Sealed Classes (JEP 409), a nova interface RandomGenerator (JEP 356), o filtro de desserializacao contextual (JEP 415) e o Encapsulamento Forte do JDK (JEP 403).",
        bullets: [
          "Java 14 • Switch Expressions & Helpful NPEs: Adeus ao bug de esquecer break no switch e aos NPEs misteriosos em linhas com chamadas encadeadas.",
          "Java 15 • Text Blocks & ZGC Production: Strings multilinhas limpas com stripIndent() automatico e pausas de GC limitadas a frações de milissegundo.",
          "Java 16 • Records, instanceof Pattern Matching & Stream.toList(): Eliminacao de casts redundantes (if (obj instanceof String s && !s.isBlank())) e fim do verbo .collect(Collectors.toList()).",
          "Java 17 LTS • Sealed Classes & Interfaces: Modelagem de estados de dominio fechados (ex: Pagamento Pendente, Aprovado ou Estornado) com exaustividade garantida.",
          "Java 17 LTS • HexFormat & RandomGenerator: Utilitario nativo java.util.HexFormat para converter byte[] <-> Hexadecimal sem bibliotecas externas."
        ],
        callout: {
          type: "info",
          title: "Helpful NullPointerExceptions (JEP 358): Como a JVM Faz Isso sem Perder Performance?",
          text: "Reconstruir a expressao exata que causou null (ex: Cannot invoke 'Endereco.cep()' because the return value of 'Cliente.endereco()' is null) exige inspecionar o bytecode do metodo. A JVM so executa essa analise no instante raro em que o NullPointerException realmente acontece, mantendo zero overhead durante a execucao normal!"
        }
      },
      {
        heading: "Como Utilizar na Prática: Records com Construtor Compacto, Sealed Types e Switch",
        body: "Na arquitetura moderna Java 17+, substitua classes DTO, comandos, eventos de mensageria (Kafka/RabbitMQ), chaves compostas de cache e retornos multiplos de metodos por Records. Para validar invariantes de negocio (como impedir preco negativo ou CPF nulo) sem precisar repetir a atribuicao this.campo = campo, utilize o Construtor Compacto do Record (declarado sem lista de parametros). Combine Sealed Interfaces com Records para modelar retornos de casos de uso ou maquinas de estado: quando voce faz um switch como expressao sobre uma interface selada, nao precisa (e nao deve!) escrever o ramo default, pois se alguem adicionar uma nova permissao na interface no futuro, o compilador acusara erro em todos os switches incompletos.",
        bullets: [
          "Construtor Compacto em Record: public record Transferencia(String origem, BigDecimal valor) { public Transferencia { Objects.requireNonNull(origem); if (valor.signum() <= 0) throw new IllegalArgumentException(); } }.",
          "Records Locais em Metodos: Voce pode declarar um record dentro do corpo de um metodo para agrupar dados intermediarios de um pipeline Stream com clareza total.",
          "Switch Expression com Multiplos Cases e yield: int dias = switch (mes) { case JAN, MAR, MAI -> 31; case ABR, JUN -> 30; case FEV -> { log('Verificando bissexto'); yield bissexto ? 29 : 28; } };",
          "Text Blocks com Formatacao: Use \"\"\" ... \"\"\".formatted(id, nome) e os novos escapes \\s (preserva espaco ao final da linha) e \\ no fim da linha (une duas linhas sem quebra)."
        ],
        callout: {
          type: "tip",
          title: "Diferenca entre Stream.toList() (Java 16) e Collectors.toList() (Java 8)",
          text: "O novo metodo direto stream.toList() (Java 16+) retorna uma lista NAO-modificavel otimizada (mas que aceita elementos null, diferente de Collectors.toUnmodifiableList() que rejeita null), enquanto Collectors.toList() retorna um ArrayList mutavel comum."
        }
      },
      {
        heading: "Retrocompatibilidade: Encapsulamento Forte (JEP 403) e Serialização Segura de Records",
        body: "Na migracao do Java 11 para o Java 17 LTS, a principal mudanca comportamental reside na JEP 403 (Strongly Encapsulate JDK Internals). No Java 9 a 15, tentar usar reflexao (Field.setAccessible(true)) em campos privados de classes do próprio JDK (como java.lang.String ou java.io.File) funcionava emitindo apenas um warning gracas ao modo padrao --illegal-access=permit. No Java 16 esse padrao virou deny, e no Java 17 a flag --illegal-access foi completamente desativada! Bibliotecas antigas (como versoes defasadas do cglib, XStream, Gson ou Lombok anterior a 1.18.20) que tentam invadir internos da JVM lancam InaccessibleObjectException imediatamente, a menos que sejam atualizadas ou que o pacote especifico seja aberto no comando de inicializacao via --add-opens.",
        bullets: [
          "Como diagnosticar e contornar InaccessibleObjectException no Java 17: Atualize a biblioteca infratora (ex: usar Jackson/Gson modernos com suporte nativo a Records) ou adicione pontualmente --add-opens java.base/java.lang.reflect=ALL-UNNAMED na JVM.",
          "Por que sun.misc.Unsafe continuou funcionando no Java 17? A JEP 403 manteve o modulo jdk.unsupported aberto, preservando a compatibilidade com Netty, Spark e bancos de dados ate que migrassem para VarHandle e Foreign Memory API.",
          "Revolucao na Serializacao de Records: Na serializacao classica (Java 1.1), ObjectInputStream cria o objeto usando magia interna da JVM sem chamar o construtor, permitindo injetar objetos com estado invalido! Ja para um Record, a JVM chama OBRIGATORIAMENTE o construtor canonico publico durante a desserializacao, executando todas as validacoes de seguranca.",
          "Palavras Reservadas Contextuais (record, sealed, permits, non-sealed, yield): Nenhuma delas foi adicionada como keyword global; portanto, codigos antigos que possuiam metodos chamados record() ou variaveis chamadas yield continuaram compilando sem alteracoes."
        ],
        callout: {
          type: "warning",
          title: "Records e JPA / Hibernate: Onde Usar e Onde Evitar?",
          text: "Entidades JPA (@Entity) exigem construtor sem argumentos, estado mutavel monitorado por dirty-checking e proxies dinamicos; portanto, uma @Entity NAO pode ser um Java Record! Porem, Records sao perfeitos para projecoes de leitura JPA (SELECT new br.com.ResumoPedidoRecord(p.id, p.total) FROM Pedido p), chaves @Embeddable/@IdClass no Hibernate 6+ e DTOs de API REST."
        }
      }
    ]
  },
  {
    id: "jv-cap-8",
    number: 8,
    part: "Java Moderno & LTS (Java 17 a 25)",
    partColor: "emerald",
    title: "Java 18 a 21 (LTS): Virtual Threads (Loom), Pattern Matching Switch & Sequenced Collections",
    subtitle: "Concorrência massiva leve M:N, Record Patterns, Generational ZGC e UTF-8 por padrão",
    readingTime: "19 min",
    keyConcepts: [
      "Virtual Threads M:N (Project Loom • JEP 444)",
      "Pattern Matching for switch & when (JEP 441)",
      "Record Patterns & Desestruturacao (JEP 440)",
      "Sequenced Collections (JEP 431)",
      "Generational ZGC (JEP 439) & UTF-8 (JEP 400)"
    ],
    teacherIntro:
      "Lancado em setembro de 2023, o Java 21 LTS protagonizou a maior revolucao de runtime da historia moderna da JVM: as Virtual Threads do Project Loom permitiram escalar milhoes de conexoes simultaneas mantendo o modelo imperativo simples de uma thread por requisicao, acompanhadas por Pattern Matching completo no switch, Record Patterns, Sequenced Collections e ZGC Generacional.",
    keyTakeaways: [
      "Virtual Threads (JEP 444) sao threads leves gerenciadas pela JVM (e nao pelo kernel do Sistema Operacional): enquanto uma Platform Thread consome ~1 MB de stack fixa reservada no SO, uma Virtual Thread consome apenas algumas centenas de bytes no heap e cresce/encolhe dinamicamente.",
      "Quando uma Virtual Thread executa uma operacao de I/O bloqueante (JDBC, HTTP, Socket, LockSupport.park), a JVM desmonta (unmount) sua pilha da Carrier Thread para o heap e a Carrier Thread passa imediatamente a executar outra Virtual Thread sem bloquear o nucleo da CPU.",
      "Pattern Matching for switch (JEP 441) e Record Patterns (JEP 440) permitem testar tipos, tratar null explicitamente (case null -> ...), desestruturar campos aninhados de Records e aplicar guardas condicionais (when) diretamente nos cases.",
      "Sequenced Collections (JEP 431) corrigiu uma lacuna de 25 anos no Collections Framework ao introduzir as interfaces SequencedCollection, SequencedSet e SequencedMap com metodos padronizados getFirst(), getLast(), addFirst(), addLast() e reversed().",
      "O Generational ZGC (JEP 439) separou o heap em geracoes jovem e madura no coletor ZGC, reduzindo o overhead de CPU em ate 4x e mantendo pausas abaixo de 1 milissegundo."
    ],
    sections: [
      {
        heading: "Novidades por Versão: Do Java 18 ao Marco Histórico do Java 21 (LTS)",
        body: "O caminho ate o Java 21 LTS consolidou melhorias de portabilidade, concorrencia e linguagem. O Java 18 (marco de 2022) definiu UTF-8 como charset padrao universal de todas as APIs de I/O da plataforma (JEP 400, eliminando bugs onde FileReader funcionava em Linux UTF-8 mas corrompia acentos no Windows-1252), trouxe o utilitario de linha de comando jwebserver (JEP 408) e a tag @snippet para exemplos de codigo validados no JavaDoc (JEP 413). Os Java 19 e 20 incubaram e refinaram intensamente os projetos Loom, Panama e Amber. Em setembro de 2023, o Java 21 LTS entregou em versao final de producao: Virtual Threads (JEP 444), Pattern Matching for switch (JEP 441), Record Patterns (JEP 440), Sequenced Collections (JEP 431), Generational ZGC (JEP 439) e a API criptografica Key Encapsulation Mechanism (JEP 452, base para algoritmos pos-quanticos).",
        bullets: [
          "Java 18 • UTF-8 por Padrao (JEP 400): Fim das divergencias de codificacao entre ambientes de desenvolvimento Windows e servidores Linux em producao.",
          "Java 21 LTS • Virtual Threads (JEP 444): Escalabilidade de Lei de Little (Throughput = Concorrencia / Latencia) sem precisar reescrever o sistema para programacao reativa complexa.",
          "Java 21 LTS • Pattern Matching no switch & Record Patterns (JEP 440/441): Desestruturacao declarativa de arvores de objetos imutaveis com checagem de exaustividade.",
          "Java 21 LTS • Sequenced Collections (JEP 431): Fim do anti-padrao list.get(list.size() - 1) ou iterator().next(); agora toda lista/conjunto ordenado tem list.getFirst(), list.getLast() e list.reversed().",
          "Java 21 LTS • Generational ZGC (JEP 439): Coleta objetos jovens efemeros com frequencia altissima sem precisar varrer todo o heap antigo."
        ],
        callout: {
          type: "info",
          title: "Por que as String Templates (STR.\"...\") nao ficaram no Java 21?",
          text: "As String Templates entraram apenas como Preview Feature no Java 21 (JEP 430) e no Java 22 (JEP 459), e foram posteriormente retiradas no Java 23 para redesenho completo pela equipe do OpenJDK. Esse e o grande valor das Preview Features (--enable-preview): colher feedback real antes de congelar uma sintaxe para sempre!"
        }
      },
      {
        heading: "Como Utilizar na Prática: Virtual Threads, Pattern Matching Switch e Sequenced Collections",
        body: "A regra numero 1 das Virtual Threads e: NUNCA faca pool de Virtual Threads! Como elas sao extremamente baratas e descartaveis, crie uma nova Virtual Thread para cada tarefa de I/O usando try (var executor = Executors.newVirtualThreadPerTaskExecutor()) ou Thread.startVirtualThread(runnable). Para limitar a concorrencia contra um servico externo ou banco de dados que suporta no maximo N conexoes simultaneas, nao use um thread pool fixo: utilize um java.util.concurrent.Semaphore(N) (pois bloquear uma Virtual Thread em semaphore.acquire() custa quase zero!). Na camada de dominio, combine Pattern Matching no switch com desestruturacao de Records e guardas when para expressar regras de negocio complexas em poucas linhas legiveis.",
        bullets: [
          "Criando Virtual Threads: Thread.ofVirtual().name('pedido-vt-', 0).start(tarefa) ou Executors.newVirtualThreadPerTaskExecutor().",
          "Switch com Desestruturacao e when: switch (evento) { case PagamentoPix(var chave, var valor) when valor.compareTo(LIMITE) > 0 -> auditarAltoValor(chave, valor); case PagamentoPix(var chave, var valor) -> aprovar(chave, valor); case null -> Ignorar(); }.",
          "SequencedCollection e SequencedMap: Deque, List, LinkedHashSet e SortedSet agora compartilham getFirst()/getLast()/reversed(); LinkedHashMap e TreeMap oferecem firstEntry(), lastEntry(), pollFirstEntry() e putFirst(k, v).",
          "Ativando o ZGC Generacional: No Java 21 e 22 use -XX:+UseZGC -XX:+ZGenerational (a partir do Java 23+, o modo generacional tornou-se o padrao automatico do ZGC)."
        ],
        callout: {
          type: "tip",
          title: "Tratamento Explicito de null no novo switch (Java 21+)",
          text: "Historicamente, passar uma referencia null para um switch (x) lancava NullPointerException imediato antes de entrar no bloco. No Java 21+, voce pode declarar explicitamente case null -> tratarNulo(); ou ate combinar case null, String s when s.isBlank() -> tratarVazio();!"
        }
      },
      {
        heading: "Retrocompatibilidade: Por que o Project Loom Não 'Coloriu' as Funções do Java?",
        body: "Em linguagens como JavaScript/TypeScript, Python e C#, a adocao de concorrencia leve exigiu dividir a linguagem em dois mundos incompativeis ('What Color is Your Function?'): funcoes normais vs funcoes async que obrigam todos os seus chamadores na cadeia a tambem serem async/await. A equipe do Project Loom recusou esse caminho para proteger os 28 anos de retrocompatibilidade do ecossistema Java. Ao implementar VirtualThread como uma subclasse direta da classe java.lang.Thread existente desde o JDK 1.0 e adaptar internamente as primitivas de I/O do proprio JDK (Socket, NIO, LockSupport, ReentrantLock), todo o codigo sincrono existente no mundo (drivers JDBC, clientes HTTP, Spring MVC, Jakarta REST, JUnit) passou a rodar sobre Virtual Threads de forma 100% transparente sem alterar uma unica assinatura de metodo!",
        bullets: [
          "100% de Compatibilidade com Thread API: Thread.currentThread(), Thread.sleep(), stack traces de excecoes e step-into no debugger da IDE funcionam exatamente da mesma forma em uma Virtual Thread (com thread.isVirtual() retornando true).",
          "Atencao ao Thread Pinning no Java 21: No Java 21 a 23, se uma Virtual Thread bloquear em I/O enquanto estiver DENTRO de um bloco ou metodo synchronized (ou dentro de um frame nativo JNI), ela fica 'presa' (pinned) à Carrier Thread do SO. A recomendacao para bibliotecas no Java 21 e substituir synchronized que envolve I/O por ReentrantLock, e diagnosticar com -Djdk.tracePinnedThreads=full (nota: o Java 24 resolveu o pinning de synchronized na JEP 491!).",
          "Cuidado com ThreadLocal em Virtual Threads: Embora Virtual Threads suportem ThreadLocal para manter compatibilidade total com frameworks existentes, armazenar objetos pesados (como caches de SimpleDateFormat ou buffers grandes) em ThreadLocal quando se criam 1 milhao de Virtual Threads causara alto consumo de memoria. Prefira objetos imutaveis compartilhados ou ScopedValue.",
          "Retrocompatibilidade em Sequenced Collections: Adicionar reversed() em List e Deque exigiu cuidado fino com subclasses customizadas antigas que porventura ja definessem metodos getFirst()/addFirst() com tipos de retorno covariantes."
        ],
        callout: {
          type: "warning",
          title: "Como Habilitar Virtual Threads no Spring Boot 3.2+ e Quarkus 3+",
          text: "No Spring Boot 3.2+ rodando sobre Java 21+, basta adicionar uma unica linha no application.properties: spring.threads.virtual.enabled=true (que reconfigura automaticamente o Tomcat/Jetty e o TaskExecutor). No Quarkus 3+, basta anotar o metodo REST bloqueante com @RunOnVirtualThread!"
        }
      }
    ]
  },
  {
    id: "jv-cap-9",
    number: 9,
    part: "Java Moderno & LTS (Java 17 a 25)",
    partColor: "emerald",
    title: "Java 22 a 25 (LTS): Foreign Function & Memory (Panama), Stream Gatherers & Scoped Values",
    subtitle: "Substituição segura do JNI com Arena/MemorySegment, variáveis anônimas _, Class-File API e Structured Concurrency",
    readingTime: "18 min",
    keyConcepts: [
      "Foreign Function & Memory API (Panama • JEP 454)",
      "Variaveis & Padroes Anonimos _ (JEP 456)",
      "Stream Gatherers Customizados (JEP 485)",
      "Class-File API Oficial (JEP 484) & Fim do Pinning (JEP 491)",
      "Java 25 LTS: Scoped Values, Structured Concurrency & Lilliput"
    ],
    teacherIntro:
      "Culminando no Java 25 LTS (setembro de 2025), as versoes 22 a 25 entregaram a aposentadoria segura do JNI e do sun.misc.Unsafe atraves do Project Panama (FFM API), abriram as operacoes intermediarias de Streams com Stream Gatherers, eliminaram o Thread Pinning de synchronized e consolidaram Scoped Values, Structured Concurrency e Compact Object Headers.",
    keyTakeaways: [
      "A Foreign Function & Memory API (Project Panama, finalizada no Java 22 • JEP 454) permite alocar memoria off-heap segura com Arena/MemorySegment e invocar funcoes de bibliotecas C/C++/Rust nativas com Linker/MethodHandle em puro Java, sem escrever codigo C JNI.",
      "Variaveis e Padroes Anonimos com underscore _ (Java 22 • JEP 456) permitem descartar explicitamente variaveis de loop, parametros de lambda, blocos catch (catch (NumberFormatException _)) e componentes de records que nao serao utilizados.",
      "Stream Gatherers (Java 24 • JEP 485) sao para as operacoes intermediarias de Stream o que o Collector (Java 8) foi para as operacoes terminais: permitem transformacoes stateful como windowFixed, windowSliding, fold e scan.",
      "A JEP 491 (Java 24) eliminou o gargalo de Thread Pinning em blocos synchronized: agora Virtual Threads podem desmontar e montar livremente mesmo dentro de secoes sincronizadas.",
      "O Java 25 LTS coroa a geracao moderna com Scoped Values (substituto imutavel e leve do ThreadLocal), Structured Concurrency, Compact Object Headers (Project Lilliput) e Flexible Constructor Bodies (validacao antes de super())."
    ],
    sections: [
      {
        heading: "Novidades por Versão: Do Java 22 ao Java 25 (LTS)",
        body: "O ciclo entre 2024 e 2025 completou as grandes frentes de engenharia do OpenJDK. O Java 22 (marco de 2024) finalizou a Foreign Function & Memory API (JEP 454) e as Variaveis e Padroes Anonimos _ (JEP 456), alem de permitir executar programas compostos por multiplos arquivos .java diretamente sem build tool (JEP 458). O Java 23 (setembro de 2024) trouxe comentarios de documentacao JavaDoc em Markdown usando /// (JEP 467) e tornou o modo Generacional o padrao unico do ZGC (JEP 474). O Java 24 (marco de 2025) entregou em versao final os Stream Gatherers (JEP 485), a Class-File API padrao para leitura/geracao de bytecode (JEP 484), a sincronizacao de Virtual Threads sem Pinning (JEP 491), algoritmos criptograficos Pos-Quanticos ML-KEM/ML-DSA (JEP 496/497) e desabilitou permanentemente o Security Manager (JEP 486). Em setembro de 2025, o Java 25 LTS consolida toda essa evolucao com Scoped Values, Structured Concurrency, Flexible Constructor Bodies (permitindo validar e preparar argumentos antes de chamar super(...) ou this(...)), Compact Object Headers de 64 bits (Project Lilliput) e melhorias AOT do Project Leyden.",
        bullets: [
          "Java 22 • FFM API (JEP 454) & Unnamed Variables _ (JEP 456): Acesso off-heap seguro com Arena e codigo mais limpo descartando variaveis ignoradas com _.",
          "Java 23 • Markdown JavaDoc (JEP 467): Documentacao escrita naturalmente com /// suportando tabelas, listas e blocos de codigo Markdown sem tags HTML verbosas.",
          "Java 24 • Stream Gatherers (JEP 485) & Sem Pinning em synchronized (JEP 491): Janelas deslizantes nativas em Streams e compatibilidade irrestrita de Virtual Threads com monitores classicos.",
          "Java 24 • Class-File API (JEP 484): API oficial no pacote java.lang.classfile para analisar, gerar e transformar bytecodes .class acompanhando o proprio JDK.",
          "Java 25 LTS • Scoped Values, Concorrencia Estruturada & Lilliput: Contexto imutavel herdavel por threads filhas, cancelamento automatico de subtarefas e reducao de 10% a 20% na pegada de RAM da JVM."
        ],
        callout: {
          type: "info",
          title: "Por que a Class-File API (JEP 484) e Vital para a Evolucao do Ecossistema?",
          text: "Antes do Java 24, toda vez que saia uma nova versao do Java, projetos como Spring, Quarkus, Hibernate, Gradle e Mockito ficavam bloqueados esperando a biblioteca externa ASM ser atualizada para reconhecer o novo numero de bytecode major! Agora o proprio JDK fornece java.lang.classfile atualizado no dia zero de cada release."
        }
      },
      {
        heading: "Como Utilizar na Prática: Arena (Panama), Stream Gatherers, ScopedValue e StructuredTaskScope",
        body: "Para alocar memoria fora do heap da JVM ou chamar uma funcao C nativa (como strlen, radixsort ou bibliotecas de IA/GPU), utilize try (Arena arena = Arena.ofConfined()) { MemorySegment seg = arena.allocateFrom('Java 25'); ... }: no exato instante em que o bloco try termina, a memoria nativa e liberada deterministicamente sem depender do Garbage Collector e qualquer tentativa de acesso posterior lanca IllegalStateException imediato (prevenindo vulnerabilidades de use-after-free). Em Streams, use stream.gather(Gatherers.windowFixed(3)) ou Gatherers.windowSliding(2) para processar lotes e janelas sem precisar materializar listas intermediarias. Para propagar credenciais de seguranca ou traceId em Virtual Threads, declare public static final ScopedValue<Usuario> USUARIO_ATUAL = ScopedValue.newInstance() e vincule o valor com ScopedValue.where(USUARIO_ATUAL, user).run(() -> processarRequisicao()).",
        bullets: [
          "Variavel Anonima _ (Java 22+): try { return Integer.parseInt(str); } catch (NumberFormatException _) { return 0; } ou mapa.forEach((chave, _) -> processarChave(chave)).",
          "Stream Gatherers (Java 24+): lista.stream().gather(Gatherers.scan(() -> 0, Integer::sum)).toList() calcula somas acumuladas (running totals) diretamente no pipeline.",
          "ScopedValue vs ThreadLocal: ScopedValue e estritamente imutavel dentro de um escopo de execucao delimitado, tem tempo de vida finito automatico e e compartilhado com custo zero de copia por milhares de Virtual Threads filhas.",
          "Structured Concurrency (StructuredTaskScope): Trata multiplas tarefas concorrentes como uma unidade atomica: se uma subtarefa em ShutdownOnFailure falhar, todas as outras sao canceladas imediatamente sem vazar threads orfas."
        ],
        callout: {
          type: "tip",
          title: "Flexible Constructor Bodies: Validando Argumentos Antes do super()",
          text: "Desde o JDK 1.0, a chamada super(...) era obrigada a ser a primeirissima instrucao de um construtor, impedindo validar parametros ou calcular valores auxiliares sem criar metodos estaticos avulsos. No Java moderno (22 preview / 25 LTS), voce pode validar if (valor <= 0) throw new IllegalArgumentException(); ANTES de invocar super(valor)!"
        }
      },
      {
        heading: "Retrocompatibilidade: Integrity by Default, Fim do Unsafe Memory e Flag --enable-native-access",
        body: "A estrategia arquitetural que guia o Java 21 ao Java 25 LTS chama-se 'Integrity by Default' (Integridade por Padrao, liderada por Ron Pressler). O objetivo e garantir que o codigo Java tenha invariantes solidas que nem reflexao profunda, nem JNI arbitrario, nem agentes injetados silenciosamente possam corromper sem o consentimento explicito do operador da aplicacao. Para preservar a retrocompatibilidade durante essa transicao, o OpenJDK adotou um cronograma gradual em varias versoes: primeiro emitindo avisos em runtime, depois exigindo flags explicitas de linha de comando para recursos que quebram o isolamento da JVM.",
        bullets: [
          "Restricao de Acesso Nativo (--enable-native-access): Ao usar a Foreign Function & Memory API (metodo Linker.downcallHandle) ou JNI em versoes recentes, a JVM pede que os modulos autorizados sejam declarados com --enable-native-access=ALL-UNNAMED (ou no MANIFEST.MF com Enable-Native-Access: true).",
          "Depreciacao para Remocao dos Metodos de Memoria do sun.misc.Unsafe (JEP 471 / JEP 498): Com a chegada do VarHandle (Java 9) e da FFM API / MemorySegment (Java 22), os metodos de acesso a memoria bruta do Unsafe foram marcados para remocao gradual, com substituicao direta 1-para-1.",
          "Carregamento Dinamico de Agentes (JEP 451): Agentes de observabilidade (APM como Datadog, NewRelic, OpenTelemetry) continuam funcionando normalmente sem qualquer aviso quando declarados na inicializacao via -javaagent:agente.jar; apenas a injecao dinamica em um processo ja em execucao (usando Attach API, como faz o Mockito inline antigo) emite warning e pede -XX:+EnableDynamicAgentLoading.",
          "Remocao de _ como Identificador Isolado: Para que _ pudesse se tornar a variavel anonima no Java 22, a equipe planejou com 10 anos de antecedencia: no Java 8 o uso de _ isolado como nome de variavel começou a emitir warning de compilacao, no Java 9 foi proibido como identificador, abrindo caminho limpo para a JEP 456 no Java 22!"
        ],
        callout: {
          type: "warning",
          title: "Configurando o Mockito no Java 21 / 25 LTS sem Warnings de Agent",
          text: "Se durante a execucao dos seus testes no Java 21+ aparecer o aviso 'A Java agent has been loaded dynamically (byte-buddy-agent.jar)', basta adicionar -XX:+EnableDynamicAgentLoading ou passar -javaagent:.../byte-buddy-agent.jar no argLine do Maven Surefire / Gradle test task."
        }
      }
    ]
  }
];
