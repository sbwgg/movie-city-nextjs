import {BASE_URL, API_KEY} from '@/constants';
import axios from 'axios';

// GET
export const popularMovies = async locale => {
        return await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${locale}&page=1`)
            .then((response) => response.data.results)
            .catch((error) => console.log(error))
}

export const getMovieById = async (id, locale) => {
        return await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=${locale}`)
            .then((response) => response.data)
            .catch((error) => console.log(error))
}
