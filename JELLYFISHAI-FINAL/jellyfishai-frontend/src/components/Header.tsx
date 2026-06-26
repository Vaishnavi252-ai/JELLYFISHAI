import React from 'react';
import { Code2, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl">
              <span className="text-white text-lg font-bold">🪼</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">jellyfishAI</h1>
              <p className="text-sm text-white/60">GenAI Development Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-white font-medium">AI Powered</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};