import Image from 'next/image';
import { useRouter } from 'next/router';
import { Container } from '../Container';
import styles from './styles.module.scss';

const Movie = ({ title = '', rank = '', src = '', index }) => {
    const router = useRouter();
    return (
        <Container onClick={() => router.push("/buddy-the-elf-whats-your-favorite-color-1503931390")} className={styles.root}>
            <div className={styles.main} title={`${index}. ${title}`} rank={rank}>
                <Image width={70} height={150} alt={title} src={`https://cdn.raster.app/tis-the-podcast/the-list/${src}`} />
            </div>
        </Container>
    )
}

export default Movie;