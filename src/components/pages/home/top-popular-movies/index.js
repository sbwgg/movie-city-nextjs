import React, { useEffect } from 'react';
import { popularMovies } from '../../../../../services/api';
import { getPopularMovies } from '@/store/slices/homeSlice';
import { useSelector, useDispatch } from 'react-redux';
import ImageComponent from '@/components/UI/ImageComponent';
import NextLink from '@/components/UI/NextLink';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import styles from './index.module.scss';
import classNames from 'classnames';

const TopPopularMovies = () => {
    const dispatch = useDispatch();
    const popularMovieData = useSelector(state => state.home.popularMovies);

    useEffect(() => {
        popularMovies()
            .then(res => dispatch(getPopularMovies(res)));
    },[]);

    return (
        <section className={styles.topPopularMovies}>
            <div className={classNames([styles.topPopularMoviesSlider, 'custom-navigations'])}>
                <Swiper
                    slidesPerView={3}
                    slidesPerGroup={3}
                    speed={500}
                    modules={[Navigation]}
                    navigation
                    breakpoints={{
                        768: {
                            slidesPerView: 4,
                            slidesPerGroup: 4
                        },
                        1024: {
                            slidesPerView: 8,
                            slidesPerGroup: 8
                        }
                    }}
                >
                    {popularMovieData.map((item, key) =>
                        <SwiperSlide key={`popular-movie-${key}`}>
                            <NextLink href="#." className={styles.popularMovie}>
                                <figure>
                                    <div className={styles.popularMovieImage}>
                                        <ImageComponent
                                            src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path}`}
                                            width={300} height={450} alt={item.title}
                                        />
                                        <ImageComponent
                                            src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.backdrop_path}`}
                                            width={300} height={450} alt={item.title}
                                        />
                                    </div>
                                    <figcaption className="mt-3">
                                        <p className="text-center text-sm">{item.title}</p>
                                    </figcaption>
                                </figure>
                            </NextLink>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        </section>
    )
};

export default TopPopularMovies;