import {$api} from '@/api';
import {API_KEY} from '@/constants';

export const getMoviePaginations = async (locale, page) => {
    return await $api().get(`/movie/popular?api_key=${API_KEY}&language=${locale}&page=${page || 1}`)
        .then((response) => response.data)
        .catch((error) => console.error(error))
}

export const getCinema = async locale => {
    return await $api().get(`/movie/now_playing?api_key=${API_KEY}&language=${locale}&page=1`)
        .then((response) => response.data.results.filter(item => item.poster_path !== null))
        .catch((error) => console.error(error))
}

export const getTrending = async (locale, time) => {
    return await $api().get(`/trending/movie/${time}?api_key=${API_KEY}&language=${locale}`)
        .then((response) => response.data.results.filter(item => item.poster_path !== null))
        .catch((error) => console.error(error))
}
