
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import { Twitter, Linkedin, Link as LinkIcon, Check, Zap, Cpu, Layers, ShieldCheck, Gauge, Code2, Loader2, Send, User, Phone, Mail } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    category: "Agentic Frameworks",
    time: "8 min",
    author: "Propbotix Labs",
    date: "Aug 12, 2025",
    title: "The Shift from Chatbots to Autonomous Agents",
    excerpt: "Static chatbots are obsolete. Explore how the next generation of LLMs are functioning as full-scale reasoning engines with local tool-calling capabilities.",
    content: `
      <h3>The End of the Scripted Era</h3>
      <p>The transition from "Chat" to "Agents" represents a fundamental paradigm shift in how we interact with silicon. While first-generation chatbots relied on rigid decision trees and RAG-based lookup, modern Autonomous Agents function as reasoning kernels. They don't just talk; they act.</p>
      
      <h4>Core Reasoning Loops</h4>
      <p>At Propbotix, we specialize in implementing the ReAct (Reason + Act) framework. This allows an LLM to generate a thought process, decide on a tool (like a browser or a Python interpreter), execute that tool, and observe the result before moving to the next step.</p>
      
      <h4>Tool-Calling Capabilities</h4>
      <p>The real power of an agent lies in its toolkit. By bridging LLMs with your internal APIs, CRM, and cloud infrastructure, we enable agents to self-correct errors in data entry and perform deep research autonomously.</p>
      
      <p>We believe that by the end of 2025, every enterprise department will have at least three autonomous agents handling the "cognitive plumbing" of the organization.</p>
    `
  },
  {
    id: 2,
    category: "Enterprise AI",
    time: "12 min",
    author: "Propbotix Labs",
    date: "Aug 10, 2025",
    title: "Scaling RAG: From Prototype to Enterprise Production",
    excerpt: "Retrieval-Augmented Generation is simple in a demo, but complex at scale. We break down vector database sharding and hybrid search optimization.",
    content: `
      <h3>Moving Beyond Basic Embeddings</h3>
      <p>Retrieval-Augmented Generation (RAG) has become the industry standard for reducing hallucinations. However, most companies struggle when their document count moves from thousands to millions.</p>
      
      <h4>Hybrid Search Architectures</h4>
      <p>For enterprise-grade reliability, we implement hybrid search. This combines dense vector embeddings with sparse keyword search (BM25) for precision. This ensures that when a user asks for a specific "Part Number," the system doesn't return a "meaningfully similar" but incorrect document.</p>
      
      <h4>Advanced Context Window Management</h4>
      <p>The bottleneck in RAG is often context window saturation. We utilize Parent Document Retrieval and Re-ranking models to ensure that only the highest-density information reaches the LLM.</p>
    `
  },
  {
    id: 3,
    category: "Efficiency",
    time: "6 min",
    author: "Propbotix Labs",
    date: "Aug 05, 2025",
    title: "Why Your Business Needs a CAIO Now",
    excerpt: "The rapid acceleration of cognitive automation requires a dedicated strategic leader to navigate the transition to an AI-first operating model.",
    content: `
      <h3>A Strategic Necessity</h3>
      <p>The Chief AI Officer (CAIO) role is not just another title for a CTO. While the CTO manages infrastructure, the CAIO manages the cognitive transformation of the workforce.</p>
      
      <h4>The CAIO Mandate</h4>
      <p>The primary responsibilities of a CAIO include establishing ethical guidelines, workflow auditing, and overseeing the reskilling of employees as their roles shift from "execution" to "AI orchestration."</p>
      
      <p>Companies that fail to centralize their AI strategy risk a "shadow AI" problem, where disparate departments implement unvetted tools, leading to massive data leaks.</p>
    `
  }
];

