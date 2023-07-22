import React, {useEffect} from 'react';
import Default from '@/layouts/Default';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {dispatch} from '@/helpers';
import {getCast} from '../../../../services/movie/cast';
import {storeCast} from '@/redux/slices/movieSlice/castSlice';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

const Cast = () => {
	const router = useRouter();
	const castMembers = useSelector(state => state.cast.cast);
	const query = router.query.id;
	const currentLocale = router.locale;

	useEffect(() => {
		if (query) {
			getCast(query, currentLocale)
				.then(res => dispatch(storeCast(res)))


			return () => {
				dispatch(storeCast([]));
			}
		}
	},[query, currentLocale])

	return (
		<Default secondary>
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
