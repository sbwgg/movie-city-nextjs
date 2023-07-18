import React from 'react';
import styles from './index.module.scss';

const MovieClip = props => {
    const {clipKey} = props;

    return (
        <section className={styles.clipContainer}>
            <iframe width="560" height="315"
                    src={`https://www.youtube.com/embed/${clipKey}`}
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
            />
        </section>
    )
}

export default MovieClip;