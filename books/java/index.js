import {
  part1Chapters,
  part2Chapters,
  part3Chapters,
  part4Chapters,
  bookOverview,
  javaChaptersData,
  javaI18n,
  javaVersionsMatrix,
  javaFrameworksHistory
} from "./explanations/index.js";
import {
  javaExamples,
  javaAnimations,
  javaLabs
} from "./examples/index.js";
import { javaExercises } from "./exercises/index.js";
import {
  javaQuizzesData,
  javaScenariosData,
  javaPracticalExercisesData
} from "./exercises/java-quizzes.js";

const allChapters = [
  ...part1Chapters,
  ...part2Chapters,
  ...part3Chapters,
  ...part4Chapters
].map((chapter) => ({
  ...chapter,
  examples: javaExamples[chapter.id] || [],
  exercises: javaExercises[chapter.id] || []
}));

export const javaBook = {
  id: "java",
  slug: "java",
  title: "Java: Guia Completo de Versões, JVM & Ecossistema",
  subtitle: bookOverview.subtitle,
  originalTitle: bookOverview.originalTitle,
  author: "James Gosling, Brian Goetz & Comunidade OpenJDK",
  year: 2025,
  editionPt: bookOverview.editionPt,
  affiliateUrl: "https://link.amazon/B0JAVA21LTS",
  status: "ready",
  badge: "12 Capítulos • JDK 1.0 a 25 LTS + Spring Boot & Quarkus",
  accentColor: "orange",
  summary:
    "Do JDK 1.0 ao Java 25 LTS: evolução detalhada da JVM, novidades por versão, código de como utilizar, garantias de retrocompatibilidade binária, Virtual Threads (Loom), FFM (Panama) e o histórico completo de frameworks como Spring Boot, Quarkus, Jakarta EE e Micronaut.",
  parts: [
    {
      id: "part-1",
      title: "Parte I: Gênese da JVM & Fundamentos Clássicos",
      color: "amber",
      description:
        "JDK 1.0 a 1.4, Java 5 (Generics, Concorrência de Doug Lea e JMM) e Java 6/7 (Project Coin, try-with-resources e NIO.2) (Capítulos 1 a 3).",
      chapterIds: ["jv-cap-1", "jv-cap-2", "jv-cap-3"]
    },
    {
      id: "part-2",
      title: "Parte II: Revolução Funcional & Modular",
      color: "blue",
      description:
        "Java 8 LTS (Lambdas, Streams e java.time), Java 9/10 (Sistema de Módulos JPMS/Jigsaw e var) e Java 11 LTS (HttpClient HTTP/2 e execução .java) (Capítulos 4 a 6).",
      chapterIds: ["jv-cap-4", "jv-cap-5", "jv-cap-6"]
    },
    {
      id: "part-3",
      title: "Parte III: Java Moderno, Records & Virtual Threads",
      color: "emerald",
      description:
        "Java 12 a 17 LTS (Records, Sealed Classes e Pattern Matching), Java 18 a 21 LTS (Virtual Threads do Project Loom) e Java 22 a 25 LTS (FFM Panama e Stream Gatherers) (Capítulos 7 a 9).",
      chapterIds: ["jv-cap-7", "jv-cap-8", "jv-cap-9"]
    },
    {
      id: "part-4",
      title: "Parte IV: Frameworks Enterprise & Ecossistema Moderno",
      color: "rose",
      description:
        "Spring Boot (1.x a 3.4+ com GraalVM e Virtual Threads), Quarkus (Build-Time CDI e Panache) e Jakarta EE 11 com Micronaut 4 (Capítulos 10 a 12).",
      chapterIds: ["jv-cap-10", "jv-cap-11", "jv-cap-12"]
    }
  ],
  chapters: allChapters,
  bookOverview,
  javaChaptersData,
  patternsData: javaChaptersData,
  javaAnimations,
  animations: javaAnimations,
  javaLabs,
  labs: javaLabs,
  javaQuizzesData,
  quizzesData: javaQuizzesData,
  javaScenariosData,
  scenariosData: javaScenariosData,
  javaPracticalExercisesData,
  practicalExercisesData: javaPracticalExercisesData,
  javaI18n,
  javaVersionsMatrix,
  javaFrameworksHistory
};
