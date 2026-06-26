import React, { useState } from 'react';
import { Figma, Code, Eye, Download, Zap, ExternalLink, Smartphone, Tablet, Monitor, Palette } from 'lucide-react';

interface FigmaToCodeProps {
  onBack: () => void;
}

export const FigmaToCode: React.FC<FigmaToCodeProps> = ({ onBack }) => {
  const [figmaUrl, setFigmaUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [codeLanguage, setCodeLanguage] = useState<'react' | 'vue' | 'html'>('react');
  const [extractedDesign, setExtractedDesign] = useState<any>(null);

  const handleFigmaSubmit = async () => {
    if (!figmaUrl.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate API processing
    setTimeout(() => {
      // Mock extracted design data
      setExtractedDesign({
        colors: ['#3B82F6', '#8B5CF6', '#EF4444', '#10B981', '#F59E0B'],
        fonts: ['Inter', 'Roboto', 'Poppins'],
        components: ['Header', 'Hero Section', 'Card Grid', 'Footer'],
        spacing: '8px grid system',
        breakpoints: ['sm: 640px', 'md: 768px', 'lg: 1024px', 'xl: 1280px']
      });
      
      // Generate code based on selected language
      const codeTemplates = {
        react: `import React from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold">L</span>
              </div>
              <span className="text-white font-semibold text-lg">Logo</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white/80 hover:text-white transition-colors">Home</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">About</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">Services</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">Contact</a>
            </nav>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Build Amazing
            <span className="block bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
              Digital Experiences
            </span>
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Transform your ideas into stunning web applications with our cutting-edge development platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all">
              Start Building
            </button>
            <button className="border border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Fast Development', description: 'Build applications 10x faster with AI assistance', icon: '⚡' },
              { title: 'Modern Design', description: 'Beautiful, responsive designs that work everywhere', icon: '🎨' },
              { title: 'Easy Deployment', description: 'Deploy to production with a single click', icon: '🚀' }
            ].map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-white font-semibold text-xl mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/20 border-t border-white/20 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/60">© 2024 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;`,
        vue: `<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
    <!-- Header -->
    <header class="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span class="text-blue-600 font-bold">L</span>
            </div>
            <span class="text-white font-semibold text-lg">Logo</span>
          </div>
          <nav class="hidden md:flex items-center space-x-8">
            <a href="#" class="text-white/80 hover:text-white transition-colors">Home</a>
            <a href="#" class="text-white/80 hover:text-white transition-colors">About</a>
            <a href="#" class="text-white/80 hover:text-white transition-colors">Services</a>
            <a href="#" class="text-white/80 hover:text-white transition-colors">Contact</a>
          </nav>
          <button class="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="py-20 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-5xl md:text-6xl font-bold text-white mb-6">
          Build Amazing
          <span class="block bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
            Digital Experiences
          </span>
        </h1>
        <p class="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Transform your ideas into stunning web applications with our cutting-edge development platform.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all">
            Start Building
          </button>
          <button class="border border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all">
            Watch Demo
          </button>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(feature, index) in features" :key="index" 
               class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
            <div class="text-4xl mb-4">{{ feature.icon }}</div>
            <h3 class="text-white font-semibold text-xl mb-2">{{ feature.title }}</h3>
            <p class="text-white/70">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-black/20 border-t border-white/20 py-8 px-4">
      <div class="max-w-6xl mx-auto text-center">
        <p class="text-white/60">© 2024 Your Company. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data() {
    return {
      features: [
        { title: 'Fast Development', description: 'Build applications 10x faster with AI assistance', icon: '⚡' },
        { title: 'Modern Design', description: 'Beautiful, responsive designs that work everywhere', icon: '🎨' },
        { title: 'Easy Deployment', description: 'Deploy to production with a single click', icon: '🚀' }
      ]
    }
  }
}
</script>`,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing Page</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
    <!-- Header -->
    <header class="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        <span class="text-blue-600 font-bold">L</span>
                    </div>
                    <span class="text-white font-semibold text-lg">Logo</span>
                </div>
                <nav class="hidden md:flex items-center space-x-8">
                    <a href="#" class="text-white/80 hover:text-white transition-colors">Home</a>
                    <a href="#" class="text-white/80 hover:text-white transition-colors">About</a>
                    <a href="#" class="text-white/80 hover:text-white transition-colors">Services</a>
                    <a href="#" class="text-white/80 hover:text-white transition-colors">Contact</a>
                </nav>
                <button class="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Get Started
                </button>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="py-20 px-4">
        <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-5xl md:text-6xl font-bold text-white mb-6">
                Build Amazing
                <span class="block bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                    Digital Experiences
                </span>
            </h1>
            <p class="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Transform your ideas into stunning web applications with our cutting-edge development platform.
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all">
                    Start Building
                </button>
                <button class="border border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all">
                    Watch Demo
                </button>
            </div>
        </div>
    </section>

    <!-- Features Grid -->
    <section class="py-16 px-4">
        <div class="max-w-6xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                    <div class="text-4xl mb-4">⚡</div>
                    <h3 class="text-white font-semibold text-xl mb-2">Fast Development</h3>
                    <p class="text-white/70">Build applications 10x faster with AI assistance</p>
                </div>
                <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                    <div class="text-4xl mb-4">🎨</div>
                    <h3 class="text-white font-semibold text-xl mb-2">Modern Design</h3>
                    <p class="text-white/70">Beautiful, responsive designs that work everywhere</p>
                </div>
                <div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                    <div class="text-4xl mb-4">🚀</div>
                    <h3 class="text-white font-semibold text-xl mb-2">Easy Deployment</h3>
                    <p class="text-white/70">Deploy to production with a single click</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-black/20 border-t border-white/20 py-8 px-4">
        <div class="max-w-6xl mx-auto text-center">
            <p class="text-white/60">© 2024 Your Company. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>`
      };
      
      setGeneratedCode(codeTemplates[codeLanguage]);
      setIsProcessing(false);
    }, 3000);
  };

  const downloadCode = () => {
    if (!generatedCode) return;
    
    const fileExtensions = {
      react: 'tsx',
      vue: 'vue',
      html: 'html'
    };
    
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `landing-page.${fileExtensions[codeLanguage]}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getPreviewScale = () => {
    switch (previewMode) {
      case 'mobile': return 'scale-50 w-96';
      case 'tablet': return 'scale-75 w-[768px]';
      default: return 'scale-90 w-full max-w-6xl';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center space-x-3">
          <Figma className="w-10 h-10 text-pink-400" />
          <span>Figma to Code</span>
          <Code className="w-10 h-10 text-blue-400" />
        </h2>
        <p className="text-white/70 text-lg">
          Paste your Figma design link and watch it transform into production-ready code instantly!
        </p>
      </div>

      {!generatedCode ? (
        /* Input Section */
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <label className="block text-white font-medium mb-3">Figma Design URL</label>
              <div className="relative">
                <Figma className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="url"
                  value={figmaUrl}
                  onChange={(e) => setFigmaUrl(e.target.value)}
                  placeholder="https://www.figma.com/file/..."
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-white font-medium mb-3">Output Framework</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: 'react', label: 'React + TypeScript', icon: '⚛️' },
                  { key: 'vue', label: 'Vue.js', icon: '🖖' },
                  { key: 'html', label: 'HTML + Tailwind', icon: '🌐' }
                ].map((option) => (
                  <button
                    key={option.key}
                    onClick={() => setCodeLanguage(option.key as any)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                      codeLanguage === option.key
                        ? 'border-pink-500 bg-pink-500/20 text-white'
                        : 'border-white/20 bg-white/5 text-white/80 hover:border-white/40'
                    }`}
                  >
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <div className="font-medium text-sm">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleFigmaSubmit}
              disabled={!figmaUrl.trim() || isProcessing}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Converting Design to Code...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>Generate Code</span>
                </>
              )}
            </button>

            {isProcessing && (
              <div className="mt-6 bg-white/5 rounded-xl p-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-white/80">Analyzing Figma design...</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <span className="text-white/80">Extracting components and styles...</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <span className="text-white/80">Generating production-ready code...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Results Section */
        <div className="space-y-6">
          {/* Design Analysis */}
          {extractedDesign && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Palette className="w-5 h-5" />
                <span>Extracted Design System</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <h4 className="text-white font-medium mb-2">Colors</h4>
                  <div className="flex flex-wrap gap-2">
                    {extractedDesign.colors.map((color: string, index: number) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-lg border border-white/20"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Typography</h4>
                  <div className="space-y-1">
                    {extractedDesign.fonts.map((font: string, index: number) => (
                      <div key={index} className="text-white/70 text-sm">{font}</div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Components</h4>
                  <div className="space-y-1">
                    {extractedDesign.components.map((component: string, index: number) => (
                      <div key={index} className="text-white/70 text-sm">{component}</div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Responsive</h4>
                  <div className="space-y-1">
                    {extractedDesign.breakpoints.map((bp: string, index: number) => (
                      <div key={index} className="text-white/70 text-sm">{bp}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preview and Code */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Live Preview */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
              <div className="p-4 border-b border-white/20">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-semibold flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>Live Preview</span>
                  </h4>
                  <div className="flex items-center space-x-2">
                    {[
                      { key: 'desktop', icon: Monitor },
                      { key: 'tablet', icon: Tablet },
                      { key: 'mobile', icon: Smartphone }
                    ].map(({ key, icon: Icon }) => (
                      <button
                        key={key}
                        onClick={() => setPreviewMode(key as any)}
                        className={`p-2 rounded-lg transition-colors ${
                          previewMode === key 
                            ? 'bg-white/20 text-white' 
                            : 'text-white/60 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-100 min-h-96 flex items-center justify-center overflow-auto">
                <div className={`transition-all duration-300 ${getPreviewScale()}`}>
                  <iframe
                    srcDoc={codeLanguage === 'html' ? generatedCode : `
                      <!DOCTYPE html>
                      <html>
                        <head>
                          <script src="https://cdn.tailwindcss.com"></script>
                        </head>
                        <body>
                          <div id="preview">Preview will be rendered here</div>
                        </body>
                      </html>
                    `}
                    className="w-full h-96 border-0 rounded-lg shadow-lg"
                    title="Live Preview"
                  />
                </div>
              </div>
            </div>

            {/* Generated Code */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
              <div className="p-4 border-b border-white/20">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-semibold flex items-center space-x-2">
                    <Code className="w-5 h-5" />
                    <span>Generated Code</span>
                  </h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-white/60 text-sm capitalize">{codeLanguage}</span>
                    <button
                      onClick={downloadCode}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-0">
                <pre className="p-6 text-sm text-white/90 overflow-auto bg-black/20 max-h-96">
                  <code>{generatedCode}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                setGeneratedCode(null);
                setFigmaUrl('');
                setExtractedDesign(null);
              }}
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 border border-white/20"
            >
              Try Another Design
            </button>
            <button className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2">
              <ExternalLink className="w-4 h-4" />
              <span>Deploy Live</span>
            </button>
          </div>
        </div>
      )}

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