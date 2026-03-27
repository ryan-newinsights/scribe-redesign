import { useState, useMemo } from "react";
import { Flag, GitCommit, FileText, Box, LayoutDashboard, TrendingUp, TrendingDown, GitPullRequest } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { HistorySnapshot, ISOCharacteristic } from "@/data/mockHistoryData";
import { isoColorMap, scopeColorMap } from "@/data/mockHistoryData";

interface CombinedViewProps {
  snapshots: HistorySnapshot[];
}

const ISO_ORDER: ISOCharacteristic[] = [
  "Functional Suitability",
  "Reliability",
  "Security",
  "Maintainability",
  "Performance Efficiency",
  "Compatibility",
];

export const CombinedView = ({ snapshots }: CombinedViewProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const activeId = selectedId || hoveredId;

  const maxFiles = useMemo(() => Math.max(...snapshots.map((s) => s.filesChanged)), [snapshots]);

  // Sparkline data - cumulative functions over time
  const cumulativeData = useMemo(() => {
    let cumulative = 0;
    return [...snapshots].reverse().map((s) => {
      cumulative += s.functionsAdded - s.functionsRemoved;
      return { id: s.id, value: cumulative, date: s.committedAt };
    });
  }, [snapshots]);

  const maxCumulative = useMemo(() => Math.max(...cumulativeData.map((d) => Math.abs(d.value)), 1), [cumulativeData]);

  const activeSnapshot = activeId ? snapshots.find((s) => s.id === activeId) : null;

  return (
    <div className="space-y-6">
      {/* Interactive chart area */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        {/* Mini sparkline header */}
        <div className="px-4 pt-4 pb-2">
          <p className="text-xs font-semibold text-foreground mb-1">Net Capability Growth</p>
          <p className="text-[11px] text-muted-foreground">
            {activeSnapshot
              ? `${format(activeSnapshot.committedAt, "MMM d")} · ${activeSnapshot.commitSha}${activeSnapshot.checkpointName ? ` · ${activeSnapshot.checkpointName}` : ""}`
              : "Hover or click a snapshot to inspect"
            }
          </p>
        </div>

        {/* SVG sparkline */}
        <div className="px-4 pb-2">
          <svg viewBox="0 0 400 80" className="w-full h-20" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="40" x2="400" y2="40" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="4" />

            {/* Area fill */}
            <path
              d={`M0,80 ${cumulativeData.map((d, i) => {
                const x = (i / (cumulativeData.length - 1)) * 400;
                const y = 80 - (d.value / maxCumulative) * 70 - 5;
                return `L${x},${y}`;
              }).join(" ")} L400,80 Z`}
              fill="hsl(var(--accent))"
              opacity="0.08"
            />

            {/* Line */}
            <path
              d={cumulativeData.map((d, i) => {
                const x = (i / (cumulativeData.length - 1)) * 400;
                const y = 80 - (d.value / maxCumulative) * 70 - 5;
                return `${i === 0 ? "M" : "L"}${x},${y}`;
              }).join(" ")}
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="1.5"
            />

            {/* Data points */}
            {cumulativeData.map((d, i) => {
              const x = (i / (cumulativeData.length - 1)) * 400;
              const y = 80 - (d.value / maxCumulative) * 70 - 5;
              const snap = snapshots.find((s) => s.id === d.id);
              const isCheckpoint = snap?.checkpointName;
              const isActive = d.id === activeId;

              return (
                <g key={d.id}>
                  {/* Hover target (larger invisible area) */}
                  <circle
                    cx={x}
                    cy={y}
                    r={12}
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredId(d.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => setSelectedId(selectedId === d.id ? null : d.id)}
                  />
                  {/* Visible dot */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isActive ? 5 : isCheckpoint ? 4 : 2.5}
                    fill={isActive ? "hsl(var(--accent))" : isCheckpoint ? "hsl(var(--accent))" : "hsl(var(--muted-foreground))"}
                    stroke={isActive ? "hsl(var(--background))" : "none"}
                    strokeWidth={isActive ? 2 : 0}
                    className="transition-all"
                  />
                  {/* Checkpoint flag */}
                  {isCheckpoint && !isActive && (
                    <text x={x} y={y - 8} textAnchor="middle" className="fill-accent text-[8px] font-medium">▲</text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Impact heatmap row */}
        <div className="px-4 pb-4">
          <p className="text-[10px] text-muted-foreground mb-1.5">Impact Heatmap (files changed)</p>
          <div className="flex gap-0.5">
            {[...snapshots].reverse().map((snap) => {
              const intensity = snap.filesChanged / maxFiles;
              const isActive = snap.id === activeId;
              return (
                <div
                  key={snap.id}
                  className={cn(
                    "flex-1 h-6 rounded-sm cursor-pointer transition-all",
                    isActive && "ring-1 ring-accent ring-offset-1 ring-offset-background"
                  )}
                  style={{
                    backgroundColor: `hsl(var(--accent) / ${0.1 + intensity * 0.6})`,
                  }}
                  onMouseEnter={() => setHoveredId(snap.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setSelectedId(selectedId === snap.id ? null : snap.id)}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Timeline entries — detail appears on selection */}
      <div className="relative">
        <div className="absolute left-[15px] top-6 bottom-0 w-px bg-border" />

        <div className="space-y-0">
          {snapshots.map((snap) => {
            const isCheckpoint = !!snap.checkpointName;
            const isoColors = isoColorMap[snap.isoPrimary];
            const scopeColors = scopeColorMap[snap.changeScope];
            const isActive = snap.id === activeId;
            const isExpanded = snap.id === selectedId;

            return (
              <div
                key={snap.id}
                onMouseEnter={() => setHoveredId(snap.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedId(selectedId === snap.id ? null : snap.id)}
                className={cn(
                  "relative pl-10 pr-3 py-3 rounded-lg transition-all cursor-pointer",
                  isActive ? "bg-muted/80" : "hover:bg-muted/40",
                  isCheckpoint && "border-l-2 border-l-accent ml-[14px] pl-[22px]"
                )}
              >
                {/* Timeline node */}
                <div
                  className={cn(
                    "absolute left-[9px] top-4 z-10 rounded-full transition-all",
                    isCheckpoint
                      ? "h-[14px] w-[14px] bg-accent"
                      : isActive
                        ? "h-[10px] w-[10px] bg-accent"
                        : "h-[8px] w-[8px] bg-border",
                    isCheckpoint && "-ml-[1px]"
                  )}
                />

                {/* Compact row */}
                <div className="flex items-center gap-2 flex-wrap">
                  {isCheckpoint && (
                    <span className="text-sm font-semibold text-foreground">{snap.checkpointName}</span>
                  )}
                  <span className="text-xs font-mono text-muted-foreground">{snap.commitSha}</span>
                  <span className="text-xs text-muted-foreground">{format(snap.committedAt, "MMM d")}</span>
                  <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-medium", isoColors.bg, isoColors.text)}>
                    {snap.isoPrimary}
                  </span>
                  <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-medium", scopeColors.bg, scopeColors.text)}>
                    {snap.changeScope}
                  </span>

                  {/* Impact bar inline */}
                  <div className="flex-1 min-w-[60px] max-w-[120px] h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent/50 rounded-full"
                      style={{ width: `${(snap.filesChanged / maxFiles) * 100}%` }}
                    />
                  </div>

                  <span className="text-[11px] font-mono text-muted-foreground">
                    {snap.functionsAdded > snap.functionsRemoved ? (
                      <span className="text-accent">+{snap.functionsAdded - snap.functionsRemoved}</span>
                    ) : (
                      <span className="text-destructive">−{snap.functionsRemoved - snap.functionsAdded}</span>
                    )}
                  </span>
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-border space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                    <p className="text-sm text-foreground leading-relaxed">{snap.changeSummary}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{snap.changeRationale}</p>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
                      <span className="flex items-center gap-1">
                        <FileText className="h-3 w-3" /> {snap.filesChanged} files
                      </span>
                      <span className="flex items-center gap-1">
                        <Box className="h-3 w-3" /> {snap.componentsAffected} components
                      </span>
                      {snap.diagramsInvalidated > 0 && (
                        <span className="flex items-center gap-1">
                          <LayoutDashboard className="h-3 w-3" /> {snap.diagramsInvalidated} diagrams
                        </span>
                      )}
                    </div>

                    {/* ISO tags */}
                    <div className="flex items-center gap-1 flex-wrap pt-1">
                      {snap.isoAffected.map((iso) => {
                        const c = isoColorMap[iso];
                        return (
                          <span key={iso} className={cn("text-[10px] px-1.5 py-0.5 rounded-full", c.bg, c.text)}>
                            {iso}
                          </span>
                        );
                      })}
                    </div>

                    {/* Releases */}
                    {snap.releases && snap.releases.length > 0 && (
                      <div className="space-y-2 pt-2">
                        {snap.releases.map((rel, ri) => {
                          const relColors = isoColorMap[rel.isoPrimary];
                          return (
                            <div key={ri} className="flex items-start gap-2 pl-1">
                              <div className={cn("mt-1.5 h-1.5 w-1.5 rounded-full shrink-0", relColors.dot)} />
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="text-xs font-medium text-foreground">{rel.name}</span>
                                  {rel.prRefs.length > 0 && (
                                    <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                                      <GitPullRequest className="h-2.5 w-2.5" />
                                      {rel.prRefs.join(", ")}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-muted-foreground leading-relaxed">{rel.summary}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
