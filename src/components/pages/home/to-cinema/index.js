import React from 'react';
import styles from './index.module.scss';
import SliderList from '@/components/slider-list';

const Index = ({moviesListData}) => {

    return (
        <section className={styles.cinemaWrapper}>
            <SliderList
                listType="cinema-movies"
                title="toCinema"
                items={moviesListData}
            />
        </section>
    )
}

export default Index;
