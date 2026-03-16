import { useState } from "react";
import { DiagramViewer } from "./DiagramViewer";
import { DiagramInfoSidebar } from "./DiagramInfoSidebar";
import { diagramTypes, mockDiagrams } from "@/data/mockDiagramData";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const DiagramsTab = () => {
  const [selectedType, setSelectedType] = useState("class");
  const [isLoading, setIsLoading] = useState(false);

  const currentDiagram = mockDiagrams[selectedType] || null;

  const handleTypeChange = (type: string) => {
    setIsLoading(true);
    setSelectedType(type);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleRegenerate = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="flex gap-10">
      {/* Left anchor nav matching Overview/Tech Overview style */}
      <nav className="hidden lg:block w-40 shrink-0 sticky top-0 self-start max-h-[calc(100vh-120px)] overflow-y-auto">
        <div className="pt-2 space-y-0.5">
          {diagramTypes.map(({ id, label, disabled, comingSoon }) => (
            <button
              key={id}
              onClick={() => !disabled && handleTypeChange(id)}
              disabled={disabled}
              className={cn(
                "block w-full text-left text-[13px] py-1 px-2 rounded-sm transition-colors",
                selectedType === id
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground",
                disabled && "opacity-50 cursor-not-allowed hover:text-muted-foreground"
              )}
            >
              {label}
              {comingSoon && (
                <Badge variant="secondary" className="ml-1.5 text-[10px] px-1 py-0">
                  Soon
                </Badge>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 min-w-0 flex flex-col gap-4">
        <DiagramViewer diagram={currentDiagram} isLoading={isLoading} />
        <DiagramInfoSidebar
          diagram={currentDiagram}
          onRegenerate={handleRegenerate}
        />
      </div>
    </div>
  );
};
