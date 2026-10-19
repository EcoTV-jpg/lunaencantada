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

const tones: Record<PlaceholderTone, { sky: string; ground: string; horizon: string; text: string }> = {
  horizon: { sky: "bg-mist", ground: "bg-sand/70", horizon: "top-[58%]", text: "text-ink/70" },
  water: { sky: "bg-[#cfe3de]", ground: "bg-[#b8d5cf]", horizon: "top-[46%]", text: "text-ink/70" },
  sand: { sky: "bg-[#f0e9de]", ground: "bg-sand", horizon: "top-[64%]", text: "text-ink/70" },
  interior: { sky: "bg-[#ede6da]", ground: "bg-[#e3d9c8]", horizon: "top-[72%]", text: "text-ink/70" },
};

function PhotoPlaceholder({ image, className, compact }: { image: PhotoData; className: string; compact?: boolean }) {
  const tone = tones[image.tone];
  return (
    <div
      role="img"
      aria-label={`Photo coming soon: ${image.alt}`}
      className={`absolute inset-0 overflow-hidden ${tone.sky} ${className}`}
      data-placeholder={image.src}
    >
      <div className={`absolute inset-x-0 bottom-0 ${tone.horizon} ${tone.ground}`} />
      <div className={`absolute inset-x-0 ${tone.horizon} h-px bg-ink/15`} />
      <div className={`absolute ${compact ? "bottom-3 left-3" : "bottom-5 left-5"} ${tone.text}`} aria-hidden="true">
        <p className="eyebrow !text-[0.625rem]">Photo coming soon</p>
        <p className={`mt-1 font-serif italic leading-snug ${compact ? "text-base" : "text-lg"}`}>{image.caption}</p>
        {process.env.NODE_ENV === "development" && (
          <p className="mt-1 font-mono text-[10px] opacity-70">{image.src}</p>
        )}
      </div>
    </div>
  );
}
