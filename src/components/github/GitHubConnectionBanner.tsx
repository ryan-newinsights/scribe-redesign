import { useState } from "react";
import { Info, X, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GitHubConnectionBannerProps {
  onConnect: () => void;
  className?: string;
}

export function GitHubConnectionBanner({ onConnect, className }: GitHubConnectionBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div
      className={cn(
        "relative flex items-center justify-between gap-4 rounded-lg bg-info-bg border border-info/20 px-4 py-3",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-info/10">
          <Info className="h-4 w-4 text-info" />
        </div>
        <div className="flex items-center gap-2">
          <Github className="h-4 w-4 text-foreground" />
          <span className="text-sm font-medium text-foreground">
            Connect GitHub to import repositories directly
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button onClick={onConnect} size="sm">
          <Github className="h-4 w-4 mr-1.5" />
          Connect GitHub
        </Button>
        <button
          onClick={() => setIsDismissed(true)}
          className="p-1.5 rounded-md hover:bg-info/10 transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
