import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';
import Seo from '@/components/UI/Seo';
import Header from '@/components/header/index';
import Footer from '@/components/footer';
import PopularMovies from '@/components/popular-movies';
import TopMovies from '@/components/top-movies';
import {BACKDROP_PATH} from '@/constants';

const Index = props => {
    const {
        title,
        description,
        children,
        image,
        backgroundPoster,
        secondary
    } = props;


    const dynamicBackground = {
        backgroundImage: `
        linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url(${BACKDROP_PATH(backgroundPoster)})`
    };

    return (
        <>
            <Seo title={title} description={description} image={image}/>
            <main>
                <Header/>
                <div className="page">
                    {!secondary && <PopularMovies/>}
                    <div className={classNames([
                        styles.defaultLayout,
                        backgroundPoster && styles.defaultLayoutPoster
                    ])}
                         style={backgroundPoster && dynamicBackground}
                    >
                        <div className={classNames([
                            styles.defaultContainer, 'page-container',
                            secondary && styles.defaultContainerFull
                        ])}>
                            {!secondary ? (
                                <>
                                    <div className={classNames([
                                        styles.defaultLeft,
                                        backgroundPoster && styles.defaultPoster
                                    ])}>
                                        {children}
                                    </div>
                                    <div className={classNames([
                                        styles.defaultRight,
                                        backgroundPoster && styles.defaultPoster
                                    ])}>
                                        <TopMovies/>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {children}
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <Footer/>
            </main>
        </>
    );
}

export default Index;
