# Guia de Criação de Novos Livros • DevBooks (Tutorial para Agentes de IA)

Este documento é a especificação canônica e o guia passo a passo para agentes de IA (e desenvolvedores) que forem incluir um novo livro resumido na plataforma **DevBooks**.

Qualquer novo livro adicionado à plataforma deve seguir rigorosamente os mesmos moldes arquiteturais, visuais, pedagógicos e de internacionalização dos dois livros de referência já existentes:
1. **Padrões de Projeto (Design Patterns • Gang of Four)** em `books/design-patterns/`
2. **Código Limpo (Clean Code • Robert C. Martin)** em `books/clean-code/`

---

## 1. Filosofia Pedagógica e Missão

- **Não é transcrição de livro**: O DevBooks nunca deve transcrever textos integrais ou copiar páginas de livros. O objetivo é criar uma **sala de aula interativa** (modelo W3Schools + Protocol Explorer).
- **Abordagem Visual First**: Cada capítulo ou conceito principal deve ter diagramas interativos, fluxogramas animados de mensagens e execução, gráficos visuais e comparativos de código.
- **Prática Imediata**: Toda unidade didática possui autoavaliação (quizzes, cenários fictícios aplicados e desafios práticos).
- **Multilíngue por Padrão**: Todo o conteúdo novo precisa suportar os 5 idiomas da plataforma: **Português (PT)**, **Inglês (EN)**, **Espanhol (ES)**, **Italiano (IT)** e **Francês (FR)**.

---

## 2. Estrutura Obrigatória de Pastas por Livro

Todo livro reside em sua própria pasta em `books/<book-slug>/` com exatamente 3 subpastas e um ponto de entrada `index.js`:

```text
books/<book-slug>/
├── explanations/               # Teoria, catálogo de capítulos/conceitos e metadados
│   ├── book-overview.js        # Autores, prefácio, visão geral e princípios nucleares
│   ├── chapters-data.js        # Catálogo estruturado de todos os capítulos
│   └── index.js
├── examples/                   # Animações interativas SVG, laboratórios e código
│   ├── <slug>-animations.js    # Especificação dos fluxogramas animados de 5 etapas
│   ├── <slug>-labs.js          # Laboratórios gráficos interativos e simuladores
│   └── index.js                # Código comparativo multi-linguagem (Antes vs. Depois)
├── exercises/                  # Quizzes de fixação, cenários e prática mão na massa
│   ├── <slug>-quizzes.js       # Banco completo de questões e cenários de arquitetura
│   └── index.js
└── index.js                    # Manifesto central exportador do livro
```

---

## 3. Especificação de Dados por Capítulo (`chapters-data.js`)

Cada capítulo (ou padrão) deve ser exportado com o seguinte formato de objeto:

