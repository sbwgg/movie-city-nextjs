import React from 'react';
import {useRouter} from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Default from '@/layouts/Default';


const Index = () => {
	const router = useRouter();
	const id = router.query.id;

	return (
		<Default>
			<p>{id}</p>
		</Default>
	)
};

export default Index;

export const getServerSideProps = async ({locale}) => {
	return {
		props: {
			...(await serverSideTranslations(locale)),
		},
	};
};
