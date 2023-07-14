import React, {useEffect} from 'react';
import Default from '@/layouts/Default';
import {getMovieById} from '../../../services/api';
import {getMovie} from '@/store/slices/movieSlice';
import {useSelector, useDispatch} from 'react-redux';
import {useRouter} from 'next/router';
import ImageComponent from '@/components/UI/ImageComponent';

const Id = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const movieData = useSelector(state => state.movie.movies);
    const queryId = router.query.id;
    const locale = router.locale;

    useEffect(() => {
        if (queryId) {
            getMovieById(queryId, locale)
                .then(res => dispatch(getMovie(res)));

            return () => {
                dispatch(getMovie({}));
            };
        }

    },[queryId]);

    return (
        <Default title={movieData.title}
                 description={movieData.overview}
                 image={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movieData.backdrop_path}`}
        >
            <div>
                <ImageComponent
                    src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movieData.poster_path}`}
                    alt={movieData.title}
                    width={300}
                    height={450}
                />
                <p>{movieData.title}</p>
                <p>{movieData.overview}</p>
            </div>
        </Default>
    )
}

export default Id;
