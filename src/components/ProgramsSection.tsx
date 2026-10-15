import { ArrowRight } from 'lucide-react';
import { TRAINING_PROGRAMS } from '../data/fitnessData.ts';
import { TrainingProgram } from '../types.ts';
import { SafeImage } from './SafeImage.tsx';

interface ProgramsSectionProps {
  onSelectProgram: (program: TrainingProgram) => void;
}

export function ProgramsSection({ onSelectProgram }: ProgramsSectionProps) {
  return (
    <section id="programs" className="relative w-full py-28 sm:py-36 bg-[#080808] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-20 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-[#C6FF00]" />
              <span className="font-mono text-[11px] font-semibold tracking-[0.3em] text-[#C6FF00] uppercase">
                02 / PERIODIZATION
              </span>
            </div>
            <h2 className="font-condensed font-black tracking-[-0.03em] text-5xl sm:text-7xl lg:text-8xl text-white uppercase leading-[0.9]">
              FEATURED TRAINING PROGRAMS
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#A0A0A0] max-w-sm tracking-wide leading-relaxed font-normal">
            Periodized architectures developed for concrete, repeatable physical adaptation.
          </p>
        </div>

        {/* 3 Editorial Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TRAINING_PROGRAMS.map((prog, idx) => (
            <div
              key={prog.id}
              className="group flex flex-col bg-[#111111] border border-white/[0.08] hover:border-white/30 transition-all duration-500 ease-athletic shadow-lg"
            >
              {/* Card Image Banner */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#161616]">
                <SafeImage
                  src={prog.image}
                  alt={prog.alt}
                  containerClassName="w-full h-full"
                  className="transform transition-transform duration-700 ease-athletic group-hover:scale-105 filter brightness-[0.80] group-hover:brightness-[0.92]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-90" />
                
                {/* Index tag */}
                <div className="absolute top-4 right-4 font-mono text-[10px] text-white/50 tracking-widest bg-black/60 px-2.5 py-1">
                  SYS 0{idx + 1}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between gap-8">
                <div>
                  {/* Clean unboxed metadata (Zero-Pill Compliance) */}
                  <div className="flex items-center gap-2 font-mono text-[11px] font-medium text-[#A0A0A0] tracking-wider uppercase mb-3">
                    <span className="text-[#C6FF00]">{prog.level}</span>
                    <span aria-hidden="true" className="text-white/20">·</span>
                    <span>{prog.frequency}</span>
                    <span aria-hidden="true" className="text-white/20">·</span>
                    <span>{prog.duration}</span>
                  </div>

                  {/* Program Title */}
                  <h3 className="font-condensed font-black text-2xl sm:text-3xl text-white tracking-tight uppercase mb-2.5 group-hover:text-[#C6FF00] transition-colors">
                    {prog.name}
                  </h3>

                  {/* Minimal Subtitle */}
                  <p className="text-xs sm:text-sm text-[#A0A0A0] line-clamp-2 leading-relaxed">
                    {prog.subtitle}
                  </p>
                </div>

                {/* VIEW PROGRAM Action Button */}
                <button
                  onClick={() => onSelectProgram(prog)}
                  className="w-full py-4 px-5 bg-transparent hover:bg-white text-white hover:text-black border border-white/20 hover:border-white font-condensed font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 ease-athletic cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  <span>VIEW PROGRAM</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
