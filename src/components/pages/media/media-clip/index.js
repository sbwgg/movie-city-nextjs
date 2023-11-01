import React from 'react';
import classNames from 'classnames';
import {useSelector} from 'react-redux';
import {motion, AnimatePresence} from 'framer-motion';
import {dispatch} from '@/helpers';
import {setShowClip} from '@/redux/slices/movieSlice';
import Button from '@/components/UI/Button';
import styles from './index.module.scss';

const Index = () => {
	const {clipKey, showClip} = useSelector(state => state.movie);

	const hideTrailer = () => dispatch(setShowClip(false));

	const scaleInVariants = {
		toIn: {
			scale: 1,
			opacity: 1
		},

		toOut: {
			scale: 0.1,
			opacity: 0
		}
	};

	return (
		<AnimatePresence>
			{showClip &&
				<motion.section
					initial={{opacity: 0}}
					animate={{opacity: 1}}
					exit={{opacity: 0}}
					transition={{duration: 0.4}}
					className={classNames([styles.clipContainer, 'movie-list-info-wrapper'])}
				>
					<Button className={styles.clipClose} onClick={hideTrailer}/>
					<motion.div
						initial="toOut"
						animate="toIn"
						exit="toOut"
						variants={scaleInVariants}
						transition={{duration: 0.2}}
						className={styles.clipHolder}
						onClick={hideTrailer}
					>
						<iframe width="560" height="315"
								src={`https://www.youtube.com/embed/${clipKey}`}
								title="YouTube video player" frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowFullScreen
						/>
					</motion.div>
				</motion.section>
			}
		</AnimatePresence>
	)
}

export default Index;
