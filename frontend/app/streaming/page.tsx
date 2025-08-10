"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Play,
  Smartphone,
  Globe,
  ExternalLink,
  Heart,
  AlertTriangle,
  CheckCircle,
  Star,
  Zap,
  Volume2,
} from "lucide-react";
import { StreamingPlatform } from "@/lib/types";
import { PageHeader } from "@/components/common/page-header";

interface ExtendedStreamingPlatform extends StreamingPlatform {
  isActive?: boolean;
}

const streamingPlatforms: ExtendedStreamingPlatform[] = [
  {
    id: "melon",
    name: "멜론",
    appLink: "melonapp://chart",
    webLink: "https://www.melon.com/chart/index.htm",
    playlist: "https://www.melon.com",
    icon: "🎵",
    isActive: true,
  },
  {
    id: "genie",
    name: "지니뮤직",
    appLink: "genie://chart",
    webLink: "https://www.genie.co.kr/chart/top200",
    playlist: "https://www.genie.co.kr",
    icon: "🎶",
    isActive: true,
  },
  {
    id: "bugs",
    name: "벅스뮤직",
    appLink: "bugs://chart",
    webLink: "https://music.bugs.co.kr/chart",
    playlist: "https://music.bugs.co.kr",
    icon: "🐛",
    isActive: false,
  },
  {
    id: "vibe",
    name: "바이브",
    appLink: "vibeapp://chart",
    webLink: "https://vibe.naver.com/chart",
    playlist: "https://vibe.naver.com",
    icon: "📻",
    isActive: false,
  },
  {
    id: "flo",
    name: "FLO",
    appLink: "flo://chart",
    webLink: "https://www.music-flo.com/chart",
    playlist: "https://www.music-flo.com",
    icon: "🌊",
    isActive: false,
  },
];

const youtubeVideos = [
  {
    id: "1",
    title: "Melt Down",
    type: "MV",
    url: "https://youtu.be/uFqJDgIaNNg",
  },
  {
    id: "2",
    title: "HAPPY",
    type: "MV",
    url: "https://youtu.be/ooxqwAc1dIg",
  },
  {
    id: "3",
    title: "Welcome to the Show",
    type: "MV",
    url: "https://youtu.be/3wdWk8Ph9hQ",
  },
  {
    id: "4",
    title: "You Were Beautiful",
    type: "MV",
    url: "https://youtu.be/BS7tz2rAOSA",
  },
  {
    id: "5",
    title: "Time of Our Life",
    type: "MV",
    url: "https://youtu.be/vnS_jn2uibs",
  },
  {
    id: "6",
    title: "Congratulations",
    type: "MV",
    url: "https://youtu.be/x3sFsHrUyLQ",
  },
];

