import React from 'react';
import NextLink from '@/components/UI/NextLink';
import styles from './index.module.scss';
import classNames from 'classnames';
import {motion} from 'framer-motion';
import {fadeInVariants, floatUpVariants} from '@/helpers/motion-animations';
import ImageComponent from '@/components/UI/ImageComponent';
import {IMAGE_PATH} from '@/constants';
import {useTranslation} from 'next-i18next';
import StarRatings from 'react-star-ratings/build/star-ratings';

const MovieCard = props => {
    const {
        movie,
        delay,
        detailed
    } = props;
    const {t} = useTranslation();

    return (
        <div className="h-full p-3">
            <NextLink href={`/movie/${movie.id}`} className={styles.movie}>
                <figure className="full-figure">
                    <motion.div
                        className={classNames([
                            styles.movieImage,
                            detailed && styles.movieImageDetailed
                        ])}
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
                        {detailed &&
                            <div className={styles.movieDetails}>
                                <ul>
                                    <li><span>{t('movie.year')}: </span>{movie.release_date}</li>
                                    <li><span>{t('movie.totalVotes')}: </span> {movie.vote_count}</li>
                                    <li><span>{t('movie.popularity')}: </span>{movie.popularity}</li>
                                </ul>
                                <span className={styles.movieDetailsAverage}>{Math.round(movie.vote_average * 100) / 100}</span>
                            </div>
                        }
                    </motion.div>
                    <motion.figcaption
                        className="mt-3"
                        initial="hide"
                        animate="show"
                        exit="hide"
                        variants={fadeInVariants}
                        transition={{type: 'tween', delay: delay * 0.15}}
                    >
                        {detailed &&
                            <div className={styles.movieDetailsRatings}>
                                <StarRatings
                                    rating={movie.vote_average || 0}
                                    starRatedColor="rgb(var(--color-primary-blue))"
                                    numberOfStars={10}
                                    starEmptyColor="rgba(var(--color-black), 0.4)"
                                    name="rating"
                                />
                            </div>
                        }
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
