import type {CSSProperties} from 'react';
import {BookBand, Button, ReviewCard, Stars} from '../components/Blocks';
import {Headline} from '../components/Headline';
import {HomeHero} from '../components/HomeHero';
import {Layout} from '../components/Layout';
import {Signatures} from '../components/Signatures';
import {brand, home, links, reviews} from '../content';
import {useReducedMotion} from '../hooks/useReducedMotion';
import {useReveals} from '../hooks/useReveals';
import {media, page} from '../lib/media';
import {mount} from '../mount';

function Home() {
  const reduced = useReducedMotion();
  const ref = useReveals<HTMLDivElement>();

  return (
    <Layout page="home">
      <HomeHero reduced={reduced} />
      <Signatures />

      <div ref={ref}>
        {/* The house */}
        <section aria-labelledby="house" className="bg-paper px-5 py-28 md:px-14 md:py-40">
          <div className="mx-auto grid max-w-[1680px] gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
            <div>
              <p data-reveal className="caps text-gold-deep">
                {home.statement.kicker}
              </p>
              <div id="house" data-reveal style={{'--d': '80ms'} as CSSProperties}>
                <Headline lines={home.statement.lines} className="mt-6 text-[clamp(40px,6.4vw,112px)]" />
              </div>
              <div className="mt-12 max-w-[520px] space-y-5 lg:ml-[clamp(0px,8vw,140px)]">
                {home.statement.body.map((p, k) => (
                  <p key={k} data-reveal style={{'--d': `${160 + k * 80}ms`} as CSSProperties} className="prose-lv text-ink/85">
                    {p}
                  </p>
                ))}
                <div data-reveal style={{'--d': '320ms'} as CSSProperties} className="flex flex-wrap gap-3 pt-4">
                  <Button href={page("/about/")}>Our story</Button>
                  <Button href={page("/services/")} variant="line">
                    Services &amp; prices
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-[1.4fr_1fr] items-end gap-3">
              <img
                data-reveal
                src={media('about-studio.webp')}
                alt="A pedicure in progress in the La Vie Maison studio"
                loading="lazy"
                className="aspect-[3/5] w-full object-cover"
              />
              <div className="space-y-3">
                <img
                  data-reveal
                  style={{'--d': '120ms'} as CSSProperties}
                  src={media('gallery/nails-45.webp')}
                  alt="Green and gold French nails"
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
                <p data-reveal style={{'--d': '200ms'} as CSSProperties} className="caps text-ink/60">
                  {brand.motto.join(' · ')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Kind words */}
        <section aria-labelledby="kind" className="bg-ink px-5 py-28 text-paper md:px-14 md:py-36">
          <div className="mx-auto max-w-[1680px]">
            <div className="flex flex-wrap items-end justify-between gap-8">
              <h2 id="kind" data-reveal className="display text-[clamp(48px,6vw,104px)]">
                <span className="block">Kind</span>
                <span className="it block pl-[1.2em]">words.</span>
              </h2>
              <div data-reveal className="text-right max-md:text-left">
                <p className="font-serif text-[64px] leading-none text-gold">{brand.rating.value}</p>
                <Stars value={4.7} className="mt-2 text-[18px] text-gold" />
                <p className="caps mt-2 text-paper/70">From {brand.rating.count} reviews on Fresha</p>
              </div>
            </div>
            <div className="mt-16 grid gap-3 md:grid-cols-3">
              {reviews.slice(0, 3).map((r, k) => (
                <ReviewCard key={r.name} r={r} tone="dark" delay={k * 90} />
              ))}
            </div>
            <div data-reveal className="mt-10 flex flex-wrap gap-3">
              <Button href={page("/reviews/")} variant="gold">
                More reviews
              </Button>
              <Button href={links.freshaReviews} variant="line" external>
                Read all on Fresha
              </Button>
            </div>
          </div>
        </section>

        <BookBand />
      </div>
    </Layout>
  );
}

mount(<Home />);
