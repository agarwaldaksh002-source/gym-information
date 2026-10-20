import { ArrowLeft, ArrowUpRight, Dumbbell, Flame, HeartPulse, RefreshCw } from 'lucide-react';
import { WORKOUT_CATEGORIES } from '../data/fitnessData.ts';
import { WorkoutCategory } from '../types.ts';
import { WorkoutCategories } from './WorkoutCategories.tsx';
import { Link } from 'react-router-dom';

interface WorkoutPageProps {
  onSelectCategory: (category: WorkoutCategory) => void;
  onOpenJourney: () => void;
}

export function WorkoutPage({ onSelectCategory, onOpenJourney }: WorkoutPageProps) {
  const disciplineHighlights = [
    {
      id: 'strength',
      name: 'STRENGTH',
      icon: Dumbbell,
      tagline: 'Raw mechanical tension & motor unit recruitment',
      summary: 'Heavy compound barbell lifts (Deadlifts, Squats, Overhead Press) programmed with progressive micro-loading to build unbreakable tendon density and central nervous system force.',
      movements: ['Barbell Conventional Deadlift', 'Low-Bar Back Squat', 'Standing Overhead Press', 'Pendlay Row'],
      commitment: '3–4 Sessions / Week',
    },
    {
      id: 'hypertrophy',
      name: 'HYPERTROPHY',
      icon: Flame,
      tagline: 'Precision volume & muscle protein synthesis',
      summary: 'Systematic muscular architecture programmed within 1–2 Reps in Reserve (RIR). Emphasizes lengthened-position tension and myofibrillar expansion.',
      movements: ['Incline Dumbbell Press', 'Seated Cable Row', 'Hack Squat', 'Romanian Deadlift'],
      commitment: '4–5 Sessions / Week',
    },
    {
      id: 'cardio',
      name: 'CARDIO',
      icon: HeartPulse,
      tagline: 'Athletic sprinting & VO2 max capacity',
      summary: 'Polarized 80/20 cardiovascular conditioning combining low-impact Zone 2 aerobic base miles with high-output lactate threshold sprint repeats.',
      movements: ['Assault AirBike Sprints', 'Concept2 Row Pace Repeats', 'Trap Bar Carries', 'Prowler Sled Drills'],
      commitment: '3–5 Sessions / Week',
    },
    {
      id: 'mobility',
      name: 'MOBILITY',
      icon: RefreshCw,
      tagline: 'Joint longevity & kinetic chain freedom',
      summary: 'Daily Controlled Articular Rotations (CARs), end-range active mobility, and myofascial restoration to bulletproof cartilage and enhance multi-planar movement.',
      movements: ['Hip 90/90 Transitions', 'Thoracic Bridge Reach', 'Ankle Dorsiflexion Pails/Rails', 'Shoulder CARs'],
      commitment: 'Daily / 20–30 Minutes',
    },
  ];

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
            BUILT BY DISCIPLINE / TRAINING DISCIPLINES
          </div>
        </div>

        {/* Page Header */}
        <div className="max-w-4xl mb-14 sm:mb-18">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 bg-[#C6FF00]" />
            <span className="font-mono text-[11px] font-semibold tracking-[0.3em] text-[#C6FF00] uppercase">
              01 / ATHLETIC DISCIPLINES
            </span>
          </div>
          <h1 className="font-condensed font-black tracking-[-0.03em] text-5xl sm:text-7xl lg:text-8xl text-white uppercase leading-[0.9] mb-6">
            WORKOUT CATEGORIES
          </h1>
          <p className="text-sm sm:text-base text-[#A0A0A0] leading-relaxed font-normal max-w-2xl">
            Four primary training vectors engineered for progressive neuromuscular mastery, structural hypertrophy, peak aerobic capacity, and joint longevity. Select any category to view full movement breakdowns, tempo specifications, and session protocols.
          </p>
        </div>

        {/* Embedded Interactive Categories Grid */}
        <div className="mb-20">
          <WorkoutCategories onSelectCategory={onSelectCategory} />
        </div>

        {/* Deep Dive Breakdown Section */}
        <div className="pt-16 border-t border-white/[0.08] mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-mono text-[11px] font-semibold tracking-[0.3em] text-[#C6FF00] uppercase block mb-1">
                EXACTING STANDARDS
              </span>
              <h2 className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
                THE 4 DISCIPLINE ARCHITECTURES
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#A0A0A0] max-w-md">
              Each discipline addresses a non-negotiable physiological adaptation required for complete athletic capability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {disciplineHighlights.map((disc, idx) => {
              const Icon = disc.icon;
              const matchingCat = WORKOUT_CATEGORIES.find((c) => c.id === disc.id);
              return (
                <div
                  key={disc.id}
                  onClick={() => matchingCat && onSelectCategory(matchingCat)}
                  className="group bg-[#111111] border border-white/[0.08] hover:border-[#C6FF00]/50 p-6 sm:p-8 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-[#161616] border border-white/[0.1] group-hover:border-[#C6FF00]/40 flex items-center justify-center text-[#C6FF00] transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-mono text-[10px] text-neutral-500 uppercase">VECTOR 0{idx + 1}</span>
                          <h3 className="font-condensed font-black text-2xl text-white uppercase tracking-tight group-hover:text-[#C6FF00] transition-colors">
                            {disc.name}
                          </h3>
                        </div>
                      </div>
                      <span className="font-mono text-xs text-[#C6FF00] group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6 font-normal">
                      {disc.summary}
                    </p>

                    <div className="bg-[#141414] border border-white/[0.06] p-4 mb-4">
                      <span className="font-mono text-[10px] uppercase text-neutral-400 tracking-wider block mb-2 font-semibold">
                        KEY MOVEMENTS:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300 font-mono">
                        {disc.movements.map((m, mIdx) => (
                          <li key={mIdx} className="flex items-center gap-1.5">
                            <span className="w-1 h-1 bg-[#C6FF00] rounded-full shrink-0" />
                            <span className="truncate">{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] text-xs font-mono">
                    <span className="text-neutral-500 uppercase">COMMITMENT:</span>
                    <span className="text-[#C6FF00] font-bold">{disc.commitment}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cross-Link Action Banner */}
        <div className="bg-gradient-to-r from-[#141414] via-[#101010] to-[#141414] border border-white/[0.1] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="font-mono text-[11px] font-semibold tracking-[0.3em] text-[#C6FF00] uppercase block mb-2">
              PERIODIZED ROADMAPS
            </span>
            <h2 className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mb-2">
              READY FOR A STRUCTURED 12-WEEK PROTOCOL?
            </h2>
            <p className="text-xs sm:text-sm text-[#A0A0A0] max-w-lg">
              Explore our complete training programs engineered with progressive overload, wave loading, and strategic deload cycles.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Link
              to="/programs"
              className="px-8 py-3.5 bg-[#C6FF00] hover:bg-[#b0e600] text-black font-condensed font-black text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2"
            >
              <span>VIEW PROGRAMS</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
            <button
              onClick={onOpenJourney}
              className="px-8 py-3.5 border border-white/20 hover:border-white text-white font-condensed font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
            >
              START JOURNEY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
