/**
 * Exemplos Práticos de Código e Comparações Históricas de Retrocompatibilidade
 * para o livro "Java: Guia Completo de Versões, JVM & Ecossistema".
 */

export { javaAnimations } from "./java-animations.js";
export { javaLabs } from "./java-labs.js";

export const javaExamples = {
  "jv-cap-1": [
    {
      id: "jv-ex-1-1",
      title: "Java 1.0/1.1 vs. Java 1.2/1.4: Vector/Hashtable vs. Collections & NIO",
      context: "Gerenciamento de coleções e I/O de rede com alta performance na evolução inicial da JVM.",
      dirtyLabel: "Antes (JDK 1.0/1.1): Vector sincronizado e java.io.InputStream bloqueante",
      dirtyCode: `import java.util.Vector;
import java.io.FileInputStream;
import java.io.IOException;

// Vector sincroniza todas as operacoes por padrao (overhead desnecessario)
public class ProcessadorLegado {
  private Vector dados = new Vector(); // Raw type sem generics

  public void carregar(String caminho) throws IOException {
    FileInputStream in = new FileInputStream(caminho);
    int b;
    while ((b = in.read()) != -1) { // Le byte a byte bloqueando a thread
      dados.addElement(new Integer(b));
    }
    in.close();
  }
}`,
      cleanLabel: "Depois (Java 1.4): Collections Framework desacoplado e Java NIO Channels",
      cleanCode: `import java.util.ArrayList;
import java.util.List;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.io.FileInputStream;
import java.io.IOException;

public class ProcessadorNIO {
  // ArrayList rapido sem sync desnecessario e NIO direto em buffer
  private List<Integer> dados = new ArrayList<>();

  public void carregar(String caminho) throws IOException {
    try (FileInputStream fis = new FileInputStream(caminho);
         FileChannel channel = fis.getChannel()) {
      ByteBuffer buffer = ByteBuffer.allocateDirect(8192);
      while (channel.read(buffer) > 0) {
        buffer.flip();
        while (buffer.hasRemaining()) {
          dados.add((int) buffer.get());
        }
        buffer.clear();
      }
    }
  }
}`,
      refactoringNotes: [
        "Collections Framework (Java 1.2) separou contratos (List, Map) das implementações (ArrayList, HashMap).",
        "Vector e Hashtable foram retrofittados para implementar List e Map, garantindo compatibilidade retroativa total.",
        "Java NIO (1.4) introduziu canais de alta velocidade e buffers diretos off-heap integrados ao SO."
      ]
    }
  ],

  "jv-cap-2": [
    {
      id: "jv-ex-2-1",
      title: "Java 1.4 vs. Java 5: Raw Types vs. Generics Tipados & java.util.concurrent",
      context: "Eliminação de ClassCastException em runtime e substituição de sincronização manual com wait/notify.",
      dirtyLabel: "Antes (Java 1.4): Coleções com Object, casts manuais e synchronized manual",
      dirtyCode: `import java.util.HashMap;
import java.util.Map;

public class CacheLegado {
  private Map cache = new HashMap();

  public synchronized void salvar(Object chave, Object valor) {
    cache.put(chave, valor);
  }

  public synchronized String obter(Object chave) {
    // Cast arriscado: falha apenas em tempo de execucao (ClassCastException)
    return (String) cache.get(chave);
  }
}`,
      cleanLabel: "Depois (Java 5): Generics com Type Erasure e ConcurrentHashMap atômico",
      cleanCode: `import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class CacheGenerico<K, V> {
  // ConcurrentHashMap particiona a concorrencia em buckets (locks parciais)
  private final ConcurrentMap<K, V> cache = new ConcurrentHashMap<>();

  public void salvar(K chave, V valor) {
    cache.put(chave, valor);
  }

  public V obterOuCalcular(K chave, java.util.function.Function<K, V> loader) {
    // Totalmente tipado sem casts manuais e seguro contra condicoes de corrida
    return cache.computeIfAbsent(chave, loader);
  }
}`,
      refactoringNotes: [
        "Generics adotou Type Erasure: no bytecode compilado, List<String> vira List com casts automáticos sintetizados.",
        "Bridge Methods foram gerados automaticamente pelo javac para manter herança polimórfica com bibliotecas legadas.",
        "java.util.concurrent (Doug Lea) e o novo JMM (JSR-133) redefiniram semântica de volatile com relações happens-before."
      ]
    }
  ],

  "jv-cap-3": [
    {
      id: "jv-ex-3-1",
      title: "Java 6 vs. Java 7: Fechamento Manual Frágil vs. try-with-resources & NIO.2",
      context: "Garantia de fechamento determinístico de recursos JDBC e sistema de arquivos moderno.",
      dirtyLabel: "Antes (Java 6): try-finally verboso com mascaramento de exceções originais",
      dirtyCode: `import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class RepositorioLegado {
  public String buscarNome(Connection conn, long id) throws SQLException {
    PreparedStatement ps = null;
    ResultSet rs = null;
    try {
      ps = conn.prepareStatement("SELECT nome FROM usuarios WHERE id = ?");
      ps.setLong(1, id);
      rs = ps.executeQuery();
      if (rs.next()) return rs.getString("nome");
      return null;
    } finally {
      // Se rs.close() falhar, ps.close() nunca e executado (leak de recursos!)
      if (rs != null) rs.close();
      if (ps != null) ps.close();
    }
  }
}`,
      cleanLabel: "Depois (Java 7): try-with-resources com AutoCloseable e exceções suprimidas",
      cleanCode: `import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.nio.file.Files;
import java.nio.file.Path;

public class RepositorioModerno {
  public String buscarNome(Connection conn, long id) throws SQLException {
    String sql = "SELECT nome FROM usuarios WHERE id = ?";
    // Fechamento automatico na ordem inversa; excecoes secundarias viram getSuppressed()
    try (PreparedStatement ps = conn.prepareStatement(sql);
         ResultSet rs = ps.executeQuery()) {
      ps.setLong(1, id);
      if (rs.next()) return rs.getString("nome");
      return null;
    }
  }

  public long contarLinhas(Path path) throws java.io.IOException {
    // NIO.2 Path e Files operam de forma nativa e eficiente
    return Files.lines(path).count();
  }
}`,
      refactoringNotes: [
        "try-with-resources do Project Coin exige a interface AutoCloseable.",
        "A interface Closeable do Java 5 foi alterada para estender AutoCloseable, preservando 100% de compatibilidade.",
        "java.io.File ganhou o método toPath() como ponte de migração indolor para a API NIO.2."
      ]
    }
  ],

  "jv-cap-4": [
    {
      id: "jv-ex-4-1",
      title: "Java 7 vs. Java 8 (LTS): Loops Imperativos vs. Lambdas, Streams & java.time",
      context: "Filtragem, mapeamento e agregação declarativa com segurança funcional e datas imutáveis.",
      dirtyLabel: "Antes (Java 7): Loop imperativo com acumuladores mutáveis e java.util.Date mutável",
      dirtyCode: `import java.util.*;

public class ProcessadorPedidosLegado {
  public List<String> clientesComPedidosCaros(List<Pedido> pedidos, double limite) {
    List<String> resultado = new ArrayList<String>();
    for (Pedido p : pedidos) {
      if (p.getValor() > limite) {
        resultado.add(p.getCliente().getNome().toUpperCase());
      }
    }
    Collections.sort(resultado);
    return resultado;
  }
}`,
      cleanLabel: "Depois (Java 8): Pipeline declarativo de Stream e java.time imutável",
      cleanCode: `import java.util.List;
import java.util.stream.Collectors;
import java.time.LocalDate;

public class ProcessadorPedidosModerno {
  public List<String> clientesComPedidosCaros(List<Pedido> pedidos, double limite) {
    return pedidos.stream()
      .filter(p -> p.getValor() > limite)
      .map(p -> p.getCliente().getNome().toUpperCase())
      .sorted()
      .collect(Collectors.toList());
  }

  public boolean pedidoExpirado(LocalDate dataCriacao, int diasValidade) {
    // JSR-310: imutavel, thread-safe e sem problemas de fuso horario silenciosos
    return LocalDate.now().isAfter(dataCriacao.plusDays(diasValidade));
  }
}`,
      refactoringNotes: [
        "Default Methods em interfaces permitiram injetar .stream() e .forEach() em Collection sem quebrar o ecossistema existente.",
        "As Lambdas não geram classes anônimas .class extras no disco: são geradas dinamicamente via LambdaMetafactory e invokedynamic.",
        "java.time (JSR-310) substituiu os problemáticos e mutáveis java.util.Date e Calendar."
      ]
    }
  ],

  "jv-cap-5": [
    {
      id: "jv-ex-5-1",
      title: "Java 8 vs. Java 9 & 10: Classpath Monolítico vs. JPMS (Jigsaw) & var",
      context: "Modularização com encapsulamento forte, coleções imutáveis e inferência de tipos locais.",
      dirtyLabel: "Antes (Java 8): Classpath aberto sem barreiras e criação verbosa de coleções",
      dirtyCode: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ConfiguracaoLegada {
  public List<String> obterServidores() {
    List<String> servidores = new ArrayList<String>();
    servidores.add("srv-1.dc.net");
    servidores.add("srv-2.dc.net");
    return Collections.unmodifiableList(servidores); // Verboso e cria wrappers
  }
}`,
      cleanLabel: "Depois (Java 9 & 10): module-info.java, List.of() e inferência local com var",
      cleanCode: `import java.util.List;
import java.util.Map;

public class ConfiguracaoModular {
  public List<String> obterServidores() {
    // Factory method (Java 9): cria colecao imutavel compacta com zero overhead
    return List.of("srv-1.dc.net", "srv-2.dc.net");
  }

  public void processarDados() {
    // Inferencia de tipo local com var (Java 10) reduzindo boilerplate
    var metricas = Map.of("cpu", 45.2, "memoria", 78.5);
    for (var entry : metricas.entrySet()) {
      System.out.println(entry.getKey() + " -> " + entry.getValue());
    }
  }
}`,
      refactoringNotes: [
        "module-info.java define explicitamente o que o módulo 'requires' e o que ele 'exports'.",
        "O Classpath antigo continuou funcionando via Unnamed Module para manter compatibilidade transitória.",
        "Compact Strings no Java 9 substituiu char[] (UTF-16) por byte[] + codificador de 1 byte, reduzindo a heap em 15%."
      ]
    }
  ],

  "jv-cap-6": [
    {
      id: "jv-ex-6-1",
      title: "Java 8 vs. Java 11 (LTS): HttpURLConnection vs. java.net.http.HttpClient Reativo",
      context: "Comunicação HTTP/2 assíncrona nativa e execução de scripts .java sem etapa de compilação explícita.",
      dirtyLabel: "Antes (Java 8): HttpURLConnection arcaica e bloqueante com parsing manual",
      dirtyCode: `import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class ClienteHttpLegado {
  public String get(String urlStr) throws Exception {
    URL url = new URL(urlStr);
    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
    conn.setRequestMethod("GET");
    BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
    StringBuilder sb = new StringBuilder();
    String line;
    while ((line = reader.readLine()) != null) sb.append(line);
    reader.close();
    return sb.toString();
  }
}`,
      cleanLabel: "Depois (Java 11): java.net.http.HttpClient nativo moderno com HTTP/2 e CompletableFuture",
      cleanCode: `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.concurrent.CompletableFuture;

public class ClienteHttpModerno {
  private final HttpClient client = HttpClient.newBuilder()
    .version(HttpClient.Version.HTTP_2)
    .connectTimeout(Duration.ofSeconds(10))
    .build();

  public CompletableFuture<String> getAsync(String uri) {
    HttpRequest request = HttpRequest.newBuilder()
      .uri(URI.create(uri))
      .header("Accept", "application/json")
      .GET()
      .build();

    return client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
      .thenApply(HttpResponse::body);
  }
}`,
      refactoringNotes: [
        "O novo java.net.http.HttpClient substituiu bibliotecas externas pesadas como Apache HttpClient em casos padrão.",
        "Java 11 permitiu executar diretamente arquivos-fonte únicos no terminal: 'java Script.java'.",
        "Remoção dos módulos Java EE legados (JAXB, JAX-WS) exigiu importar os artefatos jakarta.xml.bind no Maven/Gradle."
      ]
    }
  ],

  "jv-cap-7": [
    {
      id: "jv-ex-7-1",
      title: "Java 11 vs. Java 17 (LTS): DTOs Boilerplate vs. Records, Sealed Classes & Text Blocks",
      context: "Modelagem de dados imutáveis (ADTs) e eliminação de centenas de linhas de código defensivo.",
      dirtyLabel: "Antes (Java 11): Classe POJO tradicional com 60 linhas de getters, equals e hashCode",
      dirtyCode: `public final class PontoCartesiano {
  private final double x;
  private final double y;

  public PontoCartesiano(double x, double y) {
    this.x = x;
    this.y = y;
  }

  public double getX() { return x; }
  public double getY() { return y; }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof PontoCartesiano)) return false;
    PontoCartesiano p = (PontoCartesiano) o;
    return Double.compare(p.x, x) == 0 && Double.compare(p.y, y) == 0;
  }

  @Override
  public int hashCode() {
    return java.util.Objects.hash(x, y);
  }
}`,
      cleanLabel: "Depois (Java 17): Record imutável com construtor compacto e Sealed Interface",
      cleanCode: `// Record gera construtor, getters x(), y(), equals, hashCode e toString em 1 linha
