import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar.tsx';
import { HomePage } from './components/HomePage.tsx';
import { WorkoutPage } from './components/WorkoutPage.tsx';
import { ProgramsPage } from './components/ProgramsPage.tsx';
import { NutritionPage } from './components/NutritionPage.tsx';
import { AboutPage } from './components/AboutPage.tsx';
import { BlogIndexPage } from './components/BlogIndexPage.tsx';
import { BlogPostPage } from './components/BlogPostPage.tsx';
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
import { findPostBySlug, resolvePostSlug } from './data/blogData.ts';
import { WorkoutCategory, TrainingProgram, GalleryItem } from './types.ts';
import { updatePageSEO } from './utils/seo.ts';

function BlogPostWrapper({
  onNavigateToPost,
  onNavigateToBlogIndex,
  onNavigateHome,
}: {
  onNavigateToPost: (slug: string) => void;
  onNavigateToBlogIndex: () => void;
  onNavigateHome: () => void;
}) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? findPostBySlug(slug) : undefined;

  // Auto-normalize address bar if legacy alias or unnormalized slug was accessed
  useEffect(() => {
    if (post && slug && slug !== post.slug) {
      navigate(`/blog/${post.slug}`, { replace: true });
    }
  }, [post, slug, navigate]);

  if (!post) {
    return (
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
            onClick={onNavigateToBlogIndex}
            className="px-8 py-3.5 bg-[#C6FF00] text-black font-condensed font-black text-xs uppercase tracking-widest cursor-pointer hover:bg-[#b0e600] transition-colors"
          >
            RETURN TO JOURNAL ARCHIVE
          </button>
          <button
            onClick={onNavigateHome}
            className="px-8 py-3.5 border border-white/20 hover:border-white text-white font-condensed font-black text-xs uppercase tracking-widest cursor-pointer transition-colors"
          >
            RETURN TO HOME
          </button>
        </div>
      </div>
    );
  }

  return (
    <BlogPostPage
      post={post}
      onNavigateToPost={onNavigateToPost}
      onNavigateToBlogIndex={onNavigateToBlogIndex}
      onNavigateHome={onNavigateHome}
    />
  );
}

