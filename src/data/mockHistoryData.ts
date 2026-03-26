export type ISOCharacteristic =
  | "Functional Suitability"
  | "Reliability"
  | "Security"
  | "Maintainability"
  | "Performance Efficiency"
  | "Compatibility";

export type ChangeScope = "contained" | "cross-cutting" | "structural";

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
}

export interface WeeklySummary {
  weekStart: string; // YYYY-MM-DD
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

// ISO 25010 color mapping — keys match CSS tokens
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
  },
  {
    id: "snap-004",
    commitSha: "d4a6e33",
    committedAt: new Date("2026-03-18T11:20:00Z"),
    createdAt: new Date("2026-03-18T11:25:00Z"),
    isoPrimary: "Performance Efficiency",
    isoAffected: ["Performance Efficiency"],
    changeScope: "contained",
    changeSummary: "Database query optimization for dashboard aggregation endpoints.",
    changeRationale: "Query performance improvements — N+1 queries eliminated in dashboard data loading, reducing p95 latency.",
    filesChanged: 7,
    componentsAffected: 4,
    diagramsInvalidated: 0,
    functionsAdded: 2,
    functionsRemoved: 3,
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
  },
  {
    id: "snap-007",
    commitSha: "a1b2c3d",
    committedAt: new Date("2026-03-10T10:00:00Z"),
    createdAt: new Date("2026-03-10T10:05:00Z"),
    isoPrimary: "Maintainability",
    isoAffected: ["Maintainability"],
    changeScope: "contained",
    changeSummary: "Test coverage expansion for user management module.",
    changeRationale: "Testability improvement — 24 new unit tests added for user CRUD operations.",
    filesChanged: 8,
    componentsAffected: 2,
    diagramsInvalidated: 0,
    functionsAdded: 24,
    functionsRemoved: 0,
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
  },
  {
    id: "snap-009",
    commitSha: "c7d8e9f",
    committedAt: new Date("2026-03-04T09:30:00Z"),
    createdAt: new Date("2026-03-04T09:35:00Z"),
    isoPrimary: "Functional Suitability",
    isoAffected: ["Functional Suitability", "Maintainability"],
    changeScope: "contained",
    changeSummary: "Webhook handler refactored to support configurable event routing.",
    changeRationale: "Business logic enhancement — webhook events now routed through configurable handler registry.",
    filesChanged: 6,
    componentsAffected: 3,
    diagramsInvalidated: 1,
    functionsAdded: 5,
    functionsRemoved: 2,
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
    changeRationale: "Reliability and performance improvement — database connections now managed through shared pool with proper lifecycle management.",
    filesChanged: 13,
    componentsAffected: 9,
    diagramsInvalidated: 2,
    functionsAdded: 7,
    functionsRemoved: 4,
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
