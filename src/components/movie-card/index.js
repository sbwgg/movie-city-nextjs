import React from 'react';
import classNames from 'classnames';
import {motion} from 'framer-motion';
import {useTranslation} from 'next-i18next';
import StarRatings from 'react-star-ratings/build/star-ratings';
import styles from './index.module.scss';
import NextLink from '@/components/UI/NextLink';
import ImageComponent from '@/components/UI/image-component';
import {IMAGE_PATH} from '@/constants';
import {roundNumber} from '@/helpers';
import {fadeInVariants, floatUpVariants} from '@/helpers/motion-animations';
import {lowercaseString} from '@/helpers';

const Index = props => {
    const {
        movie,
        delay,
        detailed
    } = props;
    const {t} = useTranslation();

    return (
        <div className="h-full p-3">
            <NextLink href={`/movie/${movie.id}-${lowercaseString(movie.original_title)}`} className={styles.movie}>
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
                                <span className={classNames([
                                    styles.movieDetailsAverage, 'vote-circle'
                                ])}>
                                    {roundNumber(movie.vote_average)}
                                </span>
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

export default Index;
