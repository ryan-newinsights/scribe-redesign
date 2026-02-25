import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TechOverview } from "@/data/mockTechOverviewData";
import { Layers, Box, ArrowRightLeft, Puzzle, Package } from "lucide-react";

interface TechOverviewTabProps {
  data: TechOverview;
}

export const TechOverviewTab = ({ data }: TechOverviewTabProps) => {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Architecture Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-primary" />
            <CardTitle className="text-lg">Architecture Overview</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {data.architectureSummary}
          </p>
          <div className="space-y-3 pt-2">
            {data.layers.map((layer, idx) => (
              <div
                key={idx}
                className="flex gap-3 p-3 rounded-lg bg-muted/40 border border-border"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center mt-0.5">
                  {idx + 1}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium">{layer.name}</p>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">
                    {layer.modules}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {layer.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Core Components */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Box className="h-4 w-4 text-primary" />
            <CardTitle className="text-lg">Core Components</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          {data.coreComponents.map((comp, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-semibold">{comp.title}</p>
                <Badge variant="outline" className="text-xs font-mono">
                  {comp.module}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{comp.description}</p>
              <div className="space-y-1.5 pl-3 border-l-2 border-primary/20">
                {comp.functions.map((fn, fidx) => (
                  <div key={fidx}>
                    <span className="text-xs font-mono font-medium text-primary">
                      {fn.name}
                    </span>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {fn.description}
                    </p>
                  </div>
                ))}
              </div>
              {idx < data.coreComponents.length - 1 && (
                <div className="border-b border-border pt-2" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Data Flow */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="h-4 w-4 text-primary" />
            <CardTitle className="text-lg">Data Flow</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.dataFlow.map((phase, idx) => (
            <div key={idx} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </div>
                {idx < data.dataFlow.length - 1 && (
                  <div className="w-px flex-1 bg-border mt-1" />
                )}
              </div>
              <div className="pb-4">
                <p className="text-sm font-semibold">{phase.phase}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {phase.description}
                </p>
                <ul className="mt-2 space-y-1">
                  {phase.details.map((detail, didx) => (
                    <li
                      key={didx}
                      className="text-xs text-muted-foreground flex gap-1.5"
                    >
                      <span className="shrink-0 mt-1.5 h-1 w-1 rounded-full bg-muted-foreground" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Extensibility */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Puzzle className="h-4 w-4 text-primary" />
            <CardTitle className="text-lg">Extensibility</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.extensibility.map((ext, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-muted/40 border border-border"
            >
              <p className="text-sm font-medium">{ext.area}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {ext.description}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Dependencies */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-primary" />
            <CardTitle className="text-lg">Key Dependencies</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.dependencies.map((dep, idx) => (
              <div key={idx} className="flex gap-2">
                <span className="shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                <div>
                  <p className="text-sm font-medium">{dep.name}</p>
                  <p className="text-xs text-muted-foreground">{dep.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
