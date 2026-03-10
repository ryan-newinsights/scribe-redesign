export const organizationDetails: Record<string, {
  id: string;
  name: string;
  created: string;
  lastLogin: string;
  tiers: string[];
  members: { name: string; email: string; role: "Admin" | "Member"; lastLogin: string }[];
  projects: number;
  jobsRun: number;
  lastActive: string;
  jobs: { project: string; started: string; status: "Completed" | "Running" | "Failed"; duration: string; components: number }[];
  usageData: { date: string; tokens: number }[];
  jobsStarted: number;
  jobsCompleted: number;
  jobsFailed: number;
  availableTiers: { id: string; name: string; assigned: boolean; languages: string[]; features: string[] }[];
}> = {
  "acme-bank": {
    id: "acme-bank",
    name: "Acme Bank AG",
    created: "Jan 15, 2026",
    lastLogin: "2 hours ago",
    tiers: ["Enterprise", "Beta"],
    members: [
      { name: "Hans Müller", email: "hans@acmebank.de", role: "Admin", lastLogin: "2 hours ago" },
      { name: "Anna Schmidt", email: "anna@acmebank.de", role: "Member", lastLogin: "1 day ago" },
      { name: "Thomas Weber", email: "thomas@acmebank.de", role: "Member", lastLogin: "3 days ago" },
      { name: "Lisa Fischer", email: "lisa@acmebank.de", role: "Admin", lastLogin: "5 hours ago" },
    ],
    projects: 3,
    jobsRun: 47,
    lastActive: "2 hours ago",
    jobs: [
      { project: "core-banking-api", started: "2 hours ago", status: "Completed", duration: "4m 32s", components: 128 },
      { project: "mobile-app-backend", started: "5 hours ago", status: "Running", duration: "2m 10s", components: 64 },
      { project: "core-banking-api", started: "1 day ago", status: "Completed", duration: "5m 01s", components: 131 },
      { project: "fraud-detection", started: "2 days ago", status: "Failed", duration: "1m 45s", components: 42 },
      { project: "mobile-app-backend", started: "3 days ago", status: "Completed", duration: "3m 22s", components: 58 },
    ],
    usageData: [
      { date: "Mar 1", tokens: 12400 },
      { date: "Mar 2", tokens: 18200 },
      { date: "Mar 3", tokens: 15600 },
      { date: "Mar 4", tokens: 22100 },
      { date: "Mar 5", tokens: 19800 },
      { date: "Mar 6", tokens: 24500 },
      { date: "Mar 7", tokens: 21000 },
    ],
    jobsStarted: 47,
    jobsCompleted: 42,
    jobsFailed: 3,
    availableTiers: [
      { id: "starter", name: "Starter", assigned: false, languages: ["Python"], features: ["Basic Generation"] },
      { id: "professional", name: "Professional", assigned: false, languages: ["Python", "Java"], features: ["Gemini 2.5 Pro", "Diagram Generation"] },
      { id: "enterprise", name: "Enterprise", assigned: true, languages: ["Python", "Java", "JavaScript"], features: ["Gemini 2.5 Pro", "Grounding", "Diagram Generation"] },
      { id: "beta", name: "Beta", assigned: true, languages: ["TypeScript", "Go"], features: ["Experimental Models", "Advanced Grounding"] },
    ],
  },
};

// Fallback for any org ID
export function getOrgDetail(orgId: string) {
  return organizationDetails[orgId] ?? {
    id: orgId,
    name: orgId.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    created: "Feb 1, 2026",
    lastLogin: "1 day ago",
    tiers: ["Professional"],
    members: [
      { name: "Max Mustermann", email: "max@example.com", role: "Admin" as const, lastLogin: "1 day ago" },
      { name: "Erika Musterfrau", email: "erika@example.com", role: "Member" as const, lastLogin: "3 days ago" },
    ],
    projects: 2,
    jobsRun: 15,
    lastActive: "1 day ago",
    jobs: [
      { project: "main-service", started: "1 day ago", status: "Completed" as const, duration: "3m 12s", components: 45 },
    ],
    usageData: [
      { date: "Mar 1", tokens: 5000 },
      { date: "Mar 2", tokens: 7200 },
      { date: "Mar 3", tokens: 6100 },
    ],
    jobsStarted: 15,
    jobsCompleted: 13,
    jobsFailed: 1,
    availableTiers: [
      { id: "starter", name: "Starter", assigned: false, languages: ["Python"], features: ["Basic Generation"] },
      { id: "professional", name: "Professional", assigned: true, languages: ["Python", "Java"], features: ["Gemini 2.5 Pro", "Diagram Generation"] },
      { id: "enterprise", name: "Enterprise", assigned: false, languages: ["Python", "Java", "JavaScript"], features: ["Gemini 2.5 Pro", "Grounding", "Diagram Generation"] },
      { id: "beta", name: "Beta", assigned: false, languages: ["TypeScript", "Go"], features: ["Experimental Models", "Advanced Grounding"] },
    ],
  };
}
