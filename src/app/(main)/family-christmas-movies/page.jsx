import Link from 'next/link'

import { Container } from '@/components/Container'

const SITE_URL = 'https://tisthepodcast.com'

export const metadata = {
  title: 'Best Family Christmas Movies to Watch Together — Ranked',
  description:
    'The best Christmas movies to watch with the whole family — ranked and reviewed by Tis the Podcast. From Elf and Home Alone to Klaus and The Muppet Christmas Carol, every pick is family-tested.',
  alternates: {
    canonical: `${SITE_URL}/family-christmas-movies`,
  },
  openGraph: {
    type: 'article',
    title: 'Best Family Christmas Movies — Tis the Podcast',
    description:
      'The best Christmas movies to watch with the whole family — ranked by Tis the Podcast, the show that watches Christmas movies year-round.',
    url: `${SITE_URL}/family-christmas-movies`,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Best Family Christmas Movies — Tis the Podcast' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Family Christmas Movies — Tis the Podcast',
    description: 'The best Christmas movies to watch with the whole family — ranked.',
    images: ['/og-image.jpg'],
  },
}

export const revalidate = 86400

const FAMILY_FILMS = [
  {
    rank: 1,
    title: 'Elf',
    year: 2003,
    director: 'Jon Favreau',
    streaming: 'Max, Peacock',
    ageGuide: 'All ages · Rated PG',
    episodeId: 'buddy-the-elf-whats-your-favorite-color-1503931390',
    reviewSlug: 'elf-2003',
    why: 'The single best family Christmas movie of the modern era — no debate. Will Ferrell\'s Buddy the Elf is joyful in a way that works for a five-year-old and a fifty-year-old simultaneously. The scene where Buddy discovers cotton-headed ninny-muggins has broken multiple generations. Every family should watch this together at least once a year.',
    ageNotes: 'Suitable for all ages. No scary content, mild toilet humor.',
  },
  {
    rank: 2,
    title: 'Home Alone',
    year: 1990,
    director: 'Chris Columbus',
    streaming: 'Disney+',
    ageGuide: 'Ages 7+ · Rated PG',
    episodeId: 'keep-the-change-ya-filthy-animal',
    reviewSlug: 'home-alone',
    why: 'Kevin McCallister is one of cinema\'s great child heroes, and the slapstick violence — while extensive — is so cartoonishly exaggerated that it reads as pure comedy. Home Alone is a film that children watch for Kevin\'s triumph and adults watch for the warmth underneath it. The airport reunion still lands.',
    ageNotes: 'Slapstick violence (comic, no blood). Fine for most kids 7 and up.',
  },
  {
    rank: 3,
    title: 'Klaus',
    year: 2019,
    director: 'Sergio Pablos',
    streaming: 'Netflix',
    ageGuide: 'All ages · Rated PG',
    episodeId: null,
    reviewSlug: null,
    why: 'The Oscar-nominated Netflix animated film that reinvents the Santa Claus origin story with stunning 2D animation, genuine warmth, and a surprisingly moving emotional arc. One of the few modern Christmas films that genuinely earns its ending. Adults will cry. Kids will be enchanted.',
    ageNotes: 'Suitable for all ages. Mild themes of loss and loneliness handled gently.',
  },
  {
    rank: 4,
    title: 'The Muppet Christmas Carol',
    year: 1992,
    director: 'Brian Henson',
    streaming: 'Disney+',
    ageGuide: 'All ages · Rated G',
    episodeId: null,
    reviewSlug: null,
    why: 'The definitive film adaptation of A Christmas Carol — not just the best Muppet movie, not just the best Christmas movie of 1992, but genuinely the best version of Dickens\' story ever put on screen. Michael Caine plays Scrooge with full commitment; the Muppets provide levity without ever undermining the stakes. The song "It Feels Like Christmas" is a perfect piece of music.',
    ageNotes: 'Rated G. The ghost of Christmas Future sequence is atmospheric but not too scary for young children.',
  },
  {
    rank: 5,
    title: "It's a Wonderful Life",
    year: 1946,
    director: 'Frank Capra',
    streaming: 'Amazon Prime, Peacock',
    ageGuide: 'Ages 8+ · Rated G',
    episodeId: null,
    reviewSlug: null,
    why: 'The emotional foundation of the American Christmas movie. Jimmy Stewart\'s George Bailey is cinema\'s most complete portrait of despair turning to grace — and the reason this film still works on families who watch it together is that every age group connects with a different part of it. Children feel the adventure; teenagers feel the frustration of dreams deferred; adults feel the weight of a life lived for others.',
    ageNotes: 'Black and white, slower pace. Best for older kids and adults. The "darker" middle section may be heavy for very young children.',
  },
  {
    rank: 6,
    title: 'Home Alone 2: Lost in New York',
    year: 1992,
    director: 'Chris Columbus',
    streaming: 'Disney+',
    ageGuide: 'Ages 7+ · Rated PG',
    episodeId: null,
    reviewSlug: null,
    why: 'The rare sequel that knows exactly what it is and commits fully. New York City at Christmas, the Plaza Hotel, Tim Curry at peak Tim Curry, and Kevin McCallister getting an even better trap sequence than the original. Not as tight as the first — nothing could be — but a legitimate Christmas classic in its own right.',
    ageNotes: 'Same slapstick violence as the original. Fine for the same ages.',
  },
  {
    rank: 7,
    title: "National Lampoon's Christmas Vacation",
    year: 1989,
    director: 'Jeremiah S. Chechik',
    streaming: 'Max',
    ageGuide: 'Ages 12+ · Rated PG-13',
    episodeId: null,
    reviewSlug: null,
    why: 'Clark Griswold is the patron saint of Christmas over-ambition, and Chevy Chase\'s performance is a masterclass in physical comedy and barely-contained desperation. The squirrel scene, the rant, the Jelly of the Month Club speech — it\'s a catalog of the best Christmas movie moments ever committed to film. Older families will quote it for years.',
    ageNotes: 'PG-13 — some adult humor and language. Better for teens and above.',
  },
  {
    rank: 8,
    title: 'The Christmas Chronicles',
    year: 2018,
    director: 'Clay Kaytis',
    streaming: 'Netflix',
    ageGuide: 'All ages · Rated PG',
    episodeId: 'the-christmas-chronicles-a-very-special-bonus-episode',
    reviewSlug: null,
    why: 'Kurt Russell as a rock-and-roll Santa Claus who gets caught by two kids and has to race to save Christmas. A genuinely fun modern family Christmas movie that introduces a version of Santa who feels fresh while still being recognizably Santa. The jail scene where Santa leads an impromptu performance of "Santa Claus Is Back in Town" is an all-timer moment.',
    ageNotes: 'Suitable for all ages. Mild peril, nothing frightening.',
  },
  {
    rank: 9,
    title: 'A Christmas Story',
    year: 1983,
    director: 'Bob Clark',
    streaming: 'Max, Peacock',
    ageGuide: 'Ages 8+ · Rated PG',
    episodeId: 'youll-shoot-your-eye-out-kid',
    reviewSlug: 'a-christmas-story',
    why: 'Ralphie Parker\'s obsession with the Red Ryder BB gun is universal childhood nostalgia bottled into 94 minutes. Every family has a version of this — the thing you wanted desperately at Christmas, the adults who didn\'t get it, the moment it finally arrived. A Christmas Story captures that feeling more precisely than any other film.',
    ageNotes: 'Mild language ("Oh Fudge" — except it\'s not "fudge"). Some adult humor older kids will miss. Fine from about age 8.',
  },
  {
    rank: 10,
    title: 'The Polar Express',
    year: 2004,
    director: 'Robert Zemeckis',
    streaming: 'Max',
    ageGuide: 'All ages · Rated G',
    episodeId: null,
    reviewSlug: null,
    why: 'Visually unlike anything else in the Christmas movie canon — the motion-capture animation is eerie and dreamlike in a way that perfectly matches the source material\'s tone. The Polar Express is about the moment childhood belief becomes a choice rather than a given, and it handles that theme with genuine care. The "believe" message lands because the film earns it.',
    ageNotes: 'The motion-capture style unsettles some young children ("uncanny valley"). Generally fine for all ages.',
  },
]

