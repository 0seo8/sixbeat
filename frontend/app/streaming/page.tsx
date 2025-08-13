"use client";

import { ExternalLink, Play, Volume2, Music } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

// 스트리밍 플랫폼 데이터

// 플랫폼 데이터 정의
const STREAMING_PLATFORMS = {
  music: [
    { 
      id: "melon", 
      name: "멜론", 
      logo: "/ico_melon.png", 
      url: "https://www.melon.com/artist/timeline.htm?artistId=261143",
      color: "bg-green-500"
    },
    { 
      id: "genie", 
      name: "지니", 
      logo: "/Geenie.png", 
      url: "https://www.genie.co.kr/detail/artistInfo?xxartistId=80240",
      color: "bg-blue-500"
    },
    { 
      id: "bugs", 
      name: "벅스", 
      logo: "/bucks.png", 
      url: "https://music.bugs.co.kr/artist/80086",
      color: "bg-red-500"
    },
    { 
      id: "vibe", 
      name: "바이브", 
      logo: "/vibe.jpeg", 
      url: "https://vibe.naver.com/artist/12055",
      color: "bg-purple-500"
    },
    { 
      id: "flo", 
      name: "플로", 
      logo: "/fillo.png", 
      url: "https://www.music-flo.com/detail/artist/eyunnqoyqx",
      color: "bg-orange-500"
    },
    { 
      id: "youtube-music", 
      name: "유튜브뮤직", 
      logo: "/file.svg", 
      url: "https://music.youtube.com/channel/UCp-pqXsizklX3ZHvLxXyhxw",
      color: "bg-red-600"
    },
    { 
      id: "apple-music", 
      name: "애플뮤직", 
      logo: "/file.svg", 
      url: "https://music.apple.com/kr/artist/day6/1039275369",
      color: "bg-gray-800"
    },
    { 
      id: "spotify", 
      name: "스포티파이", 
      logo: "/file.svg", 
      url: "https://open.spotify.com/artist/5TnQc2N1iKlFjYD7CPGvFc",
      color: "bg-green-600"
    },
    { 
      id: "stationhead", 
      name: "스테이션헤드", 
      logo: "/file.svg", 
      url: "https://www.stationhead.com",
      color: "bg-indigo-600"
    },
  ],
  mv: [
    { 
      id: "youtube", 
      name: "유튜브", 
      logo: "/file.svg", 
      url: "https://www.youtube.com/@day6official",
      color: "bg-red-600"
    },
  ]
};

const getPlatformLogo = (platform: string) => {
  const logos: Record<string, string> = {
    melon: "/ico_melon.png",
    genie: "/Geenie.png", 
    bugs: "/bucks.png",
    vibe: "/vibe.jpeg",
    flo: "/fillo.png",
    "apple-music": "/file.svg",
    spotify: "/file.svg",
    "youtube-music": "/file.svg",
    youtube: "/file.svg",
  };
  return logos[platform] || "/file.svg";
};

// 플랫폼 카드 컴포넌트
function PlatformCard({ platform }: { platform: typeof STREAMING_PLATFORMS.music[0] }) {
  return (
    <a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full"
    >
      <Card className="hover:shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer">
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* 플랫폼 로고/아이콘 영역 */}
            <div className={`w-full h-16 ${platform.color} rounded-lg flex items-center justify-center`}>
              {platform.logo !== "/file.svg" ? (
                <Image
                  src={platform.logo}
                  alt={platform.name}
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain filter brightness-0 invert"
                />
              ) : (
                <div className="text-2xl text-white">
                  {platform.id.includes('youtube') ? '📺' : '🎵'}
                </div>
              )}
            </div>

            {/* 플랫폼 정보 */}
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 text-sm">
                {platform.name}
              </h3>
              <div className="flex items-center justify-center mt-2 text-xs text-gray-500">
                <ExternalLink className="w-3 h-3 mr-1" />
                <span>바로 스트리밍</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}

