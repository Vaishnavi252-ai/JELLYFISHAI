import mongoose from 'mongoose';
import crypto from 'crypto';

const oauthTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  platform: {
    type: String,
    enum: ['netlify', 'vercel', 'github'],
    required: true
  },
  encryptedToken: {
    type: String,
    required: true
  },
  refreshToken: String,
  tokenType: String,
  scope: String,
  expiresAt: Date,
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

oauthTokenSchema.index({ userId: 1, platform: 1 }, { unique: true });

oauthTokenSchema.statics.encryptToken = function(token) {
  const algorithm = 'aes-256-cbc';
  const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
  const iv = crypto.randomBytes(16);
  
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(token, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return iv.toString('hex') + ':' + encrypted;
};

oauthTokenSchema.methods.decryptToken = function() {
  const algorithm = 'aes-256-cbc';
  const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
  
  const [ivHex, encryptedData] = this.encryptedToken.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
};

oauthTokenSchema.pre('save', async function(next) {
  if (this.isModified('encryptedToken') && !this.encryptedToken.includes(':')) {
    const plainToken = this.encryptedToken;
    this.encryptedToken = this.constructor.encryptToken(plainToken);
  }
  next();
});

export default mongoose.model('OAuthToken', oauthTokenSchema);
