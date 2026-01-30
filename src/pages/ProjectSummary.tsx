import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Check, ArrowLeft, RotateCw } from "lucide-react";
import { mockDocumentationSummaries, mockDocumentFiles } from "@/data/mockDocumentationData";
import { mockFileTrees, getAllFiles } from "@/data/mockFileDocumentation";
import { FileTreeSidebar, FileDocumentationView } from "@/components/documentation";
import { DocumentedFile } from "@/types/fileDocumentation";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const ProjectSummary = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<DocumentedFile | null>(null);

  const summary = projectId ? mockDocumentationSummaries[projectId] : null;
  const fileTree = projectId ? mockFileTrees[projectId] : null;

  // Initialize with first file if none selected
  const handleSelectFile = (file: DocumentedFile) => {
    setSelectedFile(file);
  };

  const handleDownloadAll = () => {
    toast({
      title: "Downloading Documentation",
      description: "Preparing executive summary, detailed docs, and diagrams...",
    });
  };

  const handleRerun = () => {
    toast({
      title: "Re-running Documentation",
      description: `Regenerating documentation for ${summary?.projectName}...`,
    });
    navigate(`/progress/${projectId}`);
  };

  const handleDownloadFile = (fileName: string) => {
    toast({
      title: "Downloading",
      description: `Downloading ${fileName}...`,
    });
  };

  if (!summary) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Documentation not found.</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Documentation Review</h1>
          <p className="text-muted-foreground">{summary.projectName}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRerun}>
            <RotateCw className="h-4 w-4 mr-2" />
            Re-run
          </Button>
          <Button onClick={handleDownloadAll}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="files">File Documentation</TabsTrigger>
          <TabsTrigger value="diagrams">Diagrams</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Left Column */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Project Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">{summary.overview}</p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {summary.totalFiles}
                      </p>
                      <p className="text-sm text-muted-foreground">Total Files</p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-950/30 rounded-lg p-4">
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {summary.functionsDocumented.done}/{summary.functionsDocumented.total}
                      </p>
                      <p className="text-sm text-muted-foreground">Functions Documented</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4">
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {summary.coverage}%
                      </p>
                      <p className="text-sm text-muted-foreground">Coverage</p>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-950/30 rounded-lg p-4">
                      <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {format(summary.lastGenerated, "yyyy-MM-dd")}
                      </p>
                      <p className="text-sm text-muted-foreground">Last Generated</p>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h4 className="font-semibold mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {summary.keyFeatures.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500 shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Quality & Stats */}
            <div className="space-y-6">
              {/* Documentation Quality */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Documentation Quality</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Completeness</span>
                      <span>{summary.quality.completeness}%</span>
                    </div>
                    <Progress value={summary.quality.completeness} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Quality Score</span>
                      <span>{summary.quality.qualityScore}%</span>
                    </div>
                    <Progress value={summary.quality.qualityScore} className="h-2 [&>div]:bg-green-500" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Examples Included</span>
                      <span>{summary.quality.examplesIncluded}%</span>
                    </div>
                    <Progress value={summary.quality.examplesIncluded} className="h-2 [&>div]:bg-purple-500" />
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

              {/* Agent Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Agent Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Reader Agent</span>
                    <span>{summary.agentStats.readerAgent.filesAnalyzed} files analyzed</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Writer Agent</span>
                    <span>{summary.agentStats.writerAgent.docstringsGenerated} docstrings generated</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Searcher Agent</span>
                    <span>{summary.agentStats.searcherAgent.contextsGathered} contexts gathered</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Verifier Agent</span>
                    <span>{summary.agentStats.verifierAgent.validationsCompleted} validations completed</span>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </TabsContent>

        <TabsContent value="files" className="mt-0">
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

        <TabsContent value="diagrams">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Diagrams viewer coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default ProjectSummary;
