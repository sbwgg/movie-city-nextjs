import React, {useEffect} from 'react';
import Default from '@/layouts/Default';
import { fetchMovieData } from '@/services/movie';
import { storeMovieData } from '@/redux/slices/movieSlice';
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
    const { movie } = useSelector(state => state.movie);
    const queryId = router.query.id;
    const currentLocale = router.locale;

    useEffect(() => {
        if (queryId) {
            const fetchData = async () => {
                try {
                    const data = await fetchMovieData(queryId, currentLocale);
                    data && dispatch(storeMovieData(data));
                } catch (error) {
                    console.error(error);
                }
            };

            fetchData();

            return () => {
                dispatch(
                    storeMovieData({
                        info: {},
                        clip: {},
                        cast: [],
                        similar: [],
                        recommendations: [],
                        reviews: []
                    })
                )
            };
        }

    },[currentLocale, queryId]);

    return (
        <Default
            title={movie.info.title}
            description={movie.info.overview}
            image={movie.info.backdrop_path}
            backgroundPoster={movie.info.backdrop_path}
        >
            <Movie movie={movie.info}/>
            {movie.cast &&
                <SliderList
                    key="cast-members"
                    title="cast.cast"
                    type="cast"
                    items={movie.cast}
                    movieId={queryId}
                />
            }
            {movie.clip && <MovieClip clipKey={movie.clip.key}/>}
            {movie.recommendations.length > 0 &&
                <SliderList
                    key="recommended"
                    title="movie.recommendedMovies"
                    items={movie.recommendations}
                />
            }
            {movie.similar.length > 0 &&
                <SliderList
                    key="similars"
                    title="movie.similarMovies"
                    items={movie.similar}
                />
            }
            <Reviews
                movieTitle={movie.info.title}
                reviews={movie.reviews}
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
