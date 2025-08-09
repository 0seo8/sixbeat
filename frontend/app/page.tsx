'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Music, ExternalLink, Play, Heart, Eye, Clock, AlertCircle, Sparkles, BarChart3 
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchVotes, fetchMVStats } from '@/lib/api';
import { TodoItem } from '@/lib/types';
import { CompactChart } from '@/components/compact-chart';

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
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-sm md:text-base font-medium">
          {completedCount}/{todoItems.length} 완료
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 md:h-3 mb-4">
        <div 
          className="bg-green-500 h-2 md:h-3 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="space-y-2 md:space-y-3">
        {todoItems.map((item) => (
          <div 
            key={item.id} 
            className={`group flex items-center gap-3 p-3 md:p-4 rounded-lg border transition-colors ${
              item.completed 
                ? 'bg-gray-50 border-gray-200' 
                : 'border-gray-100 hover:bg-gray-50'
            }`}
          >
            <Checkbox
              id={item.id}
              checked={item.completed}
              onCheckedChange={() => toggleTodo(item.id)}
              className="md:scale-110"
            />
            <div className="flex-1 min-w-0">
              <label
                htmlFor={item.id}
                className={`block text-sm md:text-base font-medium cursor-pointer ${
                  item.completed 
                    ? 'line-through text-gray-500' 
                    : 'text-gray-900'
                }`}
              >
                <span className="mr-2 text-base md:text-lg">{item.icon}</span>
                {item.title}
              </label>
              {item.description && (
                <p className="text-xs md:text-sm text-gray-500 mt-0.5">
                  {item.description}
                </p>
              )}
            </div>
            {item.link && (
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-8 w-8 md:h-9 md:w-9" 
                asChild
              >
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3.5 w-3.5 md:h-4 md:w-4 text-gray-500" />
                </a>
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


function MVStatsCard() {
  const { data: mvStats } = useQuery({
    queryKey: ['mvStats'],
    queryFn: fetchMVStats,
  });

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 shadow-sm">
      <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        {mvStats?.length ? mvStats.map((mv, index) => (
          <div key={index} className="bg-gray-50 p-3 md:p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-sm md:text-base text-gray-900 truncate">{mv.title}</h4>
              <Button size="sm" variant="ghost" className="p-1 h-6 w-6" asChild>
                <a href={mv.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3 text-gray-500" />
                </a>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
                <span className="text-gray-700">{(mv.views / 1000000).toFixed(1)}M</span>
                <span className="text-red-600 font-medium">
                  +{(mv.viewsDelta24h / 1000).toFixed(0)}K
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-3 w-3 md:h-4 md:w-4 text-pink-500" />
                <span className="text-gray-700">{(mv.likes / 1000).toFixed(0)}K</span>
                <span className="text-pink-600 font-medium">
                  +{(mv.likesDelta24h / 1000).toFixed(1)}K
                </span>
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center py-8 md:col-span-2 lg:col-span-1 xl:col-span-2">
            <p className="text-sm md:text-base text-gray-500">YouTube 데이터를 불러오는 중...</p>
          </div>
        )}
      </div>
    </div>
  );
}

function QuickAccessCard() {
  const streamingPlatforms = [
    { name: '멜론', url: 'https://www.melon.com', color: 'bg-green-500', emoji: '🎵' },
    { name: '지니', url: 'https://www.genie.co.kr', color: 'bg-blue-500', emoji: '🎶' },
    { name: '벅스', url: 'https://music.bugs.co.kr', color: 'bg-orange-500', emoji: '🐛' },
    { name: '바이브', url: 'https://vibe.naver.com', color: 'bg-purple-500', emoji: '📻' },
    { name: '플로', url: 'https://www.music-flo.com', color: 'bg-pink-500', emoji: '🌊' },
    { name: 'YouTube', url: 'https://music.youtube.com', color: 'bg-red-500', emoji: '📺' },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
        {streamingPlatforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center p-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <div className={`w-10 h-10 lg:w-12 lg:h-12 ${platform.color} rounded-full flex items-center justify-center text-white text-lg mb-2`}>
              {platform.emoji}
            </div>
            <span className="text-xs lg:text-sm font-medium text-gray-700 text-center">
              {platform.name}
            </span>
          </a>
        ))}
      </div>
    </div>
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
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-center gap-2">
        <AlertCircle className="h-5 w-5 text-red-600" />
        <h3 className="font-semibold text-red-800">긴급 알림</h3>
      </div>
      <div className="mt-2 space-y-1">
        {urgentVotes.map(vote => (
          <p key={vote.id} className="text-sm text-red-700">
            {vote.title} 마감 임박! 
            <Button variant="link" size="sm" className="px-1 text-red-600 hover:text-red-800" asChild>
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
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 md:p-6 text-white mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg md:text-2xl font-bold">DAY6</h1>
            <p className="text-sm md:text-base opacity-90">실시간 차트 추적</p>
          </div>
          <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Music className="h-6 w-6 md:h-8 md:w-8" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <div className="flex -space-x-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-6 h-6 md:w-8 md:h-8 bg-white/30 rounded-full border-2 border-white" />
            ))}
          </div>
          <span className="text-xs md:text-sm opacity-90">+1.2K My Days 활동 중</span>
        </div>
      </div>

      <AlertBanner />

      {/* Desktop Layout: 2-column grid with chart as main content */}
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Main Content - Real-time Chart */}
        <div className="lg:col-span-2">
          <div className="mb-6 lg:mb-0">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
              실시간 차트
            </h2>
            <CompactChart />
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="lg:col-span-1 space-y-6">
          {/* Today's Tasks Section */}
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
              오늘의 할 일
            </h2>
            <TodoCard />
          </div>

          {/* Streaming Guide Section */}
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
              스트리밍 가이드
            </h2>
            <QuickAccessCard />
          </div>
        </div>
      </div>

      {/* YouTube Stats Section - Full width on all screens */}
      <div className="mt-8">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Play className="h-5 w-5 md:h-6 md:w-6 text-red-600" />
          유튜브뮤직 조회수
        </h2>
        <div className="lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-4">
          <MVStatsCard />
        </div>
      </div>
    </>
  );
}
