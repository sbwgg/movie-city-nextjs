import React, {useState, useEffect, useMemo} from 'react';
import {useSelector} from 'react-redux';
import styles from './index.module.scss';
import useCurrentLocale from '@/hooks/useCurrentLocale';
import {setPaginatedList} from '@/redux/slices/homeSlice';
import {getMoviePaginations} from '@/services/home';
import Pagination from '@/components/pagination';
import MovieCard from '@/components/movie-card';
import {dispatch} from '@/helpers';

const MoviesPaginate = () => {
    const locale = useCurrentLocale();
    const {paginatedList} = useSelector(state => state.home);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        getMoviePaginations(locale, currentPage)
            .then(res => {
                dispatch(setPaginatedList(res.results));
                setTotalPages(res.total_pages);
            });

    },[locale, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const memoizedMovieCards = useMemo(
        () =>
            paginatedList.map((movie, index) => (
                <MovieCard detailed movie={movie} delay={index} key={movie.id} />
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
                {memoizedMovieCards}
            </div>

            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </section>
    )
}

export default MoviesPaginate;