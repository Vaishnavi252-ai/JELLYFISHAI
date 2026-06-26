import mongoose from 'mongoose';

const generatedProjectSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  projectName: {
    type: String,
    required: true
  },
  description: String,
  
  requirements: {
    type: String,
    required: true
  },
  
  techStack: {
    type: [String],
    required: true
  },
  
  generatedCode: {
    type: String,
    required: true
  },
  
  codeFiles: [{
    filename: String,
    language: String,
    content: String,
    explanation: String
  }],
  
  projectType: {
    type: String,
    enum: ['auth', 'ecommerce', 'chat', 'blog', 'todo', 'dashboard', 'general'],
    required: true
  },
  
  isDeployed: {
    type: Boolean,
    default: false
  },
  deployments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deployment'
  }],
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

generatedProjectSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model('GeneratedProject', generatedProjectSchema);
