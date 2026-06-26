# 🔗 JELLYFISHAI - BACKEND INTEGRATION GUIDE

---

## 📋 **Complete Setup Instructions**

### **Part 1: Setup Backend (If not done)**

```bash
# 1. Extract backend
unzip jellyfishai-backend.zip
cd jellyfishai-backend

# 2. Install dependencies
npm install

# 3. Generate encryption key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 4. Setup .env
cp .env.example .env
# Edit and add:
# - ENCRYPTION_KEY (from step 3)
# - MONGODB_URI (from MongoDB Atlas)
# - SESSION_SECRET
# - JWT_SECRET

# 5. Start backend
npm run dev
# Should show: ✅ Server running on port 5000
```

---

### **Part 2: Setup Frontend**

```bash
# 1. Navigate to frontend folder
cd jellyfishai-frontend

# 2. Install dependencies
npm install

# 3. The .env file is already configured with:
# VITE_BACKEND_URL=http://localhost:5000
# VITE_API_BASE_URL=http://localhost:5000/api

# 4. Start frontend
npm run dev
# Should show: ✅ Running at http://localhost:5173
```

---

## 🚀 **How Deployment Works**

### **User Flow:**

```
1. User generates code in JellyfishAI
2. Click "Deploy" button
3. Select platform (Netlify / Vercel)
4. Redirected to OAuth (Google/GitHub login)
5. Authorize JellyfishAI
6. Redirected back to JellyfishAI
7. Backend starts deployment:
   ├─ Create GitHub repo
   ├─ Push code to GitHub
   ├─ Connect to Netlify/Vercel
   └─ Trigger build
8. Frontend polls for status every 3 seconds
9. Shows "Deploying..." with progress
10. Once done, shows live URL
11. User can click to open live app!
```

---

## 📡 **Backend API Endpoints Used**

### **OAuth**
```
GET /api/oauth/netlify/authorize
  → Get Netlify OAuth URL

GET /api/oauth/netlify/callback
  → Handle OAuth callback from Netlify

GET /api/oauth/netlify/status/:userId
  → Check if user is authenticated with Netlify
```

### **Deployments**
```
POST /api/deployments/deploy
  → Start deployment
  → Body: { projectId, platform, userId, code }
  → Returns: { deploymentId, status }

GET /api/deployments/status/:deploymentId
  → Get deployment status
  → Returns: { status, liveUrl, errorMessage, logs }

GET /api/deployments/history/:userId
  → Get user's deployment history
```

### **Projects**
```
POST /api/projects/create
  → Save generated code
  → Body: { userId, projectName, requirements, techStack, generatedCode, ... }
  → Returns: { projectId, project }

GET /api/projects/user/:userId
  → Get all user's projects

GET /api/projects/:projectId
  → Get project details
```

---

## 🎯 **Files to Use**

### **Frontend Component**
```
src/components/DeploymentFlow.tsx
  → New component for deployment UI
  → Integrated in CodeGeneration component
  → Handles OAuth and deployment status
```

### **Updated .env**
```
VITE_BACKEND_URL=http://localhost:5000
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🔐 **Authentication Flow**

### **User Registration**
```
1. User enters email
2. Frontend sends to: POST /api/auth/register
3. Backend creates user + generates JWT token
4. Frontend stores token in localStorage
5. Token included in all requests: Authorization: Bearer <token>
```

### **OAuth Flow**
```
1. User clicks "Deploy to Netlify"
2. Frontend calls: GET /api/oauth/netlify/authorize
3. Backend returns Netlify OAuth URL
4. Frontend redirects user to Netlify
5. User logs in with Google/GitHub
6. Netlify redirects to: /api/oauth/netlify/callback
7. Backend exchanges code for token (encrypted & stored)
8. Backend redirects back to frontend with success message
9. Frontend can now deploy!
```

---

## 🧪 **Testing the Integration**

### **Test 1: Health Check**
```bash
curl http://localhost:5000/api/health

# Expected:
# {
#   "status": "OK",
#   "message": "JellyfishAI Backend is running"
# }
```

### **Test 2: Register User**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User"}'

# Expected: { "success": true, "token": "..." }
```

