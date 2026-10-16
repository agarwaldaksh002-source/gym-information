import { useEffect } from 'react';
import { Share2, Calendar, Clock, ChevronRight, ShieldCheck, UserCheck, Sparkles, HelpCircle } from 'lucide-react';
import { BlogPost } from '../types.ts';
import { BLOG_POSTS } from '../data/blogData.ts';
import { SafeImage } from './SafeImage.tsx';

interface BlogPostPageProps {
  post: BlogPost;
  onNavigateToPost: (slug: string) => void;
  onNavigateToBlogIndex: () => void;
  onNavigateHome: () => void;
}

export function BlogPostPage({
  post,
  onNavigateToPost,
  onNavigateToBlogIndex,
  onNavigateHome,
}: BlogPostPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [post.slug]);

  // Find related posts
  const relatedPosts = BLOG_POSTS.filter((p) => post.relatedSlugs.includes(p.slug)).slice(0, 3);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.metaDescription,
          url: window.location.href,
        });
      } catch {
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <article className="min-h-screen bg-[#080808] text-white pt-32 pb-24">
      {/* Top Breadcrumb Bar */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 mb-8">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 font-mono text-[11px] text-[#A0A0A0] uppercase tracking-wider overflow-x-auto whitespace-nowrap pb-2"
        >
          <button
            onClick={onNavigateHome}
            className="hover:text-white transition-colors cursor-pointer"
          >
            HOME
          </button>
          <ChevronRight className="w-3 h-3 text-neutral-600 shrink-0" />
          <button
            onClick={onNavigateToBlogIndex}
            className="hover:text-white transition-colors cursor-pointer"
          >
            JOURNAL
          </button>
          <ChevronRight className="w-3 h-3 text-neutral-600 shrink-0" />
          <span className="text-[#C6FF00] truncate max-w-xs">{post.category}</span>
        </nav>
      </div>

      {/* Article Header Container */}
      <header className="max-w-4xl mx-auto px-6 sm:px-8 mb-10">
        {/* Category & Metadata */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#A0A0A0] uppercase tracking-widest mb-4">
          <span className="text-[#C6FF00] font-bold">{post.category}</span>
          <span aria-hidden="true" className="text-white/20">·</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-neutral-500" />
            {post.publishDate}
          </span>
          <span aria-hidden="true" className="text-white/20">·</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-neutral-500" />
            {post.readTime}
          </span>
          <span aria-hidden="true" className="text-white/20">·</span>
          <span className="text-neutral-400">INTENT: {post.searchIntent}</span>
        </div>

        {/* Single Clear H1 Heading */}
        <h1 className="font-condensed font-black tracking-[-0.03em] text-4xl sm:text-6xl md:text-7xl text-white uppercase leading-[0.92] mb-6">
          {post.title}
        </h1>

        {/* Lead Excerpt / Subheading */}
        <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal border-l-2 border-[#C6FF00] pl-4 sm:pl-6 my-6">
          {post.intro}
        </p>

        {/* E-E-A-T Author & Medical/Science Review Container */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t border-white/[0.08] text-xs font-mono text-[#A0A0A0] gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#161616] border border-[#C6FF00]/40 flex items-center justify-center font-bold text-[#C6FF00] text-xs shrink-0">
              MV
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white uppercase font-bold tracking-wider">{post.author.name}</span>
                <span className="flex items-center gap-1 text-[10px] text-[#C6FF00] bg-[#C6FF00]/10 border border-[#C6FF00]/25 px-1.5 py-0.5">
                  <ShieldCheck className="w-3 h-3" />
                  VERIFIED AUTHOR
                </span>
              </div>
              <p className="text-[10px] text-neutral-400 font-normal mt-0.5">{post.author.credentials}</p>
              <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 mt-1">
                <UserCheck className="w-3 h-3 text-[#C6FF00]" />
                <span>Reviewed by {post.reviewedBy.name} ({post.reviewedBy.role})</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleShare}
            className="self-start sm:self-center flex items-center gap-1.5 hover:text-[#C6FF00] transition-colors cursor-pointer px-3.5 py-1.5 bg-[#121212] border border-white/[0.08]"
            title="Share this article"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>SHARE</span>
          </button>
        </div>
      </header>

      {/* Featured Article Photographic Asset */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8 mb-12 sm:mb-14">
        <div className="relative aspect-[16/9] overflow-hidden bg-[#121212] border border-white/[0.08] shadow-2xl">
          <SafeImage
            src={post.image}
            alt={post.alt}
            priority={true}
            containerClassName="w-full h-full"
            className="filter brightness-[0.85] contrast-[1.12]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] font-mono tracking-widest text-[#A0A0A0] uppercase">
            <span>FIGURE 1.0</span>
            <span className="truncate max-w-sm hidden sm:inline">{post.alt}</span>
          </div>
        </div>
      </div>

      {/* Main Editorial Article Content */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 space-y-12">
        {/* ANSWER ENGINE OPTIMIZATION (AEO) DIRECT ANSWER EXTRACT */}
        <section
          aria-label="Direct Answer Overview"
          className="bg-gradient-to-br from-[#141414] to-[#0c0c0c] border-2 border-[#C6FF00]/40 p-6 sm:p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C6FF00]/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#C6FF00]" />
            <span className="font-mono text-[11px] font-bold tracking-[0.25em] text-[#C6FF00] uppercase">
              AEO DIRECT ANSWER / QUICK SNIPPET
            </span>
          </div>

          <h2 className="font-condensed font-black text-2xl sm:text-3xl text-white uppercase tracking-tight mb-3">
            What is the core protocol for {post.primaryKeyword}?
          </h2>

          <p className="aeo-direct-answer text-sm sm:text-base text-neutral-200 leading-relaxed font-normal mb-5">
            {post.aeoQuickAnswer.directAnswer}
          </p>

          <div className="border-t border-white/[0.08] pt-4">
            <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block mb-2 font-semibold">
              KEY DIRECTIVES & PROTOCOL METRICS:
            </span>
            <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-300">
              {post.aeoQuickAnswer.keyTakeaways.map((point, kIdx) => (
                <li key={kIdx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C6FF00] rounded-full mt-1.5 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Core Body Sections */}
        {post.sections.map((section, idx) => (
          <section key={idx} className="space-y-6">
            {/* Descriptive H2 Heading */}
            <h2 className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase tracking-tight leading-tight border-b border-white/[0.08] pb-3">
              {section.heading}
            </h2>

            {/* Paragraphs */}
            {section.content.map((p, pIdx) => (
              <p key={pIdx} className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                {p}
              </p>
            ))}

            {/* Subsections (H3) */}
            {section.subsections && section.subsections.length > 0 && (
              <div className="space-y-6 pl-2 sm:pl-4 border-l border-white/[0.08] my-6">
                {section.subsections.map((sub, sIdx) => (
                  <div key={sIdx} className="space-y-3">
                    <h3 className="font-condensed font-bold text-2xl text-[#C6FF00] uppercase tracking-normal">
                      {sub.subheading}
                    </h3>
                    {sub.content.map((subP, spIdx) => (
                      <p
                        key={spIdx}
                        className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal whitespace-pre-line"
                      >
                        {subP}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}

        {/* Conclusion / Summary Takeaway */}
        <section className="summary-takeaway bg-[#121212] border border-white/[0.08] p-6 sm:p-8 space-y-3 my-8">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#C6FF00]" />
            <span className="font-mono text-[11px] font-semibold tracking-[0.25em] text-[#C6FF00] uppercase">
              SUMMARY & PROTOCOL TAKEAWAY
            </span>
          </div>
          <p className="text-sm sm:text-base text-white leading-relaxed font-normal">
            {post.conclusion}
          </p>
        </section>

        {/* Frequently Asked Questions (H2 Headings with direct answers for AEO) */}
        <section className="space-y-6 pt-6 border-t border-white/[0.08]">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="w-4 h-4 text-[#C6FF00]" />
            <span className="font-mono text-[11px] font-semibold tracking-[0.3em] text-[#C6FF00] uppercase">
              FREQUENTLY ASKED QUESTIONS (AEO FAQS)
            </span>
          </div>

          <div className="space-y-8">
            {post.faqs.map((faq, fIdx) => (
              <div
                key={fIdx}
                className="bg-[#111111] border border-white/[0.08] p-6 sm:p-7 space-y-3"
              >
                {/* FAQ 1 & FAQ 2 formatted strictly as H2 headings */}
                <h2 className="font-condensed font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                  {faq.question}
                </h2>
                {/* Direct answer immediately below */}
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal Contextual Links */}
        <section className="bg-[#121212] border border-white/[0.08] p-6 sm:p-7 space-y-4 my-8">
          <span className="font-mono text-[11px] font-semibold tracking-[0.25em] text-[#C6FF00] uppercase block">
            RELATED PROTOCOLS & CROSS-PAGE ARCHITECTURE
          </span>
          <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300">
            {post.internalLinks.map((link, lIdx) => (
              <li key={lIdx} className="flex items-baseline gap-2">
                <span className="text-[#C6FF00] font-mono">→</span>
                <span>
                  {link.context}{' '}
                  <a
                    href={link.url}
                    onClick={(e) => {
                      e.preventDefault();
                      if (link.url.startsWith('/blog/')) {
                        const targetSlug = link.url.replace('/blog/', '');
                        onNavigateToPost(targetSlug);
                      } else if (link.url.startsWith('/#')) {
                        const targetId = link.url.replace('/#', '');
                        onNavigateHome();
                        setTimeout(() => {
                          const el = document.getElementById(targetId);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }
                    }}
                    className="text-white hover:text-[#C6FF00] underline underline-offset-4 font-semibold transition-colors cursor-pointer"
                  >
                    {link.anchorText}
                  </a>
                  .
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Related Articles Footer Carousel/Grid */}
      {relatedPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 sm:px-8 mt-20 pt-16 border-t border-white/[0.08]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="font-mono text-[11px] font-semibold tracking-[0.3em] text-[#C6FF00] uppercase block mb-1">
                CONTINUE EXPLORING
              </span>
              <h2 className="font-condensed font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
                RECOMMENDED READING
              </h2>
            </div>
            <button
              onClick={onNavigateToBlogIndex}
              className="font-mono text-xs text-[#A0A0A0] hover:text-[#C6FF00] uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>ALL PROTOCOLS</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rel) => (
              <a
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                    e.preventDefault();
                    onNavigateToPost(rel.slug);
                  }
                }}
                className="group flex flex-col bg-[#111111] border border-white/[0.08] hover:border-[#C6FF00]/40 transition-all duration-300 cursor-pointer text-left"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#161616]">
                  <SafeImage
                    src={rel.image}
                    alt={rel.alt}
                    containerClassName="w-full h-full"
                    className="group-hover:scale-105 transition-transform duration-500 filter brightness-[0.80]"
                  />
                  <div className="absolute top-3 left-3 font-mono text-[9px] text-[#C6FF00] tracking-widest bg-black/70 px-2 py-0.5 uppercase">
                    {rel.category}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] text-neutral-500 uppercase block mb-1">
                      {rel.readTime}
                    </span>
                    <h3 className="font-condensed font-black text-xl text-white uppercase tracking-tight group-hover:text-[#C6FF00] transition-colors line-clamp-2">
                      {rel.title}
                    </h3>
                  </div>
                  <div className="text-xs font-mono text-[#C6FF00] uppercase flex items-center gap-1">
                    READ PROTOCOL <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
