import { useState, useMemo } from "react";
import { Search, X, Lock, Globe, Link } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GitHubRepository, languageColors } from "@/types/github";
import { cn } from "@/lib/utils";

interface RepositoryPickerProps {
  repositories: GitHubRepository[];
  selectedRepository: GitHubRepository | null;
  onSelect: (repo: GitHubRepository) => void;
  isLoading?: boolean;
  totalCount?: number;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Updated today";
  if (diffDays === 1) return "Updated yesterday";
  if (diffDays < 7) return `Updated ${diffDays} days ago`;
  if (diffDays < 30) return `Updated ${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `Updated ${Math.floor(diffDays / 30)} months ago`;
  return `Updated ${Math.floor(diffDays / 365)} years ago`;
}

function RepositoryRow({
  repo,
  isSelected,
  onSelect,
}: {
  repo: GitHubRepository;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const langClass = repo.language ? languageColors[repo.language] : null;

  return (
    <button
      onClick={onSelect}
      disabled={repo.isConnected}
      className={cn(
        "w-full flex items-center gap-3 p-3 text-left rounded-lg border transition-colors",
        isSelected && !repo.isConnected
          ? "border-primary bg-primary/5"
          : "border-transparent hover:bg-muted/50",
        repo.isConnected && "opacity-60 cursor-not-allowed"
      )}
    >
      {/* Privacy icon */}
      <div className="shrink-0">
        {repo.isPrivate ? (
          <Lock className="h-4 w-4 text-muted-foreground" />
        ) : (
          <Globe className="h-4 w-4 text-muted-foreground" />
        )}
      </div>

      {/* Repo info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm truncate">{repo.fullName}</span>
          {repo.isConnected && (
            <Badge variant="secondary" className="shrink-0 text-xs gap-1">
              <Link className="h-3 w-3" />
              Connected
            </Badge>
          )}
        </div>
        <span className="text-xs text-muted-foreground">
          {formatRelativeTime(repo.updatedAt)}
        </span>
      </div>

      {/* Language badge */}
      {repo.language && (
        <Badge
          variant="secondary"
          className={cn("shrink-0 text-xs", langClass)}
        >
          {repo.language}
        </Badge>
      )}
    </button>
  );
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 p-3">
      <Skeleton className="h-4 w-4 rounded" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="h-5 w-16 rounded-full" />
    </div>
  );
}

export function RepositoryPicker({
  repositories,
  selectedRepository,
  onSelect,
  isLoading = false,
  totalCount,
  onLoadMore,
  hasMore = false,
}: RepositoryPickerProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Group repositories by owner
  const groupedRepositories = useMemo(() => {
    const filtered = repositories.filter((repo) =>
      repo.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const grouped: Record<string, GitHubRepository[]> = {};
    for (const repo of filtered) {
      if (!grouped[repo.owner]) {
        grouped[repo.owner] = [];
      }
      grouped[repo.owner].push(repo);
    }
    return grouped;
  }, [repositories, searchQuery]);

  const hasResults = Object.keys(groupedRepositories).length > 0;

  return (
    <div className="space-y-4">
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search repositories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 pr-9"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-muted"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Repository list */}
      <ScrollArea className="h-[320px] -mx-1 px-1">
        {isLoading ? (
          <div className="space-y-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </div>
        ) : !hasResults ? (
          <div className="flex flex-col items-center justify-center h-full py-12 text-center">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground">
              {searchQuery ? `No repositories match "${searchQuery}"` : "No repositories found"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {searchQuery ? "Try a different search term" : "Connect your GitHub account to see repositories"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedRepositories).map(([owner, repos]) => (
              <div key={owner}>
                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-1">
                  {owner === "personal" ? "Your Repositories" : owner}
                </h4>
                <div className="space-y-0.5">
                  {repos.map((repo) => (
                    <RepositoryRow
                      key={repo.id}
                      repo={repo}
                      isSelected={selectedRepository?.id === repo.id}
                      onSelect={() => onSelect(repo)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {/* Pagination info and load more */}
      {totalCount && !isLoading && hasResults && (
        <div className="flex items-center justify-between pt-2 border-t">
          <span className="text-xs text-muted-foreground">
            Showing {repositories.length} of {totalCount} repositories
          </span>
          {hasMore && onLoadMore && (
            <Button variant="ghost" size="sm" onClick={onLoadMore}>
              Load more
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
