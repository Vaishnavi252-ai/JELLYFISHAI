import React, { useState } from 'react';
import { Users, Code, Eye, Brain, Shield, Zap } from 'lucide-react';
import { RealTimeCollaboration } from './RealTimeCollaboration';
import { InBrowserDevelopment } from './InBrowserDevelopment';
import { ContextAwareAI } from './ContextAwareAI';
import { ProactiveAssistance } from './ProactiveAssistance';
import { ProjectRequirement, TechStack } from '../types';

interface AdvancedCodeGenerationProps {
  requirements: ProjectRequirement[];
  techStack: TechStack[];
  onNext: () => void;
  onBack: () => void;
}

export const AdvancedCodeGeneration: React.FC<AdvancedCodeGenerationProps> = ({
  requirements,
  techStack,
  onNext,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState<'collaboration' | 'development' | 'ai-assistant' | 'proactive'>('development');
  const [currentCode, setCurrentCode] = useState(`import React, { useState, useEffect } from 'react';

const App = () => {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Hello World');

  const handleIncrement = () => {
    setCount(prev => prev + 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{message}</h1>
        <div className="text-center">
          <p className="text-6xl font-bold text-blue-600 mb-4">{count}</p>
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
};

export default App;`);

  const [projectContext] = useState({
    files: [
      { name: 'App.tsx', type: 'react', content: currentCode, lastModified: new Date() },
      { name: 'index.tsx', type: 'react', content: 'import React from "react";\nimport ReactDOM from "react-dom";\nimport App from "./App";\n\nReactDOM.render(<App />, document.getElementById("root"));', lastModified: new Date() },
      { name: 'package.json', type: 'json', content: '{"name": "my-app", "version": "1.0.0"}', lastModified: new Date() }
    ],
    dependencies: ['react', 'react-dom', 'typescript'],
    framework: 'React',
    architecture: ['SPA', 'Component-based'],
    codeQuality: 85,
    securityScore: 78,
    performanceScore: 92
  });

  const handleApplySuggestion = (suggestion: any) => {
    if (suggestion.code) {
      setCurrentCode(prev => prev + '\n\n' + suggestion.code);
    }
  };

  const handlePreventAction = (warningId: string) => {
    console.log('Preventing action for warning:', warningId);
  };

  const tabs = [
    { id: 'development', label: 'In-Browser Dev', icon: Code, description: 'Live coding with instant preview' },
    { id: 'collaboration', label: 'Live Collaboration', icon: Users, description: 'Real-time team coding' },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Brain, description: 'Context-aware suggestions' },
    { id: 'proactive', label: 'Proactive AI', icon: Shield, description: 'Prevent breaking changes' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Advanced Code Generation</h2>
        <p className="text-white/70 text-lg">
          Experience the future of development with real-time collaboration, AI assistance, and proactive error prevention.
        </p>
      </div>

      {/* Feature Tabs */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`p-4 rounded-xl transition-all duration-200 text-left ${
                  activeTab === tab.id
                    ? 'bg-indigo-500/30 border-indigo-500/50 text-white'
                    : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:text-white'
                } border`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </div>
                <p className="text-sm opacity-80">{tab.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
        {activeTab === 'development' && (
          <InBrowserDevelopment
            code={currentCode}
            onCodeChange={setCurrentCode}
            language="react"
          />
        )}

        {activeTab === 'collaboration' && (
          <RealTimeCollaboration
            projectId="demo-project-123"
            currentUser="You"
            onCodeChange={setCurrentCode}
            code={currentCode}
          />
        )}

        {activeTab === 'ai-assistant' && (
          <div className="p-6">
            <ContextAwareAI
              projectContext={projectContext}
              currentFile="App.tsx"
              currentCode={currentCode}
              onApplySuggestion={handleApplySuggestion}
            />
          </div>
        )}

        {activeTab === 'proactive' && (
          <div className="p-6">
            <ProactiveAssistance
              currentCode={currentCode}
              onCodeChange={setCurrentCode}
              onPreventAction={handlePreventAction}
            />
          </div>
        )}
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {[
          {
            icon: Users,
            title: 'Real-time Collaboration',
            description: 'Multiple developers can work on the same project simultaneously with live cursors and comments.',
            features: ['Live cursors', 'Real-time comments', 'Role-based permissions', 'Conflict resolution']
          },
          {
            icon: Eye,
            title: 'Instant Preview',
            description: 'See your changes immediately with hot reloading and responsive device previews.',
            features: ['Hot reloading', 'Device simulation', 'Console output', 'Error highlighting']
          },
          {
            icon: Brain,
            title: 'Context-Aware AI',
            description: 'AI understands your entire project and provides intelligent suggestions.',
            features: ['Project analysis', 'Smart suggestions', 'Code optimization', 'Best practices']
          },
          {
            icon: Shield,
            title: 'Proactive Protection',
            description: 'AI warns you before you make breaking changes and suggests fixes.',
            features: ['Breaking change detection', 'Security warnings', 'Performance alerts', 'Auto-fixes']
          }
        ].map((feature, index) => (
          <div key={index} className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <feature.icon className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-white font-semibold">{feature.title}</h3>
            </div>
            <p className="text-white/70 text-sm mb-4">{feature.description}</p>
            <ul className="space-y-1">
              {feature.features.map((item, i) => (
                <li key={i} className="text-white/60 text-sm flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={onBack}
          className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 border border-white/20"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
        >
          Continue to Deployment
        </button>
      </div>
    </div>
  );
};