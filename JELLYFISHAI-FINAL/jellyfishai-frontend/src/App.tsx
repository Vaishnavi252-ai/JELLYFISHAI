import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { RequirementsInput } from './components/RequirementsInput';
import { TechStackSelector } from './components/TechStackSelector';
import { CodeGeneration } from './components/CodeGeneration';
import { DeploymentPipeline } from './components/DeploymentPipeline';
import { CodeCorrection } from './components/CodeCorrection';
import { AIBattleMode } from './components/AIBattleMode';
import { CodeMemoryLayer } from './components/CodeMemoryLayer';
import { FigmaToCode } from './components/FigmaToCode';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AuthPage } from './components/AuthPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProjectRequirement, TechStack } from './types';
import { LogOut } from 'lucide-react';

type Step = 'hero' | 'requirements' | 'techstack' | 'generation' | 'deployment' | 'complete' | 'correction' | 'battle' | 'memory' | 'figma';

function AppContent() {
  const { isAuthenticated, user, logout } = useAuth();

  // If not authenticated, show auth page
  if (!isAuthenticated) {
    return <AuthPage />;
  }

  const [currentStep, setCurrentStep] = useState<Step>('hero');
  const [requirements, setRequirements] = useState<ProjectRequirement[]>([]);
  const [selectedTechStack, setSelectedTechStack] = useState<TechStack[]>([]);

  const handleGetStarted = () => {
    setCurrentStep('requirements');
  };

  const handleCodeCorrection = () => {
    setCurrentStep('correction');
  };

  const handleAIBattle = () => {
    setCurrentStep('battle');
  };

  const handleCodeMemory = () => {
    setCurrentStep('memory');
  };

  const handleFigmaToCode = () => {
    setCurrentStep('figma');
  };

  const handleRequirementsNext = () => {
    setCurrentStep('techstack');
  };

  const handleTechStackNext = () => {
    setCurrentStep('generation');
  };

  const handleTechStackBack = () => {
    setCurrentStep('requirements');
  };

  const handleGenerationNext = () => {
    setCurrentStep('deployment');
  };

  const handleGenerationBack = () => {
    setCurrentStep('techstack');
  };

  const handleDeploymentComplete = () => {
    setCurrentStep('complete');
  };

  const handleDeploymentBack = () => {
    setCurrentStep('generation');
  };

  const handleStartOver = () => {
    setCurrentStep('hero');
    setRequirements([]);
    setSelectedTechStack([]);
  };

  const handleCorrectionBack = () => {
    setCurrentStep('hero');
  };

  const handleBattleBack = () => {
    setCurrentStep('hero');
  };

  const handleMemoryBack = () => {
    setCurrentStep('hero');
  };

  const handleFigmaBack = () => {
    setCurrentStep('hero');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'hero':
        return (
          <Hero 
            onGetStarted={handleGetStarted} 
            onCodeCorrection={handleCodeCorrection}
            onAIBattle={handleAIBattle}
            onCodeMemory={handleCodeMemory}
            onFigmaToCode={handleFigmaToCode}
          />
        );
      case 'requirements':
        return (
          <RequirementsInput
            requirements={requirements}
            onRequirementsChange={setRequirements}
            onNext={handleRequirementsNext}
          />
        );
      case 'techstack':
        return (
          <TechStackSelector
            selectedStack={selectedTechStack}
            onStackChange={setSelectedTechStack}
            requirements={requirements}
            onNext={handleTechStackNext}
            onBack={handleTechStackBack}
          />
        );
      case 'generation':
        return (
          <CodeGeneration
            requirements={requirements}
            techStack={selectedTechStack}
            onNext={handleGenerationNext}
            onBack={handleGenerationBack}
          />
        );
      case 'deployment':
        return (
          <DeploymentPipeline
            onComplete={handleDeploymentComplete}
            onBack={handleDeploymentBack}
          />
        );
      case 'correction':
        return (
          <CodeCorrection
            onBack={handleCorrectionBack}
          />
        );
      case 'battle':
        return (
          <AIBattleMode
            onBack={handleBattleBack}
          />
        );
      case 'memory':
        return (
          <CodeMemoryLayer
            onBack={handleMemoryBack}
          />
        );
      case 'figma':
        return (
          <FigmaToCode
            onBack={handleFigmaBack}
          />
        );
      case 'complete':
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-4xl mx-auto text-center p-6">
              <div className="mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-5xl font-bold text-white mb-6 animate-fade-in-up">
                  🎉 Project Successfully Deployed!
                </h2>
                <p className="text-white/80 text-xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  Your GenAI-powered development platform has successfully generated production-ready code 
                  and deployed it to Netlify with global CDN, SSL security, and automated CI/CD pipeline.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <h3 className="text-xl font-semibold text-white mb-4">Development Metrics</h3>
                  <div className="space-y-3 text-left">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Requirements Analyzed</span>
                      <span className="text-green-400 font-bold">{requirements.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Technologies Selected</span>
                      <span className="text-blue-400 font-bold">{selectedTechStack.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Code Files Generated</span>
                      <span className="text-purple-400 font-bold">12+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Test Coverage</span>
                      <span className="text-emerald-400 font-bold">94.2%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  <h3 className="text-xl font-semibold text-white mb-4">Deployment Features</h3>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-white/80">Global CDN Distribution</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-white/80">SSL Certificate Enabled</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-white/80">Automated CI/CD Pipeline</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-white/80">Performance Monitoring</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                <button
                  onClick={handleStartOver}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-2xl"
                >
                  Create New Project
                </button>
                <a
                  href="https://remarkable-sable-8be347.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 border border-white/20 hover:border-white/40"
                >
                  View Live Demo
                </a>
              </div>
            </div>
          </div>
        );
      default:
        return <Hero onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        {!['hero', 'complete', 'correction', 'battle', 'memory', 'figma'].includes(currentStep) && (
          <div className="flex items-center justify-between p-4 bg-black/20 backdrop-blur-sm">
            <Header />
            <div className="flex items-center gap-4">
              <span className="text-white text-sm">Welcome, {user?.name}!</span>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        )}
        {renderStep()}
      </div>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}