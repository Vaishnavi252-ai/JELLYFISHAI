import express from 'express';
import Deployment from '../models/Deployment.js';
import OAuthToken from '../models/OAuthToken.js';
import GeneratedProject from '../models/GeneratedProject.js';

const router = express.Router();

router.post('/deploy', async (req, res) => {
  try {
    const { projectId, platform, userId } = req.body;
    
    if (!['netlify', 'vercel'].includes(platform)) {
      return res.status(400).json({ error: 'Invalid platform' });
    }
    
    const oauthToken = await OAuthToken.findOne({ userId, platform });
    if (!oauthToken) {
      return res.status(401).json({ error: 'Not authenticated', requiresAuth: true });
    }
    
    const project = await GeneratedProject.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    const deployment = new Deployment({ projectId, userId, platform, status: 'pending' });
    await deployment.save();
    
    deployment.updateStatus('authenticating');
    await deployment.save();
    
    res.status(202).json({
      success: true,
      message: 'Deployment started',
      deploymentId: deployment._id,
      status: 'authenticating'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/status/:deploymentId', async (req, res) => {
  try {
    const deployment = await Deployment.findById(req.params.deploymentId);
    
    if (!deployment) {
      return res.status(404).json({ error: 'Deployment not found' });
    }
    
    res.json({
      success: true,
      deploymentId: deployment._id,
      status: deployment.status,
      platform: deployment.platform,
      liveUrl: deployment.liveUrl,
      errorMessage: deployment.errorMessage,
      createdAt: deployment.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/history/:userId', async (req, res) => {
  try {
    const deployments = await Deployment
      .find({ userId: req.params.userId })
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('projectId', 'projectName');
    
    res.json({ success: true, deployments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/cancel/:deploymentId', async (req, res) => {
  try {
    const deployment = await Deployment.findById(req.params.deploymentId);
    
    if (!deployment) {
      return res.status(404).json({ error: 'Deployment not found' });
    }
    
    deployment.updateStatus('failed');
    deployment.errorMessage = 'Cancelled by user';
    await deployment.save();
    
    res.json({ success: true, message: 'Deployment cancelled' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
