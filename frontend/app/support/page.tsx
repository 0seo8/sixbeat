"use client";

import { Heart, Gift, Users, MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent } from "@/components/ui/card";

const supportItems = [
  {
    title: "아이디 기부",
    description: "스트리밍용 아이디를 기부해주세요",
    icon: Heart,
    href: "/guide/id-donation",
    gradient: "from-red-500 to-pink-400",
  },
  {
    title: "디지털 기프트",
    description: "디지털 선물로 응원해주세요",
    icon: Gift,
    href: "/guide/digital-gift",
    gradient: "from-yellow-500 to-orange-400",
  },
  {
    title: "팬클럽 가입",
    description: "공식 팬클럽에 가입하세요",
    icon: Users,
    href: "/guide/fanclub",
    gradient: "from-indigo-500 to-blue-400",
  },
  {
    title: "SNS 홍보",
    description: "SNS에서 DAY6를 홍보해주세요",
    icon: MessageCircle,
    href: "/guide/sns-promotion",
    gradient: "from-teal-500 to-green-400",
  },
];

export default function SupportPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Support"
        subtitle="다양한 방법으로 DAY6를 응원하세요"
      />

      <div className="grid grid-cols-1 gap-4 px-4">
        {supportItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  {/* 원형 아이콘 */}
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    {/* 제목 */}
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    
                    {/* 설명 */}
                    <p className="text-sm text-gray-500">
                      {item.description}
                    </p>
                  </div>
                  
                  {/* 화살표 */}
                  <div className="text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 하단 여백 */}
      <div className="h-8"></div>
    </div>
  );
}