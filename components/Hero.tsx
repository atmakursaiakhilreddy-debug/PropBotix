
import React from 'react';

const Hero: React.FC = () => {
  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="home" className="relative pt-72 pb-56 lg:pt-80 lg:pb-72 overflow-hidden mesh-gradient bg-black">
      <div className="absolute inset-0 structural-grid [mask-image:radial-gradient(ellipse_70%_50%_at_50%_50%,#000_80%,transparent_100%)] opacity-60"></div>
      
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
        <h1 className="text-7xl md:text-[11.5rem] font-bold tracking-[-0.07em] mb-16 leading-[0.8] uppercase italic font-heading">
          <span className="gradient-text">Ideate.</span><br />
          <span className="stroke-text">Automate.</span><br />
          <span className="gradient-text">Scale.</span>
        </h1>
        
        <p className="text-xl md:text-3xl text-zinc-500 max-w-5xl mx-auto mb-24 font-light leading-relaxed tracking-tight">
          Propbotix is the architectural partner for rapid AI innovation. <br className="hidden md:block" /> 
          We transform abstract logic into production-grade autonomous systems.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
          <button 
            onClick={handleScrollToContact}
            className="px-14 py-7 bg-white text-black font-bold rounded-2xl hover:bg-zinc-100 transition-all text-xs uppercase tracking-[0.3em] shadow-2xl shadow-white/5 font-heading"
          >
            Book Strategy
          </button>
        </div>
        
        <div className="mt-64 flex flex-wrap justify-center gap-x-24 gap-y-12 opacity-15 items-center grayscale font-mono-tech">
           <span className="text-[10px] uppercase">SalesOps.v2</span>
           <span className="text-[10px] uppercase">Agentic.Stack</span>
           <span className="text-[10px] uppercase">Logic.Core</span>
           <span className="text-[10px] uppercase">RAG.Scale</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
