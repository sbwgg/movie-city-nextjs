import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {useTranslation} from 'next-i18next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import Default from '@/layouts/Default';
import {getSearchResults} from '@/services/global';
import {setSearchResults} from '@/redux/slices/globalSlice';
import {dispatch, filterFetchResults} from '@/helpers';
import MovieCard from '@/components/movie-card';
import Pagination from '@/components/pagination';

const Index = () => {
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
                    const filtered = res.results.filter((item) => filterFetchResults(item));
                    const sortedByPopularity = filtered.sort((a, b) => b.vote_average - a.vote_average)
                    dispatch(setSearchResults(sortedByPopularity))
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
            <section className={`min-h-[70vh] min-h-[70dvh] grid${!isEmpty ? ' grid-cols-2 lg:grid-cols-3' : ''}`}>
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
            {!isEmpty &&
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            }
        </Default>
    )
}

export default Index;

export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale))
    }
});
