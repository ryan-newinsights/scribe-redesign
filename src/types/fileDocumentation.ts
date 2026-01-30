export interface FunctionParameter {
  name: string;
  type: string;
  description: string;
}

export interface FunctionReturn {
  type: string;
  description: string;
}

export interface FunctionDocumentation {
  name: string;
  description: string;
  parameters: FunctionParameter[];
  returns: FunctionReturn;
  examples?: string[];
}

export interface DocumentedFile {
  id: string;
  name: string;
  path: string;
  functions: FunctionDocumentation[];
}

export interface FileTreeFolder {
  name: string;
  path: string;
  files: DocumentedFile[];
  subfolders: FileTreeFolder[];
}

export interface FileTree {
  projectId: string;
  folders: FileTreeFolder[];
  rootFiles: DocumentedFile[];
}
