import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Person from '@/layouts/Person';
import {fetchPersonData} from '@/services/person';
import PersonalInfo from '@/components/pages/person/personal-info';
import Career from '@/components/pages/person/career';

const Index = ({person}) => {

	const {details, socialMedia} = person;

	return (
		<Person
			title={details.name}
			description={details.name}
			image={details.profile_path}
		>
			<PersonalInfo
				details={details}
				social={socialMedia}
			/>
			<Career
				name={details.name}
				biography={details.biography}
			/>
		</Person>
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

	return {
		props: {
			person,
			...(await serverSideTranslations(locale)),
		},
	};
};
