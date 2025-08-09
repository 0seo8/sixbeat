'use client';

import { Menu, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 md:px-6 lg:px-8 py-3 md:py-4 bg-white border-b border-gray-100">
      {/* Left side - Menu button (hidden on desktop) */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onMenuClick}
        className="p-2 h-8 w-8 md:hidden"
      >
        <Menu className="h-4 w-4" />
      </Button>
      
      {/* Center/Left - Title */}
      <div className="flex items-center gap-2 md:ml-0">
        <Music className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">SixBeat</h1>
      </div>
      
      {/* Right side - Balance for layout on mobile, empty on desktop */}
      <div className="w-8 md:hidden" />
    </header>
  );
}