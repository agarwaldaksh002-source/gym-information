import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { NUTRITION_IMAGE, NUTRITION_PILLARS } from '../data/fitnessData.ts';
import { SafeImage } from './SafeImage.tsx';

interface NutritionSectionProps {
  onDiscoverNutrition: () => void;
}

export function NutritionSection({ onDiscoverNutrition }: NutritionSectionProps) {
  const [activeTab, setActiveTab] = useState<string>('protein');
  const currentPillar = NUTRITION_PILLARS.find((p) => p.id === activeTab) || NUTRITION_PILLARS[0];

  return (
    <section id="nutrition" className="relative w-full py-28 sm:py-36 bg-[#080808] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Large Appetizing High-Protein Meal Photograph */}
          <div className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/12] lg:aspect-square overflow-hidden bg-[#121212] border border-white/[0.08] shadow-2xl">
            <SafeImage
              src={NUTRITION_IMAGE.src}
              alt={NUTRITION_IMAGE.alt}
              containerClassName="w-full h-full"
              className="filter brightness-[0.85] contrast-[1.12] hover:scale-105 transition-transform duration-700 ease-athletic"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-70" />
            
            {/* Minimal In-Picture Editorial Label */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-white/90">
              <span className="font-semibold text-[#C6FF00]">PLATE ARCHITECTURE</span>
              <span className="text-[#A0A0A0]">WILD SALMON · GREENS · AVOCADO</span>
            </div>
          </div>

          {/* Right Column: Editorial Copy & 3 Compact Categories */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-[#C6FF00]" />
              <span className="font-mono text-[11px] font-semibold tracking-[0.3em] text-[#C6FF00] uppercase">
                04 / BIOCHEMICAL ALIGNMENT
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-condensed font-black tracking-[-0.03em] text-5xl sm:text-7xl text-white uppercase mb-4 leading-[0.9]">
              FUEL YOUR<br />POTENTIAL.
            </h2>

            {/* Supporting text strictly <= 2 short lines */}
            <p className="text-sm sm:text-base text-[#A0A0A0] leading-relaxed mb-8 max-w-xl font-normal">
              Precision macronutrients calibrated for lean muscle recovery and metabolic power. Unadulterated whole foods formulated to match extreme training demands.
            </p>

            {/* Three Compact Categories (Interactive Filter Buttons / Tabs) */}
            <div className="flex items-center gap-2 mb-6 border-b border-white/[0.08] pb-4">
              {NUTRITION_PILLARS.map((pillar) => {
                const isActive = activeTab === pillar.id;
                return (
                  <button
                    key={pillar.id}
                    onClick={() => setActiveTab(pillar.id)}
                    className={`px-4 sm:px-5 py-2.5 text-xs font-condensed font-bold tracking-widest uppercase transition-all duration-300 ease-athletic cursor-pointer ${
                      isActive
                        ? 'bg-[#C6FF00] text-black shadow-[0_0_20px_rgba(198,255,0,0.2)]'
                        : 'text-[#A0A0A0] hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    {pillar.name}
                  </button>
                );
              })}
            </div>

            {/* Pillar Details Card */}
            <div className="bg-[#121212] border border-white/[0.08] p-6 sm:p-7 mb-8 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h4 className="font-condensed font-black text-xl text-white uppercase tracking-tight">
                  {currentPillar.headline}
                </h4>
                <span className="font-mono text-xs font-medium text-[#C6FF00] tracking-wider tabular-nums">
                  {currentPillar.metric}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed mb-5 font-normal">
                {currentPillar.summary}
              </p>

              {/* Clean Staples List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-white/90">
                {currentPillar.staples.map((staple, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#C6FF00] shrink-0 stroke-[2.5]" />
                    <span className="truncate">{staple}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* DISCOVER NUTRITION Button */}
            <div>
              <button
                onClick={onDiscoverNutrition}
                className="w-full sm:w-auto px-9 py-4 bg-[#C6FF00] hover:bg-[#b0e600] active:scale-[0.98] text-black font-condensed font-black text-sm sm:text-base tracking-widest uppercase transition-all duration-300 ease-athletic cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(198,255,0,0.18)] hover:shadow-[0_0_40px_rgba(198,255,0,0.3)]"
              >
                <span>DISCOVER NUTRITION</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
