// Parte 1: Arquitetura Core, Event Loop & Fundamentos LTS (Capítulos 1 a 3)
// Cobrindo Node.js 0.1 a 0.12, Node.js 4 LTS (Argon), Node.js 6 LTS (Boron), Node.js 8 LTS (Carbon) e Node.js 10 LTS (Dubnium)

export const part1Chapters = [
  {
    id: "nd-cap-1",
    number: 1,
    part: "Core & Event Loop",
    partColor: "amber",
    title: "Node.js 0.1 a 0.12: Arquitetura V8 + libuv, Event Loop, CommonJS & Streams",
    subtitle: "As 6 fases do Event Loop, Thread Pool da libuv, Error-First Callbacks, módulos require() e Streams com Backpressure",
    readingTime: "16 min",
    keyConcepts: [
      "V8 + libuv",
      "6 Fases do Event Loop",
      "process.nextTick vs Microtasks",
      "UV_THREADPOOL_SIZE",
      "CommonJS require()",
      "Streams & Backpressure"
    ],
    teacherIntro:
      "Quando Ryan Dahl apresentou o Node.js em 2009, servidores web tradicionais (como Apache) criavam uma thread ou processo do sistema operacional por requisição, bloqueando a CPU a cada leitura de banco ou disco. O Node.js combinou o motor V8 do Chrome com a biblioteca C libuv para executar JavaScript em uma única thread orientada a eventos, delegando I/O de rede ao kernel (epoll, kqueue, IOCP) e operações bloqueantes a uma Thread Pool dedicada.",
    keyTakeaways: [
      "O Event Loop da libuv possui 6 fases sequenciais: timers -> pending callbacks -> idle/prepare -> poll -> check -> close callbacks.",
      "Filas de microtasks (process.nextTick e Promises) são drenadas imediatamente após cada operação C++/JS concluir, na transição entre fases do Event Loop.",
      "Operações de rede (TCP/HTTP) usam multiplexação nativa do kernel (sem ocupar threads), enquanto sistema de arquivos (fs), DNS (dns.lookup), zlib e crypto rodam na Thread Pool da libuv (padrão de 4 threads, ajustável até 1024 via UV_THREADPOOL_SIZE).",
      "As Streams evoluíram de Streams1 (push puro) no Node 0.4 para Streams2 (pull com .read()) no Node 0.10 e Streams3 (modo híbrido) no Node 0.12, mantendo retrocompatibilidade total com .pipe()."
    ],
    sections: [
      {
        heading: "Novidades e Arquitetura por Versão (Node.js 0.1 a 0.12)",
        body: "Na era inicial (Node 0.1 a 0.4), o runtime operava apenas em Unix combinando o motor V8 com libev (loop de eventos) e libeio (thread pool para arquivos). No Node 0.6 (2011), a equipe criou a libuv para unificar a abstração assíncrona entre Linux (epoll), macOS/BSD (kqueue), Solaris (event ports) e Windows (IOCP), além de introduzir o módulo cluster para escalar múltiplos processos na mesma porta TCP. No Node 0.8 e 0.10 (2013), nasceram as Streams2 com controle formal de backpressure (highWaterMark) e domain (posteriormente depreciado). No Node 0.12 (2015), vieram as Streams3 e execSync/spawnSync em child_process.",
        bullets: [
          "Fase 1 • timers: executa callbacks agendados por setTimeout() e setInterval() cujo limite de tempo expirou.",
          "Fase 2 • pending callbacks: executa callbacks de I/O adiados da iteração anterior (ex: erros de socket TCP como ECONNREFUSED).",
          "Fase 3 • idle, prepare: uso interno exclusivo da libuv para preparação da sondagem de I/O.",
          "Fase 4 • poll: recupera novos eventos de I/O do sistema operacional e executa callbacks de leitura/escrita de rede e arquivos.",
          "Fase 5 • check: executa imediatamente callbacks agendados via setImmediate() logo após a fase poll esvaziar.",
          "Fase 6 • close callbacks: executa callbacks de encerramento de recursos, como socket.on('close', ...)."
        ],
        callout: {
          type: "info",
          title: "Onde entram process.nextTick() e Promises?",
          text: "process.nextTick() não faz parte estética do diagrama das 6 fases da libuv: sua fila (nextTickQueue) é processada imediatamente após a conclusão da operação JavaScript atual, antes mesmo do Event Loop avançar para a próxima fase. Cuidado: chamadas recursivas a process.nextTick() causam I/O Starvation (fome de I/O), impedindo a fase poll de rodar."
        }
      },
      {
        heading: "Como Utilizar na Prática: Event Loop, Thread Pool e Streams .pipe()",
        body: "Para extrair máxima performance desde as fundações do Node.js, é essencial distinguir o que roda no kernel do que roda na Thread Pool da libuv. Sockets HTTP/TCP usam epoll/kqueue diretamente no kernel. Já chamadas de fs.*, crypto.pbkdf2(), crypto.scrypt(), zlib.* e dns.lookup() disputam as 4 threads padrão da libuv. Em servidores que fazem uso intenso de criptografia ou disco, aumentar UV_THREADPOOL_SIZE=16 (ou 64) evita gargalos de fila na Thread Pool. Para processar arquivos grandes, utilize Streams com .pipe() para que o highWaterMark pause a leitura automaticamente quando o socket de escrita encher.",
        bullets: [
          "Dentro de um callback de I/O (ex: fs.readFile), setImmediate() SEMPRE executa antes de setTimeout(..., 0), pois a fase check sucede imediatamente a fase poll.",
          "Padrão Error-First Callback: toda função assíncrona clássica recebe (err, result) onde o primeiro argumento é reservado para uma instância de Error ou null.",
          "Em CommonJS, require('./modulo') carrega, compila em um wrapper function (exports, require, module, __filename, __dirname) e faz cache síncrono em require.cache.",
          "Se writable.write(chunk) retornar false, o buffer interno atingiu o highWaterMark: aguarde o evento 'drain' antes de continuar escrevendo."
        ],
        callout: {
          type: "tip",
          title: "Ajuste Prático da Thread Pool",
          text: "Defina UV_THREADPOOL_SIZE nas variáveis de ambiente antes da inicialização do processo (ou no topo absoluto antes de qualquer operação assíncrona) para dimensionar a concorrência de fs, dns.lookup e crypto."
        }
      },
      {
        heading: "Retrocompatibilidade: Evolução Streams1 -> Streams2 -> Streams3 e Resolução CommonJS",
        body: "Um dos maiores triunfos de engenharia de retrocompatibilidade do Node.js foi a evolução das Streams sem quebrar pacotes existentes. No Node 0.4 (Streams1), bastava anexar stream.on('data', fn) para os dados jorrarem sem controle confiável de pausa. No Node 0.10 (Streams2), introduziu-se o modo pausado padrão com stream.read(), mas para não quebrar milhões de linhas de código, adicionar um listener .on('data') comutava automaticamente a stream para o modo legado 'flowing'. No Node 0.12 (Streams3), refinou-se a coexistência entre .on('readable') e .on('data'). Da mesma forma, o algoritmo de resolução CommonJS (busca hierárquica em node_modules, extensões .js, .json, .node) permanece 100% compatível do Node 0.10 ao Node 24.",
        bullets: [
          "Cuidado com Zalgo: nunca crie uma API que chame o callback ora de forma síncrona (no mesmo tick) e ora de forma assíncrona; use process.nextTick() para garantir assincronicidade consistente.",
          "O cache require.cache indexa módulos pelo caminho real resolvido no sistema de arquivos (fs.realpathSync), evitando execuções duplicadas do mesmo singleton.",
          "Ciclos de dependência em CommonJS não travam o boot: o Node retorna uma cópia parcial (incompleta) do objeto exports já exportado até o momento do ciclo."
        ],
        callout: {
          type: "warning",
          title: "Armadilha Clássica de Retrocompatibilidade",
          text: "Atribuir exports = funcao diretamente quebra a referência com module.exports! Sempre utilize module.exports = funcao quando desejar exportar uma função ou classe única em CommonJS."
        }
      }
    ]
  },
  {
    id: "nd-cap-2",
    number: 2,
    part: "Core & Event Loop",
    partColor: "amber",
    title: "Node.js 4 (LTS) & Node.js 6 (LTS): Reunificação io.js, ES6 Nativo & Buffer Seguro",
    subtitle: "O calendário oficial LTS (Argon & Boron), classes/Promises ES2015 nativas no V8 e Buffer.from/alloc",
    readingTime: "15 min",
    keyConcepts: [
      "Fork io.js & Node Foundation",
      "Calendário LTS (Argon & Boron)",
      "ES6 / ES2015 Nativo",
      "Buffer.from & Buffer.alloc",
      "Buffer.allocUnsafe",
      "Depreciação DEP0005"
    ],
    teacherIntro:
      "Em 2014, frustrados com a lentidão das atualizações do motor V8 no Node 0.12 sob governança centralizada, os principais contribuidores do core criaram o fork io.js (versões 1.x, 2.x e 3.x) com governança aberta. Em setembro de 2015, o ecossistema se reunificou sob a Node.js Foundation lançando o Node.js 4.0 (codinome Argon), inaugurando o calendário previsível de Long Term Support (LTS) e trazendo o ES6 (ES2015) nativo sem necessidade de Babel.",
    keyTakeaways: [
      "Versões pares (Node 4, 6, 8, ..., 22, 24) são promovidas a LTS em outubro com 30 meses de suporte garantido (Active LTS + Maintenance LTS), enquanto versões ímpares servem para estabilização de recursos.",
      "O Node 4 (Argon) e o Node 6 (Boron) trouxeram 93%+ do ES2015 nativo no V8: class, const/let, arrow functions, Promises, Map, Set, WeakMap, Symbol, Generators e Destructuring.",
      "No Node 6, o construtor polimórfico new Buffer() foi substituído por Buffer.from(), Buffer.alloc() (memória zerada) e Buffer.allocUnsafe() para eliminar vulnerabilidades críticas de vazamento de memória RAM.",
      "O sistema de códigos de depreciação (DEP0001 a DEP0180+) permitiu alertar desenvolvedores sobre APIs inseguras sem derrubar sistemas legados em produção."
    ],
    sections: [
      {
        heading: "Novidades por Versão: Do Fork io.js ao Node 4 (Argon) e Node 6 (Boron)",
        body: "O salto do Node 0.12 direto para o Node 4.0 em 2015 incorporou todas as conquistas do io.js (1.0 a 3.3): atualização massiva do V8 (de 3.28 para 4.5), introdução do NAN (Native Abstractions for Node.js) para proteger pacotes C++ e criação do Release Working Group. Em abril de 2016, o Node 6 (promovido a LTS Boron em outubro de 2016 com V8 5.1) completou o suporte ao ES2015 adicionando parâmetros default, operadores rest/spread (...), destructuring de objetos/arrays, Proxy, Reflect e a reformulação de segurança da classe global Buffer.",
        bullets: [
          "Política Release LTS: Abril lança versão par Current; Outubro promove a versão par para Active LTS (18 meses) seguida de Maintenance LTS (12 meses).",
          "Node 4 LTS (Argon): Promises nativas, Template Literals (`string ${var}`), Arrow Functions, const/let com escopo de bloco, TypedArrays e util.format aprimorado.",
          "Node 6 LTS (Boron): 93% de conformidade ES6, Buffer.from/alloc/allocUnsafe, process.emitWarning() estruturado e melhorias de performance no módulo path e módulo assert."
        ],
        callout: {
          type: "info",
          title: "Por que nunca houve um Node.js 1.0, 2.0 ou 3.0?",
          text: "As versões 1.x, 2.x e 3.x existiram como lançamentos do fork io.js durante 2015. Quando o io.js e o Node.js se fundiram novamente em setembro de 2015, convergiram diretamente para a versão 4.0.0 para evitar colisão de números de versão no semver."
        }
      },
      {
        heading: "Como Utilizar na Prática: Buffer.from(), Buffer.alloc() vs Buffer.allocUnsafe() e ES6",
        body: "Manipular dados binários (pacotes TCP, imagens, criptografia, arquivos) no Node.js exige o uso correto das fábricas explícitas de Buffer introduzidas no Node 6 (e portadas retroativamente para o Node 4.5+). Nunca chame new Buffer(). Use Buffer.from() para converter strings, arrays ou ArrayBuffers existentes; use Buffer.alloc(size) para criar um buffer novo preenchido com zeros (seguro); e use Buffer.allocUnsafe(size) somente quando a performance de alocação for crítica e você garantir que preencherá 100% dos bytes antes de expor o buffer.",
        bullets: [
          "Buffer.from('Texto UTF-8', 'utf8'): cria um buffer a partir de uma string com codificação explícita (utf8, base64, hex, base64url).",
          "Buffer.alloc(1024): aloca 1 KB de memória fora da heap tradicional do V8 e preenche todos os 1024 bytes com 0x00 (zero-filled).",
          "Buffer.allocUnsafe(1024): aloca 1 KB instantaneamente a partir do pool interno de 8 KB (Buffer.poolSize) sem zerar a memória; pode conter fragmentos de dados antigos da RAM.",
          "Classes e Promises ES6: substitua util.inherits(Filha, Pai) por class Filha extends EventEmitter {} nativo."
        ],
        callout: {
          type: "tip",
          title: "Regra de Ouro para Buffers",
          text: "Se um endpoint recebe um tamanho numérico enviado pelo usuário e aloca um buffer para resposta, SEMPRE use Buffer.alloc(size). Usar Buffer.allocUnsafe(size) sem sobrescrever cada byte envia pedaços da memória RAM do servidor (incluindo chaves TLS e variáveis de ambiente) para o atacante!"
        }
      },
      {
        heading: "Retrocompatibilidade e Segurança: O Caso new Buffer(number) e a Depreciação DEP0005",
        body: "Antes do Node 6, o construtor new Buffer(arg) era polimórfico: se 'arg' fosse uma string ('100'), criava um buffer de 3 bytes contendo os caracteres '100'; mas se 'arg' fosse o número 100 (ex: vindo de um JSON parseado onde o cliente enviou {\"data\": 100} em vez de {\"data\": \"100\"}), o Node alocava 100 bytes de memória RAM não-zerada! Pacotes famosos como 'ws' sofreram vulnerabilidades críticas de divulgação de memória remota (similar ao Heartbleed) por causa disso. Como milhões de pacotes no npm usavam new Buffer(), removê-lo imediatamente quebraria toda a internet JavaScript.",
        bullets: [
          "Passo 1 (Node 4.5 e Node 6): introdução de Buffer.from/alloc/allocUnsafe e adição da flag --zero-fill-buffers para forçar zeramento global quando necessário.",
          "Passo 2 (Node 8): new Buffer(num) passou a zerar a memória automaticamente por padrão, eliminando o risco de vazamento de RAM mesmo em pacotes legados abandonados.",
          "Passo 3 (Node 10 • DEP0005): emissão de Runtime Deprecation Warning sempre que new Buffer() é invocado fora de node_modules, guiando a migração segura sem quebrar dependências antigas.",
          "Polifill 'safe-buffer': criado pela comunidade para permitir que bibliotecas usassem Buffer.from/alloc mesmo quando executadas em Node 0.10 ou 0.12."
        ],
        callout: {
          type: "warning",
          title: "Inspeção de Depreciações em Produção e CI",
          text: "Utilize a flag node --trace-deprecation para descobrir a linha exata que dispara um aviso DEP*, ou node --throw-deprecation no pipeline de CI/CD para impedir que código novo utilize APIs depreciadas."
        }
      }
    ]
  },
  {
    id: "nd-cap-3",
    number: 3,
    part: "Core & Event Loop",
    partColor: "amber",
    title: "Node.js 8 (LTS) & Node.js 10 (LTS): async/await, util.promisify, N-API, HTTP/2 & fs.promises",
    subtitle: "O fim do Callback Hell (Carbon & Dubnium), estabilidade binária ABI com Node-API e stream.pipeline()",
    readingTime: "17 min",
    keyConcepts: [
      "async/await Nativo",
      "util.promisify & callbackify",
      "fs.promises",
      "stream.pipeline & finished",
      "N-API / Node-API (ABI)",
      "HTTP/2 & Async Iterators"
    ],
    teacherIntro:
      "O ciclo entre 2017 (Node 8 Carbon) e 2018 (Node 10 Dubnium) modernizou radicalmente a ergonomia do desenvolvimento em Node.js. A chegada do async/await nativo no V8 6.2 combinada com util.promisify() e fs.promises aposentou a 'Pirâmide da Perdição' (Callback Hell). Em paralelo, stream.pipeline() resolveu vazamentos silenciosos de memória em streams e a N-API (Node-API) solucionou o pesadelo de recompilação de módulos nativos C/C++.",
    keyTakeaways: [
      "O Node 8 LTS (Carbon) trouxe async/await nativo sem transpilação, util.promisify() para converter funções Error-First Callback em Promises, e o V8 Inspector nativo (--inspect).",
      "O Node 10 LTS (Dubnium) estabilizou o módulo http2, introduziu o namespace nativo fs.promises, Async Iterators (for await...of) para consumir Readable Streams e stream.pipeline().",
      "stream.pipeline(src, transform, dest, cb) substituiu o encadeamento manual .pipe().pipe(), garantindo que todos os streams sejam destruídos (destroy()) se qualquer etapa falhar ou se o cliente desconectar.",
      "A N-API (renomeada para Node-API) isolou addons C/C++ das estruturas internas mutáveis do V8, garantindo compatibilidade binária (ABI) entre versões principais do Node.js."
    ],
    sections: [
      {
        heading: "Novidades por Versão: Node.js 8 LTS (Carbon) e Node.js 10 LTS (Dubnium)",
        body: "No Node 8 (outubro de 2017), o motor V8 6.2 estreou a nova pipeline de compilação Ignition (interpretador bytecode) + TurboFan (compilador otimizador JIT), reduzindo drasticamente o overhead de funções async/await e closures. O Node 8 também introduziu util.promisify(), util.callbackify(), console.time/count aprimorados e a primeira versão da N-API. Já no Node 10 (outubro de 2018, V8 6.8), o runtime ganhou fs.promises nativo, stream.pipeline(), stream.finished(), suporte completo a HTTP/2 (multiplexação de streams sobre uma única conexão TCP e Server Push), BigInt para inteiros de precisão arbitrária, OpenSSL 1.1.0 e códigos de erro padronizados.",
        bullets: [
          "Node 8 LTS (Carbon): async/await nativo, util.promisify(), V8 TurboFan/Ignition, flag --inspect para Chrome DevTools e N-API experimental.",
          "Node 10 LTS (Dubnium): require('fs').promises, stream.pipeline() e stream.finished(), for await (const chunk of stream), HTTP/2 estável e códigos de erro ERR_*.",
          "Performance de Promises: entre o Node 8 e o Node 10, o V8 otimizou PromiseHooks e microtasks, tornando async/await competitivo em velocidade com callbacks puros."
        ],
        callout: {
          type: "info",
          title: "O Perigo Oculto de .pipe() que stream.pipeline() Resolveu",
          text: "Quando você faz fileStream.pipe(gzipStream).pipe(res) e o navegador do usuário fecha a aba no meio do download, o socket 'res' fecha, mas 'fileStream' e 'gzipStream' NÃO são destruídos automaticamente pelo .pipe(), deixando descritores de arquivo e buffers pendurados na RAM!"
        }
      },
      {
        heading: "Como Utilizar na Prática: async/await, util.promisify, fs.promises e stream.pipeline",
        body: "Para modernizar código legado e escrever pipelines resilientes, utilize fs.promises (ou import fs from 'node:fs/promises') para arquivos pequenos de configuração, e combine stream.pipeline de 'node:stream/promises' com Async Generators (async function*) para transformar grandes volumes de dados com controle automático de backpressure e tratamento centralizado de erros.",
        bullets: [
          "Conversão de API legada: const execFileAsync = util.promisify(child_process.execFile); permite usar const { stdout } = await execFileAsync('git', ['status']).",
          "Suporte a símbolos customizados: util.promisify.custom permite definir como funções com múltiplos valores de retorno devem resolver a Promise.",
          "Pipeline com Async Generators: await pipeline(fs.createReadStream('in.csv'), async function* (source) { for await (const chunk of source) yield chunk.toString().toUpperCase(); }, fs.createWriteStream('out.csv')).",
          "Execução paralela controlada: use await Promise.all([lerA(), lerB()]) em vez de awaits sequenciais desnecessários quando as operações forem independentes."
        ],
        callout: {
          type: "tip",
          title: "Interoperabilidade Reversa com util.callbackify()",
          text: "Precisa passar uma função moderna async/await para um framework ou biblioteca antiga que exige um callback (err, val)? Use util.callbackify(fnAsync) para manter 100% de compatibilidade com contratos legados."
        }
      },
      {
        heading: "Retrocompatibilidade: Estabilidade Binária ABI (Node-API) e Códigos de Erro ERR_*",
        body: "Até o Node 6, atualizar a versão do Node em produção era traumático por causa de pacotes nativos C++ (como bcrypt, sqlite3, sharp, node-sass): cada versão do Node trazia um novo V8 que alterava assinaturas de classes C++ (v8::Local, v8::Isolate), alterando o NODE_MODULE_VERSION (ABI) e forçando recompilação via node-gyp (que frequentemente falhava por falta de Python ou compiladores C++ nos servidores). A Node-API (N-API) resolveu isso fornecendo uma API em C pura e estável com garantia formal de ABI: um binário .node compilado para Node-API v3 no Node 10 carrega nativamente no Node 12, 14, 16, 18, 20, 22 e 24 sem recompilar uma única linha.",
        bullets: [
          "Estabilidade ABI (Node-API): bibliotecas modernas em C, C++ e Rust (via napi-rs) distribuem binários pré-compilados universais que não quebram ao atualizar o Node.",
          "Padronização de Erros (ERR_*): antes do Node 10, desenvolvedores faziam if (err.message === '...') que quebrava se uma vírgula da mensagem mudasse. O Node 10 catalogou códigos fixos em err.code (ex: ERR_STREAM_PREMATURE_CLOSE, ERR_HTTP_HEADERS_SENT).",
          "Consumo de Readable Streams com for await...of: chama automaticamente stream.destroy() caso o loop seja interrompido por break, return ou throw."
        ],
        callout: {
          type: "warning",
          title: "Não Misture Callbacks e Promises no Mesmo Fluxo",
          text: "Passar uma função async como callback para uma API que não espera uma Promise (ex: EventEmitter.on('event', async () => { throw err; }) sem captureRejections) fará com que erros lançados virem UnhandledPromiseRejection em vez de serem capturados pelo emissor."
        }
      }
    ]
  }
];
