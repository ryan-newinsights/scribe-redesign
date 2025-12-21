export type JobStatus = 'completed' | 'running' | 'failed' | 'pending';

export interface Job {
  id: string;
  status: JobStatus;
  progress: number;
  createdAt: Date;
  errorMessage?: string;
}

export interface Project {
  id: string;
  name: string;
  repoPath: string;
  summary?: string;
  loc?: number;
  componentCount?: number;
  latestJob?: Job;
}

export interface LLMConfig {
  id: string;
  name: string;
  provider: string;
  modelName: string;
}

export interface RecentDocument {
  id: string;
  name: string;
  projectName: string;
  viewedAt: Date;
  url: string;
}
