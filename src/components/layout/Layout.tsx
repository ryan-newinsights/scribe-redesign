import { ReactNode } from "react";
import { AppLayout } from "./AppLayout";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}
