# 🚀 JellyfishAI Backend

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Create `.env` File
Copy `.env.example` to `.env` and update with your values:
```bash
cp .env.example .env
```

### 3. Generate Encryption Key
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy output to `ENCRYPTION_KEY` in `.env`

### 4. Setup MongoDB
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account and cluster
3. Copy connection string to `MONGODB_URI` in `.env`

### 5. Start Backend
```bash
npm run dev
```

## API Endpoints

### Health Check
- `GET /api/health`

### Authentication
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### OAuth (Netlify)
- `GET /api/oauth/netlify/authorize`
- `GET /api/oauth/netlify/callback`
- `GET /api/oauth/netlify/status/:userId`

### Deployments
- `POST /api/deployments/deploy`
- `GET /api/deployments/status/:deploymentId`
- `GET /api/deployments/history/:userId`

### Projects
- `POST /api/projects/create`
- `GET /api/projects/user/:userId`
- `GET /api/projects/:projectId`

## Folder Structure

```
├── models/              # Database schemas
├── routes/              # API routes
├── services/            # Business logic (coming soon)
├── middleware/          # Middleware (coming soon)
├── server.js            # Express server
├── package.json         # Dependencies
├── .env.example         # Environment template
└── .gitignore           # Git ignore rules
```

## Technologies

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Axios** - HTTP client
- **Crypto** - Token encryption

## Environment Variables

See `.env.example` for all required variables.

## Next Steps

1. Setup database
2. Configure OAuth credentials
3. Implement deployment service
4. Connect frontend

---

**Status:** Phase 1 - Foundation Setup
