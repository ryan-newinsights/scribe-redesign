import { useState } from "react";
import { LLMConfig } from "@/types/project";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface NewIntegrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  llmConfigs: LLMConfig[];
  onSubmit: (data: { repoPath: string; llmConfigId: string; overwrite: boolean }) => void;
}

export function NewIntegrationModal({
  open,
  onOpenChange,
  llmConfigs,
  onSubmit,
}: NewIntegrationModalProps) {
  const [repoPath, setRepoPath] = useState("");
  const [llmConfigId, setLlmConfigId] = useState(llmConfigs[0]?.id || "");
  const [overwrite, setOverwrite] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ repoPath, llmConfigId, overwrite });
    setRepoPath("");
    setOverwrite(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>New Integration</DialogTitle>
          <DialogDescription>
            Configure documentation generation for a new repository
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 py-2">
          {/* Repository Path */}
          <div className="space-y-2">
            <Label htmlFor="repo-path">Repository Path</Label>
            <Input
              id="repo-path"
              placeholder="e.g., /path/to/repository"
              value={repoPath}
              onChange={(e) => setRepoPath(e.target.value)}
              required
            />
          </div>

          {/* Model Selection */}
          <div className="space-y-2">
            <Label htmlFor="llm-config">Model</Label>
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
              <Link to="/admin" className="text-primary hover:underline inline-flex items-center gap-1">
                <Settings className="h-3 w-3" />
                Configure LLM settings
              </Link>
            </p>
          </div>

          {/* Overwrite Toggle */}
          <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
            <Checkbox
              id="overwrite"
              checked={overwrite}
              onCheckedChange={(checked) => setOverwrite(checked as boolean)}
              className="mt-0.5"
            />
            <div className="space-y-1">
              <Label htmlFor="overwrite" className="font-medium cursor-pointer">
                Overwrite Previous Documentation
              </Label>
              <p className="text-xs text-muted-foreground">
                This will overwrite any existing docstrings in the codebase
              </p>
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!repoPath || !llmConfigId}>
              Run
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
