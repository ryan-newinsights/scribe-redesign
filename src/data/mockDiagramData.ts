export interface DiagramType {
  id: string;
  label: string;
  disabled?: boolean;
  comingSoon?: boolean;
}

export interface DiagramData {
  id: string;
  title: string;
  subtitle: string;
  mermaidCode: string;
  description: string;
  componentsCount: number;
  lastGenerated: Date;
}

export const diagramTypes: DiagramType[] = [
  { id: "class", label: "Class Diagram" },
  { id: "modules", label: "Module Dependencies" },
  { id: "inheritance", label: "Inheritance Tree" },
  { id: "sequence", label: "Sequence Flows", disabled: true, comingSoon: true },
];

export const mockDiagrams: Record<string, DiagramData> = {
  class: {
    id: "class",
    title: "Class Diagram",
    subtitle: "com.acme.banking",
    mermaidCode: `classDiagram
    class AccountController {
        +getAccount(id)
        +createAccount(data)
        +updateAccount(id, data)
        +deleteAccount(id)
    }
    class AccountService {
        +findById(id)
        +create(dto)
        +update(id, dto)
        +delete(id)
        -validate(dto)
    }
    class AccountRepository {
        <<interface>>
        +findById(id)
        +save(account)
        +delete(id)
    }
    class BaseService {
        <<abstract>>
        #logger
        +log(message)
    }
    AccountController --> AccountService : uses
    AccountService --> AccountRepository : uses
    AccountService --|> BaseService : extends`,
    description: "Shows the class structure and relationships between controllers, services, and repositories in the banking module.",
    componentsCount: 4,
    lastGenerated: new Date("2024-01-15T10:30:00"),
  },
  modules: {
    id: "modules",
    title: "Module Dependencies",
    subtitle: "Project Architecture",
    mermaidCode: `flowchart TB
    subgraph API["API Layer"]
        Controllers[Controllers]
        Middleware[Middleware]
    end
    subgraph Business["Business Layer"]
        Services[Services]
        Validators[Validators]
    end
    subgraph Data["Data Layer"]
        Repositories[Repositories]
        Entities[Entities]
    end
    subgraph Infra["Infrastructure"]
        Database[(Database)]
        Cache[(Cache)]
    end
    
    Controllers --> Middleware
    Controllers --> Services
    Services --> Validators
    Services --> Repositories
    Repositories --> Entities
    Repositories --> Database
    Services --> Cache`,
    description: "Displays the high-level module dependencies and architectural layers of the application.",
    componentsCount: 8,
    lastGenerated: new Date("2024-01-15T10:30:00"),
  },
  inheritance: {
    id: "inheritance",
    title: "Inheritance Tree",
    subtitle: "Class Hierarchy",
    mermaidCode: `classDiagram
    class BaseEntity {
        <<abstract>>
        +id: string
        +createdAt: Date
        +updatedAt: Date
    }
    class Account {
        +accountNumber: string
        +balance: number
        +status: string
    }
    class SavingsAccount {
        +interestRate: number
        +calculateInterest()
    }
    class CheckingAccount {
        +overdraftLimit: number
        +processCheck()
    }
    class Transaction {
        +amount: number
        +type: string
        +timestamp: Date
    }
    
    BaseEntity <|-- Account
    BaseEntity <|-- Transaction
    Account <|-- SavingsAccount
    Account <|-- CheckingAccount`,
    description: "Visualizes the inheritance hierarchy showing how entity classes extend from base classes.",
    componentsCount: 6,
    lastGenerated: new Date("2024-01-15T10:30:00"),
  },
};
