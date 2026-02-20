export interface DocumentationQuality {
  completeness: number;
  qualityScore: number;
  examplesIncluded: number;
}

export interface AgentStats {
  readerAgent: { filesAnalyzed: number; linesOfCode: number };
  writerAgent: { docstringsGenerated: number };
  searcherAgent: { contextsGathered: number };
  verifierAgent: { validationsCompleted: number };
}

export interface KeyFeature {
  name: string;
  description: string;
}

export interface TargetAudience {
  role: string;
  description: string;
}

export interface UseCase {
  title: string;
  description: string;
}

export type DocSyncStatus = 'up-to-date' | 'updates-available' | 'not-synced';

export interface RepoDetails {
  type: 'github' | 'local';
  path: string;
  url?: string;
  branch: string;
  lastCommit: { hash: string; date: Date };
}

export interface DocumentationSummary {
  projectId: string;
  projectName: string;
  repoPath: string;
  repoDetails?: RepoDetails;
  overview: string;
  totalFiles: number;
  functionsDocumented: { done: number; total: number };
  coverage: number;
  syncStatus?: DocSyncStatus;
  lastGenerated: Date;
  keyFeatures: KeyFeature[];
  targetAudience?: TargetAudience[];
  useCases?: UseCase[];
  quality: DocumentationQuality;
  agentStats: AgentStats;
}

export interface DocumentFile {
  id: string;
  name: string;
  description: string;
  type: 'executive' | 'detailed' | 'diagrams';
}
