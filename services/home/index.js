import axios from 'axios';
import {API_KEY, BASE_URL} from '@/constants';

export const getCinema = async locale => {
    return await axios.get(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=${locale}&page=1`)
        .then((response) => response.data.results)
        .catch((error) => console.log(error))
}