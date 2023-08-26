import React from 'react';
import styles from './index.module.scss';
import SliderList from '@/components/slider-list';

const Index = ({moviesListData}) => {

    return (
        <SliderList
            listType="cinema-movies"
            title="toCinema"
            items={moviesListData}
            className={styles.cinemaWrapper}
        />
    )
}

export default Index;
