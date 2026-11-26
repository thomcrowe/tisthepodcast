import { notFound } from 'next/navigation'
import Link from 'next/link'

import { Container } from '@/components/Container'
import articles from '@/data/is-it-christmas.json'
import { JsonLd } from '@/components/JsonLd'
import { breadcrumbLd, HOST_REFS, ORG_ID } from '@/lib/schema'
import { getReviewForVerdict } from '@/lib/film-links'
import { TranscriptSection, TranscriptJumpLink } from '@/components/TranscriptSection'
import { getTranscript } from '@/lib/transcripts'

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

const SITE_URL = 'https://tisthepodcast.com'

const VERDICT_CONFIG = {
  yes: {
    label: '✅ Yes — It\'s a Christmas Movie',
    className: 'border-green-200 bg-green-50',
    labelClass: 'text-green-800',
  },
  no: {
    label: '❌ No — It\'s Not a Christmas Movie',
    className: 'border-red-200 bg-red-50',
    labelClass: 'text-red-800',
  },
  debated: {
    label: '🎄 Debated — The Elves Don\'t All Agree',
    className: 'border-yellow-200 bg-yellow-50',
    labelClass: 'text-yellow-800',
  },
}

// "Is [Movie] a Christmas Movie? Our Verdict | Tis the Podcast" — one brand
// mention. Very long film names drop "Our Verdict" to stay near 60 chars.
function buildTitle(article) {
  const full = `Is ${article.film} a Christmas Movie? Our Verdict | Tis the Podcast`
  if (full.length <= 70) return full
  return `Is ${article.film} a Christmas Movie? | Tis the Podcast`
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) return {}

  const title = buildTitle(article)
  const description = article.metaDescription

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `${SITE_URL}/is-it-a-christmas-movie/${article.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/is-it-a-christmas-movie/${article.slug}`,
      images: [{ url: '/og-image.jpg', width: 800, height: 800, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/og-image.jpg'] },
  }
}

