import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';

const Index = props => {
    const {clipKey} = props;

    return (
        <section className={classNames([styles.clipContainer, 'movie-info-wrapper'])}>
            <iframe width="560" height="315"
                    src={`https://www.youtube.com/embed/${clipKey}`}
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
            />
        </section>
    )
}

export default Index;
