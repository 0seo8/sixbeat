'use client';

import { Button } from '@/components/ui/button';
import { 
  BookOpen, Clock, User, Music, Vote, Play, 
  Heart, Share2, AlertTriangle, CheckCircle, 
  Smartphone, Globe, Star, ArrowRight, 
  MessageCircle, Headphones, Trophy
} from 'lucide-react';

function QuickStartGuide() {
  const steps = [
    {
      icon: User,
      title: '계정 준비',
      description: '각 음원 플랫폼에 계정을 생성하고 로그인하세요',
      details: [
        '멜론, 지니, 벅스, 바이브, FLO 계정 생성',
        '이용권 구매 (월 이용권 권장)',
        '프로필 설정 완료'
      ],
      time: '10분',
      difficulty: 'easy'
    },
    {
      icon: Music,
      title: '스트리밍 시작',
      description: 'DAY6 곡들을 자연스럽게 들으며 스트리밍하세요',
      details: [
        '30초 이상 재생 필수',
        '다른 곡들과 섞어서 재생',
        '음소거 금지, 최소 음량이라도 켜두기'
      ],
      time: '계속',
      difficulty: 'easy'
    },
    {
      icon: Vote,
      title: '투표 참여',
      description: '음악방송 사전투표와 각종 시상식에 참여하세요',
      details: [
        '엠카운트다운, 뮤직뱅크 등 사전투표',
        'MMA, MAMA 등 시상식 투표',
        '매일 정해진 시간에 투표'
      ],
      time: '5분/일',
      difficulty: 'medium'
    },
    {
      icon: Play,
      title: 'YouTube 스트리밍',
      description: 'MV와 퍼포먼스 영상을 시청하여 조회수를 올려주세요',
      details: [
        'MV 끝까지 시청',
        '좋아요와 댓글 남기기',
        '공유를 통한 확산'
      ],
      time: '10분/일',
      difficulty: 'easy'
    },
    {
      icon: Share2,
      title: 'SNS 홍보',
      description: 'SNS에서 DAY6를 알리고 스트리밍을 독려하세요',
      details: [
        '해시태그와 함께 포스팅',
        '스트리밍 인증샷 공유',
        '팬들과 정보 공유'
      ],
      time: '5분/일',
      difficulty: 'medium'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'hard': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '쉬움';
      case 'medium': return '보통';
      case 'hard': return '어려움';
      default: return '보통';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-4 md:p-5 border-b border-gray-100">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600" />
          5분 완성! 초보자 가이드
        </h2>
        <p className="text-gray-600 mt-1">
          DAY6 응원이 처음이신가요? 차근차근 따라해보세요!
        </p>
      </div>
      <div className="p-4 md:p-5">
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <step.icon className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(step.difficulty)}`}>
                    {getDifficultyText(step.difficulty)}
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">{step.time}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                <ul className="space-y-1">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-gray-900">성공 팁!</span>
          </div>
          <p className="text-sm text-gray-600">
            처음에는 부담스러울 수 있지만, 하나씩 차근차근 시작해보세요. 
            무엇보다 DAY6의 음악을 사랑하는 마음이 가장 중요합니다! 💙
          </p>
        </div>
      </div>
    </div>
  );
}

function DetailedGuides() {
  const guides = [
    {
      icon: Headphones,
      title: '효과적인 스트리밍 방법',
      category: '스트리밍',
      items: [
        '각 플랫폼별 차트 반영 시간 이해하기',
        '자연스러운 재생 패턴 만들기',
        '플레이리스트 구성 방법',
        '여러 기기 활용하기 (단, 과도하지 않게)',
        '스트리밍 효율 높이는 시간대'
      ],
      tips: [
        '실시간 차트: 매시간 정각 업데이트',
        '일간 차트: 자정에 업데이트',
        '주간 차트: 매주 월요일 업데이트'
      ]
    },
    {
      icon: Vote,
      title: '투표 완전 정복',
      category: '투표',
      items: [
        '각 음악방송별 사전투표 방법',
        '시상식 투표 일정 체크하기',
        '글로벌 투표 플랫폼 활용하기',
        '투표 포인트 효율적으로 모으기',
        '마감 임박 시 전략'
      ],
      tips: [
        '사전투표는 보통 방송 3-7일 전 마감',
        '시상식은 몇 달 전부터 시작하는 경우가 많음',
        'SNS 미션으로 추가 포인트 획득 가능'
      ]
    },
    {
      icon: MessageCircle,
      title: 'SNS 홍보 전략',
      category: 'SNS',
      items: [
        '효과적인 해시태그 사용법',
        '스트리밍 인증샷 찍는 방법',
        '팬아트와 함께 홍보하기',
        '트렌드에 맞는 컨텐츠 제작',
        '다른 팬들과 연대하기'
      ],
      tips: [
        '#DAY6 #데이식스 등 공식 해시태그 필수',
        '곡명 해시태그도 함께 사용',
        '긍정적이고 사랑스러운 메시지 권장'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {guides.map((guide, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-4 md:p-5 border-b border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
                <guide.icon className="h-5 w-5 text-blue-600" />
                {guide.title}
              </h3>
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">{guide.category}</span>
            </div>
          </div>
          <div className="p-4 md:p-5">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">상세 가이드</h4>
                <ul className="space-y-2">
                  {guide.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-sm">
                      <ArrowRight className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  핵심 팁
                </h4>
                <ul className="space-y-1">
                  {guide.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="text-sm text-gray-600">
                      • {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ImportantWarnings() {
  const warnings = [
    {
      title: '스트리밍 시 주의사항',
      items: [
        '로봇이나 매크로 프로그램 사용 금지',
        '동시에 여러 계정으로 재생하지 않기',
        '음소거 상태로 재생하지 않기',
        '너무 빠른 속도로 곡 넘기지 않기',
        'VPN 사용 시 차트 반영 불가 가능성'
      ]
    },
    {
      title: '투표 시 주의사항',
      items: [
        '중복 계정 생성하여 투표 금지',
        '투표 조작 프로그램 사용 금지',
        '마감 시간 정확히 확인하기',
        '플랫폼 규정 위반하지 않기',
        '과도한 계정 생성으로 인한 제재 주의'
      ]
    },
    {
      title: 'SNS 활동 시 주의사항',
      items: [
        '다른 아티스트 비방 절대 금지',
        '허위 정보 유포하지 않기',
        '과도한 스팸성 포스팅 자제',
        '개인정보 노출 주의',
        '건전한 팬 문화 조성하기'
      ]
    }
  ];

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg shadow-sm">
      <div className="p-4 md:p-5 border-b border-red-200">
        <h2 className="text-lg md:text-xl font-bold flex items-center gap-2 text-red-800">
          <AlertTriangle className="h-5 w-5" />
          반드시 지켜야 할 주의사항
        </h2>
        <p className="text-red-700 mt-1">
          올바른 응원 문화를 위해 다음 사항들을 꼭 지켜주세요.
        </p>
      </div>
      <div className="p-4 md:p-5">
        <div className="space-y-6">
          {warnings.map((warning, index) => (
            <div key={index}>
              <h4 className="font-medium text-red-800 mb-3">{warning.title}</h4>
              <ul className="space-y-2">
                {warning.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2 text-sm">
                    <span className="text-red-600 font-bold">⚠️</span>
                    <span className="text-red-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  const faqs = [
    {
      question: 'Q. 스트리밍은 하루에 얼마나 해야 하나요?',
      answer: '정해진 시간은 없지만, 자연스럽게 음악을 들으시는 패턴으로 하루에 1-2시간 정도면 충분합니다. 무리하지 마세요!'
    },
    {
      question: 'Q. 여러 플랫폼에 모두 가입해야 하나요?',
      answer: '모든 플랫폼에 가입할 필요는 없습니다. 본인이 주로 사용하는 1-2개 플랫폼에서 꾸준히 하시는 것이 더 효과적입니다.'
    },
    {
      question: 'Q. 투표는 언제 하는 것이 가장 좋나요?',
      answer: '투표 시작 직후와 마감 직전이 중요합니다. 하지만 매일 꾸준히 하는 것이 가장 중요해요.'
    },
    {
      question: 'Q. 무료 이용권으로도 스트리밍이 가능한가요?',
      answer: '무료 이용권으로도 가능하지만, 광고나 재생 제한이 있을 수 있습니다. 가능하면 월 이용권을 추천합니다.'
    },
    {
      question: 'Q. 해외에서도 스트리밍이 차트에 반영되나요?',
      answer: '대부분의 한국 음원 사이트는 국내 IP만 인정합니다. 해외에 계신다면 YouTube 스트리밍에 집중하세요.'
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-4 md:p-5 border-b border-gray-100">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-blue-600" />
          자주 묻는 질문 (FAQ)
        </h2>
      </div>
      <div className="p-4 md:p-5">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
              <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
              <p className="text-sm text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GuidePage() {
  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
          DAY6 응원 가이드
        </h1>
        <p className="text-gray-600">
          효과적인 스트리밍과 투표 방법을 배우고 DAY6와 함께 성장해요!
        </p>
      </div>

      {/* 초보자 가이드 */}
      <QuickStartGuide />

      {/* 상세 가이드 */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
          <Trophy className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
          심화 가이드
        </h2>
        <DetailedGuides />
      </div>

      {/* 주의사항 */}
      <ImportantWarnings />

      {/* FAQ */}
      <FAQ />

      {/* 마무리 메시지 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
        <div className="p-6 md:p-8">
          <div className="text-center">
            <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">함께 만들어가는 DAY6의 성장</h3>
            <p className="text-gray-600 mb-4">
              여러분의 작은 참여가 모여 DAY6의 큰 성과를 만듭니다.<br />
              건전하고 즐거운 응원 문화를 함께 만들어가요! 💙
            </p>
            <div className="flex justify-center gap-2">
              <Button asChild>
                <a href="/">홈으로 돌아가기</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/streaming">스트리밍 시작하기</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}