import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, AlertCircle, ExternalLink, Play, Pause, Globe, Server, Shield, Zap } from 'lucide-react';
import { DeploymentStep } from '../types';

interface DeploymentPipelineProps {
  onComplete: () => void;
  onBack: () => void;
}

export const DeploymentPipeline: React.FC<DeploymentPipelineProps> = ({
  onComplete,
  onBack
}) => {
  const [deploymentSteps, setDeploymentSteps] = useState<DeploymentStep[]>([
    {
      id: '1',
      name: 'Code Validation',
      status: 'pending',
      details: 'Running ESLint, TypeScript checks, and security scans'
    },
    {
      id: '2',
      name: 'Build Process',
      status: 'pending',
      details: 'Compiling code, bundling assets, optimizing images'
    },
    {
      id: '3',
      name: 'Unit Tests',
      status: 'pending',
      details: 'Running test suites and coverage analysis'
    },
    {
      id: '4',
      name: 'Integration Tests',
      status: 'pending',
      details: 'Testing API endpoints and database connections'
    },
    {
      id: '5',
      name: 'Security Scan',
      status: 'pending',
      details: 'OWASP security analysis and dependency vulnerability check'
    },
    {
      id: '6',
      name: 'Container Build',
      status: 'pending',
      details: 'Building Docker images and pushing to registry'
    },
    {
      id: '7',
      name: 'Production Deployment',
      status: 'pending',
      details: 'Deploying to production with CDN optimization'
    },
    {
      id: '8',
      name: 'Health Checks',
      status: 'pending',
      details: 'Verifying application health and performance metrics'
    }
  ]);

  const [currentStep, setCurrentStep] = useState(0);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentUrl, setDeploymentUrl] = useState<string | null>(null);
  const [deploymentStats, setDeploymentStats] = useState({
    buildTime: '0s',
    bundleSize: '0 KB',
    performanceScore: 0,
    securityScore: 0,
    testCoverage: 0
  });

  useEffect(() => {
    if (isDeploying && currentStep < deploymentSteps.length) {
      const timer = setTimeout(() => {
        setDeploymentSteps(prev => prev.map((step, index) => {
          if (index === currentStep) {
            return {
              ...step,
              status: 'running',
              duration: Math.floor(Math.random() * 45) + 15
            };
          }
          return step;
        }));

        setTimeout(() => {
          const isSuccess = Math.random() > 0.02; // 98% success rate
          setDeploymentSteps(prev => prev.map((step, index) => {
            if (index === currentStep) {
              return {
                ...step,
                status: isSuccess ? 'completed' : 'failed'
              };
            }
            return step;
          }));

          if (currentStep === deploymentSteps.length - 1 && isSuccess) {
            setIsDeploying(false);
            setDeploymentUrl('https://remarkable-sable-8be347.netlify.app');
            setDeploymentStats({
              buildTime: '3m 42s',
              bundleSize: '1.2 MB',
              performanceScore: 98,
              securityScore: 96,
              testCoverage: 94
            });
          } else if (isSuccess) {
            setCurrentStep(prev => prev + 1);
          } else {
            setIsDeploying(false);
          }
        }, Math.floor(Math.random() * 4000) + 3000);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isDeploying, currentStep, deploymentSteps.length]);

  const startDeployment = () => {
    setIsDeploying(true);
    setCurrentStep(0);
    setDeploymentUrl(null);
    setDeploymentSteps(prev => prev.map(step => ({ ...step, status: 'pending' })));
  };

  const retryFailedStep = () => {
    const failedStepIndex = deploymentSteps.findIndex(step => step.status === 'failed');
    if (failedStepIndex !== -1) {
      setCurrentStep(failedStepIndex);
      setIsDeploying(true);
      setDeploymentSteps(prev => prev.map((step, index) => {
        if (index >= failedStepIndex) {
          return { ...step, status: 'pending' };
        }
        return step;
      }));
    }
  };

  const getStatusIcon = (status: DeploymentStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'running':
        return <div className="w-5 h-5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: DeploymentStep['status']) => {
    switch (status) {
      case 'completed':
        return 'border-green-500/30 bg-green-500/10';
      case 'running':
        return 'border-indigo-500/30 bg-indigo-500/10';
      case 'failed':
        return 'border-red-500/30 bg-red-500/10';
      default:
        return 'border-white/20 bg-white/5';
    }
  };

  const completedSteps = deploymentSteps.filter(step => step.status === 'completed').length;
  const failedSteps = deploymentSteps.filter(step => step.status === 'failed').length;
  const progress = (completedSteps + failedSteps) / deploymentSteps.length * 100;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Production Deployment Pipeline</h2>
        <p className="text-white/70 text-lg">
          Automated deployment with comprehensive testing, security scanning, and performance optimization.
        </p>
      </div>

      {/* Enhanced Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-white">Deployment Progress</h3>
            <div className="text-white/80">
              {completedSteps}/{deploymentSteps.length} steps completed
            </div>
          </div>
          
          <div className="w-full bg-white/10 rounded-full h-4 mb-6">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-4 rounded-full transition-all duration-500 relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-green-500/20 rounded-lg p-4 border border-green-500/30">
              <div className="text-3xl font-bold text-green-400">{completedSteps}</div>
              <div className="text-green-300 text-sm">Completed</div>
            </div>
            <div className="bg-indigo-500/20 rounded-lg p-4 border border-indigo-500/30">
              <div className="text-3xl font-bold text-indigo-400">
                {deploymentSteps.filter(s => s.status === 'running').length}
              </div>
              <div className="text-indigo-300 text-sm">Running</div>
            </div>
            <div className="bg-red-500/20 rounded-lg p-4 border border-red-500/30">
              <div className="text-3xl font-bold text-red-400">{failedSteps}</div>
              <div className="text-red-300 text-sm">Failed</div>
            </div>
          </div>
        </div>

        {/* Enhanced Deployment Stats */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <Server className="w-5 h-5" />
            <span>Build Metrics</span>
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Build Time</span>
              <span className="text-white font-medium">{deploymentStats.buildTime}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Bundle Size</span>
              <span className="text-white font-medium">{deploymentStats.bundleSize}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Performance</span>
              <span className="text-green-400 font-medium">{deploymentStats.performanceScore}/100</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Security</span>
              <span className="text-blue-400 font-medium">{deploymentStats.securityScore}/100</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Test Coverage</span>
              <span className="text-purple-400 font-medium">{deploymentStats.testCoverage}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Deployment Steps */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Pipeline Steps</h3>
          {failedSteps > 0 && !isDeploying && (
            <button
              onClick={retryFailedStep}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <Zap className="w-4 h-4" />
              <span>Retry Failed</span>
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {deploymentSteps.map((step, index) => (
            <div
              key={step.id}
              className={`p-4 rounded-xl border transition-all duration-300 ${getStatusColor(step.status)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8">
                    {getStatusIcon(step.status)}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{step.name}</h4>
                    <p className="text-white/70 text-sm">{step.details}</p>
                  </div>
                </div>
                
                {step.duration && (
                  <div className="text-white/60 text-sm">
                    {step.duration}s
                  </div>
                )}
              </div>
              
              {step.status === 'running' && (
                <div className="mt-3">
                  <div className="w-full bg-white/10 rounded-full h-1">
                    <div className="bg-indigo-500 h-1 rounded-full animate-pulse" style={{ width: '60%' }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Deployment Success */}
      {deploymentUrl && (
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-2xl p-6 border border-green-500/30 mb-8">
          <div className="flex items-start space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-2 text-xl">🎉 Deployment Successful!</h3>
              <p className="text-white/70 text-sm mb-4">
                Your application has been successfully deployed to production with CDN optimization, 
                SSL certificate, and global edge locations for maximum performance and security.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <Globe className="w-6 h-6 text-green-400 mx-auto mb-1" />
                  <div className="text-white font-medium">Global CDN</div>
                  <div className="text-white/60 text-xs">Edge Locations</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <Shield className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                  <div className="text-white font-medium">SSL Secured</div>
                  <div className="text-white/60 text-xs">HTTPS Enabled</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <Server className="w-6 h-6 text-purple-400 mx-auto mb-1" />
                  <div className="text-white font-medium">Auto Deploy</div>
                  <div className="text-white/60 text-xs">Git Integration</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                  <div className="text-white font-medium">Optimized</div>
                  <div className="text-white/60 text-xs">Performance</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={deploymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  <span>View Live Application</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button className="inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 border border-white/20">
                  <span>View Deployment Logs</span>
                </button>
                <button className="inline-flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                  <span>Monitor Performance</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={onBack}
          className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 border border-white/20"
        >
          Back
        </button>
        
        {!isDeploying && !deploymentUrl && (
          <button
            onClick={startDeployment}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
          >
            <Play className="w-5 h-5" />
            <span>Deploy to Production</span>
          </button>
        )}
        
        {deploymentUrl && (
          <button
            onClick={onComplete}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
          >
            Complete Project
          </button>
        )}
      </div>
    </div>
  );
};