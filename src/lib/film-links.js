// One movie = one page. When a film has both a /reviews/<slug> page and an
// /is-it-a-christmas-movie/<slug> verdict page, the verdict page is the
// canonical one (it matches the search question and ranks better); the
// review's rating, take and transcript are merged into it and the old review
// URL 301s there. Films without a verdict page keep their review page.
import filmReviews from '@/data/film-reviews.json'
import isItChristmas from '@/data/is-it-christmas.json'

const IS_IT_SLUGS = new Set(isItChristmas.map((a) => a.slug))

export const MERGED_REVIEW_SLUGS = filmReviews
  .map((f) => f.slug)
  .filter((slug) => IS_IT_SLUGS.has(slug))

const MERGED = new Set(MERGED_REVIEW_SLUGS)

export const isMergedReview = (slug) => MERGED.has(slug)

// Reviews that still have their own page.
export const standaloneReviews = filmReviews.filter((f) => !MERGED.has(f.slug))

export function getReviewForVerdict(slug) {
  return MERGED.has(slug) ? filmReviews.find((f) => f.slug === slug) : null
}

// Where a review link should point.
export function reviewHref(slug) {
  return MERGED.has(slug) ? `/is-it-a-christmas-movie/${slug}` : `/reviews/${slug}`
}

// The hub page an episode defers to (canonical), if any.
export function hubHrefForEpisode(episodeId) {
  const review = filmReviews.find((f) => f.episodeId === episodeId)
  return review ? reviewHref(review.slug) : null
}

export function hubLabelForEpisode(episodeId) {
  const review = filmReviews.find((f) => f.episodeId === episodeId)
  if (!review) return null
  return MERGED.has(review.slug)
    ? `Our verdict: Is ${review.title} a Christmas movie?`
    : `Read our full ${review.title} review`
}
