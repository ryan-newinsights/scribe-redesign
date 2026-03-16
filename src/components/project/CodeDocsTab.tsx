import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Code2,
  CheckCircle2,
  ChevronRight,
  Folder,
  FileCode,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockFileTrees, getAllFiles } from "@/data/mockFileDocumentation";
import { DocumentedFile } from "@/types/fileDocumentation";

interface CodeDocsTabProps {
  projectId: string;
}

interface FileGroup {
  id: string;
  path: string;
  functions: {
    name: string;
    type: string;
    description: string;
    parameters?: { name: string; type: string; description: string }[];
    examples?: string[];
    returns: { type: string; description: string };
  }[];
}

export const CodeDocsTab = ({ projectId }: CodeDocsTabProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Build file groups from existing mock data
  const fileGroups: FileGroup[] = useMemo(() => {
    const fileTree = mockFileTrees[projectId];
    if (!fileTree) return [];
    const allFiles = getAllFiles(fileTree);
    return allFiles.map((file) => ({
      id: file.id,
      path: file.path,
      functions: file.functions.map((fn) => ({
        name: fn.name,
        type: "function",
        description: fn.description,
        parameters: fn.parameters,
        examples: fn.examples,
        returns: fn.returns,
      })),
    }));
  }, [projectId]);

  const [activeAnchor, setActiveAnchor] = useState<string>(fileGroups[0]?.id ?? "");

  const filteredGroups = useMemo(() => {
    if (!searchQuery) return fileGroups;
    const q = searchQuery.toLowerCase();
    return fileGroups
      .map((g) => ({
        ...g,
        functions: g.functions.filter(
          (fn) =>
            fn.name.toLowerCase().includes(q) ||
            fn.description.toLowerCase().includes(q)
        ),
      }))
      .filter((g) => g.functions.length > 0 || g.path.toLowerCase().includes(q));
  }, [searchQuery, fileGroups]);

  // Build folder tree
  interface TreeNode {
    name: string;
    children: Map<string, TreeNode>;
    fileId?: string;
  }

  const folderTree = useMemo(() => {
    const root: TreeNode = { name: "", children: new Map() };
    for (const group of filteredGroups) {
      const parts = group.path.split("/");
      let node = root;
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (!node.children.has(part)) {
          node.children.set(part, { name: part, children: new Map() });
        }
        node = node.children.get(part)!;
        if (i === parts.length - 1) {
          node.fileId = group.id;
        }
      }
    }
    const collapse = (node: TreeNode): TreeNode => {
      if (node.children.size === 1 && !node.fileId) {
        const [, child] = [...node.children.entries()][0];
        const merged = collapse(child);
        return {
          name: node.name ? `${node.name}/${merged.name}` : merged.name,
          children: merged.children,
          fileId: merged.fileId,
        };
      }
      const collapsed = new Map<string, TreeNode>();
      for (const [key, child] of node.children) {
        collapsed.set(key, collapse(child));
      }
      return { ...node, children: collapsed };
    };
    return collapse(root);
  }, [filteredGroups]);

  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set([""]));

  useEffect(() => {
    const allPaths = new Set<string>([""]);
    const walk = (node: TreeNode, path: string) => {
      for (const [, child] of node.children) {
        const childPath = path ? `${path}/${child.name}` : child.name;
        allPaths.add(childPath);
        walk(child, childPath);
      }
    };
    walk(folderTree, "");
    setExpandedFolders(allPaths);
  }, [folderTree]);

  const toggleFolder = (path: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const renderTreeNode = (node: TreeNode, path: string, depth: number): React.ReactNode => {
    const entries = [...node.children.entries()];
    entries.sort(([, a], [, b]) => {
      const aIsFile = !!a.fileId && a.children.size === 0;
      const bIsFile = !!b.fileId && b.children.size === 0;
      if (aIsFile !== bIsFile) return aIsFile ? 1 : -1;
      return a.name.localeCompare(b.name);
    });

    return entries.map(([key, child]) => {
      const childPath = path ? `${path}/${child.name}` : child.name;
      const isFile = !!child.fileId && child.children.size === 0;
      const isExpanded = expandedFolders.has(childPath);

      if (isFile) {
        return (
          <button
            key={childPath}
            onClick={() => scrollTo(child.fileId!)}
            className={cn(
              "flex items-center gap-1.5 w-full text-left text-[12px] py-0.5 rounded-sm transition-colors truncate",
              activeAnchor === child.fileId
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
            style={{ paddingLeft: `${depth * 12 + 4}px` }}
          >
            <FileCode className="h-3 w-3 shrink-0 text-accent" />
            <span className="truncate">{child.name}</span>
          </button>
        );
      }

      return (
        <div key={childPath}>
          <button
            onClick={() => toggleFolder(childPath)}
            className="flex items-center gap-1 w-full text-left text-[12px] py-0.5 text-muted-foreground hover:text-foreground transition-colors truncate"
            style={{ paddingLeft: `${depth * 12 + 4}px` }}
          >
            <ChevronRight
              className={cn(
                "h-3 w-3 shrink-0 transition-transform",
                isExpanded && "rotate-90"
              )}
            />
            <Folder className="h-3 w-3 shrink-0" />
            <span className="truncate">{child.name}</span>
          </button>
          {isExpanded && renderTreeNode(child, childPath, depth + 1)}
        </div>
      );
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveAnchor(entry.target.id);
          }
        }
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0.1 }
    );

    filteredGroups.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [filteredGroups]);

  const totalFunctions = fileGroups.reduce((sum, g) => sum + g.functions.length, 0);

  return (
    <div className="space-y-4">
      <div className="flex gap-10">
        {/* Hierarchical folder tree nav */}
        <nav className="hidden lg:block w-56 shrink-0 sticky top-0 self-start max-h-[calc(100vh-120px)] overflow-y-auto">
          <div className="pt-2">
            <div className="mb-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search Code Docs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-7 pl-7 text-xs bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
            </div>
            <div className="space-y-0.5">
              {renderTreeNode(folderTree, "", 0)}
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-10">
          {/* Stats bar */}
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">
              {totalFunctions} functions across {fileGroups.length} files
            </span>
          </div>
          {filteredGroups.map((group) => (
            <section key={group.id} id={group.id}>
              <div className="mb-4">
                <code className="text-sm font-mono text-accent">{group.path}</code>
                <span className="text-xs text-muted-foreground ml-2">
                  {group.functions.length} functions
                </span>
              </div>

              <div className="space-y-5">
                {group.functions.map((fn, i) => (
                  <div key={i} className="pb-5 border-b border-border last:border-b-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Code2 className="h-4 w-4 text-accent shrink-0" />
                        <span className="font-mono font-semibold text-sm">{fn.name}</span>
                        <Badge variant="secondary" className="text-xs">{fn.type}</Badge>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{fn.description}</p>
                    {fn.examples && fn.examples.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs font-semibold mb-1">Examples:</p>
                        {fn.examples.map((ex, ei) => (
                          <pre key={ei} className="text-xs bg-foreground/5 dark:bg-foreground/10 rounded-lg p-4 font-mono overflow-x-auto">
                            {ex}
                          </pre>
                        ))}
                      </div>
                    )}
                    {fn.parameters && fn.parameters.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold mb-1.5">Parameters:</p>
                        <div className="space-y-1.5">
                          {fn.parameters.map((param, pi) => (
                            <div key={pi} className="bg-muted/50 rounded-md px-3 py-2">
                              <span className="text-xs font-mono text-accent font-medium">{param.name}</span>
                              <span className="text-xs text-muted-foreground ml-1">({param.type})</span>
                              <p className="text-xs text-muted-foreground mt-0.5">{param.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {fn.returns && (
                      <div className="mt-3">
                        <p className="text-xs font-semibold mb-1">Returns:</p>
                        <div className="bg-muted/50 rounded-md px-3 py-2">
                          <span className="text-xs font-mono text-accent font-medium">{fn.returns.type}</span>
                          <p className="text-xs text-muted-foreground mt-0.5">{fn.returns.description}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}

          {filteredGroups.length === 0 && (
            <p className="text-sm text-muted-foreground">No results matching "{searchQuery}"</p>
          )}
        </div>
      </div>
    </div>
  );
};
