
import React from 'react';

interface NavbarProps {
  currentView: 'home' | 'blog';
  onNavigate: (view: 'home' | 'blog') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const scrollToSection = (sectionId: string) => {
    if (currentView !== 'home') {
      onNavigate('home');
      // Small delay to allow the home view to render before scrolling
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleInitiateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection('contact');
  };

  const handleSuccessClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection('testimonials');
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentView !== 'home') {
      onNavigate('home');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 w-[94%] max-w-6xl z-50 glass-morphism rounded-[2rem] px-12 py-4.5 transition-all duration-500 shadow-[0_30px_60px_-15px_rgba(1,50,32,0.8)]">
      <div className="flex items-center justify-between">
        <button 
          onClick={handleHomeClick}
          className="flex items-center group"
        >
          <span className="text-2xl font-bold tracking-[-0.1em] text-[#D1F2EB] italic font-heading transition-all group-hover:text-[#50C878] group-hover:scale-105">PROPBOTIX</span>
        </button>
        
        <div className="hidden md:flex items-center space-x-16">
          <button 
            onClick={handleHomeClick}
            className={`text-[10px] font-bold uppercase tracking-[0.4em] transition-all font-mono-tech ${currentView === 'home' ? 'text-[#50C878]' : 'text-[#0B6E4F] hover:text-[#D1F2EB]'}`}
          >
            Home
          </button>
          <button 
            onClick={() => onNavigate('blog')}
            className={`text-[10px] font-bold uppercase tracking-[0.4em] transition-all font-mono-tech ${currentView === 'blog' ? 'text-[#50C878]' : 'text-[#0B6E4F] hover:text-[#D1F2EB]'}`}
          >
            Archive
          </button>
          <a 
            href="#testimonials" 
            onClick={handleSuccessClick}
            className="text-[#0B6E4F] hover:text-[#D1F2EB] text-[10px] font-bold uppercase tracking-[0.4em] transition-all font-mono-tech"
          >
            Success
          </a>
          <a 
            href="#contact"
            onClick={handleInitiateClick}
            className="px-10 py-4 accent-gradient text-[#D1F2EB] rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] shadow-xl shadow-[#50C878]/30 hover:scale-[1.05] active:scale-95 transition-all font-heading text-center flex items-center justify-center"
          >
            Initiate
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
