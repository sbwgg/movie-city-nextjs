import React, {useEffect} from 'react';
import Default from '@/layouts/Default';
import Cast from '@/components/pages/cast';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {dispatch} from '@/helpers';
import {getCast, getCrew} from '@/services/movie/cast';
import {getMovieById} from '@/services/movie';
import {storeCast, storeCrew, storeMovieByID} from '@/redux/slices/movieSlice/castSlice';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useTranslation} from 'next-i18next';

const CastPage = () => {
	const router = useRouter();
	const {cast, crew, movieData} = useSelector(state => state.cast);
	const query = router.query.id;
	const currentLocale = router.locale;

	const {t} = useTranslation();

	useEffect(() => {
		if (query) {
			getCast(query, currentLocale)
				.then(res => dispatch(storeCast(res)))

			getCrew(query, currentLocale)
				.then(res => dispatch(storeCrew(res)))

			getMovieById(query, currentLocale)
				.then(res => dispatch(storeMovieByID(res)))


			return () => {
				dispatch(storeCast([]));
				dispatch(storeCrew([]));
				dispatch(storeMovieByID({}));
			}
		}
	},[query, currentLocale]);

	return (
		<Default
			secondary
			title={t('pageTitles.cast')}
			description={`${movieData.title} - ${t('pageTitles.cast')}`}
			image={movieData.backdrop_path}
			backgroundPoster={movieData.backdrop_path}
		>
			<Cast
				castData={cast}
				crewData={crew}
			/>
		</Default>
	)
}

export default CastPage;

export const getServerSideProps = async ({ locale }) => ({
	props: {
		...(await serverSideTranslations(locale))
	}
});