### **Test 3: Frontend Connection**
```bash
# In browser console (Frontend running on :5173)

fetch('http://localhost:5000/api/health')
  .then(r => r.json())
  .then(data => console.log(data))

# Should show health status
```

---

## 🔧 **Configuration Map**

| Service | Port | URL | Env Var |
|---------|------|-----|---------|
| Frontend | 5173 | http://localhost:5173 | VITE_FRONTEND_URL |
| Backend | 5000 | http://localhost:5000 | VITE_BACKEND_URL |
| MongoDB | 27017 | mongodb://... | MONGODB_URI |
| Netlify | - | api.netlify.com | NETLIFY_CLIENT_ID |

---

## 📊 **Database Models**

### **Users**
```
{
  email: string,
  name: string,
  googleId?: string,
  githubId?: string,
  createdAt: Date
}
```

### **OAuthTokens**
```
{
  userId: ObjectId,
  platform: "netlify" | "vercel",
  encryptedToken: string,
  refreshToken?: string,
  expiresAt: Date
}
```

### **GeneratedProjects**
```
{
  userId: ObjectId,
  projectName: string,
  requirements: string,
  techStack: [string],
  generatedCode: string,
  projectType: string,
  isDeployed: boolean,
  deployments: [ObjectId],
  createdAt: Date
}
```

### **Deployments**
```
{
  projectId: ObjectId,
  userId: ObjectId,
  platform: "netlify" | "vercel",
  status: "pending" | "authenticating" | "deploying" | "success" | "failed",
  githubRepoUrl: string,
  liveUrl: string,
  logs: string,
  createdAt: Date,
  completedAt: Date
}
```

---

## 🆘 **Troubleshooting**

### **"Cannot reach backend"**
```
1. Is backend running? (npm run dev in backend folder)
2. Check port 5000 is open
3. Check VITE_BACKEND_URL in .env
4. Check CORS is configured (should be in server.js)
```

### **"OAuth fails"**
```
1. Make sure you have Netlify credentials
2. Check NETLIFY_CLIENT_ID and SECRET in backend .env
3. Check OAuth callback URL matches
```

### **"MongoDB connection fails"**
```
1. Check MONGODB_URI in backend .env
2. Make sure IP is whitelisted in MongoDB Atlas
3. Check password is URL-encoded if it has special chars
```

### **"Deployment timeout"**
```
1. Check GitHub token is valid
2. Check Netlify credentials are correct
3. Check npm build command works locally
4. Increase DEPLOYMENT_TIMEOUT_MS in backend .env
```

---

## 🚀 **Next Steps**

1. ✅ Run backend: `npm run dev` (in backend folder)
2. ✅ Run frontend: `npm run dev` (in frontend folder)
3. ✅ Test health check
4. ✅ Generate code in frontend
5. ✅ Click "Deploy" button
6. ✅ Complete OAuth
7. ✅ See deployment in action!

---

## 📚 **File Structure**

```
Project/
├── jellyfishai-backend/        ← Backend (Node.js + Express)
│   ├── models/                 ← Database schemas
│   ├── routes/                 ← API endpoints
│   ├── server.js               ← Express server
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
└── jellyfishai-frontend/       ← Frontend (React + TypeScript)
    ├── src/
    │   ├── components/         ← React components
    │   │   ├── CodeGeneration.tsx
    │   │   ├── DeploymentFlow.tsx  ← NEW!
    │   │   └── ...
    │   ├── utils/              ← Utilities
    │   ├── types/              ← TypeScript types
    │   ├── App.tsx
    │   └── main.tsx
    ├── .env                    ← Frontend config
    ├── vite.config.ts
    ├── package.json
    └── BACKEND_INTEGRATION.md  ← This file!
```

---

## 🎊 **You're All Set!**

Everything is connected and ready to use!

**Quick Start:**
```bash
# Terminal 1: Backend
cd jellyfishai-backend
npm run dev

# Terminal 2: Frontend
cd jellyfishai-frontend
npm run dev

# Terminal 3: Open browser
http://localhost:5173
```

**Then:**
1. Generate code
2. Click Deploy
3. Authenticate with Netlify
4. Watch it deploy!
5. Get live URL!

---

**Status:** ✅ Frontend & Backend Integrated

**Next Phase:** Production deployment & monitoring!
