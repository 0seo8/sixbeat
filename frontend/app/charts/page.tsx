'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <BarChart3 className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
          음원 차트
        </h1>
        <p className="text-gray-600">
          실시간 음원 차트 순위를 확인하고 DAY6의 순위 변동을 추적하세요.
        </p>
      </div>

      {/* 필터 섹션 */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-600" />
          필터
        </h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">플랫폼 선택</label>
            <PlatformFilters 
              selectedPlatforms={selectedPlatforms}
              onPlatformChange={setSelectedPlatforms}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">기간 선택</label>
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
        </div>
      </div>

      {/* 차트 섹션 */}
      <div className="space-y-6">
        {selectedPlatforms.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8 md:p-12 shadow-sm text-center">
            <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">플랫폼을 선택해주세요</h3>
            <p className="text-gray-500">
              위의 필터에서 확인하고 싶은 플랫폼을 선택하세요.
            </p>
          </div>
        ) : (
          selectedPlatforms.map(platform => (
            <div key={platform} className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 md:p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${getPlatformColor(platform)}`} />
                    <h2 className="text-lg md:text-xl font-bold text-gray-900">{getPlatformName(platform)} 차트</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm font-medium">
                      {selectedPeriod === 'realtime' ? '실시간' : 
                       selectedPeriod === 'daily' ? '일간' : '주간'}
                    </span>
                    <span className="text-sm text-gray-500">
                      {chartData?.last_updated && formatKSTDate(chartData.last_updated)}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600">
                  DAY6 곡들의 {getPlatformName(platform)} 차트 순위입니다.
                </p>
              </div>
              <div className="p-4 md:p-6">
                <ChartTable
                  songs={(chartData as any)?.[platform] || []}
                  platform={platform}
                  isLoading={isLoading}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* 범례 */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">범례</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-gray-700">↑ 순위 상승</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-red-600" />
              <span className="text-gray-700">↓ 순위 하락</span>
            </div>
            <div className="flex items-center gap-2">
              <Minus className="h-4 w-4 text-gray-500" />
              <span className="text-gray-700">– 순위 변동 없음</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-600 rounded" />
              <span className="text-gray-700">TOP 10</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">차트아웃</span>
              <span className="text-gray-700">100위 밖 또는 차트에서 제외</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}