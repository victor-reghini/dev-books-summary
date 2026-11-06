/**
 * Base de Dados Completa dos 17 Capítulos de "Código Limpo" (Clean Code • Robert C. Martin)
 * Estruturada no mesmo molde arquitetural do catálogo GoF (Intenção, Problema/Motivação,
 * Solução, Participantes/ Conceitos, Aplicabilidade, Prós/Contras, Código Sujo vs. Java/TS/Python e Labs).
 */

import { part1Chapters } from "./part1-foundations.js";
import { part2Chapters } from "./part2-design.js";
import { part3Chapters } from "./part3-architecture.js";
import { part4Chapters, smellsCatalog } from "./part4-casestudies.js";
import { cleanCodeExamples } from "../examples/index.js";

const rawChapters = [
  ...part1Chapters,
  ...part2Chapters,
  ...part3Chapters,
  ...part4Chapters
];

const chapterMetaMap = {
  "cap-1": {
    code: "C1",
    category: "criacional", // Parte 1: Fundamentos (Verde Esmeralda)
    partLabel: "Parte 1 • Fundamentos",
    scope: "profissionalismo",
    gofPage: 1,
    playgroundId: "wading-curve-lab",
    aliases: ["Regra do Escoteiro (Boy Scout Rule)", "Lei de LeBlanc", "Filosofia 5S"],
    relatedPatterns: ["cap-2", "cap-3", "cap-14", "cap-15"],
    realWorldUses: [
      "Revisões de Pull Request diárias aplicando a Regra do Escoteiro em pequenos trechos tocados.",
      "Prevenção do 'Grande Redesign' em produtos SaaS maduros mantendo velocidade constante.",
      "Aplicação do 5S (Seiri, Seiton, Seiso, Seiketsu, Shutsuke) na organização de repositórios."
    ],
    typescript: `const ELECTRONICS_TAX_RATE = 1.18;

export enum Category {
  ELECTRONICS = "ELECTRONICS",
  BOOKS = "BOOKS"
}

export interface LineItem {
  readonly name: string;
  readonly price: number;
}

export function calculateOrderTotal(items: readonly LineItem[], category: Category): number {
  return items.reduce((sum, item) => sum + priceWithTax(item, category), 0);
}

function priceWithTax(item: LineItem, category: Category): number {
  return category === Category.ELECTRONICS
    ? item.price * ELECTRONICS_TAX_RATE
    : item.price;
}`,
    python: `from enum import Enum
from dataclasses import dataclass

ELECTRONICS_TAX_RATE = 1.18

class Category(Enum):
    ELECTRONICS = "electronics"
    BOOKS = "books"

@dataclass(frozen=True)
class LineItem:
    name: str
    price: float

def calculate_order_total(items: list[LineItem], category: Category) -> float:
    return sum(_price_with_tax(item, category) for item in items)

def _price_with_tax(item: LineItem, category: Category) -> float:
    if category == Category.ELECTRONICS:
        return item.price * ELECTRONICS_TAX_RATE
    return item.price`
  },
  "cap-2": {
    code: "C2",
    category: "criacional",
    partLabel: "Parte 1 • Fundamentos",
    scope: "identificadores",
    gofPage: 17,
    playgroundId: "naming-stepdown-lab",
    aliases: ["Intention-Revealing Names", "Sem Notação Húngara", "Contexto Significativo"],
    relatedPatterns: ["cap-1", "cap-3", "cap-4", "cap-17"],
    realWorldUses: [
      "Substituição de arrays mágicos (int[] x com x[0] == 4) por objetos de domínio expressivos (Cell.isFlagged()).",
      "Nomenclatura de interfaces limpas sem prefixo 'I' (ShapeFactory em vez de IShapeFactory).",
      "Encapsulamento de variáveis relacionadas em classes de contexto (GuessStatisticsMessage)."
    ],
    typescript: `export class Cell {
  private static readonly FLAGGED = 4;
  constructor(private readonly status: number) {}

  isFlagged(): boolean {
    return this.status === Cell.FLAGGED;
  }
}

export class GameBoard {
  constructor(private readonly cells: readonly Cell[]) {}

  getFlaggedCells(): Cell[] {
    return this.cells.filter((cell) => cell.isFlagged());
  }
}`,
    python: `from dataclasses import dataclass

FLAGGED_STATUS = 4

@dataclass(frozen=True)
class Cell:
    status: int

    def is_flagged(self) -> bool:
        return self.status == FLAGGED_STATUS

def get_flagged_cells(game_board: list[Cell]) -> list[Cell]:
    return [cell for cell in game_board if cell.is_flagged()]`
  },
  "cap-3": {
    code: "C3",
    category: "criacional",
    partLabel: "Parte 1 • Fundamentos",
    scope: "funções",
    gofPage: 31,
    playgroundId: "naming-stepdown-lab",
    aliases: ["Do One Thing", "Stepdown Rule (Regra Decrescente)", "Command Query Separation (CQS)"],
    relatedPatterns: ["cap-2", "cap-6", "cap-10", "cap-14"],
    realWorldUses: [
      "Substituição de instruções switch(employee.type) por Abstract Factory + polimorfismo [G23].",
      "Eliminação de argumentos booleanos (render(boolean isSuite) -> renderForSuite() e renderForSingleTest()) [F3].",
      "Isolamento de blocos try/catch em funções dedicadas que apenas orquestram o fluxo de erro."
    ],
    typescript: `export interface Employee {
  isPayday(): boolean;
  calculatePay(): number;
  deliverPay(pay: number): void;
}

export class CommissionedEmployee implements Employee {
  constructor(private readonly baseSalary: number, private readonly commission: number) {}
  isPayday = () => true;
  calculatePay = () => this.baseSalary + this.commission;
  deliverPay = (pay: number) => console.log(\`Pago: R$ \${pay}\`);
}

export class EmployeeFactory {
  static makeEmployee(type: "COMMISSIONED" | "HOURLY", base: number, extra = 0): Employee {
    switch (type) {
      case "COMMISSIONED":
        return new CommissionedEmployee(base, extra);
      case "HOURLY":
        return { isPayday: () => true, calculatePay: () => base * extra, deliverPay: () => {} };
    }
  }
}`,
    python: `from abc import ABC, abstractmethod

class Employee(ABC):
    @abstractmethod
    def is_payday(self) -> bool: ...

    @abstractmethod
    def calculate_pay(self) -> float: ...

class CommissionedEmployee(Employee):
    def __init__(self, base_salary: float, commission: float) -> None:
        self._base_salary = base_salary
        self._commission = commission

    def is_payday(self) -> bool:
        return True

    def calculate_pay(self) -> float:
        return self._base_salary + self._commission

def make_employee(emp_type: str, base: float, extra: float = 0.0) -> Employee:
    if emp_type == "COMMISSIONED":
        return CommissionedEmployee(base, extra)
    raise ValueError(f"Tipo inválido: {emp_type}")`
  },
  "cap-4": {
    code: "C4",
    category: "criacional",
    partLabel: "Parte 1 • Fundamentos",
    scope: "comunicação",
    gofPage: 53,
    playgroundId: "naming-stepdown-lab",
    aliases: ["Explique-se em Código", "Zero Código Comentado [C5]", "Alerta de Consequências"],
    relatedPatterns: ["cap-2", "cap-3", "cap-15", "cap-17"],
    realWorldUses: [
      "Extração de predicados booleanos (employee.isEligibleForFullBenefits()) no lugar de comentários explicativos [G28].",
      "Remoção sistemática de código comentado [C5] e cabeçalhos de changelog [C1] em favor do Git.",
      "Documentação cirúrgica de armadilhas de concorrência (ex: DateFormat não thread-safe)."
    ],
    typescript: `export class EmployeeBenefits {
  private static readonly RETIREMENT_AGE = 65;

  constructor(
    private readonly isHourly: boolean,
    private readonly age: number
  ) {}

  isEligibleForFullBenefits(): boolean {
    return this.isHourly && this.age > EmployeeBenefits.RETIREMENT_AGE;
  }
}

export function processBenefits(employee: EmployeeBenefits, grant: () => void): void {
  if (employee.isEligibleForFullBenefits()) {
    grant();
  }
}`,
    python: `RETIREMENT_AGE = 65

class Employee:
    def __init__(self, is_hourly: bool, age: int) -> None:
        self.is_hourly = is_hourly
        self.age = age

    def is_eligible_for_full_benefits(self) -> bool:
        return self.is_hourly and self.age > RETIREMENT_AGE

def process_benefits(employee: Employee) -> bool:
    if employee.is_eligible_for_full_benefits():
        return True
    return False`
  },
  "cap-5": {
    code: "C5",
    category: "criacional",
    partLabel: "Parte 1 • Fundamentos",
    scope: "formatação",
    gofPage: 75,
    playgroundId: "wading-curve-lab",
    aliases: ["Metáfora do Jornal", "Distância e Afinidade Vertical [G10]", "Regras da Equipe [G24]"],
    relatedPatterns: ["cap-3", "cap-10", "cap-17"],
    realWorldUses: [
      "Organização de classes seguindo a Metáfora do Jornal: título no topo, métodos públicos como sinopse e privados logo abaixo.",
      "Padronização automatizada via Prettier / Checkstyle / Black / ESLint em pipelines de CI.",
      "Manutenção de arquivos coesos entre 65 e 200 linhas para leitura sem rolagem excessiva."
    ],
    typescript: `export class ReporterConfig {
  private readonly properties: string[] = [];

  constructor(private readonly className: string) {}

  addProperty(property: string): void {
    this.validateProperty(property);
    this.properties.push(property);
  }

  private validateProperty(property: string): void {
    if (!property.trim()) {
      throw new Error(\`Propriedade inválida em \${this.className}\`);
    }
  }
}`,
    python: `class ReporterConfig:
    def __init__(self, class_name: str) -> None:
        self._class_name = class_name
        self._properties: list[str] = []

    def add_property(self, prop: str) -> None:
        self._validate_property(prop)
        self._properties.append(prop)

    def _validate_property(self, prop: str) -> None:
        if not prop.strip():
            raise ValueError(f"Propriedade vazia em {self._class_name}")`
  },
  "cap-6": {
    code: "C6",
    category: "estrutural", // Parte 2: Design & Qualidade (Azul Ciano)
    partLabel: "Parte 2 • Design e Qualidade",
    scope: "abstração",
    gofPage: 93,
    playgroundId: "demeter-boundary-lab",
    aliases: ["Anti-Simetria Dados/Objetos", "Lei de Demeter [G36]", "Tell, Don't Ask"],
    relatedPatterns: ["cap-3", "cap-8", "cap-10"],
    realWorldUses: [
      "Eliminação de Train Wrecks (ctxt.getOptions().getScratchDir().getAbsolutePath()) pedindo ações diretas ao objeto.",
      "Separação clara entre DTOs/Active Records (estruturas de dados puras) e Entidades de Domínio (comportamento encapsulado).",
      "Escolha consciente entre polimorfismo OO (quando novos tipos surgem) e estruturas + Visitor (quando novas funções surgem)."
    ],
    typescript: `export interface ScratchContext {
  createScratchFileStream(classFileName: string): { path: string; write: (data: string) => void };
}

export class CompilationContext implements ScratchContext {
  constructor(private readonly scratchDirPath: string) {}

  createScratchFileStream(classFileName: string) {
    const normalized = classFileName.replace(/\\./g, "/") + ".class";
    const fullPath = \`\${this.scratchDirPath}/\${normalized}\`;
    return {
      path: fullPath,
      write: (data: string) => console.log(\`Gravando \${data.length} bytes em \${fullPath}\`)
    };
  }
}`,
    python: `from pathlib import Path

class CompilationContext:
    def __init__(self, scratch_dir: Path) -> None:
        self._scratch_dir = scratch_dir

    def create_scratch_file_path(self, class_name: str) -> Path:
        relative_file = class_name.replace(".", "/") + ".class"
        return self._scratch_dir / relative_file`
  },
  "cap-7": {
    code: "C7",
    category: "estrutural",
    partLabel: "Parte 2 • Design e Qualidade",
    scope: "resiliência",
    gofPage: 103,
    playgroundId: "demeter-boundary-lab",
    aliases: ["Special Case Pattern", "Wrapper de Exceções", "Zero Retorno Null"],
    relatedPatterns: ["cap-3", "cap-6", "cap-8"],
    realWorldUses: [
      "Uso do padrão Special Case (PerDiemMealExpenses) para eliminar blocos catch que tratavam regras de negócio comuns.",
      "Empacotamento de APIs externas (LocalPort envolvendo ACMEPort) para traduzir exceções de terceiros em exceções de domínio.",
      "Retorno de listas vazias (Collections.emptyList() / []) e Optional no lugar de null."
    ],
    typescript: `export interface MealExpenses {
  getTotal(): number;
}

export class PerDiemMealExpenses implements MealExpenses {
  private static readonly DEFAULT_PER_DIEM = 65;
  getTotal(): number {
    return PerDiemMealExpenses.DEFAULT_PER_DIEM;
  }
}

export class ExpenseReportDAO {
  constructor(private readonly records: Record<string, number>) {}

  getMeals(employeeId: string): MealExpenses {
    const amount = this.records[employeeId];
    if (amount === undefined) {
      return new PerDiemMealExpenses(); // Special Case: nunca retorna null nem lança exceção de fluxo!
    }
    return { getTotal: () => amount };
  }
}`,
    python: `from typing import Protocol

DEFAULT_PER_DIEM = 65.0

class MealExpenses(Protocol):
    def get_total(self) -> float: ...

class PerDiemMealExpenses:
    def get_total(self) -> float:
        return DEFAULT_PER_DIEM

class RecordedMealExpenses:
    def __init__(self, total: float) -> None:
        self._total = total

    def get_total(self) -> float:
        return self._total

def get_meals(records: dict[str, float], employee_id: str) -> MealExpenses:
    if employee_id not in records:
        return PerDiemMealExpenses()
    return RecordedMealExpenses(records[employee_id])`
  },
  "cap-8": {
    code: "C8",
    category: "estrutural",
    partLabel: "Parte 2 • Design e Qualidade",
    scope: "fronteiras",
    gofPage: 113,
    playgroundId: "demeter-boundary-lab",
    aliases: ["Boundary Wrapper", "Learning Tests (Testes de Aprendizado)", "Adapter de Fronteira"],
    relatedPatterns: ["cap-6", "cap-7", "cap-9", "cap-11"],
    realWorldUses: [
      "Encapsulamento de coleções genéricas (Map<String, Sensor>) dentro de classes de domínio (Sensors).",
      "Suítes de Learning Tests que validam upgrades de bibliotecas externas (ex: Apache Log4j, Jackson, Axios).",
      "Uso do padrão Adapter + FakeTransmitter para desenvolver sistemas antes que a API de terceiros esteja pronta."
    ],
    typescript: `export interface Sensor {
  readonly id: string;
  readValue(): number;
}

export class Sensors {
  private readonly sensors = new Map<string, Sensor>();

  register(sensor: Sensor): void {
    this.sensors.set(sensor.id, sensor);
  }

  getById(id: string): Sensor | undefined {
    return this.sensors.get(id);
  }
}`,
    python: `from dataclasses import dataclass

@dataclass(frozen=True)
class Sensor:
    sensor_id: str
    value: float

class Sensors:
    def __init__(self) -> None:
        self._sensors: dict[str, Sensor] = {}

    def register(self, sensor: Sensor) -> None:
        self._sensors[sensor.sensor_id] = sensor

    def get_by_id(self, sensor_id: str) -> Sensor | None:
        return self._sensors.get(sensor_id)`
  },
  "cap-9": {
    code: "C9",
    category: "estrutural",
    partLabel: "Parte 2 • Design e Qualidade",
    scope: "testes",
    gofPage: 121,
    playgroundId: "tdd-first-lab",
    aliases: ["As 3 Leis do TDD", "Padrão BUILD-OPERATE-CHECK", "Regras F.I.R.S.T."],
    relatedPatterns: ["cap-8", "cap-10", "cap-12", "cap-16"],
    realWorldUses: [
      "Estruturação de testes unitários com DSL de domínio no padrão Build-Operate-Check (Given-When-Then).",
      "Aplicação das 5 propriedades F.I.R.S.T. (Fast, Independent, Repeatable, Self-Validating, Timely) em pipelines CI.",
      "Uso do Padrão Duplo (Dual Standard) em testes de sistemas embarcados com notação compacta ('HBchL')."
    ],
    typescript: `// Padrão BUILD-OPERATE-CHECK com DSL expressiva de teste
export class PageHierarchyTestDSL {
  private pages: string[] = [];
  private responseXml = "";

  makePages(...pageNames: string[]): void {
    this.pages.push(...pageNames);
  }

  submitRequest(resource: string, query: string): void {
    const items = this.pages.map((p) => \`<name>\${p}</name>\`).join("");
    this.responseXml = \`<root resource="\${resource}" query="\${query}">\${items}</root>\`;
  }

  assertResponseContains(...expectedSnippets: string[]): boolean {
    return expectedSnippets.every((snippet) => this.responseXml.includes(snippet));
  }
}`,
    python: `class PageHierarchyTestDSL:
    def __init__(self) -> None:
        self._pages: list[str] = []
        self._response_xml: str = ""

    def make_pages(self, *page_names: str) -> None:
        self._pages.extend(page_names)

    def submit_request(self, resource: str, query_type: str) -> None:
        nodes = "".join(f"<name>{p}</name>" for p in self._pages)
        self._response_xml = f"<hierarchy resource='{resource}' type='{query_type}'>{nodes}</hierarchy>"

    def assert_response_contains(self, *snippets: str) -> bool:
        return all(snippet in self._response_xml for snippet in snippets)`
  },
  "cap-10": {
    code: "C10",
    category: "comportamental", // Parte 3: Arquitetura & Concorrência (Roxo Violeta)
    partLabel: "Parte 3 • Arquitetura e Escala",
    scope: "classes",
    gofPage: 135,
    playgroundId: "concurrency-cas-lab",
    aliases: ["Single Responsibility Principle (SRP)", "Alta Coesão", "Open-Closed (OCP) & DIP"],
    relatedPatterns: ["cap-3", "cap-6", "cap-11", "cap-12"],
    realWorldUses: [
      "Decomposição de classes monolíticas (como Sql) em classes derivadas coesas (CreateSql, InsertSql, SelectSql).",
      "Inversão de Dependência (DIP) em serviços financeiros (Portfolio dependendo da interface StockExchange).",
      "Extração automática de classes menores quando métodos privados operam apenas sobre um subconjunto de atributos."
    ],
    typescript: `export interface StockExchange {
  currentPrice(symbol: string): number;
}

export class Portfolio {
  private readonly holdings = new Map<string, number>();

  constructor(private readonly exchange: StockExchange) {}

  addShares(symbol: string, quantity: number): void {
    this.holdings.set(symbol, (this.holdings.get(symbol) ?? 0) + quantity);
  }

  getTotalValue(): number {
    let total = 0;
    for (const [symbol, qty] of this.holdings.entries()) {
      total += this.exchange.currentPrice(symbol) * qty;
    }
    return total;
  }
}`,
    python: `from typing import Protocol

class StockExchange(Protocol):
    def current_price(self, symbol: str) -> float: ...

class Portfolio:
    def __init__(self, exchange: StockExchange) -> None:
        self._exchange = exchange
        self._holdings: dict[str, int] = {}

    def add_shares(self, symbol: str, quantity: int) -> None:
        self._holdings[symbol] = self._holdings.get(symbol, 0) + quantity

    def get_total_value(self) -> float:
        return sum(
            self._exchange.current_price(symbol) * qty
            for symbol, qty in self._holdings.items()
        )`
  },
  "cap-11": {
    code: "C11",
    category: "comportamental",
    partLabel: "Parte 3 • Arquitetura e Escala",
    scope: "sistemas",
    gofPage: 153,
    playgroundId: "concurrency-cas-lab",
    aliases: ["Separar Construção de Uso", "Injeção de Dependência (DI)", "POJOs + AOP / Proxies"],
    relatedPatterns: ["cap-8", "cap-10", "cap-12"],
    realWorldUses: [
      "Isolamento da montagem do grafo de dependências no módulo Main / Container de DI (Spring, NestJS, FastAPI).",
      "Eliminação de Lazy Initialization acoplada dentro de objetos de negócio.",
      "Uso de Decorators, Dynamic Proxies e Aspectos para transações e auditoria sem poluir POJOs de domínio."
    ],
    typescript: `export interface BillingService {
  charge(orderId: string, amount: number): string;
}

export class OrderProcessor {
  // Construção separada do uso: recebe a abstração pronta via DI
  constructor(private readonly billingService: BillingService) {}

  process(orderId: string, amount: number): string {
    return this.billingService.charge(orderId, amount);
  }
}

// Módulo Main (Responsável apenas pela construção e fiação)
export function bootstrapOrderSystem(billing: BillingService): OrderProcessor {
  return new OrderProcessor(billing);
}`,
    python: `from typing import Protocol

class BillingService(Protocol):
    def charge(self, order_id: str, amount: float) -> str: ...

class OrderProcessor:
    def __init__(self, billing_service: BillingService) -> None:
        self._billing_service = billing_service

    def process(self, order_id: str, amount: float) -> str:
        return self._billing_service.charge(order_id, amount)`
  },
  "cap-12": {
    code: "C12",
    category: "comportamental",
    partLabel: "Parte 3 • Arquitetura e Escala",
    scope: "emergência",
    gofPage: 171,
    playgroundId: "tdd-first-lab",
    aliases: ["As 4 Regras de Kent Beck", "Zero Duplicação (DRY)", "Expressividade & Template Method"],
    relatedPatterns: ["cap-9", "cap-10", "cap-11", "cap-14"],
    realWorldUses: [
      "Aplicação das 4 Regras de Design Simples em ordem de prioridade: (1) Testes -> (2) DRY -> (3) Intenção -> (4) Mínimo de classes.",
      "Uso do padrão Template Method (VacationPolicy) para eliminar duplicação de fluxo entre regras de negócio regionais.",
      "Incorporação dos nomes de padrões GoF nos identificadores de classes (ex: EmployeeFactory, Visitor) [N3]."
    ],
    typescript: `export abstract class VacationPolicy {
  accrueVacation(): number {
    const baseHours = this.calculateBaseVacationHours();
    const adjustedHours = this.alterToLegalMinimums(baseHours);
    return this.applyToPayroll(adjustedHours);
  }

  protected calculateBaseVacationHours(): number {
    return 80;
  }

  protected abstract alterToLegalMinimums(hours: number): number;

  protected applyToPayroll(hours: number): number {
    return hours;
  }
}

export class EUVacationPolicy extends VacationPolicy {
  protected alterToLegalMinimums(hours: number): number {
    return Math.max(hours, 160);
  }
}`,
    python: `from abc import ABC, abstractmethod

class VacationPolicy(ABC):
    def accrue_vacation(self) -> int:
        base_hours = self._calculate_base_vacation_hours()
        adjusted = self._alter_to_legal_minimums(base_hours)
        return self._apply_to_payroll(adjusted)

    def _calculate_base_vacation_hours(self) -> int:
        return 80

    @abstractmethod
    def _alter_to_legal_minimums(self, hours: int) -> int: ...

    def _apply_to_payroll(self, hours: int) -> int:
        return hours

class EUVacationPolicy(VacationPolicy):
    def _alter_to_legal_minimums(self, hours: int) -> int:
        return max(hours, 160)`
  },
  "cap-13": {
    code: "C13",
    category: "comportamental",
    partLabel: "Parte 3 • Arquitetura e Escala",
    scope: "concorrência",
    gofPage: 177,
    playgroundId: "concurrency-cas-lab",
    aliases: ["Compare-And-Swap (CAS)", "Server-Based Locking", "Prevenção das 4 Condições de Deadlock"],
    relatedPatterns: ["cap-7", "cap-10", "cap-11"],
    realWorldUses: [
      "Substituição de contadores mutáveis (++lastIdUsed) por operações atômicas (AtomicInteger / Atomics.add).",
      "Uso de Server-Based Locking (getNextOrNull() atômico) em vez de expor pares hasNext()/next() vulneráveis a race conditions.",
      "Prevenção de Deadlock eliminando a Espera Circular através de ordenação global na aquisição de recursos."
    ],
    typescript: `export class ThreadSafeQueue<T> {
  private readonly items: T[] = [];

  constructor(initialItems: readonly T[] = []) {
    this.items.push(...initialItems);
  }

  // Server-Based Locking: unifica verificação e remoção em uma única operação atômica
  getNextOrNull(): T | null {
    if (this.items.length === 0) {
      return null;
    }
    return this.items.shift() ?? null;
  }
}`,
    python: `from threading import Lock
from typing import Generic, TypeVar

T = TypeVar("T")

class ThreadSafeIdGenerator:
    def __init__(self, initial_id: int = 42) -> None:
        self._last_id = initial_id
        self._lock = Lock()

    def get_next_id(self) -> int:
        with self._lock:
            self._last_id += 1
            return self._last_id`
  },
  "cap-14": {
    code: "C14",
    category: "estudos-de-caso", // Parte 4: Estudos de Caso & Odores (Âmbar / Terracota)
    partLabel: "Parte 4 • Estudos de Caso e Odores",
    scope: "refatoração",
    gofPage: 193,
    playgroundId: "args-marshaler-lab",
    aliases: ["Refinamento Sucessivo", "Estudo de Caso Args", "Polimorfismo com ArgumentMarshaler"],
    relatedPatterns: ["cap-3", "cap-9", "cap-10", "cap-12"],
    realWorldUses: [
      "Evolução incremental de parsers e compiladores mantendo 100% da suíte de testes verde a cada passo.",
      "Substituição de múltiplos mapas paralelos por uma única coleção polimórfica Map<Character, ArgumentMarshaler>.",
      "Extração completa da hierarquia de erros (ArgsException + ErrorCode) para fora do motor de parsing."
    ],
    typescript: `export interface ArgumentMarshaler {
  set(argsIterator: Iterator<string>): void;
  get(): unknown;
}

export class BooleanArgumentMarshaler implements ArgumentMarshaler {
  private value = false;
  set(): void {
    this.value = true;
  }
  get(): boolean {
    return this.value;
  }
}

export class StringArgumentMarshaler implements ArgumentMarshaler {
  private value = "";
  set(it: Iterator<string>): void {
    const next = it.next();
    if (next.done) throw new Error("MISSING_STRING");
    this.value = next.value;
  }
  get(): string {
    return this.value;
  }
}`,
    python: `from abc import ABC, abstractmethod
from typing import Iterator, Any

class ArgumentMarshaler(ABC):
    @abstractmethod
    def set(self, current_arg: Iterator[str]) -> None: ...

    @abstractmethod
    def get(self) -> Any: ...

class BooleanArgumentMarshaler(ArgumentMarshaler):
    def __init__(self) -> None:
        self._value = False

    def set(self, current_arg: Iterator[str]) -> None:
        self._value = True

    def get(self) -> bool:
        return self._value

class IntegerArgumentMarshaler(ArgumentMarshaler):
    def __init__(self) -> None:
        self._value = 0

    def set(self, current_arg: Iterator[str]) -> None:
        try:
            self._value = int(next(current_arg))
        except (StopIteration, ValueError) as exc:
            raise ValueError("INVALID_INTEGER") from exc

    def get(self) -> int:
        return self._value`
  },
  "cap-15": {
    code: "C15",
    category: "estudos-de-caso",
    partLabel: "Parte 4 • Estudos de Caso e Odores",
    scope: "refatoração",
    gofPage: 251,
    playgroundId: "args-marshaler-lab",
    aliases: ["JUnit ComparisonCompactor", "Encapsular Condicionais [G28]", "Acoplamento Temporal Explícito [G31]"],
    relatedPatterns: ["cap-2", "cap-3", "cap-4", "cap-17"],
    realWorldUses: [
      "Refatoração do ComparisonCompactor do JUnit eliminando prefixos 'f' [N6] e condicionais negativas [G29].",
      "Unificação de findCommonPrefixAndSuffix() para explicitar o acoplamento temporal oculto [G31].",
      "Substituição de índices baseados em 1 (+1/-1 espalhados) por comprimentos baseados em 0 (suffixLength) [G33]."
    ],
    typescript: `export class ComparisonCompactor {
  private prefixLength = 0;
  private suffixLength = 0;

  constructor(
    private readonly contextLength: number,
    private readonly expected: string | null,
    private readonly actual: string | null
  ) {}

  formatCompactedComparison(message?: string): string {
    let compactExpected = this.expected ?? "null";
    let compactActual = this.actual ?? "null";

    if (this.shouldBeCompacted()) {
      this.findCommonPrefixAndSuffix();
      compactExpected = this.compact(this.expected!);
      compactActual = this.compact(this.actual!);
    }
    return \`\${message ? message + " " : ""}expected:<\${compactExpected}> but was:<\${compactActual}>\`;
  }

  private shouldBeCompacted(): boolean {
    return this.expected !== null && this.actual !== null && this.expected !== this.actual;
  }

  private findCommonPrefixAndSuffix(): void {
    this.findCommonPrefix();
    this.suffixLength = 0;
  }

  private findCommonPrefix(): void {
    this.prefixLength = 0;
  }

  private compact(source: string): string {
    return \`[\${source}]\`;
  }
}`,
    python: `class ComparisonCompactor:
    def __init__(self, context_length: int, expected: str | None, actual: str | None) -> None:
        self._context_length = context_length
        self._expected = expected
        self._actual = actual
        self._prefix_length = 0
        self._suffix_length = 0

    def format_compacted_comparison(self, message: str = "") -> str:
        compact_expected = self._expected
        compact_actual = self._actual
        if self._should_be_compacted():
            self._find_common_prefix_and_suffix()
            compact_expected = self._compact(self._expected or "")
            compact_actual = self._compact(self._actual or "")
        prefix = f"{message} " if message else ""
        return f"{prefix}expected:<{compact_expected}> but was:<{compact_actual}>"

    def _should_be_compacted(self) -> bool:
        return self._expected is not None and self._actual is not None and self._expected != self._actual

    def _find_common_prefix_and_suffix(self) -> None:
        self._prefix_length = 0
        self._suffix_length = 0

    def _compact(self, s: str) -> str:
        return f"[{s}]"`
  },
  "cap-16": {
    code: "C16",
    category: "estudos-de-caso",
    partLabel: "Parte 4 • Estudos de Caso e Odores",
    scope: "refatoração",
    gofPage: 267,
    playgroundId: "args-marshaler-lab",
    aliases: ["SerialDate -> DayDate", "Primeiro Faça Funcionar, Depois Faça Certo", "Enums Ricos [J3] & Abstract Factory [G7]"],
    relatedPatterns: ["cap-2", "cap-9", "cap-10", "cap-17"],
    realWorldUses: [
      "Elevação da cobertura de testes de 50% para 92% antes de refatorar, revelando bugs reais nas condições de contorno [G3, T5].",
      "Quebra da dependência circular entre a classe base DayDate e a subclasse SpreadsheetDate via DayDateFactory [G7].",
      "Substituição de interfaces de constantes int (MonthConstants) por Enums ricos com comportamento (Month) [J2, J3]."
    ],
    typescript: `export enum Month {
  JANUARY = 1, FEBRUARY = 2, MARCH = 3, APRIL = 4,
  MAY = 5, JUNE = 6, JULY = 7, AUGUST = 8,
  SEPTEMBER = 9, OCTOBER = 10, NOVEMBER = 11, DECEMBER = 12
}

export abstract class DayDate {
  abstract toOrdinalDay(): number;

  plusDays(days: number): DayDate {
    return DayDateFactory.makeDate(this.toOrdinalDay() + days);
  }
}

export class SpreadsheetDate extends DayDate {
  constructor(private readonly ordinalDay: number) {
    super();
  }
  toOrdinalDay(): number {
    return this.ordinalDay;
  }
}

export class DayDateFactory {
  static makeDate(ordinal: number): DayDate {
    return new SpreadsheetDate(ordinal);
  }
}`,
    python: `from enum import IntEnum
from abc import ABC, abstractmethod

class Month(IntEnum):
    JANUARY = 1
    FEBRUARY = 2
    MARCH = 3
    DECEMBER = 12

    def quarter(self) -> int:
        return 1 + (self.value - 1) // 3

class DayDate(ABC):
    @abstractmethod
    def to_ordinal_day(self) -> int: ...

    def plus_days(self, days: int) -> "DayDate":
        return SpreadsheetDate(self.to_ordinal_day() + days)

class SpreadsheetDate(DayDate):
    def __init__(self, ordinal_day: int) -> None:
        self._ordinal_day = ordinal_day

    def to_ordinal_day(self) -> int:
        return self._ordinal_day`
  },
  "cap-17": {
    code: "C17",
    category: "estudos-de-caso",
    partLabel: "Parte 4 • Estudos de Caso e Odores",
    scope: "heurísticas",
    gofPage: 285,
    playgroundId: "args-marshaler-lab",
    aliases: ["66 Odores e Heurísticas (C1–T9)", "Vocabulário de Code Review", "Artesanato de Software"],
    relatedPatterns: ["cap-2", "cap-3", "cap-6", "cap-15", "cap-16"],
    realWorldUses: [
      "Uso dos códigos C1–C5, E1–E2, F1–F4, G1–G36, J1–J3, N1–N7 e T1–T9 como checklist objetivo em Code Reviews.",
      "Eliminação combinada de Argumentos Flag [F3], Variáveis Explicativas [G19] e Condições de Contorno [G33].",
      "Diagnóstico rápido de Feature Envy [G14], Acoplamento Temporal [G31] e Violação de Demeter [G36]."
    ],
    typescript: `const PAGE_SIZE = 20;

export function exportAllItems<T>(items: readonly T[], exporter: (all: readonly T[]) => void): void {
  exporter(items);
}

export function renderPageItems<T>(
  items: readonly T[],
  pageIndex: number,
  renderItem: (item: T) => void
): void {
  const startIndex = pageIndex * PAGE_SIZE;
  const nextPageIndex = pageIndex + 1; // [G33] Condição de contorno encapsulada
  const endIndex = Math.min(nextPageIndex * PAGE_SIZE, items.length); // [G19] Variável explicativa

  for (let i = startIndex; i < endIndex; i++) {
    renderItem(items[i]);
  }
}`,
    python: `PAGE_SIZE = 20

def export_all_items(items: list[str]) -> list[str]:
    return list(items)

def render_page_items(items: list[str], page_index: int) -> list[str]:
    start_index = page_index * PAGE_SIZE
    next_page_index = page_index + 1  # [G33] Condição de contorno explícita
    end_index = min(next_page_index * PAGE_SIZE, len(items))  # [G19] Variável explicativa
    return items[start_index:end_index]`
  }
};

