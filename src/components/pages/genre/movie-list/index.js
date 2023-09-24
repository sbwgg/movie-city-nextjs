import React from 'react';
import styles from './index.module.scss';
import MediaCard from '@/components/media-card';

const Index = props => {
    const {results, mediaType = 'movie'} = props;

    return (
        <section className={styles.listResults}>
            {results && results.map((item, index) => {
                return (
                    <MediaCard
                        detailed
                        key={index}
                        media={item}
                        delay={index}
                        mediaType={mediaType}
                    />
                )
            })}
        </section>
    )
}

export default Index;
