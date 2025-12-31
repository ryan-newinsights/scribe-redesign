export interface DocumentationQuality {
  completeness: number;
  qualityScore: number;
  examplesIncluded: number;
}

export interface AgentStats {
  readerAgent: { filesAnalyzed: number };
  writerAgent: { docstringsGenerated: number };
  searcherAgent: { contextsGathered: number };
  verifierAgent: { validationsCompleted: number };
}

export interface DocumentationSummary {
  projectId: string;
  projectName: string;
  repoPath: string;
  overview: string;
  totalFiles: number;
  functionsDocumented: { done: number; total: number };
  coverage: number;
  lastGenerated: Date;
  keyFeatures: string[];
  quality: DocumentationQuality;
  agentStats: AgentStats;
}

export interface DocumentFile {
  id: string;
  name: string;
  description: string;
  type: 'executive' | 'detailed' | 'diagrams';
}
