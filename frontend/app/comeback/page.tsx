"use client";

import { ExternalLink, ShoppingBag, Users, Heart, Radio, DollarSign, Calendar, Gift, Clock, Sparkles, Target, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const comebackInfo = {
  title: "Band Aid",
  date: "2024년 9월 2일",
  daysLeft: 25,
  status: "진행중",
};

const comebackGoals = [
  {
    title: "멜론 TOP 10 진입",
    current: 47,
    target: 10,
    unit: "위",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    icon: TrendingUp,
  },
  {
    title: "유튜브 조회수",
    current: 2840000,
    target: 5000000,
    unit: "회",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    icon: Target,
  },
  {
    title: "음악방송 1위",
    current: 0,
    target: 1,
    unit: "회",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    icon: Gift,
  },
];

const comebackSchedule = [
  {
    date: "2024.09.02",
    event: "음원 발매",
    status: "completed",
    description: "전 음원사이트 동시 공개",
  },
  {
    date: "2024.09.03",
    event: "뮤직비디오 공개",
    status: "completed", 
    description: "YouTube 공식 채널",
  },
  {
    date: "2024.09.09",
    event: "음악방송 첫 무대",
    status: "active",
    description: "더쇼 1차 무대",
  },
  {
    date: "2024.09.15",
    event: "팬미팅",
    status: "upcoming",
    description: "팬들과의 만남",
  },
];

const comebackMissions = [
  {
    priority: 1,
    title: "24시간 스트리밍",
    description: "발매 후 24시간이 가장 중요한 시기입니다",
    href: "/streaming",
    action: "지금 스트리밍하기",
  },
  {
    priority: 2,
    title: "뮤직비디오 조회수",
    description: "첫 24시간 내 100만뷰 달성이 목표입니다",
    href: "/streaming?tab=mv",
    action: "MV 보러가기",
  },
  {
    priority: 3,
    title: "음악방송 투표",
    description: "사전투표와 생방송 문자투표 참여해주세요",
    href: "/votes",
    action: "투표하러가기",
  },
];

const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export default function ComebackPage() {
  return (
    <div>
      {/* Content with same padding as homepage */}
      <div className="px-5 md:px-6 lg:px-8 xl:px-12 space-y-6 pt-6">
        
        {/* Section Header - same style as homepage */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              컴백 지원 센터
            </h2>
            <p className="text-xs md:text-sm text-gray-500">
              DAY6 'Band Aid' 컴백 활동 현황 및 지원
            </p>
          </div>
          <div className="text-gray-300">
            <ExternalLink className="h-5 w-5" />
          </div>
        </div>

        {/* Comeback Status Banner */}
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-6 h-6" />
                  <Badge className="bg-white/20 text-white border-white/30">
                    {comebackInfo.status}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold mb-1">{comebackInfo.title}</h3>
                <p className="text-purple-100 text-sm">{comebackInfo.date} 발매</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{comebackInfo.daysLeft}</div>
                <div className="text-sm text-purple-100">일 경과</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Goals */}
        <div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">현재 목표 달성률</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {comebackGoals.map((goal, index) => {
              const progress = goal.current <= goal.target ? (goal.current / goal.target) * 100 : 100;
              const IconComponent = goal.icon;
              
              return (
                <Card key={index} className={`${goal.borderColor} ${goal.bgColor}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <IconComponent className={`w-5 h-5 ${goal.color}`} />
                        <h4 className="font-medium text-gray-900 text-sm">{goal.title}</h4>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-1">
                        <span className={`text-2xl font-bold ${goal.color}`}>
                          {goal.unit === "회" ? formatNumber(goal.current) : goal.current}
                        </span>
                        <span className="text-sm text-gray-500">
                          / {goal.unit === "회" ? formatNumber(goal.target) : goal.target}{goal.unit}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${goal.color.replace('text-', 'bg-')}`}
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-600">
                        {Math.round(progress)}% 달성
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Comeback Schedule */}
        <div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">컴백 일정</h3>
          <div className="space-y-3">
            {comebackSchedule.map((item, index) => (
              <Card key={index} className={
                item.status === 'completed' ? 'bg-green-50 border-green-200' :
                item.status === 'active' ? 'bg-blue-50 border-blue-200' :
                'bg-gray-50 border-gray-200'
              }>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {item.status === 'completed' ? (
                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                      ) : item.status === 'active' ? (
                        <Clock className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Calendar className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">
                          {item.event}
                        </h4>
                        {item.status === 'active' && (
                          <Badge className="bg-blue-500 text-white text-xs">진행중</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        {item.date}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Priority Missions */}
        <div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">우선순위 미션</h3>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
            {comebackMissions.map((mission, index) => (
              <Card key={index} className="hover:shadow-md transition-all duration-200">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
                        {mission.priority}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">
                          {mission.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          {mission.description}
                        </p>
                        <Button
                          asChild
                          size="sm"
                          className="w-full bg-purple-600 hover:bg-purple-700"
                        >
                          <a href={mission.href}>
                            {mission.action}
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
      
      {/* Bottom spacing for mobile nav */}
      <div className="h-20 md:h-8"></div>
    </div>
  );
}