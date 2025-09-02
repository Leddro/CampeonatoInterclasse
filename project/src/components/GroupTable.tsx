import React from 'react';
import { Team } from '../types';

interface GroupTableProps {
  groupName: string;
  teams: Team[];
}

const GroupTable: React.FC<GroupTableProps> = ({ groupName, teams }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">Grupo {groupName}</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pos</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">J</th>
              <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">V</th>
              <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">E</th>
              <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">D</th>
              <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">GP</th>
              <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">GC</th>
              <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">SG</th>
              <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">PTS</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {teams.map((team, index) => (
              <tr key={team.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    index === 0 ? 'bg-yellow-500' : 
                    index === 1 ? 'bg-gray-400' : 
                    index === 2 ? 'bg-yellow-600' : 'bg-gray-300'
                  }`}>
                    {index + 1}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{team.name}</div>
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-center text-sm text-gray-900">{team.matches}</td>
                <td className="px-2 py-4 whitespace-nowrap text-center text-sm text-green-600 font-medium">{team.wins}</td>
                <td className="px-2 py-4 whitespace-nowrap text-center text-sm text-yellow-600 font-medium">{team.draws}</td>
                <td className="px-2 py-4 whitespace-nowrap text-center text-sm text-red-600 font-medium">{team.losses}</td>
                <td className="px-2 py-4 whitespace-nowrap text-center text-sm text-gray-900">{team.goalsFor}</td>
                <td className="px-2 py-4 whitespace-nowrap text-center text-sm text-gray-900">{team.goalsAgainst}</td>
                <td className={`px-2 py-4 whitespace-nowrap text-center text-sm font-medium ${
                  team.goalDifference > 0 ? 'text-green-600' : 
                  team.goalDifference < 0 ? 'text-red-600' : 'text-gray-900'
                }`}>
                  {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {team.points}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupTable;