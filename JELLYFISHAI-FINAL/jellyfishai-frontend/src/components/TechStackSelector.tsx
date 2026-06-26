import React from 'react';
import { Check, Sparkles, Star } from 'lucide-react';
import { TechStack } from '../types';
import { ProjectRequirement } from '../types';

interface TechStackSelectorProps {
  selectedStack: TechStack[];
  onStackChange: (stack: TechStack[]) => void;
  requirements: ProjectRequirement[];
  onNext: () => void;
  onBack: () => void;
}

const availableStacks: TechStack[] = [
  // Frontend
  { id: 'react', name: 'React', category: 'frontend', version: '18.3.1', icon: '⚛️', description: 'Modern UI library with hooks and components' },
  { id: 'vue', name: 'Vue.js', category: 'frontend', version: '3.4.0', icon: '🖖', description: 'Progressive framework for building UIs' },
  { id: 'angular', name: 'Angular', category: 'frontend', version: '17.0.0', icon: '🅰️', description: 'Full-featured framework for web apps' },
  { id: 'svelte', name: 'Svelte', category: 'frontend', version: '4.2.0', icon: '🔥', description: 'Compile-time optimized framework' },
  { id: 'nextjs', name: 'Next.js', category: 'frontend', version: '14.0.0', icon: '▲', description: 'React framework with SSR and SSG' },
  { id: 'nuxt', name: 'Nuxt.js', category: 'frontend', version: '3.8.0', icon: '💚', description: 'Vue.js framework with SSR' },
  
  // Backend
  { id: 'nodejs', name: 'Node.js', category: 'backend', version: '20.10.0', icon: '💚', description: 'JavaScript runtime for server-side development' },
  { id: 'python', name: 'Python', category: 'backend', version: '3.12.0', icon: '🐍', description: 'High-level programming language' },
  { id: 'django', name: 'Django', category: 'backend', version: '4.2.0', icon: '🎸', description: 'High-level Python web framework' },
  { id: 'flask', name: 'Flask', category: 'backend', version: '3.0.0', icon: '🌶️', description: 'Lightweight Python web framework' },
  { id: 'fastapi', name: 'FastAPI', category: 'backend', version: '0.104.0', icon: '⚡', description: 'Modern, fast Python API framework' },
  { id: 'go', name: 'Go', category: 'backend', version: '1.21.0', icon: '🐹', description: 'Fast, statically typed compiled language' },
  { id: 'java', name: 'Java', category: 'backend', version: '21.0.0', icon: '☕', description: 'Enterprise-grade object-oriented language' },
  { id: 'spring', name: 'Spring Boot', category: 'backend', version: '3.2.0', icon: '🍃', description: 'Java framework for enterprise applications' },
  { id: 'php', name: 'PHP', category: 'backend', version: '8.3.0', icon: '🐘', description: 'Popular web development language' },
  { id: 'laravel', name: 'Laravel', category: 'backend', version: '10.0.0', icon: '🔴', description: 'Elegant PHP web framework' },
  { id: 'rust', name: 'Rust', category: 'backend', version: '1.75.0', icon: '🦀', description: 'Systems programming language' },
  
  // Database
  { id: 'postgresql', name: 'PostgreSQL', category: 'database', version: '16.0', icon: '🐘', description: 'Advanced open-source relational database' },
  { id: 'mongodb', name: 'MongoDB', category: 'database', version: '7.0', icon: '🍃', description: 'NoSQL document-oriented database' },
  { id: 'mysql', name: 'MySQL', category: 'database', version: '8.2', icon: '🐬', description: 'Popular open-source relational database' },
  { id: 'redis', name: 'Redis', category: 'database', version: '7.2', icon: '🔴', description: 'In-memory data structure store' },
  { id: 'sqlite', name: 'SQLite', category: 'database', version: '3.44.0', icon: '💎', description: 'Lightweight embedded database' },
  
  // Deployment
  { id: 'docker', name: 'Docker', category: 'deployment', version: '24.0', icon: '🐳', description: 'Containerization platform' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'deployment', version: '1.28', icon: '☸️', description: 'Container orchestration platform' },
  { id: 'aws', name: 'AWS', category: 'deployment', version: 'latest', icon: '☁️', description: 'Amazon Web Services cloud platform' },
  { id: 'azure', name: 'Azure', category: 'deployment', version: 'latest', icon: '🔷', description: 'Microsoft cloud platform' },
  { id: 'gcp', name: 'Google Cloud', category: 'deployment', version: 'latest', icon: '🌩️', description: 'Google Cloud Platform' },
  { id: 'vercel', name: 'Vercel', category: 'deployment', version: 'latest', icon: '▲', description: 'Frontend deployment platform' },
  { id: 'netlify', name: 'Netlify', category: 'deployment', version: 'latest', icon: '🌐', description: 'JAMstack deployment platform' }
];

