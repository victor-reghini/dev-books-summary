// Parte 4: Frameworks do Ecossistema Node.js: Histórico de Versões, Arquitetura Interna & Migração (Capítulos 10 a 12)
// Cobrindo Express.js (1.x a 5.0), Koa (1.x a 2.x), Fastify (1.x a 5.x), NestJS (1.x a 11.x) e Hono (1.x a 4.x)

export const part4Chapters = [
  {
    id: "nd-cap-10",
    number: 10,
    part: "Frameworks Web",
    partColor: "rose",
    title: "Express.js (1.x a 5.0) & Koa: Histórico de Versões, Pipeline de Middlewares & Migração 4 -> 5",
    subtitle: "Da criação sobre o Connect ao Express 5.0: captura nativa de async/await, novo roteador path-to-regexp v8 e modelo Onion do Koa",
    readingTime: "18 min",
    keyConcepts: [
      "Express 1.x a 5.0 History",
      "Pipeline Linear (req, res, next)",
      "Async Error Handling Nativo",
      "path-to-regexp v8 (Anti-ReDoS)",
      "Migração Express 4 -> 5",
      "Koa Onion Model (ctx, await next)"
    ],
    teacherIntro:
      "Criado por TJ Holowaychuk em 2010, o Express.js moldou a arquitetura de servidores web em JavaScript ao estender os objetos nativos http.IncomingMessage (req) e http.ServerResponse (res) através de uma cadeia linear de middlewares. Após 10 anos de reinado da série 4.x, o lançamento oficial do Express 5.0 modernizou o framework para a era do Node 18+, resolvendo o problema histórico de rejeições em funções async/await e blindando o roteador contra ataques de negação de serviço por expressão regular (ReDoS).",
    keyTakeaways: [
      "O Express evoluiu do acoplamento com o Connect (1.x a 3.x) para o núcleo modular com express.Router() no Express 4.x (2014) e finalmente para o suporte nativo a Promises/async-await no Express 5.0 (2024/2025).",
      "No Express 4, uma exceção ou Promise rejeitada dentro de um handler async (req, res) => { ... } NÃO aciona o middleware de erro (err, req, res, next) automaticamente; no Express 5, o roteador intercepta a Promise retornada e chama next(err) nativamente.",
      "O Express 5 atualizou o path-to-regexp para a v8 por segurança contra ReDoS, substituindo coringas anônimos '/*' por parâmetros nomeados '/*splat' e opcionais '/:ext?' por chaves explícitas '/{.:ext}'.",
      "O Koa (criado pela mesma equipe original) substituiu o pipeline linear unidirecional do Express pelo Onion Model bidirecional (async (ctx, next) => { await next(); }) com objeto Context unificado."
    ],
    sections: [
      {
        heading: "Histórico Completo de Versões e Implementações: Express (1.x a 5.0) e Koa (1.x a 2.x)",
        body: "Compreender a evolução histórica do Express e do Koa explica o motivo de milhares de bases de código corporativas serem escritas da forma como são hoje. No Express 1.x a 3.x (2010-2012), o framework era construído sobre o Connect e trazia dezenas de middlewares acoplados (bodyParser, cookieParser, session, logger). Em 2014, o Express 4.0 removeu o Connect, extraiu os middlewares para pacotes independentes, criou a API modular express.Router() e, na versão 4.16.0 (2017), reincorporou express.json() e express.urlencoded(). Como o Express 4 foi desenhado antes do ES2017 (async/await), seu roteador invocava fn(req, res, next) ignorando o valor de retorno (a Promise!). Enquanto isso, o Koa 1.x (2013, usando Generators function* e yield next) e o Koa 2.x (usando async/await) nasceram para oferecer composição assíncrona pura no formato Onion Model. Finalmente, o Express 5.0 (2024/2025, exigindo Node 18+) uniu a familiaridade da API do Express com captura nativa de Promises rejeitadas.",
        bullets: [
          "Express 1.x - 3.x (2010-2012): baseado no Connect; usava app.configure() e dependia de callbacks síncronos/assíncronos manuais.",
          "Express 4.0 - 4.21 (2014-2024): introduziu express.Router(); exigia wrappers (asyncHandler) ou o pacote 'express-async-errors' para capturar falhas em funções async.",
          "Express 5.0 (2024-2025): captura automática de erros em funções async e Promises rejeitadas, path-to-regexp v8 seguro contra ReDoS, req.query como getter imutável e suporte a brotli em res.sendFile.",
          "Koa 1.x -> 2.x: arquitetura sem middlewares embutidos; encapsula req/res em ctx (ctx.request, ctx.response, ctx.body) e permite executar lógica ANTES e DEPOIS do restante da cadeia com await next()."
        ],
        callout: {
          type: "info",
          title: "Diferença Arquitetural: Pipeline Linear (Express) vs Onion Model (Koa)",
          text: "No Express, quando um middleware chama next(), o controle passa para o próximo middleware de forma linear sem retornar uma Promise de conclusão da resposta (para medir o tempo total da resposta no Express é preciso escutar res.on('finish')). Já no Koa, await next() pausa o middleware atual, desce até o controller, e quando o controller termina, a execução sobe de volta pelas camadas anteriores (como uma cebola)."
        }
      },
      {
        heading: "Como Utilizar o Express 5 na Prática: Async Nativo, Router Modular e Error Middleware",
        body: "No Express 5, você escreve handlers assíncronos limpos sem blocos try/catch repetitivos em cada rota. Qualquer throw new Error() ou Promise rejeitada dentro de um middleware ou rota async é automaticamente capturado pelo roteador interno (router) e encaminhado para o middleware global de tratamento de erros. Lembre-se de que o middleware de erro no Express é identificado em tempo de execução pela aridade da função (Function.prototype.length === 4): ele DEVE declarar exatamente os 4 parâmetros (err, req, res, next).",
        bullets: [
          "Rota assíncrona limpa no Express 5: app.get('/users/:id', async (req, res) => { const user = await db.findById(req.params.id); if (!user) throw new HttpError(404, 'Não encontrado'); res.json(user); });",
          "Error Handler Global (4 parâmetros obrigatórios): app.use((err, req, res, next) => { if (res.headersSent) return next(err); res.status(err.statusCode ?? 500).json({ error: err.message }); });",
          "Segurança e Hardening: sempre desative o cabeçalho de identificação com app.disable('x-powered-by') (ou use o middleware helmet) e defina limites de payload em express.json({ limit: '100kb' }).",
          "Validação de Status HTTP: no Express 5, res.status(code) valida estritamente se o código é um inteiro válido entre 100 e 999, lançando erro imediato se receber strings ou códigos inválidos."
        ],
        callout: {
          type: "tip",
          title: "Cuidado com a Assinatura do Error Middleware!",
          text: "Se você escrever app.use((err, req, res) => { ... }) omitindo o quarto parâmetro 'next', o Express verificará fn.length === 3 e o registrará como um middleware COMUM (e não de erro!), fazendo com que seus erros nunca sejam capturados por ele."
        }
      },
      {
        heading: "Retrocompatibilidade e Guia de Migração Express 4 -> Express 5",
        body: "Para migrar uma aplicação de Express 4 para Express 5 com zero regressões, o ponto mais crítico de revisão é a sintaxe de caminhos de rota (atualizada para eliminar expressões regulares ambíguas vulneráveis a Catastrophic Backtracking / ReDoS) e a remoção de assinaturas depreciadas há anos.",
        bullets: [
          "1. Coringas (Wildcards) agora exigem nome: no Express 4 usava-se app.get('*', fn) ou app.get('/files/*', fn); no Express 5 DEVE-SE nomear o parâmetro: app.get('/*splat', fn) ou app.get('/files/*filepath', fn).",
          "2. Parâmetros opcionais usam chaves {}: no Express 4 usava-se '/users/:id?'; no Express 5 a interrogação solta não existe mais, devendo-se escrever '/users{/:id}' ou '/:file{.:ext}'.",
          "3. Remoção de regex inline em parâmetros: padrões como '/user/:id(\\\\d+)' foram removidos para impedir ReDoS; valide o formato do parâmetro dentro do handler (ex: com Zod) ou em middleware dedicado.",
          "4. req.query agora é um getter: no Express 4, req.query era um objeto mutável populado uma vez; no Express 5, é um getter dinâmico (não é possível sobrescrever req.query = ... diretamente em middlewares de mutação).",
          "5. Métodos legados removidos: substitua app.del() por app.delete(), res.send(status, body) por res.status(status).send(body), res.json(status, obj) por res.status(status).json(obj) e req.param('id') por req.params.id / req.body.id / req.query.id."
        ],
        callout: {
          type: "warning",
          title: "Passando Números para res.send(200) no Express 5",
          text: "No Express 4, chamar res.send(200) enviava o status HTTP 200 com texto 'OK'. No Express 5, res.send() aceita apenas corpos (strings, buffers, objetos) e lança erro se receber um número! Use res.sendStatus(200) ou res.status(200).end()."
        }
      }
    ]
  },
  {
    id: "nd-cap-11",
    number: 11,
    part: "Frameworks Web",
    partColor: "rose",
    title: "Fastify (1.x a 5.x): Histórico de Versões, Radix-Tree Router, JSON Schema JIT & Plugins",
    subtitle: "Arquitetura de baixo overhead: evolução do Fastify 1.0 ao 5.0, compilação Ajv + fast-json-stringify, ciclo de Hooks e Type Providers",
    readingTime: "18 min",
    keyConcepts: [
      "Fastify 1.x a 5.x History",
      "Radix-Tree Router (find-my-way)",
      "JSON Schema JIT (Ajv + FJS)",
      "Ciclo de Vida de Hooks",
      "Encapsulamento DAG (avvio)",
      "Type Providers (TypeBox / Zod)"
    ],
    teacherIntro:
      "Quando Matteo Collina e Tomas Della Vedova analisaram os gargalos de performance de servidores Node.js em 2016-2018, descobriram que grande parte do tempo de CPU não era gasta no I/O, mas sim em três operações síncronas na thread principal: casamento linear de rotas com Regex, JSON.stringify() genérico e logging bloqueante. O Fastify nasceu para eliminar esses três gargalos através de roteamento em árvore Radix (O(k)), compilação JIT de schemas JSON e encapsulamento dirigido por grafos (DAG).",
    keyTakeaways: [
      "O Fastify substitui a busca linear O(n) de rotas por uma Radix Tree (find-my-way), onde o tempo de busca depende apenas do comprimento da URI, mantendo performance constante mesmo com milhares de rotas.",
      "Ao declarar um JSON Schema na rota, o Fastify compila validadores ultra-rápidos com Ajv para a entrada e funções de serialização especializadas com fast-json-stringify para a saída (2x a 3x mais rápido que JSON.stringify).",
      "O sistema de plugins baseado no 'avvio' cria contextos encapsulados isolados: decoradores, hooks e plugins registrados em um sub-contexto nunca vazam para rotas irmãs, a menos que envolvidos com fastify-plugin (fp).",
      "O Fastify 5.0 (2024/2025, Node 20+) consolidou os Type Providers (TypeBox e Zod), reduziu a pressão sobre o Garbage Collector e tornou a validação de JSON Schema ainda mais rigorosa."
    ],
    sections: [
      {
        heading: "Histórico Completo de Versões e Implementações: Fastify 1.x ao Fastify 5.x",
        body: "Desde o Fastify 1.0 (2018) e 2.0 (2019), o framework estabeleceu seus quatro pilares arquiteturais: find-my-way (roteador Radix Tree), fast-json-stringify (serialização baseada em schema), Ajv (validação de payload) e Pino (logger JSON assíncrono de baixíssimo custo). No Fastify 3.x (2020), o sistema de tipos TypeScript foi reescrito do zero com suporte a genéricos nas rotas. No Fastify 4.x (2022), todos os pacotes oficiais migraram para o namespace @fastify/*, o suporte a middlewares Express/Connect síncronos foi removido do core (isolado em @fastify/middie) e surgiram os Type Providers (@fastify/type-provider-typebox e @fastify/type-provider-zod), que unificam validação em runtime e tipagem estática em tempo de compilação. No Fastify 5.x (2024/2025), o baseline subiu para o Node 20 LTS, otimizando o ciclo interno de Request/Reply.",
        bullets: [
          "Fastify 1.x - 2.x (2018-2019): criação da arquitetura Radix-Tree + Ajv + fast-json-stringify + Pino + avvio plugin graph.",
          "Fastify 3.x (2020): reescrita TypeScript-first, validação precompilada e padronização de hooks assíncronos.",
          "Fastify 4.x (2022): introdução dos Type Providers (TypeBox, Zod, JsonSchemaToTs), migração para @fastify/* e melhorias no roteador find-my-way v7.",
          "Fastify 5.x (2024-2025): requer Node 20+, separação entre opções 'logger' e instância 'loggerInstance', validação estrita de schemas de rota e remoção de APIs legadas."
        ],
        callout: {
          type: "info",
          title: "Como fast-json-stringify Consegue Ser Mais Rápido que JSON.stringify() Nativo?",
          text: "O JSON.stringify() nativo do V8 precisa inspecionar dinamicamente as chaves e os tipos de cada propriedade do objeto a cada requisição. Quando você fornece o schema de resposta (response: { 200: schema }) no Fastify, o fast-json-stringify gera em tempo de boot uma função JS específica que concatena diretamente as propriedades esperadas sem reflexão dinâmica e ainda filtra automaticamente campos sensíveis (como passwordHash) que não estejam no schema!"
        }
      },
      {
        heading: "Como Utilizar o Fastify 5 na Prática: Ciclo de Vida (Hooks), Schemas, TypeBox e Encapsulamento",
        body: "Diferente do Express onde tudo é um único tipo de middleware genérico, o Fastify possui um Ciclo de Vida determinístico dividido em Hooks especializados: onRequest -> preParsing -> preValidation -> preHandler -> Handler da Rota -> preSerialization -> onError -> onSend -> onResponse. Use preValidation ou preHandler para autenticação/autorização, declare schemas com TypeBox ou Zod para validar body/querystring/params/headers e utilize decoradores (fastify.decorate) para injetar conexões de banco de dados sem variáveis globais.",
        bullets: [
          "Ciclo exato de Hooks: onRequest (antes de ler o body) -> preParsing -> preValidation -> preHandler (após validar schema) -> [Handler] -> preSerialization -> onSend -> onResponse (após enviar bytes ao cliente).",
          "Type Provider com TypeBox: const app = Fastify({ logger: true }).withTypeProvider<TypeBoxTypeProvider>(); infere automaticamente os tipos de request.body e reply sem duplicar interfaces TS.",
          "Isolamento de Contexto (Encapsulamento): cada fastify.register(async (instance) => { ... }) cria um escopo filho herdando do pai, mas isolado dos irmãos.",
          "Compartilhando Plugins de Infraestrutura: envolva plugins de banco ou autenticação com import fp from 'fastify-plugin'; export default fp(async (fastify) => { fastify.decorate('db', pool); }); para expor o decorador ao escopo pai."
        ],
        callout: {
          type: "tip",
          title: "Regra de Ouro em Handlers Assíncronos do Fastify",
          text: "Em handlers async (request, reply) => { ... }, retorne diretamente o objeto (return { ok: true }) OU use return reply.code(201).send({ ok: true }). Nunca chame reply.send() dentro de uma função async sem dar return, caso contrário a resolução da função async tentará enviar uma segunda resposta e disparará FST_ERR_REP_ALREADY_SENT!"
        }
      },
      {
        heading: "Retrocompatibilidade e Guia de Migração Fastify 3 -> 4 -> 5",
        body: "O Fastify mantém guias de migração claros e codemods automatizados entre versões principais. Ao atualizar de versões anteriores (3.x ou 4.x) para o Fastify 5.0, observe as mudanças na instanciação do logger Pino, na definição de schemas JSON e nos métodos de redirecionamento.",
        bullets: [
          "1. Instanciação do Logger (Fastify 5): passe configurações em Fastify({ logger: { level: 'info' } }), mas se você criar uma instância externa customizada do Pino (pino()), passe-a na nova propriedade Fastify({ loggerInstance: meuPino }).",
          "2. Ordem de argumentos em reply.redirect() (Fastify 5): mudou de reply.redirect(302, '/login') para reply.redirect('/login', 302) (ou use reply.code(302).redirect('/login')), tornando o código de status opcional como segundo parâmetro.",
          "3. Schemas de parâmetros/querystring mais estritos: no Fastify 5, todo schema JSON de params ou querystring deve declarar explicitamente type: 'object' na raiz.",
          "4. Remoção de reply.context.config: acesse configurações customizadas da rota através de request.routeOptions.config em vez da propriedade interna depreciada."
        ],
        callout: {
          type: "warning",
          title: "Proteção Automática contra Vazamento de Dados no Response Schema",
          text: "Se você definir um schema para response: { 200: { type: 'object', properties: { id: { type: 'number' }, nome: { type: 'string' } } } }, qualquer outra propriedade presente no objeto retornado pelo banco (como senha, cpf, tokenInterno) será automaticamente descartada antes de ir para a rede!"
        }
      }
    ]
  },
  {
    id: "nd-cap-12",
    number: 12,
    part: "Frameworks Web",
    partColor: "rose",
    title: "NestJS (1.x a 11.x) & Hono (1.x a 4.x): Histórico de Versões, DI Modular, Adaptadores HTTP & Edge",
    subtitle: "Arquitetura Enterprise com Decorators, Injeção de Dependência, Express vs Fastify Adapter, SWC e Web Standards no Hono",
    readingTime: "19 min",
    keyConcepts: [
      "NestJS 1.x a 11.x History",
      "IoC Container & DI Modular",
      "Guards, Interceptors, Pipes & Filters",
      "Express 5 vs Fastify 5 Adapter",
      "Hono 1.x a 4.x (Web Standards)",
      "Matriz de Decisão de Frameworks"
    ],
    teacherIntro:
      "Enquanto Express e Fastify focam na camada de transporte e roteamento HTTP dando liberdade total para organizar pastas, grandes equipes corporativas frequentemente sofriam com arquiteturas inconsistentes à medida que o projeto crescia para centenas de endpoints. Criado por Kamil Mysliwiec em 2017, o NestJS resolveu esse desafio trazendo Injeção de Dependência (IoC), módulos fortemente encapsulados e pipelines declarativos em TypeScript. Já na outra ponta da evolução moderna, o Hono (criado por Yusuke Wada em 2022) unificou o desenvolvimento entre Node.js, Cloudflare Workers, Deno e Bun usando 100% Web Standards.",
    keyTakeaways: [
      "O NestJS desacopla a arquitetura de negócio do motor HTTP subjacente através de adaptadores: a mesma aplicação pode rodar sobre @nestjs/platform-express (Express 5 no Nest 11) ou @nestjs/platform-fastify (Fastify 5 no Nest 11).",
      "O pipeline de execução de uma requisição no NestJS segue uma ordem rigorosa: Middlewares -> Guards (autorização) -> Interceptors (pré-controller) -> Pipes (validação/transformação) -> Controller/Service -> Interceptors (pós-controller) -> Exception Filters.",
      "O NestJS 11 (2024/2025) atualizou seus adaptadores para Express 5 e Fastify 5, otimizou a resolução de dependências do container IoC e introduziu a classe base IntrinsicException.",
      "O Hono 4.x constrói rotas e middlewares diretamente sobre as APIs Web Standard (Request, Response, FetchEvent) com RPC tipado de ponta a ponta (hono/client) e altíssima performance tanto no Node (@hono/node-server) quanto na Edge."
    ],
    sections: [
      {
        heading: "Histórico Completo de Versões e Implementações: NestJS (1.x a 11.x) e Hono (1.x a 4.x)",
        body: "A trajetória do NestJS reflete a maturidade do TypeScript no backend. Nas versões 1.x a 6.x (2017-2019), o NestJS consolidou o container de Inversão de Controle (IoC) com @Module, @Controller e @Injectable, abstraiu o motor HTTP permitindo trocar Express por Fastify com duas linhas de código, e criou a camada de Microsserviços (@nestjs/microservices para TCP, Redis, MQTT, gRPC, RabbitMQ e Kafka). Nas versões 7.x e 8.x (2020-2021), adicionou API Versioning nativo (@Version), escopos de injeção por requisição (Scope.REQUEST) e Durable Providers para sistemas multi-tenant. Nas versões 9.x e 10.x (2022-2023), introduziu o ConfigurableModuleBuilder, o modo REPL interativo e o suporte ao compilador SWC em Rust (20x mais rápido que tsc). No NestJS 11.x (2024-2025, Node 20+), trouxe suporte oficial a Express 5 e Fastify 5. Em paralelo, o Hono evoluiu da v1 (2022) para a v4 (2024/2025) tornando-se o framework Web Standard mais adotado para arquiteturas híbridas Node + Edge + Serverless.",
        bullets: [
          "NestJS 1.x - 6.x: IoC Container, Decorators (@Get, @Post, @Body, @Param), Guards, Interceptors (RxJS), Pipes, Exception Filters e HttpAdapter (Express/Fastify).",
          "NestJS 7.x - 10.x: API Versioning, Durable Providers, ConfigurableModuleBuilder, compilador SWC integrado na Nest CLI e suporte nativo a vitest/jest.",
          "NestJS 11.x (2024-2025): integração com Express 5 e Fastify 5, geração de chaves de metadados O(1) para boot rápido em monorepos gigantes, ParseDatePipe nativo e IntrinsicException.",
          "Hono 1.x - 4.x (2022-2025): roteadores RegExpRouter / LinearRouter / SmartRouter, zero dependências, middlewares Zod (@hono/zod-validator), cliente RPC tipado (hc<AppType>) e adaptador @hono/node-server."
        ],
        callout: {
          type: "info",
          title: "Ordem Exata do Ciclo de Vida de uma Requisição no NestJS",
          text: "1. Incoming Request -> 2. Global/Module Middlewares -> 3. Global/Controller/Route Guards (canActivate) -> 4. Interceptors (antes de handle()) -> 5. Global/Controller/Route/Param Pipes (transform) -> 6. Controller Method & Injected Services -> 7. Interceptors (depois de handle() via RxJS map/tap) -> 8. Exception Filters (se ocorrer erro em qualquer etapa) -> 9. HTTP Response."
        }
      },
      {
        heading: "Como Utilizar NestJS 11 (com FastifyAdapter) e Hono 4 na Prática",
        body: "No NestJS 11, para obter o melhor dos dois mundos (arquitetura corporativa modular + performance extrema de roteamento Radix e serialização), substitua o adaptador Express padrão pelo FastifyAdapter de '@nestjs/platform-fastify'. Use ValidationPipe global ou pipes baseados em Zod/TypeBox para sanitizar payloads de entrada e crie testes unitários isolados com Test.createTestingModule() substituindo repositórios reais por mocks na árvore de DI. Já para microsserviços leves, BFFs (Backend For Frontend) ou APIs que precisam rodar tanto em containers Node quanto em Cloudflare Workers / AWS Lambda, utilize o Hono 4 exportando o tipo das rotas (export type AppType = typeof routes) para consumo imediato no frontend.",
        bullets: [
          "Ativando Fastify 5 no NestJS 11: const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: true }));",
          "Escopos de Injeção no NestJS: prefira sempre Scope.DEFAULT (Singleton) combinado com AsyncLocalStorage (via pacote nestjs-cls) em vez de Scope.REQUEST, pois Scope.REQUEST força a recriação em cascata de toda a sub-árvore de controllers a cada requisição HTTP.",
          "Servidor Hono 4 no Node.js: import { Hono } from 'hono'; import { serve } from '@hono/node-server'; const app = new Hono(); app.get('/health', (c) => c.json({ ok: true })); serve({ fetch: app.fetch, port: 3000 });",
          "RPC End-to-End com Hono: encadeie rotas const route = app.post('/users', zValidator('json', schema), (c) => c.json({ id: 1 }, 201)); e consuma no cliente com inferência total de entrada e saída."
        ],
        callout: {
          type: "tip",
          title: "Dica de Performance Crítica no NestJS: Evite Scope.REQUEST",
          text: "Marcar um Service com @Injectable({ scope: Scope.REQUEST }) faz com que o NestJS precise instanciar uma nova cópia do Service e do Controller em TODAS as requisições, reduzindo o throughput em até 30%. Em vez disso, mantenha seus Services como Singletons (Scope.DEFAULT) e use AsyncLocalStorage para ler o contexto da requisição atual!"
        }
      },
      {
        heading: "Retrocompatibilidade e Matriz de Decisão: Express 5 vs Fastify 5 vs NestJS 11 vs Hono 4",
        body: "Ao atualizar para o NestJS 11 usando a plataforma padrão (@nestjs/platform-express), lembre-se de que o Express subjacente agora é o Express 5.0! Isso significa que coringas em rotas de controllers ou middlewares (como @Get('*') ou forRoutes('*')) devem seguir a nova sintaxe nomeada do Express 5 (como '*splat' ou '{*splat}'). Para escolher o framework ideal para cada projeto, avalie os requisitos de governança, performance e ambiente de deploy:",
        bullets: [
          "Quando escolher Express 5: APIs REST tradicionais, migração suave de sistemas Express 4 existentes, prototipação rápida ou projetos que dependem fortemente de bibliotecas de middleware específicas do ecossistema Connect/Express.",
          "Quando escolher Fastify 5: sistemas de alto throughput e baixa latência, microsserviços orientados a contratos JSON Schema / OpenAPI / TypeBox, onde o custo de serialização JSON e logging estruturado (Pino) é determinante.",
          "Quando escolher NestJS 11: grandes plataformas corporativas, múltiplos times trabalhando no mesmo monorepo, necessidade de padrões arquiteturais padronizados (DI, Guards, Interceptors, Microservices Kafka/gRPC, GraphQL) com opção de usar Fastify 5 por baixo.",
          "Quando escolher Hono 4: arquiteturas multi-runtime (código único que roda em Node.js, Cloudflare Workers, Deno, Bun e Vercel Edge), BFFs Full-Stack TypeScript com RPC tipado (hono/client) e lambdas serverless que exigem cold start próximo de zero."
        ],
        callout: {
          type: "warning",
          title: "Atenção na Migração NestJS 10 -> NestJS 11 com Express 5",
          text: "No NestJS 11 com @nestjs/platform-express, se você tiver um middleware aplicado a todas as rotas via consumer.apply(LoggerMiddleware).forRoutes('*'), atualize para .forRoutes('{*splat}') ou '*splat' para compatibilidade total com o path-to-regexp v8 do Express 5."
        }
      }
    ]
  }
];
