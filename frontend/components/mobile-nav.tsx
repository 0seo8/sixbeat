'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart3, Vote, Play, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: '홈', href: '/', icon: Home },
  { name: '차트', href: '/charts', icon: BarChart3 },
  { name: '투표', href: '/votes', icon: Vote },
  { name: '스트리밍', href: '/streaming', icon: Play },
  { name: '가이드', href: '/guide', icon: BookOpen },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
      <div className="grid grid-cols-5 h-16">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors',
                isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <item.icon className={cn('h-5 w-5', isActive && 'text-primary')} />
              <span className={cn(isActive && 'text-primary font-semibold')}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}