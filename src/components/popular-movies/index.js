import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import styles from './index.module.scss';
import useCurrentLocale from '@/hooks/useCurrentLocale';
import MovieCard from '@/components/movie-card';
import {getPopularMovies} from '@/services/global';
import { setPopularMovies } from '@/redux/slices/globalSlice';
import {dispatch} from '@/helpers';

const PopularMovies = () => {
    const {popularMovies} = useSelector(state => state.global);
    const locale =  useCurrentLocale();
    const slidePrev = useRef(null);
    const slideNext = useRef(null);

    const swiperOptions = {
        slidesPerView: 2,
        slidesPerGroup: 2,
        speed: 800,
        modules: [Navigation],
        navigation: {
            prevEl: slidePrev.current,
            nextEl: slideNext.current
        },
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
        getPopularMovies(locale)
            .then(res => dispatch(setPopularMovies(res)));
    },[locale]);

    return (
        <section className={styles.popularMovies}>
            <div className={styles.popularMoviesSlider}>
                <Swiper {...swiperOptions}>
                    {popularMovies.map((item, key) => {
                        return (
                            <SwiperSlide key={`popular-movie-${item.id}`}>
                                <MovieCard movie={item} delay={key}/>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                <button ref={slidePrev} className="swiper-nav-prev">
                    <span/>
                </button>
                <button ref={slideNext} className="swiper-nav-next">
                    <span/>
                </button>
            </div>
        </section>
    )
};

export default PopularMovies;
