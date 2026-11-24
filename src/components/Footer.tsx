import {brand, footerNote, links, nav, socials} from '../content';
import {useFitText} from '../hooks/useFitText';

export function Footer() {
  const word = useFitText<HTMLSpanElement>();

  return (
    <footer className="relative bg-ink text-paper">
      <div className="mx-auto grid max-w-[1680px] gap-12 px-5 pt-24 pb-14 md:grid-cols-2 md:px-14 lg:grid-cols-4">
        <div>
          <p className="caps text-gold">Visit</p>
          <address className="mt-3 text-[16px] leading-relaxed not-italic text-paper/85">
            {brand.address.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
          <a href={links.directions} target="_blank" rel="noopener" className="caps mt-3 inline-block border-b border-gold/60 pb-0.5 text-paper hover:text-gold">
            Get directions
          </a>
        </div>
        <div>
          <p className="caps text-gold">Hours</p>
          <dl className="mt-3 text-[16px] leading-relaxed text-paper/85">
            {brand.hours.map(([d, h]) => (
              <div key={d}>
                <dt>{d}</dt>
                <dd>{h}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <p className="caps text-gold">Book &amp; ask</p>
          <ul className="mt-3 space-y-1 text-[16px] leading-relaxed text-paper/85">
            <li>
              <a href={links.fresha} target="_blank" rel="noopener" className="hover:text-gold">
                Online on Fresha
              </a>
            </li>
            <li>
              <a href={links.whatsapp} target="_blank" rel="noopener" className="hover:text-gold">
                WhatsApp {brand.whatsapp}
              </a>
            </li>
            <li>
              <a href={links.phone} className="hover:text-gold">
                Call {brand.phone}
              </a>
            </li>
          </ul>
        </div>
        <nav aria-label="Footer">
          <p className="caps text-gold">Explore</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-[16px] leading-relaxed text-paper/85">
            {nav.map((n) => (
              <li key={n.key}>
                <a href={n.href} className="hover:text-gold">
                  {n.label}
                </a>
              </li>
            ))}
            {socials
              .filter((s) => s.label === 'Instagram')
              .map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener" className="hover:text-gold">
                    {brand.instagramHandle}
                  </a>
                </li>
              ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto max-w-[1680px] overflow-hidden px-5 md:px-14" aria-hidden>
        <span ref={word} className="display inline-block whitespace-nowrap pb-[0.06em] text-gold/90">
          La Vie <span className="it">Maison</span>
        </span>
      </div>

      <div className="mx-auto flex max-w-[1680px] flex-col gap-2 border-t border-paper/10 px-5 pt-6 pb-28 md:flex-row md:justify-between md:px-14 md:pr-64 md:pb-10">
        <p className="caps text-paper/55">© 2026 {brand.full}</p>
        <p className="caps max-w-[620px] text-paper/55 md:text-right">{footerNote}</p>
      </div>
    </footer>
  );
}
