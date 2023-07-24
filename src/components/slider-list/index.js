import React, {useRef} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import {sliderListOptions} from '@/helpers';
import MovieCard from '@/components/movie-card';
import CastCard from '@/components/person-card';
import styles from './index.module.scss';
import {useTranslation} from 'next-i18next';
import NextLink from '@/components/UI/NextLink';

const SliderList = props => {
    const {
        items = [],
        title,
        type = 'movie',
        movieId
    } = props;

    const slidePrev = useRef(null);
    const slideNext = useRef(null);
    const {t} = useTranslation();

    return (
        <section className="slider-info-wrapper">
            <h3>{t(title)}</h3>
            <div className={styles.sliderListSlider}>
                <Swiper
                    {...sliderListOptions}
                    modules={[Navigation]}
                    navigation={{
                        prevEl: slidePrev.current,
                        nextEl: slideNext.current
                    }}
                >
                    {items.map((item, index) => {
                        return (
                            <SwiperSlide
                                key={item.id}
                                className={`!h-auto full-sized${type === 'cast' ? ' p-3' : ''}`}
                            >
                                {type === 'cast' ? (
                                    <CastCard member={item}/>
                                ) : (
                                    <MovieCard movie={item} delay={index} />
                                )}
                            </SwiperSlide>
                        )
                    })}
                    {type === 'cast' &&
                        <SwiperSlide className="!h-auto p-3">
                            <NextLink
                                className='view-more-link'
                                href={`/movie/${movieId}/cast`}>
                                <p>View More</p>
                            </NextLink>
                        </SwiperSlide>
                    }
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

export default SliderList;
