import {
  part1Chapters,
  part2Chapters,
  part3Chapters,
  part4Chapters,
  bookOverview,
  grokkingChaptersData,
  grokkingAlgorithmsI18n
} from "./explanations/index.js";
import {
  grokkingAlgorithmsExamples,
  grokkingAlgorithmsAnimations,
  grokkingAlgorithmsLabs
} from "./examples/index.js";
import { grokkingAlgorithmsExercises } from "./exercises/index.js";
import {
  grokkingQuizzesData,
  grokkingScenariosData,
  grokkingPracticalExercisesData
} from "./exercises/grokking-algorithms-quizzes.js";

const allChapters = [
  ...part1Chapters,
  ...part2Chapters,
  ...part3Chapters,
  ...part4Chapters
].map((chapter) => ({
  ...chapter,
  examples: grokkingAlgorithmsExamples[chapter.id] || [],
  exercises: grokkingAlgorithmsExercises[chapter.id] || []
}));

export const grokkingAlgorithmsBook = {
  id: "grokking-algorithms",
  slug: "grokking-algorithms",
  title: "Entendendo Algoritmos (Grokking Algorithms)",
  subtitle: bookOverview.subtitle,
  originalTitle: "Grokking Algorithms: An illustrated guide for programmers and other curious people",
  author: "Aditya Y. Bhargava",
  year: 2016,
  editionPt: bookOverview.editionPt,
  affiliateUrl: "https://link.amazon/B04UCSIMC",
  status: "ready",
  badge: "11 Capitulos Ilustrados + Guia Visual",
  accentColor: "amber",
  summary:
    "Um guia ilustrado e pratico para programadores e curiosos: aprenda estruturas de dados, notacao Big O, Quicksort, tabelas hash, grafos, Dijkstra, algoritmos gulosos e programacao dinamica de forma visual e memoravel.",
  parts: [
    {
      id: "part-1",
      title: "Parte I: Fundamentos & Estruturas Lineares",
      color: "amber",
      description:
        "Pesquisa binaria, notacao Big O, memoria do computador, arrays vs listas encadeadas, ordenacao por selecao e recursao na call stack (Capitulos 1 a 3).",
      chapterIds: ["ga-cap-1", "ga-cap-2", "ga-cap-3"]
    },
    {
      id: "part-2",
      title: "Parte II: Dividir para Conquistar & Tabelas Hash",
      color: "blue",
      description:
        "A mentalidade Dividir para Conquistar (D&C), Quicksort, o papel do pivo, funcoes hash, resolucao de colisoes e fator de carga (Capitulos 4 e 5).",
      chapterIds: ["ga-cap-4", "ga-cap-5"]
    },
    {
      id: "part-3",
      title: "Parte III: Algoritmos em Grafos",
      color: "emerald",
      description:
        "Grafos orientados, Pesquisa em Largura (BFS), filas FIFO, deteccao de menor caminho e o Algoritmo de Dijkstra para grafos ponderados (Capitulos 6 e 7).",
      chapterIds: ["ga-cap-6", "ga-cap-7"]
    },
    {
      id: "part-4",
      title: "Parte IV: Algoritmos Complexos & Proximos Passos",
      color: "rose",
      description:
        "Algoritmos gulosos de aproximacao, problemas NP-Completos, Programacao Dinamica, KNN para aprendizado de maquina e estruturas probabilisticas (Capitulos 8 a 11).",
      chapterIds: ["ga-cap-8", "ga-cap-9", "ga-cap-10", "ga-cap-11"]
    }
  ],
  chapters: allChapters,
  bookOverview,
  grokkingChaptersData,
  patternsData: grokkingChaptersData,
  grokkingAlgorithmsAnimations,
  animations: grokkingAlgorithmsAnimations,
  grokkingAlgorithmsLabs,
  labs: grokkingAlgorithmsLabs,
  grokkingQuizzesData,
  quizzesData: grokkingQuizzesData,
  grokkingScenariosData,
  scenariosData: grokkingScenariosData,
  grokkingPracticalExercisesData,
  practicalExercisesData: grokkingPracticalExercisesData,
  grokkingAlgorithmsI18n
};

