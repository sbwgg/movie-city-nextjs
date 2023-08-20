import React from 'react';
import {useTranslation} from 'next-i18next';
import StarRatings from 'react-star-ratings/build/star-ratings';
import classNames from 'classnames';
import styles from './index.module.scss';
import ImageComponent from '@/components/UI/image-component';
import NextLink from '@/components/UI/NextLink';
import {roundNumber} from '@/helpers';

const Index = props => {
    const {
        movie = {},
    } = props;

    const {t} = useTranslation();

    const toHoursAndMinutes = totalMinutes => {
        if (totalMinutes) {
            const hrs = Math.floor(totalMinutes / 60);
            const mins = totalMinutes % 60;

            let convertedHours = hrs <= 9 ? `0${hrs}` : hrs
            let convertedMinutes = mins <= 9 ? `0${mins}` : mins

            return `${convertedHours}:${convertedMinutes}`
        }
    };

    return (
        <section className={styles.movieWrapper}>
            <div className={styles.movieDetailsContainer}>
                <ImageComponent
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={'Title:' + movie.title}
                    width={500}
                    height={750}
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
                                    <NextLink
                                        key={genre.id}
                                        href={`/genre/${genre.id}?name=${encodeURIComponent(genre.name)}`}
                                    >
                                        {genre.name}
                                    </NextLink>
                                )
                            })}
                        </li>
                    }
                    {movie.budget > 0 && <li>{t('movie.budget')}: <span>{movie.budget}$</span></li>}
                    <li>
                        {t('movie.duration')}:
                        <span>{movie.runtime} {t('movie.min')} / {toHoursAndMinutes(movie.runtime)}</span>
                    </li>
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
            {movie.overview &&
                <div className={classNames([styles.movieAbout, 'movie-info-wrapper'])}>
                    <h3>{t('movie.about')}</h3>
                    <p>{movie.overview}</p>
                </div>
            }
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
                        {t('movie.rating')}: <strong>{roundNumber(movie.vote_average)}</strong>
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

export default Index;
