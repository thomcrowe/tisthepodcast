import { notFound } from 'next/navigation'
import Link from 'next/link'

import { Container } from '@/components/Container'
import filmReviews from '@/data/film-reviews.json'

const SITE_URL = 'https://tisthepodcast.com'

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-5 w-5 ${star <= rating ? 'text-yellow-400' : 'text-slate-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function ChristmasMovieBadge({ verdict }) {
  const config = {
    yes: { label: '✅ Christmas Movie', className: 'bg-green-100 text-green-800' },
    no: { label: '❌ Not a Christmas Movie', className: 'bg-red-100 text-red-800' },
    debated: { label: '🎄 Debated Christmas Movie', className: 'bg-yellow-100 text-yellow-800' },
  }
  const c = config[verdict]
  if (!c) return null
  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${c.className}`}>
      {c.label}
    </span>
  )
}

export async function generateStaticParams() {
  return filmReviews.map((film) => ({ slug: film.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const film = filmReviews.find((f) => f.slug === slug)
  if (!film) return {}

  const title = film.year
    ? `${film.title} (${film.year}) Review — Tis the Podcast`
    : `${film.title} Review — Tis the Podcast`
  const description =
    film.verdict ||
    `Tis the Podcast's full review and verdict on ${film.title}${film.year ? ` (${film.year})` : ''}. Is it a Christmas movie? Where does it rank? Anthony, Julia, and Thom debate it all.`

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/reviews/${film.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/reviews/${film.slug}`,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/og-image.jpg'] },
  }
}

export default async function FilmReviewPage({ params }) {
  const { slug } = await params
  const film = filmReviews.find((f) => f.slug === slug)
  if (!film) notFound()

  const pageTitle = film.year
    ? `${film.title} (${film.year}) Review`
    : `${film.title} Review`

  const reviewDescription =
    film.verdict ||
    `Tis the Podcast reviewed ${film.title}${film.year ? ` (${film.year})` : ''}. Anthony Caruso, Julia Colburn, and Thom Crowe debated whether it qualifies as a Christmas movie and where it ranks on their canonical Watch List.`

  // Review schema (only if rating exists)
  const reviewLd = film.rating
    ? {
        '@context': 'https://schema.org',
        '@type': 'Review',
        name: pageTitle,
        itemReviewed: {
          '@type': 'Movie',
          name: film.title,
          ...(film.year && { dateCreated: String(film.year) }),
          ...(film.director && { director: { '@type': 'Person', name: film.director } }),
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: String(film.rating),
          bestRating: '5',
          worstRating: '1',
        },
        author: {
          '@type': 'Organization',
          name: 'Tis the Podcast',
          url: SITE_URL,
        },
        reviewBody: reviewDescription,
        url: `${SITE_URL}/reviews/${film.slug}`,
        publisher: {
          '@type': 'Organization',
          name: 'Tis the Podcast',
          url: SITE_URL,
        },
      }
    : null

  // FAQ schema (only if faqs exist)
  const faqLd =
    film.faqs?.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: film.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: { '@type': 'Answer', text: faq.a },
          })),
        }
      : null

  const relatedFilms = (film.relatedFilms ?? [])
    .map((s) => filmReviews.find((f) => f.slug === s))
    .filter(Boolean)

  return (
    <>
      {reviewLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewLd) }}
        />
      )}
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      <article className="py-16 lg:py-36">
        <Container>

          {/* ── Header ── */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {film.isChristmasMovie && (
                <ChristmasMovieBadge verdict={film.isChristmasMovie} />
              )}
            </div>

            <h1 className="text-4xl font-bold text-slate-900 leading-tight">
              {pageTitle}
            </h1>

            {film.verdict && (
              <p className="mt-3 text-xl text-slate-600 leading-relaxed">
                {film.verdict}
              </p>
            )}

            {film.rating && (
              <div className="mt-3">
                <StarRating rating={film.rating} />
              </div>
            )}

            {/* Metadata strip */}
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
              {film.year && <span>{film.year}</span>}
              {film.director && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Dir. {film.director}</span>
                </>
              )}
              {film.runtime && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{film.runtime} min</span>
                </>
              )}
              {film.streaming && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Streaming: {film.streaming}</span>
                </>
              )}
            </div>

            {/* Genre tags */}
            {film.genres?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {film.genres.map((g) => (
                  <span
                    key={g}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                  >
                    {g}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* ── Episode link ── */}
          {film.episodeId && (
            <div className="mb-8 rounded-lg border border-slate-200 bg-slate-50 px-5 py-4">
              <p className="text-sm text-slate-500 mb-1">Full podcast review</p>
              <Link
                href={`/${film.episodeId}`}
                className="text-base font-bold text-pink-600 hover:text-pink-700"
              >
                Listen to Episode {film.episodeNumber} — {film.title} →
              </Link>
            </div>
          )}

          {/* ── Watch List link ── */}
          <div className="mb-10">
            <Link
              href="/the-watch-list"
              className="inline-flex items-center gap-2 text-sm font-bold text-pink-600 hover:text-pink-700"
            >
              {film.watchListRank
                ? `${film.title} is ranked #${film.watchListRank} on our Watch List →`
                : `See where ${film.title} ranks on our Watch List →`}
            </Link>
          </div>

          <hr className="border-slate-200 mb-10" />

          {/* ── Review body ── */}
          <div className="prose prose-slate max-w-none">
            {film.ourTake && (
              <>
                <h2>Our Take</h2>
                <p>{film.ourTake}</p>
              </>
            )}
            {film.isWorthWatching && (
              <>
                <h2>Is It Worth Watching?</h2>
                <p>{film.isWorthWatching}</p>
              </>
            )}
            {film.theDebate && (
              <>
                <h2>The Debate</h2>
                <p>{film.theDebate}</p>
              </>
            )}
          </div>

          {/* ── FAQ ── */}
          {film.faqs?.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Frequently Asked Questions
              </h2>
              <dl className="space-y-6">
                {film.faqs.map((faq) => (
                  <div key={faq.q} className="border-l-2 border-slate-200 pl-5">
                    <dt className="font-bold text-slate-900 mb-1">{faq.q}</dt>
                    <dd className="text-slate-600 leading-relaxed">{faq.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* ── Related films ── */}
          {relatedFilms.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                If You Liked This...
              </h2>
              <div className="flex flex-wrap gap-3">
                {relatedFilms.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/reviews/${related.slug}`}
                    className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-pink-300 hover:text-pink-600 transition-colors"
                  >
                    {related.title}
                    {related.year ? ` (${related.year})` : ''}
                  </Link>
                ))}
              </div>
            </div>
          )}

        </Container>
      </article>
    </>
  )
}

export const revalidate = 86400
