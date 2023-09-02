import React, {useState} from 'react';
import classNames from 'classnames';
import {useTranslation} from 'next-i18next';
import {lowercaseString, truncateText, extractYear} from '@/helpers';
import SliderList from '@/components/slider-list';
import NextLink from '@/components/UI/NextLink';
import ImageComponent from '@/components/UI/image-component';
import {IMAGE_PATH, BACKDROP_PATH} from '@/constants';
import styles from './index.module.scss';

const Index = props => {
    const {
        name,
        biography,
        topMovies,
        careerList
    } = props;

    const {t} = useTranslation();
    const [isTruncate, setIsTruncate] = useState(true);

    const truncateLimit = 400;
    const truncatedBiography = truncateText(biography, truncateLimit);

    return (
        <section className={styles.careerWrapper}>
            <h1>{name}</h1>
            <div className={styles.careerContainer}>
                <div className={styles.careerBiography}>
                    <h3>{t('person.biography')}</h3>
                    {biography ? (
                        <p>{isTruncate ? truncatedBiography : biography}
                            {biography.length > truncateLimit &&
                                <span
                                    className="gradient-text"
                                    onClick={() => setIsTruncate(!isTruncate)}
                                >
                                {isTruncate ? t('global.more') : t('global.less')}
                            </span>
                            }
                        </p>
                    ) : (
                        <p>{t('person.missing-biography')} {name}</p>
                    )}
                </div>
                {topMovies.length > 0 &&
                    <div className={styles.careerKnown}>
                        <h3>{t('person.known-for')}</h3>
                        <SliderList
                            listType="top-popular-movies"
                            items={topMovies}
                        />
                    </div>
                }
            </div>

            <div className={classNames([
                styles.careerListWrapper, 'darken-background'
            ])}>
                <h3>{t('person.acting-career')}</h3>
                <ul className={styles.careerList}>
                    {careerList.map((movie, index) =>
                        <li className={styles.careerListItem}
                            key={`career-movie-${index}`}
                        >
                            <NextLink href={`/movie/${movie.id}-${lowercaseString(movie.original_title)}`}>
                                <ImageComponent
                                    src={IMAGE_PATH(movie.poster_path)}
                                    alt={`Title: ${movie.title}`}
                                />
                            </NextLink>
                            <div className={styles.careerListDescription}>
                                {movie.release_date && <span>{extractYear(movie.release_date)}</span>}
                                <NextLink
                                    className="font-bold w-fit"
                                    href={`/movie/${movie.id}-${lowercaseString(movie.original_title)}`}
                                >
                                    {movie.title}
                                </NextLink>
                                <p>
                                    {t('person.character')}:
                                    <span className="font-bold"> {movie.character} </span>
                                </p>
                            </div>
                            {movie.backdrop_path &&
                                <div
                                    className={styles.careerListItemBackground}
                                    style={{backgroundImage: `url(${BACKDROP_PATH(movie.backdrop_path)})`}}
                                />
                            }
                        </li>
                    )}
                </ul>
            </div>
        </section>

    )
}

export default Index;