// 카테고리별 섹션 컴포넌트
function StreamingCategorySection({
  categoryKey,
  items,
  title,
  description,
  icon,
}: {
  categoryKey: string;
  items: typeof GUIDE_CATEGORIES;
  title: string;
  description: string;
  icon: string;
}) {
  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <span>{icon}</span>
          {title}
        </h2>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>

      {/* 가로 스크롤 카드 컨테이너 */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-3 min-w-max">
          {items.map((item) => (
            <Link key={item.slug} href={`/guide/${item.slug}`}>
              <Card className="w-40 flex-shrink-0 hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* 플랫폼 로고/아이콘 영역 */}
                    <div className="w-full h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                      {getPlatformLogo(item.slug) !== "/file.svg" ? (
                        <Image
                          src={getPlatformLogo(item.slug)}
                          alt={item.label}
                          width={32}
                          height={32}
                          className="w-8 h-8 object-contain"
                        />
                      ) : (
                        <div className="text-2xl">
                          {categoryKey === "music-streaming" ? "🎵" : "📺"}
                        </div>
                      )}
                    </div>

                    {/* 제목 및 설명 */}
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm leading-tight">
                        {item.label}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {categoryKey === "streaming-list"
                          ? "전체 스트리밍 플랫폼"
                          : categoryKey === "music-streaming"
                          ? `${item.label}에서 스트리밍`
                          : `${item.label} 뮤직비디오`}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function StreamingTipsSection() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <span>💡</span>
          스트리밍 가이드
        </h2>
        <p className="text-sm text-gray-600 mt-1">효과적인 스트리밍을 위한 팁들</p>
      </div>

      {/* 가로 스크롤 팁 카드 */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-3 min-w-max">
          {/* YouTube 팁 카드 */}
          <Card className="w-64 flex-shrink-0">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="w-full h-16 bg-red-50 rounded-lg flex items-center justify-center">
                  <Play className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">YouTube 스트리밍</h3>
                  <div className="mt-2 text-xs text-gray-600 space-y-1">
                    <div>• 음소거 금지, 최소 음량으로</div>
                    <div>• 끝까지 시청하기</div>
                    <div>• 좋아요 & 댓글 남기기</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 음원 스트리밍 팁 카드 */}
          <Card className="w-64 flex-shrink-0">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="w-full h-16 bg-green-50 rounded-lg flex items-center justify-center">
                  <Volume2 className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">음원 플랫폼</h3>
                  <div className="mt-2 text-xs text-gray-600 space-y-1">
                    <div>• 30초 이상 재생</div>
                    <div>• 다양한 곡 섞어 듣기</div>
                    <div>• 적절한 간격 유지</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 주의사항 카드 */}
          <Card className="w-64 flex-shrink-0 border-red-200">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="w-full h-16 bg-red-50 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div>
                  <h3 className="font-medium text-red-700 text-sm">주의사항</h3>
                  <div className="mt-2 text-xs text-red-600 space-y-1">
                    <div>• 로봇 재생 패턴 금지</div>
                    <div>• 다중 계정 동시 재생 금지</div>
                    <div>• 스트리밍 프로그램 금지</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function StreamingPage() {
  return (
    <div>
      {/* Content with same padding as homepage */}
      <div className="px-5 md:px-6 lg:px-8 xl:px-12 space-y-6 pt-6">
        
        {/* Section Header - same style as homepage */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              스트리밍
            </h2>
            <p className="text-xs md:text-sm text-gray-500">
              DAY6 음원 및 뮤직비디오 스트리밍
            </p>
          </div>
          <div className="text-gray-300">
            <ExternalLink className="h-5 w-5" />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="music" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="music">음원 스트리밍</TabsTrigger>
            <TabsTrigger value="mv">MV 스트리밍</TabsTrigger>
          </TabsList>

          {/* 음원 스트리밍 탭 */}
          <TabsContent value="music" className="mt-6">
            <div className="space-y-6">
              {/* Music Platforms Grid - similar to QuickAccessCard */}
              <Card>
                <CardContent className="p-0">
                  <div className="grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                    {STREAMING_PLATFORMS.music.map((platform) => (
                      <Button
                        key={platform.id}
                        asChild
                        variant="ghost"
                        className="flex flex-col items-center p-3 h-auto border border-gray-100 hover:border-gray-200"
                      >
                        <a href={platform.url} target="_blank" rel="noopener noreferrer">
                          <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center mb-2 ${platform.color} overflow-hidden`}>
                            {platform.logo !== "/file.svg" ? (
                              <Image
                                src={platform.logo}
                                alt={platform.name}
                                width={28}
                                height={28}
                                className="rounded object-cover filter brightness-0 invert"
                              />
                            ) : (
                              <Music className="w-6 h-6 text-white" />
                            )}
                          </div>
                          <span className="text-xs lg:text-sm font-medium text-gray-700 text-center">
                            {platform.name}
                          </span>
                        </a>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Streaming Tips */}
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Volume2 className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-green-900 mb-2">음원 스트리밍 팁</h3>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• 30초 이상 재생하기</li>
                        <li>• 다양한 곡 섞어 듣기</li>
                        <li>• 적절한 간격 유지하기</li>
                        <li>• 로봇 재생 패턴 피하기</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* MV 스트리밍 탭 */}
          <TabsContent value="mv" className="mt-6">
            <div className="space-y-6">
              {/* YouTube Platform */}
              <Card>
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 gap-3 max-w-sm mx-auto">
                    {STREAMING_PLATFORMS.mv.map((platform) => (
                      <Button
                        key={platform.id}
                        asChild
                        variant="ghost"
                        className="flex flex-col items-center p-6 h-auto border border-gray-100 hover:border-gray-200"
                      >
                        <a href={platform.url} target="_blank" rel="noopener noreferrer">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${platform.color}`}>
                            <Play className="w-8 h-8 text-white" />
                          </div>
                          <span className="text-base font-medium text-gray-700 text-center">
                            {platform.name}
                          </span>
                          <span className="text-sm text-gray-500 mt-1">
                            뮤직비디오 스트리밍
                          </span>
                        </a>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* YouTube Tips */}
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-red-900 mb-2">YouTube 스트리밍 팁</h3>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• 음소거 금지, 최소 음량으로 설정</li>
                        <li>• 영상 끝까지 시청하기</li>
                        <li>• 좋아요 & 댓글 남기기</li>
                        <li>• 다른 영상들도 함께 시청</li>
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