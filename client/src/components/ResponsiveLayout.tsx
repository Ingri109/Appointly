"use client";
import { ReactNode } from "react";

interface ResponsiveLayoutProps {
  children: ReactNode;
}

// responsive wrapper
export function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  return <div className="min-h-screen bg-custom1">{children}</div>;
}
