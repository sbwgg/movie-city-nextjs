import axios from 'axios';
import {API_KEY, BASE_URL} from '@/constants';

// GET
export const getPopularMovies = async locale => {
        return await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${locale}&page=2`)
            .then((response) => response.data.results)
            .catch((error) => console.log(error))
};

export const getTopMovies = async (locale, page) => {
    // use fetch to GET
    const url = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=${locale}&page=${page || 1}`;
    const options = {method: 'GET', headers: {accept: 'application/json'}};

    return await fetch(url, options)
        .then((res) => {
            return res.json()
        })
        .catch(err => console.log(err))
};

export const getSearchResults = async (keyword, locale) => {
        return await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=${locale}`, {
                params: {
                    query: keyword.query
                }
        })
        .then(response => response.data.results)
        .catch((error) => console.log(error))
}