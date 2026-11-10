/**
 * Base de Dados Completa dos 12 Capítulos de "Java: Guia Completo de Versões, JVM & Ecossistema".
 * Estruturada com: Intenção, Problema/Motivação, Solução, Participantes, Aplicabilidade, Prós/Contras,
 * Código Legado vs. Java Moderno vs. TypeScript/Python e Animações.
 */

import { part1Chapters } from "./part1-classic-jvm.js";
import { part2Chapters } from "./part2-functional-modular.js";
import { part3Chapters } from "./part3-modern-lts.js";
import { part4Chapters } from "./part4-frameworks.js";
import { javaExamples } from "../examples/index.js";

const rawChapters = [
  ...part1Chapters,
  ...part2Chapters,
  ...part3Chapters,
  ...part4Chapters
];

const chapterMetaMap = {
  "jv-cap-1": {
    "code": "J01",
    "category": "classic-jvm",
    "partLabel": "Parte 1 • Gênese da JVM & Fundamentos Clássicos",
    "scope": "jvm-bytecode",
    "gofPage": 15,
    "playgroundId": "jv-gc-evolution-lab",
    "aliases": [
      "JDK 1.0 a 1.4",
      "Bytecode",
      "HotSpot JIT",
      "Collections Framework",
      "Java NIO",
      "SerialVersionUID"
    ],
    "relatedPatterns": [
      "jv-cap-2",
      "jv-cap-3"
    ],
    "realWorldUses": [
      "Desenvolvimento de drivers de alta velocidade e protocolos de rede industriais com NIO non-blocking.",
      "Compreensao fundamental de serializacao binaria em caches distribuidos e filas legadas.",
      "Diagnostico de carregamento de classes e conflitos de ClassLoader em servidores de aplicacao."
    ],
    "typescript": "// Equivalente em TypeScript / Node.js\nimport { Buffer } from \"node:buffer\";\nimport * as fs from \"node:fs/promises\";\n\nexport async function processarArquivo(caminho: string): Promise<number[]> {\n  const fileHandle = await fs.open(caminho, \"r\");\n  const buffer = Buffer.alloc(8192);\n  const resultado: number[] = [];\n\n  try {\n    let bytesLidos: number;\n    while ((bytesLidos = (await fileHandle.read(buffer, 0, buffer.length)).bytesRead) > 0) {\n      for (let i = 0; i < bytesLidos; i++) {\n        resultado.push(buffer[i]);\n      }\n    }\n  } finally {\n    await fileHandle.close();\n  }\n  return resultado;\n}",
    "python": "# Equivalente em Python 3\ndef processar_arquivo(caminho: str) -> list[int]:\n    resultado = []\n    with open(caminho, \"rb\") as f:\n        while chunk := f.read(8192):\n            resultado.extend(chunk)\n    return resultado"
  },
  "jv-cap-2": {
    "code": "J02",
    "category": "classic-jvm",
    "partLabel": "Parte 1 • Gênese da JVM & Fundamentos Clássicos",
    "scope": "generics-concurrency",
    "gofPage": 55,
    "playgroundId": "jv-generics-erasure-lab",
    "aliases": [
      "Java 5 (1.5)",
      "Generics",
      "Type Erasure",
      "Annotations",
      "ConcurrentHashMap",
      "JSR-133 JMM"
    ],
    "relatedPatterns": [
      "jv-cap-1",
      "jv-cap-3",
      "jv-cap-4"
    ],
    "realWorldUses": [
      "Arquitetura de bibliotecas de tipos seguros e coleções genéricas reutilizáveis.",
      "Sistemas de alta concorrência com ConcurrentHashMap e ExecutorService sem locks globais.",
      "Frameworks modernos baseados em anotações e reflexão declarativa."
    ],
    "typescript": "// Generics e Map concorrente em TypeScript\nexport class CacheConcorrente<K, V> {\n  private mapa = new Map<K, V>();\n\n  public obterOuCalcular(chave: K, factory: (k: K) => V): V {\n    if (!this.mapa.has(chave)) {\n      this.mapa.set(chave, factory(chave));\n    }\n    return this.mapa.get(chave)!;\n  }\n}",
    "python": "# Generics e Lock em Python\nfrom typing import TypeVar, Generic, Callable\nimport threading\n\nK = TypeVar(\"K\")\nV = TypeVar(\"V\")\n\nclass CacheConcorrente(Generic[K, V]):\n    def __init__(self):\n        self._mapa: dict[K, V] = {}\n        self._lock = threading.Lock()\n\n    def obter_ou_calcular(self, chave: K, factory: Callable[[K], V]) -> V:\n        with self._lock:\n            if chave not in self._mapa:\n                self._mapa[chave] = factory(chave)\n            return self._mapa[chave]"
  },
  "jv-cap-3": {
    "code": "J03",
    "category": "classic-jvm",
    "partLabel": "Parte 1 • Gênese da JVM & Fundamentos Clássicos",
    "scope": "coin-nio2",
    "gofPage": 105,
    "playgroundId": "jv-streams-pipeline-lab",
    "aliases": [
      "Java 6 & 7",
      "Project Coin",
      "try-with-resources",
      "AutoCloseable",
      "NIO.2 Path",
      "invokedynamic"
    ],
    "relatedPatterns": [
      "jv-cap-2",
      "jv-cap-4"
    ],
    "realWorldUses": [
      "Gerenciamento determinístico de conexões com banco de dados, transações e sockets de rede.",
      "Manipulação moderna e atômica de arquivos e diretórios em servidores com java.nio.file.Path.",
      "Base da invocação dinâmica (invokedynamic) para linguagens na JVM e suporte futuro a Lambdas."
    ],
    "typescript": "// Equivalente em TypeScript com Disposable (ES2023 / TC39 Resource Management)\nexport async function lerArquivoNIO2(caminho: string): Promise<string[]> {\n  const fs = await import(\"node:fs/promises\");\n  const content = await fs.readFile(caminho, \"utf-8\");\n  return content.split(\"\\n\");\n}",
    "python": "# Equivalente em Python com Context Manager (with)\nfrom pathlib import Path\n\ndef ler_arquivo_nio2(caminho: str) -> list[str]:\n    p = Path(caminho)\n    with p.open(\"r\", encoding=\"utf-8\") as f:\n        return [linha.rstrip(\"\\n\") for linha in f]"
  },
  "jv-cap-4": {
    "code": "J04",
    "category": "functional-modular",
    "partLabel": "Parte 2 • Revolução Funcional & Modular",
    "scope": "lambdas-streams",
    "gofPage": 160,
    "playgroundId": "jv-streams-pipeline-lab",
    "aliases": [
      "Java 8 (LTS)",
      "Lambdas",
      "Streams API",
      "Default Methods",
      "Optional",
      "java.time",
      "Metaspace"
    ],
    "relatedPatterns": [
      "jv-cap-3",
      "jv-cap-5",
      "jv-cap-6"
    ],
    "realWorldUses": [
      "Processamento declarativo e paralelizado de dados em pipelines de stream.",
      "Cálculo financeiro preciso e manipulação imutável de datas e horários em fusos horários globais.",
      "Design de interfaces abertas para extensão funcional com métodos default."
    ],
    "typescript": "// Programacao funcional e datas em TypeScript\nexport interface Pedido {\n  valor: number;\n  cliente: { nome: string };\n}\n\nexport function clientesComPedidosCaros(pedidos: readonly Pedido[], limite: number): string[] {\n  return pedidos\n    .filter(p => p.valor > limite)\n    .map(p => p.cliente.nome.toUpperCase())\n    .sort();\n}",
    "python": "# Pipelines funcionais com list comprehension em Python\ndef clientes_pedidos_caros(pedidos, limite):\n    nomes = [p[\"cliente\"][\"nome\"].upper() for p in pedidos if p[\"valor\"] > limite]\n    return sorted(nomes)"
  },
  "jv-cap-5": {
    "code": "J05",
    "category": "functional-modular",
    "partLabel": "Parte 2 • Revolução Funcional & Modular",
    "scope": "jpms-jigsaw",
    "gofPage": 215,
    "playgroundId": "jv-migration-compat-lab",
    "aliases": [
      "Java 9 & 10",
      "JPMS",
      "Jigsaw",
      "module-info",
      "jlink",
      "List.of",
      "var local type inference"
    ],
    "relatedPatterns": [
      "jv-cap-4",
      "jv-cap-6"
    ],
    "realWorldUses": [
      "Geração de imagens de execução customizadas e enxutas via jlink para contêineres Docker.",
      "Encapsulamento estrito de módulos de segurança e segregação de APIs públicas vs. internas.",
      "Construção de microsserviços modernos com inicialização rápida e menor pegada de memória."
    ],
    "typescript": "// Modulos ESM e colecoes imutaveis em TypeScript\nexport const servidores = Object.freeze([\"srv-1.dc.net\", \"srv-2.dc.net\"]);\n\nexport function processarComVar(): void {\n  const metricas = new Map<string, number>([[\"cpu\", 45.2], [\"memoria\", 78.5]]);\n  for (const [k, v] of metricas) {\n    console.log(`${k} -> ${v}`);\n  }\n}",
    "python": "# Tuplas imutaveis e dicionarios em Python\nSERVIDORES = (\"srv-1.dc.net\", \"srv-2.dc.net\")\n\ndef processar_metricas():\n    metricas = {\"cpu\": 45.2, \"memoria\": 78.5}\n    for k, v in metricas.items():\n        print(f\"{k} -> {v}\")"
  },
  "jv-cap-6": {
    "code": "J06",
    "category": "functional-modular",
    "partLabel": "Parte 2 • Revolução Funcional & Modular",
    "scope": "http2-modern-jdk",
    "gofPage": 270,
    "playgroundId": "jv-migration-compat-lab",
    "aliases": [
      "Java 11 (LTS)",
      "HttpClient",
      "HTTP/2",
      "Java Single-File Source",
      "Flight Recorder JFR",
      "ZGC"
    ],
    "relatedPatterns": [
      "jv-cap-5",
      "jv-cap-7"
    ],
    "realWorldUses": [
      "Integração com APIs RESTful modernas via HTTP/2 multiplexado nativo.",
      "Diagnóstico e profiling contínuo em produção de baixa sobrecarga via JDK Flight Recorder (JFR).",
      "Execução de scripts utilitários de infraestrutura diretamente a partir do código fonte .java."
    ],
    "typescript": "// fetch HTTP/2 nativo em Node.js 18+ / TypeScript\nexport async function getAsync(uri: string): Promise<string> {\n  const response = await fetch(uri, {\n    headers: { \"Accept\": \"application/json\" }\n  });\n  return response.text();\n}",
    "python": "# Cliente HTTP com requests / httpx em Python\nimport httpx\n\nasync def get_async(uri: str) -> str:\n    async with httpx.AsyncClient(http2=True) as client:\n        res = await client.get(uri, headers={\"Accept\": \"application/json\"})\n        return res.text"
  },
  "jv-cap-7": {
    "code": "J07",
    "category": "modern-lts",
    "partLabel": "Parte 3 • Java Moderno, Records & Virtual Threads",
    "scope": "records-sealed",
    "gofPage": 325,
    "playgroundId": "jv-generics-erasure-lab",
    "aliases": [
      "Java 12 a 17 (LTS)",
      "Records",
      "Sealed Classes",
      "Switch Expressions",
      "Text Blocks",
      "Pattern Matching instanceof"
    ],
    "relatedPatterns": [
      "jv-cap-6",
      "jv-cap-8"
    ],
    "realWorldUses": [
      "Modelagem limpa de eventos em sistemas orientados a eventos (Kafka / RabbitMQ) com Records.",
      "Definição de modelos de domínio fechados e seguros com Sealed Interfaces e Pattern Matching.",
      "Consultas SQL complexas e templates JSON/HTML multilinha legíveis com Text Blocks."
    ],
    "typescript": "// TypeScript tipado com discriminated unions\nexport type Forma =\n  | { kind: \"circulo\"; x: number; y: number; raio: number }\n  | { kind: \"retangulo\"; x: number; y: number; largura: number; altura: number };\n\nexport function calcularArea(f: Forma): number {\n  switch (f.kind) {\n    case \"circulo\": return Math.PI * f.raio ** 2;\n    case \"retangulo\": return f.largura * f.altura;\n  }\n}",
    "python": "# Dataclasses e match/case em Python 3.10+\nfrom dataclasses import dataclass\n\n@dataclass(frozen=True)\nclass Ponto:\n    x: float\n    y: float\n\n@dataclass(frozen=True)\nclass Circulo:\n    centro: Ponto\n    raio: float\n\ndef calcular(forma):\n    match forma:\n        case Circulo(centro=c, raio=r):\n            return 3.14159 * (r ** 2)\n        case _:\n            raise ValueError(\"Forma desconhecida\")"
  },
  "jv-cap-8": {
    "code": "J08",
    "category": "modern-lts",
    "partLabel": "Parte 3 • Java Moderno, Records & Virtual Threads",
    "scope": "virtual-threads",
    "gofPage": 380,
    "playgroundId": "jv-virtual-threads-lab",
    "aliases": [
      "Java 18 a 21 (LTS)",
      "Virtual Threads",
      "Project Loom",
      "Sequenced Collections",
      "Record Patterns",
      "Generational ZGC"
    ],
    "relatedPatterns": [
      "jv-cap-7",
      "jv-cap-9",
      "jv-cap-10"
    ],
    "realWorldUses": [
      "Escalar servidores web e gateways de API para 100.000 conexões simultâneas por nó.",
      "Microsserviços de backend de alta taxa de transferência (I/O intensivo) sem reescrever para frameworks reativos.",
      "Manipulação ordenada e segura de coleções com Sequenced Collections (getFirst/getLast/reversed)."
    ],
    "typescript": "// Concorrencia em Node.js com async/await e Promise.all\nexport async function executarTarefasConcorrentes(tarefas: (() => Promise<void>)[]): Promise<void> {\n  // Dispara milhares de operacoes I/O sem bloquear o Event Loop\n  await Promise.all(tarefas.map(t => t()));\n}",
    "python": "# asyncio com tarefas concorrentes em Python\nimport asyncio\n\nasync def executar_todas(tarefas):\n    await asyncio.gather(*(t() for t in tarefas))"
  },
  "jv-cap-9": {
    "code": "J09",
    "category": "modern-lts",
    "partLabel": "Parte 3 • Java Moderno, Records & Virtual Threads",
    "scope": "panama-native",
    "gofPage": 430,
    "playgroundId": "jv-migration-compat-lab",
    "aliases": [
      "Java 22 a 25 (LTS)",
      "Project Panama",
      "FFM API",
      "Arena",
      "Stream Gatherers",
      "Scoped Values",
      "Class-File API"
    ],
    "relatedPatterns": [
      "jv-cap-8",
      "jv-cap-10"
    ],
    "realWorldUses": [
      "Processamento de inteligência artificial e aprendizado de máquina chamando bibliotecas C/CUDA nativas da JVM.",
      "Processamento de big data de ultra baixa latência com buffers de memória off-heap determinísticos.",
      "Manipulação segura de threads e contextos imutáveis em larga escala com Scoped Values."
    ],
    "typescript": "// Node.js nativo com FFI / buffer direto\nimport { Buffer } from \"node:buffer\";\n\nexport function manipularMemoriaBuffer(): void {\n  const buf = Buffer.allocUnsafe(1024);\n  buf.writeInt32LE(42, 0);\n  buf.writeInt32LE(100, 4);\n  console.log(\"Valor lido:\", buf.readInt32LE(0));\n}",
    "python": "# ctypes em Python para memoria nativa\nimport ctypes\n\ndef manipular_memoria_nativa():\n    buf = (ctypes.c_int * 2)()\n    buf[0] = 42\n    buf[1] = 100\n    print(\"Valor lido nativo:\", buf[0])"
  },
  "jv-cap-10": {
    "code": "J10",
    "category": "frameworks-ecosystem",
    "partLabel": "Parte 4 • Frameworks Enterprise & Ecossistema Moderno",
    "scope": "springboot-evolution",
    "gofPage": 480,
    "playgroundId": "jv-springboot-quarkus-lab",
    "aliases": [
      "Spring Boot 1 a 3.4+",
      "Auto-Configuration",
      "Spring WebFlux",
      "GraalVM AOT",
      "Spring Security 6",
      "RestClient"
    ],
    "relatedPatterns": [
      "jv-cap-8",
      "jv-cap-11"
    ],
    "realWorldUses": [
      "Arquitetura corporativa em nuvem com Spring Cloud, Spring Data e Spring Security.",
      "Microsserviços de alto desempenho com Spring Boot 3.4 e Virtual Threads habilitadas com uma única flag.",
      "Compilação Ahead-of-Time para contêineres Kubernetes com tempo de inicialização em frações de segundo."
    ],
    "typescript": "// Equivalente em NestJS / TypeScript\nimport { Controller, Get } from \"@nestjs/common\";\n\n@Controller(\"usuarios\")\nexport class UsuarioController {\n  @Get()\n  async listar() {\n    return [{ id: 1, nome: \"Dev\" }];\n  }\n}",
    "python": "# Equivalente em FastAPI / Python\nfrom fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get(\"/usuarios\")\ndef listar():\n    return [{\"id\": 1, \"nome\": \"Dev\"}]"
  },
  "jv-cap-11": {
    "code": "J11",
    "category": "frameworks-ecosystem",
    "partLabel": "Parte 4 • Frameworks Enterprise & Ecossistema Moderno",
    "scope": "quarkus-buildtime",
    "gofPage": 530,
    "playgroundId": "jv-springboot-quarkus-lab",
    "aliases": [
      "Quarkus 1 a 3.15 LTS",
      "Build-Time Augmentation",
      "ArC CDI",
      "Panache Entity",
      "Dev Services",
      "GraalVM Native"
    ],
    "relatedPatterns": [
      "jv-cap-10",
      "jv-cap-12"
    ],
    "realWorldUses": [
      "Aplicações Serverless (AWS Lambda, Google Cloud Run) com inicialização em menos de 0.05 segundos.",
      "Redução drástica de custos de infraestrutura em nuvem através de pegada de memória RAM inferior a 30 MB.",
      "Desenvolvimento ágil com recarregamento em tempo real (Live Reload) e contêineres de banco automáticos."
    ],
    "typescript": "// Equivalente de alta velocidade com Fastify\nimport Fastify from \"fastify\";\n\nconst app = Fastify();\napp.get(\"/pedidos\", async () => {\n  return [{ id: 1, total: 150.0 }];\n});",
    "python": "# Servico assincrono leve com Litestar / Python\nfrom litestar import Litestar, get\n\n@get(\"/pedidos\")\nasync def obter_pedidos() -> list[dict]:\n    return [{\"id\": 1, \"total\": 150.0}]\n\napp = Litestar([obter_pedidos])"
  },
  "jv-cap-12": {
    "code": "J12",
    "category": "frameworks-ecosystem",
    "partLabel": "Parte 4 • Frameworks Enterprise & Ecossistema Moderno",
    "scope": "jakarta-micronaut",
    "gofPage": 580,
    "playgroundId": "jv-migration-compat-lab",
    "aliases": [
      "Jakarta EE 8 a 11",
      "J2EE Histórico",
      "Micronaut 1 a 4",
      "Compile-Time DI",
      "Project Leyden",
      "CRaC"
    ],
    "relatedPatterns": [
      "jv-cap-10",
      "jv-cap-11"
    ],
    "realWorldUses": [
      "Modernização de sistemas legados J2EE/Java EE para arquiteturas de contêineres nativas da nuvem.",
      "Adoção de Micronaut e Jakarta Data para garantir portabilidade entre provedores de nuvem.",
      "Utilização de CRaC (Coordinated Restore at Checkpoint) para inicialização instantânea a partir de snapshots de memória."
    ],
    "typescript": "// Micronaut-like DI estatico em TypeScript com Inversify\nimport { injectable, Container } from \"inversify\";\n\n@injectable()\nexport class ServicoFaturamento {\n  calcular(): number { return 100.0; }\n}",
    "python": "# Injecao de dependencia simples em Python\nclass Repositorio:\n    def contar(self) -> int:\n        return 42\n\nclass Servico:\n    def __init__(self, repo: Repositorio):\n        self.repo = repo"
  }
};

