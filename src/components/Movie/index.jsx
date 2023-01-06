import Image from 'next/image';
import { Container } from '../Container';
import styles from './styles.module.scss';

const Movie = ({ title = '', rank = '', src = '', index }) => (
    <Container className={styles.root}>
        <div className={styles.main} title={`${index}. ${title}`} rank={rank}>
            <Image width={70} height={150} alt={title} src={`https://cdn.raster.app/tis-the-podcast/the-list/${src}`} />
        </div>
    </Container>
)

export default Movie;