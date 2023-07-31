import React from 'react';
import styles from './index.module.scss';
import {useRouter} from 'next/router';
import SliderList from '@/components/slider-list';

const ToCinema = ({moviesListData}) => {
    const router = useRouter();

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
