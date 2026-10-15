import { MOTIVATION_IMAGE } from '../data/fitnessData.ts';
import { SafeImage } from './SafeImage.tsx';

export function MotivationSection() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#080808] border-t border-b border-white/[0.06]">
      {/* Full-Width Background Photo */}
      <div className="absolute inset-0 z-0 select-none">
        <SafeImage
          src={MOTIVATION_IMAGE.src}
          alt={MOTIVATION_IMAGE.alt}
          containerClassName="w-full h-full"
          className="scale-105 filter brightness-[0.62] contrast-[1.20] transition-transform duration-1000 ease-athletic"
        />
        {/* Layered Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/70 via-transparent to-[#080808]/70" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#080808]/50 to-[#080808]/90" />
      </div>

      {/* Single Powerful Statement */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Electric Lime Indicator Bar */}
        <div className="w-16 h-1 bg-[#C6FF00] mx-auto mb-8 sm:mb-12 shadow-[0_0_20px_rgba(198,255,0,0.5)]" />

        <h2 className="font-condensed font-black tracking-[-0.04em] text-white uppercase text-6xl sm:text-8xl md:text-9xl lg:text-[11.5rem] leading-[0.86] select-none">
          NO SHORTCUTS.<br />
          <span className="text-white hover:text-[#C6FF00] transition-colors duration-500 ease-athletic">
            JUST SHOW UP<span className="text-[#C6FF00]">.</span>
          </span>
        </h2>
      </div>
    </section>
  );
}
