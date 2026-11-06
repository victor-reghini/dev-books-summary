/**
 * Dicionário Multilíngue de Topologias, Fluxogramas e Animações (GoF & Clean Code).
 * Cobre títulos de etapas, narrações, tags de transição e rótulos de conexões
 * nos 5 idiomas suportados: Português, Inglês, Espanhol, Italiano e Francês.
 */

export const cleanCodeAnimStepsI18n = {
  "cap-1": {
    en: {
      tag: "STEP • CLEAN CODE WORKFLOW",
      steps: [
        { title: "Module Reading (10:1 Ratio)", narration: "The developer opens the module for a task. Because we spend >10x more time reading than writing, obscure names cause wading." },
        { title: "5S Inspection (Seiri & Seiso)", narration: "Applying the 5S philosophy, the developer spots magic numbers [G25] and single-letter variables [N1] obscuring intent." },
        { title: "Expressive Method Extraction", narration: "The unit pricing calculation is extracted into 'priceWithTax(item, category)', turning the loop into clean prose." },
        { title: "Safety Net Validation", narration: "The unit test suite confirms that external behavior remains completely identical after incremental cleanup." },
        { title: "Boy Scout Rule Completed", narration: "The campground module was left cleaner than it was found, preserving sustainable team velocity." }
      ]
    },
    es: {
      tag: "PASO • FLUJO DE CÓDIGO LIMPIO",
      steps: [
        { title: "Lectura del Módulo (Proporción 10:1)", narration: "El desarrollador abre el módulo. Pasamos >10 veces más tiempo leyendo que escribiendo; nombres oscuros causan wading." },
        { title: "Diagnóstico 5S (Seiri y Seiso)", narration: "Aplicando la filosofía 5S, el desarrollador detecta números mágicos [G25] y variables de una letra [N1]." },
        { title: "Extracción de Método Expresivo", narration: "El cálculo unitario se extrae en 'priceWithTax(item, category)', transformando el bucle en prosa legible." },
        { title: "Validación en la Red de Seguridad", narration: "La suite de pruebas unitarias confirma que el comportamiento externo permanece idéntico tras la limpieza." },
        { title: "Regla del Boy Scout Cumplida", narration: "El campamento quedó más limpio de como se encontró, garantizando velocidad sostenible." }
      ]
    },
    it: {
      tag: "PASSAGGIO • FLUSSO CODICE PULITO",
      steps: [
        { title: "Lettura del Modulo (Rapporto 10:1)", narration: "Lo sviluppatore apre il modulo. Poiché trascorriamo >10 volte più tempo a leggere che a scrivere, nomi oscuri causano wading." },
        { title: "Diagnosi 5S (Seiri e Seiso)", narration: "Applicando la filosofia 5S, lo sviluppatore individua numeri magici [G25] e variabili a lettera singola [N1]." },
        { title: "Estrazione di Metodo Espressivo", narration: "Il calcolo del prezzo è estratto in 'priceWithTax(item, category)', trasformando il ciclo in prosa lineare." },
        { title: "Validazione nella Rete di Sicurezza", narration: "La suite di test unitari conferma che il comportamento esterno è rimasto identico dopo la pulizia." },
        { title: "Regola del Boy Scout Completata", narration: "Il modulo è stato lasciato più pulito di come era stato trovato, preservando la velocità del team." }
      ]
    },
    fr: {
      tag: "ÉTAPE • FLUX DE CODE PROPRE",
      steps: [
        { title: "Lecture du Module (Ratio 10:1)", narration: "Le développeur ouvre le module. Nous passons >10 fois plus de temps à lire qu'à écrire; des identifiants flous ralentissent l'équipe." },
        { title: "Diagnostic 5S (Seiri et Seiso)", narration: "En appliquant la philosophie 5S, le développeur repère les nombres magiques [G25] et variables d'une lettre [N1]." },
        { title: "Extraction d'une Méthode Expressive", narration: "Le calcul unitaire est extrait dans 'priceWithTax(item, category)', rendant la boucle fluide et explicite." },
        { title: "Validation dans le Filet de Sécurité", narration: "La suite de tests unitaires confirme que le comportement externe reste rigoureusement inchangé." },
        { title: "Règle du Boy-Scout Accomplie", narration: "Le campement a été laissé plus propre qu'à l'arrivée, préservant la vélocité durable de l'équipe." }
      ]
    }
  },
  "cap-2": {
    en: {
      tag: "STEP • MEANINGFUL NAMES REFACTORING",
      steps: [
        { title: "Identification of Obscure Arrays", narration: "The client code inspects raw integer arrays ('x[0] == 4') without revealing what 4 means." },
        { title: "Domain Entity Modeling", narration: "The developer encapsulates the primitive array into an expressive 'Cell' class with clear domain identity." },
        { title: "Intention-Revealing Predicate", narration: "Replacing 'x[0] == 4' with 'cell.isFlagged()' clarifies business logic immediately." },
        { title: "Noise Word Elimination", narration: "Renaming 'GameBoardData' to 'GameBoard' removes redundant noise words." },
        { title: "Meaningful Codebase Ready", narration: "The method reads like natural prose: 'gameBoard.getFlaggedCells()' requires zero deciphering." }
      ]
    },
    es: {
      tag: "PASO • REFACTORIZACIÓN DE NOMBRES",
      steps: [
        { title: "Identificación de Arreglos Crípticos", narration: "El cliente inspecciona arreglos mágicos ('x[0] == 4') sin revelar qué representa el número 4." },
        { title: "Modelado de Entidad de Dominio", narration: "El desarrollador encapsula el arreglo primitivo en una clase 'Cell' con identidad clara." },
        { title: "Predicado que Revela la Intención", narration: "Sustituir 'x[0] == 4' por 'cell.isFlagged()' clarifica la regla de negocio de inmediato." },
        { title: "Eliminación de Palabras de Ruido", narration: "Renombrar 'GameBoardData' a 'GameBoard' suprime sufijos innecesarios." },
        { title: "Código Expresivo y Claro", narration: "El método se lee como prosa natural: 'gameBoard.getFlaggedCells()' no requiere descifrado." }
      ]
    },
    it: {
      tag: "PASSAGGIO • REFACTORING DEI NOMI",
      steps: [
        { title: "Individuazione di Array Oscuri", narration: "Il codice client manipola array grezzi ('x[0] == 4') senza spiegare cosa significhi il valore 4." },
        { title: "Modellazione dell'Oggetto di Dominio", narration: "Lo sviluppatore incapsula l'array in una classe espressiva 'Cell' dotata di identità chiara." },
        { title: "Predicato Auto-Esplicativo", narration: "Sostituire 'x[0] == 4' con 'cell.isFlagged()' rende la logica di business immediatamente evidente." },
        { title: "Rimozione di Parole Rumorose", narration: "Rinominare 'GameBoardData' in 'GameBoard' elimina parole vuote e ridondanti." },
        { title: "Codice Espressivo Concluso", narration: "Il metodo si legge come prosa fluida: 'gameBoard.getFlaggedCells()' non necessita di spiegazioni." }
      ]
    },
    fr: {
      tag: "ÉTAPE • REFACTORISATION DES NOMS",
      steps: [
        { title: "Détection de Tableaux Obscurs", narration: "Le code client inspecte des tableaux bruts ('x[0] == 4') sans révéler la signification du chiffre 4." },
        { title: "Modélisation de l'Objet Métier", narration: "Le développeur encapsule le tableau primitif dans une classe expressive 'Cell' avec un rôle clair." },
        { title: "Prédicat Révélateur d'Intention", narration: "Remplacer 'x[0] == 4' par 'cell.isFlagged()' rend la règle métier immédiatement compréhensible." },
        { title: "Élimination des Mots Parasites", narration: "Renommer 'GameBoardData' en 'GameBoard' supprime les suffixes inutiles." },
        { title: "Code Expressif et Lisible", narration: "L'appel 'gameBoard.getFlaggedCells()' se lit comme une phrase naturelle sans aucune ambiguïté." }
      ]
    }
  },
  "cap-3": {
    en: {
      tag: "STEP • FUNCTION REFACTORING FLOW",
      steps: [
        { title: "Monster Switch Detection", narration: "A single calculatePay() method checks employee types, violating the Single Responsibility Principle." },
        { title: "Abstract Factory Introduction", narration: "An EmployeeFactory interface is created to isolate polymorphic instantiation in one place." },
        { title: "Polymorphic Strategy Dispatch", narration: "Each employee type encapsulates its own calculatePay() and deliverPay() logic." },
        { title: "Single Level of Abstraction", narration: "The main business loop now calls polymorphic methods without touching switch statements." },
        { title: "Do One Thing Principle Verified", narration: "Functions are under 20 lines, highly focused, and free of boolean flag parameters." }
      ]
    },
    es: {
      tag: "PASO • REFACTORIZACIÓN DE FUNCIONES",
      steps: [
        { title: "Detección de Switch Monolítico", narration: "Un método calculatePay() evalúa tipos de empleados, violando el principio SRP." },
        { title: "Introducción de Abstract Factory", narration: "Se crea una interfaz EmployeeFactory para aislar la instanciación en un solo lugar." },
        { title: "Despacho Polimórfico Limpio", narration: "Cada tipo de empleado encapsula su propio cálculo de pago y entrega." },
        { title: "Un Solo Nivel de Abstracción", narration: "El flujo principal invoca métodos polimórficos sin bifurcaciones condicionales." },
        { title: "Principio de Tarea Única Verificado", narration: "Las funciones son breves, no tienen flags booleanos y hacen una sola cosa bien." }
      ]
    },
    it: {
      tag: "PASSAGGIO • REFACTORING DELLE FUNZIONI",
      steps: [
        { title: "Rilevamento di Switch Monolitico", narration: "Un metodo calculatePay() ispeziona i tipi di dipendenti violando il principio di singola responsabilità." },
        { title: "Introduzione di Abstract Factory", narration: "Viene creata una EmployeeFactory per isolare l'istanziazione polimorfa in un unico punto." },
        { title: "Delega Polimorfica Pulita", narration: "Ciascuna tipologia di dipendente incapsula la propria logica di calcolo." },
        { title: "Livello di Astrazione Singolo", narration: "Il ciclo principale invoca metodi polimorfici senza strutture switch/case." },
        { title: "Principio 'Fai Una Cosa Sola' Verificato", narration: "Le funzioni sono snelle, prive di flag booleani e focalizzate." }
      ]
    },
    fr: {
      tag: "ÉTAPE • REFACTORISATION DES FONCTIONS",
      steps: [
        { title: "Détection d'un Switch Volumineux", narration: "La méthode calculatePay() inspecte les types d'employés, violant le principe SRP." },
        { title: "Introduction d'une Fabrique Abstraite", narration: "Une interface EmployeeFactory est créée pour isoler l'instanciation polymorphe." },
        { title: "Délégation Polymorphique", narration: "Chaque catégorie d'employé encapsule sa propre méthode de calcul et de versement." },
        { title: "Niveau d'Abstraction Unique", narration: "Le flux principal appelle des méthodes polymorphes sans aucune instruction conditionnelle." },
        { title: "Principe de Responsabilité Unique Validé", narration: "Les fonctions font moins de 20 lignes et sont exemptes de paramètres booléens." }
      ]
    }
  }
};

/**
 * Tradução de rótulos de nós, arestas e tags para topologias e animações
 */
export function getLocalizedAnimStep(animId, stepIdx, defaultStep, lang = "pt") {
  if (lang === "pt") return defaultStep;

  // Se já tiver tradução no próprio objeto da etapa
  if (defaultStep.title && typeof defaultStep.title === "object" && defaultStep.title[lang]) {
    return {
      ...defaultStep,
      tag: defaultStep.tag?.[lang] || defaultStep.tag?.en || defaultStep.tag?.pt || defaultStep.tag,
      title: defaultStep.title[lang],
      desc: defaultStep.desc?.[lang] || defaultStep.desc?.en || defaultStep.desc?.pt || defaultStep.desc
    };
  }

  // Consulta no dicionário cleanCodeAnimStepsI18n
  const ccAnim = cleanCodeAnimStepsI18n[animId]?.[lang];
  if (ccAnim) {
    const s = ccAnim.steps[stepIdx];
    if (s) {
      return {
        ...defaultStep,
        tag: `${ccAnim.tag} 0${stepIdx + 1}`,
        title: s.title,
        desc: s.narration
      };
    }
  }

  return defaultStep;
}

