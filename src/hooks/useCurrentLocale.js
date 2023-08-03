import React from 'react';
import {useRouter} from 'next/router';

const useCurrentLocale = () => {
    const router = useRouter();

    return router.locale;
};

export default useCurrentLocale;