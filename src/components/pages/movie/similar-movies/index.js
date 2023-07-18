import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import MovieCard from '@/components/movie-card';
import styles from './index.module.scss';

const SimilarMovies = props => {
    const {
        similarMoviesData = []
    } = props;

    const similarMoviesSwiperOptions = {
        slidesPerView: 2,
        slidesPerGroup: 2,
        speed: 800,
        breakpoints: {
            768:{
                slidesPerView: 3,
                slidesPerGroup: 3
            },
            1024:{
                slidesPerView: 4,
                slidesPerGroup: 4
            }
        }
    }

    return (
        <section className={styles.similarWrapper}>
            <Swiper {...similarMoviesSwiperOptions}>
                {similarMoviesData.map((item, index) => {
                    return (
                        <SwiperSlide key={item.id} className="!h-auto full-sized">
                            <MovieCard movie={item} delay={index} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </section>
    )
}

export default SimilarMovies;