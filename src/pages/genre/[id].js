import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {useSelector} from 'react-redux';
import {useTranslation} from 'next-i18next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import Default from '@/layouts/Default';
import MovieList from '@/components/pages/genre/movie-list';
import Pagination from '@/components/pagination';
import {setGenreResults} from '@/redux/slices/genreSlice';
import {getGenreResults} from '@/services/genre';
import {dispatch, capitalizeFirstLetter} from '@/helpers';

const Index = () => {
    const router = useRouter();
    const id = router.query.id;
    const locale = router.locale;
    const {genreResults, genreList} = useSelector(state => state.genre);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [genreItem, setGenreItem] = useState({});

    const {t} = useTranslation();

    useEffect(() => {
        if (id) {
            getGenreResults(locale, id, currentPage)
                .then(res => {
                    dispatch(setGenreResults(res.results))
                    setTotalPages(res.total_pages)
                });

            return () => {
                dispatch(setGenreResults([]))
            }
        }
    }, [id, locale, currentPage]);

    useEffect(() => {
        setTotalPages(1);
    }, [id])

    useEffect(() => {
        const updatedGenreItem = genreList.find(item => item.id === Number(id));
        setGenreItem(updatedGenreItem);
    }, [genreList, id, locale]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <Default
            secondary
            title={`Movie City - ${t('genre')} - ${genreItem && capitalizeFirstLetter(genreItem.name)}`}
            description={`Movie City - ${t('genre')} - ${router.query.name}`}
        >
            <div className="pt-10 genre-results">
                <h1 className="text-right p-3">
                    {t('genre')}:&nbsp;
                    <span className="gradient-text">
                        {genreItem && capitalizeFirstLetter(genreItem.name)}
                    </span>
                </h1>
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
                <MovieList results={genreResults}/>
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </Default>
    )
}

export default Index;

export const getServerSideProps = async ({locale}) => {
    return {
        props: {
            ...(await serverSideTranslations(locale)),
        },
    };
};
