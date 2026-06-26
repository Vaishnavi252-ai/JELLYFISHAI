import mongoose from 'mongoose';

const deploymentSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GeneratedProject',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  platform: {
    type: String,
    enum: ['netlify', 'vercel'],
    required: true
  },
  
  status: {
    type: String,
    enum: ['pending', 'authenticating', 'deploying', 'success', 'failed'],
    default: 'pending'
  },
  
  githubRepoUrl: String,
  githubRepoName: String,
  githubBranch: {
    type: String,
    default: 'main'
  },
  githubCommitHash: String,
  
  buildCommand: {
    type: String,
    default: 'npm run build'
  },
  outputDirectory: {
    type: String,
    default: 'dist'
  },
  
  deploymentId: String,
  platformProjectId: String,
  
  liveUrl: String,
  previewUrl: String,
  
  logs: {
    type: String,
    default: ''
  },
  buildLogs: {
    type: String,
    default: ''
  },
  deploymentLogs: {
    type: String,
    default: ''
  },
  
  errorMessage: String,
  errorDetails: String,
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  startedAt: Date,
  completedAt: Date,
  
  retryCount: {
    type: Number,
    default: 0
  },
  maxRetries: {
    type: Number,
    default: 3
  },
  
  deploymentDuration: Number,
  buildDuration: Number,
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

deploymentSchema.index({ userId: 1, createdAt: -1 });
deploymentSchema.index({ projectId: 1 });
deploymentSchema.index({ status: 1 });
deploymentSchema.index({ platform: 1 });

deploymentSchema.methods.addLog = function(logType, message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;
  
  if (logType === 'build') {
    this.buildLogs = (this.buildLogs || '') + logEntry;
  } else if (logType === 'deployment') {
    this.deploymentLogs = (this.deploymentLogs || '') + logEntry;
  } else {
    this.logs = (this.logs || '') + logEntry;
  }
  
  return this;
};

deploymentSchema.methods.updateStatus = function(newStatus) {
  this.status = newStatus;
  this.addLog('general', `Status updated to: ${newStatus}`);
  
  if (newStatus === 'deploying' && !this.startedAt) {
    this.startedAt = new Date();
  }
  
  if (['success', 'failed'].includes(newStatus) && !this.completedAt) {
    this.completedAt = new Date();
    if (this.startedAt) {
      this.deploymentDuration = Math.round(
        (this.completedAt - this.startedAt) / 1000
      );
    }
  }
  
  return this;
};

export default mongoose.model('Deployment', deploymentSchema);
