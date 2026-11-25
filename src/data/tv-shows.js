// TV shows whose Christmas (or holiday) episodes Tis the Podcast has covered.
//
// SOURCE RULE: every season/episode number and title below comes from the
// show notes of the podcast episode it is attached to. Nothing is filled in
// from memory. Where the notes don't list numbers, the entry says so in
// `gaps` and the page renders whatever the notes do give us.
//
// Fields
//   slug          URL segment for /christmas-episodes/[slug]
//   name          Display name
//   holiday       'Christmas' | 'Christmas & Hanukkah' — used in titles/H1s
//   landingPage   true  → /christmas-episodes/[slug] is a real page
//                 false → the show was covered in ONE podcast episode, so that
//                         episode page *is* the canonical list page and
//                         /christmas-episodes/[slug] 301s to it (avoids two
//                         pages competing for "[show] christmas episodes").
//   complete      true when our notes say we covered all of the show's
//                 Christmas episodes — enables "(Full List)" in titles.
//   intro         Short intro for the landing page, written in the show's voice.
//   coverage      One entry per podcast episode:
//                   { id, part?, title?, episodes: [{ season, episode, title, airYear? }] }
//                 season/episode may be null when the notes only name the title.
//   gaps          Human-readable TODOs (surfaced in the SEO TODO list).

