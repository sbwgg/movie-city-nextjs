import React from 'react';
import {useTranslation} from 'next-i18next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import Default from '@/layouts/Default';
import TrendingTv from '@/components/pages/home/trending-tv';
import MoviesPaginate from '@/components/pages/home/movies-paginate';
import TrendingMovies from '@/components/pages/home/trending-movies';
import {getTrendingMovie, getTrendingTv} from '@/services/home';

const supportedLocales = ['en', 'ru'];

const getTrendingData = async (locale, time) => {
    try {
        const trendingMovies = await getTrendingMovie(locale, time);
        const trendingTv = await getTrendingTv(locale, time);
        return { trendingMovies, trendingTv };
    } catch (error) {
        console.error(error);
        return { trendingMovies: [], trendingTv: [] };
    }
};

const Home = ({trendingMoviesToday, trendingMoviesWeek, trendingTvToday, trendingTvWeek,}) => {
    const {t} = useTranslation();

    return (
        <Default
            title="Movie City"
            description={t('pageMetas.homeDescription')}
            staticImage="/movie-city.svg"
        >
            <TrendingTv byDay={trendingTvToday} byWeek={trendingTvWeek}/>
            <MoviesPaginate/>
            <TrendingMovies byDay={trendingMoviesToday} byWeek={trendingMoviesWeek}/>
        </Default>
    )
}

export default Home;

export const getStaticProps = async ({ locale }) => {
    const trendingMoviesToday = await Promise.all(
        supportedLocales.map(async (locale) => await getTrendingData(locale, 'day'))
    );

    const trendingMoviesWeek = await Promise.all(
        supportedLocales.map(async (locale) => await getTrendingData(locale, 'week'))
    );

    const trendingTvToday = await Promise.all(
        supportedLocales.map(async (locale) => await getTrendingData(locale, 'day'))
    );

    const trendingTvWeek = await Promise.all(
        supportedLocales.map(async (locale) => await getTrendingData(locale, 'week'))
    );

    const translations = await serverSideTranslations(locale, ['common', 'homePage']);

    return {
        props: {
            trendingMoviesToday,
            trendingMoviesWeek,
            trendingTvToday,
            trendingTvWeek,
            ...translations
        },
    };
};
