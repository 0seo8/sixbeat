"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, ExternalLink, Music, Video } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import Image from "next/image";

// 다운로드 플랫폼 데이터
const DOWNLOAD_PLATFORMS = {
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
      id: "kakao-music", 
      name: "카카오뮤직", 
      logo: "/file.svg", 
      url: "https://www.melon.com",
      color: "bg-yellow-500"
    },
    { 
      id: "v-coloring", 
      name: "V컬러링", 
      logo: "/file.svg", 
      url: "https://www.vcoloring.com",
      color: "bg-pink-500"
    },
  ],
  mv: [
    { 
      id: "melon", 
      name: "멜론", 
      logo: "/ico_melon.png", 
      url: "https://www.melon.com/artist/timeline.htm?artistId=261143",
      color: "bg-green-500"
    },
    { 
      id: "bugs", 
      name: "벅스", 
      logo: "/bucks.png", 
      url: "https://music.bugs.co.kr/artist/80086",
      color: "bg-red-500"
    },
  ]
};

// 플랫폼 카드 컴포넌트
function PlatformCard({ platform }: { platform: typeof DOWNLOAD_PLATFORMS.music[0] }) {
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
                <Download className="w-6 h-6 text-white" />
              )}
            </div>

            {/* 플랫폼 정보 */}
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 text-sm">
                {platform.name}
              </h3>
              <div className="flex items-center justify-center mt-2 text-xs text-gray-500">
                <ExternalLink className="w-3 h-3 mr-1" />
                <span>다운로드</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}

// 다운로드 안내 섹션
function DownloadTipsSection() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <span>💡</span>
          다운로드 가이드
        </h2>
        <p className="text-sm text-gray-600 mt-1">음원 다운로드 시 주의사항</p>
      </div>

      {/* 가로 스크롤 팁 카드 */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-3 min-w-max">
          {/* 음원 다운로드 팁 */}
          <Card className="w-64 flex-shrink-0">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="w-full h-16 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Music className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">음원 다운로드</h3>
                  <div className="mt-2 text-xs text-gray-600 space-y-1">
                    <div>• 이용권 구매 후 다운로드</div>
                    <div>• 고음질 설정 권장</div>
                    <div>• 전곡 다운로드 추천</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* MV 다운로드 팁 */}
          <Card className="w-64 flex-shrink-0">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="w-full h-16 bg-purple-50 rounded-lg flex items-center justify-center">
                  <Video className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">MV 다운로드</h3>
                  <div className="mt-2 text-xs text-gray-600 space-y-1">
                    <div>• HD 화질로 다운로드</div>
                    <div>• 공식 MV 우선</div>
                    <div>• 스페셜 클립도 함께</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 주의사항 */}
          <Card className="w-64 flex-shrink-0 border-orange-200">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="w-full h-16 bg-orange-50 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div>
                  <h3 className="font-medium text-orange-700 text-sm">주의사항</h3>
                  <div className="mt-2 text-xs text-orange-600 space-y-1">
                    <div>• 정식 구매만 차트 반영</div>
                    <div>• 불법 다운로드 금지</div>
                    <div>• 이용권 확인 필수</div>
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

export default function DownloadPage() {
  return (
    <div>
      {/* Content with same padding as homepage */}
      <div className="px-5 md:px-6 lg:px-8 xl:px-12 space-y-6 pt-6">
        
        {/* Section Header - same style as homepage */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              다운로드
            </h2>
            <p className="text-xs md:text-sm text-gray-500">
              DAY6 음원 및 뮤직비디오 다운로드
            </p>
          </div>
          <div className="text-gray-300">
            <ExternalLink className="h-5 w-5" />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="music" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="music">음원 다운로드</TabsTrigger>
            <TabsTrigger value="mv">MV 다운로드</TabsTrigger>
          </TabsList>

          {/* 음원 다운로드 탭 */}
          <TabsContent value="music" className="mt-6">
            <div className="space-y-6">
              {/* Music Download Platforms Grid */}
              <Card>
                <CardContent className="p-0">
                  <div className="grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                    {DOWNLOAD_PLATFORMS.music.map((platform) => (
                      <a
                        key={platform.id}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-3 hover:bg-gray-50 transition-colors border border-gray-100 hover:border-gray-200 rounded-lg"
                      >
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
                            <Download className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <span className="text-xs lg:text-sm font-medium text-gray-700 text-center">
                          {platform.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Download Tips */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Music className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-blue-900 mb-2">음원 다운로드 팁</h3>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• 이용권 구매 후 다운로드</li>
                        <li>• 고음질 설정 권장</li>
                        <li>• 전곡 다운로드로 차트 지원</li>
                        <li>• 정식 구매만 차트 반영됨</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* MV 다운로드 탭 */}
          <TabsContent value="mv" className="mt-6">
            <div className="space-y-6">
              {/* MV Download Platforms */}
              <Card>
                <CardContent className="p-0">
                  <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                    {DOWNLOAD_PLATFORMS.mv.map((platform) => (
                      <a
                        key={platform.id}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-6 hover:bg-gray-50 transition-colors border border-gray-100 hover:border-gray-200 rounded-lg"
                      >
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${platform.color} overflow-hidden`}>
                          <Image
                            src={platform.logo}
                            alt={platform.name}
                            width={32}
                            height={32}
                            className="rounded object-cover filter brightness-0 invert"
                          />
                        </div>
                        <span className="text-base font-medium text-gray-700 text-center">
                          {platform.name}
                        </span>
                        <span className="text-sm text-gray-500 mt-1">
                          MV 다운로드
                        </span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* MV Download Tips */}
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Video className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-purple-900 mb-2">MV 다운로드 팁</h3>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• HD 화질로 다운로드</li>
                        <li>• 공식 MV 우선 다운로드</li>
                        <li>• 스페셜 클립도 함께 수집</li>
                        <li>• 불법 다운로드 절대 금지</li>
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