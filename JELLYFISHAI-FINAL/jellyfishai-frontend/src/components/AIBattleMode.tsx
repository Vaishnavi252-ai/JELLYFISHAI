import React, { useState } from 'react';
import { Zap, Trophy, Play, RotateCcw, Star, Copy, ArrowLeft, Swords } from 'lucide-react';
import { battleAI } from '../utils/aiCodeGenerator';

interface Props { onBack: () => void; }

const CHALLENGES = [
  { id:'1', title:'Two Sum', diff:'Easy', cat:'Arrays',
    prompt:'Write twoSum(nums, target) returning indices of two numbers that add up to target. Use O(n) time with a hash map. Show the complete function with example: twoSum([2,7,11,15],9) → [0,1]' },
  { id:'2', title:'Fibonacci Memoized', diff:'Easy', cat:'DP',
    prompt:'Write fibonacci(n) using memoization for O(n) time. Show the memo cache and test with fibonacci(10).' },
  { id:'3', title:'Valid Parentheses', diff:'Easy', cat:'Stacks',
    prompt:'Write isValid(s) that checks if brackets are balanced. Handles (){}[]. Examples: isValid("()[]{}") → true, isValid("(]") → false.' },
  { id:'4', title:'Binary Search', diff:'Easy', cat:'Search',
    prompt:'Write binarySearch(arr, target) iteratively on a sorted array. Return index or -1. Show 3 test cases.' },
  { id:'5', title:'Reverse Linked List', diff:'Medium', cat:'Linked Lists',
    prompt:'Define a Node class and write reverseList(head) to reverse a linked list in-place. Show example usage.' },
  { id:'6', title:'Merge Sort', diff:'Medium', cat:'Sorting',
    prompt:'Implement mergeSort(arr) with a merge() helper. Sort ascending. Include time complexity in comments.' },
  { id:'7', title:'LRU Cache', diff:'Hard', cat:'Design',
    prompt:'Implement an LRUCache class with get(key) and put(key,val) both O(1). Use capacity=2 and show example usage.' },
  { id:'8', title:'Todo REST API', diff:'Medium', cat:'Backend',
    prompt:'Write a complete Express.js REST API for Todos: GET /todos, POST /todos, PUT /todos/:id, DELETE /todos/:id. Use in-memory array. Complete working code.' },
];

const DC: Record<string,string> = {
  Easy:  'text-green-400 bg-green-400/10 border-green-400/20',
  Medium:'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  Hard:  'text-red-400 bg-red-400/10 border-red-400/20',
};

