import { Container } from '@/components/Container'
import Image from 'next/image'

const LK = ({ className = '', username = '', brand = '' }) => (
    <a className={`btn-icon -my-[0.5em] ${className}`} rel="noreferrer" href={`https://${brand}.com/${username}`} target="_blank"><i className={`fa-brands fa-${brand}`} /></a>
)

const Blog = ({ title = '', url = '', children }) => (
    <div className='my-6'>
        <b>{title}</b>
        <div className='flex gap-4 mt-4 flex-col sm:flex-row items-start'>
            <Image className='mt-1' width={150} height={150} src={`https://cdn.raster.app/tis-the-podcast/library/${url}`} alt="" />
            <p>{children}</p>
        </div>
    </div>
)

const About = () => (
    <Container className="pt-16 pb-12 sm:pb-4 lg:pt-12">
        <div className='grid'>
            <div>
                <h1 className="text-2xl uppercase mb-6 font-bold leading-7 text-slate-900">About Tis Project</h1>
                <p>Welcome to Tis the Podcast, the podcast that&apos;s determined to keep the spirit of Christmas alive 365 days a year! Join us and our community as we talk all things Christmas! So what can you expect from this group of misfit toys? Every week we&aposre going to look at a different Christmas movie, special, or TV episode. As we talk, we&apos;ll share our reviews, insights, and witty banter. As our reviews grow, you can find the canonical ranking of Christmas movies here on our site. Really, what more could you want out of a Christmas podcast?</p>
            </div>
            <h1 className="text-2xl mt-8 uppercase font-bold leading-7 text-slate-900">ABOUT THE ELVES</h1>
            <Blog title="ANTHONY CARUSO aka Santa&apos;s Head Elf"
                url='oLQz8thDQY?ixlib=js-3.7.0&s=6ff8176dfd3a551d3b0a8b98129ef4db'
            >
                One part Buddy the Elf, Two parts Bernard the Elf, and 0 parts Curtis the Elf, Anthony is what some would call ‘New York Brash’. Beneath the hard exterior, he has a heart of silver and gold though, and lives to keep the Christmas Spirit Alive 365 days per year. In addition to Christmas, Anthony is an avid reader and writer, and has massive amounts of love for Spooky Season, Movies, DC Comics (especially Batman), Politics, and his wife, Sarah, and dog, Larry. All complaints about his cinematic opinions can be directed to the worst elf, Thom.
                <LK brand='twitter' username='TheSandersonBro' className='text-[#1d9bf0]' />
                <LK brand='instagram' className='instagram-icon -ml-[0.5em]' username='anthonyc929' />
            </Blog>
            <Blog title='Julia Colburn aka The Holiday Armadillo'
                url='EPNB1MlDol?ixlib=js-3.7.0&s=14e31d4a100d2163619a58df2876c422'
            >
                Julia is a people-loving Pollyanna with an affinity for useless knowledge and pop-culture trivia. She can often speak in Movie/TV Quotes and Gifs. With her amazing husband&apos;s support, she has made it her goal to raise their 4 kids to not be cotton-headed ninny muggins.
                <LK brand='instagram' className='instagram-icon' username='hartnhevn' />
            </Blog>
            <Blog
                title='THOM CROWE aka Chief Reindeer Pooper Scooper'
                url='11br4i6IKX?ixlib=js-3.7.0&s=9f0cf48f0e5fccbe9088fcd6b30892b2'
            >
                Thom has a self-diagnosed Christmas obsession and is known to subject his very loving and supportive wife and sweet daughter to Christmas music during the hottest of Oklahoma months. Throughout the year, Thom works marketing magic, leads a Daisy troop, loves to cook, enjoys reading, and lots of nerdy things.
                <LK brand='twitter' username='thomcrowe' className='text-[#1d9bf0]' />
                <LK brand='instagram' className='instagram-icon -ml-[0.5em]' username='thomcrowe' />
            </Blog>
        </div>
    </Container>
)

export default About;