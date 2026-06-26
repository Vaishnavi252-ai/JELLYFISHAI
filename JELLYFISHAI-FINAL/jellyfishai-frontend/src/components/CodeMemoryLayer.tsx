import React, { useState, useEffect } from 'react';
import { History, GitBranch, Clock, User, Code, Zap, Eye, Download, Share2 } from 'lucide-react';

interface CodeVersion {
  id: string;
  timestamp: Date;
  author: 'user' | 'ai';
  description: string;
  code: string;
  language: string;
  changes: {
    added: number;
    removed: number;
    modified: number;
  };
}

interface CodeMemoryLayerProps {
  onBack: () => void;
}

export const CodeMemoryLayer: React.FC<CodeMemoryLayerProps> = ({ onBack }) => {
  const [codeVersions, setCodeVersions] = useState<CodeVersion[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'timeline' | 'diff' | 'evolution'>('timeline');

  useEffect(() => {
    // Simulate code evolution history
    const mockVersions: CodeVersion[] = [
      {
        id: '1',
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        author: 'user',
        description: 'Initial project setup with basic React components',
        language: 'typescript',
        code: `import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}

export default App;`,
        changes: { added: 10, removed: 0, modified: 0 }
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 5400000), // 1.5 hours ago
        author: 'ai',
        description: 'AI Enhancement: Added state management and improved structure',
        language: 'typescript',
        code: `import React, { useState } from 'react';

interface AppState {
  count: number;
  message: string;
}

function App() {
  const [state, setState] = useState<AppState>({
    count: 0,
    message: 'Hello World'
  });

  const handleIncrement = () => {
    setState(prev => ({ ...prev, count: prev.count + 1 }));
  };

  return (
    <div className="App">
      <h1>{state.message}</h1>
      <p>Count: {state.count}</p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}

export default App;`,
        changes: { added: 15, removed: 2, modified: 3 }
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        author: 'user',
        description: 'Added styling and responsive design',
        language: 'typescript',
        code: `import React, { useState } from 'react';
import './App.css';

interface AppState {
  count: number;
  message: string;
}

function App() {
  const [state, setState] = useState<AppState>({
    count: 0,
    message: 'Hello World'
  });

  const handleIncrement = () => {
    setState(prev => ({ ...prev, count: prev.count + 1 }));
  };

  const handleReset = () => {
    setState(prev => ({ ...prev, count: 0 }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{state.message}</h1>
        <div className="text-center">
          <p className="text-6xl font-bold text-blue-600 mb-4">{state.count}</p>
          <div className="space-x-4">
            <button 
              onClick={handleIncrement}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Increment
            </button>
            <button 
              onClick={handleReset}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;`,
        changes: { added: 25, removed: 5, modified: 8 }
      },
      {
        id: '4',
        timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
        author: 'ai',
        description: 'AI Optimization: Performance improvements and accessibility features',
        language: 'typescript',
        code: `import React, { useState, useCallback, useMemo } from 'react';
import './App.css';

interface AppState {
  count: number;
  message: string;
}

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    count: 0,
    message: 'Hello World'
  });

  const handleIncrement = useCallback(() => {
    setState(prev => ({ ...prev, count: prev.count + 1 }));
  }, []);

  const handleReset = useCallback(() => {
    setState(prev => ({ ...prev, count: 0 }));
  }, []);

  const countColor = useMemo(() => {
    if (state.count < 5) return 'text-blue-600';
    if (state.count < 10) return 'text-green-600';
    return 'text-red-600';
  }, [state.count]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full" role="main">
        <h1 className="text-3xl font-bold text-gray-800 mb-4" id="app-title">
          {state.message}
        </h1>
        <div className="text-center">
          <p 
            className={\`text-6xl font-bold mb-4 \${countColor}\`}
            aria-label={\`Current count is \${state.count}\`}
          >
            {state.count}
          </p>
          <div className="space-x-4">
            <button 
              onClick={handleIncrement}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Increment counter"
            >
              Increment
            </button>
            <button 
              onClick={handleReset}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              aria-label="Reset counter to zero"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;`,
        changes: { added: 12, removed: 3, modified: 15 }
      },
      {
        id: '5',
        timestamp: new Date(), // Now
        author: 'user',
        description: 'Added dark mode toggle and local storage persistence',
        language: 'typescript',
        code: `import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import './App.css';

interface AppState {
  count: number;
  message: string;
  darkMode: boolean;
}

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('appState');
    return saved ? JSON.parse(saved) : {
      count: 0,
      message: 'Hello World',
      darkMode: false
    };
  });

  useEffect(() => {
    localStorage.setItem('appState', JSON.stringify(state));
  }, [state]);

  const handleIncrement = useCallback(() => {
    setState(prev => ({ ...prev, count: prev.count + 1 }));
  }, []);

  const handleReset = useCallback(() => {
    setState(prev => ({ ...prev, count: 0 }));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setState(prev => ({ ...prev, darkMode: !prev.darkMode }));
  }, []);

  const countColor = useMemo(() => {
    const baseColors = state.darkMode 
      ? ['text-blue-400', 'text-green-400', 'text-red-400']
      : ['text-blue-600', 'text-green-600', 'text-red-600'];
    
    if (state.count < 5) return baseColors[0];
    if (state.count < 10) return baseColors[1];
    return baseColors[2];
  }, [state.count, state.darkMode]);

  const themeClasses = state.darkMode 
    ? 'bg-gray-900 text-white' 
    : 'bg-gradient-to-br from-blue-500 to-purple-600';

  return (
    <div className={\`min-h-screen \${themeClasses} flex items-center justify-center transition-colors duration-300\`}>
      <div className={\`\${state.darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl p-8 max-w-md w-full transition-colors duration-300\`} role="main">
        <div className="flex justify-between items-center mb-4">
          <h1 className={\`text-3xl font-bold \${state.darkMode ? 'text-white' : 'text-gray-800'}\`} id="app-title">
            {state.message}
          </h1>
          <button
            onClick={toggleDarkMode}
            className={\`p-2 rounded-lg transition-colors \${state.darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}\`}
            aria-label="Toggle dark mode"
          >
            {state.darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
        <div className="text-center">
          <p 
            className={\`text-6xl font-bold mb-4 \${countColor} transition-colors duration-300\`}
            aria-label={\`Current count is \${state.count}\`}
          >
            {state.count}
          </p>
          <div className="space-x-4">
            <button 
              onClick={handleIncrement}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Increment counter"
            >
              Increment
            </button>
            <button 
              onClick={handleReset}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              aria-label="Reset counter to zero"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;`,
        changes: { added: 20, removed: 8, modified: 12 }
      }
    ];

    setCodeVersions(mockVersions);
    setSelectedVersion(mockVersions[mockVersions.length - 1].id);
  }, []);

  const getAuthorIcon = (author: 'user' | 'ai') => {
    return author === 'user' ? (
      <User className="w-5 h-5 text-blue-400" />
    ) : (
      <Zap className="w-5 h-5 text-purple-400" />
    );
  };

  const getAuthorColor = (author: 'user' | 'ai') => {
    return author === 'user' 
      ? 'border-blue-500/30 bg-blue-500/10' 
      : 'border-purple-500/30 bg-purple-500/10';
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  const selectedVersionData = codeVersions.find(v => v.id === selectedVersion);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center space-x-3">
          <History className="w-10 h-10 text-green-400" />
          <span>Code Memory Layer</span>
          <GitBranch className="w-10 h-10 text-green-400" />
        </h2>
        <p className="text-white/70 text-lg">
          See how your code evolved over time with AI assistance and track every change.
        </p>
      </div>

      {/* View Mode Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-2 border border-white/20">
          {['timeline', 'diff', 'evolution'].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode as any)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 capitalize ${
                viewMode === mode
                  ? 'bg-indigo-500 text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline/Version List */}
        <div className="lg:col-span-1">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Version History</span>
            </h3>
            
            <div className="space-y-3">
              {codeVersions.map((version, index) => (
                <button
                  key={version.id}
                  onClick={() => setSelectedVersion(version.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                    selectedVersion === version.id
                      ? 'border-indigo-500/50 bg-indigo-500/20'
                      : `${getAuthorColor(version.author)} hover:bg-white/10`
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10">
                      {getAuthorIcon(version.author)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-white font-medium text-sm">
                          v{codeVersions.length - index}
                        </span>
                        <span className="text-white/60 text-xs capitalize">
                          {version.author}
                        </span>
                      </div>
                      <p className="text-white/80 text-sm mb-2 line-clamp-2">
                        {version.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-xs">
                          {formatTimeAgo(version.timestamp)}
                        </span>
                        <div className="flex items-center space-x-2 text-xs">
                          <span className="text-green-400">+{version.changes.added}</span>
                          <span className="text-red-400">-{version.changes.removed}</span>
                          <span className="text-yellow-400">~{version.changes.modified}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Code Display */}
        <div className="lg:col-span-2">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
            {selectedVersionData && (
              <>
                {/* Header */}
                <div className="p-6 border-b border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getAuthorIcon(selectedVersionData.author)}
                      <div>
                        <h4 className="text-white font-semibold">
                          Version {codeVersions.length - codeVersions.findIndex(v => v.id === selectedVersion)}
                        </h4>
                        <p className="text-white/70 text-sm">{selectedVersionData.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-white/60">
                        {formatTimeAgo(selectedVersionData.timestamp)}
                      </span>
                      <span className="text-white/60 capitalize">
                        {selectedVersionData.language}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-green-400">+{selectedVersionData.changes.added} lines</span>
                      <span className="text-red-400">-{selectedVersionData.changes.removed} lines</span>
                      <span className="text-yellow-400">~{selectedVersionData.changes.modified} modified</span>
                    </div>
                  </div>
                </div>

                {/* Code Content */}
                <div className="p-0">
                  <pre className="p-6 text-sm text-white/90 overflow-x-auto bg-black/20 max-h-96">
                    <code>{selectedVersionData.code}</code>
                  </pre>
                </div>
              </>
            )}
          </div>

          {/* Evolution Stats */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-500/20 backdrop-blur-md rounded-xl p-4 border border-green-500/30 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {codeVersions.reduce((sum, v) => sum + v.changes.added, 0)}
              </div>
              <div className="text-green-300 text-sm">Total Lines Added</div>
            </div>
            <div className="bg-blue-500/20 backdrop-blur-md rounded-xl p-4 border border-blue-500/30 text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {codeVersions.length}
              </div>
              <div className="text-blue-300 text-sm">Total Versions</div>
            </div>
            <div className="bg-purple-500/20 backdrop-blur-md rounded-xl p-4 border border-purple-500/30 text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">
                {codeVersions.filter(v => v.author === 'ai').length}
              </div>
              <div className="text-purple-300 text-sm">AI Contributions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={onBack}
          className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 border border-white/20"
        >
          Back to Main Menu
        </button>
      </div>
    </div>
  );
};