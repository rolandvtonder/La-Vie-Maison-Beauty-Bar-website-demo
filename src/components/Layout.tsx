import {useCallback, useEffect, useState, type ReactNode} from 'react';
import {brand, links, type PageKey} from '../content';
import {useReducedMotion} from '../hooks/useReducedMotion';
import {media, page as pageUrl} from '../lib/media';
import {lockScroll, scrollToHash, startScroll} from '../lib/scroll';
import {Curtain} from './Curtain';
import {Footer} from './Footer';
import {Menu} from './Menu';

/**
 * Everything every page shares: the logo, the fixed Menu and Book buttons,
 * the slab menu, the page curtain, the footer and the film grain.
 */
export function Layout({page, children}: {page: PageKey; children: ReactNode}) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  useEffect(() => startScroll(reduced), [reduced]);
  useEffect(() => lockScroll(open), [open]);
  // Arriving on /services/#lashes: the browser's own jump happens before the
  // page renders, so glide there once the curtain has started to lift.
  useEffect(() => {
    if (!window.location.hash) return;
    const hash = window.location.hash;
    const t = window.setTimeout(() => scrollToHash(hash), reduced ? 0 : 500);
    return () => window.clearTimeout(t);
  }, [reduced]);

  const close = useCallback(() => {
    setOpen(false);
    document.getElementById('menu-button')?.focus({preventScroll: true});
  }, []);

  return (
    <>
      <a
        href="#main"
        className="caps fixed top-3 left-3 z-[80] -translate-y-24 bg-paper px-4 py-2 text-ink focus:translate-y-0"
      >
        Skip to content
      </a>

      <header className="absolute inset-x-0 top-0 z-40">
        <a href={pageUrl('/')} aria-label={`${brand.full} — home`} className="absolute top-4 left-4 block md:top-6 md:left-12">
          <img src={media('logo-light.png')} alt="" width={900} height={540} className="w-[118px] drop-shadow-[0_2px_14px_rgb(0_0_0/0.35)] md:w-[150px]" />
        </a>
      </header>

      <button
        id="menu-button"
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-controls="site-menu"
        className={`caps fixed top-5 right-5 z-[55] flex min-h-12 cursor-pointer items-center gap-4 px-6 backdrop-blur-md transition-colors duration-500 md:top-7 md:right-8 ${
          open ? 'bg-ink text-paper' : 'bg-ink/55 text-paper hover:bg-ink/75'
        }`}
      >
        {open ? 'Close' : 'Menu'}
        <span aria-hidden className={`text-[18px] leading-none transition-transform duration-500 ease-silk ${open ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>

      <a
        href={links.fresha}
        target="_blank"
        rel="noopener"
        className={`caps fixed right-5 bottom-5 z-[55] flex min-h-12 items-center px-7 shadow-[0_10px_40px_rgb(26_21_18/0.25)] transition-colors duration-500 md:right-8 md:bottom-7 md:px-8 ${
          open ? 'bg-gold text-ink' : 'bg-paper text-ink hover:bg-gold'
        }`}
      >
        Book&nbsp;<em className="font-serif text-[16px] normal-case tracking-normal">now</em>
        <span className="sr-only"> on Fresha (opens in a new tab)</span>
      </a>

      <main id="main">{children}</main>
      <Footer />

      <Menu open={open} page={page} onClose={close} />
      <Curtain reduced={reduced} />
      <div className="grain" aria-hidden />
    </>
  );
}
