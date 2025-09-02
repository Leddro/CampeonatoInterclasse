import { useState, useEffect } from 'react';
import { Team, Match, ChampionshipData } from '../types';
import { calculateTeamStats, sortTeamsByPosition } from '../utils/calculations';

const initialTeams: Team[] = [
  // Grupo A
  { id: '1', name: 'Flamengo (7º)', group: 'A', matches: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
  { id: '2', name: 'Chelsea (2º + 4º)', group: 'A', matches: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
  { id: '3', name: 'Borussia (8º)', group: 'A', matches: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
  
  // Grupo B
  { id: '4', name: 'Juventus (1º)', group: 'B', matches: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
  { id: '5', name: 'Santa Cruz (3º)', group: 'B', matches: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
  { id: '6', name: 'Real Madrid (5º + 6º)', group: 'B', matches: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
  { id: '7', name: 'Veteranos (8º+)', group: 'B', matches: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 },
];

const generateMatches = (teams: Team[]): Match[] => {
  const matches: Match[] = [];
  let matchId = 1;

  // Gerar jogos para cada grupo
  ['A', 'B'].forEach(group => {
    const groupTeams = teams.filter(team => team.group === group);
    
    // Todos contra todos no grupo
    for (let i = 0; i < groupTeams.length; i++) {
      for (let j = i + 1; j < groupTeams.length; j++) {
        matches.push({
          id: matchId.toString(),
          homeTeam: groupTeams[i].name,
          awayTeam: groupTeams[j].name,
          homeScore: null,
          awayScore: null,
          round: 1,
          group: group as 'A' | 'B',
          played: false,
        });
        matchId++;
      }
    }
  });

  return matches;
};

export const useChampionship = () => {
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [matches, setMatches] = useState<Match[]>(() => generateMatches(initialTeams));

  const updateMatchResult = (matchId: string, homeScore: number, awayScore: number) => {
    setMatches(prevMatches => 
      prevMatches.map(match => 
        match.id === matchId 
          ? { ...match, homeScore, awayScore, played: true }
          : match
      )
    );
  };

  useEffect(() => {
    // Recalcular estatísticas dos times quando os jogos são atualizados
    const updatedTeams = teams.map(team => calculateTeamStats(team, matches));
    setTeams(updatedTeams);
  }, [matches]);

  const getGroupTeams = (group: 'A' | 'B') => {
    const groupTeams = teams.filter(team => team.group === group);
    return sortTeamsByPosition(groupTeams);
  };

  const getGroupMatches = (group: 'A' | 'B') => {
    return matches.filter(match => match.group === group);
  };

  return {
    teams,
    matches,
    updateMatchResult,
    getGroupTeams,
    getGroupMatches,
  };
};