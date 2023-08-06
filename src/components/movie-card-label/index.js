import React from 'react';
import {useTranslation} from 'next-i18next';
import {motion} from 'framer-motion';
import classNames from 'classnames';
import styles from './index.module.scss';
import NextLink from '@/components/UI/NextLink';
import ImageComponent from '@/components/UI/image-component';
import {IMAGE_PATH} from '@/constants';
import {roundNumber} from '@/helpers';
import {fadeInVariants} from '@/helpers/motion-animations';
import {lowercaseString} from '@/helpers';

const Index = props => {
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
                href={`/movie/${movie.id}-${lowercaseString(movie.original_title)}`}
                className={classNames([styles.movieCardLabel, 'card-label-hover'])}
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

export default Index;
