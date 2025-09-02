export interface Team {
  id: string;
  name: string;
  group: 'A' | 'B';
  matches: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  round: number;
  group: 'A' | 'B';
  played: boolean;
}

export interface ChampionshipData {
  teams: Team[];
  matches: Match[];
}