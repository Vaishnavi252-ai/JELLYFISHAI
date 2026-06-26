import { useState } from 'react';
import axios from 'axios';
import { CheckCircle, AlertCircle, Loader } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

interface DeploymentFlowProps {
  projectId: string;
  projectName: string;
  generatedCode: string;
  userId?: string;
}

export function DeploymentFlow({
  projectId,
  projectName,
  generatedCode,
  userId = 'demo-user'
}: DeploymentFlowProps) {
  const [step, setStep] = useState<'select' | 'deploying' | 'success' | 'failed'>('select');
  const [selectedPlatform, setSelectedPlatform] = useState<'netlify' | 'vercel' | null>(null);
  const [deploymentId, setDeploymentId] = useState<string | null>(null);
  const [liveUrl, setLiveUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deploymentProgress, setDeploymentProgress] = useState(0);

  // Step 1: Get OAuth URL
  const handleSelectPlatform = async (platform: 'netlify' | 'vercel') => {
    setSelectedPlatform(platform);
    
    try {
      const response = await axios.get(
        `${API_BASE_URL}/oauth/${platform}/authorize`,
        { params: { userId } }
      );
      
      // Redirect to OAuth
      if (response.data.authUrl) {
        window.location.href = response.data.authUrl;
      }
    } catch (err: any) {
      setError(`Failed to authorize with ${platform}: ${err.message}`);
    }
  };

  // Step 2: Start deployment
  const handleStartDeployment = async () => {
    if (!selectedPlatform) return;
    
    setStep('deploying');
    setDeploymentProgress(10);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/deployments/deploy`, {
        projectId,
        userId,
        platform: selectedPlatform,
        code: generatedCode
      });
      
      setDeploymentId(response.data.deploymentId);
      setDeploymentProgress(30);
      
      // Poll for deployment status
      pollDeploymentStatus(response.data.deploymentId);
    } catch (err: any) {
      setStep('failed');
      setError(err.response?.data?.error || err.message || 'Deployment failed');
      setDeploymentProgress(0);
    }
  };

  // Step 3: Poll deployment status
  const pollDeploymentStatus = async (depId: string) => {
    const maxAttempts = 120;
    let attempts = 0;
    
    const interval = setInterval(async () => {
      attempts++;
      
      try {
        const response = await axios.get(`${API_BASE_URL}/deployments/status/${depId}`);
        const { status, liveUrl: url, errorMessage } = response.data;
        
        // Update progress based on status
        if (status === 'authenticating') setDeploymentProgress(20);
        else if (status === 'deploying') setDeploymentProgress(60);
        else if (status === 'success') setDeploymentProgress(100);
        
        if (status === 'success') {
          clearInterval(interval);
          setLiveUrl(url);
          setStep('success');
        } else if (status === 'failed') {
          clearInterval(interval);
          setError(errorMessage || 'Deployment failed');
          setStep('failed');
        }
        
        if (attempts > maxAttempts) {
          clearInterval(interval);
          setError('Deployment timeout');
          setStep('failed');
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    }, 3000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {step === 'select' && (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white mb-6">🚀 Deploy Your App</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleSelectPlatform('netlify')}
              className={`p-4 rounded-lg border-2 transition ${
                selectedPlatform === 'netlify'
                  ? 'border-green-500 bg-green-500/10'
                  : 'border-gray-600 bg-gray-900 hover:border-green-500'
              }`}
            >
              <div className="text-2xl mb-2">🟢</div>
              <div className="font-bold text-white">Netlify</div>
              <div className="text-xs text-gray-400">Fast & Easy</div>
            </button>
            
            <button
              onClick={() => handleSelectPlatform('vercel')}
              disabled
              className="p-4 rounded-lg border-2 border-gray-700 bg-gray-900 opacity-50 cursor-not-allowed"
            >
              <div className="text-2xl mb-2">⚫</div>
              <div className="font-bold text-gray-500">Vercel</div>
              <div className="text-xs text-gray-500">Coming Soon</div>
            </button>
          </div>
          
          {selectedPlatform && (
            <button
              onClick={handleStartDeployment}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition"
            >
              Continue to {selectedPlatform}
            </button>
          )}
        </div>
      )}

      {step === 'deploying' && (
        <div className="text-center space-y-6">
          <Loader className="w-12 h-12 animate-spin mx-auto text-green-500" />
          <div>
            <h3 className="text-xl font-bold text-white">🚀 Deploying to {selectedPlatform}</h3>
            <p className="text-gray-400 mt-2">This may take 2-3 minutes</p>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${deploymentProgress}%` }}
            />
          </div>
          <p className="text-sm text-gray-400">{deploymentProgress}%</p>
        </div>
      )}

      {step === 'success' && liveUrl && (
        <div className="space-y-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          <div>
            <h3 className="text-2xl font-bold text-white">✅ Deployment Successful!</h3>
            <p className="text-gray-400 mt-2">Your app is now live!</p>
          </div>
          
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-xs text-gray-400 mb-2">Live URL</p>
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 break-all font-mono text-sm"
            >
              {liveUrl}
            </a>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => window.open(liveUrl, '_blank')}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              🔗 Open Live App
            </button>
            <button
              onClick={() => {
                setStep('select');
                setSelectedPlatform(null);
                setError(null);
              }}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              Generate Another
            </button>
          </div>
        </div>
      )}

      {step === 'failed' && (
        <div className="space-y-6 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
          <div>
            <h3 className="text-2xl font-bold text-white">❌ Deployment Failed</h3>
            <p className="text-gray-400 mt-2">{error || 'Unknown error'}</p>
          </div>
          
          <button
            onClick={() => {
              setStep('select');
              setSelectedPlatform(null);
              setError(null);
            }}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
