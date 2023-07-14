import React, {useEffect} from 'react';
import Default from '@/layouts/Default';
import {getMovieById} from '../../../services/api';
import {getMovie} from '@/store/slices/movieSlice';
import {useSelector, useDispatch} from 'react-redux';
import {useRouter} from 'next/router';

const Id = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const movieData = useSelector(state => state.movie.movies);

    useEffect(() => {
        if (router.query.id) {
            getMovieById(router.query.id)
                .then(res => dispatch(getMovie(res)))

            return () => {
                dispatch(getMovie({}))
            }
        }

    },[router.query.id])

    return (
        <Default title={movieData.title}
                 description={movieData.overview}
                 image={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movieData.backdrop_path}`}
        >
            <div>
                <p>{movieData.title}</p>
                <p>{movieData.overview}</p>
            </div>
        </Default>
    )
}

export default Id;