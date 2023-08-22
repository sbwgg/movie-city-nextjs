import React from 'react';
import {useTranslation} from 'next-i18next';
import styles from './index.module.scss';
import ImageComponent from '@/components/UI/image-component';
import NextLink from '@/components/UI/NextLink';
import {IMAGE_PATH} from '@/constants';
import {extractYear, lowercaseString} from '@/helpers';

const Index = ({movie = {}}) => {
	const {t} = useTranslation();

	return (
		<section className={styles.movieLabelWrapper}>
			<figure className={styles.movieLabel}>
				<NextLink href={`/movie/${movie.id}-${lowercaseString(movie.original_title)}`}>
					<ImageComponent
						src={IMAGE_PATH(movie.poster_path)}
						width={150}
						height={220}
						alt={`Poster - ${movie.original_title}`}
					/>
				</NextLink>
				{movie.title &&
					<figcaption>
						<h1 className="flex flex-wrap gap-2">
							<NextLink href={`/movie/${movie.id}-${lowercaseString(movie.original_title)}`}>
								{movie.title}
							</NextLink>
							<span className="inline-block opacity-50 font-bold">
								({extractYear(movie.release_date)})
							</span>
						</h1>
						<NextLink href={`/movie/${movie.id}-${lowercaseString(movie.original_title)}`}>
							<svg xmlns="http://www.w3.org/2000/svg" height="15px" width="15px"
								 viewBox="0 0 448 512" fill="currentColor">
								<path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
							</svg>
							{t('movie.back')}
						</NextLink>
					</figcaption>
				}
			</figure>
		</section>
	)
}

export default Index;
