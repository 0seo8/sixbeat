export interface Platform {
  id: string;
  name: string;
  logo: string;
  url: string;
  color: string;
  category: "music" | "mv" | "download";
}

export const MUSIC_PLATFORMS: Platform[] = [
  {
    id: "melon",
    name: "멜론",
    logo: "/ico_melon.png",
    url: "https://www.melon.com/artist/timeline.htm?artistId=261143",
    color: "bg-green-500",
    category: "music",
  },
  {
    id: "genie",
    name: "지니",
    logo: "/Geenie.png",
    url: "https://www.genie.co.kr/detail/artistInfo?xxartistId=80240",
    color: "bg-blue-500",
    category: "music",
  },
  {
    id: "bugs",
    name: "벅스",
    logo: "/bucks.png",
    url: "https://music.bugs.co.kr/artist/80086",
    color: "bg-red-500",
    category: "music",
  },
  {
    id: "vibe",
    name: "바이브",
    logo: "/vibe.jpeg",
    url: "https://vibe.naver.com/artist/12055",
    color: "bg-purple-500",
    category: "music",
  },
  {
    id: "flo",
    name: "플로",
    logo: "/fillo.png",
    url: "https://www.music-flo.com/detail/artist/eyunnqoyqx",
    color: "bg-orange-500",
    category: "music",
  },
  {
    id: "youtube-music",
    name: "유튜브뮤직",
    logo: "/file.svg",
    url: "https://music.youtube.com/channel/UCp-pqXsizklX3ZHvLxXyhxw",
    color: "bg-red-600",
    category: "music",
  },
  {
    id: "apple-music",
    name: "애플뮤직",
    logo: "/file.svg",
    url: "https://music.apple.com/kr/artist/day6/1039275369",
    color: "bg-gray-800",
    category: "music",
  },
  {
    id: "spotify",
    name: "스포티파이",
    logo: "/file.svg",
    url: "https://open.spotify.com/artist/5TnQc2N1iKlFjYD7CPGvFc",
    color: "bg-green-600",
    category: "music",
  },
  {
    id: "stationhead",
    name: "스테이션헤드",
    logo: "/file.svg",
    url: "https://www.stationhead.com",
    color: "bg-indigo-600",
    category: "music",
  },
];

export const MV_PLATFORMS: Platform[] = [
  {
    id: "youtube",
    name: "유튜브",
    logo: "/file.svg",
    url: "https://www.youtube.com/@day6official",
    color: "bg-red-600",
    category: "mv",
  },
];

export const DOWNLOAD_PLATFORMS: Platform[] = [
  {
    id: "melon",
    name: "멜론",
    logo: "/ico_melon.png",
    url: "https://www.melon.com/artist/song.htm?artistId=261143",
    color: "bg-green-500",
    category: "download",
  },
  {
    id: "genie",
    name: "지니",
    logo: "/Geenie.png",
    url: "https://www.genie.co.kr/detail/artistInfo?xxartistId=80240",
    color: "bg-blue-500",
    category: "download",
  },
  {
    id: "bugs",
    name: "벅스",
    logo: "/bucks.png",
    url: "https://music.bugs.co.kr/artist/80086",
    color: "bg-red-500",
    category: "download",
  },
  {
    id: "vibe",
    name: "바이브",
    logo: "/vibe.jpeg",
    url: "https://vibe.naver.com/artist/12055",
    color: "bg-purple-500",
    category: "download",
  },
  {
    id: "flo",
    name: "플로",
    logo: "/fillo.png",
    url: "https://www.music-flo.com/detail/artist/eyunnqoyqx",
    color: "bg-orange-500",
    category: "download",
  },
];

export const ALL_PLATFORMS = [...MUSIC_PLATFORMS, ...MV_PLATFORMS, ...DOWNLOAD_PLATFORMS];

export function getPlatformById(id: string): Platform | undefined {
  return ALL_PLATFORMS.find((platform) => platform.id === id);
}

export function getPlatformsByCategory(category: Platform["category"]): Platform[] {
  return ALL_PLATFORMS.filter((platform) => platform.category === category);
}