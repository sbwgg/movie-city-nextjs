import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {useTranslation} from 'next-i18next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import Default from '@/layouts/Default';
import {getSearchResults} from '@/services/global';
import {setSearchResults} from '@/redux/slices/globalSlice';
import {dispatch} from '@/helpers';
import MovieCard from '@/components/movie-card';
import Pagination from '@/components/pagination';

const Query = () => {
    const router = useRouter();
    const [isEmpty, setEmpty] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const {searchResults} = useSelector(state => state.global);
    const keyword = router.query;
    const locale = router.locale;

    const {t} = useTranslation();

    useEffect(() => {
        if (keyword) {
            getSearchResults(keyword, locale, currentPage)
                .then(res => {
                    dispatch(setSearchResults(res.results))
                    setEmpty(res.results.length === 0)
                    setTotalPages(res.total_pages)
                })

            return () => {
                dispatch(setSearchResults([]));
            }
        }
    },[keyword, locale, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <Default title={t('searchResults')}>
            {searchResults.length > 0 &&
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            }
            <section className={`grid${!isEmpty ? ' grid-cols-2 lg:grid-cols-3' : ''}`}>
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
                {isEmpty &&
                    <h1 className="text-center text-secondary-blue font-bold mt-4">
                        {t('noResults')}
                    </h1>
                }
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
