// Shared schema.org helpers.
export const SITE_URL = 'https://tisthepodcast.com'
export const ORG_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`
export const SERIES_ID = `${SITE_URL}/#podcast`

// The hosts, as Person entities referenced by @id from every episode and
// verdict page. Add each host's own profile URLs to sameAs as they're known.
export const HOSTS = [
  { slug: 'anthony-caruso', name: 'Anthony Caruso', sameAs: [] },
  { slug: 'julia-colburn', name: 'Julia Colburn', sameAs: [] },
  {
    slug: 'thom-crowe',
    name: 'Thom Crowe',
    sameAs: ['https://thomcrowe.com', 'https://www.linkedin.com/in/thomcrowe'],
  },
]
export const hostId = (slug) => `${SITE_URL}/about#${slug}`
export const HOST_REFS = HOSTS.map((h) => ({ '@id': hostId(h.slug) }))

export const hostsLd = HOSTS.map((h) => ({
  '@type': 'Person',
  '@id': hostId(h.slug),
  name: h.name,
  url: `${SITE_URL}/about`,
  memberOf: { '@id': ORG_ID },
  ...(h.sameAs.length ? { sameAs: h.sameAs } : {}),
}))

// items: [{ name, href }] from the homepage down to the current page.
// The last item is the current page.
export function breadcrumbLd(items) {
  const all = [{ name: 'Tis the Podcast', href: '/' }, ...items]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.href === '/' ? '' : item.href}`,
    })),
  }
}