const AGE_COLORS = {
  'All ages': 'bg-green-100 text-green-800',
  'Ages 7+': 'bg-blue-100 text-blue-800',
  'Ages 8+': 'bg-blue-100 text-blue-800',
  'Ages 12+': 'bg-yellow-100 text-yellow-800',
}

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the best Christmas movie to watch with the whole family?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Elf (2003) is the best family Christmas movie of the modern era — funny for every age, warm without being saccharine, and endlessly rewatchable. For younger children, Klaus (2019) on Netflix is a beautiful alternative. For families with older kids, Home Alone (1990) and The Muppet Christmas Carol (1992) are essential.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the best Christmas movies for kids?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The best Christmas movies for kids are Elf (2003), Klaus (2019), The Muppet Christmas Carol (1992), Home Alone (1990), The Christmas Chronicles (2018), and The Polar Express (2004). All are rated G or PG and appropriate for children of most ages. Tis the Podcast recommends all of these for family Christmas viewing.',
      },
    },
    {
      '@type': 'Question',
      name: 'What Christmas movies are suitable for all ages?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Christmas movies suitable for all ages include Elf (2003, PG), Klaus (2019, PG), The Muppet Christmas Carol (1992, G), The Christmas Chronicles (2018, PG), and The Polar Express (2004, G). These films work for young children and adults simultaneously, which is the rarest and most valuable quality in a family Christmas movie.',
      },
    },
    {
      '@type': 'Question',
      name: 'What Christmas movies can I watch with teenagers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The best Christmas movies for teenagers include Home Alone (1990), National Lampoon\'s Christmas Vacation (1989, PG-13), It\'s a Wonderful Life (1946), Batman Returns (1992), and Die Hard (1988). These films have enough complexity and humor to engage older viewers while still being appropriate for family viewing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there any new Christmas movies good for families?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The best newer family Christmas movies are Klaus (2019) on Netflix — Oscar-nominated and genuinely excellent — and The Christmas Chronicles (2018), also on Netflix, starring Kurt Russell as Santa Claus. Both are appropriate for all ages and far better than most holiday streaming originals.',
      },
    },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Best Family Christmas Movies — Tis the Podcast',
  description: 'The best Christmas movies to watch with the whole family, ranked by Tis the Podcast.',
  url: `${SITE_URL}/family-christmas-movies`,
  numberOfItems: FAMILY_FILMS.length,
  itemListElement: FAMILY_FILMS.map((film) => ({
    '@type': 'ListItem',
    position: film.rank,
    name: `${film.title} (${film.year})`,
    url: film.reviewSlug
      ? `${SITE_URL}/reviews/${film.reviewSlug}`
      : film.episodeId
      ? `${SITE_URL}/${film.episodeId}`
      : `${SITE_URL}/family-christmas-movies`,
  })),
}

