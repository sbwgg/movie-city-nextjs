import React from 'react';
import Script from 'next/script';
import classNames from 'classnames';
import useCurrentLocale from '@/hooks/useCurrentLocale';
import styles from './index.module.scss';

const Index = props => {
	const {movieId, movieTitle} = props;
	const locale = useCurrentLocale();

	return (
		<>
			<section className={classNames([styles.clipContainer, 'movie-info-wrapper'])}>
				<div id="yohoho" data-videospider_tv="0"
					 data-player="iframe"
					 data-tmdb={movieId}
					 data-title={movieTitle}
					 data-language={locale}
				/>
				<Script src="//yohoho.cc/yo.js"/>
			</section>
		</>
	)
}

export default Index;
