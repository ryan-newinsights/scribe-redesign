import { useState } from "react";
import { LLMConfig } from "@/types/project";
import { GitHubRepository } from "@/types/github";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Github, FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { RepositoryPicker } from "@/components/github/RepositoryPicker";

interface NewIntegrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  llmConfigs: LLMConfig[];
  onSubmit: (data: { repoPath: string; llmConfigId: string; overwrite: boolean }) => void;
  // GitHub-related props
  isGitHubConnected?: boolean;
  repositories?: GitHubRepository[];
  isLoadingRepos?: boolean;
  onConnectGitHub?: () => void;
  onConnectRepository?: (repository: GitHubRepository) => void;
}

export function NewIntegrationModal({
  open,
  onOpenChange,
  llmConfigs,
  onSubmit,
  isGitHubConnected = false,
  repositories = [],
  isLoadingRepos = false,
  onConnectGitHub,
  onConnectRepository,
}: NewIntegrationModalProps) {
  const [repoPath, setRepoPath] = useState("");
  const [llmConfigId, setLlmConfigId] = useState(llmConfigs[0]?.id || "");
  const [overwrite, setOverwrite] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(isGitHubConnected ? "github" : "local");
  const [selectedRepository, setSelectedRepository] = useState<GitHubRepository | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ repoPath, llmConfigId, overwrite });
    setRepoPath("");
    setOverwrite(false);
    onOpenChange(false);
  };

  const handleConnectRepository = () => {
    if (selectedRepository && onConnectRepository) {
      onConnectRepository(selectedRepository);
      setSelectedRepository(null);
    }
  };

  const handleClose = () => {
    setSelectedRepository(null);
    setRepoPath("");
    setOverwrite(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>New Integration</DialogTitle>
          <DialogDescription>
            Connect a repository to generate documentation
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="github" className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              GitHub Repository
            </TabsTrigger>
            <TabsTrigger value="local" className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4" />
              Local Path
            </TabsTrigger>
          </TabsList>

          {/* GitHub Tab */}
          <TabsContent value="github" className="mt-4">
            {isGitHubConnected ? (
              <div className="space-y-4">
                <RepositoryPicker
                  repositories={repositories}
                  isLoading={isLoadingRepos}
                  selectedRepository={selectedRepository}
                  onSelect={(repo) => setSelectedRepository(repo)}
                />
                <DialogFooter>
                  <Button variant="outline" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConnectRepository}
                    disabled={!selectedRepository}
                  >
                    Connect Repository
                  </Button>
                </DialogFooter>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <Github className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Connect GitHub</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect your GitHub account to import repositories directly
                  </p>
                </div>
                <Button onClick={onConnectGitHub}>
                  <Github className="h-4 w-4 mr-2" />
                  Connect GitHub
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Local Path Tab */}
          <TabsContent value="local" className="mt-4">
            <form onSubmit={handleSubmit} className="space-y-5">
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
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={!repoPath || !llmConfigId}>
                  Run
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
