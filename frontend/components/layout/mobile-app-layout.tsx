"use client";

import { useState } from "react";
import { StatusBar } from "./status-bar";
import { MobileHeader } from "./mobile-header";
import { DesktopHeader } from "./desktop-header";
import { Sidebar } from "./sidebar";
import { MobileNav } from "../mobile-nav";

interface MobileAppLayoutProps {
  children: React.ReactNode;
}

export function MobileAppLayout({ children }: MobileAppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile Layout (sm and below) */}
      <div className="md:hidden min-h-screen bg-gray-50 flex justify-center">
        <div className="w-full max-w-[375px] bg-white shadow-2xl min-h-screen relative">
          <MobileHeader onMenuClick={() => setSidebarOpen(true)} />

          <main className="px-4 py-4 pb-20 overflow-y-auto">{children}</main>

          <MobileNav />
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* Desktop Layout (md and above) */}
      <div className="hidden md:block min-h-screen bg-gray-50">
        <div className="w-full bg-white min-h-screen">
          <DesktopHeader />

          <main className="px-6 lg:px-8 xl:px-12 py-6 overflow-y-auto">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
