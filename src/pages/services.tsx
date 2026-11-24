import type {CSSProperties} from 'react';
import {BookBand, Button} from '../components/Blocks';
import {Layout} from '../components/Layout';
import {PageHero} from '../components/PageHero';
import {askUs, categories, links, type Service} from '../content';
import {useReveals} from '../hooks/useReveals';
import {media} from '../lib/media';
import {mount} from '../mount';

const rand = (n: number) => `R${n}`;

function Row({s}: {s: Service}) {
  return (
    <li className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 border-b border-ink/10 py-5">
      <div>
        <p className="font-serif text-[23px] leading-tight">{s.n}</p>
        <p className="caps mt-1 text-ink/60">{s.d}</p>
        {s.info && <p className="mt-2 max-w-[520px] text-[15px] leading-relaxed text-ink/70">{s.info}</p>}
      </div>
      <p className="text-right">
        <span className="font-serif text-[24px] leading-tight">
          {s.from && <span className="caps mr-1.5 align-middle text-ink/60">from</span>}
          {rand(s.p)}
        </span>
        {s.was && (
          <span className="caps block text-ink/50">
            <span className="sr-only">usually </span>
            <s>{rand(s.was)}</s>
          </span>
        )}
      </p>
    </li>
  );
}

function Services() {
  const ref = useReveals<HTMLDivElement>();

  return (
    <Layout page="services">
      <PageHero
        index="02"
        kicker="Services & prices"
        lines={[{t: 'The'}, {t: 'menu.', i: true}]}
        body="Nails, manicures, pedicures, lashes, brows, makeup, hair and massage. Prices are our Fresha online prices — book any treatment for instant confirmation."
        image="hero-nails.webp"
        alt="Freshly done pink and white nails holding a glass of orange juice"
        position="50% 60%"
      />

      <div ref={ref}>
        {/* Category index — sticks under the top of the screen while you read */}
        <nav aria-label="Service categories" className="sticky top-0 z-30 border-b border-ink/10 bg-paper/90 backdrop-blur-md">
          <ul className="mx-auto flex max-w-[1680px] gap-1 overflow-x-auto px-5 py-3 pr-40 [scrollbar-width:none] md:px-14 md:pr-48">
            {categories.map((c) => (
              <li key={c.id} className="shrink-0">
                <a href={`#${c.id}`} className="caps flex min-h-11 items-center px-3 text-ink/75 hover:text-gold-deep">
                  {c.title[0].replace(' &', '')}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="bg-paper px-5 md:px-14">
          {categories.map((c, ci) => (
            <section
              key={c.id}
              id={c.id}
              aria-labelledby={`${c.id}-t`}
              className="mx-auto grid max-w-[1680px] scroll-mt-24 gap-10 border-b border-ink/10 py-20 md:py-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20"
            >
              <div className="lg:sticky lg:top-24 lg:self-start">
                <p data-reveal className="caps text-gold-deep">
                  {String(ci + 1).padStart(2, '0')}
                </p>
                <h2 id={`${c.id}-t`} data-reveal className="display mt-4 text-[clamp(46px,5vw,88px)]">
                  <span className="block">{c.title[0]}</span>
                  <span className="it block pl-[1.2em]">{c.title[1]}</span>
                </h2>
                <p data-reveal className="prose-lv mt-6 max-w-[440px] text-ink/80">
                  {c.intro}
                </p>
                <img
                  data-reveal
                  src={media(c.image)}
                  alt={c.alt}
                  loading="lazy"
                  className="mt-8 aspect-[4/3] w-full max-w-[520px] object-cover max-lg:hidden"
                />
                <div data-reveal className="mt-8">
                  <Button href={links.fresha} external>
                    Book {c.title[0].replace(' &', '').toLowerCase()}
                  </Button>
                </div>
              </div>

              <div className="space-y-12">
                {c.groups.map((g, gi) => (
                  <div key={g.name ?? gi} data-reveal style={{'--d': `${gi * 60}ms`} as CSSProperties}>
                    {g.name && <h3 className="caps border-b border-ink/25 pb-3 text-ink">{g.name}</h3>}
                    <ul>
                      {g.items.map((s) => (
                        <Row key={s.n + s.d} s={s} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <section aria-labelledby="ask" className="mx-auto grid max-w-[1680px] gap-8 py-20 md:py-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            <h2 id="ask" data-reveal className="display text-[clamp(40px,4vw,68px)]">
              <span className="block">Also</span>
              <span className="it block pl-[1.2em]">ask us about</span>
            </h2>
            <div data-reveal>
              <ul className="flex flex-wrap gap-2">
                {askUs.map((a) => (
                  <li key={a} className="caps border border-ink/25 px-4 py-2">
                    {a}
                  </li>
                ))}
              </ul>
              <p className="prose-lv mt-6 max-w-[560px] text-ink/80">
                These aren’t bookable online yet. Send us a WhatsApp and we’ll share prices and find you a time.
              </p>
              <div className="mt-6">
                <Button href={links.whatsapp} variant="line" external>
                  Ask on WhatsApp
                </Button>
              </div>
              <p className="caps mt-10 text-ink/55">
                Prices are Fresha online-booking prices and may change; the original price is shown struck through.
              </p>
            </div>
          </section>
        </div>

        <BookBand title={['Found your', 'treatment?']} />
      </div>
    </Layout>
  );
}

mount(<Services />);
