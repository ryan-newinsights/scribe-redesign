import { AlertCircle, Download, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ErrorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectName: string;
  errorMessage?: string;
  onDownloadLogs?: () => void;
}

export function ErrorModal({
  open,
  onOpenChange,
  projectName,
  errorMessage,
  onDownloadLogs,
}: ErrorModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-status-failed-bg">
              <AlertCircle className="h-5 w-5 text-status-failed" />
            </div>
            <DialogTitle>Documentation Error</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Repository: <span className="font-medium text-foreground">{projectName}</span>
          </p>

          {errorMessage && (
            <div className="rounded-md bg-status-failed-bg p-4">
              <code className="text-sm text-status-failed font-mono">
                {errorMessage}
              </code>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            {onDownloadLogs && (
              <Button variant="outline" onClick={onDownloadLogs}>
                <Download className="h-4 w-4 mr-2" />
                Download Logs
              </Button>
            )}
            <Button variant="secondary" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
