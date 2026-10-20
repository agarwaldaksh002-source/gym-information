import { ArrowLeft, ArrowUpRight, Calculator, Check, ShieldCheck, Flame, Droplets, Sparkles } from 'lucide-react';
import { NUTRITION_PILLARS } from '../data/fitnessData.ts';
import { NutritionSection } from './NutritionSection.tsx';
import { Link } from 'react-router-dom';

interface NutritionPageProps {
  onDiscoverNutrition: () => void;
}

export function NutritionPage({ onDiscoverNutrition }: NutritionPageProps) {
  return (
    <div className="min-h-screen bg-[#080808] text-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between pb-8 border-b border-white/[0.08] mb-12">
          <Link
            to="/"
            className="font-mono text-xs text-[#A0A0A0] hover:text-[#C6FF00] uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO HOME</span>
          </Link>
          <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest hidden sm:block">
            BUILT BY DISCIPLINE / METABOLIC BIOCHEMISTRY
          </div>
        </div>

        {/* Page Header */}
        <div className="max-w-4xl mb-14 sm:mb-18">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 bg-[#C6FF00]" />
            <span className="font-mono text-[11px] font-semibold tracking-[0.3em] text-[#C6FF00] uppercase">
              03 / BIOCHEMICAL ALIGNMENT
            </span>
          </div>
          <h1 className="font-condensed font-black tracking-[-0.03em] text-5xl sm:text-7xl lg:text-8xl text-white uppercase leading-[0.9] mb-6">
            PRECISION NUTRITION
          </h1>
          <p className="text-sm sm:text-base text-[#A0A0A0] leading-relaxed font-normal max-w-2xl">
            Precision macronutrients calibrated for lean muscle recovery, neuromuscular power, and endocrine optimization. Training is merely the biological stimulus—nutrition is the physical material that manifests the adaptation.
          </p>
        </div>

        {/* Interactive Nutrition Section Component */}
        <div className="mb-20">
          <NutritionSection onDiscoverNutrition={onDiscoverNutrition} />
        </div>

        {/* Nutrition Calculator Hero Callout */}
        <div className="bg-[#111111] border-2 border-[#C6FF00]/40 p-8 sm:p-12 mb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#C6FF00]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-[#C6FF00] mb-3">
                <Calculator className="w-5 h-5" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider">
                  INTERACTIVE PERFORMANCE TOOL
                </span>
              </div>
              <h2 className="font-condensed font-black text-3xl sm:text-5xl text-white uppercase tracking-tight mb-4">
                MACRONUTRIENT & CALORIC CALCULATOR
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal mb-4">
                Calibrate your daily intake of protein, periodized carbohydrates, essential fats, and sodium electrolytes based on body mass, body fat percentage, and specific training goals (Hypertrophy, Recomp, Peak Cut).
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-[#A0A0A0]">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#C6FF00]" />
                  Leucine threshold validation
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#C6FF00]" />
                  Peri-workout carb pacing
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#C6FF00]" />
                  Electrolyte fluid baseline
                </span>
              </div>
            </div>
            <button
              onClick={onDiscoverNutrition}
              className="px-10 py-5 bg-[#C6FF00] hover:bg-[#b0e600] active:scale-[0.98] text-black font-condensed font-black text-sm uppercase tracking-widest transition-all cursor-pointer shadow-[0_0_25px_rgba(198,255,0,0.25)] flex items-center justify-center gap-2 shrink-0"
            >
              <span>LAUNCH CALCULATOR</span>
              <ArrowUpRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* 3 Pillars Deep Dive */}
        <div className="pt-16 border-t border-white/[0.08] mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-mono text-[11px] font-semibold tracking-[0.3em] text-[#C6FF00] uppercase block mb-1">
                BIOCHEMICAL LAWS
              </span>
              <h2 className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
                THE 3 NUTRITION PILLARS
              </h2>
            </div>
            <Link
              to="/blog/precision-macronutrient-fueling-the-athletes-blueprint-for-performance-and-recovery"
              className="font-mono text-xs text-[#C6FF00] hover:text-white uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <span>READ FULL SCIENTIFIC PROTOCOL</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {NUTRITION_PILLARS.map((p, idx) => (
              <div key={p.id} className="bg-[#111111] border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between shadow-lg">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-[#C6FF00] font-bold">PILLAR 0{idx + 1}</span>
                    <span className="font-mono text-[10px] text-neutral-500 uppercase">{p.metric}</span>
                  </div>
                  <h3 className="font-condensed font-black text-2xl text-white uppercase tracking-tight mb-2">
                    {p.name}
                  </h3>
                  <p className="font-mono text-xs text-[#C6FF00] mb-4 uppercase">
                    {p.headline}
                  </p>
                  <p className="text-xs text-neutral-300 leading-relaxed mb-6 font-normal">
                    {p.summary}
                  </p>
                  <div className="bg-[#141414] border border-white/[0.06] p-4 mb-4">
                    <span className="font-mono text-[10px] uppercase text-neutral-400 tracking-wider block mb-2 font-semibold">
                      ATHLETE STAPLES:
                    </span>
                    <ul className="space-y-1 text-xs text-neutral-300 font-mono">
                      {p.staples.map((s, sIdx) => (
                        <li key={sIdx} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 bg-[#C6FF00] rounded-full" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/[0.06] font-mono text-[11px] text-neutral-400">
                  <span className="text-neutral-500 block text-[9px] uppercase">TIMING STRATEGY:</span>
                  <span className="text-white mt-1 block">{p.timing}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cross-Link Action Banner */}
        <div className="bg-gradient-to-r from-[#141414] via-[#101010] to-[#141414] border border-white/[0.1] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="font-mono text-[11px] font-semibold tracking-[0.3em] text-[#C6FF00] uppercase block mb-2">
              DISCIPLINE & EXECUTION
            </span>
            <h2 className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mb-2">
              APPLY NUTRITION TO YOUR TRAINING WORKOUTS
            </h2>
            <p className="text-xs sm:text-sm text-[#A0A0A0] max-w-lg">
              Explore the four core workout categories and discover the physical demands your nutrition fuels.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              to="/workout"
              className="px-8 py-3.5 bg-[#C6FF00] hover:bg-[#b0e600] text-black font-condensed font-black text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2"
            >
              <span>EXPLORE WORKOUTS</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
            <Link
              to="/programs"
              className="px-8 py-3.5 border border-white/20 hover:border-white text-white font-condensed font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
            >
              TRAINING PROGRAMS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
