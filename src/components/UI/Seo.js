import React from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {IMAGE_PATH} from '@/constants';

const Seo = props => {
	const {
		title,
		description,
		staticImage,
		image
	} = props;

	const router = useRouter();

	return (
		<Head>
			<meta name="title" content={title}/>
			{description && <meta name="description" content={description}/>}
			<meta property="og:url" content={router.asPath}/>
			<meta property="og:title" content={title}/>
			{description && <meta property="og:description" content={description}/>}
			{(image || staticImage) && <meta property="og:image" content={staticImage || IMAGE_PATH(image)}/>}
			<meta property="twitter:card" content="summary_large_image"/>
			<meta property="twitter:site" content="@"/>
			<meta property="twitter:url" content={router.asPath}/>
			<meta property="twitter:title" content={title}/>
			{description && <meta property="twitter:description" content={description}/>}
			{(image || staticImage)  && <meta property="twitter:image" content={staticImage || IMAGE_PATH(image)}/>}
			<link rel="canonical" href={router.asPath}/>
			<title>{title || 'Movie City'}</title>
		</Head>
	)
};

export default Seo;
