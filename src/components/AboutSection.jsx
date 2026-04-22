'use client'

import { useState } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

import { TinyWaveFormIcon } from '@/components/TinyWaveFormIcon'

export function AboutSection(props) {
  let [isExpanded, setIsExpanded] = useState(false)

  return (
    <section {...props}>
      <h2 className="flex items-center gap-4 font-mono text-sm font-medium leading-7 text-slate-900">
        <span className="flex items-center">
          <TinyWaveFormIcon
            colors={['fill-green-600', 'fill-red-600']}
            className="h-2.5 w-2.5"
          />
          <Link href="/about" className="ml-2.5 hover:text-green-700 transition-colors">About</Link>
        </span>
        <span className="text-slate-300">/</span>
        <Link href="/the-watch-list" className="hover:text-green-700 transition-colors">The Watch List</Link>
      </h2>
      <p
        className={clsx(
          'mt-2 text-base leading-7 text-slate-700',
          !isExpanded && 'lg:line-clamp-4',
        )}
      >
        Welcome to Tis the Podcast, the podcast that&apos;s determined to keep
        the spirit of Christmas alive 365 days a year! Join us and our community
        as we talk all things Christmas! So what can you expect from this group
        of misfit toys? Every week we&apos;re going to look at a different
        Christmas movie, special, or TV episode. As we talk, we&apos;ll share
        our reviews, insights, and witty banter. As our reviews grow, you can
        find the canonical ranking of Christmas movies here on our site. Really,
        what more could you want out of a Christmas podcast?
      </p>
      {!isExpanded && (
        <button
          type="button"
          className="mt-2 hidden text-sm font-bold leading-6 text-pink-600 hover:text-pink-700 active:text-pink-900 lg:inline-block"
          onClick={() => setIsExpanded(true)}
        >
          Show more
        </button>
      )}
    </section>
  )
}