const BlogCard: React.FC<{ 
  post: typeof blogPosts[0];
  isLarge?: boolean;
  onClick: () => void;
}> = ({ post, isLarge, onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-ebon p-14 rounded-[2.5rem] card-hover group cursor-pointer flex flex-col h-full border border-white/[0.03] ${isLarge ? 'md:col-span-2' : ''}`}
  >
    <div className="flex justify-between items-center mb-14 font-mono-tech">
      <span className="px-5 py-2 rounded-xl bg-blue-500/5 text-blue-400 text-[9px] font-bold uppercase tracking-[0.2em] border border-blue-500/10">
        {post.category}
      </span>
      <span className="text-zinc-600 text-[9px] font-bold uppercase tracking-widest">{post.time} Read</span>
    </div>
    <h3 className={`${isLarge ? 'text-5xl' : 'text-3xl'} font-bold mb-10 tracking-tight group-hover:text-blue-400 transition-colors leading-[1.1] font-heading italic`}>
      {post.title}
    </h3>
    <p className="text-zinc-500 text-xl font-light leading-relaxed mb-14 flex-1">
      {post.excerpt}
    </p>
    <div className="flex items-center justify-between border-t border-white/[0.03] pt-14 mt-auto">
      <div className="flex items-center gap-6">
        <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center text-[10px] font-bold text-blue-500 border border-white/5 font-heading">PL</div>
        <div>
          <div className="text-white text-base font-bold tracking-tight">{post.author}</div>
          <div className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest font-mono-tech">{post.date}</div>
        </div>
      </div>
      <div className="w-14 h-14 rounded-full glass-morphism border border-white/5 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-500">
        <svg className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
        </svg>
      </div>
    </div>
  </div>
);

const CapabilityCard: React.FC<{ title: string; desc: string; icon: React.ReactNode }> = ({ title, desc, icon }) => (
  <div className="bg-onyx p-16 rounded-[3rem] card-hover group border border-white/[0.03]">
    <div className="w-20 h-20 bg-black border border-white/5 rounded-3xl flex items-center justify-center text-white mb-14 group-hover:bg-blue-600 group-hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-all duration-700">
      {icon}
    </div>
    <h3 className="text-3xl font-bold mb-8 tracking-tight uppercase group-hover:text-blue-400 transition-colors font-heading italic">{title}</h3>
    <p className="text-zinc-500 text-xl font-light leading-relaxed">{desc}</p>
  </div>
);

const LogicBlock: React.FC<{ 
  title: string; 
  subtitle: string; 
  desc: string; 
  metric: string; 
  icon: React.ReactNode;
  accent?: boolean;
}> = ({ title, subtitle, desc, metric, icon, accent }) => (
  <div className={`relative p-16 rounded-[4rem] border transition-all duration-1000 group overflow-hidden ${accent ? 'bg-blue-600/[0.03] border-blue-500/20 shadow-3xl shadow-blue-950/20' : 'bg-onyx border-white/[0.03] hover:border-blue-500/40'}`}>
    <div className="absolute top-0 right-0 p-16 text-[11rem] font-bold text-white/[0.01] leading-none select-none group-hover:text-blue-500/[0.03] transition-colors uppercase italic font-heading">
      {metric.split(' ')[0]}
    </div>
    <div className="relative z-10">
      <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-16 transition-all duration-700 ${accent ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/40' : 'bg-black border border-white/5 text-blue-500 group-hover:bg-blue-600 group-hover:text-white'}`}>
        {icon}
      </div>
      <div className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.8em] mb-8 font-mono-tech">{subtitle}</div>
      <h3 className="text-4xl font-bold text-white mb-10 tracking-tighter leading-tight uppercase italic font-heading">{title}</h3>
      <p className="text-zinc-500 text-2xl font-light leading-relaxed mb-16 max-w-md">{desc}</p>
      <div className="flex items-center gap-6 font-mono-tech">
        <div className="h-[2px] w-14 bg-blue-600/40"></div>
        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{metric}</span>
      </div>
    </div>
  </div>
);

