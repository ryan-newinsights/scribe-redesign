import { GitHubRepository, GitHubConnection } from "@/types/github";

export const mockGitHubConnection: GitHubConnection | null = null;

export const mockGitHubRepositories: GitHubRepository[] = [
  {
    id: "1",
    name: "scribe-ai",
    fullName: "acme-corp/scribe-ai",
    owner: "acme-corp",
    isPrivate: true,
    language: "TypeScript",
    updatedAt: "2025-01-14T10:30:00Z",
    isConnected: true,
    connectedBy: "John Smith",
    connectedAt: "2025-01-10T09:00:00Z",
  },
  {
    id: "2",
    name: "data-pipeline",
    fullName: "acme-corp/data-pipeline",
    owner: "acme-corp",
    isPrivate: true,
    language: "Python",
    updatedAt: "2025-01-13T15:20:00Z",
  },
  {
    id: "3",
    name: "frontend-ui",
    fullName: "acme-corp/frontend-ui",
    owner: "acme-corp",
    isPrivate: false,
    language: "JavaScript",
    updatedAt: "2025-01-12T08:45:00Z",
  },
  {
    id: "4",
    name: "api-gateway",
    fullName: "acme-corp/api-gateway",
    owner: "acme-corp",
    isPrivate: true,
    language: "Go",
    updatedAt: "2025-01-11T14:00:00Z",
  },
  {
    id: "5",
    name: "ml-models",
    fullName: "acme-corp/ml-models",
    owner: "acme-corp",
    isPrivate: true,
    language: "Python",
    updatedAt: "2025-01-10T11:30:00Z",
  },
  {
    id: "6",
    name: "mobile-app",
    fullName: "personal/mobile-app",
    owner: "personal",
    isPrivate: false,
    language: "Swift",
    updatedAt: "2025-01-09T16:15:00Z",
  },
  {
    id: "7",
    name: "dotfiles",
    fullName: "personal/dotfiles",
    owner: "personal",
    isPrivate: false,
    language: null,
    updatedAt: "2025-01-08T09:00:00Z",
  },
  {
    id: "8",
    name: "rust-experiments",
    fullName: "personal/rust-experiments",
    owner: "personal",
    isPrivate: true,
    language: "Rust",
    updatedAt: "2025-01-07T13:45:00Z",
  },
];

export const mockConnectedGitHubUser: GitHubConnection = {
  id: "gh-123",
  username: "johndoe",
  avatarUrl: "https://github.com/identicons/jasonlong.png",
  connectedAt: "2025-01-10T09:00:00Z",
};
