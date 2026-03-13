import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  Search,
  FolderGit2,
  Settings,
  LogOut,
  Shield,
  ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { mockProjects } from "@/data/mockData";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();
  const [projectSearch, setProjectSearch] = useState("");

  const filteredProjects = mockProjects.filter((p) =>
    p.name.toLowerCase().includes(projectSearch.toLowerCase())
  );

  const isProjectActive = (projectId: string) =>
    location.pathname.includes(`/docs/${projectId}`) ||
    location.pathname.includes(`/progress/${projectId}`);

  return (
    <Sidebar collapsible="icon" className={cn("border-r", collapsed ? "border-transparent bg-background" : "border-sidebar-border")}>
      <SidebarHeader className={cn("h-12 flex items-center justify-center px-4 shrink-0", !collapsed && "border-b border-border")}>
        <Link to="/" className="flex items-center justify-center">
          {!collapsed ? (
            <span className="font-heading font-light text-base text-sidebar-foreground tracking-tight">
              newinsights<span className="text-accent">.ai</span>
            </span>
          ) : (
            <span className="font-heading font-light text-base text-foreground tracking-tight">
              n<span className="text-accent">.</span>
            </span>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className={cn("px-2", collapsed && "hidden")}>
        {/* Projects section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] uppercase tracking-wider text-sidebar-foreground/50 font-semibold px-2">
            Projects
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-1 mb-1">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="h-7 pl-7 text-xs bg-sidebar-accent border-none focus-visible:ring-1 focus-visible:ring-sidebar-ring"
                />
              </div>
            </div>
            <SidebarMenu>
              {filteredProjects.map((project) => (
                <SidebarMenuItem key={project.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={isProjectActive(project.id)}
                  >
                    <button
                      onClick={() => {
                        if (project.latestJob?.status === "completed") {
                          navigate(`/docs/${project.id}`);
                        } else if (project.latestJob?.status === "running") {
                          navigate(`/progress/${project.id}`);
                        } else {
                          navigate(`/docs/${project.id}`);
                        }
                      }}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm w-full text-left transition-colors",
                        isProjectActive(project.id)
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "text-sidebar-foreground hover:bg-sidebar-accent"
                      )}
                    >
                      <FolderGit2 className="h-4 w-4 shrink-0" />
                      <span className="truncate">{project.name}</span>
                      {project.latestJob?.status === "completed" && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-status-completed shrink-0" />
                      )}
                      {project.latestJob?.status === "running" && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-status-running animate-pulse shrink-0" />
                      )}
                      {project.latestJob?.status === "failed" && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-status-failed shrink-0" />
                      )}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User footer - only shown when expanded */}
      <SidebarFooter className={cn("p-2 mt-auto", !collapsed && "border-t border-sidebar-border")}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {collapsed ? (
              <button className="flex items-center justify-center w-full rounded-md py-1.5 hover:bg-sidebar-accent transition-colors">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground text-xs">
                    RG
                  </AvatarFallback>
                </Avatar>
              </button>
            ) : (
              <button className="flex items-center gap-2 w-full rounded-md px-2 py-1.5 hover:bg-sidebar-accent transition-colors">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground text-xs">
                    RG
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left min-w-0">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">ryan-newinsights</p>
                  <p className="text-xs text-muted-foreground truncate">ryan@newinsights.ai</p>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              </button>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start" className="w-56">
            <div className="flex flex-col space-y-1 p-2">
              <p className="text-sm font-medium">ryan-newinsights</p>
              <p className="text-xs text-muted-foreground">ryan@newinsights.ai</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/admin" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Admin Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/platform-admin" className="flex items-center">
                <Shield className="mr-2 h-4 w-4" />
                Platform Admin Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
