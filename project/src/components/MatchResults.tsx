import React, { useState } from 'react';
import { Match } from '../types';
import { Calendar, Clock } from 'lucide-react';

interface MatchResultsProps {
  matches: Match[];
  onUpdateMatch: (matchId: string, homeScore: number, awayScore: number) => void;
}

const MatchResults: React.FC<MatchResultsProps> = ({ matches, onUpdateMatch }) => {
  const [editingMatch, setEditingMatch] = useState<string | null>(null);
  const [tempScores, setTempScores] = useState<{ home: string; away: string }>({ home: '', away: '' });

  const handleEditMatch = (match: Match) => {
    setEditingMatch(match.id);
    setTempScores({
      home: match.homeScore !== null ? match.homeScore.toString() : '',
      away: match.awayScore !== null ? match.awayScore.toString() : '',
    });
  };

  const handleSaveMatch = (matchId: string) => {
    const homeScore = parseInt(tempScores.home) || 0;
    const awayScore = parseInt(tempScores.away) || 0;
    onUpdateMatch(matchId, homeScore, awayScore);
    setEditingMatch(null);
    setTempScores({ home: '', away: '' });
  };

  const handleCancel = () => {
    setEditingMatch(null);
    setTempScores({ home: '', away: '' });
  };

  const groupAMatches = matches.filter(match => match.group === 'A');
  const groupBMatches = matches.filter(match => match.group === 'B');

  const renderMatches = (groupMatches: Match[], groupName: string) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-4">
        <h3 className="text-xl font-bold text-white flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Jogos - Grupo {groupName}
        </h3>
      </div>
      
      <div className="p-6">
        <div className="grid gap-4">
          {groupMatches.map((match) => (
            <div key={match.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">Rodada {match.round}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="flex items-center space-x-4 flex-1">
                    <span className="font-medium text-gray-900 min-w-0 flex-1 text-right">{match.homeTeam}</span>
                    
                    {editingMatch === match.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          min="0"
                          value={tempScores.home}
                          onChange={(e) => setTempScores(prev => ({ ...prev, home: e.target.value }))}
                          className="w-12 h-8 text-center border border-gray-300 rounded text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                        <span className="text-gray-500 font-bold">×</span>
                        <input
                          type="number"
                          min="0"
                          value={tempScores.away}
                          onChange={(e) => setTempScores(prev => ({ ...prev, away: e.target.value }))}
                          className="w-12 h-8 text-center border border-gray-300 rounded text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <div className={`px-3 py-1 rounded font-bold text-lg ${
                          match.played ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {match.homeScore !== null ? match.homeScore : '-'}
                        </div>
                        <span className="text-gray-500 font-bold">×</span>
                        <div className={`px-3 py-1 rounded font-bold text-lg ${
                          match.played ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {match.awayScore !== null ? match.awayScore : '-'}
                        </div>
                      </div>
                    )}
                    
                    <span className="font-medium text-gray-900 min-w-0 flex-1">{match.awayTeam}</span>
                  </div>
                </div>
                
                <div className="ml-4">
                  {editingMatch === match.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSaveMatch(match.id)}
                        className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors duration-200"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors duration-200"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEditMatch(match)}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors duration-200"
                    >
                      {match.played ? 'Editar' : 'Inserir'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Resultados dos Jogos</h2>
        <p className="text-gray-600">Clique em "Inserir" ou "Editar" para atualizar os placares</p>
      </div>
      
      {renderMatches(groupAMatches, 'A')}
      {renderMatches(groupBMatches, 'B')}
    </div>
  );
};

export default MatchResults;