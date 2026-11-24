import {BookBand, Button, ReviewCard, Stars} from '../components/Blocks';
import {Layout} from '../components/Layout';
import {PageHero} from '../components/PageHero';
import {brand, links, reviews} from '../content';
import {useReveals} from '../hooks/useReveals';
import {mount} from '../mount';

function Reviews() {
  const ref = useReveals<HTMLDivElement>();

  return (
    <Layout page="reviews">
      <PageHero
        index="05"
        kicker="Reviews"
        lines={[{t: 'Kind'}, {t: 'words.', i: true}]}
        body={`Rated ${brand.rating.value} out of 5 from ${brand.rating.count} verified reviews on Fresha. Here’s what our clients say.`}
        image="hero-glam.webp"
        alt="A client relaxing in the studio after a soft-glam makeup session"
        position="50% 22%"
      />

      <div ref={ref} className="bg-paper">
        <section aria-labelledby="rating" className="mx-auto max-w-[1680px] px-5 py-20 md:px-14 md:py-28">
          <div className="grid items-end gap-10 border-b border-ink/10 pb-14 md:grid-cols-[auto_1fr_auto] md:gap-16">
            <p id="rating" data-reveal className="font-serif text-[clamp(110px,13vw,220px)] leading-[0.8] text-gold-deep">
              {brand.rating.value}
            </p>
            <div data-reveal>
              <Stars value={4.7} className="text-[26px] text-gold-deep" />
              <p className="caps mt-4 text-ink/70">
                Average from {brand.rating.count} verified reviews on Fresha
              </p>
            </div>
            <div data-reveal className="flex flex-wrap gap-3">
              <Button href={links.freshaReviews} external>
                Read all {brand.rating.count}
              </Button>
            </div>
          </div>

          <div className="mt-14 columns-1 gap-3 md:columns-2 xl:columns-3 [&>*]:mb-3">
            {reviews.map((r, k) => (
              <ReviewCard key={r.name} r={r} delay={(k % 3) * 90} />
            ))}
          </div>

          <p data-reveal className="prose-lv mt-14 max-w-[640px] text-ink/75">
            Been in to see us? We’d love to hear how it went — you can leave a review on Fresha after your appointment.
          </p>
        </section>
        <BookBand title={['Come see', 'for yourself.']} />
      </div>
    </Layout>
  );
}

mount(<Reviews />);
