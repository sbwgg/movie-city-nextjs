import React, {useState} from 'react';
import {useTranslation} from 'next-i18next';
import styles from './index.module.scss';
import {truncateText} from '@/helpers';

const Index = props => {
    const {
        name,
        biography
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
                            {isTruncate && biography.length > truncateLimit &&
                                <span
                                    className="gradient-text"
                                    onClick={() => setIsTruncate(false)}
                                >
                                Read More
                            </span>
                            }
                        </p>
                    ) : (
                        <p>{t('person.missing-biography')} {name}</p>
                    )}
                </div>
                <div className={styles.careerKnown}>
                    <h3>{t('person.known-for')}</h3>
                </div>
            </div>
        </section>
    )
}

export default Index;
