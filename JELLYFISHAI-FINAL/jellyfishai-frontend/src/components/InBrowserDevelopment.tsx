import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, RefreshCw, Monitor, Smartphone, Tablet, Code, Eye, Settings, Zap, AlertTriangle, CheckCircle } from 'lucide-react';

interface InBrowserDevelopmentProps {
  code: string;
  onCodeChange: (code: string) => void;
  language: string;
}

interface ConsoleMessage {
  id: string;
  type: 'log' | 'error' | 'warn' | 'info';
  message: string;
  timestamp: Date;
}

export const InBrowserDevelopment: React.FC<InBrowserDevelopmentProps> = ({
  code,
  onCodeChange,
  language
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [viewMode, setViewMode] = useState<'split' | 'code' | 'preview'>('split');
  const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>([]);
  const [showConsole, setShowConsole] = useState(false);
  const [autoRun, setAutoRun] = useState(true);
  const [buildStatus, setBuildStatus] = useState<'idle' | 'building' | 'success' | 'error'>('idle');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  // Auto-run when code changes
  useEffect(() => {
    if (autoRun && code.trim()) {
      const timer = setTimeout(() => {
        runCode();
      }, 1000); // Debounce for 1 second

      return () => clearTimeout(timer);
    }
  }, [code, autoRun]);

  const runCode = async () => {
    setIsRunning(true);
    setBuildStatus('building');
    setConsoleMessages([]);

    try {
      // Simulate build process
      await new Promise(resolve => setTimeout(resolve, 500));

      if (language === 'html' || language === 'javascript' || language === 'react') {
        const htmlContent = generateHTMLContent();
        
        if (iframeRef.current) {
          const iframe = iframeRef.current;
          iframe.srcdoc = htmlContent;
          
          // Listen for console messages from iframe
          iframe.onload = () => {
            try {
              const iframeWindow = iframe.contentWindow;
              if (iframeWindow) {
                // Override console methods to capture messages
                const originalConsole = iframeWindow.console;
                iframeWindow.console = {
                  ...originalConsole,
                  log: (...args) => {
                    addConsoleMessage('log', args.join(' '));
                    originalConsole.log(...args);
                  },
                  error: (...args) => {
                    addConsoleMessage('error', args.join(' '));
                    originalConsole.error(...args);
                  },
                  warn: (...args) => {
                    addConsoleMessage('warn', args.join(' '));
                    originalConsole.warn(...args);
                  },
                  info: (...args) => {
                    addConsoleMessage('info', args.join(' '));
                    originalConsole.info(...args);
                  }
                };
              }
            } catch (error) {
              addConsoleMessage('error', 'Failed to setup console capture');
            }
          };
        }

        setBuildStatus('success');
        addConsoleMessage('info', 'Code executed successfully');
      } else {
        setBuildStatus('error');
        addConsoleMessage('error', `Language ${language} not supported in browser preview`);
      }
    } catch (error) {
      setBuildStatus('error');
      addConsoleMessage('error', `Build failed: ${error}`);
    } finally {
      setIsRunning(false);
    }
  };

  const generateHTMLContent = () => {
    if (language === 'react') {
      return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live Preview</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .error { color: red; padding: 10px; background: #fee; border: 1px solid #fcc; border-radius: 4px; margin: 10px 0; }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
        try {
            ${code}
            
            // If code doesn't contain ReactDOM.render, try to render a default component
            if (!code.includes('ReactDOM.render') && !code.includes('createRoot')) {
                const App = () => {
                    return React.createElement('div', {}, 'Component rendered successfully!');
                };
                ReactDOM.render(React.createElement(App), document.getElementById('root'));
            }
        } catch (error) {
            console.error('Runtime Error:', error.message);
            document.getElementById('root').innerHTML = '<div class="error">Error: ' + error.message + '</div>';
        }
    </script>
</body>
</html>`;
    } else if (language === 'html') {
      return code;
    } else {
      return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live Preview</title>
    <style>
        body { margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    </style>
</head>
<body>
    <script>
        try {
            ${code}
        } catch (error) {
            console.error('Runtime Error:', error.message);
            document.body.innerHTML = '<div style="color: red; padding: 10px; background: #fee; border: 1px solid #fcc; border-radius: 4px;">Error: ' + error.message + '</div>';
        }
    </script>
</body>
</html>`;
    }
  };

  const addConsoleMessage = (type: ConsoleMessage['type'], message: string) => {
    const newMessage: ConsoleMessage = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date()
    };
    setConsoleMessages(prev => [...prev, newMessage]);
  };

  const stopExecution = () => {
    setIsRunning(false);
    if (iframeRef.current) {
      iframeRef.current.srcdoc = '<html><body><p>Execution stopped</p></body></html>';
    }
    addConsoleMessage('info', 'Execution stopped by user');
  };

  const refreshPreview = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
    runCode();
  };

  const getPreviewScale = () => {
    switch (previewMode) {
      case 'mobile': return 'scale-75 w-80';
      case 'tablet': return 'scale-90 w-96';
      default: return 'scale-100 w-full';
    }
  };

  const getConsoleIcon = (type: ConsoleMessage['type']) => {
    switch (type) {
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'warn': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'info': return <CheckCircle className="w-4 h-4 text-blue-400" />;
      default: return <Code className="w-4 h-4 text-gray-400" />;
    }
  };

  const getConsoleColor = (type: ConsoleMessage['type']) => {
    switch (type) {
      case 'error': return 'text-red-300';
      case 'warn': return 'text-yellow-300';
      case 'info': return 'text-blue-300';
      default: return 'text-white';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="text-white font-semibold">In-Browser Development</h3>
            
            {/* Run Controls */}
            <div className="flex items-center space-x-2">
              {!isRunning ? (
                <button
                  onClick={runCode}
                  className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <Play className="w-4 h-4" />
                  <span>Run</span>
                </button>
              ) : (
                <button
                  onClick={stopExecution}
                  className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <Square className="w-4 h-4" />
                  <span>Stop</span>
                </button>
              )}
              
              <button
                onClick={refreshPreview}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {/* Build Status */}
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
              buildStatus === 'success' ? 'bg-green-500/20 text-green-300' :
              buildStatus === 'error' ? 'bg-red-500/20 text-red-300' :
              buildStatus === 'building' ? 'bg-yellow-500/20 text-yellow-300' :
              'bg-gray-500/20 text-gray-300'
            }`}>
              {buildStatus === 'building' && <div className="w-3 h-3 border border-yellow-300 border-t-transparent rounded-full animate-spin" />}
              {buildStatus === 'success' && <CheckCircle className="w-3 h-3" />}
              {buildStatus === 'error' && <AlertTriangle className="w-3 h-3" />}
              <span className="capitalize">{buildStatus === 'idle' ? 'Ready' : buildStatus}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Auto-run Toggle */}
            <label className="flex items-center space-x-2 text-white/80">
              <input
                type="checkbox"
                checked={autoRun}
                onChange={(e) => setAutoRun(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Auto-run</span>
            </label>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-1 bg-white/10 rounded-lg p-1">
              {[
                { key: 'split', icon: Settings, label: 'Split' },
                { key: 'code', icon: Code, label: 'Code' },
                { key: 'preview', icon: Eye, label: 'Preview' }
              ].map(({ key, icon: Icon, label }) => (
                <button
                  key={key}
                  onClick={() => setViewMode(key as any)}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-colors text-sm ${
                    viewMode === key ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Device Preview Toggle */}
            <div className="flex items-center space-x-1 bg-white/10 rounded-lg p-1">
              {[
                { key: 'desktop', icon: Monitor },
                { key: 'tablet', icon: Tablet },
                { key: 'mobile', icon: Smartphone }
              ].map(({ key, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setPreviewMode(key as any)}
                  className={`p-2 rounded-md transition-colors ${
                    previewMode === key ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>

            {/* Console Toggle */}
            <button
              onClick={() => setShowConsole(!showConsole)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                showConsole ? 'bg-blue-500/20 text-blue-300' : 'bg-white/10 text-white/70 hover:text-white'
              }`}
            >
              <Code className="w-4 h-4" />
              <span>Console</span>
              {consoleMessages.length > 0 && (
                <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {consoleMessages.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Code Editor */}
        {(viewMode === 'split' || viewMode === 'code') && (
          <div className={`${viewMode === 'split' ? 'w-1/2' : 'w-full'} border-r border-white/20`}>
            <textarea
              ref={editorRef}
              value={code}
              onChange={(e) => onCodeChange(e.target.value)}
              className="w-full h-full bg-black/20 border-0 p-4 text-white font-mono text-sm resize-none focus:outline-none"
              placeholder={`Write your ${language} code here...`}
              spellCheck={false}
            />
          </div>
        )}

        {/* Preview */}
        {(viewMode === 'split' || viewMode === 'preview') && (
          <div className={`${viewMode === 'split' ? 'w-1/2' : 'w-full'} bg-gray-100 flex items-center justify-center p-4`}>
            <div className={`transition-all duration-300 ${getPreviewScale()}`}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gray-200 px-4 py-2 flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="flex-1 text-center text-gray-600 text-sm">Live Preview</div>
                </div>
                <iframe
                  ref={iframeRef}
                  className="w-full h-96 border-0"
                  title="Live Preview"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Console */}
      {showConsole && (
        <div className="h-48 bg-black/30 border-t border-white/20 p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-white font-medium">Console Output</h4>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setConsoleMessages([])}
                className="text-white/60 hover:text-white text-sm"
              >
                Clear
              </button>
              <button
                onClick={() => setShowConsole(false)}
                className="text-white/60 hover:text-white"
              >
                ×
              </button>
            </div>
          </div>
          <div className="space-y-1 max-h-32 overflow-y-auto font-mono text-sm">
            {consoleMessages.map((msg) => (
              <div key={msg.id} className={`flex items-start space-x-2 ${getConsoleColor(msg.type)}`}>
                {getConsoleIcon(msg.type)}
                <span className="text-white/60 text-xs">
                  {msg.timestamp.toLocaleTimeString()}
                </span>
                <span className="flex-1">{msg.message}</span>
              </div>
            ))}
            {consoleMessages.length === 0 && (
              <div className="text-white/60 text-center py-4">
                Console output will appear here...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};