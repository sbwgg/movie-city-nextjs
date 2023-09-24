import {$api} from '@/api';
import {API_KEY} from '@/constants';
import {getMovieById} from '@/services/media/movie/index';

const getCast = (id, locale) => {
	return $api().get(`/movie/${id}/credits?api_key=${API_KEY}&language=${locale}`)
		.then((response) => response.data.cast)
		.catch((error) => console.log(error))
}

const getCrew = (id, locale) => {
	return $api().get(`/movie/${id}/credits?api_key=${API_KEY}&language=${locale}`)
		.then((response) => response.data.crew)
		.catch((error) => console.log(error))
}

export const fetchCastData = async (id, locale) => {
	const promises = [
		getMovieById(id, locale),
		getCast(id, locale),
		getCrew(id, locale),
	];

	try {
		const [movieData, cast, crew] = await Promise.all(promises);

		const crewByDepartment = crew.reduce((groupedCrew, person) => {
			const department = person.department;

			if (!groupedCrew[department]) {
				groupedCrew[department] = [];
			}
			groupedCrew[department].push(person);

			return groupedCrew;
		}, {});

		return {
			cast,
			crew: crewByDepartment,
			movieData,
		};
	} catch (error) {
		console.error(error);
	}
};
