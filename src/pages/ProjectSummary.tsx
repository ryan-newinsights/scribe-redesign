import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, RotateCw, ChevronDown } from "lucide-react";
import { mockDocumentationSummaries } from "@/data/mockDocumentationData";
import { mockTechOverviews } from "@/data/mockTechOverviewData";
import { mockLLMConfigs } from "@/data/mockData";
import { GenerationConfigModal } from "@/components/projects/GenerationConfigModal";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { OverviewTab } from "@/components/project/OverviewTab";
import { TechOverviewTab } from "@/components/project/TechOverviewTab";
import { CodeDocsTab } from "@/components/project/CodeDocsTab";
import { DiagramsTab } from "@/components/diagrams";

type TabId = "overview" | "tech-overview" | "code-docs" | "diagrams";

const tabs: { id: TabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "tech-overview", label: "Tech Overview" },
  { id: "code-docs", label: "Code Docs" },
  { id: "diagrams", label: "Diagrams" },
];

const ProjectSummary = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [configModalOpen, setConfigModalOpen] = useState(false);

  const summary = projectId ? mockDocumentationSummaries[projectId] : null;
  const techOverview = projectId ? mockTechOverviews[projectId] : null;

  const handleExport = (type: string) => {
    toast({ title: `Exporting ${type}`, description: `Preparing download...` });
  };

  const handleRegenerate = () => {
    setConfigModalOpen(true);
  };

  const handleGenerateWithConfig = (data: {
    llmConfigId: string;
    overwrite: boolean;
  }) => {
    toast({
      title: "Regenerating Documentation",
      description: `Starting regeneration with ${data.overwrite ? "overwrite" : "merge"} mode...`,
    });
    navigate(`/progress/${projectId}`);
  };

  if (!summary) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Project not found.</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate("/")}>
            Back to Projects
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Projects</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{summary.projectName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold">Project Insights</h1>
          <p className="text-muted-foreground text-sm">{summary.projectName}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRegenerate}>
            <RotateCw className="h-3.5 w-3.5 mr-1.5" />
            Regenerate
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm">
                <Download className="h-3.5 w-3.5 mr-1.5" />
                Export
                <ChevronDown className="h-3.5 w-3.5 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport("Docs")}>Export Docs</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("CodeMap")}>Export CodeMap</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("Diagrams")}>Export Diagrams</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Horizontal tab navigation */}
      <div className="border-b border-border mb-6">
        <nav className="flex gap-0 -mb-px">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn(
                "px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                activeTab === id
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              )}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab content */}
      {activeTab === "overview" && <OverviewTab summary={summary} />}
      {activeTab === "tech-overview" && <TechOverviewTab data={techOverview} />}
      {activeTab === "code-docs" && <CodeDocsTab projectId={projectId!} />}
      {activeTab === "diagrams" && <DiagramsTab />}

      <GenerationConfigModal
        open={configModalOpen}
        onOpenChange={setConfigModalOpen}
        projectName={summary?.projectName || ""}
        llmConfigs={mockLLMConfigs}
        mode="sync"
        onSubmit={handleGenerateWithConfig}
      />
    </Layout>
  );
};

export default ProjectSummary;
