// Parte 3: Runtime Moderno Batteries-Included: Node 18, Node 20, Node 22 & Node 24 (Capítulos 7 a 9)
// Cobrindo Node.js 18 LTS (Hydrogen), Node.js 20 LTS (Iron), Node.js 22 LTS (Jod) e Node.js 23/24

export const part3Chapters = [
  {
    id: "nd-cap-7",
    number: 7,
    part: "Runtime Moderno",
    partColor: "emerald",
    title: "Node.js 18 (LTS): fetch() Global Nativo (Undici), Test Runner (node:test) & --watch",
    subtitle: "A era Batteries-Included (Hydrogen): Web Streams API, structuredClone, util.parseArgs e OpenSSL 3.0",
    readingTime: "16 min",
    keyConcepts: [
      "fetch() Global (Undici)",
      "Test Runner (node:test)",
      "node --watch",
      "Web Streams API",
      "structuredClone & util.parseArgs",
      "OpenSSL 3.0 Migration"
    ],
    teacherIntro:
      "Por mais de uma década, a filosofia do Node.js foi manter um núcleo minimalista ('small core'), delegando testes (Jest/Mocha), requisições HTTP amigáveis (axios/node-fetch), recarregamento em desenvolvimento (nodemon), clonagem profunda (lodash.clonedeep) e parsing de flags CLI (yargs/minimist) para pacotes de terceiros no npm. O Node.js 18 LTS (Hydrogen, 2022) inaugurou a era 'Batteries-Included': todas essas ferramentas essenciais passaram a fazer parte nativa do próprio binário do Node.js.",
    keyTakeaways: [
      "O fetch() global nativo do Node 18+ é construído sobre o Undici, um cliente HTTP/1.1 e HTTP/2 de altíssima performance escrito do zero pela equipe do Node TSC.",
      "O módulo embutido node:test combinado com node:assert/strict oferece describe, it, test, before, after, mocking (mock.fn, mock.method, mock.timers) e relatórios de cobertura sem instalar Jest ou Vitest.",
      "A flag node --watch monitora a árvore de arquivos importados e reinicia o processo automaticamente a cada salvamento, aposentando o nodemon.",
      "A atualização para o OpenSSL 3.0 elevou os padrões de segurança criptográfica, desativando algoritmos legados inseguros (como MD4 e chaves curtas) por padrão."
    ],
    sections: [
      {
        heading: "Novidades por Versão: Node.js 18 LTS (Hydrogen)",
        body: "Promovido a LTS em outubro de 2022 com V8 10.2, o Node 18 incorporou na distribuição padrão o cliente HTTP Undici, expondo globalmente fetch, FormData, Headers, Request e Response. Na mesma versão, nasceram o Test Runner nativo (node:test), o modo de observação de arquivos (node --watch), a Web Streams API global (ReadableStream, WritableStream, TransformStream), a função global structuredClone() para cópia profunda de objetos complexos e o parser nativo de argumentos de linha de comando util.parseArgs().",
        bullets: [
          "fetch() via Undici: suporta keep-alive e pipelining eficientes; para máxima performance em alta escala, também é possível usar undici.request() ou configurar um Agent customizado.",
          "node:test nativo: executa arquivos de teste em paralelo com isolamento de processos via comando 'node --test'.",
          "structuredClone(valor): copia profundamente Maps, Sets, Dates, RegExps, ArrayBuffers e referências circulares nativamente em C++ (muito mais completo que JSON.parse(JSON.stringify(x))).",
          "util.parseArgs(): analisa process.argv com suporte a flags booleanas, opções de string, aliases curtos (-p) e múltiplos valores sem dependências externas."
        ],
        callout: {
          type: "info",
          title: "Interoperabilidade entre Node Streams e Web Streams",
          text: "Precisa converter uma ReadableStream do fetch() (Web Standard) para uma Readable Stream clássica do Node (node:stream) ou vice-versa? Use os métodos estáticos nativos Readable.fromWeb(res.body) e Readable.toWeb(nodeStream)!"
        }
      },
      {
        heading: "Como Utilizar na Prática: fetch(), node:test com Mocks, --watch e parseArgs",
        body: "Em projetos Node 18+, você pode criar microsserviços e CLIs completas com zero dependências de desenvolvimento. Use 'node --watch src/server.js' durante o desenvolvimento, escreva testes unitários e de integração importando { describe, it, mock } from 'node:test' e assert from 'node:assert/strict', e faça chamadas externas com fetch() combinado a AbortSignal.timeout().",
        bullets: [
          "Executando a suíte de testes: node --test --experimental-test-coverage (estável em versões recentes) roda todos os arquivos *.test.js automaticamente.",
          "Espionando funções com node:test: const fn = mock.fn(); ou mock.method(servico, 'buscarUsuario', async () => ({ id: 1 })) sem precisar de Sinon ou Jest.",
          "Verificando status no fetch(): lembre-se de que fetch() só rejeita a Promise em erros de rede/DNS; respostas HTTP 404 ou 500 resolvem normalmente com response.ok === false.",
          "Drenagem de corpo no fetch(): se você não for ler o corpo da resposta, consuma ou cancele response.body.cancel() para devolver o socket rapidamente ao pool de conexões do Undici."
        ],
        callout: {
          type: "tip",
          title: "Desenvolvimento Ágil com --watch e --watch-path",
          text: "Combine node --watch --test para rodar seus testes continuamente a cada alteração de arquivo, ou node --watch-preserve-output src/index.js para não limpar a tela do terminal a cada reinicialização."
        }
      },
      {
        heading: "Retrocompatibilidade: Migração para OpenSSL 3.0 e Requisitos de Sistema (glibc 2.28)",
        body: "A mudança de infraestrutura mais impactante ao atualizar do Node 16 para o Node 18 foi a adoção do OpenSSL 3.0. O OpenSSL 3.0 introduziu o conceito de 'Providers' e moveu algoritmos criptográficos antigos e quebrados (como MD4, RC4, DES e chaves RSA/DH menores que 2048 bits) para o 'legacy provider', desativado por padrão. Ferramentas antigas de build (como Webpack 4 e versões antigas do Create React App) que usavam crypto.createHash('md4') para gerar hashes de arquivos de cache falhavam com o erro Error: error:0308010C:digital envelope routines::unsupported (ERR_OSSL_EVP_UNSUPPORTED).",
        bullets: [
          "Contorno temporário de transição: NODE_OPTIONS='--openssl-legacy-provider' reativa os algoritmos antigos para builds legados enquanto se atualiza para Webpack 5 / Vite.",
          "Certificados TLS corporativos antigos: servidores internos com certificados autoassinados usando SHA-1 ou chaves de 1024 bits são rejeitados pelo nível de segurança padrão (SECLEVEL=1/2) do OpenSSL 3.",
          "Requisitos de Sistema Operacional no Linux: a partir do Node 18, os binários oficiais passaram a exigir glibc 2.28+ (incompatível com Ubuntu 18.04 ou Debian 9 antigos; use Debian 10+, Ubuntu 20.04+, RHEL 8+ ou Alpine com musl)."
        ],
        callout: {
          type: "warning",
          title: "Mudança na Resolução DNS de localhost (IPv6 vs IPv4)",
          text: "A partir do Node 17/18, dns.lookup() parou de reordenar endereços IPv4 na frente do IPv6, passando a respeitar a ordem retornada pelo sistema operacional (frequentemente ::1 IPv6 primeiro). Se um banco local escutar apenas em 127.0.0.1, conecte-se explicitamente a 127.0.0.1 ou use dns.setDefaultResultOrder('ipv4first')."
        }
      }
    ]
  },
  {
    id: "nd-cap-8",
    number: 8,
    part: "Runtime Moderno",
    partColor: "emerald",
    title: "Node.js 20 (LTS): Permission Model (--permission), --env-file Nativo, SEA & import.meta.dirname",
    subtitle: "Segurança em nível de runtime (Iron), fim da dependência dotenv, Single Executable Apps e V8 Maglev",
    readingTime: "16 min",
    keyConcepts: [
      "Permission Model (--permission)",
      "node --env-file=.env",
      "Single Executable Apps (SEA)",
      "import.meta.dirname / filename",
      "V8 Maglev JIT Compiler",
      "Immutable Array Methods"
    ],
    teacherIntro:
      "Historicamente, qualquer pacote instalado via npm possuía acesso irrestrito a todo o sistema de arquivos, rede, variáveis de ambiente e criação de processos filhos do usuário que executava o Node. O Node.js 20 LTS (Iron, 2023) introduziu o Permission Model em nível de runtime para mitigar ataques de supply-chain, além de incorporar leitura nativa de arquivos .env (--env-file), geração de binários autônomos (Single Executable Applications), atalhos ergonômicos import.meta.dirname e o novo compilador JIT V8 Maglev.",
    keyTakeaways: [
      "A flag --permission ativa o modelo de segurança baseado em capacidades: por padrão bloqueia todo acesso ao sistema de arquivos, child_process e worker_threads, liberando apenas o que for declarado em --allow-fs-read e --allow-fs-write.",
      "O suporte nativo a --env-file=.env (e process.loadEnvFile()) carrega variáveis de ambiente em C++ antes do código JS iniciar, eliminando o pacote 'dotenv'.",
      "As propriedades import.meta.dirname e import.meta.filename (adicionadas no ciclo Node 20.11+) devolveram aos ES Modules a simplicidade que __dirname e __filename tinham no CommonJS.",
      "O V8 11.3 no Node 20 introduziu o compilador JIT intermediário Maglev (entre Sparkplug e TurboFan) e os métodos imutáveis de Array ES2023 (.toSorted(), .toReversed(), .toSpliced(), .with())."
    ],
    sections: [
      {
        heading: "Novidades por Versão: Node.js 20 LTS (Iron)",
        body: "Promovido a LTS em outubro de 2023 com V8 11.3, o Node 20 focou em segurança operacional, experiência do desenvolvedor e empacotamento. O Test Runner nativo (node:test) foi marcado como oficialmente estável. A flag --env-file permitiu carregar múltiplos arquivos de configuração (incluindo NODE_OPTIONS dentro do próprio .env!). O recurso Single Executable Applications (SEA) substituiu ferramentas externas descontinuadas (como pkg e nexe) permitindo injetar um bundle JS dentro do binário oficial do Node.",
        bullets: [
          "Permission Model: flags --permission (Node 20/22) / --permission, --allow-fs-read, --allow-fs-write, --allow-child-process, --allow-worker, --allow-addons.",
          "Inspeção programática de permissões: process.permission.has('fs.write', '/tmp/relatorio.pdf') retorna true ou false em tempo de execução.",
          "Carregamento nativo de .env: node --env-file=.env --env-file=.env.local src/server.js (ou --env-file-if-exists=.env).",
          "import.meta.dirname e import.meta.filename: dispensam o boilerplate fileURLToPath(new URL('.', import.meta.url)) em arquivos ES Modules."
        ],
        callout: {
          type: "info",
          title: "Por que --env-file Nativo é Superior ao Pacote dotenv?",
          text: "Quando você usa import 'dotenv/config' dentro do código JS, o processo Node já foi inicializado! Por isso, o pacote dotenv NUNCA conseguia aplicar variáveis que afetam a inicialização da VM (como NODE_OPTIONS='--max-old-space-size=4096' ou UV_THREADPOOL_SIZE=16). Já o --env-file nativo do Node 20 lê o arquivo antes de configurar a VM e a libuv!"
        }
      },
      {
        heading: "Como Utilizar na Prática: --permission, --env-file, SEA e Arrays Imutáveis",
        body: "Em ambientes de produção de alta segurança, inicie o processo restringindo exatamente quais diretórios a aplicação pode ler ou gravar. No código de aplicação, adote os novos métodos não-mutáveis de Array do ES2023 (.toSorted(), .toReversed(), .toSpliced(), .with()) para evitar efeitos colaterais acidentais em objetos compartilhados no estado da aplicação ou caches em memória.",
        bullets: [
          "Executando com menor privilégio: node --permission --allow-fs-read=/app/dist --allow-fs-write=/tmp /app/dist/server.js (qualquer tentativa de ler /etc/passwd lança ERR_ACCESS_DENIED).",
          "Ordenação sem mutar o array original: const ordenados = usuarios.toSorted((a, b) => a.idade - b.idade); (diferente de .sort() que altera o array in-place!).",
          "Empacotamento SEA (Single Executable Application): gere o blob com node --experimental-sea-config sea-config.json e injete no binário com postject para distribuir um executável único sem precisar instalar Node no destino.",
          "Resolução síncrona em ESM: import.meta.resolve('./plugin.js') resolve caminhos de módulos de forma síncrona (assim como require.resolve fazia no CJS)."
        ],
        callout: {
          type: "tip",
          title: "Carregando .env Programaticamente em Testes",
          text: "No Node 20.12+, você também pode chamar process.loadEnvFile('./.env.test') diretamente dentro do setup dos seus testes em node:test ou consultar util.parseEnv(conteudoString) para transformar uma string .env em objeto."
        }
      },
      {
        heading: "Retrocompatibilidade: Isolamento de ESM Loader Hooks e Depreciação de url.parse()",
        body: "No Node 20, a arquitetura de Custom ESM Loader Hooks (usada por ferramentas de instrumentação de APM como OpenTelemetry, ts-node e mocks de módulos) passou por uma mudança estrutural importante: os hooks registrados via module.register('./loader.mjs') passaram a executar em uma thread dedicada separada da thread principal da aplicação! Isso evitou que o código da aplicação interferisse no loader (e vice-versa), mas exigiu que ferramentas de APM atualizassem seus pacotes para comunicar estado entre o loader e a thread principal via MessagePort.",
        bullets: [
          "Nova API de registro: import { register } from 'node:module'; register('./meu-hook.mjs', import.meta.url);",
          "Depreciação de url.parse() (DEP0169): o parser legado url.parse() possuía inconsistências de segurança na interpretação de barras e hostnames (levando a vulnerabilidades de SSRF); use sempre new URL(input, base) e URL.canParse(input).",
          "Validação rápida de URLs: URL.canParse('https://exemplo.com') (adicionado no Node 20) verifica se uma string é uma URL válida sem o custo de lançar e capturar exceção em try { new URL(...) } catch {}."
        ],
        callout: {
          type: "warning",
          title: "Atenção ao Usar Instrumentação OpenTelemetry em ESM no Node 20+",
          text: "Em aplicações ES Modules no Node 20+, utilize a flag --import ./instrumentation.mjs (em vez da antiga --loader) para registrar module.register('@opentelemetry/instrumentation/hook.mjs', import.meta.url) antes que qualquer módulo da aplicação seja carregado."
        }
      }
    ]
  },
  {
    id: "nd-cap-9",
    number: 9,
    part: "Runtime Moderno",
    partColor: "emerald",
    title: "Node.js 22 (LTS) & Node 24: require(esm) Síncrono, TypeScript Nativo, node:sqlite & WebSocket",
    subtitle: "Interoperabilidade histórica CommonJS->ESM (Jod), execução direta de .ts sem build, SQLite embutido e util.styleText",
    readingTime: "18 min",
    keyConcepts: [
      "require(esm) Síncrono",
      "TypeScript Nativo (Type Stripping)",
      "node:sqlite (DatabaseSync)",
      "WebSocket Global",
      "util.styleText & fs.glob",
      "Promise.withResolvers"
    ],
    teacherIntro:
      "Durante anos, a divisão entre CommonJS (require) e ES Modules (import) causou dor de cabeça no ecossistema: quando pacotes populares (como chalk,ora, execa, nanoid) migraram para ESM-only, projetos CommonJS ficaram impedidos de atualizá-los sem reescrever toda a base de código. O Node.js 22 LTS (Jod, 2024) e o Node.js 23/24 encerraram essa divisão ao permitir que require() carregue módulos ES síncronos nativamente! E foram além: trouxeram execução direta de arquivos TypeScript (.ts) sem etapa de build, banco de dados SQLite embutido (node:sqlite) e cliente WebSocket global.",
    keyTakeaways: [
      "No Node 22.12+ LTS e Node 23/24, require('./modulo.mjs') ou require('pacote-esm') funciona nativamente por padrão (sem flags!) para qualquer grafo de módulos ES que não contenha Top-Level await.",
      "O Node 22.6+ (experimental) e Node 23.6+ / Node 24 (ativo por padrão sem flags) executam arquivos .ts diretamente via Type Stripping nativo (baseado em Amaro/SWC), removendo anotações de tipo em memória instantaneamente.",
      "O módulo embutido node:sqlite fornece a classe DatabaseSync e StatementSync para bancos SQLite em arquivo ou em memória (:memory:) sem depender de binários externos como sqlite3 ou better-sqlite3.",
      "Utilitários nativos como util.styleText() (substituindo chalk/picocolors), fs.glob() (substituindo glob/fast-glob) e WebSocket global consolidam um runtime autossuficiente."
    ],
    sections: [
      {
        heading: "Novidades por Versão: Node.js 22 LTS (Jod), Node.js 23 e Node.js 24",
        body: "Promovido a LTS em outubro de 2024 (V8 12.4), o Node 22 trouxe um conjunto histórico de avanços: estabilização do WebSocket client global, util.styleText() para formatação ANSI no terminal respeitando NO_COLOR, fs.glob e fs.promises.glob nativos, aumento do highWaterMark padrão das streams de 16 KiB para 64 KiB (elevando o throughput de I/O em todo o runtime), módulo node:sqlite (Node 22.5+) e ativação por padrão de require(esm) (Node 22.12+). Em seguida, o Node 23 e o Node 24 habilitaram o suporte nativo a TypeScript por padrão (sem precisar de --experimental-strip-types), adicionaram URLPattern global e aprimoraram o Permission Model (--permission).",
        bullets: [
          "require(esm) nativo: permite que código CommonJS consuma pacotes ESM-only de forma transparente e síncrona.",
          "TypeScript nativo (node app.ts): remove tipos TypeScript em tempo real sem gerar arquivos .js intermediários no disco.",
          "node:sqlite: import { DatabaseSync } from 'node:sqlite'; const db = new DatabaseSync(':memory:'); ideal para cache local, CLIs, testes automatizados e aplicações embarcadas.",
          "Novidades ES2024 no V8: Object.groupBy(), Map.groupBy(), Promise.withResolvers() e métodos de conjuntos Set.prototype.intersection(), union(), difference()."
        ],
        callout: {
          type: "info",
          title: "O Impacto do Novo highWaterMark de 64 KiB no Node 22+",
          text: "Desde o Node 0.10, o tamanho padrão do buffer das Streams era 16 KiB (16384 bytes). No Node 22, o valor padrão subiu para 64 KiB (65536 bytes), reduzindo o número de chamadas de sistema (syscalls) e aumentando a velocidade de fs.createReadStream, fetch e pipelines HTTP em até 25%."
        }
      },
      {
        heading: "Como Utilizar na Prática: require(esm), TypeScript Direto, node:sqlite e util.styleText",
        body: "Com o Node 22 LTS e Node 24, iniciar um novo serviço ou script de automação em TypeScript não exige configurar ts-node, tsx, babel ou webpack. Basta criar um arquivo server.ts usando a sintaxe padrão de tipos apagáveis (erasable syntax) e executar 'node server.ts'. Para persistência local rápida ou testes de repositório, instancie DatabaseSync de 'node:sqlite' com prepared statements seguros.",
        bullets: [
          "Executando TypeScript diretamente: node src/server.ts (use 'import type { User } from \"./types.ts\"' para importações puramente de tipo e inclua a extensão .ts nos imports relativos).",
          "Usando SQLite nativo: const db = new DatabaseSync('app.db'); db.exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)'); const insert = db.prepare('INSERT INTO users (name) VALUES (?)'); insert.run('Ada');",
          "Estilizando terminal sem chalk: import { styleText } from 'node:util'; console.log(styleText(['bold', 'green'], '✔ Servidor iniciado!')); (respeita automaticamente variáveis NO_COLOR e FORCE_COLOR).",
          "Promessas mais limpas: const { promise, resolve, reject } = Promise.withResolvers(); substitui o padrão verboso de extrair resolve/reject para fora do construtor new Promise()."
        ],
        callout: {
          type: "tip",
          title: "Configurando o tsconfig.json para TypeScript Nativo do Node",
          text: "No TypeScript 5.8+, ative \"erasableSyntaxOnly\": true, \"allowImportingTsExtensions\": true, \"verbatimModuleSyntax\": true e \"noEmit\": true no seu tsconfig.json. Assim a IDE apontará imediatamente qualquer construção que exija transformação de código."
        }
      },
      {
        heading: "Retrocompatibilidade: Regras de require(esm) e Limites de Type Stripping",
        body: "Para garantir que tanto require(esm) quanto o Type Stripping nativo sejam rápidos, determinísticos e livres de efeitos colaterais inesperados, o Node estabeleceu regras claras de engenharia. Em require(esm), o carregamento é estritamente síncrono: se o módulo ES (ou qualquer dependência profunda dele) contiver um Top-Level await, o Node lançará imediatamente o erro ERR_REQUIRE_ASYNC_MODULE (indicando que aquele módulo específico precisa ser carregado com await import()). Já no TypeScript nativo, o Node realiza 'Type Stripping' (substituição das anotações de tipo por espaços em branco preservando os números de linha para stack traces perfeitos sem precisar de source maps!).",
        bullets: [
          "O que o Type Stripping padrão NÃO processa sem flag: construtos específicos do TS que geram código JavaScript em runtime (como enum tradicional, namespaces com runtime e parameter properties no construtor class A { constructor(private x: number) {} }).",
          "Alternativa moderna para Enums: use union types ('type Status = \"ATIVO\" | \"INATIVO\"') ou objetos constantes ('const Status = { ATIVO: \"ATIVO\" } as const'), ou passe a flag --experimental-transform-types se precisar de enums legados.",
          "Detecção de ciclo em require(esm): se um módulo ESM foi carregado via require(), sua exportação fica disponível como um Module Namespace Object padrão (onde export default fica em mod.default)."
        ],
        callout: {
          type: "warning",
          title: "Por que Autores de Bibliotecas Devem Evitar Top-Level Await Desnecessário?",
          text: "Se você publica uma biblioteca em ESM no npm, evite usar Top-Level await na inicialização do módulo! Módulos ESM síncronos podem ser consumidos tanto por import quanto por require() no Node 22+, garantindo compatibilidade universal com 100% dos projetos."
        }
      }
    ]
  }
];
