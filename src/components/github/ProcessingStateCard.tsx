import { Loader2, Check, X, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProcessingState, ProcessingStatus } from "@/types/github";
import { cn } from "@/lib/utils";

interface ProcessingStateCardProps {
  state: ProcessingState;
  onRetry?: () => void;
  className?: string;
}

const statusMessages: Record<ProcessingStatus, string> = {
  preparing: "Preparing to process...",
  fetching: "Fetching repository code...",
  analyzing: "Analyzing files...",
  generating: "Generating documentation...",
  saving: "Saving documentation...",
  completed: "Documentation generated successfully",
  error: "An error occurred",
};

export function ProcessingStateCard({ state, onRetry, className }: ProcessingStateCardProps) {
  const isCompleted = state.status === "completed";
  const isError = state.status === "error";
  const isProcessing = !isCompleted && !isError;

  const getMessage = () => {
    if (state.status === "analyzing" && state.filesCount) {
      return `Analyzing ${state.filesCount} files...`;
    }
    return state.message || statusMessages[state.status];
  };

  const getElapsedTime = () => {
    if (state.elapsedSeconds && state.elapsedSeconds >= 30) {
      return `(${state.elapsedSeconds}s)`;
    }
    return null;
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          {/* Status icon */}
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full shrink-0",
              isCompleted && "bg-success-bg",
              isError && "bg-status-failed-bg",
              isProcessing && "bg-info-bg"
            )}
          >
            {isCompleted && <Check className="h-6 w-6 text-success" />}
            {isError && <X className="h-6 w-6 text-status-failed" />}
            {isProcessing && (
              <Loader2 className="h-6 w-6 text-info animate-spin" />
            )}
          </div>

          {/* Status text */}
          <div className="flex-1 min-w-0">
            <p
              className={cn(
                "font-medium",
                isCompleted && "text-success",
                isError && "text-status-failed",
                isProcessing && "text-foreground"
              )}
            >
              {getMessage()}
              {getElapsedTime() && (
                <span className="text-muted-foreground ml-2">{getElapsedTime()}</span>
              )}
            </p>
            {isError && state.errorMessage && (
              <p className="text-sm text-muted-foreground mt-1">{state.errorMessage}</p>
            )}
          </div>

          {/* Retry button */}
          {isError && onRetry && (
            <Button variant="outline" size="sm" onClick={onRetry}>
              <RefreshCw className="h-4 w-4 mr-1.5" />
              Retry
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
