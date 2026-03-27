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
    checkpointName: "Release 2.1",
    checkpointNote: "Payment module refactor complete",
    isoPrimary: "Maintainability",
    isoAffected: ["Maintainability", "Functional Suitability"],
    changeScope: "cross-cutting",
    changeSummary: "Payment module restructured into three sub-services with shared validation layer.",
    changeRationale: "Major modularity improvement — payment logic separated from order processing, reducing coupling across 8 components.",
    filesChanged: 24,
    componentsAffected: 12,
    diagramsInvalidated: 3,
    functionsAdded: 18,
    functionsRemoved: 6,
    releases: [
      {
        name: "PM-1: Extract Payment Validation",
        summary: "Shared validation layer extracted from PaymentProcessor into standalone service with schema-driven rules.",
        prRefs: ["#187", "#189"],
        isoPrimary: "Maintainability",
      },
      {
        name: "PM-2: Order Decoupling",
        summary: "Order processing now communicates with payment via event bus instead of direct imports, eliminating 8 circular dependencies.",
        prRefs: ["#191"],
        isoPrimary: "Maintainability",
      },
      {
        name: "PM-3: Refund Sub-service",
        summary: "Refund logic split into dedicated sub-service with its own retry queue and idempotency guarantees.",
        prRefs: ["#193", "#194"],
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
    changeSummary: "OAuth2 token refresh logic hardened with retry and circuit breaker.",
    changeRationale: "Authentication resilience improved — token refresh now handles provider outages gracefully.",
    filesChanged: 5,
    componentsAffected: 3,
    diagramsInvalidated: 0,
    functionsAdded: 4,
    functionsRemoved: 1,
    releases: [
      {
        name: "AUTH-1: Circuit Breaker",
        summary: "Added circuit breaker around token refresh endpoint with configurable failure threshold (5 failures / 60s window).",
        prRefs: ["#183"],
        isoPrimary: "Reliability",
      },
      {
        name: "AUTH-2: Token Rotation",
        summary: "Refresh tokens now rotate on each use with grace period overlap to prevent race conditions in concurrent requests.",
        prRefs: ["#184", "#185"],
        isoPrimary: "Security",
      },
    ],
  },
  {
    id: "snap-003",
    commitSha: "c1d9f88",
    committedAt: new Date("2026-03-20T16:45:00Z"),
    createdAt: new Date("2026-03-20T16:50:00Z"),
    checkpointName: "Q1 Audit Baseline",
    checkpointNote: "Pre-audit documentation freeze",
    isoPrimary: "Functional Suitability",
    isoAffected: ["Functional Suitability", "Compatibility"],
    changeScope: "structural",
    changeSummary: "New reporting engine added with configurable output adapters for CSV, PDF, and XBRL.",
    changeRationale: "Structural addition of a new subsystem — reporting engine with three output adapters changes the dependency graph significantly.",
    filesChanged: 31,
    componentsAffected: 15,
    diagramsInvalidated: 4,
    functionsAdded: 42,
    functionsRemoved: 0,
    releases: [
      {
        name: "RPT-1: Reporting Engine Core",
        summary: "Plugin-based reporting engine with adapter registry, supporting synchronous and streaming output modes.",
        prRefs: ["#170", "#171", "#172"],
        isoPrimary: "Functional Suitability",
      },
      {
        name: "RPT-2: CSV & PDF Adapters",
        summary: "CSV adapter with configurable delimiters and encoding; PDF adapter using headless Chrome for pixel-perfect rendering.",
        prRefs: ["#174"],
        isoPrimary: "Functional Suitability",
      },
      {
        name: "RPT-3: XBRL Compliance Adapter",
        summary: "XBRL output adapter with inline validation against SEC taxonomy, required for Q1 regulatory filing.",
        prRefs: ["#176", "#177"],
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
    isoAffected: ["Reliability", "Security"],
    changeScope: "cross-cutting",
    changeSummary: "Global error boundary and structured logging pipeline introduced across all API handlers.",
    changeRationale: "Cross-cutting reliability improvement — consistent error handling and observability across 14 API modules.",
    filesChanged: 19,
    componentsAffected: 14,
    diagramsInvalidated: 1,
    functionsAdded: 8,
    functionsRemoved: 2,
    releases: [
      {
        name: "OBS-1: Structured Logging",
        summary: "JSON-structured logging with correlation IDs, replacing ad-hoc print statements across all API handlers.",
        prRefs: ["#158", "#159"],
        isoPrimary: "Reliability",
      },
      {
        name: "OBS-2: Error Boundary Middleware",
        summary: "Global error boundary catches unhandled exceptions, logs stack traces with request context, and returns sanitized 5xx responses.",
        prRefs: ["#161"],
        isoPrimary: "Security",
      },
    ],
  },
  {
    id: "snap-006",
    commitSha: "f2c8a99",
    committedAt: new Date("2026-03-12T15:30:00Z"),
    createdAt: new Date("2026-03-12T15:35:00Z"),
    checkpointName: "Release 2.0",
    checkpointNote: "Major version release — new API surface",
    isoPrimary: "Compatibility",
    isoAffected: ["Compatibility", "Functional Suitability", "Security"],
    changeScope: "structural",
    changeSummary: "API v2 introduced with breaking changes to authentication and resource endpoints.",
    changeRationale: "Structural change — new API version introduces different authentication contract and resource schema, affecting all consumers.",
    filesChanged: 45,
    componentsAffected: 22,
    diagramsInvalidated: 5,
    functionsAdded: 35,
    functionsRemoved: 12,
    releases: [
      {
        name: "API-1: v2 Authentication Contract",
        summary: "New JWT-based auth with scoped permissions replacing API key auth; includes 90-day migration window with dual-support.",
        prRefs: ["#140", "#141", "#143"],
        isoPrimary: "Security",
      },
      {
        name: "API-2: Resource Schema Migration",
        summary: "All resource endpoints now use envelope response format with pagination cursors and HATEOAS links.",
        prRefs: ["#145", "#146"],
        isoPrimary: "Compatibility",
      },
      {
        name: "API-3: Deprecation Headers",
        summary: "v1 endpoints return Sunset and Deprecation headers per RFC 8594; client SDKs emit warnings on v1 usage.",
        prRefs: ["#148"],
        isoPrimary: "Compatibility",
      },
      {
        name: "API-4: OpenAPI 3.1 Spec",
        summary: "Auto-generated OpenAPI 3.1 specification with examples, published to developer portal with interactive playground.",
        prRefs: ["#150"],
        isoPrimary: "Functional Suitability",
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
    isoAffected: ["Security"],
    changeScope: "cross-cutting",
    changeSummary: "Input validation middleware applied to all public-facing endpoints.",
    changeRationale: "Security hardening — centralized input sanitization replaces per-handler validation across 11 endpoint groups.",
    filesChanged: 16,
    componentsAffected: 11,
    diagramsInvalidated: 0,
    functionsAdded: 6,
    functionsRemoved: 8,
    releases: [
      {
        name: "SEC-1: Validation Middleware",
        summary: "Zod-based request validation middleware with automatic 422 responses and structured error details for invalid payloads.",
        prRefs: ["#130", "#131"],
        isoPrimary: "Security",
      },
      {
        name: "SEC-2: SQL Injection Prevention",
        summary: "Parameterized query enforcement via ESLint rule; 3 legacy string-interpolated queries discovered and fixed.",
        prRefs: ["#133"],
        isoPrimary: "Security",
      },
    ],
  },
  {
    id: "snap-009",
    commitSha: "c7d8e9f",
    committedAt: new Date("2026-03-04T09:30:00Z"),
    createdAt: new Date("2026-03-04T09:35:00Z"),
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
    checkpointName: "Release 1.9",
    checkpointNote: "Final 1.x maintenance release",
    isoPrimary: "Reliability",
    isoAffected: ["Reliability", "Performance Efficiency"],
    changeScope: "cross-cutting",
    changeSummary: "Connection pooling and graceful shutdown implemented across all database consumers.",
    changeRationale: "Reliability and performance improvement — database connections now managed through shared pool with proper lifecycle management, eliminating connection leak under load.",
    filesChanged: 13,
    componentsAffected: 9,
    diagramsInvalidated: 2,
    functionsAdded: 7,
    functionsRemoved: 4,
    releases: [
      {
        name: "DB-1: Connection Pool Manager",
        summary: "Centralized connection pool with health checks, max-lifetime eviction, and per-tenant isolation for multi-org deployments.",
        prRefs: ["#120", "#121"],
        isoPrimary: "Reliability",
      },
      {
        name: "DB-2: Graceful Shutdown",
        summary: "SIGTERM handler drains active queries with 30s timeout before closing pool; prevents data corruption during rolling deploys.",
        prRefs: ["#123"],
        isoPrimary: "Reliability",
      },
      {
        name: "DB-3: Connection Leak Detection",
        summary: "Leaked connection detector logs stack trace of acquisition site when connections aren't returned within 60s.",
        prRefs: ["#125"],
        isoPrimary: "Performance Efficiency",
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
