import express from 'express';
import GeneratedProject from '../models/GeneratedProject.js';

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { userId, projectName, description, requirements, techStack, generatedCode, codeFiles, projectType } = req.body;
    
    if (!userId || !projectName || !generatedCode) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const project = new GeneratedProject({
      userId, projectName, description: description || '', requirements: requirements || '',
      techStack: techStack || [], generatedCode, codeFiles: codeFiles || [], projectType: projectType || 'general'
    });
    
    await project.save();
    
    res.status(201).json({ success: true, projectId: project._id, project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const projects = await GeneratedProject
      .find({ userId: req.params.userId })
      .sort({ createdAt: -1 })
      .limit(20)
      .select('-generatedCode');
    
    res.json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:projectId', async (req, res) => {
  try {
    const project = await GeneratedProject.findById(req.params.projectId).populate('deployments');
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json({ success: true, project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:projectId', async (req, res) => {
  try {
    const project = await GeneratedProject.findByIdAndDelete(req.params.projectId);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
