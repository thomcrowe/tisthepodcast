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
            <Movie href="/im-dreaming-of-a-white-christmas-1577037854" index={20} title='White Christmas' rank='8.08' src='LdALl1iTuY?ixlib=js-3.7.0&s=38340a39ee329f757b7e06899c0e94f1' />
            <Movie href="/now-i-have-a-machine-gun-ho-ho-ho" index={20} title='Die Hard' rank='8.08' src='zUv24MFK72?ixlib=js-3.7.0&s=df642ed1c280642e7f4c3e4c521d6af7' />

        </div>
    </>
)

export default List;