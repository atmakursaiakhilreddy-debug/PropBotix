
import React, { useState, useEffect, useRef } from 'react';
import { DemoTool, GroundingChunk } from '../types';
import { generateMVPBlueprint, generateConceptVisual, getUniversalInsights, startGeneralChat } from '../services/geminiService';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';

interface ChartData {
  chartTitle: string;
  data: { name: string; value: number }[];
}

// Extend global window type
declare global {
  /* Fix: Define AIStudio interface to match the environment's expected type and ensure modifiers are identical */
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    // Added readonly modifier to match the global declaration and resolve the "identical modifiers" error
    readonly aistudio: AIStudio;
  }
}

const GeminiDemo: React.FC = () => {
  const [activeTool, setActiveTool] = useState<DemoTool>(DemoTool.MVPArchitect);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [grounding, setGrounding] = useState<GroundingChunk[]>([]);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([]);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const chatRef = useRef<any>(null);

  const checkApiKey = async () => {
    if (typeof window.aistudio !== 'undefined') {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await window.aistudio.openSelectKey();
      }
    }
  };

  const parseDataBlock = (text: string) => {
    try {
      const match = text.match(/---DATA_START---([\s\S]*?)---DATA_END---/);
      if (match && match[1]) {
        const json = JSON.parse(match[1].trim());
        return {
          cleanText: text.replace(/---DATA_START---[\s\S]*?---DATA_END---/, '').trim(),
          json: json as ChartData
        };
      }
    } catch (e) {
      console.warn("Failed to parse data block", e);
    }
    return { cleanText: text, json: null };
  };

  const handleRun = async () => {
    if (!input.trim() && activeTool !== DemoTool.CoreAgent) return;
    setLoading(true);
    setOutput(null);
    setGrounding([]);
    setChartData(null);

    try {
      await checkApiKey();
      
      if (activeTool === DemoTool.MVPArchitect) {
        const result = await generateMVPBlueprint(input);
        setOutput(result || 'No response');
      } else if (activeTool === DemoTool.ConceptForge) {
        const result = await generateConceptVisual(input);
        setOutput(result);
      } else if (activeTool === DemoTool.UniversalInsights) {
        const runInsights = async (lat?: number, lng?: number) => {
          try {
            const result = await getUniversalInsights(input, lat, lng);
            const { cleanText, json } = parseDataBlock(result.text || '');
            setOutput(cleanText || 'No response');
            setChartData(json);
            setGrounding(result.chunks);
          } catch (err: any) {
            // Handle specific API key error by prompting key selection again
            if (err?.message?.includes("Requested entity was not found.")) {
              await window.aistudio.openSelectKey();
            }
            setOutput('Kernel Error: Research protocol failed. Ensure API access.');
          } finally {
            setLoading(false);
          }
        };

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => runInsights(pos.coords.latitude, pos.coords.longitude),
            () => runInsights()
          );
        } else {
          runInsights();
        }
      }
    } catch (error: any) {
      // Handle specific API key error by prompting key selection again
      if (error?.message?.includes("Requested entity was not found.")) {
        await window.aistudio.openSelectKey();
      }
      console.error(error);
      setOutput('Kernel Error: AI service unavailable. Verification required.');
      setLoading(false);
    } finally {
      if (activeTool !== DemoTool.UniversalInsights) setLoading(false);
    }
  };

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      await checkApiKey();
      // Ensure a fresh GoogleGenAI instance by calling startGeneralChat after key check
      if (!chatRef.current) {
        chatRef.current = startGeneralChat();
      }
      const response = await chatRef.current.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'bot', text: response.text || '...' }]);
    } catch (err: any) {
      // Handle specific API key error by prompting key selection again
      if (err?.message?.includes("Requested entity was not found.")) {
        await window.aistudio.openSelectKey();
      }
      console.error(err);
      setMessages(prev => [...prev, { role: 'bot', text: 'Error: Connection interrupted.' }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setOutput(null);
    setGrounding([]);
    setMessages([]);
    setChartData(null);
    chatRef.current = null;
    setInput('');
  }, [activeTool]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 bg-[#050505] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Main Workspace */}
      <div className="lg:col-span-12 p-8 md:p-12 min-h-[500px] flex flex-col">
        <div className="flex-1 flex flex-col gap-8">
          <div className="flex bg-white/5 p-1 rounded-full border border-white/10 w-fit mb-8 self-center">
            {[
              { id: DemoTool.MVPArchitect, name: 'Architect' },
              { id: DemoTool.ConceptForge, name: 'Forge' },
              { id: DemoTool.UniversalInsights, name: 'Research' },
              { id: DemoTool.CoreAgent, name: 'Console' }
            ].map(tool => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                  activeTool === tool.id 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {tool.name}
              </button>
            ))}
          </div>

          {activeTool !== DemoTool.CoreAgent ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest font-mono-tech">Input Parameter</label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    activeTool === DemoTool.MVPArchitect ? "e.g. A decentralized AI-driven food delivery network" :
                    activeTool === DemoTool.ConceptForge ? "e.g. A sleek obsidian smartwatch with holographic display" :
                    "e.g. Competitive landscape of modular AI compute in 2025"
                  }
                  className="w-full bg-black border border-white/10 rounded-2xl p-6 text-white text-lg focus:outline-none focus:ring-1 focus:ring-blue-500/50 min-h-[120px] resize-none placeholder:text-slate-700 font-light"
                />
              </div>
              <button
                onClick={handleRun}
                disabled={loading}
                className="accent-gradient hover:opacity-90 disabled:opacity-50 text-white font-bold uppercase tracking-widest text-[10px] py-4 px-10 rounded-2xl transition-all flex items-center gap-3 mx-auto"
              >
                {loading ? 'Executing Engine...' : 'Run Simulation'}
              </button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex-1 overflow-y-auto space-y-4 p-6 bg-black rounded-2xl border border-white/5 font-mono text-xs h-[300px]">
                {messages.length === 0 && <div className="text-slate-800 font-mono-tech py-20 text-center uppercase tracking-widest text-[10px]">Awaiting console connection...</div>}
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl ${m.role === 'user' ? 'bg-white text-black font-bold' : 'bg-white/5 text-slate-300 border border-white/10'}`}>
                      <span className="opacity-50 text-[10px] block mb-1 uppercase tracking-tighter">{m.role}</span>
                      {m.text}
                    </div>
                  </div>
                ))}
                {loading && <div className="text-blue-500 animate-pulse text-[10px] font-black uppercase tracking-widest mt-4">Streaming Output...</div>}
              </div>
              <form onSubmit={handleChat} className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter command or query..."
                  className="flex-1 bg-black border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button className="accent-gradient p-4 rounded-2xl hover:opacity-90 transition-all">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                </button>
              </form>
            </div>
          )}

          {(output || loading) && (
            <div className="mt-4 border-t border-white/5 pt-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-white uppercase tracking-[0.3em] font-mono-tech">Processing Result</span>
              </div>
              
              {loading && !output ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="h-48 bg-white/5 animate-pulse rounded-2xl"></div>
                  <div className="h-48 bg-white/5 animate-pulse rounded-2xl"></div>
                </div>
              ) : activeTool === DemoTool.ConceptForge ? (
                <div className="relative group mx-auto max-w-2xl">
                   <img src={output!} alt="Concept Visual" className="rounded-3xl w-full border border-white/10 shadow-3xl" />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-3xl">
                      <button onClick={() => window.open(output!, '_blank')} className="px-6 py-2 bg-white text-black rounded-full font-bold text-xs uppercase tracking-widest">Download Asset</button>
                   </div>
                </div>
              ) : (
                <div className="flex flex-col gap-10">
                  {chartData && (
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                      <h4 className="text-white font-black text-xs uppercase tracking-widest mb-8 flex items-center gap-3 font-mono-tech">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        {chartData.chartTitle}
                      </h4>
                      <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={chartData.data}>
                            <defs>
                              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                            <XAxis 
                              dataKey="name" 
                              axisLine={false} 
                              tickLine={false}
                              tick={{fill: '#4b5563', fontSize: 10}}
                            />
                            <YAxis 
                              axisLine={false} 
                              tickLine={false}
                              tick={{fill: '#4b5563', fontSize: 10}}
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'rgba(10, 10, 10, 0.9)', 
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '12px',
                                backdropFilter: 'blur(10px)'
                              }}
                              itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="value" 
                              stroke="#3b82f6" 
                              strokeWidth={3}
                              fillOpacity={1} 
                              fill="url(#colorValue)" 
                              animationDuration={1500}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}

                  <div className="bg-black p-8 rounded-3xl border border-white/10 text-slate-300 font-light leading-relaxed max-h-[500px] overflow-y-auto prose prose-invert max-w-none text-base">
                    {output}
                  </div>
                </div>
              )}

              {grounding.length > 0 && (
                <div className="mt-8 pt-8 border-t border-white/5">
                  <p className="text-[10px] font-black text-slate-500 mb-4 uppercase tracking-widest font-mono-tech">Verification Sources</p>
                  <div className="flex flex-wrap gap-3">
                    {grounding.map((chunk, idx) => (
                      <a 
                        key={idx} 
                        href={chunk.maps?.uri || chunk.web?.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold bg-white/5 hover:bg-white/10 text-blue-400 px-4 py-2 rounded-full border border-white/5 transition-all"
                      >
                        {chunk.maps?.title || chunk.web?.title || 'External Reference'}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeminiDemo;
