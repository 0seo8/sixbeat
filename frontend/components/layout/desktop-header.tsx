'use client';

import { Music } from 'lucide-react';

export function DesktopHeader() {
  return (
    <header className="flex items-center justify-between px-6 lg:px-8 xl:px-12 py-4 bg-white border-b border-gray-100">
      {/* Left - Title */}
      <div className="flex items-center gap-3">
        <Music className="h-6 w-6 lg:h-7 lg:w-7 text-blue-600" />
        <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900">DAY6 STRM</h1>
        <span className="text-sm lg:text-base text-gray-500 ml-2">DAY6 팬덤 지원 센터</span>
      </div>
      
      {/* Right side - could add navigation or user menu later */}
      <div className="flex items-center gap-4">
        {/* Future: Add navigation links, user profile, etc */}
      </div>
    </header>
  );
}