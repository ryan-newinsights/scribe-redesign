import { useState } from "react";
import { Github, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RepositoryPicker } from "./RepositoryPicker";
import { GitHubRepository } from "@/types/github";

interface NewProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  repositories: GitHubRepository[];
  isLoadingRepos?: boolean;
  totalRepoCount?: number;
  hasMoreRepos?: boolean;
  onLoadMoreRepos?: () => void;
  onConnectRepository: (repo: GitHubRepository) => void;
  onUploadFiles?: () => void;
  isGitHubConnected?: boolean;
  onConnectGitHub?: () => void;
}

export function NewProjectModal({
  open,
  onOpenChange,
  repositories,
  isLoadingRepos = false,
  totalRepoCount,
  hasMoreRepos = false,
  onLoadMoreRepos,
  onConnectRepository,
  onUploadFiles,
  isGitHubConnected = false,
  onConnectGitHub,
}: NewProjectModalProps) {
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepository | null>(null);
  const [activeTab, setActiveTab] = useState("github");

  const handleConnect = () => {
    if (selectedRepo) {
      onConnectRepository(selectedRepo);
      setSelectedRepo(null);
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    setSelectedRepo(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
          <DialogDescription>
            Import a repository from GitHub or upload files directly
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="github" className="gap-2">
              <Github className="h-4 w-4" />
              GitHub Repository
            </TabsTrigger>
            <TabsTrigger value="upload" className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Files
            </TabsTrigger>
          </TabsList>

          <TabsContent value="github" className="mt-4">
            {isGitHubConnected ? (
              <RepositoryPicker
                repositories={repositories}
                selectedRepository={selectedRepo}
                onSelect={setSelectedRepo}
                isLoading={isLoadingRepos}
                totalCount={totalRepoCount}
                hasMore={hasMoreRepos}
                onLoadMore={onLoadMoreRepos}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Github className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">Connect GitHub to get started</h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                  Connect your GitHub account to import repositories and generate documentation automatically.
                </p>
                <Button onClick={onConnectGitHub}>
                  <Github className="h-4 w-4 mr-1.5" />
                  Connect GitHub
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="upload" className="mt-4">
            <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-lg">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Upload your files</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                Drag and drop your code files here, or click to browse
              </p>
              <Button variant="outline" onClick={onUploadFiles}>
                Browse Files
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="pt-4">
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          {activeTab === "github" && isGitHubConnected && (
            <Button onClick={handleConnect} disabled={!selectedRepo || selectedRepo.isConnected}>
              Connect Repository
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
