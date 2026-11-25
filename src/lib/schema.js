// Shared schema.org helpers.
export const SITE_URL = 'https://tisthepodcast.com'
export const ORG_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

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
