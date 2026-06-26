import React, { useState } from 'react';
import { Plus, X, FileText, Database, Code, Workflow } from 'lucide-react';
import { ProjectRequirement } from '../types';

interface RequirementsInputProps {
  requirements: ProjectRequirement[];
  onRequirementsChange: (requirements: ProjectRequirement[]) => void;
  onNext: () => void;
}

export const RequirementsInput: React.FC<RequirementsInputProps> = ({
  requirements,
  onRequirementsChange,
  onNext
}) => {
  const [newRequirement, setNewRequirement] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
    category: 'ui' as const
  });

  // Function to detect tech stacks mentioned in requirements
  const detectTechStacks = (text: string): string[] => {
    const techKeywords = [
      'react', 'vue', 'angular', 'svelte', 'nextjs', 'nuxt',
      'nodejs', 'node.js', 'python', 'django', 'flask', 'fastapi',
      'java', 'spring', 'go', 'golang', 'rust', 'php', 'laravel',
      'postgresql', 'postgres', 'mysql', 'mongodb', 'redis', 'sqlite',
      'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'vercel', 'netlify',
      'typescript', 'javascript', 'tailwind', 'bootstrap', 'sass', 'scss'
    ];
    
    const lowerText = text.toLowerCase();
    return techKeywords.filter(tech => 
      lowerText.includes(tech) || 
      lowerText.includes(tech.replace('.', '')) ||
      lowerText.includes(tech.replace('js', ''))
    );
  };
  const categoryIcons = {
    ui: FileText,
    backend: Code,
    database: Database,
    integration: Workflow
  } as const;

  const addRequirement = () => {
    if (newRequirement.title.trim()) {
      // Detect mentioned tech stacks
      const detectedTechs = detectTechStacks(newRequirement.title + ' ' + newRequirement.description);
      
      const requirement: ProjectRequirement = {
        id: Date.now().toString(),
        ...newRequirement,
        detectedTechStacks: detectedTechs
      };
      onRequirementsChange([...requirements, requirement]);
      setNewRequirement({
        title: '',
        description: '',
        priority: 'medium',
        category: 'ui'
      });
    }
  };

  const removeRequirement = (id: string) => {
    onRequirementsChange(requirements.filter(req => req.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get all detected tech stacks from requirements
  const getAllDetectedTechs = () => {
    const allTechs = requirements.flatMap(req => req.detectedTechStacks || []);
    return [...new Set(allTechs)]; // Remove duplicates
  };
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Define Your Requirements</h2>
        <p className="text-white/70 text-lg">
          Describe what you want to build. Mention specific technologies (React, Python, PostgreSQL, etc.) and our AI will automatically suggest them.
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-6">
        <h3 className="text-xl font-semibold text-white mb-4">Add New Requirement</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={newRequirement.title}
              onChange={(e) => setNewRequirement({ ...newRequirement, title: e.target.value })}
              placeholder="e.g., User authentication with React and Node.js"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Category</label>
            <select
              value={newRequirement.category}
              onChange={(e) => setNewRequirement({ ...newRequirement, category: e.target.value as any })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="ui">UI/Frontend</option>
              <option value="backend">Backend/API</option>
              <option value="database">Database</option>
              <option value="integration">Integration</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-white/80 text-sm font-medium mb-2">Description</label>
          <textarea
            value={newRequirement.description}
            onChange={(e) => setNewRequirement({ ...newRequirement, description: e.target.value })}
            placeholder="Detailed description... (mention specific technologies like Python, PostgreSQL, Docker, etc.)"
            rows={3}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <label className="text-white/80 text-sm font-medium">Priority:</label>
            {['low', 'medium', 'high'].map((priority) => (
              <label key={priority} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="priority"
                  value={priority}
                  checked={newRequirement.priority === priority}
                  onChange={(e) => setNewRequirement({ ...newRequirement, priority: e.target.value as any })}
                  className="text-indigo-500 focus:ring-indigo-500"
                />
                <span className="text-white/80 capitalize">{priority}</span>
              </label>
            ))}
          </div>
          
          <button
            onClick={addRequirement}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Detected Technologies Preview */}
      {getAllDetectedTechs().length > 0 && (
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-2xl p-6 border border-green-500/30 mb-6">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
            <Code className="w-5 h-5 text-green-400" />
            <span>Detected Technologies</span>
          </h3>
          <p className="text-white/70 text-sm mb-4">
            These technologies were automatically detected from your requirements and will be suggested on the next page:
          </p>
          <div className="flex flex-wrap gap-2">
            {getAllDetectedTechs().map((tech, index) => (
              <span
                key={index}
                className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium border border-green-500/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
      {requirements.length > 0 && (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Requirements ({requirements.length})</h3>
          
          <div className="space-y-4">
            {requirements.map((req) => {
              const IconComponent = categoryIcons[req.category];
              return (
                <div key={req.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <IconComponent className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-white font-medium">{req.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(req.priority)}`}>
                            {req.priority}
                          </span>
                        </div>
                        {req.description && (
                          <p className="text-white/70 text-sm">{req.description}</p>
                        )}
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="inline-block px-2 py-1 bg-white/10 text-xs text-white/80 rounded capitalize">
                            {req.category}
                          </span>
                          {req.detectedTechStacks && req.detectedTechStacks.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {req.detectedTechStacks.map((tech, index) => (
                                <span
                                  key={index}
                                  className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs font-medium"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeRequirement(req.id)}
                      className="text-white/50 hover:text-red-400 p-1 transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={onNext}
          disabled={requirements.length === 0}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
        >
          Continue to Tech Stack Selection
        </button>
      </div>
    </div>
  );
};