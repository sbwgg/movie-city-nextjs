import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Default from '@/layouts/Default';
import {fetchTvData} from '@/services/media/tv';
import Tv from '@/components/pages/media/tv';
import FullMedia from '@/components/pages/media/full-media';
import SliderList from '@/components/slider-list';
import Reviews from '@/components/pages/media/reviews';
import Loader from '@/components/loader';

const Index = ({ tv }) => {
    if (!tv.info) {
        return <Loader/>;
    }

    const { info, cast, recommendations, reviews, imdbId } = tv;

    return (
        <Default
            title={info.title}
            description={info.overview}
            image={info.backdrop_path}
            backgroundPoster={info.backdrop_path}
        >
            <Tv tv={info} />
            <FullMedia mediaTitle={info.name} mediaId={imdbId.imdb_id}/>
            <SliderList
                listType="cast-members"
                sliderType="cast"
                title="cast.cast"
                emptyMessage="media.missingCast"
                mediaId={info.id}
                mediaTitle={info.name}
                mediaType="tv"
                items={cast}
            />
            <SliderList
                listType="recommended"
                title="media.recommendedMovies"
                emptyMessage="media.missingRecommendations"
                items={recommendations}
                mediaTitle={info.name}
                mediaType="tv"
            />
            <Reviews movieTitle={info.name} reviews={reviews} />
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

    const tv = await fetchTvData(queryId, locale);

    return {
        props: {
            tv,
            ...(await serverSideTranslations(locale)),
        },
    };
};