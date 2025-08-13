"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchChartData } from "@/lib/api";
import { PlatformType } from "@/lib/types";
import { ExternalLink, BarChart3, TrendingUp } from "lucide-react";
import { PlatformFilters } from "@/components/charts/platform-filters";
import { ChartSection } from "@/components/charts/chart-section";

export default function ChartsPage() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformType[]>([
    "melon",
  ]);

  const { data: chartData, isLoading } = useQuery({
    queryKey: ["chartData"],
    queryFn: fetchChartData,
  });

  return (
    <div>
      {/* Content with same padding as homepage */}
      <div className="px-5 md:px-6 lg:px-8 xl:px-12 space-y-6 pt-6">
        
        {/* Section Header - same style as homepage */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              실시간 차트
            </h2>
            <p className="text-xs md:text-sm text-gray-500">
              DAY6의 차트 순위 변동 추적
            </p>
          </div>
          <div className="text-gray-300">
            <ExternalLink className="h-5 w-5" />
          </div>
        </div>

        {/* Chart Status */}
        <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-100">
          <CardContent className="p-0">
            <div className="p-4 text-center">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                <BarChart3 className="w-4 h-4" />
                <span>차트 순위</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                실시간 차트 추적
              </h3>
              <div className="flex items-center justify-center gap-2 text-orange-600">
                <TrendingUp className="w-4 h-4" />
                <span className="font-medium">순위 변동 모니터링 중</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Platform Filters */}
        <div>
          <h3 className="text-base font-bold text-gray-900 mb-4">플랫폼 필터</h3>
          <Card>
            <CardContent className="p-0">
              <div className="p-4">
                <PlatformFilters
                  selectedPlatforms={selectedPlatforms}
                  onPlatformChange={setSelectedPlatforms}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart Section */}
        <ChartSection
          selectedPlatforms={selectedPlatforms}
          chartData={chartData}
          isLoading={isLoading}
        />

        {/* Chart Info Tips */}
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-2">차트 정보</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 실시간 차트는 매시간 업데이트됩니다</li>
                  <li>• 순위 변동은 전 시간 대비 변화량입니다</li>
                  <li>• 여러 플랫폼을 선택하여 비교 가능합니다</li>
                  <li>• 차트 밖으로 벗어난 곡은 '-' 표시됩니다</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
      
      {/* Bottom spacing for mobile nav */}
      <div className="h-20 md:h-8"></div>
    </div>
  );
}
