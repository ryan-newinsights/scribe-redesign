import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Cloud, Calendar, Trash2, Plus, Star } from "lucide-react";
import { mockLLMConfigurations, type LLMConfiguration } from "@/data/mockLLMData";
import { cn } from "@/lib/utils";

export function LLMConfigurationsTab() {
  const [configurations, setConfigurations] = useState<LLMConfiguration[]>(mockLLMConfigurations);

  const handleSetDefault = (id: string) => {
    setConfigurations(prev =>
      prev.map(c => ({ ...c, isDefault: c.id === id }))
    );
  };

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
            className={cn(
              "rounded-lg border bg-card p-5 flex flex-col justify-between gap-4",
              config.isDefault && "border-accent/50 ring-1 ring-accent/20"
            )}
          >
            <div className="flex items-start gap-3">
              <div className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                config.isDefault ? "bg-accent/10" : "bg-muted"
              )}>
                {getIcon(config.icon)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground leading-tight">{config.name}</h3>
                  {config.isDefault && (
                    <Badge variant="secondary" className="bg-accent/10 text-accent text-[10px] px-1.5 py-0">
                      Default
                    </Badge>
                  )}
                </div>
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
                {!config.isDefault && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs text-muted-foreground hover:text-accent"
                    onClick={() => handleSetDefault(config.id)}
                  >
                    <Star className="h-3.5 w-3.5 mr-1" />
                    Set Default
                  </Button>
                )}
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
