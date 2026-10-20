import Image from "next/image";
import type { PlaceholderTone } from "@/data/images";

export interface PhotoData {
  src: string;
  alt: string;
  caption: string;
  tone: PlaceholderTone;
  available: boolean;
  focus?: string;
}

interface PhotoProps {
  image: PhotoData;
  /** Responsive `sizes` hint — required for correct srcset selection. */
  sizes: string;
  /** Only for the single LCP image on the page. */
  preload?: boolean;
  className?: string;
  imageClassName?: string;
  /** Visual-only placeholder label size. */
  compact?: boolean;
}

/**
 * Fills its (positioned, sized) parent. Renders the real photograph when
 * it exists in /public, otherwise a neutral, clearly labelled placeholder
 * — never unrelated stock imagery.
 */
export function Photo({ image, sizes, preload, className = "", imageClassName = "", compact }: PhotoProps) {
  if (image.available) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        preload={preload}
        fetchPriority={preload ? "high" : undefined}
        loading={preload ? "eager" : "lazy"}
        quality={preload ? 85 : 75}
        className={`object-cover ${imageClassName} ${className}`}
        style={image.focus ? { objectPosition: image.focus } : undefined}
      />
    );
  }

  return <PhotoPlaceholder image={image} className={className} compact={compact} />;
}

const tones: Record<PlaceholderTone, string> = {
  horizon: "bg-faint",
  water: "bg-faint",
  sand: "bg-faint",
  interior: "bg-faint",
};

function PhotoPlaceholder({ image, className, compact }: { image: PhotoData; className: string; compact?: boolean }) {
  return (
    <div
      role="img"
      aria-label={`Photo coming soon: ${image.alt}`}
      className={`absolute inset-0 flex items-end overflow-hidden ${tones[image.tone]} ${className}`}
      data-placeholder={image.src}
    >
      <div className={compact ? "p-3" : "p-5"} aria-hidden="true">
        <p className="text-xs font-semibold text-muted">Photo coming soon</p>
        <p className={`mt-0.5 text-ink ${compact ? "text-sm" : "text-base"}`}>{image.caption}</p>
        {process.env.NODE_ENV === "development" && (
          <p className="mt-1 font-mono text-[10px] text-muted">{image.src}</p>
        )}
      </div>
    </div>
  );
}
