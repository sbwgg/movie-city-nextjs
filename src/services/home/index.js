import {$api} from '@/api';
import {API_KEY} from '@/constants';

export const getCinema = async locale => {
    return await $api().get(`/movie/now_playing?api_key=${API_KEY}&language=${locale}&page=1`)
        .then((response) => response.data.results)
        .catch((error) => console.log(error))
}

export const getTrending = async (locale, time) => {
    return await $api().get(`/trending/movie/${time}?api_key=${API_KEY}&language=${locale}`)
        .then((response) => response.data.results)
        .catch((error) => console.log(error))
}
