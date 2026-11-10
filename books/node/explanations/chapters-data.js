/**
 * Base de Dados Completa dos 12 Capítulos de "Node.js: Guia Completo de Versões, Event Loop & Frameworks".
 * Estruturada com: Intenção, Problema/Motivação, Solução, Participantes, Aplicabilidade, Prós/Contras,
 * Código Legado vs. Node Moderno vs. Java/Python e Animações.
 */

import { part1Chapters } from "./part1-core-eventloop.js";
import { part2Chapters } from "./part2-esm-concurrency.js";
import { part3Chapters } from "./part3-modern-runtime.js";
import { part4Chapters } from "./part4-frameworks.js";
import { nodeExamples } from "../examples/index.js";

const rawChapters = [
  ...part1Chapters,
  ...part2Chapters,
  ...part3Chapters,
  ...part4Chapters
];

const chapterMetaMap = {
  "nd-cap-1": {
    "code": "N01",
    "category": "core-eventloop",
    "partLabel": "Parte 1 • Arquitetura V8, libuv & Event Loop",
    "scope": "event-loop-libuv",
    "gofPage": 12,
    "playgroundId": "nd-event-loop-lab",
    "aliases": [
      "Node 0.1 a 0.12",
      "V8",
      "libuv",
      "Event Loop",
      "Error-First Callbacks",
      "Streams Backpressure"
    ],
    "relatedPatterns": [
      "nd-cap-2",
      "nd-cap-3"
    ],
    "realWorldUses": [
      "Processamento assíncrono de streaming de arquivos gigantescos com consumo fixo de memória RAM.",
      "Servidores de chat e WebSocket de altíssima concorrência com multiplexação de sockets no kernel.",
      "Construção de pipelines de dados em tempo real com controle automático de fluxo (backpressure)."
    ],
    "java": "// Equivalente em Java com InputStream e OutputStream\nimport java.io.*;\n\npublic class StreamProcessor {\n  public static void pipeStreams(InputStream in, OutputStream out) throws IOException {\n    byte[] buffer = new byte[8192];\n    int bytesRead;\n    while ((bytesRead = in.read(buffer)) != -1) {\n      out.write(buffer, 0, bytesRead);\n    }\n  }\n}",
    "python": "# Equivalente em Python com geradores e chunks\ndef stream_chunks(filepath, chunk_size=8192):\n    with open(filepath, \"rb\") as f:\n        while chunk := f.read(chunk_size):\n            yield chunk"
  },
  "nd-cap-2": {
    "code": "N02",
    "category": "core-eventloop",
    "partLabel": "Parte 1 • Arquitetura V8, libuv & Event Loop",
    "scope": "buffers-es6",
    "gofPage": 48,
    "playgroundId": "nd-streams-backpressure-lab",
    "aliases": [
      "Node 4 & 6 LTS",
      "Argon & Boron",
      "io.js",
      "ES2015",
      "Buffer.alloc",
      "DEP0005"
    ],
    "relatedPatterns": [
      "nd-cap-1",
      "nd-cap-3"
    ],
    "realWorldUses": [
      "Manipulação segura de buffers binários na rede sem risco de vazamento de dados confidenciais.",
      "Adoção de classes ES2015 nativas para encapsulamento de regras de domínio de backend.",
      "Garantia de estabilidade em pipelines corporativos através do ciclo de suporte LTS previsível."
    ],
    "java": "// Equivalente em Java com ByteBuffer alocado com zeros\nimport java.nio.ByteBuffer;\n\npublic class BufferSeguro {\n  public static ByteBuffer alocar(int tamanho) {\n    return ByteBuffer.allocate(tamanho); // Java zera a memoria por padrao\n  }\n}",
    "python": "# Equivalente em Python com bytearray seguro\ndef alocar_buffer_seguro(tamanho: int) -> bytearray:\n    return bytearray(tamanho) # Inicializado com zeros"
  },
  "nd-cap-3": {
    "code": "N03",
    "category": "core-eventloop",
    "partLabel": "Parte 1 • Arquitetura V8, libuv & Event Loop",
    "scope": "async-await-napi",
    "gofPage": 92,
    "playgroundId": "nd-streams-backpressure-lab",
    "aliases": [
      "Node 8 & 10 LTS",
      "Carbon & Dubnium",
      "async/await",
      "stream.pipeline",
      "fs.promises",
      "N-API"
    ],
    "relatedPatterns": [
      "nd-cap-2",
      "nd-cap-4"
    ],
    "realWorldUses": [
      "Eliminação do Callback Hell em microsserviços modernos com async/await nativo.",
      "Transferência à prova de vazamentos de recursos entre disco, compressão gzip e sockets de rede.",
      "Compilação de addons C/C++ nativos com Node-API que não quebram ao atualizar o Node.js."
    ],
    "java": "// Equivalente em Java com CompletableFuture\nimport java.util.concurrent.CompletableFuture;\n\npublic class FluxoAssincrono {\n  public static CompletableFuture<String> processarAsync() {\n    return CompletableFuture.supplyAsync(() -> \"dados processados\");\n  }\n}",
    "python": "# Equivalente em Python com asyncio\nimport asyncio\n\nasync def processar_async():\n    await asyncio.sleep(0.01)\n    return \"dados processados\""
  },
  "nd-cap-4": {
    "code": "N04",
    "category": "esm-concurrency",
    "partLabel": "Parte 2 • Módulos ES & Concorrência Moderna",
    "scope": "worker-threads-esm",
    "gofPage": 138,
    "playgroundId": "nd-worker-threads-lab",
    "aliases": [
      "Node 12 LTS",
      "Erbium",
      "Worker Threads",
      "SharedArrayBuffer",
      "ES Modules (.mjs)",
      "cgroups Docker"
    ],
    "relatedPatterns": [
      "nd-cap-3",
      "nd-cap-5"
    ],
    "realWorldUses": [
      "Processamento de imagens, machine learning local e criptografia pesada sem travar o Event Loop.",
      "Adoção de módulos oficiais ECMAScript (import/export) em conformidade com os navegadores web.",
      "Dimensionamento dinâmico de memória em contêineres Kubernetes prevenindo incidentes de OOMKilled."
    ],
    "java": "// Equivalente em Java com ForkJoinPool\nimport java.util.concurrent.ForkJoinPool;\n\npublic class ParalelismoCPU {\n  private static final ForkJoinPool pool = new ForkJoinPool();\n  public static void executar(Runnable r) { pool.submit(r); }\n}",
    "python": "# Equivalente em Python com multiprocessing\nfrom multiprocessing import Process\n\ndef rodar_em_processo_paralelo(target_fn):\n    p = Process(target=target_fn)\n    p.start()\n    return p"
  },
  "nd-cap-5": {
    "code": "N05",
    "category": "esm-concurrency",
    "partLabel": "Parte 2 • Módulos ES & Concorrência Moderna",
    "scope": "asynclocalstorage-exports",
    "gofPage": 184,
    "playgroundId": "nd-cjs-esm-resolver-lab",
    "aliases": [
      "Node 14 LTS",
      "Fermium",
      "AsyncLocalStorage",
      "Package Exports",
      "Optional Chaining",
      "Nullish Coalescing"
    ],
    "relatedPatterns": [
      "nd-cap-4",
      "nd-cap-6"
    ],
    "realWorldUses": [
      "Rastreamento distribuído de requisições com OpenTelemetry e Winston/Pino através de AsyncLocalStorage.",
      "Encapsulamento rígido de bibliotecas npm impedindo vazamento de implementações internas privadas.",
      "Tratamento conciso de respostas aninhadas de APIs externas com operadores ?. e ??."
    ],
    "java": "// Equivalente em Java com ScopedValue ou ThreadLocal\npublic class ContextoTransacao {\n  private static final ThreadLocal<String> requestId = new ThreadLocal<>();\n  public static void set(String id) { requestId.set(id); }\n  public static String get() { return requestId.get(); }\n}",
    "python": "# Equivalente em Python com contextvars\nimport contextvars\n\nrequest_id_var = contextvars.ContextVar(\"request_id\")\n\ndef log_com_contexto():\n    print(\"Request ID:\", request_id_var.get(None))"
  },
  "nd-cap-6": {
    "code": "N06",
    "category": "esm-concurrency",
    "partLabel": "Parte 2 • Módulos ES & Concorrência Moderna",
    "scope": "abortcontroller-node-prefix",
    "gofPage": 230,
    "playgroundId": "nd-cjs-esm-resolver-lab",
    "aliases": [
      "Node 16 LTS",
      "Gallium",
      "node: prefix",
      "node:timers/promises",
      "AbortController",
      "Web Crypto API"
    ],
    "relatedPatterns": [
      "nd-cap-5",
      "nd-cap-7"
    ],
    "realWorldUses": [
      "Cancelamento cooperativo de chamadas HTTP lentas e consultas a banco de dados com AbortSignal.",
      "Proteção da cadeia de suprimentos (supply-chain) usando o prefixo node: contra ataques de typosquatting.",
      "Geração de chaves criptográficas de alto desempenho com a Web Crypto API padrão."
    ],
    "java": "// Equivalente em Java com CancellationToken / Future.cancel\nimport java.util.concurrent.Future;\n\npublic class CanceladorTarefa {\n  public static void cancelar(Future<?> f) {\n    f.cancel(true); // Envia interrupcao thread-safe\n  }\n}",
    "python": "# Cancelamento com asyncio.Task em Python\nimport asyncio\n\nasync def cancelar_tarefa(task: asyncio.Task):\n    task.cancel()"
  },
  "nd-cap-7": {
    "code": "N07",
    "category": "modern-runtime",
    "partLabel": "Parte 3 • Runtime Moderno, Segurança & Conexão Nativa",
    "scope": "fetch-test-runner",
    "gofPage": 278,
    "playgroundId": "nd-frameworks-bench-lab",
    "aliases": [
      "Node 18 LTS",
      "Hydrogen",
      "Global fetch()",
      "node:test",
      "--watch",
      "Undici",
      "Web Streams"
    ],
    "relatedPatterns": [
      "nd-cap-6",
      "nd-cap-8"
    ],
    "realWorldUses": [
      "Consumo universal de APIs remotas via fetch() padrão Web sem carregar bibliotecas externas.",
      "Execução de baterias de testes automatizados com node:test em pipelines de CI/CD ultra rápidos.",
      "Desenvolvimento ágil com reinicialização instantânea em alterações com a flag node --watch."
    ],
    "java": "// Java 11+ HttpClient\nimport java.net.URI;\nimport java.net.http.*;\n\npublic class ConsumoApi {\n  public static String fetch(String url) throws Exception {\n    HttpClient client = HttpClient.newHttpClient();\n    HttpRequest req = HttpRequest.newBuilder().uri(URI.create(url)).build();\n    return client.send(req, HttpResponse.BodyHandlers.ofString()).body();\n  }\n}",
    "python": "# requests / httpx em Python\nimport urllib.request\n\ndef fetch(url):\n    with urllib.request.urlopen(url) as response:\n        return response.read().decode(\"utf-8\")"
  },
  "nd-cap-8": {
    "code": "N08",
    "category": "modern-runtime",
    "partLabel": "Parte 3 • Runtime Moderno, Segurança & Conexão Nativa",
    "scope": "permission-env-file",
    "gofPage": 326,
    "playgroundId": "nd-migration-compat-lab",
    "aliases": [
      "Node 20 LTS",
      "Iron",
      "Permission Model",
      "--env-file",
      "Single Executable Apps (SEA)",
      "import.meta.dirname"
    ],
    "relatedPatterns": [
      "nd-cap-7",
      "nd-cap-9"
    ],
    "realWorldUses": [
      "Proteção em profundidade de processos em contêineres usando o Permission Model para bloquear acessos não autorizados.",
      "Carregamento automático de variáveis de ambiente de arquivos .env com zero dependências de terceiros.",
      "Distribuição de ferramentas de linha de comando como binários executáveis únicos (SEA)."
    ],
    "java": "// Carregamento de propriedades e restricoes de seguranca\nimport java.io.FileInputStream;\nimport java.util.Properties;\n\npublic class VariaveisAmbiente {\n  public static Properties carregarEnv() throws Exception {\n    Properties p = new Properties();\n    p.load(new FileInputStream(\".env\"));\n    return p;\n  }\n}",
    "python": "# python-dotenv / leitura nativa de .env\ndef carregar_env(caminho=\".env\"):\n    valores = {}\n    with open(caminho) as f:\n        for linha in f:\n            if \"=\" in linha and not linha.startswith(\"#\"):\n                k, v = linha.strip().split(\"=\", 1)\n                valores[k] = v\n    return valores"
  },
  "nd-cap-9": {
    "code": "N09",
    "category": "modern-runtime",
    "partLabel": "Parte 3 • Runtime Moderno, Segurança & Conexão Nativa",
    "scope": "require-esm-sqlite",
    "gofPage": 374,
    "playgroundId": "nd-cjs-esm-resolver-lab",
    "aliases": [
      "Node 22 LTS & 24",
      "Jod",
      "require(esm)",
      "Native TypeScript",
      "node:sqlite",
      "WebSocket global"
    ],
    "relatedPatterns": [
      "nd-cap-8",
      "nd-cap-10"
    ],
    "realWorldUses": [
      "Integração transparente entre ecossistemas legados CommonJS e bibliotecas puramente ES Modules.",
      "Execução direta de arquivos .ts em produção ou desenvolvimento sem etapa prévia de build.",
      "Persistência SQL local embutida de altíssima performance para logs, caches e microsserviços com node:sqlite."
    ],
    "java": "// SQLite com JDBC em Java\nimport java.sql.*;\n\npublic class SqliteJava {\n  public static void rodar() throws Exception {\n    try (Connection c = DriverManager.getConnection(\"jdbc:sqlite::memory:\")) {\n      Statement s = c.createStatement();\n      s.execute(\"CREATE TABLE t (id INT)\");\n    }\n  }\n}",
    "python": "# sqlite3 nativo em Python\nimport sqlite3\n\ndef rodar_sqlite():\n    conn = sqlite3.connect(\":memory:\")\n    c = conn.cursor()\n    c.execute(\"CREATE TABLE t (id INT)\")\n    conn.close()"
  },
  "nd-cap-10": {
    "code": "N10",
    "category": "node-frameworks",
    "partLabel": "Parte 4 • Frameworks Backend & Servidores HTTP",
    "scope": "express-pipeline",
    "gofPage": 422,
    "playgroundId": "nd-frameworks-bench-lab",
    "aliases": [
      "Express 1.x a 5.0",
      "Koa 1 & 2",
      "Middlewares Pipeline",
      "path-to-regexp v8",
      "Async Error Handling"
    ],
    "relatedPatterns": [
      "nd-cap-9",
      "nd-cap-11"
    ],
    "realWorldUses": [
      "Migração e modernização segura de milhares de APIs construídas em Express 4 para Express 5.",
      "Criação de pipelines de tratamento de requisições encadeados com middlewares reusáveis.",
      "Adoção do modelo de cebola (Onion Model) em aplicações que demandam controle fino com Koa."
    ],
    "java": "// Spring MVC Controller equivalente\nimport org.springframework.web.bind.annotation.*;\n\n@RestController\npublic class UsuarioController {\n  @GetMapping(\"/usuarios/{id}\")\n  public Usuario buscar(@PathVariable Long id) {\n    return new Usuario(id, \"Dev\");\n  }\n}",
    "python": "# Flask equivalente\nfrom flask import Flask, jsonify\n\napp = Flask(__name__)\n\n@app.route(\"/usuarios/<int:id>\")\ndef buscar(id):\n    return jsonify({\"id\": id, \"nome\": \"Dev\"})"
  },
  "nd-cap-11": {
    "code": "N11",
    "category": "node-frameworks",
    "partLabel": "Parte 4 • Frameworks Backend & Servidores HTTP",
    "scope": "fastify-radix",
    "gofPage": 470,
    "playgroundId": "nd-frameworks-bench-lab",
    "aliases": [
      "Fastify 1.x a 5.x",
      "Radix Tree Router",
      "Ajv JSON Schema",
      "fast-json-stringify",
      "avvio Plugins DAG"
    ],
    "relatedPatterns": [
      "nd-cap-10",
      "nd-cap-12"
    ],
    "realWorldUses": [
      "Microsserviços de altíssimo volume de requisições com tempo de resposta na faixa de microssegundos.",
      "Validação e serialização automática compilada de payloads JSON garantindo contratos rígidos.",
      "Arquiteturas de plugins encapsulados evitando poluição de escopo global."
    ],
    "java": "// Quarkus RESTEasy Reactive equivalente\nimport jakarta.ws.rs.*;\nimport jakarta.ws.rs.core.MediaType;\n\n@Path(\"/pedidos\")\n@Produces(MediaType.APPLICATION_JSON)\npublic class PedidoResource {\n  @POST\n  public Resposta criar(Pedido p) { return new Resposta(\"ok\"); }\n}",
    "python": "# FastAPI equivalente com Pydantic\nfrom fastapi import FastAPI\nfrom pydantic import BaseModel\n\napp = FastAPI()\n\nclass Pedido(BaseModel):\n    cliente: str\n    total: float\n\n@app.post(\"/pedidos\")\ndef criar(p: Pedido):\n    return {\"status\": \"ok\"}"
  },
  "nd-cap-12": {
    "code": "N12",
    "category": "node-frameworks",
    "partLabel": "Parte 4 • Frameworks Backend & Servidores HTTP",
    "scope": "nestjs-hono",
    "gofPage": 518,
    "playgroundId": "nd-migration-compat-lab",
    "aliases": [
      "NestJS 1.x a 11.x",
      "Hono 1.x a 4.x",
      "Dependency Injection",
      "Guards & Interceptors",
      "Web Standards Edge"
    ],
    "relatedPatterns": [
      "nd-cap-10",
      "nd-cap-11"
    ],
    "realWorldUses": [
      "Aplicações corporativas complexas em TypeScript com Injeção de Dependência e governança modular com NestJS.",
      "Aplicações universais que rodam em Edge Functions (Cloudflare Workers, Deno, Bun) e Node.js com Hono.",
      "Microsserviços com tipagem fim a fim (RPC Client) compartilhada entre frontend e backend."
    ],
    "java": "// Micronaut / Spring DI equivalente\nimport jakarta.inject.Singleton;\n\n@Singleton\npublic class ServicoCalculo {\n  public int somar(int a, int b) { return a + b; }\n}",
    "python": "# Dependency Injection em Python\nclass ServicoCalculo:\n    def somar(self, a: int, b: int) -> int:\n        return a + b"
  }
};

