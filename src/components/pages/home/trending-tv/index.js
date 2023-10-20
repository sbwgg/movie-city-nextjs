import React, {useState} from 'react';
import {useTranslation} from 'next-i18next';
import {useCurrentLocale} from '@/hooks/useLocale';
import useDebounce from '@/hooks/useDebounce';
import SliderList from '@/components/slider-list';
import styles from './index.module.scss';

const Index = props => {
	const {byDay, byWeek} = props;
	const locale = useCurrentLocale();

	const [trendingBy, setTrendingBy] = useState('day');

	const {t} = useTranslation();

	const getTrendingDataForLocale = (data, localeIndex) => {
		return data && data[localeIndex] ? data[localeIndex].trendingTv : [];
	};

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
							id={`trending-tv-${trending.title}`}
							className="hidden"
							onChange={() => changeTrendingBy(trending.type)}
							checked={trendingBy === trending.type}
						/>
						<label htmlFor={`trending-tv-${trending.title}`}>
							<span className="gradient-text">{t(trending.title)}</span>
						</label>
					</div>
				)}
			</div>
			<SliderList
				listType="trending-tv"
				title="trendingShows"
				items={getTrendingDataForLocale(
					trendingBy === 'day' ? byDay : byWeek,
					locale === 'en' ? 0 : 1
				)}
				mediaType="tv"
			/>
		</section>
	)
}

export default Index;
