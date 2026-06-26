import React, { useState } from 'react';
import { Upload, FileCode, Zap, Download, Copy, CheckCircle, AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { correctCodeWithAI } from '../utils/aiCodeGenerator';

interface UploadedFile  { name: string; content: string; language: string; }
interface CorrectedFile {
  originalName: string; correctedName: string;
  originalContent: string; correctedContent: string;
  language: string; issues: string[]; improvements: string[];
}
interface Props { onBack: () => void; }

function getLang(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() ?? '';
  return ({ js:'javascript',ts:'typescript',tsx:'typescript',jsx:'javascript',
            py:'python',html:'html',css:'css',json:'json',md:'markdown',
            java:'java',cpp:'cpp',c:'c',go:'go',rs:'rust' } as Record<string,string>)[ext] ?? 'text';
}

export const CodeCorrection: React.FC<Props> = ({ onBack }) => {
  const [uploaded,   setUploaded]   = useState<UploadedFile[]>([]);
  const [corrected,  setCorrected]  = useState<CorrectedFile[]>([]);
  const [processing, setProcessing] = useState(false);
  const [selected,   setSelected]   = useState(0);
  const [viewMode,   setViewMode]   = useState<'original'|'corrected'>('corrected');
  const [drag,       setDrag]       = useState(false);
  const [error,      setError]      = useState<string|null>(null);
  const [progress,   setProgress]   = useState('');

  const handleFiles = (files: FileList|null) => {
    if (!files) return;
    const loaded: UploadedFile[] = [];
    let done = 0;
    Array.from(files).forEach(file => {
      const r = new FileReader();
      r.onload = e => {
        loaded.push({ name:file.name, content:e.target?.result as string, language:getLang(file.name) });
        if (++done === files.length) setUploaded(p => [...p, ...loaded]);
      };
      r.readAsText(file);
    });
  };

  const fixCode = async () => {
    if (!uploaded.length) return;
    setProcessing(true); setError(null); setCorrected([]);
    const results: CorrectedFile[] = [];
    try {
      for (let i = 0; i < uploaded.length; i++) {
        const file = uploaded[i];
        setProgress(`Fixing ${file.name} (${i+1}/${uploaded.length})...`);
        const result = await correctCodeWithAI(file.name, file.content, file.language);
        results.push({
          originalName: file.name, correctedName: file.name,
          originalContent: file.content, correctedContent: result.correctedCode,
          language: file.language, issues: result.issues, improvements: result.improvements,
        });
      }
      setCorrected(results); setSelected(0); setProgress('');
    } catch(e: any) {
      setError(e.message ?? 'Correction failed. Make sure backend is running on port 5000.');
      setProgress('');
    } finally { setProcessing(false); }
  };

  const downloadAll = async () => {
    const zip = new JSZip();
    corrected.forEach(f => zip.file(`corrected/${f.correctedName}`, f.correctedContent));
    saveAs(await zip.generateAsync({type:'blob'}), 'corrected-code.zip');
  };

  const cur = corrected[selected];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={onBack} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition">
            <ArrowLeft className="w-5 h-5"/>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">🔧 AI Code Correction</h1>
            <p className="text-white/60 text-sm mt-1">Upload broken code — Claude/GPT fixes bugs and explains every change</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-xl text-red-200 flex items-center gap-3 text-sm">
            <AlertTriangle className="w-4 h-4 shrink-0"/> {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h2 className="text-white font-semibold text-lg mb-4 flex items-center gap-2"><Upload className="w-5 h-5"/> Upload Files</h2>
            <div onDragOver={e=>{e.preventDefault();setDrag(true);}} onDragLeave={()=>setDrag(false)}
              onDrop={e=>{e.preventDefault();setDrag(false);handleFiles(e.dataTransfer.files);}}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition ${drag?'border-purple-400 bg-purple-500/10':'border-white/20 hover:border-white/40'}`}>
              <FileCode className="w-12 h-12 text-white/40 mx-auto mb-3"/>
              <p className="text-white/70 mb-3">Drag & drop files here or</p>
              <label className="cursor-pointer">
                <span className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition">Browse Files</span>
                <input type="file" multiple className="hidden" onChange={e=>handleFiles(e.target.files)}
                  accept=".js,.ts,.tsx,.jsx,.py,.html,.css,.json,.java,.cpp,.c,.go,.rs,.md"/>
              </label>
              <p className="text-white/40 text-xs mt-3">JS, TS, Python, HTML, CSS, JSON and more</p>
            </div>
            {uploaded.length > 0 && (
              <div className="mt-4 space-y-2">
                {uploaded.map((f,i) => (
                  <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
                    <span className="text-white/80 text-sm truncate">{f.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white/40 text-xs">{f.language}</span>
                      <button onClick={()=>setUploaded(p=>p.filter((_,j)=>j!==i))} className="text-white/30 hover:text-red-400 text-xs">✕</button>
                    </div>
                  </div>
                ))}
                {progress && <div className="flex items-center gap-2 text-purple-300 text-sm py-1"><RefreshCw className="w-4 h-4 animate-spin"/>{progress}</div>}
                <button onClick={fixCode} disabled={processing}
                  className="w-full mt-3 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition">
                  {processing ? <><RefreshCw className="w-4 h-4 animate-spin"/> Analyzing with AI...</> : <><Zap className="w-4 h-4"/> Fix with AI</>}
                </button>
              </div>
            )}
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold text-lg flex items-center gap-2"><CheckCircle className="w-5 h-5"/> Results</h2>
              {corrected.length > 0 && (
                <button onClick={downloadAll} className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm transition">
                  <Download className="w-4 h-4"/> Download All
                </button>
              )}
            </div>
            {corrected.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-white/30">
                <FileCode className="w-12 h-12 mb-3"/><p>Results will appear here</p>
              </div>
            ) : (
              <>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {corrected.map((f,i) => (
                    <button key={i} onClick={()=>setSelected(i)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${selected===i?'bg-purple-600 text-white':'bg-white/10 text-white/60 hover:bg-white/20'}`}>
                      {f.correctedName}
                    </button>
                  ))}
                </div>
                {cur && (
                  <div className="space-y-3">
                    {cur.issues.length > 0 && (
                      <div className="bg-red-500/10 border border-red-400/20 rounded-lg p-3">
                        <p className="text-red-300 text-xs font-semibold mb-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> Issues Fixed ({cur.issues.length})</p>
                        {cur.issues.map((s,i) => <p key={i} className="text-red-200/80 text-xs">• {s}</p>)}
                      </div>
                    )}
                    {cur.improvements.length > 0 && (
                      <div className="bg-green-500/10 border border-green-400/20 rounded-lg p-3">
                        <p className="text-green-300 text-xs font-semibold mb-1 flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Improvements ({cur.improvements.length})</p>
                        {cur.improvements.map((s,i) => <p key={i} className="text-green-200/80 text-xs">• {s}</p>)}
                      </div>
                    )}
                    <div className="flex gap-2">
                      {(['original','corrected'] as const).map(m => (
                        <button key={m} onClick={()=>setViewMode(m)}
                          className={`px-3 py-1 rounded text-xs font-medium transition ${viewMode===m?'bg-white/20 text-white':'text-white/50 hover:text-white/80'}`}>
                          {m.charAt(0).toUpperCase()+m.slice(1)}
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <pre className="bg-black/30 rounded-xl p-4 text-xs text-green-300 overflow-auto max-h-64 font-mono">
                        {viewMode==='original' ? cur.originalContent : cur.correctedContent}
                      </pre>
                      <button onClick={()=>navigator.clipboard.writeText(viewMode==='original'?cur.originalContent:cur.correctedContent)}
                        className="absolute top-2 right-2 p-1.5 bg-white/10 hover:bg-white/20 rounded text-white/60 transition"><Copy className="w-3.5 h-3.5"/></button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};