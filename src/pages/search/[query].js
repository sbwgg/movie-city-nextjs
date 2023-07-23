import React, {useEffect} from 'react';
import Default from '@/layouts/Default';
import {getSearchResults} from '@/services/global';
import {setSearchResults} from '@/redux/slices/globalSlice';
import {useSelector} from 'react-redux';
import {dispatch} from '@/helpers';
import {useRouter} from 'next/router';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import MovieCard from '@/components/movie-card';
import {useTranslation} from 'next-i18next';

const Query = () => {
    const router = useRouter();
    const searchResults = useSelector(state => state.global.searchResults);
    const keyword = router.query;
    const locale = router.locale;

    const {t} = useTranslation();

    useEffect(() => {
        if (keyword) {
            getSearchResults(keyword, locale)
                .then(res => dispatch(setSearchResults(res)));

            return () => {
                dispatch(setSearchResults([]));
            }
        }
    },[keyword, locale]);

    return (
        <Default title={t('searchResults')}>
            <section className="grid grid-cols-2 lg:grid-cols-3">
                {searchResults.map(((movie, key) => {
                    return (
                        <MovieCard
                            detailed
                            movie={movie}
                            delay={key}
                            key={movie.id}
                        />
                    )
                }))}
            </section>
        </Default>
    )
}

export default Query;

export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale))
    }
});
