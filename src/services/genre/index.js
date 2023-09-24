import {$api} from '@/api';
import {API_KEY} from '@/constants';

export const getMovieGenres = async locale => {
    return await $api().get(`/genre/movie/list?api_key=${API_KEY}&language=${locale}`)
        .then((response) => response.data.genres)
        .catch((error) => console.log(error))
}

export const getTvGenres = async locale => {
    return await $api().get(`/genre/tv/list?api_key=${API_KEY}&language=${locale}`)
        .then((response) => response.data.genres)
        .catch((error) => console.log(error))
}

export const getMovieGenreResults = async (locale, id, page) => {
    return await $api().get(`/discover/movie?api_key=${API_KEY}&language=${locale}&page=${page || 1}&with_genres=${id}`)
        .then((response) => response.data)
        .catch((error) => console.error(error))
}

export const getTvGenreResults = async (locale, id, page) => {
    return await $api().get(`/discover/tv?api_key=${API_KEY}&language=${locale}&page=${page || 1}&with_genres=${id}`)
        .then((response) => response.data)
        .catch((error) => console.error(error))
}
