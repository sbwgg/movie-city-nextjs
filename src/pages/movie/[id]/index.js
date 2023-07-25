import React, {useEffect} from 'react';
import Default from '@/layouts/Default';
import {
    getMovieById,
    getClip,
    getMovieCast,
    getSimilar,
    getRecommendations,
    getReviews
} from '@/services/movie';
import {
    storeMovieById,
    storeClip,
    storeMovieCast,
    storeSimilar,
    storeRecommendations,
    storeReviews
} from '@/redux/slices/movieSlice';
import {useSelector} from 'react-redux';
import {dispatch} from '@/helpers';
import {useRouter} from 'next/router';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import Movie from '@/components/pages/movie';
import MovieClip from '@/components/pages/movie/movie-clip';
import SliderList from '@/components/slider-list';
import Reviews from '@/components/pages/movie/reviews';

const Index = ({locale}) => {
    const router = useRouter();
    const movieData = useSelector(state => state.movie.item);
    const movieClip = useSelector(state => state.movie.clip);
    const movieCast = useSelector(state => state.movie.cast);
    const similarMovies = useSelector(state => state.movie.similar);
    const recommended = useSelector(state => state.movie.recommendations);
    const movieReviews = useSelector(state => state.movie.reviews);
    const queryId = router.query.id;
    const currentLocale = router.locale;

    useEffect(() => {
        if (queryId) {
            getMovieById(queryId, currentLocale)
                .then(res => dispatch(storeMovieById(res)));

            getClip(queryId)
                .then(res => dispatch(storeClip(res)));

            getMovieCast(queryId, currentLocale)
                .then(res => dispatch(storeMovieCast(res)));

            getSimilar(queryId, currentLocale)
                .then(res => dispatch(storeSimilar(res)));

            getRecommendations(queryId, currentLocale)
                .then(res => dispatch(storeRecommendations(res)));

            getReviews(queryId)
                .then(res => dispatch(storeReviews(res)));

            return () => {
                dispatch(storeMovieById({}));
                dispatch(storeClip({}));
                dispatch(storeMovieCast([]));
                dispatch(storeSimilar([]));
                dispatch(storeRecommendations([]));
                dispatch(storeReviews([]));
            };
        }

    },[currentLocale, queryId]);

    return (
        <Default
            title={movieData.title}
            description={movieData.overview}
            image={movieData.backdrop_path}
            backgroundPoster={movieData.backdrop_path}
        >
            <Movie movie={movieData}/>
            <SliderList
                key="cast-members"
                title="cast.cast"
                type="cast"
                items={movieCast}
                movieId={queryId}
            />
            {movieClip && <MovieClip clipKey={movieClip.key}/>}
            <SliderList
                key="recommended"
                title="movie.recommendedMovies"
                items={recommended}
            />
            <SliderList
                key="similars"
                title="movie.similarMovies"
                items={similarMovies}
            />
            <Reviews
                movieTitle={movieData.title}
                reviews={movieReviews}
            />
        </Default>
    )
}

export default Index;

export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale))
    }
});
