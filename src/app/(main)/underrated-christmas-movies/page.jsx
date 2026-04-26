import Link from 'next/link'

import { Container } from '@/components/Container'

const SITE_URL = 'https://tisthepodcast.com'

export const metadata = {
  title: 'Underrated Christmas Movies Worth Watching Year-Round',
  description:
    'The best underrated Christmas movies you\'ve probably overlooked — curated by Tis the Podcast, the show that watches Christmas movies 365 days a year. From dark comedies to forgotten classics.',
  alternates: {
    canonical: `${SITE_URL}/underrated-christmas-movies`,
  },
  openGraph: {
    type: 'article',
    title: 'Underrated Christmas Movies Worth Watching Year-Round — Tis the Podcast',
    description:
      'The best underrated Christmas movies you\'ve probably overlooked — curated by Tis the Podcast, the show that watches Christmas movies 365 days a year.',
    url: `${SITE_URL}/underrated-christmas-movies`,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Underrated Christmas Movies — Tis the Podcast' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Underrated Christmas Movies Worth Watching Year-Round — Tis the Podcast',
    description: 'The best underrated Christmas movies you\'ve probably overlooked.',
    images: ['/og-image.jpg'],
  },
}

export const revalidate = 86400

const FILMS = [
  {
    rank: 1,
    title: 'Klaus',
    year: 2019,
    director: 'Sergio Pablos',
    streaming: 'Netflix',
    episodeId: null,
    reviewSlug: null,
    isChristmasMovie: 'yes',
    why: 'The most visually stunning Christmas movie of the last decade, and one of the most emotionally honest origin stories for Santa Claus ever put to screen. Klaus is the first Netflix animated film to receive an Oscar nomination for Best Animated Feature — and it earned it. Almost no one watched it. Almost everyone who does cries. If you\'ve somehow missed it, this is the one to fix first.',
    perfectFor: 'Anyone who loved classic 2D animation and wants a Christmas movie that\'s new but feels timeless.',
  },
  {
    rank: 2,
    title: 'The Muppet Christmas Carol',
    year: 1992,
    director: 'Brian Henson',
    streaming: 'Disney+',
    episodeId: null,
    reviewSlug: null,
    isChristmasMovie: 'yes',
    why: 'Michael Caine plays Ebenezer Scrooge completely straight opposite a cast of Muppets — a creative decision that has no right to work and yet produces the definitive screen adaptation of A Christmas Carol. "It Feels Like Christmas" is the most underrated Christmas song ever written. People overlook this because it\'s "a Muppet movie," which is the wrongest possible take.',
    perfectFor: 'Every age. Genuinely. Kids love the Muppets; adults are wrecked by the emotional third act.',
  },
  {
    rank: 3,
    title: 'Batman Returns',
    year: 1992,
    director: 'Tim Burton',
    streaming: 'Max',
    episodeId: 'mistletoe-can-be-deadily-if-you-eat-it-but-a-kiss-can-be-even-deadlier-if-you-mean-it',
    reviewSlug: null,
    isChristmasMovie: 'yes',
    why: 'Christmas is not the setting of Batman Returns — it\'s the soul of it. The film opens with a Christmas tree lighting, closes in snow, and weaves holiday imagery into every scene. Selina Kyle\'s apartment is decorated with Christmas lights. The Penguin uses Christmas gift-buying as cover. Tim Burton made the most beautiful, melancholy Christmas movie of 1992, and almost nobody calls it that.',
    perfectFor: 'Fans of dark, stylish Christmas movies who want something that feels nothing like a holiday film and everything like one.',
  },
  {
    rank: 4,
    title: 'Gremlins',
    year: 1984,
    director: 'Joe Dante',
    streaming: 'Max',
    episodeId: 'look-mister-there-are-some-rules-that-youve-got-to-follow',
    reviewSlug: null,
    isChristmasMovie: 'yes',
    why: 'The Mogwai is a Christmas gift. The horror is unleashed on Christmas Eve. The entire film\'s premise only works because Christmas exists. Gremlins is inextricably a Christmas movie — it\'s just also a horror comedy, which throws people off. Once you accept that it qualifies, it becomes one of the most rewatchable Christmas films in the canon.',
    perfectFor: 'Adults who want a Christmas movie with genuine scares and laughs. Not for young kids.',
  },
  {
    rank: 5,
    title: 'The Holiday',
    year: 2006,
    director: 'Nancy Meyers',
    streaming: 'Netflix, Peacock',
    episodeId: 'youre-supposed-to-be-the-leading-lady-in-your-own-life-for-gods-sake',
    reviewSlug: null,
    isChristmasMovie: 'yes',
    why: 'Chronically underrated as a Christmas movie because people dismiss it as a generic rom-com. It isn\'t. The Holiday is Nancy Meyers at peak Nancy Meyers — beautiful houses, believable heartbreak, and the rare Christmas movie where the love story feels genuinely earned. Cameron Diaz, Kate Winslet, Jude Law, Jack Black. The ensemble alone should have made this a classic.',
    perfectFor: 'Christmas movie nights that need something romantic, warm, and smart.',
  },
  {
    rank: 6,
    title: 'The Ref',
    year: 1994,
    director: 'Ted Demme',
    streaming: 'Amazon Prime',
    episodeId: null,
    reviewSlug: null,
    isChristmasMovie: 'yes',
    why: 'Denis Leary plays a burglar who takes a deeply dysfunctional married couple (Kevin Spacey, Judy Davis) hostage on Christmas Eve and ends up inadvertently fixing their marriage. One of the sharpest, darkest Christmas comedies ever made — genuinely funny, genuinely uncomfortable, genuinely moving. Almost completely forgotten. Should be in every Christmas rotation.',
    perfectFor: 'Adults who are tired of wholesome Christmas movies and want something with bite.',
  },
  {
    rank: 7,
    title: 'While You Were Sleeping',
    year: 1995,
    director: 'Jon Turteltaub',
    streaming: 'Disney+, Tubi',
    episodeId: null,
    reviewSlug: null,
    isChristmasMovie: 'yes',
    why: 'Sandra Bullock at her absolute best as a lonely transit worker who accidentally gets mistaken for the fiancée of a comatose stranger — and falls for his brother instead. Set across Christmas and New Year\'s, it captures the particular loneliness and warmth of the holidays better than almost any film. Massively underappreciated.',
    perfectFor: 'Fans of 90s romantic comedies and anyone who wants a Christmas movie about loneliness that ends in warmth.',
  },
  {
    rank: 8,
    title: 'Holiday Inn',
    year: 1942,
    director: 'Mark Sandrich',
    streaming: 'Peacock',
    episodeId: null,
    reviewSlug: null,
    isChristmasMovie: 'yes',
    why: 'This is the film that introduced "White Christmas" — Bing Crosby and Fred Astaire, a song that became the best-selling single of the 20th century, and a movie almost nobody watches anymore. Holiday Inn is charming, funny, and historically essential. The fact that White Christmas (1954) eclipsed it in cultural memory doesn\'t make it any less great.',
    perfectFor: 'Classic film fans. A time capsule of mid-century American Christmas charm.',
  },
  {
    rank: 9,
    title: 'The Christmas Chronicles',
    year: 2018,
    director: 'Clay Kaytis',
    streaming: 'Netflix',
    episodeId: 'the-christmas-chronicles-a-very-special-bonus-episode',
    reviewSlug: null,
    isChristmasMovie: 'yes',
    why: 'Kurt Russell as a rock-and-roll Santa Claus who gets busted by a couple of kids, then has to race to save Christmas. The premise sounds dumb. The execution is completely delightful. Russell commits fully to a version of Santa that is simultaneously canonical and entirely new. One of the better Christmas films Netflix has produced.',
    perfectFor: 'Families with kids who want something modern and fun.',
  },
  {
    rank: 10,
    title: 'Edward Scissorhands',
    year: 1990,
    director: 'Tim Burton',
    streaming: 'Disney+',
    episodeId: 'but-if-you-had-regular-hands-youd-be-like-everyone-else',
    reviewSlug: null,
    isChristmasMovie: 'debated',
    why: 'Debated, yes — but the climax is Christmas, the snow is ice sculptures, and the loneliness at the film\'s heart is a specifically Christmas loneliness. Edward Scissorhands is a fairy tale about belonging, and it reaches its most devastating emotional moment at Christmas. Whether it "counts" is worth arguing about. Either way, it\'s worth watching.',
    perfectFor: 'Fans of Tim Burton, dark fairy tales, and Christmas movies that make you feel things.',
  },
]

