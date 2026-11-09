/**
 * Dicionario Multilingue para os 11 Capitulos de "Entendendo Algoritmos" (Aditya Y. Bhargava).
 * Fornece traducoes completas para EN, ES, IT e FR.
 */

export const grokkingAlgorithmsI18n = {
  "ga-cap-1": {
    en: {
      name: "Introduction to Algorithms",
      localName: "Introduction to Algorithms",
      subtitle: "Binary search, performance measurement and Big O notation",
      intent: "Understand how smart algorithms turn billions of operations into dozens of logarithmic steps.",
      problem: "Simple linear search checks every item one by one, requiring 4 billion steps on large datasets.",
      solution: "Binary search cuts the search space in half with every guess, requiring at most log2(n) steps on sorted lists.",
      pros: ["Logarithmic time complexity O(log n).", "Blazing fast on sorted collections.", "Predictable upper-bound guarantees."],
      cons: ["Strictly requires pre-sorted input collections."]
    },
    es: {
      name: "Introduccion a los Algoritmos",
      localName: "Introduccion a los Algoritmos",
      subtitle: "Busqueda binaria, medicion de rendimiento y notacion Big O",
      intent: "Comprender como algoritmos inteligentes transforman miles de millones de operaciones en decenas de pasos.",
      problem: "La busqueda simple recorre cada elemento uno a uno, requiriendo 4 mil millones de operaciones en listas masivas.",
      solution: "La busqueda binaria divide el espacio a la mitad en cada intento, completando en tiempo O(log n).",
      pros: ["Complejidad logaritmica ultra veloz O(log n).", "Rendimiento instantaneo en listas ordenadas."],
      cons: ["Exige estrictamente listas previamente ordenadas."]
    },
    it: {
      name: "Introduzione agli Algoritmi",
      localName: "Introduzione agli Algoritmi",
      subtitle: "Ricerca binaria, misurazione delle prestazioni e notazione Big O",
      intent: "Capire come algoritmi intelligenti trasformano miliardi di operazioni in poche decine di passaggi.",
      problem: "La ricerca lineare esamina ogni elemento uno ad uno con costo O(n).",
      solution: "La ricerca binaria dimezza i candidati a ogni tentativo garantendo tempo O(log n).",
      pros: ["Complessita logaritmica O(log n).", "Estremamente veloce su insiemi ordinati."],
      cons: ["Richiede obbligatoriamente collezioni pre-ordinate."]
    },
    fr: {
      name: "Introduction aux Algorithmes",
      localName: "Introduction aux Algorithmes",
      subtitle: "Recherche binaire, mesure des performances et notation Grand O",
      intent: "Comprendre comment des algorithmes bien conçus transforment des milliards d'operations en quelques etapes.",
      problem: "La recherche simple parcourt chaque element un par un en O(n).",
      solution: "La recherche binaire coupe l'espace en deux a chaque etape en O(log n).",
      pros: ["Complexite logarithmique O(log n).", "Rapidite fulgurante sur listes triees."],
      cons: ["Necessite imperativement une liste prealablement triee."]
    }
  },

  "ga-cap-2": {
    en: {
      name: "Selection Sort",
      localName: "Selection Sort",
      subtitle: "Memory slots, arrays vs linked lists, and selection sort",
      intent: "Compare computer memory allocation models and understand O(n^2) sorting by repeatedly finding the minimum.",
      problem: "Arrays offer O(1) random access but require contiguous memory; linked lists allow easy inserts but slow traversals.",
      solution: "Selection sort scans the list repeatedly to find the smallest element, moving it to a new array in O(n^2).",
      pros: ["Conceptually intuitive and easy to understand.", "Illustrates contiguous vs non-contiguous memory tradeoffs."],
      cons: ["Slow quadratic time complexity O(n^2) unsuited for large datasets."]
    },
    es: {
      name: "Ordenacion por Seleccion",
      localName: "Ordenacion por Seleccion",
      subtitle: "Memoria, arrays vs listas enlazadas y algoritmo de seleccion",
      intent: "Comparar modelos de memoria y entender el algoritmo de ordenacion por seleccion O(n^2).",
      problem: "Los arrays permiten acceso aleatorio pero exigen memoria contigua; las listas enlazadas permiten inserciones flexibles.",
      solution: "La ordenacion por seleccion busca repetidamente el elemento menor y lo traslada a un nuevo array.",
      pros: ["Simple y facil de implementar.", "Aclara el funcionamiento de la memoria."],
      cons: ["Complejidad cuadratica lenta O(n^2)."]
    },
    it: {
      name: "Ordinamento per Selezione",
      localName: "Ordinamento per Selezione",
      subtitle: "Memoria, array vs liste concatenate e ordinamento per selezione",
      intent: "Confrontare l'allocazione della memoria e comprendere l'algoritmo selection sort O(n^2).",
      problem: "Gli array offrono accesso O(1) ma richiedono blocchi contigui; le liste concatenate permettono inserimenti facili.",
      solution: "Selection sort cerca ripetutamente il valore minimo costruendo un nuovo array ordinato.",
      pros: ["Semplice e intuitivo.", "Ottimo per comprendere la memoria."],
      cons: ["Tempo quadratico O(n^2) lento su grandi volumi."]
    },
    fr: {
      name: "Tri par Selection",
      localName: "Tri par Selection",
      subtitle: "Memoire, tableaux vs listes chainees et tri par selection",
      intent: "Comparer l'allocation memoire et comprendre le tri par selection en O(n^2).",
      problem: "Les tableaux offrent un acces O(1) mais necessitent de la memoire contigue; les listes chainees sont flexibles en insertion.",
      solution: "Le tri par selection recherche successivement le plus petit element en O(n^2).",
      pros: ["Tres intuitif et pedagogique.", "Clarifie les compromis d'allocation memoire."],
      cons: ["Complexite quadratique O(n^2) lente."]
    }
  },

  "ga-cap-3": {
    en: {
      name: "Recursion",
      localName: "Recursion",
      subtitle: "Base cases, recursive cases, and the call stack",
      intent: "Master the mental model of functions calling themselves and how the call stack manages memory frames.",
      problem: "Without a clear stopping condition, recursion continues infinitely and exhausts memory (Stack Overflow).",
      solution: "Every recursive function must clearly define a base case (to stop) and a recursive case (to call itself).",
      pros: ["High developer expressiveness for self-similar problem domains.", "Natural fit for trees and graphs."],
      cons: ["Consumes call stack memory for each active recursive frame."]
    },
    es: {
      name: "Recursion",
      localName: "Recursion",
      subtitle: "Caso base, caso recursivo y la pila de llamadas",
      intent: "Dominar el modelo de funciones recursivas y la gestion de memoria en la pila.",
      problem: "Sin caso base, la recursion es infinita y provoca desbordamiento de pila.",
      solution: "Definir estrictamente un caso base y un caso recursivo en cada funcion.",
      pros: ["Codigo elegante y expresivo.", "Ideal para estructuras arboreas."],
      cons: ["Consume memoria de pila por cada nivel de llamada."]
    },
    it: {
      name: "Ricorsione",
      localName: "Ricorsione",
      subtitle: "Caso base, caso ricorsivo e call stack",
      intent: "Comprendere a fondo le funzioni ricorsive e la gestione della memoria nello stack.",
      problem: "Senza una condizione di arresto, la ricorsione causa stack overflow.",
      solution: "Definire chiaramente il caso base e il caso ricorsivo.",
      pros: ["Codice elegante e leggibile per strutture auto-simili."],
      cons: ["Ogni chiamata alloca un frame nello stack di memoria."]
    },
    fr: {
      name: "Recursivite",
      localName: "Recursivite",
      subtitle: "Cas de base, cas recursif et pile d'appels",
      intent: "Maitriser le fonctionnement des fonctions recursives et la pile d'appels.",
      problem: "Sans cas d'arret, la fonction boucle a l'infini provoquant un debordement de pile.",
      solution: "Toute fonction recursive doit posseder un cas de base et un cas recursif.",
      pros: ["Grande clarte conceptuelle pour les arbres et graphes."],
      cons: ["Consommation memoire sur la pile d'appels."]
    }
  },

  "ga-cap-4": {
    en: {
      name: "Quicksort",
      localName: "Quicksort",
      subtitle: "Divide and Conquer (D&C), fast sorting and hidden constants",
      intent: "Apply Divide and Conquer to reduce complex arrays into base-case partitions sorted in average O(n log n).",
      problem: "Quadratic sorting algorithms like selection sort scale poorly with large data volumes.",
      solution: "Pick a pivot element, partition into smaller and greater subarrays, and recursively sort with quicksort.",
      pros: ["Average time complexity O(n log n).", "Smaller constant factors than mergesort."],
      cons: ["Worst case degrades to O(n^2) on poor pivot selection."]
    },
    es: {
      name: "Quicksort",
      localName: "Quicksort",
      subtitle: "Dividir y conquistar (D&C), ordenacion rapida y constantes",
      intent: "Aplicar la estrategia Dividir y Conquistar para ordenar en tiempo O(n log n).",
      problem: "Los algoritmos quadraticos son demasiado lentos para grandes conjuntos de datos.",
      solution: "Elegir un pivote, particionar en menores y mayores, y ordenar recursivamente.",
      pros: ["Excelente velocidad promedio O(n log n).", "Constantes reducidas en la practica."],
      cons: ["Peor caso O(n^2) si el pivote no esta balanceado."]
    },
    it: {
      name: "Quicksort",
      localName: "Quicksort",
      subtitle: "Dividi ed impera (D&C), ordinamento rapido e costanti",
      intent: "Utilizzare la tecnica dividi ed impera per ordinare array in tempo O(n log n).",
      problem: "Gli algoritmi quadratici non scalano su dataset estesi.",
      solution: "Selezionare un pivot, partizionare gli elementi e ricorrere sulle due meta.",
      pros: ["Tempo medio O(n log n).", "Minore sovraccarico costante rispetto al mergesort."],
      cons: ["Caso peggiore O(n^2) con pivot sbilanciato."]
    },
    fr: {
      name: "Quicksort",
      localName: "Quicksort",
      subtitle: "Diviser pour regner (D&C), tri rapide et constantes cachees",
      intent: "Appliquer la strategie diviser pour regner pour trier en temps moyen O(n log n).",
      problem: "Les algorithmes en O(n^2) deviennent inutilisables a grande echelle.",
      solution: "Choisir un pivot, partitionner le tableau et trier recursivement chaque moitie.",
      pros: ["Temps moyen O(n log n) tres rapide.", "Constantes faibles en memoire cache."],
      cons: ["Pire cas en O(n^2) en cas de mauvais choix de pivot."]
    }
  },

  "ga-cap-5": {
    en: {
      name: "Hash Tables",
      localName: "Hash Tables",
      subtitle: "Hash functions, collisions, load factors and high-speed caches",
      intent: "Harness O(1) key-value mapping for fast lookups, web caching, and duplicate filtering.",
      problem: "Arrays require numeric indexes and lists require O(n) search to find keys.",
      solution: "Hash functions convert keys into numeric bucket slots, maintaining O(1) average performance.",
      pros: ["Instant O(1) average lookup, insertion and deletion.", "Ideal for caches and key-value storage."],
      cons: ["Requires resizing when load factor exceeds 0.7 to avoid collision degradation."]
    },
    es: {
      name: "Tablas Hash",
      localName: "Tablas Hash",
      subtitle: "Funciones hash, colisiones, factor de carga y caches",
      intent: "Aprovechar busquedas O(1) por clave para caches y verificacion de duplicados.",
      problem: "Buscar claves en listas requiere tiempo lineal O(n).",
      solution: "Mapear claves a indices mediante funciones hash con encadenamiento para colisiones.",
      pros: ["Acceso O(1) instantaneo en el caso promedio.", "Base de sistemas de cache."],
      cons: ["Necesita redimensionamiento si el factor de carga supera 0.7."]
    },
    it: {
      name: "Tabelle Hash",
      localName: "Tabelle Hash",
      subtitle: "Funzioni hash, collisioni, fattore di carico e cache veloci",
      intent: "Utilizzare tabelle hash per ricerche O(1) istantanee e memorizzazione di cache.",
      problem: "La ricerca per stringa in array o liste richiede scansioni lineari lente.",
      solution: "Convertire chiavi in indici tramite funzioni hash distribuite.",
      pros: ["Ricerca e inserimento O(1) nel caso medio.", "Indispensabile per i sistemi web."],
      cons: ["Degrada a O(n) nel peggior caso con troppe collisioni."]
    },
    fr: {
      name: "Tables de Hachage",
      localName: "Tables de Hachage",
      subtitle: "Fonctions de hachage, collisions, facteur de charge et caches",
      intent: "Exploiter l'acces O(1) cle-valeur pour les caches et le filtrage rapide.",
      problem: "Parcourir des listes pour retrouver une cle est couteux en O(n).",
      solution: "Transformer les cles en indices de tableau via une fonction de hachage.",
      pros: ["Acces O(1) en moyenne.", "Parfait pour la mise en cache web."],
      cons: ["Exige un redimensionnement quand le facteur de charge depasse 0.7."]
    }
  },

  "ga-cap-6": {
    en: {
      name: "Breadth-First Search",
      localName: "Breadth-First Search",
      subtitle: "Graphs, FIFO queues, the mango seller, and the shortest path",
      intent: "Model networks as graphs and apply BFS to find the shortest path in number of hops.",
      problem: "Finding if a connection exists between two nodes and calculating the minimum number of steps.",
      solution: "Use a FIFO queue to explore neighbors level by level, tracking visited nodes to avoid cycles.",
      pros: ["Guarantees finding the path with the fewest hops.", "Linear time O(V + E)."],
      cons: ["Does not account for edge weights or varying segment durations."]
    },
    es: {
      name: "Busqueda en Anchura",
      localName: "Busqueda en Anchura",
      subtitle: "Grafos, colas FIFO, el vendedor de mangos y el camino mas corto",
      intent: "Modelar redes como grafos y encontrar el camino con menor numero de saltos.",
      problem: "Determinar si existe conexion y hallar la ruta mas corta sin caer en ciclos.",
      solution: "Usar una cola FIFO para explorar en ondas concentricas con conjunto de visitados.",
      pros: ["Garantiza el camino con menor numero de conexiones.", "Tiempo O(V + E)."],
      cons: ["No contempla pesos ni duraciones en las aristas."]
    },
    it: {
      name: "Ricerca in Ampiezza",
      localName: "Ricerca in Ampiezza",
      subtitle: "Grafi, code FIFO, il venditore di mango e il cammino piu breve",
      intent: "Rappresentare relazioni in rete e trovare il percorso con meno passaggi via BFS.",
      problem: "Trovare il percorso piu breve in termini di salti evitando loop infiniti.",
      solution: "Esplorare i nodi livello per livello tramite una coda FIFO.",
      pros: ["Trova sempre il minor numero di archi.", "Complessita lineare O(V + E)."],
      cons: ["Non considera i pesi degli archi."]
    },
    fr: {
      name: "Recherche en Largeur",
      localName: "Recherche en Largeur",
      subtitle: "Graphes, files FIFO, le vendeur de mangues et le plus court chemin",
      intent: "Modeliser des reseaux et trouver le plus court chemin en nombre d'etapes.",
      problem: "Trouver la connexion la plus directe en evitant les boucles infinies.",
      solution: "Explorer en vagues successives avec une file FIFO et une liste de visites.",
      pros: ["Garantit le chemin avec le moins d'aretes.", "Complexite O(V + E)."],
      cons: ["Ne prend pas en compte les poids des liaisons."]
    }
  },

  "ga-cap-7": {
    en: {
      name: "Dijkstra's Algorithm",
      localName: "Dijkstra's Algorithm",
      subtitle: "Weighted graphs, minimum travel time, DAGs and negative weights",
      intent: "Find the lowest-weight path across weighted directed acyclic graphs.",
      problem: "BFS only counts edge hops, failing when steps have differing costs or transit times.",
      solution: "Use Dijkstra's 4 steps: find cheapest unprocessed node, update neighbor costs, mark as processed.",
      pros: ["Finds the mathematically optimal lowest-cost route.", "Widely used in GPS routing."],
      cons: ["Fails on negative weight edges (requires Bellman-Ford instead)."]
    },
    es: {
      name: "Algoritmo de Dijkstra",
      localName: "Algoritmo de Dijkstra",
      subtitle: "Grafos ponderados, menor tiempo de viaje y aristas negativas",
      intent: "Calcular la ruta de menor costo en grafos con pesos numericos.",
      problem: "La BFS ignora costos y tiempos en las conexiones del grafo.",
      solution: "Aplicar las 4 etapas de Dijkstra relajando aristas y registrando la tabla de padres.",
      pros: ["Garantiza la ruta de menor costo acumulado.", "Estandar para navegacion GPS."],
      cons: ["No funciona con aristas de peso negativo."]
    },
    it: {
      name: "Algoritmo di Dijkstra",
      localName: "Algoritmo di Dijkstra",
      subtitle: "Grafi pesati, tempo minimo di percorrenza e archi negativi",
      intent: "Trovare il cammino di costo minimo in grafi orientati pesati.",
      problem: "La BFS conta solo i passaggi ignorando pedaggi o durate.",
      solution: "Aggiornare la tabella dei costi passo dopo passo processando i nodi piu economici.",
      pros: ["Ottimale per il routing stradale e le reti."],
      cons: ["Incompatibile con pesi negativi."]
    },
    fr: {
      name: "Algorithme de Dijkstra",
      localName: "Algorithme de Dijkstra",
      subtitle: "Graphes ponderes, temps de trajet minimal et arcs negatifs",
      intent: "Determiner le trajet le plus economique dans un graphe pondere.",
      problem: "La BFS compte les etapes sans tenir compte des distances reelles.",
      solution: "Mettre a jour les couts cumulatifs en traitant les sommets les moins chers.",
      pros: ["Optimal pour les cartes routieres et le GPS."],
      cons: ["Echoue en presence de poids negatifs (utiliser Bellman-Ford)."]
    }
  },

  "ga-cap-8": {
    en: {
      name: "Greedy Algorithms",
      localName: "Greedy Algorithms",
      subtitle: "The greedy choice, the set covering problem, and NP-completeness",
      intent: "Understand when local optimal choices yield good-enough solutions for intractable NP-complete problems.",
      problem: "Set covering and Traveling Salesperson require evaluating 2^n or n! combinations.",
      solution: "Greedy approximation algorithms pick the best immediate step in polynomial time O(n^2).",
      pros: ["Fast execution on otherwise intractable problems.", "Produces near-optimal results."],
      cons: ["May not guarantee absolute mathematical perfection in all domains."]
    },
    es: {
      name: "Algoritmos Voraces (Gredy)",
      localName: "Algoritmos Voraces",
      subtitle: "La eleccion voraz, el problema de cobertura y problemas NP-Completos",
      intent: "Aprender cuando elecciones optimas locales resuelven problemas NP-completos.",
      problem: "Calcular todas las combinaciones exactas exige 2^n operaciones inviables.",
      solution: "Elegir a cada paso la estacion que cubra mas elementos no cubiertos en O(n^2).",
      pros: ["Tiempo polinomial rapido.", "Aproximaciones muy cercanas a la solucion perfecta."],
      cons: ["No siempre alcanza el optimo absoluto."]
    },
    it: {
      name: "Algoritmi Golosi (Greedy)",
      localName: "Algoritmi Golosi",
      subtitle: "La scelta golosa, copertura di insiemi e problemi NP-completi",
      intent: "Applicare scelte ottime locali per approssimare problemi computazionalmente complessi.",
      problem: "La forza bruta su problemi combinatori richiede tempo esponenziale o fattoriale.",
      solution: "Selezionare l'opzione migliore immediata in tempo polinomiale.",
      pros: ["Risolve problemi complessi in tempi rapidi.", "Ottima approssimazione."],
      cons: ["Puo mancare l'ottimo globale assoluto."]
    },
    fr: {
      name: "Algorithmes Gloutons",
      localName: "Algorithmes Gloutons",
      subtitle: "Le choix glouton, le probleme de couverture d'ensembles et NP-completude",
      intent: "Comprendre comment des choix locaux permettent d'approcher des problemes NP-complets.",
      problem: "Calculer toutes les combinaisons possibles exige 2^n etapes irrealisables.",
      solution: "Choisir a chaque etape le meilleur gain immediat en temps polynomial.",
      pros: ["Extremement rapide sur problemes difficiles.", "Resultats tres proches de l'optimal."],
      cons: ["N'atteint pas toujours la perfection mathematique absolue."]
    }
  },

  "ga-cap-9": {
    en: {
      name: "Dynamic Programming",
      localName: "Dynamic Programming",
      subtitle: "Grid construction, the knapsack problem, and longest common subsequence",
      intent: "Solve complex optimization problems by breaking them into independent discrete subproblems.",
      problem: "Greedy approaches fail on 0/1 knapsack problems where item combinations leave empty gaps.",
      solution: "Build a DP grid comparing previous cell values against current item value plus remaining capacity.",
      pros: ["Guaranteed mathematically optimal solution.", "Powers git diff, spellcheckers and DNA analysis."],
      cons: ["Subproblems must be strictly discrete and independent."]
    },
    es: {
      name: "Programacion Dinamica",
      localName: "Programacion Dinamica",
      subtitle: "Construccion de tablas, el problema de la mochila y subsecuencias comunes",
      intent: "Resolver problemas dificiles dividiendolos en subproblemas discretos en una cuadricula.",
      problem: "Los algoritmos voraces fallan en la mochila 0/1 al no combinar articulos pequenos.",
      solution: "Rellenar una tabla evaluando el valor anterior frente al nuevo item mas la capacidad restante.",
      pros: ["Solucion globalmente optima garantizada.", "Base de git diff y alineamiento de ADN."],
      cons: ["Solo aplicable con subproblemas independientes."]
    },
    it: {
      name: "Programmazione Dinamica",
      localName: "Programmazione Dinamica",
      subtitle: "Griglia dei sottoproblemi, problema dello zaino e sottosequenze comuni",
      intent: "Risolvere problemi complessi tramite memorizzazione di sottoproblemi discreti.",
      problem: "Gli algoritmi golosi falliscono quando gli oggetti lasciano spazi vuoti nello zaino.",
      solution: "Costruire una griglia memorizzando la soluzione migliore per ogni capacita parziale.",
      pros: ["Garantisce la soluzione perfetta.", "Utilizzato in git diff e sequenziamento DNA."],
      cons: ["I sottoproblemi devono essere rigorosamente indipendenti."]
    },
    fr: {
      name: "Programmation Dynamique",
      localName: "Programmation Dynamique",
      subtitle: "Grille de sous-problemes, probleme du sac a dos et plus longue sous-sequence",
      intent: "Resoudre des problemes complexes en combinant les resultats de sous-problemes discrets.",
      problem: "L'approche gloutonne echoue a optimiser le sac a dos 0/1.",
      solution: "Remplir une matrice en comparant la valeur precedente a la nouvelle valeur ajoutee.",
      pros: ["Garantit la solution optimale.", "Au coeur de git diff et de la bio-informatique."],
      cons: ["Les sous-problemes doivent etre completement independants."]
    }
  },

  "ga-cap-10": {
    en: {
      name: "K-Nearest Neighbors",
      localName: "K-Nearest Neighbors",
      subtitle: "Classification, regression, feature extraction and recommendations",
      intent: "Introduce machine learning concepts through spatial proximity and Euclidean distance.",
      problem: "Manually coding hardcoded rules fails to classify fuzzy real-world data like fruits or OCR.",
      solution: "Extract numerical features, calculate distances to cataloged examples, and take majority votes.",
      pros: ["Simple, intuitive entry into ML.", "Supports both classification and numeric regression."],
      cons: ["Requires normalized feature scales to prevent dominant dimensions."]
    },
    es: {
      name: "K-Vecinos Mas Proximos (KNN)",
      localName: "K-Vecinos Mas Proximos",
      subtitle: "Clasificacion, regresion, extraccion de caracteristicas y recomendaciones",
      intent: "Introducir aprendizaje automatico evaluando distancias espaciales a los K vecinos.",
      problem: "Las reglas fijas de programacion no capturan la variabilidad de imagenes o preferencias.",
      solution: "Extraer caracteristicas vectoriales y clasificar por mayoria de votos entre los vecinos mas cercanos.",
      pros: ["Facil de implementar.", "Sirve para clasificacion y regresion continua."],
      cons: ["Sensible a la escala de las variables sin normalizar."]
    },
    it: {
      name: "K-Vicini Piu Prossimi (KNN)",
      localName: "K-Vicini Piu Prossimi",
      subtitle: "Classificazione, regressione, estrazione di caratteristiche e raccomandazioni",
      intent: "Classificare campioni e stimare valori analizzando la vicinanza nello spazio vettoriale.",
      problem: "Regole if-else rigide non gestiscono la complessita di raccomandazioni e OCR.",
      solution: "Calcolare la distanza euclidea tra punti ed eleggere la classe dominante tra i K vicini.",
      pros: ["Approccio intuitivo all'apprendimento automatico."],
      cons: ["Richiede normalizzazione delle caratteristiche."]
    },
    fr: {
      name: "K-Plus Proches Voisins (KNN)",
      localName: "K-Plus Proches Voisins",
      subtitle: "Classification, regression, extraction de caracteristiques et recommandations",
      intent: "Classifier et predire des valeurs numeriques par proximite euclidienne.",
      problem: "Les regles explicites ne conviennent pas a la reconnaissance d'ecriture ou aux gouts.",
      solution: "Mesurer la distance euclidienne et voter a la majorite parmi les K plus proches echantillons.",
      pros: ["Concept simple et puissant pour l'apprentissage machine."],
      cons: ["Necessite la normalisation prealable des dimensions."]
    }
  },

  "ga-cap-11": {
    en: {
      name: "Next Steps",
      localName: "Next Steps",
      subtitle: "Probabilistic data structures, search trees, Fourier transforms and cryptography",
      intent: "Explore the modern algorithmic landscape beyond foundational techniques.",
      problem: "Traditional data structures struggle under modern web-scale and Big Data demands.",
      solution: "Adopt Bloom filters, HyperLogLog, B-Trees, Inverted Indexes, MapReduce and SHA cryptography.",
      pros: ["Handles petabytes of data with minimal memory footprints.", "Foundation of modern web infrastructure."],
      cons: ["Probabilistic structures accept small controllable false positive rates."]
    },
    es: {
      name: "Proximos Pasos",
      localName: "Proximos Pasos",
      subtitle: "Estructuras probabilisticas, arboles B, transformada de Fourier y criptografia",
      intent: "Descubrir las estructuras avanzadas que impulsan la computacion moderna a gran escala.",
      problem: "Las estructuras tradicionales colapsan ante volumenes de petabytes en la web.",
      solution: "Usar filtros de Bloom, HyperLogLog, indices invertidos, MapReduce y criptografia SHA.",
      pros: ["Escalabilidad masiva con memoria minima.", "Base de motores de busqueda y bases de datos."],
      cons: ["Las estructuras probabilisticas admiten pequenos margenes de falsos positivos."]
    },
    it: {
      name: "Prossimi Passi",
      localName: "Prossimi Passi",
      subtitle: "Strutture probabilistiche, alberi B, trasformata di Fourier e crittografia",
      intent: "Esplorare gli algoritmi avanzati alla base di motori di ricerca, database e crittografia.",
      problem: "Le strutture dati convenzionali esauriscono la memoria con flussi di miliardi di dati.",
      solution: "Adottare filtri di Bloom, HyperLogLog, indici invertiti e programmazione lineare.",
      pros: ["Prestazioni straordinarie a scala web.", "Pietra angolare delle infrastrutture cloud."],
      cons: ["Strutture probabilistiche con margine controllato di falsi positivi."]
    },
    fr: {
      name: "Prochaines Etapes",
      localName: "Prochaines Etapes",
      subtitle: "Structures probabilistes, arbres B, transformee de Fourier et cryptographie",
      intent: "Explorer les algorithmes avances au coeur des moteurs de recherche et des bases de donnees.",
      problem: "Les structures traditionnelles ne supportent pas l'echelle du Big Data moderne.",
      solution: "Utiliser des filtres de Bloom, HyperLogLog, des index inverses, MapReduce et SHA.",
      pros: ["Efficacite memoire redoutable sur des milliards d'elements."],
      cons: ["Structures probabilistes tolerent de faibles taux de faux positifs."]
    }
  }
};

