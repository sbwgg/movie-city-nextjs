import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Empty from '@/layouts/Empty';
import {fetchPersonData} from '@/services/person';
import PersonalInfo from '@/components/pages/person/personal-info';
import Career from '@/components/pages/person/career';

const Index = ({person}) => {
	const {details, socialMedia, topPopularMovies, career} = person;

	return (
		<Empty
			title={details.name}
			description={details.name}
			image={details.profile_path}
		>
			<div className="grid gap-3 mt-7 lg:grid-cols-[.5fr_1fr] lg:gap-5">
				<PersonalInfo
					details={details}
					social={socialMedia}
				/>
				<Career
					details={details}
					topMovies={topPopularMovies}
					careerList={career}
				/>
			</div>
		</Empty>
	)
};

export default Index;

export const getServerSideProps = async ({locale, query}) => {
	const { id: queryId } = query;
	if (!queryId) {
		return {
			notFound: true,
		};
	}

	const person = await fetchPersonData(queryId, locale);

	if (Array.isArray(person.career.movies)) {
		person.career.movies = person.career.movies
			.filter(movie => movie.release_date >= person.details.birthday);
	}

	return {
		props: {
			person,
			...(await serverSideTranslations(locale)),
		},
	};
};
