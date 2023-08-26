import React, {useEffect} from 'react';
import classNames from 'classnames';
import {useSelector} from 'react-redux';
import Seo from '@/components/UI/Seo';
import Header from '@/components/header/index';
import Footer from '@/components/footer';
import NextLink from '@/components/UI/NextLink';
import PopularMovies from '@/components/popular-movies';
import TopMovies from '@/components/top-movies';
import {BACKDROP_PATH} from '@/constants';
import {dispatch, lowercaseString} from '@/helpers';
import {getPopularMovieOfDay} from '@/services/global';
import {setPopularMovieOfDay} from '@/redux/slices/globalSlice';
import styles from './index.module.scss';

const Index = props => {
    const {
        title,
        description,
        children,
        image,
        backgroundPoster,
        secondary
    } = props;

    const {popularMovie} = useSelector(state => state.global);

    useEffect(() => {
        getPopularMovieOfDay()
            .then(response => {
                dispatch(setPopularMovieOfDay(response))
            })

    },[]);

    const layoutBackground = backgroundPoster || popularMovie?.backdrop_path;

    const dynamicBackground = {
        backgroundImage: `
        linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url(${BACKDROP_PATH(layoutBackground)})`
    };

    return (
        <>
            <Seo title={title} description={description} image={image}/>
            <main>
                <Header/>
                <div className="page">
                    <PopularMovies/>
                    <div className={classNames([
                        styles.defaultLayout, 'fixed-background',
                        layoutBackground && styles.defaultLayoutPoster
                    ])}
                         style={layoutBackground && dynamicBackground}
                    >
                        {(popularMovie.backdrop_path && !backgroundPoster) &&
                            <NextLink
                                href={`/movie/${popularMovie.id}-${lowercaseString(popularMovie.original_title)}`}
                                className={styles.defaultUrl}
                            />
                        }
                        <div className={classNames([styles.defaultContainer, 'page-container'])}>
                            <div className={classNames([
                                styles.defaultLeft,
                                layoutBackground && [styles.defaultPoster, 'darken-background']
                            ])}>
                                {children}
                            </div>
                            <div className={classNames([
                                styles.defaultRight,
                                layoutBackground && [styles.defaultPoster, 'darken-background']
                            ])}>
                                <TopMovies/>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </main>
        </>
    );
}

export default Index;
