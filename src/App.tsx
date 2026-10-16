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
  // Article 1 aliases: Progressive Overload
  'progressive-overload': 'progressive-overload-strength-training-guide',
  'strength-training': 'progressive-overload-strength-training-guide',
  'the-science-of-progressive-overload': 'progressive-overload-strength-training-guide',
  'progressive-overload-guide': 'progressive-overload-strength-training-guide',
  'strength-training-guide': 'progressive-overload-strength-training-guide',
  'mechanical-tension': 'progressive-overload-strength-training-guide',

  // Article 2 aliases: Hypertrophy
  'hypertrophy': 'hypertrophy-muscle-building-science',
  'hypertrophy-science': 'hypertrophy-muscle-building-science',
  'muscle-building': 'hypertrophy-muscle-building-science',
  'hypertrophy-physiology': 'hypertrophy-muscle-building-science',
  'muscle-protein-synthesis': 'hypertrophy-muscle-building-science',
  'hypertrophy-guide': 'hypertrophy-muscle-building-science',

  // Article 3 aliases: VO2 Max & Cardio
  'vo2-max': 'vo2-max-athletic-cardio-conditioning',
  'cardio-conditioning': 'vo2-max-athletic-cardio-conditioning',
  'athletic-cardio': 'vo2-max-athletic-cardio-conditioning',
  'lactate-threshold': 'vo2-max-athletic-cardio-conditioning',
  'vo2-max-conditioning': 'vo2-max-athletic-cardio-conditioning',
  'conditioning-protocol': 'vo2-max-athletic-cardio-conditioning',

  // Article 4 aliases: Joint Mobility & Active Recovery
  'joint-mobility': 'joint-mobility-active-recovery-protocol',
  'mobility-recovery': 'joint-mobility-active-recovery-protocol',
  'active-recovery': 'joint-mobility-active-recovery-protocol',
  'joint-mobility-protocol': 'joint-mobility-active-recovery-protocol',
  'recovery-protocol': 'joint-mobility-active-recovery-protocol',
  'kinetic-chain-longevity': 'joint-mobility-active-recovery-protocol',

  // Article 5 aliases: Precision Macronutrient Fueling
  'nutrition': 'precision-macronutrient-nutrition-fueling',
  'nutrition-fueling': 'precision-macronutrient-nutrition-fueling',
  'macronutrient-fueling': 'precision-macronutrient-nutrition-fueling',
  'precision-nutrition': 'precision-macronutrient-nutrition-fueling',
  'macronutrient-blueprint': 'precision-macronutrient-nutrition-fueling',
  'precision-macronutrient': 'precision-macronutrient-nutrition-fueling',
};

