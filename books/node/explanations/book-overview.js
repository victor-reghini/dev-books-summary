/**
 * Visão Geral e Matriz Histórica de Versões do Node.js (0.10 a 24)
 * e dos Principais Frameworks do Ecossistema (Express, Fastify, NestJS, Hono & Koa).
 */

export const nodeVersionsMatrix = [
  {
    version: "Node.js 0.10 & 0.12",
    codename: "Pre-LTS (Joyent)",
    year: "2013 - 2015",
    v8Version: "V8 3.14 / 3.28",
    highlights:
      "Arquitetura original V8 + libuv, Event Loop single-threaded, Error-First Callbacks, módulos CommonJS (require/module.exports), evolução de Streams1 para Streams2/Streams3 com backpressure automático e cluster module.",
    howToUse:
      "Usar require() síncrono no boot, callbacks no padrão (err, data) => {}, readable.pipe(writable) para controle de memória em I/O e process.nextTick() para micro-agendamentos imediatos.",
    retrocompatibility:
      "Streams2/3 mantiveram compatibilidade com código legado que usava .on('data') (flowing mode) enquanto introduziram paused mode (.read()) e .pipe() seguro. Resolução node_modules permanece 100% compatível até o Node 24."
  },
  {
    version: "Node.js 4.x LTS",
    codename: "Argon (LTS)",
    year: "2015",
    v8Version: "V8 4.5",
    highlights:
      "Reunificação histórica do fork io.js com o Node.js sob a Node.js Foundation. Início do calendário oficial LTS (Long Term Support) e chegada do ES6/ES2015 nativo (classes, const/let, arrow functions, Promises, Map/Set, Template Strings).",
    howToUse:
      "Substituir construtores prototípicos verbosos por class, var por const/let e callbacks aninhados por Promises nativas encadeadas com .then() e .catch().",
    retrocompatibility:
      "Salto direto da versão 0.12 para 4.0 (incorporando io.js 1.x-3.x) sem quebrar APIs core de fs, http ou net. Addons C++ precisaram migrar para NAN (Native Abstractions for Node.js) devido às mudanças na ABI do V8."
  },
  {
    version: "Node.js 6.x LTS",
    codename: "Boron (LTS)",
    year: "2016",
    v8Version: "V8 5.1",
    highlights:
      "93% de cobertura da especificação ES2015 (destructuring, default params, rest/spread, Proxy) e reformulação de segurança da API de Buffer com Buffer.from(), Buffer.alloc() e Buffer.allocUnsafe().",
    howToUse:
      "Usar exclusivamente Buffer.from(string, 'utf8') e Buffer.alloc(size) (memória zerada com segurança), reservando Buffer.allocUnsafe(size) apenas para caminhos críticos onde o buffer será sobrescrito imediatamente.",
    retrocompatibility:
      "Depreciação do construtor polimórfico new Buffer(num) (DEP0005), que alocava memória RAM não-zerada quando recebia um número inteiro (vazando chaves privadas e senhas). Mantido em runtime com warning para não quebrar pacotes antigos do npm."
  },
  {
    version: "Node.js 8.x LTS",
    codename: "Carbon (LTS)",
    year: "2017",
    v8Version: "V8 6.2 (TurboFan + Ignition)",
    highlights:
      "Chegada do async/await nativo (ES2017), util.promisify(), util.callbackify(), módulo experimental HTTP/2, V8 Inspector integrado para debugging no Chrome DevTools e estreia da N-API (Node-API).",
    howToUse:
      "Envolver APIs legadas baseadas em callbacks usando const stat = util.promisify(fs.stat) e consumir fluxos assíncronos com funções async/await e blocos try/catch.",
    retrocompatibility:
      "A introdução da N-API criou uma camada ABI (Application Binary Interface) independente do V8: módulos nativos C/C++ compilados uma única vez passaram a rodar em versões futuras do Node sem recompilação (node-gyp)."
  },
  {
    version: "Node.js 10.x LTS",
    codename: "Dubnium (LTS)",
    year: "2018",
    v8Version: "V8 6.8",
    highlights:
      "API nativa fs.promises, stream.pipeline() e stream.finished(), HTTP/2 estável, BigInt nativo, Async Iterators (for await...of em Readable Streams), OpenSSL 1.1.0 e códigos de erro padronizados (ERR_*).",
    howToUse:
      "Substituir múltiplos .pipe() encadeados sem tratamento de erro por stream.pipeline(src, transform, dest, cb) e iterar streams usando for await (const chunk of readable).",
    retrocompatibility:
      "Padronização de códigos imutáveis em err.code (ex: ERR_INVALID_ARG_TYPE) para evitar que bibliotecas dependessem de strings de err.message. stream.pipeline() resolveu vazamentos históricos de descritores de arquivo quando um stream intermediário falhava."
  },
  {
    version: "Node.js 12.x LTS",
    codename: "Erbium (LTS)",
    year: "2019",
    v8Version: "V8 7.8",
    highlights:
      "Worker Threads estáveis (worker_threads) com SharedArrayBuffer, suporte a ES Modules (.mjs e package.json 'type': 'module'), TLS 1.3 por padrão, Diagnostic Reports nativos, Private Class Fields (#) e detecção de limites de memória em containers (cgroups).",
    howToUse:
      "Delegar processamento pesado de CPU (criptografia, compressão, parsing gigante) para new Worker() mantendo o Event Loop principal livre, e declarar 'type': 'module' para usar import/export.",
    retrocompatibility:
      "O Node 12 passou a ler limites de memória de containers Docker/Kubernetes (cgroups) para dimensionar automaticamente a heap do V8 (--max-old-space-size), eliminando crashes abruptos por OOMKilled (Exit Code 137)."
  },
  {
    version: "Node.js 14.x LTS",
    codename: "Fermium (LTS)",
    year: "2020",
    v8Version: "V8 8.4",
    highlights:
      "AsyncLocalStorage (node:async_hooks) estável para rastreamento de contexto assíncrono, Package Entry Points ('exports' e 'imports' no package.json), Top-Level Await em ESM, Optional Chaining (?.) e Nullish Coalescing (??).",
    howToUse:
      "Instanciar AsyncLocalStorage para propagar requestId, tenantId e spans OpenTelemetry sem poluir assinaturas de funções, e configurar 'exports' no package.json para expor APIs públicas explícitas.",
    retrocompatibility:
      "O campo 'exports' introduziu encapsulamento estrito (ERR_PACKAGE_PATH_NOT_EXPORTED), impedindo imports profundos não autorizados (ex: pkg/lib/internal.js) e viabilizando Conditional Exports ('import' vs 'require') com atenção ao Dual Package Hazard."
  },
  {
    version: "Node.js 16.x LTS",
    codename: "Gallium (LTS)",
    year: "2021",
    v8Version: "V8 9.4",
    highlights:
      "Timers Promises API (node:timers/promises), AbortController e AbortSignal globais, Web Crypto API (crypto.subtle), prefixo obrigatório/recomendado node: para built-ins, Corepack experimental e binários nativos Apple Silicon (M1 ARM64).",
    howToUse:
      "Usar await setTimeout(1000) de 'node:timers/promises', cancelar chamadas HTTP/I/O com AbortSignal.timeout(5000) e importar módulos nativos sempre com prefixo 'node:fs', 'node:path', 'node:crypto'.",
    retrocompatibility:
      "Mudança histórica de comportamento: a partir do Node 15/16, Promises rejeitadas sem tratamento (unhandledRejection) passaram a encerrar o processo imediatamente com exit code 1 (--unhandled-rejections=throw por padrão), exigindo tratamento rigoroso de erros."
  },
  {
    version: "Node.js 18.x LTS",
    codename: "Hydrogen (LTS)",
    year: "2022",
    v8Version: "V8 10.2",
    highlights:
      "Era Batteries-Included: fetch() global nativo (motor Undici), Test Runner embutido (node:test com describe, it, mock), modo node --watch nativo, Web Streams API global, structuredClone(), util.parseArgs() e OpenSSL 3.0.",
    howToUse:
      "Executar testes sem dependências externas com node --test, desenvolver com recarregamento automático via node --watch src/server.js, usar fetch() global e clonar objetos profundos com structuredClone(obj).",
    retrocompatibility:
      "O OpenSSL 3.0 desativou algoritmos criptográficos obsoletos (MD4, RC4, chaves RSA fracas) por padrão, gerando ERR_OSSL_EVP_UNSUPPORTED em bundlers legados (Webpack 4), contornável temporariamente com --openssl-legacy-provider. Passou a exigir glibc 2.28+ no Linux."
  },
  {
    version: "Node.js 20.x LTS",
    codename: "Iron (LTS)",
    year: "2023",
    v8Version: "V8 11.3 (Maglev JIT)",
    highlights:
      "Permission Model nativo (--permission), carregamento nativo de variáveis de ambiente (--env-file=.env), Single Executable Applications (SEA), import.meta.dirname / import.meta.filename, WebSocket client experimental e métodos de Array imutáveis (.toSorted, .toReversed, .with).",
    howToUse:
      "Executar node --env-file=.env src/index.js sem pacote dotenv, restringir acesso a disco/rede com node --permission --allow-fs-read=./data e usar import.meta.dirname em ES Modules.",
    retrocompatibility:
      "Custom ESM Loader Hooks (module.register) foram movidos para uma thread dedicada isolada da thread principal da aplicação para evitar contaminação de escopo. url.parse() recebeu depreciação formal em favor da classe WHATWG new URL()."
  },
  {
    version: "Node.js 22.x LTS",
    codename: "Jod (LTS)",
    year: "2024",
    v8Version: "V8 12.4 (Maglev)",
    highlights:
      "Suporte revolucionário a require(esm) para carregar módulos ES síncronos a partir de CommonJS, WebSocket client global ativo por padrão, fs.glob / fs.promises.glob nativos, util.styleText() para cores no terminal e aumento do highWaterMark padrão de streams de 16KiB para 64KiB.",
    howToUse:
      "Consumir pacotes distribuídos apenas em ESM diretamente com require('pacote-esm') desde que não usem Top-Level Await, estilizar logs CLI com util.styleText(['bold', 'green'], 'OK') e buscar arquivos com fs.globSync('**/*.ts').",
    retrocompatibility:
      "O suporte a require(esm) (estabilizado no ciclo 22.12+) destravou a maior barreira de migração do ecossistema npm: projetos CommonJS legados agora podem atualizar dependências ESM-only sem reescrever toda a base de código, falhando apenas com ERR_REQUIRE_ASYNC_MODULE se o módulo ESM usar Top-Level await."
  },
  {
    version: "Node.js 23 & Node.js 24",
    codename: "Current / Krypton LTS",
    year: "2024 - 2025",
    v8Version: "V8 12.9 / V8 13.x",
    highlights:
      "Execução nativa de TypeScript sem build step (Type Stripping nativo por padrão para arquivos .ts), módulo embutido node:sqlite (DatabaseSync), URLPattern global, AsyncLocalStorage reimplementado sobre AsyncContextFrame de altíssima performance e Permission Model evoluído (--permission).",
    howToUse:
      "Executar arquivos TypeScript diretamente com node server.ts (usando erasable syntax e import type), persistir dados locais ou testes em memória com import { DatabaseSync } from 'node:sqlite' e validar rotas com new URLPattern().",
    retrocompatibility:
      "O Type Stripping nativo remove anotações de tipos em tempo de carregamento sem transpilação pesada, exigindo importações com extensão explícita (.ts) e tipos explícitos com 'import type'. Constrói pontes diretas com TypeScript 5.8+ (--erasableSyntaxOnly) mantendo 100% de compatibilidade com JS padrão."
  }
];

