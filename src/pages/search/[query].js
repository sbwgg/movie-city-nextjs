import React, {useEffect} from 'react';
import {getSearchResults} from '../../../services/api';
import {setSearchResults} from '@/store/slices/globalSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

const Query = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const searchResults = useSelector(state => state.global.searchResults);
    const keyword = router.query;
    const locale = router.locale;

    useEffect(() => {
        if (keyword) {
            getSearchResults(keyword, locale)
                .then(res => dispatch(setSearchResults(res)))
                .then(res => console.log(res))

            return () => {
                dispatch(setSearchResults({}));
            }
        }
    },[keyword, locale])
    return (
        <section>
          check for
        </section>
    )
}

export default Query;

export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale))
    }
});
