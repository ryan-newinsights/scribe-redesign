export interface GitHubRepository {
  id: string;
  name: string;
  fullName: string; // owner/repo-name
  owner: string;
  isPrivate: boolean;
  language: string | null;
  updatedAt: string;
  isConnected?: boolean;
  connectedBy?: string;
  connectedAt?: string;
}

export interface GitHubConnection {
  id: string;
  username: string;
  avatarUrl: string;
  connectedAt: string;
}

export type ProcessingStatus = 
  | 'preparing'
  | 'fetching'
  | 'analyzing'
  | 'generating'
  | 'saving'
  | 'completed'
  | 'error';

export interface ProcessingState {
  status: ProcessingStatus;
  message: string;
  filesCount?: number;
  elapsedSeconds?: number;
  errorMessage?: string;
}

export type SyncStatus = 'up-to-date' | 'updates-available' | 'not-processed';

export interface GitHubProjectInfo {
  repositoryFullName: string;
  branch: string;
  lastCommit: string;
  lastCommitDate: string;
  lastProcessed: string;
  componentsDocumented: number;
}

export const languageColors: Record<string, string> = {
  TypeScript: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  JavaScript: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  Python: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Java: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  Go: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
  Rust: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  Ruby: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  PHP: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  'C#': 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  'C++': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  Swift: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
  Kotlin: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
};
