import { Github, Check, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface GitHubPermissionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthorize: () => void;
}

export function GitHubPermissionModal({
  open,
  onOpenChange,
  onAuthorize,
}: GitHubPermissionModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center sm:text-left">
          <div className="mx-auto sm:mx-0 mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Github className="h-6 w-6" />
          </div>
          <DialogTitle>Connect your GitHub account</DialogTitle>
          <DialogDescription>
            Scribe needs access to read your repository code to generate documentation.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success/20 mt-0.5">
              <Check className="h-3 w-3 text-success" />
            </div>
            <div>
              <p className="text-sm font-medium">Read repository code</p>
              <p className="text-xs text-muted-foreground">Required for documentation</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success/20 mt-0.5">
              <Check className="h-3 w-3 text-success" />
            </div>
            <div>
              <p className="text-sm font-medium">Read your profile information</p>
              <p className="text-xs text-muted-foreground">Username and email</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 border border-border">
          <Shield className="h-4 w-4 text-muted-foreground shrink-0" />
          <p className="text-xs text-muted-foreground">
            Scribe never modifies your code. <span className="font-medium">Read-only access.</span>
          </p>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2 pt-4">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="order-2 sm:order-1"
          >
            Cancel
          </Button>
          <Button onClick={onAuthorize} className="order-1 sm:order-2">
            <Github className="h-4 w-4 mr-1.5" />
            Authorize GitHub
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
