import { DocumentationSummary, DocumentFile } from "@/types/documentation";

export const mockDocumentationSummaries: Record<string, DocumentationSummary> = {
  "1": {
    projectId: "1",
    projectName: "react-dashboard",
    repoPath: "/home/dev/react-dashboard",
    overview:
      "A secure, web-based data exploration and analytics platform designed to bridge the gap between complex cloud data warehouses and actionable business insights. The application provides a streamlined interface for users to connect to enterprise data sources (such as Snowflake), browse curated data catalogs, and perform sophisticated filtering and aggregation without requiring technical coding skills. By centralising data access, visualisation, and reporting, the platform empowers teams to make data-driven decisions through a user-friendly, self-service environment.",
    totalFiles: 87,
    functionsDocumented: { done: 156, total: 156 },
    coverage: 100,
    lastGenerated: new Date("2025-12-18"),
    keyFeatures: [
      {
        name: "Secure Access Management",
        description:
          "Integrated authentication and session management to ensure that sensitive corporate data is only accessible to authorised personnel.",
      },
      {
        name: "Enterprise Data Integration",
        description:
          "Direct connectivity to Snowflake and support for local data formats (CSV), allowing seamless interaction with large-scale organisational datasets.",
      },
      {
        name: "Interactive Data Catalog",
        description:
          "A searchable sidebar and catalog view that helps users quickly discover and navigate available datasets and resources.",
      },
      {
        name: "Advanced Filtering & Saved Views",
        description:
          "Users can apply complex filters to narrow down data and save 'filter sets' to quickly return to specific views in the future.",
      },
      {
        name: "Dynamic Data Aggregation",
        description:
          "Built-in tools to group and summarise data automatically, helping users identify trends and high-level metrics at a glance.",
      },
      {
        name: "Visual Analytics",
        description:
          "Integrated plotting capabilities that transform raw table data into intuitive charts and graphs for better storytelling.",
      },
      {
        name: "Professional Reporting & Exports",
        description:
          "One-click functionality to format data and export findings directly to Microsoft Excel for offline sharing and presentations.",
      },
    ],
    targetAudience: [
      {
        role: "Business Analysts",
        description:
          "Who need to perform deep dives into specific datasets and generate recurring reports.",
      },
      {
        role: "Department Managers",
        description:
          "Who require high-level summaries and visual trends to monitor KPIs and team performance.",
      },
      {
        role: "Operations Teams",
        description:
          "Who need to search and filter through large catalogs of information to find specific records or subsets of data.",
      },
      {
        role: "Decision Makers",
        description:
          "Non-technical stakeholders who want a secure, 'no-code' way to interact with the company's data ecosystem.",
      },
    ],
    useCases: [
      {
        title: "Monthly Performance Reporting",
        description:
          "A manager can log in, select a specific dataset from the catalog, apply a saved 'Monthly Review' filter, and instantly export the formatted results to Excel for a board presentation.",
      },
      {
        title: "Trend Analysis and Visualisation",
        description:
          "An analyst can use the aggregation tools to group sales data by category and date, then use the plotting feature to visualise growth trends over the last four quarters without writing any database queries.",
      },
      {
        title: "Self-Service Data Discovery",
        description:
          "A new team member can use the sidebar search to explore the available data catalog, identify relevant datasets for their project, and preview the information in real-time.",
      },
    ],
    quality: {
      completeness: 100,
      qualityScore: 94,
      examplesIncluded: 78,
    },
    agentStats: {
      readerAgent: { filesAnalyzed: 87, linesOfCode: 14280 },
      writerAgent: { docstringsGenerated: 156 },
      searcherAgent: { contextsGathered: 312 },
      verifierAgent: { validationsCompleted: 156 },
    },
  },
  "5": {
    projectId: "5",
    projectName: "ecommerce-platform",
    repoPath: "/home/dev/ecommerce",
    overview:
      "A comprehensive payment processing system that handles multiple payment methods, authentication, and transaction management. The system provides RESTful APIs for payment processing, refunds, and transaction tracking with built-in security and compliance features.",
    totalFiles: 8,
    functionsDocumented: { done: 83, total: 83 },
    coverage: 100,
    lastGenerated: new Date("2025-11-26"),
    keyFeatures: [
      {
        name: "Automated Code-to-Documentation",
        description: "Converts source code into structured documentation automatically on every run.",
      },
      {
        name: "Real-Time Compliance Monitoring",
        description: "Continuously tracks system changes against compliance requirements.",
      },
      {
        name: "System Change Tracking",
        description: "Maintains a detailed audit trail of all modifications to the codebase.",
      },
      {
        name: "Infrastructure Design Documentation",
        description: "Generates up-to-date architecture diagrams and infrastructure docs.",
      },
      {
        name: "Security & Testing Procedures",
        description: "Documents security controls, test plans, and verification procedures.",
      },
      {
        name: "Audit-Ready Reporting",
        description: "Produces formatted reports ready for internal and external audit review.",
      },
    ],
    quality: {
      completeness: 100,
      qualityScore: 94,
      examplesIncluded: 78,
    },
    agentStats: {
      readerAgent: { filesAnalyzed: 83, linesOfCode: 9450 },
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