export const cleanCodeChaptersData = rawChapters.map((ch) => {
  const meta = chapterMetaMap[ch.id];
  const exList = cleanCodeExamples[ch.id] || [];
  const primaryEx = exList[0] || {
    dirtyCode: "// Exemplo Antes",
    cleanCode: "// Exemplo Depois",
    refactoringNotes: []
  };

  return {
    id: ch.id,
    code: meta.code,
    number: ch.number,
    name: `Cap. ${String(ch.number).padStart(2, "0")} • ${ch.title}`,
    ptName: ch.subtitle,
    originalName: `Chapter ${ch.number}: ${ch.title}`,
    category: meta.category,
    partLabel: meta.partLabel,
    scope: meta.scope,
    gofPage: meta.gofPage,
    readingTime: ch.readingTime,
    smellRefs: ch.smellRefs,
    aliases: meta.aliases,
    intent: ch.teacherIntro,
    hasPlayground: true,
    playgroundId: meta.playgroundId,
    problemAndMotivation: ch.sections[0]
      ? `${ch.sections[0].heading}: ${ch.sections[0].body}${
          ch.sections[0].callout ? `\n\n[${ch.sections[0].callout.title}]: ${ch.sections[0].callout.text}` : ""
        }`
      : ch.teacherIntro,
    solution: ch.sections
      .slice(1)
      .map((s) => {
        const bulletsText = s.bullets ? "\n• " + s.bullets.join("\n• ") : "";
        const mastersText = s.masters
          ? "\n• " + s.masters.map((m) => `${m.author}: "${m.quote}"`).join("\n• ")
          : "";
        return `${s.heading}: ${s.body}${bulletsText}${mastersText}`;
      })
      .join("\n\n"),
    structure: {
      participants: ch.keyTakeaways.map((tk, idx) => {
        const parts = tk.split(":");
        if (parts.length > 1) {
          return {
            name: parts[0].trim(),
            role: parts.slice(1).join(":").trim()
          };
        }
        return {
          name: `Diretriz Essencial #${idx + 1}`,
          role: tk
        };
      }),
      collaborations:
        primaryEx.context +
        (primaryEx.refactoringNotes?.length
          ? " Transformações aplicadas: " + primaryEx.refactoringNotes.join(" ")
          : "")
    },
    applicability: [
      ...ch.keyTakeaways,
      `Heurísticas diretamente associadas no Capítulo 17: ${ch.smellRefs.join(", ")}.`,
      "CUIDADO / PRAGMATISMO (4ª Regra de Kent Beck): Aplique as regras para aumentar a expressividade e facilitar testes, evitando burocracia ou criação dogmática de classes sem ganho real."
    ],
    consequences: {
      pros: [
        ...ch.keyTakeaways.slice(0, 3),
        ...(primaryEx.refactoringNotes || []).slice(0, 2)
      ],
      cons: [
        "Exige disciplina contínua da equipe (Shutsuke / Regra do Escoteiro) em cada commit.",
        "Refatorar código legado sem antes construir uma rede de testes unitários (Cap. 9 e 16) pode introduzir regressões."
      ]
    },
    implementationNotes: [
      ...(primaryEx.refactoringNotes || []),
      ...ch.smellRefs.map((code) => {
        const found = smellsCatalog.find((s) => s.code === code);
        return found ? `[${found.code}] ${found.title}: ${found.summary}` : `[${code}] Heurística de Código Limpo.`;
      })
    ],
    codeExamples: {
      dirty: primaryEx.dirtyCode,
      java: primaryEx.cleanCode,
      typescript: meta.typescript,
      python: meta.python
    },
    extraExamples: exList,
    sections: ch.sections,
    realWorldUses: meta.realWorldUses,
    relatedPatterns: meta.relatedPatterns,
    references: [
      {
        book: "Código Limpo: Habilidades Práticas do Agile Software (Robert C. Martin)",
        chapter: `Capítulo ${ch.number}: ${ch.title}`,
        pages: `Pág. ${meta.gofPage}`,
        summary: ch.subtitle
      },
      {
        book: "Refactoring: Improving the Design of Existing Code (Martin Fowler)",
        chapter: `Catálogo de Refatorações & Odores (${ch.smellRefs.join(", ")})`,
        pages: "Capítulos 1 a 3",
        summary: "Fundamentação das micro-transformações preservadoras de comportamento protegidas por testes."
      }
    ]
  };
});
