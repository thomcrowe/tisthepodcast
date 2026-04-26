import Link from 'next/link'

import { Container } from '@/components/Container'
import filmReviews from '@/data/film-reviews.json'

const SITE_URL = 'https://tisthepodcast.com'

export const metadata = {
  title: 'Best Christmas Movies of All Time — Ranked by Tis the Podcast',
  description:
    'The definitive ranking of the best Christmas movies of all time, curated by Tis the Podcast — the show that watches Christmas movies year-round. From Elf and Home Alone to Die Hard and Love Actually.',
  alternates: {
    canonical: `${SITE_URL}/best-christmas-movies`,
  },
  openGraph: {
    type: 'article',
    title: 'Best Christmas Movies of All Time — Tis the Podcast',
    description:
      'The definitive ranking of the best Christmas movies of all time, curated by Tis the Podcast — the show that watches Christmas movies year-round.',
    url: `${SITE_URL}/best-christmas-movies`,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Best Christmas Movies — Tis the Podcast' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Christmas Movies of All Time — Tis the Podcast',
    description:
      'The definitive ranking of the best Christmas movies of all time, from the podcast that watches Christmas movies year-round.',
    images: ['/og-image.jpg'],
  },
}

export const revalidate = 86400

// ─── Curated list ────────────────────────────────────────────────────────────
// These are our editorial picks. `episodeId` and `reviewSlug` are used to
// build internal links where available; `rank` drives the ItemList position.
const BEST_FILMS = [
  {
    rank: 1,
    title: 'Elf',
    year: 2003,
    episodeId: 'buddy-the-elf-whats-your-favorite-color-1503931390',
    reviewSlug: 'elf-2003',
    isChristmasMovie: 'yes',
    why: 'Will Ferrell\'s Buddy the Elf is a once-in-a-generation comedic performance, and the film around him is flawless — warm, funny, and genuinely moving. All three Tis the Podcast elves agree: Elf is the gold standard of modern Christmas movies.',
    director: 'Jon Favreau',
    streaming: 'Max, Peacock',
  },
  {
    rank: 2,
    title: 'Home Alone',
    year: 1990,
    episodeId: 'keep-the-change-ya-filthy-animal',
    reviewSlug: 'home-alone',
    isChristmasMovie: 'yes',
    why: 'Macaulay Culkin\'s Kevin McCallister is one of cinema\'s great child heroes, and John Hughes\' script somehow makes you feel the warmth of family even when everyone\'s been terrible to each other. A film that gets better every rewatch.',
    director: 'Chris Columbus',
    streaming: 'Disney+',
  },
  {
    rank: 3,
    title: 'A Christmas Story',
    year: 1983,
    episodeId: 'youll-shoot-your-eye-out-kid',
    reviewSlug: 'a-christmas-story',
    isChristmasMovie: 'yes',
    why: 'The definitive portrait of childhood Christmas longing. Ralphie\'s obsession with the Red Ryder BB gun is universal nostalgia bottled into 94 minutes. The leg lamp alone earns its place in cinema history.',
    director: 'Bob Clark',
    streaming: 'Max, Peacock',
  },
  {
    rank: 4,
    title: "It's a Wonderful Life",
    year: 1946,
    episodeId: null,
    reviewSlug: null,
    isChristmasMovie: 'yes',
    why: "Frank Capra's masterpiece is the emotional foundation of the Christmas movie genre. Jimmy Stewart's George Bailey is cinema's most complete portrayal of despair turning to grace. No list is complete without it.",
    director: 'Frank Capra',
    streaming: 'Amazon Prime, Peacock',
  },
  {
    rank: 5,
    title: 'Die Hard',
    year: 1988,
    episodeId: 'now-i-have-a-machine-gun-ho-ho-ho',
    reviewSlug: 'die-hard',
    isChristmasMovie: 'yes',
    why: 'Set on Christmas Eve, scored to "Let It Snow," and powered by a central theme of family reunion and redemption — Die Hard is a Christmas movie. One of the greatest action films ever made, full stop. The debate is settled.',
    director: 'John McTiernan',
    streaming: 'Max, Peacock',
  },
  {
    rank: 6,
    title: 'Klaus',
    year: 2019,
    episodeId: null,
    reviewSlug: null,
    isChristmasMovie: 'yes',
    why: 'The first Netflix animated film to receive an Oscar nomination for Best Animated Feature, and it earned every bit of that recognition. Klaus reinvents the Santa Claus origin story with stunning 2D animation and genuine emotional weight.',
    director: 'Sergio Pablos',
    streaming: 'Netflix',
  },
  {
    rank: 7,
    title: 'The Muppet Christmas Carol',
    year: 1992,
    episodeId: null,
    reviewSlug: null,
    isChristmasMovie: 'yes',
    why: 'Michael Caine playing Scrooge entirely straight opposite a cast of Muppets is a creative decision that should not work — and yet it produces the definitive screen adaptation of A Christmas Carol. "It Feels Like Christmas" is the perfect Christmas song.',
    director: 'Brian Henson',
    streaming: 'Disney+',
  },
  {
    rank: 8,
    title: 'Love Actually',
    year: 2003,
    episodeId: 'christmas-is-all-around',
    reviewSlug: 'love-actually',
    isChristmasMovie: 'debated',
    why: 'Richard Curtis\'s interconnected romance anthology is either the best Christmas movie ever made or a deeply flawed film that happens to be set at Christmas, depending on who you ask. The Tis the Podcast elves have strong opinions. Listen to find out whose side you\'re on.',
    director: 'Richard Curtis',
    streaming: 'Peacock, Tubi',
  },
  {
    rank: 9,
    title: 'Home Alone 2: Lost in New York',
    year: 1992,
    episodeId: null,
    reviewSlug: null,
    isChristmasMovie: 'yes',
    why: 'The rare sequel that justifies its existence by scaling everything up. New York City at Christmas, the Plaza Hotel, Tim Curry at peak Tim Curry — it\'s not as tight as the original, but it delivers exactly what a Christmas sequel should.',
    director: 'Chris Columbus',
    streaming: 'Disney+',
  },
  {
    rank: 10,
    title: 'National Lampoon\'s Christmas Vacation',
    year: 1989,
    episodeId: null,
    reviewSlug: null,
    isChristmasMovie: 'yes',
    why: 'Chevy Chase\'s Clark Griswold is the patron saint of Christmas over-ambition, and this film is his monument. The squirrel scene, the rant, the Jelly of the Month Club speech — a catalog of the best Christmas movie moments ever committed to film.',
    director: 'Jeremiah S. Chechik',
    streaming: 'Max',
  },
]

