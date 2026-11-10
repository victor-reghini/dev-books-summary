import { javaExercises } from "./index.js";

export const javaQuizzesData = [
  {
    "id": "jv-q-1-1",
    "patternId": "jv-cap-1",
    "category": "classic-jvm",
    "difficulty": "facil",
    "question": "Questão 1.1: Em relação aos recursos e retrocompatibilidade do Capítulo 1 (Java 1.0 to 1.4: Genesis of the JVM, Bytecode, Collections & NIO), qual afirmação é tecnicamente correta?",
    "options": [
      {
        "text": "A JVM preservou compatibilidade binária permitindo execução direta de bytecodes anteriores.",
        "isCorrect": true
      },
      {
        "text": "Todas as aplicações foram obrigadas a ser totalmente reescritas devido à perda de retrocompatibilidade.",
        "isCorrect": false
      },
      {
        "text": "O compilador javac deixou de gerar arquivos .class convencionais.",
        "isCorrect": false
      },
      {
        "text": "A especificação da linguagem eliminou completamente o Garbage Collector.",
        "isCorrect": false
      }
    ],
    "explanation": "A plataforma Java tem como princípio cardeal a retrocompatibilidade binária: bytecodes mais antigos continuam executando em JVMs mais recentes sem necessidade de recompilação."
  },
  {
    "id": "jv-q-1-2",
    "patternId": "jv-cap-1",
    "category": "classic-jvm",
    "difficulty": "medio",
    "question": "Questão 1.2: Qual a recomendação oficial de engenharia para o recurso abordado no Capítulo 1?",
    "options": [
      {
        "text": "Utilizar as APIs e padrões modernos aproveitando abstrações seguras e compiladas pelo JIT/AOT.",
        "isCorrect": true
      },
      {
        "text": "Evitar qualquer atualização e manter bibliotecas permanentemente no Java 1.4.",
        "isCorrect": false
      },
      {
        "text": "Desabilitar o compilador JIT e rodar apenas em modo interpretado.",
        "isCorrect": false
      },
      {
        "text": "Criar pools de Virtual Threads com capacidade fixa pequena.",
        "isCorrect": false
      }
    ],
    "explanation": "A evolução arquitetural do Java visa maximizar a legibilidade, segurança de tipos em compilação e performance adaptativa no runtime."
  },
  {
    "id": "jv-q-2-1",
    "patternId": "jv-cap-2",
    "category": "classic-jvm",
    "difficulty": "facil",
    "question": "Questão 2.1: Em relação aos recursos e retrocompatibilidade do Capítulo 2 (Java 5: Generics, Annotations, Enums, Autoboxing & Concurrency), qual afirmação é tecnicamente correta?",
    "options": [
      {
        "text": "A JVM preservou compatibilidade binária permitindo execução direta de bytecodes anteriores.",
        "isCorrect": true
      },
      {
        "text": "Todas as aplicações foram obrigadas a ser totalmente reescritas devido à perda de retrocompatibilidade.",
        "isCorrect": false
      },
      {
        "text": "O compilador javac deixou de gerar arquivos .class convencionais.",
        "isCorrect": false
      },
      {
        "text": "A especificação da linguagem eliminou completamente o Garbage Collector.",
        "isCorrect": false
      }
    ],
    "explanation": "A plataforma Java tem como princípio cardeal a retrocompatibilidade binária: bytecodes mais antigos continuam executando em JVMs mais recentes sem necessidade de recompilação."
  },
  {
    "id": "jv-q-2-2",
    "patternId": "jv-cap-2",
    "category": "classic-jvm",
    "difficulty": "medio",
    "question": "Questão 2.2: Qual a recomendação oficial de engenharia para o recurso abordado no Capítulo 2?",
    "options": [
      {
        "text": "Utilizar as APIs e padrões modernos aproveitando abstrações seguras e compiladas pelo JIT/AOT.",
        "isCorrect": true
      },
      {
        "text": "Evitar qualquer atualização e manter bibliotecas permanentemente no Java 1.4.",
        "isCorrect": false
      },
      {
        "text": "Desabilitar o compilador JIT e rodar apenas em modo interpretado.",
        "isCorrect": false
      },
      {
        "text": "Criar pools de Virtual Threads com capacidade fixa pequena.",
        "isCorrect": false
      }
    ],
    "explanation": "A evolução arquitetural do Java visa maximizar a legibilidade, segurança de tipos em compilação e performance adaptativa no runtime."
  },
  {
    "id": "jv-q-3-1",
    "patternId": "jv-cap-3",
    "category": "classic-jvm",
    "difficulty": "facil",
    "question": "Questão 3.1: Em relação aos recursos e retrocompatibilidade do Capítulo 3 (Java 6 & 7: Project Coin, try-with-resources, NIO.2 & invokedynamic), qual afirmação é tecnicamente correta?",
    "options": [
      {
        "text": "A JVM preservou compatibilidade binária permitindo execução direta de bytecodes anteriores.",
        "isCorrect": true
      },
      {
        "text": "Todas as aplicações foram obrigadas a ser totalmente reescritas devido à perda de retrocompatibilidade.",
        "isCorrect": false
      },
      {
        "text": "O compilador javac deixou de gerar arquivos .class convencionais.",
        "isCorrect": false
      },
      {
        "text": "A especificação da linguagem eliminou completamente o Garbage Collector.",
        "isCorrect": false
      }
    ],
    "explanation": "A plataforma Java tem como princípio cardeal a retrocompatibilidade binária: bytecodes mais antigos continuam executando em JVMs mais recentes sem necessidade de recompilação."
  },
  {
    "id": "jv-q-3-2",
    "patternId": "jv-cap-3",
    "category": "classic-jvm",
    "difficulty": "medio",
    "question": "Questão 3.2: Qual a recomendação oficial de engenharia para o recurso abordado no Capítulo 3?",
    "options": [
      {
        "text": "Utilizar as APIs e padrões modernos aproveitando abstrações seguras e compiladas pelo JIT/AOT.",
        "isCorrect": true
      },
      {
        "text": "Evitar qualquer atualização e manter bibliotecas permanentemente no Java 1.4.",
        "isCorrect": false
      },
      {
        "text": "Desabilitar o compilador JIT e rodar apenas em modo interpretado.",
        "isCorrect": false
      },
      {
        "text": "Criar pools de Virtual Threads com capacidade fixa pequena.",
        "isCorrect": false
      }
    ],
    "explanation": "A evolução arquitetural do Java visa maximizar a legibilidade, segurança de tipos em compilação e performance adaptativa no runtime."
  },
  {
    "id": "jv-q-4-1",
    "patternId": "jv-cap-4",
    "category": "functional-modular",
    "difficulty": "facil",
    "question": "Questão 4.1: Em relação aos recursos e retrocompatibilidade do Capítulo 4 (Java 8 (LTS): Lambdas, Streams API, Optional, CompletableFuture & java.time), qual afirmação é tecnicamente correta?",
    "options": [
      {
        "text": "A JVM preservou compatibilidade binária permitindo execução direta de bytecodes anteriores.",
        "isCorrect": true
      },
      {
        "text": "Todas as aplicações foram obrigadas a ser totalmente reescritas devido à perda de retrocompatibilidade.",
        "isCorrect": false
      },
      {
        "text": "O compilador javac deixou de gerar arquivos .class convencionais.",
        "isCorrect": false
      },
      {
        "text": "A especificação da linguagem eliminou completamente o Garbage Collector.",
        "isCorrect": false
      }
    ],
    "explanation": "A plataforma Java tem como princípio cardeal a retrocompatibilidade binária: bytecodes mais antigos continuam executando em JVMs mais recentes sem necessidade de recompilação."
  },
  {
    "id": "jv-q-4-2",
    "patternId": "jv-cap-4",
    "category": "functional-modular",
    "difficulty": "medio",
    "question": "Questão 4.2: Qual a recomendação oficial de engenharia para o recurso abordado no Capítulo 4?",
    "options": [
      {
        "text": "Utilizar as APIs e padrões modernos aproveitando abstrações seguras e compiladas pelo JIT/AOT.",
        "isCorrect": true
      },
      {
        "text": "Evitar qualquer atualização e manter bibliotecas permanentemente no Java 1.4.",
        "isCorrect": false
      },
      {
        "text": "Desabilitar o compilador JIT e rodar apenas em modo interpretado.",
        "isCorrect": false
      },
      {
        "text": "Criar pools de Virtual Threads com capacidade fixa pequena.",
        "isCorrect": false
      }
    ],
    "explanation": "A evolução arquitetural do Java visa maximizar a legibilidade, segurança de tipos em compilação e performance adaptativa no runtime."
  },
  {
    "id": "jv-q-5-1",
    "patternId": "jv-cap-5",
    "category": "functional-modular",
    "difficulty": "facil",
    "question": "Questão 5.1: Em relação aos recursos e retrocompatibilidade do Capítulo 5 (Java 9 & 10: Module System (JPMS), JShell, Factory Methods & var), qual afirmação é tecnicamente correta?",
    "options": [
      {
        "text": "A JVM preservou compatibilidade binária permitindo execução direta de bytecodes anteriores.",
        "isCorrect": true
      },
      {
        "text": "Todas as aplicações foram obrigadas a ser totalmente reescritas devido à perda de retrocompatibilidade.",
        "isCorrect": false
      },
      {
        "text": "O compilador javac deixou de gerar arquivos .class convencionais.",
        "isCorrect": false
      },
      {
        "text": "A especificação da linguagem eliminou completamente o Garbage Collector.",
        "isCorrect": false
      }
    ],
    "explanation": "A plataforma Java tem como princípio cardeal a retrocompatibilidade binária: bytecodes mais antigos continuam executando em JVMs mais recentes sem necessidade de recompilação."
  },
  {
    "id": "jv-q-5-2",
    "patternId": "jv-cap-5",
    "category": "functional-modular",
    "difficulty": "medio",
    "question": "Questão 5.2: Qual a recomendação oficial de engenharia para o recurso abordado no Capítulo 5?",
    "options": [
      {
        "text": "Utilizar as APIs e padrões modernos aproveitando abstrações seguras e compiladas pelo JIT/AOT.",
        "isCorrect": true
      },
      {
        "text": "Evitar qualquer atualização e manter bibliotecas permanentemente no Java 1.4.",
        "isCorrect": false
      },
      {
        "text": "Desabilitar o compilador JIT e rodar apenas em modo interpretado.",
        "isCorrect": false
      },
      {
        "text": "Criar pools de Virtual Threads com capacidade fixa pequena.",
        "isCorrect": false
      }
    ],
    "explanation": "A evolução arquitetural do Java visa maximizar a legibilidade, segurança de tipos em compilação e performance adaptativa no runtime."
  },
  {
    "id": "jv-q-6-1",
    "patternId": "jv-cap-6",
    "category": "functional-modular",
    "difficulty": "facil",
    "question": "Questão 6.1: Em relação aos recursos e retrocompatibilidade do Capítulo 6 (Java 11 (LTS): Native HttpClient HTTP/2, Single-File Execution & JFR), qual afirmação é tecnicamente correta?",
    "options": [
      {
        "text": "A JVM preservou compatibilidade binária permitindo execução direta de bytecodes anteriores.",
        "isCorrect": true
      },
      {
        "text": "Todas as aplicações foram obrigadas a ser totalmente reescritas devido à perda de retrocompatibilidade.",
        "isCorrect": false
      },
      {
        "text": "O compilador javac deixou de gerar arquivos .class convencionais.",
        "isCorrect": false
      },
      {
        "text": "A especificação da linguagem eliminou completamente o Garbage Collector.",
        "isCorrect": false
      }
    ],
    "explanation": "A plataforma Java tem como princípio cardeal a retrocompatibilidade binária: bytecodes mais antigos continuam executando em JVMs mais recentes sem necessidade de recompilação."
  },
  {
    "id": "jv-q-6-2",
    "patternId": "jv-cap-6",
    "category": "functional-modular",
    "difficulty": "medio",
    "question": "Questão 6.2: Qual a recomendação oficial de engenharia para o recurso abordado no Capítulo 6?",
    "options": [
      {
        "text": "Utilizar as APIs e padrões modernos aproveitando abstrações seguras e compiladas pelo JIT/AOT.",
        "isCorrect": true
      },
      {
        "text": "Evitar qualquer atualização e manter bibliotecas permanentemente no Java 1.4.",
        "isCorrect": false
      },
      {
        "text": "Desabilitar o compilador JIT e rodar apenas em modo interpretado.",
        "isCorrect": false
      },
      {
        "text": "Criar pools de Virtual Threads com capacidade fixa pequena.",
        "isCorrect": false
      }
    ],
    "explanation": "A evolução arquitetural do Java visa maximizar a legibilidade, segurança de tipos em compilação e performance adaptativa no runtime."
  },
  {
    "id": "jv-q-7-1",
    "patternId": "jv-cap-7",
    "category": "modern-lts",
    "difficulty": "facil",
    "question": "Questão 7.1: Em relação aos recursos e retrocompatibilidade do Capítulo 7 (Java 12 to 17 (LTS): Records, Sealed Classes, Switch Expressions & Text Blocks), qual afirmação é tecnicamente correta?",
    "options": [
      {
        "text": "A JVM preservou compatibilidade binária permitindo execução direta de bytecodes anteriores.",
        "isCorrect": true
      },
      {
        "text": "Todas as aplicações foram obrigadas a ser totalmente reescritas devido à perda de retrocompatibilidade.",
        "isCorrect": false
      },
      {
        "text": "O compilador javac deixou de gerar arquivos .class convencionais.",
        "isCorrect": false
      },
      {
        "text": "A especificação da linguagem eliminou completamente o Garbage Collector.",
        "isCorrect": false
      }
    ],
    "explanation": "A plataforma Java tem como princípio cardeal a retrocompatibilidade binária: bytecodes mais antigos continuam executando em JVMs mais recentes sem necessidade de recompilação."
  },
  {
    "id": "jv-q-7-2",
    "patternId": "jv-cap-7",
    "category": "modern-lts",
    "difficulty": "medio",
    "question": "Questão 7.2: Qual a recomendação oficial de engenharia para o recurso abordado no Capítulo 7?",
    "options": [
      {
        "text": "Utilizar as APIs e padrões modernos aproveitando abstrações seguras e compiladas pelo JIT/AOT.",
        "isCorrect": true
      },
      {
        "text": "Evitar qualquer atualização e manter bibliotecas permanentemente no Java 1.4.",
        "isCorrect": false
      },
      {
        "text": "Desabilitar o compilador JIT e rodar apenas em modo interpretado.",
        "isCorrect": false
      },
      {
        "text": "Criar pools de Virtual Threads com capacidade fixa pequena.",
        "isCorrect": false
      }
    ],
    "explanation": "A evolução arquitetural do Java visa maximizar a legibilidade, segurança de tipos em compilação e performance adaptativa no runtime."
  },
  {
    "id": "jv-q-8-1",
    "patternId": "jv-cap-8",
    "category": "modern-lts",
    "difficulty": "facil",
    "question": "Questão 8.1: Em relação aos recursos e retrocompatibilidade do Capítulo 8 (Java 18 to 21 (LTS): Virtual Threads (Loom), Pattern Matching & Sequenced Collections), qual afirmação é tecnicamente correta?",
    "options": [
      {
        "text": "A JVM preservou compatibilidade binária permitindo execução direta de bytecodes anteriores.",
        "isCorrect": true
      },
      {
        "text": "Todas as aplicações foram obrigadas a ser totalmente reescritas devido à perda de retrocompatibilidade.",
        "isCorrect": false
      },
      {
        "text": "O compilador javac deixou de gerar arquivos .class convencionais.",
        "isCorrect": false
      },
      {
        "text": "A especificação da linguagem eliminou completamente o Garbage Collector.",
        "isCorrect": false
      }
    ],
    "explanation": "A plataforma Java tem como princípio cardeal a retrocompatibilidade binária: bytecodes mais antigos continuam executando em JVMs mais recentes sem necessidade de recompilação."
  },
  {
    "id": "jv-q-8-2",
    "patternId": "jv-cap-8",
    "category": "modern-lts",
    "difficulty": "medio",
    "question": "Questão 8.2: Qual a recomendação oficial de engenharia para o recurso abordado no Capítulo 8?",
    "options": [
      {
        "text": "Utilizar as APIs e padrões modernos aproveitando abstrações seguras e compiladas pelo JIT/AOT.",
        "isCorrect": true
      },
      {
        "text": "Evitar qualquer atualização e manter bibliotecas permanentemente no Java 1.4.",
        "isCorrect": false
      },
      {
        "text": "Desabilitar o compilador JIT e rodar apenas em modo interpretado.",
        "isCorrect": false
      },
      {
        "text": "Criar pools de Virtual Threads com capacidade fixa pequena.",
        "isCorrect": false
      }
    ],
    "explanation": "A evolução arquitetural do Java visa maximizar a legibilidade, segurança de tipos em compilação e performance adaptativa no runtime."
  },
  {
    "id": "jv-q-9-1",
    "patternId": "jv-cap-9",
    "category": "modern-lts",
    "difficulty": "facil",
    "question": "Questão 9.1: Em relação aos recursos e retrocompatibilidade do Capítulo 9 (Java 22 to 25 (LTS): Foreign Function & Memory (Panama), Stream Gatherers & Scoped Values), qual afirmação é tecnicamente correta?",
    "options": [
      {
        "text": "A JVM preservou compatibilidade binária permitindo execução direta de bytecodes anteriores.",
        "isCorrect": true
      },
      {
        "text": "Todas as aplicações foram obrigadas a ser totalmente reescritas devido à perda de retrocompatibilidade.",
        "isCorrect": false
      },
      {
        "text": "O compilador javac deixou de gerar arquivos .class convencionais.",
        "isCorrect": false
      },
      {
        "text": "A especificação da linguagem eliminou completamente o Garbage Collector.",
        "isCorrect": false
      }
    ],
    "explanation": "A plataforma Java tem como princípio cardeal a retrocompatibilidade binária: bytecodes mais antigos continuam executando em JVMs mais recentes sem necessidade de recompilação."
  },
  {
    "id": "jv-q-9-2",
    "patternId": "jv-cap-9",
    "category": "modern-lts",
    "difficulty": "medio",
    "question": "Questão 9.2: Qual a recomendação oficial de engenharia para o recurso abordado no Capítulo 9?",
    "options": [
      {
        "text": "Utilizar as APIs e padrões modernos aproveitando abstrações seguras e compiladas pelo JIT/AOT.",
        "isCorrect": true
      },
      {
        "text": "Evitar qualquer atualização e manter bibliotecas permanentemente no Java 1.4.",
        "isCorrect": false
      },
      {
        "text": "Desabilitar o compilador JIT e rodar apenas em modo interpretado.",
        "isCorrect": false
      },
      {
        "text": "Criar pools de Virtual Threads com capacidade fixa pequena.",
        "isCorrect": false
      }
    ],
    "explanation": "A evolução arquitetural do Java visa maximizar a legibilidade, segurança de tipos em compilação e performance adaptativa no runtime."
  },
  {
    "id": "jv-q-10-1",
    "patternId": "jv-cap-10",
    "category": "frameworks-ecosystem",
    "difficulty": "facil",
    "question": "Questão 10.1: Em relação aos recursos e retrocompatibilidade do Capítulo 10 (Spring Boot (1.x to 3.x): Versions History, Auto-Configuration, WebFlux & Virtual Threads), qual afirmação é tecnicamente correta?",
    "options": [
      {
        "text": "A JVM preservou compatibilidade binária permitindo execução direta de bytecodes anteriores.",
        "isCorrect": true
      },
      {
        "text": "Todas as aplicações foram obrigadas a ser totalmente reescritas devido à perda de retrocompatibilidade.",
        "isCorrect": false
      },
      {
        "text": "O compilador javac deixou de gerar arquivos .class convencionais.",
        "isCorrect": false
      },
      {
        "text": "A especificação da linguagem eliminou completamente o Garbage Collector.",
        "isCorrect": false
      }
    ],
    "explanation": "A plataforma Java tem como princípio cardeal a retrocompatibilidade binária: bytecodes mais antigos continuam executando em JVMs mais recentes sem necessidade de recompilação."
  },
  {
    "id": "jv-q-10-2",
    "patternId": "jv-cap-10",
    "category": "frameworks-ecosystem",
    "difficulty": "medio",
    "question": "Questão 10.2: Qual a recomendação oficial de engenharia para o recurso abordado no Capítulo 10?",
    "options": [
      {
        "text": "Utilizar as APIs e padrões modernos aproveitando abstrações seguras e compiladas pelo JIT/AOT.",
        "isCorrect": true
      },
      {
        "text": "Evitar qualquer atualização e manter bibliotecas permanentemente no Java 1.4.",
        "isCorrect": false
      },
      {
        "text": "Desabilitar o compilador JIT e rodar apenas em modo interpretado.",
        "isCorrect": false
      },
      {
        "text": "Criar pools de Virtual Threads com capacidade fixa pequena.",
        "isCorrect": false
      }
    ],
    "explanation": "A evolução arquitetural do Java visa maximizar a legibilidade, segurança de tipos em compilação e performance adaptativa no runtime."
  },
  {
    "id": "jv-q-11-1",
    "patternId": "jv-cap-11",
    "category": "frameworks-ecosystem",
    "difficulty": "facil",
    "question": "Questão 11.1: Em relação aos recursos e retrocompatibilidade do Capítulo 11 (Quarkus (1.x to 3.x): Build-Time Architecture, Mutiny, Dev Services & GraalVM Native), qual afirmação é tecnicamente correta?",
    "options": [
      {
        "text": "A JVM preservou compatibilidade binária permitindo execução direta de bytecodes anteriores.",
        "isCorrect": true
      },
      {
        "text": "Todas as aplicações foram obrigadas a ser totalmente reescritas devido à perda de retrocompatibilidade.",
        "isCorrect": false
      },
      {
        "text": "O compilador javac deixou de gerar arquivos .class convencionais.",
        "isCorrect": false
      },
      {
        "text": "A especificação da linguagem eliminou completamente o Garbage Collector.",
        "isCorrect": false
      }
    ],
    "explanation": "A plataforma Java tem como princípio cardeal a retrocompatibilidade binária: bytecodes mais antigos continuam executando em JVMs mais recentes sem necessidade de recompilação."
  },
  {
    "id": "jv-q-11-2",
    "patternId": "jv-cap-11",
    "category": "frameworks-ecosystem",
    "difficulty": "medio",
    "question": "Questão 11.2: Qual a recomendação oficial de engenharia para o recurso abordado no Capítulo 11?",
    "options": [
      {
        "text": "Utilizar as APIs e padrões modernos aproveitando abstrações seguras e compiladas pelo JIT/AOT.",
        "isCorrect": true
      },
      {
        "text": "Evitar qualquer atualização e manter bibliotecas permanentemente no Java 1.4.",
        "isCorrect": false
      },
      {
        "text": "Desabilitar o compilador JIT e rodar apenas em modo interpretado.",
        "isCorrect": false
      },
      {
        "text": "Criar pools de Virtual Threads com capacidade fixa pequena.",
        "isCorrect": false
      }
    ],
    "explanation": "A evolução arquitetural do Java visa maximizar a legibilidade, segurança de tipos em compilação e performance adaptativa no runtime."
  },
  {
    "id": "jv-q-12-1",
    "patternId": "jv-cap-12",
    "category": "frameworks-ecosystem",
    "difficulty": "facil",
    "question": "Questão 12.1: Em relação aos recursos e retrocompatibilidade do Capítulo 12 (Jakarta EE (J2EE to 11), Micronaut (1.x to 4.x) & GraalVM / Project Leyden), qual afirmação é tecnicamente correta?",
    "options": [
      {
        "text": "A JVM preservou compatibilidade binária permitindo execução direta de bytecodes anteriores.",
        "isCorrect": true
      },
      {
        "text": "Todas as aplicações foram obrigadas a ser totalmente reescritas devido à perda de retrocompatibilidade.",
        "isCorrect": false
      },
      {
        "text": "O compilador javac deixou de gerar arquivos .class convencionais.",
        "isCorrect": false
      },
      {
        "text": "A especificação da linguagem eliminou completamente o Garbage Collector.",
        "isCorrect": false
      }
    ],
    "explanation": "A plataforma Java tem como princípio cardeal a retrocompatibilidade binária: bytecodes mais antigos continuam executando em JVMs mais recentes sem necessidade de recompilação."
  },
  {
    "id": "jv-q-12-2",
    "patternId": "jv-cap-12",
    "category": "frameworks-ecosystem",
    "difficulty": "medio",
    "question": "Questão 12.2: Qual a recomendação oficial de engenharia para o recurso abordado no Capítulo 12?",
    "options": [
      {
        "text": "Utilizar as APIs e padrões modernos aproveitando abstrações seguras e compiladas pelo JIT/AOT.",
        "isCorrect": true
      },
      {
        "text": "Evitar qualquer atualização e manter bibliotecas permanentemente no Java 1.4.",
        "isCorrect": false
      },
      {
        "text": "Desabilitar o compilador JIT e rodar apenas em modo interpretado.",
        "isCorrect": false
      },
      {
        "text": "Criar pools de Virtual Threads com capacidade fixa pequena.",
        "isCorrect": false
      }
    ],
    "explanation": "A evolução arquitetural do Java visa maximizar a legibilidade, segurança de tipos em compilação e performance adaptativa no runtime."
  }
];
export const javaScenariosData = [
  {
    "id": "jv-scen-1",
    "title": "Cenário 1: Escalabilidade de Conexões em Microsserviço de Pagamento",
    "patternId": "jv-cap-8",
    "context": "Seu gateway de pagamento recebe 40.000 requisições simultâneas. Cada requisição faz 2 chamadas HTTP bloqueantes para bandeiras de cartão e 1 INSERT JDBC. As 200 threads do pool do Tomcat esgotaram e a CPU permanece em apenas 18%.",
    "question": "Qual arquitetura Java 21 resolve o gargalo de concorrência sem exigir reescrita para programação reativa?",
    "options": [
      {
        "text": "Habilitar Virtual Threads (Project Loom) no Spring Boot 3 ou Quarkus 3, liberando as threads de SO durante esperas de I/O.",
        "isCorrect": true
      },
      {
        "text": "Aumentar o pool de threads do SO para 50.000 threads nativas no Linux.",
        "isCorrect": false
      },
      {
        "text": "Voltar para o Java 8 com Servlets síncronos legados.",
        "isCorrect": false
      },
      {
        "text": "Usar ThreadLocal estático para guardar todas as conexões.",
        "isCorrect": false
      }
    ],
    "explanation": "Virtual Threads (Java 21) têm custo ínfimo de memória (~poucos KB) e são desmontadas da Carrier Thread do SO quando bloqueiam em socket/JDBC, permitindo escalar para centenas de milhares de conexões mantendo código síncrono simples."
  },
  {
    "id": "jv-scen-2",
    "title": "Cenário 2: Migração Crítica de Spring Boot 2.7 para Spring Boot 3.4",
    "patternId": "jv-cap-10",
    "context": "Uma aplicação corporativa precisa ser atualizada para suportar Java 21. Ao alterar o pom.xml para Spring Boot 3.4, classes de controllers e entidades JPA não compilam com erro 'package javax.persistence does not exist'.",
    "question": "Qual foi a causa raiz e a correção arquitetural necessária para a migração?",
    "options": [
      {
        "text": "A transição da especificação Java EE para Jakarta EE 10 alterou os namespaces de javax.* para jakarta.*, exigindo atualização dos imports e dependências.",
        "isCorrect": true
      },
      {
        "text": "O Spring Boot 3 removeu totalmente o suporte ao Hibernate e JPA.",
        "isCorrect": false
      },
      {
        "text": "A JVM desabilitou anotações no código Java.",
        "isCorrect": false
      },
      {
        "text": "É necessário compilar com -source 1.8 para manter javax ativo.",
        "isCorrect": false
      }
    ],
    "explanation": "Com a doação do Java EE para a Eclipse Foundation, a Oracle manteve a marca 'Java', exigindo que Jakarta EE 9+ migrasse todas as APIs para o namespace 'jakarta.*' (ex: jakarta.persistence, jakarta.servlet)."
  },
  {
    "id": "jv-scen-3",
    "title": "Cenário 3: Inicialização Instantânea Serverless em Kubernetes",
    "patternId": "jv-cap-11",
    "context": "Uma função Serverless em nuvem precisa subir sob demanda mediante eventos de mensageria. A inicialização tradicional da JVM HotSpot leva 4 segundos (cold start inaceitável).",
    "question": "Qual tecnologia do ecossistema Quarkus / GraalVM soluciona o tempo de inicialização?",
    "options": [
      {
        "text": "Compilação Nativa AOT (Ahead-of-Time) com Quarkus e GraalVM Native Image, iniciando em ~0.02s com menos de 30 MB de RAM.",
        "isCorrect": true
      },
      {
        "text": "Executar o JAR tradicional com -Xint (modo exclusivamente interpretado).",
        "isCorrect": false
      },
      {
        "text": "Aumentar o heap para 16 GB com -Xms16g.",
        "isCorrect": false
      },
      {
        "text": "Usar ClassLoader customizado que recarrega classes a cada requisição.",
        "isCorrect": false
      }
    ],
    "explanation": "Quarkus elimina reflexão em runtime e realiza toda a análise de injeção de dependência em tempo de compilação, viabilizando binários nativos GraalVM com inicialização instantânea subssegundo."
  },
  {
    "id": "jv-scen-4",
    "title": "Cenário 4: Modelagem Imutável de Eventos Financeiros com Exaustividade",
    "patternId": "jv-cap-7",
    "context": "Um motor de compensação financeira precisa representar transações (Pix, TED, Boleto, Cartao) com garantia estrita de que nenhum desenvolvedor esquecerá de tratar um novo tipo em regras de liquidação.",
    "question": "Como modelar o domínio usando os recursos introduzidos no Java 17 LTS?",
    "options": [
      {
        "text": "Declarar 'sealed interface Transacao permits Pix, Ted, Boleto, Cartao' e desestruturar em switch expressions sem cláusula default.",
        "isCorrect": true
      },
      {
        "text": "Criar uma classe abstrata aberta com getters mutáveis e switch com default vazio.",
        "isCorrect": false
      },
      {
        "text": "Usar cadeias de if/else com casts manuais (ClassCastException).",
        "isCorrect": false
      },
      {
        "text": "Usar enums com campos estáticos mutáveis.",
        "isCorrect": false
      }
    ],
    "explanation": "Sealed Interfaces fecham a hierarquia para subtipos conhecidos. O compilador Java verifica a exaustividade no switch; se um novo tipo for adicionado, o código não compila até que todos os locais o tratem."
  }
];
export const javaPracticalExercisesData = [
  {
    "id": "jv-prac-1",
    "title": "Desafio 1: Refatoração de POJO Legado para Records & Sealed Classes",
    "category": "modern-lts",
    "difficulty": "medio",
    "targetPatterns": [
      "jv-cap-7",
      "jv-cap-8"
    ],
    "scenario": "Refatore uma classe mutável verbosa de DTO bancário para um Record imutável com construtor compacto de validação e integre a uma hierarquia selada.",
    "steps": [
      "Substitua a classe POJO por um 'public record Transferencia(String origem, String destino, double valor)'.",
      "Implemente o construtor compacto validando que o valor seja estritamente positivo e as contas não sejam nulas.",
      "Crie uma Sealed Interface 'ResultadoTransacao' permitindo 'Sucesso' e 'Falha'."
    ],
    "starterCode": "public class TransferenciaLegada {\n  private String origem;\n  private String destino;\n  private double valor;\n\n  public TransferenciaLegada(String origem, String destino, double valor) {\n    this.origem = origem;\n    this.destino = destino;\n    this.valor = valor;\n  }\n\n  public String getOrigem() { return origem; }\n  public String getDestino() { return destino; }\n  public double getValor() { return valor; }\n}",
    "hints": [
      "Records declaram seus componentes diretamente no cabeçalho: record Transferencia(String origem, String destino, double valor) { }.",
      "O construtor compacto não repete os parâmetros: 'public Transferencia { if (valor <= 0) throw new IllegalArgumentException(...); }'."
    ],
    "referenceSolution": "public record Transferencia(String origem, String destino, double valor) {\n  public Transferencia {\n    if (origem == null || destino == null) {\n      throw new IllegalArgumentException(\"Contas de origem e destino sao obrigatorias\");\n    }\n    if (valor <= 0) {\n      throw new IllegalArgumentException(\"Valor da transferencia deve ser positivo\");\n    }\n  }\n}\n\npublic sealed interface ResultadoTransacao permits Sucesso, Falha {}\npublic record Sucesso(String idTransacao) implements ResultadoTransacao {}\npublic record Falha(String motivo) implements ResultadoTransacao {}"
  },
  {
    "id": "jv-prac-2",
    "title": "Desafio 2: Execução Massiva com Virtual Threads (Java 21)",
    "category": "modern-lts",
    "difficulty": "facil",
    "targetPatterns": [
      "jv-cap-8"
    ],
    "scenario": "Crie um despachante de tarefas concorrentes utilizando o executor de Virtual Threads do Java 21, coletando métricas sem esgotar threads do sistema operacional.",
    "steps": [
      "Use 'Executors.newVirtualThreadPerTaskExecutor()' dentro de um bloco try-with-resources.",
      "Submeta 10.000 tarefas concorrentes simulando chamadas remotas de 100 ms com Thread.sleep.",
      "Garanta que o executor aguarde o término ordenado de todas as tarefas."
    ],
    "starterCode": "import java.util.concurrent.ExecutorService;\nimport java.util.concurrent.Executors;\n\npublic class Despachante {\n  public static void main(String[] args) {\n    // TODO: Criar executor de Virtual Threads e submeter 10.000 tarefas\n  }\n}",
    "hints": [
      "No Java 21, ExecutorService implementa AutoCloseable: fechar o try aguarda a conclusão de todas as tarefas submetidas.",
      "Use 'Executors.newVirtualThreadPerTaskExecutor()' para instanciar threads leves sob demanda."
    ],
    "referenceSolution": "import java.util.concurrent.Executors;\nimport java.time.Duration;\n\npublic class Despachante {\n  public static void main(String[] args) {\n    long inicio = System.currentTimeMillis();\n    try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {\n      for (int i = 0; i < 10_000; i++) {\n        final int id = i;\n        executor.submit(() -> {\n          Thread.sleep(Duration.ofMillis(100));\n          return id;\n        });\n      }\n    } // O fechamento do try aguarda todas as 10.000 Virtual Threads terminarem!\n    System.out.println(\"10.000 tarefas concluidas em: \" + (System.currentTimeMillis() - inicio) + \" ms\");\n  }\n}"
  }
];
