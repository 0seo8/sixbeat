"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchChartData } from "@/lib/api";
import { PlatformType } from "@/lib/types";
import { ChartsHeader } from "@/components/charts/charts-header";
import { PlatformFilters } from "@/components/charts/platform-filters";
import { ChartSection } from "@/components/charts/chart-section";


export default function ChartsPage() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformType[]>(["melon"]);

  const { data: chartData, isLoading } = useQuery({
    queryKey: ["chartData"],
    queryFn: fetchChartData,
  });

  return (
    <div className="space-y-6">
      <ChartsHeader />
      
      <Card className="p-4">
        <CardContent className="p-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              플랫폼 필터
            </h2>
          </div>
          <PlatformFilters
            selectedPlatforms={selectedPlatforms}
            onPlatformChange={setSelectedPlatforms}
          />
        </CardContent>
      </Card>

      <ChartSection
        selectedPlatforms={selectedPlatforms}
        chartData={chartData}
        isLoading={isLoading}
      />
    </div>
  );
}
