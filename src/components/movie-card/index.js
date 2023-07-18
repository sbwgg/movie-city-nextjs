import React from 'react';
import NextLink from '@/components/UI/NextLink';
import styles from './index.module.scss';
import classNames from 'classnames';
import {motion} from 'framer-motion';
import {fadeInVariants, floatUpVariants} from '@/helpers/motion-animations';
import ImageComponent from '@/components/UI/ImageComponent';
import {IMAGE_PATH} from '@/constants';

const MovieCard = props => {
    const {movie, delay} = props;

    return (
        <div className="h-full p-3">
            <NextLink href={`/movie/${movie.id}`} className={styles.movie}>
                <figure className="full-figure">
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
                        <p className={classNames([styles.movieTitle, 'text-oneline'])}>
                            {movie.title}
                        </p>
                    </motion.figcaption>
                </figure>
            </NextLink>
        </div>
    )
}

export default MovieCard;
