"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Heart, Eye } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchMVStats } from "@/lib/api";

export default function MVStatsCard() {
  const { data: mvStats } = useQuery({
    queryKey: ["mvStats"],
    queryFn: fetchMVStats,
  });

  return (
    <Card className="md:p-6">
      <CardContent className="p-0">
        <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          {mvStats?.length ? (
            mvStats.map((mv, index) => (
              <div key={index} className="bg-gray-50 p-3 md:p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm md:text-base text-gray-900 truncate">
                    {mv.title}
                  </h4>
                  <a
                    href={mv.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-6 h-6 rounded hover:bg-gray-200 transition-colors"
                  >
                    <ExternalLink className="h-3 w-3 text-gray-500" />
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
                    <span className="text-gray-700">
                      {(mv.views / 1000000).toFixed(1)}M
                    </span>
                    <Badge
                      variant="outline"
                      className="text-red-600 font-medium border-red-200 text-xs px-1 py-0"
                    >
                      +{(mv.viewsDelta24h / 1000).toFixed(0)}K
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3 md:h-4 md:w-4 text-pink-500" />
                    <span className="text-gray-700">
                      {(mv.likes / 1000).toFixed(0)}K
                    </span>
                    <Badge
                      variant="outline"
                      className="text-pink-600 font-medium border-pink-200 text-xs px-1 py-0"
                    >
                      +{(mv.likesDelta24h / 1000).toFixed(1)}K
                    </Badge>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 md:col-span-2 lg:col-span-1 xl:col-span-2">
              <p className="text-sm md:text-base text-gray-500">
                YouTube 데이터를 불러오는 중...
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
