import React, {useState, useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import Pagination from '@/components/pagination';
import MediaCard from '@/components/media-card';
import {dispatch} from '@/helpers';
import {useCurrentLocale} from '@/hooks/useLocale';
import {setPaginatedList} from '@/redux/slices/homeSlice';
import {getMoviePaginations} from '@/services/home';
import styles from './index.module.scss';

const Index = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const {paginatedList} = useSelector(state => state.home);

    const locale = useCurrentLocale();


    useEffect(() => {
        dispatch(setPaginatedList([]));

        getMoviePaginations(locale, currentPage)
            .then((response) => {
                const sortedResults = response.results.sort((a, b) => b.vote_average - a.vote_average);
                dispatch(setPaginatedList(sortedResults));
                setTotalPages(response.total_pages);
            });
    }, [locale, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const memoizedMediaCards = useMemo(
        () =>
            paginatedList.map((movie, index) => (
                <MediaCard detailed media={movie} delay={index} key={movie.id} />
            )),
        [paginatedList]
    );

    return (
        <section className={styles.moviesPaginate}>
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />

            <div className="grid my-5 grid-cols-2 md:grid-cols-3">
                {memoizedMediaCards}
            </div>

            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </section>
    )
}

export default Index;
