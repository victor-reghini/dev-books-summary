import { nodeExercises } from "./index.js";

export const nodeQuizzesData = [
  {
    "id": "nd-q-1-1",
    "patternId": "nd-cap-1",
    "category": "core-eventloop",
    "difficulty": "facil",
    "question": "Questão 1.1: Em relação aos recursos do Capítulo 1 (Node.js 0.1 to 0.12: V8 + libuv Architecture, Event Loop & Streams), qual afirmação é tecnicamente correta?",
    "options": [
      {
        "text": "O Node.js manteve retrocompatibilidade e introduziu aprimoramentos para performance e segurança.",
        "isCorrect": true
      },
      {
        "text": "O Event Loop foi completamente descontinuado e substituído por threads bloqueantes de SO.",
        "isCorrect": false
      },
      {
        "text": "Todos os pacotes CommonJS deixaram de ser executados imediatamente sem aviso.",
        "isCorrect": false
      },
      {
        "text": "O motor V8 foi abandonado em favor de uma máquina virtual interpretada sem JIT.",
        "isCorrect": false
      }
    ],
    "explanation": "O Node.js adota um calendário de estabilidade rigoroso com suporte LTS, mantendo retrocompatibilidade com pacotes do ecossistema enquanto expande recursos nativos."
  },
  {
    "id": "nd-q-1-2",
    "patternId": "nd-cap-1",
    "category": "core-eventloop",
    "difficulty": "medio",
    "question": "Questão 1.2: Qual a recomendação oficial de engenharia para o tópico abordado no Capítulo 1?",
    "options": [
      {
        "text": "Utilizar os novos padrões nativos recomendados para evitar dependências desnecessárias e vazamentos de recursos.",
        "isCorrect": true
      },
      {
        "text": "Continuar utilizando construções legadas vulneráveis ignorando alertas de segurança DEP.",
        "isCorrect": false
      },
      {
        "text": "Bloquear a thread principal do Event Loop com operações de leitura síncrona em disco.",
        "isCorrect": false
      },
      {
        "text": "Desabilitar o controle de backpressure ao transferir dados em streams.",
        "isCorrect": false
      }
    ],
    "explanation": "A evolução do runtime fornece soluções nativas (como stream.pipeline, fetch nativo e AsyncLocalStorage) que eliminam bugs e melhoram a segurança operacional."
  },
  {
    "id": "nd-q-2-1",
    "patternId": "nd-cap-2",
    "category": "core-eventloop",
    "difficulty": "facil",
    "question": "Questão 2.1: Em relação aos recursos do Capítulo 2 (Node.js 4 & 6 (LTS): io.js Reunion, Native ES6 & Safe Buffer), qual afirmação é tecnicamente correta?",
    "options": [
      {
        "text": "O Node.js manteve retrocompatibilidade e introduziu aprimoramentos para performance e segurança.",
        "isCorrect": true
      },
      {
        "text": "O Event Loop foi completamente descontinuado e substituído por threads bloqueantes de SO.",
        "isCorrect": false
      },
      {
        "text": "Todos os pacotes CommonJS deixaram de ser executados imediatamente sem aviso.",
        "isCorrect": false
      },
      {
        "text": "O motor V8 foi abandonado em favor de uma máquina virtual interpretada sem JIT.",
        "isCorrect": false
      }
    ],
    "explanation": "O Node.js adota um calendário de estabilidade rigoroso com suporte LTS, mantendo retrocompatibilidade com pacotes do ecossistema enquanto expande recursos nativos."
  },
  {
    "id": "nd-q-2-2",
    "patternId": "nd-cap-2",
    "category": "core-eventloop",
    "difficulty": "medio",
    "question": "Questão 2.2: Qual a recomendação oficial de engenharia para o tópico abordado no Capítulo 2?",
    "options": [
      {
        "text": "Utilizar os novos padrões nativos recomendados para evitar dependências desnecessárias e vazamentos de recursos.",
        "isCorrect": true
      },
      {
        "text": "Continuar utilizando construções legadas vulneráveis ignorando alertas de segurança DEP.",
        "isCorrect": false
      },
      {
        "text": "Bloquear a thread principal do Event Loop com operações de leitura síncrona em disco.",
        "isCorrect": false
      },
      {
        "text": "Desabilitar o controle de backpressure ao transferir dados em streams.",
        "isCorrect": false
      }
    ],
    "explanation": "A evolução do runtime fornece soluções nativas (como stream.pipeline, fetch nativo e AsyncLocalStorage) que eliminam bugs e melhoram a segurança operacional."
  },
  {
    "id": "nd-q-3-1",
    "patternId": "nd-cap-3",
    "category": "core-eventloop",
    "difficulty": "facil",
    "question": "Questão 3.1: Em relação aos recursos do Capítulo 3 (Node.js 8 & 10 (LTS): async/await, util.promisify, N-API & stream.pipeline), qual afirmação é tecnicamente correta?",
    "options": [
      {
        "text": "O Node.js manteve retrocompatibilidade e introduziu aprimoramentos para performance e segurança.",
        "isCorrect": true
      },
      {
        "text": "O Event Loop foi completamente descontinuado e substituído por threads bloqueantes de SO.",
        "isCorrect": false
      },
      {
        "text": "Todos os pacotes CommonJS deixaram de ser executados imediatamente sem aviso.",
        "isCorrect": false
      },
      {
        "text": "O motor V8 foi abandonado em favor de uma máquina virtual interpretada sem JIT.",
        "isCorrect": false
      }
    ],
    "explanation": "O Node.js adota um calendário de estabilidade rigoroso com suporte LTS, mantendo retrocompatibilidade com pacotes do ecossistema enquanto expande recursos nativos."
  },
  {
    "id": "nd-q-3-2",
    "patternId": "nd-cap-3",
    "category": "core-eventloop",
    "difficulty": "medio",
    "question": "Questão 3.2: Qual a recomendação oficial de engenharia para o tópico abordado no Capítulo 3?",
    "options": [
      {
        "text": "Utilizar os novos padrões nativos recomendados para evitar dependências desnecessárias e vazamentos de recursos.",
        "isCorrect": true
      },
      {
        "text": "Continuar utilizando construções legadas vulneráveis ignorando alertas de segurança DEP.",
        "isCorrect": false
      },
      {
        "text": "Bloquear a thread principal do Event Loop com operações de leitura síncrona em disco.",
        "isCorrect": false
      },
      {
        "text": "Desabilitar o controle de backpressure ao transferir dados em streams.",
        "isCorrect": false
      }
    ],
    "explanation": "A evolução do runtime fornece soluções nativas (como stream.pipeline, fetch nativo e AsyncLocalStorage) que eliminam bugs e melhoram a segurança operacional."
  },
  {
    "id": "nd-q-4-1",
    "patternId": "nd-cap-4",
    "category": "esm-concurrency",
    "difficulty": "facil",
    "question": "Questão 4.1: Em relação aos recursos do Capítulo 4 (Node.js 12 (LTS): Worker Threads, ES Modules & Container Limits), qual afirmação é tecnicamente correta?",
    "options": [
      {
        "text": "O Node.js manteve retrocompatibilidade e introduziu aprimoramentos para performance e segurança.",
        "isCorrect": true
      },
      {
        "text": "O Event Loop foi completamente descontinuado e substituído por threads bloqueantes de SO.",
        "isCorrect": false
      },
      {
        "text": "Todos os pacotes CommonJS deixaram de ser executados imediatamente sem aviso.",
        "isCorrect": false
      },
      {
        "text": "O motor V8 foi abandonado em favor de uma máquina virtual interpretada sem JIT.",
        "isCorrect": false
      }
    ],
    "explanation": "O Node.js adota um calendário de estabilidade rigoroso com suporte LTS, mantendo retrocompatibilidade com pacotes do ecossistema enquanto expande recursos nativos."
  },
  {
    "id": "nd-q-4-2",
    "patternId": "nd-cap-4",
    "category": "esm-concurrency",
    "difficulty": "medio",
    "question": "Questão 4.2: Qual a recomendação oficial de engenharia para o tópico abordado no Capítulo 4?",
    "options": [
      {
        "text": "Utilizar os novos padrões nativos recomendados para evitar dependências desnecessárias e vazamentos de recursos.",
        "isCorrect": true
      },
      {
        "text": "Continuar utilizando construções legadas vulneráveis ignorando alertas de segurança DEP.",
        "isCorrect": false
      },
      {
        "text": "Bloquear a thread principal do Event Loop com operações de leitura síncrona em disco.",
        "isCorrect": false
      },
      {
        "text": "Desabilitar o controle de backpressure ao transferir dados em streams.",
        "isCorrect": false
      }
    ],
    "explanation": "A evolução do runtime fornece soluções nativas (como stream.pipeline, fetch nativo e AsyncLocalStorage) que eliminam bugs e melhoram a segurança operacional."
  },
  {
    "id": "nd-q-5-1",
    "patternId": "nd-cap-5",
    "category": "esm-concurrency",
    "difficulty": "facil",
    "question": "Questão 5.1: Em relação aos recursos do Capítulo 5 (Node.js 14 (LTS): AsyncLocalStorage & Package Entry Points), qual afirmação é tecnicamente correta?",
    "options": [
      {
        "text": "O Node.js manteve retrocompatibilidade e introduziu aprimoramentos para performance e segurança.",
        "isCorrect": true
      },
      {
        "text": "O Event Loop foi completamente descontinuado e substituído por threads bloqueantes de SO.",
        "isCorrect": false
      },
      {
        "text": "Todos os pacotes CommonJS deixaram de ser executados imediatamente sem aviso.",
        "isCorrect": false
      },
      {
        "text": "O motor V8 foi abandonado em favor de uma máquina virtual interpretada sem JIT.",
        "isCorrect": false
      }
    ],
    "explanation": "O Node.js adota um calendário de estabilidade rigoroso com suporte LTS, mantendo retrocompatibilidade com pacotes do ecossistema enquanto expande recursos nativos."
  },
  {
    "id": "nd-q-5-2",
    "patternId": "nd-cap-5",
    "category": "esm-concurrency",
    "difficulty": "medio",
    "question": "Questão 5.2: Qual a recomendação oficial de engenharia para o tópico abordado no Capítulo 5?",
    "options": [
      {
        "text": "Utilizar os novos padrões nativos recomendados para evitar dependências desnecessárias e vazamentos de recursos.",
        "isCorrect": true
      },
      {
        "text": "Continuar utilizando construções legadas vulneráveis ignorando alertas de segurança DEP.",
        "isCorrect": false
      },
      {
        "text": "Bloquear a thread principal do Event Loop com operações de leitura síncrona em disco.",
        "isCorrect": false
      },
      {
        "text": "Desabilitar o controle de backpressure ao transferir dados em streams.",
        "isCorrect": false
      }
    ],
    "explanation": "A evolução do runtime fornece soluções nativas (como stream.pipeline, fetch nativo e AsyncLocalStorage) que eliminam bugs e melhoram a segurança operacional."
  },
  {
    "id": "nd-q-6-1",
    "patternId": "nd-cap-6",
    "category": "esm-concurrency",
    "difficulty": "facil",
    "question": "Questão 6.1: Em relação aos recursos do Capítulo 6 (Node.js 16 (LTS): node: Prefix, Timers Promises & AbortController), qual afirmação é tecnicamente correta?",
    "options": [
      {
        "text": "O Node.js manteve retrocompatibilidade e introduziu aprimoramentos para performance e segurança.",
        "isCorrect": true
      },
      {
        "text": "O Event Loop foi completamente descontinuado e substituído por threads bloqueantes de SO.",
        "isCorrect": false
      },
      {
        "text": "Todos os pacotes CommonJS deixaram de ser executados imediatamente sem aviso.",
        "isCorrect": false
      },
      {
        "text": "O motor V8 foi abandonado em favor de uma máquina virtual interpretada sem JIT.",
        "isCorrect": false
      }
    ],
    "explanation": "O Node.js adota um calendário de estabilidade rigoroso com suporte LTS, mantendo retrocompatibilidade com pacotes do ecossistema enquanto expande recursos nativos."
  },
  {
    "id": "nd-q-6-2",
    "patternId": "nd-cap-6",
    "category": "esm-concurrency",
    "difficulty": "medio",
    "question": "Questão 6.2: Qual a recomendação oficial de engenharia para o tópico abordado no Capítulo 6?",
    "options": [
      {
        "text": "Utilizar os novos padrões nativos recomendados para evitar dependências desnecessárias e vazamentos de recursos.",
        "isCorrect": true
      },
      {
        "text": "Continuar utilizando construções legadas vulneráveis ignorando alertas de segurança DEP.",
        "isCorrect": false
      },
      {
        "text": "Bloquear a thread principal do Event Loop com operações de leitura síncrona em disco.",
        "isCorrect": false
      },
      {
        "text": "Desabilitar o controle de backpressure ao transferir dados em streams.",
        "isCorrect": false
      }
    ],
    "explanation": "A evolução do runtime fornece soluções nativas (como stream.pipeline, fetch nativo e AsyncLocalStorage) que eliminam bugs e melhoram a segurança operacional."
  },
  {
    "id": "nd-q-7-1",
    "patternId": "nd-cap-7",
    "category": "modern-runtime",
    "difficulty": "facil",
    "question": "Questão 7.1: Em relação aos recursos do Capítulo 7 (Node.js 18 (LTS): Global Native fetch(), Test Runner & --watch), qual afirmação é tecnicamente correta?",
    "options": [
      {
        "text": "O Node.js manteve retrocompatibilidade e introduziu aprimoramentos para performance e segurança.",
        "isCorrect": true
      },
      {
        "text": "O Event Loop foi completamente descontinuado e substituído por threads bloqueantes de SO.",
        "isCorrect": false
      },
      {
        "text": "Todos os pacotes CommonJS deixaram de ser executados imediatamente sem aviso.",
        "isCorrect": false
      },
      {
        "text": "O motor V8 foi abandonado em favor de uma máquina virtual interpretada sem JIT.",
        "isCorrect": false
      }
    ],
    "explanation": "O Node.js adota um calendário de estabilidade rigoroso com suporte LTS, mantendo retrocompatibilidade com pacotes do ecossistema enquanto expande recursos nativos."
  },
  {
    "id": "nd-q-7-2",
    "patternId": "nd-cap-7",
    "category": "modern-runtime",
    "difficulty": "medio",
    "question": "Questão 7.2: Qual a recomendação oficial de engenharia para o tópico abordado no Capítulo 7?",
    "options": [
      {
        "text": "Utilizar os novos padrões nativos recomendados para evitar dependências desnecessárias e vazamentos de recursos.",
        "isCorrect": true
      },
      {
        "text": "Continuar utilizando construções legadas vulneráveis ignorando alertas de segurança DEP.",
        "isCorrect": false
      },
      {
        "text": "Bloquear a thread principal do Event Loop com operações de leitura síncrona em disco.",
        "isCorrect": false
      },
      {
        "text": "Desabilitar o controle de backpressure ao transferir dados em streams.",
        "isCorrect": false
      }
    ],
    "explanation": "A evolução do runtime fornece soluções nativas (como stream.pipeline, fetch nativo e AsyncLocalStorage) que eliminam bugs e melhoram a segurança operacional."
  },
  {
    "id": "nd-q-8-1",
    "patternId": "nd-cap-8",
    "category": "modern-runtime",
    "difficulty": "facil",
    "question": "Questão 8.1: Em relação aos recursos do Capítulo 8 (Node.js 20 (LTS): Permission Model, Native --env-file & SEA), qual afirmação é tecnicamente correta?",
    "options": [
      {
        "text": "O Node.js manteve retrocompatibilidade e introduziu aprimoramentos para performance e segurança.",
        "isCorrect": true
      },
      {
        "text": "O Event Loop foi completamente descontinuado e substituído por threads bloqueantes de SO.",
        "isCorrect": false
      },
      {
        "text": "Todos os pacotes CommonJS deixaram de ser executados imediatamente sem aviso.",
        "isCorrect": false
      },
      {
        "text": "O motor V8 foi abandonado em favor de uma máquina virtual interpretada sem JIT.",
        "isCorrect": false
      }
    ],
    "explanation": "O Node.js adota um calendário de estabilidade rigoroso com suporte LTS, mantendo retrocompatibilidade com pacotes do ecossistema enquanto expande recursos nativos."
  },
  {
    "id": "nd-q-8-2",
    "patternId": "nd-cap-8",
    "category": "modern-runtime",
    "difficulty": "medio",
    "question": "Questão 8.2: Qual a recomendação oficial de engenharia para o tópico abordado no Capítulo 8?",
    "options": [
      {
        "text": "Utilizar os novos padrões nativos recomendados para evitar dependências desnecessárias e vazamentos de recursos.",
        "isCorrect": true
      },
      {
        "text": "Continuar utilizando construções legadas vulneráveis ignorando alertas de segurança DEP.",
        "isCorrect": false
      },
      {
        "text": "Bloquear a thread principal do Event Loop com operações de leitura síncrona em disco.",
        "isCorrect": false
      },
      {
        "text": "Desabilitar o controle de backpressure ao transferir dados em streams.",
        "isCorrect": false
      }
    ],
    "explanation": "A evolução do runtime fornece soluções nativas (como stream.pipeline, fetch nativo e AsyncLocalStorage) que eliminam bugs e melhoram a segurança operacional."
  },
  {
    "id": "nd-q-9-1",
    "patternId": "nd-cap-9",
    "category": "modern-runtime",
    "difficulty": "facil",
    "question": "Questão 9.1: Em relação aos recursos do Capítulo 9 (Node.js 22 (LTS) & 24: Synchronous require(esm), Native TypeScript & node:sqlite), qual afirmação é tecnicamente correta?",
    "options": [
      {
        "text": "O Node.js manteve retrocompatibilidade e introduziu aprimoramentos para performance e segurança.",
        "isCorrect": true
      },
      {
        "text": "O Event Loop foi completamente descontinuado e substituído por threads bloqueantes de SO.",
        "isCorrect": false
      },
      {
        "text": "Todos os pacotes CommonJS deixaram de ser executados imediatamente sem aviso.",
        "isCorrect": false
      },
      {
        "text": "O motor V8 foi abandonado em favor de uma máquina virtual interpretada sem JIT.",
        "isCorrect": false
      }
    ],
    "explanation": "O Node.js adota um calendário de estabilidade rigoroso com suporte LTS, mantendo retrocompatibilidade com pacotes do ecossistema enquanto expande recursos nativos."
  },
  {
    "id": "nd-q-9-2",
    "patternId": "nd-cap-9",
    "category": "modern-runtime",
    "difficulty": "medio",
    "question": "Questão 9.2: Qual a recomendação oficial de engenharia para o tópico abordado no Capítulo 9?",
    "options": [
      {
        "text": "Utilizar os novos padrões nativos recomendados para evitar dependências desnecessárias e vazamentos de recursos.",
        "isCorrect": true
      },
      {
        "text": "Continuar utilizando construções legadas vulneráveis ignorando alertas de segurança DEP.",
        "isCorrect": false
      },
      {
        "text": "Bloquear a thread principal do Event Loop com operações de leitura síncrona em disco.",
        "isCorrect": false
      },
      {
        "text": "Desabilitar o controle de backpressure ao transferir dados em streams.",
        "isCorrect": false
      }
    ],
    "explanation": "A evolução do runtime fornece soluções nativas (como stream.pipeline, fetch nativo e AsyncLocalStorage) que eliminam bugs e melhoram a segurança operacional."
  },
  {
    "id": "nd-q-10-1",
    "patternId": "nd-cap-10",
    "category": "node-frameworks",
    "difficulty": "facil",
    "question": "Questão 10.1: Em relação aos recursos do Capítulo 10 (Express.js (1.x to 5.0) & Koa: Middlewares Pipeline & Async Error Handling), qual afirmação é tecnicamente correta?",
    "options": [
      {
        "text": "O Node.js manteve retrocompatibilidade e introduziu aprimoramentos para performance e segurança.",
        "isCorrect": true
      },
      {
        "text": "O Event Loop foi completamente descontinuado e substituído por threads bloqueantes de SO.",
        "isCorrect": false
      },
      {
        "text": "Todos os pacotes CommonJS deixaram de ser executados imediatamente sem aviso.",
        "isCorrect": false
      },
      {
        "text": "O motor V8 foi abandonado em favor de uma máquina virtual interpretada sem JIT.",
        "isCorrect": false
      }
    ],
    "explanation": "O Node.js adota um calendário de estabilidade rigoroso com suporte LTS, mantendo retrocompatibilidade com pacotes do ecossistema enquanto expande recursos nativos."
  },
  {
    "id": "nd-q-10-2",
    "patternId": "nd-cap-10",
    "category": "node-frameworks",
    "difficulty": "medio",
    "question": "Questão 10.2: Qual a recomendação oficial de engenharia para o tópico abordado no Capítulo 10?",
    "options": [
      {
        "text": "Utilizar os novos padrões nativos recomendados para evitar dependências desnecessárias e vazamentos de recursos.",
        "isCorrect": true
      },
      {
        "text": "Continuar utilizando construções legadas vulneráveis ignorando alertas de segurança DEP.",
        "isCorrect": false
      },
      {
        "text": "Bloquear a thread principal do Event Loop com operações de leitura síncrona em disco.",
        "isCorrect": false
      },
      {
        "text": "Desabilitar o controle de backpressure ao transferir dados em streams.",
        "isCorrect": false
      }
    ],
    "explanation": "A evolução do runtime fornece soluções nativas (como stream.pipeline, fetch nativo e AsyncLocalStorage) que eliminam bugs e melhoram a segurança operacional."
  },
  {
    "id": "nd-q-11-1",
    "patternId": "nd-cap-11",
    "category": "node-frameworks",
    "difficulty": "facil",
    "question": "Questão 11.1: Em relação aos recursos do Capítulo 11 (Fastify (1.x to 5.x): Radix Tree Router, JSON Schema JIT & Plugins), qual afirmação é tecnicamente correta?",
    "options": [
      {
        "text": "O Node.js manteve retrocompatibilidade e introduziu aprimoramentos para performance e segurança.",
        "isCorrect": true
      },
      {
        "text": "O Event Loop foi completamente descontinuado e substituído por threads bloqueantes de SO.",
        "isCorrect": false
      },
      {
        "text": "Todos os pacotes CommonJS deixaram de ser executados imediatamente sem aviso.",
        "isCorrect": false
      },
      {
        "text": "O motor V8 foi abandonado em favor de uma máquina virtual interpretada sem JIT.",
        "isCorrect": false
      }
    ],
    "explanation": "O Node.js adota um calendário de estabilidade rigoroso com suporte LTS, mantendo retrocompatibilidade com pacotes do ecossistema enquanto expande recursos nativos."
  },
  {
    "id": "nd-q-11-2",
    "patternId": "nd-cap-11",
    "category": "node-frameworks",
    "difficulty": "medio",
    "question": "Questão 11.2: Qual a recomendação oficial de engenharia para o tópico abordado no Capítulo 11?",
    "options": [
      {
        "text": "Utilizar os novos padrões nativos recomendados para evitar dependências desnecessárias e vazamentos de recursos.",
        "isCorrect": true
      },
      {
        "text": "Continuar utilizando construções legadas vulneráveis ignorando alertas de segurança DEP.",
        "isCorrect": false
      },
      {
        "text": "Bloquear a thread principal do Event Loop com operações de leitura síncrona em disco.",
        "isCorrect": false
      },
      {
        "text": "Desabilitar o controle de backpressure ao transferir dados em streams.",
        "isCorrect": false
      }
    ],
    "explanation": "A evolução do runtime fornece soluções nativas (como stream.pipeline, fetch nativo e AsyncLocalStorage) que eliminam bugs e melhoram a segurança operacional."
  },
  {
    "id": "nd-q-12-1",
    "patternId": "nd-cap-12",
    "category": "node-frameworks",
    "difficulty": "facil",
    "question": "Questão 12.1: Em relação aos recursos do Capítulo 12 (NestJS (1.x to 11.x) & Hono (1.x to 4.x): Enterprise DI vs. Web Standards Edge), qual afirmação é tecnicamente correta?",
    "options": [
      {
        "text": "O Node.js manteve retrocompatibilidade e introduziu aprimoramentos para performance e segurança.",
        "isCorrect": true
      },
      {
        "text": "O Event Loop foi completamente descontinuado e substituído por threads bloqueantes de SO.",
        "isCorrect": false
      },
      {
        "text": "Todos os pacotes CommonJS deixaram de ser executados imediatamente sem aviso.",
        "isCorrect": false
      },
      {
        "text": "O motor V8 foi abandonado em favor de uma máquina virtual interpretada sem JIT.",
        "isCorrect": false
      }
    ],
    "explanation": "O Node.js adota um calendário de estabilidade rigoroso com suporte LTS, mantendo retrocompatibilidade com pacotes do ecossistema enquanto expande recursos nativos."
  },
  {
    "id": "nd-q-12-2",
    "patternId": "nd-cap-12",
    "category": "node-frameworks",
    "difficulty": "medio",
    "question": "Questão 12.2: Qual a recomendação oficial de engenharia para o tópico abordado no Capítulo 12?",
    "options": [
      {
        "text": "Utilizar os novos padrões nativos recomendados para evitar dependências desnecessárias e vazamentos de recursos.",
        "isCorrect": true
      },
      {
        "text": "Continuar utilizando construções legadas vulneráveis ignorando alertas de segurança DEP.",
        "isCorrect": false
      },
      {
        "text": "Bloquear a thread principal do Event Loop com operações de leitura síncrona em disco.",
        "isCorrect": false
      },
      {
        "text": "Desabilitar o controle de backpressure ao transferir dados em streams.",
        "isCorrect": false
      }
    ],
    "explanation": "A evolução do runtime fornece soluções nativas (como stream.pipeline, fetch nativo e AsyncLocalStorage) que eliminam bugs e melhoram a segurança operacional."
  }
];
export const nodeScenariosData = [
  {
    "id": "nd-scen-1",
    "title": "Cenário 1: Tratamento de Erros Assíncronos em Express 4 vs. Express 5",
    "patternId": "nd-cap-10",
    "context": "Sua API Express 4 possui uma rota assíncrona 'app.get(\"/dados\", async (req, res) => { const r = await db.query(); res.json(r); });'. Quando o banco cai, a requisição fica travada indefinidamente até dar timeout no gateway.",
    "question": "Como o Express 5.0 resolve essa falha crítica arquiteturalmente?",
    "options": [
      {
        "text": "O Express 5 captura automaticamente Promises rejeitadas em handlers de rota e encaminha para o error middleware (next(err)) nativamente.",
        "isCorrect": true
      },
      {
        "text": "O Express 5 proíbe o uso de funções async em rotas.",
        "isCorrect": false
      },
      {
        "text": "O Express 5 reinicia o processo Node.js a cada erro assíncrono.",
        "isCorrect": false
      },
      {
        "text": "Exige continuar instalando a biblioteca express-async-errors.",
        "isCorrect": false
      }
    ],
    "explanation": "Uma das maiores evoluções do Express 5.0 é o suporte nativo a Promises: se um handler async lançar ou rejeitar, o Express 5 intercepta e invoca automaticamente next(err)."
  },
  {
    "id": "nd-scen-2",
    "title": "Cenário 2: Processamento de CSV de 10 GB sem Estourar a Memória RAM",
    "patternId": "nd-cap-1",
    "context": "Um endpoint de ingestão precisa processar um arquivo de log de 10 GB. O código inicial usou fs.readFile(), resultando em crash imediato por JavaScript heap out of memory.",
    "question": "Qual padrão arquitetural do Node.js deve ser aplicado para manter consumo de memória constante O(1)?",
    "options": [
      {
        "text": "Usar stream.pipeline() com Readable Stream (chunks de 64 KB), Transform Stream e Writable Stream, respeitando backpressure automático.",
        "isCorrect": true
      },
      {
        "text": "Aumentar a flag --max-old-space-size para 64 GB de RAM no servidor.",
        "isCorrect": false
      },
      {
        "text": "Converter o arquivo inteiro para string em uma variável global.",
        "isCorrect": false
      },
      {
        "text": "Ler byte a byte usando process.nextTick() recursivo.",
        "isCorrect": false
      }
    ],
    "explanation": "Streams processam dados em fluxo contínuo de pedaços pequenos (highWaterMark). O stream.pipeline gerencia o fluxo de volta (backpressure) garantindo consumo fixo de poucos megabytes."
  },
  {
    "id": "nd-scen-3",
    "title": "Cenário 3: Rastreamento de Transações (Correlation ID) sem Poluir Assinaturas",
    "patternId": "nd-cap-5",
    "context": "Você precisa registrar logs estruturados no Pino contendo o 'requestId' gerado no cabeçalho HTTP em todas as camadas de service e repository, mas não quer adicionar o parâmetro em 80 funções diferentes.",
    "question": "Qual módulo oficial do Node core resolve a propagação transparente de contexto assíncrono?",
    "options": [
      {
        "text": "AsyncLocalStorage do módulo node:async_hooks.",
        "isCorrect": true
      },
      {
        "text": "Uma variável global compartilhada no módulo principal.",
        "isCorrect": false
      },
      {
        "text": "Criar uma nova thread Worker para cada linha de log.",
        "isCorrect": false
      },
      {
        "text": "Atrelar o requestId ao protótipo global do Object.",
        "isCorrect": false
      }
    ],
    "explanation": "AsyncLocalStorage preserva o armazenamento de dados atrelado à cadeia assíncrona de execução (Promises e I/O), permitindo recuperar o contexto em qualquer profundidade com getStore()."
  },
  {
    "id": "nd-scen-4",
    "title": "Cenário 4: Gateway de Altíssimo Desempenho com Validação de Payload",
    "patternId": "nd-cap-11",
    "context": "Um gateway de telemetria IoT recebe 80.000 requisições por segundo. O parsing e validação manual com JSON.stringify e validações imperativas consom 75% da CPU.",
    "question": "Por que a migração para Fastify 5 com JSON Schema acelera drasticamente o throughput?",
    "options": [
      {
        "text": "Fastify compila schemas via Ajv no startup e gera funções especializadas de serialização com fast-json-stringify, além de usar roteador Radix Tree O(k).",
        "isCorrect": true
      },
      {
        "text": "Fastify desabilita a validação de dados em produção.",
        "isCorrect": false
      },
      {
        "text": "Fastify executa o código fora do motor V8.",
        "isCorrect": false
      },
      {
        "text": "Fastify usa chamadas bloqueantes síncronas em C.",
        "isCorrect": false
      }
    ],
    "explanation": "Fastify atinge alto rendimento compilando antecipadamente os schemas JSON em código de máquina, eliminando a sobrecarga de inspecionar propriedades em runtime a cada requisição."
  }
];
export const nodePracticalExercisesData = [
  {
    "id": "nd-prac-1",
    "title": "Desafio 1: Pipeline Seguro de Streams com Compactação Gzip",
    "category": "core-eventloop",
    "difficulty": "medio",
    "targetPatterns": [
      "nd-cap-1",
      "nd-cap-3"
    ],
    "scenario": "Implemente uma função utilitária que compacte arquivos usando stream.pipeline() e capture todos os erros sem vazar descritores de arquivos.",
    "steps": [
      "Importe 'createReadStream' e 'createWriteStream' de 'node:fs', 'createGzip' de 'node:zlib' e 'pipeline' de 'node:stream/promises'.",
      "Encadeie a leitura, compressão e escrita através de 'await pipeline(...)'.",
      "Trate exceções e retorne o tamanho final do arquivo compactado."
    ],
    "starterCode": "const fs = require('node:fs');\nconst zlib = require('node:zlib');\n\nasync function compactar(origem, destino) {\n  // TODO: Implementar usando pipeline seguro\n}",
    "hints": [
      "Use 'const { pipeline } = require(\"node:stream/promises\");' para obter a versão que retorna uma Promise.",
      "O pipeline cuida automaticamente do fechamento e destruição de todos os streams em caso de erro."
    ],
    "referenceSolution": "import { createReadStream, createWriteStream } from 'node:fs';\nimport { stat } from 'node:fs/promises';\nimport { createGzip } from 'node:zlib';\nimport { pipeline } from 'node:stream/promises';\n\nexport async function compactar(origem, destino) {\n  await pipeline(\n    createReadStream(origem),\n    createGzip(),\n    createWriteStream(destino)\n  );\n  const info = await stat(destino);\n  return info.size;\n}"
  },
  {
    "id": "nd-prac-2",
    "title": "Desafio 2: Middleware de Correlation ID com AsyncLocalStorage",
    "category": "esm-concurrency",
    "difficulty": "medio",
    "targetPatterns": [
      "nd-cap-5"
    ],
    "scenario": "Crie um interceptador de requisições que atribua um UUID a cada chamada e permita que serviços internos acessem o ID sem recebê-lo como parâmetro.",
    "steps": [
      "Instancie um 'new AsyncLocalStorage()'.",
      "Crie uma função middleware 'executarComContexto(requestId, fn)'.",
      "Crie uma função 'obterRequestIdAtual()' que retorne o ID ativo ou 'desconhecido'."
    ],
    "starterCode": "import { AsyncLocalStorage } from 'node:async_hooks';\n\n// TODO: Implementar o armazenamento de contexto assincrono",
    "hints": [
      "Use 'storage.run({ requestId }, () => { ... })' para delimitar o escopo da execução.",
      "Use 'storage.getStore()?.requestId' para recuperar o valor a qualquer momento."
    ],
    "referenceSolution": "import { AsyncLocalStorage } from 'node:async_hooks';\nimport { randomUUID } from 'node:crypto';\n\nexport const contextStorage = new AsyncLocalStorage();\n\nexport function executarComContexto(requestId = randomUUID(), proximoPasso) {\n  return contextStorage.run({ requestId, timestamp: Date.now() }, proximoPasso);\n}\n\nexport function obterRequestIdAtual() {\n  const store = contextStorage.getStore();\n  return store ? store.requestId : 'desconhecido';\n}"
  }
];