export const TV_SHOWS = [
  // ── Multi-episode shows: real landing pages ────────────────────────────
  {
    slug: 'last-man-standing',
    name: 'Last Man Standing',
    holiday: 'Christmas',
    landingPage: true,
    complete: true,
    intro:
      "Mike Baxter would like you to know that Christmas is not a participation trophy. Over two episodes, the elves worked through every Christmas episode of Tim Allen's sitcom — Santa suits, family feuds, and the eternal question of who has to put up the tree.",
    coverage: [
      {
        id: 'me-in-a-santa-suit-i-dont-think-so-last-man-standing-first-four-christmas-episodes',
        part: 'Part 1: the first four Christmas episodes',
        episodes: [
          { season: 1, episode: 10, title: 'Last Christmas Standing' },
          { season: 2, episode: 7, title: 'Putting a Hit on Christmas' },
          { season: 3, episode: 11, title: 'Elfie' },
          { season: 4, episode: 11, title: 'Wedding Planning' },
        ],
      },
      {
        id: 'ryan-just-admitted-he-was-wrong-its-a-christmas-miracle-last-man-standing-pt-2',
        part: 'Part 2: the final three Christmas episodes',
        episodes: [
          { season: null, episode: null, title: 'The Gift of the Wise Man' },
          { season: null, episode: null, title: 'My Name is Rob' },
          { season: null, episode: null, title: 'The Gift of the Mike Guy' },
        ],
      },
    ],
    gaps: ['Part 2 show notes name the three episodes but give no season/episode numbers.'],
  },
  {
    slug: 'home-improvement',
    name: 'Home Improvement',
    holiday: 'Christmas',
    landingPage: true,
    complete: true,
    intro:
      "More power! Tim Taylor never met a Christmas light display he couldn't overload, and Home Improvement turned that into an annual tradition. The elves covered every Christmas episode across three podcast episodes — grunts, Wilson's fence-side wisdom, and all.",
    coverage: [
      {
        id: 'ah-but-tim-the-spirit-of-santa-lives-on-he-lives-in-all-of-us',
        part: 'Part 1',
        episodes: [
          { season: 1, episode: 12, title: 'Yule Better Watch Out' },
          { season: 2, episode: 12, title: "I'm Scheming of a White Christmas" },
          { season: 3, episode: 10, title: 'A Frozen Moment' },
        ],
      },
      {
        id: 'i-remembermy-firstchristmasrebellioni-was-somadmy-parentswentoutand-boughtan-artificialtreethewholechristmasi-refusedto-singoh-tannenbaum',
        part: 'Part 2',
        episodes: [
          { season: 3, episode: 12, title: "'Twas the Blight Before Christmas" },
          { season: 4, episode: 11, title: 'Some Like it Hot Rod' },
          { season: 4, episode: 12, title: "'Twas the Night Before Chaos" },
        ],
      },
      {
        id: 'what-is-a-clown-doing-next-to-baby-jesus-home-improvement',
        part: 'Part 3',
        episodes: [
          { season: 5, episode: 12, title: "'Twas the Flight Before Christmas" },
          { season: 7, episode: 11, title: 'Bright Christmas' },
          { season: 8, episode: 11, title: 'Home for the Holidays' },
        ],
      },
    ],
    gaps: [],
  },
  {
    slug: 'the-office',
    name: 'The Office',
    holiday: 'Christmas',
    landingPage: true,
    complete: true,
    intro:
      "Party Planning Committee, assemble. Dunder Mifflin's Christmas parties gave us Yankee swaps, Benihana waitresses, and Meredith on fire — and the elves have covered all of them, first in 2018 and again via the extended Superfan cuts.",
    coverage: [
      {
        id: 'happy-birthday-jesus-sorry-your-partys-so-lame',
        title: 'The Office Christmas Episodes (All Seven)',
        part: 'The 2018 episode: all seven Christmas episodes',
        episodes: [],
      },
      {
        id: 'the-office-christmas-party-moroccan-christmas-extended-editions',
        title: 'The Office Christmas Episodes Revisited, Part 1',
        part: 'Revisited, Part 1 (Superfan extended editions)',
        episodes: [
          { season: 2, episode: null, title: 'Christmas Party' },
          { season: null, episode: null, title: 'A Benihana Christmas' },
          { season: null, episode: null, title: 'Moroccan Christmas' },
        ],
      },
      {
        id: 'the-office-christmas-episodes-revisited-part-two-secret-santa-and-classy-christmas',
        title: 'The Office Christmas Episodes Revisited, Part 2',
        part: 'Revisited, Part 2',
        episodes: [
          { season: 6, episode: null, title: 'Secret Santa' },
          { season: 7, episode: null, title: 'Classy Christmas' },
        ],
      },
      {
        id: 'the-office-christmas-episodes-revisited-part-three-secret-santa-and-classy-christmas',
        title: 'The Office Christmas Episodes Revisited, Part 3',
        part: 'Revisited, Part 3',
        episodes: [
          { season: 8, episode: null, title: 'Christmas Wishes' },
          { season: 9, episode: null, title: 'Dwight Christmas' },
        ],
      },
    ],
    gaps: [
      'The 2018 episode notes say "all seven Christmas episodes" but do not list them.',
      'Revisited episodes give season numbers only (no episode numbers); Benihana/Moroccan have neither.',
    ],
  },
  {
    slug: 'gilmore-girls',
    name: 'Gilmore Girls',
    holiday: 'Christmas',
    landingPage: true,
    complete: false,
    intro:
      "Copious amounts of coffee, a town that decorates like it's being graded, and a Friday-night dinner nobody can skip. The elves have spent two episodes in Stars Hollow at Christmastime.",
    coverage: [
      {
        id: 'how-do-you-think-grandma-got-those-legs-of-hers-shes-not-exactly-a-stairmaster-gal-gilmore-girls-season-1-episode-10-forgiveness-and-stuff',
        episodes: [{ season: 1, episode: 10, title: 'Forgiveness and Stuff' }],
      },
      {
        id: 'that-tree-has-earned-character-by-persevering-through-freezing-winter-and-forest-fires-and-floods-gilmore-girls-christmas-episodes-seasons-2-and-7',
        episodes: [
          { season: 2, episode: 10, title: 'The Bracebridge Dinner' },
          { season: 7, episode: 11, title: "Santa's Secret Stuff" },
        ],
      },
    ],
    gaps: [],
  },
  {
    slug: 'the-king-of-queens',
    name: 'The King of Queens',
    holiday: 'Christmas',
    landingPage: true,
    complete: true,
    intro:
      "Doug Heffernan just wants a quiet Christmas and a full plate. Arthur Spooner has other plans. With Matt Eurich of TGI Podcast, the elves covered all eight Christmas episodes across two parts.",
    coverage: [
      {
        id: 'i-can-t-stand-the-way-that-alvin-comes-in-late-it-s-disrespectful-to-the-other-chipmunks-the-king-of-queens-first-four-christmas-episodes',
        part: 'Part 1',
        episodes: [
          { season: 1, episode: 1, title: 'Noel Cowards' },
          { season: 2, episode: 12, title: 'Net Prophets' },
          { season: 3, episode: 11, title: 'Better Camera' },
          { season: 4, episode: 12, title: 'Ovary Action' },
        ],
      },
      {
        id: 'i-want-to-wish-you-both-a-merry-christmas-in-hell',
        part: 'Part 2',
        episodes: [
          { season: 5, episode: 11, title: 'Mentalo Case' },
          { season: 6, episode: 11, title: 'Santa Claustrophobia' },
          { season: 7, episode: 7, title: 'Silent Mite' },
          { season: 8, episode: 11, title: "Baker's Doesn't" },
        ],
      },
    ],
    gaps: ['Season 1, Episode 1 for "Noel Cowards" is as written in our notes — worth double-checking.'],
  },
  {
    slug: 'how-i-met-your-mother',
    name: 'How I Met Your Mother',
    holiday: 'Christmas',
    landingPage: true,
    complete: true,
    intro:
      "Kids, let me tell you about the Christmas we covered every holiday episode of How I Met Your Mother. It took two podcast episodes, one Lily-stole-Christmas debate, and more MacLaren's banter than anyone needed.",
    coverage: [
      {
        id: 'when-you-walk-through-the-door-does-it-feel-like-you-are-being-slapped-in-the-face-by-christmas-how-i-met-your-mother-pt-1',
        part: 'Part 1',
        episodes: [
          { season: 2, episode: 11, title: 'How Lily Stole Christmas' },
          { season: 4, episode: 11, title: 'Little Minnesota' },
          { season: 6, episode: 12, title: 'False Positive' },
        ],
      },
      {
        id: 'but-baby-what-about-our-magical-romantic-night-how-i-met-your-mother-pt-2',
        part: 'Part 2',
        episodes: [
          { season: 7, episode: 12, title: 'Symphony of Illumination' },
          { season: 8, episode: 12, title: 'The Final Page - Part Two' },
        ],
      },
    ],
    gaps: [],
  },
  {
    slug: 'black-ish',
    name: 'Black-ish',
    holiday: 'Christmas',
    landingPage: true,
    complete: true,
    intro:
      "Dre Johnson has a theory about Christmas, and he will explain it to you at length. The elves covered all six Black-ish Christmas episodes over two parts.",
    coverage: [
      {
        id: 'i-m-putting-my-stank-on-christmas-blackish-pt-1',
        part: 'Part 1',
        episodes: [
          { season: 1, episode: 10, title: 'Black Christmas/White Santa' },
          { season: 2, episode: 10, title: 'Stuff' },
          { season: 3, episode: 10, title: 'Just Christmas, Baby' },
        ],
      },
      {
        id: 'merry-christmas-pops-word-on-the-street-is-you-got-dumped-blackish-pt-2',
        part: 'Part 2',
        episodes: [
          { season: 5, episode: 8, title: 'Christmas in Theater Eight' },
          { season: 6, episode: 10, title: 'Father Christmas' },
          { season: 7, episode: 8, title: 'Compton Around the Christmas Tree' },
        ],
      },
    ],
    gaps: [],
  },
  {
    slug: 'the-big-bang-theory',
    name: 'The Big Bang Theory',
    holiday: 'Christmas',
    landingPage: true,
    complete: true,
    intro:
      "Sheldon Cooper considers Christmas a pagan festival with suspicious gift-giving protocols. The elves went through every Big Bang Theory Christmas episode across two parts.",
    coverage: [
      {
        id: 'frosty-ismerely-a-bit-offrozen-supernaturalephemerain-astolen-hata-crimeby-the-way-for-which-heis-neverbrought-toaccountthebig-bang-theoryfirst-3chri',
        part: 'Part 1',
        episodes: [
          { season: 2, episode: 11, title: 'The Bath Item Gift Hypothesis' },
          { season: 3, episode: 11, title: 'The Maternal Congruence' },
          { season: 6, episode: 11, title: 'The Santa Simulation' },
        ],
      },
      {
        id: 'in-the-last-ten-minutes-santa-claus-came-to-town-kissed-mommy-and-ran-grandma-over-with-a-reindeer-the-big-bang-theory-final-three-episodes',
        part: 'Part 2',
        episodes: [
          { season: 7, episode: 11, title: 'The Cooper Extraction' },
          { season: 8, episode: 11, title: 'The Clean Room Infiltration' },
          { season: 10, episode: 12, title: 'The Holiday Summation' },
        ],
      },
    ],
    gaps: [],
  },
  {
    slug: 'sabrina-the-teenage-witch',
    name: 'Sabrina the Teenage Witch',
    holiday: 'Christmas',
    landingPage: true,
    complete: true,
    intro:
      "Salem would like it on the record that he deserves a bigger stocking. The elves visited the Spellman household for six Christmases across two episodes.",
    coverage: [
      {
        id: 'i-m-so-happy-that-christmas-didn-t-suffer-the-fate-of-bobunksabrina-the-teenage-witch-pt-1',
        part: 'Part 1',
        episodes: [
          { season: 1, episode: 11, title: 'A Girl and Her Cat' },
          { season: 2, episode: 12, title: 'Sabrina Claus' },
          { season: 3, episode: 11, title: 'Christmas Amnesia' },
        ],
      },
      {
        id: 'it-s-just-not-christmas-without-a-visit-from-jolly-old-st-nicotine-sabrina-pt-2',
        part: 'Part 2',
        episodes: [
          { season: 4, episode: 12, title: 'Sabrina Nipping at Your Nose' },
          { season: 5, episode: 10, title: "Sabrina's Perfect Christmas" },
          { season: 7, episode: 9, title: "It's a Hot, Hot, Hot, Hot Christmas" },
        ],
      },
    ],
    gaps: [],
  },
  {
    slug: 'family-guy',
    name: 'Family Guy',
    holiday: 'Christmas',
    landingPage: true,
    complete: true,
    intro:
      "Quahog does Christmas loudly. Thom and Anthony took on every Family Guy Christmas episode across two marathon installments — scores out of ten, cutaways included.",
    coverage: [
      {
        id: 'merry-christmas-to-all-and-to-all-shut-the-hell-up-family-guy-pt-1',
        part: 'Part 1: the first six Christmas episodes',
        episodes: [
          { season: null, episode: null, title: "A Very Special Family Guy Freakin' Christmas" },
          { season: null, episode: null, title: 'How the Griffin Stole Christmas' },
        ],
      },
      {
        id: 'cant-rob-america-if-americas-broke-merry-christmas-everyone-final-5-family-guy-episodes',
        part: 'Part 2: the final five Christmas episodes',
        episodes: [
          { season: 16, episode: 9, title: "Don't Be a Dickens at Christmas" },
          { season: 18, episode: 9, title: 'Christmas is Coming' },
          { season: 19, episode: 9, title: 'The First No L' },
          { season: 20, episode: 10, title: 'Christmas Crime' },
          { season: 22, episode: 9, title: 'Return of the King of Queens' },
        ],
      },
    ],
    gaps: ['Part 1 notes say six episodes but only name two, with no season/episode numbers.'],
  },
  {
    slug: 'frasier',
    name: 'Frasier',
    holiday: 'Christmas',
    landingPage: true,
    complete: true,
    intro:
      "Hello, Seattle — we're listening. And at Christmas, the Crane brothers are arguing about the correct way to celebrate it. The elves covered every Christmas episode of the original run, then both holiday episodes of the 2023 Paramount+ revival.",
    coverage: [
      {
        id: 'this-is-the-night-we-celebrate-peace-and-togetherness-i-will-not-have-that-ruined',
        title: 'Frasier Christmas Episodes: Original Series (Full List)',
        part: 'The original series',
        episodes: [
          { season: 1, episode: 12, title: 'Miracle on 3rd or 4th Street' },
          { season: 3, episode: 9, title: 'Frasier Grinch' },
          { season: 5, episode: 9, title: 'Perspectives on Christmas' },
          { season: 6, episode: 10, title: 'Merry Christmas, Mrs. Moskowitz' },
          { season: 7, episode: 11, title: 'The Fight Before Christmas' },
          { season: 8, episode: 8, title: 'Mary Christmas' },
          { season: 10, episode: 10, title: 'We Two Kings' },
          { season: 11, episode: 11, title: 'High Holidays' },
        ],
      },
      {
        id: 'perfect-christmas-at-the-sizzler-frasier-2023-season-1-episode-10-reindeer-games',
        part: 'The 2023 revival, first Christmas episode',
        episodes: [{ season: 1, episode: 10, title: 'Reindeer Games' }],
      },
      {
        id: 'ebenezer-scrooge-was-a-frugal-realist-who-wasnt-taken-in-by-yuletide-nonsense-frasier-revival-second-christmas-episode',
        part: 'The 2023 revival, second Christmas episode',
        episodes: [{ season: 2, episode: 10, title: 'Father Christmas' }],
      },
    ],
    gaps: [],
  },
  {
    slug: 'ghosts',
    name: 'Ghosts',
    holiday: 'Christmas',
    landingPage: true,
    complete: false,
    intro:
      "Woodstone Manor at Christmas: a house full of ghosts from every century, each convinced their era did the holidays best. The elves have covered CBS's Ghosts holiday episodes twice.",
    coverage: [
      {
        id: 'were-hurting-because-our-friend-the-water-heater-here-is-on-deaths-door-ghosts-season-4-a-very-arondekar-christmas-parts-1-and-2',
        episodes: [
          { season: 4, episode: 8, title: 'A Very Arondekar Christmas, Part 1' },
          { season: 4, episode: 9, title: 'A Very Arondekar Christmas, Part 2' },
        ],
      },
      {
        id: 'you-see-aroundchristmaswecarols-aregiven-specialpowers-including-the-abilityto-grant-wishesghostsusitsa-wonderful-christmas-carol-parts-one-and-two',
        episodes: [
          { season: null, episode: null, title: "It's a Wonderful Christmas Carol, Part One", airYear: 2025 },
          { season: null, episode: null, title: "It's a Wonderful Christmas Carol, Part Two", airYear: 2025 },
        ],
      },
    ],
    gaps: ['"It\'s a Wonderful Christmas Carol" notes give the year (2025) but no season/episode numbers.'],
  },
  {
    slug: 'parks-and-recreation',
    name: 'Parks and Recreation',
    holiday: 'Christmas',
    landingPage: true,
    complete: true,
    intro:
      "Leslie Knope treats gift-giving like a competitive sport — and she always wins. The elves covered Pawnee's Christmas episodes in one episode, then went back for the one they missed.",
    coverage: [
      {
        id: 'jingle-bells-jingle-yay-jingle-good-for-you',
        episodes: [
          { season: null, episode: null, title: 'Christmas Scandal', airYear: 2009 },
          { season: null, episode: null, title: 'Ron and Diane', airYear: 2012 },
        ],
      },
      {
        id: 'giving-christmas-gifts-is-like-a-sportto-mefindingor-makingthatperfect-something-it-s-also-like-asport-tome-becausei-alwayswinthisyearthough-myfrie',
        episodes: [{ season: 4, episode: null, title: 'Citizen Knope' }],
      },
    ],
    gaps: ['Notes give air years but no season/episode numbers for "Christmas Scandal" and "Ron and Diane"; "Citizen Knope" has season only.'],
  },

  // ── Single-podcast-episode shows: the episode page is the list page ────
  {
    slug: 'the-nanny',
    name: 'The Nanny',
    holiday: 'Christmas & Hanukkah',
    landingPage: false,
    complete: true,
    coverage: [
      {
        id: 'oy-to-the-world-the-nanny-chrismukkah-episodes',
        episodes: [
          { season: 1, episode: 7, title: 'The Christmas Episode' },
          { season: 3, episode: 14, title: 'Oy to the World' },
          { season: 6, episode: 10, title: 'The Hanukkah Story' },
        ],
      },
    ],
    gaps: [
      'Show notes list S1E7 as "Christmas Episodes"; rendered as "The Christmas Episode" — confirm the title.',
      'No air years in our notes.',
    ],
  },
  {
    slug: 'fresh-prince',
    name: 'The Fresh Prince of Bel-Air',
    holiday: 'Christmas',
    landingPage: false,
    complete: true,
    coverage: [
      {
        id: 'fresh-prince',
        episodes: [
          { season: 1, episode: 5, title: 'Deck the Halls' },
          { season: 2, episode: 12, title: 'Christmas Show' },
          { season: 4, episode: 14, title: "'Twas the Night Before Christening" },
        ],
      },
    ],
    gaps: ['No air years in our notes.'],
  },
  {
    slug: 'rick-and-morty',
    name: 'Rick and Morty',
    holiday: 'Christmas',
    landingPage: false,
    complete: true,
    coverage: [
      {
        id: 'happy-human-holiday-dad-rick-and-morty-christmas-episodes',
        episodes: [
          { season: 1, episode: 3, title: 'Anatomy Park' },
          { season: 4, episode: 5, title: 'Rattlestar Ricklactica' },
          { season: 6, episode: 10, title: "Ricktional Mortpoon's Rickmas Mortcation" },
        ],
      },
    ],
    gaps: ['No air years in our notes.'],
  },
  {
    slug: 'batman-the-animated-series',
    name: 'Batman: The Animated Series',
    holiday: 'Christmas',
    landingPage: false,
    complete: true,
    coverage: [
      {
        id: 'jingle-bells-batmansmells-robinlaidan-egg-the-batmobile-lost-a-wheelandthe-jokergot-awaythechristmasepisodes-of-batmantheanimated-seriesandjustice',
        episodes: [
          { show: 'Batman: The Animated Series', season: 1, episode: 2, title: 'Christmas with the Joker' },
          { show: 'Batman: The Animated Series', season: 2, episode: 2, title: 'A Bullet for Bullock' },
          { show: 'The New Batman Adventures', season: 1, episode: 1, title: 'Holiday Knights' },
          { show: 'Justice League', season: 2, episode: 23, title: 'Comfort and Joy' },
        ],
      },
    ],
    gaps: ['No air years in our notes.'],
  },
  ...[
    ['regular-show', 'Regular Show', 'pa-rum-pum-pum-pum-santas-got-a-six-pack-regular-show-christmas-episodes', [[4, 9, 'The Christmas Special'], [6, 9, 'The White Elephant Gift Exchange'], [6, 10, 'Merry Christmas Mordecai'], [8, 23, 'Christmas in Space']], true],
    ['bluey', 'Bluey', 'verandah-santa-is-coming-tonight-bluey-christmas-episodes-and-shorts', [[1, 52, 'Verandah Santa'], [2, 51, 'Christmas Swim'], [null, null, 'Christmas Short 1: Crazy Christmas Lights'], [null, null, 'Christmas Short 2: Silent Night'], [null, null, 'Christmas Short 3: Jingle Bells']], true],
    ['futurama', 'Futurama', 'ill-be-back-when-you-least-expect-it-next-xmas-futurama-christmas-episodes', [[2, 4, 'Xmas Story'], [3, 3, 'A Tale of Two Santas'], [6, 13, 'Futurama Holiday Spectacular'], [8, 6, 'I Know What You Did Last Xmas']], true],
    ['superstore', 'Superstore', 'likewhatif-the-grinchhad-succeeded-in-conquering-whoville-andcindy-louwhogrewup-got-boobsand-was-leadinga-resistancesuperstore-christmas-episodes', [[2, 9, 'Seasonal Help'], [3, 7, 'Christmas Eve'], [4, 2, 'Baby Shower'], [5, 10, 'Negotiations'], [6, 11, 'Deep Cleaning']], true],
    ['whos-the-boss', "Who's the Boss?", 'oh-the-entertainmentwasspectacular-twelvedrummers-drumming-elevenpipers-pipingtenlordsa-leapingdoyou-have-any-aspirinwho-s-the-boss-christmas-episodes', [[3, 11, 'The Christmas Card'], [5, 8, 'A Spirited Christmas']], true],
    ['new-girl', 'New Girl', 'white-anglo-saxon-privilege-night-sticker', [[1, 9, 'The 23rd'], [2, 11, 'Santa'], [4, 11, 'LAXmas'], [6, 10, 'Christmas Eve Eve']], true],
    ['the-golden-girls', 'The Golden Girls', 'it-s-a-nightmare-we-ve-been-visited-by-the-yutz-of-christmas-past-the-golden-girls-christmas-episodes', [[2, 11, "'Twas the Nightmare Before Christmas"], [5, 12, 'Have Yourself a Very Little Christmas']], true],
    ['bewitched', 'Bewitched', 'remember-michael-the-real-happiness-of-christmas-is-not-found-in-what-we-get-but-what-we-give-bewitched-christmas-episodes', [[1, 15, 'A Vision of Sugarplums'], [4, 16, 'Humbug Not to be Spoken Here'], [6, 14, 'Santa Comes to Visit and Stays and Stays']], false],
    ['boy-meets-world', 'Boy Meets World', 'topangasgoingto-be-stayingherefor-christmasovernightcould-weplease-notrunnakeddownthehallssingingwe-wish-you-a-merrychristmasimlooking-at-you', [[1, 10, "Santa's Little Helper"], [4, 12, 'Easy Street'], [5, 11, 'A Very Topanga Christmas'], [6, 11, "Santa's Little Helpers"]], true],
    ['community', 'Community', 'the-delusion-youre-trying-to-cure-is-called-christmas-community', [[1, 12, 'Comparative Religion'], [2, 11, "Abed's Uncontrollable Christmas"], [3, 10, 'Regional Holiday Music'], [4, 10, 'Intro to Knots']], true],
    ['arrested-development', 'Arrested Development', 'sky-rockets-in-flight-afternoon-delight', [[1, 8, 'In God We Trust'], [2, 6, 'Afternoon Delight']], true],
    ['seinfeld', 'Seinfeld', 'its-a-festivus-for-the-rest-of-us', [[3, 29, 'The Red Dot'], [4, 13, 'The Pick'], [6, 10, 'The Race'], [9, 10, 'The Strike']], true],
    ['house', 'House M.D.', 'the-notionof-picking-onetimeof-year-to-bedecent-tootherpeople-isobscene-because-its-actuallyvalidating-thenotion-ofbeing-miserable-wretchestherest', [[3, 10, 'Merry Little Christmas'], [4, 10, "It's a Wonderful Lie"], [5, 11, 'Joy to the World']], true],
    ['phineas-and-ferb', 'Phineas and Ferb', 'ferb-i-know-what-else-were-gonna-do-today', [[2, 21, 'Christmas Vacation!'], [3, 14, 'A Phineas and Ferb Family Christmas']], true],
    ['brooklyn-nine-nine', 'Brooklyn Nine-Nine', 'yippy-kayak-other-buckets', [[1, 11, 'Christmas'], [2, 10, 'The Pontiac Bandit Returns'], [3, 10, 'Yippie Kayak'], [4, 10, 'Captain Latvia']], true],
    ['alf', 'ALF', 'in-the-words-of-the-immortal-saint-frosty-the-snowman-god-bless-us-everyone', [[1, 12, 'Oh, Tannerbaum'], [2, '11 & 12', "ALF's Special Christmas"]], true],
    ['friends', 'Friends', 'its-the-holiday-armadillo', [[null, null, 'The One Where Rachel Quits'], [null, null, 'The One With The Routine'], [null, null, 'The One With The Holiday Armadillo'], [null, null, 'The One With Christmas In Tulsa']], false],
    ['glee', 'Glee', 'christmastime-will-always-be-just-as-long-as-we-have-glee', [[null, null, 'A Very Glee Christmas'], [null, null, 'Extraordinary Merry Christmas'], [null, null, 'Glee, Actually'], [null, null, 'Previously Unaired Christmas']], true],
    ['modern-family', 'Modern Family', 'we-talk-alotabouttraditionthistimeof-yearbut-as-much-aswe-love-our-traditions-sometimes-our-best-memories-come-from-thetimes-that-arethemostuntraditio', [], true],
    ['the-simpsons', 'The Simpsons', 'merry-christmas-from-the-simpsons-haww-haww', [], false],
    ['30-rock', '30 Rock', 'happy-holidays-from-everyone-except-jenna', [], true],
    ['veep', 'Veep', 'the-white-house-officially-celebrates-diwali-christmas-hanukkah-kwanzaa-and-mawlid-al-nabi-the-alleged-birth-date-of-the-prophet-muhammad', [], true],
    ['abbott-elementary', 'Abbott Elementary', 'that-elf-sized-elf-will-try-to-perform-some-christmas-miracle-and-reunite-me-with-that-man-abbott-elementarys-christmas-episodes-season-4', [[4, 7, 'Winter Show'], [4, 8, 'Winter Break']], false],
    ['ted-lasso', 'Ted Lasso', 'to-the-family-we-re-born-with-and-to-the-family-we-make-along-the-way-and-most-importantly-to-richmond-ted-lasso', [[2, 4, 'Carol of the Bells']], true],
    ['schitts-creek', "Schitt's Creek", 'im-afraid-this-whim-of-yours-is-going-to-obliterate-our-precious-holiday-memories-schitts-creek', [[4, 13, 'Merry Christmas, Johnny Rose']], true],
    ['crazy-ex-girlfriend', 'Crazy Ex-Girlfriend', 'california-christmastime-it-s-just-a-golden-state-of-mind-crazy-ex-girlfriend', [[1, 8, "My Mom, Greg's Mom and Josh's Sweet Dance Moves!"]], true],
    ['buffy-the-vampire-slayer', 'Buffy the Vampire Slayer', 'vampires-probably-not-that-big-on-christmas-now-that-i-think-about-it-buffy-the-vampire-slayer-season-3-episode-10-amends', [[3, 10, 'Amends']], true],
    ['the-bear', 'The Bear', 'everybody-s-asking-what-this-what-is-the-seven-fishes-or-why-do-we-do-it-and-i-think-i-know-what-my-definition-is-the-bear-season-2-episode-6-fishes', [[2, 6, 'Fishes']], true],
    ['ted', 'Ted', 'okaythendont-doit-for-daddoit-for-momlook-shes-reallybummed-out-right-now-anditsalljustcause-christmas-ismessed-uptedseason1-episode-6loudnight', [[1, 6, 'Loud Night']], true],
    ['reba', 'Reba', 'nothing-says-merry-christmas-like-a-hostage-situation-reba-season-2-episode-10-cookies-for-santa', [[2, 10, 'Cookies For Santa']], false],
    ['st-denis-medical', 'St. Denis Medical', 'wheres-mrs-claus-in-this-twisted-universe-of-yours-st-denis-medical-season-1-episode-6-ho-ho-hollo', [[1, 6, 'Ho-Ho-Hollo']], true],
    ['grounded-for-life', 'Grounded for Life', 'a-goat-anda-sheepthatcould-bedangeroustheycould-spawn-ahybrid-creaturewiththestrength-of-a-goat-and-the-cunningof-asheepgrounded-forlifes-christmas-ep', [[2, 7, 'I Saw Daddy Hitting Santa Claus']], true],
    ['last-man-on-earth', 'The Last Man on Earth', 'its-like-santa-ate-the-rockefeller-center-christmas-tree-and-took-a-big-dump-on-the-walls-last-man-on-earth-christmas-episode', [[2, 10, 'Secret Santa']], true],
    ['the-magic-school-bus', 'The Magic School Bus', 'for-my-twelfth-day-recycling-my-teacher-gave-to-methe-magic-school-bus-season-3-episode-13-holiday-special', [[3, 13, 'Holiday Special']], true],
    ['the-fairly-oddparents', 'The Fairly OddParents', 'i-wish-every-day-could-be-christmas-cause-nice-fairies-get-their-rewards-the-fairly-oddparents-season-1-episode-13-christmas-every-day', [[1, 13, 'Christmas Every Day']], false],
    ['spongebob-squarepants', 'SpongeBob SquarePants', 'this-christmas-feels-like-the-very-first-christmas-to-me-spongebob-squarepants-season-2-episode-8-christmas-who', [[2, 8, 'Christmas Who?', 2000]], false],
    ['hey-arnold', 'Hey Arnold!', 'bye-helga-hope-your-christmas-doesnt-bite-hey-arnold-season-1-episode-18-arnolds-christmas', [[1, 18, "Arnold's Christmas"]], true],
    ['rugrats', 'Rugrats', 'it-all-started-when-the-first-present-was-given-by-the-pilgrims-a-long-time-ago-rugrats-season-2-episode-14-the-santa-experience', [[2, 14, 'The Santa Experience', 1992]], false],
    ['curb-your-enthusiasm', 'Curb Your Enthusiasm', 'you-ate-the-baby-jesus-and-his-mother-mary-the-curb-your-enthusiasm-and-im-sorry-christmas-episodes', [[3, 9, 'Mary, Joseph, and Larry'], [2, 4, "Couple's Massage", null, "I'm Sorry"]], true],
    ['supernatural', 'Supernatural', 'you-fudging-touch-me-again-ill-fudging-kill-ya', [[3, 8, 'A Very Supernatural Christmas']], true],
    ['the-x-files', 'The X-Files', 'think-of-it-as-the-last-christmas-youll-ever-spend-alone', [[6, 6, 'How the Ghosts Stole Christmas']], true],
    ['chilling-adventures-of-sabrina', 'Chilling Adventures of Sabrina', 'whats-happened-did-the-grinch-get-to-you-or-the-dark-lord-perhaps', [[null, 11, "A Midwinter's Tale"]], true],
    ['the-office-uk', 'The Office (UK)', 'life-isnt-about-endings-is-it-its-a-series-of-moments', [[null, null, 'The Christmas Specials (two-part series finale)']], true],
    ['ghosts-uk', 'Ghosts (UK)', 'your-family-love-you-of-course-but-they-can-be-a-pain-ghosts-uk-christmas-episodes', [], true],
  ].map(([slug, name, id, eps, complete]) => ({
    slug,
    name,
    holiday: 'Christmas',
    landingPage: false,
    complete,
    coverage: [
      {
        id,
        episodes: eps.map(([season, episode, title, airYear, show]) => ({
          ...(show ? { show } : {}),
          season,
          episode,
          title,
          ...(airYear ? { airYear } : {}),
        })),
      },
    ],
    gaps:
      eps.length === 0
        ? ['Show notes do not list which episodes were covered.']
        : eps.some(([s, e]) => s == null || e == null)
          ? ['Some episodes have no season/episode numbers in our notes.']
          : [],
  })),
]

// "S1E7" / "S2E11 & 12" / "" when numbers are missing
export function formatEpisodeCode(ep) {
  if (ep.season == null && ep.episode == null) return ''
  if (ep.season == null) return `Episode ${ep.episode}`
  if (ep.episode == null) return `Season ${ep.season}`
  return `S${ep.season}E${ep.episode}`
}

export function getShowBySlug(slug) {
  return TV_SHOWS.find((s) => s.slug === slug) ?? null
}

// Podcast-episode id → { show, coverage } so episode pages can render
// "Episodes covered" and use the TV title format.
const BY_EPISODE_ID = new Map()
for (const show of TV_SHOWS) {
  for (const cov of show.coverage) BY_EPISODE_ID.set(cov.id, { show, coverage: cov })
}
export function getTvCoverageForEpisode(episodeId) {
  return BY_EPISODE_ID.get(episodeId) ?? null
}

// The URL a show should link to: its landing page, or (single-episode shows)
// the podcast episode page that serves as the list.
export function getShowHref(show) {
  return show.landingPage ? `/christmas-episodes/${show.slug}` : `/${show.coverage[0].id}`
}
