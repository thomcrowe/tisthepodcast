// IndexNow (https://www.indexnow.org): tells Bing — and through it ChatGPT
// search and Copilot — plus Yandex, Seznam and Naver about new or changed URLs
// within minutes instead of waiting for a crawl. The key is public by design;
// it's served at /23fc11d8415338614530dcbd8ca05f76.txt to prove we own the host.
export const INDEXNOW_KEY = '23fc11d8415338614530dcbd8ca05f76'
const HOST = 'tisthepodcast.com'
const SITE_URL = `https://${HOST}`

export async function submitToIndexNow(paths) {
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
    return { skipped: 'not production' }
  }
  const urlList = [...new Set(paths)].map((p) => (p.startsWith('http') ? p : `${SITE_URL}${p}`))
  if (!urlList.length) return { skipped: 'no urls' }
  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
    })
    // 200 = accepted, 202 = accepted pending key check
    return { status: res.status, submitted: urlList.length }
  } catch (error) {
    return { error: String(error) }
  }
}
