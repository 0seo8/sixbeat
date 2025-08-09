import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Link from "next/link";
import { Music, BarChart3, Vote, Play, BookOpen, Home } from "lucide-react";
import { MobileNav } from "@/components/mobile-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SixBeat - DAY6 팬덤 지원 센터",
  description: "DAY6 음원 차트 실시간 추적 및 스트리밍/투표 지원 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-14 items-center px-4">
                <Link href="/" className="flex items-center space-x-2">
                  <Music className="h-6 w-6 text-primary" />
                  <span className="font-bold text-xl">SixBeat</span>
                </Link>
                <nav className="ml-auto hidden md:flex items-center space-x-4">
                  <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                    홈
                  </Link>
                  <Link href="/charts" className="text-sm font-medium hover:text-primary transition-colors">
                    차트
                  </Link>
                  <Link href="/votes" className="text-sm font-medium hover:text-primary transition-colors">
                    투표
                  </Link>
                  <Link href="/streaming" className="text-sm font-medium hover:text-primary transition-colors">
                    스트리밍
                  </Link>
                  <Link href="/guide" className="text-sm font-medium hover:text-primary transition-colors">
                    가이드
                  </Link>
                </nav>
              </div>
            </header>
            <main className="container mx-auto px-4 py-4 md:py-6 pb-20 md:pb-6">
              {children}
            </main>
            <MobileNav />
            <footer className="border-t py-6 md:py-0">
              <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                  © 2025 SixBeat. DAY6 팬덤을 위한 비영리 프로젝트
                </p>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
