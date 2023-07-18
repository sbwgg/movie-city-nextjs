import axios from 'axios';
import {API_KEY, BASE_URL} from '@/constants';

// GET
export const getPopularMovies = async locale => {
        return await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${locale}&page=1`)
            .then((response) => response.data.results)
            .catch((error) => console.log(error))
};

export const getTopMovies = async (locale, page) => {
        return await axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=${locale}&page=${page || 1}`)
            .then((response) => response.data)
            .catch((error) => console.error(error))
};
