import React from 'react';
import {useTranslation} from 'next-i18next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import Default from '@/layouts/Default';
import TrendingTv from '@/components/pages/home/trending-tv';
import MoviesPaginate from '@/components/pages/home/movies-paginate';
import TrendingMovies from '@/components/pages/home/trending-movies';

const Home = () => {

    const {t} = useTranslation();

    return (
        <Default
            title="Movie City"
            description={t('pageMetas.homeDescription')}
            staticImage="/movie-city.svg"
        >
            <TrendingTv/>
            <MoviesPaginate/>
            <TrendingMovies />
        </Default>
    )
}

export default Home;

export const getStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'homePage'])),
        },
    };
};
