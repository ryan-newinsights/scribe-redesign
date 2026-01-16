import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { NewIntegrationModal } from "@/components/projects/NewIntegrationModal";
import { RecentDocumentsTable } from "@/components/projects/RecentDocumentsTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { mockProjects, mockLLMConfigs, mockRecentDocuments } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import {
  GitHubConnectionBanner,
  GitHubPermissionModal,
  GitHubProjectCard,
  ProcessingStateCard,
  NewProjectModal,
  DuplicateRepositoryModal,
} from "@/components/github";
import { mockGitHubConnection, mockGitHubRepositories, mockConnectedGitHubUser } from "@/data/mockGitHubData";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false);
  const [permissionModalOpen, setPermissionModalOpen] = useState(false);
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false);
  const [gitHubConnected, setGitHubConnected] = useState(!!mockGitHubConnection);
  const [processingRepo, setProcessingRepo] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleConnectGitHub = () => {
    setPermissionModalOpen(true);
  };

  const handleAuthorizeGitHub = () => {
    setPermissionModalOpen(false);
    setGitHubConnected(true);
    toast({
      title: "GitHub Connected",
      description: "Your GitHub account has been connected successfully.",
    });
  };

  const handleSelectRepository = (repoId: string) => {
    const repo = mockGitHubRepositories.find(r => r.id === repoId);
    if (repo?.isConnected) {
      setDuplicateModalOpen(true);
    } else {
      setNewProjectModalOpen(false);
      setProcessingRepo(repo?.fullName || null);
      // Simulate processing completion
      setTimeout(() => {
        setProcessingRepo(null);
        toast({
          title: "Documentation Generated",
          description: `Documentation for ${repo?.fullName} has been generated.`,
        });
      }, 5000);
    }
  };

  const handleNewIntegration = (data: { repoPath: string; llmConfigId: string; overwrite: boolean }) => {
    toast({
      title: "Integration Started",
      description: `Documentation generation started for ${data.repoPath}`,
    });
  };

  const handleRerun = (projectId: string) => {
    const project = mockProjects.find(p => p.id === projectId);
    toast({
      title: "Re-running Documentation",
      description: `Started documentation generation for ${project?.name}`,
    });
    navigate(`/progress/${projectId}`);
  };

  const handleViewProgress = (projectId: string) => {
    navigate(`/progress/${projectId}`);
  };

  const handleViewDocs = (projectId: string) => {
    navigate(`/docs/${projectId}`);
  };

  return (
    <Layout>
      {/* GitHub Connection Banner - shows when not connected */}
      {!gitHubConnected && (
        <GitHubConnectionBanner
          onConnect={handleConnectGitHub}
          className="mb-6"
        />
      )}

      {/* Processing State Card - shows when processing a repo */}
      {processingRepo && (
        <ProcessingStateCard
          state={{ status: "generating", message: `Processing ${processingRepo}...` }}
          className="mb-6"
        />
      )}

      {/* Section Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <div className="flex gap-2">
          {gitHubConnected && (
            <Button variant="outline" onClick={() => setNewProjectModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New from GitHub
            </Button>
          )}
          <Button onClick={() => setModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Integration
          </Button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* GitHub Project Cards */}
        {gitHubConnected && (
          <>
            <GitHubProjectCard
              id="gh-1"
              repositoryName="acme-corp/scribe-ai"
              syncStatus="up-to-date"
              lastProcessed={new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()}
              onViewDocs={() => navigate("/docs/1")}
              onCheckUpdates={() => toast({ title: "Checking for updates..." })}
              onRegenerate={() => toast({ title: "Regenerating documentation..." })}
            />
            <GitHubProjectCard
              id="gh-2"
              repositoryName="acme-corp/data-pipeline"
              syncStatus="updates-available"
              lastProcessed={new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()}
              onViewDocs={() => navigate("/docs/2")}
              onCheckUpdates={() => toast({ title: "Checking for updates..." })}
              onRegenerate={() => toast({ title: "Regenerating documentation..." })}
            />
          </>
        )}
        
        {/* Regular Project Cards */}
        {mockProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onRerun={handleRerun}
            onViewProgress={handleViewProgress}
            onViewDocs={handleViewDocs}
            onTitleClick={handleViewDocs}
          />
        ))}
      </div>

      {/* Recently Viewed Documents */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Recently Viewed Documents</h2>
        <RecentDocumentsTable documents={mockRecentDocuments} />
      </div>

      {/* Modals */}
      <NewIntegrationModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        llmConfigs={mockLLMConfigs}
        onSubmit={handleNewIntegration}
      />

      <GitHubPermissionModal
        open={permissionModalOpen}
        onOpenChange={setPermissionModalOpen}
        onAuthorize={handleAuthorizeGitHub}
      />

      <NewProjectModal
        open={newProjectModalOpen}
        onOpenChange={setNewProjectModalOpen}
        repositories={mockGitHubRepositories}
        isGitHubConnected={gitHubConnected}
        onConnectGitHub={handleConnectGitHub}
        onConnectRepository={(repo) => {
          if (repo.isConnected) {
            setDuplicateModalOpen(true);
          } else {
            setNewProjectModalOpen(false);
            setProcessingRepo(repo.fullName);
            setTimeout(() => {
              setProcessingRepo(null);
              toast({
                title: "Documentation Generated",
                description: `Documentation for ${repo.fullName} has been generated.`,
              });
            }, 5000);
          }
        }}
      />

      <DuplicateRepositoryModal
        open={duplicateModalOpen}
        onOpenChange={setDuplicateModalOpen}
        repositoryName="acme-corp/scribe-ai"
        connectedBy="John Smith"
        connectedAt="2025-01-10T09:00:00Z"
        onViewProject={() => {
          setDuplicateModalOpen(false);
          navigate("/docs/1");
        }}
      />
    </Layout>
  );
};

export default Index;
