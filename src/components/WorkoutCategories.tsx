import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WORKOUT_CATEGORIES } from '../data/fitnessData.ts';
import { WorkoutCategory } from '../types.ts';
import { SafeImage } from './SafeImage.tsx';

interface WorkoutCategoriesProps {
  onSelectCategory: (category: WorkoutCategory) => void;
}

export function WorkoutCategories({ onSelectCategory }: WorkoutCategoriesProps) {
  return (
    <section id="workouts" className="relative w-full py-28 sm:py-36 bg-[#080808] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-20 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-[#C6FF00]" />
              <span className="font-mono text-[11px] font-semibold tracking-[0.3em] text-[#C6FF00] uppercase">
                01 / DISCIPLINES
              </span>
            </div>
            <h2 className="font-condensed font-black tracking-[-0.03em] text-5xl sm:text-7xl lg:text-8xl text-white uppercase leading-[0.9]">
              WORKOUT CATEGORIES
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-xs sm:text-sm text-[#A0A0A0] max-w-sm tracking-wide leading-relaxed font-normal">
              Four primary training vectors. Engineered for progressive physical mastery.
            </p>
            <Link
              to="/workout"
              className="font-mono text-xs text-[#C6FF00] hover:text-white uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <span>EXPLORE WORKOUTS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 4 Large Image Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {WORKOUT_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat)}
              className="group relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4.5] overflow-hidden bg-[#121212] cursor-pointer border border-white/[0.08] hover:border-[#C6FF00]/60 transition-all duration-500 ease-athletic shadow-lg hover:shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
            >
              {/* Index Watermark Tag */}
              <div className="absolute top-4 left-5 z-20 font-mono text-[11px] text-[#A0A0A0] tracking-widest group-hover:text-[#C6FF00] transition-colors">
                0{idx + 1}
              </div>

              {/* Background Photography with Smooth Hover Zoom */}
              <SafeImage
                src={cat.image}
                alt={cat.alt}
                containerClassName="w-full h-full"
                className="transform transition-transform duration-700 ease-athletic group-hover:scale-105 filter brightness-[0.78] group-hover:brightness-[0.92]"
              />

              {/* Dark Gradient Overlay for Guaranteed Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent opacity-95 group-hover:opacity-85 transition-opacity duration-500" />

              {/* Card Footer: Category Title & Tiny Arrow */}
              <div className="absolute inset-x-0 bottom-0 p-6 z-20 flex items-end justify-between">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-[#A0A0A0] group-hover:text-[#C6FF00] transition-colors uppercase block mb-1">
                    VECTOR
                  </span>
                  <h3 className="font-condensed font-black text-2xl sm:text-3xl text-white tracking-tight uppercase group-hover:text-white transition-colors">
                    {cat.title}
                  </h3>
                </div>

                {/* Tiny Arrow Icon with Micro-Interaction */}
                <div className="w-9 h-9 rounded-full border border-white/20 group-hover:border-[#C6FF00] group-hover:bg-[#C6FF00] flex items-center justify-center transition-all duration-300 ease-athletic shrink-0">
                  <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover:text-black transition-colors stroke-[2.5]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
