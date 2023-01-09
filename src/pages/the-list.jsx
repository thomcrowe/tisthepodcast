import { Container } from '@/components/Container'
import Movie from '@/components/Movie';

const List = () => (
    <>
        <Container className="pt-16 pb-12 sm:pb-4 lg:pt-12">
            <div className='grid'>
                <div>
                    <h1 className="text-2xl uppercase mb-6 font-bold leading-7 text-slate-900">THE NAUGHTY AND NICE LIST</h1>
                    <p>Each week, the Elves rank, review, and discuss Christmas movies. These rankings have lead to our Naughty and Nice List. Here’s our ranked list, in order, with the combined ranking of all three elves.</p>
                </div>
            </div>
        </Container>
        <div>
            <Movie href="/buddy-the-elf-whats-your-favorite-color-1503931390" index={1} title='Elf' src='2FDvym7SDH?ixlib=js-3.7.0&s=0e105eea342461c883e643143591474c' rank='10' />
            <Movie href="/one-time-a-year-theres-a-marvelous-night-when-enchantment-and-wonder-spark-and-take-flight" index={2} title='Mickey’s Once Upon a Christmas' src='D6WBlRQIgx?ixlib=js-3.7.0&s=b25ab871fd51b38b1f719737dd5bbfa2' rank='9.7167' />
            <Movie href="christmas-mornings-will-come-again-a-boy-called-christmas" index={3} title='A Boy Called Christmas' src='kOfyBCpPe2?ixlib=js-3.7.0&s=5be7a2733e567dbd8b84f1ec09f3bb20' rank='9.6' />
            <Movie href="/if-you-believe-its-all-possible" index={4} title='Jingle Jangle: A Christmas Journey' src='x8yua1HbHS?ixlib=js-3.7.0&s=b305efcd8aa735623fc6bd413f9b5e92' rank='9.6' />
            <Movie href="/popo-gigio-the-santa-clause-revisited" index={5} title='The Santa Clause' src='1IMpfsxeKw?ixlib=js-3.7.0&s=b0b22990a453dfc3248abcedcef5bfbb' rank='9.57' />
            <Movie href="/nobodys-walking-out-on-this-fun-old-fashioned-family-christmas-national-lampoons-christmas-vacation-revisited" index={6} title=' National Lampoon’s Christmas Vacation' src='DFhZX0WftR?ixlib=js-3.7.0&s=ced84adb376008b5ad53161d094edc4f' rank='9.42' />
            <Movie href="/and-the-grinch-raised-his-glass-and-led-the-whos-in-a-toast-to-kindness-and-love-the-things-we-need-most" index={7} title='Dr. Seuss’ The Grinch (2018)' rank='9.413' src='I7lM1OyhXs?ixlib=js-3.7.0&s=7dd4258911a227f2d5faa4833143743f' />
            <Movie href="/faithis-believing-when-commonsense-tells-you-nottodontyouseeitsnot-just-kris-thatson-trialitseverything-hestands-forits-kindnessandjoy-and-love-an" index={8} title='Miracle on 34th Street (1947)' rank='9.35' src='IuB7SO7O6I?ixlib=js-3.7.0&s=dedab5f5c3c2c94aafc2546c248cdc71' />
            <Movie href="it-feels-like-christmas-1508758888" index={9} title='The Muppet Christmas Carol' rank='9.33' src='Kt3JxCuufI?ixlib=js-3.7.0&s=fd8a405a2662130af0fc383e6a4dd316' />
            <Movie href="/i-want-the-world-to-know-theres-a-mrs-santa-claus" index={9} title='Mrs. Santa Claus' rank='9.33' src='Bznt4guCdd?ixlib=js-3.7.0&s=dc4fe51018f98a59f85bd92de456f2a8' />
            <Movie href="/santa-claus-does-exist-and-he-exists-in-the-person-of-kris-kringle" index={10} title='Miracle on 34th Street (1994)' rank='9.0' src='PodZcl30Gy?ixlib=js-3.7.0&s=7b52827a723a355b383d89b24e81f736' />
            <Movie href="/thats-the-one-good-thing-about-regret-its-never-too-late-you-can-always-change-tomorrow-if-you-want-to" index={11} title='Scrooged' rank='8.967' src='lSxJjpihOS?ixlib=js-3.7.0&s=bf5757765028558b1ef09d454d34378a' />
            <Movie href="/if-a-superhero-cant-save-his-family-hes-not-much-of-a-hero" index={12} title='Shazam!' rank='8.64' src='kARMhrGOVz?ixlib=js-3.7.0&s=2af294e2cec8278fa2254e4b821251c1' />
            <Movie href="/its-been-said-the-worlds-a-stage-and-everyone-must-play-their-part-well-if-thats-true-ill-act-with-all-my-heart" index={13} title='Anna and the Apocolypse' rank='8.50' src='L35gyYWu72?ixlib=js-3.7.0&s=c8fc2be38f1bab1b1bc4c88823d19f57' />
            <Movie href="/where-theres-goodness-and-kindness-and-love-thats-where-youll-find-him" index={14} title='The Secret Santa' rank='8.33' src='e58zgVohTk?ixlib=js-3.7.0&s=584e4d07a3e789f09f232b02ec44ba08' />
            <Movie href="/i-dont-think-anyone-would-criticize-us-for-laying-down-our-riffles-on-christmas-eve" index={14} title='Joyeux Noël' rank='8.33' src='OrtofgS8Sy?ixlib=js-3.7.0&s=8fc8903cea530f28543bab7d52fc3a7a' />
            <Movie href="/what-really-makes-a-santa-all-santas-inspire-us-with-the-christmas-spirit" index={15} title='Noelle' rank='8.28' src='7x0TvtYdyj?ixlib=js-3.7.0&s=7e93bad1ee2df62c35a27ee00bf49157' />
            <Movie href="/christmas-is-all-around" index={16} title='Love Actually' rank='8.25' src='AkjV6WM3mY?ixlib=js-3.7.0&s=79f3ceaea58301161d9a2c6af4fde813' />
            <Movie href="/now-all-those-within-the-sound-of-my-voice-and-all-those-on-this-earth-everywhere-know-that-henceforth-you-will-be-called-santa-claus" index={16} title='Santa Claus: The Movie' rank='8.25' src='ndnOeXrfZb?ixlib=js-3.7.0&s=066a6036fc111671246795d57e32af99' />
            <Movie href="/life-is-a-lot-easier-when-you-let-someone-else-carry-your-load-even-if-you-can-carry-it-yourself-almost-christmas" index={16} title='Almost Christmas' rank='8.25' src='mt7C8yvBAO?ixlib=js-3.7.0&s=f2b8d661aa9dd528bb8e8c76f01b0d9b' />
            <Movie href="/i-have-never-heard-of-such-a-christmas-sex-and-drugs-and-women-being-set-on-fire" index={17} title='The Ref' rank='8.20' src='NxNTalpsuD?ixlib=js-3.7.0&s=661d5abe9f31bb92dc3cf520d3002d3d' />
            <Movie href="/this-year-to-make-the-best-nativity-play-that-has-ever-ever-been-is-mr-maddens" index={18} title='Nativity!' rank='8.083' src='SCK3Vq0sFW?ixlib=js-3.7.0&s=c218335343a7cc112450afcb6b9604ab' />
            <Movie href="/i-dont-have-any-secrets-but-i-am-an-ally" index={18} title='Happiest Season' rank='8.083' src='epf3o4rhnV?ixlib=js-3.7.0&s=3604563c118b743bb682f077e970ed6a' />
            <Movie href="/merry-christmas-to-those-who-have-who-have-seen-us-at-our-best-and-at-our-worst-and-cant-tell-the-difference" index={19} title='A Crown for Christmas' rank='8.083' src='1YijfeQoSA?ixlib=js-3.7.0&s=d466bc344804477da2faada44d976819' />
            <Movie href="/im-dreaming-of-a-white-christmas-1577037854" index={20} title='White Christmas' rank='7.83' src='LdALl1iTuY?ixlib=js-3.7.0&s=38340a39ee329f757b7e06899c0e94f1' />
            <Movie href="/justonceidlikea-regularnormal-christmas-eggnoga-fn-christmas-tree-alittle-turkeybutnoi-gotta-crawl-aroundin-this-motherfn-tin-can-die-hard-2" index={20} title='Die Hard 2' rank='7.83' src='sBjqltib3d?ixlib=js-3.7.0&s=34e6ab7098ff7c8fc748b026051b2b78' />
            <Movie href="/gruss-vom-krampus" index={21} title='Krampus' rank='7.73' src='leUk2lIxk8?ixlib=js-3.7.0&s=5420455f67a4ebcebb5bf987804ab0e1' />
            <Movie href="/the-coca-cola-santa-is-just-a-hoax" index={22} title='Rare Exports' rank='7.71' src='vhqjQVCInU?ixlib=js-3.7.0&s=5297f28c8309019ff960107c92b62215' />
            <Movie href="/you-may-not-ask-for-anything-to-do-with-interpersonal-relationships-got-it-this-is-santa-claus-not-dear-abby" index={23} title='All I Want for Christmas' rank='7.617' src='muSqqkbJRP?ixlib=js-3.7.0&s=cf31dea923a9d64fb3778a5a83ed7514' />
            <Movie href="/link-by-link-by-horrifying-link" index={24} title='A Christmas Carol: The Musical (1994)' rank='7.55' src='5vIzbFwqmO?ixlib=js-3.7.0&s=c990800f4b26128acdfa583b1b53f0da' />
            <Movie href="/merry-christmas-ya-filthy-animal-1541871809" index={25} title='Home Alone 2: Lost in New York ' rank='7.50' src='agqmCzN65j?ixlib=js-3.7.0&s=bada262c8119774affeebb50c8d57214' />
            <Movie href="what-s-christmas-but-a-time-for-finding-yourself-a-day-older-and-not-a-day-richer-scrooge-1970" index={26} title='Scrooge (1970)' rank='7.467' src='hGelgdQ1xy?ixlib=js-3.7.0&s=56137f82f6a2a61e78802cd4e97a7772' />
            <Movie href="/and-i-told-him-it-was-while-you-were-sleeping" index={27} title='While You Were Sleeping' rank='7.43' src='qHQpRNfIos?ixlib=js-3.7.0&s=3f778074d8f30b2d0abeaecb707f3d86' />
            <Movie href="/thats-right-bamm-bamm-everyone-but-fred" index={28} title='A Flintstones Christmas Carol' rank='7.383' src='XPdxLDh9Zd?ixlib=js-3.7.0&s=b41d47dce1a61d08cfbd352e7a473156' />
            <Movie href="/now-i-have-a-machine-gun-ho-ho-ho" index={29} title='Die Hard' rank='7.33' src='dHR2T4zvMN?ixlib=js-3.7.0&s=603cddaa476bfae446edb98ccaabd3c5' />
            <Movie href="/itsthe-mrs-clause" index={29} title='The Santa Clause 2: The Mrs. Clause' rank='7.33' src='g1i2amnN8W?ixlib=js-3.7.0&s=823bf47aa43c61b027c557562ea6e9f2' />
            <Movie href="/she-made-them-come-together-so-they-would-be-there-for-one-another-the-best-man-holiday" index={29} title='The Best Man Holiday' rank='7.33' src='c6oKXhwhrL?ixlib=js-3.7.0&s=d3aceee6b6cdaaac7b06b7bcaa9cc5d6' />
            <Movie href="/love-doesn-t-have-to-be-perfect-it-just-has-to-be-honest-love-hard" index={29} title='Love Hard' rank='7.33' src='xq3P4w1aTl?ixlib=js-3.7.0&s=2806854affe07b3f6fd6b49358b2c6f7' />
            <Movie href="/i-will-honor-christmas-in-my-heart-and-try-to-keep-it-all-the-year" index={30} title='The Man Who Invented Christmas' rank='7.32' src='GJCuR2BmIJ?ixlib=js-3.7.0&s=4de830042c214483616cd3d194ddf550' />
            <Movie href="/the-christmas-chronicles-a-very-special-bonus-episode" index={31} title='The Christmas Chronicles' rank='7.73' src='aZN3szRUj4?ixlib=js-3.7.0&s=5a8386b2209500fa657589583a65aa6f' />
            <Movie href="/every-time-a-bell-rings-an-angel-gets-his-wings" index={32} title='It&#39;s a Wonderful Life' rank='7.083' src='Ex8oedFpMW?ixlib=js-3.7.0&s=31fcca92f2d47dc3a9eddf7d36f9b968' />
            <Movie href="/keep-your-fingers-crossed-just-in-case-eloise-at-christmastime" index={33} title='Eloise at Christmastime' rank='7.0' src='I1RNqWRctS?ixlib=js-3.7.0&s=5d750ae6fffaa22092b34b2ee8ad222f' />
            <Movie href="/he-is-for-all-mankind" index={34} title='The Nativity Story' rank='6.84' src='t6WEbjm6Cz?ixlib=js-3.7.0&s=459b1e78644fabfd58b35f33e13560d0' />
            <Movie href="/christmasis-atimewhenyou-look-at-your-life-througha-magnifying-glassand-whatever-you-dont-have-feels-overwhelming-being-aloneis-somuchlonelierat-ch" index={35} title='Mixed Nuts' rank='6.73' src='HxNUjCsz90?ixlib=js-3.7.0&s=ff72e53517235534c6986b2c38085a2d' />
            <Movie href="/forget-ever-after-just-live-happily-godmothered" index={36} title='Godmothered' rank='6.583' src='ThVFAxF1lS?ixlib=js-3.7.0&s=d502a093a0365f64985b4640614b88fc' />
            <Movie href="/merry-christmas-happy-easter-and-dont-forget-to-floss" index={37} title='Rise of the Guardians' rank='6.33' src='VIlKEWMHID?ixlib=js-3.7.0&s=0a70020c1af94299c8c8b534c751d225' />
            <Movie href="/look-mister-there-are-some-rules-that-youve-got-to-follow" index={38} title='Gremlins' rank='6.27' src='6oDKAgWM2t?ixlib=js-3.7.0&s=bc30480297281882727b244c10262f97' />
            <Movie href="/this-is-halloween-1509328256" index={39} title='The Nightmare Before Christmas' rank='6.25' src='VRmMOumNLm?ixlib=js-3.7.0&s=be28a2922f459a3dc77eca226e7bcd93' />
            <Movie href="/nintendoa-maze-ofrubber-wiringand-electronicintelligence-soadvancedit-was-deemednot-avideo-game-butan-8bitentertainment-system8bit-christmas" index={40} title='8-Bit Christmas' rank='6.083' src='LPPjpNpfhC?ixlib=js-3.7.0&s=30316950e86f4bfd9e5e667b93c19e31' />
            <Movie href="/you-have-a-freak-flag-you-just-dont-fly-it" index={41} title='The Family Stone' rank='6.067' src='jtrYZW9ZWC?ixlib=js-3.7.0&s=dd640058dbf14d5d574febd919eff453' />
            <Movie href="/a-glimpse-by-definition-is-an-impermanent-thing-jack" index={42} title='The Family Man' rank='6.02' src='W6Aw9KBhnT?ixlib=js-3.7.0&s=ce661c8017cb4aee779b0b390f6ece26' />
            <Movie href="/human-beings-aren-t-meant-to-be-alone-on-the-holidays-we-actually-need-warmth-companionship-and-someone-to-drunk-mock-strangers-with-at-parties" index={43} title='Holidate' rank='5.967' src='v9fCBUkeuj?ixlib=js-3.7.0&s=d62ba4cb9ee5c42e41ae806d385810a2' />
            <Movie href="/my-business-now-is-the-future-i-will-just-be-the-best-i-can-be-for-the-spirits-and-the-bright-light-and-the-mirror-i-thank-you" index={44} title=' BBC&#39;s/FX&#39;s A Christmas Carol' rank='5.93' src='4DGJhuy1GC?ixlib=js-3.7.0&s=1b58600e4a8f7a25a5aed9dbb7b3cea4' />
            <Movie href="/i-tell-my-cat-everything-what-i-spend-on-cat-food-i-save-on-therapy-the-nine-kittens-of-christmas" index={45} title='The Nine Kittens of Christmas' rank='5.85' src='sRUT66HDeG?ixlib=js-3.7.0&s=0bf379f3be5f246f6c178785950d3f32' />
            <Movie href="/skipping-christmas-with-the-kranks" index={46} title='Christmas with the Kranks' rank='5.83' src='OKcweS1R8y?ixlib=js-3.7.0&s=83a70a75a16e0baff3364fd2f1ed0ee61' />
            <Movie href="/the-start-is-not-nearly-as-important-as-the-finish-2006s-last-holiday" index={46} title='Last Holiday' rank='5.83' src='Km221mZmu7?ixlib=js-3.7.0&s=11ac5810bffa1022ed69f7728df8bb93' />
            <Movie href="/sometimes-what-we-want-is-not-what-we-need-next-stop-christmas" index={47} title='Next Stop, Christmas ' rank='5.767' src='EJ2XDpQxE3?ixlib=js-3.7.0&s=b11b87f0c9aae32cf649dc3089caf34b1' />
            <Movie href="/a-together-christmas" index={48} title='Daddy&#39;s Home 2' rank='5.683' src='EC8X6IJbR9?ixlib=js-3.7.0&s=c96eb28bdced20aa2917925a1e770d66' />
            <Movie href="/god-bless-us-everyone-1527705636" index={49} title='Disney&#39;s A Christmas Carol' rank='5.617' src='r8oMuaEhEt?ixlib=js-3.7.0&s=ebaf682d4697e4acafcabe1bf82ba283' />
            <Movie href="/this-is-the-polar-express" index={49} title='The Polar Express' rank='5.617' src='ryMFoA2Qcq?ixlib=js-3.7.0&s=17df77ddca6c7e3a1ec3fd22a9a36889' />
            <Movie href="/if-it-was-good-enough-for-baby-jesus-it-s-good-enough-for-mr-robert-lee-parton" index={50} title='Dolly Parton’s Christmas of Many Colors: Circle of Love' rank='5.6' src='4bo6DoJHXk?ixlib=js-3.7.0&s=65ecbfe51781de04c7465368cc41109f' />
            <Movie href="/this-family-sure-knows-how-to-throw-a-christmas-right-in-the-toilet" index={51} title='Pete&#39;s Christmas' rank='5.583' src='s201F9uES7?ixlib=js-3.7.0&s=1ab7d20a5a154fe50cc8ef01366e591d' />
            <Movie href="/you-sound-sweet-but-you-dont-make-sense-holiday-inn" index={52} title='Holiday Inn' rank='5.05' src='IyzgEpQsYE?ixlib=js-3.7.0&s=7291649e2cb74492e4f88c2f6dca3f88' />
            <Movie href="/such-a-fuss-when-everything-we-want-is-right-in-front-of-us-the-whole-time" index={53} title='Love the Coopers' rank='5.0' src='IDX1dBS5x9?ixlib=js-3.7.0&s=20775be95dc90a539f064e9525372604' />
            <Movie href="/the-worlds-most-pissed-off-snow-cone" index={53} title='Jack Frost' rank='5.0' src='bs97t7ZahX?ixlib=js-3.7.0&s=1fecdd764a58090db4b5a9f52911ba44' />
            <Movie href="/i-wish-it-was-christmas-every-day" index={54} title='Christmas Every Day' rank='4.95' src='H5DEfB1CUU?ixlib=js-3.7.0&s=4a4e1726186d38e56c4518b42b9a115d' />
            <Movie href="/hes-magical-carol" index={54} title='Prancer' rank='4.95' src='Ft1faSJ1Aa?ixlib=js-3.7.0&s=3bde989f480aec45d0e4766da24c9d57' />
            <Movie href="/i-just-wish-we-could-have-a-perfect-christmas-like-in-a-christmas-movie-a-christmas-movie-christmas" index={55} title='A Christmas Movie Christmas' rank='4.83' src='XmecK9OcwA?ixlib=js-3.7.0&s=dfded0b0bf209d9f4fd0f211f1c401d7' />
            <Movie href="/theres-no-more-heroes-left-in-the-world" index={56} title='Lethal Weapon' rank='4.767' src='tiAqjjYwep?ixlib=js-3.7.0&s=f5bf4a99b58409d9157c4a4d7855f696' />
            <Movie href="/episode-206-oh-no-baby-no-youre-not-going-to-die-they-are-the-long-kiss-goodnight" index={56} title='The Long Kiss Goodnight' rank='4.767' src='rnDNvj4Khu?ixlib=js-3.7.0&s=b371adceb7c35b05ffb0ff044e9eaa74' />
            <Movie href="it%e2%80%99s-a-non-denominational-holiday-mixer" index={57} title='Office Christmas Party' rank='4.75' src='QiAWUqpbvA?ixlib=js-3.7.0&s=84a742a9f9805351441b6c077090f38f' />
            <Movie href="/youll-shoot-your-eye-out-kid" index={57} title='A Christmas Story' rank='4.75' src='lL8GTn6es9?ixlib=js-3.7.0&s=11c530d03c89a60ce5975d7559ba7a95' />
            <Movie href="/mistletoe-can-be-deadily-if-you-eat-it-but-a-kiss-can-be-even-deadlier-if-you-mean-it" index={58} title='Batman Returns' rank='4.67' src='dih82tNZ0Z?ixlib=js-3.7.0&s=8c7fe1d566abeddd11650f1453feb574' />
            <Movie href="/my-names-harry-lockhart-ill-be-your-narrator" index={58} title='Kiss, Kiss, Bang, Bang' rank='4.67' src='JMsVrBV35R?ixlib=js-3.7.0&s=b3f72b4708889fcece09458bec030645' />
            <Movie href="/im-following-in-the-path-of-my-christmas-heroes-the-grinch-the-sticky-bandits-hans-gruber-from-die-hard" index={59} title='The Night Before' rank='4.653' src='agyemwQD9x?ixlib=js-3.7.0&s=5c9133e5537196274ff3809a3354369c' />
            <Movie href="/iron-man-3-title-tbd" index={60} title='Iron Man 3' rank='4.5467' src='lWZeGoUKwo?ixlib=js-3.7.0&s=5c1b16e2176ea54921bddba27eac9145' />
            <Movie href="/moms-dont-enjoy-they-give-joy-thats-how-being-a-mom-works" index={61} title='A Bad Mom&#39;s Christmas' rank='4.53' src='6VN7bz0qI9?ixlib=js-3.7.0&s=8e0e8b00b17e5f381ce6964cf1c77be71' />

            
        </div>
    </>
)

export default List;