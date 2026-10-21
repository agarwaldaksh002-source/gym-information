import { ArrowLeft, ArrowUpRight, Award, Flame, HeartPulse, RefreshCw, Shield, Sparkles, Target, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GalleryItem } from '../types.ts';
import { GALLERY_ITEMS } from '../data/fitnessData.ts';
import { SafeImage } from './SafeImage.tsx';

interface AboutPageProps {
  onOpenJourney: () => void;
  onOpenLightbox: (item: GalleryItem, index: number) => void;
}

export function AboutPage({ onOpenJourney, onOpenLightbox }: AboutPageProps) {
  const pillars = [
    {
      icon: Target,
      number: '01',
      title: 'OBJECTIVE PERIODIZATION',
      description: 'Zero guesswork. Every repetition, set, and caloric gram is mathematically calibrated to physiological thresholds, preventing plateaus and nervous system exhaustion.',
    },
    {
      icon: Flame,
      number: '02',
      title: 'MECHANICAL TENSION',
      description: 'The immutable driver of myofibrillar hypertrophy. We program lengthened-position strain and strict tempo control over chaotic fatigue.',
    },
    {
      icon: HeartPulse,
      number: '03',
      title: 'METABOLIC ADAPTATION',
      description: 'Polarized aerobic conditioning combining low-impact Zone 2 base miles with high-output anaerobic sprint intervals for complete cardiovascular mastery.',
    },
    {
      icon: RefreshCw,
      number: '04',
      title: 'KINETIC LONGEVITY',
      description: 'Active articular joint mobility and daily controlled articular rotations (CARs) engineered to bulletproof tendons and expand pain-free range of motion.',
    },
  ];

  const leadership = [
    {
      name: 'Dr. Marcus Vance, CSCS',
      role: 'Director of Human Performance & Exercise Physiology',
      credentials: 'PhD Exercise Science, NSCA-CSCS, USAW Level 2 Senior International Coach',
      focus: 'Neuromuscular motor-unit recruitment and progressive barbell micro-loading periodization.',
      avatarInitials: 'MV',
    },
    {
      name: 'Elena Rostova, MSc',
      role: 'Head of Biomechanics & Articular Research',
      credentials: 'MSc Applied Biomechanics, FRC Mobility Specialist, Clinical Exercise Physiologist',
      focus: 'Joint capsule kinematics, kinetic chain resilience, and post-isometric active restoration.',
      avatarInitials: 'ER',
    },
    {
      name: 'Julian Thorne, RD, CSSD',
      role: 'Chief of Metabolic Fueling & Sports Nutrition',
      credentials: 'Board Certified Specialist in Sports Dietetics, ISSN Fellow',
      focus: 'Peri-workout carbohydrate pacing, leucine kinetics, and electrolyte plasma volume conservation.',
      avatarInitials: 'JT',
    },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-8 border-b border-white/[0.08] mb-12">
          <Link
            to="/"
            className="font-mono text-xs text-[#A0A0A0] hover:text-[#C6FF00] uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO HOME</span>
          </Link>
          <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest hidden sm:block">
            BUILT BY DISCIPLINE / MISSION ARCHITECTURE
          </div>
        </div>

        {/* Master Headline Banner */}
        <div className="max-w-4xl mb-16 sm:mb-24">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 bg-[#C6FF00]" />
            <span className="font-mono text-[11px] font-semibold tracking-[0.3em] text-[#C6FF00] uppercase">
              ETHOS & CODE
            </span>
          </div>
          <h1 className="font-condensed font-black tracking-[-0.03em] text-5xl sm:text-7xl lg:text-8xl text-white uppercase leading-[0.9] mb-6">
            YOUR BODY.<br />
            <span className="text-[#C6FF00]">YOUR STANDARD.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#A0A0A0] leading-relaxed font-normal max-w-2xl">
            BUILT BY DISCIPLINE was forged on an uncompromising biological premise: elite athletic capability is neither inherited nor accidental. It is engineered through immutable physiological laws, ruthless consistency, and scientific precision.
          </p>
        </div>

        {/* The 4 Architectural Pillars */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
            <span className="font-mono text-[11px] text-[#C6FF00] uppercase tracking-widest font-semibold">
              THE 4 TRAINING VECTORS
            </span>
            <span className="font-mono text-xs text-neutral-500 uppercase">STANDARDS</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.number}
                  className="bg-[#111111] border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between hover:border-[#C6FF00]/50 transition-colors group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-xs text-[#C6FF00] font-bold">{pillar.number}</span>
                      <Icon className="w-5 h-5 text-neutral-400 group-hover:text-[#C6FF00] transition-colors" />
                    </div>
                    <h3 className="font-condensed font-black text-2xl text-white uppercase tracking-tight mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Visual Gallery Archive Section */}
        <div className="mb-24 pt-16 border-t border-white/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-mono text-[11px] text-[#C6FF00] uppercase tracking-widest font-semibold block mb-1">
                VISUAL ARCHIVE
              </span>
              <h2 className="font-condensed font-black text-4xl sm:text-5xl text-white uppercase tracking-tight">
                INTENT UNDER TENSION
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#A0A0A0] max-w-md">
              A documentary chronicle of athletes living by the discipline standard. Click any photograph to expand in high-definition lightbox.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_ITEMS.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => onOpenLightbox(item, idx)}
                className="group relative aspect-[4/3] bg-[#121212] border border-white/[0.08] hover:border-[#C6FF00]/60 overflow-hidden cursor-pointer transition-all duration-300"
              >
                <SafeImage
                  src={item.image}
                  alt={item.alt}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover filter brightness-[0.80] group-hover:scale-105 transition-transform duration-700 ease-athletic"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-[#C6FF00] uppercase tracking-widest block">
                      {item.discipline}
                    </span>
                    <h4 className="font-condensed font-black text-lg text-white uppercase tracking-tight">
                      {item.title}
                    </h4>
                  </div>
                  <span className="font-mono text-[11px] text-white/60 group-hover:text-white uppercase">
                    VIEW
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scientific Leadership Team (E-E-A-T) */}
        <div className="mb-24 pt-16 border-t border-white/[0.08]">
          <div className="max-w-2xl mb-12">
            <span className="font-mono text-[11px] text-[#C6FF00] uppercase tracking-widest font-semibold block mb-1">
              SCIENTIFIC ADVISORY BOARD
            </span>
            <h2 className="font-condensed font-black text-4xl sm:text-5xl text-white uppercase tracking-tight mb-3">
              RESEARCH & CLINICAL LEADERSHIP
            </h2>
            <p className="text-xs sm:text-sm text-[#A0A0A0]">
              Our protocols are designed, stress-tested, and peer-reviewed by doctorate-level researchers, strength coaches, and sports nutritionists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leadership.map((leader, i) => (
              <div key={i} className="bg-[#111111] border border-white/[0.08] p-6 sm:p-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#181818] border border-[#C6FF00]/40 flex items-center justify-center font-mono font-bold text-sm text-[#C6FF00]">
                  {leader.avatarInitials}
                </div>
                <div>
                  <h3 className="font-condensed font-black text-xl text-white uppercase">
                    {leader.name}
                  </h3>
                  <p className="font-mono text-[11px] text-[#C6FF00] tracking-wider uppercase mt-0.5">
                    {leader.role}
                  </p>
                  <p className="font-mono text-[10px] text-neutral-400 mt-1">
                    {leader.credentials}
                  </p>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-normal pt-3 border-t border-white/[0.06]">
                  {leader.focus}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Callout Box */}
        <div className="bg-[#111111] border-2 border-[#C6FF00]/40 p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="font-mono text-xs text-[#C6FF00] uppercase tracking-widest font-bold block mb-2">
              JOIN THE CADRE
            </span>
            <h3 className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mb-2">
              READY TO RAISE YOUR STANDARD?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Explore periodized 12-week protocols or begin with foundational movement mechanics today.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenJourney}
              className="px-8 py-4 bg-[#C6FF00] hover:bg-[#b0e600] active:scale-[0.98] text-black font-condensed font-black text-xs sm:text-sm tracking-widest uppercase transition-all cursor-pointer flex items-center gap-2 shadow-[0_0_20px_rgba(198,255,0,0.2)]"
            >
              <span>START YOUR JOURNEY</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <Link
              to="/programs"
              className="px-8 py-4 border border-white/20 hover:border-white text-white font-condensed font-bold text-xs sm:text-sm tracking-widest uppercase transition-colors"
            >
              EXPLORE PROGRAMS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
