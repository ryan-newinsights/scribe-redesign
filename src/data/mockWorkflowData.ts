import { DocumentationJob, WorkflowPhase, JobLog } from "@/types/workflow";

export const mockWorkflowPhases: WorkflowPhase[] = [
  {
    id: "phase-1",
    name: "Repository Analysis",
    steps: [
      {
        id: "step-1-1",
        name: "Clone Repository",
        description: "Fetching repository contents",
        status: "completed",
        startedAt: new Date("2025-12-21T10:00:00"),
        completedAt: new Date("2025-12-21T10:00:15"),
        output: "Repository cloned successfully (234 files)",
      },
      {
        id: "step-1-2",
        name: "Detect Languages",
        description: "Identifying programming languages and frameworks",
        status: "completed",
        startedAt: new Date("2025-12-21T10:00:15"),
        completedAt: new Date("2025-12-21T10:00:22"),
        output: "Detected: TypeScript (78%), Python (15%), CSS (7%)",
      },
      {
        id: "step-1-3",
        name: "Parse File Structure",
        description: "Building dependency graph and module map",
        status: "completed",
        startedAt: new Date("2025-12-21T10:00:22"),
        completedAt: new Date("2025-12-21T10:00:45"),
        output: "Parsed 87 components, 23 hooks, 12 utilities",
      },
    ],
  },
  {
    id: "phase-2",
    name: "Code Understanding",
    steps: [
      {
        id: "step-2-1",
        name: "Extract Components",
        description: "Analyzing React components and their relationships",
        status: "completed",
        startedAt: new Date("2025-12-21T10:00:45"),
        completedAt: new Date("2025-12-21T10:01:30"),
        output: "Extracted 87 component definitions with props",
      },
      {
        id: "step-2-2",
        name: "Analyze Business Logic",
        description: "Understanding core application logic and data flow",
        status: "running",
        startedAt: new Date("2025-12-21T10:01:30"),
      },
      {
        id: "step-2-3",
        name: "Map API Endpoints",
        description: "Documenting API routes and handlers",
        status: "pending",
      },
      {
        id: "step-2-4",
        name: "Identify Patterns",
        description: "Detecting design patterns and architectural decisions",
        status: "pending",
      },
    ],
  },
  {
    id: "phase-3",
    name: "Documentation Generation",
    steps: [
      {
        id: "step-3-1",
        name: "Generate Overview",
        description: "Creating high-level project documentation",
        status: "pending",
      },
      {
        id: "step-3-2",
        name: "Write Technical Docs",
        description: "Generating detailed technical documentation",
        status: "pending",
      },
      {
        id: "step-3-3",
        name: "Create Diagrams",
        description: "Building architecture and flow diagrams",
        status: "pending",
      },
      {
        id: "step-3-4",
        name: "Generate API Reference",
        description: "Creating API documentation with examples",
        status: "pending",
      },
    ],
  },
  {
    id: "phase-4",
    name: "Finalization",
    steps: [
      {
        id: "step-4-1",
        name: "Review & Validate",
        description: "Checking documentation accuracy and completeness",
        status: "pending",
      },
      {
        id: "step-4-2",
        name: "Format Output",
        description: "Formatting and organizing final documentation",
        status: "pending",
      },
      {
        id: "step-4-3",
        name: "Save Results",
        description: "Persisting documentation to storage",
        status: "pending",
      },
    ],
  },
];

export const mockJobLogs: JobLog[] = [
  { id: "log-1", timestamp: new Date("2025-12-21T10:00:00"), level: "info", message: "Job started for project api-gateway", step: "Clone Repository" },
  { id: "log-2", timestamp: new Date("2025-12-21T10:00:05"), level: "info", message: "Connecting to repository...", step: "Clone Repository" },
  { id: "log-3", timestamp: new Date("2025-12-21T10:00:15"), level: "info", message: "Repository cloned: 234 files fetched", step: "Clone Repository" },
  { id: "log-4", timestamp: new Date("2025-12-21T10:00:16"), level: "info", message: "Starting language detection...", step: "Detect Languages" },
  { id: "log-5", timestamp: new Date("2025-12-21T10:00:22"), level: "info", message: "Languages detected: TypeScript, Python, CSS", step: "Detect Languages" },
  { id: "log-6", timestamp: new Date("2025-12-21T10:00:23"), level: "debug", message: "Building AST for TypeScript files...", step: "Parse File Structure" },
  { id: "log-7", timestamp: new Date("2025-12-21T10:00:35"), level: "info", message: "Dependency graph constructed", step: "Parse File Structure" },
  { id: "log-8", timestamp: new Date("2025-12-21T10:00:45"), level: "info", message: "File structure parsed: 87 components found", step: "Parse File Structure" },
  { id: "log-9", timestamp: new Date("2025-12-21T10:00:46"), level: "info", message: "Extracting React components...", step: "Extract Components" },
  { id: "log-10", timestamp: new Date("2025-12-21T10:01:30"), level: "info", message: "Component extraction complete", step: "Extract Components" },
  { id: "log-11", timestamp: new Date("2025-12-21T10:01:31"), level: "info", message: "Analyzing business logic patterns...", step: "Analyze Business Logic" },
  { id: "log-12", timestamp: new Date("2025-12-21T10:01:45"), level: "debug", message: "Processing hooks and state management...", step: "Analyze Business Logic" },
];

export const mockDocumentationJob: DocumentationJob = {
  id: "job-2",
  projectId: "2",
  projectName: "api-gateway",
  repoPath: "/home/dev/api-gateway",
  status: "running",
  progress: 42,
  currentPhase: "Code Understanding",
  currentStep: "Analyze Business Logic",
  phases: mockWorkflowPhases,
  startedAt: new Date("2025-12-21T10:00:00"),
  estimatedCompletion: new Date("2025-12-21T10:05:00"),
  logs: mockJobLogs,
};
