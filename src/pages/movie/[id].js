import React, {useEffect} from 'react';
import Default from '@/layouts/Default';
import {getMovieById, getMovieClip, getMovieCast, getSimilarMovies} from '../../../services/movie';
import {storeMovieById, storeMovieClip, storeMovieCast, storeSimilarMovies} from '@/store/slices/movieSlice';
import {useSelector, useDispatch} from 'react-redux';
import {useRouter} from 'next/router';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {IMAGE_PATH} from '@/constants';
import Movie from '@/components/movie';
import MovieClip from '@/components/pages/movie/movie-clip';
import Cast from '@/components/pages/movie/cast';
import SimilarMovies from '@/components/pages/movie/similar-movies';

const Id = ({locale}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const movieData = useSelector(state => state.movie.movieItem);
    const movieClip = useSelector(state => state.movie.movieClip);
    const movieCast = useSelector(state => state.movie.movieCast);
    const similarMovies = useSelector(state => state.movie.similarMovies);
    const queryId = router.query.id;
    const currentLocale = router.locale;

    useEffect(() => {
        if (queryId) {
            getMovieById(queryId, currentLocale)
                .then(res => dispatch(storeMovieById(res)));

            getMovieClip(queryId)
                .then(res => dispatch(storeMovieClip(res)))
                .then(res => console.log(res));

            getMovieCast(queryId, currentLocale)
                .then(res => dispatch(storeMovieCast(res)));

            getSimilarMovies(queryId, currentLocale)
                .then(res => dispatch(storeSimilarMovies(res)))

            return () => {
                dispatch(storeMovieById({}));
                dispatch(storeMovieClip({}));
                dispatch(storeMovieCast([]));
                dispatch(storeSimilarMovies([]));
            };
        }

    },[currentLocale, queryId]);

    return (
        <Default
            title={movieData.title}
            description={movieData.overview}
            image={IMAGE_PATH(movieData.backdrop_path)}
        >
            <Movie movie={movieData}/>
            <Cast castData={movieCast}/>
            {movieClip && <MovieClip clipKey={movieClip.key}/>}
            <SimilarMovies similarMoviesData={similarMovies}/>
        </Default>
    )
}

export default Id;

export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale))
    }
});
