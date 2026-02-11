import { LLMConfig } from "@/types/project";
import { GenerationConfigPanel } from "./GenerationConfigPanel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface GenerationConfigModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectName: string;
  llmConfigs: LLMConfig[];
  onSubmit: (data: { llmConfigId: string; overwrite: boolean }) => void;
}

export function GenerationConfigModal({
  open,
  onOpenChange,
  projectName,
  llmConfigs,
  onSubmit,
}: GenerationConfigModalProps) {
  const handleSubmit = (data: { llmConfigId: string; overwrite: boolean }) => {
    onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Configure Generation</DialogTitle>
        </DialogHeader>
        <GenerationConfigPanel
          repoName={projectName}
          source="local"
          llmConfigs={llmConfigs}
          onBack={() => onOpenChange(false)}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
