import React, { useEffect } from 'react';
import { popularMovies } from '../../../services/api';
import { getPopularMovies } from '@/store/slices/globalSlice';
import { useSelector, useDispatch } from 'react-redux';
import ImageComponent from '@/components/UI/ImageComponent';
import NextLink from '@/components/UI/NextLink';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import styles from './index.module.scss';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { floatUpVariants, fadeInVariants } from '@/helpers/motion-animations';

const TopPopularMovies = () => {
    const dispatch = useDispatch();
    const popularMovieData = useSelector(state => state.global.popularMovies);

    const swiperOptions = {
        slidesPerView: 2,
        slidesPerGroup: 2,
        speed: 800,
        modules: [Navigation],
        navigation: true,
        breakpoints: {
            768: {
                slidesPerView: 3,
                slidesPerGroup: 3
            },
            1024: {
                slidesPerView: 7,
                slidesPerGroup: 7
            }
        }
    };

    useEffect(() => {
        popularMovies()
            .then(res => dispatch(getPopularMovies(res)));
    },[]);

    return (
        <section className={styles.topPopularMovies}>
            <div className={classNames([styles.topPopularMoviesSlider, 'custom-navigations'])}>
                <Swiper {...swiperOptions}>
                    {popularMovieData.map((item, key) => {
                        return (
                            <SwiperSlide key={`popular-movie-${item.id}`}>
                                <NextLink href={`/movie/${item.id}`} className={styles.popularMovie}>
                                    <figure>
                                        <motion.div
                                            className={styles.popularMovieImage}
                                            initial="floatDown"
                                            animate="floatUp"
                                            exit="floatDown"
                                            variants={floatUpVariants}
                                            transition={{type: 'spring', stiffness: 100, delay: key * 0.12}}
                                        >
                                            <ImageComponent
                                                className="transition-transform duration-500"
                                                src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path}`}
                                                width={300} height={450} alt={item.title}
                                            />
                                        </motion.div>
                                        <motion.figcaption
                                            className="mt-3"
                                            initial="hide"
                                            animate="show"
                                            exit="hide"
                                            variants={fadeInVariants}
                                            transition={{type: 'tween', delay: key * 0.15}}
                                        >
                                            <p className="text-center text-sm">{item.title}</p>
                                        </motion.figcaption>
                                    </figure>
                                </NextLink>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </section>
    )
};

export default TopPopularMovies;
