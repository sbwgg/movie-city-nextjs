import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useTranslation} from 'next-i18next';
import SliderList from '@/components/slider-list';
import {dispatch} from '@/helpers';
import {useCurrentLocale} from '@/hooks/useLocale';
import useDebounce from '@/hooks/useDebounce';
import {getTrendingMovie} from '@/services/home';
import {setTrending} from '@/redux/slices/homeSlice';
import styles from './index.module.scss';

const Index = () => {
	const [trendingBy, setTrendingBy] = useState('day');
	const locale = useCurrentLocale();
	const {trending} = useSelector(state => state.home);

	const {t} = useTranslation();

	useEffect(() => {
		getTrendingMovie(locale, trendingBy)
			.then(response => dispatch(setTrending({
				movies: response
			})))

	},[trendingBy, locale]);

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

	const changeTrendingBy = useDebounce(type => {
		setTrendingBy(type);
	}, 500);

	return (
		<section className={styles.trendingWrapper}>
			<div className={styles.trendingFilter}>
				{trendingLabels.map(trending =>
					<div key={trending.type}
						 className={trendingBy === trending.type ? styles.trendingActive : ''}
					>
						<input
							type="radio"
							id={`trending-movie-${trending.title}`}
							className="hidden"
							onChange={() => changeTrendingBy(trending.type)}
							checked={trendingBy === trending.type}
						/>
						<label htmlFor={`trending-movie-${trending.title}`}>
							<span className="gradient-text">{t(trending.title)}</span>
						</label>
					</div>
				)}
			</div>
			<SliderList
				listType="trending-movies"
				title="trendingMovies"
				items={trending.movies}
			/>
		</section>
	)
}

export default Index;
