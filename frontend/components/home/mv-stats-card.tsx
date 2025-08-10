"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Eye, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchMVStats } from "@/lib/api";

export default function MVStatsCard() {
  const { data: mvStats } = useQuery({
    queryKey: ["mvStats"],
    queryFn: fetchMVStats,
  });

  // 정각 시간 표시 (예: 15:00 기준)
  const getLastUpdateTime = () => {
    const now = new Date();
    const lastHour = new Date(now);
    lastHour.setMinutes(0, 0, 0);
    return lastHour.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  // 유튜브 ID 추출 (URL에서)
  const videoId = "0fyZqS0N19o";
  const videoTitle = "DAY6 - Melt Down";

  return (
    <Card className="md:p-6">
      <CardContent className="p-0">
        {/* 유튜브 임베드 */}
        <div className="aspect-video w-full rounded-lg overflow-hidden mb-4">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={videoTitle}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        {/* 제목 및 조회수 */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900 text-sm md:text-base">
            {videoTitle}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-red-500" />
              <span className="text-sm md:text-base font-medium text-gray-900">
                {mvStats?.[0]?.views ? 
                  `${(mvStats[0].views / 1000000).toFixed(1)}M 조회수` : 
                  "조회수 불러오는 중..."
                }
              </span>
            </div>
            
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>{getLastUpdateTime()} 기준</span>
            </div>
          </div>

          {/* 24시간 증가량 (선택사항) */}
          {mvStats?.[0]?.viewsDelta24h && (
            <div className="pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-600">
                24시간 동안 <span className="font-semibold text-red-600">
                  +{(mvStats[0].viewsDelta24h / 1000).toFixed(0)}K
                </span> 조회수 증가
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}