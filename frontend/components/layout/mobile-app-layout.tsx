'use client';

import { useState } from 'react';
import { StatusBar } from './status-bar';
import { MobileHeader } from './mobile-header';
import { Sidebar } from './sidebar';
import { MobileNav } from '../mobile-nav';

interface MobileAppLayoutProps {
  children: React.ReactNode;
}

export function MobileAppLayout({ children }: MobileAppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      {/* Mobile container with max-width and shadow - responsive for larger screens */}
      <div className="w-full max-w-[375px] lg:max-w-md xl:max-w-lg bg-white shadow-2xl min-h-screen relative">
        <StatusBar />
        <MobileHeader onMenuClick={() => setSidebarOpen(true)} />
        
        {/* Main content area */}
        <main className="px-4 py-4 pb-20 overflow-y-auto">
          {children}
        </main>
        
        {/* Bottom navigation */}
        <MobileNav />
        
        {/* Sidebar overlay and sidebar */}
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
    </div>
  );
}