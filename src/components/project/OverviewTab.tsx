import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Users,
  Lightbulb,
  Zap,
  Github,
  HardDrive,
  ExternalLink,
  GitBranch,
  GitCommit,
  Download,
  Layers,
} from "lucide-react";
import { mockDocumentFiles } from "@/data/mockDocumentationData";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { DocumentationSummary } from "@/types/documentation";

interface OverviewTabProps {
  summary: DocumentationSummary;
}

type AnchorId = "executive-summary" | "key-features" | "target-audience" | "use-cases" | "analysis";

const anchors: { id: AnchorId; label: string }[] = [
  { id: "executive-summary", label: "Executive Summary" },
  { id: "key-features", label: "Key Features" },
  { id: "target-audience", label: "Target Audience" },
  { id: "use-cases", label: "Use Cases" },
  { id: "analysis", label: "Analysis Summary" },
];

export const OverviewTab = ({ summary }: OverviewTabProps) => {
  const [activeAnchor, setActiveAnchor] = useState<AnchorId>("executive-summary");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveAnchor(entry.target.id as AnchorId);
          }
        }
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0.1 }
    );

    anchors.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex gap-10">
      {/* On-page anchor nav */}
      <nav className="hidden lg:block w-40 shrink-0 sticky top-0 self-start max-h-[calc(100vh-120px)] overflow-y-auto">
        <div className="pt-2 space-y-0.5">
          {anchors.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={cn(
                "block w-full text-left text-[13px] py-1 px-2 rounded-sm transition-colors",
                activeAnchor === id
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-10">
            {/* Executive Summary */}
            <section id="executive-summary">
              <h3 className="text-sm font-semibold mb-2">Executive Summary</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{summary.overview}</p>
            </section>

            {/* Key Features */}
            <section id="key-features">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-4 w-4 text-accent" />
                <h3 className="text-sm font-semibold">Key Features</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {summary.keyFeatures.map((f, i) => (
                  <div key={i} className="flex gap-2.5">
                    <Check className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{f.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{f.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Target Audience */}
            {summary.targetAudience && (
              <section id="target-audience">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-4 w-4 text-accent" />
                  <h3 className="text-sm font-semibold">Target Audience</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {summary.targetAudience.map((a, i) => (
                    <div key={i} className="p-3 rounded-lg bg-muted/50 border border-border">
                      <Badge variant="secondary" className="mb-1.5 text-xs">{a.role}</Badge>
                      <p className="text-xs text-muted-foreground">{a.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Use Cases */}
            {summary.useCases && (
              <section id="use-cases">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-4 w-4 text-accent" />
                  <h3 className="text-sm font-semibold">Use Cases</h3>
                </div>
                <div className="space-y-3">
                  {summary.useCases.map((uc, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/10 text-accent text-xs font-semibold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium">{uc.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{uc.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Analysis Summary */}
            <section id="analysis" className="space-y-3">
              <h3 className="text-sm font-semibold">Analysis Summary</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg p-3 bg-info-bg border border-info/20">
                  <p className="text-lg font-bold text-info">{summary.agentStats.readerAgent.filesAnalyzed}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Files</p>
                </div>
                <div className="rounded-lg p-3 bg-muted border border-border">
                  <p className="text-lg font-bold">{summary.functionsDocumented.done}/{summary.functionsDocumented.total}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Functions</p>
                </div>
                <div className="rounded-lg p-3 bg-success-bg border border-success/20">
                  <p className="text-lg font-bold text-success">{summary.agentStats.readerAgent.linesOfCode.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Lines of Code</p>
                </div>
                <div className="rounded-lg p-3 bg-warning-bg border border-warning/20">
                  <p className="text-lg font-bold text-warning">{format(summary.lastGenerated, "dd MMM yy")}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Last Generated</p>
                </div>
              </div>
            </section>

            {/* Repository */}
            {summary.repoDetails && (
              <section className="space-y-2 pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                  {summary.repoDetails.type === "github" ? (
                    <Github className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <HardDrive className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="text-sm font-semibold">Repository</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Path</span>
                    {summary.repoDetails.url ? (
                      <a href={summary.repoDetails.url} target="_blank" rel="noopener noreferrer" className="text-accent font-medium flex items-center gap-1 hover:underline">
                        {summary.repoDetails.path}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <span className="font-mono">{summary.repoDetails.path}</span>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Branch</span>
                    <span className="flex items-center gap-1">
                      <GitBranch className="h-3 w-3" />
                      {summary.repoDetails.branch}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Commit</span>
                    <span className="flex items-center gap-1 font-mono">
                      <GitCommit className="h-3 w-3" />
                      {summary.repoDetails.lastCommit.hash}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Commit Date</span>
                    <span>{format(summary.repoDetails.lastCommit.date, "dd MMM yyyy")}</span>
                  </div>
                </div>
              </section>
            )}

            {/* Component Inventory */}
            {summary.repoDetails?.languages && (
              <section className="space-y-2 pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-semibold">Component Inventory</span>
                </div>
                <div className="rounded-lg border border-border overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left py-1.5 px-2.5 font-medium text-muted-foreground">Language</th>
                        <th className="text-right py-1.5 px-2.5 font-medium text-muted-foreground">Classes</th>
                        <th className="text-right py-1.5 px-2.5 font-medium text-muted-foreground">Functions</th>
                        <th className="text-right py-1.5 px-2.5 font-medium text-muted-foreground">Methods</th>
                      </tr>
                    </thead>
                    <tbody>
                      {summary.repoDetails.languages.map((lang, i) => (
                        <tr key={i} className="border-t border-border">
                          <td className="py-1.5 px-2.5">
                            {lang.name}
                          </td>
                          <td className="text-right py-1.5 px-2.5 text-muted-foreground">{lang.classes ?? 0}</td>
                          <td className="text-right py-1.5 px-2.5 text-muted-foreground">{lang.functions ?? 0}</td>
                          <td className="text-right py-1.5 px-2.5 text-muted-foreground">{lang.methods ?? 0}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Download Files */}
            <section className="space-y-2 pt-3 border-t border-border">
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold">Download Files</span>
              </div>
              <div className="space-y-2">
                {mockDocumentFiles.map((doc) => (
                  <button
                    key={doc.id}
                    className="w-full flex items-center gap-3 rounded-lg border border-border p-2.5 text-left hover:bg-muted/50 transition-colors"
                  >
                    <Download className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-medium truncate">{doc.name}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{doc.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
