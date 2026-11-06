# DevBooks Classroom (`dev-books-summary`)

Plataforma interativa de resumos visuais de livros clássicos de engenharia de software. O objetivo não é transcrever livros online, mas sim transformar cada obra em uma sala de aula interativa, com resumos objetivos por capítulo, simuladores gráficos SVG animados, laboratórios práticos e exercícios com autoavaliação imediata.

A interface segue o estilo visual e interativo de [learning-design-patterns](https://learning-design-patterns.netlify.app/#/), com navegação por estante de livros, alternância de tema claro/escuro e suporte a múltiplos idiomas (Português, Inglês e Espanhol).

---

## Livros Disponíveis

### 1. Padrões de Projeto (Design Patterns - GoF)
- **Origem**: Incorporação integral do projeto [learning-design-patterns](https://learning-design-patterns.netlify.app/#/).
- **Conteúdo**:
  - Visão geral completa dos princípios de orientação a objetos (favor composição sobre herança, programar para interfaces e SOLID).
  - 23 padrões GoF organizados por categoria (Criacionais, Estruturais e Comportamentais).
  - 23 simuladores SVG interativos com animação de execução passo a passo em tempo real.
  - 9 laboratórios interativos (ex: Undo/Redo com Command, State vs. Strategy, Pub/Sub Observer).
  - Estudo de caso Lexi (editor de texto do livro GoF).
  - Matriz comparativa e mapa de relacionamentos entre padrões.
  - Banco de exercícios em 3 modos: Quizzes, Cenários Práticos e Editor Prático.

### 2. Código Limpo (Clean Code - Robert C. Martin)
- **Estrutura**: Desenvolvido exatamente nos mesmos moldes e padrão visual do livro de Padrões de Projeto.
- **Conteúdo**:
  - 17 capítulos cobrindo desde nomes significativos até concorrência e heurísticas de código.
  - Exemplos comparativos de código em 4 abas: **Código Sujo (Antes)** vs. **Java Limpo (Depois)**, **TypeScript** e **Python**.
  - 17 animações SVG passo a passo demonstrando a evolução arquitetural e o refactoring de cada capítulo.
  - 6 laboratórios gráficos e visuais (incluindo o gráfico interativo de produtividade vs. tempo da curva de lama, simulador da Lei de Demeter, TDD Three Laws e condições de corrida com CAS).
  - Matriz completa de odores e heurísticas do Apêndice C (nomes, funções, comentários, testes e concorrência).
  - 3 estudos de caso de refatoração do livro (`Args`, `ComparisonCompactor` do JUnit e `SerialDate`/`DayDate`).
  - Quizzes conceituais, cenários de diagnóstico de smells e laboratório prático de código.

---

## Estrutura do Repositório

Seguindo a regra de modularidade do projeto, cada livro reside em sua própria pasta independente com subpastas dedicadas para explicações, exemplos e exercícios:

```text
dev-books-summary/
├── books/
│   ├── design-patterns/              # Livro Padrões de Projeto (GoF)
│   │   ├── explanations/             # Teoria, catálogo dos 23 padrões e i18n
│   │   ├── examples/                 # 23 animações SVG e 9 laboratórios interativos
│   │   ├── exercises/                # Quizzes, cenários e prática
│   │   └── index.js
│   ├── clean-code/                   # Livro Código Limpo (Clean Code)
│   │   ├── explanations/             # 17 capítulos, princípios, estudos de caso e heurísticas
│   │   ├── examples/                 # 17 animações SVG e 6 laboratórios visuais
│   │   ├── exercises/                # Quizzes, cenários e prática
│   │   └── index.js
│   └── registry.js                   # Registro e metadados dos livros da estante
├── src/
│   ├── components/                   # Visões (estante, GoF, Clean Code), rotas, sidebar e tema
│   ├── styles/                       # CSS modular (layout, componentes, labs, quiz, estante)
│   ├── utils/                        # Syntax highlighter leve e utilitários
│   └── main.js                       # Ponto de entrada SPA vanilla ES Modules
├── tests/
│   └── books.test.mjs                # Suíte de testes automatizados com Node test runner
├── index.html                        # SPA shell com cabeçalho, botão Estante e área de conteúdo
├── package.json
└── server.mjs                        # Servidor HTTP estático nativo em Node.js
```

---

## Pré-requisitos

- **Node.js**: versão 18.0.0 ou superior (nenhuma dependência externa é obrigatória para executar a aplicação; o projeto utiliza JavaScript Vanilla e módulos ES nativos).

---

## Como Rodar o Projeto

### 1. Clonar ou Acessar o Diretório

```bash
cd /caminho/para/dev-books-summary
```

### 2. Iniciar o Servidor Local

Você pode iniciar o servidor nativo embutido usando o script do `package.json`:

```bash
npm start
```

Ou diretamente via Node:

```bash
node server.mjs
```

Por padrão, o servidor escutará na porta configurada (ex: `4173` ou porta informada via variável de ambiente `PORT`). Para definir uma porta customizada (por exemplo, `3000`):

```bash
PORT=3000 npm start
```

### 3. Acessar no Navegador

Abra seu navegador em:

```text
http://127.0.0.1:3000/#/
```

- A rota `#/` ou `#/estante` exibe a **Estante Principal** com as capas interativas dos livros.
- O botão **Estante Principal** no topo superior esquerdo permite retornar à estante a qualquer momento a partir de qualquer página de livro.
- Clicar em **Padrões de Projeto** navega para `#/design-patterns`.
- Clicar em **Código Limpo** navega para `#/clean-code`.

---

## Como Executar os Testes

O projeto conta com uma suíte de testes automatizados utilizando o test runner nativo do Node (`node --test`), validando a integridade da arquitetura, dados, animações, ausência de regras violadas e consistência da estante:

```bash
npm test
```

---

## Como Adicionar Novos Livros (Guia para Agentes de IA)

Para incluir novos livros resumidos na plataforma mantendo a mesma profundidade técnica, simuladores gráficos e suporte multilíngue (PT, EN, ES, IT, FR), consulte o tutorial completo em:

- **[BOOK_AUTHORING_GUIDE.md](./BOOK_AUTHORING_GUIDE.md)**: Especificação passo a passo da estrutura de pastas, modelos de dados de capítulos, animações SVG de 5 etapas, quizzes em 3 modalidades e checklist de integração.

