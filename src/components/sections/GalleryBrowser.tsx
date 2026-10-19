"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ImageCategory } from "@/data/images";
import { Photo } from "@/components/ui/Photo";
import { track } from "@/lib/analytics";
import type { ResolvedImage } from "@/lib/images";

interface GalleryBrowserProps {
  images: ResolvedImage[];
  categories: { id: ImageCategory; label: string }[];
}

type Filter = ImageCategory | "all";

/** Photos shown before "Show all": the first three editorial rows. */
const INITIAL_COUNT = 7;

/**
 * Editorial rows: each row has its own column split so the grid never
 * reads as a uniform tile wall. Rows repeat in this order.
 */
const ROW_PATTERNS: { cols: string[]; height: string }[] = [
  { cols: ["md:col-span-7", "md:col-span-5"], height: "md:h-[34vw] md:max-h-[34rem]" },
  { cols: ["md:col-span-4", "md:col-span-4", "md:col-span-4"], height: "md:h-[30vw] md:max-h-[28rem]" },
  { cols: ["md:col-span-5", "md:col-span-7"], height: "md:h-[34vw] md:max-h-[34rem]" },
];

function toRows(images: ResolvedImage[]) {
  const rows: { items: { image: ResolvedImage; index: number; col: string }[]; height: string }[] = [];
  let i = 0;
  let p = 0;
  while (i < images.length) {
    const pattern = ROW_PATTERNS[p % ROW_PATTERNS.length];
    const remaining = images.length - i;
    const count = Math.min(pattern.cols.length, remaining);
    const cols =
      count === pattern.cols.length
        ? pattern.cols
        : count === 1
          ? ["md:col-span-12"]
          : ["md:col-span-7", "md:col-span-5"];
    rows.push({
      height: count === 1 ? "md:h-[40vw] md:max-h-[36rem]" : pattern.height,
      items: images.slice(i, i + count).map((image, k) => ({ image, index: i + k, col: cols[k] })),
    });
    i += count;
    p += 1;
  }
  return rows;
}

export function GalleryBrowser({ images, categories }: GalleryBrowserProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? images : images.filter((img) => img.category === filter)),
    [filter, images],
  );
  const collapsed = filter === "all" && !expanded && visible.length > INITIAL_COUNT;
  const shown = collapsed ? visible.slice(0, INITIAL_COUNT) : visible;
  const rows = toRows(shown);
  const gridRef = useRef<HTMLDivElement>(null);

  const open = (index: number, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setActive(index);
    dialogRef.current?.showModal();
    track("view_gallery", { image: visible[index].id, filter });
  };

  const close = useCallback(() => dialogRef.current?.close(), []);

  const step = useCallback(
    (delta: number) => setActive((i) => (i === null ? i : (i + delta + visible.length) % visible.length)),
    [visible.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      setActive(null);
      triggerRef.current?.focus();
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  const onDialogKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };

  const current = active === null ? null : visible[active];
  const filters: { id: Filter; label: string }[] = [{ id: "all", label: "All" }, ...categories];

  return (
    <>
      <div className="mt-12 -mx-5 overflow-x-auto px-5 md:mx-0 md:px-0" role="group" aria-label="Filter photos by room">
        <ul className="flex min-w-max gap-7 border-b border-line">
          {filters.map((f) => {
            const selected = filter === f.id;
            return (
              <li key={f.id}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setFilter(f.id)}
                  className={`-mb-px min-h-11 border-b py-3 text-sm whitespace-nowrap transition-colors ${
                    selected ? "border-ink text-ink" : "border-transparent text-stone hover:text-ink"
                  }`}
                >
                  {f.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="sr-only" aria-live="polite">
        {shown.length} of {visible.length} {visible.length === 1 ? "photo" : "photos"} shown
      </p>

      <div ref={gridRef} className="mt-8 flex flex-col gap-3 md:gap-4">
        {rows.map((row, r) => (
          <div key={`${filter}-${r}`} className={`grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-4 ${row.height}`}>
            {row.items.map(({ image, index, col }, k) => {
              const fullOnMobile = row.items.length !== 2 && k === 0;
              return (
                <button
                  key={image.id}
                  type="button"
                  data-index={index}
                  onClick={(e) => open(index, e.currentTarget)}
                  aria-label={`Open photo: ${image.caption}`}
                  className={`group relative block overflow-hidden bg-shell ${col} ${
                    fullOnMobile ? "col-span-2 aspect-[3/2]" : "aspect-[4/5]"
                  } md:aspect-auto md:h-full`}
                >
                  <Photo
                    image={image}
                    sizes="(min-width: 768px) 58vw, (min-width: 640px) 50vw, 100vw"
                    compact={!fullOnMobile}
                    imageClassName="transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  />
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {collapsed && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => {
              setExpanded(true);
              // Keep keyboard focus in place: move it to the first newly revealed photo.
              requestAnimationFrame(() =>
                gridRef.current?.querySelector<HTMLElement>(`[data-index="${INITIAL_COUNT}"]`)?.focus(),
              );
            }}
            className="inline-flex min-h-12 items-center gap-3 border border-ink/25 px-7 text-[0.9375rem] font-medium text-ink transition-colors hover:border-ink"
          >
            Show all {visible.length} photos
          </button>
        </div>
      )}

      <dialog
        ref={dialogRef}
        className="lightbox on-dark m-0 h-dvh w-screen bg-[#0e2024] p-0 text-paper"
        aria-label="Photo viewer"
        onKeyDown={onDialogKey}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        {current && active !== null && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-5 py-4 sm:px-8">
              <p className="text-sm text-foam tabular-nums">
                {active + 1} / {visible.length}
              </p>
              <button
                type="button"
                onClick={close}
                autoFocus
                className="inline-flex min-h-11 items-center gap-2 px-2 text-sm text-paper hover:text-sand"
              >
                Close <span aria-hidden="true">✕</span>
              </button>
            </div>

            <figure className="relative flex min-h-0 flex-1 flex-col px-5 pb-6 sm:px-20">
              <div className="relative min-h-0 flex-1">
                {current.available ? (
                  <Photo image={current} sizes="100vw" imageClassName="!object-contain" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative aspect-[3/2] w-full max-w-[min(100%,calc((100dvh-10rem)*1.5))]">
                      <Photo image={current} sizes="100vw" />
                    </div>
                  </div>
                )}
              </div>
              <figcaption className="mt-4 text-center font-serif text-xl italic text-paper">{current.caption}</figcaption>
            </figure>

            {visible.length > 1 && (
              <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-2 sm:px-4">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="pointer-events-auto inline-flex size-12 items-center justify-center text-2xl text-paper hover:text-sand"
                  aria-label="Previous photo"
                >
                  <span aria-hidden="true">←</span>
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="pointer-events-auto inline-flex size-12 items-center justify-center text-2xl text-paper hover:text-sand"
                  aria-label="Next photo"
                >
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
