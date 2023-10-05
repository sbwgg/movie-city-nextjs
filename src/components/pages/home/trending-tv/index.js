import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useTranslation} from 'next-i18next';
import useCurrentLocale from '@/hooks/useCurrentLocale';
import useDebounce from '@/hooks/useDebounce';
import {getTrendingTv} from '@/services/home';
import {setTrendingTv} from '@/redux/slices/homeSlice';
import {dispatch} from '@/helpers';
import SliderList from '@/components/slider-list';
import styles from './index.module.scss';

const Index = () => {
	const [trendingBy, setTrendingBy] = useState('day');
	const locale = useCurrentLocale();
	const {trendingTv} = useSelector(state => state.home);

	const {t} = useTranslation();

	useEffect(() => {
		getTrendingTv(locale, trendingBy)
			.then(response => dispatch(setTrendingTv(response)))

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
							type="checkbox"
							id={`trending-${trending.title}`}
							className="hidden"
							onChange={() => changeTrendingBy(trending.type)}
						/>
						<label htmlFor={`trending-${trending.title}`}>
							<span className="gradient-text">{t(trending.title)}</span>
						</label>
					</div>
				)}
			</div>
			<SliderList
				listType="trending-tv"
				title="trendingShows"
				items={trendingTv}
				mediaType="tv"
			/>
		</section>
	)
}

export default Index;
