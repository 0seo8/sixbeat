"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Vote,
  ExternalLink,
  Clock,
  Trophy,
  Tv,
  AlertCircle,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import Image from "next/image";

// 음악방송 투표 데이터
const MUSIC_SHOWS = [
  {
    id: "the-show",
    name: "더쇼",
    day: "화요일",
    time: "18:00",
    platform: "SBS M",
    voteUrl: "https://www.sbs.co.kr/sbsmtv/theshow",
    logo: "/file.svg",
    color: "bg-pink-500",
    description: "더쇼 초이스 투표"
  },
  {
    id: "show-champion",
    name: "쇼챔피언",
    day: "수요일",
    time: "18:00",
    platform: "MBC M",
    voteUrl: "https://www.mbcplus.com/showchampion",
    logo: "/file.svg",
    color: "bg-blue-500",
    description: "쇼챔피언 투표"
  },
  {
    id: "mcountdown",
    name: "엠카운트다운",
    day: "목요일",
    time: "18:00",
    platform: "Mnet",
    voteUrl: "https://www.mnet.com/tv/program/387",
    logo: "/file.svg",
    color: "bg-red-500",
    description: "M카운트다운 사전투표"
  },
  {
    id: "music-bank",
    name: "뮤직뱅크",
    day: "금요일",
    time: "17:00",
    platform: "KBS 2TV",
    voteUrl: "https://www.kbs.co.kr/2tv/enter/musicbank",
    logo: "/file.svg",
    color: "bg-green-500",
    description: "K-차트 투표"
  },
  {
    id: "music-core",
    name: "음악중심",
    day: "토요일",
    time: "15:25",
    platform: "MBC",
    voteUrl: "https://www.imbc.com/broad/tv/ent/musiccore",
    logo: "/file.svg",
    color: "bg-purple-500",
    description: "음악중심 투표",
    hasSMS: true,
    smsInfo: "#0011(유료)"
  },
  {
    id: "inkigayo",
    name: "인기가요",
    day: "일요일",
    time: "15:40",
    platform: "SBS",
    voteUrl: "https://programs.sbs.co.kr/enter/gayo",
    logo: "/file.svg",
    color: "bg-orange-500",
    description: "인기가요 투표"
  },
];

// 시상식 투표 데이터
const AWARD_SHOWS = [
  {
    id: "mama",
    name: "MAMA Awards",
    date: "2024.11.21-22",
    voteUrl: "https://mama.mwave.me",
    logo: "/file.svg",
    color: "bg-black",
    status: "upcoming"
  },
  {
    id: "aaa",
    name: "Asia Artist Awards",
    date: "2024.12.27",
    voteUrl: "https://www.asiaartistawards.com",
    logo: "/file.svg",
    color: "bg-gold-500",
    status: "upcoming"
  },
  {
    id: "gda",
    name: "Golden Disc Awards",
    date: "2025.01.04-05",
    voteUrl: "https://www.goldendisc.co.kr",
    logo: "/file.svg",
    color: "bg-yellow-500",
    status: "upcoming"
  },
  {
    id: "sma",
    name: "Seoul Music Awards",
    date: "2025.01.02",
    voteUrl: "https://www.seoulmusicawards.com",
    logo: "/file.svg",
    color: "bg-blue-600",
    status: "upcoming"
  },
];

