import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { HERO_IMAGE } from '../data/fitnessData.ts';
import { SafeImage } from './SafeImage.tsx';

interface HeroProps {
  onOpenJourney: () => void;
  onExploreWorkouts: () => void;
}

export function Hero({ onOpenJourney, onExploreWorkouts }: HeroProps) {
  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#080808]">
      {/* Background Hero Image with Cinema Crop */}
      <div className="absolute inset-0 z-0 select-none">
        <SafeImage
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          priority={true}
          containerClassName="w-full h-full"
          className="scale-105 filter brightness-[0.72] contrast-[1.18] transition-transform duration-1000 ease-athletic"
        />
        {/* Layered Cinematic Dark Vignettes & Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/30 to-[#080808]/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/70 via-transparent to-[#080808]/70" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-[#080808]/90" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pt-36 pb-28 flex flex-col items-center text-center">
        {/* Supporting Line with Refined Monospace Spacing */}
        <div className="inline-flex items-center gap-3 mb-6 sm:mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
          <span className="w-1.5 h-1.5 bg-[#C6FF00]" />
          <p className="font-mono text-xs sm:text-sm font-semibold tracking-[0.35em] uppercase text-[#A0A0A0]">
            YOUR BODY. YOUR STANDARD.
          </p>
          <span className="w-1.5 h-1.5 bg-[#C6FF00]" />
        </div>

        {/* Oversized Condensed Master Headline */}
        <h1 className="font-condensed font-black tracking-[-0.04em] text-white uppercase text-6xl sm:text-8xl md:text-9xl lg:text-[11.5rem] leading-[0.84] mb-8 sm:mb-12 select-none animate-in fade-in slide-in-from-bottom-4 duration-1000">
          BUILT BY<br />
          <span className="text-white hover:text-[#C6FF00] transition-colors duration-500 ease-athletic">
            DISCIPLINE<span className="text-[#C6FF00]">.</span>
          </span>
        </h1>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150">
          <button
            onClick={onExploreWorkouts}
            className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/[0.08] active:scale-[0.98] text-white border border-white/20 hover:border-white font-condensed font-bold text-sm sm:text-base tracking-widest uppercase transition-all duration-300 ease-athletic cursor-pointer text-center"
          >
            EXPLORE WORKOUTS
          </button>
          <button
            onClick={onOpenJourney}
            className="w-full sm:w-auto px-9 py-4 bg-[#C6FF00] hover:bg-[#b5eb00] active:scale-[0.98] text-black font-condensed font-black text-sm sm:text-base tracking-widest uppercase transition-all duration-300 ease-athletic cursor-pointer text-center flex items-center justify-center gap-2 shadow-[0_0_35px_rgba(198,255,0,0.22)] hover:shadow-[0_0_45px_rgba(198,255,0,0.35)]"
          >
            <span>START YOUR JOURNEY</span>
            <ArrowUpRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2.5 text-[#A0A0A0] hover:text-white transition-colors cursor-pointer group select-none"
        onClick={onExploreWorkouts}
      >
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase">SCROLL</span>
        <div className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center p-1 group-hover:border-white/50 transition-colors">
          <div className="w-1 h-2 bg-[#C6FF00] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
