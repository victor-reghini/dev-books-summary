/**
 * Especificação de Animação Interativa Passo a Passo para os 12 Capítulos de "Node.js: Guia Completo de Versões, Event Loop & Frameworks".
 * Compatível com o motor Protocol Explorer (pattern-visualizer.js): Topologia SVG,
 * Pacotes Animados, Call Stack e Inspetor de Estado JSON em Tempo Real.
 */

export const nodeAnimations = {
  "nd-cap-1": {
    code: "N01",
    layerIndex: 1,
    scopeType: "Event Loop, libuv & Streams",
    nodes: [
      { id: "V8CallStack", label: "V8 Call Stack & Microtasks", stereo: "«engine»", x: 130, y: 120, addr: "0xND01", methods: ["runScript()", "drainNextTick()", "drainPromises()"] },
      { id: "EventLoopPhases", label: "libuv Event Loop (6 Fases)", stereo: "«reactor»", x: 440, y: 80, addr: "0xND02", methods: ["timers()", "poll()", "check()"] },
      { id: "LibuvThreadPool", label: "libuv Thread Pool (4..1024)", stereo: "«workers»", x: 440, y: 240, addr: "0xND03", methods: ["uv_fs_read()", "crypto_pbkdf2()", "dns_lookup()"] },
      { id: "StreamPipe", label: "Readable.pipe(Writable)", stereo: "«stream»", x: 750, y: 160, addr: "0xND04", methods: ["push(chunk)", "write(chunk)", "pauseOnBackpressure()"] }
    ],
    links: [
      { from: "V8CallStack", to: "EventLoopPhases", label: "1. agenda timers / I/O" },
      { from: "EventLoopPhases", to: "LibuvThreadPool", label: "2. delega fs / crypto" },
      { from: "LibuvThreadPool", to: "EventLoopPhases", label: "3. enfileira poll cb" },
      { from: "EventLoopPhases", to: "StreamPipe", label: "4. flui chunk c/ backpressure" }
    ],
    steps: [
      {
        title: "Execução Síncrona no V8 e Drenagem de process.nextTick()",
        narration: "O script inicializa no V8, registra callbacks de I/O e agenda um process.nextTick(). Antes do Event Loop entrar na primeira fase (timers), a fila nextTickQueue e a microtask queue de Promises são completamente drenadas.",
        from: "V8CallStack", to: "EventLoopPhases", call: "bootstrap() -> drainNextTickQueue()",
        activeNodes: ["V8CallStack", "EventLoopPhases"],
        stack: ["main()", "require('node:fs')", "process.nextTick(cb)"],
        state: { faseAtual: "bootstrap -> microtasks", nextTickQueue: 1, promiseMicrotasks: 0, eventLoopBlocked: false }
      },
      {
        title: "Delegação de I/O de Arquivo para a Thread Pool da libuv",
        narration: "Enquanto sockets TCP usam epoll/kqueue direto no kernel, a leitura de arquivo via fs.createReadStream despacha tarefas C++ para uma das 4 threads padrão da libuv (configurável via UV_THREADPOOL_SIZE).",
        from: "EventLoopPhases", to: "LibuvThreadPool", call: "uv_queue_work(UV_FS_READ, 64KB)",
        activeNodes: ["EventLoopPhases", "LibuvThreadPool"],
        stack: ["EventLoop::poll()", "uv__fs_work() [Thread #1]"],
        state: { uvThreadPoolSize: 4, threadsOcupadas: 1, operacao: "fs.read(64KB)", mainThreadStatus: "Livre para novas conexões" }
      },
      {
        title: "Conclusão na Thread Pool e Retorno na Fase Poll",
        narration: "A thread da libuv conclui a leitura do bloco de disco e sinaliza o Event Loop. Na fase Poll, o callback Error-First (err, chunk) é empilhado no V8 para processamento imediato.",
        from: "LibuvThreadPool", to: "EventLoopPhases", call: "onReadComplete(null, Buffer<64KB>)",
        activeNodes: ["LibuvThreadPool", "EventLoopPhases"],
        stack: ["uv__io_poll()", "Readable.push(chunk)"],
        state: { faseAtual: "poll", erro: null, bytesLidos: 65536, proximoPasso: "check (setImmediate)" }
      },
      {
        title: "Controle Automático de Backpressure no .pipe()",
        narration: "A Readable Stream envia o chunk para a Writable Stream (socket HTTP lento). Quando o buffer interno do socket atinge o highWaterMark, writable.write(chunk) retorna false e pausa a fonte de leitura automaticamente.",
        from: "EventLoopPhases", to: "StreamPipe", call: "writable.write(chunk) -> false (Backpressure!)",
        activeNodes: ["EventLoopPhases", "StreamPipe"],
        stack: ["Readable.pipe()", "Writable.write() -> false", "Readable.pause()"],
        state: { highWaterMark: "64 KiB", writableBufferFull: true, readableFlowing: false, memoriaRAM: "Estável O(1)" }
      },
      {
        title: "Evento 'drain' e Fase Check (setImmediate)",
        narration: "Assim que o cliente HTTP consome os pacotes da rede, o socket emite o evento 'drain', retomando a leitura (readable.resume()). Em seguida, o Event Loop avança da fase Poll para a fase Check executando setImmediate().",
        from: "StreamPipe", to: "V8CallStack", call: "emit('drain') -> readable.resume()",
        activeNodes: ["StreamPipe", "V8CallStack"],
        stack: ["Writable.emit('drain')", "Readable.resume()", "EventLoop::check()"],
        state: { faseAtual: "check", writableBufferFull: false, readableFlowing: true, cicloCompleto: true }
      }
    ]
  },

  "nd-cap-2": {
    code: "N02",
    layerIndex: 1,
    scopeType: "Node 4 & 6 LTS • Buffer Seguro",
    nodes: [
      { id: "IncomingPayload", label: "Payload de Entrada JSON", stereo: "«input»", x: 130, y: 140, addr: "0xND05", methods: ["parseInput()", "validateType()"] },
      { id: "LegacyBuffer", label: "new Buffer(arg) [DEP0005]", stereo: "«deprecated»", x: 440, y: 70, addr: "0xND06", methods: ["new Buffer(100) // INSEGURO"] },
      { id: "SafeBufferAPI", label: "Buffer.from / Buffer.alloc", stereo: "«secure»", x: 440, y: 240, addr: "0xND07", methods: ["Buffer.from(str, 'utf8')", "Buffer.alloc(size)"] },
      { id: "MemorySlab", label: "Alocador C++ Slab (Zero-Filled)", stereo: "«memory»", x: 750, y: 160, addr: "0xND08", methods: ["calloc(size, 0x00)", "slicePool()"] }
    ],
    links: [
      { from: "IncomingPayload", to: "LegacyBuffer", label: "1. perigo polimórfico (número)" },
      { from: "IncomingPayload", to: "SafeBufferAPI", label: "2. fábrica explícita" },
      { from: "SafeBufferAPI", to: "MemorySlab", label: "3. aloca RAM zerada" },
      { from: "MemorySlab", to: "IncomingPayload", label: "4. retorna Uint8Array seguro" }
    ],
    steps: [
      {
        title: "Recebimento de Payload e Risco de Tipo Polimórfico",
        narration: "Um endpoint recebe um campo JSON do cliente. Se o atacante enviar um número inteiro (ex: 128) em vez de uma string, o código precisa evitar a alocação acidental de memória não-inicializada.",
        from: "IncomingPayload", to: "LegacyBuffer", call: "inspecionarEntrada({ data: 128 })",
        activeNodes: ["IncomingPayload", "LegacyBuffer"],
        stack: ["handleRequest()", "JSON.parse(body)"],
        state: { tipoRecebido: "number (128)", riscoLegado: "new Buffer(128) vazava RAM no Node <= 4.4", codigoAviso: "DEP0005" }
      },
      {
        title: "Bloqueio do Construtor Legado e Emissão de DEP0005",
        narration: "No Node 6+ (Boron LTS), o construtor new Buffer() é marcado como depreciado (DEP0005). A aplicação migra para as fábricas explícitas Buffer.from() e Buffer.alloc().",
        from: "LegacyBuffer", to: "SafeBufferAPI", call: "process.emitWarning('new Buffer() is deprecated', 'DEP0005')",
        activeNodes: ["LegacyBuffer", "SafeBufferAPI"],
        stack: ["Buffer()", "emitDeprecationWarning('DEP0005')"],
        state: { apiRecomendada: "Buffer.from() / Buffer.alloc()", zeroFillGarantido: true }
      },
      {
        title: "Alocação Zerada com Buffer.alloc(size)",
        narration: "Quando é necessário um novo buffer de tamanho fixo (128 bytes), Buffer.alloc(128) solicita ao alocador nativo C++ um bloco de memória 100% preenchido com zeros (0x00).",
        from: "SafeBufferAPI", to: "MemorySlab", call: "Buffer.alloc(128, 0x00)",
        activeNodes: ["SafeBufferAPI", "MemorySlab"],
        stack: ["Buffer.alloc(128)", "node::Buffer::NewZeroFilled(128)"],
        state: { bytesAlocados: 128, conteudoMemoria: "00 00 00 00 ... (Zero-Filled)", vazamentoDadosAntigos: "0 bytes" }
      },
      {
        title: "Codificação Explícita de Strings com Buffer.from()",
        narration: "Para converter strings em bytes, Buffer.from(texto, 'utf8') valida estritamente que o argumento não é um número isolado (lançando ERR_INVALID_ARG_TYPE se receber number) e codifica a string com segurança.",
        from: "IncomingPayload", to: "SafeBufferAPI", call: "Buffer.from('Node LTS Boron', 'utf8')",
        activeNodes: ["IncomingPayload", "SafeBufferAPI"],
        stack: ["Buffer.from(str, 'utf8')", "fromStringFast()"],
        state: { entrada: "'Node LTS Boron'", encoding: "utf8", byteLength: 14, heranca: "Uint8Array" }
      },
      {
        title: "Retorno de Instância Compatível com ES6 Uint8Array",
        narration: "O Buffer seguro é retornado como subclasse direta de Uint8Array (introduzida a partir da unificação io.js / Node 4), garantindo total interoperabilidade com TypedArrays do motor V8.",
        from: "MemorySlab", to: "IncomingPayload", call: "return SafeBuffer<14 bytes>",
        activeNodes: ["MemorySlab", "IncomingPayload"],
        stack: ["handleRequest() -> return buffer"],
        state: { statusSeguranca: "Blindado contra vazamento de RAM", instanceofUint8Array: true, versaoLTS: "Node 4 Argon / Node 6 Boron" }
      }
    ]
  },

  "nd-cap-3": {
    code: "N03",
    layerIndex: 1,
    scopeType: "Node 8 & 10 LTS • Pipeline & Node-API",
    nodes: [
      { id: "AsyncController", label: "Async/Await Controller", stereo: "«async»", x: 130, y: 140, addr: "0xND09", methods: ["await pipeline()", "await fs.promises.stat()"] },
      { id: "StreamPipeline", label: "stream.pipeline()", stereo: "«orchestrator»", x: 440, y: 80, addr: "0xND10", methods: ["pipeStreams()", "destroyAllOnError()"] },
      { id: "NodeAPIBridge", label: "Node-API (N-API ABI Estável)", stereo: "«abi»", x: 440, y: 240, addr: "0xND11", methods: ["napi_create_async_work()", "napi_get_cb_info()"] },
      { id: "NativeAddon", label: "Addon C/Rust (.node)", stereo: "«native»", x: 750, y: 160, addr: "0xND12", methods: ["compressChunk()", "cleanupHandles()"] }
    ],
    links: [
      { from: "AsyncController", to: "StreamPipeline", label: "1. inicia pipeline(src, tx, dst)" },
      { from: "StreamPipeline", to: "NodeAPIBridge", label: "2. invoca addon via N-API" },
      { from: "NodeAPIBridge", to: "NativeAddon", label: "3. chamada ABI independente V8" },
      { from: "StreamPipeline", to: "AsyncController", label: "4. fecha descritores c/ segurança" }
    ],
    steps: [
      {
        title: "Validação Prévia com fs.promises e async/await",
        narration: "No Node 8 (Carbon) e Node 10 (Dubnium), o controller usa async/await nativo e fs.promises.stat() para inspecionar o arquivo de origem sem aninhar callbacks.",
        from: "AsyncController", to: "StreamPipeline", call: "await fs.promises.stat('dados.csv')",
        activeNodes: ["AsyncController", "StreamPipeline"],
        stack: ["processFile()", "await fs.promises.stat()"],
        state: { tamanhoArquivo: "512 MB", modoExecucao: "async/await (TurboFan + Ignition)", callbackHell: "Eliminado" }
      },
      {
        title: "Montagem Segura com stream.pipeline()",
        narration: "Em vez de usar .pipe().pipe() (que vaza memória se o destino fechar prematuramente), stream.pipeline() monitora eventos 'error', 'close' e 'finish' de todas as streams da cadeia.",
        from: "StreamPipeline", to: "NodeAPIBridge", call: "pipeline(readStream, nativeTransform, writeStream)",
        activeNodes: ["StreamPipeline", "NodeAPIBridge"],
        stack: ["stream.pipeline()", "eos(stream, cleanup)"],
        state: { streamsMonitoradas: 3, autoDestroyOnError: true, memoryLeakProtection: "Ativa" }
      },
      {
        title: "Invocação de Módulo Nativo via N-API (Node-API)",
        narration: "A Transform Stream utiliza um addon nativo C/Rust para compressão rápida. Graças à N-API introduzida no Node 8/10, a chamada atravessa uma ABI C estável desacoplada da versão interna do V8.",
        from: "NodeAPIBridge", to: "NativeAddon", call: "napi_queue_async_work(env, work)",
        activeNodes: ["NodeAPIBridge", "NativeAddon"],
        stack: ["Transform._transform()", "napi_queue_async_work()"],
        state: { abiEstavel: "Node-API v8", precisaRecompilarNodeGyp: false, compativelCom: "Node 10 ao Node 24" }
      },
      {
        title: "Simulação de Desconexão Abrupta e Destruição Automática",
        narration: "Se o cliente fechar a conexão no meio da transferência, stream.pipeline() detecta o fechamento prematuro (ERR_STREAM_PREMATURE_CLOSE) e chama .destroy() imediatamente no ReadStream e no Transform.",
        from: "NativeAddon", to: "StreamPipeline", call: "onPrematureClose() -> destroyAllStreams()",
        activeNodes: ["NativeAddon", "StreamPipeline"],
        stack: ["pipeline::destroyer()", "readStream.destroy()", "writeStream.destroy()"],
        state: { descritoresAbertosRestantes: 0, codigoErroPadronizado: "ERR_STREAM_PREMATURE_CLOSE", buffersLiberados: true }
      },
      {
        title: "Resolução ou Captura Limpa no Bloco try/catch",
        narration: "A Promise do pipeline (de 'node:stream/promises') resolve após o flush completo ou rejeita com código padronizado ERR_*, permitindo tratamento estruturado em um único bloco try/catch.",
        from: "StreamPipeline", to: "AsyncController", call: "resolve() / catch(err.code)",
        activeNodes: ["StreamPipeline", "AsyncController"],
        stack: ["processFile() -> return { ok: true }"],
        state: { statusFinal: "Concluído sem vazamento de File Descriptors", errCodeStandard: "ERR_*" }
      }
    ]
  },

  "nd-cap-4": {
    code: "N04",
    layerIndex: 2,
    scopeType: "Node 12 LTS • Worker Threads & ESM",
    nodes: [
      { id: "MainEventLoop", label: "Main Thread (HTTP Event Loop)", stereo: "«main»", x: 130, y: 140, addr: "0xND13", methods: ["handleHttp()", "pool.runTask()"] },
      { id: "MessageChannel", label: "MessagePort & SharedArrayBuffer", stereo: "«ipc»", x: 440, y: 80, addr: "0xND14", methods: ["postMessage(buf, [transfer])", "Atomics.add()"] },
      { id: "WorkerIsolate", label: "Worker Thread (Novo V8 Isolate)", stereo: "«worker»", x: 440, y: 240, addr: "0xND15", methods: ["parseHeavyAST()", "computeHash()"] },
      { id: "CgroupMonitor", label: "Detector de Limites Docker (cgroups)", stereo: "«container»", x: 750, y: 160, addr: "0xND16", methods: ["readMemoryLimit()", "configureV8Heap()"] }
    ],
    links: [
      { from: "MainEventLoop", to: "CgroupMonitor", label: "1. ajusta V8 Heap p/ container" },
      { from: "MainEventLoop", to: "MessageChannel", label: "2. transfere ArrayBuffer zero-copy" },
      { from: "MessageChannel", to: "WorkerIsolate", label: "3. executa CPU-bound isolado" },
      { from: "WorkerIsolate", to: "MainEventLoop", label: "4. devolve resultado sem travar loop" }
    ],
    steps: [
      {
        title: "Boot Consciente de Containers (cgroups) e ES Modules",
        narration: "Ao iniciar em um container Kubernetes com limite de 512 MB, o Node 12 (Erbium) lê os cgroups do Linux e dimensiona a heap do V8 automaticamente, carregando módulos nativos via sintaxe ES Modules (import/export).",
        from: "MainEventLoop", to: "CgroupMonitor", call: "uv_get_constrained_memory() -> 512MB",
        activeNodes: ["MainEventLoop", "CgroupMonitor"],
        stack: ["node::Initialize()", "ConfigureV8HeapFromCgroups()"],
        state: { containerLimitMB: 512, maxOldSpaceSizeMB: 256, riscoOOMKilled137: "Mitigado", moduleSystem: "ESM (type: module)" }
      },
      {
        title: "Delegação de Tarefa Pesada de CPU sem Bloquear HTTP",
        narration: "Chega uma requisição exigindo processamento pesado de CPU (geração de relatório criptografado). Para não congelar o Event Loop principal, a Main Thread despacha o buffer para o Pool de Worker Threads.",
        from: "MainEventLoop", to: "MessageChannel", call: "worker.postMessage(payload, [payload.buffer])",
        activeNodes: ["MainEventLoop", "MessageChannel"],
        stack: ["httpHandler()", "workerPool.dispatch(buffer)"],
        state: { transferencia: "Zero-Copy (transferList)", copiaDeMemoria: "0 bytes copiados", mainEventLoopLagMs: 0.4 }
      },
      {
        title: "Processamento Paralelo Multi-Core no V8 Isolate do Worker",
        narration: "A Worker Thread possui sua própria instância isolada do motor V8 e sua própria heap, executando o cálculo intensivo em outro núcleo físico da CPU enquanto a thread principal continua respondendo healthchecks e rotas leves.",
        from: "MessageChannel", to: "WorkerIsolate", call: "parentPort.on('message', runCpuIntensiveTask)",
        activeNodes: ["MessageChannel", "WorkerIsolate"],
        stack: ["WorkerThread::run()", "runCpuIntensiveTask() [Core #2]"],
        state: { workerThreadId: 2, cpuCore: "Núcleo #2 Dedicado", sharedMemory: "Atomics.load(sab, 0)", mainThreadResponsiva: true }
      },
      {
        title: "Sincronização Atômica e Retorno do Resultado",
        narration: "Ao concluir o cálculo, o Worker atualiza o contador em SharedArrayBuffer via Atomics.add() e envia o buffer de saída de volta pelo MessagePort.",
        from: "WorkerIsolate", to: "MainEventLoop", call: "parentPort.postMessage(resultBuffer, [resultBuffer.buffer])",
        activeNodes: ["WorkerIsolate", "MainEventLoop"],
        stack: ["WorkerThread::done()", "parentPort.postMessage()"],
        state: { tarefasConcluidasAtomics: 42, tempoProcessamentoWorker: "85ms", bloqueioMainThread: "0ms" }
      },
      {
        title: "Resposta HTTP Rápida e Workers Prontos no Pool",
        narration: "A Main Thread recebe a resolução da Promise do Worker Pool e envia a resposta HTTP 200. A Worker Thread permanece aquecida no pool aguardando o próximo trabalho sem custo de recriação.",
        from: "MainEventLoop", to: "CgroupMonitor", call: "res.end(resultBuffer) -> keepWorkerWarm()",
        activeNodes: ["MainEventLoop", "CgroupMonitor"],
        stack: ["httpHandler() -> res.status(200).send()"],
        state: { statusHTTP: 200, workersAtivosNoPool: 4, tlsVersion: "TLS 1.3 (1-RTT)" }
      }
    ]
  },

  "nd-cap-5": {
    code: "N05",
    layerIndex: 2,
    scopeType: "Node 14 LTS • AsyncLocalStorage & Exports",
    nodes: [
      { id: "HttpMiddleware", label: "HTTP Request Middleware", stereo: "«entry»", x: 130, y: 140, addr: "0xND17", methods: ["als.run(store, next)"] },
      { id: "AsyncLocalStorage", label: "AsyncLocalStorage Store", stereo: "«context»", x: 440, y: 80, addr: "0xND18", methods: ["run(ctx, fn)", "getStore()"] },
      { id: "DeepService", label: "Domain Service & DB Repo", stereo: "«domain»", x: 440, y: 240, addr: "0xND19", methods: ["processOrder()", "queryDatabase()"] },
      { id: "ContextualLogger", label: "Pino Logger & Package Exports", stereo: "«observability»", x: 750, y: 160, addr: "0xND20", methods: ["logWithTraceId()", "resolveExports()"] }
    ],
    links: [
      { from: "HttpMiddleware", to: "AsyncLocalStorage", label: "1. als.run({ traceId, tenantId })" },
      { from: "AsyncLocalStorage", to: "DeepService", label: "2. propaga através de awaits" },
      { from: "DeepService", to: "ContextualLogger", label: "3. lê als.getStore() s/ parâmetros" },
      { from: "ContextualLogger", to: "HttpMiddleware", label: "4. log correlacionado e isolado" }
    ],
    steps: [
      {
        title: "Criação do Escopo Isolado por Requisição com als.run()",
        narration: "Quando a requisição HTTP entra no servidor Node 14+ (Fermium), o middleware gera um requestId único e executa o restante da cadeia dentro de asyncLocalStorage.run({ requestId, tenantId }, next).",
        from: "HttpMiddleware", to: "AsyncLocalStorage", call: "als.run({ requestId: 'req-99', tenant: 'acme' }, next)",
        activeNodes: ["HttpMiddleware", "AsyncLocalStorage"],
        stack: ["traceMiddleware()", "AsyncLocalStorage.run()"],
        state: { requestId: "req-99", tenantId: "acme", requisicoesSimultaneasNoLoop: 250, acoplamentoAssinatura: "Zero" }
      },
      {
        title: "Preservação Automática do Contexto Através de Awaits e Timers",
        narration: "A execução passa por múltiplos awaits de banco de dados, chamadas HTTP e Promises intercaladas com outras 249 requisições concorrentes. O runtime preserva o ponteiro do store correto para cada continuação assíncrona.",
        from: "AsyncLocalStorage", to: "DeepService", call: "await orderService.createOrder(dto)",
        activeNodes: ["AsyncLocalStorage", "DeepService"],
        stack: ["OrderController.post()", "await OrderService.createOrder()", "await DbRepo.save()"],
        state: { asyncResourceId: 8421, storePreservado: { requestId: "req-99", tenantId: "acme" }, raceCondition: "Nenhuma" }
      },
      {
        title: "Recuperação Direta com als.getStore() no Repositório e Logger",
        narration: "Nas camadas mais profundas de banco de dados e auditoria, o logger recupera o requestId e o tenantId chamando diretamente als.getStore()?.requestId, sem que nenhuma função intermediária precisasse receber 'ctx' como argumento.",
        from: "DeepService", to: "ContextualLogger", call: "const { requestId } = als.getStore() ?? {}",
        activeNodes: ["DeepService", "ContextualLogger"],
        stack: ["DbRepo.save()", "logger.info()", "als.getStore()"],
        state: { logEmitido: { level: "info", requestId: "req-99", tenantId: "acme", msg: "Pedido gravado" } }
      },
      {
        title: "Validação de Encapsulamento Estrito via Package 'exports'",
        narration: "Ao importar módulos do pacote de domínio, o resolvedor do Node 14+ verifica o campo 'exports' do package.json, permitindo subpaths públicos e bloqueando tentativas de importar arquivos privados internos.",
        from: "ContextualLogger", to: "DeepService", call: "resolvePackageTarget('./exports', ['node', 'import'])",
        activeNodes: ["ContextualLogger", "DeepService"],
        stack: ["PACKAGE_EXPORTS_RESOLVE()", "checkConditions(['types', 'import', 'require'])"],
        state: { subpathPublico: "pkg/logger -> Permitido", subpathPrivado: "pkg/internal/secret -> Bloqueado (ERR_PACKAGE_PATH_NOT_EXPORTED)" }
      },
      {
        title: "Encerramento Limpo do Contexto Assíncrono",
        narration: "A resposta HTTP é enviada ao cliente com o cabeçalho X-Request-Id: req-99 e a referência ao store daquela requisição é coletada automaticamente pelo Garbage Collector.",
        from: "ContextualLogger", to: "HttpMiddleware", call: "res.setHeader('x-request-id', 'req-99') -> end()",
        activeNodes: ["ContextualLogger", "HttpMiddleware"],
        stack: ["traceMiddleware() -> complete"],
        state: { headerEnviado: "x-request-id: req-99", memoriaContextoLiberada: true }
      }
    ]
  },

  "nd-cap-6": {
    code: "N06",
    layerIndex: 2,
    scopeType: "Node 16 LTS • AbortController & node: Prefix",
    nodes: [
      { id: "ApiGateway", label: "Gateway Handler (node: Prefix)", stereo: "«caller»", x: 130, y: 140, addr: "0xND21", methods: ["import 'node:timers/promises'", "AbortSignal.any()"] },
      { id: "AbortCoord", label: "AbortController & Timeout Signal", stereo: "«signal»", x: 440, y: 80, addr: "0xND22", methods: ["AbortSignal.timeout(2000)", "controller.abort()"] },
      { id: "DownstreamIO", label: "Operações fetch() & stream", stereo: "«io»", x: 440, y: 240, addr: "0xND23", methods: ["fetch(url, { signal })", "pipeline(src, dst, { signal })"] },
      { id: "ProcessGuard", label: "Guard unhandledRejection", stereo: "«safety»", x: 750, y: 160, addr: "0xND24", methods: ["catchAbortError()", "preventExitCode1()"] }
    ],
    links: [
      { from: "ApiGateway", to: "AbortCoord", label: "1. cria AbortSignal.timeout(2000)" },
      { from: "AbortCoord", to: "DownstreamIO", label: "2. propaga { signal } p/ I/O" },
      { from: "AbortCoord", to: "DownstreamIO", label: "3. dispara evento 'abort'" },
      { from: "DownstreamIO", to: "ProcessGuard", label: "4. trata AbortError c/ segurança" }
    ],
    steps: [
      {
        title: "Importação Blindada com Prefixo 'node:' e Criação de Sinais",
        narration: "O módulo utiliza imports explícitos com esquema 'node:' (node:timers/promises, node:crypto) imunes a typosquatting no node_modules, e cria um sinal combinado de cancelamento com limite de 2000ms.",
        from: "ApiGateway", to: "AbortCoord", call: "AbortSignal.any([reqDisconnectSig, AbortSignal.timeout(2000)])",
        activeNodes: ["ApiGateway", "AbortCoord"],
        stack: ["gatewayHandler()", "AbortSignal.timeout(2000)"],
        state: { prefixoSeguro: "node:timers/promises & node:crypto", timeoutConfiguradoMs: 2000, signalAborted: false }
      },
      {
        title: "Propagação do AbortSignal para Chamadas Externas e Streams",
        narration: "O objeto { signal } é passado simultaneamente para a chamada HTTP externa e para o timer assíncrono await setTimeout(500, 'ok', { signal }).",
        from: "AbortCoord", to: "DownstreamIO", call: "fetch(serviceUrl, { signal })",
        activeNodes: ["AbortCoord", "DownstreamIO"],
        stack: ["gatewayHandler()", "fetch(url, { signal })"],
        state: { operacaoEmCurso: "GET https://api.parceiro.interno/cotacao", listenersRegistradosNoSignal: 1 }
      },
      {
        title: "Estouro de Tempo Limite ou Desconexão do Cliente (Abort!)",
        narration: "O serviço parceiro demora mais de 2000ms para responder. O AbortSignal dispara automaticamente o evento 'abort' com reason: TimeoutError, interrompendo imediatamente o socket HTTP e liberando descritores.",
        from: "AbortCoord", to: "DownstreamIO", call: "signal.dispatchEvent('abort') -> abortSocket()",
        activeNodes: ["AbortCoord", "DownstreamIO"],
        stack: ["Timer::onTimeout()", "AbortSignal::abort(DOMException: TimeoutError)"],
        state: { signalAborted: true, abortReason: "TimeoutError: The operation was aborted due to timeout", socketDestruido: true }
      },
      {
        title: "Captura Obrigatória da Rejeição (Evitando Exit Code 1 no Node 16+)",
        narration: "A partir do Node 16 LTS, qualquer Promise rejeitada sem catch derruba o processo com exit code 1. O bloco try/catch captura a rejeição imediatamente e verifica se err.name === 'TimeoutError' ou 'AbortError'.",
        from: "DownstreamIO", to: "ProcessGuard", call: "catch (err) { if (err.name === 'TimeoutError') ... }",
        activeNodes: ["DownstreamIO", "ProcessGuard"],
        stack: ["gatewayHandler() -> catch(err)", "handleGracefulFallback(err)"],
        state: { unhandledRejection: false, erroCapturado: "TimeoutError", processoEstavel: true }
      },
      {
        title: "Resposta Fallback Controlada (HTTP 504 Gateway Timeout)",
        narration: "Com os recursos de rede limpos e a exceção tratada, o Gateway retorna um fallback rápido (ou HTTP 504) mantendo a saúde do servidor intacta.",
        from: "ProcessGuard", to: "ApiGateway", call: "return { status: 504, fallback: true }",
        activeNodes: ["ProcessGuard", "ApiGateway"],
        stack: ["gatewayHandler() -> return 504"],
        state: { statusHTTP: 504, conexoesOrfas: 0, webCryptoUUID: "crypto.randomUUID()" }
      }
    ]
  },

  "nd-cap-7": {
    code: "N07",
    layerIndex: 3,
    scopeType: "Node 18 LTS • Undici Fetch & node:test",
    nodes: [
      { id: "TestRunner", label: "Test Runner Nativo (node:test)", stereo: "«runner»", x: 130, y: 140, addr: "0xND25", methods: ["describe()", "it()", "mock.method()"] },
      { id: "UndiciFetch", label: "Global fetch() (Motor Undici)", stereo: "«http»", x: 440, y: 80, addr: "0xND26", methods: ["fetch(url)", "ConnectionPool.dispatch()"] },
      { id: "WebStreamsBridge", label: "Web Streams & structuredClone", stereo: "«standards»", x: 440, y: 240, addr: "0xND27", methods: ["Readable.fromWeb()", "structuredClone(data)"] },
      { id: "OpenSSL3Engine", label: "OpenSSL 3.0 & Assert Strict", stereo: "«security»", x: 750, y: 160, addr: "0xND28", methods: ["verifyTLS()", "assert.deepStrictEqual()"] }
    ],
    links: [
      { from: "TestRunner", to: "UndiciFetch", label: "1. executa teste c/ fetch()" },
      { from: "UndiciFetch", to: "OpenSSL3Engine", label: "2. negocia TLS via OpenSSL 3.0" },
      { from: "UndiciFetch", to: "WebStreamsBridge", label: "3. converte WebStream e clona" },
      { from: "WebStreamsBridge", to: "TestRunner", label: "4. valida assert.deepStrictEqual" }
    ],
    steps: [
      {
        title: "Inicialização da Suíte com node --test --watch",
        narration: "No Node 18 LTS (Hydrogen), o comando nativo 'node --test' descobre e executa os testes em sub-processos isolados usando describe(), it() e t.mock sem depender de Jest ou Mocha.",
        from: "TestRunner", to: "UndiciFetch", call: "node --test -> test('deve buscar catálogo via fetch nativo')",
        activeNodes: ["TestRunner", "UndiciFetch"],
        stack: ["node:test::run()", "describe('Catálogo API')", "it('busca itens')"],
        state: { dependenciasExternasDeTeste: 0, watchModeAtivo: true, testMocksAtivos: 1 }
      },
      {
        title: "Disparo de fetch() Global sobre o Pool Undici e OpenSSL 3.0",
        narration: "A função chama o fetch() global nativo. Por baixo do capô, o motor Undici reutiliza conexões HTTP Keep-Alive em pool e valida a cifra TLS usando o OpenSSL 3.0 (que bloqueia hashes obsoletos como MD4).",
        from: "UndiciFetch", to: "OpenSSL3Engine", call: "undici.fetch('https://api.loja.com/itens')",
        activeNodes: ["UndiciFetch", "OpenSSL3Engine"],
        stack: ["globalThis.fetch()", "Undici::Pool::dispatch()", "OpenSSL3::Handshake()"],
        state: { motorHttp: "Undici (Nativo)", opensslVersion: "3.0.x (FIPS Ready)", keepAliveReused: true }
      },
      {
        title: "Consumo de Web Stream e Cópia Profunda com structuredClone()",
        narration: "O corpo da resposta chega como uma Web ReadableStream padrão WHATWG. O serviço consome o JSON e cria uma cópia imutável profunda (incluindo objetos Date e Map) usando structuredClone() nativo.",
        from: "UndiciFetch", to: "WebStreamsBridge", call: "const copia = structuredClone(await res.json())",
        activeNodes: ["UndiciFetch", "WebStreamsBridge"],
        stack: ["Response.json()", "globalThis.structuredClone(payload)"],
        state: { responseOk: true, status: 200, clonagemProfunda: "structuredClone (suporta Map/Set/Date/Circular)" }
      },
      {
        title: "Asserção Estrita com node:assert/strict e Inspecão de Mocks",
        narration: "O teste verifica o resultado com assert.deepStrictEqual() e inspeciona quantas vezes o método espião foi invocado através de fnMock.mock.callCount().",
        from: "WebStreamsBridge", to: "TestRunner", call: "assert.strictEqual(mockFn.mock.callCount(), 1)",
        activeNodes: ["WebStreamsBridge", "TestRunner"],
        stack: ["it('busca itens')", "assert.deepStrictEqual(copia, esperado)"],
        state: { mockCallCount: 1, assertionPassed: true, parseArgsCLI: "util.parseArgs()" }
      },
      {
        title: "Relatório TAP/Spec Nativo e Cobertura de Código",
        narration: "O Test Runner encerra a execução exibindo o relatório formatado no terminal com tempo de execução em milissegundos e 100% de aprovação.",
        from: "TestRunner", to: "OpenSSL3Engine", call: "reporter.spec() -> ✔ 1 passing (12ms)",
        activeNodes: ["TestRunner", "OpenSSL3Engine"],
        stack: ["node:test::summary() -> exit(0)"],
        state: { testsPassed: 1, testsFailed: 0, exitCode: 0 }
      }
    ]
  },

  "nd-cap-8": {
    code: "N08",
    layerIndex: 3,
    scopeType: "Node 20 LTS • Permission Model & --env-file",
    nodes: [
      { id: "RuntimeBoot", label: "Boot CLI (--env-file & --permission)", stereo: "«cli»", x: 130, y: 140, addr: "0xND29", methods: ["loadEnvFile('.env')", "enablePermissionModel()"] },
      { id: "PermissionGuard", label: "Guard de Capacidades (process.permission)", stereo: "«sandbox»", x: 440, y: 80, addr: "0xND30", methods: ["has('fs.read', path)", "has('child', cmd)"] },
      { id: "EsmAppModule", label: "Módulo ESM (import.meta.dirname)", stereo: "«module»", x: 440, y: 240, addr: "0xND31", methods: ["import.meta.dirname", "arr.toSorted()"] },
      { id: "IsolatedLoader", label: "Worker Thread de module.register()", stereo: "«loader»", x: 750, y: 160, addr: "0xND32", methods: ["resolve(specifier)", "load(url)"] }
    ],
    links: [
      { from: "RuntimeBoot", to: "PermissionGuard", label: "1. carrega .env e trava permissões" },
      { from: "RuntimeBoot", to: "IsolatedLoader", label: "2. isola hooks ESM em thread dedicada" },
      { from: "PermissionGuard", to: "EsmAppModule", label: "3. valida leitura em import.meta.dirname" },
      { from: "EsmAppModule", to: "PermissionGuard", label: "4. bloqueia escrita não autorizada" }
    ],
    steps: [
      {
        title: "Carregamento C++ de .env Antes da Inicialização da VM",
        narration: "O Node 20 LTS (Iron) processa --env-file=.env em C++ antes mesmo de configurar o V8 e a libuv, aplicando inclusive NODE_OPTIONS e UV_THREADPOOL_SIZE declarados dentro do arquivo .env!",
        from: "RuntimeBoot", to: "PermissionGuard", call: "node --env-file=.env --permission --allow-fs-read=./app",
        activeNodes: ["RuntimeBoot", "PermissionGuard"],
        stack: ["node::LoadEnvironment()", "DotEnv::ParseFile('.env')"],
        state: { dotenvExternoNecessario: false, variaveisCarregadas: ["PORT", "DATABASE_URL", "NODE_OPTIONS"], permissionModel: "Ativo" }
      },
      {
        title: "Inicialização de Hooks de Instrumentação em Thread Isolada",
        narration: "Se a aplicação registrar hooks de carregamento ESM via module.register(), o Node 20+ executa esses hooks em uma thread separada para impedir que instrumentações contaminem o escopo global da aplicação.",
        from: "RuntimeBoot", to: "IsolatedLoader", call: "module.register('./otel-hook.mjs', import.meta.url)",
        activeNodes: ["RuntimeBoot", "IsolatedLoader"],
        stack: ["HooksThread::start()", "register('./otel-hook.mjs')"],
        state: { loaderThreadIsolada: true, v8MaglevJIT: "Habilitado", urlCanParse: "URL.canParse() disponível" }
      },
      {
        title: "Leitura Autorizada Usando import.meta.dirname",
        narration: "O módulo ESM localiza um arquivo de configuração usando a nova propriedade nativa import.meta.dirname. O Permission Guard verifica que o caminho está dentro de ./app e autoriza a leitura.",
        from: "PermissionGuard", to: "EsmAppModule", call: "process.permission.has('fs.read', import.meta.dirname) -> true",
        activeNodes: ["PermissionGuard", "EsmAppModule"],
        stack: ["loadConfig()", "fs.readFileSync(path.join(import.meta.dirname, 'config.json'))"],
        state: { caminhoSolicitado: "/app/config.json", permissaoFsRead: true, imutabilidadeArray: "items.toSorted()" }
      },
      {
        title: "Intercepção e Bloqueio de Acesso Não Autorizado (ERR_ACCESS_DENIED)",
        narration: "Uma dependência de terceiros tenta ler /etc/passwd ou disparar um child_process.exec('sh'). O Permission Model intercepta a syscall em nível de runtime e bloqueia instantaneamente com ERR_ACCESS_DENIED.",
        from: "EsmAppModule", to: "PermissionGuard", call: "fs.readFile('/etc/passwd') -> throw ERR_ACCESS_DENIED",
        activeNodes: ["EsmAppModule", "PermissionGuard"],
        stack: ["maliciousPkg()", "node::permission::Check() -> BLOCKED"],
        state: { tentativaBloqueada: "/etc/passwd & child_process", codigoErro: "ERR_ACCESS_DENIED", ataqueSupplyChainMitigado: true }
      },
      {
        title: "Execução Segura ou Empacotamento em Binário Único (SEA)",
        narration: "A aplicação segue operando sob o princípio do menor privilégio e pode ser distribuída como um Single Executable Application (SEA) autônomo.",
        from: "PermissionGuard", to: "RuntimeBoot", call: "auditLog('Runtime protegido com sucesso')",
        activeNodes: ["PermissionGuard", "RuntimeBoot"],
        stack: ["server.listen(3000)"],
        state: { statusRuntime: "Protegido (--permission)", seaReady: true, nodeVersion: "Node 20 LTS (Iron)" }
      }
    ]
  },

  "nd-cap-9": {
    code: "N09",
    layerIndex: 3,
    scopeType: "Node 22 LTS & 24 • require(esm), TS & SQLite",
    nodes: [
      { id: "TypeStripper", label: "Executor TS Nativo (Type Stripping)", stereo: "«typescript»", x: 130, y: 140, addr: "0xND33", methods: ["node app.ts", "stripTypesInMemory()"] },
      { id: "ModuleBridge", label: "Interoperabilidade require(esm)", stereo: "«loader»", x: 440, y: 80, addr: "0xND34", methods: ["require('./esm-mod.mjs')", "checkNoTopLevelAwait()"] },
      { id: "NodeSqlite", label: "Banco Embutido (node:sqlite)", stereo: "«database»", x: 440, y: 240, addr: "0xND35", methods: ["new DatabaseSync(':memory:')", "stmt.all()"] },
      { id: "CliFormatter", label: "util.styleText & fs.glob", stereo: "«utilities»", x: 750, y: 160, addr: "0xND36", methods: ["styleText(['green'], msg)", "fs.globSync('*.ts')"] }
    ],
    links: [
      { from: "TypeStripper", to: "ModuleBridge", label: "1. executa .ts direto s/ build" },
      { from: "ModuleBridge", to: "NodeSqlite", label: "2. carrega ESM síncrono e abre SQLite" },
      { from: "NodeSqlite", to: "CliFormatter", label: "3. executa query preparada" },
      { from: "CliFormatter", to: "TypeStripper", label: "4. formata saída com util.styleText" }
    ],
    steps: [
      {
        title: "Execução Direta de Arquivo TypeScript (node server.ts)",
        narration: "No Node 22.6+ / Node 23.6+ / Node 24, o runtime lê o arquivo .ts diretamente e remove as anotações de tipos em memória (Type Stripping via SWC/Amaro) substituindo-as por espaços em branco para manter números de linha exatos nos stack traces.",
        from: "TypeStripper", to: "ModuleBridge", call: "node server.ts -> stripTypesPreservingLineNumbers()",
        activeNodes: ["TypeStripper", "ModuleBridge"],
        stack: ["node::loader::CompileTypeScript()", "stripTypes('server.ts')"],
        state: { buildStepExterno: "Nenhum (Zero transpilação em disco)", stackTraceLineNumbers: "Preservados 1:1", erasableSyntaxOnly: true }
      },
      {
        title: "Carregamento Síncrono de Módulo ES via require(esm)",
        narration: "Um módulo CommonJS legado da aplicação chama require('pacote-moderno-esm'). No Node 22.12+ e Node 24, como o módulo ESM não usa Top-Level await, o Node o avalia de forma síncrona e retorna seu Module Namespace Object!",
        from: "ModuleBridge", to: "NodeSqlite", call: "const esmPkg = require('./modern-esm.mjs')",
        activeNodes: ["ModuleBridge", "NodeSqlite"],
        stack: ["Module._extensions['.mjs'](module, filename)", "EvaluateSyncESM()"],
        state: { requireEsmAtivoPorPadrao: true, contemTopLevelAwait: false, interoperabilidadeCjsEsm: "Completa" }
      },
      {
        title: "Persistência Nativa com import { DatabaseSync } from 'node:sqlite'",
        narration: "Sem precisar instalar sqlite3 ou better-sqlite3 via node-gyp, o serviço importa 'node:sqlite', cria uma tabela no SQLite embutido no binário do Node e executa uma query parametrizada com StatementSync.",
        from: "NodeSqlite", to: "CliFormatter", call: "db.prepare('SELECT * FROM releases WHERE lts = ?').all(1)",
        activeNodes: ["NodeSqlite", "CliFormatter"],
        stack: ["DatabaseSync.prepare()", "StatementSync.all(1)"],
        state: { moduloEmbutido: "node:sqlite", linhasRetornadas: 10, highWaterMarkStreams: "64 KiB" }
      },
      {
        title: "Descoberta de Arquivos com fs.glob() e WebSocket Nativo",
        narration: "A aplicação utiliza fs.promises.glob('**/*.ts') nativo para listar arquivos do workspace e pode abrir conexões em tempo real usando o construtor global new WebSocket(url).",
        from: "CliFormatter", to: "NodeSqlite", call: "await Array.fromAsync(fs.promises.glob('src/**/*.ts'))",
        activeNodes: ["CliFormatter", "NodeSqlite"],
        stack: ["fs.promises.glob()", "Array.fromAsync()"],
        state: { globNativo: true, webSocketGlobal: "globalThis.WebSocket", promiseWithResolvers: "Ativo" }
      },
      {
        title: "Saída Estilizada no Terminal com util.styleText()",
        narration: "O resultado final é impresso no terminal usando util.styleText(['bold', 'emerald'], texto), respeitando automaticamente as variáveis de ambiente NO_COLOR e isTTY sem precisar do pacote chalk.",
        from: "CliFormatter", to: "TypeStripper", call: "util.styleText(['bold', 'green'], '✔ Node 22/24 Pronto!')",
        activeNodes: ["CliFormatter", "TypeStripper"],
        stack: ["util.styleText()", "process.stdout.write()"],
        state: { pacotesSubstituidosNativamente: ["ts-node", "chalk", "glob", "ws", "better-sqlite3", "dotenv"] }
      }
    ]
  },

  "nd-cap-10": {
    code: "N10",
    layerIndex: 4,
    scopeType: "Express 5.0 & Koa • Pipeline & Migração",
    nodes: [
      { id: "ExpressRouter", label: "Express 5 Router (path-to-regexp v8)", stereo: "«router»", x: 130, y: 140, addr: "0xND37", methods: ["match('/files/*filepath')", "match('/:file{.:ext}')"] },
      { id: "MiddlewareChain", label: "Pipeline de Middlewares (req, res, next)", stereo: "«pipeline»", x: 440, y: 80, addr: "0xND38", methods: ["authMiddleware()", "asyncRouteHandler()"] },
      { id: "PromiseCatcher", label: "Interceptor Nativo de Promises (v5)", stereo: "«async-guard»", x: 440, y: 240, addr: "0xND39", methods: ["Promise.resolve(fn()).catch(next)"] },
      { id: "ErrorMiddleware", label: "Error Handler Global (4 Argumentos)", stereo: "«error-handler»", x: 750, y: 160, addr: "0xND40", methods: ["(err, req, res, next) => res.status()"] }
    ],
    links: [
      { from: "ExpressRouter", to: "MiddlewareChain", label: "1. valida rota anti-ReDoS" },
      { from: "MiddlewareChain", to: "PromiseCatcher", label: "2. executa async (req, res)" },
      { from: "PromiseCatcher", to: "ErrorMiddleware", label: "3. captura reject -> next(err)" },
      { from: "ErrorMiddleware", to: "ExpressRouter", label: "4. responde JSON estruturado" }
    ],
    steps: [
      {
        title: "Casamento de Rota Seguro no Express 5 (path-to-regexp v8)",
        narration: "A requisição GET /files/relatorios/2025.pdf entra no Express 5. O novo roteador exige wildcards nomeados ('/files/*filepath') e opcionais com chaves ('/:file{.:ext}'), eliminando expressões regulares vulneráveis a ataques ReDoS.",
        from: "ExpressRouter", to: "MiddlewareChain", call: "router.handle(req, res) -> match('/files/*filepath')",
        activeNodes: ["ExpressRouter", "MiddlewareChain"],
        stack: ["app.handle()", "Router.match('/files/*filepath')"],
        state: { expressVersion: "5.0.x", reqParams: { filepath: ["relatorios", "2025.pdf"] }, reqQueryGetter: "Somente-leitura" }
      },
      {
        title: "Execução de Handler async/await sem Try/Catch Manual",
        narration: "O controle chega ao handler assíncrono async (req, res) => { const doc = await db.find(); }. No Express 4, se db.find() rejeitasse sem try/catch, a requisição travava ou derrubava o processo.",
        from: "MiddlewareChain", to: "PromiseCatcher", call: "await asyncRouteHandler(req, res, next)",
        activeNodes: ["MiddlewareChain", "PromiseCatcher"],
        stack: ["Layer.handle_request()", "asyncRouteHandler()"],
        state: { handlerType: "AsyncFunction", express4Behavior: "UnhandledPromiseRejection!", express5Behavior: "Capturado nativamente" }
      },
      {
        title: "Rejeição de Promise Interceptada Automaticamente pelo Express 5",
        narration: "O banco de dados lança um erro assíncrono (HttpError 404). O wrapper interno do Express 5 captura a rejeição da Promise retornada pelo handler e invoca automaticamente next(err)!",
        from: "PromiseCatcher", to: "ErrorMiddleware", call: "promise.catch((err) => next(err))",
        activeNodes: ["PromiseCatcher", "ErrorMiddleware"],
        stack: ["Promise.catch()", "next(HttpError(404, 'Arquivo não localizado'))"],
        state: { promiseRejected: true, encaminhadoParaNextErr: true, expressAsyncErrorsExternoNecessario: false }
      },
      {
        title: "Desvio para o Middleware de Erro de 4 Parâmetros",
        narration: "O Express salta todos os middlewares comuns restantes e localiza o primeiro middleware registrado com aridade 4: (err, req, res, next). Ele verifica se res.headersSent é falso antes de formatar a resposta.",
        from: "ErrorMiddleware", to: "ExpressRouter", call: "errorHandler(err, req, res, next) [fn.length === 4]",
        activeNodes: ["ErrorMiddleware", "ExpressRouter"],
        stack: ["callErrorHandlers()", "errorMiddleware(err, req, res, next)"],
        state: { aridadeObrigatoria: 4, headersSent: false, statusCode: 404 }
      },
      {
        title: "Envio de Resposta Padronizada com res.status(code).json()",
        narration: "Como o Express 5 removeu assinaturas ambíguas legadas como res.json(status, obj) e res.send(200), o handler envia a resposta encadeada limpa res.status(404).json({ error: err.message }).",
        from: "ExpressRouter", to: "MiddlewareChain", call: "res.status(404).json({ error: 'Arquivo não localizado' })",
        activeNodes: ["ExpressRouter", "MiddlewareChain"],
        stack: ["res.status(404)", "res.json() -> end()"],
        state: { httpStatusValidado: 404, respostaEnviada: true, comparativoKoa: "No Koa: try { await next() } catch (err) {}" }
      }
    ]
  },

  "nd-cap-11": {
    code: "N11",
    layerIndex: 4,
    scopeType: "Fastify 5.0 • Radix Router, JIT Schema & Hooks",
    nodes: [
      { id: "RadixRouter", label: "Radix-Tree Router (find-my-way)", stereo: "«router»", x: 130, y: 140, addr: "0xND41", methods: ["lookup(req)", "O(k) path prefix match"] },
      { id: "HooksLifecycle", label: "Ciclo de Vida de Hooks & Plugins (avvio)", stereo: "«lifecycle»", x: 440, y: 80, addr: "0xND42", methods: ["onRequest()", "preValidation()", "preHandler()"] },
      { id: "AjvValidator", label: "Validador JIT (Ajv + TypeBox/Zod)", stereo: "«validator»", x: 440, y: 240, addr: "0xND43", methods: ["compiledValidate(req.body)"] },
      { id: "FastJsonSerializer", label: "Serializador JIT (fast-json-stringify)", stereo: "«serializer»", x: 750, y: 160, addr: "0xND44", methods: ["compiledStringify(200, payload)", "stripSecretFields()"] }
    ],
    links: [
      { from: "RadixRouter", to: "HooksLifecycle", label: "1. localiza rota em O(k)" },
      { from: "HooksLifecycle", to: "AjvValidator", label: "2. valida body/params c/ Ajv JIT" },
      { from: "AjvValidator", to: "FastJsonSerializer", label: "3. executa handler tipado" },
      { from: "FastJsonSerializer", to: "RadixRouter", label: "4. serializa 2x-3x mais rápido" }
    ],
    steps: [
      {
        title: "Busca em Árvore Radix O(k) e Contexto Encapsulado",
        narration: "A requisição POST /api/v1/clientes chega ao Fastify 5. Em vez de testar expressões regulares uma por uma em O(n), o roteador find-my-way percorre uma árvore de prefixos (Radix Tree) em tempo proporcional apenas ao tamanho da string da URL.",
        from: "RadixRouter", to: "HooksLifecycle", call: "radixTree.lookup('POST', '/api/v1/clientes')",
        activeNodes: ["RadixRouter", "HooksLifecycle"],
        stack: ["Fastify::routing()", "FindMyWay::lookup()"],
        state: { complexidadeRoteamento: "O(k) Radix Tree", pluginScope: "Encapsulado via avvio DAG", logger: "Pino JSON" }
      },
      {
        title: "Execução Ordenada de Hooks: onRequest -> preParsing -> preValidation",
        narration: "O Fastify executa os hooks registrados no escopo do plugin atual: onRequest (verifica token JWT leve) e preParsing, preparando o corpo JSON para a etapa de validação.",
        from: "HooksLifecycle", to: "AjvValidator", call: "runHooks(['onRequest', 'preParsing', 'preValidation'])",
        activeNodes: ["HooksLifecycle", "AjvValidator"],
        stack: ["onRequestHook(req, reply)", "parseJsonBody()"],
        state: { hookAtual: "preValidation", jwtVerificado: true, bodyParsed: true }
      },
      {
        title: "Validação Pré-Compilada com Ajv e Inferência TypeBox/Zod",
        narration: "A função de validação gerada pelo Ajv durante o boot do servidor valida req.body, req.params e req.querystring em microssegundos. Se falhar, retorna HTTP 400 automaticamente sem nem entrar no handler.",
        from: "AjvValidator", to: "HooksLifecycle", call: "compiledAjvSchema(request.body) -> true",
        activeNodes: ["AjvValidator", "HooksLifecycle"],
        stack: ["validateSchema()", "preHandlerHook()", "routeHandler(request, reply)"],
        state: { validacaoAjv: "Aprovada (JIT Function)", typeProvider: "TypeBox / Zod Static Inference" }
      },
      {
        title: "Serialização Acelerada e Filtragem com fast-json-stringify",
        narration: "O handler retorna um objeto do banco contendo { id: 10, nome: 'Ana', passwordHash: 'secret' }. O fast-json-stringify serializa apenas as propriedades declaradas no schema 200 OK, descartando 'passwordHash' automaticamente!",
        from: "AjvValidator", to: "FastJsonSerializer", call: "compiledStringify200({ id: 10, nome: 'Ana', passwordHash: '***' })",
        activeNodes: ["AjvValidator", "FastJsonSerializer"],
        stack: ["preSerializationHook()", "fastJsonStringify(payload)"],
        state: { jsonGerado: "{\"id\":10,\"nome\":\"Ana\"}", campoSecretoRemovido: "passwordHash", ganhoVelocidade: "2.5x vs JSON.stringify" }
      },
      {
        title: "Hooks Finais onSend e onResponse com Pino Logger",
        narration: "Os bytes são transmitidos no socket HTTP e o hook onResponse registra a telemetria estruturada no Pino Logger sem bloquear o Event Loop.",
        from: "FastJsonSerializer", to: "RadixRouter", call: "onSend() -> socket.write() -> onResponse()",
        activeNodes: ["FastJsonSerializer", "RadixRouter"],
        stack: ["onSendHook()", "onResponseHook() -> pino.info()"],
        state: { statusHTTP: 201, tempoTotalMs: 1.1, fastifyVersion: "5.x (Node 20+)" }
      }
    ]
  },

  "nd-cap-12": {
    code: "N12",
    layerIndex: 4,
    scopeType: "NestJS 11 & Hono 4 • DI, Adapters & Edge",
    nodes: [
      { id: "HttpAdapter", label: "HTTP Adapter (Fastify 5 / Express 5 / Hono)", stereo: "«adapter»", x: 130, y: 140, addr: "0xND45", methods: ["FastifyAdapter()", "Hono.fetch(Request)"] },
      { id: "GuardsInterceptors", label: "Guards & RxJS Interceptors", stereo: "«pipeline»", x: 440, y: 80, addr: "0xND46", methods: ["canActivate(ctx)", "intercept(ctx, next)"] },
      { id: "PipesIoCContainer", label: "ValidationPipes & IoC Container", stereo: "«di-container»", x: 440, y: 240, addr: "0xND47", methods: ["transform(dto)", "resolveSingleton(Service)"] },
      { id: "ControllerService", label: "@Controller & @Injectable Service", stereo: "«domain»", x: 750, y: 160, addr: "0xND48", methods: ["createPayment()", "ExceptionFilter.catch()"] }
    ],
    links: [
      { from: "HttpAdapter", to: "GuardsInterceptors", label: "1. adapta Request e aciona Guard" },
      { from: "GuardsInterceptors", to: "PipesIoCContainer", label: "2. abre Interceptor e valida Pipe" },
      { from: "PipesIoCContainer", to: "ControllerService", label: "3. injeta Service singleton" },
      { from: "ControllerService", to: "HttpAdapter", label: "4. transforma resposta / RPC" }
    ],
    steps: [
      {
        title: "Entrada via Adaptador Desacoplado (Fastify 5 no NestJS 11 ou Web Fetch no Hono 4)",
        narration: "A requisição chega ao servidor. No NestJS 11, o FastifyAdapter traduz a requisição para o ExecutionContext agnóstico (permitindo que o mesmo código funcione em HTTP, GraphQL, gRPC ou Kafka). No Hono 4, usa-se o objeto Web Standard Request.",
        from: "HttpAdapter", to: "GuardsInterceptors", call: "adapter.handleRequest() -> createExecutionContext()",
        activeNodes: ["HttpAdapter", "GuardsInterceptors"],
        stack: ["FastifyAdapter::dispatch()", "NestExecutionContext::create()"],
        state: { nestVersion: "11.x", underlyingEngine: "Fastify 5 / Express 5", honoAlternative: "Web Standard Request/Response" }
      },
      {
        title: "Autorização nos Guards (canActivate) e Abertura dos Interceptors",
        narration: "Antes de tocar em qualquer regra de negócio, os Guards (Global -> Controller -> Route) verificam permissões RBAC/JWT via canActivate(context). Em seguida, os Interceptors iniciam a medição de telemetria pré-controller.",
        from: "GuardsInterceptors", to: "PipesIoCContainer", call: "JwtAuthGuard.canActivate(ctx) -> LoggingInterceptor.intercept()",
        activeNodes: ["GuardsInterceptors", "PipesIoCContainer"],
        stack: ["GuardsConsumer.tryActivate()", "InterceptorsConsumer.intercept()"],
        state: { guardAuthorized: true, userRole: "ADMIN", interceptorPhase: "Before handle()" }
      },
      {
        title: "Transformação e Sanitização nos Pipes (ValidationPipe / ZodPipe)",
        narration: "Os Pipes validam o payload de entrada (@Body(), @Param(), @Query()), convertendo tipos primitivos e rejeitando campos não autorizados com BadRequestException (400) caso o contrato seja violado.",
        from: "PipesIoCContainer", to: "ControllerService", call: "ValidationPipe.transform(rawBody, metadata)",
        activeNodes: ["PipesIoCContainer", "ControllerService"],
        stack: ["PipesConsumer.apply()", "ValidationPipe.transform()"],
        state: { dtoValidado: true, whitelistFieldsOnly: true, compiler: "SWC (20x mais rápido)" }
      },
      {
        title: "Execução do Controller com Services Injetados pelo IoC Container",
        narration: "O método do @Controller é invocado utilizando instâncias @Injectable() resolvidas em O(1) pelo container de Injeção de Dependência do NestJS 11 (mantidas em Scope.DEFAULT Singleton para máxima performance).",
        from: "ControllerService", to: "GuardsInterceptors", call: "paymentController.charge(dto) -> paymentService.execute()",
        activeNodes: ["ControllerService", "GuardsInterceptors"],
        stack: ["PaymentController.charge()", "PaymentService.execute()"],
        state: { diScope: "Scope.DEFAULT (Singleton)", testabilidade: "100% Mockável via Test.createTestingModule" }
      },
      {
        title: "Pós-Processamento no Interceptor (RxJS) ou Exception Filter",
        narration: "O resultado sobe de volta pelo fluxo RxJS do Interceptor (que padroniza o envelope JSON ou faz caching) ou, em caso de erro, é capturado por um ExceptionFilter customizado antes do HttpAdapter enviar a resposta.",
        from: "GuardsInterceptors", to: "HttpAdapter", call: "next.handle().pipe(map(data => ({ data, meta })))",
        activeNodes: ["GuardsInterceptors", "HttpAdapter"],
        stack: ["InterceptorsConsumer::postHandle()", "FastifyAdapter::reply()"],
        state: { statusHTTP: 200, multiRuntimeHono: "Node + Cloudflare Workers + Deno + Bun" }
      }
    ]
  }
};
