"use client";

import { Menu } from "lucide-react";

interface OverlayHeaderProps {
  onMenuClick?: () => void;
  title?: string;
}

export function OverlayHeader({ onMenuClick, title = "DAY6 STRM" }: OverlayHeaderProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3 bg-black/20 backdrop-blur-sm">
      {/* Menu Button */}
      <button
        onClick={onMenuClick}
        className="p-2 rounded-lg bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors"
      >
        <Menu className="w-5 h-5 text-white" />
      </button>

      {/* Title */}
      <h1 className="text-lg md:text-xl font-bold text-white drop-shadow-lg">
        {title}
      </h1>

      {/* Balance */}
      <div className="w-9"></div>
    </div>
  );
}