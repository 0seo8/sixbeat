'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, Smartphone, Globe, ExternalLink, Clock, 
  Music, Headphones, Heart, Share2, AlertTriangle,
  CheckCircle, Star, Zap, Volume2
} from 'lucide-react';
import { StreamingPlatform } from '@/lib/types';

function Badge({ children, className = '', variant = 'default', ...props }: { 
  children: React.ReactNode; 
  className?: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}) {
  const variants = {
    default: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    destructive: 'bg-destructive text-destructive-foreground',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
  };
  
  return (
    <span 
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

const streamingPlatforms: StreamingPlatform[] = [
  {
    id: 'melon',
    name: '멜론',
    appLink: 'melonapp://chart',
    webLink: 'https://www.melon.com/chart/index.htm',
    playlist: 'https://www.melon.com/mymusic/playlist/mymusicplaylist_list.htm',
    lastUpdated: '2024-12-15',
    icon: '🎵'
  },
  {
    id: 'genie',
    name: '지니뮤직',
    appLink: 'genie://chart',
    webLink: 'https://www.genie.co.kr/chart/top200',
    playlist: 'https://www.genie.co.kr/playlist/list',
    lastUpdated: '2024-12-14',
    icon: '🎶'
  },
  {
    id: 'bugs',
    name: '벅스뮤직',
    appLink: 'bugs://chart',
    webLink: 'https://music.bugs.co.kr/chart',
    playlist: 'https://music.bugs.co.kr/playlist',
    lastUpdated: '2024-12-13',
    icon: '🐛'
  },
  {
    id: 'vibe',
    name: '바이브',
    appLink: 'vibeapp://chart',
    webLink: 'https://vibe.naver.com/chart',
    playlist: 'https://vibe.naver.com/playlist',
    lastUpdated: '2024-12-12',
    icon: '📻'
  },
  {
    id: 'flo',
    name: 'FLO',
    appLink: 'flo://chart',
    webLink: 'https://www.music-flo.com/chart',
    playlist: 'https://www.music-flo.com/playlist',
    lastUpdated: '2024-12-11',
    icon: '🌊'
  }
];

const youtubeVideos = [
  {
    id: '1',
    title: 'Melt Down',
    type: 'MV',
    url: 'https://youtu.be/example1',
    thumbnail: '/placeholder-mv1.jpg',
    views: '5.2M',
    uploadDate: '2024-12-01'
  },
  {
    id: '2',
    title: 'HAPPY',
    type: 'MV',
    url: 'https://youtu.be/example2',
    thumbnail: '/placeholder-mv2.jpg',
    views: '8.1M',
    uploadDate: '2024-11-15'
  },
  {
    id: '3',
    title: 'DAY6 - Melt Down (Performance Video)',
    type: 'Performance',
    url: 'https://youtu.be/example3',
    thumbnail: '/placeholder-perf1.jpg',
    views: '2.3M',
    uploadDate: '2024-12-05'
  }
];

function PlatformCard({ platform }: { platform: StreamingPlatform }) {
  const getPlatformColor = (id: string) => {
    const colors: Record<string, string> = {
      melon: 'bg-green-500',
      genie: 'bg-blue-500',
      bugs: 'bg-orange-500',
      vibe: 'bg-purple-500',
      flo: 'bg-pink-500'
    };
    return colors[id] || 'bg-gray-500';
  };

  const isRecentlyUpdated = (lastUpdated: string) => {
    const updateDate = new Date(lastUpdated);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - updateDate.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 3;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${getPlatformColor(platform.id)} flex items-center justify-center text-white text-lg`}>
              {platform.icon}
            </div>
            <div>
              <CardTitle className="text-lg">{platform.name}</CardTitle>
              <CardDescription>
                음원 스트리밍 플랫폼
              </CardDescription>
            </div>
          </div>
          {isRecentlyUpdated(platform.lastUpdated) && (
            <Badge className="bg-green-500 text-white">
              NEW
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {platform.playlist && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Music className="h-4 w-4" />
            <span>추천 플레이리스트 업데이트: {platform.lastUpdated}</span>
          </div>
        )}
        
        <div className="flex gap-2">
          <Button className="flex-1" asChild>
            <a href={platform.appLink} className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              앱으로 열기
            </a>
          </Button>
          <Button variant="outline" className="flex-1" asChild>
            <a href={platform.webLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              웹으로 열기
            </a>
          </Button>
        </div>
        
        {platform.playlist && (
          <Button variant="secondary" className="w-full" asChild>
            <a href={platform.playlist} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              추천 플레이리스트
              <ExternalLink className="h-4 w-4 ml-auto" />
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function YouTubeSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="h-5 w-5 text-red-500" />
          YouTube 스트리밍
        </CardTitle>
        <CardDescription>
          MV와 퍼포먼스 영상을 시청하여 조회수를 높여주세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {youtubeVideos.map(video => (
            <div key={video.id} className="group">
              <Button 
                variant="ghost" 
                className="w-full h-auto p-0 flex-col items-start hover:bg-muted/50"
                asChild
              >
                <a href={video.url} target="_blank" rel="noopener noreferrer">
                  <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center mb-2 group-hover:bg-muted/80 transition-colors">
                    <Play className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="w-full text-left px-2 pb-2">
                    <h4 className="font-medium text-sm line-clamp-2 mb-1">{video.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        {video.type}
                      </Badge>
                      <span>{video.views} views</span>
                    </div>
                  </div>
                </a>
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-start gap-3">
            <Volume2 className="h-5 w-5 text-primary mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-medium">효과적인 YouTube 스트리밍 팁</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 음소거하지 말고 최소 음량으로 재생하세요</li>
                <li>• 영상을 끝까지 시청하면 더 큰 효과가 있습니다</li>
                <li>• 좋아요와 댓글도 함께 남겨주세요</li>
                <li>• 공유하기를 통해 추가 조회수를 만들어보세요</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StreamingGuide() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            스트리밍 가이드
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium">올바른 스트리밍</h4>
                <p className="text-sm text-muted-foreground">30초 이상 재생, 음소거 금지, 자연스러운 재생</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium">다양한 곡 섞어 듣기</h4>
                <p className="text-sm text-muted-foreground">타겟곡만 반복하지 말고 다른 곡들과 함께 재생하세요</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium">적절한 간격 유지</h4>
                <p className="text-sm text-muted-foreground">같은 곡을 너무 연속으로 듣지 마세요</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive/20 bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            주의사항
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-destructive">•</span>
              <span>로봇 재생으로 인식될 수 있는 패턴은 피해주세요</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive">•</span>
              <span>여러 계정으로 동시 재생하지 마세요</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive">•</span>
              <span>스트리밍 프로그램 사용은 금지되어 있습니다</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive">•</span>
              <span>VPN 사용 시 차트 반영이 안 될 수 있습니다</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            최적 스트리밍 시간
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">실시간 차트</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• 매시간 정각 업데이트</li>
                <li>• 1시간 단위로 집계</li>
                <li>• 실시간 반영</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">일간 차트</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• 자정(00:00) 업데이트</li>
                <li>• 전날 00:00 ~ 23:59 집계</li>
                <li>• 꾸준한 스트리밍이 중요</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function StreamingPage() {
  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Headphones className="h-8 w-8 text-primary" />
          스트리밍 허브
        </h1>
        <p className="text-muted-foreground">
          음원 플랫폼에서 DAY6 곡들을 스트리밍하여 차트 순위를 올려주세요!
        </p>
      </div>

      {/* 메인 컨텐츠 */}
      <Tabs defaultValue="platforms">
        <TabsList>
          <TabsTrigger value="platforms">음원 플랫폼</TabsTrigger>
          <TabsTrigger value="youtube">YouTube</TabsTrigger>
          <TabsTrigger value="guide">가이드</TabsTrigger>
        </TabsList>

        <TabsContent value="platforms" className="mt-4 sm:mt-6">
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {streamingPlatforms.map(platform => (
              <PlatformCard key={platform.id} platform={platform} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="youtube" className="mt-6">
          <YouTubeSection />
        </TabsContent>

        <TabsContent value="guide" className="mt-6">
          <StreamingGuide />
        </TabsContent>
      </Tabs>
    </div>
  );
}