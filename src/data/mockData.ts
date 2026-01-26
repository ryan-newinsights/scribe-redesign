import { Project, LLMConfig, RecentDocument } from "@/types/project";

export const mockLLMConfigs: LLMConfig[] = [
  { id: "1", name: "GPT-4 Turbo", provider: "OpenAI", modelName: "gpt-4-turbo" },
  { id: "2", name: "Claude 3 Opus", provider: "Anthropic", modelName: "claude-3-opus" },
  { id: "3", name: "Gemini Pro", provider: "Google", modelName: "gemini-pro" },
];

export const mockProjects: Project[] = [
  {
    id: "1",
    name: "react-dashboard",
    repoPath: "/home/dev/react-dashboard",
    summary: "A comprehensive React dashboard with data visualization, user management, and real-time updates.",
    loc: 15420,
    componentCount: 87,
    integrationSource: "local",
    latestJob: {
      id: "job-1",
      status: "completed",
      progress: 100,
      createdAt: new Date("2025-12-18T10:30:00"),
    },
  },
  {
    id: "2",
    name: "api-gateway",
    repoPath: "/home/dev/api-gateway",
    summary: "Microservices API gateway handling authentication, rate limiting, and request routing.",
    loc: 8750,
    componentCount: 42,
    integrationSource: "github",
    latestJob: {
      id: "job-2",
      status: "running",
      progress: 67,
      createdAt: new Date("2025-12-21T09:15:00"),
    },
  },
  {
    id: "3",
    name: "ml-pipeline",
    repoPath: "/home/dev/ml-pipeline",
    summary: "Machine learning data processing pipeline with feature engineering and model training.",
    loc: 23100,
    componentCount: 156,
    integrationSource: "local",
    latestJob: {
      id: "job-3",
      status: "failed",
      progress: 45,
      createdAt: new Date("2025-12-20T14:00:00"),
      errorMessage: "Timeout while processing large file",
    },
  },
  {
    id: "4",
    name: "mobile-app-backend",
    repoPath: "/home/dev/mobile-backend",
    summary: undefined,
    loc: 5200,
    componentCount: 28,
    integrationSource: "github",
    latestJob: {
      id: "job-4",
      status: "pending",
      progress: 0,
      createdAt: new Date("2025-12-21T08:00:00"),
    },
  },
  {
    id: "5",
    name: "ecommerce-platform",
    repoPath: "/home/dev/ecommerce",
    summary: "Full-stack e-commerce solution with payment processing, inventory, and order management.",
    loc: 45000,
    componentCount: 234,
    integrationSource: "local",
    latestJob: {
      id: "job-5",
      status: "completed",
      progress: 100,
      createdAt: new Date("2025-12-15T16:45:00"),
    },
  },
  {
    id: "6",
    name: "new-project",
    repoPath: "/home/dev/new-project",
    summary: undefined,
    loc: undefined,
    componentCount: undefined,
    integrationSource: "local",
    latestJob: undefined,
  },
];

export const mockRecentDocuments: RecentDocument[] = [
  {
    id: "doc-1",
    name: "BUSINESS_OVERVIEW.md",
    projectName: "react-dashboard",
    viewedAt: new Date("2025-12-21T09:00:00"),
    url: "#",
  },
  {
    id: "doc-2",
    name: "TECHNICAL_DEEP_DIVE.md",
    projectName: "ecommerce-platform",
    viewedAt: new Date("2025-12-20T15:30:00"),
    url: "#",
  },
  {
    id: "doc-3",
    name: "DIAGRAMS.md",
    projectName: "react-dashboard",
    viewedAt: new Date("2025-12-19T11:20:00"),
    url: "#",
  },
];
