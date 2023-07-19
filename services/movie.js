import axios from 'axios';
import {API_KEY, BASE_URL} from '@/constants';

export const getMovieById = async (id, locale) => {
	return await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=${locale}`)
		.then((response) => response.data)
		.catch((error) => console.log(error))
};

export const getClip = async id => {
	return await axios.get(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`)
		.then((response) => {
			return response.data.results.find(el =>
				el.type === 'Trailer' && el.name.includes('Trailer')
			)
		})
		.catch((error) => console.log(error))
};

export const getCast = async (id, locale) => {
	return await axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=${locale}`)
		.then((response) => response.data.cast.slice(0, 9))
		.catch((error) => console.log(error))
};

export const getSimilar = async (id, locale) => {
	return await axios.get(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=${locale}`)
		.then((response) => response.data.results)
		.catch((error) => console.error(error))
};

export const getRecommendations = async (id, locale) => {
	return await axios.get(`${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}&language=${locale}`)
		.then((response) => response.data.results)
		.catch((error) => console.error(error))
};