const BlogPage: React.FC<{ onBack: () => void; onInitiate: () => void }> = ({ onBack, onInitiate }) => {
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedPost]);

  if (selectedPost) {
    return (
      <div className="pt-64 pb-80 max-w-5xl mx-auto px-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 bg-black">
        <button 
          onClick={() => setSelectedPost(null)}
          className="flex items-center gap-6 text-zinc-600 hover:text-white mb-32 transition-colors group font-mono-tech"
        >
          <svg className="w-6 h-6 group-hover:-translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Return to Archive</span>
        </button>

        <div className="mb-40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 mb-20 font-mono-tech">
            <div className="flex gap-10 items-center">
              <span className="px-7 py-2.5 rounded-xl bg-blue-500/5 text-blue-400 text-[10px] font-bold uppercase tracking-[0.3em] border border-blue-500/10">
                  {selectedPost.category}
              </span>
              <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">{selectedPost.time} Tech Log</span>
            </div>
          </div>
          <h1 className="text-6xl md:text-[7.5rem] font-bold tracking-[-0.05em] text-white mb-24 leading-[0.9] italic font-heading">
            {selectedPost.title}
          </h1>
          <div className="flex items-center gap-10 pb-24 border-b border-white/[0.05] font-mono-tech">
            <div className="w-20 h-20 rounded-[2rem] bg-onyx flex items-center justify-center text-2xl font-bold text-blue-500 border border-white/5">PL</div>
            <div>
              <div className="text-white text-2xl font-bold tracking-tight font-heading uppercase italic">{selectedPost.author}</div>
              <div className="text-zinc-600 text-[10px] uppercase font-bold tracking-[0.5em]">{selectedPost.date} • Deployment Verified</div>
            </div>
          </div>
        </div>

        <div 
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: selectedPost.content }}
        />

        <div className="mt-64 pt-32 border-t border-white/[0.05] text-center font-heading">
           <h4 className="text-white font-bold text-3xl mb-16 tracking-[0.3em] uppercase italic">Engineering Required?</h4>
           <button 
            onClick={onInitiate}
            className="px-16 py-8 accent-gradient text-white rounded-2xl font-bold uppercase tracking-[0.4em] text-xs shadow-3xl shadow-blue-950/60 hover:scale-[1.05] transition-all"
           >
             Book Audit Protocol
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-64 pb-80 max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 animate-in fade-in duration-1000 bg-black">
      <div className="mb-40">
        <button 
          onClick={onBack}
          className="flex items-center gap-6 text-zinc-600 hover:text-white mb-20 transition-colors group font-mono-tech"
        >
          <svg className="w-6 h-6 group-hover:-translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Exit Logic Vault</span>
        </button>
        <span className="text-blue-500 font-bold text-[10px] uppercase tracking-[1em] mb-12 block font-mono-tech">Intelligence Lab Archive</span>
        <h2 className="text-7xl md:text-[13rem] font-bold tracking-[-0.06em] text-white leading-[0.8] italic font-heading">THE <br/><span className="stroke-text">VAULT</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <BlogCard post={blogPosts[0]} isLarge onClick={() => setSelectedPost(blogPosts[0])} />
        {blogPosts.slice(1).map((post) => (
          <BlogCard key={post.id} post={post} onClick={() => setSelectedPost(post)} />
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'blog'>('home');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'engaged'>('idle');

  const scrollToContact = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInitiateSequence = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, phone, email } = formData;
    if (!name || !phone || !email || !email.includes('@')) return;

    setStatus('transmitting');
    
    // Simulate high-end architectural transmission
    await new Promise(resolve => setTimeout(resolve, 2400));
    
    const subject = encodeURIComponent(`PROPBOTIX: Lead Protocol Initiation [${name}]`);
    const body = encodeURIComponent(
      `CRITICAL: LEAD PROTOCOL INITIATED\n\n` +
      `----------------------------------\n` +
      `IDENTITY: ${name}\n` +
      `PHONE: ${phone}\n` +
      `GMAIL/EMAIL: ${email}\n` +
      `----------------------------------\n` +
      `STATUS: High Priority Requested\n` +
      `SOURCE: Propbotix Agency Portal\n\n` +
      `Please contact this lead immediately to proceed with architectural auditing.`
    );
    
    // This triggers the email sending via the user's default mail client.
    window.location.href = `mailto:contact@propbotix.ai?subject=${subject}&body=${body}`;
    
    setStatus('engaged');
    setFormData({ name: '', phone: '', email: '' });
    
    setTimeout(() => {
      setStatus('idle');
    }, 10000);
  };

  const handleArchiveInitiate = () => {
    setView('home');
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-black selection:bg-blue-600/30 font-['Outfit']">
      <Navbar currentView={view} onNavigate={setView} />
      
      <main className="transition-opacity duration-1000">
        {view === 'home' ? (
          <>
            <Hero />
            
            {/* Core Units Section - Obsidian background */}
            <section id="services" className="py-72 max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 border-t border-white/[0.03] relative bg-obsidian">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-64 bg-gradient-to-b from-blue-600 to-transparent"></div>
              <div className="text-center mb-64">
                <span className="text-blue-500 font-bold text-[10px] uppercase tracking-[1.2em] mb-16 block font-mono-tech">Architectural Stack</span>
                <h2 className="text-6xl md:text-[9.5rem] font-bold tracking-[-0.05em] text-white uppercase italic font-heading">CORE <span className="text-blue-600">UNITS</span></h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <CapabilityCard 
                  title="Rapid Build" 
                  desc="High-performance MVPs shipped at industrial speed. From concept to deployment in weeks, not months."
                  icon={<Zap size={40} strokeWidth={2.5} />}
                />
                <CapabilityCard 
                  title="Growth Engine" 
                  desc="Autonomous sales pipelines that scale horizontally. AI-driven lead enrichment and zero-touch outbound."
                  icon={<Gauge size={40} strokeWidth={2.5} />}
                />
                <CapabilityCard 
                  title="Cognitive Ops" 
                  desc="Multi-agent orchestration for enterprise complexity. We automate the 'cognitive plumbing' of your business."
                  icon={<Cpu size={40} strokeWidth={2.5} />}
                />
              </div>
            </section>

            {/* Re-Engineered Logic Section - Onyx background */}
            <section id="why-us" className="py-80 bg-onyx overflow-hidden border-y border-white/[0.03] relative">
              <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex flex-col mb-64 text-center items-center">
                   <div className="flex items-center gap-14 mb-20">
                      <div className="h-[2px] w-24 bg-blue-600/20"></div>
                      <span className="text-blue-500 font-bold text-[10px] uppercase tracking-[1.2em] font-mono-tech">Propbotix Standard</span>
                      <div className="h-[2px] w-24 bg-blue-600/20"></div>
                   </div>
                   <h2 className="text-[4rem] md:text-[10rem] font-bold tracking-[-0.06em] text-white leading-[0.75] mb-20 uppercase italic font-heading">
                      THE <span className="text-blue-600">STANDARD</span><br/>
                      <span className="stroke-text">OF LOGIC</span>
                   </h2>
                   <p className="text-zinc-500 text-3xl md:text-5xl font-light max-w-6xl leading-tight tracking-tight">
                      We don't build wrappers. We engineer <span className="text-white font-medium">proprietary cognitive infrastructure</span> that redefines industrial productivity.
                   </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-12">
                    <LogicBlock 
                      accent
                      title="Native Logic"
                      subtitle="Speed of Deployment"
                      desc="Abstract requirements to deployed agents in 14 days. We outpace the planning cycles of your global competitors."
                      metric="14-Day Delivery Threshold"
                      icon={<Zap size={44} strokeWidth={2} />}
                    />
                    <LogicBlock 
                      title="Architectural"
                      subtitle="Technical Sovereignty"
                      desc="Zero boilerplate. Every system features custom orchestration, multi-tool-calling, and proprietary RAG sharding."
                      metric="100% Native Architecture"
                      icon={<Code2 size={44} strokeWidth={2} />}
                    />
                  </div>
                  <div className="lg:mt-64 space-y-12">
                    <LogicBlock 
                      title="Efficiency"
                      subtitle="Economic Multiplier"
                      desc="Engineered for high volume. Semantic sharding reduces your API token overhead by over 60% in production."
                      metric="60% Consumption Alpha"
                      icon={<Gauge size={44} strokeWidth={2} />}
                    />
                    <LogicBlock 
                      title="Hardened"
                      subtitle="Security Protocol"
                      desc="Prompt injection defense and SOC-2 ready infrastructure. We protect your proprietary data as our own."
                      metric="Zero-Leak Guarantee"
                      icon={<ShieldCheck size={44} strokeWidth={2} />}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Reclaim Section - Absolute Black background */}
            <section id="efficiency" className="py-80 bg-black overflow-hidden relative">
              <div className="absolute top-0 right-0 w-[60%] h-full bg-blue-600/[0.015] blur-[200px] -z-10"></div>
              <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-48 items-center">
                  <div>
                    <span className="text-blue-500 font-bold text-[10px] uppercase tracking-[1.2em] mb-16 block font-mono-tech">Productivity Delta</span>
                    <h2 className="text-6xl md:text-[11rem] font-bold tracking-[-0.06em] text-white mb-20 leading-[0.8] italic uppercase font-heading">RECLAIM <br/><span className="text-blue-600">200 HOURS</span></h2>
                    <p className="text-zinc-500 text-2xl md:text-4xl font-light leading-relaxed mb-32 max-w-3xl">
                      Offload repetitive cognitive labor to autonomous systems. Your human talent stays focused on the exponential vision.
                    </p>
                    <div className="space-y-16">
                      {[
                        { title: "Autonomous Prospecting", desc: "End-to-end lead enrichment & multi-channel outreach." },
                        { title: "Legacy Integrations", desc: "Agents that live within your existing tech stack." }
                      ].map((item, i) => (
                        <div key={i} className="flex gap-14 items-start group">
                          <div className="flex-shrink-0 w-16 h-16 rounded-3xl bg-onyx flex items-center justify-center border border-white/5 text-blue-500 transition-all duration-700 group-hover:bg-blue-600 group-hover:text-white">
                             <Check size={28} strokeWidth={3} />
                          </div>
                          <div>
                            <h4 className="text-white font-bold text-4xl uppercase tracking-tighter mb-4 italic font-heading">{item.title}</h4>
                            <p className="text-zinc-500 text-2xl font-light leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative">
                    <div className="bg-onyx rounded-[5rem] p-24 border border-white/[0.04] relative z-10 shadow-[0_50px_100px_-25px_rgba(0,0,0,1)]">
                      <div className="space-y-24">
                        <div className="bg-black rounded-[2.5rem] p-16 border border-white/5">
                          <div className="flex justify-between items-center mb-12 font-mono-tech">
                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Efficiency Compression</span>
                            <span className="text-blue-500 font-bold text-4xl tracking-tighter">+840%</span>
                          </div>
                          <div className="h-2 w-full bg-white/[0.03] rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 w-[85%] rounded-full shadow-[0_0_60px_rgba(37,99,235,0.7)] animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Success Section - Ebon background */}
            <section id="testimonials" className="py-80 bg-ebon">
              <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
                <span className="text-blue-500 font-bold text-[10px] uppercase tracking-[1.2em] mb-20 block font-mono-tech">Validation Protocol</span>
                <h2 className="text-6xl md:text-[11rem] font-bold tracking-[-0.06em] text-white mb-40 italic uppercase font-heading">ELITE <span className="text-blue-600">TRUST</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="bg-black border border-white/[0.04] p-16 rounded-[4rem] text-left hover:border-blue-500/30 transition-all duration-1000 shadow-3xl">
                    <p className="text-zinc-500 text-2xl font-light leading-relaxed mb-16 italic">"Propbotix nailed setting up an AI to handle outgoing DMs so our reps can focus on calls. Booked meetings within 24 hours."</p>
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-onyx rounded-full flex items-center justify-center font-bold text-blue-500 text-xs font-heading italic">S</div>
                      <span className="text-white font-bold tracking-tight font-heading uppercase italic text-xl">Shariq</span>
                    </div>
                  </div>
                  <div className="bg-black border border-white/[0.04] p-16 rounded-[4rem] text-left hover:border-blue-500/30 transition-all duration-1000 mt-12 lg:mt-32 shadow-3xl">
                    <p className="text-zinc-500 text-2xl font-light leading-relaxed mb-16 italic">"They delivered exactly what we needed. An Instagram Inbound Chatbot making workflow much more efficient. Elite execution."</p>
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-onyx rounded-full flex items-center justify-center font-bold text-blue-500 text-xs font-heading italic">R</div>
                      <span className="text-white font-bold tracking-tight font-heading uppercase italic text-xl">Roxis</span>
                    </div>
                  </div>
                  <div className="bg-black border border-white/[0.04] p-16 rounded-[4rem] text-left hover:border-blue-500/30 transition-all duration-1000 shadow-3xl">
                    <p className="text-zinc-500 text-2xl font-light leading-relaxed mb-16 italic">"Killer automated sales system. Setup was seamless and results really good! Reliable and high performance. Highly recommended."</p>
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-onyx rounded-full flex items-center justify-center font-bold text-blue-500 text-xs font-heading italic">R</div>
                      <span className="text-white font-bold tracking-tight font-heading uppercase italic text-xl">Rohit</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Final Protocol - Jet background */}
            <section id="contact" className="py-80 max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 bg-black">
              <div className="bg-jet border border-white/[0.05] rounded-[6rem] p-16 md:p-32 text-center relative overflow-hidden shadow-[0_100px_200px_-50px_rgba(0,0,0,1)]">
                 <div className="absolute inset-0 structural-grid opacity-10 pointer-events-none"></div>
                 <div className="relative z-10 py-12">
                   <h2 className="text-[clamp(2.5rem,10vw,8rem)] font-bold tracking-[-0.06em] mb-20 leading-[0.85] italic uppercase font-heading">
                     ENGINEER YOUR <br/>
                     <span className="gradient-text">LEGACY.</span>
                   </h2>
                   <div className="flex flex-col items-center gap-12">
                     <form onSubmit={handleInitiateSequence} className="w-full max-w-4xl space-y-8 font-heading">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="relative group">
                           <User className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-blue-500 transition-colors" size={20} />
                           <input 
                             type="text" 
                             required
                             value={formData.name}
                             onChange={(e) => setFormData({...formData, name: e.target.value})}
                             placeholder="Your Name" 
                             disabled={status !== 'idle'}
                             className="w-full pl-16 pr-10 py-6 bg-black border border-white/10 rounded-2xl focus:outline-none focus:ring-1 focus:ring-blue-600 text-lg text-white font-light placeholder:text-zinc-800 disabled:opacity-50"
                           />
                         </div>
                         <div className="relative group">
                           <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-blue-500 transition-colors" size={20} />
                           <input 
                             type="tel" 
                             required
                             value={formData.phone}
                             onChange={(e) => setFormData({...formData, phone: e.target.value})}
                             placeholder="Phone Number" 
                             disabled={status !== 'idle'}
                             className="w-full pl-16 pr-10 py-6 bg-black border border-white/10 rounded-2xl focus:outline-none focus:ring-1 focus:ring-blue-600 text-lg text-white font-light placeholder:text-zinc-800 disabled:opacity-50"
                           />
                         </div>
                       </div>
                       
                       <div className="relative group">
                         <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-blue-500 transition-colors" size={20} />
                         <input 
                           type="email" 
                           required
                           value={formData.email}
                           onChange={(e) => setFormData({...formData, email: e.target.value})}
                           placeholder="Gmail / Email Address" 
                           disabled={status !== 'idle'}
                           className="w-full pl-16 pr-10 py-6 bg-black border border-white/10 rounded-2xl focus:outline-none focus:ring-1 focus:ring-blue-600 text-lg text-white font-light placeholder:text-zinc-800 disabled:opacity-50"
                         />
                       </div>

                       <button 
                        type="submit"
                        disabled={status !== 'idle'}
                        className={`w-full py-8 rounded-2xl font-bold uppercase tracking-[0.4em] text-xs shadow-3xl transition-all flex items-center justify-center gap-4 ${
                          status === 'engaged' 
                          ? 'bg-green-600 shadow-green-950/70 text-white' 
                          : 'accent-gradient shadow-blue-950/70 text-white hover:scale-[1.01] active:scale-[0.99]'
                        }`}
                       >
                         {status === 'idle' && (
                           <>
                             <Send size={16} />
                             Initiate Protocol Sequence
                           </>
                         )}
                         {status === 'transmitting' && (
                           <>
                             <Loader2 size={16} className="animate-spin" />
                             Encoding Transmission...
                           </>
                         )}
                         {status === 'engaged' && (
                           <>
                             <Check size={16} />
                             Protocol engaged - Data Dispatched
                           </>
                         )}
                       </button>
                     </form>
                     {status === 'engaged' && (
                       <p className="text-green-500 font-mono-tech text-[10px] uppercase tracking-[0.4em] animate-pulse">Transmission Verified. Strategic Audit Requested.</p>
                     )}
                   </div>
                 </div>
              </div>
            </section>
          </>
        ) : (
          <BlogPage onBack={() => setView('home')} onInitiate={handleArchiveInitiate} />
        )}
      </main>

      <footer className="py-48 border-t border-white/[0.05] bg-black">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-32">
          <div className="flex flex-col gap-10 text-center md:text-left">
            <div className="text-5xl font-bold tracking-[-0.12em] text-white italic font-heading">PROPBOTIX</div>
            <p className="text-zinc-700 text-2xl max-w-md font-light leading-relaxed">Leading the rapid prototyping revolution with frontier AI engineering.</p>
          </div>
          <div className="text-zinc-800 text-[10px] font-bold uppercase tracking-[0.8em] font-mono-tech">
            © 2025 Propbotix Engineered Systems
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
