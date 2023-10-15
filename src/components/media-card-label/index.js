import React from 'react';
import {useTranslation} from 'next-i18next';
import {motion} from 'framer-motion';
import classNames from 'classnames';
import styles from './index.module.scss';
import NextLink from '@/components/UI/NextLink';
import ImageComponent from '@/components/UI/image-component';
import {IMAGE_PATH} from '@/constants';
import {roundNumber, lowercaseString} from '@/helpers/stringHelpers';
import {fadeInVariants} from '@/helpers/moduleHelpers';

const Index = props => {
    const {
        media,
        mediaType = 'movie',
        delay
    } = props;

    const {t} = useTranslation();

    return (
        <motion.div
            className={styles.mediaCardLabelContainer}
            initial="hide"
            animate="show"
            exit="hide"
            variants={fadeInVariants}
            transition={{type: 'tween', delay: delay * 0.15}}
        >
            <NextLink
                href={`/media/${mediaType}/${media.id}-${lowercaseString(media?.original_title || media?.original_name)}`}
                className={classNames([styles.mediaCardLabel, 'card-label-hover'])}
            >
                <div className={styles.mediaCardImage}>
                    <ImageComponent
                        src={IMAGE_PATH(media.poster_path)}
                        alt={`Title: ${media?.title || media?.name}`}
                    />
                </div>
                <div className={styles.mediaCardDetails}>
                    <h4>{media?.title || media?.name}</h4>
                    <p>{t('media.year')}: <strong>{media?.release_date || media?.first_air_date}</strong></p>
                    <p>{t('media.totalVotes')}: <strong>{media.vote_count}</strong></p>
                    <span className="vote-circle">
                        {roundNumber(media.vote_average)}
                    </span>
                </div>
            </NextLink>
        </motion.div>
    )
}

export default Index;
