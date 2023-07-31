import React from 'react';
import Default from '@/layouts/Default';
import { fetchMovieData } from '@/services/movie';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Movie from '@/components/pages/movie';
import MovieClip from '@/components/pages/movie/movie-clip';
import SliderList from '@/components/slider-list';
import Reviews from '@/components/pages/movie/reviews';

const Index = ({ movie }) => {
    if (!movie.info) {
        return <div>Loading...</div>;
    }

    const movieWithDefaultClip = {
        ...movie,
        clip: movie.clip || null,
    };

    const { info, clip, cast, recommendations, similar, reviews } = movieWithDefaultClip;

    return (
        <Default
            title={info.title}
            description={info.overview}
            image={info.backdrop_path}
            backgroundPoster={info.backdrop_path}
        >
            <Movie movie={info} />
            <SliderList
                listType="cast-members"
                type="cast"
                title="cast.cast"
                emptyMessage="movie.missingCast"
                movieId={info.id}
                movieTitle={info.title}
                items={cast}
            />
            {clip ? <MovieClip clipKey={clip.key} /> : null}
            <SliderList
                listType="recommended"
                title="movie.recommendedMovies"
                emptyMessage="movie.missingRecommendations"
                items={recommendations}
                movieTitle={info.title}
            />
            <SliderList
                listType="similars"
                title="movie.similarMovies"
                emptyMessage="movie.missingSimilars"
                items={similar}
                movieTitle={info.title}
            />
            <Reviews movieTitle={info.title} reviews={reviews} />
        </Default>
    );
};

export default Index;

export const getServerSideProps = async ({ locale, query }) => {
    const { id: queryId } = query;
    if (!queryId) {
        return {
            notFound: true,
        };
    }

    const movie = await fetchMovieData(queryId, locale);

    return {
        props: {
            movie,
            ...(await serverSideTranslations(locale)),
        },
    };
};
