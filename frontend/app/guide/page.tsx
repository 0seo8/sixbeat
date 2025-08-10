"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { GUIDE_CATEGORIES } from "@/content/guide.config";
import "./guide-tabs.css";

export default function GuidePage() {
  const first = GUIDE_CATEGORIES[0]?.slug ?? "streaming-basics";
  const [value, setValue] = useState(first);

  const active = useMemo(
    () => GUIDE_CATEGORIES.find((c) => c.slug === value),
    [value]
  );

  return (
    <div className="mx-auto w-full max-w-screen-sm px-4 pb-20">
      {/* 헤더 */}
      <header className="sticky top-0 z-30 bg-white pb-3 pt-4 border-b">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-lg font-bold">DAY6 응원 가이드</h1>
            <p className="text-xs text-gray-500">
              {active?.date ?? new Intl.DateTimeFormat("ko-KR", {
                year: "numeric",
                month: "2-digit", 
                day: "2-digit"
              }).format(new Date()).replace(/\. /g, '.').replace(/\.$/, '')}
            </p>
          </div>
          {active?.link ? (
            <Link
              href={active.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="관련 링크 열기"
              className="rounded p-2 hover:bg-gray-100"
            >
              <LinkIcon className="h-4 w-4" />
            </Link>
          ) : (
            <span aria-hidden className="p-2" />
          )}
        </div>

        {/* 상단 탭 */}
        <Tabs value={value} onValueChange={setValue} className="mt-3">
          <div className="-mx-4 px-4 overflow-x-auto guide-tabs-container" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <TabsList className="flex w-full justify-start bg-transparent p-0 h-auto gap-0 min-w-max border-b border-gray-200">
              {GUIDE_CATEGORIES.map((c) => (
                <TabsTrigger
                  key={c.slug}
                  value={c.slug}
                  className="!border-b-[3px] !border-transparent px-4 py-3 text-sm whitespace-nowrap !bg-transparent data-[state=active]:!border-blue-600 data-[state=active]:!bg-transparent data-[state=active]:font-medium data-[state=active]:text-blue-600 data-[state=active]:!shadow-none !rounded-none text-gray-600 hover:text-gray-800 transition-all -mb-px relative !border-l-0 !border-r-0 !border-t-0"
                >
                  {c.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {GUIDE_CATEGORIES.map((c) => (
            <TabsContent key={c.slug} value={c.slug} className="mt-4">
              <AnimatePresence mode="wait">
                {c.slug === value && (
                  <motion.div
                    key={c.slug}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    {/* 이미지 박스 (피그마의 큰 썸네일 영역) */}
                    <div className="overflow-hidden rounded-lg">
                      {c.heroImage ? (
                        c.heroImage.includes("placeholder") || c.heroImage.includes("hero") ? (
                          // 가이드 이미지 플레이스홀더
                          <div className="flex aspect-[3/4] items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
                            <div className="text-center">
                              <div className="text-4xl mb-2">📖</div>
                              <p className="text-sm font-medium text-gray-700">{c.label}</p>
                              <p className="text-xs text-gray-500 mt-1">가이드 이미지</p>
                            </div>
                          </div>
                        ) : (
                          // 실제 이미지
                          <div className="w-full">
                            <Image
                              src={c.heroImage}
                              alt={`${c.label} 가이드 이미지`}
                              width={400}
                              height={800}
                              className="object-contain w-full h-auto"
                              priority={c.slug === first}
                            />
                          </div>
                        )
                      ) : (
                        <div className="flex aspect-[3/4] items-center justify-center text-sm text-gray-400 bg-gray-50">
                          이미지 준비 중
                        </div>
                      )}
                    </div>

                    {/* 하단 CTA 버튼 */}
                    <div className="mt-4">
                      {c.cta ? (
                        <Link
                          href={c.cta.href}
                          {...(c.cta.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="block w-full py-4 bg-gray-900 text-white text-center rounded-lg font-medium hover:bg-gray-800 transition-colors"
                        >
                          {c.cta.label}
                        </Link>
                      ) : (
                        <Link
                          href={`/guide/${c.slug}`}
                          className="block w-full py-4 border border-gray-300 text-gray-700 text-center rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                          상세 가이드 보기
                        </Link>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>
      </header>
    </div>
  );
}