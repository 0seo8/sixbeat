"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">실시간 차트</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse h-12 bg-muted rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Get top songs from each platform
  const platforms = ["melon", "genie", "bugs", "vibe", "flo"];
  const topSongs: { platform: string; song: ChartSong }[] = [];

  platforms.forEach((platform) => {
    const songs = (chartData as any)?.[platform] || [];
    const topSong = songs.find(
      (song: ChartSong) => song.rank && song.rank <= 100
    );
    if (topSong) {
      topSongs.push({ platform, song: topSong });
    }
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
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            실시간 차트
          </CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/charts">
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {topSongs.length > 0 ? (
          topSongs.map(({ platform, song }, index) => (
            <div
              key={platform}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50"
            >
              <div
                className={`w-6 h-6 rounded-full ${getPlatformColor(
                  platform
                )} flex items-center justify-center text-xs text-white font-bold`}
              >
                {song.rank}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs">{getPlatformIcon(platform)}</span>
                  <span className="text-xs text-muted-foreground truncate">
                    {getPlatformName(platform)}
                  </span>
                </div>
                <p className="font-medium text-sm truncate">{song.title}</p>
              </div>
              <div
                className={`text-xs font-medium ${getRankChangeColor(
                  song.delta
                )}`}
              >
                {getRankChangeIcon(song.delta)}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            <p className="text-sm">차트 데이터를 불러오는 중...</p>
          </div>
        )}

        {topSongs.length > 0 && (
          <Button variant="outline" size="sm" className="w-full mt-3" asChild>
            <Link href="/charts">전체 차트 보기</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
