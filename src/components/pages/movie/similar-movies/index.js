import React, {useRef} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import MovieCard from '@/components/movie-card';
import styles from './index.module.scss';
import {useTranslation} from 'next-i18next';

const SimilarMovies = props => {
    const {
        similarMoviesData = []
    } = props;

    const slidePrev = useRef(null);
    const slideNext = useRef(null);
    const {t} = useTranslation();

    const similarMoviesSwiperOptions = {
        slidesPerView: 2,
        slidesPerGroup: 2,
        speed: 800,
        modules: [Navigation],
        navigation: {
            prevEl: slidePrev.current,
            nextEl: slideNext.current
        },
        breakpoints: {
            768:{
                slidesPerView: 3,
                slidesPerGroup: 3
            },
            1024:{
                slidesPerView: 4.5,
                slidesPerGroup: 4
            }
        }
    };

    return (
        <section className={styles.similarWrapper}>
            <h3>{t('movie.similarMovies')}</h3>
            <div className={styles.similarSlider}>
                <Swiper {...similarMoviesSwiperOptions}>
                    {similarMoviesData.map((item, index) => {
                        return (
                            <SwiperSlide key={item.id} className="!h-auto full-sized">
                                <MovieCard movie={item} delay={index} />
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
}

export default SimilarMovies;
