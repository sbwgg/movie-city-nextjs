import Default from '@/layouts/Default';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import {getCinema} from '@/services/home';
import ToCinema from '@/components/pages/home/to-cinema';
import Trending from '@/components/pages/home/trending';

const Home = ({ locale, cinemaMovieData }) => {
    return (
        <Default title="Movie City">
            <ToCinema moviesListData={cinemaMovieData}/>
            <Trending />
        </Default>
    )
}

export default Home;

export const getServerSideProps = async ({ locale }) => {
    const cinemaMovieData = await getCinema(locale);

    return {
        props: {
            locale,
            cinemaMovieData,
            ...(await serverSideTranslations(locale, ['common', 'homePage'])),
        },
    };
};
