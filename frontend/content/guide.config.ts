// 가이드 데이터/타입 (필요 시 이 파일만 수정)
export type GuideCategory = {
  slug: string;                 // 2뎁스 라우트용 (/guide/[slug])
  label: string;                // 탭 라벨
  date?: string;                // YYYY.MM.DD (없으면 자동 오늘 표기)
  link?: string;                // 헤더의 링크 아이콘 대상(공지/원문 등)
  heroImage?: string;           // 1뎁스 큰 이미지
  images?: string[];            // 2뎁스 상세 이미지들
  cta?: { label: string; href: string; external?: boolean }; // 하단 버튼
  category?: "streaming" | "voting" | "support"; // 카테고리 분류
  subcategories?: GuideCategory[]; // 서브 카테고리 (투표 하위 항목들)
};

export const GUIDE_CATEGORIES: GuideCategory[] = [
  {
    slug: "streaming-basics",
    label: "스트리밍 기초",
    date: "2025.08.10",
    link: "https://dystrm.kr/guide",
    heroImage: "/guide/streaming-hero.png",
    images: [
      "/guide/streaming-step1.png",
      "/guide/streaming-step2.png",
      "/guide/streaming-step3.png",
    ],
    cta: { label: "스트리밍 시작하기 >", href: "/streaming" },
  },
  // 한국 음원 플랫폼
  {
    slug: "melon",
    label: "멜론",
    date: "2025.08.10",
    heroImage: "/guide/melon-streaming.webp",
    images: ["/guide/melon-streaming.webp"],
    cta: { label: "멜론 스트리밍 가이드 보기", href: "/guide/melon" },
  },
  {
    slug: "genie",
    label: "지니",
    heroImage: "/guide/genie-streaming.png",
    images: ["/guide/genie-streaming.png"],
    cta: { label: "지니 스트리밍 가이드 보기", href: "/guide/genie" },
  },
  {
    slug: "bugs",
    label: "벅스",
    heroImage: "/guide/bugs-streaming.webp",
    images: ["/guide/bugs-streaming.webp"],
    cta: { label: "벅스 스트리밍 가이드 보기", href: "/guide/bugs" },
  },
  {
    slug: "vibe",
    label: "바이브",
    heroImage: "/guide/vibe-streaming.webp",
    images: ["/guide/vibe-streaming.webp"],
    cta: { label: "바이브 스트리밍 가이드 보기", href: "/guide/vibe" },
  },
  {
    slug: "flo",
    label: "플로",
    heroImage: "/guide/flo-streaming.webp",
    images: ["/guide/flo-streaming.webp"],
    cta: { label: "플로 스트리밍 가이드 보기", href: "/guide/flo" },
  },
  // 글로벌 플랫폼
  {
    slug: "spotify",
    label: "Spotify",
    heroImage: "/guide/spotify-streaming.webp",
    images: ["/guide/spotify-streaming.webp"],
    cta: { label: "Spotify 스트리밍 가이드", href: "/guide/spotify" },
  },
  {
    slug: "apple-music",
    label: "Apple Music",
    heroImage: "/guide/apple-streaming.webp",
    images: ["/guide/apple-streaming.webp"],
    cta: { label: "Apple Music 가이드", href: "/guide/apple-music" },
  },
  {
    slug: "youtube-music",
    label: "YouTube Music",
    heroImage: "/guide/youtube-streaming.png",
    images: ["/guide/youtube-streaming.png"],
    cta: { label: "YouTube Music 가이드", href: "/guide/youtube-music" },
  },
  {
    slug: "youtube",
    label: "YouTube MV",
    heroImage: "/guide/youtube-mv-streaming.webp",
    images: ["/guide/youtube-mv-streaming.webp"],
    cta: { label: "YouTube MV 스트리밍", href: "/guide/youtube" },
  },
  {
    slug: "samsung-music",
    label: "삼성뮤직",
    heroImage: "/guide/samsung-streaming.webp",
    images: ["/guide/samsung-streaming.webp"],
    cta: { label: "삼성뮤직 활용 가이드", href: "/guide/samsung-music" },
  },
  // 투표 및 음악방송
  {
    slug: "vote-schedule",
    label: "투표일정",
    date: "2025.08.10",
    link: "https://www.musicbank.com",
    heroImage: "/guide/vote-hero.png",
    images: [
      "/guide/vote-step1.png",
      "/guide/vote-step2.png",
    ],
    cta: { label: "음원사별 투표 바로가기 >", href: "/votes" },
  },
  {
    slug: "inkigayo",
    label: "인기가요",
    date: "2025.08.10",
    heroImage: "/guide/inkigayo-hero.png",
    images: ["/guide/inkigayo-1.png", "/guide/inkigayo-2.png"],
    cta: { label: "인기가요 투표 안내 보기", href: "/guide/inkigayo" },
  },
  {
    slug: "musicbank",
    label: "뮤직뱅크",
    heroImage: "/guide/musicbank-hero.png",
    images: ["/guide/musicbank-1.png"],
    cta: { label: "뮤직뱅크 가이드 열기", href: "/guide/musicbank" },
  },
  {
    slug: "musiccore",
    label: "음악중심",
    heroImage: "/guide/musiccore-hero.png",
    images: ["/guide/musiccore-1.png"],
    cta: { label: "음중 가이드 열기", href: "/guide/musiccore" },
  },
  {
    slug: "mcountdown",
    label: "엠카운트다운",
    heroImage: "/guide/mcountdown-hero.png",
    images: ["/guide/mcountdown-1.png"],
    cta: { label: "엠카운트다운 가이드 열기", href: "/guide/mcountdown" },
  },
  // 응원법 및 추가 가이드
  {
    slug: "fanchant",
    label: "응원법",
    heroImage: "/guide/fanchant-placeholder.png",
    images: ["/guide/fanchant-placeholder.png"],
    cta: { label: "응원법 배우기", href: "/guide/fanchant" },
  },
  {
    slug: "awards-voting",
    label: "시상식 투표",
    heroImage: "/guide/awards-placeholder.png",
    images: ["/guide/awards-placeholder.png"],
    cta: { label: "시상식 투표 가이드", href: "/guide/awards-voting" },
  },
  {
    slug: "streaming-tips",
    label: "유용한 팁",
    heroImage: "/guide/tips-placeholder.png",
    images: ["/guide/tips-placeholder.png"],
    cta: { label: "꿀팁 모아보기", href: "/guide/streaming-tips" },
  },
  {
    slug: "calculator",
    label: "계산기",
    heroImage: "/guide/calculator-placeholder.png",
    images: ["/guide/calculator-placeholder.png"],
    cta: { label: "스트리밍 계산기 사용", href: "/calculator" },
  },
];