export const javaChaptersData = rawChapters.map((ch) => {
  const meta = chapterMetaMap[ch.id];
  const exList = javaExamples[ch.id] || [];
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
          name: `Diretriz Arquitetural #${idx + 1}`,
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
      `Conceito central no capítulo ${ch.number} da plataforma Java.`
    ],
    consequences: {
      pros: ch.keyTakeaways.slice(0, 3),
      cons: [
        "A evolução exige planejar a compatibilidade entre dependências de terceiros e a versão mínima da JVM em produção.",
        "A adoção de novos recursos de sintaxe (como Records ou Virtual Threads) requer atualização dos compiladores e pipelines de CI/CD."
      ]
    },
    implementationNotes: [
      ...(primaryEx.refactoringNotes || []),
      `Consulte a matriz de versões do Java para detalhes exatos sobre a versão de bytecode (Major ClassFile) e flags do javac.`
    ],
    codeExamples: {
      dirty: primaryEx.dirtyCode,
      java: primaryEx.cleanCode,
      typescript: meta.typescript,
      python: meta.python
    },
    extraExamples: exList,
    sections: ch.sections,
    realWorldUses: meta.realWorldUses,
    relatedPatterns: meta.relatedPatterns,
    references: [
      {
        book: "The Java Language Specification & JVM Specification (Oracle / OpenJDK)",
        chapter: `Capítulo ${ch.number}: ${ch.title}`,
        pages: `Seção ${meta.gofPage}`,
        summary: ch.subtitle
      },
      {
        book: "Effective Java (Joshua Bloch)",
        chapter: "Boas Práticas de Engenharia na Plataforma Java",
        pages: "Itens correspondentes",
        summary: "Diretrizes definitivas de imutabilidade, concorrência, exceções e herança."
      }
    ]
  };
});
