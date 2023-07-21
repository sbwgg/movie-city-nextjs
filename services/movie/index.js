import {$api} from '../../api';
import {API_KEY} from '@/constants';

export const getMovieById = async (id, locale) => {
	return await $api().get(`/movie/${id}?api_key=${API_KEY}&language=${locale}`)
		.then((response) => {
			return response.data
		})
		.catch((error) => console.log(error))
};

export const getClip = async id => {
	return await $api().get(`/movie/${id}/videos?api_key=${API_KEY}`)
		.then((response) => {
			return response.data.results.find(el =>
				el.type === 'Trailer' && el.name.includes('Trailer')
			)
		})
		.catch((error) => console.log(error))
};

export const getCast = async (id, locale) => {
	return await $api().get(`/movie/${id}/credits?api_key=${API_KEY}&language=${locale}`)
		.then((response) => response.data.cast.slice(0, 9))
		.catch((error) => console.log(error))
};

export const getSimilar = async (id, locale) => {
	return await $api().get(`/movie/${id}/similar?api_key=${API_KEY}&language=${locale}`)
		.then((response) => response.data.results)
		.catch((error) => console.error(error))
};

export const getRecommendations = async (id, locale) => {
	return await $api().get(`/movie/${id}/recommendations?api_key=${API_KEY}&language=${locale}`)
		.then((response) => response.data.results)
		.catch((error) => console.error(error))
};