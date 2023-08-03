import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useTranslation} from 'next-i18next';
import styles from './index.module.scss';
import useCurrentLocale from '@/hooks/useCurrentLocale';
import {getTrending} from '@/services/home';
import {setTrending} from '@/redux/slices/homeSlice';
import {dispatch} from '@/helpers';
import SliderList from '@/components/slider-list';

const Trending = () => {
	const [trendingBy, setTrendingBy] = useState('day');
	const locale = useCurrentLocale();
	const trendingList = useSelector(state => state.home.trendingMovies);

	const {t} = useTranslation();

	useEffect(() => {
		getTrending(locale, trendingBy)
			.then(res => dispatch(setTrending(res)))

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
							<span className="gradient-text">{t(trending.title)}</span>
						</label>
					</div>
				)}
			</div>
			<SliderList
				listType="trending"
				title="trending"
				items={trendingList}
			/>
		</div>
	)
}

export default Trending;
