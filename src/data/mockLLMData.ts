export interface LLMConfiguration {
  id: string;
  name: string;
  provider: string;
  platform: string;
  modelKey: string;
  icon: "sparkles" | "cloud";
  dateAdded: string;
  isDefault?: boolean;
}

export const mockLLMConfigurations: LLMConfiguration[] = [
  {
    id: "1",
    name: "Gemini 3.1 Pro Preview",
    provider: "Gemini",
    platform: "AI Studio",
    modelKey: "gemini-3.1-pro-preview",
    icon: "sparkles",
    dateAdded: "3/1/2026",
    isDefault: true,
  },
  {
    id: "2",
    name: "Gemini 3 Flash",
    provider: "Gemini",
    platform: "AI Studio",
    modelKey: "gemini-3-flash-preview",
    icon: "sparkles",
    dateAdded: "3/1/2026",
  },
  {
    id: "3",
    name: "Gemini 3 Pro",
    provider: "Gemini",
    platform: "AI Studio",
    modelKey: "gemini-3-pro-preview",
    icon: "sparkles",
    dateAdded: "3/1/2026",
  },
  {
    id: "4",
    name: "Vertex - Gemini 3 Flash",
    provider: "Gemini",
    platform: "Vertex AI",
    modelKey: "gemini-3-flash-preview",
    icon: "cloud",
    dateAdded: "3/1/2026",
  },
];