public record Ponto(double x, double y) {
  // Construtor compacto para validacao de invariantes
  public Ponto {
    if (Double.isNaN(x) || Double.isNaN(y)) {
      throw new IllegalArgumentException("Coordenadas nao podem ser NaN");
    }
  }
}

// Sealed interface fecha a hierarquia para garantia de exaustividade no compilador
public sealed interface Forma permits Circulo, Retangulo {}
public record Circulo(Ponto centro, double raio) implements Forma {}
public record Retangulo(Ponto canto, double largura, double altura) implements Forma {}`,
      refactoringNotes: [
        "Records são transparent carriers de dados imutáveis com serialização segura por padrão.",
        "Sealed Classes garantem exaustividade em tempo de compilação sem necessidade de cláusulas 'else' ou 'default'.",
        "Text Blocks (três aspas duplas) simplificam SQL, JSON e HTML sem escapar quebras de linha com barras invertidas."
      ]
    }
  ],

  "jv-cap-8": [
    {
      id: "jv-ex-8-1",
      title: "Java 17 vs. Java 21 (LTS): Threads de SO Pesadas vs. Virtual Threads (Project Loom)",
      context: "Escala massiva de I/O bloqueante (thread-per-request) sem reescrever código para reativo.",
      dirtyLabel: "Antes (Java 17): Pool fixo de threads de SO com risco de esgotamento e starvation",
      dirtyCode: `import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ServidorTradicional {
  // Pool limitado a 200 threads de SO (cada thread consome ~1 MB de RAM de stack)
  private final ExecutorService pool = Executors.newFixedThreadPool(200);

  public void tratarRequisicao(Runnable tarefaBloqueante) {
    pool.submit(() -> {
      // Se 200 chamadas ao banco demorarem 2 segundos, o servidor para de responder!
      tarefaBloqueante.run();
    });
  }
}`,
      cleanLabel: "Depois (Java 21): Virtual Threads leves (M:N) desacopladas de threads de SO",
      cleanCode: `import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ServidorVirtualThreads {
  // Cria uma nova Virtual Thread sob demanda (apenas alguns KB de memoria por thread)
  private final ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();

  public void tratarRequisicao(Runnable tarefaBloqueante) {
    executor.submit(() -> {
      // Quando a thread bloqueia em Socket ou JDBC, a JVM desocupa a Carrier Thread do SO
      tarefaBloqueante.run();
    });
  }
}`,
      refactoringNotes: [
        "Virtual Threads herdam de java.lang.Thread, mantendo 100% de compatibilidade com bibliotecas síncronas existentes.",
        "Não se deve fazer pool de Virtual Threads: cria-se uma nova sob demanda por tarefa.",
        "Cuidados com Thread Pinning em blocos synchronized antigos: substituir por ReentrantLock quando bloquear em I/O."
      ]
    }
  ],

  "jv-cap-9": [
    {
      id: "jv-ex-9-1",
      title: "Java 21 vs. Java 22-25 (LTS): JNI Inseguro vs. Foreign Function & Memory (Panama)",
      context: "Acesso direto a memória nativa off-heap e funções C/Rust sem pontes vulneráveis em código C.",
      dirtyLabel: "Antes (Java Legado): JNI com código C intermediário propenso a segfaults",
      dirtyCode: `// Exigia compilar arquivo C/C++ separado com gcc e carregar com System.loadLibrary
