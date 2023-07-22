import React, {useEffect} from 'react';
import Default from '@/layouts/Default';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {dispatch} from '@/helpers';
import {getCast} from '../../../../services/movie/cast';
import {getMovieById} from '../../../../services/movie';
import {storeCast} from '@/redux/slices/movieSlice/castSlice';
import {storeMovieById} from '@/redux/slices/movieSlice';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useTranslation} from 'next-i18next';

const Cast = () => {
	const router = useRouter();
	const castMembers = useSelector(state => state.cast.cast);
	const movieData = useSelector(state => state.movie.item);
	const query = router.query.id;
	const currentLocale = router.locale;

	const {t} = useTranslation();

	useEffect(() => {
		if (query) {
			getCast(query, currentLocale)
				.then(res => dispatch(storeCast(res)))

			getMovieById(query, currentLocale)
				.then(res => dispatch(storeMovieById(res)))


			return () => {
				dispatch(storeCast([]));
				dispatch(storeMovieById({}));
			}
		}
	},[query, currentLocale])

	return (
		<Default
			secondary
			title={`${t('pageTitles.cast')} - ${movieData.title}`}
			description={`${movieData.title} - ${t('pageTitles.cast')}`}
			image={movieData.backdrop_path}
			backgroundPoster={movieData.backdrop_path}
		>
			<section>
				{castMembers.map((cast, index) => {
						return (
							<div>
								<p>{cast.name}</p>
							</div>
						)
					}
				)}
			</section>
		</Default>
	)
}

export default Cast;

export const getServerSideProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale))
	}
});
