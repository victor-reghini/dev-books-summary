/**
 * Especificação de Animação Interativa Passo a Passo para Capítulos com Fluxo Estrutural
 * do livro "Node.js: Guia Completo de Versões, Event Loop & Frameworks".
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
  }
};
