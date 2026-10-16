import React, { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogData.ts';

interface FooterProps {
  onNavigate: (sectionOrPath: string) => void;
  onOpenSeoAudit?: () => void;
}

export function Footer({ onNavigate, onOpenSeoAudit }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid athlete email.');
      return;
    }
    setErrorMessage('');
    setIsSubscribed(true);
  };

  return (
    <footer className="w-full bg-[#080808] border-t border-white/[0.08] pt-24 pb-16 text-[#A0A0A0]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Top Tier: Brand Wordmark & VIP Dispatch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/[0.06]">
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <span className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase tracking-[-0.03em] block mb-3">
                BUILT BY DISCIPLINE
              </span>
              <p className="text-xs sm:text-sm max-w-md text-[#A0A0A0] leading-relaxed font-normal">
                Elite conditioning, ruthless periodization, and uncompromising athletic standards. Engineered for those who train in the dark.
              </p>
            </div>

            {/* Social Links with Monospace Micro-Typography */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 mt-10">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[11px] font-semibold tracking-widest text-[#A0A0A0] hover:text-[#C6FF00] transition-colors uppercase flex items-center gap-1 group"
              >
                <span>INSTAGRAM</span>
                <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[11px] font-semibold tracking-widest text-[#A0A0A0] hover:text-[#C6FF00] transition-colors uppercase flex items-center gap-1 group"
              >
                <span>YOUTUBE</span>
                <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[11px] font-semibold tracking-widest text-[#A0A0A0] hover:text-[#C6FF00] transition-colors uppercase flex items-center gap-1 group"
              >
                <span>X</span>
                <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[11px] font-semibold tracking-widest text-[#A0A0A0] hover:text-[#C6FF00] transition-colors uppercase flex items-center gap-1 group"
              >
                <span>SPOTIFY</span>
                <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Right: Athlete Dispatch Signup & Protocol Directory */}
          <div className="lg:col-span-6 flex flex-col justify-between lg:pl-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 bg-[#C6FF00]" />
                <span className="font-mono text-[11px] font-semibold tracking-[0.3em] text-[#C6FF00] uppercase">
                  THE DISCIPLINE DISPATCH
                </span>
              </div>
              <h4 className="font-condensed font-black text-2xl text-white uppercase tracking-tight mb-2">
                WEEKLY PROTOCOLS & ATHLETIC RESEARCH
              </h4>
              <p className="text-xs text-[#A0A0A0] mb-5 font-normal">
                No marketing clutter. Only periodization guides, biomarker research, and training splits.
              </p>

              {isSubscribed ? (
                <div className="bg-[#121212] border border-[#C6FF00]/40 p-4 flex items-center gap-3 text-white text-xs font-mono">
                  <div className="w-5 h-5 rounded-full bg-[#C6FF00] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                  </div>
                  <span>WELCOME TO THE ROSTER. FIRST DISPATCH ARRIVES MONDAY 05:00.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER YOUR ATHLETE EMAIL"
                    className="flex-1 bg-[#121212] border border-white/[0.12] px-4 py-3.5 text-xs text-white placeholder-[#666666] focus:outline-none focus:border-[#C6FF00] transition-colors uppercase tracking-wider font-mono"
                  />
                  <button
                    type="submit"
                    className="bg-[#C6FF00] hover:bg-[#b0e600] active:scale-[0.98] text-black font-condensed font-black px-7 py-3.5 text-sm tracking-wider uppercase transition-all duration-200 cursor-pointer shrink-0"
                  >
                    SUBSCRIBE
                  </button>
                </form>
              )}
              {errorMessage && (
                <p className="text-xs text-red-400 mt-2 font-mono">{errorMessage}</p>
              )}
            </div>

            {/* Quick Navigation Links */}
            <div className="flex flex-wrap items-center gap-6 mt-10 text-xs font-medium text-[#A0A0A0]">
              <button onClick={() => onNavigate('hero')} className="hover:text-white transition-colors cursor-pointer uppercase">
                Home
              </button>
              <button onClick={() => onNavigate('workouts')} className="hover:text-white transition-colors cursor-pointer uppercase">
                Workouts
              </button>
              <button onClick={() => onNavigate('programs')} className="hover:text-white transition-colors cursor-pointer uppercase">
                Programs
              </button>
              <button onClick={() => onNavigate('nutrition')} className="hover:text-white transition-colors cursor-pointer uppercase">
                Nutrition
              </button>
              <button onClick={() => onNavigate('blog')} className="text-white hover:text-[#C6FF00] transition-colors cursor-pointer uppercase font-semibold">
                Journal
              </button>
              <button onClick={() => onNavigate('gallery')} className="hover:text-white transition-colors cursor-pointer uppercase">
                Gallery
              </button>
            </div>
          </div>
        </div>

        {/* Middle Tier: Direct SEO Protocol Crawl Links */}
        <div className="py-8 border-b border-white/[0.06]">
          <span className="font-mono text-[10px] uppercase text-neutral-500 tracking-widest block mb-4">
            FEATURED RESEARCH DIRECTIVES:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs text-[#A0A0A0]">
            {BLOG_POSTS.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`blog/${post.slug}`);
                }}
                className="hover:text-[#C6FF00] transition-colors truncate block"
              >
                • {post.title}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Tier: Simple Copyright Notice & SEO Audit link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <p>© {new Date().getFullYear()} BUILT BY DISCIPLINE. ALL RIGHTS RESERVED.</p>
          <div className="flex flex-wrap items-center gap-4">
            {onOpenSeoAudit && (
              <button
                onClick={onOpenSeoAudit}
                className="text-[#C6FF00] hover:underline cursor-pointer flex items-center gap-1 font-mono text-[11px]"
              >
                [STEP 3: SEO & AEO AUDIT DOSSIER]
              </button>
            )}
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span>PERFORMANCE LABS</span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span>NO COMPROMISE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
