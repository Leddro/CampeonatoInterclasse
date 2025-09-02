import React from 'react';
import { Trophy } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-800 text-white py-8 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-3">
          <Trophy className="h-10 w-10 text-yellow-400" />
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold">1º Interclasse do BSI</h1>
            <p className="text-blue-200 mt-2 text-lg">Campeonato de Futsal</p>
          </div>
          <Trophy className="h-10 w-10 text-yellow-400" />
        </div>
      </div>
    </header>
  );
};

export default Header;