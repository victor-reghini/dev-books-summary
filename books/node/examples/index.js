/**
 * Exemplos Práticos de Código e Comparações Históricas de Retrocompatibilidade
 * para o livro "Node.js: Guia Completo de Versões, Event Loop & Frameworks".
 */

export { nodeAnimations } from "./node-animations.js";
export { nodeLabs } from "./node-labs.js";

export const nodeExamples = {
  "nd-cap-1": [
    {
      id: "nd-ex-1-1",
      title: "Node 0.10 a 0.12: Callbacks Aninhados vs. Streams com Backpressure",
      context: "Tratamento de I/O em disco e rede evitando estouro de memória no Event Loop.",
      dirtyLabel: "Antes (Node 0.10): Callback Hell com leitura total na RAM (fs.readFile)",
      dirtyCode: `const fs = require('fs');
const http = require('http');

// Le o arquivo inteiro de 2 GB de uma so vez para a memoria RAM
http.createServer((req, res) => {
  fs.readFile('/var/log/app.log', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end('Erro interno');
    }
    // Cada requisicao concorrente aloca outros 2 GB de heap no V8!
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(data);
  });
}).listen(3000);`,
      cleanLabel: "Depois (Node 0.12+): Streams2/3 com pipeline e controle de backpressure",
      cleanCode: `const fs = require('fs');
const http = require('http');

// Streams processam em pedacos (chunks de 64 KB) com consumo de memoria constante O(1)
http.createServer((req, res) => {
  const stream = fs.createReadStream('/var/log/app.log');
  
  stream.on('error', (err) => {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Erro de leitura');
  });

  // O metodo .pipe() gerencia automaticamente highWaterMark e pausamento da leitura
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  stream.pipe(res);
}).listen(3000);`,
      refactoringNotes: [
        "A evolução de Streams1 (flowing mode) para Streams2/3 garantiu controle automático de backpressure via paused mode.",
        "A resolução de módulos no CommonJS (require síncrono e node_modules) estabeleceu a base do ecossistema npm.",
        "Error-first callbacks (err, data) tornaram-se a convenção mandatória do runtime até a chegada de Promises."
      ]
    }
  ],

  "nd-cap-2": [
    {
      id: "nd-ex-2-1",
      title: "Node 4 & 6 LTS: Classes ES2015, Promises & Alocação Segura de Buffer",
      context: "Eliminação do perigo de vazamento de memória não-zerada com Buffer.from e fim de prototypes manuais.",
      dirtyLabel: "Antes (Node 4): new Buffer(number) vulnerável a vazamento de memória RAM",
      dirtyCode: `// ALERTA DE SEGURANCA: new Buffer(1024) aloca memoria nao inicializada
// Se o buffer for enviado para a rede, vaza senhas e fragmentos de dados de outros processos!
const buf = new Buffer(1024);

function ServicoUsuario(nome) {
  this.nome = nome;
}
ServicoUsuario.prototype.obterNome = function() {
  return this.nome;
};`,
      cleanLabel: "Depois (Node 6 LTS): Buffer.alloc() seguro e classes ES2015 nativas no V8",
      cleanCode: `// Memoria explicitamente zerada com seguranca comprovada
const bufSeguro = Buffer.alloc(1024);
// Buffer.from para criacao a partir de strings ou arrays existentes
const bufString = Buffer.from('Engenharia de Software', 'utf8');

class ServicoUsuario {
  constructor(nome) {
    this.nome = nome;
  }

  obterNome() {
    return this.nome;
  }
}`,
      refactoringNotes: [
        "A regra DEP0005 deprecionou new Buffer(size) devido ao grave risco de segurança.",
        "A reunificação do io.js com o Node 4 sob a Node.js Foundation estabeleceu o ciclo de releases LTS previsível.",
        "O motor V8 5.1 no Node 6 atingiu mais de 93% de conformidade com a especificação ES2015."
      ]
    }
  ],

  "nd-cap-3": [
    {
      id: "nd-ex-3-1",
      title: "Node 8 & 10 LTS: async/await, util.promisify, fs.promises & stream.pipeline",
      context: "Substituição definitiva de callbacks por async/await nativo e prevenção de vazamentos de stream.",
      dirtyLabel: "Antes (Node 8): .pipe() frágil que vaza descritores de arquivo se o socket fechar",
      dirtyCode: `const fs = require('fs');
const zlib = require('zlib');

function compactarArquivo(origem, destino, callback) {
  const r = fs.createReadStream(origem);
  const z = zlib.createGzip();
  const w = fs.createWriteStream(destino);

  // Se 'w' emitir erro, 'r' e 'z' continuam abertos em memoria sem serem destruidos!
  r.pipe(z).pipe(w);
  w.on('finish', callback);
}`,
      cleanLabel: "Depois (Node 10 LTS): stream.pipeline e fs.promises com async/await",
      cleanCode: `const fs = require('node:fs/promises');
const { pipeline } = require('node:stream/promises');
const { createReadStream, createWriteStream } = require('node:fs');
const zlib = require('node:zlib');

async function compactarArquivo(origem, destino) {
  // pipeline() destroi todos os streams se qualquer um falhar e retorna uma Promise nativa
  await pipeline(
    createReadStream(origem),
    zlib.createGzip(),
    createWriteStream(destino)
  );

  // fs.promises nativo sem necessidade de callbacks
  const stats = await fs.stat(destino);
  return stats.size;
}`,
      refactoringNotes: [
        "async/await nativo eliminou a necessidade de compiladores externos como Babel para fluxo assíncrono.",
        "stream.pipeline resolveu o problema histórico de vazamento de descritores de arquivo do .pipe() convencional.",
        "A N-API garantiu estabilidade de Application Binary Interface (ABI) para addons C/C++."
      ]
    }
  ],

  "nd-cap-4": [
    {
      id: "nd-ex-4-1",
      title: "Node 12 LTS: Worker Threads, SharedArrayBuffer & Módulos ES (.mjs)",
      context: "Paralelismo real de CPU sem bloquear o Event Loop principal e suporte oficial a ECMAScript Modules.",
      dirtyLabel: "Antes (Node 10): Processamento de CPU bloqueando o Event Loop de requisições",
      dirtyCode: `// Loop matematico pesado na thread principal: trava o servidor por 3 segundos!
function calcularPrimos(max) {
  const primos = [];
  for (let i = 2; i <= max; i++) {
    let ehPrimo = true;
    for (let j = 2; j * j <= i; j++) {
      if (i % j === 0) { ehPrimo = false; break; }
    }
    if (ehPrimo) primos.push(i);
  }
  return primos;
}`,
      cleanLabel: "Depois (Node 12 LTS): Worker Threads com isolamento de contexto e SharedArrayBuffer",
      cleanCode: `import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';

if (isMainThread) {
  export function calcularEmBackground(max) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(new URL(import.meta.url), { workerData: { max } });
      worker.on('message', resolve);
      worker.on('error', reject);
    });
  }
} else {
  const { max } = workerData;
  const primos = [];
  for (let i = 2; i <= max; i++) {
    let ehPrimo = true;
    for (let j = 2; j * j <= i; j++) {
      if (i % j === 0) { ehPrimo = false; break; }
    }
    if (ehPrimo) primos.push(i);
  }
  parentPort.postMessage(primos);
}`,
      refactoringNotes: [
        "Worker Threads executam em instâncias isoladas do V8 compartilhando memória opcionalmente via SharedArrayBuffer.",
        "Node 12 tornou estável o suporte a ES Modules via extensão .mjs ou campo 'type': 'module' no package.json.",
        "Detecção automática de limites de contêineres Docker/Kubernetes (cgroups) evitou mortes abruptas por OOMKilled."
      ]
    }
  ],

  "nd-cap-5": [
    {
      id: "nd-ex-5-1",
      title: "Node 14 LTS: AsyncLocalStorage para Contexto & Package Exports",
      context: "Propagação limpa de Correlation ID sem poluir assinaturas de funções e encapsulamento de pacotes.",
      dirtyLabel: "Antes (Node 12): Variável global compartilhada com race conditions graves",
      dirtyCode: `// Race condition perigosa: requisicoes simultaneas sobrescrevem a variavel global!
let correlationIdAtual = null;

function processarRequisicao(id, fn) {
  correlationIdAtual = id;
  setTimeout(() => {
    // correlationIdAtual ja pode ter sido alterado por outra requisicao concorrente!
    console.log('Gravando log para:', correlationIdAtual);
    fn();
  }, 100);
}`,
      cleanLabel: "Depois (Node 14 LTS): AsyncLocalStorage para propagação de contexto assíncrono",
      cleanCode: `import { AsyncLocalStorage } from 'node:async_hooks';

export const contextStorage = new AsyncLocalStorage();

export function tratarRequisicao(requestId, callback) {
  // Isola o estado do requestId atraves de toda a arvore assincrona de Promises e I/O
  contextStorage.run({ requestId, inicio: Date.now() }, () => {
    executarLogicaDeNegocio();
    callback();
  });
}

function executarLogicaDeNegocio() {
  const store = contextStorage.getStore();
  console.log('Log auditado com requestId: ' + store?.requestId);
}`,
      refactoringNotes: [
        "AsyncLocalStorage tornou-se a base de bibliotecas de observabilidade como OpenTelemetry no Node.js.",
        "O campo 'exports' no package.json introduziu encapsulamento estrito impedindo import de arquivos internos privados.",
        "Operadores nativos Optional Chaining (?.) e Nullish Coalescing (??) simplificaram o manuseio de objetos nulos."
      ]
    }
  ],

  "nd-cap-6": [
    {
      id: "nd-ex-6-1",
      title: "Node 16 LTS: Prefixo node:, Timers Promises & Cancelamento com AbortSignal",
      context: "Padronização de imports seguros contra typosquatting e cancelamento cooperativo de I/O.",
      dirtyLabel: "Antes (Node 14): setTimeout com callback e falta de controle de cancelamento",
      dirtyCode: `// Import sem prefixo sujeito a colisoes no npm
const fs = require('fs');

function aguardarTimeout(ms, cb) {
  const timer = setTimeout(() => {
    cb(null, 'concluido');
  }, ms);
  return timer;
}`,
      cleanLabel: "Depois (Node 16 LTS): node:timers/promises, prefixo node: e AbortController",
      cleanCode: `import { setTimeout } from 'node:timers/promises';
import { readFile } from 'node:fs/promises';

export async function buscarComTimeout(caminho, limiteMs) {
  const ac = new AbortController();
  const timer = setTimeout(limiteMs, null, { signal: ac.signal });

  try {
    // Se o tempo expirar, abortamos a leitura do arquivo cooperativamente
    const dados = await readFile(caminho, { signal: ac.signal, encoding: 'utf-8' });
    return dados;
  } finally {
    ac.abort(); // Limpa o agendamento
  }
}`,
      refactoringNotes: [
        "O prefixo 'node:' (ex: node:fs, node:stream) impede ataques de typosquatting onde pacotes maliciosos simulam módulos core.",
        "AbortController / AbortSignal padronizou o cancelamento cooperativo de fetch, timers e streams.",
        "unhandledRejection passou a encerrar o processo com Exit Code 1 por padrão no Node 16."
      ]
    }
  ],

  "nd-cap-7": [
    {
      id: "nd-ex-7-1",
      title: "Node 18 LTS: fetch() Global Nativo, Test Runner (node:test) & --watch",
      context: "A era Batteries-Included: eliminação de bibliotecas externas como node-fetch, mocha e nodemon.",
      dirtyLabel: "Antes (Node 16): Dependências externas redundantes (node-fetch, jest, nodemon)",
      dirtyCode: `// Exigia instalar node-fetch no package.json
const fetch = require('node-fetch');

async function consultarCep(cep) {
  const res = await fetch('https://viacep.com.br/ws/' + cep + '/json/');
  return res.json();
}`,
      cleanLabel: "Depois (Node 18 LTS): fetch nativo (Undici) e suite de testes integrada (node:test)",
      cleanCode: `import test from 'node:test';
import assert from 'node:assert/strict';

// fetch nativo global disponivel sem nenhum import ou pacote npm
export async function consultarCep(cep) {
  const res = await fetch('https://viacep.com.br/ws/' + cep + '/json/');
  if (!res.ok) throw new Error('Erro HTTP: ' + res.status);
  return res.json();
}

// Test runner oficial executado com 'node --test'
test('Deve consultar CEP com sucesso', async () => {
  const dados = await consultarCep('01001000');
  assert.equal(dados.cep, '01001-000');
});`,
      refactoringNotes: [
        "fetch global é baseado no cliente Undici de alta velocidade mantido pelo Technical Steering Committee.",
        "node:test elimina a necessidade de frameworks pesados de teste para validações unitárias e de integração.",
        "A flag 'node --watch app.js' substituiu utilitários como nodemon sem instalar nada extra."
      ]
    }
  ],

  "nd-cap-8": [
    {
      id: "nd-ex-8-1",
      title: "Node 20 LTS: Permission Model, --env-file Nativo & import.meta.dirname",
      context: "Segurança de execução em nível de processo e substituição do pacote dotenv por suporte nativo.",
      dirtyLabel: "Antes (Node 18): Acesso irrestrito a todo o disco e dependência do dotenv",
      dirtyCode: `// Exigia dotenv.config() para carregar arquivo .env
require('dotenv').config();
const fs = require('fs');

// Codigo de terceiros ou vulnerabilidade de supply-chain pode ler qualquer arquivo do sistema!
const chavePrivada = fs.readFileSync('/etc/passwd', 'utf8');`,
      cleanLabel: "Depois (Node 20 LTS): node --env-file=.env e Permission Model restritivo",
      cleanCode: `// Executado com: node --env-file=.env --permission --allow-fs-read=/var/data app.mjs
import fs from 'node:fs/promises';

// import.meta.dirname oficial substitui __dirname em ES Modules
console.log('Diretorio atual:', import.meta.dirname);

export async function lerDadoSeguro() {
  // Permitido: leitura em /var/data
  const config = await fs.readFile('/var/data/config.json', 'utf8');
  return JSON.parse(config);
  // Qualquer tentativa de ler fora de /var/data lanca ERR_ACCESS_DENIED imediatamente!
}`,
      refactoringNotes: [
        "--permission (--allow-fs-read, --allow-child-process) cria sandbox de defesa em profundidade contra ataques de supply chain.",
        "A flag '--env-file=.env' eliminou a dependência mais baixada do ecossistema Node.js (dotenv).",
        "import.meta.dirname e import.meta.filename padronizaram o acesso a caminhos em ESM sem gambiarras de URL."
      ]
    }
  ],

  "nd-cap-9": [
    {
      id: "nd-ex-9-1",
      title: "Node 22 LTS & 24: require(esm) Síncrono, TypeScript Nativo & node:sqlite",
      context: "Fim da barreira CJS vs. ESM, execução direta de arquivos .ts e banco de dados SQL embutido.",
      dirtyLabel: "Antes (Node 20): require() falhava ao carregar módulos ES (ERR_REQUIRE_ESM)",
      dirtyCode: `// Em CommonJS legado:
// Erro fatal: Error [ERR_REQUIRE_ESM]: require() of ES Module not supported.
// Forcava o ecossistema a hacks assincronos com import() dinamico.
const moduloEsm = require('pacote-puro-esm');`,
      cleanLabel: "Depois (Node 22 LTS / 24): require(esm) sincrono e Type Stripping nativo (.ts)",
      cleanCode: `// Node 22+ permite carregar modulos ES diretamente com require() se nao tiverem top-level await!
// E permite rodar arquivos TypeScript diretamente sem compilar: 'node app.ts'
import { DatabaseSync } from 'node:sqlite';

interface Usuario {
  id: number;
  nome: string;
}

// Banco SQLite de alta performance embutido no proprio runtime do Node
const db = new DatabaseSync(':memory:');
db.exec('CREATE TABLE usuarios (id INTEGER PRIMARY KEY, nome TEXT)');

const stmt = db.prepare('INSERT INTO usuarios (nome) VALUES (?)');
stmt.run('Engenheiro de Software');

const query = db.prepare('SELECT * FROM usuarios');
console.log(query.all() as Usuario[]);`,
      refactoringNotes: [
        "require(esm) unificou a transição de pacotes do ecossistema, permitindo migração indolor sem quebrar bibliotecas legadas.",
        "Suporte nativo a TypeScript via Type Stripping (apagamento de anotações) permite prototipagem sem tsc ou ts-node.",
        "node:sqlite oferece persistência SQL embarcada síncrona com performance extrema sem compilar drivers nativos."
      ]
    }
  ],

  "nd-cap-10": [
    {
      id: "nd-ex-10-1",
      title: "Express 4 vs. Express 5.0: Captura de Erros Assíncronos & Novo Roteador",
      context: "Eliminação do pacote express-async-errors e prevenção de travamento por Promises rejeitadas.",
      dirtyLabel: "Antes (Express 4): Promises rejeitadas em handlers async travavam a requisição para sempre",
      dirtyCode: `const express = require('express');
const app = express();

// No Express 4, se db.find falhar, o erro e engolido ou derruba o processo!
// Exigia embrulhar tudo em try/catch ou instalar bibliotecas externas.
app.get('/usuarios/:id', async (req, res, next) => {
  try {
    const usuario = await db.find(req.params.id);
    res.json(usuario);
  } catch (err) {
    next(err); // Obrigatorio chamar next(err) manualmente em toda rota!
  }
});`,
      cleanLabel: "Depois (Express 5.0): Captura automática nativa de async/await e rotas seguras",
      cleanCode: `import express from 'express';

const app = express();

// No Express 5, Promises rejeitadas fluem AUTOMATICAMENTE para o error middleware!
app.get('/usuarios/:id', async (req, res) => {
  const usuario = await db.find(req.params.id);
  if (!usuario) {
    throw new Error('Usuario nao encontrado'); // Capturado pelo Express 5 nativamente!
  }
  res.json(usuario);
});

// Middleware de tratamento de erro padrao de 4 argumentos
app.use((err, req, res, next) => {
  res.status(500).json({ erro: err.message });
});`,
      refactoringNotes: [
        "Express 5 captura automaticamente rejeições de Promises em handlers assíncronos sem wrappers.",
        "Atualização do path-to-regexp v8 exige parâmetros nomeados estritos (ex: /:file{.:ext}) evitando vulnerabilidades de ReDoS.",
        "Remoção de métodos obsoletos como app.del() e res.send(status, body)."
      ]
    }
  ],

  "nd-cap-11": [
    {
      id: "nd-ex-11-1",
      title: "Express vs. Fastify 5: Roteador Radix Tree, JSON Schema JIT & Plugins",
      context: "Arquitetura de alto rendimento com compilação de schemas e encapsulamento em DAG.",
      dirtyLabel: "Antes: Express tradicional com validação manual e serialização lenta",
      dirtyCode: `const express = require('express');
const app = express();

app.post('/pedidos', (req, res) => {
  // Validacao manual imperativa custosa na CPU
  if (!req.body.cliente || typeof req.body.total !== 'number') {
    return res.status(400).send('Dados invalidos');
  }
  // JSON.stringify() lento varre todas as propriedades em runtime
  res.json({ status: 'ok', pedido: req.body });
});`,
      cleanLabel: "Depois (Fastify 5): Radix Tree router, validação Ajv e compilação fast-json-stringify",
      cleanCode: `import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

// Schema compilado em tempo de inicializacao com Ajv e fast-json-stringify (2x mais rapido)
const pedidoSchema = {
  body: {
    type: 'object',
    required: ['cliente', 'total'],
    properties: {
      cliente: { type: 'string' },
      total: { type: 'number', minimum: 0 }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        status: { type: 'string' }
      }
    }
  }
};

fastify.post('/pedidos', { schema: pedidoSchema }, async (request, reply) => {
  // request.body ja chega totalmente validado e tipado!
  return { id: 'ped-123', status: 'confirmado' };
});`,
      refactoringNotes: [
        "Fastify usa roteador baseado em Radix Tree (find-my-way) com complexidade de busca O(k) onde k é o comprimento da URL.",
        "fast-json-stringify gera funções de serialização em código de máquina no startup, superando JSON.stringify padrão.",
        "O sistema de plugins baseado em avvio cria um Grafo Acíclico Dirigido (DAG) de dependências com isolamento de contexto."
      ]
    }
  ],

  "nd-cap-12": [
    {
      id: "nd-ex-12-1",
      title: "NestJS 11 & Hono 4: Arquitetura Enterprise Modular vs. Web Standards Edge",
      context: "Comparativo arquitetural entre governança corporativa com DI e portabilidade universal em Web Standards.",
      dirtyLabel: "Abordagem Enterprise: NestJS 11 com Injeção de Dependência e Controllers",
      dirtyCode: `import { Controller, Get, Injectable } from '@nestjs/common';

@Injectable()
export class CalculadoraService {
  somar(a: number, b: number): number { return a + b; }
}

@Controller('calc')
export class CalculadoraController {
  constructor(private readonly service: CalculadoraService) {}

  @Get('somar')
  somar(): { resultado: number } {
    return { resultado: this.service.somar(10, 20) };
  }
}`,
      cleanLabel: "Abordagem Edge / Web Standards: Hono 4 com tipagem end-to-end e zero dependências",
      cleanCode: `import { Hono } from 'hono';

// Hono opera sobre Web Standards (Request e Response nativos)
// Roda identico em Node.js, Cloudflare Workers, Deno e Bun!
const app = new Hono();

app.get('/calc/somar', (c) => {
  const resultado = 10 + 20;
  return c.json({ resultado });
});

export default app;`,
      refactoringNotes: [
        "NestJS fornece estrutura arquitetural sólida para grandes equipes corporativas com injeção de dependência e suporte a Express e Fastify.",
        "Hono padronizou rotas construídas sobre APIs Web universais, permitindo portabilidade total entre servidores dedicados e ambientes serverless.",
        "A escolha depende do porte da equipe, governança de código e estratégia de implantação em nuvem."
      ]
    }
  ]
};
