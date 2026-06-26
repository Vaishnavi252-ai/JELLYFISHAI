import React, { useState, useEffect } from 'react';
import { Brain, Eye, Lightbulb, AlertTriangle, CheckCircle, Zap, Code, FileText, Database, Workflow } from 'lucide-react';

interface ProjectContext {
  files: { name: string; type: string; content: string; lastModified: Date }[];
  dependencies: string[];
  framework: string;
  architecture: string[];
  codeQuality: number;
  securityScore: number;
  performanceScore: number;
}

interface AISuggestion {
  id: string;
  type: 'optimization' | 'security' | 'best-practice' | 'feature' | 'refactor';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  code?: string;
  file?: string;
  line?: number;
  impact: string;
  effort: 'low' | 'medium' | 'high';
}

interface ContextAwareAIProps {
  projectContext: ProjectContext;
  currentFile: string;
  currentCode: string;
  onApplySuggestion: (suggestion: AISuggestion) => void;
}

export const ContextAwareAI: React.FC<ContextAwareAIProps> = ({
  projectContext,
  currentFile,
  currentCode,
  onApplySuggestion
}) => {
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Analyze project context and generate suggestions
  useEffect(() => {
    analyzeProject();
  }, [projectContext, currentCode]);

  const analyzeProject = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newSuggestions: AISuggestion[] = [
      {
        id: '1',
        type: 'security',
        priority: 'high',
        title: 'Add Input Validation',
        description: 'User inputs are not being validated, which could lead to security vulnerabilities.',
        code: `// Add input validation
const validateInput = (input) => {
  if (!input || typeof input !== 'string') {
    throw new Error('Invalid input');
  }
  return input.trim();
};`,
        file: currentFile,
        line: 15,
        impact: 'Prevents XSS and injection attacks',
        effort: 'low'
      },
      {
        id: '2',
        type: 'optimization',
        priority: 'medium',
        title: 'Optimize React Rendering',
        description: 'Component is re-rendering unnecessarily. Consider using React.memo or useMemo.',
        code: `// Optimize with React.memo
const OptimizedComponent = React.memo(({ data }) => {
  const memoizedValue = useMemo(() => {
    return expensiveCalculation(data);
  }, [data]);
  
  return <div>{memoizedValue}</div>;
});`,
        file: currentFile,
        line: 8,
        impact: 'Improves performance by 30-50%',
        effort: 'low'
      },
      {
        id: '3',
        type: 'best-practice',
        priority: 'medium',
        title: 'Add Error Boundaries',
        description: 'Your React app lacks error boundaries, which could lead to white screen crashes.',
        code: `class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}`,
        file: 'src/components/ErrorBoundary.jsx',
        impact: 'Prevents app crashes and improves UX',
        effort: 'medium'
      },
      {
        id: '4',
        type: 'feature',
        priority: 'low',
        title: 'Add Loading States',
        description: 'Consider adding loading indicators for better user experience during async operations.',
        code: `const [loading, setLoading] = useState(false);

const handleAsyncOperation = async () => {
  setLoading(true);
  try {
    await someAsyncFunction();
  } finally {
    setLoading(false);
  }
};

return (
  <div>
    {loading ? <Spinner /> : <Content />}
  </div>
);`,
        file: currentFile,
        impact: 'Improves perceived performance',
        effort: 'low'
      },
      {
        id: '5',
        type: 'refactor',
        priority: 'medium',
        title: 'Extract Custom Hook',
        description: 'This logic could be extracted into a reusable custom hook.',
        code: `// Custom hook for data fetching
const useApiData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};`,
        file: 'src/hooks/useApiData.js',
        impact: 'Improves code reusability and maintainability',
        effort: 'medium'
      }
    ];

    setSuggestions(newSuggestions);
    setIsAnalyzing(false);
  };

  const getSuggestionIcon = (type: AISuggestion['type']) => {
    switch (type) {
      case 'security': return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'optimization': return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'best-practice': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'feature': return <Lightbulb className="w-5 h-5 text-blue-400" />;
      case 'refactor': return <Code className="w-5 h-5 text-purple-400" />;
      default: return <Brain className="w-5 h-5 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: AISuggestion['priority']) => {
    switch (priority) {
      case 'critical': return 'border-red-500/50 bg-red-500/10';
      case 'high': return 'border-orange-500/50 bg-orange-500/10';
      case 'medium': return 'border-yellow-500/50 bg-yellow-500/10';
      case 'low': return 'border-green-500/50 bg-green-500/10';
      default: return 'border-gray-500/50 bg-gray-500/10';
    }
  };

  const getEffortBadge = (effort: AISuggestion['effort']) => {
    const colors = {
      low: 'bg-green-500/20 text-green-300',
      medium: 'bg-yellow-500/20 text-yellow-300',
      high: 'bg-red-500/20 text-red-300'
    };
    return colors[effort];
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Brain className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-semibold text-white">Context-Aware AI Assistant</h3>
        </div>
        
        <div className="flex items-center space-x-4">
          {isAnalyzing && (
            <div className="flex items-center space-x-2 text-purple-300">
              <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm">Analyzing...</span>
            </div>
          )}
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-white/70 hover:text-white text-sm"
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
        </div>
      </div>

      {/* Project Overview */}
      {showDetails && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Code Quality</h4>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-white/10 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${projectContext.codeQuality}%` }}
                />
              </div>
              <span className="text-white text-sm">{projectContext.codeQuality}%</span>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Security Score</h4>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-white/10 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${projectContext.securityScore}%` }}
                />
              </div>
              <span className="text-white text-sm">{projectContext.securityScore}%</span>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Performance</h4>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-white/10 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${projectContext.performanceScore}%` }}
                />
              </div>
              <span className="text-white text-sm">{projectContext.performanceScore}%</span>
            </div>
          </div>
        </div>
      )}

      {/* AI Suggestions */}
      <div className="space-y-4">
        <h4 className="text-white font-medium">AI Suggestions ({suggestions.length})</h4>
        
        {suggestions.length === 0 && !isAnalyzing && (
          <div className="text-center py-8 text-white/60">
            <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No suggestions at the moment. Your code looks good!</p>
          </div>
        )}

        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className={`border rounded-xl p-4 transition-all duration-200 hover:bg-white/5 cursor-pointer ${getPriorityColor(suggestion.priority)}`}
            onClick={() => setSelectedSuggestion(selectedSuggestion === suggestion.id ? null : suggestion.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                {getSuggestionIcon(suggestion.type)}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h5 className="text-white font-medium">{suggestion.title}</h5>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getEffortBadge(suggestion.effort)}`}>
                      {suggestion.effort} effort
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                      suggestion.priority === 'critical' ? 'bg-red-500/20 text-red-300' :
                      suggestion.priority === 'high' ? 'bg-orange-500/20 text-orange-300' :
                      suggestion.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-green-500/20 text-green-300'
                    }`}>
                      {suggestion.priority}
                    </span>
                  </div>
                  <p className="text-white/70 text-sm">{suggestion.description}</p>
                  <p className="text-white/60 text-xs mt-1">Impact: {suggestion.impact}</p>
                  {suggestion.file && suggestion.line && (
                    <p className="text-white/50 text-xs mt-1">
                      {suggestion.file}:{suggestion.line}
                    </p>
                  )}
                </div>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onApplySuggestion(suggestion);
                }}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Apply
              </button>
            </div>

            {/* Expanded Details */}
            {selectedSuggestion === suggestion.id && suggestion.code && (
              <div className="mt-4 pt-4 border-t border-white/20">
                <h6 className="text-white font-medium mb-2">Suggested Code:</h6>
                <pre className="bg-black/20 rounded-lg p-3 text-sm text-white/90 overflow-x-auto">
                  <code>{suggestion.code}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-white/20">
        <div className="flex items-center justify-between">
          <span className="text-white/70 text-sm">
            AI is continuously monitoring your project for improvements
          </span>
          <button
            onClick={analyzeProject}
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>Re-analyze</span>
          </button>
        </div>
      </div>
    </div>
  );
};