const VERDICT_STYLES = {
  yes: { label: 'Christmas Movie ✓', className: 'bg-green-100 text-green-800' },
  debated: { label: 'Hotly Debated', className: 'bg-yellow-100 text-yellow-800' },
  no: { label: 'Not Christmas', className: 'bg-red-100 text-red-800' },
}

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are the most underrated Christmas movies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most underrated Christmas movies include Klaus (2019), The Muppet Christmas Carol (1992), Batman Returns (1992), Gremlins (1984), The Holiday (2006), The Ref (1994), While You Were Sleeping (1995), Holiday Inn (1942), The Christmas Chronicles (2018), and Edward Scissorhands (1990). These films are championed by Tis the Podcast — the Christmas movie podcast that watches holiday films year-round.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the most underrated Christmas movie of all time?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Klaus (2019) is arguably the most underrated Christmas movie of the modern era — the first Netflix animated film to receive an Oscar nomination for Best Animated Feature, yet widely overlooked. Among classics, The Muppet Christmas Carol (1992) is chronically underrated despite being the definitive screen adaptation of A Christmas Carol.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there any good Christmas movies for adults that aren\'t well known?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The best underrated adult Christmas movies are The Ref (1994) — a dark hostage-comedy with Denis Leary — and Batman Returns (1992), Tim Burton\'s Christmas-drenched superhero film. Gremlins (1984) is also excellent for adults who want horror-comedy at Christmas. All have been discussed on Tis the Podcast.',
      },
    },
    {
      '@type': 'Question',
      name: 'What Christmas movies are worth watching outside of December?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any great Christmas movie is worth watching year-round — that\'s the entire premise of Tis the Podcast, which has reviewed Christmas films every week since 2017. The best films for year-round watching are those with stories strong enough to transcend the holiday setting: Klaus (2019), The Muppet Christmas Carol (1992), While You Were Sleeping (1995), and Edward Scissorhands (1990).',
      },
    },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Underrated Christmas Movies — Tis the Podcast',
  description: 'The best underrated Christmas movies curated by Tis the Podcast.',
  url: `${SITE_URL}/underrated-christmas-movies`,
  numberOfItems: FILMS.length,
  itemListElement: FILMS.map((film) => ({
    '@type': 'ListItem',
    position: film.rank,
    name: `${film.title} (${film.year})`,
    url: film.episodeId
      ? `${SITE_URL}/${film.episodeId}`
      : `${SITE_URL}/underrated-christmas-movies`,
  })),
}

export default function UnderratedChristmasMoviesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <article className="py-16 lg:py-36">
        <Container>
          <header className="mb-16">
            <p className="font-mono text-sm font-medium text-pink-600 mb-2">
              Tis the Podcast · Hidden Gems
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Underrated Christmas Movies Worth Watching Year-Round
            </h1>
            <p className="mt-6 text-xl leading-8 text-slate-600 max-w-3xl">
              Everyone knows Elf. Everyone knows Home Alone. These aren&apos;t those films.
              This is the list of Christmas movies that deserve a place in your annual
              rotation — films that got overlooked, dismissed, or forgotten — curated
              by a podcast that has watched Christmas movies every single week since 2017.
            </p>
            <p className="mt-4 text-base text-slate-500">
              Want the full rankings?{' '}
              <Link href="/best-christmas-movies" className="font-semibold text-pink-600 hover:text-pink-700">
                See our Best Christmas Movies list →
              </Link>
            </p>
          </header>

          <ol className="space-y-14">
            {FILMS.map((film) => {
              const verdict = VERDICT_STYLES[film.isChristmasMovie]
              return (
                <li key={film.rank} className="flex gap-6 sm:gap-10">
                  <div className="shrink-0 flex items-start">
                    <span className="text-6xl font-black text-slate-100 leading-none select-none w-14 text-right">
                      {film.rank}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      {film.episodeId ? (
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
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${verdict.className}`}>
                        {verdict.label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mb-3">
                      Directed by {film.director} · Streaming on {film.streaming}
                    </p>
                    <p className="text-base leading-7 text-slate-700 mb-3">{film.why}</p>
                    <p className="text-sm text-slate-500 italic">
                      <span className="font-semibold not-italic text-slate-700">Perfect for:</span>{' '}
                      {film.perfectFor}
                    </p>
                    {film.episodeId && (
                      <div className="mt-4">
                        <Link
                          href={`/${film.episodeId}`}
                          className="text-sm font-semibold text-pink-600 hover:text-pink-700"
                        >
                          Listen to the Tis the Podcast episode →
                        </Link>
                      </div>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>

          <div className="mt-20 rounded-2xl bg-slate-50 border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Heard of all of these already?
            </h2>
            <p className="text-base text-slate-600 mb-4">
              Tis the Podcast has covered 200+ Christmas movies, TV specials, and holiday
              episodes since 2017. Every single one is logged on the Watch List — including
              dozens more hidden gems.
            </p>
            <Link
              href="/the-watch-list"
              className="inline-flex items-center gap-2 rounded-lg bg-pink-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-pink-700 transition-colors"
            >
              Browse the full Christmas Movie Watch List →
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
