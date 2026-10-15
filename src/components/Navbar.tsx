import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenJourney: () => void;
  onNavigate: (sectionId: string) => void;
}

export function Navbar({ onOpenJourney, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'HOME', id: 'hero' },
    { label: 'WORKOUTS', id: 'workouts' },
    { label: 'PROGRAMS', id: 'programs' },
    { label: 'NUTRITION', id: 'nutrition' },
    { label: 'ABOUT', id: 'gallery' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-athletic ${
          isScrolled
            ? 'bg-[#080808]/92 backdrop-blur-md border-b border-white/[0.08] py-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'bg-transparent py-6 sm:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="text-left group cursor-pointer focus:outline-none"
            aria-label="Built by Discipline Home"
          >
            <div className="flex items-center gap-2">
              <span className="font-condensed font-black tracking-[-0.03em] text-xl sm:text-2xl text-white group-hover:text-[#C6FF00] transition-colors duration-300 whitespace-nowrap shrink-0 uppercase">
                BUILT BY DISCIPLINE
              </span>
            </div>
          </button>

          {/* Zone 2: 4–5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-9 text-[11px] font-mono tracking-[0.2em] text-[#A0A0A0]">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="hover:text-white transition-colors relative py-1 focus:outline-none cursor-pointer whitespace-nowrap shrink-0 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#C6FF00] transition-all duration-300 ease-athletic group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <button
              onClick={onOpenJourney}
              className="bg-[#C6FF00] hover:bg-[#b0e600] active:scale-[0.98] text-black font-condensed font-black px-5 py-2 text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-[0_0_20px_rgba(198,255,0,0.15)] hover:shadow-[0_0_25px_rgba(198,255,0,0.3)]"
            >
              START JOURNEY
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-white hover:text-[#C6FF00] focus:outline-none cursor-pointer -mr-2"
              aria-label="Toggle mobile navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-[#080808]/98 backdrop-blur-2xl flex flex-col justify-between p-8 sm:p-10 animate-in fade-in duration-300 ease-athletic">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <span className="font-condensed font-black tracking-[-0.03em] text-xl text-white uppercase">
              BUILT BY DISCIPLINE
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-neutral-400 hover:text-white cursor-pointer"
              aria-label="Close navigation"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-6 py-8">
            {navLinks.map((link, idx) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-left font-condensed font-black text-4xl tracking-tight text-white hover:text-[#C6FF00] transition-colors cursor-pointer flex items-baseline gap-4"
              >
                <span className="text-xs font-mono text-[#C6FF00] font-normal">0{idx + 1}</span>
                <span>{link.label}</span>
              </button>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenJourney();
              }}
              className="w-full bg-[#C6FF00] text-black font-condensed font-black py-4 text-center tracking-wider text-base uppercase cursor-pointer active:scale-[0.98] transition-transform"
            >
              START YOUR JOURNEY
            </button>
            <p className="text-center font-mono text-[10px] tracking-[0.25em] text-[#A0A0A0] uppercase">
              YOUR BODY. YOUR STANDARD.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
