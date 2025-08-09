import { ChartData, VoteItem, MVStats } from './types';

// Use local data files for development
const DATA_BASE_URL = process.env.NEXT_PUBLIC_DATA_BASE_URL || '/data';

export async function fetchChartData(): Promise<ChartData> {
  try {
    const response = await fetch(`${DATA_BASE_URL}/latest.json`, {
      cache: 'no-cache' // Disable cache for development
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch chart data');
    }
    
    const rawData = await response.json();
    
    // Transform the data to match our types
    const transformSongs = (songs: any[]): ChartSong[] => {
      return songs.map(song => ({
        rank: song.rank,
        title: song.title,
        artist: song.artist,
        album: song.album || 'Band Aid', // Default album if not provided
        delta: song.change || 0,
        timestamp: rawData.collectedAtKST
      }));
    };
    
    return {
      collectedAtKST: rawData.collectedAtKST,
      artist: rawData.artist,
      tracks: rawData.tracks || [],
      melon: transformSongs(rawData.melon || []),
      genie: transformSongs(rawData.genie || []),
      bugs: transformSongs(rawData.bugs || []),
      vibe: transformSongs(rawData.vibe || []),
      flo: transformSongs(rawData.flo || []),
      last_updated: rawData.collectedAtKST
    };
  } catch (error) {
    console.error('Error fetching chart data:', error);
    // Return mock data for development
    return {
      collectedAtKST: new Date().toISOString(),
      artist: 'DAY6',
      tracks: [],
      melon: [],
      genie: [],
      bugs: [],
      vibe: [],
      flo: []
    };
  }
}

export async function fetchSummaryData(): Promise<any> {
  try {
    const response = await fetch(`${DATA_BASE_URL}/summary.json`, {
      next: { revalidate: 300 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch summary data');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching summary data:', error);
    return null;
  }
}

// Mock data for votes (would come from API/database in production)
export async function fetchVotes(): Promise<VoteItem[]> {
  return [
    {
      id: '1',
      title: 'MMA 2025 - Best Band Performance',
      category: 'award',
      deadline: new Date('2025-09-15'),
      difficulty: 'hard',
      requiredPoints: 1000,
      link: 'https://www.melon.com/mma/vote',
      platform: 'Melon'
    },
    {
      id: '2',
      title: '엠카운트다운 사전투표',
      category: 'music_show',
      deadline: new Date('2025-08-12'),
      difficulty: 'easy',
      link: 'https://www.mnet.com/mcountdown/vote',
      platform: 'Mnet'
    },
    {
      id: '3',
      title: 'Billboard Fan Army',
      category: 'global',
      deadline: new Date('2025-08-20'),
      difficulty: 'medium',
      link: 'https://www.billboard.com/fan-army',
      platform: 'Billboard'
    }
  ];
}

// Fetch MV stats from summary data
export async function fetchMVStats(): Promise<MVStats[]> {
  try {
    const summaryData = await fetchSummaryData();
    if (summaryData?.youtubeStats) {
      // Use the aggregated YouTube stats for now
      return [
        {
          title: 'Melt Down',
          views: Math.floor(summaryData.youtubeStats.views * 0.6), // Approximate split
          likes: Math.floor(summaryData.youtubeStats.likes * 0.6),
          viewsDelta24h: Math.floor(summaryData.youtubeStats.dailyViews * 0.6),
          likesDelta24h: Math.floor(summaryData.youtubeStats.dailyLikes * 0.6),
          link: 'https://youtube.com/watch?v=meltdown'
        },
        {
          title: 'HAPPY',
          views: Math.floor(summaryData.youtubeStats.views * 0.4),
          likes: Math.floor(summaryData.youtubeStats.likes * 0.4),
          viewsDelta24h: Math.floor(summaryData.youtubeStats.dailyViews * 0.4),
          likesDelta24h: Math.floor(summaryData.youtubeStats.dailyLikes * 0.4),
          link: 'https://youtube.com/watch?v=happy'
        }
      ];
    }
  } catch (error) {
    console.error('Error fetching MV stats:', error);
  }
  
  // Fallback to mock data
  return [
    {
      title: 'Melt Down',
      views: 5234567,
      likes: 234567,
      viewsDelta24h: 123456,
      likesDelta24h: 12345,
      link: 'https://youtube.com/watch?v=example1'
    },
    {
      title: 'HAPPY',
      views: 8234567,
      likes: 334567,
      viewsDelta24h: 223456,
      likesDelta24h: 22345,
      link: 'https://youtube.com/watch?v=example2'
    }
  ];
}