function PlatformCard({ platform }: { platform: ExtendedStreamingPlatform }) {
  const getPlatformColor = (id: string) => {
    const colors: Record<string, string> = {
      melon: "bg-green-500",
      genie: "bg-blue-500",
      bugs: "bg-orange-500",
      vibe: "bg-purple-500",
      flo: "bg-pink-500",
    };
    return colors[id] || "bg-gray-500";
  };

  const isActive = platform.isActive !== false;

  return (
    <Card
      className={`transition-all ${
        isActive ? "" : "opacity-60"
      } shadow-md rounded-lg`}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg ${
                isActive ? getPlatformColor(platform.id) : "bg-gray-300"
              }`}
            >
              {platform.icon}
            </div>
            <div>
              <h3
                className={`text-lg font-bold ${
                  isActive ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {platform.name}
              </h3>
              <p
                className={`text-sm ${
                  isActive ? "text-gray-600" : "text-gray-400"
                }`}
              >
                {isActive ? "음원 스트리밍 플랫폼" : "서비스 준비 중"}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {isActive ? (
              <>
                <a
                  href={platform.appLink}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm"
                >
                  <Smartphone className="h-4 w-4" />
                  앱으로 열기
                </a>
                <a
                  href={platform.webLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                >
                  <Globe className="h-4 w-4" />
                  웹으로 열기
                </a>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-400 rounded-lg font-medium text-sm cursor-not-allowed">
                  <Smartphone className="h-4 w-4" />
                  앱으로 열기
                </div>
                <div className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 text-gray-400 rounded-lg font-medium text-sm cursor-not-allowed">
                  <Globe className="h-4 w-4" />
                  웹으로 열기
                </div>
              </>
            )}
          </div>

          {platform.playlist &&
            (isActive ? (
              <a
                href={platform.playlist}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
              >
                <Heart className="h-4 w-4" />
                사이트 바로가기
                <ExternalLink className="h-4 w-4 ml-auto" />
              </a>
            ) : (
              <div className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-50 text-gray-400 rounded-lg font-medium text-sm cursor-not-allowed">
                <Heart className="h-4 w-4" />
                서비스 준비중
                <ExternalLink className="h-4 w-4 ml-auto opacity-50" />
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}

function YouTubeSection() {
  return (
    <Card className="p-4">
      <CardContent className="p-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
            <Play className="h-5 w-5 text-red-500" />
            YouTube 스트리밍
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {youtubeVideos.map((video) => (
            <div key={video.id} className="group">
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-gray-200 transition-colors">
                  <Play className="h-8 w-8 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm line-clamp-2 text-gray-900">
                    {video.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {video.type}
                    </span>
                    <span>DAY6 공식</span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start gap-3">
            <Volume2 className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-medium text-gray-900">
                효과적인 YouTube 스트리밍 팁
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
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
      <Card className="p-4">
        <CardContent className="p-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
              <Star className="h-5 w-5 text-blue-600" />
              스트리밍 가이드
            </h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">올바른 스트리밍</h4>
                  <p className="text-sm text-gray-600">
                    30초 이상 재생, 음소거 금지, 자연스러운 재생
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">
                    다양한 곡 섞어 듣기
                  </h4>
                  <p className="text-sm text-gray-600">
                    타겟곡만 반복하지 말고 다른 곡들과 함께 재생하세요
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">
                    적절한 간격 유지
                  </h4>
                  <p className="text-sm text-gray-600">
                    같은 곡을 너무 연속으로 듣지 마세요
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="p-4 bg-red-50 border-red-200">
        <CardContent className="p-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-bold flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              주의사항
            </h2>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-red-600">•</span>
              <span className="text-red-700">
                로봇 재생으로 인식될 수 있는 패턴은 피해주세요
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600">•</span>
              <span className="text-red-700">
                여러 계정으로 동시 재생하지 마세요
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600">•</span>
              <span className="text-red-700">
                스트리밍 프로그램 사용은 금지되어 있습니다
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600">•</span>
              <span className="text-red-700">
                VPN 사용 시 차트 반영이 안 될 수 있습니다
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="p-4">
        <CardContent className="p-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              최적 스트리밍 시간
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">실시간 차트</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• 매시간 정각 업데이트</li>
                <li>• 1시간 단위로 집계</li>
                <li>• 실시간 반영</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">일간 차트</h4>
              <ul className="space-y-1 text-gray-600">
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
    <div className="mx-auto w-full max-w-screen-sm px-4 pb-20">
      <PageHeader 
        title="스트리밍 허브" 
        description="음원 플랫폼에서 DAY6 곡들을 스트리밍하여 차트 순위를 올려주세요!"
        externalLink="https://www.melon.com"
      />
      
      <div className="mt-4 space-y-6">

      {/* 음원 플랫폼 */}
      <Card className="p-4 ">
        <CardContent className="p-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              음원 플랫폼
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {streamingPlatforms.map((platform) => (
              <PlatformCard key={platform.id} platform={platform} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* YouTube 섹션 */}
      <YouTubeSection />

      {/* 스트리밍 가이드 */}
      <StreamingGuide />
      </div>
    </div>
  );
}
