import Default from '@/layouts/Default';
import TopPopularMovies from '@/components/popular-movies';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

const Home = ({locale}) => {
    return (
        <Default title="Create Next App">
            {/*<TopPopularMovies/>*/}
        </Default>
    )
}

export default Home;

export const getServerSideProps = async ({ locale }) => ({
    props: {
        locale,
        ...(await serverSideTranslations(locale, ['common', 'homePage'])),
    }
});
