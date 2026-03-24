import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Check,
  Code,
  GitCommitHorizontal,
  Github,
  HardDrive,
  Plus,
  Play,
  RefreshCw,
  Loader2,
  FileText,
  Download,
  ExternalLink,
  Unplug,
  MoreHorizontal,
} from "lucide-react";
import { mockProjects, mockLLMConfigs } from "@/data/mockData";
import { GenerationConfigModal } from "@/components/projects/GenerationConfigModal";
import { cn } from "@/lib/utils";
import type { JobStatus } from "@/types/project";

const statusConfig: Record<JobStatus | "new", { label: string; badgeClassName: string }> = {
  completed: { label: "Completed", badgeClassName: "bg-status-completed-bg text-status-completed" },
  running: { label: "Processing", badgeClassName: "bg-status-running-bg text-status-running animate-pulse" },
  failed: { label: "Failed", badgeClassName: "bg-status-failed-bg text-status-failed" },
  pending: { label: "Pending", badgeClassName: "bg-status-pending-bg text-status-pending" },
  new: { label: "New", badgeClassName: "bg-status-pending-bg text-status-pending" },
};

const statusActionConfig: Record<JobStatus | "new", { label: string; icon: React.ElementType; className: string }> = {
  completed: { label: "Re-run", icon: RefreshCw, className: "text-muted-foreground hover:text-foreground" },
  running: { label: "Running", icon: Loader2, className: "text-status-running animate-spin cursor-default" },
  failed: { label: "Re-run", icon: RefreshCw, className: "text-muted-foreground hover:text-foreground" },
  pending: { label: "Pending", icon: Loader2, className: "text-status-pending animate-pulse cursor-default" },
  new: { label: "Run", icon: Play, className: "text-muted-foreground hover:text-foreground" },
};

const Index = () => {
  const navigate = useNavigate();
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{ id: string; name: string; status: JobStatus | "new"; lastRunTokens?: number } | null>(null);

  const handleActionClick = (projectId: string, projectName: string, status: JobStatus | "new", lastRunTokens?: number) => {
    if (status === "running" || status === "pending") return;
    setSelectedProject({ id: projectId, name: projectName, status, lastRunTokens });
    setConfigModalOpen(true);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-heading font-bold">Projects</h1>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-1.5" />
          New Integration
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {mockProjects.map((project) => {
          const status = project.latestJob?.status || "new";
          const { label: actionLabel, icon: ActionIcon, className: actionClassName } = statusActionConfig[status];
          const hasCompleted = project.latestJob?.status === "completed";
          const isGitHub = project.integrationSource === "github";

          return (
            <Card
              key={project.id}
              className="hover:shadow-md transition-shadow cursor-pointer group"
              onClick={() => {
                if (hasCompleted) navigate(`/docs/${project.id}`);
              }}
            >
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-3 gap-2">
                  <h3 className={cn("text-base font-heading font-semibold truncate flex-1", hasCompleted && "group-hover:text-accent transition-colors")}>
                    {project.name}
                  </h3>
                  <Badge variant="secondary" className={cn("shrink-0 font-medium text-xs", statusConfig[status].badgeClassName)}>
                    {statusConfig[status].label}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-3 min-h-[3.75rem] mb-3">
                  {project.summary || "No documentation summary available yet."}
                </p>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {isGitHub && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={`https://github.com/${project.repoPath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 hover:text-foreground transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="h-3.5 w-3.5" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent><p>View on GitHub</p></TooltipContent>
                    </Tooltip>
                  )}
                  {!isGitHub && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="flex items-center gap-1">
                          <HardDrive className="h-3.5 w-3.5" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent><p>Local</p></TooltipContent>
                    </Tooltip>
                  )}
                  <span className="flex items-center gap-1">
                    <Code className="h-3.5 w-3.5" />
                    {project.loc?.toLocaleString() || "—"}
                  </span>
                  {project.commitsBehind != null && project.commitsBehind > 0 ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="flex items-center gap-1 text-status-pending">
                          <GitCommitHorizontal className="h-3.5 w-3.5" />
                          {project.commitsBehind} behind
                        </span>
                      </TooltipTrigger>
                      <TooltipContent><p>{project.commitsBehind} commit{project.commitsBehind > 1 ? 's' : ''} since last doc generation</p></TooltipContent>
                    </Tooltip>
                  ) : hasCompleted && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="flex items-center gap-1 text-status-completed">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent><p>Up to date documentation</p></TooltipContent>
                    </Tooltip>
                  )}

                  <div className="flex items-center ml-auto gap-0.5">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={cn("h-6 w-6", actionClassName)}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleActionClick(project.id, project.name, status, project.latestJob?.totalTokens);
                          }}
                        >
                          <ActionIcon className="h-3 w-3" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent><p>{actionLabel}</p></TooltipContent>
                    </Tooltip>

                    {hasCompleted && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-muted-foreground hover:text-foreground"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/docs/${project.id}`);
                            }}
                          >
                            <FileText className="h-3 w-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>View Docs</p></TooltipContent>
                      </Tooltip>
                    )}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground hover:text-foreground"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Download className="mr-2 h-4 w-4" />
                          Download All Docs
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                          <Download className="mr-2 h-4 w-4" />
                          Download Logs
                        </DropdownMenuItem>
                        {isGitHub && (
                          <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View on GitHub
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Unplug className="mr-2 h-4 w-4" />
                          Disconnect
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Generation Config Modal */}
      <GenerationConfigModal
        open={configModalOpen}
        onOpenChange={setConfigModalOpen}
        projectName={selectedProject?.name || ""}
        llmConfigs={mockLLMConfigs}
        mode={selectedProject?.status === "new" || selectedProject?.status === "pending" ? "new" : "sync"}
        lastRunTokens={selectedProject?.lastRunTokens}
        onSubmit={(config) => {
          console.log("Config submitted:", selectedProject?.id, config);
          if (selectedProject) {
            navigate(`/progress/${selectedProject.id}`);
          }
        }}
      />
    </Layout>
  );
};

export default Index;
