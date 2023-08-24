import React, {useState} from 'react';
import {useTranslation} from 'next-i18next';
import styles from './index.module.scss';
import {truncateText} from '@/helpers';
import SliderList from '@/components/slider-list';

const Index = props => {
    const {
        name,
        biography,
        topMovies
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
                                {isTruncate ? 'Read More' : 'Read Less'}
                            </span>
                            }
                        </p>
                    ) : (
                        <p>{t('person.missing-biography')} {name}</p>
                    )}
                </div>
                <div className={styles.careerKnown}>
                    <h3>{t('person.known-for')}</h3>
                    <SliderList
                        listType="top-popular-movies"
                        items={topMovies}
                    />
                </div>
            </div>
        </section>
    )
}

export default Index;
