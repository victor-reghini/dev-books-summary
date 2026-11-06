/**
 * Dados e conteúdos completos sobre o livro clássico:
 * "Código Limpo: Habilidades Práticas do Agile Software"
 * (Clean Code: A Handbook of Agile Software Craftsmanship • Robert C. Martin)
 */

import { smellsCatalog } from "./part4-casestudies.js";

export { smellsCatalog };

export const cleanCodeOverview = {
  title: "Código Limpo",
  subtitle: "Habilidades Práticas do Agile Software",
  originalTitle: "Clean Code: A Handbook of Agile Software Craftsmanship",
  publicationYear: 2008,
  editionPt: "Alta Books (2009 / Edição Revisada)",
  authors: [
    {
      name: "Robert C. Martin (Uncle Bob)",
      bio: "Engenheiro de software desde 1970, coautor do Manifesto Ágil (2001), criador dos princípios SOLID e fundador da Object Mentor e Clean Coders.",
      avatar: "RM"
    },
    {
      name: "Michael C. Feathers",
      bio: "Autor de 'Working Effectively with Legacy Code' e coautor do Capítulo 7 (Tratamento de Erros) de Clean Code.",
      avatar: "MF"
    },
    {
      name: "Timothy R. Ottinger & Jeff Langr",
      bio: "Coautores dos capítulos sobre Nomes Significativos (Cap. 2), Formatação (Cap. 5) e Testes Limpos (Cap. 9).",
      avatar: "OL"
    },
    {
      name: "Brett L. Schuchert & Kevin Dean Wampler",
      bio: "Especialistas em Concorrência (Cap. 13) e Programação Orientada a Aspectos / Objetos e Estruturas de Dados (Cap. 6 e 11).",
      avatar: "SW"
    }
  ],
  forewordBy: "James O. Coplien (Pioneiro de Padrões Organizacionais e C++, autor do Prefácio sobre 5S e TPM)",
  inspiration: "Kent Beck (Extreme Programming & 4 Regras de Design Simples), Martin Fowler (Refactoring) e Ward Cunningham",
  corePrinciples: [
    {
      id: "boy-scout-rule",
      title: "1. A Regra do Escoteiro (The Boy Scout Rule) & Proporção 10:1",
      original: "Leave the campground cleaner than you found it",
      summary: "Não basta escrever o código bem uma única vez: o código precisa ser mantido limpo ao longo do tempo para evitar a degradação progressiva (apodrecimento). Como a proporção de tempo gasta lendo versus escrevendo código novo supera 10 para 1, tornar a leitura imediata é a única maneira real de manter a velocidade de entrega alta.",
      benefits: [
        "Impede a queda assintótica de produtividade ('wading' / patinar na lama) que paralisa equipes após alguns meses.",
        "Elimina a necessidade de 'Tiger Teams' e grandes reescritas do zero que duram anos.",
        "Cada commit melhora nomes, extrai uma função longa ou elimina uma duplicação sem exigir permissões especiais."
      ],
      badPractice: "double r = o.items.get(i).p * 1.18; // TODO: limpar depois (Lei de LeBlanc: depois = nunca)",
      goodPractice: "double totalWithTax = item.getPrice() * ELECTRONICS_TAX_RATE; // Limpo no ato da leitura"
    },
    {
      id: "srp-and-stepdown",
      title: "2. Responsabilidade Única (SRP), Uma Coisa Só e Regra Decrescente",
      original: "Functions should do one thing. Classes should have only one reason to change.",
      summary: "Funções devem ser curtas, fazer apenas uma coisa e manter todas as suas instruções em um único nível de abstração abaixo do próprio nome, permitindo que o arquivo seja lido de cima para baixo como um artigo de jornal (Stepdown Rule). Classes também devem ser pequenas, medidas não por linhas, mas pelo número de responsabilidades (motivos para mudar).",
      benefits: [
        "Leitura narrativa previsível: o topo apresenta o resumo público e os métodos privados detalham cada passo logo abaixo de quem os chama.",
        "Alta coesão: quando funções grandes são quebradas, variáveis de instância agrupadas revelam fronteiras naturais para extrair classes coesas.",
        "Baixo acoplamento e conformidade com OCP e DIP: novas features entram estendendo classes polimórficas em vez de editar switches gigantes."
      ],
      badPractice: "public Money calculatePay(Employee e) { switch (e.type) { case HOURLY: ... } } // Viola SRP e OCP",
      goodPractice: "public abstract class Employee { public abstract Money calculatePay(); } // Polimorfismo + Factory"
    }
  ],
  fiveSPhilosophy: [
    {
      japanese: "Seiri",
      pt: "Organização (Sort)",
      description: "Saber exatamente onde as coisas estão e descartar o que é inútil • aplicando nomes que revelam intenção (Cap. 2) e removendo código morto [G9] e comentado [C5]."
    },
    {
      japanese: "Seiton",
      pt: "Ordem (Systematize)",
      description: "Um lugar para cada pedaço de código e cada pedaço de código em seu lugar • distância vertical, afinidade conceitual (Cap. 5) e colocação onde o leitor espera [G17]."
    },
    {
      japanese: "Seiso",
      pt: "Limpeza (Shine)",
      description: "Manter a área de trabalho livre de fios soltos, resíduos e comentários mentirosos ou obsoletos [C1–C5] (Cap. 4)."
    },
    {
      japanese: "Seiketsu",
      pt: "Padronização (Standardize)",
      description: "A equipe concorda sobre convenções consistentes de estilo, formatação e arquitetura [G24], fazendo todo o sistema parecer escrito por uma só mente."
    },
    {
      japanese: "Shutsuke",
      pt: "Autodisciplina (Sustain)",
      description: "Ter a disciplina diária de seguir as práticas (3 Leis do TDD, Regra do Escoteiro e Refinamento Sucessivo) e refletir constantemente sobre o próprio trabalho."
    }
  ],
  beckSimpleDesignRules: [
    {
      priority: 1,
      rule: "Executa Todos os Testes (Runs All the Tests)",
      impact: "Força o desacoplamento: para ser totalmente testável, o sistema precisa obrigatoriamente usar classes pequenas (SRP), interfaces, Injeção de Dependência (DIP) e baixo acoplamento."
    },
    {
      priority: 2,
      rule: "Não Contém Duplicação (Contains No Duplication - DRY)",
      impact: "Duplicação é o inimigo primário de um sistema bem projetado [G5]. Extrair métodos comuns, aplicar Template Method ou Strategy elimina trabalho triplicado e pontos de falha."
    },
    {
      priority: 3,
      rule: "Expressa a Intenção do Programador (Expresses the Intent)",
      impact: "Qualquer desenvolvedor que mantenha o código deve compreendê-lo rapidamente: escolha bons nomes [N1], mantenha funções pequenas [G30], use nomes de Design Patterns [N3] e escreva testes F.I.R.S.T. legíveis."
    },
    {
      priority: 4,
      rule: "Minimiza o Número de Classes e Métodos (Minimizes Classes and Methods)",
      impact: "A regra de menor prioridade atua como freio contra o dogmatismo: evite criar interfaces vazias ou classes burocráticas quando não há ganho real de expressividade ou testes."
    }
  ],
  caseStudiesSummary: {
    title: "Os 3 Estudos de Caso de Refatoração (Capítulos 14, 15 e 16)",
    description: "Nos capítulos finais, Robert C. Martin demonstra o artesanato de software em código real: o utilitário de linha de comando Args, o módulo ComparisonCompactor do JUnit e a biblioteca pública SerialDate.",
    studies: [
      {
        id: "args",
        chapter: "Capítulo 14",
        name: "Parser de Linha de Comando Args (Refinamento Sucessivo)",
        problem: "O rascunho inicial funcionava apenas para booleanos, mas ao adicionar Strings e Integers cresceu para dezenas de métodos duplicados e 3 HashMaps paralelos (booleanArgs, stringArgs, intArgs).",
        solution: "Refinamento incremental guiado por TDD: substituição dos mapas paralelos pela interface polimórfica ArgumentMarshaler (Map<Character, ArgumentMarshaler>), uso de Iterator<String> e isolamento completo de ArgsException.",
        smellsFixed: ["G5 (Duplicação)", "G23 (Switch -> Polimorfismo)", "G30 (Uma Coisa Só)"]
      },
      {
        id: "junit-compactor",
        chapter: "Capítulo 15",
        name: "Internals do JUnit: ComparisonCompactor (Kent Beck & Erich Gamma)",
        problem: "Embora excelente e 100% testado, o módulo usava prefixos f (fExpected), tinha uma condicional negativa composta, escondia acoplamento temporal entre findCommonPrefix() e findCommonSuffix() e usava índice de sufixo baseado em 1 (+1/-1 espalhados).",
        solution: "Aplicação da Regra do Escoteiro: remoção de prefixos [N6], extração de shouldBeCompacted() [G28, G29], renomeação para formatCompactedComparison() [N7], unificação em findCommonPrefixAndSuffix() [G31] e mudança para suffixLength base 0 [G33].",
        smellsFixed: ["N6 (Prefixos)", "G28/G29 (Condicionais)", "G31 (Acoplamento Temporal)", "G33 (Contorno)"]
      },
      {
        id: "serial-date",
        chapter: "Capítulo 16",
        name: "Biblioteca JCommon: De SerialDate para DayDate",
        problem: "Cobertura de testes inicial de apenas ~50% escondia bugs nas condições de contorno. A classe abstrata SerialDate dependia de sua derivada SpreadsheetDate, herdava interfaces de constantes int e tinha métodos estáticos ambíguos como addDays().",
        solution: "1º Faça Funcionar: elevação da cobertura para 92% e correção dos bugs de fronteira. 2º Faça Certo: renomeação para DayDate [N2], extração de DayDateFactory [G7], substituição de constantes int pelos Enums Month, Day e DateInterval [J2, J3] e métodos de instância plusDays() com variáveis explicativas [G18, G19, G20].",
        smellsFixed: ["G3/T5 (Fronteiras)", "G7 (Base -> Derivada)", "J2/J3 (Enums)", "G14 (Feature Envy)"]
      }
    ]
  },
  smellsCatalog
};
