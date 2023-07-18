import React from 'react';
import NextLink from '@/components/UI/NextLink';
import styles from './index.module.scss';
import {motion} from 'framer-motion';
import {fadeInVariants, floatUpVariants} from '@/helpers/motion-animations';
import ImageComponent from '@/components/UI/ImageComponent';
import {IMAGE_PATH} from '@/constants';

const MovieCard = props => {
    const {movie, delay} = props;

    return (
        <NextLink href={`/movie/${movie.id}`} className={styles.movie}>
            <figure>
                <motion.div
                    className={styles.movieImage}
                    initial="floatDown"
                    animate="floatUp"
                    exit="floatDown"
                    variants={floatUpVariants}
                    transition={{type: 'spring', stiffness: 100, delay: delay * 0.12}}
                >
                    <ImageComponent
                        className="transition-transform duration-500"
                        src={IMAGE_PATH(movie.poster_path)}
                        width={300} height={450} alt={movie.title}
                    />
                </motion.div>
                <motion.figcaption
                    className="mt-3"
                    initial="hide"
                    animate="show"
                    exit="hide"
                    variants={fadeInVariants}
                    transition={{type: 'tween', delay: delay * 0.15}}
                >
                    <p className={styles.movieTitle}>{movie.title}</p>
                </motion.figcaption>
            </figure>
        </NextLink>
    )
}

export default MovieCard;