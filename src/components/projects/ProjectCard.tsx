import { useState } from "react";
import { Project, JobStatus, SyncStatus } from "@/types/project";
import {
  Database,
  Box,
  FileText,
  Github,
  HardDrive,
  MoreHorizontal,
  ExternalLink,
  Unlink,
  Trash2,
  Download,
  Check,
  AlertCircle,
  CircleDashed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProgressButton } from "./ProgressButton";
import { ErrorModal } from "./ErrorModal";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  onRerun: (projectId: string) => void;
  onViewProgress: (projectId: string) => void;
  onViewDocs: (projectId: string) => void;
  onTitleClick?: (projectId: string) => void;
  onStart?: (projectId: string) => void;
  onUnlink?: (projectId: string) => void;
  onDelete?: (projectId: string) => void;
  onDownloadDocs?: (projectId: string) => void;
  onDownloadLogs?: (projectId: string) => void;
  repositoryUrl?: string;
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

const syncStatusConfig: Record<SyncStatus, { label: string; icon: typeof Check; className: string }> = {
  "up-to-date": {
    label: "Up to date",
    icon: Check,
    className: "text-success",
  },
  "updates-available": {
    label: "Updates available",
    icon: AlertCircle,
    className: "text-warning",
  },
  "not-synced": {
    label: "Not synced",
    icon: CircleDashed,
    className: "text-muted-foreground",
  },
};

export function ProjectCard({
  project,
  onRerun,
  onViewProgress,
  onViewDocs,
  onTitleClick,
  onStart,
  onUnlink,
  onDelete,
  onDownloadDocs,
  onDownloadLogs,
  repositoryUrl,
}: ProjectCardProps) {
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const status = project.latestJob?.status || 'new';
  const { label, className } = statusConfig[status];
  const hasCompletedRun = project.latestJob?.status === 'completed';
  const isGitHub = project.integrationSource === 'github';

  const handleTitleClick = () => {
    if (hasCompletedRun && onTitleClick) {
      onTitleClick(project.id);
    }
  };

  const handleStart = () => {
    if (onStart) {
      onStart(project.id);
    } else {
      onRerun(project.id);
    }
  };

  const IntegrationIcon = isGitHub ? Github : HardDrive;
  const integrationLabel = isGitHub ? 'GitHub repository' : 'Local directory';

  return (
    <>
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
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3 overflow-hidden">
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
            {/* Sync status for GitHub projects */}
            {isGitHub && project.syncStatus && (() => {
              const syncConfig = syncStatusConfig[project.syncStatus];
              const SyncIcon = syncConfig.icon;
              return (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className={cn("flex items-center gap-1 shrink-0", syncConfig.className)}>
                      <SyncIcon className="h-3.5 w-3.5" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{syncConfig.label}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })()}
          </div>

          {/* Row 3: Summary */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 min-h-[2.5rem]">
            {project.summary || "No documentation summary available yet."}
          </p>

          {/* Row 4: Action Buttons - Three button layout */}
          <div className="flex gap-2">
            {/* Left: Docs Button (always present, disabled if not complete) */}
            <Button
              variant="outline"
              className="flex-1"
              disabled={!hasCompletedRun}
              onClick={() => onViewDocs(project.id)}
            >
              <FileText className="h-4 w-4 mr-1.5" />
              Docs
            </Button>

            {/* Middle: Stateful Progress Button */}
            <ProgressButton
              status={status}
              progress={project.latestJob?.progress || 0}
              onStart={handleStart}
              onViewProgress={() => onViewProgress(project.id)}
              onRerun={() => onRerun(project.id)}
              onViewError={() => setErrorModalOpen(true)}
            />

            {/* Right: More Actions Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {/* GitHub-specific actions */}
                {isGitHub && repositoryUrl && (
                  <DropdownMenuItem onClick={() => window.open(repositoryUrl, '_blank')}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on GitHub
                  </DropdownMenuItem>
                )}
                {isGitHub && onUnlink && (
                  <DropdownMenuItem onClick={() => onUnlink(project.id)}>
                    <Unlink className="h-4 w-4 mr-2" />
                    Unlink Repository
                  </DropdownMenuItem>
                )}

                {/* Download docs (available for all with completed runs) */}
                {hasCompletedRun && onDownloadDocs && (
                  <DropdownMenuItem onClick={() => onDownloadDocs(project.id)}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Documents
                  </DropdownMenuItem>
                )}

                {/* Local-specific: Delete */}
                {!isGitHub && onDelete && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onDelete(project.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Project
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Error Modal */}
      <ErrorModal
        open={errorModalOpen}
        onOpenChange={setErrorModalOpen}
        projectName={project.name}
        errorMessage={project.latestJob?.errorMessage}
        onDownloadLogs={onDownloadLogs ? () => onDownloadLogs(project.id) : undefined}
      />
    </>
  );
}
