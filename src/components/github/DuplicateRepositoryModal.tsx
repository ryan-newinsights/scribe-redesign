import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DuplicateRepositoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  repositoryName: string;
  connectedBy: string;
  connectedAt: string;
  onViewProject: () => void;
}

export function DuplicateRepositoryModal({
  open,
  onOpenChange,
  repositoryName,
  connectedBy,
  connectedAt,
  onViewProject,
}: DuplicateRepositoryModalProps) {
  const formattedDate = new Date(connectedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <div className="mx-auto sm:mx-0 mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-warning-bg">
            <AlertTriangle className="h-6 w-6 text-warning" />
          </div>
          <AlertDialogTitle>Repository already connected</AlertDialogTitle>
          <AlertDialogDescription>
            <span className="font-medium text-foreground">{repositoryName}</span> was
            connected by {connectedBy} on {formattedDate}.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex-col sm:flex-row gap-2 pt-4">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="order-2 sm:order-1"
          >
            Cancel
          </Button>
          <Button onClick={onViewProject} className="order-1 sm:order-2">
            View Existing Project
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
