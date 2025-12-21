import { Layout } from "@/components/layout/Layout";
import { mockDocumentationJob } from "@/data/mockWorkflowData";
import { WorkflowPhase } from "@/components/progress/WorkflowPhase";
import { JobLogs } from "@/components/progress/JobLogs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, StopCircle, RefreshCw, Clock, Folder } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export default function ProgressPage() {
  const job = mockDocumentationJob;
  
  const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    pending: "secondary",
    running: "default",
    completed: "outline",
    failed: "destructive",
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
              </Link>
            </div>
            <h1 className="text-2xl font-bold">{job.projectName}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Folder className="h-4 w-4" />
                {job.repoPath}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Started {format(job.startedAt, "MMM d, h:mm a")}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {job.status === "running" && (
              <Button variant="outline" size="sm" className="text-status-error border-status-error/30 hover:bg-status-error/10">
                <StopCircle className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            )}
            {job.status === "failed" && (
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-1" />
                Retry
              </Button>
            )}
            <Badge variant={statusVariant[job.status]} className="capitalize">
              {job.status}
            </Badge>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-xs text-muted-foreground ml-2">
                {job.currentPhase} → {job.currentStep}
              </span>
            </div>
            <span className="text-sm font-semibold">{job.progress}%</span>
          </div>
          <Progress value={job.progress} className="h-2" />
          {job.estimatedCompletion && job.status === "running" && (
            <p className="text-xs text-muted-foreground mt-2">
              Estimated completion: {format(job.estimatedCompletion, "h:mm a")}
            </p>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Workflow Phases */}
          <div className="space-y-4">
            <h2 className="font-semibold">Agent Workflow</h2>
            <div className="space-y-3">
              {job.phases.map((phase, index) => (
                <WorkflowPhase
                  key={phase.id}
                  phase={phase}
                  phaseIndex={index}
                  isActive={phase.name === job.currentPhase}
                />
              ))}
            </div>
          </div>

          {/* Logs Panel */}
          <div className="space-y-4">
            <h2 className="font-semibold">Live Output</h2>
            <JobLogs logs={job.logs} />
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border bg-card p-3">
                <p className="text-xs text-muted-foreground">Files Processed</p>
                <p className="text-xl font-bold">234</p>
              </div>
              <div className="rounded-lg border bg-card p-3">
                <p className="text-xs text-muted-foreground">Components Found</p>
                <p className="text-xl font-bold">87</p>
              </div>
              <div className="rounded-lg border bg-card p-3">
                <p className="text-xs text-muted-foreground">API Endpoints</p>
                <p className="text-xl font-bold">42</p>
              </div>
              <div className="rounded-lg border bg-card p-3">
                <p className="text-xs text-muted-foreground">Lines of Code</p>
                <p className="text-xl font-bold">8.7k</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
