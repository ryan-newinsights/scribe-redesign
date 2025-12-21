export type AgentStepStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped';

export interface AgentStep {
  id: string;
  name: string;
  description: string;
  status: AgentStepStatus;
  startedAt?: Date;
  completedAt?: Date;
  output?: string;
  error?: string;
}

export interface WorkflowPhase {
  id: string;
  name: string;
  steps: AgentStep[];
}

export interface DocumentationJob {
  id: string;
  projectId: string;
  projectName: string;
  repoPath: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  currentPhase: string;
  currentStep: string;
  phases: WorkflowPhase[];
  startedAt: Date;
  estimatedCompletion?: Date;
  logs: JobLog[];
}

export interface JobLog {
  id: string;
  timestamp: Date;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  step?: string;
}
