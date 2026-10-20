import { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Calendar, Target, Clock, ShieldCheck } from 'lucide-react';
import { TRAINING_PROGRAMS } from '../data/fitnessData.ts';
import { TrainingProgram } from '../types.ts';
import { ProgramsSection } from './ProgramsSection.tsx';
import { Link } from 'react-router-dom';

interface ProgramsPageProps {
  onSelectProgram: (program: TrainingProgram) => void;
  onOpenJourney: () => void;
}

export function ProgramsPage({ onSelectProgram, onOpenJourney }: ProgramsPageProps) {
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const levels = ['All', 'Advanced', 'Intermediate', 'All Levels'];

  const filteredPrograms = TRAINING_PROGRAMS.filter(
    (p) => selectedLevel === 'All' || p.level === selectedLevel
  );

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
            BUILT BY DISCIPLINE / TRAINING BLUEPRINTS
          </div>
        </div>

        {/* Page Header */}
        <div className="max-w-4xl mb-14 sm:mb-18">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 bg-[#C6FF00]" />
            <span className="font-mono text-[11px] font-semibold tracking-[0.3em] text-[#C6FF00] uppercase">
              02 / PERIODIZATION
            </span>
          </div>
          <h1 className="font-condensed font-black tracking-[-0.03em] text-5xl sm:text-7xl lg:text-8xl text-white uppercase leading-[0.9] mb-6">
            FEATURED PROGRAMS
          </h1>
          <p className="text-sm sm:text-base text-[#A0A0A0] leading-relaxed font-normal max-w-2xl">
            Periodized architectures developed for concrete, repeatable physical adaptation. Calibrated for maximum compound force, athletic work capacity, and structural hypertrophy. Select any program to inspect its 7-day training split, weekly volume progression, and nutrition guidelines.
          </p>
        </div>

        {/* Embedded Interactive Programs Component */}
        <div className="mb-20">
          <ProgramsSection onSelectProgram={onSelectProgram} />
        </div>

        {/* Periodization Blueprint Breakdown */}
        <div className="pt-16 border-t border-white/[0.08] mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-mono text-[11px] font-semibold tracking-[0.3em] text-[#C6FF00] uppercase block mb-1">
                SYSTEM ARCHITECTURE
              </span>
              <h2 className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
                THE 3-PHASE PERIODIZATION MODEL
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#A0A0A0] max-w-md">
              Every BUILT BY DISCIPLINE training program follows a strict 3-phase progression to avoid accommodation and guarantee progress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#111111] border border-white/[0.08] p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#C6FF00] font-bold">PHASE 01 (WEEKS 1–4)</span>
                <span className="font-mono text-[10px] text-neutral-500 uppercase">ACCUMULATION</span>
              </div>
              <h3 className="font-condensed font-black text-2xl text-white uppercase tracking-tight">
                VOLUME & TISSUE CAPACITY
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                Submaximal intensity (65–75% 1RM) with elevated repetition volume. Focuses on motor pattern rehearsal, tendon remodeling, and work capacity foundation.
              </p>
              <div className="pt-3 border-t border-white/[0.06] font-mono text-[11px] text-neutral-400">
                INTENSITY: 65% – 75% 1RM
              </div>
            </div>

            <div className="bg-[#111111] border border-white/[0.08] p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#C6FF00] font-bold">PHASE 02 (WEEKS 5–8)</span>
                <span className="font-mono text-[10px] text-neutral-500 uppercase">INTENSIFICATION</span>
              </div>
              <h3 className="font-condensed font-black text-2xl text-white uppercase tracking-tight">
                NEURAL FORCE TRANSFER
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                Volume is compressed while intensity elevates to 80–88% 1RM. Sparks high-threshold motor unit recruitment and lateral mechanical tension across myofibrils.
              </p>
              <div className="pt-3 border-t border-white/[0.06] font-mono text-[11px] text-[#C6FF00]">
                INTENSITY: 80% – 88% 1RM
              </div>
            </div>

            <div className="bg-[#111111] border border-white/[0.08] p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#C6FF00] font-bold">PHASE 03 (WEEKS 9–12)</span>
                <span className="font-mono text-[10px] text-neutral-500 uppercase">REALIZATION</span>
              </div>
              <h3 className="font-condensed font-black text-2xl text-white uppercase tracking-tight">
                PEAKING & SUPERCOMPENSATION
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                Maximal output (90%+ 1RM) preceded by a calculated volume deload. Displays full central nervous system potentiation and personal performance records.
              </p>
              <div className="pt-3 border-t border-white/[0.06] font-mono text-[11px] text-neutral-400">
                INTENSITY: 90%+ 1RM / PEAK
              </div>
            </div>
          </div>
        </div>

        {/* Cross-Link Action Banner */}
        <div className="bg-gradient-to-r from-[#141414] via-[#101010] to-[#141414] border border-white/[0.1] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="font-mono text-[11px] font-semibold tracking-[0.3em] text-[#C6FF00] uppercase block mb-2">
              BIOCHEMICAL FUELING
            </span>
            <h2 className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mb-2">
              PAIR YOUR TRAINING WITH NUTRITIONAL ARCHITECTURE
            </h2>
            <p className="text-xs sm:text-sm text-[#A0A0A0] max-w-lg">
              Calculate your personal macronutrient requirements calibrated to your weekly training split.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              to="/nutrition"
              className="px-8 py-3.5 bg-[#C6FF00] hover:bg-[#b0e600] text-black font-condensed font-black text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2"
            >
              <span>EXPLORE NUTRITION</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
            <Link
              to="/workout"
              className="px-8 py-3.5 border border-white/20 hover:border-white text-white font-condensed font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
            >
              WORKOUT DISCIPLINES
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
