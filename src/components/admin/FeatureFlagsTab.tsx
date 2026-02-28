import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Eye, EyeOff } from "lucide-react";
import { mockFeatureFlags, type FeatureFlag } from "@/data/mockAdminData";

export function FeatureFlagsTab() {
  const [flags, setFlags] = useState<FeatureFlag[]>(mockFeatureFlags);
  const [revealedKeys, setRevealedKeys] = useState<Set<string>>(new Set());

  const toggleFlag = (id: string) => {
    setFlags((prev) =>
      prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f))
    );
  };

  const toggleReveal = (id: string) => {
    setRevealedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const categories = Array.from(new Set(flags.map((f) => f.category)));

  const tierColor = (tier: string) => {
    switch (tier) {
      case "Starter": return "bg-muted text-muted-foreground";
      case "Professional": return "bg-info-bg text-info";
      case "Enterprise": return "bg-success-bg text-success";
      case "Beta": return "bg-warning-bg text-warning";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Feature Flags</h2>
          <p className="text-sm text-muted-foreground">
            Control feature availability across tiers
          </p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          Add Feature
        </Button>
      </div>

      {categories.map((category) => (
        <div key={category} className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {category}
          </h3>
          <div className="rounded-lg border bg-card divide-y">
            {flags
              .filter((f) => f.category === category)
              .map((flag) => (
                <div
                  key={flag.id}
                  className="flex items-center justify-between gap-4 px-4 py-3.5 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-medium text-sm text-foreground">{flag.name}</span>
                      <div className="flex gap-1">
                        {flag.tiers.map((tier) => (
                          <span
                            key={tier}
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${tierColor(tier)}`}
                          >
                            {tier}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{flag.description}</p>
                    {flag.apiKey && (
                      <div className="flex items-center gap-2 mt-1.5">
                        <code className="text-xs font-mono bg-muted px-2 py-0.5 rounded text-muted-foreground">
                          {revealedKeys.has(flag.id)
                            ? "sk-proj-abc123def456ghi789jkl012mno345"
                            : flag.apiKey}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground hover:text-foreground"
                          onClick={() => toggleReveal(flag.id)}
                        >
                          {revealedKeys.has(flag.id) ? (
                            <EyeOff className="h-3.5 w-3.5" />
                          ) : (
                            <Eye className="h-3.5 w-3.5" />
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                  <Switch
                    checked={flag.enabled}
                    onCheckedChange={() => toggleFlag(flag.id)}
                    className="data-[state=checked]:bg-status-completed"
                  />
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
