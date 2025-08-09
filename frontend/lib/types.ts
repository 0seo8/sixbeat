export interface ChartSong {
  rank: number | null;
  title: string;
  artist: string;
  album: string;
  delta?: number;
  albumArt?: string;
  service?: string;
  timestamp?: string;
}

export interface ChartData {
  collectedAtKST: string;
  artist: string;
  tracks: ChartSong[];
  melon?: ChartSong[];
  genie?: ChartSong[];
  bugs?: ChartSong[];
  vibe?: ChartSong[];
  flo?: ChartSong[];
  melon_top100?: ChartSong[];
  melon_hot100?: ChartSong[];
  last_updated?: string;
}

export interface TodoItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  link?: string;
  icon?: string;
}

export interface VoteItem {
  id: string;
  title: string;
  category: 'award' | 'music_show' | 'global';
  deadline: Date;
  difficulty: 'easy' | 'medium' | 'hard';
  requiredPoints?: number;
  link: string;
  platform: string;
}

export interface StreamingPlatform {
  id: string;
  name: string;
  appLink: string;
  webLink: string;
  playlist?: string;
  lastUpdated?: string;
  icon: string;
}

export interface MVStats {
  title: string;
  views: number;
  likes: number;
  viewsDelta24h: number;
  likesDelta24h: number;
  link: string;
}

export type PlatformType = 'melon' | 'genie' | 'bugs' | 'vibe' | 'flo';
export type ChartPeriod = 'realtime' | 'daily' | 'weekly' | 'hot100';