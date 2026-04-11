'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Container } from '../Container'
import styles from './styles.module.css'

const Movie = ({ title = '', rank = '', src = '', index, href }) => {
  const router = useRouter()
  return (
    <Container onClick={() => router.push(href)} className={styles.root}>
      <div className={styles.main} title={`${index}. ${title}`} rank={rank}>
        <Image
          width={70}
          height={150}
          alt={title}
          src={`https://cdn.raster.app/tis-the-podcast/the-list/${src}`}
        />
      </div>
    </Container>
  )
}

export default Movie