public class WrapperNativoLegado {
  static {
    System.loadLibrary("minhabib");
  }
  // Se houver ponteiro invalido em C, toda a JVM morre sem excecao tratavel
  public native void processarBufferNativo(long enderecoMemoria, int tamanho);
}`,
      cleanLabel: "Depois (Java 22+): Foreign Function & Memory API (FFM) com Arena e MemorySegment",
      cleanCode: `import java.lang.foreign.Arena;
import java.lang.foreign.MemorySegment;
import java.lang.foreign.ValueLayout;

public class AcessoNativoPanama {
  public void manipularMemoriaOffHeap() {
    // Arena garante desalocacao deterministica da memoria nativa ao fechar o try
    try (Arena arena = Arena.ofConfined()) {
      MemorySegment buffer = arena.allocate(1024);
      buffer.set(ValueLayout.JAVA_INT, 0, 42);
      buffer.set(ValueLayout.JAVA_INT, 4, 100);

      int valor = buffer.get(ValueLayout.JAVA_INT, 0);
      System.out.println("Valor lido da memoria off-heap nativa: " + valor);
    } // Memoria desalocada de forma thread-safe sem vazamentos
  }
}`,
      refactoringNotes: [
        "FFM API substitui o frágil JNI e o sun.misc.Unsafe por estruturas com segurança comprovada de tipos e tempo de vida.",
        "Acesso à memória fora da heap não afeta os tempos de pausa do Garbage Collector.",
        "Restrições no Java 24/25 exigem a flag --enable-native-access para auditar módulos que acessam código nativo."
      ]
    }
  ],

  "jv-cap-10": [
    {
      id: "jv-ex-10-1",
      title: "Spring Boot 2.x vs. Spring Boot 3.x: javax -> jakarta, AOT & Virtual Threads",
      context: "Migração da baseline Java 17/21, novo namespace Jakarta EE 10 e compilação nativa GraalVM.",
      dirtyLabel: "Antes (Spring Boot 2.x): Pacotes javax.* legados e configuração reativa complexa",
      dirtyCode: `// Namespace antigo obsoleto javax.persistence e javax.servlet
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@Entity
public class Usuario {
  @Id @GeneratedValue
  private Long id;
  private String nome;
  // getters e setters
}`,
      cleanLabel: "Depois (Spring Boot 3.4+): jakarta.*, Virtual Threads habilitadas e RestClient",
      cleanCode: `// Migracao para Jakarta EE 10 (jakarta.*) e suporte nativo a Java 21 Virtual Threads
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.client.RestClient;

