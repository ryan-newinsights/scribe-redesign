import { Flag, GitCommit, FileText, Box, LayoutDashboard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { HistorySnapshot } from "@/data/mockHistoryData";
import { isoColorMap, scopeColorMap } from "@/data/mockHistoryData";
import { format } from "date-fns";

interface TimelineTextViewProps {
  snapshots: HistorySnapshot[];
  onSelectSnapshot?: (id: string) => void;
  selectedId?: string;
}

export const TimelineTextView = ({ snapshots, onSelectSnapshot, selectedId }: TimelineTextViewProps) => {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[15px] top-6 bottom-0 w-px bg-border" />

      <div className="space-y-0">
        {snapshots.map((snap, i) => {
          const isCheckpoint = !!snap.checkpointName;
          const isoColors = isoColorMap[snap.isoPrimary];
          const scopeColors = scopeColorMap[snap.changeScope];

          return (
            <div
              key={snap.id}
              onClick={() => onSelectSnapshot?.(snap.id)}
              className={cn(
                "relative pl-10 pr-3 py-4 rounded-lg transition-colors cursor-pointer group",
                selectedId === snap.id
                  ? "bg-muted/80"
                  : "hover:bg-muted/40",
                isCheckpoint && "border-l-2 border-l-accent ml-[14px] pl-[22px]"
              )}
            >
              {/* Timeline node */}
              <div
                className={cn(
                  "absolute left-[9px] top-5 z-10 flex items-center justify-center rounded-full",
                  isCheckpoint
                    ? "h-[14px] w-[14px] bg-accent"
                    : "h-[10px] w-[10px] bg-border group-hover:bg-muted-foreground transition-colors",
                  isCheckpoint && "-ml-[1px]"
                )}
              >
                {isCheckpoint && <Flag className="h-2 w-2 text-accent-foreground" />}
              </div>

              {/* Header row */}
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <div className="flex items-center gap-2 flex-wrap min-w-0">
                  {isCheckpoint && (
                    <span className="text-sm font-semibold text-foreground">
                      {snap.checkpointName}
                    </span>
                  )}
                  <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                    <GitCommit className="h-3 w-3" />
                    {snap.commitSha}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {format(snap.committedAt, "MMM d, yyyy · HH:mm")}
                  </span>
                </div>
              </div>

              {/* Badges row */}
              <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                <span className={cn("text-[11px] px-2 py-0.5 rounded-full font-medium", isoColors.bg, isoColors.text)}>
                  {snap.isoPrimary}
                </span>
                <span className={cn("text-[11px] px-2 py-0.5 rounded-full font-medium", scopeColors.bg, scopeColors.text)}>
                  {snap.changeScope}
                </span>
              </div>

              {/* Summary */}
              <p className="text-sm text-foreground leading-relaxed mb-2">
                {snap.changeSummary}
              </p>

              {/* Stats row */}
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  {snap.filesChanged} files
                </span>
                <span className="flex items-center gap-1">
                  <Box className="h-3 w-3" />
                  {snap.componentsAffected} components
                </span>
                {snap.diagramsInvalidated > 0 && (
                  <span className="flex items-center gap-1">
                    <LayoutDashboard className="h-3 w-3" />
                    {snap.diagramsInvalidated} diagrams
                  </span>
                )}
                <span className="text-accent text-[11px] font-medium">
                  +{snap.functionsAdded}
                  {snap.functionsRemoved > 0 && <span className="text-destructive ml-1">−{snap.functionsRemoved}</span>}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
