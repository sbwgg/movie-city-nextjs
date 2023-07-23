import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {getTrending} from '@/services/home';
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

	const trendingLabels = [
		{
			type: 'day',
			title: 'today'
		},
		{
			type: 'week',
			title: 'week'
		}
	];

	return (
		<div className={styles.trendingWrapper}>
			<div className={styles.trendingFilter}>
				{trendingLabels.map(trending =>
					<div key={trending.type}
						 className={trendingBy === trending.type ? styles.trendingActive : ''}
					>
						<input
							type="checkbox"
							id={`trending-${trending.title}`}
							className="hidden"
							onChange={() => setTrendingBy(trending.type)}
						/>
						<label htmlFor={`trending-${trending.title}`}>
							<span>{t(trending.title)}</span>
						</label>
					</div>
				)}
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
