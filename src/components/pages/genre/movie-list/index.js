import React from 'react';
import MediaCard from '@/components/media-card';
import styles from './index.module.scss';

const Index = props => {
    const {results, mediaType = 'movie'} = props;

    return (
        <section className={styles.listResults}>
            {results && results.map((item, index) =>
                <MediaCard
                    detailed
                    key={index}
                    media={item}
                    delay={index}
                    mediaType={mediaType}
                />
            )}
        </section>
    )
}

export default Index;
