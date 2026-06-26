import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Info, CheckCircle, X, Lightbulb, Code, Zap, Clock } from 'lucide-react';

interface Warning {
  id: string;
  type: 'breaking-change' | 'security' | 'performance' | 'compatibility' | 'best-practice';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  suggestion: string;
  code?: string;
  file?: string;
  line?: number;
  canPrevent: boolean;
  autoFix?: string;
}

interface ProactiveAssistanceProps {
  currentCode: string;
  onCodeChange: (code: string) => void;
  onPreventAction: (warningId: string) => void;
}

export const ProactiveAssistance: React.FC<ProactiveAssistanceProps> = ({
  currentCode,
  onCodeChange,
  onPreventAction
}) => {
  const [warnings, setWarnings] = useState<Warning[]>([]);
  const [dismissedWarnings, setDismissedWarnings] = useState<Set<string>>(new Set());
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Analyze code for potential issues
  useEffect(() => {
    const analyzeCode = async () => {
      setIsAnalyzing(true);
      
      // Simulate AI analysis delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const detectedWarnings: Warning[] = [];

      // Check for potential breaking changes
      if (currentCode.includes('useState') && !currentCode.includes('import')) {
        detectedWarnings.push({
          id: 'missing-import-1',
          type: 'breaking-change',
          severity: 'high',
          title: 'Missing React Import',
          description: 'You\'re using React hooks but haven\'t imported React. This will cause a runtime error.',
          suggestion: 'Add the React import at the top of your file.',
          code: 'import React, { useState } from \'react\';',
          file: 'current',
          line: 1,
          canPrevent: true,
          autoFix: `import React, { useState } from 'react';\n\n${currentCode}`
        });
      }

      // Check for security issues
      if (currentCode.includes('innerHTML') || currentCode.includes('dangerouslySetInnerHTML')) {
        detectedWarnings.push({
          id: 'security-xss-1',
          type: 'security',
          severity: 'critical',
          title: 'Potential XSS Vulnerability',
          description: 'Using innerHTML or dangerouslySetInnerHTML with user input can lead to XSS attacks.',
          suggestion: 'Sanitize the HTML content or use safer alternatives like textContent.',
          code: `// Safe alternative
const sanitizeHtml = (html) => {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};`,
          file: 'current',
          canPrevent: true
        });
      }

      // Check for performance issues
      if (currentCode.includes('useEffect') && !currentCode.includes('[]')) {
        const useEffectCount = (currentCode.match(/useEffect/g) || []).length;
        const dependencyArrayCount = (currentCode.match(/\[\]/g) || []).length;
        
        if (useEffectCount > dependencyArrayCount) {
          detectedWarnings.push({
            id: 'performance-effect-1',
            type: 'performance',
            severity: 'medium',
            title: 'Missing useEffect Dependencies',
            description: 'useEffect without proper dependency array may cause infinite re-renders.',
            suggestion: 'Add a dependency array to useEffect or use useCallback for functions.',
            code: `// Add dependency array
useEffect(() => {
  // your effect code
}, [dependency1, dependency2]);`,
            file: 'current',
            canPrevent: true
          });
        }
      }

      // Check for compatibility issues
      if (currentCode.includes('async/await') && currentCode.includes('Internet Explorer')) {
        detectedWarnings.push({
          id: 'compatibility-1',
          type: 'compatibility',
          severity: 'medium',
          title: 'Browser Compatibility Issue',
          description: 'async/await is not supported in Internet Explorer without polyfills.',
          suggestion: 'Consider using Promises or add Babel polyfills for IE support.',
          code: `// Promise alternative
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));`,
          file: 'current',
          canPrevent: false
        });
      }

      // Check for best practices
      if (currentCode.includes('console.log') && currentCode.includes('production')) {
        detectedWarnings.push({
          id: 'best-practice-1',
          type: 'best-practice',
          severity: 'low',
          title: 'Console Logs in Production',
          description: 'Console.log statements should be removed before production deployment.',
          suggestion: 'Use a proper logging library or remove console statements.',
          code: `// Use conditional logging
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info');
}`,
          file: 'current',
          canPrevent: false
        });
      }

      // Check for unused variables
      const variableDeclarations = currentCode.match(/(?:const|let|var)\s+(\w+)/g);
      if (variableDeclarations) {
        variableDeclarations.forEach((declaration, index) => {
          const varName = declaration.split(/\s+/)[1];
          const usageCount = (currentCode.match(new RegExp(`\\b${varName}\\b`, 'g')) || []).length;
          
          if (usageCount === 1) { // Only declared, never used
            detectedWarnings.push({
              id: `unused-var-${index}`,
              type: 'best-practice',
              severity: 'low',
              title: `Unused Variable: ${varName}`,
              description: `Variable '${varName}' is declared but never used.`,
              suggestion: 'Remove unused variables to keep your code clean.',
              file: 'current',
              canPrevent: false
            });
          }
        });
      }

      setWarnings(detectedWarnings);
      setIsAnalyzing(false);
    };

    if (currentCode.trim()) {
      analyzeCode();
    } else {
      setWarnings([]);
      setIsAnalyzing(false);
    }
  }, [currentCode]);

  const getWarningIcon = (type: Warning['type']) => {
    switch (type) {
      case 'breaking-change': return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'security': return <Shield className="w-5 h-5 text-red-500" />;
      case 'performance': return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'compatibility': return <Info className="w-5 h-5 text-blue-400" />;
      case 'best-practice': return <Lightbulb className="w-5 h-5 text-green-400" />;
      default: return <Info className="w-5 h-5 text-gray-400" />;
    }
  };

  const getSeverityColor = (severity: Warning['severity']) => {
    switch (severity) {
      case 'critical': return 'border-red-500/50 bg-red-500/10';
      case 'high': return 'border-orange-500/50 bg-orange-500/10';
      case 'medium': return 'border-yellow-500/50 bg-yellow-500/10';
      case 'low': return 'border-blue-500/50 bg-blue-500/10';
      default: return 'border-gray-500/50 bg-gray-500/10';
    }
  };

  const dismissWarning = (warningId: string) => {
    setDismissedWarnings(prev => new Set([...prev, warningId]));
  };

  const applyAutoFix = (warning: Warning) => {
    if (warning.autoFix) {
      onCodeChange(warning.autoFix);
      dismissWarning(warning.id);
    }
  };

  const preventAction = (warning: Warning) => {
    onPreventAction(warning.id);
    dismissWarning(warning.id);
  };

  const visibleWarnings = warnings.filter(w => !dismissedWarnings.has(w.id));
  const criticalWarnings = visibleWarnings.filter(w => w.severity === 'critical');
  const highWarnings = visibleWarnings.filter(w => w.severity === 'high');

  return (
    <div className="space-y-4">
      {/* Analysis Status */}
      {isAnalyzing && (
        <div className="bg-blue-500/20 backdrop-blur-md rounded-lg p-4 border border-blue-500/30">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-blue-300 font-medium">AI is analyzing your code for potential issues...</span>
          </div>
        </div>
      )}

      {/* Critical Warnings Banner */}
      {criticalWarnings.length > 0 && (
        <div className="bg-red-500/20 backdrop-blur-md rounded-lg p-4 border border-red-500/30">
          <div className="flex items-center space-x-3 mb-2">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <h3 className="text-red-300 font-semibold">Critical Issues Detected!</h3>
          </div>
          <p className="text-red-200 text-sm">
            {criticalWarnings.length} critical issue{criticalWarnings.length > 1 ? 's' : ''} found that could break your application.
          </p>
        </div>
      )}

      {/* High Priority Warnings */}
      {highWarnings.length > 0 && (
        <div className="bg-orange-500/20 backdrop-blur-md rounded-lg p-4 border border-orange-500/30">
          <div className="flex items-center space-x-3 mb-2">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            <h3 className="text-orange-300 font-semibold">High Priority Warnings</h3>
          </div>
          <p className="text-orange-200 text-sm">
            {highWarnings.length} high priority issue{highWarnings.length > 1 ? 's' : ''} that should be addressed soon.
          </p>
        </div>
      )}

      {/* Warnings List */}
      {visibleWarnings.length > 0 && (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Proactive Assistance</h3>
            <span className="text-white/60 text-sm">
              {visibleWarnings.length} issue{visibleWarnings.length > 1 ? 's' : ''} detected
            </span>
          </div>

          <div className="space-y-3">
            {visibleWarnings.map((warning) => (
              <div
                key={warning.id}
                className={`border rounded-lg p-4 ${getSeverityColor(warning.severity)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {getWarningIcon(warning.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-white font-medium">{warning.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                          warning.severity === 'critical' ? 'bg-red-500/30 text-red-200' :
                          warning.severity === 'high' ? 'bg-orange-500/30 text-orange-200' :
                          warning.severity === 'medium' ? 'bg-yellow-500/30 text-yellow-200' :
                          'bg-blue-500/30 text-blue-200'
                        }`}>
                          {warning.severity}
                        </span>
                        <span className="px-2 py-1 bg-white/10 text-white/70 rounded-full text-xs capitalize">
                          {warning.type.replace('-', ' ')}
                        </span>
                      </div>
                      <p className="text-white/80 text-sm mb-2">{warning.description}</p>
                      <p className="text-white/60 text-sm mb-3">{warning.suggestion}</p>
                      
                      {warning.code && (
                        <details className="mb-3">
                          <summary className="text-white/70 text-sm cursor-pointer hover:text-white">
                            View suggested code
                          </summary>
                          <pre className="mt-2 bg-black/20 rounded p-3 text-sm text-white/90 overflow-x-auto">
                            <code>{warning.code}</code>
                          </pre>
                        </details>
                      )}

                      {warning.file && warning.line && (
                        <p className="text-white/50 text-xs">
                          {warning.file}:{warning.line}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    {warning.autoFix && (
                      <button
                        onClick={() => applyAutoFix(warning)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                      >
                        Auto Fix
                      </button>
                    )}
                    
                    {warning.canPrevent && (
                      <button
                        onClick={() => preventAction(warning)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                      >
                        Prevent
                      </button>
                    )}
                    
                    <button
                      onClick={() => dismissWarning(warning.id)}
                      className="text-white/60 hover:text-white p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Issues State */}
      {visibleWarnings.length === 0 && !isAnalyzing && currentCode.trim() && (
        <div className="bg-green-500/20 backdrop-blur-md rounded-lg p-6 border border-green-500/30 text-center">
          <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
          <h3 className="text-green-300 font-semibold mb-2">All Clear!</h3>
          <p className="text-green-200 text-sm">
            No potential issues detected in your code. Great work!
          </p>
        </div>
      )}

      {/* Summary Stats */}
      {visibleWarnings.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Critical', count: criticalWarnings.length, color: 'text-red-400' },
            { label: 'High', count: highWarnings.length, color: 'text-orange-400' },
            { label: 'Medium', count: visibleWarnings.filter(w => w.severity === 'medium').length, color: 'text-yellow-400' },
            { label: 'Low', count: visibleWarnings.filter(w => w.severity === 'low').length, color: 'text-blue-400' }
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 rounded-lg p-3 text-center">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.count}</div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};