export const nodeFrameworksHistory = {
  express: [
    {
      version: "Express 1.x - 3.x",
      year: "2010 - 2012",
      minNode: "Node 0.2 - 0.10",
      keyFeatures:
        "Criado por TJ Holowaychuk (inspirado no Sinatra do Ruby) construído diretamente sobre o Connect. Introduziu app.get/post, middlewares sequenciais (req, res, next), view engines (Jade/Pug, EJS) e bodyParser/cookieParser embutidos.",
      breakingAndCompat:
        "Forte acoplamento com os middlewares internos do pacote Connect. No Express 3.x, app.configure() começou a ser substituído por condicionais diretas baseadas em process.env.NODE_ENV."
    },
    {
      version: "Express 4.0 - 4.21",
      year: "2014 - 2024",
      minNode: "Node 0.10+ (4.21 suporta até Node 22+)",
      keyFeatures:
        "Remoção da dependência do Connect e extração dos middlewares para pacotes independentes (body-parser, cookie-parser, morgan, compression). Introdução da classe modular express.Router() e reintegração de express.json() e express.urlencoded() na versão 4.16.0.",
      breakingAndCompat:
        "Versão mais longeva da história do Node.js (10 anos como padrão). Ponto crítico de atenção: o roteador do Express 4 NÃO captura Promises rejeitadas em handlers async (exigindo express-async-errors ou wrappers next(err) manuais para evitar UnhandledPromiseRejection)."
    },
    {
      version: "Express 5.0",
      year: "2024 - 2025",
      minNode: "Node 18+",
      keyFeatures:
        "Captura automática nativa de erros em middlewares e rotas async/await (rejeições de Promises são encaminhadas automaticamente para o error handler de 4 argumentos), novo motor path-to-regexp v8 seguro contra ataques ReDoS, e req.query transformado em getter somente-leitura.",
      breakingAndCompat:
        "Quebras importantes na migração 4 -> 5: coringas anônimos '/*' ou '*' agora exigem nome explícito '/*splat'; parâmetros opcionais mudaram de '/:file.:ext?' para '/:file{.:ext}'; métodos obsoletos removidos (app.del(), res.send(status, body), res.json(status, obj), req.param())."
    }
  ],
  fastify: [
    {
      version: "Fastify 1.x - 2.x",
      year: "2018 - 2019",
      minNode: "Node 6+ / Node 8+",
      keyFeatures:
        "Criado por Matteo Collina e Tomas Della Vedova com foco em baixo overhead. Roteador Radix-Tree (find-my-way), serialização JSON acelerada por compilação JIT (fast-json-stringify), validação de entrada com Ajv, logger estruturado Pino e sistema de plugins encapsulado em DAG (avvio).",
      breakingAndCompat:
        "Introduziu o modelo de encapsulamento de contexto onde plugins registrados via fastify.register() isolam decoradores, hooks e configurações, compartilhando para o escopo pai apenas quando envolvidos com fastify-plugin (fp)."
    },
    {
      version: "Fastify 3.x",
      year: "2020",
      minNode: "Node 10+",
      keyFeatures:
        "Reescrita do sistema de tipos para suporte de primeira classe ao TypeScript com genéricos de Request/Reply, validação de schemas precompilada em modo standalone e suporte unificado a Promises e callbacks nos hooks do ciclo de vida.",
      breakingAndCompat:
        "Padronização de opções de roteamento e substituição de middlewares estilo Connect puros pelo plugin oficial @fastify/express ou @fastify/middie para não degradar a performance do ciclo nativo."
    },
    {
      version: "Fastify 4.x",
      year: "2022",
      minNode: "Node 14+",
      keyFeatures:
        "Introdução dos Type Providers oficiais (@fastify/type-provider-typebox e @fastify/type-provider-zod) para inferência estática automática de tipos TS a partir dos schemas de validação, migração de todos os pacotes oficiais para o escopo @fastify/* e roteamento assíncrono otimizado.",
      breakingAndCompat:
        "Remoção do suporte a middlewares síncronos embutidos no core (transferidos para @fastify/middie) e exigência de retorno explícito ou async/await em handlers que retornam Promises para evitar reply duplicado."
    },
    {
      version: "Fastify 5.x",
      year: "2024 - 2025",
      minNode: "Node 20+",
      keyFeatures:
        "Baseline moderno no Node 20 LTS, redução drástica de alocações no ciclo Request/Reply, separação explícita entre configuração 'logger' e instância pronta 'loggerInstance', e validação estrita de JSON Schema por padrão.",
      breakingAndCompat:
        "Remoção de APIs depreciadas do Fastify 4, exigência de schemas JSON válidos com propriedade 'type' explícita em parâmetros de rota e melhorias de segurança contra poluição de protótipos e DoS em parsing de querystrings."
    }
  ],
  nestjs: [
    {
      version: "NestJS 1.x - 6.x",
      year: "2017 - 2019",
      minNode: "Node 6+ - Node 10+",
      keyFeatures:
        "Criado por Kamil Mysliwiec trazendo arquitetura inspirada no Angular e Spring Boot para o Node.js: Injeção de Dependência (IoC Container), modularização (@Module, @Controller, @Injectable), Pipes, Guards, Interceptors, Exception Filters e suporte a Microsserviços e GraphQL.",
      breakingAndCompat:
        "Introduziu a camada de abstração de plataforma HTTP (HttpAdapterHost), permitindo que a mesma aplicação NestJS rodasse sobre @nestjs/platform-express (padrão) ou @nestjs/platform-fastify sem alterar os controllers."
    },
    {
      version: "NestJS 7.x - 8.x",
      year: "2020 - 2021",
      minNode: "Node 10+ / Node 12+",
      keyFeatures:
        "API Versioning nativo (@Version('1') por URI, Header, Media Type ou Custom), escopos de injeção avançados (DEFAULT, REQUEST, TRANSIENT), Durable Providers para multi-tenancy, Lazy Loading de módulos e atualização para RxJS 7.",
      breakingAndCompat:
        "Transição suave de pacotes de configuração (@nestjs/config), melhoria na árvore de resolução de dependências circulares (forwardRef) e separação clara entre loggers de sistema e loggers injetáveis."
    },
    {
      version: "NestJS 9.x - 10.x",
      year: "2022 - 2023",
      minNode: "Node 16+",
      keyFeatures:
        "Integração oficial com o compilador SWC (Speedy Web Compiler em Rust) acelerando builds e testes em até 20x, classe utilitária ConfigurableModuleBuilder para criação tipada de módulos dinâmicos (.forRoot / .forRootAsync), REPL interativo nativo e Redis/Kafka transporters aprimorados.",
      breakingAndCompat:
        "Drop de suporte ao Node 12 e Node 14; adoção de pacotes modernos de cache-manager v5 e suporte aprimorado para sobrescrita de provedores em testes unitários automatizados (@nestjs/testing)."
    },
    {
      version: "NestJS 11.x",
      year: "2024 - 2025",
      minNode: "Node 20+",
      keyFeatures:
        "Atualização dos adaptadores oficiais para Express 5 (@nestjs/platform-express) e Fastify 5 (@nestjs/platform-fastify), inicialização mais rápida do container IoC com chaves determinísticas, nova classe base IntrinsicException e suporte a JSON logging nativo.",
      breakingAndCompat:
        "Ao utilizar @nestjs/platform-express no NestJS 11, as novas regras de sintaxe de rotas do Express 5 (como '/*splat' para wildcards e '{} ' para parâmetros opcionais) passam a valer nos decorators @Get() e @All()."
    }
  ],
  honoAndKoa: [
    {
      version: "Koa 1.x -> Koa 2.x",
      year: "2013 - 2024",
      minNode: "Node 0.12 (Generators) / Node 7.6+ (async/await)",
      keyFeatures:
        "Desenhado pela equipe original do Express para ser um núcleo minimalista sem roteador ou middlewares embutidos. Substituiu o par (req, res) pelo objeto unificado Context (ctx) e consagrou o Onion Model (cascata em camadas de ida e volta).",
      breakingAndCompat:
        "O Koa 1.x utilizava funções geradoras ES6 (function* (next) { yield next; }) com a biblioteca 'co'. O Koa 2.x migrou para async (ctx, next) => { await next(); }, tornando o tratamento de erros centralizado via um único try/catch no primeiro middleware."
    },
    {
      version: "Hono 1.x - 4.x",
      year: "2022 - 2025",
      minNode: "Node 18+ (via @hono/node-server), Cloudflare Workers, Deno & Bun",
      keyFeatures:
        "Criado por Yusuke Wada e construído 100% sobre Web Standards (fetch API, Request, Response, Headers, Web Streams). Inclui RegExpRouter ultra-rápido, RPC client end-to-end tipado (hono/client com Zod Validator), JSX SSR nativo e zero dependências externas.",
      breakingAndCompat:
        "Permite que exatamente o mesmo código de roteamento e middlewares rode sem alterações em Node.js (@hono/node-server), Cloudflare Workers, AWS Lambda, Deno e Bun, representando a convergência WinterCG / Web-interoperable Runtimes."
    }
  ]
};

