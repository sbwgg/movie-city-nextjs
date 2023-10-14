import React, {useEffect, useRef} from 'react';
import {useRouter} from 'next/router';

const useCurrentLocale = () => {
    const router = useRouter();

    return router.locale;
};

const usePreviousLocale = value => {
    const ref = useRef(value);

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

export {useCurrentLocale, usePreviousLocale};
