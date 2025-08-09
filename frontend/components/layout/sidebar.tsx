"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Home, BarChart3, Vote, Play, BookOpen, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SocialLinks } from "@/components/social-links";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navigation = [
  { name: "홈", href: "/", icon: Home },
  { name: "차트", href: "/charts", icon: BarChart3 },
  { name: "투표", href: "/votes", icon: Vote },
  { name: "스트리밍", href: "/streaming", icon: Play },
  { name: "가이드", href: "/guide", icon: BookOpen },
];

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  // Close sidebar when clicking outside
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 40,
            }}
            className="fixed left-0 top-0 bottom-0 z-50 w-64 bg-white shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Music className="h-6 w-6 text-blue-600" />
                <span className="font-bold text-lg">DAY6 STRM</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 h-8 w-8 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
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
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Social Links */}
            <div className="absolute bottom-4 left-4 right-4 border-t border-gray-100 pt-4">
              <p className="text-xs font-medium text-gray-500 mb-3">
                DAY6 공식 SNS
              </p>
              <SocialLinks />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
