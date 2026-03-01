import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Cloud, Calendar, Pencil, Trash2, Plus } from "lucide-react";
import { mockLLMConfigurations, type LLMConfiguration } from "@/data/mockLLMData";

export function LLMConfigurationsTab() {
  const [configurations] = useState<LLMConfiguration[]>(mockLLMConfigurations);

  const getIcon = (type: LLMConfiguration["icon"]) => {
    switch (type) {
      case "sparkles":
        return <Sparkles className="h-5 w-5 text-muted-foreground" />;
      case "cloud":
        return <Cloud className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">LLM Configurations</h2>
          <p className="text-sm text-muted-foreground">
            Manage your LLM provider connections.
          </p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          Add Configuration
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {configurations.map((config) => (
          <div
            key={config.id}
            className="rounded-lg border bg-card p-5 flex flex-col justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                {getIcon(config.icon)}
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground leading-tight">{config.name}</h3>
                <p className="text-sm text-muted-foreground truncate">
                  {config.provider} ({config.platform}) · {config.modelKey}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {config.dateAdded}
              </div>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" className="h-8">
                  Edit
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