function resolveCanonicalPath(): string {
  if (typeof window === 'undefined') return '/';

  const pathname = (window.location.pathname || '/').toLowerCase();
  const searchParams = new URLSearchParams(window.location.search);

  // 1. Check query parameter compatibility (?article=slug or ?post=slug or ?slug=slug)
  const rawQuery = searchParams.get('article') || searchParams.get('post') || searchParams.get('slug');
  if (rawQuery) {
    const querySlug = rawQuery.toLowerCase().trim();
    const canonicalSlug = LEGACY_SLUG_MAP[querySlug] || querySlug;
    const target = `/blog/${canonicalSlug}`;
    window.history.replaceState({}, '', target);
    return target;
  }

  // 2. Check legacy path prefixes: /article/:slug, /articles/:slug, or /journal/:slug
  const legacyPrefixMatch = pathname.match(/^\/(?:article|articles|journal)\/(.+)$/);
  if (legacyPrefixMatch) {
    const rawSlug = legacyPrefixMatch[1].replace(/\/$/, '').trim();
    const canonicalSlug = LEGACY_SLUG_MAP[rawSlug] || rawSlug;
    const target = `/blog/${canonicalSlug}`;
    window.history.replaceState({}, '', target);
    return target;
  }

  // 3. Check /blog/:slug with legacy short slug or trailing slash
  if (pathname.startsWith('/blog/')) {
    const rawSlug = pathname.replace('/blog/', '').replace(/\/$/, '').trim();
    if (LEGACY_SLUG_MAP[rawSlug]) {
      const canonicalSlug = LEGACY_SLUG_MAP[rawSlug];
      const target = `/blog/${canonicalSlug}`;
      window.history.replaceState({}, '', target);
      return target;
    }
    // Clean URL normalization (strips uppercase or trailing slash in address bar)
    const normalizedTarget = `/blog/${rawSlug}`;
    if (window.location.pathname !== normalizedTarget && rawSlug.length > 0) {
      window.history.replaceState({}, '', normalizedTarget);
      return normalizedTarget;
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
      const slug = currentPath.replace('/blog/', '').replace(/\/$/, '').toLowerCase();
      const post = BLOG_POSTS.find((p) => p.slug === slug);
      if (post) {
        updatePageSEO({
          title: post.seoTitle,
          description: post.metaDescription,
          canonicalPath: `/blog/${post.slug}`,
          image: post.image,
          article: post,
        });
      } else {
        updatePageSEO({
          title: '404 - Article Not Found | Built By Discipline',
          description: 'The requested athletic research protocol does not exist or has been restructured.',
          canonicalPath: currentPath,
          image: '/images/hero_athlete.jpg',
        });
      }
    }
  }, [currentPath]);

  // Programmatic navigation for sections and general paths
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

    // Normalize /blog/:slug if needed
    if (targetPath.startsWith('/blog/')) {
      const raw = targetPath.replace('/blog/', '').replace(/\/$/, '').toLowerCase();
      const resolved = LEGACY_SLUG_MAP[raw] || raw;
      targetPath = `/blog/${resolved}`;
    }

    window.history.pushState({}, '', targetPath);
    setCurrentPath(targetPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPath]);

  // Dedicated helper to navigate to any blog post slug safely and cleanly
  const navigateToPost = useCallback((slugOrPath: string) => {
    const cleanSlug = slugOrPath
      .replace(/^\/blog\//, '')
      .replace(/^blog\//, '')
      .replace(/^\//, '')
      .replace(/\/$/, '')
      .toLowerCase();
    
    const targetSlug = LEGACY_SLUG_MAP[cleanSlug] || cleanSlug;
    const targetPath = `/blog/${targetSlug}`;
    
    window.history.pushState({}, '', targetPath);
    setCurrentPath(targetPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenLightbox = useCallback((_item: GalleryItem, index: number) => {
    setLightboxIndex(index);
  }, []);

  // Determine active view
  const isBlogIndex = currentPath === '/blog' || currentPath === '/blog/';
  const isBlogPost = currentPath.startsWith('/blog/') && currentPath.length > 6;
  const currentPostSlug = isBlogPost ? currentPath.replace('/blog/', '').replace(/\/$/, '').toLowerCase() : null;
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
            onNavigateToPost={navigateToPost}
            onNavigateHome={() => navigateTo('hero')}
          />
        ) : isBlogPost ? (
          /* Dedicated /blog/:slug page */
          activePost ? (
            <BlogPostPage
              post={activePost}
              onNavigateToPost={navigateToPost}
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
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => navigateTo('blog')}
                  className="px-8 py-3.5 bg-[#C6FF00] text-black font-condensed font-black text-xs uppercase tracking-widest cursor-pointer hover:bg-[#b0e600] transition-colors"
                >
                  RETURN TO JOURNAL ARCHIVE
                </button>
                <button
                  onClick={() => navigateTo('hero')}
                  className="px-8 py-3.5 border border-white/20 hover:border-white text-white font-condensed font-black text-xs uppercase tracking-widest cursor-pointer transition-colors"
                >
                  RETURN TO HOME
                </button>
              </div>
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
              onNavigateToPost={navigateToPost}
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
        onNavigateToPost={navigateToPost}
      />
    </div>
  );
}
