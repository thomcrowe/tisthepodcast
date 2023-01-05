import { Container } from '@/components/Container'
import Movie from '@/components/Movie';

const List = () => (
    <>
        <Container className="pt-16 pb-12 sm:pb-4 lg:pt-12">
            <h1 className="text-2xl uppercase mb-6 font-bold leading-7 text-slate-900">The Naughty and nice list</h1>
        </Container>
        <div>
            <Movie title='Elf' src='2FDvym7SDH?ixlib=js-3.7.0&s=0e105eea342461c883e643143591474c' rank='10' />
            <Movie title='Mickey’s Once Upon a Christmas' src='D6WBlRQIgx?ixlib=js-3.7.0&s=b25ab871fd51b38b1f719737dd5bbfa2' rank='9.7167' />
            <Movie title='Jingle Jangle: A Christmas Journey' src='x8yua1HbHS?ixlib=js-3.7.0&s=b305efcd8aa735623fc6bd413f9b5e92' rank='9.6' />
            <Movie title='The Santa Clause' src='1IMpfsxeKw?ixlib=js-3.7.0&s=b0b22990a453dfc3248abcedcef5bfbb' rank='9.57' />
            <Movie title=' National Lampoon’s Christmas Vacation' src='DFhZX0WftR?ixlib=js-3.7.0&s=ced84adb376008b5ad53161d094edc4f' rank='9.42' />
            <Movie title='Dr. Seuss’ The Grinch (2018)' rank='9.413' src='I7lM1OyhXs?ixlib=js-3.7.0&s=7dd4258911a227f2d5faa4833143743f' />
            <Movie title='Miracle on 34th Street (1947)' rank='9.35' src='IuB7SO7O6I?ixlib=js-3.7.0&s=dedab5f5c3c2c94aafc2546c248cdc71' />
            <Movie title='The Muppet Christmas Carol' rank='9.33' src='Kt3JxCuufI?ixlib=js-3.7.0&s=fd8a405a2662130af0fc383e6a4dd316' />
            <Movie title='Mrs. Santa Claus' rank='9.33' src='Bznt4guCdd?ixlib=js-3.7.0&s=dc4fe51018f98a59f85bd92de456f2a8' />
            <Movie title='Miracle on 34th Street (1994)' rank='9.0' src='PodZcl30Gy?ixlib=js-3.7.0&s=7b52827a723a355b383d89b24e81f736' />
            <Movie title='Scrooged' rank='8.967' src='lSxJjpihOS?ixlib=js-3.7.0&s=bf5757765028558b1ef09d454d34378a' />
            <Movie title='Shazam!' rank='8.64' src='kARMhrGOVz?ixlib=js-3.7.0&s=2af294e2cec8278fa2254e4b821251c1' />
            <Movie title='Home Alone' rank='8.50' src='U4nSp7AHh3?ixlib=js-3.7.0&s=e55e6210254e9886be3b68a3e46c89a1' />
        </div>
    </>
)

export default List;