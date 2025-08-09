"use client";

import { Button } from "@/components/ui/button";
import {
  BarChart3,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchChartData } from "@/lib/api";
import { ChartSong } from "@/lib/types";
import {
  getPlatformName,
  getRankChangeIcon,
  getRankChangeColor,
} from "@/lib/utils";
import Link from "next/link";

export function CompactChart() {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ["chartData"],
    queryFn: fetchChartData,
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-gray-900">실시간 차트</h2>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse h-20 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  // Get top songs from each platform
  const platforms = ["melon", "genie", "bugs", "vibe", "flo"];
  const platformData: { platform: string; song: ChartSong | null }[] = [];

  platforms.forEach((platform) => {
    const songs = (chartData as any)?.[platform] || [];
    const topSong = songs.find(
      (song: ChartSong) => song.rank && song.rank <= 100
    ) || null;
    platformData.push({ platform, song: topSong });
  });

  const getPlatformIcon = (platform: string) => {
    const icons: Record<string, string> = {
      melon: "🎵",
      genie: "🎶",
      bugs: "🐛",
      vibe: "📻",
      flo: "🌊",
    };
    return icons[platform] || "🎵";
  };

  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
      melon: "bg-green-500",
      genie: "bg-blue-500",
      bugs: "bg-orange-500",
      vibe: "bg-purple-500",
      flo: "bg-pink-500",
    };
    return colors[platform] || "bg-gray-500";
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">실시간 차트</h2>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/charts">
            <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {platformData.slice(0, 6).map(({ platform, song }) => (
          <div
            key={platform}
            className="bg-white rounded-lg border border-gray-200 p-3 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">{getPlatformIcon(platform)}</span>
                <span className="text-sm font-medium text-gray-700">
                  {getPlatformName(platform)}
                </span>
              </div>
              {song?.delta !== undefined && (
                <div className={`text-xs font-medium ${getRankChangeColor(song.delta)}`}>
                  {getRankChangeIcon(song.delta)}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full ${getPlatformColor(
                  platform
                )} flex items-center justify-center text-sm text-white font-bold`}
              >
                {song?.rank || '-'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate text-gray-900">
                  {song?.title || 'No Data'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {song?.artist || ''}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" size="sm" className="w-full" asChild>
        <Link href="/charts">전체 차트 보기</Link>
      </Button>
    </div>
  );
}
