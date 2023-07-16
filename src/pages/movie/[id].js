import React, {useEffect} from 'react';
import Default from '@/layouts/Default';
import {getMovieById, getMovieClip, getMovieCast} from '../../../services/movie';
import {storeMovieById, storeMovieClip, storeMovieCast} from '@/store/slices/movieSlice';
import {useSelector, useDispatch} from 'react-redux';
import {useRouter} from 'next/router';
import ImageComponent from '@/components/UI/ImageComponent';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {IMAGE_PATH} from '@/constants';
import MaleFallback from '@/assets/svg/male-fallback.svg';
import FemaleFallback from '@/assets/svg/female-fallback.svg';

const Id = ({locale}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const movieData = useSelector(state => state.movie.movies);
    const movieClip = useSelector(state => state.movie.movieClip);
    const movieCast = useSelector(state => state.movie.movieCast);
    const queryId = router.query.id;
    const currentLocale = router.locale;

    useEffect(() => {
        if (queryId) {
            getMovieById(queryId, currentLocale)
                .then(res => dispatch(storeMovieById(res)));

            getMovieClip(queryId)
                .then(res => dispatch(storeMovieClip(res)));

            getMovieCast(queryId, currentLocale)
                .then(res => dispatch(storeMovieCast(res)))

            return () => {
                dispatch(storeMovieById({}));
                dispatch(storeMovieClip({}));
                dispatch(storeMovieCast([]));
            };
        }

    },[currentLocale, queryId]);

    return (
        <Default title={movieData.title}
                 description={movieData.overview}
                 image={IMAGE_PATH(movieData.backdrop_path)}
        >
            <div>
                <ImageComponent
                    src={IMAGE_PATH(movieData.poster_path)}
                    alt={movieData.title}
                    width={300}
                    height={450}
                    priority
                />
                <p>{movieData.title}</p>
                <p>{movieData.overview}</p>
            </div>

            <iframe width="560" height="315"
                    src={`https://www.youtube.com/embed/${movieClip.key}`}
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
            />
            <div className="flex flex-wrap">
                {movieCast.map(item =>
                    <div key={item.id} className="h-full">
                        <ImageComponent
                            src={IMAGE_PATH(item.profile_path)}
                            fallBackSrc={item.gender === 1 ? FemaleFallback : MaleFallback}
                            width={300}
                            height={450}
                            alt={item.name}
                            className="h-full"
                        />
                        <p>{item.name}</p>
                        <p>{item.character}</p>
                    </div>
                )}
            </div>
        </Default>
    )
}

export default Id;

export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale))
    }
});
