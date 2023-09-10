import React, {useState, useRef, useEffect} from 'react';
import {motion} from 'framer-motion';
import classNames from 'classnames';
import Button from '@/components/UI/Button';
import NextLink from '@/components/UI/NextLink';
import styles from './index.module.scss';

const NotFoundBanner = () => {
	const videoRef = useRef(null);
	const [loaded, setLoaded] = useState(false);
	const [playState, setPlayState] = useState(false);
	const [scare, setScare] = useState(false);

	const playVideo = () => {
		!playState ? setPlayState(videoRef?.current.play()) : setPlayState(videoRef?.current.pause());
	};

	const checkToScare = () => {
		setScare((videoRef?.current?.currentTime >= 9.904524 && videoRef?.current?.currentTime <= 13.099863) && playState);
	};

	useEffect(() => {
		setLoaded(true);
	},[])

	return (
		<section className={styles.notFoundWrapper}>
			<div className={classNames([
				styles.notFoundContainer, scare && styles.notFoundContainerScare
			])}>
				<motion.div className={styles.notFoundText}>
					<h1 className="gradient-text-blurred"
						data-text="404"
					>
						404
					</h1>
					<h2>Oops, seems something went wrong!</h2>
					<NextLink href="/" className="btn btn-secondary">Go to HOME</NextLink>
				</motion.div>
				<motion.div className={styles.notFoundMedia} onClick={playVideo}>
					{!playState && <Button design="primary" className={styles.notFoundMediaToggle}/>}
					<video playsInline loop poster="/videos/thumbnail.jpg"
						   src="/videos/not-found-video.mp4" ref={videoRef}
						   onTimeUpdate={checkToScare}
					>
						<source src="/videos/not-found-video.mp4" type="video/mp4"/>
					</video>
				</motion.div>
			</div>
		</section>
	)
}

export default NotFoundBanner;
