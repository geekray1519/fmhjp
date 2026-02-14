"use client";

import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";
import { MobileNav } from "./MobileNav";
import { KeyboardShortcuts } from "./KeyboardShortcuts";
import { NavigationProgress } from "./NavigationProgress";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationProgress />
      <Header
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        menuOpen={sidebarOpen}
      />
      <div className="flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main id="main-content" className="flex-1 min-w-0 pb-16 sm:pb-0 animate-page-enter">
          {children}
          <Footer />
        </main>
      </div>
      <ScrollToTop />
      <MobileNav />
      <KeyboardShortcuts />
    </div>
  );
}
