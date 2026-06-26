import { ProjectRequirement, TechStack, GeneratedCode } from '../types';
import { generateMockCodeOffline } from './offlineMockGenerator';

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// ─────────────────────────────────────────────────────────────
//  MAIN EXPORT — used by CodeGeneration.tsx
// ─────────────────────────────────────────────────────────────
export async function generateCodeWithAI(
  requirements: ProjectRequirement[],
  techStack: TechStack[]
): Promise<GeneratedCode[]> {
  const token = localStorage.getItem('jellyfishai_token');

  if (!token) {
    console.warn('No auth token — using offline mock');
    return generateMockCodeOffline(requirements, techStack);
  }

  try {
    console.log('Calling backend /api/ai/generate ...');

    const res = await fetch(`${BACKEND_URL}/ai/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ requirements, techStack }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error || `Backend error ${res.status}`);
    }

    console.log('Got ' + data.count + ' files from ' + data.provider);
    return data.files as GeneratedCode[];

  } catch (err: any) {
    console.error('Backend generate failed:', err.message);
    console.log('Falling back to offline mock...');
    return generateMockCodeOffline(requirements, techStack);
  }
}

// ─────────────────────────────────────────────────────────────
//  CODE CORRECTION — used by CodeCorrection.tsx
// ─────────────────────────────────────────────────────────────
export async function correctCodeWithAI(
  filename: string,
  content: string,
  language: string
): Promise<{ correctedCode: string; issues: string[]; improvements: string[] }> {
  const token = localStorage.getItem('jellyfishai_token');
  if (!token) throw new Error('Not authenticated');

  const res = await fetch(`${BACKEND_URL}/ai/correct`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ filename, content, language }),
  });

  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.error || 'Correction failed');
  return data;
}

// ─────────────────────────────────────────────────────────────
//  AI BATTLE — used by AIBattleMode.tsx
// ─────────────────────────────────────────────────────────────
export async function battleAI(
  prompt: string
): Promise<{ claude: string; gpt: string }> {
  const token = localStorage.getItem('jellyfishai_token');
  if (!token) throw new Error('Not authenticated');

  const res = await fetch(`${BACKEND_URL}/ai/battle`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();
  if (!res.ok || !data.success) throw new Error(data.error || 'Battle failed');
  return { claude: data.claude, gpt: data.gpt };
}