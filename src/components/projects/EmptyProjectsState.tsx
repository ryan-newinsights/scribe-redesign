import { FolderOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyProjectsStateProps {
  onNewIntegration: () => void;
}

export function EmptyProjectsState({ onNewIntegration }: EmptyProjectsStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
        <FolderOpen className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        No projects yet
      </h3>
      <p className="text-sm text-muted-foreground text-center max-w-sm mb-6">
        Get started by connecting a GitHub repository or adding a local project to generate documentation.
      </p>
      <Button onClick={onNewIntegration}>
        <Plus className="h-4 w-4 mr-2" />
        New Integration
      </Button>
    </div>
  );
}
