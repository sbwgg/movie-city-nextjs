import React, {useEffect, useState} from 'react';
import styles from './index.module.scss';
import NextLink from '@/components/UI/NextLink';
import MovieClip from '@/components/pages/movie/movie-clip';
import {useRouter} from 'next/router';
import {dispatch} from '@/helpers';
import {useSelector} from 'react-redux';
import {getFooterMovie} from '@/services/global';
import {setFooterMovie} from '@/redux/slices/globalSlice';
import {BACKDROP_PATH} from '@/constants';
import {$api} from '@/api';
import {API_KEY} from '@/constants';
import {extractYear} from '@/helpers';

const Footer = () => {
	const router = useRouter();
	const currentLang = router.locale;
	const {footerMovie} = useSelector(state => state.global);
	const [details, setDetails] = useState([]);

	useEffect(() => {
		async function fetchAndSetMovieData(currentLang) {
			try {
				const res = await getFooterMovie(currentLang);
				dispatch(setFooterMovie(res));

				if (res && res.id) {
					const response = await $api().get(`/movie/${res.id}/videos?api_key=${API_KEY}&language=${currentLang}`);
					setDetails(response.data.results[0]);
				}
			} catch (error) {
				console.log(error);
			}
		}

		fetchAndSetMovieData(currentLang);
	},[currentLang]);

	const footerBackground = {
		backgroundImage: `
		linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
		url(${BACKDROP_PATH(footerMovie.backdrop_path)})
		`
	};

	return (
		<footer className={styles.footer}>
			<div className={styles.footerInner} style={footerBackground}>
				<NextLink href={`/movie/${footerMovie.id}`}>
					<div className="gradient-text">
						{footerMovie.title}

						{footerMovie.release_date &&
							<span className="ml-2">({extractYear(footerMovie.release_date)})</span>
						}
					</div>
				</NextLink>
				{details.key && <MovieClip clipKey={details.key}/>}
			</div>
		</footer>
	)
}

export default Footer;
