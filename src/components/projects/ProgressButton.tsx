import { Eye, Play, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProgressButtonProps {
  status: 'new' | 'running' | 'completed' | 'failed' | 'pending';
  progress?: number;
  onStart?: () => void;
  onViewProgress?: () => void;
  onRerun?: () => void;
  onViewError?: () => void;
}

export function ProgressButton({
  status,
  progress = 0,
  onStart,
  onViewProgress,
  onRerun,
  onViewError,
}: ProgressButtonProps) {
  // New project - never run
  if (status === 'new' || status === 'pending') {
    return (
      <Button className="flex-1" onClick={onStart}>
        <Play className="h-4 w-4 mr-1.5" />
        Start
      </Button>
    );
  }

  // Running - show progress fill
  if (status === 'running') {
    return (
      <Button
        className="flex-1 relative overflow-hidden"
        onClick={onViewProgress}
      >
        {/* Progress fill background */}
        <div
          className="absolute inset-0 bg-primary-foreground/20 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
        <span className="relative z-10 flex items-center">
          <Eye className="h-4 w-4 mr-1.5" />
          Progress
        </span>
      </Button>
    );
  }

  // Failed - show error state
  if (status === 'failed') {
    return (
      <Button
        variant="outline"
        className={cn(
          "flex-1 bg-status-failed-bg border-status-failed/30",
          "text-status-failed hover:bg-status-failed-bg hover:text-status-failed"
        )}
        onClick={onViewError}
      >
        <AlertCircle className="h-4 w-4 mr-1.5" />
        View Errors
      </Button>
    );
  }

  // Completed - show re-run
  return (
    <Button className="flex-1" onClick={onRerun}>
      <RefreshCw className="h-4 w-4 mr-1.5" />
      Re-run
    </Button>
  );
}
