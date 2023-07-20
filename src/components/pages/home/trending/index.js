import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {getTrending} from '../../../../../services/home';
import {setTrending} from '@/redux/slices/homeSlice';
import {dispatch} from '@/helpers';
import {useSelector} from 'react-redux';
import styles from './index.module.scss';
import MovieList from '@/components/movie-list';
import {getGenres} from '../../../../../services/global';

const Trending = () => {
	const [trendingBy, setTrendingBy] = useState('day');
	const router = useRouter();
	const currentLang = router.locale;
	const trendingList = useSelector(state => state.home.trendingMovies);

	useEffect(() => {
		getTrending(currentLang, trendingBy)
			.then(res => dispatch(setTrending(res)))

		getGenres(currentLang)
	},[trendingBy, currentLang])

	return (
		<div>
			<MovieList
				key="trending"
				title="Trending"
				moviesData={trendingList}
			/>
		</div>
	)
}

export default Trending;
