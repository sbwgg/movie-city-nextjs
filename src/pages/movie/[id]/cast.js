import React, {useEffect} from 'react';
import Default from '@/layouts/Default';
import Cast from '@/components/pages/cast';
import MovieLabel from '@/components/pages/cast/movie-label';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {dispatch} from '@/helpers';
import {fetchCastData} from '@/services/movie/cast';
import {storeCredits} from '@/redux/slices/movieSlice/castSlice';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useTranslation} from 'next-i18next';

const CastPage = () => {
	const router = useRouter();
	const { cast, crew, movieData } = useSelector(state => state.cast.data);
	const query = router.query.id;
	const currentLocale = router.locale;

	const {t} = useTranslation();

	useEffect(() => {
		if (query) {
			const fetchData = async () => {
				try {
					const data = await fetchCastData(query, currentLocale);
					data && dispatch(storeCredits(data));

				} catch (error) {
					console.error(error);
				}
			};

			fetchData();

			return () => {
				dispatch(storeCredits({
					cast:[],
					crew: [],
					movieData: {}
				}))
			}
		}
	}, [query, currentLocale]);

	return (
		<Default
			secondary
			title={t('pageTitles.cast')}
			description={`${movieData.title} - ${t('pageTitles.cast')}`}
			image={movieData.backdrop_path}
			backgroundPoster={movieData.backdrop_path}
		>
			<MovieLabel movie={movieData}/>
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
