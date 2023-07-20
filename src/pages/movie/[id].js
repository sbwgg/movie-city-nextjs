import React, {useEffect} from 'react';
import Default from '@/layouts/Default';
import {getMovieById, getClip, getCast, getSimilar, getRecommendations} from '../../../services/movie';
import {storeMovieById, storeClip, storeCast, storeSimilar, storeRecommendations} from '@/redux/slices/movieSlice';
import {useSelector} from 'react-redux';
import {dispatch} from '@/helpers';
import {useRouter} from 'next/router';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import Movie from '@/components/movie';
import MovieClip from '@/components/pages/movie/movie-clip';
import Cast from '@/components/pages/movie/cast';
import MovieList from '@/components/movie-list';

const Id = ({locale}) => {
    const router = useRouter();
    const movieData = useSelector(state => state.movie.movieItem);
    const movieClip = useSelector(state => state.movie.movieClip);
    const movieCast = useSelector(state => state.movie.movieCast);
    const similarMovies = useSelector(state => state.movie.similarMovies);
    const recommended = useSelector(state => state.movie.recommendations);
    const queryId = router.query.id;
    const currentLocale = router.locale;

    useEffect(() => {
        if (queryId) {
            getMovieById(queryId, currentLocale)
                .then(res => dispatch(storeMovieById(res)));

            getClip(queryId)
                .then(res => dispatch(storeClip(res)));

            getCast(queryId, currentLocale)
                .then(res => dispatch(storeCast(res)));

            getSimilar(queryId, currentLocale)
                .then(res => dispatch(storeSimilar(res)));

            getRecommendations(queryId, currentLocale)
                .then(res => dispatch(storeRecommendations(res)));

            return () => {
                dispatch(storeMovieById({}));
                dispatch(storeClip({}));
                dispatch(storeCast([]));
                dispatch(storeSimilar([]));
                dispatch(storeRecommendations([]));
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
            <Cast castData={movieCast}/>
            {movieClip && <MovieClip clipKey={movieClip.key}/>}
            <MovieList
                key="recommended"
                title="movie.recommendedMovies"
                moviesData={recommended}
            />
            <MovieList
                key="similars"
                title="movie.similarMovies"
                moviesData={similarMovies}
            />
        </Default>
    )
}

export default Id;

export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale))
    }
});
