import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Link as LinkIcon } from "lucide-react";
import { GUIDE_CATEGORIES } from "@/content/guide.config";

type Props = { params: Promise<{ slug: string }> };

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const c = GUIDE_CATEGORIES.find((x) => x.slug === slug);
  if (!c) return notFound();

  return (
    <div className="mx-auto w-full max-w-screen-sm px-4 pb-24">
      {/* 헤더 동일 */}
      <header className="sticky top-0 z-30 bg-white pb-3 pt-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-lg font-bold">DAY6 응원 가이드</h1>
            <p className="text-xs text-gray-500">
              {c.date ??
                new Intl.DateTimeFormat("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
                  .format(new Date())
                  .replace(/\. /g, ".")
                  .replace(".", "")}
            </p>
          </div>
          {c.link ? (
            <Link
              href={c.link}
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

        {/* 현재 가이드 타이틀 */}
        <div className="mt-3 pb-2">
          <h2 className="text-base font-semibold text-gray-900">
            {c.label} 가이드
          </h2>
        </div>
      </header>

      {/* 큰 이미지(히어로) + 상세 이미지 리스트 */}
      <section className="mt-4 space-y-4">
        {(c.images?.length ? c.images : [c.heroImage]).map((src, i) =>
          src ? (
            <div
              key={i}
              className="overflow-hidden rounded-lg border bg-gray-50"
            >
              {src.startsWith("/guide/") ? (
                // 가이드 이미지 플레이스홀더
                <div className="flex aspect-[3/4] items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📖</div>
                    <p className="text-sm font-medium text-gray-700">
                      {c.label} 가이드 {i + 1}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      단계별 스크린샷
                    </p>
                  </div>
                </div>
              ) : (
                // 실제 플랫폼 로고
                <div className="flex aspect-[3/4] items-center justify-center p-8">
                  <Image
                    src={src}
                    alt={`${c.label} 가이드 ${i + 1}`}
                    width={300}
                    height={300}
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          ) : null
        )}
      </section>

      {/* 간단한 설명 텍스트 */}
      <section className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">
          {c.label} 이용 팁
        </h3>
        <div className="text-sm text-gray-600 space-y-2">
          {c.slug.includes("streaming") ||
          c.slug.includes("melon") ||
          c.slug.includes("genie") ||
          c.slug.includes("bugs") ||
          c.slug.includes("vibe") ||
          c.slug.includes("flo") ? (
            <>
              <p>• 스트리밍은 30초 이상 재생해야 스트리밍 수에 반영됩니다</p>
              <p>• 하루에 같은 곡을 무제한으로 들어도 집계됩니다</p>
              <p>• 음소거나 볼륨 0으로는 스트리밍이 집계되지 않습니다</p>
              <p>• 가능한 한 높은 음질로 재생하는 것이 좋습니다</p>
            </>
          ) : c.slug.includes("vote") ||
            c.slug.includes("inkigayo") ||
            c.slug.includes("musicbank") ||
            c.slug.includes("musiccore") ||
            c.slug.includes("mcountdown") ? (
            <>
              <p>• 투표 시간과 방법을 정확히 확인하세요</p>
              <p>• 하나의 계정으로 하루 1회 투표가 가능합니다</p>
              <p>• 투표 마감 시간을 놓치지 않도록 주의하세요</p>
              <p>• 프로그램별로 투표 방식이 다를 수 있습니다</p>
            </>
          ) : (
            <>
              <p>• 해당 가이드를 참고하여 단계별로 진행해주세요</p>
              <p>• 궁금한 점이 있으면 팬 커뮤니티에서 문의해보세요</p>
              <p>• 정확한 정보는 공식 채널에서 확인하는 것이 좋습니다</p>
            </>
          )}
        </div>
      </section>

      {/* 하단 고정 버튼(모바일 UX) */}
      <div className="fixed inset-x-0 bottom-20 z-20 mx-auto w-full max-w-screen-sm px-4">
        <div className="flex gap-2">
          {c.cta && (
            <Link
              href={c.cta.href}
              {...(c.cta.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="flex-1 py-3 bg-gray-900 text-white text-center rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              {c.cta.label.replace(" >", "")}
            </Link>
          )}
          <Link
            href="/guide"
            className="flex-1 py-3 border border-gray-300 text-gray-700 text-center rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            가이드 목록
          </Link>
        </div>
      </div>
    </div>
  );
}
