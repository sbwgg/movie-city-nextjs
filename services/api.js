import {API_KEY, BASE_URL} from '@/constants';
import axios from 'axios';

// GET
export const popularMovies = async locale => {
        return await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${locale}&page=1`)
            .then((response) => response.data.results)
            .catch((error) => console.log(error))
}