export default async function IsItAChristmasMoviePage({ params }) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) notFound()

  const verdict = VERDICT_CONFIG[article.verdict]
  // When this film also had a /reviews page, its rating, take and transcript
  // live here now (the old review URL 301s to this page).
  const review = getReviewForVerdict(article.slug)
  const transcriptId = article.episodeId ?? review?.episodeId
  const transcript = transcriptId ? getTranscript(transcriptId) : null
  const pageUrl = `${SITE_URL}/is-it-a-christmas-movie/${article.slug}`

  const relatedArticles = (article.relatedSlugs ?? [])
    .map((s) => articles.find((a) => a.slug === s))
    .filter(Boolean)

  // Verdict-first FAQ: the headline question is answered with the one-line
  // verdict, then the existing FAQ content follows (minus any duplicate of the
  // headline question).
  const headlineQ = `Is ${article.film} a Christmas movie?`
  const baseFaqs = [...(article.faqs ?? []), ...(review?.faqs ?? [])]
  const seenQ = new Set([headlineQ.toLowerCase()])
  const dedupedFaqs = baseFaqs.filter((f) => {
    const k = f.q.toLowerCase()
    if (seenQ.has(k)) return false
    seenQ.add(k)
    return true
  })
  const faqs = article.verdictLine
    ? [{ q: headlineQ, a: `${article.verdictLine} ${article.verdictReason}` }, ...dedupedFaqs]
    : dedupedFaqs

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  const movieLd = {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    '@id': `${pageUrl}#movie`,
    name: article.film,
    ...(article.year ? { dateCreated: String(article.year) } : {}),
    ...(review?.director ? { director: { '@type': 'Person', name: review.director } } : {}),
    url: pageUrl,
  }

  const reviewLd = review?.rating
    ? {
        '@context': 'https://schema.org',
        '@type': 'Review',
        name: `Is ${article.film} a Christmas movie? Tis the Podcast's verdict`,
        itemReviewed: { '@id': `${pageUrl}#movie` },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: String(review.rating),
          bestRating: '5',
          worstRating: '1',
        },
        author: HOST_REFS,
        publisher: { '@id': ORG_ID },
        reviewBody: article.verdictStatement,
        url: pageUrl,
      }
    : null

  return (
    <>
      <JsonLd data={breadcrumbLd([
          { name: 'Is It a Christmas Movie?', href: '/is-it-a-christmas-movie' },
          { name: `Is ${article.film} a Christmas Movie?`, href: `/is-it-a-christmas-movie/${article.slug}` },
        ])} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(movieLd) }}
      />
      {reviewLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewLd) }}
        />
      )}

      <article className="py-16 lg:py-36">
        <Container>

          {/* ── H1 — exact question for AEO ── */}
          <header className="mb-8">
            <p className="font-mono text-sm text-slate-500 mb-3">
              The Definitive Verdict · Tis the Podcast
            </p>
            <h1 className="text-4xl font-bold text-slate-900 leading-tight">
              Is {article.film}{article.year ? ` (${article.year})` : ''} a Christmas Movie?
            </h1>
            {article.verdictLine && (
              <p className="mt-4 text-xl leading-8 text-slate-800">
                <strong>{article.verdictLine}</strong> {article.verdictReason}
              </p>
            )}
            {review?.rating && (
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                <StarRating rating={review.rating} />
                {review.director && <span>Dir. {review.director}</span>}
                {review.runtime && <span>{review.runtime} min</span>}
                {review.streaming && <span>Streaming: {review.streaming}</span>}
              </div>
            )}
            {transcript && <TranscriptJumpLink />}
          </header>

          {/* ── Opening verdict — first 100 words, AI-pullable ── */}
          <div className={`rounded-lg border-2 px-6 py-5 mb-10 ${verdict.className}`}>
            <p className={`text-sm font-bold uppercase tracking-wide mb-2 ${verdict.labelClass}`}>
              {verdict.label}
            </p>
            <p className="text-lg font-bold text-slate-900 leading-snug mb-2">
              {article.verdictStatement}
            </p>
            <p className="text-base text-slate-700 leading-relaxed">
              {article.verdictExplanation}
            </p>
          </div>

          {/* ── Case FOR ── */}
          {article.caseFor?.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Why {article.film} IS a Christmas Movie
              </h2>
              <ul className="space-y-3">
                {article.caseFor.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 text-green-500 font-bold shrink-0">✓</span>
                    <span className="text-slate-700 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ── Case AGAINST ── */}
          {article.caseAgainst?.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Why {article.film} is NOT a Christmas Movie
              </h2>
              <ul className="space-y-3">
                {article.caseAgainst.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 text-red-400 font-bold shrink-0">✗</span>
                    <span className="text-slate-700 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <hr className="border-slate-200 mb-10" />

          {/* ── Merged review ── */}
          {review && (review.ourTake || review.isWorthWatching || review.theDebate) && (
            <section className="mb-10 space-y-6">
              {review.ourTake && (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3">Our Review</h2>
                  <p className="text-slate-700 leading-relaxed">{review.ourTake}</p>
                </div>
              )}
              {review.isWorthWatching && (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3">
                    Is {article.film} Worth Watching?
                  </h2>
                  <p className="text-slate-700 leading-relaxed">{review.isWorthWatching}</p>
                </div>
              )}
              {review.theDebate && (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3">The Debate on the Show</h2>
                  <p className="text-slate-700 leading-relaxed">{review.theDebate}</p>
                </div>
              )}
            </section>
          )}

          {/* ── Podcast angle ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              What Tis the Podcast Thinks
            </h2>
            <p className="text-slate-700 leading-relaxed mb-5">
              {article.podcastAngle}
            </p>
            {article.episodeId ? (
              <Link
                href={`/${article.episodeId}`}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-700 transition-colors"
              >
                🎧 Listen to Episode {article.episodeNumber} — {article.film}
              </Link>
            ) : (
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-bold text-pink-600 hover:text-pink-700"
              >
                Browse all episodes →
              </Link>
            )}
          </section>

          {/* ── Watch List link ── */}
          <div className="mb-10 rounded-lg border border-slate-200 bg-slate-50 px-5 py-4">
            <p className="text-sm text-slate-500 mb-1">See the full ranking</p>
            <Link
              href="/the-watch-list"
              className="text-base font-bold text-pink-600 hover:text-pink-700"
            >
              {review?.watchListRank
                ? `${article.film} is ranked #${review.watchListRank} on the Tis the Podcast Watch List →`
                : `Where does ${article.film} rank on the Tis the Podcast Watch List? →`}
            </Link>
          </div>

          {/* ── FAQ block ── */}
          {faqs?.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Frequently Asked Questions
              </h2>
              <dl className="space-y-6">
                {faqs.map((faq) => (
                  <div key={faq.q} className="border-l-2 border-slate-200 pl-5">
                    <dt className="font-bold text-slate-900 mb-1">{faq.q}</dt>
                    <dd className="text-slate-600 leading-relaxed">{faq.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {/* ── Related debates ── */}
          {relatedArticles.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                More Christmas Movie Debates
              </h2>
              <div className="flex flex-wrap gap-3">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/is-it-a-christmas-movie/${related.slug}`}
                    className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-pink-300 hover:text-pink-600 transition-colors"
                  >
                    Is {related.film} a Christmas Movie?
                  </Link>
                ))}
              </div>
            </section>
          )}

          {transcript && <TranscriptSection transcript={transcript} />}
        </Container>
      </article>
    </>
  )
}

export const revalidate = 86400
