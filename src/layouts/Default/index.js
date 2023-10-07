import React from 'react';
import classNames from 'classnames';
import {useSelector} from 'react-redux';
import dynamic from 'next/dynamic';
import Seo from '@/components/UI/Seo';
import NextLink from '@/components/UI/NextLink';
import {lowercaseString, dynamicBackground, truncateText} from '@/helpers';

const Header = dynamic(() => import('@/components/header'));
const Footer = dynamic(() => import('@/components/footer'));
const PopularMovies = dynamic(() => import('@/components/popular-movies'));
const TopMovies = dynamic(() => import('@/components/top-movies'));
const MediaClip = dynamic(() => import('@/components/pages/media/media-clip'));
import styles from './index.module.scss';

const Index = props => {
    const {
        title,
        description,
        children,
        staticImage,
        image,
        backgroundPoster
    } = props;

    const {popularMovie} = useSelector(state => state.global);

    const layoutBackground = backgroundPoster || popularMovie?.backdrop_path;

    return (
        <>
            <Seo title={title} description={truncateText(description, 120)} image={image} staticImage={staticImage}/>
            <main>
                <Header/>
                <div className="page fixed-background"
                     style={layoutBackground && dynamicBackground(layoutBackground)}
                >
                    <div className={ styles.defaultLayout}>
                        {(popularMovie.backdrop_path && !backgroundPoster) &&
                            <NextLink
                                href={`/media/movie/${popularMovie.id}-${lowercaseString(popularMovie.original_title)}`}
                                className={styles.defaultUrl}
                            />
                        }
                        <PopularMovies/>
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
            <MediaClip/>
        </>
    );
}

export default Index;
