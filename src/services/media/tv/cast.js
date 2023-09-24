import {$api} from '@/api';
import {API_KEY} from '@/constants';
import {getTvById} from '@/services/media/tv';

const getCast = (id, locale) => {
	return $api().get(`/tv/${id}/credits?api_key=${API_KEY}&language=${locale}`)
		.then((response) => response.data.cast)
		.catch((error) => console.log(error))
}

const getCrew = (id, locale) => {
	return $api().get(`/tv/${id}/credits?api_key=${API_KEY}&language=${locale}`)
		.then((response) => response.data.crew)
		.catch((error) => console.log(error))
}

export const fetchCastData = async (id, locale) => {
	const promises = [
		getTvById(id, locale),
		getCast(id, locale),
		getCrew(id, locale),
	];

	try {
		const [tvData, cast, crew] = await Promise.all(promises);

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
			tvData,
		};
	} catch (error) {
		console.error(error);
	}
};
