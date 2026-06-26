import express from 'express';
import axios from 'axios';
import OAuthToken from '../models/OAuthToken.js';
import crypto from 'crypto';

const router = express.Router();

const generateRandomState = () => {
  return crypto.randomBytes(32).toString('hex');
};

router.get('/netlify/authorize', (req, res) => {
  try {
    const clientId = process.env.NETLIFY_CLIENT_ID;
    const redirectUri = `${process.env.SERVER_URL}/api/oauth/netlify/callback`;
    const state = generateRandomState();
    
    req.session.oauthState = {
      state,
      platform: 'netlify',
      createdAt: Date.now()
    };
    
    const authUrl = `https://app.netlify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&state=${state}`;
    
    res.json({ success: true, authUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/netlify/callback', async (req, res) => {
  try {
    const { code, state } = req.query;
    const userId = req.query.userId;
    
    if (state !== req.session.oauthState?.state) {
      return res.redirect(`${process.env.FRONTEND_URL}/deploy-failed?error=invalid_state`);
    }
    
    if (!code) {
      return res.redirect(`${process.env.FRONTEND_URL}/deploy-failed?error=no_code`);
    }
    
    const tokenResponse = await axios.post('https://api.netlify.com/oauth/token', {
      grant_type: 'authorization_code',
      code,
      client_id: process.env.NETLIFY_CLIENT_ID,
      client_secret: process.env.NETLIFY_CLIENT_SECRET,
      redirect_uri: `${process.env.SERVER_URL}/api/oauth/netlify/callback`
    });
    
    const { access_token, refresh_token } = tokenResponse.data;
    const encryptedToken = OAuthToken.encryptToken(access_token);
    
    const oauthToken = await OAuthToken.findOneAndUpdate(
      { userId, platform: 'netlify' },
      {
        userId,
        platform: 'netlify',
        encryptedToken,
        refreshToken,
        tokenType: 'Bearer',
        expiresAt: new Date(Date.now() + 3600000)
      },
      { upsert: true, new: true }
    );
    
    req.session.oauthState = null;
    
    const redirectUrl = `${process.env.FRONTEND_URL}/deploy-success?platform=netlify&userId=${userId}&status=authenticated`;
    res.redirect(redirectUrl);
  } catch (error) {
    res.redirect(`${process.env.FRONTEND_URL}/deploy-failed?error=${error.message}&platform=netlify`);
  }
});

router.get('/netlify/status/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const oauthToken = await OAuthToken.findOne({ userId, platform: 'netlify' });
    
    if (!oauthToken) {
      return res.status(404).json({ authenticated: false });
    }
    
    res.json({
      authenticated: true,
      platform: 'netlify',
      createdAt: oauthToken.createdAt,
      isExpired: new Date() > oauthToken.expiresAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/netlify/revoke/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    await OAuthToken.findOneAndDelete({ userId, platform: 'netlify' });
    
    res.json({ success: true, message: 'Token revoked' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/vercel/authorize', (req, res) => {
  res.json({ message: 'Vercel OAuth coming soon', status: 'not_implemented' });
});

export default router;
