import { Hero } from './Hero.tsx';
import { WorkoutCategories } from './WorkoutCategories.tsx';
import { ProgramsSection } from './ProgramsSection.tsx';
import { GallerySection } from './GallerySection.tsx';
import { NutritionSection } from './NutritionSection.tsx';
import { BlogSection } from './BlogSection.tsx';
import { MotivationSection } from './MotivationSection.tsx';
import { WorkoutCategory, TrainingProgram, GalleryItem } from '../types.ts';
import { useNavigate } from 'react-router-dom';

interface HomePageProps {
  onOpenJourney: () => void;
  onSelectProgram: (prog: TrainingProgram) => void;
  onSelectCategory: (cat: WorkoutCategory) => void;
  onDiscoverNutrition: () => void;
  onOpenLightbox: (item: GalleryItem, index: number) => void;
}

export function HomePage({
  onOpenJourney,
  onSelectProgram,
  onSelectCategory,
  onDiscoverNutrition,
  onOpenLightbox,
}: HomePageProps) {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <Hero
        onOpenJourney={onOpenJourney}
        onExploreWorkouts={() => navigate('/workout')}
      />

      {/* Workout Categories */}
      <WorkoutCategories onSelectCategory={onSelectCategory} />

      {/* Featured Training Programs */}
      <ProgramsSection onSelectProgram={onSelectProgram} />

      {/* The Fitness Gallery */}
      <GallerySection onOpenLightbox={onOpenLightbox} />

      {/* Nutrition Section */}
      <NutritionSection onDiscoverNutrition={onDiscoverNutrition} />

      {/* Athletic Journal Editorial Preview */}
      <BlogSection
        onNavigateToPost={(slug) => navigate(`/blog/${slug}`)}
        onNavigateToBlogIndex={() => navigate('/blog')}
      />

      {/* Motivational Section */}
      <MotivationSection />
    </>
  );
}
