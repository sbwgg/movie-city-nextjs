import {$api} from '@/api';
import {API_KEY} from '@/constants';

const getDetails = (id, locale) => {
    return $api().get(`/person/${id}?api_key=${API_KEY}&language=${locale}`)
        .then(response => response.data)
        .catch(error => console.error(error))
};

const getSocialMedia = id => {
    return $api().get(`/person/${id}/external_ids?api_key=${API_KEY}`)
        .then(response => response.data)
        .catch(error => console.error(error))
};

const getTopPopularMovies = (id, locale) => {
    return $api().get(`/person/${id}/movie_credits?api_key=${API_KEY}&language=${locale}`)
        .then(response => {
            const cast = response.data.cast;
            cast.sort((a, b) => b.popularity - a.popularity);
            const top8PopularMovies = cast.slice(0, 8);

            return top8PopularMovies;
        })
        .catch(error => console.error(error))
};

const getCareerList = (id, locale) => {
    return $api().get(`/person/${id}/movie_credits?api_key=${API_KEY}&language=${locale}`)
        .then(response => {
            const movieList = response.data.cast
                .filter(movie => movie.release_date && movie.poster_path)
                .sort((a, b) => {
                    const dateA = new Date(a.release_date);
                    const dateB = new Date(b.release_date);

                    return dateB - dateA;
                });

            return movieList;
        })
        .catch(error => console.error(error));
};

export const fetchPersonData = async (id, locale) => {
    const promises = [
        getDetails(id, locale),
        getSocialMedia(id),
        getTopPopularMovies(id, locale),
        getCareerList(id, locale)
    ];

    try {
        const [
            details,
            socialMedia,
            topPopularMovies,
            career
        ] = await Promise.all(promises);

       const personInformation = {
           details,
           socialMedia,
           topPopularMovies,
           career
       };

        return personInformation;

    } catch (error) {
        console.error(error);
    }
}
