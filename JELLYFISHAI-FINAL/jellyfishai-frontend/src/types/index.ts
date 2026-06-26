export interface ProjectRequirement {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  category: 'ui' | 'backend' | 'database' | 'integration';
  detectedTechStacks?: string[];
}

export interface TechStack {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'deployment';
  version: string;
  icon: string;
  description: string;
}

export interface GeneratedCode {
  filename: string;
  language: string;
  content: string;
  explanation: string;
}

export interface DeploymentStep {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  duration?: number;
  details: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  requirements: ProjectRequirement[];
  techStack: TechStack[];
  generatedCode: GeneratedCode[];
  deploymentSteps: DeploymentStep[];
  status: 'draft' | 'generating' | 'review' | 'deploying' | 'deployed';
  createdAt: Date;
}