export const TechStackSelector: React.FC<TechStackSelectorProps> = ({
  selectedStack,
  onStackChange,
  requirements,
  onNext,
  onBack
}) => {
  // Get all detected tech stacks from requirements
  const getDetectedTechStacks = (): string[] => {
    const allDetected = requirements.flatMap(req => req.detectedTechStacks || []);
    return [...new Set(allDetected)]; // Remove duplicates
  };

  // Check if a tech stack was mentioned in requirements
  const isSuggestedTech = (techId: string): boolean => {
    const detectedTechs = getDetectedTechStacks();
    return detectedTechs.some(detected => 
      detected.toLowerCase().includes(techId.toLowerCase()) ||
      techId.toLowerCase().includes(detected.toLowerCase()) ||
      (techId === 'nodejs' && detected.toLowerCase().includes('node')) ||
      (techId === 'postgresql' && detected.toLowerCase().includes('postgres')) ||
      (techId === 'nextjs' && detected.toLowerCase().includes('next')) ||
      (techId === 'nuxt' && detected.toLowerCase().includes('nuxt'))
    );
  };

  // Auto-select suggested technologies
  React.useEffect(() => {
    const suggestedStacks = availableStacks.filter(stack => isSuggestedTech(stack.id));
    const newSelections = suggestedStacks.filter(stack => 
      !selectedStack.some(selected => selected.id === stack.id)
    );
    
    if (newSelections.length > 0) {
      onStackChange([...selectedStack, ...newSelections]);
    }
  }, [requirements]);
  const toggleStack = (stack: TechStack) => {
    const isSelected = selectedStack.some(s => s.id === stack.id);
    if (isSelected) {
      onStackChange(selectedStack.filter(s => s.id !== stack.id));
    } else {
      onStackChange([...selectedStack, stack]);
    }
  };

  const categories = {
    frontend: availableStacks.filter(s => s.category === 'frontend'),
    backend: availableStacks.filter(s => s.category === 'backend'),
    database: availableStacks.filter(s => s.category === 'database'),
    deployment: availableStacks.filter(s => s.category === 'deployment')
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'frontend': return 'Frontend Framework';
      case 'backend': return 'Backend Technology';
      case 'database': return 'Database System';
      case 'deployment': return 'Deployment Platform';
      default: return category;
    }
  };

  const detectedTechs = getDetectedTechStacks();
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Select Your Tech Stack</h2>
        <p className="text-white/70 text-lg">
          Choose the technologies for your project. Technologies mentioned in your requirements are automatically suggested.
        </p>
      </div>

      {/* Suggested Technologies Banner */}
      {detectedTechs.length > 0 && (
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30 mb-8">
          <div className="flex items-start space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-500/20 rounded-full">
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-2 text-lg flex items-center space-x-2">
                <span>AI Suggested Technologies</span>
                <Star className="w-5 h-5 text-yellow-400" />
              </h3>
              <p className="text-white/70 text-sm mb-3">
                Based on your requirements, we've automatically selected these technologies. You can modify the selection below.
              </p>
              <div className="flex flex-wrap gap-2">
                {detectedTechs.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm font-medium border border-yellow-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {Object.entries(categories).map(([category, stacks]) => (
          <div key={category} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">{getCategoryTitle(category)}</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {stacks.map((stack) => {
                const isSelected = selectedStack.some(s => s.id === stack.id);
                const isSuggested = isSuggestedTech(stack.id);
                return (
                  <button
                    key={stack.id}
                    onClick={() => toggleStack(stack)}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left group ${
                      isSelected 
                        ? isSuggested 
                          ? 'border-yellow-500 bg-yellow-500/20' 
                          : 'border-indigo-500 bg-indigo-500/20'
                        : isSuggested
                          ? 'border-yellow-500/50 bg-yellow-500/10 hover:border-yellow-500 hover:bg-yellow-500/20'
                          : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
                    }`}
                  >
                    {isSuggested && !isSelected && (
                      <div className="absolute top-2 left-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                    )}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                    
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{stack.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className={`font-medium ${isSuggested ? 'text-yellow-200' : 'text-white'}`}>
                            {stack.name}
                            {isSuggested && <span className="ml-1 text-yellow-400">★</span>}
                          </h4>
                          <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded">
                            v{stack.version}
                          </span>
                        </div>
                        <p className={`text-sm mt-1 ${isSuggested ? 'text-yellow-200/80' : 'text-white/70'}`}>
                          {stack.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {selectedStack.length > 0 && (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Selected Stack ({selectedStack.length})</h3>
          <div className="flex flex-wrap gap-3">
            {selectedStack.map((stack) => (
              <div key={stack.id} className={`flex items-center space-x-2 rounded-lg px-3 py-2 border ${
                isSuggestedTech(stack.id) 
                  ? 'bg-yellow-500/20 border-yellow-500/30' 
                  : 'bg-indigo-500/20 border-indigo-500/30'
              }`}>
                <span className="text-lg">{stack.icon}</span>
                <span className="text-white font-medium">{stack.name}</span>
                <span className={`text-sm ${
                  isSuggestedTech(stack.id) ? 'text-yellow-300' : 'text-indigo-300'
                }`}>v{stack.version}</span>
                {isSuggestedTech(stack.id) && <Star className="w-3 h-3 text-yellow-400" />}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center space-x-4">
        <button
          onClick={onBack}
          className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 border border-white/20"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={selectedStack.length === 0}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
        >
          Generate Code
        </button>
      </div>
    </div>
  );
};