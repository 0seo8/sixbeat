"use client";

import { Card, CardContent } from "@/components/ui/card";
import { 
  ShoppingBag, 
  Users, 
  Heart, 
  Radio, 
  DollarSign,
  ExternalLink,
  Calendar,
  Gift,
  Sparkles,
  CreditCard,
  Headphones
} from "lucide-react";
import { PageHeader } from "@/components/common/page-header";

// 컴백 지원 활동 데이터
const COMEBACK_ACTIVITIES = [
  {
    id: "album-group-order",
    title: "앨범 공구",
    description: "함께 모여 대량 구매로 차트 순위 상승",
    icon: ShoppingBag,
    color: "bg-purple-500",
    links: [
      { name: "트위터 공구방", url: "https://twitter.com/search?q=DAY6%20공구" },
      { name: "카페 공구", url: "https://cafe.daum.net/DAY6" },
    ],
    tips: [
      "초동 판매량이 중요해요",
      "한터차트 인증샵 확인 필수",
      "여러 버전 구매시 포카 확률 UP"
    ]
  },
  {
    id: "download-helper",
    title: "다운 헬퍼 지원",
    description: "음원 다운로드를 도와주는 헬퍼 활동",
    icon: Users,
    color: "bg-blue-500",
    links: [
      { name: "헬퍼 신청", url: "#" },
      { name: "헬퍼 모집", url: "#" },
    ],
    tips: [
      "발매 첫 주가 가장 중요",
      "24시간 내 다운로드 집중",
      "여러 플랫폼 동시 진행"
    ]
  },
  {
    id: "id-donation",
    title: "아이디 기부",
    description: "스트리밍/다운로드용 계정 기부",
    icon: Heart,
    color: "bg-red-500",
    links: [
      { name: "아이디 기부 양식", url: "#" },
      { name: "기부 현황", url: "#" },
    ],
    tips: [
      "개인정보 제거 후 기부",
      "이용권 만료 계정도 가능",
      "복수 계정 기부 환영"
    ]
  },
  {
    id: "radio-request",
    title: "라디오 신청",
    description: "각종 라디오 프로그램에 신곡 신청",
    icon: Radio,
    color: "bg-green-500",
    links: [
      { name: "보이는 라디오", url: "https://www.imbc.com/broad/radio/fm4u/jsy/" },
      { name: "두시탈출 컬투쇼", url: "https://www.sbs.co.kr/radio/cultwoshow/" },
      { name: "배철수의 음악캠프", url: "https://www.imbc.com/broad/radio/fm/camp/" },
    ],
    tips: [
      "사연과 함께 신청하면 확률 UP",
      "여러 프로그램 동시 신청",
      "매일 꾸준히 신청하기"
    ]
  },
  {
    id: "fundraising",
    title: "모금 안내",
    description: "컴백 지원을 위한 팬덤 모금 활동",
    icon: DollarSign,
    color: "bg-yellow-500",
    links: [
      { name: "공식 모금 안내", url: "#" },
      { name: "모금 현황 확인", url: "#" },
    ],
    tips: [
      "공식 채널 통해서만 참여",
      "투명한 사용 내역 확인",
      "소액 참여도 큰 도움"
    ]
  },
];

// 컴백 일정 데이터
const COMEBACK_SCHEDULE = [
  {
    date: "2024.03.18",
    event: "컴백 티저",
    type: "teaser",
    completed: false
  },
  {
    date: "2024.03.25",
    event: "트랙리스트 공개",
    type: "tracklist",
    completed: false
  },
  {
    date: "2024.04.01",
    event: "MV 티저",
    type: "mv",
    completed: false
  },
  {
    date: "2024.04.05",
    event: "앨범 발매",
    type: "release",
    completed: false
  },
];

// 활동 카드 컴포넌트
function ActivityCard({ activity }: { activity: typeof COMEBACK_ACTIVITIES[0] }) {
  const IconComponent = activity.icon;
  
  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* 아이콘과 제목 */}
          <div className="flex items-start gap-3">
            <div className={`w-12 h-12 ${activity.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">{activity.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
            </div>
          </div>

          {/* 링크들 */}
          <div className="space-y-2">
            {activity.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="text-sm font-medium text-gray-700">{link.name}</span>
                <ExternalLink className="w-3 h-3 text-gray-400" />
              </a>
            ))}
          </div>

          {/* 팁 */}
          <div className="pt-3 border-t border-gray-100">
            <p className="text-xs font-medium text-gray-500 mb-2">💡 TIP</p>
            <ul className="space-y-1">
              {activity.tips.map((tip, index) => (
                <li key={index} className="text-xs text-gray-600">• {tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 컴백 일정 컴포넌트
function ComebackTimeline() {
  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          컴백 일정
        </h2>
        
        <div className="space-y-3">
          {COMEBACK_SCHEDULE.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${
                item.completed ? 'bg-green-500' : 'bg-gray-300'
              }`} />
              <div className="flex-1 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.event}</p>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
                {item.type === 'release' && (
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// 첫 주 미션 컴포넌트
function FirstWeekMission() {
  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
      <CardContent className="p-4">
        <h2 className="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
          <Gift className="w-5 h-5" />
          컴백 첫 주 필수 미션
        </h2>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
              1
            </div>
            <div>
              <p className="text-sm font-medium text-purple-900">음원 발매 즉시 다운로드</p>
              <p className="text-xs text-purple-700">첫 1시간이 가장 중요해요!</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
              2
            </div>
            <div>
              <p className="text-sm font-medium text-purple-900">24시간 스트리밍</p>
              <p className="text-xs text-purple-700">첫날 차트 진입이 목표!</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
              3
            </div>
            <div>
              <p className="text-sm font-medium text-purple-900">MV 조회수 올리기</p>
              <p className="text-xs text-purple-700">24시간 내 100만뷰 도전!</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
              4
            </div>
            <div>
              <p className="text-sm font-medium text-purple-900">SNS 홍보 & 공유</p>
              <p className="text-xs text-purple-700">해시태그와 함께 널리 알려주세요</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-purple-200">
          <p className="text-xs text-purple-800 font-medium">
            🎯 목표: 멜론 TOP 10 진입 & 음악방송 1위
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// 지원 방법 안내
function SupportGuide() {
  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Headphones className="w-5 h-5" />
          컴백 지원 가이드
        </h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-green-600" />
              음원 구매 가이드
            </h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• 멜론: 다운로드 + 스트리밍 이용권 구매</li>
              <li>• 지니: 전곡 다운로드 추천</li>
              <li>• 애플뮤직: 앨범 단위 구매</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-purple-600" />
              앨범 구매 가이드
            </h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• 한터차트 인증샵에서 구매</li>
              <li>• 초동(발매 첫 주) 기간 내 구매</li>
              <li>• 여러 버전 구매시 차트 반영</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ComebackPage() {
  return (
    <div className="mx-auto w-full max-w-screen-sm px-4 pb-20">
      <PageHeader
        title="컴백 지원 센터"
        description="DAY6의 성공적인 컴백을 위해 함께 준비해요!"
        enableShare={true}
        shareSlug=""
      />

      <div className="mt-6 space-y-6">
        {/* 첫 주 미션 */}
        <FirstWeekMission />
        
        {/* 컴백 일정 */}
        <ComebackTimeline />
        
        {/* 컴백 지원 활동들 */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">🎤 컴백 지원 활동</h2>
          <div className="grid gap-4">
            {COMEBACK_ACTIVITIES.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
        
        {/* 지원 가이드 */}
        <SupportGuide />
      </div>
    </div>
  );
}