// 음악방송 카드 컴포넌트
function MusicShowCard({ show }: { show: typeof MUSIC_SHOWS[0] }) {
  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* 방송사 로고/색상 영역 */}
          <div className={`w-full h-12 ${show.color} rounded-lg flex items-center justify-center`}>
            <span className="text-white font-bold text-sm">{show.platform}</span>
          </div>

          {/* 방송 정보 */}
          <div>
            <h3 className="font-bold text-gray-900">{show.name}</h3>
            <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
              <Calendar className="w-3 h-3" />
              <span>{show.day} {show.time}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{show.description}</p>
          </div>

          {/* 버튼들 */}
          <div className="space-y-2">
            <a
              href={show.voteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Vote className="w-4 h-4" />
              투표하기
              <ExternalLink className="w-3 h-3" />
            </a>
            
            {show.hasSMS && (
              <div className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm">
                <MessageSquare className="w-4 h-4" />
                <span>문자투표: {show.smsInfo}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 시상식 카드 컴포넌트
function AwardCard({ award }: { award: typeof AWARD_SHOWS[0] }) {
  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* 시상식 로고/색상 영역 */}
          <div className={`w-full h-16 ${award.color === 'bg-black' ? 'bg-gray-900' : award.color} rounded-lg flex items-center justify-center`}>
            <Trophy className="w-8 h-8 text-white" />
          </div>

          {/* 시상식 정보 */}
          <div>
            <h3 className="font-bold text-gray-900">{award.name}</h3>
            <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
              <Calendar className="w-3 h-3" />
              <span>{award.date}</span>
            </div>
            {award.status === 'upcoming' && (
              <span className="inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                예정
              </span>
            )}
          </div>

          {/* 투표 버튼 */}
          <a
            href={award.voteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all text-sm font-medium"
          >
            <Trophy className="w-4 h-4" />
            투표하기
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

// 투표 가이드 섹션
function VotingTipsSection() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <span>💡</span>
          투표 가이드
        </h2>
        <p className="text-sm text-gray-600 mt-1">효과적인 투표를 위한 팁</p>
      </div>

      <div className="grid gap-3">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-medium text-blue-900 mb-2">음악방송 투표</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 사전투표는 방송 전날까지</li>
              <li>• 생방송 문자투표 준비 필수</li>
              <li>• 매주 정기적으로 참여</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <h3 className="font-medium text-purple-900 mb-2">시상식 투표</h3>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• 투표 기간이 길어 꾸준함이 중요</li>
              <li>• 여러 계정 활용 가능</li>
              <li>• SNS 공유로 추가 투표권 획득</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <h3 className="font-medium text-red-900 mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              주의사항
            </h3>
            <ul className="text-sm text-red-800 space-y-1">
              <li>• 부정투표 금지 (계정 정지 위험)</li>
              <li>• 투표 마감시간 확인 필수</li>
              <li>• 공식 사이트에서만 투표</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function VotesPage() {
  return (
    <div>
      {/* Content with same padding as homepage */}
      <div className="px-5 md:px-6 lg:px-8 xl:px-12 space-y-6 pt-6">
        
        {/* Section Header - same style as homepage */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              투표
            </h2>
            <p className="text-xs md:text-sm text-gray-500">
              음악방송 및 시상식 투표
            </p>
          </div>
          <div className="text-gray-300">
            <ExternalLink className="h-5 w-5" />
          </div>
        </div>

        {/* Current Voting Status */}
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
          <CardContent className="p-0">
            <div className="p-4 text-center">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                <Vote className="w-4 h-4" />
                <span>이번 주 투표</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                음악방송 1위 도전
              </h3>
              <div className="flex items-center justify-center gap-2 text-purple-600">
                <Clock className="w-4 h-4" />
                <span className="font-medium">투표 마감 임박</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="music-shows" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="music-shows">음악방송</TabsTrigger>
            <TabsTrigger value="awards">시상식</TabsTrigger>
          </TabsList>

          {/* 음악방송 탭 */}
          <TabsContent value="music-shows" className="mt-6">
            <div className="space-y-6">
              {/* Music Shows Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MUSIC_SHOWS.map((show) => (
                  <Card key={show.id} className="hover:shadow-md transition-shadow duration-200">
                    <CardContent className="p-0">
                      <div className="p-3 md:p-4 space-y-3">
                        {/* Show Info */}
                        <div className="flex items-start gap-3">
                          <div className={`w-12 h-12 ${show.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <Tv className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900">{show.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{show.platform}</p>
                            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span>{show.day} {show.time}</span>
                            </div>
                          </div>
                        </div>

                        {/* Vote Button */}
                        <div className="space-y-2">
                          <a
                            href={show.voteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                          >
                            <Vote className="w-4 h-4" />
                            투표하기
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          
                          {show.hasSMS && (
                            <div className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs">
                              <MessageSquare className="w-4 h-4" />
                              <span>문자투표: {show.smsInfo}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Music Show Voting Tips */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Tv className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-blue-900 mb-2">음악방송 투표 팁</h3>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• 사전투표는 방송 전날까지</li>
                        <li>• 생방송 문자투표 준비 필수</li>
                        <li>• 매주 정기적으로 참여하기</li>
                        <li>• 투표 마감시간 꼭 확인하기</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 시상식 탭 */}
          <TabsContent value="awards" className="mt-6">
            <div className="space-y-6">
              {/* Award Shows Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {AWARD_SHOWS.map((award) => (
                  <Card key={award.id} className="hover:shadow-md transition-shadow duration-200">
                    <CardContent className="p-0">
                      <div className="p-3 md:p-4 space-y-3">
                        {/* Award Info */}
                        <div className="flex items-start gap-3">
                          <div className={`w-12 h-12 ${award.color === 'bg-black' ? 'bg-gray-900' : award.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <Trophy className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900">{award.name}</h3>
                            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                              <Calendar className="w-3 h-3" />
                              <span>{award.date}</span>
                            </div>
                            {award.status === 'upcoming' && (
                              <span className="inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                예정
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Vote Button */}
                        <a
                          href={award.voteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all text-sm font-medium"
                        >
                          <Trophy className="w-4 h-4" />
                          투표하기
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Award Show Voting Tips */}
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Trophy className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-purple-900 mb-2">시상식 투표 팁</h3>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• 투표 기간이 길어 꾸준함이 중요</li>
                        <li>• 여러 계정 활용 가능</li>
                        <li>• SNS 공유로 추가 투표권 획득</li>
                        <li>• 공식 사이트에서만 투표하기</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

      </div>
      
      {/* Bottom spacing for mobile nav */}
      <div className="h-20 md:h-8"></div>
    </div>
  );
}