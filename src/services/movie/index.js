import {$api} from '@/api';
import {API_KEY} from '@/constants';

export const getMovieById = async (id, locale) => {
	return await $api().get(`/movie/${id}?api_key=${API_KEY}&language=${locale}`)
		.then((response) => response.data)
		.catch((error) => console.error(error))
};

const getClip = (id, locale) => {
	return $api().get(`/movie/${id}/videos?api_key=${API_KEY}&language=${locale}`)
		.then((response) => {
			return response.data.results.find(el =>
				el.type === 'Trailer'
			)
		})
		.catch((error) => console.error(error))
};

const getMovieCast = (id, locale) => {
	return $api().get(`/movie/${id}/credits?api_key=${API_KEY}&language=${locale}`)
		.then((response) => response.data.cast.slice(0, 9))
		.catch((error) => console.error(error))
};

const getSimilar = (id, locale) => {
	return $api().get(`/movie/${id}/similar?api_key=${API_KEY}&language=${locale}`)
		.then((response) => response.data.results)
		.catch((error) => console.error(error))
};

const getRecommendations = (id, locale) => {
	return $api().get(`/movie/${id}/recommendations?api_key=${API_KEY}&language=${locale}`)
		.then((response) => response.data.results)
		.catch((error) => console.error(error))
};

const getReviews = id => {
	return $api().get(`/movie/${id}/reviews?api_key=${API_KEY}`)
		.then((response) => response.data.results.slice(0, 10))
		.catch((error) => console.error(error))
}

export const fetchMovieData = async (id, locale) => {
	const promises = [
		getMovieById(id, locale),
		getClip(id, locale),
		getMovieCast(id, locale),
		getSimilar(id, locale),
		getRecommendations(id, locale),
		getReviews(id)
	];

	try {
		const [
			info,
			clip,
			cast,
			similar,
			recommendations,
			reviews
		] = await Promise.all(promises);

		return {
			info,
			clip,
			cast,
			similar,
			recommendations,
			reviews
		};

	} catch (error) {
		console.error(error);
		return null;
	}
};
