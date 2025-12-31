import { DocumentationSummary, DocumentFile } from "@/types/documentation";

export const mockDocumentationSummaries: Record<string, DocumentationSummary> = {
  "1": {
    projectId: "1",
    projectName: "react-dashboard",
    repoPath: "/home/dev/react-dashboard",
    overview: "A comprehensive React dashboard application with data visualization, user management, and real-time updates. The system provides interactive charts, customizable widgets, and role-based access control.",
    totalFiles: 87,
    functionsDocumented: { done: 156, total: 156 },
    coverage: 100,
    lastGenerated: new Date("2025-12-18"),
    keyFeatures: [
      "Interactive data visualization with Chart.js",
      "Real-time WebSocket updates",
      "Role-based access control",
      "Customizable dashboard widgets",
      "Export to PDF and Excel",
      "Dark mode support",
    ],
    quality: {
      completeness: 100,
      qualityScore: 94,
      examplesIncluded: 78,
    },
    agentStats: {
      readerAgent: { filesAnalyzed: 87 },
      writerAgent: { docstringsGenerated: 156 },
      searcherAgent: { contextsGathered: 312 },
      verifierAgent: { validationsCompleted: 156 },
    },
  },
  "5": {
    projectId: "5",
    projectName: "ecommerce-platform",
    repoPath: "/home/dev/ecommerce",
    overview: "A comprehensive payment processing system that handles multiple payment methods, authentication, and transaction management. The system provides RESTful APIs for payment processing, refunds, and transaction tracking with built-in security and compliance features.",
    totalFiles: 8,
    functionsDocumented: { done: 83, total: 83 },
    coverage: 100,
    lastGenerated: new Date("2025-11-26"),
    keyFeatures: [
      "Automated code-to-documentation conversion",
      "Real-time compliance monitoring",
      "System change tracking",
      "Infrastructure design documentation",
      "Security and testing procedure documentation",
      "Audit-ready reporting",
    ],
    quality: {
      completeness: 100,
      qualityScore: 94,
      examplesIncluded: 78,
    },
    agentStats: {
      readerAgent: { filesAnalyzed: 83 },
      writerAgent: { docstringsGenerated: 83 },
      searcherAgent: { contextsGathered: 247 },
      verifierAgent: { validationsCompleted: 83 },
    },
  },
};

export const mockDocumentFiles: DocumentFile[] = [
  {
    id: "exec-summary",
    name: "Executive Summary",
    description: "High-level overview for stakeholders",
    type: "executive",
  },
  {
    id: "detailed-docs",
    name: "Detailed Documentation",
    description: "Complete technical documentation",
    type: "detailed",
  },
  {
    id: "diagrams",
    name: "Diagrams",
    description: "Architecture and flow diagrams",
    type: "diagrams",
  },
];
