import {useCallback, useEffect, useMemo, useRef, useState, type CSSProperties} from 'react';
import {BookBand, Button} from '../components/Blocks';
import {Layout} from '../components/Layout';
import {PageHero} from '../components/PageHero';
import {brand, links} from '../content';
import {galleryAlt, galleryCats, shots, type GalleryCat} from '../gallery';
import {useReveals} from '../hooks/useReveals';
import {media} from '../lib/media';
import {lockScroll} from '../lib/scroll';
import {mount} from '../mount';

/** Full-screen viewer with previous / next, keyboard arrows and Escape. */
function Lightbox({list, index, onClose, onMove}: {list: typeof shots; index: number; onClose: () => void; onMove: (d: number) => void}) {
  const closeBtn = useRef<HTMLButtonElement>(null);
  const s = list[index];

  useEffect(() => {
    lockScroll(true);
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onMove(1);
      if (e.key === 'ArrowLeft') onMove(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      lockScroll(false);
    };
  }, [onClose, onMove]);

  return (
    <div role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-[65] flex flex-col bg-ink/95 text-paper backdrop-blur-sm">
      <div className="flex items-center justify-between px-5 py-4 md:px-8">
        <p className="caps text-paper/70" aria-live="polite">
          {index + 1} / {list.length}
        </p>
        <button ref={closeBtn} type="button" onClick={onClose} className="caps flex min-h-12 cursor-pointer items-center gap-3 px-4 hover:text-gold">
          Close <span aria-hidden className="rotate-45 text-[18px]">+</span>
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-16 pb-6 md:px-24">
        <img key={s.src} src={media(`gallery/${s.src}`)} alt={galleryAlt[s.cat]} width={s.w} height={s.h} className="max-h-full max-w-full object-contain" />
        <button
          type="button"
          onClick={() => onMove(-1)}
          aria-label="Previous photo"
          className="absolute top-1/2 left-2 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center text-[26px] hover:text-gold md:left-6"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => onMove(1)}
          aria-label="Next photo"
          className="absolute top-1/2 right-2 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center text-[26px] hover:text-gold md:right-6"
        >
          →
        </button>
      </div>
    </div>
  );
}

function Gallery() {
  const ref = useReveals<HTMLDivElement>();
  const [cat, setCat] = useState<GalleryCat | 'all'>('all');
  const [open, setOpen] = useState(-1);
  const list = useMemo(() => (cat === 'all' ? shots : shots.filter((s) => s.cat === cat)), [cat]);
  const lastFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(-1);
    lastFocus.current?.focus({preventScroll: true});
  }, []);
  const move = useCallback((d: number) => setOpen((i) => (i + d + list.length) % list.length), [list.length]);

  return (
    <Layout page="gallery">
      <PageHero
        index="03"
        kicker="Gallery"
        lines={[{t: 'Our'}, {t: 'work.', i: true}]}
        body="A look at recent sets, pedicures, lashes and glam from the studio. Follow along on Instagram for what’s new this week."
        image="hero-lashes.webp"
        alt="A client with eyes closed showing a full set of soft, wispy lashes"
        position="50% 30%"
      />

      <div ref={ref} className="bg-paper">
        <div className="mx-auto max-w-[1680px] px-5 py-16 md:px-14 md:py-24">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div role="group" aria-label="Filter photos" className="flex flex-wrap gap-2">
              {galleryCats.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={cat === c.id}
                  onClick={() => setCat(c.id)}
                  className={`caps min-h-11 cursor-pointer border px-4 transition-colors duration-300 ${
                    cat === c.id ? 'border-ink bg-ink text-paper' : 'border-ink/25 text-ink hover:border-ink'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <p className="caps text-ink/60" aria-live="polite">
              {list.length} photos
            </p>
          </div>

          <ul className="mt-10 columns-2 gap-3 md:columns-3 xl:columns-4">
            {list.map((s, k) => (
              <li key={s.src} className="mb-3 break-inside-avoid" data-reveal style={{'--d': `${(k % 4) * 70}ms`} as CSSProperties}>
                <button
                  type="button"
                  onClick={(e) => {
                    lastFocus.current = e.currentTarget;
                    setOpen(k);
                  }}
                  className="group block w-full cursor-zoom-in overflow-hidden bg-blush"
                  aria-label={`Open photo ${k + 1}: ${galleryAlt[s.cat]}`}
                >
                  <img
                    src={media(`gallery/${s.src}`)}
                    alt=""
                    width={s.w}
                    height={s.h}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full transition-transform duration-[1200ms] ease-silk group-hover:scale-[1.04]"
                  />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-16 flex flex-col items-start gap-6 border-t border-ink/10 pt-12 md:flex-row md:items-center md:justify-between">
            <p className="display text-[clamp(34px,3.4vw,56px)]">
              More on <span className="it">Instagram</span>
            </p>
            <Button href={links.instagram} external>
              Follow {brand.instagramHandle}
            </Button>
          </div>
        </div>
        <BookBand title={['Love what', 'you see?']} />
      </div>

      {open >= 0 && <Lightbox list={list} index={open} onClose={close} onMove={move} />}
    </Layout>
  );
}

mount(<Gallery />);
