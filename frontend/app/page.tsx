"use client";

import { ExternalLink } from "lucide-react";
import { CompactChart } from "@/components/compact-chart";
import DAY6ImageSwiper from "@/components/home/day6-image-swiper";
import MVStatsCard from "@/components/home/mv-stats-card";
import QuickAccessCard from "@/components/home/quick-access-card";
import AlertBanner from "@/components/home/alert-banner";

import { formatKoreanDate, formatKoreanDateTime } from "@/lib/date-utils";
import { useSidebar } from "@/components/layout/mobile-app-layout";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const { openSidebar } = useSidebar();

  useEffect(() => {
    setCurrentTime(new Date());
  }, []);

  return (
    <div>
      {/* Hero Section - DAY6 Image Swiper (Full Width) */}
      <DAY6ImageSwiper onMenuClick={openSidebar} />

      {/* Content with padding */}
      <div className="px-5 md:px-6 lg:px-8 xl:px-12 space-y-6  pt-6">
        <AlertBanner />

        {/* Today's Tasks Section */}
        {/* <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
            오늘의 스트리밍 미션
          </h2>
          <TodoCard />
        </div> */}

        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900">
                실시간 차트 순위
              </h2>
              <p className="text-xs md:text-sm text-gray-500">
                {currentTime ? formatKoreanDate(currentTime) : ""}
              </p>
            </div>
            <div className="text-gray-300">
              <ExternalLink className="h-5 w-5" />
            </div>
          </div>
          <CompactChart />
        </div>

        {/* YouTube Stats Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              뮤직비디오 조회수
            </h2>
            <span className="text-xs md:text-sm text-gray-500">
              {currentTime ? formatKoreanDateTime(currentTime) : ""}
            </span>
          </div>
          <MVStatsCard />
        </div>

        {/* Quick Access Streaming Platforms */}
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
            원클릭 스트리밍 리스트
          </h2>
          <QuickAccessCard />
        </div>
      </div>
    </div>
  );
}
