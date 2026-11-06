import {
  patternsData,
  bookOverview,
  SUPPORTED_LANGS,
  getLang,
  setLang,
  onLangChange,
  uiStrings,
  t,
  patternI18n
} from "./explanations/index.js";
import { patternAnimations, labs } from "./examples/index.js";
import { quizzesData, scenariosData, practicalExercisesData } from "./exercises/index.js";

export const designPatternsBook = {
  id: "design-patterns",
  slug: "design-patterns",
  title: bookOverview.title,
  subtitle: bookOverview.subtitle,
  originalTitle: bookOverview.originalTitle,
  author: bookOverview.authors.map((a) => a.name).join(", "),
  year: bookOverview.publicationYear,
  editionPt: bookOverview.editionPt,
  status: "ready",
  patternsData,
  bookOverview,
  patternAnimations,
  labs,
  quizzesData,
  scenariosData,
  practicalExercisesData,
  SUPPORTED_LANGS,
  getLang,
  setLang,
  onLangChange,
  uiStrings,
  t,
  patternI18n
};
