import React from 'react';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {useTranslation} from 'next-i18next';
import Empty from '@/layouts/Empty';
import Cast from '@/components/pages/cast';
import MediaLabel from '@/components/pages/cast/media-label';
import {fetchCastData} from '@/services/media/tv/cast';

const CastPage = ({ cast, crew, tvData }) => {

	const {t} = useTranslation();

	return (
		<Empty
			title={`${tvData.name} - ${t('pageTitles.cast')}`}
			description={`${tvData.name} - ${t('pageTitles.cast')}`}
			image={tvData.backdrop_path}
			backgroundPoster={tvData.backdrop_path}
			className="transparent-bg"
		>
			<MediaLabel media={tvData} mediaType="tv"/>
			<Cast
				castData={cast}
				crewData={crew}
			/>
		</Empty>
	)
}

export default CastPage;

export const getServerSideProps = async ({ locale, query }) => {
	try {
		const currentLocale = locale || 'en';
		const { id } = query;

		const { cast, crew, tvData } = id
			? await fetchCastData(id, currentLocale)
			: { cast: [], crew: [], tvData: {} };

		return {
			props: {
				...(await serverSideTranslations(currentLocale)),
				cast,
				crew,
				tvData,
			},
		};
	} catch (error) {
		console.error(error);
		return {
			props: {
				...(await serverSideTranslations(locale)),
				cast: [],
				crew: [],
				tvData: {},
			},
		};
	}
};
