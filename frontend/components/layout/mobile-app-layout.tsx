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
    <div className="min-h-screen bg-gray-50">
      {/* Mobile container - responsive layout */}
      <div className="w-full max-w-[375px] md:max-w-none bg-white min-h-screen relative md:shadow-none shadow-2xl mx-auto md:mx-0">
        <StatusBar />
        <MobileHeader onMenuClick={() => setSidebarOpen(true)} />
        
        {/* Main content area */}
        <main className="px-4 md:px-6 lg:px-8 py-4 pb-20 md:pb-4 overflow-y-auto max-w-7xl mx-auto">
          {children}
        </main>
        
        {/* Bottom navigation - only on mobile */}
        <div className="md:hidden">
          <MobileNav />
        </div>
        
        {/* Sidebar overlay and sidebar */}
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
    </div>
  );
}