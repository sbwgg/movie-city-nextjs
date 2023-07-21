import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {getTrending} from '../../../../../services/home';
import {setTrending} from '@/redux/slices/homeSlice';
import {dispatch} from '@/helpers';
import {useSelector} from 'react-redux';
import styles from './index.module.scss';
import MovieList from '@/components/movie-list';
import {useTranslation} from 'next-i18next';

const Trending = () => {
	const [trendingBy, setTrendingBy] = useState('day');
	const router = useRouter();
	const currentLang = router.locale;
	const trendingList = useSelector(state => state.home.trendingMovies);

	const {t} = useTranslation();

	useEffect(() => {
		getTrending(currentLang, trendingBy)
			.then(res => dispatch(setTrending(res)))

	},[trendingBy, currentLang]);

	return (
		<div className={styles.trendingWrapper}>
			<div className={styles.trendingFilter}>
				<div className={trendingBy === 'day' ? styles.trendingActive : ''}>
					<input
						type="checkbox"
						id="trending-today"
						className="hidden"
						onChange={() => setTrendingBy('day')}
					/>
					<label htmlFor="trending-today">
						<span>{t('today')}</span>
					</label>
				</div>
				<div className={trendingBy === 'week' ? styles.trendingActive : ''}>
					<input
						type="checkbox"
						id="trending-week"
						className="hidden"
						onChange={() => setTrendingBy('week')}
					/>
					<label htmlFor="trending-week">
						<span>{t('week')}</span>
					</label>
				</div>
			</div>
			<MovieList
				key="trending"
				title="trending"
				movies={trendingList}
			/>
		</div>
	)
}

export default Trending;
