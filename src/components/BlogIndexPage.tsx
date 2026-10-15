import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowUpRight, Search } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogData.ts';
import { SafeImage } from './SafeImage.tsx';

interface BlogIndexPageProps {
  onNavigateToPost: (slug: string) => void;
  onNavigateHome: () => void;
}

export function BlogIndexPage({ onNavigateToPost, onNavigateHome }: BlogIndexPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Strength', 'Hypertrophy', 'Conditioning', 'Mobility', 'Nutrition'];

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.intro.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.primaryKeyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.relatedKeywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between pb-8 border-b border-white/[0.08] mb-12">
          <button
            onClick={onNavigateHome}
            className="font-mono text-xs text-[#A0A0A0] hover:text-[#C6FF00] uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO HOME</span>
          </button>
          <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest hidden sm:block">
            BUILT BY DISCIPLINE / RESEARCH ARCHIVE
          </div>
        </div>

        {/* Page Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 bg-[#C6FF00]" />
            <span className="font-mono text-[11px] font-semibold tracking-[0.3em] text-[#C6FF00] uppercase">
              EDITORIAL DOSSIER
            </span>
          </div>
          <h1 className="font-condensed font-black tracking-[-0.03em] text-5xl sm:text-7xl lg:text-8xl text-white uppercase leading-[0.9] mb-6">
            ATHLETIC JOURNAL & PROTOCOLS
          </h1>
          <p className="text-sm sm:text-base text-[#A0A0A0] leading-relaxed font-normal">
            Exacting scientific deep dives into progressive overload, mechanical tension, VO2 max thresholds, joint longevity, and metabolic nutrition. Written for athletes who train with relentless discipline.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-12 pb-6 border-b border-white/[0.08]">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-condensed font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#C6FF00] text-black shadow-[0_0_15px_rgba(198,255,0,0.25)]'
                    : 'text-[#A0A0A0] hover:text-white bg-[#141414] hover:bg-[#1a1a1a]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH PROTOCOLS..."
              className="w-full bg-[#121212] border border-white/[0.12] pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 font-mono uppercase tracking-wider focus:outline-none focus:border-[#C6FF00] transition-colors"
            />
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Articles Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                onClick={() => onNavigateToPost(post.slug)}
                className="group flex flex-col bg-[#111111] border border-white/[0.08] hover:border-[#C6FF00]/40 transition-all duration-500 ease-athletic cursor-pointer shadow-lg"
              >
                {/* Image Frame */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#161616]">
                  <SafeImage
                    src={post.image}
                    alt={post.alt}
                    containerClassName="w-full h-full"
                    className="transform transition-transform duration-700 ease-athletic group-hover:scale-105 filter brightness-[0.80] group-hover:brightness-[0.95]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-90" />
                  <div className="absolute top-4 left-4 font-mono text-[10px] text-[#C6FF00] tracking-widest bg-black/70 px-2.5 py-1 uppercase">
                    {post.category}
                  </div>
                </div>

                {/* Article Info */}
                <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-[11px] text-[#A0A0A0] tracking-wider uppercase mb-3">
                      <span>{post.publishDate}</span>
                      <span aria-hidden="true" className="text-white/20">·</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h2 className="font-condensed font-black text-2xl text-white tracking-tight uppercase mb-3 group-hover:text-[#C6FF00] transition-colors leading-[1.05]">
                      {post.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-[#A0A0A0] line-clamp-3 leading-relaxed font-normal">
                      {post.intro}
                    </p>
                  </div>

                  <div className="pt-3 flex items-center justify-between border-t border-white/[0.06] text-xs font-condensed font-bold tracking-widest uppercase text-white group-hover:text-[#C6FF00] transition-colors">
                    <span>EXPLORE PROTOCOL</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-[#111111] border border-white/[0.08] p-8">
            <p className="font-mono text-xs uppercase text-[#A0A0A0] tracking-widest mb-4">
              NO PROTOCOLS MATCHED YOUR SEARCH CRITERIA
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 bg-[#C6FF00] text-black font-condensed font-black text-xs uppercase tracking-wider"
            >
              RESET FILTERS
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
