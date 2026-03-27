export type ISOCharacteristic =
  | "Functional Suitability"
  | "Reliability"
  | "Security"
  | "Maintainability"
  | "Performance Efficiency"
  | "Compatibility";

export type ChangeScope = "contained" | "cross-cutting" | "structural";

export interface Release {
  name: string;
  summary: string;
  prRefs: string[];
  isoPrimary: ISOCharacteristic;
}

export interface HistorySnapshot {
  id: string;
  commitSha: string;
  committedAt: Date;
  createdAt: Date;
  checkpointName?: string;
  checkpointNote?: string;
  isoPrimary: ISOCharacteristic;
  isoAffected: ISOCharacteristic[];
  changeScope: ChangeScope;
  changeSummary: string;
  changeRationale: string;
  filesChanged: number;
  componentsAffected: number;
  diagramsInvalidated: number;
  functionsAdded: number;
  functionsRemoved: number;
  releases?: Release[];
}

export interface WeeklySummary {
  weekStart: string;
  headline: string;
  businessImpact: string;
  isoPrimary: ISOCharacteristic;
  isoAffected: ISOCharacteristic[];
  changeScope: ChangeScope;
  metrics: {
    filesChanged: number;
    componentsAffected: number;
    capabilitiesAdded: number;
    capabilitiesRemoved: number;
    releasesShipped: number;
  };
  snapshots: HistorySnapshot[];
}

// ISO 25010 color mapping
export const isoColorMap: Record<ISOCharacteristic, { bg: string; text: string; dot: string }> = {
  "Functional Suitability": { bg: "bg-blue-100 dark:bg-blue-950/40", text: "text-blue-700 dark:text-blue-400", dot: "bg-blue-500" },
  "Reliability":            { bg: "bg-yellow-100 dark:bg-yellow-950/40", text: "text-yellow-700 dark:text-yellow-400", dot: "bg-yellow-500" },
  "Security":               { bg: "bg-red-100 dark:bg-red-950/40", text: "text-red-700 dark:text-red-400", dot: "bg-red-500" },
  "Maintainability":        { bg: "bg-emerald-100 dark:bg-emerald-950/40", text: "text-emerald-700 dark:text-emerald-400", dot: "bg-emerald-500" },
  "Performance Efficiency": { bg: "bg-purple-100 dark:bg-purple-950/40", text: "text-purple-700 dark:text-purple-400", dot: "bg-purple-500" },
  "Compatibility":          { bg: "bg-orange-100 dark:bg-orange-950/40", text: "text-orange-700 dark:text-orange-400", dot: "bg-orange-500" },
};

export const scopeColorMap: Record<ChangeScope, { bg: string; text: string }> = {
  "contained":     { bg: "bg-muted", text: "text-muted-foreground" },
  "cross-cutting": { bg: "bg-amber-100 dark:bg-amber-950/40", text: "text-amber-700 dark:text-amber-400" },
  "structural":    { bg: "bg-red-100 dark:bg-red-950/40", text: "text-red-700 dark:text-red-400" },
};

