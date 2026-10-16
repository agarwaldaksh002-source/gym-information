import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { WorkoutCategories } from './components/WorkoutCategories.tsx';
import { ProgramsSection } from './components/ProgramsSection.tsx';
import { GallerySection } from './components/GallerySection.tsx';
import { NutritionSection } from './components/NutritionSection.tsx';
import { BlogSection } from './components/BlogSection.tsx';
import { BlogIndexPage } from './components/BlogIndexPage.tsx';
import { BlogPostPage } from './components/BlogPostPage.tsx';
import { MotivationSection } from './components/MotivationSection.tsx';
import { Footer } from './components/Footer.tsx';
import {
  JourneyModal,
  ProgramDetailModal,
  CategoryDetailModal,
  NutritionCalculatorModal,
  GalleryLightboxModal,
} from './components/Modals.tsx';
import { SeoAuditModal } from './components/SeoAuditModal.tsx';
import { GALLERY_ITEMS } from './data/fitnessData.ts';
import { BLOG_POSTS } from './data/blogData.ts';
import { WorkoutCategory, TrainingProgram, GalleryItem } from './types.ts';
import { updatePageSEO } from './utils/seo.ts';

const LEGACY_SLUG_MAP: Record<string, string> = {
  'progressive-overload': 'progressive-overload-strength-training-guide',
  'strength-training': 'progressive-overload-strength-training-guide',
  'hypertrophy': 'hypertrophy-muscle-building-science',
  'hypertrophy-science': 'hypertrophy-muscle-building-science',
  'vo2-max': 'vo2-max-athletic-cardio-conditioning',
  'cardio-conditioning': 'vo2-max-athletic-cardio-conditioning',
  'joint-mobility': 'joint-mobility-active-recovery-protocol',
  'mobility-recovery': 'joint-mobility-active-recovery-protocol',
  'nutrition': 'precision-macronutrient-nutrition-fueling',
  'nutrition-fueling': 'precision-macronutrient-nutrition-fueling',
  'macronutrient-fueling': 'precision-macronutrient-nutrition-fueling',
  'precision-nutrition': 'precision-macronutrient-nutrition-fueling',
};

function resolveCanonicalPath(): string {
  if (typeof window === 'undefined') return '/';

  const pathname = window.location.pathname || '/';
  const searchParams = new URLSearchParams(window.location.search);

  // Check query parameter compatibility (?article=slug or ?post=slug or ?slug=slug)
  const querySlug = searchParams.get('article') || searchParams.get('post') || searchParams.get('slug');
  if (querySlug) {
    const canonicalSlug = LEGACY_SLUG_MAP[querySlug] || querySlug;
    const target = `/blog/${canonicalSlug}`;
    window.history.replaceState({}, '', target);
    return target;
  }

  // Check /article/:slug, /articles/:slug, or /journal/:slug
  const legacyPrefixMatch = pathname.match(/^\/(?:article|articles|journal)\/(.+)$/);
  if (legacyPrefixMatch) {
    const rawSlug = legacyPrefixMatch[1].replace(/\/$/, '');
    const canonicalSlug = LEGACY_SLUG_MAP[rawSlug] || rawSlug;
    const target = `/blog/${canonicalSlug}`;
    window.history.replaceState({}, '', target);
    return target;
  }

  // Check legacy short slug under /blog/:slug
  if (pathname.startsWith('/blog/')) {
    const rawSlug = pathname.replace('/blog/', '').replace(/\/$/, '');
    if (LEGACY_SLUG_MAP[rawSlug]) {
      const canonicalSlug = LEGACY_SLUG_MAP[rawSlug];
      const target = `/blog/${canonicalSlug}`;
      window.history.replaceState({}, '', target);
      return target;
    }
  }

  return pathname;
}

