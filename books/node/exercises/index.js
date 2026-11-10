// Exercícios por Capítulo de Node.js e Frameworks
export const nodeExercises = {
  "nd-cap-1": [
    {
      "id": "nd-q-1-1",
      "type": "quiz",
      "question": "Questão 1.1: Em relação aos recursos do Capítulo 1 (Node.js 0.1 to 0.12: V8 + libuv Architecture, Event Loop & Streams), qual afirmação é tecnicamente correta?",
      "options": [
        "O Node.js manteve retrocompatibilidade e introduziu aprimoramentos para performance e segurança.",
        "O Event Loop foi completamente descontinuado e substituído por threads bloqueantes de SO.",
        "Todos os pacotes CommonJS deixaram de ser executados imediatamente sem aviso.",
        "O motor V8 foi abandonado em favor de uma máquina virtual interpretada sem JIT."
      ],
      "correctIndex": 0,
      "explanation": "O Node.js adota um calendário de estabilidade rigoroso com suporte LTS, mantendo retrocompatibilidade com pacotes do ecossistema enquanto expande recursos nativos."
    },
    {
      "id": "nd-q-1-2",
      "type": "quiz",
      "question": "Questão 1.2: Qual a recomendação oficial de engenharia para o tópico abordado no Capítulo 1?",
      "options": [
        "Utilizar os novos padrões nativos recomendados para evitar dependências desnecessárias e vazamentos de recursos.",
        "Continuar utilizando construções legadas vulneráveis ignorando alertas de segurança DEP.",
        "Bloquear a thread principal do Event Loop com operações de leitura síncrona em disco.",
        "Desabilitar o controle de backpressure ao transferir dados em streams."
      ],
      "correctIndex": 0,
      "explanation": "A evolução do runtime fornece soluções nativas (como stream.pipeline, fetch nativo e AsyncLocalStorage) que eliminam bugs e melhoram a segurança operacional."
    }
  ],
  "nd-cap-2": [
    {
      "id": "nd-q-2-1",
      "type": "quiz",
      "question": "Questão 2.1: Em relação aos recursos do Capítulo 2 (Node.js 4 & 6 (LTS): io.js Reunion, Native ES6 & Safe Buffer), qual afirmação é tecnicamente correta?",
      "options": [
        "O Node.js manteve retrocompatibilidade e introduziu aprimoramentos para performance e segurança.",
        "O Event Loop foi completamente descontinuado e substituído por threads bloqueantes de SO.",
        "Todos os pacotes CommonJS deixaram de ser executados imediatamente sem aviso.",
        "O motor V8 foi abandonado em favor de uma máquina virtual interpretada sem JIT."
      ],
      "correctIndex": 0,
      "explanation": "O Node.js adota um calendário de estabilidade rigoroso com suporte LTS, mantendo retrocompatibilidade com pacotes do ecossistema enquanto expande recursos nativos."
    },
    {
      "id": "nd-q-2-2",
      "type": "quiz",
      "question": "Questão 2.2: Qual a recomendação oficial de engenharia para o tópico abordado no Capítulo 2?",
      "options": [
        "Utilizar os novos padrões nativos recomendados para evitar dependências desnecessárias e vazamentos de recursos.",
        "Continuar utilizando construções legadas vulneráveis ignorando alertas de segurança DEP.",
        "Bloquear a thread principal do Event Loop com operações de leitura síncrona em disco.",
        "Desabilitar o controle de backpressure ao transferir dados em streams."
      ],
      "correctIndex": 0,
      "explanation": "A evolução do runtime fornece soluções nativas (como stream.pipeline, fetch nativo e AsyncLocalStorage) que eliminam bugs e melhoram a segurança operacional."
    }
  ],
  "nd-cap-3": [
    {
      "id": "nd-q-3-1",
      "type": "quiz",
      "question": "Questão 3.1: Em relação aos recursos do Capítulo 3 (Node.js 8 & 10 (LTS): async/await, util.promisify, N-API & stream.pipeline), qual afirmação é tecnicamente correta?",
      "options": [
        "O Node.js manteve retrocompatibilidade e introduziu aprimoramentos para performance e segurança.",
        "O Event Loop foi completamente descontinuado e substituído por threads bloqueantes de SO.",
        "Todos os pacotes CommonJS deixaram de ser executados imediatamente sem aviso.",
        "O motor V8 foi abandonado em favor de uma máquina virtual interpretada sem JIT."
      ],
      "correctIndex": 0,
      "explanation": "O Node.js adota um calendário de estabilidade rigoroso com suporte LTS, mantendo retrocompatibilidade com pacotes do ecossistema enquanto expande recursos nativos."
    },
    {
      "id": "nd-q-3-2",
      "type": "quiz",
      "question": "Questão 3.2: Qual a recomendação oficial de engenharia para o tópico abordado no Capítulo 3?",
      "options": [
        "Utilizar os novos padrões nativos recomendados para evitar dependências desnecessárias e vazamentos de recursos.",
        "Continuar utilizando construções legadas vulneráveis ignorando alertas de segurança DEP.",
        "Bloquear a thread principal do Event Loop com operações de leitura síncrona em disco.",
        "Desabilitar o controle de backpressure ao transferir dados em streams."
      ],
      "correctIndex": 0,
      "explanation": "A evolução do runtime fornece soluções nativas (como stream.pipeline, fetch nativo e AsyncLocalStorage) que eliminam bugs e melhoram a segurança operacional."
    }
  ],
  "nd-cap-4": [
    {
      "id": "nd-q-4-1",
      "type": "quiz",
      "question": "Questão 4.1: Em relação aos recursos do Capítulo 4 (Node.js 12 (LTS): Worker Threads, ES Modules & Container Limits), qual afirmação é tecnicamente correta?",
      "options": [
        "O Node.js manteve retrocompatibilidade e introduziu aprimoramentos para performance e segurança.",
        "O Event Loop foi completamente descontinuado e substituído por threads bloqueantes de SO.",
        "Todos os pacotes CommonJS deixaram de ser executados imediatamente sem aviso.",
        "O motor V8 foi abandonado em favor de uma máquina virtual interpretada sem JIT."
      ],
      "correctIndex": 0,
      "explanation": "O Node.js adota um calendário de estabilidade rigoroso com suporte LTS, mantendo retrocompatibilidade com pacotes do ecossistema enquanto expande recursos nativos."
    },
    {
      "id": "nd-q-4-2",
      "type": "quiz",
      "question": "Questão 4.2: Qual a recomendação oficial de engenharia para o tópico abordado no Capítulo 4?",
      "options": [
        "Utilizar os novos padrões nativos recomendados para evitar dependências desnecessárias e vazamentos de recursos.",
        "Continuar utilizando construções legadas vulneráveis ignorando alertas de segurança DEP.",
        "Bloquear a thread principal do Event Loop com operações de leitura síncrona em disco.",
        "Desabilitar o controle de backpressure ao transferir dados em streams."
      ],
      "correctIndex": 0,
      "explanation": "A evolução do runtime fornece soluções nativas (como stream.pipeline, fetch nativo e AsyncLocalStorage) que eliminam bugs e melhoram a segurança operacional."
    }
  ],
  "nd-cap-5": [
    {
      "id": "nd-q-5-1",
      "type": "quiz",
      "question": "Questão 5.1: Em relação aos recursos do Capítulo 5 (Node.js 14 (LTS): AsyncLocalStorage & Package Entry Points), qual afirmação é tecnicamente correta?",
      "options": [
        "O Node.js manteve retrocompatibilidade e introduziu aprimoramentos para performance e segurança.",
        "O Event Loop foi completamente descontinuado e substituído por threads bloqueantes de SO.",
        "Todos os pacotes CommonJS deixaram de ser executados imediatamente sem aviso.",
        "O motor V8 foi abandonado em favor de uma máquina virtual interpretada sem JIT."
      ],
      "correctIndex": 0,
      "explanation": "O Node.js adota um calendário de estabilidade rigoroso com suporte LTS, mantendo retrocompatibilidade com pacotes do ecossistema enquanto expande recursos nativos."
    },
    {
      "id": "nd-q-5-2",
      "type": "quiz",
      "question": "Questão 5.2: Qual a recomendação oficial de engenharia para o tópico abordado no Capítulo 5?",
      "options": [
        "Utilizar os novos padrões nativos recomendados para evitar dependências desnecessárias e vazamentos de recursos.",
        "Continuar utilizando construções legadas vulneráveis ignorando alertas de segurança DEP.",
        "Bloquear a thread principal do Event Loop com operações de leitura síncrona em disco.",
        "Desabilitar o controle de backpressure ao transferir dados em streams."
      ],
      "correctIndex": 0,
      "explanation": "A evolução do runtime fornece soluções nativas (como stream.pipeline, fetch nativo e AsyncLocalStorage) que eliminam bugs e melhoram a segurança operacional."
    }
  ],
  "nd-cap-6": [
    {
      "id": "nd-q-6-1",
      "type": "quiz",
      "question": "Questão 6.1: Em relação aos recursos do Capítulo 6 (Node.js 16 (LTS): node: Prefix, Timers Promises & AbortController), qual afirmação é tecnicamente correta?",
      "options": [
        "O Node.js manteve retrocompatibilidade e introduziu aprimoramentos para performance e segurança.",
        "O Event Loop foi completamente descontinuado e substituído por threads bloqueantes de SO.",
        "Todos os pacotes CommonJS deixaram de ser executados imediatamente sem aviso.",
        "O motor V8 foi abandonado em favor de uma máquina virtual interpretada sem JIT."
      ],
      "correctIndex": 0,
      "explanation": "O Node.js adota um calendário de estabilidade rigoroso com suporte LTS, mantendo retrocompatibilidade com pacotes do ecossistema enquanto expande recursos nativos."
    },
    {
      "id": "nd-q-6-2",
      "type": "quiz",
      "question": "Questão 6.2: Qual a recomendação oficial de engenharia para o tópico abordado no Capítulo 6?",
      "options": [
        "Utilizar os novos padrões nativos recomendados para evitar dependências desnecessárias e vazamentos de recursos.",
        "Continuar utilizando construções legadas vulneráveis ignorando alertas de segurança DEP.",
        "Bloquear a thread principal do Event Loop com operações de leitura síncrona em disco.",
        "Desabilitar o controle de backpressure ao transferir dados em streams."
      ],
      "correctIndex": 0,
      "explanation": "A evolução do runtime fornece soluções nativas (como stream.pipeline, fetch nativo e AsyncLocalStorage) que eliminam bugs e melhoram a segurança operacional."
    }
  ],
  "nd-cap-7": [
    {
      "id": "nd-q-7-1",
      "type": "quiz",
      "question": "Questão 7.1: Em relação aos recursos do Capítulo 7 (Node.js 18 (LTS): Global Native fetch(), Test Runner & --watch), qual afirmação é tecnicamente correta?",
      "options": [
        "O Node.js manteve retrocompatibilidade e introduziu aprimoramentos para performance e segurança.",
        "O Event Loop foi completamente descontinuado e substituído por threads bloqueantes de SO.",
        "Todos os pacotes CommonJS deixaram de ser executados imediatamente sem aviso.",
        "O motor V8 foi abandonado em favor de uma máquina virtual interpretada sem JIT."
      ],
      "correctIndex": 0,
      "explanation": "O Node.js adota um calendário de estabilidade rigoroso com suporte LTS, mantendo retrocompatibilidade com pacotes do ecossistema enquanto expande recursos nativos."
    },
    {
      "id": "nd-q-7-2",
      "type": "quiz",
      "question": "Questão 7.2: Qual a recomendação oficial de engenharia para o tópico abordado no Capítulo 7?",
      "options": [
        "Utilizar os novos padrões nativos recomendados para evitar dependências desnecessárias e vazamentos de recursos.",
        "Continuar utilizando construções legadas vulneráveis ignorando alertas de segurança DEP.",
        "Bloquear a thread principal do Event Loop com operações de leitura síncrona em disco.",
        "Desabilitar o controle de backpressure ao transferir dados em streams."
      ],
      "correctIndex": 0,
      "explanation": "A evolução do runtime fornece soluções nativas (como stream.pipeline, fetch nativo e AsyncLocalStorage) que eliminam bugs e melhoram a segurança operacional."
    }
  ],
  "nd-cap-8": [
    {
      "id": "nd-q-8-1",
      "type": "quiz",
      "question": "Questão 8.1: Em relação aos recursos do Capítulo 8 (Node.js 20 (LTS): Permission Model, Native --env-file & SEA), qual afirmação é tecnicamente correta?",
      "options": [
        "O Node.js manteve retrocompatibilidade e introduziu aprimoramentos para performance e segurança.",
        "O Event Loop foi completamente descontinuado e substituído por threads bloqueantes de SO.",
        "Todos os pacotes CommonJS deixaram de ser executados imediatamente sem aviso.",
        "O motor V8 foi abandonado em favor de uma máquina virtual interpretada sem JIT."
      ],
      "correctIndex": 0,
      "explanation": "O Node.js adota um calendário de estabilidade rigoroso com suporte LTS, mantendo retrocompatibilidade com pacotes do ecossistema enquanto expande recursos nativos."
    },
    {
      "id": "nd-q-8-2",
      "type": "quiz",
      "question": "Questão 8.2: Qual a recomendação oficial de engenharia para o tópico abordado no Capítulo 8?",
      "options": [
        "Utilizar os novos padrões nativos recomendados para evitar dependências desnecessárias e vazamentos de recursos.",
        "Continuar utilizando construções legadas vulneráveis ignorando alertas de segurança DEP.",
        "Bloquear a thread principal do Event Loop com operações de leitura síncrona em disco.",
        "Desabilitar o controle de backpressure ao transferir dados em streams."
      ],
      "correctIndex": 0,
      "explanation": "A evolução do runtime fornece soluções nativas (como stream.pipeline, fetch nativo e AsyncLocalStorage) que eliminam bugs e melhoram a segurança operacional."
    }
  ],
  "nd-cap-9": [
    {
      "id": "nd-q-9-1",
      "type": "quiz",
      "question": "Questão 9.1: Em relação aos recursos do Capítulo 9 (Node.js 22 (LTS) & 24: Synchronous require(esm), Native TypeScript & node:sqlite), qual afirmação é tecnicamente correta?",
      "options": [
        "O Node.js manteve retrocompatibilidade e introduziu aprimoramentos para performance e segurança.",
        "O Event Loop foi completamente descontinuado e substituído por threads bloqueantes de SO.",
        "Todos os pacotes CommonJS deixaram de ser executados imediatamente sem aviso.",
        "O motor V8 foi abandonado em favor de uma máquina virtual interpretada sem JIT."
      ],
      "correctIndex": 0,
      "explanation": "O Node.js adota um calendário de estabilidade rigoroso com suporte LTS, mantendo retrocompatibilidade com pacotes do ecossistema enquanto expande recursos nativos."
    },
    {
      "id": "nd-q-9-2",
      "type": "quiz",
      "question": "Questão 9.2: Qual a recomendação oficial de engenharia para o tópico abordado no Capítulo 9?",
      "options": [
        "Utilizar os novos padrões nativos recomendados para evitar dependências desnecessárias e vazamentos de recursos.",
        "Continuar utilizando construções legadas vulneráveis ignorando alertas de segurança DEP.",
        "Bloquear a thread principal do Event Loop com operações de leitura síncrona em disco.",
        "Desabilitar o controle de backpressure ao transferir dados em streams."
      ],
      "correctIndex": 0,
      "explanation": "A evolução do runtime fornece soluções nativas (como stream.pipeline, fetch nativo e AsyncLocalStorage) que eliminam bugs e melhoram a segurança operacional."
    }
  ],
  "nd-cap-10": [
    {
      "id": "nd-q-10-1",
      "type": "quiz",
      "question": "Questão 10.1: Em relação aos recursos do Capítulo 10 (Express.js (1.x to 5.0) & Koa: Middlewares Pipeline & Async Error Handling), qual afirmação é tecnicamente correta?",
      "options": [
        "O Node.js manteve retrocompatibilidade e introduziu aprimoramentos para performance e segurança.",
        "O Event Loop foi completamente descontinuado e substituído por threads bloqueantes de SO.",
        "Todos os pacotes CommonJS deixaram de ser executados imediatamente sem aviso.",
        "O motor V8 foi abandonado em favor de uma máquina virtual interpretada sem JIT."
      ],
      "correctIndex": 0,
      "explanation": "O Node.js adota um calendário de estabilidade rigoroso com suporte LTS, mantendo retrocompatibilidade com pacotes do ecossistema enquanto expande recursos nativos."
    },
    {
      "id": "nd-q-10-2",
      "type": "quiz",
      "question": "Questão 10.2: Qual a recomendação oficial de engenharia para o tópico abordado no Capítulo 10?",
      "options": [
        "Utilizar os novos padrões nativos recomendados para evitar dependências desnecessárias e vazamentos de recursos.",
        "Continuar utilizando construções legadas vulneráveis ignorando alertas de segurança DEP.",
        "Bloquear a thread principal do Event Loop com operações de leitura síncrona em disco.",
        "Desabilitar o controle de backpressure ao transferir dados em streams."
      ],
      "correctIndex": 0,
      "explanation": "A evolução do runtime fornece soluções nativas (como stream.pipeline, fetch nativo e AsyncLocalStorage) que eliminam bugs e melhoram a segurança operacional."
    }
  ],
  "nd-cap-11": [
    {
      "id": "nd-q-11-1",
      "type": "quiz",
      "question": "Questão 11.1: Em relação aos recursos do Capítulo 11 (Fastify (1.x to 5.x): Radix Tree Router, JSON Schema JIT & Plugins), qual afirmação é tecnicamente correta?",
      "options": [
        "O Node.js manteve retrocompatibilidade e introduziu aprimoramentos para performance e segurança.",
        "O Event Loop foi completamente descontinuado e substituído por threads bloqueantes de SO.",
        "Todos os pacotes CommonJS deixaram de ser executados imediatamente sem aviso.",
        "O motor V8 foi abandonado em favor de uma máquina virtual interpretada sem JIT."
      ],
      "correctIndex": 0,
      "explanation": "O Node.js adota um calendário de estabilidade rigoroso com suporte LTS, mantendo retrocompatibilidade com pacotes do ecossistema enquanto expande recursos nativos."
    },
    {
      "id": "nd-q-11-2",
      "type": "quiz",
      "question": "Questão 11.2: Qual a recomendação oficial de engenharia para o tópico abordado no Capítulo 11?",
      "options": [
        "Utilizar os novos padrões nativos recomendados para evitar dependências desnecessárias e vazamentos de recursos.",
        "Continuar utilizando construções legadas vulneráveis ignorando alertas de segurança DEP.",
        "Bloquear a thread principal do Event Loop com operações de leitura síncrona em disco.",
        "Desabilitar o controle de backpressure ao transferir dados em streams."
      ],
      "correctIndex": 0,
      "explanation": "A evolução do runtime fornece soluções nativas (como stream.pipeline, fetch nativo e AsyncLocalStorage) que eliminam bugs e melhoram a segurança operacional."
    }
  ],
  "nd-cap-12": [
    {
      "id": "nd-q-12-1",
      "type": "quiz",
      "question": "Questão 12.1: Em relação aos recursos do Capítulo 12 (NestJS (1.x to 11.x) & Hono (1.x to 4.x): Enterprise DI vs. Web Standards Edge), qual afirmação é tecnicamente correta?",
      "options": [
        "O Node.js manteve retrocompatibilidade e introduziu aprimoramentos para performance e segurança.",
        "O Event Loop foi completamente descontinuado e substituído por threads bloqueantes de SO.",
        "Todos os pacotes CommonJS deixaram de ser executados imediatamente sem aviso.",
        "O motor V8 foi abandonado em favor de uma máquina virtual interpretada sem JIT."
      ],
      "correctIndex": 0,
      "explanation": "O Node.js adota um calendário de estabilidade rigoroso com suporte LTS, mantendo retrocompatibilidade com pacotes do ecossistema enquanto expande recursos nativos."
    },
    {
      "id": "nd-q-12-2",
      "type": "quiz",
      "question": "Questão 12.2: Qual a recomendação oficial de engenharia para o tópico abordado no Capítulo 12?",
      "options": [
        "Utilizar os novos padrões nativos recomendados para evitar dependências desnecessárias e vazamentos de recursos.",
        "Continuar utilizando construções legadas vulneráveis ignorando alertas de segurança DEP.",
        "Bloquear a thread principal do Event Loop com operações de leitura síncrona em disco.",
        "Desabilitar o controle de backpressure ao transferir dados em streams."
      ],
      "correctIndex": 0,
      "explanation": "A evolução do runtime fornece soluções nativas (como stream.pipeline, fetch nativo e AsyncLocalStorage) que eliminam bugs e melhoram a segurança operacional."
    }
  ]
};