function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 pt-36 pb-24 text-center">
      <span className="font-mono text-xs text-[#C6FF00] uppercase tracking-widest mb-3">
        404 / PAGE NOT FOUND
      </span>
      <h1 className="font-condensed font-black text-5xl sm:text-7xl text-white uppercase mb-4">
        OUTSIDE THE STANDARD
      </h1>
      <p className="text-xs sm:text-sm text-[#A0A0A0] max-w-md mb-8">
        The destination you requested does not exist or has moved. Return to the core platform.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="px-8 py-3.5 bg-[#C6FF00] text-black font-condensed font-black text-xs uppercase tracking-widest cursor-pointer hover:bg-[#b0e600] transition-colors"
        >
          RETURN TO HOME
        </Link>
        <Link
          to="/workout"
          className="px-8 py-3.5 border border-white/20 hover:border-white text-white font-condensed font-black text-xs uppercase tracking-widest cursor-pointer transition-colors"
        >
          EXPLORE WORKOUTS
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // Modal states
  const [isJourneyOpen, setIsJourneyOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<WorkoutCategory | null>(null);
  const [isNutritionOpen, setIsNutritionOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isSeoAuditOpen, setIsSeoAuditOpen] = useState(false);

  // Check legacy query parameters (?article=slug or ?post=slug or ?slug=slug)
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const querySlug = searchParams.get('article') || searchParams.get('post') || searchParams.get('slug');
    if (querySlug) {
      const canonical = resolvePostSlug(querySlug);
      navigate(`/blog/${canonical}`, { replace: true });
    }
  }, [location.search, navigate]);

  // Scroll to top on route change (unless hash like #gallery)
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.pathname, location.hash]);

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
    } else if (currentPath === '/workout' || currentPath === '/workouts') {
      updatePageSEO({
        title: 'Athletic Workout Categories & Training Disciplines | Built By Discipline',
        description:
          'Explore core training vectors in strength, hypertrophy, VO2 max cardio, and active joint mobility designed for relentless discipline.',
        canonicalPath: '/workout',
        image: '/images/workout_strength.jpg',
      });
    } else if (currentPath === '/programs') {
      updatePageSEO({
        title: 'Periodized Athletic Training Programs & Blueprints | Built By Discipline',
        description:
          'Discover structured 10 to 16 week training programs including The Strength Plan, Lean & Athletic, and Muscle Building periodization blueprints.',
        canonicalPath: '/programs',
        image: '/images/program_strength.jpg',
      });
    } else if (currentPath === '/nutrition') {
      updatePageSEO({
        title: 'Precision Athletic Nutrition & Fueling Architecture | Built By Discipline',
        description:
          'Calculate macronutrient targets, leucine thresholds, peri-workout carbohydrate timing, and electrolyte recovery protocols for athletes.',
        canonicalPath: '/nutrition',
        image: '/images/nutrition_meal.jpg',
      });
    } else if (currentPath === '/about') {
      updatePageSEO({
        title: 'About Built By Discipline | Athletic Ethos, Research & Team',
        description:
          'Learn the philosophy, standards, and scientific advisory board behind Built By Discipline—engineered for athletes relentless in pursuit of physical mastery.',
        canonicalPath: '/about',
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
      const post = findPostBySlug(slug);
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

  const handleOpenLightbox = useCallback((_item: GalleryItem, index: number) => {
    setLightboxIndex(index);
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans-clean selection:bg-[#C6FF00] selection:text-black">
      {/* Navigation Bar */}
      <Navbar
        onOpenJourney={() => setIsJourneyOpen(true)}
        onOpenSeoAudit={() => setIsSeoAuditOpen(true)}
      />

      {/* Main Experience Routing */}
      <main>
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <HomePage
                onOpenJourney={() => setIsJourneyOpen(true)}
                onSelectProgram={(prog) => setSelectedProgram(prog)}
                onSelectCategory={(cat) => setSelectedCategory(cat)}
                onDiscoverNutrition={() => setIsNutritionOpen(true)}
                onOpenLightbox={handleOpenLightbox}
              />
            }
          />

          {/* Workout Route */}
          <Route
            path="/workout"
            element={
              <WorkoutPage
                onSelectCategory={(cat) => setSelectedCategory(cat)}
                onOpenJourney={() => setIsJourneyOpen(true)}
              />
            }
          />
          {/* Workouts alias redirect */}
          <Route path="/workouts" element={<Navigate to="/workout" replace />} />

          {/* Programs Route */}
          <Route
            path="/programs"
            element={
              <ProgramsPage
                onSelectProgram={(prog) => setSelectedProgram(prog)}
                onOpenJourney={() => setIsJourneyOpen(true)}
              />
            }
          />

          {/* Nutrition Route */}
          <Route
            path="/nutrition"
            element={
              <NutritionPage
                onDiscoverNutrition={() => setIsNutritionOpen(true)}
              />
            }
          />

          {/* About Route */}
          <Route
            path="/about"
            element={
              <AboutPage
                onOpenJourney={() => setIsJourneyOpen(true)}
                onOpenLightbox={handleOpenLightbox}
              />
            }
          />

          {/* Dedicated /blog Index Page */}
          <Route
            path="/blog"
            element={
              <BlogIndexPage
                onNavigateToPost={(slug) => navigate(`/blog/${slug}`)}
                onNavigateHome={() => navigate('/')}
              />
            }
          />

          {/* Dedicated /blog/:slug Article Page */}
          <Route
            path="/blog/:slug"
            element={
              <BlogPostWrapper
                onNavigateToPost={(slug) => navigate(`/blog/${slug}`)}
                onNavigateToBlogIndex={() => navigate('/blog')}
                onNavigateHome={() => navigate('/')}
              />
            }
          />

          {/* Legacy article and journal redirects */}
          <Route path="/article/:slug" element={<LegacyRedirect />} />
          <Route path="/articles/:slug" element={<LegacyRedirect />} />
          <Route path="/journal/:slug" element={<LegacyRedirect />} />

          {/* 404 Fallback Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Footer with Cross-Page Links */}
      <Footer
        onNavigate={(path) => navigate(path)}
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
        onNavigateToPost={(slug) => navigate(`/blog/${slug}`)}
      />
    </div>
  );
}

function LegacyRedirect() {
  const { slug } = useParams<{ slug: string }>();
  const canonical = slug ? resolvePostSlug(slug) : '';
  return <Navigate to={`/blog/${canonical}`} replace />;
}