export const mockSnapshots: HistorySnapshot[] = [
  {
    id: "snap-001",
    commitSha: "a3f8c21",
    committedAt: new Date("2026-03-24T14:30:00Z"),
    createdAt: new Date("2026-03-24T14:35:00Z"),
    checkpointName: "Multi-Org Tiers",
    checkpointNote: "Organization tier system with usage limits",
    isoPrimary: "Functional Suitability",
    isoAffected: ["Functional Suitability", "Security"],
    changeScope: "structural",
    changeSummary: "Organizations now have configurable tiers (Free, Pro, Enterprise) with per-tier rate limits, model access, and repo caps.",
    changeRationale: "Monetization-critical — tier enforcement is required before opening self-serve signups. Enterprise tier unlocks Gemini 1.5 Pro and unlimited repos; Free tier capped at 3 repos and 50 components/day.",
    filesChanged: 28,
    componentsAffected: 14,
    diagramsInvalidated: 3,
    functionsAdded: 22,
    functionsRemoved: 4,
    releases: [
      {
        name: "TIER-1: Organization Tier Model",
        summary: "New org_tiers table with configurable limits (max_repos, max_components_per_day, allowed_models) and admin override support.",
        prRefs: ["#201", "#203"],
        isoPrimary: "Functional Suitability",
      },
      {
        name: "TIER-2: Rate Limit Enforcement",
        summary: "Middleware checks tier limits before job submission; returns 429 with retry-after header and remaining quota in response headers.",
        prRefs: ["#205"],
        isoPrimary: "Security",
      },
      {
        name: "TIER-3: Usage Dashboard",
        summary: "Per-org usage panel showing daily component count, model token consumption, and percentage of tier limits consumed.",
        prRefs: ["#207", "#208"],
        isoPrimary: "Functional Suitability",
      },
    ],
  },
  {
    id: "snap-002",
    commitSha: "b7e2d45",
    committedAt: new Date("2026-03-22T09:15:00Z"),
    createdAt: new Date("2026-03-22T09:20:00Z"),
    isoPrimary: "Security",
    isoAffected: ["Security", "Reliability"],
    changeScope: "contained",
    changeSummary: "GitHub App token refresh hardened with retry logic and automatic re-authentication on 401 responses.",
    changeRationale: "GitHub installation tokens expire after 1 hour — long-running documentation jobs were failing silently mid-run. Token refresh now handles GitHub outages gracefully with circuit breaker.",
    filesChanged: 7,
    componentsAffected: 3,
    diagramsInvalidated: 0,
    functionsAdded: 5,
    functionsRemoved: 1,
    releases: [
      {
        name: "GH-1: Installation Token Circuit Breaker",
        summary: "Added circuit breaker around GitHub token refresh with configurable failure threshold (5 failures / 60s window) and fallback to cached token.",
        prRefs: ["#196"],
        isoPrimary: "Reliability",
      },
      {
        name: "GH-2: Token Pre-Refresh",
        summary: "Tokens now refresh 5 minutes before expiry instead of on-failure; eliminates mid-job auth failures for repos with 200+ components.",
        prRefs: ["#197", "#198"],
        isoPrimary: "Security",
      },
    ],
  },
  {
    id: "snap-003",
    commitSha: "c1d9f88",
    committedAt: new Date("2026-03-20T16:45:00Z"),
    createdAt: new Date("2026-03-20T16:50:00Z"),
    checkpointName: "Docs Export",
    checkpointNote: "Multi-format documentation export",
    isoPrimary: "Functional Suitability",
    isoAffected: ["Functional Suitability", "Compatibility"],
    changeScope: "structural",
    changeSummary: "Documentation can now be exported as Markdown, PDF, and Confluence-compatible HTML with configurable templates.",
    changeRationale: "Enterprise customers require offline documentation artifacts for compliance audits and internal wikis. Export closes the #1 feature request from pilot customers.",
    filesChanged: 31,
    componentsAffected: 15,
    diagramsInvalidated: 4,
    functionsAdded: 42,
    functionsRemoved: 0,
    releases: [
      {
        name: "EXP-1: Export Engine Core",
        summary: "Template-based export engine with adapter registry supporting synchronous single-file and streaming ZIP output modes.",
        prRefs: ["#190", "#191"],
        isoPrimary: "Functional Suitability",
      },
      {
        name: "EXP-2: Markdown & PDF Adapters",
        summary: "Markdown adapter preserves code fences and Mermaid diagrams; PDF adapter uses Puppeteer for pixel-perfect rendering with syntax highlighting.",
        prRefs: ["#192"],
        isoPrimary: "Functional Suitability",
      },
      {
        name: "EXP-3: Confluence Adapter",
        summary: "Confluence-compatible XHTML output with Atlassian storage format macros, automatic space/page hierarchy, and attachment handling.",
        prRefs: ["#194", "#195"],
        isoPrimary: "Compatibility",
      },
    ],
  },
  {
    id: "snap-004",
    commitSha: "d4a6e33",
    committedAt: new Date("2026-03-18T11:20:00Z"),
    createdAt: new Date("2026-03-18T11:25:00Z"),
    checkpointName: "Change Detection",
    checkpointNote: "Auto-detect repo changes and version docs",
    isoPrimary: "Functional Suitability",
    isoAffected: ["Functional Suitability", "Reliability", "Maintainability"],
    changeScope: "structural",
    changeSummary: "Repositories now detect changes automatically and preserve documentation history before updates.",
    changeRationale: "Documentation no longer silently goes stale — the system proactively signals when repos need attention, and every update is versioned with an audit-ready snapshot. This is foundational for the compliance timeline feature.",
    filesChanged: 52,
    componentsAffected: 18,
    diagramsInvalidated: 2,
    functionsAdded: 28,
    functionsRemoved: 5,
    releases: [
      {
        name: "Phase 1: Webhook-Based Change Detection",
        summary: "GitHub webhooks registered at connect-time push change notifications to Scribe in real time; compare API provides file-level diffs.",
        prRefs: ["#183"],
        isoPrimary: "Functional Suitability",
      },
      {
        name: "Phase 2: Dashboard Staleness Indicators",
        summary: "Project cards now show 'X commits behind' badges with batch sync-check on dashboard load reading cached webhook data.",
        prRefs: ["#184"],
        isoPrimary: "Functional Suitability",
      },
      {
        name: "Phase 3: Unified Generation Modal",
        summary: "Redesigned run/re-run modal with first-run vs update variants, default LLM config, and navigation to progress page on start.",
        prRefs: ["#186"],
        isoPrimary: "Functional Suitability",
      },
      {
        name: "Phase 4: Polling Fallback",
        summary: "Dashboard sync now live-checks webhook-less repos via the GitHub API on page load, capped at 10 per request.",
        prRefs: ["#188"],
        isoPrimary: "Reliability",
      },
      {
        name: "Phase 5: Versioned Documentation Snapshots",
        summary: "Every documentation run now preserves the previous state as a commit-anchored snapshot with async ISO 25010 classification.",
        prRefs: ["#189"],
        isoPrimary: "Maintainability",
      },
    ],
  },
  {
    id: "snap-005",
    commitSha: "e9b7c12",
    committedAt: new Date("2026-03-15T08:00:00Z"),
    createdAt: new Date("2026-03-15T08:05:00Z"),
    isoPrimary: "Reliability",
    isoAffected: ["Reliability", "Maintainability"],
    changeScope: "cross-cutting",
    changeSummary: "Job error handling overhauled — structured logging, dead-letter queue, and automatic retry for transient LLM failures.",
    changeRationale: "22% of documentation jobs were failing silently due to unhandled LLM timeouts and rate limits. Structured logging with correlation IDs enables debugging; dead-letter queue prevents data loss.",
    filesChanged: 19,
    componentsAffected: 14,
    diagramsInvalidated: 1,
    functionsAdded: 11,
    functionsRemoved: 3,
    releases: [
      {
        name: "JOB-1: Structured Job Logging",
        summary: "JSON-structured logging with job_id correlation across worker, LLM client, and storage layers — replacing ad-hoc print statements.",
        prRefs: ["#175", "#176"],
        isoPrimary: "Reliability",
      },
      {
        name: "JOB-2: Dead-Letter Queue",
        summary: "Failed components route to dead-letter queue with original context preserved; admin UI shows failed items with one-click retry.",
        prRefs: ["#178"],
        isoPrimary: "Reliability",
      },
      {
        name: "JOB-3: LLM Retry Policy",
        summary: "Exponential backoff with jitter for 429/503 responses; max 3 retries per component with circuit breaker at org level.",
        prRefs: ["#180"],
        isoPrimary: "Maintainability",
      },
    ],
  },
  {
    id: "snap-006",
    commitSha: "f2c8a99",
    committedAt: new Date("2026-03-12T15:30:00Z"),
    createdAt: new Date("2026-03-12T15:35:00Z"),
    checkpointName: "Capability Grouping",
    checkpointNote: "ISO 25010 capability classification for components",
    isoPrimary: "Functional Suitability",
    isoAffected: ["Functional Suitability", "Maintainability"],
    changeScope: "structural",
    changeSummary: "Components are now automatically classified into capability groups using LLM-based analysis of function signatures and docstrings.",
    changeRationale: "Flat component lists don't scale beyond 50 items. Capability grouping (e.g., 'Omnichannel Inbox', 'Authentication & SSO') gives users a navigable architecture map aligned to ISO 25010 quality characteristics.",
    filesChanged: 38,
    componentsAffected: 19,
    diagramsInvalidated: 5,
    functionsAdded: 29,
    functionsRemoved: 8,
    releases: [
      {
        name: "CAP-1: LLM Classification Pipeline",
        summary: "Two-pass classification: first pass extracts capability candidates from function names and imports; second pass merges duplicates via embedding similarity.",
        prRefs: ["#160", "#161", "#163"],
        isoPrimary: "Functional Suitability",
      },
      {
        name: "CAP-2: Grouped Sidebar Navigation",
        summary: "Code Docs sidebar now shows capability groups with component counts, expandable tree, and 'Grouped by Capability' toggle.",
        prRefs: ["#165", "#166"],
        isoPrimary: "Functional Suitability",
      },
      {
        name: "CAP-3: Capability Badges on Function Cards",
        summary: "Each documented function displays its capability tags as colored badges; clicking a badge filters the sidebar to that capability.",
        prRefs: ["#168"],
        isoPrimary: "Functional Suitability",
      },
      {
        name: "CAP-4: Classification Cache",
        summary: "Capability classifications cached per commit SHA; re-runs only reclassify changed components, reducing LLM calls by ~80% on incremental updates.",
        prRefs: ["#170"],
        isoPrimary: "Maintainability",
      },
    ],
  },
  {
    id: "snap-007",
    commitSha: "a1b2c3d",
    committedAt: new Date("2026-03-10T10:00:00Z"),
    createdAt: new Date("2026-03-10T10:05:00Z"),
    checkpointName: "UI Overhaul",
    checkpointNote: "Complete UI overhaul shipped",
    isoPrimary: "Maintainability",
    isoAffected: ["Maintainability", "Functional Suitability"],
    changeScope: "structural",
    changeSummary: "Complete UI overhaul — new sidebar navigation, redesigned dashboard, and dark mode.",
    changeRationale: "The application now matches the target design system, presenting a professional, modern interface for enterprise demos and customer-facing trials. Dark mode and theme persistence address a top usability request.",
    filesChanged: 48,
    componentsAffected: 22,
    diagramsInvalidated: 3,
    functionsAdded: 31,
    functionsRemoved: 15,
    releases: [
      {
        name: "Phase 1: Design System Foundation",
        summary: "Aligned CSS variables, typography, and Tailwind config with reference design; added Jost and Open Sans fonts.",
        prRefs: [],
        isoPrimary: "Maintainability",
      },
      {
        name: "Phase 2: Sidebar Navigation",
        summary: "Replaced top-header layout with collapsible left sidebar featuring project search, status dots, and persistent collapse state.",
        prRefs: [],
        isoPrimary: "Functional Suitability",
      },
      {
        name: "Phase 3: Dashboard Cards Redesign",
        summary: "Redesigned project cards with ghost icon buttons, group hover states, and compact metrics bar matching the reference design.",
        prRefs: [],
        isoPrimary: "Functional Suitability",
      },
      {
        name: "Phase 4: Dark Mode & Theme Settings",
        summary: "Added light/dark/system theme with DB-persisted user preference, anti-FOUC script, and new Settings > Appearance tab.",
        prRefs: [],
        isoPrimary: "Functional Suitability",
      },
      {
        name: "Phase 5: Dead Code Cleanup",
        summary: "Removed 15 dead files (legacy JS, templates, CSS, deployment configs) — ~50KB of unused code eliminated.",
        prRefs: [],
        isoPrimary: "Maintainability",
      },
      {
        name: "Phase 6: Polish & Integration Testing",
        summary: "Added animations (spin, pulse), verified all card actions, polling intervals, responsive behaviour, and dark mode across all pages.",
        prRefs: [],
        isoPrimary: "Reliability",
      },
    ],
  },
  {
    id: "snap-008",
    commitSha: "b4c5d6e",
    committedAt: new Date("2026-03-07T13:45:00Z"),
    createdAt: new Date("2026-03-07T13:50:00Z"),
    isoPrimary: "Security",
    isoAffected: ["Security", "Reliability"],
    changeScope: "cross-cutting",
    changeSummary: "API key authentication and per-org scoping applied to all documentation endpoints.",
    changeRationale: "Pre-launch security hardening — all endpoints now require org-scoped API keys with rotation support. Prevents cross-org data access and enables audit logging of all API calls.",
    filesChanged: 16,
    componentsAffected: 11,
    diagramsInvalidated: 0,
    functionsAdded: 9,
    functionsRemoved: 5,
    releases: [
      {
        name: "SEC-1: API Key Authentication",
        summary: "SHA-256 hashed API keys with org_id scoping; keys stored with prefix for quick lookup and last-used timestamp for rotation audits.",
        prRefs: ["#153", "#154"],
        isoPrimary: "Security",
      },
      {
        name: "SEC-2: Request Validation Middleware",
        summary: "Zod-based request validation on all public endpoints with automatic 422 responses and structured error details for invalid payloads.",
        prRefs: ["#156"],
        isoPrimary: "Security",
      },
      {
        name: "SEC-3: Audit Logging",
        summary: "All API calls logged with org_id, endpoint, response code, and latency; queryable via admin panel for compliance reporting.",
        prRefs: ["#157"],
        isoPrimary: "Reliability",
      },
    ],
  },
  {
    id: "snap-009",
    commitSha: "c7d8e9f",
    committedAt: new Date("2026-03-04T09:30:00Z"),
    createdAt: new Date("2026-03-04T09:35:00Z"),
    checkpointName: "5× Faster",
    checkpointNote: "Parallel processing and async networking",
    isoPrimary: "Performance Efficiency",
    isoAffected: ["Performance Efficiency", "Reliability"],
    changeScope: "cross-cutting",
    changeSummary: "Documentation processing now runs 5x faster with parallel execution and async networking.",
    changeRationale: "Large codebases that previously took 20+ minutes to document now complete in under 4. This removes the primary friction point reported by trial users and unblocks enterprise evaluations with 500+ component repositories.",
    filesChanged: 34,
    componentsAffected: 12,
    diagramsInvalidated: 1,
    functionsAdded: 15,
    functionsRemoved: 7,
    releases: [
      {
        name: "EA-1: Parallel Component Processing",
        summary: "Components within a batch now process concurrently via ThreadPoolExecutor with configurable per-org worker pools (default: 40).",
        prRefs: ["#141", "#142"],
        isoPrimary: "Performance Efficiency",
      },
      {
        name: "EA-1b: Fix Batch Formation",
        summary: "Replaced WCC-based batching with fixed-size chunking; raised worker cap from 10 to 40 and corrected Vertex AI output TPM from 40K to 1.6M.",
        prRefs: ["#152"],
        isoPrimary: "Reliability",
      },
      {
        name: "EA-2: Async LLM Client",
        summary: "Replaced synchronous HTTP with httpx connection pooling, Gemini batch prediction, and exponential backoff retry on transient errors.",
        prRefs: ["#151"],
        isoPrimary: "Performance Efficiency",
      },
      {
        name: "EA-5: PostgreSQL Migration",
        summary: "Production database migrated from SQLite to PostgreSQL with connection pooling, enabling concurrent workers and atomic job claiming.",
        prRefs: [],
        isoPrimary: "Reliability",
      },
    ],
  },
  {
    id: "snap-010",
    commitSha: "d0e1f2a",
    committedAt: new Date("2026-03-01T17:00:00Z"),
    createdAt: new Date("2026-03-01T17:05:00Z"),
    checkpointName: "MVP Launch",
    checkpointNote: "Initial end-to-end documentation pipeline",
    isoPrimary: "Functional Suitability",
    isoAffected: ["Functional Suitability", "Reliability", "Performance Efficiency"],
    changeScope: "structural",
    changeSummary: "End-to-end documentation pipeline: connect a GitHub repo, analyze components, generate docs with Gemini, and browse results.",
    changeRationale: "First deployable product — users can connect a repo via GitHub App, trigger analysis, and view generated function-level documentation. Covers the core loop needed for early adopter feedback.",
    filesChanged: 62,
    componentsAffected: 28,
    diagramsInvalidated: 0,
    functionsAdded: 85,
    functionsRemoved: 0,
    releases: [
      {
        name: "MVP-1: GitHub App Integration",
        summary: "GitHub App with repository installation flow, webhook registration, and file tree retrieval via the Contents API.",
        prRefs: ["#100", "#101", "#103"],
        isoPrimary: "Functional Suitability",
      },
      {
        name: "MVP-2: Component Analysis Engine",
        summary: "AST-based component detection for Python, TypeScript, and Ruby with dependency graph extraction and function signature parsing.",
        prRefs: ["#110", "#112"],
        isoPrimary: "Functional Suitability",
      },
      {
        name: "MVP-3: LLM Documentation Generator",
        summary: "Gemini 1.5 Flash generates function-level documentation from source code with structured JSON output and confidence scoring.",
        prRefs: ["#115", "#116"],
        isoPrimary: "Functional Suitability",
      },
      {
        name: "MVP-4: Documentation Viewer",
        summary: "File-tree sidebar with function cards showing name, type, file location, description, and documentation completeness status.",
        prRefs: ["#120", "#121", "#123"],
        isoPrimary: "Functional Suitability",
      },
    ],
  },
];

