import { Project, JobStatus } from "@/types/project";
import { Database, Box, FileText, RefreshCw, Eye, Github, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  onRerun: (projectId: string) => void;
  onViewProgress: (projectId: string) => void;
  onViewDocs: (projectId: string) => void;
  onTitleClick?: (projectId: string) => void;
}

const statusConfig: Record<JobStatus | 'new', { label: string; className: string }> = {
  completed: {
    label: "Completed",
    className: "bg-status-completed-bg text-status-completed",
  },
  running: {
    label: "Processing",
    className: "bg-status-running-bg text-status-running animate-pulse",
  },
  failed: {
    label: "Failed",
    className: "bg-status-failed-bg text-status-failed",
  },
  pending: {
    label: "Pending",
    className: "bg-status-pending-bg text-status-pending",
  },
  new: {
    label: "New",
    className: "bg-muted text-muted-foreground",
  },
};

export function ProjectCard({ project, onRerun, onViewProgress, onViewDocs, onTitleClick }: ProjectCardProps) {
  const status = project.latestJob?.status || 'new';
  const { label, className } = statusConfig[status];
  const hasCompletedRun = project.latestJob?.status === 'completed';
  const isRunning = project.latestJob?.status === 'running';

  const handleTitleClick = () => {
    if (hasCompletedRun && onTitleClick) {
      onTitleClick(project.id);
    }
  };

  const IntegrationIcon = project.integrationSource === 'github' ? Github : HardDrive;
  const integrationLabel = project.integrationSource === 'github' ? 'GitHub repository' : 'Local directory';

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        {/* Row 1: Title + Status Badge */}
        <div className="flex justify-between items-start mb-3 gap-2">
          <h3 
            className={cn(
              "text-lg font-bold text-foreground truncate flex-1",
              hasCompletedRun && "cursor-pointer hover:text-primary transition-colors"
            )}
            onClick={handleTitleClick}
          >
            {project.name}
          </h3>
          <Badge variant="secondary" className={cn("shrink-0 font-medium", className)}>
            {label}
          </Badge>
        </div>

        {/* Row 2: Metrics */}
        <div className="flex gap-4 text-sm text-muted-foreground mb-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="flex items-center gap-1.5">
                <IntegrationIcon className="h-4 w-4" />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{integrationLabel}</p>
            </TooltipContent>
          </Tooltip>
          <span className="flex items-center gap-1.5">
            <Database className="h-4 w-4" />
            {project.loc?.toLocaleString() || "—"} LOC
          </span>
          <span className="flex items-center gap-1.5">
            <Box className="h-4 w-4" />
            {project.componentCount || "—"} components
          </span>
        </div>

        {/* Row 3: Summary */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 min-h-[2.5rem]">
          {project.summary || "No documentation summary available yet."}
        </p>

        {/* Row 4: Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            disabled={!hasCompletedRun}
            onClick={() => onViewDocs(project.id)}
          >
            <FileText className="h-4 w-4 mr-1.5" />
            Docs
          </Button>

          {isRunning ? (
            <Button
              className="flex-1"
              onClick={() => onViewProgress(project.id)}
            >
              <Eye className="h-4 w-4 mr-1.5" />
              View Progress
            </Button>
          ) : (
            <Button
              className="flex-1"
              onClick={() => onRerun(project.id)}
            >
              <RefreshCw className="h-4 w-4 mr-1.5" />
              Re-run
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
