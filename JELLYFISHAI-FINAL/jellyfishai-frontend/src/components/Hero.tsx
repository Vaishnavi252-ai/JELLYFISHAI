import React, { useState } from 'react';
import { ArrowRight, Zap, Code, Tent as Deployment, Play, X, Monitor, Smartphone, Tablet, Wrench, Globe, ExternalLink, Swords, History, Figma } from 'lucide-react';
import { DemoModal } from './DemoModal';

interface HeroProps {
  onGetStarted: () => void;
  onCodeCorrection: () => void;
  onAIBattle: () => void;
  onCodeMemory: () => void;
  onFigmaToCode: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onGetStarted, 
  onCodeCorrection, 
  onAIBattle, 
  onCodeMemory, 
  onFigmaToCode 
}) => {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Enhanced animated background with floating particles */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
          
          {/* Floating particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>

          {/* Gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            {/* Enhanced hero text with typing animation effect */}
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 mb-6">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-medium">Powered by Advanced AI Models</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight">
                <span className="block animate-fade-in-up">Transform Ideas</span>
                <span className="block bg-gradient-to-r from-yellow-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  Into Production Code
                </span>
              </h1>
              <p className="max-w-3xl mx-auto text-xl sm:text-2xl text-white/80 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                Revolutionary GenAI platform that converts natural language requirements into production-ready, 
                cloud-native applications with automated CI/CD deployment to UAT environments.
              </p>
            </div>

            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <button
                onClick={onGetStarted}
                className="group bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl hover:shadow-purple-500/25"
              >
                <span className="flex items-center space-x-2">
                  <span>Start Building Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </button>
              
              <button
                onClick={onCodeCorrection}
                className="group bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl hover:shadow-orange-500/25"
              >
                <span className="flex items-center space-x-2">
                  <Wrench className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                  <span>Fix My Code</span>
                </span>
              </button>
              
              <button 
                onClick={() => setShowDemo(true)}
                className="group text-white/80 hover:text-white px-8 py-4 rounded-xl font-medium text-lg transition-all duration-200 border border-white/20 hover:border-white/40 hover:bg-white/10 backdrop-blur-sm"
              >
                <span className="flex items-center space-x-2">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  <span>Watch Interactive Demo</span>
                </span>
              </button>
            </div>

            {/* New Innovative Features */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-fade-in-up mt-6" style={{ animationDelay: '0.8s' }}>
              <button
                onClick={onAIBattle}
                className="group bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl hover:shadow-yellow-500/25"
              >
                <span className="flex items-center space-x-2">
                  <Swords className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                  <span>AI Battle Mode</span>
                </span>
              </button>
              
              <button
                onClick={onCodeMemory}
                className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl hover:shadow-green-500/25"
              >
                <span className="flex items-center space-x-2">
                  <History className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  <span>Code Memory</span>
                </span>
              </button>
              
              <button
                onClick={onFigmaToCode}
                className="group bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl hover:shadow-pink-500/25"
              >
                <span className="flex items-center space-x-2">
                  <Figma className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  <span>Figma to Code</span>
                </span>
              </button>
            </div>

            {/* Enhanced feature cards with hover effects */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto mt-16 animate-fade-in-up" style={{ animationDelay: '1s' }}>
              {[
                {
                  icon: Zap,
                  title: 'AI-Powered Generation',
                  description: 'Advanced LLMs analyze requirements and generate optimized, version-specific code with best practices',
                  gradient: 'from-yellow-400 to-orange-500'
                },
                {
                  icon: Code,
                  title: 'Multi-Stack Support',
                  description: 'React, Vue, Angular, Node.js, Python, Go with automatic dependency management and configuration',
                  gradient: 'from-blue-400 to-cyan-500'
                },
                {
                  icon: Deployment,
                  title: 'Auto CI/CD Pipeline',
                  description: 'Integrated deployment to Netlify, AWS, Docker with automated testing and UAT environment setup',
                  gradient: 'from-green-400 to-emerald-500'
                },
                {
                  icon: Wrench,
                  title: 'Code Correction',
                  description: 'Upload buggy or incomplete code and get AI-powered fixes, optimizations, and enhancements',
                  gradient: 'from-orange-400 to-red-500'
                },
                {
                  icon: Swords,
                  title: 'AI Battle Mode',
                  description: 'Challenge AI in real-time coding competitions and improve your programming skills',
                  gradient: 'from-yellow-400 to-orange-500'
                },
                {
                  icon: History,
                  title: 'Code Evolution',
                  description: 'Track how your code evolved over time with detailed version history and AI contributions',
                  gradient: 'from-green-400 to-emerald-500'
                },
                {
                  icon: Figma,
                  title: 'Figma Integration',
                  description: 'Convert Figma designs directly to production-ready code with live preview and editing',
                  gradient: 'from-pink-400 to-purple-500'
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Stats section */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
              {[
                { number: '50+', label: 'Tech Stacks' },
                { number: '99.9%', label: 'Uptime' },
                { number: '10x', label: 'Faster Development' },
                { number: '100%', label: 'Cloud Native' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Live Demo Link */}
            <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '1.4s' }}>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-2xl mx-auto">
                <h3 className="text-white font-semibold mb-3 text-center">🚀 Live Platform Demo</h3>
                <p className="text-white/70 text-sm text-center mb-4">
                  Experience the full GenAI-powered development platform in action
                </p>
                <div className="text-center">
                  <a
                    href="https://remarkable-sable-8be347.netlify.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                  >
                    <Globe className="w-5 h-5" />
                    <span>View Live Application</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      <DemoModal isOpen={showDemo} onClose={() => setShowDemo(false)} />
    </>
  );
};