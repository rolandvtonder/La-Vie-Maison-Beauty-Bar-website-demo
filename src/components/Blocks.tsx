import type {CSSProperties, ReactNode} from 'react';
import {brand, links, type Review} from '../content';

/** A filled, partially filled or empty star row for a rating out of five. */
export function Stars({value, className = ''}: {value: number; className?: string}) {
  return (
    <span className={`inline-flex gap-1 ${className}`} role="img" aria-label={`${value} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((k) => {
        const fill = Math.max(0, Math.min(1, value - k));
        const id = `star-${k}-${Math.round(value * 10)}`;
        return (
          <svg key={k} viewBox="0 0 24 24" className="size-[1em]" aria-hidden>
            <defs>
              <linearGradient id={id}>
                <stop offset={fill} stopColor="currentColor" />
                <stop offset={fill} stopColor="currentColor" stopOpacity="0.25" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#${id})`}
              d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"
            />
          </svg>
        );
      })}
    </span>
  );
}

export function ReviewCard({r, tone = 'light', delay = 0}: {r: Review; tone?: 'light' | 'dark'; delay?: number}) {
  const dark = tone === 'dark';
  return (
    <figure
      data-reveal
      style={{'--d': `${delay}ms`} as CSSProperties}
      className={`flex break-inside-avoid flex-col justify-between gap-8 p-8 md:p-10 ${dark ? 'bg-paper/[0.04] text-paper' : 'bg-white/70 text-ink'}`}
    >
      <blockquote className="font-serif text-[clamp(21px,1.6vw,26px)] leading-[1.35]">
        <span aria-hidden className="mb-2 block font-serif text-[64px] leading-[0.6] text-gold">
          “
        </span>
        {r.text}
      </blockquote>
      <figcaption className="flex items-end justify-between gap-4">
        <span>
          <span className="caps block">{r.name}</span>
          <span className={`caps block ${dark ? 'text-paper/60' : 'text-ink/60'}`}>{r.service}</span>
        </span>
        <Stars value={5} className="text-[14px] text-gold" />
      </figcaption>
    </figure>
  );
}

export function Button({
  href,
  children,
  variant = 'ink',
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: 'ink' | 'gold' | 'line' | 'paper';
  external?: boolean;
}) {
  const styles = {
    ink: 'bg-ink text-paper hover:bg-gold-deep',
    gold: 'bg-gold text-ink hover:bg-paper',
    paper: 'bg-paper text-ink hover:bg-gold',
    line: 'border border-current hover:bg-ink hover:text-paper hover:border-ink',
  }[variant];
  return (
    <a
      href={href}
      {...(external ? {target: '_blank', rel: 'noopener'} : {})}
      className={`caps inline-flex min-h-12 items-center justify-center gap-3 px-7 transition-colors duration-300 ${styles}`}
    >
      {children}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

/** The closing band on every page: book online, message, or find us. */
export function BookBand({title = ['Your chair', 'is waiting.']}: {title?: [string, string]}) {
  return (
    <section aria-labelledby="book-band" className="relative overflow-hidden bg-nude px-5 py-28 text-ink md:px-14 md:py-36">
      <div className="mx-auto grid max-w-[1680px] items-end gap-12 lg:grid-cols-[1.2fr_1fr]">
        <h2 id="book-band" data-reveal className="display text-[clamp(52px,7vw,124px)]">
          <span className="block">{title[0]}</span>
          <span className="it block pl-[1.2em]">{title[1]}</span>
        </h2>
        <div data-reveal style={{'--d': '150ms'} as CSSProperties}>
          <p className="prose-lv max-w-[460px] text-ink/85">
            Book online on Fresha for instant confirmation, or message us on WhatsApp and we’ll find you a time. Open every day, 9:00 – 18:00.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={links.fresha} external>
              Book on Fresha
            </Button>
            <Button href={links.whatsapp} variant="line" external>
              WhatsApp {brand.whatsapp}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
