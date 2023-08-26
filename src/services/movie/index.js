import {$api} from '@/api';
import {API_KEY} from '@/constants';

export const getMovieById = (id, locale) => {
	return $api().get(`/movie/${id}?api_key=${API_KEY}&language=${locale}`)
		.then((response) => response.data)
		.catch((error) => console.error(error))
};

const getClip = (id, locale) => {
	const responsePromise = $api().get(`/movie/${id}/videos?api_key=${API_KEY}&language=${locale}`);

	return responsePromise
		.then(response => {
			const videos = response.data.results;
			const firstTrailer = videos.find(video => video.type === 'Trailer');

			if (!firstTrailer && locale === 'ru') {
				const responseEnPromise = $api().get(`/movie/${id}/videos?api_key=${API_KEY}&language=en`);
				return responseEnPromise
					.then(responseEn => {
						const videosEn = responseEn.data.results;
						return videosEn.find(video => video.type === 'Trailer');
					})
					.catch(error => {
						console.error(error);
					});
			} else {
				return firstTrailer;
			}
		})
		.catch(error => {
			console.error(error);
		});
};

const getMovieCast = (id, locale) => {
	return $api().get(`/movie/${id}/credits?api_key=${API_KEY}&language=${locale}`)
		.then((response) => response.data.cast.slice(0, 9))
		.catch((error) => console.error(error))
};

const getSimilar = (id, locale) => {
	return $api().get(`/movie/${id}/similar?api_key=${API_KEY}&language=${locale}`)
		.then((response) => response.data.results.filter(item => item.poster_path !== null))
		.catch((error) => console.error(error))
};

const getRecommendations = (id, locale) => {
	return $api().get(`/movie/${id}/recommendations?api_key=${API_KEY}&language=${locale}`)
		.then((response) => response.data.results.filter(item => item.poster_path !== null))
		.catch((error) => console.error(error))
};

const getReviews = id => {
	return $api().get(`/movie/${id}/reviews?api_key=${API_KEY}`)
		.then((response) => response.data.results.slice(0, 10))
		.catch((error) => console.error(error))
}

export const fetchMovieData = async (id, locale) => {
	const promises = [
		getMovieById(id, locale),
		getClip(id, locale),
		getMovieCast(id, locale),
		getSimilar(id, locale),
		getRecommendations(id, locale),
		getReviews(id)
	];

	try {
		const [
			info,
			clip,
			cast,
			similar,
			recommendations,
			reviews
		] = await Promise.all(promises);

		// Set clip to null if not available
		const movieWithDefaultClip = {
			info,
			clip: clip || null,
			cast,
			similar,
			recommendations,
			reviews
		};

		return movieWithDefaultClip;

	} catch (error) {
		console.error(error);
	}
};
