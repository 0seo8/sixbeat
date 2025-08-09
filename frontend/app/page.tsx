'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Music, TrendingUp, TrendingDown, Minus, ExternalLink, 
  Play, Heart, Eye, Clock, AlertCircle, Sparkles, BarChart3 
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchChartData, fetchVotes, fetchMVStats } from '@/lib/api';
import { TodoItem, ChartSong } from '@/lib/types';
import { getPlatformColor, getPlatformName, getRankChangeIcon, getRankChangeColor, formatKSTDate } from '@/lib/utils';
import { CompactChart } from '@/components/compact-chart';
import Link from 'next/link';

const todos: TodoItem[] = [
  {
    id: '1',
    title: '멜론 스트리밍',
    description: '24시간 차트 반영을 위한 스트리밍',
    completed: false,
    link: 'https://www.melon.com/chart/index.htm',
    icon: '🎵'
  },
  {
    id: '2',
    title: '지니 좋아요',
    description: '일간 차트 순위 상승',
    completed: false,
    link: 'https://www.genie.co.kr/chart/top200',
    icon: '❤️'
  },
  {
    id: '3',
    title: 'MV 스트리밍',
    description: 'YouTube 조회수 증가',
    completed: false,
    link: 'https://youtube.com',
    icon: '📺'
  },
  {
    id: '4',
    title: '음방 사전투표',
    description: '엠카운트다운 투표 참여',
    completed: false,
    link: 'https://www.mnet.com',
    icon: '🗳️'
  },
  {
    id: '5',
    title: 'SNS 홍보',
    description: '해시태그와 함께 응원 메시지 작성',
    completed: false,
    link: 'https://twitter.com',
    icon: '📱'
  }
];

function TodoCard() {
  const [todoItems, setTodoItems] = useState(todos);

  const toggleTodo = (id: string) => {
    setTodoItems(items =>
      items.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedCount = todoItems.filter(item => item.completed).length;
  const progress = (completedCount / todoItems.length) * 100;

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <span>📝</span>
            오늘의 할 일
          </CardTitle>
          <div className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-sm">
            {completedCount}/{todoItems.length}
          </div>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mt-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {todoItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`group flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                item.completed 
                  ? 'bg-muted border-border' 
                  : 'hover:bg-muted/50'
              }`}
            >
              <Checkbox
                id={item.id}
                checked={item.completed}
                onCheckedChange={() => toggleTodo(item.id)}
              />
              <div className="flex-1 min-w-0">
                <label
                  htmlFor={item.id}
                  className={`block text-sm font-medium cursor-pointer ${
                    item.completed 
                      ? 'line-through text-muted-foreground' 
                      : 'text-foreground'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.title}
                </label>
                {item.description && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.description}
                  </p>
                )}
              </div>
              {item.link && (
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-8 w-8" 
                  asChild
                >
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ChartSummaryCard() {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ['chartData'],
    queryFn: fetchChartData,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>실시간 차트 현황</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-muted rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const platforms = ['melon', 'genie', 'bugs', 'vibe', 'flo'];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          실시간 차트 현황
        </CardTitle>
        <CardDescription>
          {chartData?.last_updated ? formatKSTDate(chartData.last_updated) : '업데이트 중...'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="melon">
          <TabsList className="grid w-full grid-cols-5">
            {platforms.map(platform => (
              <TabsTrigger key={platform} value={platform}>
                {getPlatformName(platform)}
              </TabsTrigger>
            ))}
          </TabsList>
          {platforms.map(platform => {
            const songs = (chartData as any)?.[platform] || [];
            return (
              <TabsContent key={platform} value={platform}>
                <div className="space-y-2">
                  {songs.slice(0, 5).map((song: ChartSong, index: number) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-muted-foreground w-8">
                          {song.rank || '-'}
                        </span>
                        <div>
                          <p className="font-medium">{song.title}</p>
                          <p className="text-sm text-muted-foreground">{song.artist}</p>
                        </div>
                      </div>
                      <div className={`text-sm font-medium ${getRankChangeColor(song.delta)}`}>
                        {getRankChangeIcon(song.delta)}
                      </div>
                    </div>
                  ))}
                  {songs.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">
                      차트 데이터를 불러오는 중...
                    </p>
                  )}
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link href="/charts">
                    전체 차트 보기
                  </Link>
                </Button>
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
}

function MVStatsCard() {
  const { data: mvStats } = useQuery({
    queryKey: ['mvStats'],
    queryFn: fetchMVStats,
  });

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Play className="h-5 w-5 text-primary" />
          MV 현황
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mvStats?.map((mv, index) => (
            <div key={index} className="p-2 rounded-lg hover:bg-muted/50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm truncate">{mv.title}</h4>
                <Button size="sm" variant="ghost" className="p-1 h-6 w-6" asChild>
                  <a href={mv.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3 text-muted-foreground" />
                  <span>{(mv.views / 1000000).toFixed(1)}M</span>
                  <span className="text-primary">
                    +{(mv.viewsDelta24h / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-3 w-3 text-muted-foreground" />
                  <span>{(mv.likes / 1000).toFixed(0)}K</span>
                  <span className="text-primary">
                    +{(mv.likesDelta24h / 1000).toFixed(1)}K
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function QuickAccessCard() {
  const streamingPlatforms = [
    { name: '멜론', url: 'https://www.melon.com' },
    { name: '지니', url: 'https://www.genie.co.kr' },
    { name: '벅스', url: 'https://music.bugs.co.kr' },
    { name: '바이브', url: 'https://vibe.naver.com' },
    { name: '플로', url: 'https://www.music-flo.com' },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">빠른 실행</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {streamingPlatforms.slice(0, 6).map((platform) => (
            <Button
              key={platform.name}
              variant="outline"
              className="h-16 flex-col gap-1 text-xs"
              asChild
            >
              <a href={platform.url} target="_blank" rel="noopener noreferrer">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Music className="h-3 w-3 text-primary" />
                </div>
                <span className="truncate max-w-full">{platform.name}</span>
              </a>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function AlertBanner() {
  const { data: votes } = useQuery({
    queryKey: ['votes'],
    queryFn: fetchVotes,
  });

  const urgentVotes = votes?.filter(v => {
    const daysLeft = Math.ceil((v.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return daysLeft <= 1;
  });

  if (!urgentVotes?.length) return null;

  return (
    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2">
        <AlertCircle className="h-5 w-5 text-destructive" />
        <h3 className="font-semibold">긴급 알림</h3>
      </div>
      <div className="mt-2 space-y-1">
        {urgentVotes.map(vote => (
          <p key={vote.id} className="text-sm">
            {vote.title} 마감 임박! 
            <Button variant="link" size="sm" className="px-1" asChild>
              <a href={vote.link} target="_blank" rel="noopener noreferrer">
                지금 투표하기 →
              </a>
            </Button>
          </p>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="space-y-4">
      {/* Simple Header like NCT WISH STRM */}
      <div className="flex items-center justify-between py-2">
        <div>
          <h1 className="text-xl font-bold text-foreground">DAY6 STRM</h1>
          <p className="text-sm text-muted-foreground">실시간 차트</p>
        </div>
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Music className="h-4 w-4 text-primary-foreground" />
        </div>
      </div>

      <AlertBanner />

      <div className="space-y-4">
        <CompactChart />
        <TodoCard />
        <div className="grid gap-4 sm:grid-cols-2">
          <MVStatsCard />
          <QuickAccessCard />
        </div>
      </div>
    </div>
  );
}
