import {$api} from '@/api';
import {API_KEY} from '@/constants';
import {filterFetchResults} from '@/helpers';

export const getMoviePaginations = async (locale, page) => {
    return await $api().get(`/movie/popular?api_key=${API_KEY}&language=${locale}&page=${page || 1}`)
        .then((response) => response.data)
        .catch((error) => console.error(error))
}

export const getTrendingMovie = async (locale, time) => {
    return await $api().get(`/trending/movie/${time}?api_key=${API_KEY}&language=${locale}`)
        .then((response) => response.data.results.filter(item => filterFetchResults(item)))
        .catch((error) => console.error(error))
}


export const getTrendingTv = async (locale, time) => {
    return await $api().get(`/trending/tv/${time}?api_key=${API_KEY}&language=${locale}`)
        .then((response) => response.data.results.filter(item => filterFetchResults(item)))
        .catch((error) => console.error(error))
}
