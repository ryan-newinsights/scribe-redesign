import { JobLog } from "@/types/workflow";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

interface JobLogsProps {
  logs: JobLog[];
}

const levelStyles: Record<JobLog['level'], string> = {
  info: "text-foreground",
  warn: "text-status-warning",
  error: "text-status-error",
  debug: "text-muted-foreground",
};

const levelBadges: Record<JobLog['level'], string> = {
  info: "bg-primary/10 text-primary",
  warn: "bg-status-warning/10 text-status-warning",
  error: "bg-status-error/10 text-status-error",
  debug: "bg-muted text-muted-foreground",
};

export function JobLogs({ logs }: JobLogsProps) {
  return (
    <div className="rounded-lg border bg-card">
      <div className="p-3 border-b">
        <h3 className="font-semibold text-sm">Activity Log</h3>
      </div>
      <ScrollArea className="h-[300px]">
        <div className="p-3 space-y-2 font-mono text-xs">
          {logs.map((log) => (
            <div key={log.id} className="flex gap-2 items-start">
              <span className="text-muted-foreground flex-shrink-0 w-[70px]">
                {format(log.timestamp, "HH:mm:ss")}
              </span>
              <span className={cn(
                "flex-shrink-0 w-[50px] text-center rounded px-1 py-0.5 uppercase text-[10px] font-semibold",
                levelBadges[log.level]
              )}>
                {log.level}
              </span>
              <span className={cn("flex-1", levelStyles[log.level])}>
                {log.message}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
