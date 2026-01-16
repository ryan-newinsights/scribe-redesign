import { Github, GitBranch, GitCommit, FileText, RefreshCw, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitHubProjectInfo } from "@/types/github";

interface GitHubInfoPanelProps {
  info: GitHubProjectInfo;
  onCheckUpdates: () => void;
  onRegenerate: () => void;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function GitHubInfoPanel({ info, onCheckUpdates, onRegenerate }: GitHubInfoPanelProps) {
  const repoUrl = `https://github.com/${info.repositoryFullName}`;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Github className="h-5 w-5" />
          Repository
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Repository info rows */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <span className="text-sm text-muted-foreground">Repository</span>
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
            >
              {info.repositoryFullName}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="flex items-start justify-between gap-2">
            <span className="text-sm text-muted-foreground flex items-center gap-1.5">
              <GitBranch className="h-3.5 w-3.5" />
              Branch
            </span>
            <span className="text-sm font-medium">{info.branch}</span>
          </div>

          <div className="flex items-start justify-between gap-2">
            <span className="text-sm text-muted-foreground flex items-center gap-1.5">
              <GitCommit className="h-3.5 w-3.5" />
              Last commit
            </span>
            <span className="text-sm font-medium">
              {info.lastCommit.slice(0, 7)} • {formatDate(info.lastCommitDate)}
            </span>
          </div>

          <div className="flex items-start justify-between gap-2">
            <span className="text-sm text-muted-foreground flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5" />
              Documentation
            </span>
            <span className="text-sm font-medium">
              Generated {formatDate(info.lastProcessed)} • {info.componentsDocumented} components
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={onCheckUpdates}>
            <RefreshCw className="h-4 w-4 mr-1.5" />
            Check for Updates
          </Button>
          <Button variant="outline" size="sm" className="flex-1" onClick={onRegenerate}>
            <RefreshCw className="h-4 w-4 mr-1.5" />
            Regenerate Docs
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
