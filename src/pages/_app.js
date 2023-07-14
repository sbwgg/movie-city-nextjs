import React from 'react';
import Head from 'next/head';
import {Provider} from 'react-redux';
import { appWithTranslation } from 'next-i18next'
import store from '../store';
import '../styles/index.scss';

const MyApp = ({Component, pageProps}) => {
    return (
        <Provider store={store}>
            <Head>
                <meta charSet="UTF-8"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=0,shrink-to-fit=no"/>
                <link rel="apple-touch-icon" sizes="57x57 60x60 72x72 76x76 114x114 120x120 144x144 152x152" href="/favicon.ico" />
                <link rel="icon" type="image/png" href="/favicon.ico" sizes="16x16 32x32 64x64 128x128" />
            </Head>
            <Component {...pageProps}/>
        </Provider>
    )
}

export default appWithTranslation(MyApp);
