import { useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  BrainCircuit,
  Loader,
  Lock,
  Mail,
  Sparkles,
  User,
  UserPlus,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import aniketImage from '../assets/team/aniket.svg';
import nehaImage from '../assets/team/neha.svg';
import akshayFormalImage from '../assets/team/akshay-formal.svg';
import pankajImage from '../assets/team/pankaj.svg';

type AuthMode = 'login' | 'signup';

const teamMembers = [
  {
    name: 'Aniket',
    handle: '@aniket',
    role: 'Built the complete codebase and core platform flow',
    image: aniketImage,
  },
  {
    name: 'Neha',
    handle: '@neha',
    role: 'Contributed to the research and paper publication work',
    image: nehaImage,
  },
  {
    name: 'Pankaj',
    handle: '@pankaj',
    role: 'Project support and operations',
    image: pankajImage,
  },
  {
    name: 'Akshay',
    handle: '@akshay',
    role: 'Helped with print materials and project logistics',
    image: akshayFormalImage,
  },
];

export function LandingAuthPage() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, signup } = useAuth();

  const isLogin = mode === 'login';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin && !email.trim()) {
      setError('Email required');
      return;
    }

    if (!isLogin && (!email.trim() || !name.trim())) {
      setError('Email and name required');
      return;
    }

    try {
      setError('');
      setIsLoading(true);

      if (isLogin) {
        await login(email);
      } else {
        await signup(email, name);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || (isLogin ? 'Login failed' : 'Signup failed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.22),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.18),_transparent_24%),linear-gradient(135deg,_#020617_0%,_#111827_38%,_#1e1b4b_72%,_#020617_100%)] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute right-[-5rem] top-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:80px_80px] opacity-10" />
      </div>

      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400 shadow-[0_0_30px_rgba(168,85,247,0.35)]">
              <BrainCircuit className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-wide text-white">JellyfishAI</p>
              <p className="text-xs text-slate-300">Neural workflows for modern builders</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError('');
              }}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isLogin
                  ? 'bg-white text-slate-950 shadow-lg'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setError('');
              }}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                !isLogin
                  ? 'bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-20">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-white/5 px-4 py-2 text-sm text-fuchsia-200 backdrop-blur-md">
              <Sparkles className="h-4 w-4" />
              Premium AI workspace for ideation, collaboration, and execution
            </div>

            <div className="space-y-5">
              <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Build smarter with a
                <span className="bg-gradient-to-r from-fuchsia-300 via-violet-200 to-cyan-300 bg-clip-text text-transparent">
                  {' '}glowing AI command center
                </span>
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                JellyfishAI brings your ideas, research, and product flow into one polished interface.
                Sign in to continue your journey or create an account to explore the platform.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/8 p-5 backdrop-blur-xl">
                <p className="text-2xl font-semibold text-white">Fast</p>
                <p className="mt-2 text-sm text-slate-300">Move from concept to action without losing context.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/8 p-5 backdrop-blur-xl">
                <p className="text-2xl font-semibold text-white">Focused</p>
                <p className="mt-2 text-sm text-slate-300">Keep research, planning, and execution aligned.</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/8 p-5 backdrop-blur-xl">
                <p className="text-2xl font-semibold text-white">Polished</p>
                <p className="mt-2 text-sm text-slate-300">A premium interface designed to feel futuristic and clear.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
              <a
                href="#about"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 transition hover:border-fuchsia-400/40 hover:bg-white/10"
              >
                Explore more
                <ArrowRight className="h-4 w-4" />
              </a>
              <span className="text-slate-400">Scroll for the story behind JellyfishAI</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-fuchsia-500/20 via-violet-500/10 to-cyan-400/20 blur-2xl" />
            <div className="relative rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-fuchsia-200/90">
                    {isLogin ? 'Welcome back' : 'Join JellyfishAI'}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    {isLogin ? 'Access your AI workspace' : 'Create your intelligent workspace'}
                  </h2>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-fuchsia-500 to-cyan-400 p-3">
                  {isLogin ? <Lock className="h-5 w-5 text-white" /> : <UserPlus className="h-5 w-5 text-white" />}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="flex items-center gap-3 rounded-2xl border border-red-400/30 bg-red-500/10 p-4">
                    <AlertCircle className="h-5 w-5 text-red-300" />
                    <p className="text-sm text-red-200">{error}</p>
                  </div>
                )}

                {!isLogin && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-200">Full Name</label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full rounded-2xl border border-white/10 bg-slate-950/40 py-3.5 pl-12 pr-4 text-white placeholder:text-slate-500 focus:border-fuchsia-400 focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">Email Address</label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/40 py-3.5 pl-12 pr-4 text-white placeholder:text-slate-500 focus:border-fuchsia-400 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 px-5 py-3.5 font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <Loader className="h-5 w-5 animate-spin" />
                      {isLogin ? 'Signing in...' : 'Creating account...'}
                    </>
                  ) : (
                    <>
                      {isLogin ? 'Sign In' : 'Create Account'}
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>

                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-transparent px-3 text-xs uppercase tracking-[0.25em] text-slate-400">
                      {isLogin ? 'New here?' : 'Already registered?'}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMode(isLogin ? 'signup' : 'login');
                    setError('');
                  }}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 font-medium text-slate-200 transition hover:bg-white/10"
                >
                  {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
                </button>
              </form>

              <p className="mt-5 text-center text-sm text-slate-400">
                {isLogin ? 'Demo mode: use any email to continue.' : 'Start with your name and email to begin.'}
              </p>
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-white/8 p-8 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.26em] text-cyan-200">About JellyfishAI</p>
              <h3 className="mt-4 text-3xl font-semibold text-white">A calm interface for complex AI-driven work.</h3>
              <p className="mt-4 leading-7 text-slate-300">
                JellyfishAI is designed to make advanced workflows feel fluid. From exploration and research to
                execution, the experience is built around clarity, momentum, and a premium visual language.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/8 p-8 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.26em] text-fuchsia-200">Why We Built It</p>
              <h3 className="mt-4 text-3xl font-semibold text-white">To connect ideas, people, and delivery in one space.</h3>
              <p className="mt-4 leading-7 text-slate-300">
                The project started with a simple goal: create a platform where AI support, product direction,
                and collaborative effort can feel unified. JellyfishAI reflects that balance between technical depth
                and approachable design.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="rounded-[2.25rem] border border-white/10 bg-white/8 p-8 backdrop-blur-xl sm:p-10">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.26em] text-violet-200">Team</p>
              <h3 className="mt-4 text-3xl font-semibold text-white">Built with research, execution, and hands-on support.</h3>
              <p className="mt-4 text-slate-300">
                A focused team helped shape JellyfishAI across code, research, publication work, and project support.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {teamMembers.map((member, index) => (
                <div
                  key={`${member.name}-${member.handle}-${index}`}
                  className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/40 shadow-xl backdrop-blur-xl transition hover:-translate-y-1 hover:border-fuchsia-400/30"
                >
                  <div className="aspect-[4/4.6] overflow-hidden bg-gradient-to-br from-white/5 to-white/0">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="space-y-3 p-5">
                    <div>
                      <h4 className="text-lg font-semibold text-white">{member.name}</h4>
                      <p className="text-sm text-fuchsia-200">{member.handle}</p>
                    </div>
                    <p className="text-sm leading-6 text-slate-300">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>

            
          </div>
        </section>
      </main>
    </div>
  );
}
