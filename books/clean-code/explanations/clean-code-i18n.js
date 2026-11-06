/**
 * Dicionário Multilíngue para os 17 Capítulos de Código Limpo (Clean Code).
 * Fornece traduções completas para EN, ES, IT e FR.
 */

export const cleanCodeI18n = {
  "cap-1": {
    en: {
      name: "Clean Code",
      localName: "Clean Code",
      subtitle: "The cost of bad code, professional attitude and the Boy Scout Rule",
      intent: "Demonstrate that the only way to write code fast and meet deadlines sustainably is to keep the code clean at all times.",
      problem: "When teams rush without quality, every release adds friction (wading). Soon velocity asymptotes toward zero and management demands a risky redesign from scratch.",
      solution: "Adopt the Boy Scout Rule: always leave the campground cleaner than you found it. Treat code craftsmanship as professional hygiene.",
      pros: ["Sustainable team velocity across years.", "Minimal regression risks during change.", "Zero need for traumatic legacy rewrites."],
      cons: ["Requires disciplined team agreement on standards (Shutsuke)."]
    },
    es: {
      name: "Código Limpio",
      localName: "Código Limpio",
      subtitle: "El costo del código malo, la actitud profesional y la Regla del Boy Scout",
      intent: "Demostrar que la única forma de avanzar rápido y cumplir plazos de forma sostenible es mantener el código limpio en todo momento.",
      problem: "Cuando los equipos se apresuran sin cuidar la calidad, cada nueva entrega agrega fricción (wading). La velocidad cae a cero y se desencadena un rediseño traumático.",
      solution: "Aplicar la Regla del Boy Scout: deja el campamento más limpio de como lo encontraste. El código limpio es una actitud profesional innegociable.",
      pros: ["Velocidad de entrega constante y predecible.", "Mínimo riesgo de regresiones ocultas.", "Elimina la necesidad de rehacer sistemas desde cero."],
      cons: ["Exige disciplina constante y consenso de equipo."]
    },
    it: {
      name: "Codice Pulito",
      localName: "Codice Pulito",
      subtitle: "Il costo del codice cattivo, l'atteggiamento professionale e la Regola del Boy Scout",
      intent: "Dimostrare che l'unico modo per andare veloci e rispettare le scadenze in modo sostenibile è mantenere il codice pulito costantemente.",
      problem: "Quando i team si affrettano trascurando la qualità, ogni rilascio aggiunge attrito (wading). La velocità precipita verso lo zero costringendo a riscritture da zero.",
      solution: "Adottare la Regla del Boy Scout: lascia il campo sempre più pulito di come lo hai trovato. Considera la pulizia del codice come igiene professionale.",
      pros: ["Velocità costante e sostenibile nel tempo.", "Minimo rischio di regressioni durante le modifiche.", "Elimina la necessità di riscritture catastrofiche."],
      cons: ["Richiede disciplina quotidiana e allineamento di squadra."]
    },
    fr: {
      name: "Code Propre",
      localName: "Code Propre",
      subtitle: "Le coût du mauvais code, l'attitude professionnelle et la Règle du Boy-Scout",
      intent: "Démontrer que le seul moyen de développer rapidement et durablement est de conserver un code propre en permanence.",
      problem: "Lorsque les équipes négligent la qualité pour aller vite, chaque livraison engendre un enlisement (wading). La vélocité chute à zéro et mène à des refontes risquées.",
      solution: "Appliquer la Règle du Boy-Scout : laissez toujours le campement plus propre que vous ne l'avez trouvé.",
      pros: ["Vélocité d'équipe pérenne sur le long terme.", "Risques d'anomalies minimisés lors des changements.", "Évite les refontes intégrales traumatisantes."],
      cons: ["Nécessite une discipline quotidienne partagée par l'équipe."]
    }
  },
  "cap-2": {
    en: {
      name: "Meaningful Names",
      localName: "Meaningful Names",
      subtitle: "Intention-revealing identifiers, avoiding noise words and meaningful distinctions",
      intent: "Use names that reveal intent, avoid encodings and make code read like well-crafted prose.",
      problem: "Vague single-letter variables ('d', 't', 'o') and noise words ('Info', 'Data', 'Object') force developers to waste hours deciphering context.",
      solution: "Name classes as nouns, functions as verbs, use pronounceable and searchable terms, and eliminate Hungarian notation prefixes.",
      pros: ["Immediate clarity of purpose without reading method internals.", "Fast full-text searchability in IDEs."],
      cons: ["Requires cognitive effort during initial naming."]
    },
    es: {
      name: "Nombres Significativos",
      localName: "Nombres Significativos",
      subtitle: "Nombres que revelan la intención, evitando palabras de ruido y distinciones arbitrarias",
      intent: "Elegir nombres que expresen el propósito exacto, eviten desinformación y faciliten la búsqueda.",
      problem: "Variables crípticas de una letra y sufijos vacíos como 'Data' o 'Info' obligan a los desarrolladores a descifrar la intención una y otra vez.",
      solution: "Nombrar clases con sustantivos y métodos con verbos; eliminar la notación húngara y preferir nombres pronunciables y buscables.",
      pros: ["Comprensión inmediata sin inspeccionar la implementación interna.", "Búsquedas ágiles en toda la base de código."],
      cons: ["Exige reflexión inicial para encontrar el término de dominio preciso."]
    },
    it: {
      name: "Nomi Significativi",
      localName: "Nomi Significativi",
      subtitle: "Identificatori che rivelano l'intenzione ed eliminazione di parole rumorose",
      intent: "Utilizzare nomi che rivelino l'intento, evitino disinformazione e rendano il codice simile a prosa chiara.",
      problem: "Variabili oscure a lettera singola e parole vuote come 'Info' o 'Data' costringono a continue perdite di tempo.",
      solution: "Scegliere sostantivi per le classi e verbi per i metodi, evitando prefissi obsoleti come la notazione ungherese.",
      pros: ["Chiarezza immediata al primo sguardo.", "Facilità di ricerca globale nell'ambiente di sviluppo."],
      cons: ["Richiede attenzione e cura costante durante il refactoring."]
    },
    fr: {
      name: "Noms Révélateurs",
      localName: "Noms Révélateurs",
      subtitle: "Identifiants explicites, élimination du bruit et distinctions significatives",
      intent: "Choisir des noms qui expriment clairement l'intention et transforment le code en prose fluide.",
      problem: "Des identifiants d'une seule lettre ou des mots parasites obligent à décortiquer le code pour en comprendre l'usage.",
      solution: "Employer des noms substantifs pour les classes, des verbes pour les méthodes, et bannir la notation hongroise.",
      pros: ["Compréhension immédiate de la logique métier.", "Recherche textuelle grandement facilitée."],
      cons: ["Exige un effort de réflexion initial sur le vocabulaire métier."]
    }
  },
  "cap-3": {
    en: {
      name: "Functions",
      localName: "Functions",
      subtitle: "Small size, doing one thing, stepdown rule, command-query separation and zero flag arguments",
      intent: "Design small, focused functions with one level of abstraction that do only one thing well.",
      problem: "Monolithic methods with nested blocks, boolean flags and mixed abstraction levels create unmaintainable code.",
      solution: "Shrink functions to fewer than 20 lines, extract try/catch blocks, obey Command-Query Separation and eliminate flag arguments.",
      pros: ["Effortless unit testing with minimal mocks.", "Self-documenting method call chains."],
      cons: ["Increases the count of private helper methods."]
    },
    es: {
      name: "Funciones",
      localName: "Funciones",
      subtitle: "Pequeñas, que hagan una sola cosa, regla decreciente y separación comando-consulta",
      intent: "Escribir funciones reducidas que hagan una única tarea y operen en un solo nivel de abstracción.",
      problem: "Métodos extensos con bifurcaciones anidadas, argumentos booleanos y responsabilidades mezcladas.",
      solution: "Reducir el tamaño a menos de 20 líneas, respetar la regla decreciente y separar comandos de consultas (CQS).",
      pros: ["Pruebas unitarias directas y sin mocks complejos.", "Lectura secuencial intuitiva."],
      cons: ["Mayor cantidad de métodos auxiliares privados."]
    },
    it: {
      name: "Funzioni",
      localName: "Funzioni",
      subtitle: "Piccole, che facciano una sola cosa, regola a cascata e separazione comando-query",
      intent: "Progettare funzioni snelle con un solo livello di astrazione che svolgano una sola operazione impeccabilmente.",
      problem: "Metodi chilometrici con blocchi annidati e flag booleani generano codice opaco e incline a bug.",
      solution: "Limitare le funzioni a poche righe, applicare la Command-Query Separation ed eliminare argomenti di controllo booleani.",
      pros: ["Testabilità unitaria immediata.", "Flusso di lettura chiaro e lineare."],
      cons: ["Incremento nel numero di metodi privati di supporto."]
    },
    fr: {
      name: "Fonctions",
      localName: "Fonctions",
      subtitle: "Petites, focalisées, règle du pas à pas et séparation commande-requête (CQS)",
      intent: "Concevoir des fonctions courtes respectant un niveau d'abstraction unique et une seule responsabilité.",
      problem: "Les méthodes volumineuses avec des arguments booléens et des boucles imbriquées sont difficiles à tester et à maintenir.",
      solution: "Raccourcir les fonctions à moins de 20 lignes, isoler les blocs try/catch et séparer commandes et requêtes.",
      pros: ["Tests unitaires simples et indépendants.", "Chaînes d'appels lisibles de haut en bas."],
      cons: ["Multiplication du nombre de méthodes privées utilitaires."]
    }
  },
  "cap-4": {
    en: {
      name: "Comments",
      localName: "Comments",
      subtitle: "Comments don't make up for bad code: express intent through code",
      intent: "Express intent directly through expressive code rather than redundant or misleading comments.",
      problem: "Comments rot over time, lie after changes, and are frequently used to excuse obscure code.",
      solution: "Refactor obscure logic into self-explanatory functions and retain comments only for legal, warning or regex intent.",
      pros: ["Eliminates comment obsolescence.", "Forces code to be self-documenting."],
      cons: ["Requires team discipline to delete outdated commentary."]
    },
    es: {
      name: "Comentarios",
      localName: "Comentarios",
      subtitle: "Los comentarios no compensan el código malo: expresa la intención en el código",
      intent: "Explicar la intención directamente a través del código y limitar los comentarios a advertencias indispensables.",
      problem: "Los comentarios envejecen mal, se desincronizan y a menudo intentan maquillar código deficiente.",
      solution: "Reemplazar comentarios con nombres de funciones expresivos y eliminar código comentado.",
      pros: ["Código autoexplicativo sin mantenimiento redundante.", "Elimina el ruido visual."],
      cons: ["Requiere disciplina para borrar comentarios obsoletos."]
    },
    it: {
      name: "Commenti",
      localName: "Commenti",
      subtitle: "I commenti non compensano il cattivo codice: esprimi l'intento nel codice",
      intent: "Esprimere la logica direttamente nel codice anziché affidarsi a commenti che tendono a mentire.",
      problem: "I commenti diventano obsoleti con le modifiche e spesso mascherano codice caotico.",
      solution: "Rifattorizzare il codice affinché parli da solo ed eliminare commenti ridondanti o codice commentato.",
      pros: ["Codice pulito e auto-esplicativo.", "Nessun disallineamento tra commento e implementazione."],
      cons: ["Necessita di rigore nell'eliminare spiegazioni inutili."]
    },
    fr: {
      name: "Commentaires",
      localName: "Commentaires",
      subtitle: "Les commentaires ne compensent pas le mauvais code : exprimez-vous dans le code",
      intent: "Exprimer clairement les intentions via la structure du code plutôt que par des commentaires périssables.",
      problem: "Les commentaires mentent avec le temps et servent trop souvent d'excuse à un code mal conçu.",
      solution: "Remplacer les commentaires par des fonctions bien nommées et nettoyer les annotations obsolètes.",
      pros: ["Code auto-documenté et toujours à jour.", "Suppression du bruit superflu."],
      cons: ["Exige d'abandonner l'habitude de commenter chaque ligne."]
    }
  },
  "cap-5": {
    en: {
      name: "Formatting",
      localName: "Formatting",
      subtitle: "Vertical density, newspaper metaphor, openness and horizontal alignment rules",
      intent: "Establish clear visual structure that guides reader attention and reflects module hierarchy.",
      problem: "Inconsistent indentation and crowded code files hinder readability and cause unnecessary git merge conflicts.",
      solution: "Organize files like newspaper articles (headlines first, details below), keep lines under 120 characters, and automate formatting.",
      pros: ["Effortless scanning across projects.", "Clean git diffs without formatting noise."],
      cons: ["Requires automated CI formatter enforcement."]
    },
    es: {
      name: "Formateo",
      localName: "Formateo",
      subtitle: "Densidad vertical, metáfora del periódico, apertura y reglas de alineación",
      intent: "Estructurar visualmente los archivos para guiar la lectura y reflejar la jerarquía conceptual.",
      problem: "Estilos inconsistentes e identación desordenada cansan la vista y generan conflictos en el control de versiones.",
      solution: "Ordenar los archivos como artículos periodísticos (lo general arriba, los detalles abajo) y automatizar el formato.",
      pros: ["Lectura fluida y consistente en todo el equipo.", "Diffs limpios sin discusiones de estilo."],
      cons: ["Requiere configurar linters automáticos en el pipeline de CI."]
    },
    it: {
      name: "Formattazione",
      localName: "Formattazione",
      subtitle: "Densità verticale, metafora del giornale e allineamento orizzontale",
      intent: "Garantire una struttura visiva coerente che guidi l'attenzione del lettore.",
      problem: "Stili eterogenei e spaziatura disordinata rallentano la comprensione e causano conflitti in git.",
      solution: "Organizzare i moduli come articoli di giornale e delegare la formattazione a strumenti automatici.",
      pros: ["Esperienza di lettura omogenea e piacevole.", "Controllo di versione pulito e focalizzato sulla logica."],
      cons: ["Necessita di configurare formattatori automatici nel team."]
    },
    fr: {
      name: "Formatage",
      localName: "Formatage",
      subtitle: "Densité verticale, métaphore du journal et alignement horizontal",
      intent: "Offrir une structure visuelle claire qui hiérarchise les concepts et guide le lecteur.",
      problem: "Le manque d'homogénéité dans l'indentation et l'aération alourdit la lecture et multiplie les conflits git.",
      solution: "Structurer les fichiers comme un journal (titres majeurs d'abord, détails ensuite) et automatiser le formatage.",
      pros: ["Lecture fluide et harmonieuse.", "Diffs git débarrassés de tout bruit cosmétique."],
      cons: ["Exige l'adoption d'un formateur automatisé en continu."]
    }
  },
  "cap-6": {
    en: {
      name: "Objects and Data Structures",
      localName: "Objects and Data Structures",
      subtitle: "Data abstraction, object-data asymmetry and the Law of Demeter",
      intent: "Distinguish between objects (expose behavior, hide data) and data structures (expose data, no behavior).",
      problem: "Hybrid classes that expose getters/setters while performing complex business logic break encapsulation.",
      solution: "Follow the Law of Demeter: talk only to your immediate friends, never method-chain across boundaries.",
      pros: ["Strong encapsulation and easy substitution of implementations.", "Clean architectural boundaries."],
      cons: ["Requires conscious architectural separation between DTOs and domain entities."]
    },
    es: {
      name: "Objetos y Estructuras de Datos",
      localName: "Objetos y Estructuras de Datos",
      subtitle: "Abstracción de datos, asimetría objeto-estructura y la Ley de Demeter",
      intent: "Diferenciar con claridad objetos que ocultan datos y exponen comportamiento de estructuras de datos pasivas.",
      problem: "Clases híbridas con getters/setters que rompen el encapsulamiento exponiendo estructuras internas.",
      solution: "Aplicar la Ley de Demeter: un objeto solo debe comunicarse con sus colaboradores directos y no encadenar llamadas.",
      pros: ["Alto encapsulamiento y modularidad.", "Facilita la evolución de las representaciones internas."],
      cons: ["Exige distinguir explícitamente DTOs de entidades de dominio."]
    },
    it: {
      name: "Oggetti e Strutture Dati",
      localName: "Oggetti e Strutture Dati",
      subtitle: "Astrazione dei dati, asimmetria e la Legge di Demetra",
      intent: "Distinguere rigorosamente tra oggetti (nascondono i dati, espongono comportamenti) e strutture dati pure.",
      problem: "Ibridi mal progettati che espongono getter/setter mentre eseguono logica di business violano l'incapsulamento.",
      solution: "Rispettare la Legge di Demetra evitando catene di chiamate come 'a.getB().getC().doAction()'.",
      pros: ["Incapsulamento solido e codice robusto.", "Indipendenza dalla rappresentazione interna dei dati."],
      cons: ["Richiede separazione deliberata tra modelli anemici e oggetti di dominio."]
    },
    fr: {
      name: "Objets et Structures de Données",
      localName: "Objets et Structures de Données",
      subtitle: "Abstraction des données, asymétrie et Loi de Déméter",
      intent: "Distinguer clairement les objets (masquent les données, exposent un comportement) des structures de données passives.",
      problem: "Les classes hybrides qui exposent des accesseurs tout en traitant de la logique métier brisent l'encapsulation.",
      solution: "Appliquer la Loi de Déméter : ne parlez qu'à vos amis immédiats et bannissez les chaînes d'appels profondes.",
      pros: ["Encapsulation rigoureuse et flexibilité des implémentations.", "Frontières logicielles nettes."],
      cons: ["Impose de distinguer rigoureusement les DTO des entités riches."]
    }
  },
  "cap-7": {
    en: {
      name: "Error Handling",
      localName: "Error Handling",
      subtitle: "Use exceptions rather than return codes, Special Case pattern and never return null",
      intent: "Keep error handling separate from clean business logic using exceptions and null objects.",
      problem: "Scattered null checks and return error codes clutter core business logic with defensive clutter.",
      solution: "Throw unchecked exceptions, wrap third-party APIs, and use the Special Case / Null Object pattern.",
      pros: ["Uncluttered business logic readable without distraction.", "Zero NullPointerExceptions at runtime."],
      cons: ["Requires disciplined definition of domain-specific exception hierarchies."]
    },
    es: {
      name: "Manejo de Errores",
      localName: "Manejo de Errores",
      subtitle: "Uso de excepciones en vez de códigos de retorno, patrón Special Case y nunca devolver null",
      intent: "Aislar el manejo de fallos para que la lógica de negocio principal permanezca limpia y legible.",
      problem: "Verificaciones defensivas constantes de null y códigos de error ensucian el código con ruido superfluo.",
      solution: "Lanzar excepciones, envolver librerías de terceros y adoptar objetos de caso especial (Null Object).",
      pros: ["Lógica de negocio clara y libre de ruido defensivo.", "Eliminación casi total de NullPointerExceptions."],
      cons: ["Requiere diseñar jerarquías de excepciones contextuales."]
    },
    it: {
      name: "Gestione degli Errori",
      localName: "Gestione degli Errori",
      subtitle: "Usare eccezioni invece di codici di ritorno, pattern Special Case e non restituire mai null",
      intent: "Separare la gestione delle anomalie dal flusso principale di business per preservare la chiarezza del codice.",
      problem: "Controlli null ripetuti ovunque e codici di ritorno numerici rendono il codice confuso e fragile.",
      solution: "Lanciare eccezioni specifiche, isolare API esterne e restituire collezioni vuote o Null Object al posto di null.",
      pros: ["Flusso di business lineare e leggibile.", "Prevenzione sistematica dei crash da puntatore nullo."],
      cons: ["Necessita di progettare eccezioni di dominio ben definite."]
    },
    fr: {
      name: "Gestion des Erreurs",
      localName: "Gestion des Erreurs",
      subtitle: "Privilégier les exceptions aux codes de retour, patron Special Case et bannir null",
      intent: "Isoler le traitement des erreurs afin que la logique métier demeure lisible et épurée.",
      problem: "Les vérifications permanentes de null et les codes d'erreur masquent la véritable intention métier.",
      solution: "Lever des exceptions non contrôlées, encapsuler les API tierces et utiliser des objets nuls (Null Object).",
      pros: ["Logique métier débarrassée du bruit défensif.", "Éradication des erreurs de pointeur nul en production."],
      cons: ["Exige de structurer proprement les exceptions métier."]
    }
  },
  "cap-8": {
    en: {
      name: "Boundaries",
      localName: "Boundaries",
      subtitle: "Encapsulating third-party libraries, learning tests and adapting foreign interfaces",
      intent: "Insulate application core code from unpredictable third-party API changes via clean boundary adapters.",
      problem: "Direct dependencies on external library types propagate vendor breaking changes across the codebase.",
      solution: "Wrap foreign APIs behind domain adapters and write automated learning tests to verify library behavior.",
      pros: ["Immunity against breaking library upgrades.", "Ease of replacing vendors by swapping adapters."],
      cons: ["Adds an initial wrapper layer."]
    },
    es: {
      name: "Límites (Boundaries)",
      localName: "Límites (Boundaries)",
      subtitle: "Encapsulamiento de librerías de terceros, pruebas de aprendizaje y adaptación de interfaces",
      intent: "Proteger el núcleo de la aplicación de cambios en dependencias externas mediante adaptadores limpios.",
      problem: "El acoplamiento directo a APIs de terceros hace que cualquier actualización rompa partes del sistema.",
      solution: "Encapsular APIs externas detrás de interfaces propias y escribir pruebas de aprendizaje para verificar su comportamiento.",
      pros: ["Inmunidad ante cambios de proveedores o versiones.", "Facilidad para sustituir dependencias externas."],
      cons: ["Capa inicial de envoltura."]
    },
    it: {
      name: "Confini (Boundaries)",
      localName: "Confini (Boundaries)",
      subtitle: "Incapsulamento di librerie esterne, test di apprendimento e adattamento delle interfacce",
      intent: "Isolare il core applicativo dalle dipendenze di terze parti mediante adattatori dedicati.",
      problem: "Dipendenze dirette da SDK esterni propagano modifiche incompatibili nell'intero sistema.",
      solution: "Incapsulare le chiamate esterne in adapter e convalidare le librerie con test di apprendimento mirati.",
      pros: ["Protezione completa dagli aggiornamenti delle librerie.", "Semplicità nel sostituire i componenti esterni."],
      cons: ["Richiede un livello di astrazione iniziale aggiuntivo."]
    },
    fr: {
      name: "Frontières (Boundaries)",
      localName: "Frontières (Boundaries)",
      subtitle: "Encapsulation des bibliothèques tierces, tests d'apprentissage et adaptateurs",
      intent: "Protéger le cœur applicatif des évolutions imprévisibles des bibliothèques externes grâce à des adaptateurs.",
      problem: "Le couplage direct aux SDK tiers rend l'application dépendante des décisions des éditeurs externes.",
      solution: "Envelopper les API tierces derrière des interfaces métier et écrire des tests d'apprentissage automatisés.",
      pros: ["Résilience face aux montées de version externes.", "Remplacement aisé des bibliothèques tierces."],
      cons: ["Création d'une couche d'encapsulation dédiée."]
    }
  },
  "cap-9": {
    en: {
      name: "Unit Tests",
      localName: "Unit Tests",
      subtitle: "The Three Laws of TDD, clean test code, F.I.R.S.T. rules and single assert per concept",
      intent: "Maintain unit tests with the same rigor and cleanliness as production code to preserve fearless refactoring.",
      problem: "Dirty, brittle tests become a burden to maintain and eventually get abandoned, destroying the safety net.",
      solution: "Follow TDD rules, ensure readability through Build-Operate-Check, and uphold F.I.R.S.T. principles.",
      pros: ["Fearless refactoring without regression anxiety.", "Living documentation of system behavior."],
      cons: ["Requires disciplined time investment in test maintenance."]
    },
    es: {
      name: "Pruebas Unitarias",
      localName: "Pruebas Unitarias",
      subtitle: "Las tres leyes de TDD, pruebas limpias, reglas F.I.R.S.T. y un aserto por concepto",
      intent: "Tratar el código de pruebas con la misma calidad que el de producción para mantener una red de seguridad sólida.",
      problem: "Pruebas frágiles y desordenadas se convierten en un obstáculo y terminan desactivándose.",
      solution: "Aplicar las tres leyes de TDD, el patrón Build-Operate-Check y las reglas F.I.R.S.T.",
      pros: ["Confianza total al refactorizar.", "Documentación viva y ejecutable de la aplicación."],
      cons: ["Exige tiempo dedicado a la calidad de los tests."]
    },
    it: {
      name: "Test Unitari",
      localName: "Test Unitari",
      subtitle: "Le tre leggi del TDD, codice di test pulito, principi F.I.R.S.T. e un assert per concetto",
      intent: "Scrivere test unitari puliti e manutenibili con la stessa cura dedicata al codice di produzione.",
      problem: "Test fragili e disordinati rallentano le modifiche e finiscono per essere ignorati.",
      solution: "Rispettare le leggi del TDD e i principi F.I.R.S.T. (Fast, Independent, Repeatable, Self-Validating, Timely).",
      pros: ["Rifattorizzazione sicura e priva di timori.", "Documentazione sempre aggiornata ed eseguibile."],
      cons: ["Richiede disciplina nel mantenere i test snelli ed espressivi."]
    },
    fr: {
      name: "Tests Unitaires",
      localName: "Tests Unitaires",
      subtitle: "Les trois lois du TDD, tests propres, principes F.I.R.S.T. et une assertion par concept",
      intent: "Maintenir les tests avec le même niveau d'exigence que le code de production pour sécuriser les refactorisations.",
      problem: "Des tests fragiles et mal conçus deviennent un fardeau et finissent par être désactivés.",
      solution: "Appliquer le TDD, la structure Build-Operate-Check et respecter scrupuleusement les critères F.I.R.S.T.",
      pros: ["Refactorisation sereine sans crainte de régressions.", "Documentation vivante et vérifiable."],
      cons: ["Nécessite un investissement continu dans la maintenance des tests."]
    }
  },
  "cap-10": {
    en: {
      name: "Classes",
      localName: "Classes",
      subtitle: "Class organization, Single Responsibility Principle, cohesion and isolating changes",
      intent: "Keep classes small, highly cohesive and adhering to the Single Responsibility Principle (SRP).",
      problem: "God classes that accumulate hundreds of methods become impossible to understand and dangerous to modify.",
      solution: "Measure class size by responsibilities, organize methods in stepdown order, and separate variations behind interfaces.",
      pros: ["High maintainability with isolated change impact.", "Maximum reusability of modular components."],
      cons: ["Increases the overall number of fine-grained classes."]
    },
    es: {
      name: "Clases",
      localName: "Clases",
      subtitle: "Organización de clases, Principio de Responsabilidad Única (SRP), cohesión y aislamiento del cambio",
      intent: "Diseñar clases pequeñas con alta cohesión y una única responsabilidad bien definida.",
      problem: "Clases monstruosas con cientos de líneas y múltiples responsabilidades son difíciles de mantener.",
      solution: "Medir el tamaño por responsabilidades (SRP) y aislar cambios variables detrás de interfaces.",
      pros: ["Cambios aislados sin efectos colaterales.", "Componentes modulares y reutilizables."],
      cons: ["Mayor cantidad de archivos y clases pequeñas."]
    },
    it: {
      name: "Classi",
      localName: "Classi",
      subtitle: "Organizzazione delle classi, Principio di Singola Responsabilità (SRP) e coesione",
      intent: "Mantenere le classi compatte, altamente coese e focalizzate su un'unica responsabilità.",
      problem: "Classi monolitiche con troppe competenze creano accoppiamento elevato e fragilità.",
      solution: "Applicare il principio SRP, ordinare le funzioni dall'alto verso il basso e proteggere dalle modifiche con interfacce.",
      pros: ["Manutenibilità elevata con impatti localizzati.", "Riusabilità ottimale dei singoli moduli."],
      cons: ["Aumento del numero di file e classi specializzate."]
    },
    fr: {
      name: "Classes",
      localName: "Classes",
      subtitle: "Organisation des classes, Principe de Responsabilité Unique (SRP) et cohésion",
      intent: "Concevoir des classes courtes, fortement cohésives et respectant le principe de responsabilité unique (SRP).",
      problem: "Les classes volumineuses accumulant des dizaines de méthodes sont difficiles à comprendre et à faire évoluer.",
      solution: "Mesurer la taille des classes au nombre de responsabilités et isoler les variations derrière des interfaces.",
      pros: ["Maintenance facilitée avec un impact de modification circonscrit.", "Réutilisabilité optimale."],
      cons: ["Multiplie le nombre de classes granulaires."]
    }
  },
  "cap-11": {
    en: {
      name: "Systems",
      localName: "Systems",
      subtitle: "Separating construction from use, dependency injection, scaling and AOP",
      intent: "Separate system construction from business use to allow systems to evolve incrementally without architectural paralysis.",
      problem: "Hardcoding object instantiation within business classes prevents clean modularity and clean scaling.",
      solution: "Use dependency injection, abstract factories and cross-cutting concerns (AOP/Proxies) to decouple setup from execution.",
      pros: ["Incremental architecture that grows without massive upfront design.", "Effortless test doubles injection."],
      cons: ["Requires learning inversion-of-control frameworks."]
    },
    es: {
      name: "Sistemas",
      localName: "Sistemas",
      subtitle: "Separación de construcción y uso, inyección de dependencias, escalabilidad y AOP",
      intent: "Separar la inicialización del sistema de su ejecución de negocio para permitir evolución incremental.",
      problem: "Instanciar dependencias directamente dentro de la lógica de dominio genera acoplamiento rígido.",
      solution: "Utilizar inyección de dependencias (DI) y separar aspectos transversales con proxies o decoradores.",
      pros: ["Arquitectura evolutiva que escala de forma orgánica.", "Facilidad total para inyectar mocks en pruebas."],
      cons: ["Curva de aprendizaje de contenedores IoC."]
    },
    it: {
      name: "Sistemi",
      localName: "Sistemi",
      subtitle: "Separare la costruzione dall'uso, dependency injection e architettura modulare",
      intent: "Separare la fase di avvio e composizione del sistema dalla sua esecuzione ordinaria.",
      problem: "Creare istanze concrete all'interno del codice di dominio ostacola la modularità e i test.",
      solution: "Adottare l'inversione del controllo (IoC) e la dependency injection per assemblare i moduli all'avvio.",
      pros: ["Architettura scalabile che evolve senza grandi pianificazioni monolitiche.", "Sostituzione immediata dei moduli nei test."],
      cons: ["Richiede comprensione dei pattern di inversione del controllo."]
    },
    fr: {
      name: "Systèmes",
      localName: "Systèmes",
      subtitle: "Séparation de la construction et de l'usage, injection de dépendances et modularité",
      intent: "Séparer l'initialisation du système de son exécution métier pour permettre une évolution incrémentale.",
      problem: "Instancier directement les composants dans la logique métier rend l'architecture rigide et peu testable.",
      solution: "Recourir à l'injection de dépendances (DI) et isoler les préoccupations transversales.",
      pros: ["Architecture évolutive capable de grandir avec le projet.", "Facilité d'injection de doublures de test."],
      cons: ["Nécessite la maîtrise des conteneurs IoC."]
    }
  },
  "cap-12": {
    en: {
      name: "Emergence",
      localName: "Emergence",
      subtitle: "Kent Beck's 4 Rules of Simple Design: runs all tests, no duplication, express intent, minimize elements",
      intent: "Achieve clean emergent architecture by applying Kent Beck's Four Rules of Simple Design in strict priority order.",
      problem: "Over-engineering with speculative design patterns creates premature complexity before requirements emerge.",
      solution: "Prioritize: 1. Runs all tests, 2. Contains no duplication, 3. Expresses programmer intent, 4. Minimizes elements.",
      pros: ["Guaranteed correctness backed by tests.", "Eliminates speculative bloat and duplicate code."],
      cons: ["Requires continuous refactoring vigilance."]
    },
    es: {
      name: "Emergencia (Simple Design)",
      localName: "Emergencia (Simple Design)",
      subtitle: "Las 4 reglas de diseño simple de Kent Beck: pasa los tests, sin duplicación, expresivo y mínimo",
      intent: "Construir sistemas simples y elegantes mediante las cuatro reglas de diseño simple de Kent Beck.",
      problem: "El sobre-diseño con patrones especulativos introduce complejidad innecesaria antes de tiempo.",
      solution: "Seguir en orden: 1. Pasa todas las pruebas, 2. No tiene duplicación, 3. Expresa la intención, 4. Minimiza elementos.",
      pros: ["Garantía de funcionamiento respaldada por pruebas.", "Evita la complejidad accidental."],
      cons: ["Demanda refactorización continua."]
    },
    it: {
      name: "Emergenza (Design Semplice)",
      localName: "Emergenza (Design Semplice)",
      subtitle: "Le 4 regole del Simple Design di Kent Beck: esegue tutti i test, nessuna duplicazione, espressivo e minimale",
      intent: "Ottenere un'architettura pulita e naturale applicando le quattro regole di Kent Beck.",
      problem: "Sovra-ingegnerizzare con astrazioni premature appesantisce il codice senza portare valore reale.",
      solution: "Rispettare le priorità: 1. Esegue tutti i test, 2. Nessuna duplicazione, 3. Esprime l'intento, 4. Minimizza elementi.",
      pros: ["Correttezza garantita dalla suite di test.", "Assenza di codice duplicato e complessità ingiustificata."],
      cons: ["Richiede attenzione costante al refactoring."]
    },
    fr: {
      name: "Émergence (Conception Simple)",
      localName: "Émergence (Conception Simple)",
      subtitle: "Les 4 règles de conception simple de Kent Beck : exécuter les tests, sans duplication, expressif et minimal",
      intent: "Faire émerger une architecture élégante en appliquant les quatre règles de conception simple de Kent Beck.",
      problem: "La sur-ingénierie prématurée introduit une complexité accidentelle superflue.",
      solution: "Prioriser : 1. Exécute tous les tests, 2. Élimine la duplication, 3. Exprime l'intention, 4. Réduit le nombre d'éléments.",
      pros: ["Garantie d'exactitude vérifiée par les tests.", "Suppression du code mort et des doublons."],
      cons: ["Exige un effort soutenu de simplification continue."]
    }
  },
  "cap-13": {
    en: {
      name: "Concurrency",
      localName: "Concurrency",
      subtitle: "Concurrency defense principles, thread-safety, isolating synchronization and avoiding race conditions",
      intent: "Isolate concurrent execution code from pure business logic to prevent deadlocks and race conditions.",
      problem: "Uncoordinated multi-threaded access to mutable shared state causes elusive, non-reproducible production bugs.",
      solution: "Keep concurrency code isolated, limit data scope to immutable values, and use non-blocking concurrency libraries.",
      pros: ["High throughput with deterministic stability.", "Race conditions eliminated by design."],
      cons: ["Deep understanding of memory models required."]
    },
    es: {
      name: "Concurrencia",
      localName: "Concurrencia",
      subtitle: "Principios de defensa en concurrencia, seguridad entre hilos y aislamiento de sincronización",
      intent: "Separar estrictamente el código de sincronización concurrente de la lógica de negocio pura.",
      problem: "Acceder a estados mutables compartidos desde múltiples hilos provoca fallos aleatorios y bloqueos mutuos.",
      solution: "Aislar la concurrencia, minimizar el estado compartido, preferir inmutabilidad y usar primitivas seguras.",
      pros: ["Alto rendimiento y estabilidad del sistema.", "Prevención de condiciones de carrera."],
      cons: ["Exige dominar modelos de memoria y concurrencia."]
    },
    it: {
      name: "Concorrenza",
      localName: "Concorrenza",
      subtitle: "Principi di difesa nella concorrenza, thread-safety e isolamento della sincronizzazione",
      intent: "Isolare il codice di gestione dei thread dalla logica di business principale per evitare stalli e corruzioni.",
      problem: "Stati mutabili condivisi tra più thread producono difetti imprevedibili e difficili da diagnosticare.",
      solution: "Limitare la condivisione dei dati, favorire l'immutabilità e utilizzare librerie di concorrenza collaudate.",
      pros: ["Resilienza e throughput elevato.", "Eliminazione alla radice delle race condition."],
      cons: ["Richiede padronanza della gestione della memoria multithread."]
    },
    fr: {
      name: "Concurrence",
      localName: "Concurrence",
      subtitle: "Principes de défense concurrentielle, sécurité des threads et isolation des verrous",
      intent: "Séparer le code de synchronisation multithread de la logique métier pour prévenir les blocages et corruptions.",
      problem: "Le partage d'état mutable entre threads engendre des anomalies aléatoires quasi impossibles à reproduire.",
      solution: "Isoler la concurrence, privilégier l'immuabilité et employer des collections concurrentes éprouvées.",
      pros: ["Stabilité et débit de traitement optimisés.", "Prévention systématique des interblocages."],
      cons: ["Exige une compréhension approfondie des mécanismes multithread."]
    }
  },
  "cap-14": {
    en: {
      name: "Successive Refinement",
      localName: "Successive Refinement",
      subtitle: "Case study: incremental refactoring of the command-line argument parser (Args)",
      intent: "Demonstrate that clean code is never written in one pass: it requires relentless, test-backed successive refinement.",
      problem: "First drafts are naturally messy; stopping without refactoring leaves unmaintainable spaghetti code.",
      solution: "Build a comprehensive unit test suite first, then refactor in tiny, verified micro-steps.",
      pros: ["Produces pristine, extensible software.", "Deep mastery of incremental refactoring."],
      cons: ["Demands patience and continuous test feedback."]
    },
    es: {
      name: "Refinamiento Sucesivo",
      localName: "Refinamiento Sucesivo",
      subtitle: "Estudio de caso: refactorización incremental del analizador de argumentos (Args)",
      intent: "Demostrar que el código limpio no se crea en un primer borrador, sino mediante refinamiento paso a paso protegido por tests.",
      problem: "Los borradores iniciales siempre son caóticos; darlos por terminados sin refactorizar produce código incomprensible.",
      solution: "Construir una red de pruebas exhaustiva y aplicar micro-transformaciones preservadoras de comportamiento.",
      pros: ["Software robusto, legible y fácil de ampliar.", "Dominio de las técnicas de refactorización."],
      cons: ["Requiere paciencia y disciplina metodológica."]
    },
    it: {
      name: "Raffinamento Successivo",
      localName: "Raffinamento Successivo",
      subtitle: "Studio di caso: rifattorizzazione incrementale del parser di argomenti (Args)",
      intent: "Dimostrare che il codice pulito nasce da continue iterazioni di rifattorizzazione protette dai test.",
      problem: "La prima versione di un algoritmo è inevitabilmente grezza; rilasciarla senza ripulirla crea debito tecnico permanente.",
      solution: "Creare test completi e applicare micro-trasformazioni iterative verificando la totale assenza di regressioni.",
      pros: ["Architettura cristallina e modulare.", "Controllo assoluto sull'evoluzione del codice."],
      cons: ["Richiede dedizione e rigore incrementale."]
    },
    fr: {
      name: "Raffinement Successif",
      localName: "Raffinement Successif",
      subtitle: "Étude de cas : refactorisation incrémentale de l'analyseur d'arguments (Args)",
      intent: "Démontrer que le code propre résulte d'un processus continu de raffinements successifs sécurisés par les tests.",
      problem: "Le premier jet d'un programme est toujours imparfait ; le figer tel quel crée une dette technique lourde.",
      solution: "Mettre en place une suite de tests unitaires étanche puis refactoriser par micro-étapes vérifiées.",
      pros: ["Code final limpide et facilement extensible.", "Maîtrise des techniques de refactorisation continue."],
      cons: ["Exige du temps et de la patience méthodologique."]
    }
  },
  "cap-15": {
    en: {
      name: "JUnit Internals",
      localName: "JUnit Internals",
      subtitle: "Case study: refactoring the ComparisonCompactor module of the JUnit framework",
      intent: "Examine a real-world, well-tested module and elevate its clarity even further through disciplined refactoring.",
      problem: "Even high-quality code written by masters contains hidden coupling, misleading names and scope leaks.",
      solution: "Clarify boolean conditions, separate formatting from comparison, and eliminate temporal coupling.",
      pros: ["Turns already good code into truly outstanding craftsmanship.", "Sharpens code review skills."],
      cons: ["Requires high attention to subtle edge cases."]
    },
    es: {
      name: "Aspectos Internos de JUnit",
      localName: "Aspectos Internos de JUnit",
      subtitle: "Estudio de caso: refactorización del módulo ComparisonCompactor de JUnit",
      intent: "Tomar un módulo real bien probado y elevar su claridad mediante refactorización quirúrgica.",
      problem: "Incluso el código escrito por expertos puede contener acoplamiento temporal y nombres mejorables.",
      solution: "Descomponer condiciones complejas, extraer métodos específicos y clarificar la intención de cada paso.",
      pros: ["Perfecciona el código hasta convertirlo en una referencia ejemplar.", "Entrena el ojo crítico para el code review."],
      cons: ["Requiere atención extrema a los detalles."]
    },
    it: {
      name: "Dettagli Interni di JUnit",
      localName: "Dettagli Interni di JUnit",
      subtitle: "Studio di caso: rifattorizzazione del modulo ComparisonCompactor di JUnit",
      intent: "Esaminare un modulo reale collaudato e migliorarne ulteriormente la leggibilità e l'eleganza.",
      problem: "Anche codice eccellente può nascondere accoppiamenti temporali e nomi non ottimali.",
      solution: "Chiarire le condizioni logiche, separare il confronto dalla formattazione ed eliminare ridondanze.",
      pros: ["Trasforma buon codice in un capolavoro di chiarezza.", "Affina la capacità di condurre code review efficaci."],
      cons: ["Richiede grande concentrazione sui dettagli."]
    },
    fr: {
      name: "Dans les Entrailles de JUnit",
      localName: "Dans les Entrailles de JUnit",
      subtitle: "Étude de cas : refactorisation du module ComparisonCompactor du framework JUnit",
      intent: "Analyser un module réel bien conçu et polir sa structure pour atteindre une clarté maximale.",
      problem: "Même le code produit par des experts recèle des couplages temporels et des formulations ambiguës.",
      solution: "Clarifier les prédicats, isoler la comparaison de la mise en forme et simplifier le flux.",
      pros: ["Élève un code déjà solide au rang d'exemple d'artisanat logiciel.", "Développe le sens critique en revue de code."],
      cons: ["Nécessite une vigilance extrême sur chaque nuance."]
    }
  },
  "cap-16": {
    en: {
      name: "Refactoring SerialDate",
      localName: "Refactoring SerialDate",
      subtitle: "Case study: auditing, repairing tests and overhauling JCommon's SerialDate into DayDate",
      intent: "Conduct a comprehensive audit on an open-source library class, fix test coverage, and modernize architecture.",
      problem: "Inherited legacy libraries often mix obsolete design choices, broken encapsulation, and incomplete tests.",
      solution: "Fix tests first, eradicate static constants clutter, decouple abstract classes from factories, and rename cleanly.",
      pros: ["Transforms confusing legacy classes into clean, modern APIs.", "Real-world engineering case study."],
      cons: ["Can break legacy client code unless backward compatibility adapters are retained."]
    },
    es: {
      name: "Refactorizando SerialDate",
      localName: "Refactorizando SerialDate",
      subtitle: "Estudio de caso: auditoría, reparación de tests y transformación de SerialDate en DayDate",
      intent: "Auditar a fondo una clase real de código abierto, robustecer sus pruebas y modernizar su diseño.",
      problem: "Las librerías heredadas a menudo arrastran malas decisiones de diseño y pruebas incompletas.",
      solution: "Asegurar la suite de pruebas, eliminar constantes mágicas, desacoplar fábricas y renombrar apropiadamente.",
      pros: ["Convierte código legacy en una API moderna y limpia.", "Lección práctica de ingeniería de software."],
      cons: ["Riesgo de romper compatibilidad retroactiva si no se preservan adaptadores."]
    },
    it: {
      name: "Rifattorizzare SerialDate",
      localName: "Rifattorizzare SerialDate",
      subtitle: "Studio di caso: revisione completa, potenziamento dei test e rinomina in DayDate",
      intent: "Eseguire una revisione approfondita su una classe open source, completare i test e modernizzarne l'architettura.",
      problem: "Codice legacy preesistente accumula costanti sparse, test parziali e violazioni dell'incapsulamento.",
      solution: "Rafforzare la suite di test, ripulire le costanti ridondanti e separare la classe astratta dalla fabbrica.",
      pros: ["Rigenera classi obsolete rendendole API moderne e affidabili.", "Esperienza concreta di ingegneria su codice reale."],
      cons: ["Può impattare il codice preesistente se non gestito con cautela."]
    },
    fr: {
      name: "Refactorisation de SerialDate",
      localName: "Refactorisation de SerialDate",
      subtitle: "Étude de cas : audit, consolidation des tests et refonte de SerialDate en DayDate",
      intent: "Auditer en profondeur une classe open source réelle, compléter ses tests et moderniser son architecture.",
      problem: "Les bibliothèques historiques accumulent des choix d'implémentation dépassés et des tests partiels.",
      solution: "Consolider la couverture de tests, assainir les constantes et découpler la classe abstraite de sa fabrique.",
      pros: ["Modernise du code legacy en une API robuste et élégante.", "Excellente mise en pratique d'ingénierie logicielle."],
      cons: ["Nécessite des précautions pour préserver la rétrocompatibilité."]
    }
  },
  "cap-17": {
    en: {
      name: "Smells and Heuristics",
      localName: "Smells and Heuristics",
      subtitle: "The complete catalog of 66 code smells and heuristics across comments, environment, functions, general, names, tests",
      intent: "Provide a quick-reference encyclopedia of code smells and diagnostic heuristics to guide refactoring decisions.",
      problem: "Developers often feel code is bad without knowing the exact diagnostic name or the proven refactoring remedy.",
      solution: "Consult the 66 heuristics categorized into Comments (C), Environment (E), Functions (F), General (G), Names (N), and Tests (T).",
      pros: ["Shared vocabulary across the engineering team for code reviews.", "Precise diagnosis of architectural decay."],
      cons: ["Requires regular study to memorize and instinctively spot smells."]
    },
    es: {
      name: "Olores y Heurísticas",
      localName: "Olores y Heurísticas",
      subtitle: "Catálogo completo de los 66 olores y heurísticas en comentarios, entorno, funciones, nombres y tests",
      intent: "Ofrecer una enciclopedia rápida de diagnóstico de olores de código y sus soluciones probadas de refactorización.",
      problem: "Muchas veces un desarrollador nota que algo está mal en el código pero carece del vocabulario preciso para diagnosticarlo.",
      solution: "Utilizar las 66 heurísticas organizadas en Comentarios (C), Entorno (E), Funciones (F), General (G), Nombres (N) y Tests (T).",
      pros: ["Vocabulario compartido para revisiones de código precisas.", "Diagnóstico rápido del deterioro arquitectónico."],
      cons: ["Exige práctica para reconocer los olores de forma automática."]
    },
    it: {
      name: "Odori ed Euristiche",
      localName: "Odori ed Euristiche",
      subtitle: "Il catalogo completo di 66 odori del codice ed euristiche per commenti, funzioni, nomi e test",
      intent: "Fornire una guida di riferimento diagnostica con i 66 odori del codice e le rispettive soluzioni di refactoring.",
      problem: "Riconoscere codice degradato senza disporre di una terminologia precisa rende difficile il dialogo nei code review.",
      solution: "Consultare le 66 euristiche catalogate in Commenti (C), Ambiente (E), Funzioni (F), Generale (G), Nomi (N) e Test (T).",
      pros: ["Linguaggio comune chiaro per l'intero team di sviluppo.", "Individuazione tempestiva del debito tecnico."],
      cons: ["Richiede studio e allenamento continuo per una diagnosi immediata."]
    },
    fr: {
      name: "Mauvaises Odeurs et Heuristiques",
      localName: "Mauvaises Odeurs et Heuristiques",
      subtitle: "Catalogue exhaustif des 66 odeurs de code et heuristiques sur les commentaires, fonctions, noms et tests",
      intent: "Offrir un guide de référence rapide des 66 odeurs de code et de leurs remèdes éprouvés.",
      problem: "Ressentir qu'un code est dégradé sans pouvoir nommer précisément le défaut freine les revues de code.",
      solution: "S'appuyer sur les 66 heuristiques classées par Commentaires (C), Environnement (E), Fonctions (F), Général (G), Noms (N) et Tests (T).",
      pros: ["Vocabulaire partagé pour des revues de code constructives.", "Détection rapide et précise de la dette technique."],
      cons: ["Nécessite une assimilation progressive pour devenir un réflexe."]
    }
  }
};