export const AIBattleMode: React.FC<Props> = ({ onBack }) => {
  const [challenge, setChallenge] = useState<typeof CHALLENGES[0]|null>(null);
  const [custom,    setCustom]    = useState('');
  const [claudeOut, setClaudeOut] = useState('');
  const [gptOut,    setGptOut]    = useState('');
  const [battling,  setBattling]  = useState(false);
  const [winner,    setWinner]    = useState<'claude'|'gpt'|'tie'|null>(null);
  const [error,     setError]     = useState<string|null>(null);
  const [votes,     setVotes]     = useState({claude:0,gpt:0});
  const [startTime, setStartTime] = useState<number|null>(null);
  const [elapsed,   setElapsed]   = useState<number|null>(null);

  const startBattle = async () => {
    const prompt = challenge?.prompt ?? custom.trim();
    if (!prompt) return;
    setBattling(true); setClaudeOut(''); setGptOut('');
    setWinner(null); setError(null); setElapsed(null);
    const t0 = Date.now(); setStartTime(t0);

    try {
      const result = await battleAI(prompt);
      setElapsed(Date.now() - t0);
      setClaudeOut(result.claude);
      setGptOut(result.gpt);
      setWinner('tie');
    } catch(e: any) {
      setError(e.message ?? 'Battle failed. Make sure backend is running.');
    } finally {
      setBattling(false);
    }
  };

  const vote = (m: 'claude'|'gpt') => { setVotes(v=>({...v,[m]:v[m]+1})); setWinner(m); };

  const reset = () => { setChallenge(null); setCustom(''); setClaudeOut(''); setGptOut('');
                        setWinner(null); setError(null); setElapsed(null); };

  const hasResults = !!(claudeOut || gptOut);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-center gap-4 mb-8">
          <button onClick={onBack} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition">
            <ArrowLeft className="w-5 h-5"/>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Swords className="w-8 h-8 text-yellow-400"/> AI Battle Mode
            </h1>
            <p className="text-white/60 text-sm mt-1">Claude Sonnet 4 vs GPT-4o-mini — same prompt, real API responses</p>
          </div>
          {elapsed && (
            <div className="ml-auto text-white/40 text-sm">
              ⚡ Response in {(elapsed/1000).toFixed(1)}s
            </div>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-xl text-red-200 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Challenge picker */}
        {!hasResults && (
          <div className="mb-8">
            <h2 className="text-white font-semibold mb-4">Pick a Challenge:</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {CHALLENGES.map(c => (
                <button key={c.id} onClick={()=>{setChallenge(c);setCustom('');}}
                  className={`p-3 rounded-xl border text-left transition ${challenge?.id===c.id?'bg-purple-600/40 border-purple-400':'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                  <div className="text-white font-medium text-sm">{c.title}</div>
                  <div className="text-white/50 text-xs mt-0.5">{c.cat}</div>
                  <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs border ${DC[c.diff]}`}>{c.diff}</span>
                </button>
              ))}
            </div>
            <textarea value={custom} onChange={e=>{setCustom(e.target.value);setChallenge(null);}}
              placeholder="...or write your own coding challenge"
              rows={3}
              className="w-full bg-white/5 border border-white/20 rounded-xl p-4 text-white/80 placeholder-white/30 text-sm resize-none focus:outline-none focus:border-purple-400 mb-4"/>
            <button onClick={startBattle} disabled={battling||(!challenge&&!custom.trim())}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 disabled:opacity-40 text-white rounded-xl font-bold transition">
              {battling
                ? <><Zap className="w-5 h-5 animate-pulse"/> Calling Both AIs...</>
                : <><Play className="w-5 h-5"/> Start Battle</>}
            </button>
          </div>
        )}

        {/* Results */}
        {hasResults && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-bold text-xl">⚔️ {challenge ? challenge.title : 'Custom Challenge'}</h2>
              <button onClick={reset} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition">
                <RotateCcw className="w-4 h-4"/> New Battle
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Claude */}
              <div className={`rounded-2xl border p-5 transition ${winner==='claude'?'border-yellow-400 bg-yellow-400/5':'border-white/20 bg-white/5'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🤖</span>
                    <div>
                      <div className="text-white font-bold">Claude Sonnet 4</div>
                      <div className="text-white/40 text-xs">Anthropic · via Backend</div>
                    </div>
                    {winner==='claude' && <Trophy className="w-5 h-5 text-yellow-400 ml-2"/>}
                  </div>
                  <button onClick={()=>navigator.clipboard.writeText(claudeOut)}
                    className="p-1.5 bg-white/10 hover:bg-white/20 rounded text-white/60 transition"><Copy className="w-3.5 h-3.5"/></button>
                </div>
                <pre className="bg-black/30 rounded-xl p-4 text-xs text-green-300 overflow-auto max-h-80 font-mono whitespace-pre-wrap">
                  {battling ? '⏳ Waiting for Claude...' : claudeOut}
                </pre>
                {claudeOut && !battling && winner==='tie' && (
                  <button onClick={()=>vote('claude')}
                    className="mt-3 w-full py-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-400/30 text-yellow-300 rounded-lg text-sm font-medium flex items-center justify-center gap-1 transition">
                    <Star className="w-4 h-4"/> Claude is Better ({votes.claude})
                  </button>
                )}
              </div>

              {/* GPT */}
              <div className={`rounded-2xl border p-5 transition ${winner==='gpt'?'border-green-400 bg-green-400/5':'border-white/20 bg-white/5'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">✨</span>
                    <div>
                      <div className="text-white font-bold">GPT-4o-mini</div>
                      <div className="text-white/40 text-xs">OpenAI · via Backend</div>
                    </div>
                    {winner==='gpt' && <Trophy className="w-5 h-5 text-green-400 ml-2"/>}
                  </div>
                  <button onClick={()=>navigator.clipboard.writeText(gptOut)}
                    className="p-1.5 bg-white/10 hover:bg-white/20 rounded text-white/60 transition"><Copy className="w-3.5 h-3.5"/></button>
                </div>
                <pre className="bg-black/30 rounded-xl p-4 text-xs text-blue-300 overflow-auto max-h-80 font-mono whitespace-pre-wrap">
                  {battling ? '⏳ Waiting for GPT...' : gptOut}
                </pre>
                {gptOut && !battling && winner==='tie' && (
                  <button onClick={()=>vote('gpt')}
                    className="mt-3 w-full py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-400/30 text-green-300 rounded-lg text-sm font-medium flex items-center justify-center gap-1 transition">
                    <Star className="w-4 h-4"/> GPT is Better ({votes.gpt})
                  </button>
                )}
              </div>
            </div>

            {winner && winner !== 'tie' && (
              <div className="mt-6 p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-xl text-center">
                <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2"/>
                <p className="text-yellow-300 font-bold text-lg">
                  {winner==='claude' ? '🤖 Claude Sonnet 4 wins this round!' : '✨ GPT-4o-mini wins this round!'}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};