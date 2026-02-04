import { useState } from "react";
import { DiagramTypeSelector } from "./DiagramTypeSelector";
import { DiagramViewer } from "./DiagramViewer";
import { DiagramInfoSidebar } from "./DiagramInfoSidebar";
import { diagramTypes, mockDiagrams } from "@/data/mockDiagramData";

export const DiagramsTab = () => {
  const [selectedType, setSelectedType] = useState("class");
  const [isLoading, setIsLoading] = useState(false);

  const currentDiagram = mockDiagrams[selectedType] || null;

  const handleTypeChange = (type: string) => {
    setIsLoading(true);
    setSelectedType(type);
    // Simulate loading delay
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleRegenerate = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="space-y-4">
      {/* Diagram Type Selector */}
      <DiagramTypeSelector
        types={diagramTypes}
        selected={selectedType}
        onSelect={handleTypeChange}
      />

      {/* Main Content */}
      <div className="flex gap-4">
        {/* Diagram Viewer */}
        <DiagramViewer diagram={currentDiagram} isLoading={isLoading} />

        {/* Info Sidebar */}
        <DiagramInfoSidebar
          diagram={currentDiagram}
          onRegenerate={handleRegenerate}
        />
      </div>
    </div>
  );
};
