import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Flag, TrendingUp, TrendingDown } from "lucide-react";
import { format } from "date-fns";
import type { HistorySnapshot, ISOCharacteristic } from "@/data/mockHistoryData";
import { isoColorMap, scopeColorMap } from "@/data/mockHistoryData";

interface GraphRichViewProps {
  snapshots: HistorySnapshot[];
  onSelectSnapshot?: (id: string) => void;
  selectedId?: string;
}

const ISO_ORDER: ISOCharacteristic[] = [
  "Functional Suitability",
  "Reliability",
  "Security",
  "Maintainability",
  "Performance Efficiency",
  "Compatibility",
];

export const GraphRichView = ({ snapshots, onSelectSnapshot, selectedId }: GraphRichViewProps) => {
  // Compute max values for scaling
  const maxFiles = useMemo(() => Math.max(...snapshots.map((s) => s.filesChanged)), [snapshots]);
  const maxComponents = useMemo(() => Math.max(...snapshots.map((s) => s.componentsAffected)), [snapshots]);

  // ISO distribution across all snapshots
  const isoDistribution = useMemo(() => {
    const counts = new Map<ISOCharacteristic, number>();
    snapshots.forEach((s) => {
      s.isoAffected.forEach((iso) => {
        counts.set(iso, (counts.get(iso) || 0) + 1);
      });
    });
    return ISO_ORDER.map((iso) => ({
      iso,
      count: counts.get(iso) || 0,
      pct: ((counts.get(iso) || 0) / snapshots.length) * 100,
    }));
  }, [snapshots]);

  // Scope distribution
  const scopeDistribution = useMemo(() => {
    const counts = { contained: 0, "cross-cutting": 0, structural: 0 };
    snapshots.forEach((s) => counts[s.changeScope]++);
    return Object.entries(counts).map(([scope, count]) => ({
      scope,
      count,
      pct: (count / snapshots.length) * 100,
    }));
  }, [snapshots]);

  return (
    <div className="space-y-6">
      {/* Summary charts row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ISO distribution */}
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs font-semibold text-foreground mb-3">Quality Characteristics Distribution</p>
          <div className="space-y-2">
            {isoDistribution.map(({ iso, count, pct }) => {
              const colors = isoColorMap[iso];
              return (
                <div key={iso} className="flex items-center gap-2">
                  <span className="text-[11px] text-muted-foreground w-28 shrink-0 truncate">{iso}</span>
                  <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all", colors.dot)}
                      style={{ width: `${Math.max(pct, 4)}%`, opacity: 0.7 }}
                    />
                  </div>
                  <span className="text-[11px] text-muted-foreground w-6 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scope distribution */}
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs font-semibold text-foreground mb-3">Change Scope Breakdown</p>
          <div className="flex items-end gap-3 h-24">
            {scopeDistribution.map(({ scope, count, pct }) => {
              const colors = scopeColorMap[scope as keyof typeof scopeColorMap];
              return (
                <div key={scope} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs font-semibold text-foreground">{count}</span>
                  <div className="w-full bg-muted rounded-t-md overflow-hidden relative" style={{ height: `${Math.max(pct, 8)}%` }}>
                    <div className={cn("absolute inset-0 rounded-t-md", colors.bg)} />
                  </div>
                  <span className="text-[10px] text-muted-foreground capitalize">{scope}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Impact timeline — horizontal bar chart style */}
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="text-xs font-semibold text-foreground mb-4">Change Impact Over Time</p>
        <div className="space-y-1">
          {snapshots.map((snap) => {
            const filesPct = (snap.filesChanged / maxFiles) * 100;
            const compPct = (snap.componentsAffected / maxComponents) * 100;
            const isCheckpoint = !!snap.checkpointName;
            const isoColors = isoColorMap[snap.isoPrimary];

            return (
              <div
                key={snap.id}
                onClick={() => onSelectSnapshot?.(snap.id)}
                className={cn(
                  "flex items-center gap-3 py-2 px-2 rounded-md cursor-pointer transition-colors",
                  selectedId === snap.id ? "bg-muted" : "hover:bg-muted/50"
                )}
              >
                {/* Date & checkpoint */}
                <div className="w-28 shrink-0 flex items-center gap-1.5">
                  {isCheckpoint && <Flag className="h-3 w-3 text-accent shrink-0" />}
                  <span className="text-[11px] text-muted-foreground truncate">
                    {format(snap.committedAt, "MMM d")}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">{snap.commitSha}</span>
                </div>

                {/* ISO badge */}
                <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full shrink-0 font-medium w-20 text-center truncate", isoColors.bg, isoColors.text)}>
                  {snap.isoPrimary.split(" ")[0]}
                </span>

                {/* Stacked bars */}
                <div className="flex-1 flex flex-col gap-0.5">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent/60 rounded-full transition-all"
                      style={{ width: `${filesPct}%` }}
                    />
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent/30 rounded-full transition-all"
                      style={{ width: `${compPct}%` }}
                    />
                  </div>
                </div>

                {/* Net change indicator */}
                <div className="w-14 shrink-0 flex items-center justify-end gap-0.5">
                  {snap.functionsAdded > snap.functionsRemoved ? (
                    <TrendingUp className="h-3 w-3 text-accent" />
                  ) : snap.functionsRemoved > snap.functionsAdded ? (
                    <TrendingDown className="h-3 w-3 text-destructive" />
                  ) : null}
                  <span className="text-[11px] font-mono text-muted-foreground">
                    {snap.functionsAdded > snap.functionsRemoved ? "+" : ""}
                    {snap.functionsAdded - snap.functionsRemoved}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-4 rounded-full bg-accent/60" />
            <span className="text-[10px] text-muted-foreground">Files changed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-4 rounded-full bg-accent/30" />
            <span className="text-[10px] text-muted-foreground">Components affected</span>
          </div>
        </div>
      </div>
    </div>
  );
};
