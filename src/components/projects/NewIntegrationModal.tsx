import { useState } from "react";
import { LLMConfig } from "@/types/project";
import { GitHubRepository } from "@/types/github";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, FolderOpen } from "lucide-react";
import { RepositoryPicker } from "@/components/github/RepositoryPicker";
import { GenerationConfigPanel } from "./GenerationConfigPanel";

interface NewIntegrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  llmConfigs: LLMConfig[];
  onSubmit: (data: { repoPath: string; llmConfigId: string; overwrite: boolean }) => void;
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
  const [activeTab, setActiveTab] = useState<string>(isGitHubConnected ? "github" : "local");
  const [selectedRepository, setSelectedRepository] = useState<GitHubRepository | null>(null);
  // Step: "select" = pick repo/path, "configure" = LLM config
  const [step, setStep] = useState<"select" | "configure">("select");

  const handleClose = () => {
    setSelectedRepository(null);
    setRepoPath("");
    setStep("select");
    onOpenChange(false);
  };

  const handleProceedToConfig = () => {
    setStep("configure");
  };

  const handleBack = () => {
    setStep("select");
  };

  const resolvedRepoName =
    activeTab === "github" && selectedRepository
      ? selectedRepository.fullName
      : repoPath;

  const handleGenerate = (data: { llmConfigId: string; overwrite: boolean }) => {
    if (activeTab === "github" && selectedRepository && onConnectRepository) {
      onConnectRepository(selectedRepository);
    }
    onSubmit({ repoPath: resolvedRepoName, llmConfigId: data.llmConfigId, overwrite: data.overwrite });
    handleClose();
  };

  const canProceed =
    (activeTab === "github" && !!selectedRepository) ||
    (activeTab === "local" && !!repoPath.trim());

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        {step === "select" ? (
          <>
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
                <div className="space-y-2">
                  <Label htmlFor="repo-path">Repository Path</Label>
                  <Input
                    id="repo-path"
                    placeholder="e.g., /path/to/repository"
                    value={repoPath}
                    onChange={(e) => setRepoPath(e.target.value)}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleProceedToConfig} disabled={!canProceed}>
                Continue
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Generate Documentation</DialogTitle>
              <DialogDescription>
                Configure generation settings and start processing
              </DialogDescription>
            </DialogHeader>

            <GenerationConfigPanel
              repoName={resolvedRepoName}
              source={activeTab === "github" ? "github" : "local"}
              llmConfigs={llmConfigs}
              onBack={handleBack}
              onSubmit={handleGenerate}
              onCancel={handleClose}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
