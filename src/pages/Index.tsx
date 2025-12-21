import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { NewIntegrationModal } from "@/components/projects/NewIntegrationModal";
import { RecentDocumentsTable } from "@/components/projects/RecentDocumentsTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { mockProjects, mockLLMConfigs, mockRecentDocuments } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();

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
  };

  const handleViewProgress = (projectId: string) => {
    toast({
      title: "View Progress",
      description: "Navigating to progress view...",
    });
  };

  const handleViewDocs = (projectId: string) => {
    const project = mockProjects.find(p => p.id === projectId);
    toast({
      title: "Opening Documentation",
      description: `Opening docs for ${project?.name}`,
    });
  };

  return (
    <Layout>
      {/* Section Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Integration
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {mockProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onRerun={handleRerun}
            onViewProgress={handleViewProgress}
            onViewDocs={handleViewDocs}
          />
        ))}
      </div>

      {/* Recently Viewed Documents */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Recently Viewed Documents</h2>
        <RecentDocumentsTable documents={mockRecentDocuments} />
      </div>

      {/* New Integration Modal */}
      <NewIntegrationModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        llmConfigs={mockLLMConfigs}
        onSubmit={handleNewIntegration}
      />
    </Layout>
  );
};

export default Index;
