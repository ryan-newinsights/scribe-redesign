import { ReactNode } from "react";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6 md:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
