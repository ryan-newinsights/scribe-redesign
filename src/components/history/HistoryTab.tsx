import { useState, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { HistoryFilterBar, type HistoryFilter, type GroupBy } from "./HistoryFilterBar";
import { TimelineTextView } from "./TimelineTextView";
import { GraphRichView } from "./GraphRichView";
import { CombinedView } from "./CombinedView";
import { mockSnapshots } from "@/data/mockHistoryData";

type ViewMode = "timeline" | "graph" | "combined";

const viewModes: { id: ViewMode; label: string; description: string }[] = [
  { id: "timeline", label: "Timeline", description: "Text-driven chronological view" },
  { id: "graph", label: "Analytics", description: "Chart-rich visual analysis" },
  { id: "combined", label: "Interactive", description: "Charts + timeline linked" },
];

type AnchorId = "filters" | "timeline" | "analytics" | "interactive";

const anchors: { id: AnchorId; label: string }[] = [
  { id: "filters", label: "Filters" },
  { id: "timeline", label: "Timeline" },
  { id: "analytics", label: "Analytics" },
  { id: "interactive", label: "Interactive" },
];

export const HistoryTab = () => {
  const [activeView, setActiveView] = useState<ViewMode>("timeline");
  const [filters, setFilters] = useState<HistoryFilter[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [groupBy, setGroupBy] = useState<GroupBy>("none");
  const [activeAnchor, setActiveAnchor] = useState<AnchorId>("filters");

  // Spyscroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveAnchor(entry.target.id as AnchorId);
          }
        }
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0.1 }
    );

    anchors.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Apply filters
  const filteredSnapshots = useMemo(() => {
    let result = [...mockSnapshots];

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.changeSummary.toLowerCase().includes(q) ||
          s.changeRationale.toLowerCase().includes(q) ||
          s.commitSha.includes(q) ||
          s.checkpointName?.toLowerCase().includes(q)
      );
    }

    // Structured filters
    if (filters.length > 0) {
      result = result.filter((s) => {
        return filters.every((f) => {
          switch (f.type) {
            case "iso":
              return s.isoAffected.includes(f.value as any);
            case "scope":
              return s.changeScope === f.value;
            case "checkpoint":
              return !!s.checkpointName;
            default:
              return true;
          }
        });
      });
    }

    return result;
  }, [filters, searchQuery]);

  return (
    <div className="flex gap-10">
      {/* Spyscroll anchor nav */}
      <nav className="hidden lg:block w-40 shrink-0 sticky top-0 self-start max-h-[calc(100vh-120px)] overflow-y-auto">
        <div className="pt-2 space-y-0.5">
          {anchors.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={cn(
                "block w-full text-left text-[13px] py-1 px-2 rounded-sm transition-colors",
                activeAnchor === id
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-1 min-w-0 space-y-8">
        {/* Filters section */}
        <section id="filters">
          <HistoryFilterBar
            filters={filters}
            onFiltersChange={setFilters}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            groupBy={groupBy}
            onGroupByChange={setGroupBy}
            resultCount={filteredSnapshots.length}
            totalCount={mockSnapshots.length}
          />
        </section>

        {/* Timeline view */}
        <section id="timeline">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-sm font-semibold">Timeline</h3>
            <Badge variant="secondary" className="text-[10px]">{filteredSnapshots.length} snapshots</Badge>
          </div>
          <TimelineTextView snapshots={filteredSnapshots} />
        </section>

        {/* Analytics view */}
        <section id="analytics">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-sm font-semibold">Analytics</h3>
          </div>
          <GraphRichView snapshots={filteredSnapshots} />
        </section>

        {/* Interactive combined view */}
        <section id="interactive">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-sm font-semibold">Interactive</h3>
            <span className="text-[11px] text-muted-foreground">Charts and timeline are linked — hover or click to explore</span>
          </div>
          <CombinedView snapshots={filteredSnapshots} />
        </section>
      </div>
    </div>
  );
};
