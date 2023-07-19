import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import styles from './index.module.scss';
import MovieCard from '@/components/movie-card';
import { getPopularMovies } from '../../../services/api';
import { setPopularMovies } from '@/store/slices/globalSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

const PopularMovies = () => {
    const dispatch = useDispatch();
    const popularMovieData = useSelector(state => state.global.popularMovies);
    const router = useRouter();
    const currentLang =  router.locale;
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
        getPopularMovies(currentLang)
            .then(res => dispatch(setPopularMovies(res)));
    },[currentLang]);

    return (
        <section className={styles.popularMovies}>
            <div className={styles.popularMoviesSlider}>
                <Swiper {...swiperOptions}>
                    {popularMovieData.map((item, key) => {
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
