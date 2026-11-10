// Parte 2: ES Modules, Concorrência Multi-Core & Contexto Assíncrono (Capítulos 4 a 6)
// Cobrindo Node.js 12 LTS (Erbium), Node.js 14 LTS (Fermium) e Node.js 16 LTS (Gallium)

export const part2Chapters = [
  {
    id: "nd-cap-4",
    number: 4,
    part: "ESM & Concorrência",
    partColor: "blue",
    title: "Node.js 12 (LTS): Worker Threads, ES Modules (.mjs), TLS 1.3 & Limites de Containers",
    subtitle: "Paralelismo real de CPU com SharedArrayBuffer (Erbium), módulos ECMAScript oficiais e Diagnostic Reports",
    readingTime: "16 min",
    keyConcepts: [
      "worker_threads",
      "SharedArrayBuffer & Atomics",
      "ES Modules (.mjs / type: module)",
      "Container Memory (cgroups)",
      "TLS 1.3 Nativo",
      "Diagnostic Reports"
    ],
    teacherIntro:
      "Até o Node 10, qualquer cálculo intensivo de CPU em JavaScript (como redimensionamento de imagem, parsing de JSON de 200 MB, geração de PDF ou inferência criptográfica) congelava o Event Loop principal ou exigia criar processos pesados do sistema operacional com child_process.fork(). O Node.js 12 LTS (Erbium, 2019) mudou a arquitetura do runtime ao estabilizar as Worker Threads com compartilhamento de memória (SharedArrayBuffer), remover a flag experimental dos ES Modules e tornar o V8 consciente dos limites de memória de containers Docker e Kubernetes.",
    keyTakeaways: [
      "O módulo worker_threads cria múltiplas instâncias isoladas do V8 e Event Loops independentes dentro do MESMO processo do sistema operacional, compartilhando memória via SharedArrayBuffer ou transferindo ArrayBuffers em zero-copy.",
      "Os ES Modules (import / export) saíram detrás da flag --experimental-modules no Node 12.17+, utilizando a extensão .mjs ou a propriedade \"type\": \"module\" no package.json.",
      "O Node 12 passou a inspecionar os limites de cgroups do Linux (Docker / Kubernetes) para ajustar automaticamente o tamanho máximo da heap do V8, evitando mortes súbitas por OOMKilled (Exit Code 137).",
      "O suporte a TLS 1.3 por padrão reduziu o handshake HTTPS de 2 round-trips (RTT) para apenas 1 RTT, aumentando a segurança e reduzindo a latência de conexões."
    ],
    sections: [
      {
        heading: "Novidades por Versão: O Salto Arquitetural do Node.js 12 LTS (Erbium)",
        body: "Lançado em abril de 2019 e promovido a LTS em outubro de 2019 (com motor V8 7.8), o Node 12 resolveu três demandas históricas da comunidade corporativa: paralelismo real de CPU sem overhead de múltiplos processos (worker_threads), padronização do sistema oficial de módulos do JavaScript (ES Modules) e observabilidade nativa em produção com Diagnostic Reports (process.report.writeReport()), que gera um arquivo JSON detalhado com stack trace JS/C++, estatísticas da heap V8, uso de CPU e handles da libuv em caso de crash ou sinal SIGUSR2.",
        bullets: [
          "worker_threads estável: cada Worker possui seu próprio V8 Isolate e libuv Event Loop, comunicando-se via MessagePort (parentPort.postMessage).",
          "ES Modules sem flag (Node 12.17+): suporte nativo a import/export estático, dynamic import() e meta-propriedade import.meta.url.",
          "V8 Private Class Fields (#campo): encapsulamento real em nível de linguagem para propriedades e métodos privados em classes.",
          "Promise.allSettled(): aguarda a conclusão de todas as Promises de um array independentemente de algumas rejeitarem ou resolverem."
        ],
        callout: {
          type: "info",
          title: "Por que nunca usar Worker Threads para I/O de Rede ou Banco?",
          text: "Não crie Worker Threads para fazer consultas SQL ou requisições HTTP! O Event Loop nativo e o kernel do sistema operacional (epoll/kqueue) já processam I/O assíncrono com eficiência muito superior a múltiplas threads. Use Worker Threads exclusivamente para algoritmos CPU-bound (cálculos matemáticos, compressão, AST parsing, criptografia pesada)."
        }
      },
      {
        heading: "Como Utilizar na Prática: Worker Pools, SharedArrayBuffer e ES Modules",
        body: "Criar uma nova Worker Thread leva alguns milissegundos e consome cerca de 10 a 30 MB de memória base para o novo V8 Isolate. Por isso, em servidores HTTP de produção, nunca instancie new Worker() a cada requisição recebida: utilize um Pool de Workers pré-alocados (como a biblioteca 'piscina' criada por membros do Node TSC) com tamanho igual a os.availableParallelism(). Para transferir grandes buffers sem custo de cópia (clonagem estruturada), passe o ArrayBuffer na lista de transferList do postMessage(value, [arrayBuffer]) ou utilize SharedArrayBuffer sincronizado com operações atômicas (Atomics.add, Atomics.wait, Atomics.notify).",
        bullets: [
          "Transferência Zero-Copy: parentPort.postMessage(uint8Array, [uint8Array.buffer]) transfere a posse do ponteiro de memória em O(1) sem copiar bytes.",
          "Memória Compartilhada: const sab = new SharedArrayBuffer(1024); permite que múltiplas threads leiam e escrevam no mesmo bloco de RAM usando Atomics.",
          "Regras de ES Modules: extensões de arquivo são obrigatórias em imports relativos (import { fn } from './utils.js') e variáveis globais de CJS (__dirname, __filename, require) não existem no escopo ESM.",
          "Carregamento dinâmico: await import('./modulo.mjs') funciona tanto dentro de arquivos CommonJS (.cjs) quanto dentro de arquivos ES Modules (.mjs)."
        ],
        callout: {
          type: "tip",
          title: "Gerando Relatórios de Diagnóstico Automáticos em Falhas",
          text: "Ative --report-uncaught-exception --report-on-fatalerror --report-on-signal na inicialização do Node para gravar automaticamente um snapshot completo de diagnóstico em JSON caso o processo sofra Out Of Memory ou exceção fatal."
        }
      },
      {
        heading: "Retrocompatibilidade: Worker Threads vs child_process e Memória em Containers (cgroups)",
        body: "Antes do Node 12, quando uma aplicação Node rodava dentro de um container Docker no Kubernetes com limite de 512 MB de RAM, o motor V8 enxergava a memória total da máquina hospedeira (ex: um nó EC2 com 64 GB de RAM) e assumia que podia expandir sua heap até 1.4 GB! O resultado era o Linux Kernel matando o container subitamente com SIGKILL (OOMKilled / Exit Code 137) antes do Garbage Collector do V8 agir. O Node 12 passou a ler automaticamente os limites de cgroups do container na inicialização, configurando a heap do V8 de forma proporcional e segura.",
        bullets: [
          "child_process.fork() vs worker_threads: fork() cria um processo SO separado (isolamento total de crash, maior custo de RAM, IPC via pipe); Worker Threads compartilham o mesmo PID e endereço de memória.",
          "Interoperabilidade CJS <-> ESM no Node 12: um módulo ESM pode fazer import cjsPkg from 'cjs-pkg' livremente, mas no Node 12 um módulo CJS só podia carregar ESM de forma assíncrona via await import() (limitação superada apenas no Node 22 com require(esm)).",
          "Extensões explícitas (.cjs e .mjs): arquivos .cjs são sempre tratados como CommonJS mesmo que o package.json tenha \"type\": \"module\", garantindo migração gradual arquivo por arquivo."
        ],
        callout: {
          type: "warning",
          title: "Cuidado com Named Exports de Pacotes CommonJS em ESM",
          text: "O Node utiliza análise estática (cjs-module-lexer) para detectar propriedades anexadas a exports/module.exports em pacotes CommonJS. Se um pacote CJS calcular exportações dinamicamente em runtime, faça a importação default (import pkg from 'pacote') e desestruture em seguida."
        }
      }
    ]
  },
  {
    id: "nd-cap-5",
    number: 5,
    part: "ESM & Concorrência",
    partColor: "blue",
    title: "Node.js 14 (LTS): AsyncLocalStorage, Package Exports, Optional Chaining & Corepack",
    subtitle: "Rastreamento de contexto assíncrono sem acoplamento (Fermium), encapsulamento de pacotes e operadores ?. e ??",
    readingTime: "16 min",
    keyConcepts: [
      "AsyncLocalStorage",
      "Package Entry Points (exports)",
      "Subpath Imports (#internal)",
      "Dual Package Hazard",
      "Optional Chaining (?.) & ??",
      "Top-Level Await"
    ],
    teacherIntro:
      "Em linguagens multi-thread tradicionais (como Java ou C#), frameworks usam ThreadLocal para guardar o usuário logado, a transação do banco ou o ID da requisição HTTP atual. No Node.js, como milhares de requisições compartilham a mesma thread no Event Loop intercalando awaits, variáveis globais causam vazamento de dados entre clientes diferentes! O Node.js 14 LTS (Fermium, 2020) solucionou esse desafio com a classe oficial AsyncLocalStorage, além de introduzir o encapsulamento moderno de pacotes com o campo 'exports' no package.json.",
    keyTakeaways: [
      "AsyncLocalStorage (do módulo node:async_hooks) permite armazenar e recuperar estado isolado por fluxo de execução assíncrono (como requestId, tenantId, logger contextual e spans OpenTelemetry) sem passar parâmetros manualmente por dezenas de funções.",
      "O campo \"exports\" no package.json define a interface pública estrita de um pacote, bloqueando importações de arquivos internos privados com o erro ERR_PACKAGE_PATH_NOT_EXPORTED.",
      "Conditional Exports (\"import\", \"require\", \"types\", \"default\") permitem que um único pacote sirva ES Modules e CommonJS simultaneamente, mas exigem cuidado contra o Dual Package Hazard.",
      "O V8 8.4 no Node 14 trouxe nativamente Optional Chaining (obj?.prop?.()), Nullish Coalescing (val ?? 'padrao') e Top-Level Await em módulos ES."
    ],
    sections: [
      {
        heading: "Novidades por Versão: Node.js 14 LTS (Fermium)",
        body: "Promovido a LTS em outubro de 2020 com V8 8.4, o Node 14 estabilizou recursos que transformaram a arquitetura de microsserviços e bibliotecas. Até então, bibliotecas de APM (Datadog, New Relic, OpenTelemetry) dependiam de 'continuation-local-storage' ou da API de baixo nível async_hooks que era complexa e propensa a vazamentos de memória. A introdução da classe de alto nível AsyncLocalStorage entregou uma API limpa, segura e otimizada no core. Paralelamente, os campos 'exports' e 'imports' no package.json modernizaram o encapsulamento de módulos.",
        bullets: [
          "AsyncLocalStorage: API oficial para Context Propagation através de Promises, async/await, Timers e EventEmitters.",
          "Package Entry Points ('exports'): mapeamento explícito de subcaminhos públicos e suporte a condições por ambiente (node, import, require, types).",
          "Subpath Imports ('imports' com prefixo #): permite criar atalhos internos no próprio projeto (ex: import db from '#db/client') sem caminhos relativos '../../../'.",
          "Operadores ES2020 nativos: Optional Chaining (?.) evita TypeError ao ler propriedades aninhadas e Nullish Coalescing (??) só aplica fallback para null ou undefined (preservando 0 e '')."
        ],
        callout: {
          type: "info",
          title: "Por que ?? é muito mais seguro que || para valores padrão?",
          text: "const timeout = config.timeout || 5000 sobrescreve acidentalmente o valor legítimo 0 (pois 0 é falsy em JS)! Já const timeout = config.timeout ?? 5000 preserva 0 e false, acionando o padrão 5000 exclusivamente se config.timeout for null ou undefined."
        }
      },
      {
        heading: "Como Utilizar na Prática: AsyncLocalStorage para Observabilidade e Campo 'exports'",
        body: "Para implementar rastreamento distribuído (Correlation ID / Request ID) em qualquer framework HTTP (Express, Fastify, Koa, NestJS), crie uma instância singleton de AsyncLocalStorage, envolva o processamento da requisição com storage.run(store, () => next()) no primeiro middleware e acesse storage.getStore() de qualquer camada profunda (repositório de banco, logger Pino, cliente HTTP) sem alterar a assinatura das suas funções de negócio.",
        bullets: [
          "Criando o contexto: const als = new AsyncLocalStorage(); als.run({ requestId: crypto.randomUUID(), userId }, () => handleRequest());",
          "Lendo em qualquer lugar:const store = als.getStore(); logger.info({ requestId: store?.requestId }, 'Processando pagamento');",
          "Definindo 'exports' no package.json: { \"exports\": { \".\": { \"types\": \"./dist/index.d.ts\", \"import\": \"./dist/index.mjs\", \"require\": \"./dist/index.cjs\" }, \"./package.json\": \"./package.json\" } }.",
          "Atalhos internos seguros: defina \"imports\": { \"#domain/*\": \"./src/domain/*.js\" } no package.json para eliminar imports relativos frágeis."
        ],
        callout: {
          type: "tip",
          title: "Regra Importante do TypeScript em Conditional Exports",
          text: "No objeto de condições do campo \"exports\", a chave \"types\" deve SEMPRE vir como a PRIMEIRA propriedade do objeto (antes de \"import\" e \"require\") para que o compilador TypeScript (moduleResolution: nodenext) a localize corretamente."
        }
      },
      {
        heading: "Retrocompatibilidade: Encapsulamento Estrito e Prevenção do Dual Package Hazard",
        body: "Antes do Node 14, qualquer consumidor de uma biblioteca podia importar arquivos internos privados fazendo require('biblioteca/lib/ interno/secreto.js'). Isso impedia autores de bibliotecas de refatorarem sua estrutura interna de pastas sem quebrar usuários em versões patch/minor. Ao adicionar o campo \"exports\" no package.json, o Node ativa um bloqueio estrito: qualquer caminho não listado explicitamente em \"exports\" lança ERR_PACKAGE_PATH_NOT_EXPORTED. Além disso, ao publicar pacotes híbridos (ESM + CJS), surgiu o 'Dual Package Hazard': se a aplicação carregar o mesmo pacote via import e via require(), duas cópias distintas do módulo existirão na memória, quebrando verificações instanceof e estados singletons.",
        bullets: [
          "Prevenindo o Dual Package Hazard (Abordagem Wrapper): mantenha o núcleo ou estado singleton em um único formato (ex: CJS) e faça o entrypoint ESM ser apenas um wrapper fino que reexporta o CJS.",
          "Expondo package.json: muitas ferramentas de build leem require('pacote/package.json'); ao adotar \"exports\", inclua \"./package.json\": \"./package.json\" para manter retrocompatibilidade com ferramentas de terceiros.",
          "Melhoria contínua de performance: no Node 22/24, o AsyncLocalStorage foi reescrito internamente no V8 usando AsyncContextFrame, reduzindo o overhead de performance para praticamente zero."
        ],
        callout: {
          type: "warning",
          title: "Atenção ao Adicionar 'exports' em Pacotes Existentes",
          text: "Adicionar o campo \"exports\" pela primeira vez em uma biblioteca já publicada é uma Breaking Change (SemVer Major), pois bloqueará consumidores que faziam deep imports de arquivos não listados."
        }
      }
    ]
  },
  {
    id: "nd-cap-6",
    number: 6,
    part: "ESM & Concorrência",
    partColor: "blue",
    title: "Node.js 16 (LTS): Prefixos node:, Timers Promises, Web Crypto & AbortController",
    subtitle: "Cancelamento padronizado com AbortSignal (Gallium), await setTimeout(), Web Crypto API e Apple Silicon ARM64",
    readingTime: "15 min",
    keyConcepts: [
      "Prefixo node: (node:fs)",
      "node:timers/promises",
      "AbortController & AbortSignal",
      "Web Crypto API (crypto.subtle)",
      "unhandledRejection Exit Code 1",
      "Corepack & Apple Silicon ARM64"
    ],
    teacherIntro:
      "O Node.js 16 LTS (Gallium, 2021) consolidou a convergência entre o Node.js e as APIs padronizadas da Web (WHATWG / W3C). Pela primeira vez, o cancelamento de operações assíncronas (timers, streams, requisições HTTP, leitura de arquivos e processos filhos) ganhou uma primitiva universal: AbortController e AbortSignal. O Node 16 também blindou a importação de módulos nativos com o esquema de URL 'node:', introduziu 'node:timers/promises' e tornou fatal qualquer Promise rejeitada sem tratamento.",
    keyTakeaways: [
      "O prefixo 'node:' (ex: import fs from 'node:fs/promises') garante resolução direta do módulo embutido do runtime, protegendo contra ataques de typosquatting e colisões no node_modules.",
      "O módulo nativo 'node:timers/promises' fornece versões baseadas em Promises e Async Iterators de setTimeout, setImmediate e setInterval sem precisar de new Promise(r => setTimeout(r, ms)).",
      "AbortController e AbortSignal permitem cancelar operações em andamento em fetch, fs.readFile, stream.pipeline, child_process.spawn, eventos (events.once) e timers.",
      "A partir do Node 16 (introduzido no Node 15), uma unhandledRejection encerra o processo Node.js imediatamente com exit code 1 por padrão, igualando o rigor das exceções síncronas."
    ],
    sections: [
      {
        heading: "Novidades por Versão: Node.js 16 LTS (Gallium)",
        body: "Promovido a LTS em outubro de 2021 com V8 9.4, o Node 16 foi a primeira versão LTS com binários nativos para processadores Apple Silicon (M1 / ARM64) e incluiu o gerenciador de gerenciadores de pacotes Corepack (permitindo fixar versões exatas de pnpm e Yarn no package.json via campo 'packageManager'). Na camada de APIs, estabilizou a Web Crypto API (globalThis.crypto.subtle e crypto.randomUUID()), Timers Promises, AbortController global, btoa/atob para compatibilidade legada e RegExp Match Indices (/d flag).",
        bullets: [
          "node:timers/promises: exporta setTimeout(delay, value, { signal }), setImmediate(value) e setInterval(delay, value) como Async Iterables.",
          "crypto.randomUUID(): gera UUIDs v4 criptograficamente seguros em C++ até 3x mais rápido que o pacote npm 'uuid'.",
          "Web Crypto API (crypto.subtle): implementação padrão W3C para criptografia AES-GCM, RSA-OAEP, ECDSA, ECDH e HKDF compartilhável entre navegador, Edge e Node.",
          "Corepack: executável despachado junto com o Node que intercepta comandos 'pnpm' e 'yarn', baixando automaticamente a versão declarada em \"packageManager\": \"pnpm@9.15.0\"."
        ],
        callout: {
          type: "info",
          title: "Por que Usar Sempre o Prefixo 'node:' nos Imports?",
          text: "Sem o prefixo 'node:', se uma versão futura do Node adicionar um novo módulo embutido (como 'node:test' no Node 18 ou 'node:sqlite' no Node 22.5), ou se alguém instalar acidentalmente um pacote malicioso homônimo no npm, pode haver ambiguidade. Com 'node:fs', 'node:test' e 'node:sqlite', o Node ignora totalmente o node_modules e carrega o binário interno."
        }
      },
      {
        heading: "Como Utilizar na Prática: AbortController, AbortSignal.timeout() e Timers Promises",
        body: "Operações de I/O sem timeout ou mecanismo de cancelamento são a principal causa de exaustão de sockets e cascata de falhas em microsserviços. Com AbortController (e os métodos estáticos modernos AbortSignal.timeout(ms) e AbortSignal.any([sig1, sig2])), você propaga um único sinal de cancelamento desde a borda do controller HTTP até chamadas fetch(), leituras de streams e timers internos.",
        bullets: [
          "Pausa assíncrona limpa: import { setTimeout as sleep } from 'node:timers/promises'; const res = await sleep(500, 'pronto', { signal });",
          "Timeout automático sem criar controller manual: const res = await fetch(url, { signal: AbortSignal.timeout(3000) });",
          "Combinando sinais (ex: desconexão do usuário OU timeout de 5s): const signal = AbortSignal.any([userDisconnectController.signal, AbortSignal.timeout(5000)]);",
          "Aguardando eventos com cancelamento: import { once } from 'node:events'; await once(emitter, 'ready', { signal });"
        ],
        callout: {
          type: "tip",
          title: "Evite Vazamento de Memória com AbortController",
          text: "Sempre trate o erro de cancelamento verificando if (err.name === 'AbortError'). Prefira AbortSignal.timeout(ms) para timeouts simples, pois o runtime gerencia e limpa o timer interno automaticamente no C++."
        }
      },
      {
        heading: "Retrocompatibilidade: A Mudança Crítica de unhandledRejection (Exit Code 1)",
        body: "Do Node 4 ao Node 14, quando uma Promise era rejeitada sem um bloco .catch() ou try/catch (unhandledRejection), o Node apenas imprimia um aviso no console (UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block...) e deixava o servidor continuar rodando em estado potencialmente corrompido (conexões penduradas, locks abertos). A partir do Node 15 e Node 16 LTS, o comportamento padrão passou a ser --unhandled-rejections=throw: o processo encerra com código de saída 1.",
        bullets: [
          "Impacto em aplicações legadas: servidores Express 4 que usavam handlers async (req, res) => { ... } sem capturar erros começaram a reiniciar em produção ao migrar para o Node 16+.",
          "Monitoramento centralizado: registre process.on('unhandledRejection', (reason, promise) => { logger.fatal(reason); }) para logar a falha estruturada antes de encerrar graciosamente.",
          "Flags de transição para sistemas legados: --unhandled-rejections=warn restaura temporariamente o comportamento do Node 14 enquanto a equipe corrige as Promises órfãs."
        ],
        callout: {
          type: "warning",
          title: "Nunca Ignore unhandledRejection Silenciosamente",
          text: "Adicionar process.on('unhandledRejection', () => {}) vazio apenas para impedir o processo de cair esconde bugs graves e causa vazamentos progressivos de memória e conexões de banco de dados."
        }
      }
    ]
  }
];
