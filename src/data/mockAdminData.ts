export interface Language {
  id: string;
  displayName: string;
  key: string;
  icon: string;
  fileExtensions: string[];
  available: boolean;
}

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: string;
  tiers: string[];
  apiKey?: string;
}

export interface TierConfig {
  id: string;
  name: string;
  active: boolean;
  isBeta?: boolean;
  languages: string[];
  features: string[];
}

export const mockLanguages: Language[] = [
  { id: "1", displayName: "Python", key: "python", icon: "🐍", fileExtensions: [".py", ".pyw", ".pyi"], available: true },
  { id: "2", displayName: "JavaScript", key: "javascript", icon: "JS", fileExtensions: [".js", ".mjs", ".cjs"], available: true },
  { id: "3", displayName: "TypeScript", key: "typescript", icon: "TS", fileExtensions: [".ts", ".tsx", ".mts"], available: true },
  { id: "4", displayName: "Java", key: "java", icon: "☕", fileExtensions: [".java", ".jar"], available: true },
  { id: "5", displayName: "Go", key: "golang", icon: "Go", fileExtensions: [".go"], available: true },
  { id: "6", displayName: "Rust", key: "rust", icon: "🦀", fileExtensions: [".rs"], available: false },
  { id: "7", displayName: "C#", key: "csharp", icon: "C#", fileExtensions: [".cs", ".csx"], available: true },
  { id: "8", displayName: "Ruby", key: "ruby", icon: "💎", fileExtensions: [".rb", ".erb"], available: false },
  { id: "9", displayName: "PHP", key: "php", icon: "🐘", fileExtensions: [".php", ".phtml"], available: true },
  { id: "10", displayName: "Swift", key: "swift", icon: "🐦", fileExtensions: [".swift"], available: false },
  { id: "11", displayName: "Kotlin", key: "kotlin", icon: "K", fileExtensions: [".kt", ".kts"], available: true },
  { id: "12", displayName: "Scala", key: "scala", icon: "Sc", fileExtensions: [".scala", ".sc"], available: false },
];

export const mockFeatureFlags: FeatureFlag[] = [
  // LLM Providers
  { id: "f1", name: "OpenAI GPT-4", description: "Use GPT-4 for code analysis and documentation generation", enabled: true, category: "LLM Providers", tiers: ["Professional", "Enterprise"], apiKey: "sk-proj-••••••••••••••••••3xQ" },
  { id: "f2", name: "Anthropic Claude", description: "Use Claude for natural language explanations and summaries", enabled: true, category: "LLM Providers", tiers: ["Enterprise"], apiKey: "sk-ant-••••••••••••••••••9bR" },
  { id: "f3", name: "Google Gemini", description: "Use Gemini Pro for multi-modal code understanding", enabled: false, category: "LLM Providers", tiers: ["Enterprise", "Beta"], apiKey: "AIza••••••••••••••••••kL2" },
  // Documentation Features
  { id: "f4", name: "Auto-generated Diagrams", description: "Automatically create architecture and flow diagrams from code", enabled: true, category: "Documentation Features", tiers: ["Professional", "Enterprise"] },
  { id: "f5", name: "Technical Deep Dives", description: "Generate comprehensive technical analysis documents", enabled: true, category: "Documentation Features", tiers: ["Professional", "Enterprise"] },
  { id: "f6", name: "API Reference Docs", description: "Extract and format API endpoint documentation", enabled: true, category: "Documentation Features", tiers: ["Starter", "Professional", "Enterprise"] },
  { id: "f7", name: "Change Impact Analysis", description: "Analyze how code changes affect the broader system", enabled: false, category: "Documentation Features", tiers: ["Enterprise"] },
  // Integrations
  { id: "f8", name: "GitHub Integration", description: "Connect to GitHub repositories for automatic syncing", enabled: true, category: "Integrations", tiers: ["Starter", "Professional", "Enterprise"] },
  { id: "f9", name: "GitLab Integration", description: "Connect to GitLab repositories and CI/CD pipelines", enabled: true, category: "Integrations", tiers: ["Professional", "Enterprise"] },
  { id: "f10", name: "Slack Notifications", description: "Send documentation updates and alerts to Slack channels", enabled: false, category: "Integrations", tiers: ["Professional", "Enterprise"] },
  { id: "f11", name: "Jira Sync", description: "Sync documentation with Jira tickets and epics", enabled: false, category: "Integrations", tiers: ["Enterprise"] },
];

export const mockTierConfigs: TierConfig[] = [
  {
    id: "t1",
    name: "Starter",
    active: true,
    languages: ["Python", "JavaScript", "TypeScript"],
    features: ["API Reference Docs", "GitHub Integration"],
  },
  {
    id: "t2",
    name: "Professional",
    active: true,
    languages: ["Python", "JavaScript", "TypeScript", "Java", "Go", "C#", "PHP", "Kotlin"],
    features: ["OpenAI GPT-4", "Auto-generated Diagrams", "Technical Deep Dives", "API Reference Docs", "GitHub Integration", "GitLab Integration", "Slack Notifications"],
  },
  {
    id: "t3",
    name: "Enterprise",
    active: true,
    languages: ["Python", "JavaScript", "TypeScript", "Java", "Go", "C#", "PHP", "Kotlin", "Ruby", "Swift", "Scala"],
    features: ["OpenAI GPT-4", "Anthropic Claude", "Google Gemini", "Auto-generated Diagrams", "Technical Deep Dives", "API Reference Docs", "Change Impact Analysis", "GitHub Integration", "GitLab Integration", "Slack Notifications", "Jira Sync"],
  },
  {
    id: "t4",
    name: "Beta",
    active: true,
    isBeta: true,
    languages: ["Rust", "Swift", "Scala"],
    features: ["Google Gemini", "Change Impact Analysis"],
  },
];
