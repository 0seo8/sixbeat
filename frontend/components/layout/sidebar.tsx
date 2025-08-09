'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Home, BarChart3, Vote, Play, BookOpen, Music, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navigation = [
  { name: '홈', href: '/', icon: Home },
  { name: '차트', href: '/charts', icon: BarChart3 },
  { name: '투표', href: '/votes', icon: Vote },
  { name: '스트리밍', href: '/streaming', icon: Play },
  { name: '가이드', href: '/guide', icon: BookOpen },
];

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  // Close sidebar when clicking outside
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 z-50 bg-black/50"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Music className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-lg">SixBeat</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2 h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Profile Section */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">DAY6 팬</p>
              <p className="text-sm text-gray-500">My Day</p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                  isActive 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-xs text-gray-500 text-center">
            © 2025 SixBeat
          </p>
          <p className="text-xs text-gray-500 text-center">
            DAY6 팬덤을 위한 비영리 프로젝트
          </p>
        </div>
      </div>
    </>
  );
}