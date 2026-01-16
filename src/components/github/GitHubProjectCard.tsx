import { Github, FileText, MoreHorizontal, Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SyncStatus } from "@/types/github";
import { cn } from "@/lib/utils";

interface GitHubProjectCardProps {
  id: string;
  repositoryName: string;
  syncStatus: SyncStatus;
  lastProcessed?: string;
  onViewDocs: () => void;
  onCheckUpdates?: () => void;
  onRegenerate?: () => void;
  onDelete?: () => void;
}

const syncStatusConfig: Record<SyncStatus, { label: string; className: string }> = {
  "up-to-date": {
    label: "Up to date",
    className: "bg-success-bg text-success",
  },
  "updates-available": {
    label: "Updates available",
    className: "bg-warning-bg text-warning",
  },
  "not-processed": {
    label: "Not yet processed",
    className: "bg-muted text-muted-foreground",
  },
};

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) return "Processed just now";
  if (diffHours === 1) return "Processed 1 hour ago";
  if (diffHours < 24) return `Processed ${diffHours} hours ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Processed yesterday";
  return `Processed ${diffDays} days ago`;
}

export function GitHubProjectCard({
  repositoryName,
  syncStatus,
  lastProcessed,
  onViewDocs,
  onCheckUpdates,
  onRegenerate,
  onDelete,
}: GitHubProjectCardProps) {
  const { label, className } = syncStatusConfig[syncStatus];

  return (
    <Card className="hover:shadow-md transition-shadow relative">
      {/* GitHub indicator */}
      <div className="absolute top-3 right-3">
        <Github className="h-4 w-4 text-muted-foreground" />
      </div>

      <CardContent className="p-5">
        {/* Repository name */}
        <h3 className="text-lg font-bold text-foreground truncate pr-8 mb-2">
          {repositoryName}
        </h3>

        {/* Sync status badge */}
        <Badge variant="secondary" className={cn("mb-3 font-medium", className)}>
          {label}
        </Badge>

        {/* Last processed */}
        {lastProcessed && (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
            <Clock className="h-4 w-4" />
            {formatRelativeTime(lastProcessed)}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button className="flex-1" onClick={onViewDocs}>
            <FileText className="h-4 w-4 mr-1.5" />
            View Docs
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onCheckUpdates && (
                <DropdownMenuItem onClick={onCheckUpdates}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Check for updates
                </DropdownMenuItem>
              )}
              {onRegenerate && (
                <DropdownMenuItem onClick={onRegenerate}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerate docs
                </DropdownMenuItem>
              )}
              {onDelete && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onDelete} className="text-destructive">
                    Delete project
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