```javascript
{
  id: "cap-1",                    // ID único em kebab-case
  number: 1,                      // Número sequencial do capítulo
  code: "C01",                    // Código de identificação (ex: C01, DP01)
  name: "Clean Code",             // Nome do capítulo em inglês/original
  ptName: "Código Limpo",         // Nome do capítulo em português
  category: "criacional",         // "criacional" | "estrutural" | "comportamental" | "estudos-de-caso"
  scope: "profissionalismo",      // Âmbito ou tema principal em 1 palavra
  gofPage: 1,                     // Página de referência no livro impresso
  playgroundId: "lab-cap-1",      // ID do laboratório interativo associado
  aliases: ["Regra do Escoteiro", "Lei de LeBlanc", "Filosofia 5S"],

  // 1. Tese Central / Intenção (1 frase assertiva)
  intent: "A única forma de andar rápido e cumprir prazos de forma sustentável é manter o código limpo o tempo todo.",

  // 2. Problema no Mundo Real & Sintomas de Código Ruim
  problemAndMotivation: "Quando equipes correm sem qualidade, cada entrega adiciona impedimentos (wading). A velocidade cai para zero e surge a armadilha do redesign catastrófico.",

  // 3. Solução Arquitetural & Disciplina
  solution: "Adotar a Regra do Escoteiro: deixe o acampamento mais limpo de como o encontrou. Tratar o código limpo como higiene profissional inegociável.",

  // 4. Estrutura & Participantes
  structure: {
    participants: [
      { name: "BoyScoutDeveloper", role: "Aplica micro-limpezas no código que acabou de alterar." },
      { name: "SafetyNetSuite", role: "Testes unitários automatizados que garantem zero regressões." }
    ],
    collaborations: "O desenvolvedor inspeciona o módulo, aplica a refatoração e a suíte valida o comportamento."
  },

  // 5. Aplicabilidade & Pragmatismo
  applicability: [
    "Revisões diárias de Pull Requests mantendo velocidade sustentável.",
    "Prevenção do acúmulo de débito técnico em sistemas legados.",
    "CUIDADO: Não aplique refatorações sem antes construir testes de proteção."
  ],

  // 6. Consequências & Trade-offs
  consequences: {
    pros: [
      "Velocidade constante do time ao longo dos anos.",
      "Mínimo risco de regressões ocultas.",
      "Elimina a necessidade de reescritas do zero."
    ],
    cons: [
      "Exige disciplina diária contínua e alinhamento da equipe.",
      "Requer investimento inicial na construção de testes confiáveis."
    ]
  },

  // 7. Usos Reais na Indústria
  realWorldUses: [
    "Prática padrão na cultura de engenharia do Google e Netflix.",
    "Sistemas de integração contínua (CI) bloqueando PRs sem testes."
  ],

  // 8. Códigos Comparativos Multi-Linguagem
  codeExamples: {
    dirty: `// Código Sujo (Antes / Anti-Pattern)\nfunction calc(o, t) { return o.p * 1.18; }`,
    java: `// Java Limpo (Depois)\npublic double calculateTotalWithTax(Order order) { return order.getPrice() * TAX_RATE; }`,
    typescript: `// TypeScript Clean\nexport function calculateOrderTotal(order: Order): number { return order.price * TAX_RATE; }`,
    python: `// Python Clean\ndef calculate_order_total(order: Order) -> float:\n    return order.price * TAX_RATE`
  }
}
```

---

## 4. Especificação de Fluxogramas e Animações (`<slug>-animations.js`)

Toda animação interativa passo a passo utiliza o motor `pattern-visualizer.js` (estilo Protocol Explorer) com SVG animado, Call Stack e Inspetor de Memória JSON em tempo real.

### Formato Obrigatório:
- **Nós (Participantes)**: 4 a 6 nós posicionados em coordenadas SVG (Canvas 880x350).
- **Conexões (Links)**: Arestas direcionadas (`from`, `to`, `label`, `dashed: true/false`).
- **5 Etapas Sequenciais**: Cada animação deve conter exatamente 5 etapas ilustrando a colaboração dinâmica.

```javascript
export const myBookAnimations = {
  "cap-1": {
    code: "C01",
    layerIndex: 1,
    scopeType: "OBJECT",
    nodes: [
      { id: "Client", label: "ClientModule", stereo: "«caller»", x: 130, y: 100, addr: "0x1010", color: "blue" },
      { id: "Service", label: "CleanService", stereo: "«service»", x: 440, y: 100, addr: "0x2020", color: "emerald" },
      { id: "Repo", label: "DataRepository", stereo: "«storage»", x: 750, y: 100, addr: "0x3030", color: "violet" }
    ],
    links: [
      { from: "Client", to: "Service", label: "1. invoke()" },
      { from: "Service", to: "Repo", label: "2. query()" }
    ],
    steps: [
      {
        id: 1,
        title: "Cliente envia requisição para a camada de serviço",
        narration: "O ClientModule invoca a abstração desacoplada sem conhecer a persistência interna.",
        from: "Client",
        to: "Service",
        call: "executeBusinessLogic()",
        returnVal: "ResultObject",
        activeNodes: ["Client", "Service"],
        stack: ["ClientModule.run()", "CleanService.execute()"],
        state: { status: "PROCESSING", memoryUsage: "Low", cacheHit: true }
      }
      // Mais 4 etapas completando o ciclo de 5 passos
    ]
  }
};
```

---

## 5. Especificação de Exercícios e Quizzes (`<slug>-quizzes.js`)

Cada capítulo deve fornecer pelo menos:
1. **2 Quizzes de Fixação Conceitual** (múltipla escolha com 4 opções e explicação pedagógica detalhada).
2. **1 Cenário Fictício de Arquitetura Aplicado** (contexto de problema de empresa fictícia, restrições e alternativas de decisão).
3. **1 Desafio Prático Mão na Massa** (código problemático para o desenvolvedor analisar e refatorar).

### Estrutura do Quiz:
```javascript
{
  id: "q-cap1-1",
  patternId: "cap-1",
  category: "criacional",
  difficulty: "facil",           // "facil" | "medio" | "dificil"
  question: "Qual é a proporção de tempo gasta lendo código versus escrevendo?",
  options: [
    { text: "Superior a 10:1; logo, tornar o código legível acelera a escrita.", isCorrect: true },
    { text: "Exatamente 1:1 na média diária.", isCorrect: false },
    { text: "Passamos 80% digitando código novo e 20% lendo.", isCorrect: false },
    { text: "A leitura só ocorre em auditorias formais.", isCorrect: false }
  ],
  explanation: "Passamos mais de 10 vezes mais tempo lendo código ao redor do ponto de edição do que digitando linhas novas."
}
```

### Estrutura do Cenário Fictício:
```javascript
{
  id: "sc-cap1-1",
  patternId: "cap-1",
  category: "criacional",
  difficulty: "medio",
  title: "A Armadilha do Redesign na FinTech X",
  context: "Após 2 anos acumulando código rápido sem testes, o time gasta 3 semanas para qualquer ajuste simples. A diretoria propõe parar tudo e reescrever do zero.",
  requirements: [
    "Manter o sistema antigo funcionando em produção gerando receita.",
    "Criar uma rede de segurança com testes antes de refatorar módulos críticos.",
    "Adotar a Regra do Escoteiro em vez de tentar a reescrita total."
  ],
  question: "Qual estratégia de refatoração do livro é a mais indicada?",
  options: [
    { text: "Aplicar a Regra do Escoteiro incremental protegida por testes de caracterização.", isCorrect: true },
    { text: "Criar um Tiger Team para reescrever tudo do zero em microsserviços.", isCorrect: false }
  ],
  explanation: "O livro demonstra que a reescrita do zero raramente alcança o sistema legado e que a refatoração incremental sustentável é a única solução viável."
}
```

---

## 6. Internacionalização (i18n) em 5 Idiomas

Todo novo livro deve cadastrar suas traduções nos módulos centralizados:
- **Explicações**: Crie `books/<slug>/explanations/<slug>-i18n.js` com dicionários em `en`, `es`, `it`, `fr` e faça o merge em `books/design-patterns/explanations/i18n.js`.
- **Fluxogramas**: Adicione os passos traduzidos em `books/design-patterns/examples/flowchart-i18n.js`.
- **Quizzes**: Cadastre as perguntas, opções e explicações traduzidas em `books/design-patterns/exercises/quizzes-i18n.js`.

---

## 7. Checklist de Integração na Plataforma

Quando o conteúdo do novo livro estiver pronto, execute esta sequência de integração:

1. **Registrar o Livro**:
   - Importe e registre o manifesto do livro em `books/registry.js` adicionando-o a `BOOKS_REGISTRY`, incluindo título, autor, status e `affiliateUrl` (link de associado para compra do livro).
2. **Estante Principal (`src/components/bookshelf-view.js`)**:
   - Crie o card de capa 3D com capa SVG exclusiva, sinopse, chips de estatísticas, botão de compra de associado Amazon e links de acesso.
3. **Página de Visualização (`src/components/<slug>-views.js`)**:
   - Crie a view de apresentação do livro, com hero banner, catálogo de capítulos, barra de filtro por parte e navegação para capítulos individuais.
4. **Barra Lateral (`src/components/sidebar.js`)**:
   - Adicione suporte ao novo livro no seletor de rotas `renderSidebar()`, agrupando os capítulos e seções correspondentes.
5. **Roteador (`src/components/router.js`)**:
   - Adicione o prefixo de rota `#/<slug>` no roteador e atualize o indicador de telemetria `updateHeaderTelemetry()`.
6. **Suíte de Testes Automatizados (`tests/books.test.mjs`)**:
   - Adicione testes validando que todos os capítulos possuem animação, código nas 4 linguagens e exercícios.
   - Execute `npm test` e garanta que 100% dos testes passem sem avisos.

---

## 8. Invariante de Qualidade Anti-Slop (R-02)

- **Proibição de Travessão Longo (Em Dash)**: Nunca utilize o caractere em-dash (`—`) em nenhum arquivo de código, Markdown ou interface. Utilize exclusivamente hífen padrão (`-`) ou marcador de ponto (`•`).
- **Verificação via Teste**: O comando `npm test` executa o gate anti-slop automaticamente e falhará se qualquer arquivo contiver o caractere proibido.
- **YAGNI & Concisão**: O código deve ser direto, sem dependências externas desnecessárias e focado na clareza didática.