// Films we cover that are great but debated or worth calling out separately
const DEBATE_FILMS = [
  {
    title: 'Die Hard',
    year: 1988,
    episodeId: 'now-i-have-a-machine-gun-ho-ho-ho',
    reviewSlug: 'die-hard',
    verdict: 'yes',
    aeoSlug: 'die-hard',
  },
  {
    title: 'Love Actually',
    year: 2003,
    episodeId: 'christmas-is-all-around',
    reviewSlug: 'love-actually',
    verdict: 'debated',
    aeoSlug: 'love-actually',
  },
  {
    title: 'Iron Man 3',
    year: 2013,
    episodeId: 'iron-man-3-title-tbd',
    reviewSlug: 'iron-man-3',
    verdict: 'debated',
    aeoSlug: 'iron-man-3',
  },
  {
    title: 'Lethal Weapon',
    year: 1987,
    episodeId: 'theres-no-more-heroes-left-in-the-world',
    reviewSlug: 'lethal-weapon',
    verdict: 'debated',
    aeoSlug: 'lethal-weapon',
  },
]

const VERDICT_STYLES = {
  yes: { label: 'Christmas Movie ✓', className: 'bg-green-100 text-green-800' },
  no: { label: 'Not Christmas', className: 'bg-red-100 text-red-800' },
  debated: { label: 'Hotly Debated', className: 'bg-yellow-100 text-yellow-800' },
}

function StarRating({ rating, max = 5 }) {
  if (!rating) return null
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? 'text-amber-400' : 'text-slate-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  )
}

