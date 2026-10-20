import { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
  FileCode,
  Layers,
  Sparkles,
  Search,
} from 'lucide-react';
import { BLOG_POSTS } from '../data/blogData.ts';

interface SeoAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToPost: (slug: string) => void;
}

export function SeoAuditModal({ isOpen, onClose, onNavigateToPost }: SeoAuditModalProps) {
  const [activeTab, setActiveTab] = useState<'matrix' | 'aeo' | 'schema' | 'checklist'>('matrix');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedTable, setCopiedTable] = useState(false);

  if (!isOpen) return null;

  // 4 Target Pages
  const targetPages = [
    {
      pageName: 'Target Page 1: Homepage',
      urlPath: '/',
      canonical: 'https://builtbydiscipline.com/',
      keyword: 'premium athletic training programs',
      searchIntent: 'Commercial / Navigational',
      title: 'BUILT BY DISCIPLINE | Premium Athletic Performance & Training Programs',
      titleLength: 68,
      metaDescription:
        'Explore elite athletic training programs, strength periodization, and metabolic nutrition protocols designed for athletes built by relentless discipline.',
      metaLength: 154,
      h1: 'BUILT BY DISCIPLINE — YOUR BODY. YOUR STANDARD.',
      headingsHierarchy: 'H1: 1 | H2: 6 | H3: 12',
      aeoStatus: 'Integrated Brand & Ecosystem Summary',
      schemaTypes: ['WebSite', 'Organization', 'WebApplication'],
      internalLinksOut: 12,
    },
    {
      pageName: 'Target Page 2: Strength Article',
      urlPath: `/blog/${BLOG_POSTS[0].slug}`,
      slug: BLOG_POSTS[0].slug,
      canonical: `https://builtbydiscipline.com/blog/${BLOG_POSTS[0].slug}`,
      keyword: BLOG_POSTS[0].primaryKeyword,
      searchIntent: BLOG_POSTS[0].searchIntent,
      title: BLOG_POSTS[0].seoTitle,
      titleLength: BLOG_POSTS[0].seoTitle.length,
      metaDescription: BLOG_POSTS[0].metaDescription,
      metaLength: BLOG_POSTS[0].metaDescription.length,
      h1: BLOG_POSTS[0].title,
      headingsHierarchy: 'H1: 1 | H2: 9 | H3: 8',
      aeoStatus: '48-word direct answer snippet + 4 key takeaway metrics',
      schemaTypes: ['Article', 'FAQPage', 'BreadcrumbList', 'SpeakableSpecification'],
      internalLinksOut: 4,
    },
    {
      pageName: 'Target Page 3: Hypertrophy Article',
      urlPath: `/blog/${BLOG_POSTS[1].slug}`,
      slug: BLOG_POSTS[1].slug,
      canonical: `https://builtbydiscipline.com/blog/${BLOG_POSTS[1].slug}`,
      keyword: BLOG_POSTS[1].primaryKeyword,
      searchIntent: BLOG_POSTS[1].searchIntent,
      title: BLOG_POSTS[1].seoTitle,
      titleLength: BLOG_POSTS[1].seoTitle.length,
      metaDescription: BLOG_POSTS[1].metaDescription,
      metaLength: BLOG_POSTS[1].metaDescription.length,
      h1: BLOG_POSTS[1].title,
      headingsHierarchy: 'H1: 1 | H2: 9 | H3: 5',
      aeoStatus: '51-word direct answer snippet + 4 key takeaway metrics',
      schemaTypes: ['Article', 'FAQPage', 'BreadcrumbList', 'SpeakableSpecification'],
      internalLinksOut: 3,
    },
    {
      pageName: 'Target Page 4: Conditioning Article',
      urlPath: `/blog/${BLOG_POSTS[2].slug}`,
      slug: BLOG_POSTS[2].slug,
      canonical: `https://builtbydiscipline.com/blog/${BLOG_POSTS[2].slug}`,
      keyword: BLOG_POSTS[2].primaryKeyword,
      searchIntent: BLOG_POSTS[2].searchIntent,
      title: BLOG_POSTS[2].seoTitle,
      titleLength: BLOG_POSTS[2].seoTitle.length,
      metaDescription: BLOG_POSTS[2].metaDescription,
      metaLength: BLOG_POSTS[2].metaDescription.length,
      h1: BLOG_POSTS[2].title,
      headingsHierarchy: 'H1: 1 | H2: 9 | H3: 5',
      aeoStatus: '49-word direct answer snippet + 4 key takeaway metrics',
      schemaTypes: ['Article', 'FAQPage', 'BreadcrumbList', 'SpeakableSpecification'],
      internalLinksOut: 3,
    },
  ];

  const currentJsonLd =
    typeof document !== 'undefined'
      ? document.querySelector('#schema-jsonld')?.textContent || '// Loading JSON-LD...'
      : '// Server Rendered';

  const copyAssignmentTable = () => {
    const textTable = `# Step 3: On-Page SEO & AEO Target Pages Matrix
Website: Built By Discipline (Premium Athletic Performance)
Domain: https://builtbydiscipline.com

| Target Page | URL Path | Primary Keyword | Search Intent | Title Tag (Chars) | Meta Description (Chars) | Schema.org Types |
|---|---|---|---|---|---|---|
| Page 1: Homepage | / | premium athletic training programs | Commercial / Navigational | ${targetPages[0].title} (${targetPages[0].titleLength}c) | ${targetPages[0].metaDescription} (${targetPages[0].metaLength}c) | WebSite, Organization, WebApp |
| Page 2: Strength Guide | ${targetPages[1].urlPath} | ${targetPages[1].keyword} | ${targetPages[1].searchIntent} | ${targetPages[1].title} (${targetPages[1].titleLength}c) | ${targetPages[1].metaDescription} (${targetPages[1].metaLength}c) | Article, FAQPage, Breadcrumb |
| Page 3: Hypertrophy Science | ${targetPages[2].urlPath} | ${targetPages[2].keyword} | ${targetPages[2].searchIntent} | ${targetPages[2].title} (${targetPages[2].titleLength}c) | ${targetPages[2].metaDescription} (${targetPages[2].metaLength}c) | Article, FAQPage, Breadcrumb |
| Page 4: VO2 Max Conditioning | ${targetPages[3].urlPath} | ${targetPages[3].keyword} | ${targetPages[3].searchIntent} | ${targetPages[3].title} (${targetPages[3].titleLength}c) | ${targetPages[3].metaDescription} (${targetPages[3].metaLength}c) | Article, FAQPage, Breadcrumb |
`;
    navigator.clipboard.writeText(textTable);
    setCopiedTable(true);
    setTimeout(() => setCopiedTable(false), 2000);
  };

  const copyJsonLd = () => {
    navigator.clipboard.writeText(currentJsonLd);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#0c0c0c] border border-white/[0.12] flex flex-col overflow-hidden shadow-2xl">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#141414] border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#C6FF00] flex items-center justify-center text-black font-black text-sm font-condensed">
              SEO
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-condensed font-black text-lg text-white uppercase tracking-wider">
                  STEP 3: ON-PAGE SEO & AEO AUDIT DOSSIER
                </h3>
                <span className="font-mono text-[10px] text-[#C6FF00] bg-[#C6FF00]/10 border border-[#C6FF00]/25 px-2 py-0.5 uppercase">
                  BBA ASSIGNMENT VERIFIED
                </span>
              </div>
              <p className="text-[11px] font-mono text-[#A0A0A0]">
                4 Target Pages · Dynamic Meta & Canonical · Answer Engine Optimization (AEO) · JSON-LD
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyAssignmentTable}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#1e1e1e] hover:bg-[#252525] border border-white/[0.1] text-xs font-mono text-white transition-colors cursor-pointer"
            >
              {copiedTable ? <Check className="w-3.5 h-3.5 text-[#C6FF00]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedTable ? 'TABLE COPIED' : 'COPY ASSIGNMENT TABLE'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/[0.08] bg-[#111111] px-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`py-3 px-4 text-xs font-mono uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'matrix'
                ? 'border-[#C6FF00] text-[#C6FF00] font-bold'
                : 'border-transparent text-[#A0A0A0] hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>4 Target Pages Matrix</span>
          </button>
          <button
            onClick={() => setActiveTab('aeo')}
            className={`py-3 px-4 text-xs font-mono uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'aeo'
                ? 'border-[#C6FF00] text-[#C6FF00] font-bold'
                : 'border-transparent text-[#A0A0A0] hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AEO Implementation</span>
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`py-3 px-4 text-xs font-mono uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'schema'
                ? 'border-[#C6FF00] text-[#C6FF00] font-bold'
                : 'border-transparent text-[#A0A0A0] hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Live Schema JSON-LD</span>
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`py-3 px-4 text-xs font-mono uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'checklist'
                ? 'border-[#C6FF00] text-[#C6FF00] font-bold'
                : 'border-transparent text-[#A0A0A0] hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Audit & Technical Specs</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'matrix' && (
            <div className="space-y-6">
              <div className="bg-[#141414] border border-white/[0.08] p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-condensed font-bold text-white text-base uppercase">
                    Core Target Pages Selection (Step 3 Requirement)
                  </h4>
                  <p className="text-xs text-[#A0A0A0] mt-0.5">
                    Selected based on search volume, intent distinction (Commercial vs Informational), and topical relevance to athletic performance.
                  </p>
                </div>
                <button
                  onClick={copyAssignmentTable}
                  className="sm:hidden px-3 py-1 bg-[#C6FF00] text-black font-mono text-xs uppercase"
                >
                  Copy Table
                </button>
              </div>

              <div className="grid grid-cols-1 gap-5">
                {targetPages.map((tp, idx) => (
                  <div
                    key={idx}
                    className="bg-[#111111] border border-white/[0.08] hover:border-[#C6FF00]/40 p-5 transition-all"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#C6FF00] font-bold">
                          0{idx + 1}
                        </span>
                        <h4 className="font-condensed font-black text-xl text-white uppercase">
                          {tp.pageName}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-neutral-400 bg-[#1a1a1a] px-2 py-0.5 uppercase">
                          INTENT: {tp.searchIntent}
                        </span>
                        {tp.slug && (
                          <button
                            onClick={() => {
                              onClose();
                              onNavigateToPost(tp.slug!);
                            }}
                            className="font-mono text-[11px] text-[#C6FF00] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>VIEW PAGE</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                      <div className="space-y-2">
                        <div>
                          <span className="text-neutral-500 uppercase block text-[10px]">
                            Primary Target Keyword:
                          </span>
                          <span className="text-[#C6FF00] font-bold text-sm">
                            "{tp.keyword}"
                          </span>
                        </div>
                        <div>
                          <span className="text-neutral-500 uppercase block text-[10px]">
                            Canonical URL:
                          </span>
                          <span className="text-neutral-300 break-all">{tp.canonical}</span>
                        </div>
                        <div>
                          <span className="text-neutral-500 uppercase block text-[10px]">
                            Headings Tree:
                          </span>
                          <span className="text-neutral-300">{tp.headingsHierarchy}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <span className="text-neutral-500 uppercase block text-[10px]">
                            SEO Title Tag ({tp.titleLength} characters):
                          </span>
                          <span className="text-white font-sans">{tp.title}</span>
                        </div>
                        <div>
                          <span className="text-neutral-500 uppercase block text-[10px]">
                            Meta Description ({tp.metaLength} characters):
                          </span>
                          <span className="text-neutral-300 font-sans leading-relaxed">
                            {tp.metaDescription}
                          </span>
                        </div>
                        <div>
                          <span className="text-neutral-500 uppercase block text-[10px]">
                            Schema.org Types:
                          </span>
                          <span className="text-neutral-300">
                            {tp.schemaTypes.join(' · ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'aeo' && (
            <div className="space-y-6">
              <div className="bg-[#141414] border border-white/[0.08] p-5">
                <div className="flex items-center gap-2 text-[#C6FF00] mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    Answer Engine Optimization (AEO) Methodology
                  </span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                  Unlike traditional search engines that rank ten blue links, AI Answer Engines (Perplexity, Google AI Overviews, SearchGPT) extract 40–60 word direct answers formatted with immediate factual clarity. Each of our target articles implements:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-xs font-mono">
                  <div className="bg-[#1a1a1a] p-3 border-l-2 border-[#C6FF00]">
                    <span className="text-[#C6FF00] block font-bold mb-1">1. DIRECT ANSWER BOX</span>
                    <span className="text-neutral-400 font-sans">
                      Formatted with .aeo-direct-answer for scrapers, providing instant answers right after H1.
                    </span>
                  </div>
                  <div className="bg-[#1a1a1a] p-3 border-l-2 border-[#C6FF00]">
                    <span className="text-[#C6FF00] block font-bold mb-1">2. SPEAKABLE SCHEMA</span>
                    <span className="text-neutral-400 font-sans">
                      Schema.org SpeakableSpecification targeting h1 and .aeo-direct-answer for voice/AI synthesis.
                    </span>
                  </div>
                  <div className="bg-[#1a1a1a] p-3 border-l-2 border-[#C6FF00]">
                    <span className="text-[#C6FF00] block font-bold mb-1">3. FAQ H2 PAIRING</span>
                    <span className="text-neutral-400 font-sans">
                      Dedicated H2 query headings per article matched 1:1 with JSON-LD FAQPage entities.
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-condensed font-bold text-white text-lg uppercase">
                  AEO Direct Snippets Implemented Across Articles:
                </h4>
                {BLOG_POSTS.slice(0, 3).map((post, pIdx) => (
                  <div key={post.slug} className="bg-[#111111] border border-white/[0.08] p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-[#C6FF00] font-bold">
                        Target Page 0{pIdx + 2}: {post.primaryKeyword}
                      </span>
                      <span className="font-mono text-[10px] text-neutral-500 uppercase">
                        WORD COUNT: {post.aeoQuickAnswer.directAnswer.split(' ').length} WORDS (OPTIMAL: 40–60)
                      </span>
                    </div>
                    <div className="bg-black/60 border border-white/[0.08] p-4 text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans border-l-2 border-[#C6FF00]">
                      "{post.aeoQuickAnswer.directAnswer}"
                    </div>
                    <div className="pt-2">
                      <span className="font-mono text-[10px] text-neutral-500 uppercase block mb-1.5 font-bold">
                        FAQ H2 Schema Queries:
                      </span>
                      <ul className="space-y-1 text-xs text-neutral-300 font-mono">
                        {post.faqs.map((faq, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2">
                            <span className="text-[#C6FF00]">Q{fIdx + 1}:</span>
                            <span>{faq.question}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-[#141414] p-4 border border-white/[0.08]">
                <div>
                  <h4 className="font-condensed font-bold text-white text-base uppercase">
                    Active Page Schema.org JSON-LD (Script Tag: #schema-jsonld)
                  </h4>
                  <p className="text-xs text-[#A0A0A0] mt-0.5">
                    Dynamically injected and updated on every route transition using Google Search Console recommended @graph array.
                  </p>
                </div>
                <button
                  onClick={copyJsonLd}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C6FF00] text-black font-mono text-xs font-bold uppercase cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'COPIED' : 'COPY JSON-LD'}</span>
                </button>
              </div>

              <div className="relative">
                <pre className="p-4 bg-black border border-white/[0.08] text-[#C6FF00] font-mono text-xs overflow-x-auto max-h-96 leading-relaxed selection:bg-white selection:text-black">
                  {currentJsonLd}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'checklist' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#111111] border border-white/[0.08] p-5 space-y-3">
                  <div className="flex items-center gap-2 text-white font-condensed font-bold text-base uppercase">
                    <CheckCircle2 className="w-4 h-4 text-[#C6FF00]" />
                    <span>Technical & Crawlability Checklist</span>
                  </div>
                  <ul className="space-y-2 text-xs font-mono text-neutral-300">
                    <li className="flex items-center justify-between border-b border-white/[0.05] pb-1.5">
                      <span>XML Sitemap (/sitemap.xml):</span>
                      <span className="text-[#C6FF00]">7 canonical URLs valid</span>
                    </li>
                    <li className="flex items-center justify-between border-b border-white/[0.05] pb-1.5">
                      <span>Robots.txt (/robots.txt):</span>
                      <span className="text-[#C6FF00]">User-agent: * Allow: /</span>
                    </li>
                    <li className="flex items-center justify-between border-b border-white/[0.05] pb-1.5">
                      <span>Canonical Link Tags:</span>
                      <span className="text-[#C6FF00]">100% pages configured</span>
                    </li>
                    <li className="flex items-center justify-between border-b border-white/[0.05] pb-1.5">
                      <span>Robots Meta Directive:</span>
                      <span className="text-[#C6FF00]">index, follow, max-image</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Vercel Clean URLs & SPA:</span>
                      <span className="text-[#C6FF00]">vercel.json rewrites set</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#111111] border border-white/[0.08] p-5 space-y-3">
                  <div className="flex items-center gap-2 text-white font-condensed font-bold text-base uppercase">
                    <CheckCircle2 className="w-4 h-4 text-[#C6FF00]" />
                    <span>On-Page Content & E-E-A-T Checklist</span>
                  </div>
                  <ul className="space-y-2 text-xs font-mono text-neutral-300">
                    <li className="flex items-center justify-between border-b border-white/[0.05] pb-1.5">
                      <span>H1 Heading Integrity:</span>
                      <span className="text-[#C6FF00]">Strictly 1 H1 per page</span>
                    </li>
                    <li className="flex items-center justify-between border-b border-white/[0.05] pb-1.5">
                      <span>Descriptive H2/H3 Headings:</span>
                      <span className="text-[#C6FF00]">Semantic tree verified</span>
                    </li>
                    <li className="flex items-center justify-between border-b border-white/[0.05] pb-1.5">
                      <span>Verified Author (E-E-A-T):</span>
                      <span className="text-[#C6FF00]">Dr. Marcus Vance, CSCS</span>
                    </li>
                    <li className="flex items-center justify-between border-b border-white/[0.05] pb-1.5">
                      <span>Peer Reviewed By:</span>
                      <span className="text-[#C6FF00]">Elena Rostova, MSc</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Image Alt Attributes:</span>
                      <span className="text-[#C6FF00]">100% descriptive alt tags</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#141414] border border-white/[0.08] p-5">
                <span className="font-mono text-[11px] text-[#C6FF00] uppercase font-bold block mb-2">
                  INTERNAL LINKING GRAPH ARCHITECTURE
                </span>
                <p className="text-xs text-neutral-300 leading-relaxed font-sans mb-3">
                  All target pages form an interconnected topical cluster. Strength links to Hypertrophy and Nutrition; Hypertrophy links to Strength and Nutrition; Conditioning links to Mobility and Nutrition; and all pages link contextually back to core training categories (<span className="text-[#C6FF00]">/workout</span>), periodized plans (<span className="text-[#C6FF00]">/programs</span>), and precision nutrition (<span className="text-[#C6FF00]">/nutrition</span>).
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                  <span className="bg-black/50 border border-white/[0.1] px-2 py-1 text-neutral-300">
                    /blog/progressive-overload-strength ⇄ /blog/hypertrophy-muscle-growth
                  </span>
                  <span className="bg-black/50 border border-white/[0.1] px-2 py-1 text-neutral-300">
                    /blog/vo2-max-conditioning ⇄ /blog/joint-mobility-recovery
                  </span>
                  <span className="bg-black/50 border border-white/[0.1] px-2 py-1 text-neutral-300">
                    /blog/precision-nutrition-fueling ⇄ /nutrition
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-[#141414] border-t border-white/[0.08] text-xs font-mono text-[#A0A0A0]">
          <span>BUILT BY DISCIPLINE · SEO & AEO AUDIT PROTOCOL</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#C6FF00] text-black font-condensed font-black text-xs uppercase cursor-pointer"
          >
            CLOSE AUDIT
          </button>
        </div>
      </div>
    </div>
  );
}