// Group snapshots into weekly summaries
export function groupSnapshotsByWeek(snapshots: HistorySnapshot[]): WeeklySummary[] {
  const weeks = new Map<string, HistorySnapshot[]>();

  for (const snap of snapshots) {
    const d = new Date(snap.committedAt);
    const day = d.getDay();
    const monday = new Date(d);
    monday.setDate(d.getDate() - ((day + 6) % 7));
    const key = monday.toISOString().slice(0, 10);
    if (!weeks.has(key)) weeks.set(key, []);
    weeks.get(key)!.push(snap);
  }

  return Array.from(weeks.entries())
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([weekStart, snaps]) => {
      const allIso = snaps.flatMap((s) => s.isoAffected);
      const primaryCounts = new Map<ISOCharacteristic, number>();
      snaps.forEach((s) => primaryCounts.set(s.isoPrimary, (primaryCounts.get(s.isoPrimary) || 0) + 1));
      const dominantIso = [...primaryCounts.entries()].sort((a, b) => b[1] - a[1])[0][0];
      const maxScope = snaps.some((s) => s.changeScope === "structural")
        ? "structural"
        : snaps.some((s) => s.changeScope === "cross-cutting")
          ? "cross-cutting"
          : "contained";

      return {
        weekStart,
        headline: snaps[0].changeSummary.slice(0, 80),
        businessImpact: snaps.map((s) => s.changeRationale).join(" "),
        isoPrimary: dominantIso,
        isoAffected: [...new Set(allIso)] as ISOCharacteristic[],
        changeScope: maxScope as ChangeScope,
        metrics: {
          filesChanged: snaps.reduce((a, s) => a + s.filesChanged, 0),
          componentsAffected: snaps.reduce((a, s) => a + s.componentsAffected, 0),
          capabilitiesAdded: snaps.reduce((a, s) => a + s.functionsAdded, 0),
          capabilitiesRemoved: snaps.reduce((a, s) => a + s.functionsRemoved, 0),
          releasesShipped: snaps.filter((s) => s.checkpointName).length,
        },
        snapshots: snaps,
      };
    });
}
