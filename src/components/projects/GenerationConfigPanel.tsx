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
import { Settings, Play, ArrowLeft, Github, FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface GenerationConfigPanelProps {
  repoName: string;
  source: "github" | "local";
  llmConfigs: LLMConfig[];
  onBack: () => void;
  onSubmit: (data: { llmConfigId: string; overwrite: boolean }) => void;
  onCancel: () => void;
}

export function GenerationConfigPanel({
  repoName,
  source,
  llmConfigs,
  onBack,
  onSubmit,
  onCancel,
}: GenerationConfigPanelProps) {
  const [llmConfigId, setLlmConfigId] = useState(llmConfigs[0]?.id || "");
  const [overwrite, setOverwrite] = useState(false);

  const handleSubmit = () => {
    onSubmit({ llmConfigId, overwrite });
  };

  const SourceIcon = source === "github" ? Github : FolderOpen;

  return (
    <div className="space-y-5">
      {/* Header showing selected repo */}
      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <SourceIcon className="h-5 w-5 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="font-medium text-sm truncate">Generate Documentation</p>
          <p className="text-xs text-muted-foreground truncate">{repoName}</p>
        </div>
      </div>

      <Separator />

      {/* LLM Configuration */}
      <div className="space-y-2">
        <Label htmlFor="llm-config">LLM Configuration</Label>
        <Select value={llmConfigId} onValueChange={setLlmConfigId}>
          <SelectTrigger>
            <SelectValue placeholder="Select a model configuration" />
          </SelectTrigger>
          <SelectContent>
            {llmConfigs.map((config) => (
              <SelectItem key={config.id} value={config.id}>
                {config.name} ({config.provider} - {config.modelName})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          Select the LLM model to use for documentation generation
        </p>
      </div>

      {/* Overwrite Toggle */}
      <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
        <Checkbox
          id="overwrite-config"
          checked={overwrite}
          onCheckedChange={(checked) => setOverwrite(checked as boolean)}
          className="mt-0.5"
        />
        <div className="space-y-1">
          <Label htmlFor="overwrite-config" className="font-medium cursor-pointer">
            Overwrite existing docstrings
          </Label>
          <p className="text-xs text-muted-foreground">
            This will replace any existing documentation in the codebase
          </p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        <Link to="/admin" className="text-primary hover:underline inline-flex items-center gap-1">
          <Settings className="h-3 w-3" />
          Configure LLM settings
        </Link>
      </p>

      <DialogFooter className="pt-2 flex-row gap-2 sm:gap-0">
        <Button type="button" variant="ghost" onClick={onBack} className="mr-auto">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!llmConfigId} className="gap-1.5">
          <Play className="h-4 w-4" />
          Start Generation
        </Button>
      </DialogFooter>
    </div>
  );
}
