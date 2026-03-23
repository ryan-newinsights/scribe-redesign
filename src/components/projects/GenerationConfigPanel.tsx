import { useState } from "react";
import { LLMConfig } from "@/types/project";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play, AlertTriangle } from "lucide-react";
import { DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface GenerationConfigPanelProps {
  repoName: string;
  source: "github" | "local";
  mode?: "new" | "sync";
  llmConfigs: LLMConfig[];
  onBack: () => void;
  onSubmit: (data: { llmConfigId: string; overwrite: boolean; fullUpdate: boolean }) => void;
  onCancel: () => void;
}

export function GenerationConfigPanel({
  repoName,
  source,
  mode = "new",
  llmConfigs,
  onBack,
  onSubmit,
  onCancel,
}: GenerationConfigPanelProps) {
  const [llmConfigId, setLlmConfigId] = useState(llmConfigs[0]?.id || "");
  const [overwrite, setOverwrite] = useState(false);
  const [fullUpdate, setFullUpdate] = useState(false);

  const handleSubmit = () => {
    onSubmit({ llmConfigId, overwrite, fullUpdate });
  };

  const isSync = mode === "sync";

  return (
    <div className="space-y-5">
      {/* Header with play icon and repo info */}
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-full bg-accent/15 dark:bg-accent/10 flex items-center justify-center shrink-0 border border-accent/30">
          <Play className="h-5 w-5 text-accent fill-accent" />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-sm text-foreground">
            {isSync ? "Update Documentation" : "Generate Documentation"}
          </p>
          <p className="text-xs text-muted-foreground truncate">{repoName}</p>
        </div>
      </div>

      <Separator />

      {/* LLM Configuration */}
      <div className="space-y-2">
        <Label htmlFor="llm-config" className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
          LLM Configuration
        </Label>
        <Select value={llmConfigId} onValueChange={setLlmConfigId}>
          <SelectTrigger className="bg-background border-input">
            <SelectValue placeholder="Select LLM" />
          </SelectTrigger>
          <SelectContent>
            {llmConfigs.map((config) => (
              <SelectItem key={config.id} value={config.id}>
                {config.name} ({config.provider})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Select the LLM model to use for documentation generation
        </p>
      </div>

      {/* Sync mode: Full update option */}
      {isSync && (
        <>
          <Separator />
          <div
            className={cn(
              "rounded-lg border p-3 transition-colors",
              "border-border bg-muted/50 dark:bg-muted/30"
            )}
          >
            <div className="flex items-start gap-3">
              <Checkbox
                id="full-update"
                checked={fullUpdate}
                onCheckedChange={(checked) => setFullUpdate(checked as boolean)}
                className="mt-0.5"
              />
              <div className="space-y-1">
                <Label htmlFor="full-update" className="font-medium cursor-pointer text-sm">
                  Update all documents
                </Label>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  By default, only changed files are re-processed. Enable this to regenerate documentation for the entire codebase.
                </p>
                {fullUpdate && (
                  <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                    The last full update was <span className="font-semibold text-foreground">25,384,215</span> tokens.
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <DialogFooter className="pt-2 flex-row gap-2 sm:gap-0">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!llmConfigId}
          className="gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90"
        >
          <Play className="h-4 w-4" />
          {isSync ? "Start Update" : "Start Generation"}
        </Button>
      </DialogFooter>
    </div>
  );
}
