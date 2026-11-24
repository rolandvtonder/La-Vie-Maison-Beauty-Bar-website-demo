import {useEffect, useRef, useState, type CSSProperties} from 'react';
import {brand, links, nav, socials, type PageKey} from '../content';
import {go} from '../lib/transition';

/**
 * The menu: three slabs wipe in from the right one after another
 * (ink, gold, paper); the paper one stays and holds the items. Hovering an
 * item ripples it like silk catching the light — an SVG turbulence +
 * displacement filter whose strength and phase are animated per frame.
 */
export function Menu({open, page, onClose}: {open: boolean; page: PageKey; onClose: () => void}) {
  const [hover, setHover] = useState(-1);
  const turb = useRef<SVGFETurbulenceElement>(null);
  const disp = useRef<SVGFEDisplacementMapElement>(null);
  const first = useRef<HTMLAnchorElement>(null);

  // Animate the ripple only while something is hovered.
  useEffect(() => {
    if (hover < 0) return;
    let raf = 0;
    let t = 0;
    let amp = 0;
    const loop = () => {
      t += 0.016;
      amp = Math.min(1, amp + 0.08);
      turb.current?.setAttribute('baseFrequency', `${(0.012 + Math.sin(t * 2.1) * 0.004).toFixed(4)} ${(0.06 + Math.cos(t * 1.7) * 0.02).toFixed(4)}`);
      turb.current?.setAttribute('seed', String(Math.floor(t * 12) % 50));
      disp.current?.setAttribute('scale', (amp * 8).toFixed(2));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [hover]);

  useEffect(() => {
    if (!open) {
      setHover(-1);
      return;
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    // Move focus into the menu once the paper slab has arrived.
    const t = window.setTimeout(() => first.current?.focus({preventScroll: true}), 450);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  const slab = (extra: string) =>
    `absolute inset-y-0 right-0 w-[min(34vw,480px)] max-md:w-full transition-transform duration-[800ms] ease-wipe ${extra} ${
      open ? 'translate-x-0' : 'translate-x-[104%]'
    }`;
  // Open: ink → gold → paper, staggered. Close: the reverse, faster.
  const delay = (k: number): CSSProperties => ({transitionDelay: `${open ? k * 0.09 : (2 - k) * 0.06}s`});

  return (
    <div id="site-menu" inert={!open} className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <svg className="absolute size-0" aria-hidden>
        <filter id="ripple" x="-5%" y="-30%" width="110%" height="160%">
          <feTurbulence ref={turb} type="fractalNoise" baseFrequency="0.012 0.06" numOctaves="2" seed="2" result="n" />
          <feDisplacementMap ref={disp} in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Click-away */}
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={-1}
        onClick={onClose}
        className={`absolute inset-0 cursor-default bg-ink/30 transition-opacity duration-700 ${open ? 'opacity-100' : 'opacity-0'}`}
      />

      <div className={slab('bg-ink')} style={delay(0)} />
      <div className={slab('bg-gold')} style={delay(1)} />
      <nav
        className={slab('flex flex-col justify-between overflow-y-auto bg-paper px-8 pt-24 pb-8 text-ink md:px-11')}
        style={delay(2)}
        aria-label="Main menu"
      >
        <ul onMouseLeave={() => setHover(-1)}>
          {nav.map((item, i) => {
            const current = item.key === page;
            return (
              <li
                key={item.key}
                className={`transition-[opacity,transform] duration-700 ease-silk ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                style={{transitionDelay: open ? `${0.42 + i * 0.06}s` : '0s'} as CSSProperties}
              >
                <a
                  ref={i === 0 ? first : undefined}
                  href={item.href}
                  aria-current={current ? 'page' : undefined}
                  onMouseEnter={() => setHover(i)}
                  onFocus={() => setHover(i)}
                  onClick={(e) => {
                    e.preventDefault();
                    if (current) onClose();
                    else go(item.href);
                  }}
                  className={`display relative inline-block py-1 text-[clamp(34px,3.3vw,50px)] transition-opacity duration-300 ${
                    hover >= 0 && hover !== i ? 'opacity-35' : 'opacity-100'
                  }`}
                  style={{filter: hover === i ? 'url(#ripple)' : 'none'}}
                >
                  {current ? <span className="it text-gold-deep">{item.label}</span> : item.label}
                  <sup className="caps absolute -right-7 top-2 text-[9px] tracking-normal text-ink/45">0{i + 1}</sup>
                </a>
              </li>
            );
          })}
        </ul>

        <div className={`mt-10 space-y-6 transition-opacity delay-700 duration-700 ${open ? 'opacity-100' : 'opacity-0'}`}>
          <div>
            <p className="caps text-ink/55">Visit</p>
            <p className="mt-1 text-[15px] leading-relaxed">
              {brand.address.join(', ')}
              <br />
              Open daily, 9:00 – 18:00
            </p>
          </div>
          <div>
            <p className="caps text-ink/55">Follow &amp; book</p>
            <div className="mt-1 flex flex-wrap gap-x-5 gap-y-1">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener" className="caps text-ink/85 hover:text-gold-deep">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
          <a
            href={links.fresha}
            target="_blank"
            rel="noopener"
            className="caps inline-flex min-h-12 items-center bg-ink px-7 text-paper transition-colors duration-300 hover:bg-gold-deep"
          >
            Book on&nbsp;<em className="font-serif text-[16px] normal-case tracking-normal">Fresha</em>
          </a>
        </div>
      </nav>
    </div>
  );
}
