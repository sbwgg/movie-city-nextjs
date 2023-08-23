import {$api} from '@/api';
import {API_KEY} from '@/constants';

// GET
export const getPopularMovies = async locale => {
        return await $api().get(`/movie/popular?api_key=${API_KEY}&language=${locale}&page=2`)
            .then((response) => response.data.results)
            .catch((error) => console.log(error))
};

export const getTopMovies = async (locale, page) => {
    return await $api().get(`/movie/top_rated?api_key=${API_KEY}&language=${locale}&page=${page || 1}`)
        .then((response) => response.data.results.slice(0, 10))
        .catch((error) => console.log(error))
};

export const getSearchResults = async (keyword, locale, page) => {
        return await $api().get(`/search/movie?api_key=${API_KEY}&language=${locale}&page=${page || 1}`, {
                params: {
                    query: keyword.query
                }
        })
        .then((response) => response.data)
        .catch((error) => console.log(error))
}

export const getFooterMovie = async locale => {
    return await $api().get(`/trending/movie/day?api_key=${API_KEY}&language=${locale}`)
        .then((response) => response.data.results[0])
        .catch((error) => console.log(error))
}
