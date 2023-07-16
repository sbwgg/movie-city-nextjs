import {API_KEY, BASE_URL} from '@/constants';
import axios from 'axios';

export const getMovieById = async (id, locale) => {
	return await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=${locale}`)
		.then((response) => response.data)
		.catch((error) => console.log(error))
}

export const getMovieClip = async id => {
	return await axios.get(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`)
		.then((response) =>  response.data.results[0])
		.catch((error) => console.log(error))
}

export const getMovieCast = async (id, locale) => {
	return await axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=${locale}`)
		.then((response) => response.data.cast.slice(0, 9))
		.catch((error) => console.log(error))
}
