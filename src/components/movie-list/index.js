import React, {useRef} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import {sliderListOptions} from '@/helpers';
import MovieCard from '@/components/movie-card';
import styles from './index.module.scss';
import {useTranslation} from 'next-i18next';

const MovieList = props => {
    const {
        movies = [],
        title
    } = props;

    const slidePrev = useRef(null);
    const slideNext = useRef(null);
    const {t} = useTranslation();

    return (
        <section className="movie-info-wrapper">
            <h3>{t(title)}</h3>
            <div className={styles.movieListSlider}>
                <Swiper
                    {...sliderListOptions}
                    modules={[Navigation]}
                    navigation={{
                        prevEl: slidePrev.current,
                        nextEl: slideNext.current
                    }}
                >
                    {movies.map((item, index) => {
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

export default MovieList;
