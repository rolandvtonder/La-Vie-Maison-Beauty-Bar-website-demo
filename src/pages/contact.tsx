import type {CSSProperties} from 'react';
import {Button} from '../components/Blocks';
import {Layout} from '../components/Layout';
import {PageHero} from '../components/PageHero';
import {brand, links} from '../content';
import {useReveals} from '../hooks/useReveals';
import {mount} from '../mount';

const d = (ms: number) => ({'--d': `${ms}ms`}) as CSSProperties;

const ways = [
  {k: 'Online', t: 'Book on Fresha', d: 'Choose your treatment and time, with instant confirmation.', href: links.fresha, cta: 'Book now'},
  {k: 'Message', t: `WhatsApp ${brand.whatsapp}`, d: 'Ask a question, check a design or book IV drip and other services not on Fresha.', href: links.whatsapp, cta: 'Send a message'},
  {k: 'Call', t: brand.phone, d: 'Prefer to talk? Give us a call during opening hours.', href: links.phone, cta: 'Call us'},
];

function Contact() {
  const ref = useReveals<HTMLDivElement>();

  return (
    <Layout page="contact">
      <PageHero
        index="06"
        kicker="Book & visit"
        lines={[{t: 'Book'}, {t: '& visit.', i: true}]}
        body={`${brand.address.join(', ')}. Open every day, 9:00 – 18:00, with parking on site.`}
        image="hero-salon.webp"
        alt="The La Vie Maison studio: a cream sofa, a pink chair and a brass-and-white reception counter"
        position="50% 62%"
      />

      <div ref={ref}>
        <section aria-labelledby="ways" className="bg-paper px-5 py-20 md:px-14 md:py-28">
          <h2 id="ways" className="sr-only">
            Ways to book
          </h2>
          <ul className="mx-auto grid max-w-[1680px] gap-3 md:grid-cols-3">
            {ways.map((w, k) => (
              <li key={w.k} data-reveal style={d(k * 100)} className="flex flex-col justify-between gap-10 bg-white/70 p-8 md:p-10">
                <div>
                  <p className="caps text-gold-deep">{w.k}</p>
                  <h3 className="mt-4 font-serif text-[clamp(28px,2.4vw,38px)] leading-tight">{w.t}</h3>
                  <p className="mt-4 text-[16px] leading-relaxed text-ink/75">{w.d}</p>
                </div>
                <div>
                  <Button href={w.href} variant={k === 0 ? 'ink' : 'line'} external={k < 2}>
                    {w.cta}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="find" className="bg-ink text-paper">
          <div className="mx-auto grid max-w-[1680px] lg:grid-cols-[1fr_1.4fr]">
            <div className="px-5 py-20 md:px-14 md:py-28">
              <h2 id="find" data-reveal className="display text-[clamp(44px,5vw,88px)]">
                <span className="block">Find</span>
                <span className="it block pl-[1.2em]">the house</span>
              </h2>
              <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <div data-reveal style={d(80)}>
                  <p className="caps text-gold">Address</p>
                  <address className="mt-3 text-[17px] leading-relaxed not-italic text-paper/85">
                    {brand.address.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </address>
                  <div className="mt-5">
                    <Button href={links.directions} variant="gold" external>
                      Get directions
                    </Button>
                  </div>
                </div>
                <div data-reveal style={d(160)}>
                  <p className="caps text-gold">Opening hours</p>
                  <table className="mt-3 w-full max-w-[320px] text-[17px] text-paper/85">
                    <tbody>
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                        <tr key={day} className="border-b border-paper/10">
                          <th scope="row" className="py-1.5 text-left font-light">
                            {day}
                          </th>
                          <td className="py-1.5 text-right tabular-nums">9:00 – 18:00</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <ul data-reveal style={d(220)} className="mt-12 flex flex-wrap gap-2">
                {brand.perks.map((p) => (
                  <li key={p} className="caps border border-paper/25 px-4 py-2 text-paper/85">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative min-h-[420px] bg-cocoa">
              <iframe
                title="Map showing La Vie Maison Beauty Bar at 5 Glendowner Close, Sunningdale"
                src={links.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 grayscale-[0.5] sepia-[0.25]"
              />
            </div>
          </div>
        </section>

        <section aria-labelledby="follow" className="bg-nude px-5 py-24 md:px-14 md:py-32">
          <div className="mx-auto flex max-w-[1680px] flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
            <h2 id="follow" data-reveal className="display text-[clamp(44px,5.4vw,96px)]">
              <span className="block">Say hello</span>
              <span className="it block pl-[1.2em]">on Instagram</span>
            </h2>
            <div data-reveal>
              <Button href={links.instagram} external>
                Follow {brand.instagramHandle}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

mount(<Contact />);