@Entity
public class Usuario {
  @Id @GeneratedValue
  private Long id;
  private String nome;
}

// Em application.properties: spring.threads.virtual.enabled=true
// Habilita Tomcat a despachar requisicoes HTTP automaticamente em Virtual Threads!`,
      refactoringNotes: [
        "A quebra de javax.* para jakarta.* exigiu atualizar dependências e pacotes de import.",
        "Substituição de spring.factories pelo arquivo META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports.",
        "Suporte oficial a compilação AOT (Ahead-of-Time) gerando executáveis GraalVM Native com startup em milissegundos."
      ]
    }
  ],

  "jv-cap-11": [
    {
      id: "jv-ex-11-1",
      title: "Arquitetura Tradicional vs. Quarkus 3: Build-Time CDI, Panache & @RunOnVirtualThread",
      context: "Eliminação de reflexão em runtime, tempo de inicialização subssegundo e baixo consumo de RAM.",
      dirtyLabel: "Antes: Framework reflexivo tradicional com varredura pesada no startup",
      dirtyCode: `// Startup pesquisa classpath em runtime, gera proxies dinâmicos em CGLIB e aloca muita RAM
@Service
public class PedidoService {
  @Autowired
  private PedidoRepository repository;

  @Transactional
  public Pedido criar(Pedido pedido) {
    return repository.save(pedido);
  }
}`,
      cleanLabel: "Depois (Quarkus 3.15 LTS): ArC Build-Time CDI, Hibernate Panache e Virtual Threads",
      cleanCode: `import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.smallrye.common.annotation.RunOnVirtualThread;
import jakarta.persistence.Entity;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

@Entity
public class Pedido extends PanacheEntity {
  public String cliente;
  public double total;
}

@Path("/pedidos")
@Produces(MediaType.APPLICATION_JSON)
public class PedidoResource {
  @POST
  @Transactional
  @RunOnVirtualThread // Executa o endpoint diretamente em uma Virtual Thread do Java 21!
  public Pedido criar(Pedido p) {
    p.persist();
    return p;
  }
}`,
      refactoringNotes: [
        "Quarkus move toda a introspecção de anotações e criação de proxies para a etapa de compilação (Build-Time Augmentation).",
        "Hibernate with Panache simplifica entidades eliminando DAOs repetitivos com Active Record pattern.",
        "Startup nativo em ~0.02s com menos de 30 MB de RSS em produção Kubernetes."
      ]
    }
  ],

  "jv-cap-12": [
    {
      id: "jv-ex-12-1",
      title: "Evolução Corporativa: J2EE/Java EE Monolítico vs. Jakarta EE 11 & Micronaut AOT",
      context: "A consolidação do ecossistema Enterprise em padrões abertos e microsserviços modernos.",
      dirtyLabel: "Antes (J2EE 1.4 / Java EE 5): EJBs pesados com descritores XML verbosos",
      dirtyCode: `// Exigia descritores ejb-jar.xml complexos, interfaces remotas e servidores dedicados (WebLogic, JBoss)
public class CarrinhoEJB implements javax.ejb.SessionBean {
  public void ejbCreate() {}
  public void ejbActivate() {}
  public void ejbPassivate() {}
  public void ejbRemove() {}
  public void setSessionContext(javax.ejb.SessionContext ctx) {}
  public double calcularTotal(Long carrinhoId) { return 0.0; }
}`,
      cleanLabel: "Depois (Jakarta EE 10/11 & Micronaut): Injeção estática e Jakarta Data",
      cleanCode: `import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.data.repository.CrudRepository;
import jakarta.data.repository.Repository;

@Repository
public interface ClienteRepository extends CrudRepository<Cliente, Long> {
  // Jakarta Data: metodos de consulta gerados estaticamente em tempo de build
  List<Cliente> findByNomeContaining(String termo);
}

@ApplicationScoped
public class FaturamentoService {
  @Inject
  ClienteRepository clientes;

  public long contarAtivos() {
    return clientes.count();
  }
}`,
      refactoringNotes: [
        "A especificação Java EE foi doada pela Oracle para a Eclipse Foundation, renomeada para Jakarta EE.",
        "Jakarta EE 10 introduziu o Core Profile e CDI Lite, habilitando microsserviços ultra enxutos.",
        "Micronaut e Quarkus provaram que DI em tempo de compilação é superior para arquiteturas serverless e containers."
      ]
    }
  ]
};
