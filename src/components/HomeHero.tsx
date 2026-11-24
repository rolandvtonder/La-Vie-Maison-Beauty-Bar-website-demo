import {useEffect, useRef, useState} from 'react';
import {home} from '../content';
import {media} from '../lib/media';
import {clamp} from '../lib/math';
import {onFrame} from '../lib/scroll';
import {Headline} from './Headline';

const SLIDES = [
  {src: 'hero-glam.webp', pos: '50% 22%'},
  {src: 'hero-salon.webp', pos: '50% 60%'},
  {src: 'hero-nails.webp', pos: '50% 55%'},
  {src: 'hero-lashes.webp', pos: '50% 30%'},
];
const HOLD = 6500;

/**
 * The home opening: the studio's own photographs cross-fade under a slow
 * cinematic push (the stand-in for UPDRAFT's looping film), with the
 * headline over them. Scrolling on blurs, dims and shrinks the stage back.
 * With reduced motion it shows one still photo.
 */
export function HomeHero({reduced}: {reduced: boolean}) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const still = reduced;

  useEffect(() => {
    if (still) return;
    const t = window.setTimeout(() => setI((n) => (n + 1) % SLIDES.length), HOLD);
    return () => window.clearTimeout(t);
  }, [i, still]);

  useEffect(
    () =>
      onFrame(() => {
        const el = root.current;
        const s = stage.current;
        if (!el || !s) return;
        const r = el.getBoundingClientRect();
        const h = window.innerHeight;
        const p = clamp(-r.top / h);
        s.style.transform = `translate3d(0, ${(p * h * 0.5).toFixed(1)}px, 0) scale(${(1 - p * 0.08).toFixed(4)})`;
        s.style.filter = p > 0.01 ? `blur(${(p * 18).toFixed(1)}px) brightness(${(1 - p * 0.5).toFixed(3)})` : 'none';
      }),
    [],
  );

  return (
    <section ref={root} id="top" className="relative h-svh min-h-[640px] overflow-hidden bg-ink text-paper">
      <div ref={stage} className="absolute inset-0 origin-center will-change-transform">
        {SLIDES.map((s, k) => {
          // The outgoing slide keeps its push while it fades; a slide that is
          // neither current nor outgoing drops the class, so the push restarts
          // from the beginning the next time it comes round.
          const prev = (i - 1 + SLIDES.length) % SLIDES.length;
          const pushing = !still && (k === i || k === prev);
          return (
            <img
              key={s.src}
              src={media(s.src)}
              alt={k === i ? home.heroAlt[k] : ''}
              aria-hidden={k !== i}
              fetchPriority={k === 0 ? 'high' : 'low'}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ease-silk ${
                k === i ? 'opacity-100' : 'opacity-0'
              } ${pushing ? 'push' : ''}`}
              style={{objectPosition: s.pos}}
            />
          );
        })}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(26_21_18/0.7),rgb(26_21_18/0.2)_62%,transparent),linear-gradient(0deg,rgb(26_21_18/0.5),transparent_45%)]" />

        <div className="absolute inset-0 mx-auto max-w-[1680px] px-5 pt-[clamp(150px,22vh,230px)] md:px-14">
          <h1 className="sr-only">La Vie Maison Beauty Bar — nails, lashes, brows and beauty in Sunningdale, Cape Town</h1>
          <Headline
            as="p"
            lines={home.lines}
            className="text-[clamp(50px,7.4vw,134px)] drop-shadow-[0_4px_30px_rgb(0_0_0/0.35)]"
          />
          <p className="caps mt-10 ml-[clamp(0px,19vw,330px)] max-w-[330px] text-[12.5px] text-paper/90 max-md:ml-0">{home.body}</p>
        </div>
      </div>

    </section>
  );
}
