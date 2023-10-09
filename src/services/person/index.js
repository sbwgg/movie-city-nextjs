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
            cast.sort((a, b) => b.vote_count - a.vote_count);
            const top8PopularMovies = cast.slice(0, 8);

            return top8PopularMovies;
        })
        .catch(error => console.error(error))
};

const getMovieAndTVList = (id, locale) => {
    const moviePromise = $api().get(`/person/${id}/movie_credits?api_key=${API_KEY}&language=${locale}`);
    const tvPromise = $api().get(`/person/${id}/tv_credits?api_key=${API_KEY}&language=${locale}`);

    return Promise.all([moviePromise, tvPromise])
        .then(responses => {
            const combinedList = [];

            responses.forEach((response, index) => {
                const creditsList = response.data.cast
                    .filter(credit => (credit.release_date || credit.first_air_date) && (credit.poster_path && credit.character))
                    .map(credit => ({
                        ...credit,
                        type: index === 0 ? 'movie' : 'tv'
                    }));

                combinedList.push(...creditsList);
            });

            combinedList.sort((a, b) => {
                const dateA = new Date(a.release_date || a.first_air_date);
                const dateB = new Date(b.release_date || b.first_air_date);
                return dateB - dateA;
            });

            return combinedList;
        })
        .catch(error => console.error(error));
};

export const fetchPersonData = async (id, locale) => {
    const promises = [
        getDetails(id, locale),
        getSocialMedia(id),
        getTopPopularMovies(id, locale),
        getMovieAndTVList(id, locale)
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
