import { useState } from 'react';
import { Dumbbell } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
}

export function SafeImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  priority = false
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#121212] ${containerClassName}`}>
      {/* Loading Skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-[#161616] animate-pulse pointer-events-none" />
      )}

      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#0c0c0c] text-neutral-500 p-6 text-center">
          <Dumbbell className="w-8 h-8 text-[#C6FF00] mb-2 opacity-80" />
          <span className="text-xs font-condensed tracking-wider uppercase text-neutral-400">
            {alt || 'Athletic Imagery'}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
        />
      )}
    </div>
  );
}
