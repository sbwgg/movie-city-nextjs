import React from 'react';
import styles from './index.module.scss';
import MovieCard from '@/components/movie-card';

const Index = props => {
    const {results} = props;

    return (
        <section className={styles.listResults}>
            {results && results.map((item, index) => {
                return (
                    <MovieCard
                        detailed
                        key={index}
                        movie={item}
                        delay={index}
                    />
                )
            })}
        </section>
    )
}

export default Index;
