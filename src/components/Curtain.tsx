import {useEffect, useState, type CSSProperties} from 'react';
import {media} from '../lib/media';
import {isInternalPage, registerCurtain} from '../lib/transition';
import {scrollToHash} from '../lib/scroll';

type Phase = 'covered' | 'left' | 'right';

/**
 * The page transition: the menu's three slabs (ink, gold, paper) cover the
 * screen. A new page starts covered and wipes out to the left; clicking a
 * link to another page wipes them back in from the right, then navigates.
 * With reduced motion it does nothing and links behave normally.
 */
export function Curtain({reduced}: {reduced: boolean}) {
  const [phase, setPhase] = useState<Phase>(reduced ? 'right' : 'covered');
  const [animate, setAnimate] = useState(false);

  // Reveal the page: wait two frames so the covered state paints first.
  useEffect(() => {
    if (reduced) return;
    let r2 = 0;
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => {
        setAnimate(true);
        setPhase('left');
      });
    });
    // Park the slabs on the right once they've left, ready for the next cover.
    const park = window.setTimeout(() => {
      setAnimate(false);
      setPhase('right');
    }, 1400);
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
      window.clearTimeout(park);
    };
  }, [reduced]);

  // Coming back via the browser's back button can restore a covered page.
  useEffect(() => {
    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        setAnimate(false);
        setPhase('right');
      }
    };
    window.addEventListener('pageshow', onShow);
    return () => window.removeEventListener('pageshow', onShow);
  }, []);

  useEffect(() => {
    if (reduced) {
      registerCurtain(null);
      return;
    }
    registerCurtain((href) => {
      setAnimate(true);
      setPhase('covered');
      window.setTimeout(() => {
        window.location.href = href;
      }, 820);
    });

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.('a');
      if (!a || !a.href) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin === window.location.origin && url.pathname === window.location.pathname && url.hash) {
        e.preventDefault();
        scrollToHash(url.hash);
        return;
      }
      if (!isInternalPage(a)) return;
      e.preventDefault();
      setAnimate(true);
      setPhase('covered');
      window.setTimeout(() => {
        window.location.href = a.href;
      }, 820);
    };
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
      registerCurtain(null);
    };
  }, [reduced]);

  if (reduced) return null;

  const x = phase === 'covered' ? '0%' : phase === 'left' ? '-104%' : '104%';
  // Covering: ink → gold → paper. Revealing: paper leaves first.
  const delay = (k: number) => (phase === 'covered' ? k * 0.09 : (2 - k) * 0.08);
  const slab = (k: number): CSSProperties => ({
    transform: `translate3d(${x}, 0, 0)`,
    transition: animate ? `transform 760ms var(--ease-wipe) ${delay(k)}s` : 'none',
  });

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-ink" style={slab(0)} />
      <div className="absolute inset-0 bg-gold" style={slab(1)} />
      <div className="absolute inset-0 flex items-center justify-center bg-paper" style={slab(2)}>
        <img src={media('logo-ink.png')} alt="" width={900} height={540} className="w-[min(46vw,300px)]" />
      </div>
    </div>
  );
}
