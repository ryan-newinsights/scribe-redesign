import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImpersonationBannerProps {
  orgName: string;
  onExit: () => void;
}

export function ImpersonationBanner({ orgName, onExit }: ImpersonationBannerProps) {
  return (
    <div className="bg-warning-bg border-b border-warning/30 px-4 py-2.5 flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm font-medium text-warning-foreground">
        <AlertTriangle className="h-4 w-4 text-warning" />
        <span>⚠️ You are viewing <strong>{orgName}</strong> as Platform Admin</span>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onExit}
        className="h-7 text-xs border-warning/40 hover:bg-warning/10"
      >
        <X className="h-3 w-3 mr-1" />
        Exit
      </Button>
    </div>
  );
}
