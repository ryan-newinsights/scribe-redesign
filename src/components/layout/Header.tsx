import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Settings, Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      <Link
        to="/"
        onClick={() => mobile && setMobileOpen(false)}
        className={`flex items-center gap-2 font-medium transition-colors ${
          isActive("/")
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Home className="h-5 w-5" />
        Home
      </Link>
      <Link
        to="/admin"
        onClick={() => mobile && setMobileOpen(false)}
        className={`flex items-center gap-2 font-medium transition-colors ${
          isActive("/admin")
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Settings className="h-5 w-5" />
        Admin
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <div className="flex flex-col gap-6 pt-6">
              <NavLinks mobile />
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Nav - Left aligned */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLinks />
        </nav>

        {/* User Menu */}
        <div className="flex items-center gap-4 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback className="bg-muted">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium">User</p>
                <p className="text-xs text-muted-foreground">user@example.com</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
