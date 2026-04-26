import Image from 'next/image'

import { Container } from '@/components/Container'

export const metadata = {
  title: 'About',
  description:
    'Meet the elves behind Tis the Podcast — Anthony Caruso, Julia Colburn, and Thom Crowe — three Christmas obsessives keeping the holiday spirit alive 365 days a year.',
  alternates: {
    canonical: 'https://tisthepodcast.com/about',
  },
  openGraph: {
    title: 'About | Tis the Podcast',
    description:
      'Meet the elves behind Tis the Podcast — Anthony Caruso, Julia Colburn, and Thom Crowe — three Christmas obsessives keeping the holiday spirit alive 365 days a year.',
  },
}

function TwitterIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function InstagramIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  )
}

const BRAND_ICONS = { twitter: TwitterIcon, instagram: InstagramIcon }

const LK = ({ className = '', username = '', brand = '' }) => {
  const Icon = BRAND_ICONS[brand]
  if (!Icon) return null
  return (
    <a
      className={`inline-flex items-center justify-center rounded-full w-[2em] h-[2em] -my-[0.5em] ${className}`}
      rel="noreferrer"
      href={`https://${brand}.com/${username}`}
      target="_blank"
      aria-label={`${username} on ${brand}`}
    >
      <Icon className="w-[1em] h-[1em]" />
    </a>
  )
}

const Blog = ({ title = '', url = '', children }) => (
  <div className="my-6">
    <b>{title}</b>
    <div className="mt-4 flex flex-col items-start gap-4 sm:flex-row">
      <Image
        className="mt-1"
        width={150}
        height={150}
        src={`https://cdn.raster.app/tis-the-podcast/library/${url}`}
        alt=""
      />
      <p>{children}</p>
    </div>
  </div>
)

export default function About() {
  return (
    <Container className="pt-16 pb-12 sm:pb-4 lg:pt-12">
      <div className="grid">
        <div>
          <h1 className="mb-6 text-2xl font-bold uppercase leading-7 text-slate-900">
            About Tis Podcast
          </h1>
          <p>
            Welcome to Tis the Podcast, the Christmas podcast that&apos;s
            determined to keep the spirit of Christmas alive 365 days a year!
            Join us and our community as we talk all things Christmas! So what
            can you expect from this group of misfit toys? Every week we&apos;re
            going to look at a different Christmas movie, special, or TV
            episode. As we talk, we&apos;ll share our reviews, insights, and
            witty banter. As our reviews grow, you can find the canonical
            ranking of Christmas movies here on our site. Really, what more
            could you want out of a Christmas podcast?
          </p>
        </div>
        <h1 className="mt-8 text-2xl font-bold uppercase leading-7 text-slate-900">
          ABOUT THE ELVES
        </h1>
        <Blog
          title="ANTHONY CARUSO aka Santa's Head Elf"
          url="oLQz8thDQY?ixlib=js-3.7.0&s=6ff8176dfd3a551d3b0a8b98129ef4db"
        >
          One part Buddy the Elf, Two parts Bernard the Elf, and 0 parts Curtis
          the Elf, Anthony is what some would call &apos;New York Brash&apos;.
          Beneath the hard exterior, he has a heart of silver and gold though,
          and lives to keep the Christmas Spirit Alive 365 days per year. In
          addition to Christmas, Anthony is an avid reader and writer, and has
          massive amounts of love for Spooky Season, Movies, DC Comics
          (especially Batman), Politics, and his wife, Sarah, and dog, Larry.
          All complaints about his cinematic opinions can be directed to the
          worst elf, Thom.{' '}
          <LK
            brand="twitter"
            username="TheSandersonBro"
            className="text-[#1d9bf0]"
          />
          <LK
            brand="instagram"
            className="instagram-icon -ml-[0.5em]"
            username="anthonyc929"
          />
        </Blog>
        <Blog
          title="JULIA COLBURN aka The Holiday Armadillo"
          url="EPNB1MlDol?ixlib=js-3.7.0&s=14e31d4a100d2163619a58df2876c422"
        >
          Julia is a people-loving Pollyanna with an affinity for useless
          knowledge and pop-culture trivia. She can often speak in Movie/TV
          Quotes and Gifs. With her amazing husband&apos;s support, she has
          made it her goal to raise their 4 kids to not be cotton-headed ninny
          muggins.{' '}
          <LK
            brand="instagram"
            className="instagram-icon"
            username="hartnhevn"
          />
        </Blog>
        <Blog
          title="THOM CROWE aka Chief Reindeer Pooper Scooper"
          url="11br4i6IKX?ixlib=js-3.7.0&s=9f0cf48f0e5fccbe9088fcd6b30892b2"
        >
          Thom, or Fr. Thom, has a self-diagnosed Christmas obsession and the
          audacity to act surprised when his very loving wife and sweet daughter
          push back on carols in July. An Episcopal priest and marketing
          professional based in Tulsa, Oklahoma, Thom also co-leads a Girl Scout
          troop, loves to cook, reads voraciously, and will defend his cinematic
          opinions to anyone willing to listen. Complaints, as always, go to
          Anthony.{' '}
          <LK
            brand="twitter"
            username="thomcrowe"
            className="text-[#1d9bf0]"
          />
          <LK
            brand="instagram"
            className="instagram-icon -ml-[0.5em]"
            username="thomcrowe"
          />
        </Blog>
      </div>
    </Container>
  )
}