export const nodeChaptersData = rawChapters.map((ch) => {
  const meta = chapterMetaMap[ch.id];
  const exList = nodeExamples[ch.id] || [];
  const primaryEx = exList[0] || {
    dirtyCode: "// Codigo legado inicial\n",
    cleanCode: "// Codigo moderno otimizado\n",
    context: ch.subtitle,
    refactoringNotes: []
  };

  return {
    id: ch.id,
    number: ch.number,
    code: meta.code,
    name: `Cap. ${String(ch.number).padStart(2, "0")} • ${ch.title}`,
    ptName: ch.subtitle,
    originalName: `Chapter ${ch.number}: ${ch.title}`,
    category: meta.category,
    partLabel: meta.partLabel,
    scope: meta.scope,
    gofPage: meta.gofPage,
    readingTime: ch.readingTime || "12 min",
    hasPlayground: true,
    playgroundId: meta.playgroundId,
    aliases: meta.aliases,
    intent: ch.teacherIntro,
    problemAndMotivation: ch.sections[0]
      ? `${ch.sections[0].heading}: ${ch.sections[0].body}${
          ch.sections[0].callout ? `\n\n${ch.sections[0].callout.title}: ${ch.sections[0].callout.text}` : ""
        }`
      : ch.teacherIntro,
    solution: ch.sections
      .slice(1)
      .map((s) => {
        const bulletsText = s.bullets ? "\n• " + s.bullets.join("\n• ") : "";
        const calloutText = s.callout
          ? `\n• ${s.callout.title}: ${s.callout.text}`
          : "";
        return `${s.heading}: ${s.body}${bulletsText}${calloutText}`;
      })
      .join("\n\n"),
    structure: {
      participants: ch.keyTakeaways.map((tk, idx) => {
        const parts = tk.split(":");
        if (parts.length > 1) {
          return {
            name: parts[0].trim(),
            role: parts.slice(1).join(":").trim()
          };
        }
        return {
          name: `Diretriz de Arquitetura Node #${idx + 1}`,
          role: tk
        };
      }),
      collaborations:
        primaryEx.context +
        (primaryEx.refactoringNotes?.length
          ? " Insights de migração e retrocompatibilidade: " + primaryEx.refactoringNotes.join(" ")
          : "")
    },
    applicability: [
      ...ch.keyTakeaways,
      `Conceito fundamental no capítulo ${ch.number} do runtime Node.js.`
    ],
    consequences: {
      pros: ch.keyTakeaways.slice(0, 3),
      cons: [
        "A evolução exige gerenciar a coexistência entre pacotes CommonJS legados e módulos ES puros no npm.",
        "Adoção de novos recursos de runtime (como Permission Model ou Type Stripping) requer atualizar a versão mínima do Node no Docker e no CI."
      ]
    },
    implementationNotes: [
      ...(primaryEx.refactoringNotes || []),
      `Consulte a matriz de versões do Node.js para verificar codinomes LTS, versões do V8 e flags de runtime.`
    ],
    codeExamples: {
      typescript: primaryEx.cleanCode,
      dirty: primaryEx.dirtyCode,
      java: meta.java,
      python: meta.python
    },
    extraExamples: exList,
    sections: ch.sections,
    realWorldUses: meta.realWorldUses,
    relatedPatterns: meta.relatedPatterns,
    references: [
      {
        book: "Node.js Official Documentation & OpenJS Foundation Specifications",
        chapter: `Capítulo ${ch.number}: ${ch.title}`,
        pages: `Seção ${meta.gofPage}`,
        summary: ch.subtitle
      },
      {
        book: "Node.js Design Patterns (Mario Casciaro & Luciano Mammino)",
        chapter: "Padrões Arquiteturais Assíncronos e Concorrência no V8",
        pages: "Capítulos correspondentes",
        summary: "Event Loop, Streams, Injeção de Dependência e Design de Frameworks de Baixo Overhead."
      }
    ]
  };
});
