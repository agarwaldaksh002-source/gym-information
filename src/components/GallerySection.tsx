import { Maximize2 } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/fitnessData.ts';
import { GalleryItem } from '../types.ts';
import { SafeImage } from './SafeImage.tsx';

interface GallerySectionProps {
  onOpenLightbox: (item: GalleryItem, index: number) => void;
}

export function GallerySection({ onOpenLightbox }: GallerySectionProps) {
  return (
    <section id="gallery" className="relative w-full py-28 sm:py-36 bg-[#080808] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-20 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-[#C6FF00]" />
              <span className="font-mono text-[11px] font-semibold tracking-[0.3em] text-[#C6FF00] uppercase">
                03 / VISUAL ARCHIVE
              </span>
            </div>
            <h2 className="font-condensed font-black tracking-[-0.03em] text-5xl sm:text-7xl lg:text-8xl text-white uppercase leading-[0.9]">
              THE FITNESS GALLERY
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#A0A0A0] max-w-sm tracking-wide leading-relaxed font-normal">
            Moments captured under raw tension. An editorial campaign of physical intent.
          </p>
        </div>

        {/* Editorial Magazine Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
          {/* Item 1: Large marquee feature, tall (col-span-7) */}
          <div
            onClick={() => onOpenLightbox(GALLERY_ITEMS[0], 0)}
            className="md:col-span-7 relative group aspect-[4/3] md:aspect-auto md:min-h-[560px] overflow-hidden bg-[#121212] cursor-pointer border border-white/[0.08] hover:border-white/30 transition-all duration-500 ease-athletic"
          >
            <SafeImage
              src={GALLERY_ITEMS[0].image}
              alt={GALLERY_ITEMS[0].alt}
              containerClassName="w-full h-full"
              className="transform transition-transform duration-700 ease-athletic group-hover:scale-105 filter brightness-[0.78] group-hover:brightness-[0.95]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-85 group-hover:opacity-65 transition-opacity duration-500" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex items-end justify-between">
              <div>
                <span className="font-mono text-[10px] tracking-[0.25em] text-[#C6FF00] uppercase block mb-1">
                  {GALLERY_ITEMS[0].discipline}
                </span>
                <h3 className="font-condensed font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                  {GALLERY_ITEMS[0].title}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-[#C6FF00] flex items-center justify-center transition-colors duration-300">
                <Maximize2 className="w-4 h-4 text-white group-hover:text-black transition-colors" />
              </div>
            </div>
          </div>

          {/* Right Column: Two stacked items (col-span-5) */}
          <div className="md:col-span-5 flex flex-col gap-4 sm:gap-6">
            {/* Item 2 */}
            <div
              onClick={() => onOpenLightbox(GALLERY_ITEMS[1], 1)}
              className="relative group aspect-[16/10] overflow-hidden bg-[#121212] cursor-pointer border border-white/[0.08] hover:border-white/30 transition-all duration-500 ease-athletic flex-1"
            >
              <SafeImage
                src={GALLERY_ITEMS[1].image}
                alt={GALLERY_ITEMS[1].alt}
                containerClassName="w-full h-full"
                className="transform transition-transform duration-700 ease-athletic group-hover:scale-105 filter brightness-[0.80] group-hover:brightness-[0.95]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-85 group-hover:opacity-65 transition-opacity" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex items-end justify-between">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#C6FF00] uppercase block mb-1">
                    {GALLERY_ITEMS[1].discipline}
                  </span>
                  <h3 className="font-condensed font-bold text-xl text-white uppercase tracking-tight">
                    {GALLERY_ITEMS[1].title}
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#C6FF00] flex items-center justify-center transition-colors">
                  <Maximize2 className="w-3.5 h-3.5 text-white group-hover:text-black" />
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div
              onClick={() => onOpenLightbox(GALLERY_ITEMS[2], 2)}
              className="relative group aspect-[16/10] overflow-hidden bg-[#121212] cursor-pointer border border-white/[0.08] hover:border-white/30 transition-all duration-500 ease-athletic flex-1"
            >
              <SafeImage
                src={GALLERY_ITEMS[2].image}
                alt={GALLERY_ITEMS[2].alt}
                containerClassName="w-full h-full"
                className="transform transition-transform duration-700 ease-athletic group-hover:scale-105 filter brightness-[0.80] group-hover:brightness-[0.95]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-85 group-hover:opacity-65 transition-opacity" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex items-end justify-between">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[#C6FF00] uppercase block mb-1">
                    {GALLERY_ITEMS[2].discipline}
                  </span>
                  <h3 className="font-condensed font-bold text-xl text-white uppercase tracking-tight">
                    {GALLERY_ITEMS[2].title}
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#C6FF00] flex items-center justify-center transition-colors">
                  <Maximize2 className="w-3.5 h-3.5 text-white group-hover:text-black" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: 3 balanced cards (Item 4, 5, 6) */}
          <div
            onClick={() => onOpenLightbox(GALLERY_ITEMS[3], 3)}
            className="md:col-span-4 relative group aspect-[4/3] overflow-hidden bg-[#121212] cursor-pointer border border-white/[0.08] hover:border-white/30 transition-all duration-500 ease-athletic"
          >
            <SafeImage
              src={GALLERY_ITEMS[3].image}
              alt={GALLERY_ITEMS[3].alt}
              containerClassName="w-full h-full"
              className="transform transition-transform duration-700 ease-athletic group-hover:scale-105 filter brightness-[0.80] group-hover:brightness-[0.95]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-85 group-hover:opacity-65 transition-opacity" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex items-end justify-between">
              <div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#C6FF00] uppercase block mb-1">
                  {GALLERY_ITEMS[3].discipline}
                </span>
                <h3 className="font-condensed font-bold text-lg sm:text-xl text-white uppercase tracking-tight">
                  {GALLERY_ITEMS[3].title}
                </h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#C6FF00] flex items-center justify-center transition-colors">
                <Maximize2 className="w-3.5 h-3.5 text-white group-hover:text-black" />
              </div>
            </div>
          </div>

          <div
            onClick={() => onOpenLightbox(GALLERY_ITEMS[4], 4)}
            className="md:col-span-4 relative group aspect-[4/3] overflow-hidden bg-[#121212] cursor-pointer border border-white/[0.08] hover:border-white/30 transition-all duration-500 ease-athletic"
          >
            <SafeImage
              src={GALLERY_ITEMS[4].image}
              alt={GALLERY_ITEMS[4].alt}
              containerClassName="w-full h-full"
              className="transform transition-transform duration-700 ease-athletic group-hover:scale-105 filter brightness-[0.80] group-hover:brightness-[0.95]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-85 group-hover:opacity-65 transition-opacity" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex items-end justify-between">
              <div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#C6FF00] uppercase block mb-1">
                  {GALLERY_ITEMS[4].discipline}
                </span>
                <h3 className="font-condensed font-bold text-lg sm:text-xl text-white uppercase tracking-tight">
                  {GALLERY_ITEMS[4].title}
                </h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#C6FF00] flex items-center justify-center transition-colors">
                <Maximize2 className="w-3.5 h-3.5 text-white group-hover:text-black" />
              </div>
            </div>
          </div>

          <div
            onClick={() => onOpenLightbox(GALLERY_ITEMS[5], 5)}
            className="md:col-span-4 relative group aspect-[4/3] overflow-hidden bg-[#121212] cursor-pointer border border-white/[0.08] hover:border-white/30 transition-all duration-500 ease-athletic"
          >
            <SafeImage
              src={GALLERY_ITEMS[5].image}
              alt={GALLERY_ITEMS[5].alt}
              containerClassName="w-full h-full"
              className="transform transition-transform duration-700 ease-athletic group-hover:scale-105 filter brightness-[0.80] group-hover:brightness-[0.95]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-85 group-hover:opacity-65 transition-opacity" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex items-end justify-between">
              <div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#C6FF00] uppercase block mb-1">
                  {GALLERY_ITEMS[5].discipline}
                </span>
                <h3 className="font-condensed font-bold text-lg sm:text-xl text-white uppercase tracking-tight">
                  {GALLERY_ITEMS[5].title}
                </h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#C6FF00] flex items-center justify-center transition-colors">
                <Maximize2 className="w-3.5 h-3.5 text-white group-hover:text-black" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
