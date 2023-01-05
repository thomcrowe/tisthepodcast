import Image from 'next/image';
import { Container } from '../Container';
import styles from './styles.module.scss';

const Movie = ({ title = '', rank = '', src = '' }) => (
    <div className={styles.root}>
        <Container>
            <div className='flex py-2 items-center font-bold gap-4 text-lg'>
                <Image width={70} height={150} alt={title} src={`https://cdn.raster.app/tis-the-podcast/the-list/${src}`} />
                <h2>{title}</h2>
                <p className='ml-auto'>{rank}</p>
            </div>
        </Container>
    </div>
)

export default Movie;