'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, Filter, ExternalLink, TrendingUp, TrendingDown, 
  Music, Clock, Calendar, Minus, ChevronDown 
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchChartData } from '@/lib/api';
import { ChartSong, PlatformType, ChartPeriod } from '@/lib/types';
import { getPlatformColor, getPlatformName, getRankChangeIcon, getRankChangeColor, formatKSTDate } from '@/lib/utils';
import Image from 'next/image';

interface ChartTableProps {
  songs: ChartSong[];
  platform: string;
  isLoading?: boolean;
}

function Badge({ children, className = '', ...props }: { children: React.ReactNode; className?: string }) {
  return (
    <span 
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

function ChartTable({ songs, platform, isLoading }: ChartTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="animate-pulse">
            <div className="h-16 bg-muted rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (!songs || songs.length === 0) {
    return (
      <div className="text-center py-12">
        <Music className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">데이터를 불러오는 중</h3>
        <p className="text-muted-foreground">
          {getPlatformName(platform)} 차트 데이터를 가져오고 있습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {songs.map((song, index) => (
        <div 
          key={`${song.title}-${song.artist}-${index}`}
          className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-lg border hover:bg-muted/50 transition-colors"
        >
          {/* 순위 */}
          <div className="flex flex-col items-center justify-center w-8 sm:w-12">
            <span className={`text-lg sm:text-2xl font-bold ${
              song.rank === null ? 'text-muted-foreground' : 
              song.rank <= 10 ? 'text-primary' : 
              song.rank <= 50 ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {song.rank || '—'}
            </span>
            <div className={`text-xs font-medium ${getRankChangeColor(song.delta)}`}>
              {getRankChangeIcon(song.delta)}
            </div>
          </div>

          {/* 앨범 아트 */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-muted rounded-md flex-shrink-0 overflow-hidden">
            {song.albumArt ? (
              <Image 
                src={song.albumArt} 
                alt={`${song.album} 앨범 아트`}
                width={48}
                height={48}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Music className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* 곡 정보 */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm sm:text-base truncate">{song.title}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">{song.artist}</p>
            <p className="text-xs text-muted-foreground truncate hidden sm:block">{song.album}</p>
          </div>

          {/* 상태 배지 */}
          <div className="flex flex-col items-end gap-1">
            {song.rank === null && (
              <Badge className="bg-muted text-muted-foreground">
                차트아웃
              </Badge>
            )}
            {song.rank && song.rank <= 100 && (
              <Badge className={`${getPlatformColor(platform)} text-white`}>
                TOP 100
              </Badge>
            )}
            <span className="text-xs text-muted-foreground">
              {song.timestamp && formatKSTDate(song.timestamp)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function PlatformFilters({ 
  selectedPlatforms, 
  onPlatformChange 
}: {
  selectedPlatforms: PlatformType[];
  onPlatformChange: (platforms: PlatformType[]) => void;
}) {
  const platforms: { id: PlatformType; name: string; color: string }[] = [
    { id: 'melon', name: '멜론', color: 'bg-green-500' },
    { id: 'genie', name: '지니', color: 'bg-blue-500' },
    { id: 'bugs', name: '벅스', color: 'bg-orange-500' },
    { id: 'vibe', name: '바이브', color: 'bg-purple-500' },
    { id: 'flo', name: '플로', color: 'bg-pink-500' },
  ];

  const togglePlatform = (platform: PlatformType) => {
    if (selectedPlatforms.includes(platform)) {
      onPlatformChange(selectedPlatforms.filter(p => p !== platform));
    } else {
      onPlatformChange([...selectedPlatforms, platform]);
    }
  };

  return (
    <div className="flex flex-wrap gap-1 sm:gap-2">
      {platforms.map(platform => (
        <Button
          key={platform.id}
          variant={selectedPlatforms.includes(platform.id) ? "default" : "outline"}
          size="sm"
          onClick={() => togglePlatform(platform.id)}
          className={selectedPlatforms.includes(platform.id) ? 
            `${platform.color} text-white hover:opacity-90` : ''
          }
        >
          {platform.name}
        </Button>
      ))}
    </div>
  );
}

export default function ChartsPage() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformType[]>(['melon']);
  const [selectedPeriod, setSelectedPeriod] = useState<ChartPeriod>('realtime');

  const { data: chartData, isLoading } = useQuery({
    queryKey: ['chartData'],
    queryFn: fetchChartData,
  });

  const periods = [
    { id: 'realtime', name: '실시간', icon: Clock },
    { id: 'daily', name: '일간', icon: Calendar },
    { id: 'weekly', name: '주간', icon: BarChart3 },
  ];

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <BarChart3 className="h-8 w-8 text-primary" />
          음원 차트
        </h1>
        <p className="text-muted-foreground">
          실시간 음원 차트 순위를 확인하고 DAY6의 순위 변동을 추적하세요.
        </p>
      </div>

      {/* 필터 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            필터
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">플랫폼 선택</label>
            <PlatformFilters 
              selectedPlatforms={selectedPlatforms}
              onPlatformChange={setSelectedPlatforms}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">기간 선택</label>
            <div className="flex gap-2">
              {periods.map(period => (
                <Button
                  key={period.id}
                  variant={selectedPeriod === period.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod(period.id as ChartPeriod)}
                >
                  <period.icon className="h-4 w-4 mr-1" />
                  {period.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 차트 섹션 */}
      <div className="space-y-6">
        {selectedPlatforms.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">플랫폼을 선택해주세요</h3>
              <p className="text-muted-foreground">
                위의 필터에서 확인하고 싶은 플랫폼을 선택하세요.
              </p>
            </CardContent>
          </Card>
        ) : (
          selectedPlatforms.map(platform => (
            <Card key={platform}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${getPlatformColor(platform)}`} />
                    <CardTitle>{getPlatformName(platform)} 차트</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {selectedPeriod === 'realtime' ? '실시간' : 
                       selectedPeriod === 'daily' ? '일간' : '주간'}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {chartData?.last_updated && formatKSTDate(chartData.last_updated)}
                    </span>
                  </div>
                </div>
                <CardDescription>
                  DAY6 곡들의 {getPlatformName(platform)} 차트 순위입니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartTable
                  songs={(chartData as any)?.[platform] || []}
                  platform={platform}
                  isLoading={isLoading}
                />
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* 범례 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">범례</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span>↑ 순위 상승</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-red-600" />
                <span>↓ 순위 하락</span>
              </div>
              <div className="flex items-center gap-2">
                <Minus className="h-4 w-4 text-gray-500" />
                <span>– 순위 변동 없음</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-primary rounded" />
                <span>TOP 10</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-muted text-muted-foreground text-xs">차트아웃</Badge>
                <span>100위 밖 또는 차트에서 제외</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}