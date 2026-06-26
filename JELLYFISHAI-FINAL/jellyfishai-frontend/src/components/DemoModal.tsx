import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Monitor, Smartphone, Tablet, Code, Database, Cloud, CheckCircle } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const demoSteps = [
    {
      title: 'Requirements Input',
      description: 'User describes their project requirements in natural language',
      mockup: (
        <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
          <div className="mb-2">$ Creating e-commerce platform...</div>
          <div className="mb-1">✓ User authentication system</div>
          <div className="mb-1">✓ Product catalog with search</div>
          <div className="mb-1">✓ Shopping cart functionality</div>
          <div className="mb-1">✓ Payment integration</div>
          <div className="mb-1">✓ Admin dashboard</div>
          <div className="animate-pulse">▋</div>
        </div>
      )
    },
    {
      title: 'Tech Stack Selection',
      description: 'AI recommends optimal technology stack based on requirements',
      mockup: (
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: 'React 18.3.1', icon: '⚛️', selected: true },
            { name: 'Node.js 20.10', icon: '💚', selected: true },
            { name: 'PostgreSQL 16', icon: '🐘', selected: true },
            { name: 'Docker 24.0', icon: '🐳', selected: true }
          ].map((tech, i) => (
            <div key={i} className={`p-3 rounded-lg border-2 ${tech.selected ? 'border-green-500 bg-green-500/20' : 'border-gray-300'}`}>
              <div className="flex items-center space-x-2">
                <span className="text-lg">{tech.icon}</span>
                <span className="text-sm font-medium">{tech.name}</span>
                {tech.selected && <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />}
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      title: 'Code Generation',
      description: 'AI generates production-ready code with best practices',
      mockup: (
        <div className="bg-gray-900 rounded-lg p-4 text-white font-mono text-xs overflow-hidden">
          <div className="text-blue-400 mb-2">// Generated React Component</div>
          <div className="text-purple-400">import React, {'{ useState }'} from 'react';</div>
          <div className="text-purple-400">import {'{ useAuth }'} from './hooks/useAuth';</div>
          <div className="mt-2 text-yellow-400">const ProductCatalog = () =&gt; {'{'}</div>
          <div className="ml-2 text-white">const [products, setProducts] = useState([]);</div>
          <div className="ml-2 text-white">const {'{ user }'} = useAuth();</div>
          <div className="mt-2 ml-2 text-green-400">// Optimized with React.memo</div>
          <div className="ml-2 text-cyan-400">return (</div>
          <div className="ml-4 text-white">{'<div className="product-grid">'}</div>
          <div className="ml-6 text-white">{'// Component logic...'}</div>
          <div className="animate-pulse text-gray-500">▋</div>
        </div>
      )
    },
    {
      title: 'Automated Testing',
      description: 'Comprehensive test suites generated and executed',
      mockup: (
        <div className="bg-gray-900 rounded-lg p-4 text-white font-mono text-sm">
          <div className="text-green-400 mb-2">Running test suites...</div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Unit Tests: 47 passed</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Integration Tests: 12 passed</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>E2E Tests: 8 passed</span>
            </div>
            <div className="text-green-400 mt-2">✓ Coverage: 94.2%</div>
          </div>
        </div>
      )
    },
    {
      title: 'Deployment Pipeline',
      description: 'Automated deployment to UAT environment with monitoring',
      mockup: (
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-green-500/20 rounded-lg border border-green-500/30">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <div>
              <div className="font-medium text-green-400">Deployed to UAT</div>
              <div className="text-sm text-gray-400">https://your-app-uat.netlify.app</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-blue-500/20 rounded">
              <div className="text-blue-400 font-bold">99.9%</div>
              <div className="text-xs text-gray-400">Uptime</div>
            </div>
            <div className="p-2 bg-green-500/20 rounded">
              <div className="text-green-400 font-bold">2.1s</div>
              <div className="text-xs text-gray-400">Load Time</div>
            </div>
            <div className="p-2 bg-purple-500/20 rounded">
              <div className="text-purple-400 font-bold">A+</div>
              <div className="text-xs text-gray-400">Security</div>
            </div>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % demoSteps.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, demoSteps.length]);

  const getDeviceClass = () => {
    switch (deviceView) {
      case 'mobile':
        return 'max-w-sm mx-auto';
      case 'tablet':
        return 'max-w-2xl mx-auto';
      default:
        return 'max-w-4xl mx-auto';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Interactive Demo</h2>
            <p className="text-gray-600">See how CodeGenAI transforms ideas into production code</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Demo Controls */}
          <div className="lg:w-1/3 p-6 border-r border-gray-200">
            <div className="space-y-4">
              {/* Playback Controls */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`p-3 rounded-lg transition-colors duration-200 ${
                    isPlaying ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => {
                    setCurrentStep(0);
                    setIsPlaying(false);
                  }}
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                >
                  <RotateCcw className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Device View Toggle */}
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                {[
                  { key: 'desktop', icon: Monitor },
                  { key: 'tablet', icon: Tablet },
                  { key: 'mobile', icon: Smartphone }
                ].map(({ key, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setDeviceView(key as any)}
                    className={`p-2 rounded-md transition-colors duration-200 ${
                      deviceView === key ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>

              {/* Step Navigation */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 mb-3">Demo Steps</h3>
                {demoSteps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      currentStep === index
                        ? 'bg-indigo-50 border-2 border-indigo-200 text-indigo-900'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent text-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        currentStep === index ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{step.title}</div>
                        <div className="text-sm opacity-70">{step.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Demo Content */}
          <div className="lg:w-2/3 p-6">
            <div className={`transition-all duration-500 ${getDeviceClass()}`}>
              <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {demoSteps[currentStep].title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">{demoSteps[currentStep].description}</p>
                
                <div className="bg-white rounded-lg p-4 border border-gray-200 min-h-[300px] flex items-center justify-center">
                  {demoSteps[currentStep].mockup}
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm text-gray-600">{currentStep + 1} of {demoSteps.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};