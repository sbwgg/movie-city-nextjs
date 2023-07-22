import Default from '@/layouts/Default';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import ToCinema from '@/components/pages/home/to-cinema';
import Trending from '@/components/pages/home/trending';

const Home = ({locale}) => {
    return (
        <Default title="Movie City">
            <ToCinema/>
            <Trending/>
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
