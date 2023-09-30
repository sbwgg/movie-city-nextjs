import {$api} from '@/api';
import {API_KEY} from '@/constants';
import {filterFetchResults} from '@/helpers';

export const getTvById = (id, locale) => {
	return $api().get(`/tv/${id}?api_key=${API_KEY}&language=${locale}`)
		.then((response) => response.data)
		.catch((error) => console.error(error))
};

const getTvExternalIds = id => {
	return $api().get(`/tv/${id}/external_ids?api_key=${API_KEY}`)
		.then((response) => response.data)
		.catch((error) => console.error(error))
};

const getTvCast = (id, locale) => {
	return $api().get(`/tv/${id}/aggregate_credits?api_key=${API_KEY}&language=${locale}`)
		.then((response) => {
			const movieCast =  response.data.cast.filter(person => person.profile_path !== null)

			return movieCast.slice(0, 9);
		})
		.catch((error) => console.error(error))
};

const getRecommendations = (id, locale) => {
	return $api().get(`/tv/${id}/recommendations?api_key=${API_KEY}&language=${locale}`)
		.then((response) => response.data.results.filter(item => filterFetchResults(item)))
		.catch((error) => console.error(error))
};

const getReviews = id => {
	return $api().get(`/tv/${id}/reviews?api_key=${API_KEY}`)
		.then((response) => response.data.results)
		.catch((error) => console.error(error))
}

export const fetchTvData = async (id, locale) => {
	const promises = [
		getTvById(id, locale),
		getTvCast(id, locale),
		getRecommendations(id, locale),
		getReviews(id),
		getTvExternalIds(id)
	];

	try {
		const [
			info,
			cast,
			recommendations,
			reviews,
			imdbId
		] = await Promise.all(promises);

		const tvWithDefaultClip = {
			info,
			cast,
			recommendations,
			reviews,
			imdbId
		};

		return tvWithDefaultClip;

	} catch (error) {
		console.error(error);
	}
};
