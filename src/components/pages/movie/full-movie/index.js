import React, {useEffect} from 'react';
import classNames from 'classnames';
import styles from './index.module.scss';

const Index = props => {
	const {movieId, movieTitle} = props;

	const kinoBoxOptions = {
		search: {
			imdb: movieId,
			title: movieTitle
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
		</section>
	)
}

export default Index;
