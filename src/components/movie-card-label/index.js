import React from 'react';
import styles from './index.module.scss';
import NextLink from '@/components/UI/NextLink';
import ImageComponent from '@/components/UI/ImageComponent';
import {IMAGE_PATH} from '@/constants';
import {useTranslation} from 'next-i18next';
import {roundNumber} from '@/helpers';
import {motion} from 'framer-motion';
import {fadeInVariants} from '@/helpers/motion-animations';

const MovieCardLabel = props => {
    const {
        movie,
        delay
    } = props;

    const {t} = useTranslation();

    return (
        <motion.div
            className={styles.movieCardLabelContainer}
            initial="hide"
            animate="show"
            exit="hide"
            variants={fadeInVariants}
            transition={{type: 'tween', delay: delay * 0.15}}
        >
            <NextLink
                href={`/movie/${movie.id}`}
                className={styles.movieCardLabel}
            >
                <div className={styles.movieCardImage}>
                    <ImageComponent
                        src={IMAGE_PATH(movie.poster_path)}
                        alt={`Title: ${movie.title}`}
                    />
                </div>
                <div className={styles.movieCardDetails}>
                    <h4>{movie.title}</h4>
                    <p>{t('movie.year')}: <strong>{movie.release_date}</strong></p>
                    <p>{t('movie.totalVotes')}: <strong>{movie.vote_count}</strong></p>
                    <span className="vote-circle">
                        {roundNumber(movie.vote_average)}
                    </span>
                </div>
            </NextLink>
        </motion.div>
    )
}

export default MovieCardLabel;