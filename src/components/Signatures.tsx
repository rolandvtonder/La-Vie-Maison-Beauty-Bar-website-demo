import {useEffect, useRef, useState, type CSSProperties} from 'react';
import {signatures} from '../content';
import {media, page} from '../lib/media';

/**
 * The signature services: four tall panels slide in from the right one after
 * another, each a photograph of the work with its name and starting price.
 * Each panel opens that section of the price list.
 */
export function Signatures() {
  const root = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShown(true), {threshold: 0.2});
    io.observe(root.current!);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={root} id="signatures" aria-labelledby="sig-title" className="relative bg-ink">
      <h2 id="sig-title" className="sr-only">
        Signature services
      </h2>
      <div className="grid h-svh min-h-[640px] grid-cols-4 gap-[3px] overflow-hidden max-lg:h-auto max-lg:grid-cols-2 max-sm:grid-cols-1">
        {signatures.map((b, i) => (
          <a
            key={b.id}
            href={page(`/services/#${b.id}`)}
            className={`group relative block overflow-hidden transition-transform duration-[1100ms] ease-wipe max-lg:h-[78svh] max-lg:min-h-[520px] ${
              shown ? 'translate-x-0' : 'translate-x-[calc(100%_+_100vw)]'
            }`}
            style={{transitionDelay: `${0.1 + i * 0.14}s`, background: b.tint} as CSSProperties}
          >
            <img
              src={media(b.image)}
              alt={b.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-silk group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(26_21_18/0.62),transparent_38%,transparent_60%,rgb(26_21_18/0.6))]" />
            <div className="relative flex h-full flex-col justify-between p-7 pt-24 text-paper md:p-9 md:pt-28">
              <div>
                <p className="caps text-gold">0{i + 1}</p>
                <h3 className="display mt-3 text-[clamp(36px,2.5vw,50px)]">
                  <span className="block">{b.name[0]}</span>
                  <span className="it block">{b.name[1]}</span>
                </h3>
              </div>
              <div className={`transition-opacity delay-[1300ms] duration-700 ${shown ? 'opacity-100' : 'opacity-0'}`}>
                <dl className="space-y-3">
                  {b.specs.map(([k, v]) => (
                    <div key={k}>
                      <dt className="caps text-paper/70">{k}</dt>
                      <dd className="font-serif text-[22px] leading-tight">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="caps mt-6 inline-flex items-center gap-3 border-b border-gold/70 pb-1">
                  See prices
                  <span aria-hidden className="transition-transform duration-500 ease-silk group-hover:translate-x-1.5">
                    →
                  </span>
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
