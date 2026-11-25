# JSON-LD samples for Google's Rich Results Test

Pulled from production (https://tisthepodcast.com) after the SEO push. Paste a block into https://search.google.com/test/rich-results (choose **Code**) or test the URL directly.

## TV episode page (PodcastEpisode + FAQPage)

URL: https://tisthepodcast.com/oy-to-the-world-the-nanny-chrismukkah-episodes

```json
{
  "@context": "https://schema.org",
  "@type": "PodcastEpisode",
  "url": "https://tisthepodcast.com/oy-to-the-world-the-nanny-chrismukkah-episodes",
  "name": "The Nanny Christmas & Hanukkah Episodes (Full List)",
  "datePublished": "2023-06-05T07:00:00.000Z",
  "description": "Every Nanny Christmas & Hanukkah episode: S1E7, S3E14 \"Oy to the World\" and S6E10 \"The Hanukkah Story\" — broken down with Santa Claus himself as our guest.",
  "episodeNumber": 331,
  "genre": "Christmas Movies",
  "associatedMedia": {
    "@type": "MediaObject",
    "contentUrl": "https://mcdn.podbean.com/mf/web/h936vv/The_Nanny_Edited_-_6_2_23_620_PM6u70q.mp3",
    "encodingFormat": "audio/mpeg"
  },
  "partOfSeries": {
    "@type": "PodcastSeries",
    "name": "Tis the Podcast",
    "url": "https://tisthepodcast.com",
    "webFeed": "https://feed.podbean.com/tisthepodcast/feed.xml"
  },
  "about": {
    "@type": "TVSeries",
    "name": "The Nanny",
    "episode": [
      {
        "@type": "TVEpisode",
        "name": "The Christmas Episode",
        "episodeNumber": 7,
        "partOfSeason": {
          "@type": "TVSeason",
          "seasonNumber": 1
        }
      },
      {
        "@type": "TVEpisode",
        "name": "Oy to the World",
        "episodeNumber": 14,
        "partOfSeason": {
          "@type": "TVSeason",
          "seasonNumber": 3
        }
      },
      {
        "@type": "TVEpisode",
        "name": "The Hanukkah Story",
        "episodeNumber": 10,
        "partOfSeason": {
          "@type": "TVSeason",
          "seasonNumber": 6
        }
      }
    ]
  }
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Which The Nanny Christmas episodes does Tis the Podcast cover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "This episode covers \"The Christmas Episode\" (S1E7), \"Oy to the World\" (S3E14), \"The Hanukkah Story\" (S6E10)."
      }
    },
    {
      "@type": "Question",
      "name": "Where can I listen to the Tis the Podcast episode on The Nanny's Christmas episodes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is available at https://tisthepodcast.com/oy-to-the-world-the-nanny-chrismukkah-episodes and on Spotify, Apple Podcasts, and all major podcast platforms."
      }
    }
  ]
}
```

## Movie episode page (PodcastEpisode + FAQPage)

URL: https://tisthepodcast.com/and-the-grinch-raised-his-glass-and-led-the-whos-in-a-toast-to-kindness-and-love-the-things-we-need-most

```json
{
  "@context": "https://schema.org",
  "@type": "PodcastEpisode",
  "url": "https://tisthepodcast.com/and-the-grinch-raised-his-glass-and-led-the-whos-in-a-toast-to-kindness-and-love-the-things-we-need-most",
  "name": "Dr. Seuss' The Grinch [2018] Review",
  "datePublished": "2019-01-28T06:01:00.000Z",
  "description": "Is 2018's animated Dr. Seuss' The Grinch worth a rewatch? After an all-out war over the Grinch last time, the elves return to Whoville for the remake.",
  "episodeNumber": 82,
  "genre": "Christmas Movies",
  "associatedMedia": {
    "@type": "MediaObject",
    "contentUrl": "https://mcdn.podbean.com/mf/web/hstvev/And_The_Grinch_Raised_His_Glass_And_Led_The_Whos_In_A_Toast_-_22To_Kindness_And_Love_The_Things_We_Need_Most_22.mp3",
    "encodingFormat": "audio/mpeg"
  },
  "partOfSeries": {
    "@type": "PodcastSeries",
    "name": "Tis the Podcast",
    "url": "https://tisthepodcast.com",
    "webFeed": "https://feed.podbean.com/tisthepodcast/feed.xml"
  }
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is Dr. Seuss' The Grinch [2018] a Christmas movie?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tis the Podcast covered Dr. Seuss' The Grinch [2018] in Episode 82, with hosts Anthony Caruso, Julia Colburn, and Thom Crowe debating its merits as a Christmas movie. Is 2018's animated Dr. Seuss' The Grinch worth a rewatch? After an all-out war over the Grinch last time, the elves return to Whoville for the remake."
      }
    },
    {
      "@type": "Question",
      "name": "Where can I listen to the Tis the Podcast episode on Dr. Seuss' The Grinch [2018]?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is available at https://tisthepodcast.com/and-the-grinch-raised-his-glass-and-led-the-whos-in-a-toast-to-kindness-and-love-the-things-we-need-most and on Spotify, Apple Podcasts, and all major podcast platforms."
      }
    }
  ]
}
```

## Is It a Christmas Movie? page (FAQPage + Movie)

URL: https://tisthepodcast.com/is-it-a-christmas-movie/die-hard

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is Die Hard a Christmas movie?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Die Hard is a Christmas movie. It takes place entirely on Christmas Eve, and its family-reunion story makes the holiday structural, not incidental."
      }
    },
    {
      "@type": "Question",
      "name": "Did Bruce Willis say Die Hard is not a Christmas movie?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — Bruce Willis has publicly stated that Die Hard is not a Christmas movie. However, director John McTiernan has said the opposite. The debate continues, and Tis the Podcast has the definitive verdict."
      }
    },
    {
      "@type": "Question",
      "name": "Where does Die Hard rank on the Tis the Podcast Watch List?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Die Hard is one of the most discussed films on the Tis the Podcast canonical Christmas movie Watch List. Listen to the full episode or visit tisthepodcast.com/the-watch-list for the ranking."
      }
    },
    {
      "@type": "Question",
      "name": "What other films are in the Die Hard Christmas movie debate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Other films frequently debated as Christmas movies include Iron Man 3, Lethal Weapon, Kiss Kiss Bang Bang, Batman Returns, and The Nightmare Before Christmas — all reviewed on Tis the Podcast."
      }
    }
  ]
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "Movie",
  "name": "Die Hard",
  "dateCreated": "1988",
  "url": "https://tisthepodcast.com/is-it-a-christmas-movie/die-hard"
}
```

## Show landing page (ItemList)

URL: https://tisthepodcast.com/christmas-episodes/home-improvement

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Home Improvement Christmas Episodes",
  "url": "https://tisthepodcast.com/christmas-episodes/home-improvement",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "S1E12 Yule Better Watch Out",
      "url": "https://tisthepodcast.com/ah-but-tim-the-spirit-of-santa-lives-on-he-lives-in-all-of-us"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "S2E12 I'm Scheming of a White Christmas",
      "url": "https://tisthepodcast.com/ah-but-tim-the-spirit-of-santa-lives-on-he-lives-in-all-of-us"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "S3E10 A Frozen Moment",
      "url": "https://tisthepodcast.com/ah-but-tim-the-spirit-of-santa-lives-on-he-lives-in-all-of-us"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "S3E12 'Twas the Blight Before Christmas",
      "url": "https://tisthepodcast.com/i-remembermy-firstchristmasrebellioni-was-somadmy-parentswentoutand-boughtan-artificialtreethewholechristmasi-refusedto-singoh-tannenbaum"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "S4E11 Some Like it Hot Rod",
      "url": "https://tisthepodcast.com/i-remembermy-firstchristmasrebellioni-was-somadmy-parentswentoutand-boughtan-artificialtreethewholechristmasi-refusedto-singoh-tannenbaum"
    },
    {
      "@type": "ListItem",
      "position": 6,
      "name": "S4E12 'Twas the Night Before Chaos",
      "url": "https://tisthepodcast.com/i-remembermy-firstchristmasrebellioni-was-somadmy-parentswentoutand-boughtan-artificialtreethewholechristmasi-refusedto-singoh-tannenbaum"
    },
    {
      "@type": "ListItem",
      "position": 7,
      "name": "S5E12 'Twas the Flight Before Christmas",
      "url": "https://tisthepodcast.com/what-is-a-clown-doing-next-to-baby-jesus-home-improvement"
    },
    {
      "@type": "ListItem",
      "position": 8,
      "name": "S7E11 Bright Christmas",
      "url": "https://tisthepodcast.com/what-is-a-clown-doing-next-to-baby-jesus-home-improvement"
    },
    {
      "@type": "ListItem",
      "position": 9,
      "name": "S8E11 Home for the Holidays",
      "url": "https://tisthepodcast.com/what-is-a-clown-doing-next-to-baby-jesus-home-improvement"
    }
  ],
  "numberOfItems": 9
}
```

