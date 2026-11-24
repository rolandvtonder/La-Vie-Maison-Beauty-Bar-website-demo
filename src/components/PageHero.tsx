import {useEffect, useRef} from 'react';
import type {Line} from '../content';
import {media} from '../lib/media';
import {clamp} from '../lib/math';
import {onFrame} from '../lib/scroll';
import {Headline} from './Headline';

/**
 * The opening of each inner page: one photograph under the big headline.
 * As you scroll on, the picture blurs, dims and shrinks back — the camera
 * pulling away — exactly like the home page.
 */
export function PageHero({
  index,
  kicker,
  lines,
  body,
  image,
  alt,
  position = 'center',
}: {
  index: string;
  kicker: string;
  lines: Line[];
  body: string;
  image: string;
  alt: string;
  position?: string;
}) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      onFrame(() => {
        const el = root.current;
        const s = stage.current;
        if (!el || !s) return;
        const r = el.getBoundingClientRect();
        const p = clamp(-r.top / r.height);
        s.style.transform = `translate3d(0, ${(p * r.height * 0.45).toFixed(1)}px, 0) scale(${(1 - p * 0.08).toFixed(4)})`;
        s.style.filter = p > 0.01 ? `blur(${(p * 16).toFixed(1)}px) brightness(${(1 - p * 0.5).toFixed(3)})` : 'none';
      }),
    [],
  );

  return (
    <section ref={root} className="relative h-[86svh] min-h-[600px] overflow-hidden bg-ink text-paper">
      <div ref={stage} className="absolute inset-0 origin-center will-change-transform">
        <img
          src={media(image)}
          alt={alt}
          fetchPriority="high"
          className="push absolute inset-0 h-full w-full object-cover"
          style={{objectPosition: position}}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(26_21_18/0.72),rgb(26_21_18/0.25)_60%,rgb(26_21_18/0.1)),linear-gradient(0deg,rgb(26_21_18/0.55),transparent_40%)]" />

        <div className="absolute inset-0 mx-auto flex max-w-[1680px] flex-col justify-end px-5 pb-[clamp(96px,14vh,150px)] md:px-14">
          <p className="caps mb-6 text-gold">
            {index} — {kicker}
          </p>
          <Headline as="h1" lines={lines} className="text-[clamp(56px,8.4vw,150px)] drop-shadow-[0_4px_30px_rgb(0_0_0/0.35)]" />
          <p className="caps mt-8 ml-[clamp(0px,16vw,300px)] max-w-[340px] text-[12.5px] text-paper/90 max-md:ml-0">{body}</p>
        </div>
      </div>
    </section>
  );
}
