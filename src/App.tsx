import { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { WorkoutCategories } from './components/WorkoutCategories.tsx';
import { ProgramsSection } from './components/ProgramsSection.tsx';
import { GallerySection } from './components/GallerySection.tsx';
import { NutritionSection } from './components/NutritionSection.tsx';
import { MotivationSection } from './components/MotivationSection.tsx';
import { Footer } from './components/Footer.tsx';
import {
  JourneyModal,
  ProgramDetailModal,
  CategoryDetailModal,
  NutritionCalculatorModal,
  GalleryLightboxModal,
} from './components/Modals.tsx';
import { GALLERY_ITEMS } from './data/fitnessData.ts';
import { WorkoutCategory, TrainingProgram, GalleryItem } from './types.ts';

export default function App() {
  // Modal states
  const [isJourneyOpen, setIsJourneyOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<WorkoutCategory | null>(null);
  const [isNutritionOpen, setIsNutritionOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Smooth scroll handler
  const handleNavigate = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleOpenLightbox = useCallback((_item: GalleryItem, index: number) => {
    setLightboxIndex(index);
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans-clean selection:bg-[#C6FF00] selection:text-black">
      {/* Navigation */}
      <Navbar
        onOpenJourney={() => setIsJourneyOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Main Experience */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenJourney={() => setIsJourneyOpen(true)}
          onExploreWorkouts={() => handleNavigate('workouts')}
        />

        {/* Workout Categories */}
        <WorkoutCategories
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />

        {/* Featured Training Programs */}
        <ProgramsSection
          onSelectProgram={(prog) => setSelectedProgram(prog)}
        />

        {/* The Fitness Gallery */}
        <GallerySection onOpenLightbox={handleOpenLightbox} />

        {/* Nutrition Section */}
        <NutritionSection
          onDiscoverNutrition={() => setIsNutritionOpen(true)}
        />

        {/* Motivational Section */}
        <MotivationSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Modals & Interactive Overlays */}
      <JourneyModal
        isOpen={isJourneyOpen}
        onClose={() => setIsJourneyOpen(false)}
        onSelectProgram={(prog) => {
          setIsJourneyOpen(false);
          setSelectedProgram(prog);
        }}
      />

      <ProgramDetailModal
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
      />

      <CategoryDetailModal
        category={selectedCategory}
        onClose={() => setSelectedCategory(null)}
      />

      <NutritionCalculatorModal
        isOpen={isNutritionOpen}
        onClose={() => setIsNutritionOpen(false)}
      />

      <GalleryLightboxModal
        item={lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null}
        items={GALLERY_ITEMS}
        currentIndex={lightboxIndex ?? 0}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </div>
  );
}
