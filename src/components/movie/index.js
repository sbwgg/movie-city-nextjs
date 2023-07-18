import React from 'react';
import styles from './index.module.scss';
import ImageComponent from '@/components/UI/ImageComponent';
import {IMAGE_PATH} from '@/constants';
import NextLink from '@/components/UI/NextLink';
import {useTranslation} from 'next-i18next';
import StarRatings from 'react-star-ratings/build/star-ratings';

const Movie = props => {
    const {
        movie = {}
    } = props;

    const {t} = useTranslation();

    return (
        <section className={styles.movieWrapper}>
            <div className={styles.movieDetailsContainer}>
                <ImageComponent
                    src={IMAGE_PATH(movie.poster_path)}
                    alt={'Title:' + movie.title}
                    width={300}
                    height={450}
                    priority
                />
                <ul className={styles.movieDetails}>
                    <li>{t('movie.title')}: <span>{movie.title}</span></li>
                    <li>{t('movie.originalTitle')}: <span>{movie.original_title}</span></li>
                    <li>{t('movie.year')}: <span>{movie.release_date}</span></li>
                    {movie.tagline && <li>{t('movie.tagline')}: <span>{movie.tagline}</span></li>}
                    {movie.genres &&
                        <li>{t('movie.genre')}:
                            {movie.genres.map(genre => {
                                return (
                                    <NextLink key={genre.id} href={`/genre/${genre.id}`}>
                                        {genre.name}
                                    </NextLink>
                                )
                            })}
                        </li>
                    }
                    <li>{t('movie.budget')}: <span>{movie.budget}$</span></li>
                    <li>{t('movie.duration')}: <span>{movie.runtime} {t('movie.min')}</span></li>
                    {movie.production_countries &&
                        <li>{t('movie.country')}:
                            {movie.production_countries.map((country, key) => {
                                return (
                                    <span key={`country-${key}`}>{country.iso_3166_1}</span>
                                )
                            })}
                        </li>
                    }
                </ul>
            </div>
            <div className={styles.movieAbout}>
                <h3>{t('movie.about')}</h3>
                <p>{movie.overview}</p>
            </div>
            {movie.vote_average > 0 && <div className={styles.movieRatings}>
                <StarRatings
                    rating={movie.vote_average}
                    starRatedColor="rgb(var(--color-primary-blue))"
                    numberOfStars={10}
                    starEmptyColor="rgb(var(--color-primary-gray))"
                    name='rating'
                />
                <div className={styles.movieRatingsInfo}>
                    <p className="text-lg">
                        {t('movie.rating')}: <strong>{movie.vote_average}</strong>
                    </p>
                    <p className="text-sm">
                        {t('movie.totalVotes')}: <strong>{movie.vote_count}</strong>
                    </p>
                </div>
            </div>
            }
        </section>
    )
}

export default Movie;
