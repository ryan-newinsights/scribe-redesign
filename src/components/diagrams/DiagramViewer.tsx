import { useEffect, useRef, useState, useCallback } from "react";
import mermaid from "mermaid";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Move,
  Copy,
  Download,
  ExternalLink,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DiagramData } from "@/data/mockDiagramData";

interface DiagramViewerProps {
  diagram: DiagramData | null;
  isLoading?: boolean;
}

export const DiagramViewer = ({ diagram, isLoading }: DiagramViewerProps) => {
  const { toast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [svgContent, setSvgContent] = useState<string>("");

  // Initialize and render mermaid diagram
  useEffect(() => {
    if (!diagram) return;

    const renderDiagram = async () => {
      mermaid.initialize({
        startOnLoad: false,
        theme: isDarkTheme ? "dark" : "default",
        securityLevel: "loose",
      });

      try {
        const { svg } = await mermaid.render(
          `mermaid-${diagram.id}-${Date.now()}`,
          diagram.mermaidCode
        );
        setSvgContent(svg);
      } catch (error) {
        console.error("Mermaid rendering error:", error);
      }
    };

    renderDiagram();
  }, [diagram, isDarkTheme]);

  // Reset position and zoom when diagram changes
  useEffect(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, [diagram?.id]);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.25));
  const handleFit = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      containerRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  // Pan handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  }, [position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Scroll to zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((z) => Math.max(0.25, Math.min(3, z + delta)));
  }, []);

  // Export handlers
  const handleCopyMermaid = async () => {
    if (!diagram) return;
    await navigator.clipboard.writeText(diagram.mermaidCode);
    toast({
      title: "Copied!",
      description: "Mermaid code copied to clipboard",
    });
  };

  const handleDownloadPNG = async () => {
    if (!svgContent) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width * 2;
      canvas.height = img.height * 2;
      ctx?.scale(2, 2);
      ctx?.drawImage(img, 0, 0);

      const link = document.createElement("a");
      link.download = `${diagram?.id}-diagram.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      toast({
        title: "Downloaded",
        description: "PNG file downloaded successfully",
      });
    };

    img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgContent)))}`;
  };

  const handleDownloadSVG = () => {
    if (!svgContent) return;

    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const link = document.createElement("a");
    link.download = `${diagram?.id}-diagram.svg`;
    link.href = URL.createObjectURL(blob);
    link.click();

    toast({
      title: "Downloaded",
      description: "SVG file downloaded successfully",
    });
  };

  const handleOpenInMermaidLive = () => {
    if (!diagram) return;
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify({
      code: diagram.mermaidCode,
      mermaid: { theme: isDarkTheme ? "dark" : "default" },
    }))));
    window.open(`https://mermaid.live/edit#pako:${encoded}`, "_blank");
  };

  if (isLoading) {
    return (
      <Card className="flex-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-center min-h-[600px]">
            <div className="text-center space-y-4">
              <Skeleton className="h-8 w-48 mx-auto" />
              <Skeleton className="h-[400px] w-[600px]" />
              <p className="text-muted-foreground">Generating diagram...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!diagram) {
    return (
      <Card className="flex-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-center min-h-[600px]">
            <p className="text-muted-foreground">
              No components found to generate this diagram type
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex-1 flex flex-col" ref={containerRef}>
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h3 className="font-semibold">
            {diagram.title} — <span className="text-muted-foreground">{diagram.subtitle}</span>
          </h3>
        </div>
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <div className="flex items-center gap-2">
            <Label htmlFor="theme-toggle" className="text-sm">Light</Label>
            <Switch
              id="theme-toggle"
              checked={isDarkTheme}
              onCheckedChange={setIsDarkTheme}
            />
            <Label htmlFor="theme-toggle" className="text-sm">Dark</Label>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1 border rounded-md">
            <Button variant="ghost" size="icon" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm w-12 text-center">{Math.round(zoom * 100)}%</span>
            <Button variant="ghost" size="icon" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleFit}>
              Fit
            </Button>
          </div>

          {/* Fullscreen */}
          <Button variant="ghost" size="icon" onClick={handleFullscreen}>
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Diagram Area */}
      <CardContent
        className={`flex-1 p-0 overflow-hidden cursor-grab ${isDragging ? "cursor-grabbing" : ""}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <div
          className="min-h-[600px] h-full w-full flex items-center justify-center bg-background border-y"
          style={{ backgroundColor: isDarkTheme ? "#1a1a2e" : "#ffffff" }}
        >
          <div
            ref={diagramRef}
            className="transition-transform duration-100"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            }}
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        </div>
      </CardContent>

      {/* Pan hint */}
      <div className="flex items-center justify-center gap-2 py-2 text-xs text-muted-foreground border-t bg-muted/30">
        <Move className="h-3 w-3" />
        <span>Drag to pan • Scroll to zoom</span>
      </div>

      {/* Export Bar */}
      <div className="flex items-center gap-2 p-4 border-t">
        <Button variant="outline" size="sm" onClick={handleCopyMermaid}>
          <Copy className="h-4 w-4 mr-2" />
          Copy Mermaid
        </Button>
        <Button variant="outline" size="sm" onClick={handleDownloadPNG}>
          <Download className="h-4 w-4 mr-2" />
          Download PNG
        </Button>
        <Button variant="outline" size="sm" onClick={handleDownloadSVG}>
          <Download className="h-4 w-4 mr-2" />
          Download SVG
        </Button>
        <Button variant="outline" size="sm" onClick={handleOpenInMermaidLive}>
          <ExternalLink className="h-4 w-4 mr-2" />
          Open in Mermaid Live
        </Button>
      </div>
    </Card>
  );
};
