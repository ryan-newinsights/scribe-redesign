import { LLMConfig } from "@/types/project";
import { GenerationConfigPanel } from "./GenerationConfigPanel";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface GenerationConfigModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectName: string;
  llmConfigs: LLMConfig[];
  mode?: "new" | "sync";
  onSubmit: (data: { llmConfigId: string; overwrite: boolean; fullUpdate: boolean }) => void;
}

export function GenerationConfigModal({
  open,
  onOpenChange,
  projectName,
  llmConfigs,
  mode = "new",
  onSubmit,
}: GenerationConfigModalProps) {
  const handleSubmit = (data: { llmConfigId: string; overwrite: boolean; fullUpdate: boolean }) => {
    onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6">
        <GenerationConfigPanel
          repoName={projectName}
          source="local"
          mode={mode}
          llmConfigs={llmConfigs}
          onBack={() => onOpenChange(false)}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
