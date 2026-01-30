import { useState } from "react";
import { ChevronDown, ChevronRight, File, Folder } from "lucide-react";
import { cn } from "@/lib/utils";
import { FileTree, FileTreeFolder, DocumentedFile } from "@/types/fileDocumentation";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FileTreeSidebarProps {
  fileTree: FileTree;
  selectedFileId: string | null;
  onSelectFile: (file: DocumentedFile) => void;
}

interface FolderItemProps {
  folder: FileTreeFolder;
  selectedFileId: string | null;
  onSelectFile: (file: DocumentedFile) => void;
  level?: number;
}

const FolderItem = ({ folder, selectedFileId, onSelectFile, level = 0 }: FolderItemProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "flex items-center gap-1.5 w-full px-2 py-1.5 text-sm hover:bg-muted/50 rounded-md transition-colors",
          "text-muted-foreground hover:text-foreground"
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
      >
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 shrink-0" />
        ) : (
          <ChevronRight className="h-4 w-4 shrink-0" />
        )}
        <Folder className="h-4 w-4 shrink-0 text-muted-foreground" />
        <span className="truncate">{folder.name}</span>
      </button>

      {isExpanded && (
        <div>
          {folder.subfolders.map((subfolder) => (
            <FolderItem
              key={subfolder.path}
              folder={subfolder}
              selectedFileId={selectedFileId}
              onSelectFile={onSelectFile}
              level={level + 1}
            />
          ))}
          {folder.files.map((file) => (
            <FileItem
              key={file.id}
              file={file}
              isSelected={selectedFileId === file.id}
              onSelect={() => onSelectFile(file)}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface FileItemProps {
  file: DocumentedFile;
  isSelected: boolean;
  onSelect: () => void;
  level?: number;
}

const FileItem = ({ file, isSelected, onSelect, level = 0 }: FileItemProps) => {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "flex items-center justify-between w-full px-2 py-1.5 text-sm rounded-md transition-colors",
        isSelected
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
      )}
      style={{ paddingLeft: `${level * 12 + 28}px` }}
    >
      <div className="flex items-center gap-1.5 min-w-0">
        <File className="h-4 w-4 shrink-0" />
        <span className="truncate">{file.name}</span>
      </div>
      <span className="text-xs text-muted-foreground shrink-0 ml-2">
        {file.functions.length}
      </span>
    </button>
  );
};

export const FileTreeSidebar = ({
  fileTree,
  selectedFileId,
  onSelectFile,
}: FileTreeSidebarProps) => {
  return (
    <div className="border rounded-lg bg-card h-full">
      <div className="p-3 border-b">
        <h3 className="font-medium text-sm">Files</h3>
      </div>
      <ScrollArea className="h-[calc(100%-49px)]">
        <div className="p-2">
          {fileTree.folders.map((folder) => (
            <FolderItem
              key={folder.path}
              folder={folder}
              selectedFileId={selectedFileId}
              onSelectFile={onSelectFile}
            />
          ))}
          {fileTree.rootFiles.map((file) => (
            <FileItem
              key={file.id}
              file={file}
              isSelected={selectedFileId === file.id}
              onSelect={() => onSelectFile(file)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
