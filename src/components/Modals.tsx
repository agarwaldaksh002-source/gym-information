import { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { WorkoutCategory, TrainingProgram, GalleryItem } from '../types.ts';
import { TRAINING_PROGRAMS } from '../data/fitnessData.ts';
import { SafeImage } from './SafeImage.tsx';

// ==========================================
// 1. JOURNEY ASSESSMENT MODAL
// ==========================================
interface JourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProgram: (program: TrainingProgram) => void;
}

export function JourneyModal({ isOpen, onClose, onSelectProgram }: JourneyModalProps) {
  const [step, setStep] = useState<number>(1);
  const [goal, setGoal] = useState<string>('strength');
  const [frequency, setFrequency] = useState<string>('4');
  const [experience, setExperience] = useState<string>('intermediate');
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setSubmitted(false);
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFinish = () => {
    setSubmitted(true);
  };

  const recommendedProgram =
    goal === 'strength'
      ? TRAINING_PROGRAMS[0]
      : goal === 'athletic'
      ? TRAINING_PROGRAMS[1]
      : TRAINING_PROGRAMS[2];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300 ease-athletic"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#111111] border border-white/[0.12] shadow-2xl p-6 sm:p-10 max-h-[92vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-neutral-400 hover:text-white transition-colors cursor-pointer p-1"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Step Indicator */}
            <div className="flex items-center gap-2 mb-6 text-xs font-mono text-[#A0A0A0]">
              <span className="text-[#C6FF00]">STAGE 0{step}</span>
              <span aria-hidden="true" className="text-white/20">/</span>
              <span>03</span>
              <span className="ml-auto text-white/50 uppercase tracking-widest text-[10px]">
                ATHLETE ONBOARDING
              </span>
            </div>

            {/* Step 1: Goal */}
            {step === 1 && (
              <div className="animate-in fade-in duration-200">
                <h3 className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mb-2">
                  WHAT IS YOUR PRIMARY DIRECTIVE?
                </h3>
                <p className="text-xs sm:text-sm text-[#A0A0A0] mb-6 font-normal">
                  Select the physical adaptation your training must prioritize.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                  {[
                    { id: 'strength', label: 'MAX STRENGTH', desc: 'Raw compound force & CNS density' },
                    { id: 'athletic', label: 'LEAN & ATHLETIC', desc: 'Endurance, speed & low body fat' },
                    { id: 'hypertrophy', label: 'MUSCLE MASS', desc: 'Structural size & full symmetry' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setGoal(item.id)}
                      className={`p-4 text-left border transition-all duration-200 cursor-pointer ${
                        goal === item.id
                          ? 'border-[#C6FF00] bg-[#C6FF00]/10 text-white'
                          : 'border-white/[0.08] bg-[#161616] text-[#A0A0A0] hover:border-white/30 hover:text-white'
                      }`}
                    >
                      <span className="block font-condensed font-bold text-lg uppercase text-white mb-1">
                        {item.label}
                      </span>
                      <span className="block text-[11px] leading-relaxed text-[#A0A0A0]">
                        {item.desc}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="px-7 py-3.5 bg-[#C6FF00] hover:bg-[#b0e600] active:scale-[0.98] text-black font-condensed font-black tracking-wider text-xs sm:text-sm uppercase transition-all flex items-center gap-2 cursor-pointer"
                  >
                    NEXT STAGE <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Frequency */}
            {step === 2 && (
              <div className="animate-in fade-in duration-200">
                <h3 className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mb-2">
                  WEEKLY COMMITMENT
                </h3>
                <p className="text-xs sm:text-sm text-[#A0A0A0] mb-6 font-normal">
                  How many dedicated training days can you guarantee per week?
                </p>

                <div className="grid grid-cols-3 gap-3 mb-8">
                  {[
                    { val: '3', label: '3 DAYS', sub: 'Full Body High-Tension' },
                    { val: '4', label: '4 DAYS', sub: 'Upper / Lower Split' },
                    { val: '5', label: '5 DAYS', sub: 'Push / Pull / Legs' },
                  ].map((item) => (
                    <button
                      key={item.val}
                      onClick={() => setFrequency(item.val)}
                      className={`p-4 text-left border transition-all duration-200 cursor-pointer ${
                        frequency === item.val
                          ? 'border-[#C6FF00] bg-[#C6FF00]/10 text-white'
                          : 'border-white/[0.08] bg-[#161616] text-[#A0A0A0] hover:border-white/30 hover:text-white'
                      }`}
                    >
                      <span className="block font-condensed font-black text-2xl uppercase text-white mb-1">
                        {item.label}
                      </span>
                      <span className="block text-[11px] text-[#A0A0A0]">{item.sub}</span>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white cursor-pointer flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" /> PREVIOUS
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-7 py-3.5 bg-[#C6FF00] hover:bg-[#b0e600] active:scale-[0.98] text-black font-condensed font-black tracking-wider text-xs sm:text-sm uppercase transition-all flex items-center gap-2 cursor-pointer"
                  >
                    NEXT STAGE <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Experience */}
            {step === 3 && (
              <div className="animate-in fade-in duration-200">
                <h3 className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mb-2">
                  TRAINING EXPERIENCE
                </h3>
                <p className="text-xs sm:text-sm text-[#A0A0A0] mb-6 font-normal">
                  Select your background under heavy compound barbell loads.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                  {[
                    { id: 'novice', label: '1–2 YEARS', sub: 'Solid movement patterns' },
                    { id: 'intermediate', label: '3–5 YEARS', sub: 'Consistent progressive overload' },
                    { id: 'advanced', label: '5+ YEARS', sub: 'High work capacity & recovery' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setExperience(item.id)}
                      className={`p-4 text-left border transition-all duration-200 cursor-pointer ${
                        experience === item.id
                          ? 'border-[#C6FF00] bg-[#C6FF00]/10 text-white'
                          : 'border-white/[0.08] bg-[#161616] text-[#A0A0A0] hover:border-white/30 hover:text-white'
                      }`}
                    >
                      <span className="block font-condensed font-bold text-lg uppercase text-white mb-1">
                        {item.label}
                      </span>
                      <span className="block text-[11px] text-[#A0A0A0]">{item.sub}</span>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setStep(2)}
                    className="text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white cursor-pointer flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" /> PREVIOUS
                  </button>
                  <button
                    onClick={handleFinish}
                    className="px-7 py-3.5 bg-[#C6FF00] hover:bg-[#b0e600] active:scale-[0.98] text-black font-condensed font-black tracking-wider text-xs sm:text-sm uppercase transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(198,255,0,0.2)]"
                  >
                    GENERATE MATCH <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Recommended Result */
          <div className="animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 bg-[#C6FF00]" />
              <span className="font-mono text-[11px] font-semibold tracking-[0.3em] text-[#C6FF00] uppercase">
                ATHLETIC PROTOCOL MATCH
              </span>
            </div>
            <h3 className="font-condensed font-black text-3xl sm:text-5xl text-white uppercase tracking-tight mb-4">
              {recommendedProgram.name}
            </h3>

            <div className="relative aspect-[16/9] overflow-hidden bg-[#161616] mb-6 border border-white/10">
              <SafeImage
                src={recommendedProgram.image}
                alt={recommendedProgram.alt}
                containerClassName="w-full h-full"
                className="filter brightness-[0.85]"
              />
            </div>

            <p className="text-xs sm:text-sm text-[#A0A0A0] mb-6 leading-relaxed font-normal">
              Based on your target focus and {frequency}-day availability, this periodized program is calibrated to give you maximal mechanical tension with zero junk volume.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  onClose();
                  onSelectProgram(recommendedProgram);
                }}
                className="flex-1 py-4 bg-[#C6FF00] hover:bg-[#b0e600] active:scale-[0.98] text-black font-condensed font-black text-xs sm:text-sm tracking-widest uppercase transition-all text-center cursor-pointer"
              >
                VIEW FULL PROGRAM DETAILS
              </button>
              <button
                onClick={onClose}
                className="py-4 px-6 border border-white/20 hover:border-white text-white font-condensed font-bold text-xs sm:text-sm tracking-widest uppercase transition-all cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 2. PROGRAM DETAIL MODAL
// ==========================================
interface ProgramDetailModalProps {
  program: TrainingProgram | null;
  onClose: () => void;
}

export function ProgramDetailModal({ program, onClose }: ProgramDetailModalProps) {
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    if (!program) {
      setActivated(false);
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [program, onClose]);

  if (!program) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/92 backdrop-blur-xl animate-in fade-in duration-300 ease-athletic"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#111111] border border-white/[0.12] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
      >
        {/* Top Image Banner */}
        <div className="relative h-48 sm:h-64 overflow-hidden bg-[#161616] shrink-0">
          <SafeImage
            src={program.image}
            alt={program.alt}
            containerClassName="w-full h-full"
            className="filter brightness-[0.72] contrast-[1.12]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-black/60" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Overlaid Title */}
          <div className="absolute bottom-5 left-6 sm:left-8 right-6">
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#C6FF00] uppercase block mb-1">
              {program.duration} PERIODIZATION
            </span>
            <h2 className="font-condensed font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
              {program.name}
            </h2>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Metadata Bar (Zero-Pill Compliance) */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-[#A0A0A0] uppercase font-medium tracking-wider pb-6 border-b border-white/[0.08]">
            <span className="text-white">LEVEL: {program.level}</span>
            <span aria-hidden="true" className="text-white/20">·</span>
            <span className="text-white">FREQUENCY: {program.frequency}</span>
            <span aria-hidden="true" className="text-white/20">·</span>
            <span className="text-[#C6FF00]">TARGET: {program.targetFocus}</span>
          </div>

          {/* Description */}
          <div className="pb-6 border-b border-white/[0.08]">
            <h4 className="font-condensed font-bold text-sm text-white uppercase tracking-wider mb-2">
              PERIODIZATION ARCHITECTURE
            </h4>
            <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed font-normal">
              {program.description}
            </p>
          </div>

          {/* Weekly Schedule Blueprint */}
          <div className="pb-6 border-b border-white/[0.08]">
            <h4 className="font-condensed font-bold text-sm text-white uppercase tracking-wider mb-4">
              SAMPLE MICROCYCLE SCHEDULE
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {program.sampleWeek.map((dayItem, i) => (
                <div key={i} className="bg-[#161616] border border-white/[0.06] p-4">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-mono text-[#C6FF00] font-semibold">{dayItem.day}</span>
                    <span className="text-neutral-400 font-semibold">{dayItem.focus}</span>
                  </div>
                  <ul className="text-xs text-white/90 space-y-1">
                    {dayItem.exercises.map((ex, exI) => (
                      <li key={exI} className="truncate text-[11px] text-[#A0A0A0]">
                        • {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Nutrition Directive */}
          <div>
            <h4 className="font-condensed font-bold text-sm text-[#C6FF00] uppercase tracking-wider mb-2">
              NUTRITION & RECOVERY DIRECTIVE
            </h4>
            <p className="text-xs text-[#A0A0A0] leading-relaxed font-normal">
              {program.nutritionRule}
            </p>
          </div>

          {/* Activation Action */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            {activated ? (
              <div className="flex-1 py-4 bg-[#C6FF00] text-black font-condensed font-black text-xs sm:text-sm tracking-widest uppercase text-center flex items-center justify-center gap-2">
                <Check className="w-4 h-4 stroke-[3]" /> PROGRAM ACTIVATED ON YOUR PROFILE
              </div>
            ) : (
              <button
                onClick={() => setActivated(true)}
                className="flex-1 py-4 bg-[#C6FF00] hover:bg-[#b0e600] active:scale-[0.98] text-black font-condensed font-black text-xs sm:text-sm tracking-widest uppercase transition-all cursor-pointer text-center"
              >
                ENROLL & DOWNLOAD SCHEDULE
              </button>
            )}
            <button
              onClick={onClose}
              className="py-4 px-7 border border-white/20 hover:border-white text-white font-condensed font-bold text-xs sm:text-sm tracking-widest uppercase transition-all cursor-pointer"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. CATEGORY DETAIL MODAL
// ==========================================
interface CategoryDetailModalProps {
  category: WorkoutCategory | null;
  onClose: () => void;
}

export function CategoryDetailModal({ category, onClose }: CategoryDetailModalProps) {
  useEffect(() => {
    if (!category) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [category, onClose]);

  if (!category) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/92 backdrop-blur-xl animate-in fade-in duration-300 ease-athletic"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#111111] border border-white/[0.12] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
      >
        {/* Banner */}
        <div className="relative h-48 sm:h-60 overflow-hidden bg-[#161616] shrink-0">
          <SafeImage
            src={category.image}
            alt={category.alt}
            containerClassName="w-full h-full"
            className="filter brightness-[0.72] contrast-[1.12]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-black/60" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-5 left-6 sm:left-8 right-6">
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#C6FF00] uppercase block mb-1">
              DISCIPLINE VECTOR
            </span>
            <h2 className="font-condensed font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
              {category.title}
            </h2>
          </div>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed font-normal">
            {category.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#161616] p-4 border border-white/[0.06]">
              <span className="font-mono text-[10px] uppercase text-[#C6FF00] block mb-1">
                ADAPTATION TARGET
              </span>
              <p className="text-xs text-white font-medium">{category.adaptation}</p>
            </div>
            <div className="bg-[#161616] p-4 border border-white/[0.06]">
              <span className="font-mono text-[10px] uppercase text-[#C6FF00] block mb-1">
                OPTIMAL CADENCE
              </span>
              <p className="text-xs text-white font-medium">{category.weeklyCommitment}</p>
            </div>
          </div>

          {/* Sample Workout Routine */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-condensed font-bold text-sm text-white uppercase tracking-wider">
                SAMPLE SESSION: {category.sampleWorkout.name}
              </h4>
            </div>

            <div className="border border-white/[0.08] overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-[#161616] text-[#A0A0A0] font-mono text-[10px]">
                    <th className="py-2.5 px-4 font-normal">EXERCISE</th>
                    <th className="py-2.5 px-3 font-normal">SETS</th>
                    <th className="py-2.5 px-3 font-normal">REPS</th>
                    <th className="py-2.5 px-4 font-normal">INTENT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] text-white/90">
                  {category.sampleWorkout.exercises.map((ex, i) => (
                    <tr key={i} className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-semibold text-white">{ex.name}</td>
                      <td className="py-3 px-3 font-mono text-[#C6FF00]">{ex.sets}</td>
                      <td className="py-3 px-3 font-mono">{ex.reps}</td>
                      <td className="py-3 px-4 text-[#A0A0A0] text-[11px]">{ex.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={onClose}
              className="py-3.5 px-8 bg-white hover:bg-[#C6FF00] text-black font-condensed font-black text-xs sm:text-sm tracking-widest uppercase transition-colors cursor-pointer"
            >
              DISMISS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. NUTRITION MACRO CALCULATOR MODAL
// ==========================================
interface NutritionCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NutritionCalculatorModal({ isOpen, onClose }: NutritionCalculatorModalProps) {
  const [weightKg, setWeightKg] = useState<number>(80);
  const [goal, setGoal] = useState<'shred' | 'lean_mass' | 'performance'>('lean_mass');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Real formula calculations
  const calories =
    goal === 'shred'
      ? Math.round(weightKg * 28)
      : goal === 'lean_mass'
      ? Math.round(weightKg * 34)
      : Math.round(weightKg * 38);

  const protein = Math.round(weightKg * 2.2);
  const fats = Math.round(weightKg * 0.9);
  const carbs = Math.round((calories - (protein * 4 + fats * 9)) / 4);
  const waterLiters = (weightKg * 0.04).toFixed(1);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/92 backdrop-blur-xl animate-in fade-in duration-300 ease-athletic"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#111111] border border-white/[0.12] shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-neutral-400 hover:text-white transition-colors cursor-pointer p-1"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 bg-[#C6FF00]" />
          <span className="font-mono text-[11px] font-semibold tracking-[0.3em] text-[#C6FF00] uppercase">
            NUTRITION DIRECTIVE
          </span>
        </div>
        <h3 className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mb-2">
          PRECISION MACRONUTRIENT CALCULATOR
        </h3>
        <p className="text-xs sm:text-sm text-[#A0A0A0] mb-6 font-normal">
          Calibrate your metabolic energy substrate requirements according to body mass and training load.
        </p>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          <div>
            <label className="text-[11px] font-mono text-[#A0A0A0] uppercase block mb-2">
              ATHLETE BODYWEIGHT: <span className="text-[#C6FF00] font-bold">{weightKg} KG</span>
            </label>
            <input
              type="range"
              min="50"
              max="130"
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="w-full accent-[#C6FF00] bg-white/10 h-1.5 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-1.5">
              <span>50 KG</span>
              <span>90 KG</span>
              <span>130 KG</span>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-mono text-[#A0A0A0] uppercase block mb-2">
              TARGET GOAL
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'shred', label: 'SHRED' },
                { id: 'lean_mass', label: 'LEAN MASS' },
                { id: 'performance', label: 'OUTPUT' },
              ].map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGoal(g.id as any)}
                  className={`py-2.5 text-[11px] font-condensed font-bold uppercase transition-colors cursor-pointer ${
                    goal === g.id
                      ? 'bg-[#C6FF00] text-black shadow-[0_0_15px_rgba(198,255,0,0.3)]'
                      : 'bg-[#181818] text-[#A0A0A0] hover:text-white'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="bg-[#161616] border border-white/[0.06] p-4 text-center">
            <span className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">CALORIES</span>
            <span className="font-condensed font-black text-3xl text-white block tabular-nums">{calories}</span>
            <span className="text-[10px] text-neutral-500 font-mono">KCAL / DAY</span>
          </div>

          <div className="bg-[#161616] border border-white/[0.06] p-4 text-center">
            <span className="text-[10px] font-mono text-[#C6FF00] uppercase block mb-1">PROTEIN</span>
            <span className="font-condensed font-black text-3xl text-white block tabular-nums">{protein}g</span>
            <span className="text-[10px] text-neutral-500 font-mono">2.2G / KG</span>
          </div>

          <div className="bg-[#161616] border border-white/[0.06] p-4 text-center">
            <span className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">CARBS</span>
            <span className="font-condensed font-black text-3xl text-white block tabular-nums">{carbs}g</span>
            <span className="text-[10px] text-neutral-500 font-mono">GLYCOGEN</span>
          </div>

          <div className="bg-[#161616] border border-white/[0.06] p-4 text-center">
            <span className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">LIPIDS</span>
            <span className="font-condensed font-black text-3xl text-white block tabular-nums">{fats}g</span>
            <span className="text-[10px] text-neutral-500 font-mono">ENDOCRINE</span>
          </div>
        </div>

        {/* Hydration Banner */}
        <div className="p-4 bg-[#161616] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#A0A0A0] mb-8 font-mono">
          <span>RECOMMENDED HYDRATION BASELINE:</span>
          <span className="text-[#C6FF00] font-bold">{waterLiters} LITERS WATER + ELECTROLYTES</span>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#C6FF00] hover:bg-[#b0e600] active:scale-[0.98] text-black font-condensed font-black text-xs sm:text-sm tracking-widest uppercase transition-all cursor-pointer"
          >
            CONFIRM & SAVE MACROS
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. GALLERY LIGHTBOX MODAL (with Keyboard Nav)
// ==========================================
interface GalleryLightboxModalProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function GalleryLightboxModal({
  item,
  items,
  currentIndex,
  onClose,
  onNavigate,
}: GalleryLightboxModalProps) {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + items.length) % items.length);
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % items.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [item, currentIndex, items.length, onClose, onNavigate]);

  if (!item) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex - 1 + items.length) % items.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex + 1) % items.length);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300 ease-athletic"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full flex flex-col items-center"
      >
        {/* Top Controls */}
        <div className="w-full flex items-center justify-between text-xs font-mono text-[#A0A0A0] pb-4 border-b border-white/[0.08] mb-4">
          <span className="text-[#C6FF00]">
            FRAME {currentIndex + 1} / {items.length}
          </span>
          <span className="uppercase text-white tracking-widest text-[11px]">{item.discipline}</span>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer p-1"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Frame */}
        <div className="relative max-h-[72vh] w-full flex items-center justify-center overflow-hidden bg-[#111111] border border-white/[0.08]">
          <SafeImage
            src={item.image}
            alt={item.alt}
            containerClassName="w-full h-[65vh] sm:h-[70vh]"
            className="object-contain filter brightness-[0.98]"
          />

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 hover:bg-[#C6FF00] text-white hover:text-black flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
            aria-label="Previous image"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 hover:bg-[#C6FF00] text-white hover:text-black flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
            aria-label="Next image"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Caption */}
        <div className="w-full pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <h3 className="font-condensed font-black text-2xl text-white uppercase tracking-tight">
            {item.title}
          </h3>
          <p className="text-xs text-[#A0A0A0] max-w-md text-left sm:text-right font-normal">
            {item.caption}
          </p>
        </div>
      </div>
    </div>
  );
}
