import React from 'react';
import styles from './index.module.scss';
import SliderList from '@/components/slider-list';

const ToCinema = ({moviesListData}) => {

    return (
        <div className={styles.cinemaWrapper}>
            <SliderList
                listType="cinema-movies"
                title="toCinema"
                items={moviesListData}
            />
        </div>
    )
}

export default ToCinema;
