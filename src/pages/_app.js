import React from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import { Provider } from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import store from '../redux/store';
import '../styles/index.scss';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from 'next-themes';
import NProgress from 'nprogress';

NProgress.configure({easing: 'linear', speed: 700, showSpinner: false});

let persist = persistStore(store)

const MyApp = ({Component, pageProps}) => {
	const router = useRouter();

	return (
		<Provider store={store}>
			<PersistGate persistor={persist}>
				<ThemeProvider attribute="class">
					<Head>
						<meta charSet="UTF-8"/>
						<meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
						<meta name="viewport"
							  content="width=device-width, initial-scale=1,user-scalable=0,shrink-to-fit=no"/>
						<link rel="apple-touch-icon" sizes="57x57 60x60 72x72 76x76 114x114 120x120 144x144 152x152"
							  href="/favicon.png"/>
						<link rel="icon" type="image/png" href="/favicon.png" sizes="16x16 32x32 64x64 128x128"/>
						<link rel="canonical" href={router.asPath}/>
					</Head>
					<Component {...pageProps}/>
				</ThemeProvider>
			</PersistGate>
		</Provider>
	)
}

export default appWithTranslation(MyApp);
