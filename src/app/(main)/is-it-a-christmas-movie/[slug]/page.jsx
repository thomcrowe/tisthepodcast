import { notFound } from 'next/navigation'
import Link from 'next/link'

import { Container } from '@/components/Container'
import articles from '@/data/is-it-christmas.json'

const SITE_URL = 'https://www.tisthepodcast.com'

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

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) return {}

  const title = `Is ${article.film} a Christmas Movie? | Tis the Podcast's Definitive Verdict`
  const description = `${article.verdictStatement} ${article.verdictExplanation.slice(0, 120)}…`

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/is-it-a-christmas-movie/${article.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/is-it-a-christmas-movie/${article.slug}`,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/og-image.jpg'] },
  }
}

export default async function IsItAChristmasMoviePage({ params }) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) notFound()

  const verdict = VERDICT_CONFIG[article.verdict]

  const relatedArticles = (article.relatedSlugs ?? [])
    .map((s) => articles.find((a) => a.slug === s))
    .filter(Boolean)

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

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
              Where does {article.film} rank on the Tis the Podcast Watch List? →
            </Link>
          </div>

          {/* ── FAQ block ── */}
          {article.faqs?.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Frequently Asked Questions
              </h2>
              <dl className="space-y-6">
                {article.faqs.map((faq) => (
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

        </Container>
      </article>
    </>
  )
}

export const revalidate = 86400
