import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import styles from './index.module.scss';
import {useCurrentLocale, usePreviousLocale} from '@/hooks/useLocale';
import MediaCard from '@/components/media-card';
import {getPopularMovies} from '@/services/global';
import { setPopularMovies } from '@/redux/slices/globalSlice';
import {dispatch} from '@/helpers';

const Index = () => {
    const {popularMovies} = useSelector(state => state.global);
    const locale =  useCurrentLocale();
    const prevLocale = usePreviousLocale(locale);

    const swiperOptions = {
        slidesPerView: 2,
        slidesPerGroup: 2,
        speed: 800,
        loop: true,
        modules: [Navigation],
        navigation: {
            prevEl: '.popular-prev',
            nextEl: '.popular-next'
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
        if (popularMovies.length === 0 || prevLocale !== locale) {
            getPopularMovies(locale)
                .then(response => dispatch(setPopularMovies(response)));
        }
    },[locale]);

    return (
        <section className={styles.popularMovies}>
            <div className={styles.popularMoviesSlider}>
                {popularMovies.length !== 0 &&
                    <Swiper {...swiperOptions}>
                        {popularMovies.map((item, key) => {
                            return (
                                <SwiperSlide key={`popular-movie-${item.id}`}>
                                    <MediaCard media={item} delay={key}/>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                }
                <button className="swiper-nav-prev popular-prev">
                    <span/>
                </button>
                <button className="swiper-nav-next popular-next">
                    <span/>
                </button>
            </div>
        </section>
    )
};

export default Index;
