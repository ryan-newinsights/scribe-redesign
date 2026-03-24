export type JobStatus = 'completed' | 'running' | 'failed' | 'pending';

export type IntegrationSource = 'local' | 'github';

export type SyncStatus = 'up-to-date' | 'updates-available' | 'not-synced';

export interface Job {
  id: string;
  status: JobStatus;
  progress: number;
  createdAt: Date;
  errorMessage?: string;
  totalTokens?: number;
}

export interface Project {
  id: string;
  name: string;
  repoPath: string;
  summary?: string;
  loc?: number;
  componentCount?: number;
  commitsBehind?: number;
  latestJob?: Job;
  integrationSource: IntegrationSource;
  syncStatus?: SyncStatus;
}

export interface LLMConfig {
  id: string;
  name: string;
  provider: string;
  modelName: string;
  isDefault?: boolean;
}

export interface RecentDocument {
  id: string;
  name: string;
  projectName: string;
  viewedAt: Date;
  url: string;
}
