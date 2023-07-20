import Default from '@/layouts/Default';
import ToCinema from '@/components/pages/home/to-cinema';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

const Home = ({locale}) => {
    return (
        <Default title="Create Next App">
            <ToCinema/>
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
