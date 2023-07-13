import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@/components/header/index';

const Default = props => {
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
                    {children}
                </div>
            </main>
        </>
    );
}

export default Default;