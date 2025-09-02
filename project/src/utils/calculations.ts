import { Team, Match } from '../types';

export const calculateTeamStats = (team: Team, matches: Match[]): Team => {
  const teamMatches = matches.filter(
    match => 
      (match.homeTeam === team.name || match.awayTeam === team.name) && 
      match.played
  );

  let wins = 0;
  let draws = 0;
  let losses = 0;
  let goalsFor = 0;
  let goalsAgainst = 0;

  teamMatches.forEach(match => {
    const isHome = match.homeTeam === team.name;
    const teamScore = isHome ? match.homeScore! : match.awayScore!;
    const opponentScore = isHome ? match.awayScore! : match.homeScore!;

    goalsFor += teamScore;
    goalsAgainst += opponentScore;

    if (teamScore > opponentScore) {
      wins++;
    } else if (teamScore === opponentScore) {
      draws++;
    } else {
      losses++;
    }
  });

  return {
    ...team,
    matches: teamMatches.length,
    wins,
    draws,
    losses,
    goalsFor,
    goalsAgainst,
    goalDifference: goalsFor - goalsAgainst,
    points: wins * 3 + draws * 1,
  };
};

export const sortTeamsByPosition = (teams: Team[]): Team[] => {
  return [...teams].sort((a, b) => {
    // Primeiro por pontos (decrescente)
    if (a.points !== b.points) {
      return b.points - a.points;
    }
    
    // Depois por saldo de gols (decrescente)
    if (a.goalDifference !== b.goalDifference) {
      return b.goalDifference - a.goalDifference;
    }
    
    // Depois por gols pró (decrescente)
    if (a.goalsFor !== b.goalsFor) {
      return b.goalsFor - a.goalsFor;
    }
    
    // Por fim, alfabético
    return a.name.localeCompare(b.name);
  });
};