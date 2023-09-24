import React from 'react';
import classNames from 'classnames';
import {useTranslation} from 'next-i18next';
import StarRatings from 'react-star-ratings/build/star-ratings';
import ImageComponent from '@/components/UI/image-component';
import NextLink from '@/components/UI/NextLink';
import {roundNumber} from '@/helpers';
import styles from './index.module.scss';

const Index = props => {
	const {
		tv = {},
	} = props;

	const {t} = useTranslation();

	const toHoursAndMinutes = totalMinutes => {
		if (totalMinutes) {
			const hrs = Math.floor(totalMinutes / 60);
			const mins = totalMinutes % 60;

			let convertedHours = hrs <= 9 ? `0${hrs}` : hrs
			let convertedMinutes = mins <= 9 ? `0${mins}` : mins

			return `${convertedHours}:${convertedMinutes}`
		}
	};

	return (
		<section className={styles.tvWrapper}>
			<div className={styles.tvDetailsContainer}>
				<ImageComponent
					src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
					alt={'Title:' + tv.name}
					width={500}
					height={750}
					priority
				/>
				<ul className={styles.tvDetails}>
					<li>{t('media.title')}: <span>{tv.name}</span></li>
					<li>{t('media.originalTitle')}: <span>{tv.original_name}</span></li>
					{tv.number_of_episodes && <li>{t('media.number_of_episodes')}: <span>{tv.number_of_episodes}</span></li>}
					{tv.number_of_seasons && <li>{t('media.number_of_seasons')}: <span>{tv.number_of_seasons}</span></li>}
					{tv.first_air_date && <li>{t('media.first_air_date')}: <span>{tv.first_air_date}</span></li>}
					{tv.last_air_date && <li>{t('media.last_air_date')}: <span>{tv.last_air_date}</span></li>}
					{tv.genres &&
						<li>{t('global.genre')}:
							{tv.genres.map(genre => {
								return (
									<NextLink
										key={genre.id}
										href={`/genre/tv-list/${genre.id}?name=${encodeURIComponent(genre.name)}`}
									>
										{genre.name}
									</NextLink>
								)
							})}
						</li>
					}
					{tv.episode_run_time > 0 && <li>
						{t('media.duration')}:
						<span>{tv.episode_run_time} {t('media.min')} / {toHoursAndMinutes(tv.episode_run_time)}</span>
					</li>}
				</ul>
			</div>
			{tv.overview &&
				<div className={classNames([styles.tvAbout, 'movie-list-info-wrapper'])}>
					<h3>{t('media.about')}</h3>
					<p>{tv.overview}</p>
				</div>
			}
			{tv.vote_average > 0 && <div className={styles.tvRatings}>
				<StarRatings
					rating={tv.vote_average}
					starRatedColor="rgb(var(--color-primary-blue))"
					numberOfStars={10}
					starEmptyColor="rgb(var(--color-primary-gray))"
					name='rating'
				/>
				<div className={styles.tvRatingsInfo}>
					<p className="text-lg">
						{t('media.rating')}: <strong>{roundNumber(tv.vote_average)}</strong>
					</p>
					<p className="text-sm">
						{t('media.totalVotes')}: <strong>{tv.vote_count}</strong>
					</p>
				</div>
			</div>}
		</section>
	)
}

export default Index;
