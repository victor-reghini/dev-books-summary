import {
  part1Chapters,
  part2Chapters,
  part3Chapters,
  part4Chapters,
  bookOverview,
  nodeChaptersData,
  nodeI18n,
  nodeVersionsMatrix,
  nodeFrameworksHistory
} from "./explanations/index.js";
import {
  nodeExamples,
  nodeAnimations,
  nodeLabs
} from "./examples/index.js";
import { nodeExercises } from "./exercises/index.js";
import {
  nodeQuizzesData,
  nodeScenariosData,
  nodePracticalExercisesData
} from "./exercises/node-quizzes.js";

const allChapters = [
  ...part1Chapters,
  ...part2Chapters,
  ...part3Chapters,
  ...part4Chapters
].map((chapter) => ({
  ...chapter,
  examples: nodeExamples[chapter.id] || [],
  exercises: nodeExercises[chapter.id] || []
}));

export const nodeBook = {
  id: "node",
  slug: "node",
  title: "Node.js: Guia Completo de Versões, Event Loop & Frameworks",
  subtitle: bookOverview.subtitle,
  originalTitle: bookOverview.originalTitle,
  author: "Ryan Dahl, Matteo Collina & Comunidade OpenJS",
  year: 2025,
  editionPt: bookOverview.editionPt,
  affiliateUrl: "https://link.amazon/B0NODE22LTS",
  status: "ready",
  badge: "12 Capítulos • Node 0.10 a 24 + Express 5, Fastify 5 & NestJS 11",
  accentColor: "emerald",
  summary:
    "Do Node 0.10 ao Node 24: arquitetura V8 + libuv, as 6 fases do Event Loop, Streams com Backpressure, ESM, Worker Threads, AsyncLocalStorage, Test Runner nativo, require(esm), SQLite e o histórico completo dos frameworks Express 5, Fastify 5, NestJS 11 e Hono 4.",
  parts: [
    {
      id: "part-1",
      title: "Parte I: Arquitetura V8, libuv & Event Loop",
      color: "emerald",
      description:
        "Node 0.1 a 0.12 (Event Loop e Streams), Node 4 e 6 LTS (io.js, ES6 e Buffer seguro) e Node 8 e 10 LTS (async/await, N-API e stream.pipeline) (Capítulos 1 a 3).",
      chapterIds: ["nd-cap-1", "nd-cap-2", "nd-cap-3"]
    },
    {
      id: "part-2",
      title: "Parte II: Módulos ES & Concorrência Moderna",
      color: "blue",
      description:
        "Node 12 LTS (Worker Threads e ES Modules), Node 14 LTS (AsyncLocalStorage e Package Exports) e Node 16 LTS (prefixo node: e AbortController) (Capítulos 4 a 6).",
      chapterIds: ["nd-cap-4", "nd-cap-5", "nd-cap-6"]
    },
    {
      id: "part-3",
      title: "Parte III: Runtime Moderno, Segurança & Conexão Nativa",
      color: "amber",
      description:
        "Node 18 LTS (fetch nativo e node:test), Node 20 LTS (Permission Model e --env-file) e Node 22/24 (require(esm), TypeScript nativo e node:sqlite) (Capítulos 7 a 9).",
      chapterIds: ["nd-cap-7", "nd-cap-8", "nd-cap-9"]
    },
    {
      id: "part-4",
      title: "Parte IV: Frameworks Backend & Servidores HTTP",
      color: "purple",
      description:
        "Express 5.0 (captura de erros assíncronos e Koa), Fastify 5 (Radix Tree e JSON Schema JIT) e NestJS 11 com Hono 4 (Capítulos 10 a 12).",
      chapterIds: ["nd-cap-10", "nd-cap-11", "nd-cap-12"]
    }
  ],
  chapters: allChapters,
  bookOverview,
  nodeChaptersData,
  patternsData: nodeChaptersData,
  nodeAnimations,
  animations: nodeAnimations,
  nodeLabs,
  labs: nodeLabs,
  nodeQuizzesData,
  quizzesData: nodeQuizzesData,
  nodeScenariosData,
  scenariosData: nodeScenariosData,
  nodePracticalExercisesData,
  practicalExercisesData: nodePracticalExercisesData,
  nodeI18n,
  nodeVersionsMatrix,
  nodeFrameworksHistory
};
