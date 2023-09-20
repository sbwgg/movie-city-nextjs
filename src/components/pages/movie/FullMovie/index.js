import React, {useEffect} from 'react';
import Script from 'next/script';
import classNames from 'classnames';
import styles from './index.module.scss';

const Index = props => {
	const {movieId} = props;

	const kinoBoxOptions = {
		search: {
			imdb: movieId,
		},
		players: {
			alloha: {
				enable: true,
				position: 1,
				token: '{token}'
			},
			videocdn: {
				enable: true,
				position: 2,
				token: '{token}'
			}
		},
	}

	useEffect(() => {
		const initializeKinobox = () => {
			new Kinobox('.kinobox_player', kinoBoxOptions).init();
		};

		const loadKinoboxScript = () => {
			const script = document.createElement('script');
			script.src = process.env.FULL_MOVIE_URL;
			script.async = true;
			script.onload = initializeKinobox;
			document.body.appendChild(script);
		};

		typeof Kinobox === 'undefined' ? loadKinoboxScript() : initializeKinobox();

	}, [movieId]);

	return (
		<section className={classNames([styles.clipContainer, 'movie-info-wrapper'])}>
			<div className="kinobox_player"></div>
			<Script src="https://kinobox.tv/kinobox.min.js"/>
		</section>
	)
}

export default Index;
