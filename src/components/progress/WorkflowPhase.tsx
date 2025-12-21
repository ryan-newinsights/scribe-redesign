import { WorkflowPhase as WorkflowPhaseType } from "@/types/workflow";
import { WorkflowStep } from "./WorkflowStep";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface WorkflowPhaseProps {
  phase: WorkflowPhaseType;
  phaseIndex: number;
  isActive: boolean;
}

export function WorkflowPhase({ phase, phaseIndex, isActive }: WorkflowPhaseProps) {
  const [isOpen, setIsOpen] = useState(isActive);
  
  const completedSteps = phase.steps.filter(s => s.status === "completed").length;
  const totalSteps = phase.steps.length;
  const hasRunningStep = phase.steps.some(s => s.status === "running");
  const hasFailed = phase.steps.some(s => s.status === "failed");
  const isComplete = completedSteps === totalSteps;
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className={cn(
          "flex items-center justify-between p-4 rounded-lg border transition-all hover:bg-muted/50",
          isActive && "border-primary bg-primary/5",
          isComplete && "border-status-success/30",
          hasFailed && "border-status-error/30"
        )}>
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex items-center justify-center h-8 w-8 rounded-full text-sm font-semibold",
              isComplete && "bg-status-success text-white",
              hasFailed && "bg-status-error text-white",
              hasRunningStep && "bg-primary text-primary-foreground",
              !isComplete && !hasFailed && !hasRunningStep && "bg-muted text-muted-foreground"
            )}>
              {phaseIndex + 1}
            </div>
            <div className="text-left">
              <h3 className="font-semibold">{phase.name}</h3>
              <p className="text-xs text-muted-foreground">
                {completedSteps} of {totalSteps} steps complete
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {hasRunningStep && (
              <span className="text-xs text-primary font-medium px-2 py-1 bg-primary/10 rounded-full animate-pulse">
                Running
              </span>
            )}
            {isOpen ? (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        <div className="pl-6 pt-4">
          {phase.steps.map((step, index) => (
            <WorkflowStep 
              key={step.id} 
              step={step} 
              isLast={index === phase.steps.length - 1}
            />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