export default function FamilyChristmasMoviesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <article className="py-16 lg:py-36">
        <Container>
          <header className="mb-16">
            <p className="font-mono text-sm font-medium text-pink-600 mb-2">
              Tis the Podcast · Family Viewing Guide
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Best Family Christmas Movies to Watch Together
            </h1>
            <p className="mt-6 text-xl leading-8 text-slate-600 max-w-3xl">
              Finding a Christmas movie the whole family can watch — from small kids to
              grandparents — is harder than it sounds. These are the ones that actually
              work at every age, curated by a podcast that has watched Christmas movies
              every week since 2017.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 font-semibold text-green-800">
                <span className="h-2 w-2 rounded-full bg-green-400" aria-hidden="true" />
                All ages
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 font-semibold text-blue-800">
                <span className="h-2 w-2 rounded-full bg-blue-400" aria-hidden="true" />
                Ages 7+
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1 font-semibold text-yellow-800">
                <span className="h-2 w-2 rounded-full bg-yellow-400" aria-hidden="true" />
                Ages 12+
              </span>
            </div>
          </header>

          <ol className="space-y-14">
            {FAMILY_FILMS.map((film) => {
              const ageKey = film.ageGuide.split(' · ')[0]
              const ageColor = AGE_COLORS[ageKey] ?? 'bg-slate-100 text-slate-700'
              const ageRating = film.ageGuide.split(' · ')[1]

              return (
                <li key={film.rank} className="flex gap-6 sm:gap-10">
                  <div className="shrink-0 flex items-start">
                    <span className="text-6xl font-black text-slate-100 leading-none select-none w-14 text-right">
                      {film.rank}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      {film.reviewSlug ? (
                        <Link
                          href={`/reviews/${film.reviewSlug}`}
                          className="text-2xl font-bold text-slate-900 hover:text-pink-600 transition-colors"
                        >
                          {film.title}
                          <span className="ml-2 text-lg font-normal text-slate-400">({film.year})</span>
                        </Link>
                      ) : film.episodeId ? (
                        <Link
                          href={`/${film.episodeId}`}
                          className="text-2xl font-bold text-slate-900 hover:text-pink-600 transition-colors"
                        >
                          {film.title}
                          <span className="ml-2 text-lg font-normal text-slate-400">({film.year})</span>
                        </Link>
                      ) : (
                        <h2 className="text-2xl font-bold text-slate-900">
                          {film.title}
                          <span className="ml-2 text-lg font-normal text-slate-400">({film.year})</span>
                        </h2>
                      )}
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${ageColor}`}>
                        {ageKey}
                      </span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                        {ageRating}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mb-3">
                      Directed by {film.director} · Streaming on {film.streaming}
                    </p>
                    <p className="text-base leading-7 text-slate-700 mb-3">{film.why}</p>
                    <p className="text-sm text-slate-500">
                      <span className="font-semibold text-slate-700">Age notes:</span>{' '}
                      {film.ageNotes}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-4">
                      {film.reviewSlug && (
                        <Link
                          href={`/reviews/${film.reviewSlug}`}
                          className="text-sm font-semibold text-pink-600 hover:text-pink-700"
                        >
                          Read our full review →
                        </Link>
                      )}
                      {film.episodeId && (
                        <Link
                          href={`/${film.episodeId}`}
                          className="text-sm font-semibold text-slate-600 hover:text-slate-900"
                        >
                          Listen to the episode →
                        </Link>
                      )}
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>

          <div className="mt-20 grid gap-4 sm:grid-cols-2">
            <Link
              href="/best-christmas-movies"
              className="rounded-2xl border border-slate-200 p-6 hover:border-pink-300 hover:bg-pink-50 transition-all group"
            >
              <p className="font-bold text-slate-900 group-hover:text-pink-700 mb-1">
                Best Christmas Movies of All Time →
              </p>
              <p className="text-sm text-slate-500">Our definitive top-10 ranking, all ages and genres.</p>
            </Link>
            <Link
              href="/underrated-christmas-movies"
              className="rounded-2xl border border-slate-200 p-6 hover:border-pink-300 hover:bg-pink-50 transition-all group"
            >
              <p className="font-bold text-slate-900 group-hover:text-pink-700 mb-1">
                Underrated Christmas Movies →
              </p>
              <p className="text-sm text-slate-500">Beyond the obvious picks — hidden gems worth finding.</p>
            </Link>
          </div>

          <section className="mt-20" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-bold text-slate-900 mb-8">
              Frequently Asked Questions
            </h2>
            <dl className="space-y-8">
              {faqLd.mainEntity.map((item) => (
                <div key={item.name}>
                  <dt className="text-base font-bold text-slate-900 mb-2">{item.name}</dt>
                  <dd className="text-base leading-7 text-slate-600">{item.acceptedAnswer.text}</dd>
                </div>
              ))}
            </dl>
          </section>
        </Container>
      </article>
    </>
  )
}
