import React, { useState } from 'react';
import Header from './components/Header';
import GroupTable from './components/GroupTable';
import MatchResults from './components/MatchResults';
import Footer from './components/Footer';
import { useChampionship } from './hooks/useChampionship';
import { BarChart3, Calendar } from 'lucide-react';

function App() {
  const { updateMatchResult, getGroupTeams, getGroupMatches } = useChampionship();
  const [activeTab, setActiveTab] = useState<'tables' | 'matches'>('tables');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setActiveTab('tables')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-all duration-200 ${
                activeTab === 'tables'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="h-5 w-5" />
              <span className="font-medium">Classificação</span>
            </button>
            <button
              onClick={() => setActiveTab('matches')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-all duration-200 ${
                activeTab === 'matches'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Calendar className="h-5 w-5" />
              <span className="font-medium">Jogos</span>
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'tables' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Classificação</h2>
              <p className="text-gray-600">Tabelas atualizadas em tempo real</p>
            </div>
            
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
              <GroupTable groupName="A" teams={getGroupTeams('A')} />
              <GroupTable groupName="B" teams={getGroupTeams('B')} />
            </div>

            {/* Legend */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Legenda</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div><span className="font-medium">J:</span> Jogos</div>
                <div><span className="font-medium">V:</span> Vitórias</div>
                <div><span className="font-medium">E:</span> Empates</div>
                <div><span className="font-medium">D:</span> Derrotas</div>
                <div><span className="font-medium">GP:</span> Gols Pró</div>
                <div><span className="font-medium">GC:</span> Gols Contra</div>
                <div><span className="font-medium">SG:</span> Saldo de Gols</div>
                <div><span className="font-medium">PTS:</span> Pontos</div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Sistema de Pontuação:</span> Vitória = 3 pontos | Empate = 1 ponto | Derrota = 0 pontos
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'matches' && (
          <MatchResults 
            matches={[...getGroupMatches('A'), ...getGroupMatches('B')]}
            onUpdateMatch={updateMatchResult}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;