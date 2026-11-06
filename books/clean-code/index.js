import {
  part1Chapters,
  part2Chapters,
  part3Chapters,
  part4Chapters,
  smellsCatalog,
  cleanCodeOverview,
  cleanCodeChaptersData
} from "./explanations/index.js";
import { cleanCodeExamples } from "./examples/index.js";
import { cleanCodeAnimations } from "./examples/clean-code-animations.js";
import { cleanCodeLabs } from "./examples/clean-code-labs.js";
import { cleanCodeExercises } from "./exercises/index.js";
import {
  cleanCodeQuizzesData,
  cleanCodeScenariosData,
  cleanCodePracticalExercisesData
} from "./exercises/clean-code-quizzes.js";

const allChapters = [
  ...part1Chapters,
  ...part2Chapters,
  ...part3Chapters,
  ...part4Chapters
].map((chapter) => ({
  ...chapter,
  examples: cleanCodeExamples[chapter.id] || [],
  exercises: cleanCodeExercises[chapter.id] || []
}));

export const cleanCodeBook = {
  id: "clean-code",
  slug: "clean-code",
  title: "Código Limpo (Clean Code)",
  subtitle: cleanCodeOverview.subtitle,
  originalTitle: "Clean Code: A Handbook of Agile Software Craftsmanship",
  author: "Robert C. Martin (Uncle Bob)",
  year: 2008,
  editionPt: cleanCodeOverview.editionPt,
  affiliateUrl: "https://link.amazon/B0b1hcoN2",
  status: "ready",
  badge: "17 Capítulos + 66 Heurísticas",
  accentColor: "emerald",
  summary:
    "Guia prático de artesanato de software ágil: como transformar código frágil e difícil de manter em funções, classes, testes e sistemas legíveis, coesos e sustentáveis.",
  parts: [
    {
      id: "part-1",
      title: "Parte I: Fundamentos do Código Limpo",
      color: "amber",
      description:
        "Atitude profissional, nomenclatura intencional, funções curtas, comentários cirúrgicos e formatação comunicativa (Capítulos 1 a 5).",
      chapterIds: ["cap-1", "cap-2", "cap-3", "cap-4", "cap-5"]
    },
    {
      id: "part-2",
      title: "Parte II: Design, Fronteiras e Qualidade",
      color: "teal",
      description:
        "Anti-simetria entre objetos e dados, tratamento de erros limpo, isolamento de fronteiras externas e TDD com regras F.I.R.S.T. (Capítulos 6 a 9).",
      chapterIds: ["cap-6", "cap-7", "cap-8", "cap-9"]
    },
    {
      id: "part-3",
      title: "Parte III: Arquitetura, Emergência e Concorrência",
      color: "cobalt",
      description:
        "Classes coesas (SRP/OCP/DIP), separação entre construção e uso de sistemas, as 4 Regras de Design Simples de Beck e programação concorrente (Capítulos 10 a 13).",
      chapterIds: ["cap-10", "cap-11", "cap-12", "cap-13"]
    },
    {
      id: "part-4",
      title: "Parte IV: Estudos de Caso e Odores (Heurísticas)",
      color: "terracotta",
      description:
        "Refinamento sucessivo de Args, internals do JUnit (ComparisonCompactor), refatoração de SerialDate para DayDate e o catálogo completo C1 a T9 (Capítulos 14 a 17).",
      chapterIds: ["cap-14", "cap-15", "cap-16", "cap-17"]
    }
  ],
  chapters: allChapters,
  smellsCatalog,
  cleanCodeOverview,
  cleanCodeChaptersData,
  cleanCodeAnimations,
  cleanCodeLabs,
  cleanCodeQuizzesData,
  cleanCodeScenariosData,
  cleanCodePracticalExercisesData
};
