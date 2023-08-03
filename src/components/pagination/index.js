import React, {useEffect} from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';
import useDebounce from '@/hooks/useDebounce';

const Pagination = ({totalPages, currentPage, onPageChange}) => {
    useEffect(() => {
        if (currentPage > totalPages) { // Ensure the currentPage doesn't exceed totalPages
            onPageChange(1);
        }
    }, [currentPage, totalPages, onPageChange]);

    const handlePrevPage = useDebounce(() => {
        currentPage > 1 && onPageChange(currentPage - 1);
    },100);

    const handleNextPage = useDebounce(() => {
        currentPage < totalPages && onPageChange(currentPage + 1);
    }, 100);

    const getPageNumbersToShow = () => {
        const pageNumbersToShow = [];

        if (totalPages <= 3) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbersToShow.push(i);
            }
        } else {
            if (currentPage <= 2) {
                pageNumbersToShow.push(1, 2, 3);
            } else if (currentPage >= totalPages - 2) {
                pageNumbersToShow.push(totalPages - 2, totalPages - 1, totalPages);
            } else {
                pageNumbersToShow.push(currentPage - 1, currentPage, currentPage + 1);
            }
        }

        return pageNumbersToShow;
    };

    return (
        <div className={styles.paginationWrapper}>
            <div className={styles.paginationContainer}>
                {currentPage >= 5 && (
                    <button className={classNames([styles.paginationItem, styles.paginationItemRewind])} onClick={() => onPageChange(1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 512 512">
                            <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" />
                        </svg>
                    </button>
                )}
                <button className={styles.paginationItem} onClick={handlePrevPage}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
                        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>
                    </svg>
                </button>
                {getPageNumbersToShow().map((pageNumber) => (
                    <button
                        key={pageNumber}
                        className={classNames([
                            styles.paginationItem,
                            pageNumber === currentPage && styles.paginationItemActive
                        ])}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}
                <button className={styles.paginationItem} onClick={handleNextPage}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512" fill="rgb(var(--color-primary-blue))">
                        <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Pagination;