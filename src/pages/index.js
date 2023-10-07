import React from 'react';
import dynamic from 'next/dynamic';
import {useTranslation} from 'next-i18next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import Default from '@/layouts/Default';

const TrendingTv = dynamic(() => import('@/components/pages/home/trending-tv'));
const MoviesPaginate = dynamic(() => import('@/components/pages/home/movies-paginate'));
const TrendingMovies = dynamic(() => import('@/components/pages/home/trending-movies'));

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
