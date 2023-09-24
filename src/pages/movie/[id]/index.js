import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Default from '@/layouts/Default';
import { fetchMovieData } from '@/services/movie';
import Movie from '@/components/pages/media/movie';
import MovieClip from '@/components/pages/media/media-clip';
import FullMovie from '@/components/pages/media/full-media';
import SliderList from '@/components/slider-list';
import Reviews from '@/components/pages/media/reviews';
import Loader from '@/components/loader';

const Index = ({ movie }) => {
    if (!movie.info) {
        return <Loader/>;
    }

    const movieWithDefaultClip = {
        ...movie,
        clip: movie.clip || null,
    };

    const { info, clip, cast, recommendations, similar, reviews, imdbId } = movieWithDefaultClip;

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
                emptyMessage="media.missingCast"
                mediaId={info.id}
                mediaTitle={info.title}
                items={cast}
            />
            {/*{clip ? <MovieClip clipKey={clip.key} /> : null}*/}
            <FullMovie mediaTitle={info.title} mediaId={imdbId.imdb_id}/>
            <SliderList
                listType="recommended"
                title="media.recommendedMovies"
                emptyMessage="media.missingRecommendations"
                items={recommendations}
                mediaTitle={info.title}
            />
            <SliderList
                listType="similars"
                title="media.similarMovies"
                emptyMessage="media.missingSimilars"
                items={similar}
                mediaTitle={info.title}
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
