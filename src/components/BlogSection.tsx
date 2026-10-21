import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogData.ts';
import { SafeImage } from './SafeImage.tsx';

interface BlogSectionProps {
  onNavigateToPost?: (slug: string) => void;
  onNavigateToBlogIndex?: () => void;
}

export function BlogSection({ onNavigateToPost }: BlogSectionProps) {
  // Display top 6 editorial research articles on home preview
  const featuredPosts = BLOG_POSTS.slice(0, 6);

  return (
    <section id="journal" className="relative w-full py-28 sm:py-36 bg-[#080808] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-20 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-[#C6FF00]" />
              <span className="font-mono text-[11px] font-semibold tracking-[0.3em] text-[#C6FF00] uppercase">
                05 / ATHLETIC JOURNAL
              </span>
            </div>
            <h2 className="font-condensed font-black tracking-[-0.03em] text-5xl sm:text-7xl lg:text-8xl text-white uppercase leading-[0.9]">
              RESEARCH & PROTOCOLS
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-xs sm:text-sm text-[#A0A0A0] max-w-sm tracking-wide leading-relaxed font-normal">
              Peer-reviewed exercise physiology, progressive overload mechanics, and metabolic fueling.
            </p>
            <Link
              to="/blog"
              className="font-mono text-xs text-[#C6FF00] hover:text-white uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <span>VIEW ALL PROTOCOLS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 3 Editorial Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {featuredPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              onClick={() => {
                if (onNavigateToPost) onNavigateToPost(post.slug);
              }}
              className="group flex flex-col bg-[#111111] border border-white/[0.08] hover:border-[#C6FF00]/40 transition-all duration-500 ease-athletic cursor-pointer shadow-lg text-left"
            >
              {/* Thumbnail Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#161616]">
                <SafeImage
                  src={post.image}
                  alt={post.alt}
                  containerClassName="w-full h-full"
                  className="transform transition-transform duration-700 ease-athletic group-hover:scale-105 filter brightness-[0.80] group-hover:brightness-[0.95]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-90" />
                
                {/* Category tag */}
                <div className="absolute top-4 left-4 font-mono text-[10px] text-[#C6FF00] tracking-widest bg-black/70 px-2.5 py-1 uppercase">
                  {post.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between gap-6">
                <div>
                  {/* Clean unboxed metadata (Zero-Pill Compliance) */}
                  <div className="flex items-center gap-2 font-mono text-[11px] text-[#A0A0A0] tracking-wider uppercase mb-3">
                    <span>{post.publishDate}</span>
                    <span aria-hidden="true" className="text-white/20">·</span>
                    <span>{post.readTime}</span>
                  </div>

                  {/* Article Title */}
                  <h3 className="font-condensed font-black text-2xl text-white tracking-tight uppercase mb-3 group-hover:text-[#C6FF00] transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Short Excerpt */}
                  <p className="text-xs sm:text-sm text-[#A0A0A0] line-clamp-3 leading-relaxed font-normal">
                    {post.intro}
                  </p>
                </div>

                {/* Read Article Action */}
                <div className="pt-2 flex items-center justify-between border-t border-white/[0.06] text-xs font-condensed font-bold tracking-widest uppercase text-white group-hover:text-[#C6FF00] transition-colors">
                  <span>READ PROTOCOL</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
