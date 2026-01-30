import { DocumentedFile } from "@/types/fileDocumentation";
import { FunctionCard } from "./FunctionCard";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FileDocumentationViewProps {
  file: DocumentedFile | null;
}

export const FileDocumentationView = ({ file }: FileDocumentationViewProps) => {
  if (!file) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <p>Select a file to view its documentation</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* File Header */}
      <div className="flex items-center justify-between pb-4 border-b mb-4">
        <h2 className="font-mono text-lg font-medium">{file.path}</h2>
        <span className="text-sm text-muted-foreground">
          {file.functions.length} {file.functions.length === 1 ? "function" : "functions"}
        </span>
      </div>

      {/* Functions List */}
      <ScrollArea className="flex-1">
        <div className="space-y-6 pr-4">
          {file.functions.map((func, idx) => (
            <FunctionCard key={idx} func={func} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
