/**
 * Dicionário Multilíngue de Exercícios de Fixação, Quizzes e Cenários de Arquitetura.
 * Cobre EN, ES, IT e FR para os livros Padrões de Projeto (GoF) e Código Limpo (Clean Code).
 */

export const quizzesI18n = {
  // ==========================================
  // GOF: PRINCÍPIOS E PADRÕES
  // ==========================================
  "q-principles-1": {
    en: {
      question: "What are the two fundamental object-oriented design principles championed by the Gang of Four (GoF) in Chapter 1?",
      options: [
        "Always inherit to reuse code; and create class names in English.",
        "Program to an interface, not an implementation; and favor object composition over class inheritance.",
        "Every class must be a Singleton; and avoid dynamic polymorphism.",
        "Centralize control into a single God Object; and reuse white-box structures."
      ],
      explanation: "GoF establishes two central rules in Chapter 1: (1) 'Program to an interface, not an implementation' and (2) 'Favor object composition over class inheritance', promoting black-box reuse and loose coupling."
    },
    es: {
      question: "¿Cuáles son los dos principios fundamentales de diseño orientado a objetos defendidos por el Gang of Four (GoF) en el Capítulo 1?",
      options: [
        "Heredar siempre para reutilizar código; y escribir nombres en inglés.",
        "Programar para una interfaz, no para una implementación; y preferir la composición de objetos a la herencia de clases.",
        "Cada clase debe ser un Singleton; y evitar el polimorfismo dinámico.",
        "Centralizar el control en un único objeto principal; y reutilizar estructuras de caja blanca."
      ],
      explanation: "El GoF establece dos reglas clave: (1) 'Programar para una interfaz, no para una implementación' y (2) 'Preferir la composición de objetos a la herencia de clases'."
    },
    it: {
      question: "Quali sono i due principi fondamentali di progettazione orientata agli oggetti sostenuti dalla Gang of Four (GoF) nel Capitolo 1?",
      options: [
        "Ereditare sempre per riutilizzare codice; e creare classi con nomi in inglese.",
        "Programmare per un'interfaccia, non per un'implementazione; e preferire la composizione di oggetti all'ereditarietà delle classi.",
        "Ogni classe deve essere un Singleton; ed evitare il polimorfismo dinamico.",
        "Centralizzare il controllo in un unico oggetto principale; e riutilizzare strutture white-box."
      ],
      explanation: "Il GoF stabilisce nel Capitolo 1 due regole cardine: (1) 'Programma per un'interfaccia, non per un'implementazione' e (2) 'Preferisci la composizione di oggetti all'ereditarietà'."
    },
    fr: {
      question: "Quels sont les deux principes fondamentaux de conception orientée objet défendus par le Gang of Four (GoF) dans le Chapitre 1 ?",
      options: [
        "Toujours hériter pour réutiliser du code; et nommer les classes en anglais.",
        "Programmer pour une interface, non pour une implémentation; et préférer la composition d'objets à l'héritage de classes.",
        "Chaque classe doit être un Singleton; et éviter le polymorphisme dynamique.",
        "Centraliser le contrôle dans un objet unique; et réutiliser des structures en boîte blanche."
      ],
      explanation: "Le GoF pose deux règles maîtresses : (1) 'Programmer pour une interface, non pour une implémentation' et (2) 'Préférer la composition d'objets à l'héritage de classes'."
    }
  },
  "q-principles-2": {
    en: {
      question: "What is the difference between 'White-box' reuse and 'Black-box' reuse according to GoF?",
      options: [
        "White-box uses unit tests; black-box uses only integration tests.",
        "White-box is based on class inheritance (subclasses see superclass internals); black-box is based on object composition (interaction strictly through defined interfaces).",
        "White-box is exclusive to functional languages; black-box is exclusive to C++.",
        "White-box hides source code in binary libraries; black-box exposes all attributes as public."
      ],
      explanation: "In inheritance (white-box), the subclass knows internal implementation details, which frequently breaks encapsulation. In composition (black-box), objects interact purely through public contracts."
    },
    es: {
      question: "¿Cuál es la diferencia entre reutilización por 'Caja Blanca' y 'Caja Negra' según el GoF?",
      options: [
        "Caja blanca usa pruebas unitarias; caja negra usa solo pruebas de integración.",
        "Caja blanca se basa en herencia de clases (subclases ven detalles internos); caja negra se basa en composición de objetos (interacción por interfaces bien definidas).",
        "Caja blanca es exclusiva de lenguajes funcionales; caja negra es exclusiva de C++.",
        "Caja blanca oculta el código en binarios; caja negra expone todo como público."
      ],
      explanation: "En la herencia (caja blanca), la subclase conoce detalles internos. En la composición (caja negra), los objetos interactúan únicamente por interfaces públicas."
    },
    it: {
      question: "Qual è la differenza tra riutilizzo 'White-box' (scatola bianca) e 'Black-box' (scatola nera) secondo il GoF?",
      options: [
        "La scatola bianca usa test unitari; la scatola nera usa solo test di integrazione.",
        "La scatola bianca si basa sull'ereditarietà (le sottoclassi vedono i dettagli interni); la scatola nera si basa sulla composizione (interazione solo tramite interfacce definite).",
        "La scatola bianca è esclusiva dei linguaggi funzionali; la scatola nera di C++.",
        "La scatola bianca nasconde il codice in librerie binarie; la scatola nera espone tutto pubblicamente."
      ],
      explanation: "Nell'ereditarietà (scatola bianca), i dettagli interni sono visibili rompendo l'incapsulamento. Nella composizione (scatola nera), l'interazione avviene solo tramite interfacce."
    },
    fr: {
      question: "Quelle est la différence entre la réutilisation 'Boîte Blanche' et 'Boîte Noire' selon le GoF ?",
      options: [
        "La boîte blanche utilise des tests unitaires; la boîte noire uniquement des tests d'intégration.",
        "La boîte blanche repose sur l'héritage de classes (détails internes exposés); la boîte noire repose sur la composition d'objets (interaction par interfaces strictes).",
        "La boîte blanche est exclusive aux langages fonctionnels; la boîte noire au C++.",
        "La boîte blanche masque le code binaire; la boîte noire expose tout en public."
      ],
      explanation: "L'héritage (boîte blanche) expose l'implémentation interne et fragilise l'encapsulation. La composition (boîte noire) n'interagit qu'au travers d'interfaces publiques."
    }
  },
  "q-lexi-1": {
    en: {
      question: "In the Lexi document editor case study (Chapter 2), which design pattern was used to represent the hierarchical document structure (characters, lines, columns, pages) uniformly?",
      options: ["Flyweight", "Composite", "Builder", "Abstract Factory"],
      explanation: "The Composite pattern was used in the 'Glyph' hierarchy to treat primitive characters and aggregate nodes (lines, columns, pages) with the exact same uniform interface."
    },
    es: {
      question: "En el caso de estudio del editor Lexi (Capítulo 2), ¿qué patrón se utilizó para representar la estructura física jerárquica del documento de forma uniforme?",
      options: ["Flyweight", "Composite", "Builder", "Abstract Factory"],
      explanation: "Se utilizó el patrón Composite en la jerarquía 'Glyph' para tratar caracteres y agrupamientos complejos con la misma interfaz uniforme."
    },
    it: {
      question: "Nello studio del caso Lexi (Capitolo 2), quale pattern è stato impiegato per rappresentare la struttura gerarchica del documento in modo uniforme?",
      options: ["Flyweight", "Composite", "Builder", "Abstract Factory"],
      explanation: "Il pattern Composite è stato utilizzato nella gerarchia 'Glyph' per trattare sia caratteri singoli che aggregati complessi con la medesima interfaccia uniforme."
    },
    fr: {
      question: "Dans l'étude de cas de l'éditeur Lexi (Chapitre 2), quel patron a été utilisé pour représenter la structure hiérarchique du document de manière uniforme ?",
      options: ["Flyweight", "Composite", "Builder", "Abstract Factory"],
      explanation: "Le patron Composite a été employé dans la hiérarchie 'Glyph' pour manipuler caractères élémentaires et conteneurs avec la même interface uniforme."
    }
  },
  "q-abstract-factory-1": {
    en: {
      question: "What is the primary intent of the Abstract Factory design pattern?",
      options: [
        "Provide an interface for creating families of related or dependent objects without specifying their concrete classes.",
        "Ensure a class has only one instance and provide global access.",
        "Convert the interface of a class into another interface clients expect.",
        "Separate an abstraction from its implementation so both can vary independently."
      ],
      explanation: "Abstract Factory provides a contract to instantiate whole cohesive product families (e.g. MacButton + MacCheckbox) without coupling client code to concrete platform classes."
    },
    es: {
      question: "¿Cuál es la intención principal del patrón Abstract Factory?",
      options: [
        "Proporcionar una interfaz para crear familias de objetos relacionados o dependientes sin especificar sus clases concretas.",
        "Garantizar que una clase tenga una única instancia global.",
        "Convertir la interfaz de una clase en otra esperada por los clientes.",
        "Separar una abstracción de su implementación para que ambas varíen independientemente."
      ],
      explanation: "Abstract Factory crea familias completas de productos compatibles sin acoplar el código a clases concretas."
    },
    it: {
      question: "Qual è l'intento principale del design pattern Abstract Factory?",
      options: [
        "Fornire un'interfaccia per creare famiglie di oggetti correlati o dipendenti senza specificarne le classi concrete.",
        "Garantire che una classe abbia una sola istanza con accesso globale.",
        "Convertire l'interfaccia di una classe in un'altra attesa dai client.",
        "Separare un'astrazione dalla sua implementazione in modo che varino indipendentemente."
      ],
      explanation: "Abstract Factory definisce un'interfaccia per istanziare famiglie omogenee di oggetti preservando il disaccoppiamento."
    },
    fr: {
      question: "Quelle est l'intention principale du patron Abstract Factory ?",
      options: [
        "Fournir une interface pour créer des familles d'objets apparentés sans spécifier leurs classes concrètes.",
        "Garantir qu'une classe ne possède qu'une seule instance globale.",
        "Convertir l'interface d'une classe en une autre attendue par les clients.",
        "Séparer une abstraction de son implémentation pour les faire évoluer indépendamment."
      ],
      explanation: "Abstract Factory permet d'instancier des familles complètes d'objets cohérents sans coupler le client aux classes concrètes."
    }
  },

  // ==========================================
  // CÓDIGO LIMPO (CLEAN CODE)
  // ==========================================
  "q-1-1": {
    en: {
      question: "According to Chapter 1 of Clean Code, what is the approximate ratio of time spent reading existing code versus writing new code, and what is its direct implication?",
      options: [
        "A ratio exceeding 10:1; therefore, making code easy to read is the only real way to write code quickly.",
        "A 1:1 ratio; reading and typing code consume the exact same amount of time.",
        "A 1:5 ratio; we spend 80% of our time typing new lines and only 20% reading.",
        "Reading only happens during formal compliance audits before releases."
      ],
      explanation: "We spend more than 10 times more time reading code around the edit point than writing new lines. Making code easy to read directly accelerates writing."
    },
    es: {
      question: "Según el Capítulo 1, ¿cuál es la proporción aproximada de tiempo dedicado a leer código existente frente a escribir código nuevo, y cuál es su implicación directa?",
      options: [
        "Proporción superior a 10:1; por tanto, hacer el código fácil de leer es la única forma real de escribir rápido.",
        "Proporción de 1:1; leer y escribir consumen exactamente el mismo tiempo.",
        "Proporción de 1:5; pasamos el 80% tecleando nuevas líneas y 20% leyendo.",
        "La lectura solo ocurre en auditorías formales antes de producción."
      ],
      explanation: "Pasamos más de 10 veces más tiempo leyendo código que escribiéndolo. Facilitar la lectura acelera de forma directa la velocidad del equipo."
    },
    it: {
      question: "Secondo il Capitolo 1, qual è il rapporto approssimativo di tempo speso a leggere codice esistente rispetto a scriverne di nuovo, e qual è la sua implicazione diretta?",
      options: [
        "Un rapporto superiore a 10:1; pertanto, rendere il codice facile da leggere è l'unico vero modo per sviluppare velocemente.",
        "Un rapporto di 1:1; lettura e digitazione richiedono esattamente lo stesso tempo.",
        "Un rapporto di 1:5; trascorriamo l'80% a digitare nuove righe e solo il 20% a leggere.",
        "La lettura avviene solo durante gli audit formali prima del rilascio."
      ],
      explanation: "Trascorriamo più di 10 volte più tempo a leggere codice che a scriverne. Semplificare la lettura è l'unica via per andare veloci in modo sostenibile."
    },
    fr: {
      question: "D'après le Chapitre 1, quel est le ratio approximatif de temps passé à lire du code existant par rapport à en écrire de nouveau, et quelle en est la conséquence directe ?",
      options: [
        "Un ratio supérieur à 10:1; par conséquent, rendre le code facile à lire est le seul véritable moyen d'écrire vite.",
        "Un ratio de 1:1; la lecture et la saisie prennent exactement le même temps.",
        "Un ratio de 1:5; nous passons 80% du temps à taper du code et 20% à lire.",
        "La lecture ne se produit que lors d'audits officiels avant la livraison."
      ],
      explanation: "Nous passons plus de 10 fois plus de temps à lire du code qu'à en écrire. Rendre le code lisible est le levier majeur de productivité."
    }
  },
  "q-1-2": {
    en: {
      question: "A project manager asks to skip refactoring today and 'clean up the module next quarter'. Which principle from Chapter 1 explains the danger of this choice?",
      options: [
        "LeBlanc's Law ('Later equals never') combined with the asymptotic productivity collapse caused by wading.",
        "The Law of Demeter for object encapsulation.",
        "The Dependency Inversion Principle (DIP).",
        "Martin Fowler's Special Case pattern."
      ],
      explanation: "LeBlanc's Law shows that 'later' rarely arrives, and accumulated mess degrades team velocity until delivering new features is completely paralyzed."
    },
    es: {
      question: "Un gerente pide omitir el refactoring hoy y 'limpiar el módulo el próximo trimestre'. ¿Qué principio del Capítulo 1 explica el riesgo de esta decisión?",
      options: [
        "Ley de LeBlanc ('Después es igual a nunca') combinada con el colapso asintótico de productividad causado por el wading.",
        "La Regla de Demeter para el encapsulamiento de objetos.",
        "El Principio de Inversión de Dependencias (DIP).",
        "El patrón Special Case de Martin Fowler."
      ],
      explanation: "La Ley de LeBlanc demuestra que 'después' casi nunca llega, y la acumulación de código sucio reduce la velocidad del equipo hasta paralizarla."
    },
    it: {
      question: "Un manager chiede di saltare il refactoring oggi e 'ripulire il modulo il prossimo trimestre'. Quale principio del Capitolo 1 spiega il rischio di questa scelta?",
      options: [
        "La Legge di LeBlanc ('Dopo significa mai') unita al crollo asintotico di produttività dovuto al wading.",
        "La Legge di Demetra per l'incapsulamento degli oggetti.",
        "Il Principio di Inversione delle Dipendenze (DIP).",
        "Il pattern Special Case di Martin Fowler."
      ],
      explanation: "La Legge di LeBlanc insegna che 'dopo' significa quasi sempre 'mai', e il debito tecnico accumulato frena drammaticamente la squadra."
    },
    fr: {
      question: "Un responsable demande de reporter la refactorisation et de 'nettoyer le code au prochain trimestre'. Quel principe du Chapitre 1 met en garde contre ce risque ?",
      options: [
        "La Loi de LeBlanc ('Plus tard égale jamais') combinée à la chute de vélocité causée par l'enlisement (wading).",
        "La Loi de Déméter pour l'encapsulation des objets.",
        "Le Principe d'Inversion de Dépendance (DIP).",
        "Le patron Special Case de Martin Fowler."
      ],
      explanation: "La Loi de LeBlanc rappelle que 'plus tard' n'arrive jamais et que le désordre accumulé paralyse progressivement toute nouvelle livraison."
    }
  },
  "q-2-1": {
    en: {
      question: "What is the primary problem with having methods named getActiveAccount(), getActiveAccounts(), and getActiveAccountInfo() in the same codebase?",
      options: [
        "Lack of meaningful distinction: noise words like 'Info' fail to inform developers which method to call.",
        "Method names should strictly be nouns and must never start with verbs.",
        "The names fail to use Hungarian notation to indicate return types.",
        "Methods should have single-letter names to save space."
      ],
      explanation: "Words like 'Info', 'Data', and 'Object' are indistinguishable noise. Without reading the implementation or comments, other developers cannot know the difference."
    },
    es: {
      question: "¿Cuál es el problema principal de tener métodos llamados getActiveAccount(), getActiveAccounts() y getActiveAccountInfo() en la misma base de código?",
      options: [
        "Falta de distinción significativa: palabras de ruido como 'Info' no indican qué método invocar.",
        "Los nombres de métodos deberían ser sustantivos y no verbos.",
        "No utilizan notación húngara para indicar el tipo de retorno.",
        "Deberían tener nombres de una letra para ahorrar espacio."
      ],
      explanation: "Términos como 'Info', 'Data' u 'Object' son ruido indistinto que confunde a los desarrolladores sobre cuál método utilizar."
    },
    it: {
      question: "Qual è il problema principale di avere metodi chiamati getActiveAccount(), getActiveAccounts() e getActiveAccountInfo() nella stessa base di codice?",
      options: [
        "Mancanza di distinzione significativa: parole rumorose come 'Info' non aiutano a capire quale metodo invocare.",
        "I nomi dei metodi dovrebbero essere solo sostantivi e non iniziare con verbi.",
        "Non usano la notazione ungherese per indicare il tipo di ritorno.",
        "I metodi dovrebbero avere nomi a una lettera per risparmiare spazio."
      ],
      explanation: "Parole vaghe come 'Info' o 'Data' non forniscono alcuna distinzione utile costringendo a ispezionare l'implementazione."
    },
    fr: {
      question: "Quel est le problème majeur lorsque des méthodes sont nommées getActiveAccount(), getActiveAccounts() et getActiveAccountInfo() dans le même projet ?",
      options: [
        "Absence de distinction significative : les mots parasites comme 'Info' ne permettent pas de savoir quelle méthode appeler.",
        "Les méthodes devraient impérativement être des noms et non des verbes.",
        "Elles n'utilisent pas la notation hongroise pour préciser le type retourné.",
        "Les noms de méthodes devraient être réduits à une seule lettre."
      ],
      explanation: "Les mots tels que 'Info', 'Data' ou 'Object' constituent un bruit inutile qui brouille la compréhension du rôle de la méthode."
    }
  }
};

/**
 * Retorna o objeto de questão traduzido para o idioma ativo
 */
export function getQuizTranslation(rawQuestion, lang = "pt") {
  if (!rawQuestion || lang === "pt") return rawQuestion;

  const tq = quizzesI18n[rawQuestion.id]?.[lang];
  if (!tq) return rawQuestion;

  return {
    ...rawQuestion,
    question: tq.question || rawQuestion.question,
    options: rawQuestion.options.map((opt, idx) => ({
      ...opt,
      text: tq.options?.[idx] || opt.text
    })),
    explanation: tq.explanation || rawQuestion.explanation
  };
}

