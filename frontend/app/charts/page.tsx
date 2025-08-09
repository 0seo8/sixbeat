'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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


function ChartTable({ songs, platform, isLoading }: ChartTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="animate-pulse">
            <div className="h-16 bg-gray-100 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (!songs || songs.length === 0) {
    return (
      <div className="text-center py-12">
        <Music className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">데이터를 불러오는 중</h3>
        <p className="text-gray-500">
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
          className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
        >
          {/* 순위 */}
          <div className="flex flex-col items-center justify-center w-8 sm:w-12">
            <span className={`text-lg sm:text-2xl font-bold ${
              song.rank === null ? 'text-gray-400' : 
              song.rank <= 10 ? 'text-blue-600' : 
              song.rank <= 50 ? 'text-gray-900' : 'text-gray-400'
            }`}>
              {song.rank || '—'}
            </span>
            <div className={`text-xs font-medium ${getRankChangeColor(song.delta)}`}>
              {getRankChangeIcon(song.delta)}
            </div>
          </div>

          {/* 앨범 아트 */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden">
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
                <Music className="h-6 w-6 text-gray-400" />
              </div>
            )}
          </div>

          {/* 곡 정보 */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm sm:text-base text-gray-900 truncate">{song.title}</h3>
            <p className="text-xs sm:text-sm text-gray-500 truncate">{song.artist}</p>
            <p className="text-xs text-gray-500 truncate hidden sm:block">{song.album}</p>
          </div>

          {/* 상태 배지 */}
          <div className="flex flex-col items-end gap-1">
            {song.rank === null && (
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                차트아웃
              </span>
            )}
            {song.rank && song.rank <= 100 && (
              <span className={`${getPlatformColor(platform)} text-white px-2 py-1 rounded text-xs font-medium`}>
                TOP 100
              </span>
            )}
            <span className="text-xs text-gray-500">
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
    <div className="px-5 md:px-6 lg:px-8 xl:px-12 space-y-6 py-6">
      {/* 헤더 */}
      <div>
        <h1 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
          실시간 차트 순위
        </h1>
        <p className="text-xs md:text-sm text-gray-500">
          BLACKPINK의 차트 순위 변동을 추적하세요.
        </p>
      </div>

      {/* 필터 섹션 */}
      <Card className="p-4">
        <CardContent className="p-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              플랫폼 필터
            </h2>
          </div>
          <PlatformFilters 
            selectedPlatforms={selectedPlatforms}
            onPlatformChange={setSelectedPlatforms}
          />
        </CardContent>
      </Card>

      {/* 차트 섹션 */}
      <div className="space-y-4">
        {selectedPlatforms.length === 0 ? (
          <Card className="p-4">
            <CardContent className="p-0 text-center py-8">
              <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">플랫폼을 선택해주세요</h3>
              <p className="text-gray-500">
                위의 필터에서 확인하고 싶은 플랫폼을 선택하세요.
              </p>
            </CardContent>
          </Card>
        ) : (
          selectedPlatforms.map(platform => (
            <Card key={platform} className="p-4">
              <CardContent className="p-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${getPlatformColor(platform)}`} />
                    <h2 className="text-lg md:text-xl font-bold text-gray-900">{getPlatformName(platform)}</h2>
                  </div>
                  <span className="text-xs md:text-sm text-gray-500">
                    {chartData?.collectedAtKST}
                  </span>
                </div>
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

    </div>
  );
}