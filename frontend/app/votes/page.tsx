'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Vote, ExternalLink, Clock, Trophy, Tv, Globe, 
  AlertCircle, Calendar, Star, Zap 
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchVotes } from '@/lib/api';
import { VoteItem } from '@/lib/types';
import { getDaysUntil } from '@/lib/utils';

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

function VoteCard({ vote }: { vote: VoteItem }) {
  const daysLeft = getDaysUntil(vote.deadline);
  const isUrgent = daysLeft <= 1;
  const isExpired = daysLeft < 0;

  const categoryIcons = {
    award: Trophy,
    music_show: Tv,
    global: Globe,
  };

  const categoryNames = {
    award: '시상식',
    music_show: '음악방송',
    global: '글로벌',
  };

  const difficultyColors = {
    easy: 'bg-green-500 text-white',
    medium: 'bg-yellow-500 text-white',
    hard: 'bg-red-500 text-white',
  };

  const difficultyNames = {
    easy: '쉬움',
    medium: '보통',
    hard: '어려움',
  };

  const CategoryIcon = categoryIcons[vote.category];

  return (
    <Card className={`${isUrgent && !isExpired ? 'border-destructive bg-destructive/5' : ''} ${isExpired ? 'opacity-60' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <CategoryIcon className="h-5 w-5 text-primary mt-1" />
            <div className="flex-1">
              <CardTitle className="text-lg leading-tight">{vote.title}</CardTitle>
              <CardDescription className="mt-1">
                {vote.platform} • {categoryNames[vote.category]}
              </CardDescription>
            </div>
          </div>
          {isUrgent && !isExpired && (
            <AlertCircle className="h-5 w-5 text-destructive" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* 마감 정보 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {isExpired ? '마감됨' : 
                 daysLeft === 0 ? '오늘 마감' :
                 daysLeft === 1 ? '내일 마감' :
                 `D-${daysLeft}`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                className={difficultyColors[vote.difficulty]}
              >
                {difficultyNames[vote.difficulty]}
              </Badge>
              {vote.requiredPoints && (
                <Badge variant="outline">
                  {vote.requiredPoints.toLocaleString()}P 필요
                </Badge>
              )}
            </div>
          </div>

          {/* 마감 날짜 */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              마감: {vote.deadline.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'short'
              })}
            </span>
          </div>

          {/* 액션 버튼 */}
          <Button 
            className="w-full" 
            asChild
            disabled={isExpired}
            variant={isUrgent && !isExpired ? "destructive" : "default"}
          >
            <a href={vote.link} target="_blank" rel="noopener noreferrer">
              {isExpired ? '마감됨' : '투표하러 가기'}
              {!isExpired && <ExternalLink className="h-4 w-4 ml-2" />}
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function VotingGuide() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-primary" />
          투표 가이드
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
              1
            </div>
            <div>
              <h4 className="font-medium">계정 준비</h4>
              <p className="text-sm text-muted-foreground">각 플랫폼별 계정을 미리 생성해 두세요.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
              2
            </div>
            <div>
              <h4 className="font-medium">정시 투표</h4>
              <p className="text-sm text-muted-foreground">매일 정해진 시간에 투표하여 효과를 극대화하세요.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
              3
            </div>
            <div>
              <h4 className="font-medium">마감 확인</h4>
              <p className="text-sm text-muted-foreground">투표 마감 시간을 꼼꼼히 확인하세요. (한국 시간 기준)</p>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-500" />
            투표 팁
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• 여러 기기로 투표할 수 있는 경우 활용하세요</li>
            <li>• SNS 공유로 추가 투표권을 받을 수 있습니다</li>
            <li>• 일일 미션 완료로 포인트를 모으세요</li>
            <li>• 마감 임박 시 집중 투표로 순위를 올려보세요</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export default function VotesPage() {
  const { data: votes, isLoading } = useQuery({
    queryKey: ['votes'],
    queryFn: fetchVotes,
  });

  // 투표를 카테고리별로 분류
  const awardVotes = votes?.filter(v => v.category === 'award') || [];
  const musicShowVotes = votes?.filter(v => v.category === 'music_show') || [];
  const globalVotes = votes?.filter(v => v.category === 'global') || [];

  // 긴급 투표 (24시간 이내 마감)
  const urgentVotes = votes?.filter(v => {
    const daysLeft = getDaysUntil(v.deadline);
    return daysLeft <= 1 && daysLeft >= 0;
  }).sort((a, b) => a.deadline.getTime() - b.deadline.getTime()) || [];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">투표 센터</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-48 bg-muted rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Vote className="h-8 w-8 text-primary" />
          투표 센터
        </h1>
        <p className="text-muted-foreground">
          진행 중인 투표를 확인하고 DAY6를 응원해주세요!
        </p>
      </div>

      {/* 긴급 알림 */}
      {urgentVotes.length > 0 && (
        <Card className="border-destructive bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              마감 임박! ({urgentVotes.length}개)
            </CardTitle>
            <CardDescription>
              24시간 이내 마감되는 투표들입니다. 지금 바로 참여하세요!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
              {urgentVotes.map(vote => (
                <VoteCard key={vote.id} vote={vote} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 메인 컨텐츠 */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-4 h-auto">
              <TabsTrigger value="all" className="text-xs sm:text-sm py-2">전체</TabsTrigger>
              <TabsTrigger value="award" className="text-xs sm:text-sm py-2">시상식</TabsTrigger>
              <TabsTrigger value="music_show" className="text-xs sm:text-sm py-2">음악방송</TabsTrigger>
              <TabsTrigger value="global" className="text-xs sm:text-sm py-2">글로벌</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                {votes?.map(vote => (
                  <VoteCard key={vote.id} vote={vote} />
                ))}
                {!votes?.length && (
                  <div className="col-span-2 text-center py-12">
                    <Vote className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">진행 중인 투표가 없습니다</h3>
                    <p className="text-muted-foreground">새로운 투표가 시작되면 여기에 표시됩니다.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="award" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                {awardVotes.map(vote => (
                  <VoteCard key={vote.id} vote={vote} />
                ))}
                {awardVotes.length === 0 && (
                  <div className="col-span-2 text-center py-12">
                    <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">시상식 투표가 없습니다</h3>
                    <p className="text-muted-foreground">현재 진행 중인 시상식 투표가 없습니다.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="music_show" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                {musicShowVotes.map(vote => (
                  <VoteCard key={vote.id} vote={vote} />
                ))}
                {musicShowVotes.length === 0 && (
                  <div className="col-span-2 text-center py-12">
                    <Tv className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">음악방송 투표가 없습니다</h3>
                    <p className="text-muted-foreground">현재 진행 중인 음악방송 사전투표가 없습니다.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="global" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                {globalVotes.map(vote => (
                  <VoteCard key={vote.id} vote={vote} />
                ))}
                {globalVotes.length === 0 && (
                  <div className="col-span-2 text-center py-12">
                    <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">글로벌 투표가 없습니다</h3>
                    <p className="text-muted-foreground">현재 진행 중인 글로벌 투표가 없습니다.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <VotingGuide />
        </div>
      </div>
    </div>
  );
}