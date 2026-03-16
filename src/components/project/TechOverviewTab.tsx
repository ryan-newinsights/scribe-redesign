import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Layers,
  Box,
  ArrowRightLeft,
  Puzzle,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { TechOverview } from "@/data/mockTechOverviewData";

interface TechOverviewTabProps {
  data: TechOverview | null | undefined;
}

type AnchorId = "architecture" | "core-components" | "data-flow" | "extensibility" | "dependencies";

const anchors: { id: AnchorId; label: string }[] = [
  { id: "architecture", label: "Architecture" },
  { id: "core-components", label: "Core Components" },
  { id: "data-flow", label: "Data Flow" },
  { id: "extensibility", label: "Extensibility" },
  { id: "dependencies", label: "Dependencies" },
];

export const TechOverviewTab = ({ data }: TechOverviewTabProps) => {
  const [activeAnchor, setActiveAnchor] = useState<AnchorId>("architecture");

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
  }, [data]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!data) {
    return <p className="text-sm text-muted-foreground">No tech overview available for this project.</p>;
  }

  return (
    <div className="flex gap-10">
      {/* On-page anchor nav */}
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

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-10">
        {/* Architecture */}
        <section id="architecture">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-semibold">Architecture Overview</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{data.architectureSummary}</p>
          <div className="space-y-2">
            {data.layers.map((layer, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/10 text-accent text-xs font-semibold flex items-center justify-center mt-0.5">{i + 1}</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium">{layer.name}</p>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">{layer.modules}</p>
                  <p className="text-xs text-muted-foreground mt-1">{layer.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Core Components */}
        <section id="core-components">
          <div className="flex items-center gap-2 mb-3">
            <Box className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-semibold">Core Components</h3>
          </div>
          <div className="space-y-5">
            {data.coreComponents.map((comp, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold">{comp.title}</p>
                  <Badge variant="outline" className="text-xs font-mono">{comp.module}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{comp.description}</p>
                <div className="space-y-1.5 pl-3 border-l-2 border-accent/20">
                  {comp.functions.map((fn, fi) => (
                    <div key={fi}>
                      <span className="text-xs font-mono font-medium text-accent">{fn.name}</span>
                      <p className="text-xs text-muted-foreground mt-0.5">{fn.description}</p>
                    </div>
                  ))}
                </div>
                {i < data.coreComponents.length - 1 && <div className="border-b border-border pt-2" />}
              </div>
            ))}
          </div>
        </section>

        {/* Data Flow */}
        <section id="data-flow">
          <div className="flex items-center gap-2 mb-3">
            <ArrowRightLeft className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-semibold">Data Flow</h3>
          </div>
          <div className="space-y-4">
            {data.dataFlow.map((phase, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-foreground text-background text-xs font-bold flex items-center justify-center">{i + 1}</div>
                  {i < data.dataFlow.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                </div>
                <div className="pb-4">
                  <p className="text-sm font-semibold">{phase.phase}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{phase.description}</p>
                  <ul className="mt-2 space-y-1">
                    {phase.details.map((d, di) => (
                      <li key={di} className="text-xs text-muted-foreground flex gap-1.5">
                        <span className="shrink-0 mt-1.5 h-1 w-1 rounded-full bg-muted-foreground" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Extensibility */}
        <section id="extensibility">
          <div className="flex items-center gap-2 mb-3">
            <Puzzle className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-semibold">Extensibility</h3>
          </div>
          <div className="space-y-2">
            {data.extensibility.map((ext, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/50 border border-border">
                <p className="text-sm font-medium">{ext.area}</p>
                <p className="text-xs text-muted-foreground mt-1">{ext.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dependencies */}
        <section id="dependencies">
          <div className="flex items-center gap-2 mb-3">
            <Package className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-semibold">Key Dependencies</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {data.dependencies.map((dep, i) => (
              <div key={i} className="flex gap-2">
                <span className="shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                <div>
                  <p className="text-sm font-medium">{dep.name}</p>
                  <p className="text-xs text-muted-foreground">{dep.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
