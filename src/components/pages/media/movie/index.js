import React from 'react';
import classNames from 'classnames';
import {useTranslation} from 'next-i18next';
import StarRatings from 'react-star-ratings/build/star-ratings';
import ImageComponent from '@/components/UI/image-component';
import NextLink from '@/components/UI/NextLink';
import {roundNumber} from '@/helpers';
import styles from './index.module.scss';

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

    const formattedCurrency = value => {
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
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
                    <li>{t('media.title')}: <span>{movie.title}</span></li>
                    <li>{t('media.originalTitle')}: <span>{movie.original_title}</span></li>
                    <li>{t('media.year')}: <span>{movie.release_date}</span></li>
                    {movie.tagline && <li>{t('media.tagline')}: <span>{movie.tagline}</span></li>}
                    {movie.genres &&
                        <li>{t('global.genre')}:
                            {movie.genres.map(genre => {
                                return (
                                    <NextLink
                                        key={genre.id}
                                        href={`/genre/movie-list${genre.id}?name=${encodeURIComponent(genre.name)}`}
                                    >
                                        {genre.name}
                                    </NextLink>
                                )
                            })}
                        </li>
                    }
                    {movie.budget > 0 && <li>{t('media.budget')}: <span>{formattedCurrency(movie.budget)}</span></li>}
                    <li>
                        {t('media.duration')}:
                        <span>{movie.runtime} {t('media.min')} / {toHoursAndMinutes(movie.runtime)}</span>
                    </li>
                    {movie.production_countries &&
                        <li>{t('media.country')}:
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
                <div className={classNames([styles.movieAbout, 'movie-list-info-wrapper'])}>
                    <h3>{t('media.about')}</h3>
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
                        {t('media.rating')}: <strong>{roundNumber(movie.vote_average)}</strong>
                    </p>
                    <p className="text-sm">
                        {t('media.totalVotes')}: <strong>{movie.vote_count}</strong>
                    </p>
                </div>
            </div>
            }
        </section>
    )
}

export default Index;
