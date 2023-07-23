import {$api} from '@/api';
import {API_KEY} from '@/constants';

export const getCast = async (id, locale) => {
	return await $api().get(`/movie/${id}/credits?api_key=${API_KEY}&language=${locale}`)
		.then((response) => response.data.cast)
		.catch((error) => console.log(error))
}

export const getCrew = async (id, locale) => {
	return await $api().get(`/movie/${id}/credits?api_key=${API_KEY}&language=${locale}`)
		.then((response) => response.data.crew)
		.catch((error) => console.log(error))
}
