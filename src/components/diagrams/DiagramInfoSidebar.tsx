import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCw, Info, Layers, Clock } from "lucide-react";
import { DiagramData } from "@/data/mockDiagramData";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface DiagramInfoSidebarProps {
  diagram: DiagramData | null;
  onRegenerate?: () => void;
}

export const DiagramInfoSidebar = ({ diagram, onRegenerate }: DiagramInfoSidebarProps) => {
  const { toast } = useToast();

  const handleRegenerate = () => {
    toast({
      title: "Regenerating Diagram",
      description: "Analyzing codebase to regenerate diagram...",
    });
    onRegenerate?.();
  };

  if (!diagram) return null;

  return (
    <Card>
      <CardContent className="flex items-center justify-between gap-6 py-4 px-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Info className="h-4 w-4 shrink-0" />
          <span className="leading-relaxed">{diagram.description}</span>
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <div className="flex items-center gap-2 text-sm">
            <Layers className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Components:</span>
            <span className="font-medium">{diagram.componentsCount}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Generated:</span>
            <span className="font-medium">{format(diagram.lastGenerated, "MMM d, yyyy")}</span>
          </div>

          <Button variant="outline" size="sm" onClick={handleRegenerate}>
            <RotateCw className="h-4 w-4 mr-2" />
            Regenerate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
