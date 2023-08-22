import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Person from '@/layouts/Person';
import PersonalInfo from '@/components/pages/person/personal-info';
import {fetchPersonData} from '@/services/person';

const Index = ({person}) => {

	const {details, socialMedia} = person;

	return (
		<Person title={details.name} description={details.name} image={details.profile_path}>
			<PersonalInfo
				details={details}
				social={socialMedia}
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
