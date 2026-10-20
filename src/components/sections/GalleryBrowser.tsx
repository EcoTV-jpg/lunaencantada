"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ImageCategory } from "@/data/images";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { track } from "@/lib/analytics";
import type { ResolvedImage } from "@/lib/images";

interface GalleryBrowserProps {
  images: ResolvedImage[];
  categories: { id: ImageCategory; label: string }[];
}

type Filter = ImageCategory | "all";

/** Photos shown before "Show all": two rows on desktop. */
const INITIAL_COUNT = 8;

export function GalleryBrowser({ images, categories }: GalleryBrowserProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLUListElement>(null);

  const visible = useMemo(
    () => (filter === "all" ? images : images.filter((img) => img.category === filter)),
    [filter, images],
  );
  const collapsed = !expanded && visible.length > INITIAL_COUNT;
  const shown = collapsed ? visible.slice(0, INITIAL_COUNT) : visible;

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
      <div className="-mx-6 mt-6 overflow-x-auto px-6 md:mx-0 md:px-0" role="group" aria-label="Filter photos by room">
        <ul className="flex min-w-max gap-2 pb-1">
          {filters.map((f) => {
            const selected = filter === f.id;
            return (
              <li key={f.id}>
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    setFilter(f.id);
                    setExpanded(false);
                  }}
                  className={`min-h-10 rounded-full border px-4 text-sm font-medium whitespace-nowrap transition-colors ${
                    selected ? "border-ink bg-ink text-white" : "border-deco bg-white text-ink hover:border-ink"
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

      <ul ref={gridRef} className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4">
        {shown.map((image, index) => (
          <li key={image.id}>
            <button
              type="button"
              data-index={index}
              onClick={(e) => open(index, e.currentTarget)}
              aria-label={`Open photo: ${image.caption}`}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-md bg-faint"
            >
              <Photo
                image={image}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                compact
                imageClassName="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </button>
          </li>
        ))}
      </ul>

      {collapsed && (
        <button
          type="button"
          onClick={() => {
            setExpanded(true);
            // Keep keyboard focus in place: move it to the first newly revealed photo.
            requestAnimationFrame(() =>
              gridRef.current?.querySelector<HTMLElement>(`[data-index="${INITIAL_COUNT}"]`)?.focus(),
            );
          }}
          className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-sm border border-ink px-6 text-base font-semibold text-ink transition-colors hover:bg-faint"
        >
          <Icon name="grid" className="size-4" />
          Show all {visible.length} photos
        </button>
      )}

      <dialog
        ref={dialogRef}
        className="lightbox on-dark m-0 h-dvh w-screen bg-black p-0 text-white"
        aria-label="Photo viewer"
        onKeyDown={onDialogKey}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        {current && active !== null && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-4 py-3 sm:px-6">
              <button
                type="button"
                onClick={close}
                autoFocus
                className="inline-flex min-h-10 items-center gap-2 rounded-sm px-3 text-sm font-semibold hover:bg-white/10"
              >
                <Icon name="close" className="size-4" /> Close
              </button>
              <p className="text-sm tabular-nums">
                {active + 1} / {visible.length}
              </p>
              <span className="w-20" aria-hidden="true" />
            </div>

            <figure className="relative flex min-h-0 flex-1 flex-col px-4 pb-6 sm:px-20">
              <div className="relative min-h-0 flex-1">
                {current.available ? (
                  <Photo image={current} sizes="100vw" imageClassName="!object-contain" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative aspect-[3/2] w-full max-w-[min(100%,calc((100dvh-10rem)*1.5))] overflow-hidden rounded-md">
                      <Photo image={current} sizes="100vw" />
                    </div>
                  </div>
                )}
              </div>
              <figcaption className="mt-4 text-center text-sm">{current.caption}</figcaption>
            </figure>

            {visible.length > 1 && (
              <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-2 sm:px-5">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="pointer-events-auto inline-flex size-11 items-center justify-center rounded-full border border-white/40 bg-black/40 hover:bg-white hover:text-ink"
                  aria-label="Previous photo"
                >
                  <Icon name="chevronLeft" className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="pointer-events-auto inline-flex size-11 items-center justify-center rounded-full border border-white/40 bg-black/40 hover:bg-white hover:text-ink"
                  aria-label="Next photo"
                >
                  <Icon name="chevronRight" className="size-5" />
                </button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
