import { Container } from '@/components/Container'

const LK = ({className = '', username = '', brand = ''}) => (
    <a className={`btn-icon -my-[0.5em] ${className}`} href={`https://${brand}.com/${username}`} target="_blank"><i className={`fa-brands fa-${brand}`} /></a>
)

export default () => (
    <>
        <div className="pt-16 pb-12 sm:pb-4 lg:pt-12">
            <Container>
                <div className='grid gap-3'>
                    <h1 className="text-2xl uppercase font-bold leading-7 text-slate-900">About Tis Project</h1>
                    <p>Welcome to Tis the Podcast, the podcast that's determined to keep the spirit of Christmas alive 365 days a year! Join us and our community as we talk all things Christmas! So what can you expect from this group of misfit toys? Every week we're going to look at a different Christmas movie, special, or TV episode. As we talk, we'll share our reviews, insights, and witty banter. As our reviews grow, you can find the canonical ranking of Christmas movies here on our site. Really, what more could you want out of a Christmas podcast?</p>
                    <h1 className="text-2xl mt-3  uppercase font-bold leading-7 text-slate-900">ABOUT THE ELVES</h1>
                    <b>ANTHONY CARUSO aka Santa's Head Elf</b>
                    <p>
                        Anthony inherited his love (some might say obsession) for Christmas from his parents, specifically his mother. He firmly believes that Christmas is a feeling that should be celebrated year round, not just once a year. (Though he will admit the month of December itself is the best month of the year, and September-December is "The Most Wonderful Time of the Year".) Besides the holidays, Anthony is: an aspiring author; a proud geek; an animal lover; and a progressive, feminist, political nerd. In addition, he watches way too many movies and television shows, and is adept at dropping quotes from all of them into everyday conversation. He's also lucky enough to have three places on Earth he calls home - New York (USA), Newfoundland (Canada), and Newcastle (UK) - and he loves his wife and two cats more than anything else, including Christmas itself.
                        <LK brand='twitter' username='TheSandersonBro' className='text-[#1d9bf0]' />
                        <LK brand='instagram' className='instagram-icon -ml-[0.5em]' username='anthonyc929' />
                    </p>
                    <b>Julia Colburn aka The Holiday Armadillo</b>
                    <p>
                        Julia is a people-loving Pollyanna with an affinity for useless knowledge and pop-culture trivia. She can often speak in Movie/TV Quotes and Gifs. With her amazing husband's support, she has made it her goal to raise their 4 kids to not be cotton-headed ninny muggins'.
                        <LK brand='instagram' className='instagram-icon' username='hartnhevn' />
                    </p>
                </div>
            </Container>
        </div>
    </>
)