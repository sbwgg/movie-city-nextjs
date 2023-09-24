import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import Default from '@/layouts/Default';
import TrendingTv from '@/components/pages/home/trending-tv';
import MoviesPaginate from '@/components/pages/home/movies-paginate';
import TrendingMovies from '@/components/pages/home/trending-movies';

const Home = () => {

    return (
        <Default title="Movie City">
            <TrendingTv/>
            <MoviesPaginate/>
            <TrendingMovies />
        </Default>
    )
}

export default Home;

export const getServerSideProps = async ({ locale }) => {

    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'homePage'])),
        },
    };
};
