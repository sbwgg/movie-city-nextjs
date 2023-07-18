import React, {useEffect, useState} from 'react';
import styles from './index.module.scss';
import {useRouter} from 'next/router';
import {getTopMovies} from '../../../services/api';

const TopMovies = () => {
    const [refresh, setRefresh] = useState(5);
    const router = useRouter();
    const currentLang = router.locale;

    useEffect(() => {
        // getTopMovies(currentLang, refresh)
        //     .then(res => console.log(res))
    },[currentLang, refresh])

    return(
        <section>fdfdf</section>
    )
};

export default TopMovies;