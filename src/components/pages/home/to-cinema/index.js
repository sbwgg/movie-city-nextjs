import React, {useEffect} from 'react';
import styles from './index.module.scss';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {dispatch} from '@/helpers';
import {getCinema} from '../../../../../services/home';
import {setCinema} from '@/redux/slices/homeSlice';
import MovieList from '@/components/movie-list';

const ToCinema = () => {
    const router = useRouter();
    const currentLang = router.locale;
    const cinemaMovies = useSelector(state => state.home.cinemaMovies);

    useEffect(() => {
        getCinema(currentLang)
            .then(res => dispatch(setCinema(res)));

    },[currentLang]);

    return (
        <div className={styles.cinemaWrapper}>
            <MovieList
                key="cinema-movies"
                title="toCinema"
                moviesData={cinemaMovies}
            />
        </div>
    )
}

export default ToCinema;