## TV hub (ItemList, first 5 items shown)

URL: https://tisthepodcast.com/christmas-episodes

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "TV Christmas Episodes Covered by Tis the Podcast",
  "url": "https://tisthepodcast.com/christmas-episodes",
  "numberOfItems": 61,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "30 Rock Christmas Episodes",
      "url": "https://tisthepodcast.com/happy-holidays-from-everyone-except-jenna"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Abbott Elementary Christmas Episodes",
      "url": "https://tisthepodcast.com/that-elf-sized-elf-will-try-to-perform-some-christmas-miracle-and-reunite-me-with-that-man-abbott-elementarys-christmas-episodes-season-4"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "ALF Christmas Episodes",
      "url": "https://tisthepodcast.com/in-the-words-of-the-immortal-saint-frosty-the-snowman-god-bless-us-everyone"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Arrested Development Christmas Episodes",
      "url": "https://tisthepodcast.com/sky-rockets-in-flight-afternoon-delight"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "Batman: The Animated Series Christmas Episodes",
      "url": "https://tisthepodcast.com/jingle-bells-batmansmells-robinlaidan-egg-the-batmobile-lost-a-wheelandthe-jokergot-awaythechristmasepisodes-of-batmantheanimated-seriesandjustice"
    }
  ]
}
```

## List page (ItemList + FAQPage)

URL: https://tisthepodcast.com/underrated-christmas-movies

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Underrated Christmas Movies — Tis the Podcast",
  "description": "The best underrated Christmas movies curated by Tis the Podcast.",
  "url": "https://tisthepodcast.com/underrated-christmas-movies",
  "numberOfItems": 10,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Klaus (2019)",
      "url": "https://tisthepodcast.com/a-true-selfless-act-always-sparks-another"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "The Muppet Christmas Carol (1992)",
      "url": "https://tisthepodcast.com/it-feels-like-christmas-1508758888"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Batman Returns (1992)",
      "url": "https://tisthepodcast.com/mistletoe-can-be-deadily-if-you-eat-it-but-a-kiss-can-be-even-deadlier-if-you-mean-it"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Gremlins (1984)",
      "url": "https://tisthepodcast.com/look-mister-there-are-some-rules-that-youve-got-to-follow"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "The Holiday (2006)",
      "url": "https://tisthepodcast.com/youre-supposed-to-be-the-leading-lady-in-your-own-life-for-gods-sake"
    },
    {
      "@type": "ListItem",
      "position": 6,
      "name": "The Ref (1994)",
      "url": "https://tisthepodcast.com/i-have-never-heard-of-such-a-christmas-sex-and-drugs-and-women-being-set-on-fire"
    },
    {
      "@type": "ListItem",
      "position": 7,
      "name": "While You Were Sleeping (1995)",
      "url": "https://tisthepodcast.com/and-i-told-him-it-was-while-you-were-sleeping"
    },
    {
      "@type": "ListItem",
      "position": 8,
      "name": "Holiday Inn (1942)",
      "url": "https://tisthepodcast.com/you-sound-sweet-but-you-dont-make-sense-holiday-inn"
    },
    {
      "@type": "ListItem",
      "position": 9,
      "name": "The Christmas Chronicles (2018)",
      "url": "https://tisthepodcast.com/the-christmas-chronicles-a-very-special-bonus-episode"
    },
    {
      "@type": "ListItem",
      "position": 10,
      "name": "Edward Scissorhands (1990)",
      "url": "https://tisthepodcast.com/but-if-you-had-regular-hands-youd-be-like-everyone-else"
    }
  ]
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the most underrated Christmas movies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The most underrated Christmas movies include Klaus (2019), The Muppet Christmas Carol (1992), Batman Returns (1992), Gremlins (1984), The Holiday (2006), The Ref (1994), While You Were Sleeping (1995), Holiday Inn (1942), The Christmas Chronicles (2018), and Edward Scissorhands (1990). These films are championed by Tis the Podcast — the Christmas movie podcast that watches holiday films year-round."
      }
    },
    {
      "@type": "Question",
      "name": "What is the most underrated Christmas movie of all time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Klaus (2019) is arguably the most underrated Christmas movie of the modern era — the first Netflix animated film to receive an Oscar nomination for Best Animated Feature, yet widely overlooked. Among classics, The Muppet Christmas Carol (1992) is chronically underrated despite being the definitive screen adaptation of A Christmas Carol."
      }
    },
    {
      "@type": "Question",
      "name": "Are there any good Christmas movies for adults that aren't well known?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The best underrated adult Christmas movies are The Ref (1994) — a dark hostage-comedy with Denis Leary — and Batman Returns (1992), Tim Burton's Christmas-drenched superhero film. Gremlins (1984) is also excellent for adults who want horror-comedy at Christmas. All have been discussed on Tis the Podcast."
      }
    },
    {
      "@type": "Question",
      "name": "What Christmas movies are worth watching outside of December?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Any great Christmas movie is worth watching year-round — that's the entire premise of Tis the Podcast, which has reviewed Christmas films every week since 2017. The best films for year-round watching are those with stories strong enough to transcend the holiday setting: Klaus (2019), The Muppet Christmas Carol (1992), While You Were Sleeping (1995), and Edward Scissorhands (1990)."
      }
    }
  ]
}
```
