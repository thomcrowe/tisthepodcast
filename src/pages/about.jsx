import { Container } from '@/components/Container'
import Image from 'next/image'

const LK = ({ className = '', username = '', brand = '' }) => (
    <a className={`btn-icon -my-[0.5em] ${className}`} rel="noreferrer" href={`https://${brand}.com/${username}`} target="_blank"><i className={`fa-brands fa-${brand}`} /></a>
)

const Blog = ({ title = '', url = '', children }) => (
    <div className='my-6'>
        <b>{title}</b>
        <div className='flex gap-4 mt-4 flex-col sm:flex-row items-start'>
            <Image className='mt-1' width={150} height={150} src={`https://rstr.in/tis-the-podcast/library/${url}`} alt="" />
            <p>{children}</p>
        </div>
    </div>
)

const About = () => (
    <Container className="pt-16 pb-12 sm:pb-4 lg:pt-12">
        <div className='grid'>
            <div>
                <h1 className="text-2xl uppercase mb-6 font-bold leading-7 text-slate-900">About The Sacristy</h1>
                <p>Join with Fr. Matt and Fr. David as they seek to learn, discuss, and exult in the faith delivered once for all to the saints as it has been passed down in the Anglican Tradition.</p>
            </div>
            <h1 className="text-2xl mt-8 uppercase font-bold leading-7 text-slate-900">YOUR HOSTS</h1>
            <Blog title="FR. DAVID BUMSTEAD"
                url='DwJo3lK0Els'
            >
                Fr. David is the rector of Saint John’s Episcopal Church in Tulsa, Oklahoma. <br></br><br></br>For more information: <a href="https://sjtulsa.com">www.sjtulsa.</a> <br></br><br></br><b>SERVICE TIMES:</b><br></br>8:00am Rite I Said Mass<br></br>10:00am Rite II Sung Mass<br></br>5:30pm Rite I Choral Evensong
            </Blog>
            <Blog title='FR. MATT AINSLEY'
                url='D01rV473M4u/aXBQg1GY2kB' 
            >
                Fr. Matt is the vicar of All Souls Episcopal Church, a church plant in Horizon West, FL. All Souls is temporarily meeting at the Church of the Messiah in Winter Garden, FL. <br></br> <br></br>For more information: <a href="https://allsoulsfl.org">www.allsoulsfl.org</a><br></br><br></br><b>SERVICE TIMES:</b><br></br>9:00am Rite I Sung Mass
            </Blog>

        </div>
    </Container>
)

export default About;