// Parte 4: Frameworks Enterprise & Cloud-Native (Capitulos 10 a 12: Spring Boot, Quarkus, Jakarta EE, Micronaut & GraalVM)

export const part4Chapters = [
  {
    id: "jv-cap-10",
    number: 10,
    part: "Frameworks Enterprise & Cloud-Native",
    partColor: "rose",
    title: "Spring Boot (1.x a 3.x): Histórico de Versões, Auto-Configuration, WebFlux & Virtual Threads",
    subtitle: "Da eliminação do XML no Spring Boot 1.0 à migração javax -> jakarta, AOT/GraalVM e Java 21 no Spring Boot 3.4+",
    readingTime: "20 min",
    keyConcepts: [
      "Auto-Configuration (@ConditionalOnClass / .imports)",
      "Spring MVC vs Spring WebFlux (Project Reactor)",
      "Spring Boot 3.x (Java 17/21, Jakarta EE 10, AOT)",
      "RestClient, JdbcClient & @ServiceConnection",
      "Virtual Threads (spring.threads.virtual.enabled=true)"
    ],
    teacherIntro:
      "Desde seu lancamento em abril de 2014 por Phillip Webb e Dave Syer sobre o alicerce criado por Rod Johnson no Spring Framework, o Spring Boot revolucionou o ecossistema Java corporativo: eliminou a configuracao XML manual, embutiu servidores web em JARs executaveis e evoluiu nas linhas 1.x, 2.x e 3.x ate integrar compilacao nativa GraalVM e Virtual Threads do Java 21.",
    keyTakeaways: [
      "O motor de Auto-Configuration do Spring Boot inspeciona o classpath e os beans existentes atraves de anotacoes condicionais (@ConditionalOnClass, @ConditionalOnMissingBean, @ConditionalOnProperty) para configurar automaticamente DataSources, JPA, Jackson e servidores web.",
      "A serie 1.x (2014-2017) popularizou os Starters opinativos e os Fat JARs; a serie 2.x (2018-2022) introduziu o baseline Java 8, o stack reativo WebFlux (Netty + Project Reactor) e metricas dimensionais com Micrometer.",
      "O Spring Boot 3.0 (novembro de 2022) estabeleceu o Java 17 como minimo obrigatorio, migrou todo o ecossistema de javax.* para jakarta.* (Jakarta EE 10) e introduziu processamento AOT nativo para GraalVM.",
      "O Spring Boot 3.2 a 3.4+ (2023-2025) trouxe suporte nativo de 1 linha para Virtual Threads do Java 21, o novo cliente sincrono fluente RestClient, o JdbcClient, Structured Logging em JSON e integracao com Testcontainers (@ServiceConnection).",
      "Na migracao do Spring Boot 2.x para 3.x, o arquivo legado META-INF/spring.factories para autoconfiguracoes foi substituido pelo novo arquivo META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports."
    ],
    sections: [
      {
        heading: "Histórico Completo de Versões e Implementações: Do Spring Boot 1.0 ao 3.4+",
        body: "Compreender a linha do tempo do Spring Boot (e suas bases Spring Framework 4, 5 e 6) e essencial para manter e evoluir arquiteturas corporativas. No Spring Boot 1.0 a 1.5 (2014-2017, sobre Spring Framework 4.x e Java 6/7/8), nasceram a anotacao @SpringBootApplication (que une @Configuration, @EnableAutoConfiguration e @ComponentScan), os Starters de gerenciamento de dependencias (spring-boot-starter-web, data-jpa, security), o empacotamento em JAR executavel com Tomcat/Jetty/Undertow embutido e o Actuator inicial. No Spring Boot 2.0 a 2.7 (2018-2022, sobre Spring Framework 5.x e baseline Java 8), entrou a programacao reativa nao-bloqueante com Spring WebFlux (Mono<T> e Flux<T> sobre Netty), a rearquitetura completa do Actuator sobre o Micrometer (exportando metricas nativas para Prometheus), suporte de primeira classe a Kotlin, Layered JARs para otimizar cache de camadas Docker e probes nativas de Liveness/Readiness para Kubernetes. No Spring Boot 3.0 a 3.4+ (2022-2025, sobre Spring Framework 6.x e baseline Java 17/21), ocorreu a migracao historica para Jakarta EE 10 (jakarta.*), o motor Ahead-of-Time (AOT) para GraalVM Native Image, Observability unificada (Micrometer Tracing substituindo o antigo Spring Cloud Sleuth), suporte a ProblemDetails (RFC 7807), integracao automatica com Docker Compose e Testcontainers (@ServiceConnection no 3.1), suporte total a Virtual Threads do Java 21, RestClient e JdbcClient (no 3.2), e suporte a CDS, Structured Logging nativo e Spring AI (no 3.3 e 3.4).",
        bullets: [
          "Spring Boot 1.x (2014-2017): Fim do WAR em servidores externos e do web.xml; introducao de application.properties/yml, @ConfigurationProperties e Spring Boot Actuator.",
          "Spring Boot 2.x (2018-2022): Baseline Java 8, Spring WebFlux + WebClient reativo, Micrometer, HikariCP como pool JDBC padrao (substituindo o Tomcat JDBC Pool do 1.x) e JUnit 5 por padrao a partir do 2.2.",
          "Spring Boot 3.0 e 3.1 (2022-2023): Baseline Java 17 obrigatorio, Jakarta EE 10 (jakarta.servlet, jakarta.persistence, jakarta.validation), Hibernate 6, GraalVM Native Support e @ServiceConnection para Testcontainers.",
          "Spring Boot 3.2 (Nov 2023): Suporte a Virtual Threads do Java 21 (spring.threads.virtual.enabled=true), RestClient fluente sincrono, JdbcClient, suporte a checkpoints CRaC e SSL Bundles recarregaveis.",
          "Spring Boot 3.3 e 3.4+ (2024-2025): Suporte otimizado a AppCDS (Class Data Sharing), logs estruturados em JSON nativos (ECS/Logstash/GELF), melhorias em Virtual Threads e validacao profunda de @ConfigurationProperties."
        ],
        callout: {
          type: "info",
          title: "Com Virtual Threads no Java 21 (Spring Boot 3.2+), ainda preciso de WebFlux?",
          text: "No Spring Boot 2.x (Java 8/11), adotar WebFlux reativo era a unica forma de lidar com dezenas de milhares de conexoes I/O concorrentes sem esgotar a RAM com threads do SO. A partir do Spring Boot 3.2+ no Java 21, ativar spring.threads.virtual.enabled=true no Spring MVC tradicional (Tomcat/Jetty) entrega escalabilidade concorrente equivalente ao WebFlux mantendo o codigo imperativo simples, legivel e facil de depurar! O WebFlux continua indicado para streaming continuo de eventos (SSE/WebSockets/RSocket) e backpressure reativo."
        }
      },
      {
        heading: "Como Utilizar e Estruturar na Prática: Spring Boot 3.x Moderno com Java 21",
        body: "Em novos projetos Spring Boot 3.2+, adote Java 21 LTS, habilite Virtual Threads no application.yml e utilize Java Records tanto para DTOs de entrada/saida (com Bean Validation @NotBlank, @Positive) quanto para classes de configuracao imutaveis (@ConfigurationProperties(prefix = 'app.pagamento') public record PagamentoProps(...)). Para chamadas HTTP entre microsservicos, utilize o novo RestClient (que compartilha a API fluente do WebClient mas opera de forma sincrona ideal para Virtual Threads) ou Interfaces HTTP Declarativas (@HttpExchange / @GetExchange). Na camada de persistencia, retorne projecoes de Records diretamente nos repositorios Spring Data JPA para consultas somente-leitura, evitando o overhead de gerenciamento de estado (dirty checking) do PersistenceContext.",
        bullets: [
          "Ativando Virtual Threads no Spring Boot 3.2+: Basta configurar spring.threads.virtual.enabled=true; o Tomcat/Jetty passa a despachar cada requisicao HTTP em uma Virtual Thread dedicada e o @Async utiliza SimpleAsyncTaskExecutor em modo virtual.",
          "RestClient Fluente (Substituto moderno do RestTemplate): RestClient client = RestClient.builder().baseUrl('https://api.exemplo.com').build(); ClienteDto dto = client.get().uri('/clientes/{id}', id).retrieve().body(ClienteDto.class);",
          "Padrao RFC 7807 (ProblemDetails): Habilite spring.mvc.problemdetails.enabled=true e retorne ProblemDetail.forStatusAndDetail(HttpStatus.UNPROCESSABLE_ENTITY, 'Saldo insuficiente') em seu @RestControllerAdvice.",
          "Testes de Integracao com @ServiceConnection (Boot 3.1+): Anote o campo @Container @ServiceConnection static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>('postgres:16-alpine'); o Spring Boot configura url, username e password do DataSource automaticamente sem precisar de @DynamicPropertySource!"
        ],
        callout: {
          type: "tip",
          title: "Injecao de Dependencia: Construtor Unico sem @Autowired",
          text: "Desde o Spring Framework 4.3 (Spring Boot 1.4+), classes gerenciadas (@Service, @Component, @RestController) que possuem um unico construtor NAO precisam da anotacao @Autowired. Declare todos os campos de dependencia como private final e deixe o construtor limpo (ou use @RequiredArgsConstructor)."
        }
      },
      {
        heading: "Retrocompatibilidade e Guia de Migração: Spring Boot 2.x -> Spring Boot 3.x",
        body: "A migracao de uma aplicacao Spring Boot 2.x (ou 1.x) para o Spring Boot 3.x envolve quatro frentes principais de compatibilidade que todo arquiteto precisa dominar. A estrategia oficial recomendada pela equipe do Spring e: primeiro atualize a aplicacao para o Spring Boot 2.7 (ultima versao da linha 2.x), resolva todos os metodos depreciados, atualize o runtime para Java 17 ou Java 21, e entao aplique a migracao para o Spring Boot 3.x (podendo automatizar 80% do trabalho com o plugin OpenRewrite).",
        bullets: [
          "1. Mudanca de Namespace javax.* -> jakarta.* (Jakarta EE 10): Substitua os imports de javax.persistence.*, javax.servlet.*, javax.validation.*, javax.annotation.* e javax.transaction.* pelos equivalentes jakarta.*. Atencao: pacotes que pertencem ao proprio JDK (como javax.sql.DataSource, javax.crypto.* e javax.naming.*) CONTINUAM sendo javax.*!",
          "2. Novo Registro de AutoConfiguration: Bibliotecas internas da empresa que registravam autoconfiguracoes em META-INF/spring.factories sob a chave EnableAutoConfiguration devem migrar para o novo arquivo META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports (uma classe por linha).",
          "3. Spring Security 6.0 (Fim do WebSecurityConfigurerAdapter): A classe base WebSecurityConfigurerAdapter foi removida; agora configura-se a seguranca declarando um @Bean public SecurityFilterChain filterChain(HttpSecurity http) com a DSL de Lambdas (http.authorizeHttpRequests(auth -> auth.requestMatchers('/public/**').permitAll().anyRequest().authenticated())).",
          "4. Mudanca de Roteamento Trailing Slash no Spring MVC 6: Ate o Spring Boot 2.x, uma rota @GetMapping('/clientes') respondia automaticamente tambem a '/clientes/' (com barra no final). No Spring Boot 3.0+, a correspondencia de barra final foi desativada por padrao por seguranca e clareza REST.",
          "5. Hibernate 6.x e Sequencias JPA: O Hibernate 6 (embutido no Spring Boot 3) mudou a estrategia padrao de geracao de IDs em bancos como PostgreSQL/Oracle para usar sequencias por tabela (<tabela>_seq com incrementSize=50); para manter compatibilidade com esquemas legados, verifique @SequenceGenerator(allocationSize = 1) ou GenerationType.IDENTITY."
        ],
        callout: {
          type: "warning",
          title: "Automatizando a Migracao 2.x -> 3.x com OpenRewrite",
          text: "Em vez de substituir centenas de imports javax.* manualmente, execute mvn -U org.openrewrite.maven:rewrite-maven-plugin:run -Drewrite.recipeArtifactCoordinates=org.openrewrite.recipe:rewrite-spring:LATEST -Drewrite.activeRecipes=org.openrewrite.java.spring.boot3.UpgradeSpringBoot_3_3 para migrar pom.xml, classes Java e configuracoes de seguranca automaticamente."
        }
      }
    ]
  },
  {
    id: "jv-cap-11",
    number: 11,
    part: "Frameworks Enterprise & Cloud-Native",
    partColor: "rose",
    title: "Quarkus (1.x a 3.x): Arquitetura Build-Time, Mutiny, Dev Services & GraalVM Native",
    subtitle: "Supersonic Subatomic Java: evolução do Quarkus 1.0 ao 3.15 LTS, CDI ArC em tempo de compilação, Panache e @RunOnVirtualThread",
    readingTime: "19 min",
    keyConcepts: [
      "Build-Time Augmentation (Tempo de Compilacao)",
      "ArC CDI (Zero Reflexao em Runtime)",
      "Motor Unificado Vert.x / Netty & Mutiny (Uni/Multi)",
      "Hibernate ORM with Panache & Dev Services",
      "Quarkus 3.x (@RunOnVirtualThread & GraalVM Native)"
    ],
    teacherIntro:
      "Criado pela Red Hat em 2019 com o lema 'Supersonic Subatomic Java', o Quarkus repensou fundamentalmente como um framework Java funciona: em vez de fazer escaneamento de classpath, leitura de XML/anotacoes e criacao de proxies dinamicos no momento em que o servidor liga (Runtime), o Quarkus executa todo esse trabalho pesado em tempo de compilacao (Build-Time), resultando em inicializacao instantanea e consumo minimo de RAM tanto na JVM quanto em GraalVM Native.",
    keyTakeaways: [
      "O principio arquitetural central do Quarkus e o Build-Time Augmentation: durante o mvn package, os BuildSteps das extensoes analisam o bytecode com o indexador Jandex e geram o bytecode final de inicializacao direto no JAR.",
      "O container de injecao de dependencia do Quarkus (ArC, baseado no Jakarta CDI) resolve todas as dependencias em tempo de compilacao: se faltar um bean @Inject, o erro ocorre na compilacao, e nao em producao!",
      "Sob o capo, o Quarkus 2.x e 3.x utiliza um unico motor de I/O nao-bloqueante baseado em Eclipse Vert.x e Netty, capaz de despachar requisicoes automaticamente para o Event Loop (reativo), Worker Pool (imperativo) ou Virtual Threads (@RunOnVirtualThread).",
      "O Hibernate ORM with Panache simplifica radicalmente a persistencia JPA oferecendo tanto o padrao Active Record (Cliente.findById(1L), cliente.persist()) quanto o padrao Repository tradicional (PanacheRepository<Cliente>).",
      "No modo de desenvolvimento (quarkus dev), o Live Coding recarrega alteracoes em milissegundos e o Dev Services sobe containers Docker automaticamente (PostgreSQL, Kafka, Redis, Keycloak) quando nenhuma URL de conexao e configurada."
    ],
    sections: [
      {
        heading: "Histórico Completo de Versões e Implementações: Do Quarkus 1.0 ao 3.15 LTS+",
        body: "A evolucao do Quarkus reflete a maturidade do Java Cloud-Native para Kubernetes e Serverless (AWS Lambda / Knative). Na serie Quarkus 1.0 a 1.13 (novembro de 2019 a 2021, suporte a Java 8 e 11), o framework provou que era possivel reduzir o consumo de RAM de um microsservico REST + CRUD de ~300 MB para ~75 MB na JVM (e ~28 MB em binario nativo GraalVM com startup em 15 ms), introduzindo o container CDI ArC, Hibernate with Panache, integracao com Eclipse MicroProfile (Config, Fault Tolerance, Health, OpenAPI) e indexacao rapida de anotacoes com Jandex. Na serie Quarkus 2.0 a 2.16 (2021 a inicio de 2023, baseline Java 11/17), ocorreu a unificacao do motor HTTP sobre o Vert.x com o novo RESTEasy Reactive (capaz de decidir em tempo de compilacao se um metodo REST pode rodar diretamente na IO Thread do Netty sem context switch!), a chegada dos Dev Services (provisionamento zero-config via Testcontainers), Continuous Testing em background e a consolidacao da biblioteca reativa Mutiny (Uni<T> e Multi<T>). Na serie Quarkus 3.0 a 3.15 LTS+ (2023-2025, baseline Java 17 e 21), o Quarkus migrou para Jakarta EE 10 (jakarta.*) e Hibernate ORM 6, introduziu a Dev UI 2.0, suporte de primeira classe a Virtual Threads do Java 21 (@RunOnVirtualThread), renomeou a extensao web principal para quarkus-rest (no Quarkus 3.8 LTS / 3.9+) e lancou o Quarkus LangChain4j para construir agentes de IA declarativos processados em tempo de build.",
        bullets: [
          "Quarkus 1.x (2019-2021): Arquitetura Build-Time, ArC CDI sem reflexao, Hibernate with Panache, indexador Jandex e compilacao nativa simplificada (-Dnative).",
          "Quarkus 2.x (2021-2023): Baseline Java 11, RESTEasy Reactive sobre Vert.x, Mutiny (Uni/Multi), Dev Services automaticos com Docker/Testcontainers e Continuous Testing.",
          "Quarkus 3.0 e 3.2 LTS (2023): Baseline Java 17, migracao completa para Jakarta EE 10 (jakarta.*), Hibernate 6, MicroProfile 6 e CLI de atualizacao automatica 'quarkus update'.",
          "Quarkus 3.8 LTS e 3.15 LTS+ (2024-2025): Consolidacao do quarkus-rest (e quarkus-rest-jackson), suporte pleno ao Java 21 LTS com @RunOnVirtualThread em REST/Messaging/gRPC e ecossistema Quarkus LangChain4j."
        ],
        callout: {
          type: "info",
          title: "Por que o Quarkus e Muito Mais Rapido Mesmo Rodando na JVM Normal (Sem GraalVM)?",
          text: "Um mito comum e achar que o Quarkus so traz ganho se compilado para binario nativo GraalVM. Na verdade, mesmo rodando na JVM HotSpot padrao (modo JVM fast-jar), o Quarkus inicia de 3x a 5x mais rapido e consome metade da memoria de frameworks tradicionais porque todas as classes de metadados, parsers e arvores de injecao CDI ja foram pré-computadas no build e sao descartadas da memoria de runtime!"
        }
      },
      {
        heading: "Como Utilizar na Prática: quarkus-rest, Panache, Mutiny, @RunOnVirtualThread e Build Nativo",
        body: "No Quarkus 3.8+, utilize a extensao io.quarkus:quarkus-rest-jackson para criar endpoints Jakarta REST (@Path, @GET, @POST). O motor do Quarkus analisa a assinatura do seu metodo em tempo de compilacao: se o metodo retornar um tipo sincrono comum (ex: List<Produto> ou Response) e nao tiver anotacao de bloqueio explicita, ou se usar persistencia bloqueante, ele gerencia o despacho adequadamente; melhor ainda, rodando sobre Java 21+, basta anotar o metodo ou a classe com @RunOnVirtualThread (de io.smallrye.common.annotation.RunOnVirtualThread) para que cada requisicao execute em uma Virtual Thread leve sem bloquear o Event Loop do Netty! Para fluxos puramente assincronos ou streaming de eventos (Server-Sent Events / Kafka), retorne Uni<T> (0 ou 1 item assincrono) ou Multi<T> (fluxo de N itens com backpressure) da biblioteca Mutiny.",
        bullets: [
          "Endpoint REST com Virtual Threads no Quarkus 3 + Java 21: @Path('/pedidos') public class PedidoResource { @POST @Transactional @RunOnVirtualThread public Pedido criar(NovoPedidoRecord dto) { ... } }.",
          "Hibernate with Panache (Active Record vs Repository): Estenda PanacheEntity na entidade para ganhar metodos estaticos diretos (Pedido.list('status', Status.PAGO)) ou implemente PanacheRepository<Pedido> caso prefira separar a camada de repositorio.",
          "Mutiny Expressivo e Legivel: Ao contrario de operadores cripticos de outras bibliotecas reativas, o Mutiny usa semantica fluente: uni.onItem().transform(x -> ...).onFailure().retry().atMost(3).",
          "Compilacao Nativa sem Instalar GraalVM Localmente: Execute ./mvnw package -Dnative -Dquarkus.native.container-build=true para compilar o binario Linux nativo usando uma imagem Docker oficial do Mandrel/GraalVM!"
        ],
        callout: {
          type: "tip",
          title: "Produtividade Extrema com Dev Services e Continuous Testing",
          text: "Ao rodar ./mvnw quarkus:dev sem configurar quarkus.datasource.jdbc.url, o Quarkus detecta a extensao quarkus-jdbc-postgresql, sobe automaticamente um container PostgreSQL via Docker, aplica as migracoes Flyway/Liquibase e, ao pressionar 'r' no terminal, executa apenas os testes unitarios afetados pela ultima linha de codigo salva!"
        }
      },
      {
        heading: "Retrocompatibilidade: Migração Quarkus 2.x -> 3.x e Regras da GraalVM (Closed-World)",
        body: "Existem duas dimensoes de compatibilidade ao trabalhar com Quarkus: a migracao de versoes do framework (especialmente do Quarkus 2.x para o Quarkus 3.x) e as restricoes de compatibilidade de bibliotecas Java tradicionais quando compiladas para binario nativo GraalVM. Na migracao do Quarkus 2.x para 3.x, a mudanca central foi a transicao do pacote javax.* para jakarta.* (Jakarta EE 10) e a atualizacao do Hibernate ORM 5 para 6. Para tornar essa transicao indolor, a equipe do Quarkus integrou receitas do OpenRewrite diretamente na CLI oficial: executar quarkus update (ou mvn io.quarkus.platform:quarkus-maven-plugin:update) atualiza o BOM, renomeia os pacotes javax.* para jakarta.* e ajusta as extensoes automaticamente. Na serie 3.8+, as extensoes quarkus-resteasy-reactive foram renomeadas para quarkus-rest, mantendo os artefatos antigos como relocacoes compativeis para nao quebrar builds existentes.",
        bullets: [
          "Closed-World Assumption na GraalVM Native Image: O compilador nativo (native-image) analisa estaticamente todo o codigo alcancavel a partir do main() em tempo de build e elimina tudo o que parece nao ser chamado. Por isso, chamadas de Reflection dinamica (Class.forName(nomeDinamico)) falham em modo nativo se nao forem declaradas previamente!",
          "Como Resolver Reflexao em Modo Nativo com @RegisterForReflection: No Quarkus, basta anotar classes de terceiros ou DTOs acessados reflexivamente com @RegisterForReflection (ou @RegisterForReflection(targets = {ClasseExterna.class})) para que o Quarkus gere automaticamente a configuracao para a GraalVM.",
          "Substituicao de Bibliotecas Incompativeis por Extensoes Quarkus: Sempre prefira a extensao oficial quarkus-* (ex: quarkus-jackson, quarkus-hibernate-orm, quarkus-rest-client) em vez de adicionar a biblioteca crua do Maven, pois a extensao Quarkus ja contem os BuildSteps que registram todos os metadados nativos e substituicoes de bytecode necessarios.",
          "Inicializacao de Classes em Build-Time vs Runtime: Classes que abrem conexoes de rede, criam threads ou leem variaveis de ambiente dentro de blocos estaticos (static { ... }) durante a compilacao nativa precisam ser marcadas para inicializacao em runtime (--initialize-at-run-time)."
        ],
        callout: {
          type: "warning",
          title: "Teste seu Binario Nativo com @QuarkusIntegrationTest",
          text: "Enquanto @QuarkusTest roda dentro da JVM com suporte a @Inject, a anotacao @QuarkusIntegrationTest (antiga @NativeImageTest) executa os testes HTTP de caixa-preta diretamente contra o executavel binario nativo compilado ou imagem de container final, garantindo que nenhuma classe faltou na reflexao da GraalVM!"
        }
      }
    ]
  },
  {
    id: "jv-cap-12",
    number: 12,
    part: "Frameworks Enterprise & Cloud-Native",
    partColor: "rose",
    title: "Jakarta EE (J2EE a 11), Micronaut (1.x a 4.x) & GraalVM / Project Leyden",
    subtitle: "A evolução da especificação Enterprise, DI em tempo de compilação no Micronaut, CRaC e comparativo arquitetural",
    readingTime: "18 min",
    keyConcepts: [
      "Evolucao J2EE -> Java EE -> Jakarta EE 8/9/10/11",
      "Micronaut 1.x a 4.x (Compile-Time DI via JSR-269)",
      "JIT (HotSpot C2) vs AOT (GraalVM Native Image)",
      "CRaC (Coordinated Restore at Checkpoint) & Project Leyden",
      "Matriz de Decisao Arquitetural Enterprise"
    ],
    teacherIntro:
      "Nenhuma visao do Java moderno estaria completa sem compreender como as especificacoes padronizadas evoluiram do antigo J2EE ao moderno Jakarta EE 10/11 sob a Eclipse Foundation, como o Micronaut foi pioneiro na injecao de dependencia em tempo de compilacao com Annotation Processors, e como escolher tecnicamente entre JVM HotSpot JIT, GraalVM Native Image e CRaC/Project Leyden.",
    keyTakeaways: [
      "As especificacoes Jakarta EE (Servlet, REST/JAX-RS, Persistence/JPA, Validation, CDI, Transactions) sao a lingua franca do ecossistema Java: tanto Spring Boot quanto Quarkus, Micronaut, Helidon e WildFly apoiam-se diretamente nelas.",
      "O Jakarta EE 9 (2020) realizou a migracao de namespace javax.* -> jakarta.*, o Jakarta EE 10 (2022) introduziu o Core Profile e o CDI Lite voltado a compilacao AOT, e o Jakarta EE 11 (2024/2025) adota Java 21, Virtual Threads e a especificacao Jakarta Data.",
      "O Micronaut (1.x a 4.x) processa @Inject, @Controller e proxies AOP diretamente durante a compilacao javac (via JSR-269 Annotation Processing), garantindo tempo de startup O(1) independente do numero de classes sem precisar de plugins especiais de empacotamento.",
      "Nao existe bala de prata entre JVM JIT (HotSpot C2) e AOT (GraalVM Native Image): a GraalVM vence em tempo de boot (milissegundos) e memoria inicial (ideal para Serverless/CLI), enquanto a JVM HotSpot JIT vence em throughput maximo sustentado e menor latencia de cauda com Generational ZGC.",
      "O CRaC (Coordinated Restore at Checkpoint) e o Project Leyden (Java 24/25+) oferecem o melhor dos dois mundos: aquecem a aplicacao na JVM HotSpot e salvam um snapshot ou cache AOT para restaurar em milissegundos mantendo toda a otimizacao JIT!"
    ],
    sections: [
      {
        heading: "Histórico Completo de Versões: Do J2EE 1.2 ao Jakarta EE 11 e Micronaut 1.x a 4.x",
        body: "A historia do Java corporativo divide-se em quatro grandes eras. Na primeira era, o J2EE 1.2 a 1.4 (1999-2003) exigia servidores de aplicacao monoliticos e EJB 2.x com multiplas interfaces e descritores XML gigantescos. A segunda era comecou no Java EE 5 (2006) ao Java EE 8 (2017): inspirada pelo sucesso do Spring e do Hibernate, a especificacao adotou anotacoes (@Stateless, @Entity), criou a JPA (Java Persistence API), o JAX-RS para APIs REST (@Path, @GET), o CDI (Contexts and Dependency Injection no Java EE 6) e o Bean Validation (@NotNull, @Size). A terceira era iniciou em 2017-2019 quando a Oracle transferiu o Java EE para a Eclipse Foundation sob o nome Jakarta EE: o Jakarta EE 8 (2019) manteve compatibilidade binaria total com javax.*, e o Jakarta EE 9 (2020) executou a mudanca do namespace para jakarta.*. Na quarta era (Cloud-Native), o Jakarta EE 10 (2022, Java 17) introduziu o Jakarta EE Core Profile e o CDI Lite com BuildCompatibleExtension (permitindo que Quarkus e Micronaut implementem CDI padrao em tempo de compilacao), enquanto o Jakarta EE 11 (2024-2025, Java 21) integra Virtual Threads nativamente e lanca o Jakarta Data (repositorios declarativos padronizados semelhantes ao Spring Data). Paralelamente, o Micronaut evoluiu da versao 1.0 (2018, pioneiro em Compile-Time DI via JSR-269) passando pelo Micronaut 2 e 3 ate o Micronaut 4.x (2023-2025, baseline Java 17/21, Jakarta EE, Micronaut Serialization sem reflexao e Virtual Threads).",
        bullets: [
          "J2EE 1.2 a 1.4 (1999-2003): Servlets, JSP, JMS, JTA e EJB 2.x pesado baseado em RMI/IIOP e XML.",
          "Java EE 5 a 8 (2006-2017): Anotacoes Java 5, JPA 1.0/2.x, JAX-RS 1.0/2.1, CDI 1.0/2.0, Bean Validation e JSON-B/JSON-P sob o pacote javax.*.",
          "Jakarta EE 8, 9 e 9.1 (2019-2021): Transicao para a governanca aberta da Eclipse Foundation e mudanca de pacote javax.* -> jakarta.*.",
          "Jakarta EE 10 e 11 (2022-2025): Core Profile para microsservicos, CDI Lite Build-Time, suporte nativo a Java 17/21 Virtual Threads e nova especificacao Jakarta Data (@Repository).",
          "Micronaut 1.x a 4.x (2018-2025): Injecao de dependencia, clientes HTTP declarativos (@Client) e serializacao JSON gerados 100% em tempo de compilacao via Annotation Processors."
        ],
        callout: {
          type: "info",
          title: "Por que a Oracle Exigiu a Mudanca de javax.* para jakarta.*?",
          text: "Quando a Oracle doou as especificacoes do Java EE para a Eclipse Foundation em 2017, manteve os direitos sobre a marca registrada 'Java' e exigiu contratualmente que novas evolucoes das especificacoes sob a Eclipse Foundation nao modificassem o namespace historico javax.*. Por isso, o Jakarta EE 9 mudou os pacotes para jakarta.*, libertando a especificacao para evoluir rapidamente no Jakarta EE 10 e 11!"
        }
      },
      {
        heading: "Como Utilizar e Escolher na Prática: Spring Boot 3 vs Quarkus 3 vs Micronaut 4 & JIT vs AOT",
        body: "Para arquitetos e tech leads, escolher a stack Java moderna depende do perfil de carga, da maturidade da equipe e da infraestrutura de execucao. O Spring Boot 3.4+ possui o maior ecossistema de integracoes prontas do mercado (Spring Cloud, Spring Security, Spring Batch, Spring AI) e, combinado com Java 21 Virtual Threads e AppCDS, atende com excelencia 90% dos sistemas corporativos. O Quarkus 3.15+ brilha em ambientes Kubernetes de alta densidade, arquiteturas orientadas a eventos (Kafka/Mutiny), Serverless (AWS Lambda / Knative) e quando a experiencia de desenvolvimento (Live Reload + Dev Services) e a eficiencia de memoria em tempo de build sao prioridades. O Micronaut 4.x destaca-se quando se deseja injecao de dependencia e AOP puramente no compilador padrao (javac/kotlinc) sem depender de classloaders customizados, sendo muito popular tambem para bibliotecas compartilhadas e AWS Lambda.",
        bullets: [
          "Quando escolher JVM HotSpot (JIT C2 + Generational ZGC): Servicos que rodam continuamente 24x7 (containers long-lived). Apos o aquecimento (warmup), o compilador JIT C2 aplica otimizacoes dinamicas especulativas e inlining baseados no trafego real que superam o binario AOT em throughput de CPU de pico em 15% a 30%, alem de contar com o Generational ZGC.",
          "Quando escolher GraalVM Native Image (AOT): Funcoes Serverless que escalam a zero (AWS Lambda, Google Cloud Run), ferramentas de linha de comando (CLI) ou microsservicos leves com restricao severa de RAM (< 64 MB) que precisam responder à primeira requisicao em 20 milissegundos.",
          "Quando escolher CRaC ou Project Leyden (AOT Cache + AppCDS): Aplicacoes Spring Boot 3.2+ ou Quarkus que precisam de startup ultra-rapido (< 100 ms) em auto-scaling Kubernetes MAS nao querem abrir mao do throughput maximo do JIT C2 nem enfrentar as restricoes de reflexao da GraalVM."
        ],
        callout: {
          type: "tip",
          title: "Ganhos Imediatos Sem Mudar para GraalVM: AppCDS no Java 21+ e Spring Boot 3.3+",
          text: "No Java 21+ com Spring Boot 3.3+, voce pode extrair o JAR com java -Djarmode=tools -jar app.jar extract --destination application e gerar um arquivo de cache AppCDS (-XX:ArchiveClassesAtExit=application.jsa). Isso reduz o tempo de boot da JVM padrao em ate 40% e economiza RAM com zero restricao de reflexao!"
        }
      },
      {
        heading: "Retrocompatibilidade no Ecossistema Enterprise: Proxies, Bytecode Enhancement e Bibliotecas Legadas",
        body: "Na evolucao dos frameworks enterprise, o ponto mais sensivel de compatibilidade envolve como cada tecnologia implementa Cross-Cutting Concerns (como @Transactional, @Cacheable, @Secured e Lazy Loading de entidades JPA). Frameworks tradicionais de runtime (Spring classico e servidores Jakarta EE) criam Dynamic Proxies em tempo de execucao (via JDK Dynamic Proxy ou subclasses ByteBuddy/CGLIB). Ja arquiteturas Build-Time (Quarkus, Micronaut e o modo AOT do Spring Boot 3) geram as classes de interceptacao antecipadamente durante o build. Compreender essa diferenca evita armadilhas sutis de retrocompatibilidade ao migrar sistemas ou atualizar o JDK.",
        bullets: [
          "Self-Invocation em Proxies (@Transactional): Tanto no Spring quanto no CDI/Quarkus, chamar um metodo anotado com @Transactional de dentro da PROPRIA classe (this.outroMetodoTransacional()) ignora o proxy e NAO abre nova transacao! Extraia para outro bean injetado ou use AspectJ/Bytecode Enhancement.",
          "Bytecode Enhancement no Hibernate 6: Em vez de depender apenas de proxies em tempo de execucao, ativar o plugin de build-time bytecode enhancement do Hibernate permite lazy loading de atributos basicos, dirty-checking instantaneo por bitmask (sem comparar arrays de objetos) e menor uso de memoria.",
          "Interoperabilidade de Artefatos javax.* Legados em Aplicacoes jakarta.*: Se o seu projeto Spring Boot 3 ou Quarkus 3 precisar obrigatoriamente consumir uma biblioteca antiga de terceiros cujo JAR ainda referencia javax.servlet ou javax.persistence, utilize o plugin Maven/Gradle do Eclipse Transformer (org.eclipse.transformer) no build para reescrever o bytecode do JAR legado para jakarta.* automaticamente!",
          "Compatibilidade Futura rumo ao Java 25 LTS: Mantenha sempre as versoes de ByteBuddy, Hibernate, Jackson e drivers JDBC atualizadas nas releases mais recentes do BOM do Spring Boot 3.4+ ou Quarkus 3.15+, garantindo uso nativo da nova Class-File API (JEP 484) e ausencia de Thread Pinning em Virtual Threads."
        ],
        callout: {
          type: "warning",
          title: "Checklist de Ouro para Arquiteturas Java Modernas em Producao",
          text: "1) Use sempre uma versao LTS moderna (Java 21 ou Java 25); 2) Configure limites de memoria coerentes com o container (-XX:MaxRAMPercentage=75.0); 3) Prefira ZGC Generacional (-XX:+UseZGC -XX:+ZGenerational) para baixa latencia ou G1GC para uso geral; 4) Ative Virtual Threads para cargas I/O-bound; 5) Monitore continuamente com JDK Flight Recorder (JFR) e Micrometer."
        }
      }
    ]
  }
];