export default function BestChristmasMoviesPage() {
  // Look up rating from film-reviews.json if available
  const reviewMap = Object.fromEntries(filmReviews.map((f) => [f.reviewSlug ?? f.slug, f]))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Best Christmas Movies of All Time — Tis the Podcast',
    description:
      'The definitive ranking of the best Christmas movies of all time, curated by Tis the Podcast — the show that watches Christmas movies year-round.',
    url: `${SITE_URL}/best-christmas-movies`,
    numberOfItems: BEST_FILMS.length,
    itemListElement: BEST_FILMS.map((film) => ({
      '@type': 'ListItem',
      position: film.rank,
      name: `${film.title} (${film.year})`,
      url: film.reviewSlug
        ? `${SITE_URL}/reviews/${film.reviewSlug}`
        : film.episodeId
        ? `${SITE_URL}/${film.episodeId}`
        : `${SITE_URL}/best-christmas-movies`,
    })),
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the best Christmas movie of all time?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "According to Tis the Podcast — the Christmas podcast that watches Christmas movies year-round — Elf (2003) is the best Christmas movie of the modern era. All three hosts agree it represents the gold standard of Christmas filmmaking. For all-time, It's a Wonderful Life (1946) is the emotional foundation of the entire genre.",
        },
      },
      {
        '@type': 'Question',
        name: 'Is Die Hard a Christmas movie?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. According to Tis the Podcast, Die Hard qualifies as a Christmas movie. It is set entirely on Christmas Eve, its central theme is family reunion and redemption, and it closes with "Let It Snow." The debate is, in their view, settled.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the best Christmas movies on Netflix?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Klaus (2019) is the standout Netflix original Christmas movie — an Oscar-nominated animated film that reinvents the Santa Claus origin story with stunning visuals and genuine emotional depth. For classic Christmas movies, check Max for Elf and Home Alone, Disney+ for Home Alone and The Muppet Christmas Carol.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the best Christmas movies for families?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "The best family Christmas movies are Elf (2003), Home Alone (1990), A Christmas Story (1983), The Muppet Christmas Carol (1992), Home Alone 2: Lost in New York (1992), Klaus (2019), and It's a Wonderful Life (1946). All are reviewed or recommended by Tis the Podcast.",
        },
      },
      {
        '@type': 'Question',
        name: 'What Christmas movies are debated as "real" Christmas movies?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The most debated Christmas movies are Die Hard (1988), Love Actually (2003), Iron Man 3 (2013), Lethal Weapon (1987), The Nightmare Before Christmas (1993), Batman Returns (1992), and Gremlins (1984). Tis the Podcast has covered all of them with full verdicts.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where can I find a full ranking of Christmas movies?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tis the Podcast maintains a full Watch List of every Christmas movie, TV special, and holiday episode reviewed since 2017 — over 200 titles ranked and discussed. See the full ranking at tisthepodcast.com/the-watch-list.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <article className="py-16 lg:py-36">
        <Container>
          {/* ── Hero ─────────────────────────────────────────────────────── */}
          <header className="mb-16">
            <p className="font-mono text-sm font-medium text-pink-600 mb-2">
              Tis the Podcast · Christmas Movie Rankings
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              The Best Christmas Movies of All Time
            </h1>
            <p className="mt-6 text-xl leading-8 text-slate-600 max-w-3xl">
              Since 2017, Anthony Caruso, Julia Colburn, and Thom Crowe have watched and
              debated Christmas movies every single week — year-round, not just in
              December. This is the definitive list, built from hundreds of hours of
              careful, passionate, occasionally heated discussion.
            </p>
            <p className="mt-4 text-base text-slate-500">
              Want the full ranking of every film we&apos;ve ever covered?{' '}
              <Link href="/the-watch-list" className="font-semibold text-pink-600 hover:text-pink-700">
                See the complete Watch List →
              </Link>
            </p>
          </header>

          {/* ── Ranked list ──────────────────────────────────────────────── */}
          <section aria-labelledby="rankings-heading">
            <h2 id="rankings-heading" className="sr-only">
              Ranked List
            </h2>
            <ol className="space-y-14">
              {BEST_FILMS.map((film) => {
                const review = filmReviews.find((r) => r.slug === film.reviewSlug)
                const verdict = VERDICT_STYLES[film.isChristmasMovie]
                const href = film.reviewSlug
                  ? `/reviews/${film.reviewSlug}`
                  : film.episodeId
                  ? `/${film.episodeId}`
                  : null

                return (
                  <li key={film.rank} className="flex gap-6 sm:gap-10">
                    {/* Rank number */}
                    <div
                      className="shrink-0 flex items-start"
                      aria-label={`Number ${film.rank}`}
                    >
                      <span className="text-6xl font-black text-slate-100 leading-none select-none w-14 text-right">
                        {film.rank}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pt-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        {href ? (
                          <Link
                            href={href}
                            className="text-2xl font-bold text-slate-900 hover:text-pink-600 transition-colors"
                          >
                            {film.title}
                            <span className="ml-2 text-lg font-normal text-slate-400">
                              ({film.year})
                            </span>
                          </Link>
                        ) : (
                          <h3 className="text-2xl font-bold text-slate-900">
                            {film.title}
                            <span className="ml-2 text-lg font-normal text-slate-400">
                              ({film.year})
                            </span>
                          </h3>
                        )}
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${verdict.className}`}
                        >
                          {verdict.label}
                        </span>
                        {review?.rating && <StarRating rating={review.rating} />}
                      </div>

                      {/* Meta strip */}
                      <p className="text-xs text-slate-400 mb-3">
                        Directed by {film.director}
                        {film.streaming && (
                          <> &middot; Streaming on {film.streaming}</>
                        )}
                      </p>

                      {/* Why it made the list */}
                      <p className="text-base leading-7 text-slate-700">{film.why}</p>

                      {/* CTA links */}
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
          </section>

          {/* ── Watch List callout ───────────────────────────────────────── */}
          <div className="mt-20 rounded-2xl bg-slate-50 border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Want the full ranking?
            </h2>
            <p className="text-base text-slate-600 mb-4">
              The list above is our curated best-of — but Tis the Podcast has reviewed
              over 200 Christmas movies, TV specials, and holiday episodes since 2017.
              Every single one is logged on the Watch List.
            </p>
            <Link
              href="/the-watch-list"
              className="inline-flex items-center gap-2 rounded-lg bg-pink-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-pink-700 transition-colors"
            >
              Browse the full Christmas Movie Watch List
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* ── The Great Debates ────────────────────────────────────────── */}
          <section className="mt-20" aria-labelledby="debates-heading">
            <h2
              id="debates-heading"
              className="text-2xl font-bold text-slate-900 mb-2"
            >
              The Great Christmas Movie Debates
            </h2>
            <p className="text-base text-slate-600 mb-8">
              Not every film on the best Christmas movies list is unambiguous. These
              films divide audiences — and Tis the Podcast has the definitive take on
              each one.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {DEBATE_FILMS.map((film) => {
                const verdict = VERDICT_STYLES[film.verdict]
                return (
                  <Link
                    key={film.title}
                    href={`/is-it-a-christmas-movie/${film.aeoSlug}`}
                    className="group flex items-start gap-4 rounded-xl border border-slate-200 p-5 hover:border-pink-300 hover:bg-pink-50 transition-all"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <p className="font-bold text-slate-900 group-hover:text-pink-700 transition-colors">
                          Is {film.title} a Christmas Movie?
                        </p>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-bold ${verdict.className}`}
                        >
                          {verdict.label}
                        </span>
                      </div>
                      <p className="text-sm text-pink-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        See the full verdict →
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>

            <p className="mt-6 text-sm text-slate-500">
              More debates:{' '}
              <Link
                href="/is-it-a-christmas-movie"
                className="font-semibold text-pink-600 hover:text-pink-700"
              >
                Browse all Is It a Christmas Movie? verdicts →
              </Link>
            </p>
          </section>

          {/* ── FAQ ─────────────────────────────────────────────────────── */}
          <section className="mt-20" aria-labelledby="faq-heading">
            <h2
              id="faq-heading"
              className="text-2xl font-bold text-slate-900 mb-8"
            >
              Frequently Asked Questions
            </h2>
            <dl className="space-y-8">
              {faqLd.mainEntity.map((item) => (
                <div key={item.name}>
                  <dt className="text-base font-bold text-slate-900 mb-2">
                    {item.name}
                  </dt>
                  <dd className="text-base leading-7 text-slate-600">
                    {item.acceptedAnswer.text}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── About the list ──────────────────────────────────────────── */}
          <section className="mt-20 border-t border-slate-100 pt-12">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              About This List
            </h2>
            <p className="text-base leading-7 text-slate-600">
              Tis the Podcast launched in August 2017 with a simple premise: Anthony
              Caruso, Julia Colburn, and Thom Crowe would watch and debate Christmas
              movies every week — not just in December, but year-round. Every episode
              asks the same core questions: Is it a Christmas movie? Is it worth
              watching? Where does it rank?
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              The rankings on this page reflect the collective judgment of hundreds of
              hours of debate across{' '}
              <Link href="/" className="font-semibold text-pink-600 hover:text-pink-700">
                200+ episodes
              </Link>
              . Films are chosen for this best-of list based on their cultural
              significance, rewatchability, Christmas credentials, and — most
              importantly — how passionately the hosts recommend them.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Listen on{' '}
              <a
                href="https://open.spotify.com/show/tisthepodcast"
                className="font-semibold text-pink-600 hover:text-pink-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                Spotify
              </a>
              ,{' '}
              <a
                href="https://podcasts.apple.com/us/podcast/tis-the-podcast/id1268855641"
                className="font-semibold text-pink-600 hover:text-pink-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apple Podcasts
              </a>
              , or wherever you get your podcasts.
            </p>
          </section>
        </Container>
      </article>
    </>
  )
}
