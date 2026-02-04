import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight, ChevronLeft, RotateCw, Info, Layers, Clock } from "lucide-react";
import { DiagramData } from "@/data/mockDiagramData";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface DiagramInfoSidebarProps {
  diagram: DiagramData | null;
  onRegenerate?: () => void;
}

export const DiagramInfoSidebar = ({ diagram, onRegenerate }: DiagramInfoSidebarProps) => {
  const [isOpen, setIsOpen] = useState(true);
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
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="relative">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute -left-4 top-4 z-10 h-8 w-8 rounded-full border bg-background shadow-sm"
          >
            {isOpen ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <Card className="w-64">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Diagram Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* About Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  About this diagram
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {diagram.description}
                </p>
              </div>

              {/* Stats */}
              <div className="space-y-3 pt-2 border-t">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Layers className="h-4 w-4" />
                    Components included
                  </div>
                  <span className="font-medium">{diagram.componentsCount}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Last generated
                  </div>
                  <span className="font-medium">
                    {format(diagram.lastGenerated, "MMM d, yyyy")}
                  </span>
                </div>
              </div>

              {/* Regenerate Button */}
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4"
                onClick={handleRegenerate}
              >
                <RotateCw className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};
