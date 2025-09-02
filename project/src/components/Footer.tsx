import React from 'react';
import { GraduationCap } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-3">
          <GraduationCap className="h-6 w-6 text-yellow-400" />
          <div className="text-center">
            <p className="text-lg font-medium">Bacharelado em Sistemas de Informação</p>
            <p className="text-gray-400 text-sm mt-1">Campeonato Interclasse 2025</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;