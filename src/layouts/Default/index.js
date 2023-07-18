import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/header/index';
import PopularMovies from '@/components/popular-movies';
import TopMovies from '@/components/top-movies';
import styles from './index.module.scss';

const Index = props => {
    const router = useRouter();

    const {
        title,
        description,
        children,
        image
    } = props;

    return (
        <>
            <Head>
                <meta name="title" content={title}/>
                <meta name="description" content={description}/>
                <meta property="og:url" content={router.asPath}/>
                <meta property="og:title" content={title}/>
                <meta property="og:description" content={description}/>
                <meta property="og:image" content={image}/>
                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:site" content="@"/>
                <meta property="twitter:url" content={router.asPath}/>
                <meta property="twitter:title" content={title}/>
                <meta property="twitter:description" content={description}/>
                <meta property="twitter:image" content={image}/>
                <link rel="canonical" href={router.asPath}/>
                <title>{title}</title>
            </Head>
            <main>
                <Header/>
                <div className="page">
                    <PopularMovies/>
                    <div className={styles.defaultLayout}>
                        <div className={styles.defaultLeft}>
                            {children}
                        </div>
                        <div className={styles.defaultRight}>
                            <TopMovies/>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Index;
