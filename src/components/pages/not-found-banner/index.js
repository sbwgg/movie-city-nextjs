import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import NextLink from '@/components/UI/NextLink';
import {dispatch, dynamicBackground, lowercaseString} from '@/helpers';
import {getPopularMovieOfDay} from '@/services/global';
import {setPopularMovieOfDay} from '@/redux/slices/globalSlice';
import styles from './index.module.scss';

const NotFoundBanner = () => {
	const {popularMovie} = useSelector(state => state.global);

	useEffect(() => {
		getPopularMovieOfDay()
			.then(response => {
				dispatch(setPopularMovieOfDay(response))
			})
	},[]);

	return (
		<section className={styles.notFoundWrapper}
				 style={popularMovie.backdrop_path && dynamicBackground(popularMovie.backdrop_path)}
		>
			{popularMovie.backdrop_path &&
				<NextLink
					href={`/movie/${popularMovie.id}-${lowercaseString(popularMovie.original_title)}`}
				/>
			}
			<div className={styles.notFoundContainer}>
				<h1 className="gradient-text-blurred" data-text="404">404</h1>
				<h2>Oops, seems something went wrong!</h2>
				<NextLink href="/" className="btn btn-secondary">Go to HOME</NextLink>
			</div>
		</section>
	)
}

export default NotFoundBanner;
