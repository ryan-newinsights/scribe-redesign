import { useState, useRef, useEffect } from "react";
import { Search, ListFilter, Group, X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { ISOCharacteristic, ChangeScope } from "@/data/mockHistoryData";

export interface HistoryFilter {
  type: "iso" | "scope" | "checkpoint" | "search";
  operator?: "AND" | "OR";
  value: string;
}

export type GroupBy = "week" | "iso" | "scope" | "none";

const isoOptions: ISOCharacteristic[] = [
  "Functional Suitability",
  "Reliability",
  "Security",
  "Maintainability",
  "Performance Efficiency",
  "Compatibility",
];

const scopeOptions: ChangeScope[] = ["contained", "cross-cutting", "structural"];

const filterTypeLabels: Record<string, string> = {
  iso: "Characteristic",
  scope: "Scope",
  checkpoint: "Checkpoints",
  search: "Search",
};

const filterTypeColors: Record<string, string> = {
  iso: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  scope: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  checkpoint: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  search: "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400",
};

/* ── Icons component (lives in spyscroll nav) ── */

interface HistoryFilterIconsProps {
  filters: HistoryFilter[];
  onFiltersChange: (filters: HistoryFilter[]) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  groupBy: GroupBy;
  onGroupByChange: (groupBy: GroupBy) => void;
}

export const HistoryFilterIcons = ({
  filters,
  onFiltersChange,
  searchQuery,
  onSearchChange,
  groupBy,
  onGroupByChange,
}: HistoryFilterIconsProps) => {
  const [searchActive, setSearchActive] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchActive && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchActive]);

  const addFilter = (type: HistoryFilter["type"], value: string) => {
    const existing = filters.find((f) => f.type === type && f.value === value);
    if (!existing) {
      onFiltersChange([...filters, { type, value, operator: "AND" }]);
    }
    setFilterOpen(false);
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1">
        {/* Search toggle */}
        <button
          onClick={() => {
            setSearchActive(!searchActive);
            if (searchActive) onSearchChange("");
          }}
          className={cn(
            "h-7 w-7 rounded-md flex items-center justify-center transition-colors",
            searchActive || searchQuery
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          <Search className="h-3.5 w-3.5" />
        </button>

        {/* Filter toggle */}
        <Popover open={filterOpen} onOpenChange={setFilterOpen}>
          <PopoverTrigger asChild>
            <button
              className={cn(
                "h-7 w-7 rounded-md flex items-center justify-center transition-colors relative",
                filters.length > 0
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              {filters.length > 0 && (
                <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-accent text-accent-foreground text-[9px] font-bold flex items-center justify-center">
                  {filters.length}
                </span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent align="start" side="right" className="w-64 p-3">
            <p className="text-xs font-medium text-muted-foreground mb-2">Add Filter</p>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium mb-1.5">ISO 25010 Characteristic</p>
                <div className="flex flex-wrap gap-1">
                  {isoOptions.map((iso) => (
                    <button
                      key={iso}
                      onClick={() => addFilter("iso", iso)}
                      className="text-[11px] px-2 py-0.5 rounded-full border border-border hover:bg-muted transition-colors"
                    >
                      {iso}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium mb-1.5">Change Scope</p>
                <div className="flex flex-wrap gap-1">
                  {scopeOptions.map((scope) => (
                    <button
                      key={scope}
                      onClick={() => addFilter("scope", scope)}
                      className="text-[11px] px-2 py-0.5 rounded-full border border-border hover:bg-muted transition-colors"
                    >
                      {scope}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => addFilter("checkpoint", "true")}
                className="text-[11px] px-2 py-0.5 rounded-full border border-border hover:bg-muted transition-colors"
              >
                Checkpoints only
              </button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Group toggle */}
        <Popover open={groupOpen} onOpenChange={setGroupOpen}>
          <PopoverTrigger asChild>
            <button
              className={cn(
                "h-7 w-7 rounded-md flex items-center justify-center transition-colors",
                groupBy !== "none"
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
          </PopoverTrigger>
          <PopoverContent align="start" side="right" className="w-48 p-3">
            <p className="text-xs font-medium text-muted-foreground mb-2">Group By</p>
            <div className="space-y-1">
              {(
                [
                  { id: "none", label: "None" },
                  { id: "week", label: "Week" },
                  { id: "iso", label: "Characteristic" },
                  { id: "scope", label: "Scope" },
                ] as { id: GroupBy; label: string }[]
              ).map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => {
                    onGroupByChange(id);
                    setGroupOpen(false);
                  }}
                  className={cn(
                    "w-full text-left text-xs px-2 py-1.5 rounded-md transition-colors",
                    groupBy === id
                      ? "bg-accent text-accent-foreground font-medium"
                      : "hover:bg-muted text-foreground"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Search input below icons — matches Code Docs pattern */}
      {searchActive && (
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            ref={searchRef}
            placeholder="Search snapshots..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-7 pl-7 text-xs bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
      )}
    </div>
  );
};

/* ── Active filters bar (lives in content area) ── */

interface HistoryFilterBarProps {
  filters: HistoryFilter[];
  onFiltersChange: (filters: HistoryFilter[]) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  resultCount?: number;
  totalCount?: number;
}

export const HistoryFilterBar = ({
  filters,
  onFiltersChange,
  searchQuery,
  onSearchChange,
  resultCount,
  totalCount,
}: HistoryFilterBarProps) => {
  const addFilter = (type: HistoryFilter["type"], value: string) => {
    const existing = filters.find((f) => f.type === type && f.value === value);
    if (!existing) {
      onFiltersChange([...filters, { type, value, operator: "AND" }]);
    }
  };

  const removeFilter = (index: number) => {
    onFiltersChange(filters.filter((_, i) => i !== index));
  };

  const toggleOperator = (index: number) => {
    const updated = [...filters];
    updated[index] = {
      ...updated[index],
      operator: updated[index].operator === "AND" ? "OR" : "AND",
    };
    onFiltersChange(updated);
  };

  const hasActiveFilters = filters.length > 0 || searchQuery.length > 0;

  if (!hasActiveFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {filters.map((filter, i) => (
        <div key={i} className="flex items-center gap-0">
          {i > 0 && (
            <button
              onClick={() => toggleOperator(i)}
              className="text-[10px] font-bold px-1.5 py-0.5 rounded text-accent hover:bg-accent/10 transition-colors mr-0.5"
            >
              {filter.operator}
            </button>
          )}
          <span
            className={cn(
              "inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium",
              filterTypeColors[filter.type]
            )}
          >
            <span className="opacity-70">{filterTypeLabels[filter.type]}</span>
            <span className="opacity-50">·</span>
            <span>{filter.type === "checkpoint" ? "Named" : filter.value}</span>
            <button
              onClick={() => removeFilter(i)}
              className="ml-0.5 opacity-60 hover:opacity-100"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        </div>
      ))}

      {searchQuery && (
        <span className={cn("inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium", filterTypeColors.search)}>
          <Search className="h-3 w-3 opacity-70" />
          <span>contains</span>
          <span className="font-semibold">{searchQuery}</span>
        </span>
      )}

      <Popover>
        <PopoverTrigger asChild>
          <button className="text-[11px] text-accent hover:text-accent/80 font-medium flex items-center gap-0.5">
            <Plus className="h-3 w-3" />
            Add filter
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-64 p-3">
          <div className="space-y-3">
            <div>
              <p className="text-xs font-medium mb-1.5">ISO 25010 Characteristic</p>
              <div className="flex flex-wrap gap-1">
                {isoOptions.map((iso) => (
                  <button
                    key={iso}
                    onClick={() => addFilter("iso", iso)}
                    className="text-[11px] px-2 py-0.5 rounded-full border border-border hover:bg-muted transition-colors"
                  >
                    {iso}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium mb-1.5">Change Scope</p>
              <div className="flex flex-wrap gap-1">
                {scopeOptions.map((scope) => (
                  <button
                    key={scope}
                    onClick={() => addFilter("scope", scope)}
                    className="text-[11px] px-2 py-0.5 rounded-full border border-border hover:bg-muted transition-colors"
                  >
                    {scope}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {resultCount !== undefined && totalCount !== undefined && (
        <span className="text-[11px] text-muted-foreground ml-auto">
          Showing {resultCount} of {totalCount} snapshots
        </span>
      )}
    </div>
  );
};
