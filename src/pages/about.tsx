import type {CSSProperties} from 'react';
import {BookBand, Button} from '../components/Blocks';
import {Layout} from '../components/Layout';
import {PageHero} from '../components/PageHero';
import {about, brand, home} from '../content';
import {useReveals} from '../hooks/useReveals';
import {media, page} from '../lib/media';
import {mount} from '../mount';

const d = (ms: number) => ({'--d': `${ms}ms`}) as CSSProperties;

function About() {
  const ref = useReveals<HTMLDivElement>();

  return (
    <Layout page="about">
      <PageHero
        index="04"
        kicker="About & team"
        lines={about.lines}
        body={`${brand.tagline}. A woman-owned beauty bar in Sunningdale, Cape Town.`}
        image="hero-lounge.webp"
        alt={home.heroAlt[0]}
        position="50% 55%"
      />

      <div ref={ref}>
        {/* Story */}
        <section aria-labelledby="story" className="bg-paper px-5 py-28 md:px-14 md:py-40">
          <div className="mx-auto grid max-w-[1680px] items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <p data-reveal className="caps text-gold-deep">
                Our story
              </p>
              <h2 id="story" data-reveal style={d(80)} className="display mt-6 text-[clamp(44px,5.4vw,96px)]">
                <span className="block">Look good,</span>
                <span className="it block pl-[1.2em]">feel good,</span>
                <span className="block">be you.</span>
              </h2>
              <p data-reveal style={d(160)} className="prose-lv mt-10 max-w-[540px] text-ink/85">
                {about.body}
              </p>
              <p data-reveal style={d(220)} className="prose-lv mt-5 max-w-[540px] text-ink/85">
                {home.statement.body[1]}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img data-reveal src={media('hero-reception.webp')} alt="The reception counter and gel polish wall" loading="lazy" className="row-span-2 aspect-[3/5] h-full w-full object-cover" />
              <img data-reveal style={d(120)} src={media('about-lash-treatment.webp')} alt="A lash treatment in progress in the treatment room" loading="lazy" className="aspect-square w-full object-cover" />
              <img data-reveal style={d(200)} src={media('about-care.webp')} alt="A nail technician filing a client's toenails during a pedicure" loading="lazy" className="aspect-square w-full object-cover" />
            </div>
          </div>
        </section>

        {/* Values */}
        <section aria-labelledby="values" className="bg-ink px-5 py-28 text-paper md:px-14 md:py-36">
          <div className="mx-auto max-w-[1680px]">
            <h2 id="values" data-reveal className="display text-[clamp(44px,5vw,88px)]">
              <span className="block">What we</span>
              <span className="it block pl-[1.2em]">stand for</span>
            </h2>
            <div className="mt-16 grid gap-px bg-paper/10 md:grid-cols-3">
              {about.values.map((v, k) => (
                <div key={v.t} data-reveal style={d(k * 100)} className="bg-ink p-8 md:p-10">
                  <p className="font-serif text-[56px] leading-none text-gold italic">0{k + 1}</p>
                  <h3 className="caps mt-8 text-[13px] text-paper">{v.t}</h3>
                  <p className="mt-4 text-[16px] leading-relaxed text-paper/75">{v.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section aria-labelledby="team" className="bg-blush px-5 py-28 md:px-14 md:py-36">
          <div className="mx-auto grid max-w-[1680px] gap-16 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <p data-reveal className="caps text-gold-deep">
                The team
              </p>
              <h2 id="team" data-reveal style={d(80)} className="display mt-6 text-[clamp(44px,5vw,88px)]">
                <span className="block">The hands</span>
                <span className="it block pl-[1.2em]">behind it</span>
              </h2>
              <p data-reveal style={d(160)} className="prose-lv mt-8 max-w-[440px] text-ink/80">
                A small team that clients describe as warm, gentle and hospitable — and who genuinely love the detail work.
              </p>
              <img
                data-reveal
                style={d(220)}
                src={media('about-team.webp')}
                alt="A member of the La Vie Maison team in the pedicure lounge"
                loading="lazy"
                className="mt-10 aspect-[4/5] w-full max-w-[440px] object-cover"
              />
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {about.team.map((m, k) => (
                <li key={m.name} data-reveal style={d(k * 110)} className="flex flex-col bg-paper p-8 md:p-10">
                  <span aria-hidden className="flex size-20 items-center justify-center rounded-full border border-gold font-serif text-[40px] text-gold-deep italic">
                    {m.name[0]}
                  </span>
                  <h3 className="display mt-8 text-[44px]">{m.name}</h3>
                  <p className="caps mt-2 text-gold-deep">{m.role}</p>
                  <p className="mt-4 text-[16px] leading-relaxed text-ink/75">{m.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* The studio */}
        <section aria-labelledby="studio" className="bg-paper px-5 py-28 md:px-14 md:py-36">
          <div className="mx-auto grid max-w-[1680px] items-end gap-12 lg:grid-cols-[1.3fr_1fr]">
            <img data-reveal src={media('hero-salon.webp')} alt="The lounge: a cream sofa, a pink chair and a brass-and-white counter" loading="lazy" className="aspect-[4/3] w-full object-cover object-[50%_62%]" />
            <div>
              <h2 id="studio" data-reveal className="display text-[clamp(40px,4.4vw,76px)]">
                <span className="block">The</span>
                <span className="it block pl-[1.2em]">studio</span>
              </h2>
              <ul data-reveal style={d(100)} className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
                {brand.perks.map((p) => (
                  <li key={p} className="caps flex items-center gap-4 py-4">
                    <span aria-hidden className="text-gold">◆</span>
                    {p}
                  </li>
                ))}
              </ul>
              <div data-reveal style={d(180)} className="mt-8 flex flex-wrap gap-3">
                <Button href={page("/contact/")}>Find us</Button>
                <Button href={page("/gallery/")} variant="line">
                  See our work
                </Button>
              </div>
            </div>
          </div>
        </section>

        <BookBand />
      </div>
    </Layout>
  );
}

mount(<About />);
