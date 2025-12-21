import { AgentStep, AgentStepStatus } from "@/types/workflow";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, Loader2, XCircle, SkipForward } from "lucide-react";

interface WorkflowStepProps {
  step: AgentStep;
  isLast: boolean;
}

const statusIcons: Record<AgentStepStatus, React.ReactNode> = {
  pending: <Circle className="h-5 w-5 text-muted-foreground" />,
  running: <Loader2 className="h-5 w-5 text-primary animate-spin" />,
  completed: <CheckCircle2 className="h-5 w-5 text-status-success" />,
  failed: <XCircle className="h-5 w-5 text-status-error" />,
  skipped: <SkipForward className="h-5 w-5 text-muted-foreground" />,
};

const statusColors: Record<AgentStepStatus, string> = {
  pending: "border-muted",
  running: "border-primary bg-primary/5",
  completed: "border-status-success/30",
  failed: "border-status-error/30 bg-status-error/5",
  skipped: "border-muted",
};

export function WorkflowStep({ step, isLast }: WorkflowStepProps) {
  return (
    <div className="relative flex gap-4">
      {/* Connector line */}
      {!isLast && (
        <div className="absolute left-[9px] top-8 h-[calc(100%-16px)] w-0.5 bg-border" />
      )}
      
      {/* Status icon */}
      <div className="relative z-10 flex-shrink-0 mt-0.5">
        {statusIcons[step.status]}
      </div>
      
      {/* Step content */}
      <div className={cn(
        "flex-1 rounded-lg border p-3 mb-3 transition-all",
        statusColors[step.status]
      )}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="font-medium text-sm">{step.name}</h4>
            <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
          </div>
          {step.status === "running" && (
            <span className="text-xs text-primary font-medium animate-pulse">
              In Progress
            </span>
          )}
        </div>
        
        {step.output && (
          <div className="mt-2 text-xs bg-muted/50 rounded px-2 py-1.5 font-mono text-muted-foreground">
            {step.output}
          </div>
        )}
        
        {step.error && (
          <div className="mt-2 text-xs bg-status-error/10 text-status-error rounded px-2 py-1.5">
            {step.error}
          </div>
        )}
      </div>
    </div>
  );
}
