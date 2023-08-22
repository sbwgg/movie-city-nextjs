import {$api} from '@/api';
import {API_KEY} from '@/constants';

const getDetails = (id, locale) => {
    return $api().get(`/person/${id}?api_key=${API_KEY}&language=${locale}`)
        .then(response => response.data)
        .catch(error => console.error(error))
}

const getSocialMedia = id => {
    return $api().get(`/person/${id}/external_ids?api_key=${API_KEY}`)
        .then(response => response.data)
        .catch(error => console.error(error))
}

export const fetchPersonData = async (id, locale) => {
    const promises = [
        getDetails(id, locale),
        getSocialMedia(id)
    ];

    try {
        const [
            details,
            socialMedia
        ] = await Promise.all(promises);

       const personInformation = {
           details,
           socialMedia
       };

        return personInformation;

    } catch (error) {
        console.error(error);
    }
}