import React, {useEffect} from 'react';
import Default from '@/layouts/Default';
import {getMovieById, getMovieClip, getMovieCast} from '../../../services/movie';
import {storeMovieById, storeMovieClip, storeMovieCast} from '@/store/slices/movieSlice';
import {useSelector, useDispatch} from 'react-redux';
import {useRouter} from 'next/router';
import ImageComponent from '@/components/UI/ImageComponent';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {IMAGE_PATH} from '@/constants';
import {Swiper, SwiperSlide} from 'swiper/react';
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

    const swiperOptions = {
        slidesPerView: 2.5,

        breakpoints: {
            1024:{
                slidesPerView: 6.5
            }
        }
    }

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
            <Swiper {...swiperOptions}>
                {movieCast.map(item =>
                    <SwiperSlide key={item.id}>
                        <figure>
                            <ImageComponent
                                src={IMAGE_PATH(item.profile_path)}
                                fallBackSrc={item.gender === 1 ? FemaleFallback : MaleFallback}
                                width={300}
                                height={450}
                                alt={item.name}
                                className="h-full"
                            />
                            <figcaption>
                                <p>{item.name}</p>
                                <p>{item.character}</p>
                            </figcaption>
                        </figure>
                    </SwiperSlide>
                )}
            </Swiper>
        </Default>
    )
}

export default Id;

export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale))
    }
});