export const nodeBookOverview = {
  title: "Node.js: Guia Completo de Versões, Event Loop & Frameworks",
  subtitle: "Do Node 0.10 ao Node 24, Arquitetura V8 + libuv, ES Modules e Frameworks (Express, Fastify, NestJS & Hono)",
  originalTitle: "The Node.js Runtime & Ecosystem Evolution: Releases, Backward Compatibility & Server Frameworks",
  edition: "Edição Completa • Node 0.10 a 24 + Express 5, Fastify 5 & NestJS 11",
  editionPt: "Guia Interativo de Engenharia • OpenJS Foundation",
  publisher: "OpenJS Foundation / Runtime Press",
  publicationYear: 2025,
  authors: [
    {
      name: "Ryan Dahl",
      role: "Criador Original do Node.js (2009)",
      bio: "Engenheiro de sistemas que revolucionou o desenvolvimento backend em 2009 ao combinar o motor JavaScript V8 do Google com um loop de eventos assíncrono não-bloqueante (libev/libuv), provando que servidores de I/O massivamente concorrentes não deveriam bloquear threads em operações de rede ou disco.",
      avatar: "RD"
    },
    {
      name: "Matteo Collina",
      role: "Node.js TSC Member, Co-criador do Fastify, Pino & Undici",
      bio: "Membro do Technical Steering Committee (TSC) do Node.js, Ph.D. em sistemas distribuídos, mantenedor das Readable Streams do Node core, autor do cliente HTTP de alta performance Undici (motor do fetch nativo) e co-criador do framework Fastify e do logger Pino.",
      avatar: "MC"
    },
    {
      name: "Kamil Mysliwiec",
      role: "Criador do NestJS & Arquiteto de Sistemas Enterprise",
      bio: "Criador do framework NestJS, que estabeleceu o padrão de arquitetura modular, Injeção de Dependência (IoC), Decorators e abstração de transporte (HTTP Express/Fastify, gRPC, Kafka, RabbitMQ) para aplicações corporativas em TypeScript e Node.js.",
      avatar: "KM"
    },
    {
      name: "Equipe OpenJS & Core Contributors",
      role: "Technical Steering Committee (V8, libuv, Express, Koa & Hono)",
      bio: "Comunidade de engenharia responsável pela evolução contínua do runtime: unificação io.js, calendário LTS, N-API, Worker Threads, AsyncLocalStorage, Test Runner nativo, require(esm), Type Stripping nativo e modernização do Express 5 e Hono.",
      avatar: "OJ"
    }
  ],
  forewordBy:
    "OpenJS Technical Steering Committee (Sobre o equilíbrio único entre inovação de alta velocidade e retrocompatibilidade rigorosa em milhões de pacotes npm)",
  inspiration:
    "Documentação Oficial do Node.js (nodejs.org), Especificações libuv & V8, Express 5 Migration Guide, Fastify V5 Architecture e NestJS V11 Official Docs",
  corePrinciples: [
    {
      id: "non-blocking-event-loop",
      title: "1. I/O Não-Bloqueante Orientado a Eventos (V8 + libuv)",
      description:
        "Nunca bloqueie a thread principal do Event Loop. Operações de rede usam multiplexação assíncrona do kernel (epoll/kqueue/IOCP), enquanto disco, DNS e criptografia usam a Thread Pool da libuv ou Worker Threads.",
      summary:
        "O Node.js processa dezenas de milhares de conexões simultâneas em uma única thread JavaScript delegando I/O de rede para chamadas não-bloqueantes do sistema operacional e isolando tarefas pesadas de CPU em Worker Threads.",
      benefits: [
        "Elimina o custo de memória de alocar 2 MB de stack por conexão concorrente (problema C10K).",
        "Ausência de deadlocks de locks de memória compartilhada no código de negócio padrão.",
        "Previsibilidade do ciclo de execução através das 6 fases determinísticas do Event Loop."
      ],
      badPractice: "const data = fs.readFileSync('/big.json'); JSON.parse(data); // Trava todas as requisições HTTP ativas!",
      goodPractice: "await pipeline(fs.createReadStream('/big.json'), transformStream, res); // I/O não-bloqueante com backpressure"
    },
    {
      id: "streams-and-backpressure",
      title: "2. Streams em Chunks e Controle Automático de Backpressure",
      description:
        "Processe volumes de dados de qualquer tamanho em pedaços (chunks) constantes na memória RAM, respeitando o limite highWaterMark e pausando a fonte quando o consumidor estiver lento.",
      summary:
        "Carregar arquivos ou payloads inteiros na memória com fs.readFile() multiplica o consumo de RAM pelo número de usuários simultâneos. O uso de stream.pipeline() garante fluxo controlado e limpeza automática de descritores em caso de erro.",
      benefits: [
        "Consumo de memória constante O(1) mesmo ao transferir arquivos de 50 GB.",
        "Prevenção automática contra vazamento de memória quando o cliente HTTP tem conexão lenta.",
        "Destruição garantida de sockets e arquivos abertos caso qualquer etapa do pipeline falhe."
      ],
      badPractice: "req.pipe(transform).pipe(res); // Se 'res' fechar prematuramente, 'req' e 'transform' vazam na memória!",
      goodPractice: "await pipeline(req, transform, res); // Captura erros e destrói todos os streams da cadeia com segurança"
    },
    {
      id: "abi-and-backward-compatibility",
      title: "3. Retrocompatibilidade Rigorosa, LTS e Estabilidade Binária (Node-API)",
      description:
        "Evoluir do Node 0.10 ao Node 24 preservando milhões de pacotes através do calendário LTS, códigos de erro imutáveis (ERR_*), depreciações graduais (DEP*) e ABI estável com Node-API.",
      summary:
        "Cada mudança no Node core passa por estágios de maturidade (Experimental -> Active LTS -> Maintenance) e testes no CITGM (Canary in the Gold Mine) contra os pacotes mais baixados do npm antes de ser lançada.",
      benefits: [
        "Addons nativos C/C++/Rust compilados contra Node-API funcionam sem recompilação entre versões principais do Node.",
        "Depreciações de runtime (--pending-deprecation, --throw-deprecation) permitem migrações planejadas sem paradas em produção.",
        "Interoperabilidade histórica no Node 22/24 com require(esm) unificando de vez CommonJS e ES Modules."
      ],
      badPractice: "if (err.message.includes('Invalid argument')) // Frágil entre versões do Node",
      goodPractice: "if (err.code === 'ERR_INVALID_ARG_TYPE') // Contrato semântico estável garantido pelo Node core"
    },
    {
      id: "batteries-included-modern-runtime",
      title: "4. Runtime Moderno Batteries-Included (Zero Dependências Desnecessárias)",
      description:
        "A partir do Node 18, 20, 22 e 24, o próprio runtime fornece nativamente fetch(), Test Runner (node:test), --watch, --env-file, --permission, WebSocket, SQLite (node:sqlite) e execução direta de TypeScript.",
      summary:
        "Reduza drasticamente a superfície de ataque de supply-chain (node_modules inchados) substituindo pacotes externos triviais por APIs nativas mantidas e otimizadas em C++/Rust dentro do próprio binário do Node.js.",
      benefits: [
        "Elimina dezenas de dependências transitivas (dotenv, rimraf, glob, node-fetch, nodemon, chalk, cross-env).",
        "Inicialização mais rápida, menor imagem Docker e auditorias de segurança (npm audit) limpas.",
        "Alinhamento com padrões Web (WHATWG URL, Fetch, Web Streams, Web Crypto, AbortController)."
      ],
      badPractice: "Instalar dotenv, nodemon, node-fetch, rimraf, glob e uuid para um projeto novo em Node 22+",
      goodPractice: "Usar node --env-file=.env --watch, fetch() global, fs.rmSync({ recursive: true }), fs.glob() e crypto.randomUUID()"
    },
    {
      id: "async-context-and-observability",
      title: "5. Observabilidade, Isolamento de Contexto (AsyncLocalStorage) e Segurança",
      description:
        "Rastreie transações distribuídas sem acoplamento usando AsyncLocalStorage, proteja processos com o Permission Model (--permission) e isole CPU pesada em Worker Threads.",
      summary:
        "Sistemas modernos exigem logs estruturados (Pino), correlação automática de traceId/requestId através de operações assíncronas e encerramento limpo (Graceful Shutdown) mediante sinais SIGTERM em Kubernetes.",
      benefits: [
        "Propagação transparente de Correlation ID e transações de banco sem passar 'ctx' em todas as funções.",
        "Isolamento real de CPU com Worker Threads compartilhando memória via SharedArrayBuffer quando necessário.",
        "Defesa em profundidade com node --permission restringindo acesso ao sistema de arquivos e processos filhos."
      ],
      badPractice: "let currentUserId = req.user.id; // Variável global sobrescrita por requisições concorrentes (Race Condition)!",
      goodPractice: "requestContext.run({ userId: req.user.id, traceId }, () => next()); // Isolado via AsyncLocalStorage"
    },
    {
      id: "framework-architecture-fit",
      title: "6. Escolha Consciente de Frameworks: Express 5, Fastify 5, NestJS 11 & Hono 4",
      description:
        "Compreenda a evolução histórica e os trade-offs arquiteturais de cada framework HTTP: simplicidade clássica (Express 5), throughput e JSON Schema JIT (Fastify 5), governança modular e DI (NestJS 11) ou portabilidade Edge/Web Standards (Hono 4).",
      summary:
        "Não existe bala de prata: conhecer o pipeline interno de middlewares (linear vs Onion Model vs Hooks lifecycle vs DI Container) permite escolher e migrar frameworks com segurança total.",
      benefits: [
        "Migração segura de Express 4 para Express 5 dominando a captura automática de Promises e novas regras de rotas.",
        "Aproveitamento máximo de validação e serialização compilada com Fastify 5 e Type Providers.",
        "Arquitetura corporativa escalável e testável com NestJS 11 ou portabilidade multi-runtime com Hono 4."
      ],
      badPractice: "Usar Express 4 com async (req, res) => { await db.Fail(); } sem try/catch (trava a requisição ou derruba o processo)",
      goodPractice: "Usar Express 5, Fastify 5, NestJS 11 ou Hono 4 onde Promises rejeitadas fluem nativamente para a camada de erro"
    }
  ],
  nodeVersionsMatrix,
  nodeFrameworksHistory
};

export const bookOverview = nodeBookOverview;