export default function App() {
  // Routing state
  const [currentPath, setCurrentPath] = useState<string>(() => resolveCanonicalPath());

  // Modal states
  const [isJourneyOpen, setIsJourneyOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<WorkoutCategory | null>(null);
  const [isNutritionOpen, setIsNutritionOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isSeoAuditOpen, setIsSeoAuditOpen] = useState(false);

  // Sync browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(resolveCanonicalPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update SEO dynamically whenever route changes
  useEffect(() => {
    if (currentPath === '/' || currentPath === '') {
      updatePageSEO({
        title: 'BUILT BY DISCIPLINE | Premium Athletic Performance & Training Programs',
        description:
          'Explore elite athletic training programs, strength periodization, and metabolic nutrition protocols designed for athletes built by relentless discipline.',
        canonicalPath: '/',
        image: '/images/hero_athlete.jpg',
      });
    } else if (currentPath === '/blog' || currentPath === '/blog/') {
      updatePageSEO({
        title: 'Athletic Journal & Research Protocols | Built By Discipline',
        description:
          'Peer-reviewed exercise physiology, progressive overload mechanics, VO2 max thresholds, joint longevity, and precision metabolic nutrition.',
        canonicalPath: '/blog',
        image: '/images/hero_athlete.jpg',
      });
    } else if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '').replace(/\/$/, '');
      const post = BLOG_POSTS.find((p) => p.slug === slug);
      if (post) {
        updatePageSEO({
          title: post.seoTitle,
          description: post.metaDescription,
          canonicalPath: `/blog/${post.slug}`,
          image: post.image,
          article: post,
        });
      }
    }
  }, [currentPath]);

  // Programmatic navigation
  const navigateTo = useCallback((pathOrTarget: string) => {
    // If it's a section ID on home
    const sectionTargets = ['hero', 'workouts', 'programs', 'nutrition', 'gallery', 'journal'];
    
    if (sectionTargets.includes(pathOrTarget)) {
      if (currentPath !== '/') {
        window.history.pushState({}, '', '/');
        setCurrentPath('/');
        setTimeout(() => {
          const el = document.getElementById(pathOrTarget);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById(pathOrTarget);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // Direct path routing
    let targetPath = pathOrTarget;
    if (pathOrTarget === 'blog') targetPath = '/blog';
    else if (!pathOrTarget.startsWith('/')) targetPath = `/${pathOrTarget}`;

    window.history.pushState({}, '', targetPath);
    setCurrentPath(targetPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPath]);

  const handleOpenLightbox = useCallback((_item: GalleryItem, index: number) => {
    setLightboxIndex(index);
  }, []);

  // Determine active view
  const isBlogIndex = currentPath === '/blog' || currentPath === '/blog/';
  const isBlogPost = currentPath.startsWith('/blog/') && currentPath.length > 6;
  const currentPostSlug = isBlogPost ? currentPath.replace('/blog/', '').replace(/\/$/, '') : null;
  const activePost = currentPostSlug ? BLOG_POSTS.find((p) => p.slug === currentPostSlug) : null;

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans-clean selection:bg-[#C6FF00] selection:text-black">
      {/* Navigation Bar */}
      <Navbar
        currentRoute={currentPath}
        onOpenJourney={() => setIsJourneyOpen(true)}
        onNavigate={navigateTo}
        onOpenSeoAudit={() => setIsSeoAuditOpen(true)}
      />

      {/* Main Experience Routing */}
      <main>
        {isBlogIndex ? (
          /* Dedicated /blog page */
          <BlogIndexPage
            onNavigateToPost={(slug) => navigateTo(`/blog/${slug}`)}
            onNavigateHome={() => navigateTo('hero')}
          />
        ) : isBlogPost ? (
          /* Dedicated /blog/:slug page */
          activePost ? (
            <BlogPostPage
              post={activePost}
              onNavigateToPost={(slug) => navigateTo(`/blog/${slug}`)}
              onNavigateToBlogIndex={() => navigateTo('blog')}
              onNavigateHome={() => navigateTo('hero')}
            />
          ) : (
            /* 404 Fallback for unknown slugs */
            <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 pt-32 pb-24 text-center">
              <span className="font-mono text-xs text-[#C6FF00] uppercase tracking-widest mb-3">
                PROTOCOL NOT FOUND
              </span>
              <h1 className="font-condensed font-black text-5xl sm:text-6xl text-white uppercase mb-4">
                404 / UNKNOWN DISCIPLINE
              </h1>
              <p className="text-xs sm:text-sm text-[#A0A0A0] max-w-md mb-8">
                The requested research protocol does not exist or has been restructured.
              </p>
              <button
                onClick={() => navigateTo('blog')}
                className="px-8 py-3.5 bg-[#C6FF00] text-black font-condensed font-black text-xs uppercase tracking-widest cursor-pointer"
              >
                RETURN TO JOURNAL ARCHIVE
              </button>
            </div>
          )
        ) : (
          /* Standard Full Landing Experience */
          <>
            {/* Hero Section */}
            <Hero
              onOpenJourney={() => setIsJourneyOpen(true)}
              onExploreWorkouts={() => navigateTo('workouts')}
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

            {/* Athletic Journal Editorial Preview */}
            <BlogSection
              onNavigateToPost={(slug) => navigateTo(`/blog/${slug}`)}
              onNavigateToBlogIndex={() => navigateTo('blog')}
            />

            {/* Motivational Section */}
            <MotivationSection />
          </>
        )}
      </main>

      {/* Footer with Cross-Page Links */}
      <Footer
        onNavigate={navigateTo}
        onOpenSeoAudit={() => setIsSeoAuditOpen(true)}
      />

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

      {/* Step 3: SEO & AEO Assignment Dossier Modal */}
      <SeoAuditModal
        isOpen={isSeoAuditOpen}
        onClose={() => setIsSeoAuditOpen(false)}
        onNavigateToPost={(slug) => navigateTo(`/blog/${slug}`)}
      />
    </div>
  );
}
