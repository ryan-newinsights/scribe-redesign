import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Download, Check, RotateCw, Settings, ChevronDown, Users, Lightbulb, Zap } from "lucide-react";
import { mockDocumentationSummaries, mockDocumentFiles } from "@/data/mockDocumentationData";
import { mockFileTrees } from "@/data/mockFileDocumentation";
import { mockLLMConfigs } from "@/data/mockData";
import { FileTreeSidebar, FileDocumentationView } from "@/components/documentation";
import { DiagramsTab } from "@/components/diagrams";
import { GenerationConfigModal } from "@/components/projects/GenerationConfigModal";
import { DocumentedFile } from "@/types/fileDocumentation";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const ProjectSummary = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<DocumentedFile | null>(null);
  const [configModalOpen, setConfigModalOpen] = useState(false);

  const summary = projectId ? mockDocumentationSummaries[projectId] : null;
  const fileTree = projectId ? mockFileTrees[projectId] : null;

  const handleSelectFile = (file: DocumentedFile) => {
    setSelectedFile(file);
  };

  const handleExport = (type: "docs" | "codemap" | "diagrams") => {
    const labels = {
      docs: "Documentation",
      codemap: "CodeMap",
      diagrams: "Diagrams",
    };
    toast({
      title: `Exporting ${labels[type]}`,
      description: `Preparing ${labels[type].toLowerCase()} for download...`,
    });
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

  const handleDownloadFile = (fileName: string) => {
    toast({
      title: "Downloading",
      description: `Downloading ${fileName}...`,
    });
  };

  const handleSettings = () => {
    toast({
      title: "Settings",
      description: "Project settings coming soon...",
    });
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
          <h1 className="text-2xl font-bold">Project Workspace</h1>
          <p className="text-muted-foreground">{summary.projectName}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={handleSettings}>
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={handleRegenerate}>
            <RotateCw className="h-4 w-4 mr-2" />
            Regenerate
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport("docs")}>
                Export Docs
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("codemap")}>
                Export CodeMap
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("diagrams")}>
                Export Diagrams
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6 bg-transparent border-b border-border rounded-none p-0 h-auto w-full justify-start">
          <TabsTrigger
            value="overview"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2.5 text-muted-foreground data-[state=active]:text-foreground hover:text-foreground transition-colors"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="documentation"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2.5 text-muted-foreground data-[state=active]:text-foreground hover:text-foreground transition-colors"
          >
            Documentation
          </TabsTrigger>
          <TabsTrigger
            value="structure"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2.5 text-muted-foreground data-[state=active]:text-foreground hover:text-foreground transition-colors"
          >
            Structure
          </TabsTrigger>
          <TabsTrigger
            value="diagrams"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2.5 text-muted-foreground data-[state=active]:text-foreground hover:text-foreground transition-colors"
          >
            Diagrams
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2.5 text-muted-foreground data-[state=active]:text-foreground hover:text-foreground transition-colors"
          >
            History
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab (formerly Summary) */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Left Column */}
            <div className="lg:col-span-2 space-y-6">

              {/* Executive Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Executive Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{summary.overview}</p>
                </CardContent>
              </Card>

              {/* Key Features */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <CardTitle className="text-lg">Key Features</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {summary.keyFeatures.map((feature, idx) => (
                      <div key={idx} className="flex gap-3">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">{feature.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Target Audience */}
              {summary.targetAudience && summary.targetAudience.length > 0 && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <CardTitle className="text-lg">Target Audience</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {summary.targetAudience.map((audience, idx) => (
                        <div key={idx} className="flex gap-3 p-3 rounded-lg bg-muted/40 border border-border">
                          <div>
                            <Badge variant="secondary" className="mb-1.5 text-xs">{audience.role}</Badge>
                            <p className="text-xs text-muted-foreground">{audience.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Use Cases */}
              {summary.useCases && summary.useCases.length > 0 && (
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-primary" />
                      <CardTitle className="text-lg">Use Cases</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {summary.useCases.map((useCase, idx) => (
                      <div key={idx} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <div>
                          <p className="text-sm font-medium">{useCase.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{useCase.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Analysis Summary */}
            <div className="space-y-6">
              {/* Unified Analysis Card */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Analysis Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  {/* Colored stat tiles */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Files — blue */}
                    <div className="rounded-lg p-3 bg-blue-50 border border-blue-100 dark:bg-blue-950/30 dark:border-blue-900/40">
                      <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        {summary.agentStats.readerAgent.filesAnalyzed}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">Files Analyzed</p>
                    </div>
                    {/* Functions — purple */}
                    <div className="rounded-lg p-3 bg-purple-50 border border-purple-100 dark:bg-purple-950/30 dark:border-purple-900/40">
                      <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                        {summary.functionsDocumented.done}/{summary.functionsDocumented.total}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">Functions Covered</p>
                    </div>
                    {/* Lines of code — green */}
                    <div className="rounded-lg p-3 bg-green-50 border border-green-100 dark:bg-green-950/30 dark:border-green-900/40">
                      <p className="text-xl font-bold text-green-600 dark:text-green-400">
                        {summary.agentStats.readerAgent.linesOfCode.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">Lines of Code</p>
                    </div>
                    {/* Last generated — amber */}
                    <div className="rounded-lg p-3 bg-amber-50 border border-amber-100 dark:bg-amber-950/30 dark:border-amber-900/40">
                      <p className="text-xl font-bold text-amber-600 dark:text-amber-400 leading-tight">
                        {format(summary.lastGenerated, "dd MMM yy")}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">Last Generated</p>
                    </div>
                    {/* Coverage — teal, full width */}
                    <div className="col-span-2 rounded-lg p-3 bg-teal-50 border border-teal-100 dark:bg-teal-950/30 dark:border-teal-900/40 flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">Coverage</p>
                      <p className="text-xl font-bold text-teal-600 dark:text-teal-400">
                        {summary.coverage}%
                      </p>
                    </div>
                  </div>

                  {/* Quality bars */}
                  <div className="space-y-3 pt-1">
                    <p className="text-sm font-medium">Documentation Quality</p>
                    <div>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Completeness</span>
                        <span className="font-medium text-foreground">{summary.quality.completeness}%</span>
                      </div>
                      <Progress value={summary.quality.completeness} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Quality Score</span>
                        <span className="font-medium text-foreground">{summary.quality.qualityScore}%</span>
                      </div>
                      <Progress value={summary.quality.qualityScore} className="h-1.5 [&>div]:bg-green-500" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Examples Included</span>
                        <span className="font-medium text-foreground">{summary.quality.examplesIncluded}%</span>
                      </div>
                      <Progress value={summary.quality.examplesIncluded} className="h-1.5 [&>div]:bg-purple-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Download Files */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Download Files</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockDocumentFiles.map((file) => (
                    <div key={file.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{file.description}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownloadFile(file.name)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Documentation Tab (formerly File Documentation) */}
        <TabsContent value="documentation" className="mt-0">
          {fileTree ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-220px)] min-h-[500px]">
              {/* File Tree Sidebar */}
              <div className="lg:col-span-1 h-full">
                <FileTreeSidebar
                  fileTree={fileTree}
                  selectedFileId={selectedFile?.id ?? null}
                  onSelectFile={handleSelectFile}
                />
              </div>

              {/* Documentation Content */}
              <div className="lg:col-span-3 h-full">
                <FileDocumentationView file={selectedFile} />
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No file documentation available.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Structure Tab (NEW) */}
        <TabsContent value="structure">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Codebase Structure</CardTitle>
            </CardHeader>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                Codebase topology visualization coming soon...
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                View dependency graphs, module relationships, and architectural patterns.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Diagrams Tab */}
        <TabsContent value="diagrams">
          <DiagramsTab />
        </TabsContent>

        {/* History Tab (NEW) */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Job History</CardTitle>
            </CardHeader>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                Job history and version tracking coming soon...
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                View past documentation runs, compare versions, and restore previous states.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <GenerationConfigModal
        open={configModalOpen}
        onOpenChange={setConfigModalOpen}
        projectName={summary?.projectName || ""}
        llmConfigs={mockLLMConfigs}
        onSubmit={handleGenerateWithConfig}
      />
    </Layout>
  );
};

export default ProjectSummary;
