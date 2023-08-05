import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import {useTranslation} from 'next-i18next';
import styles from './index.module.scss';
import MovieCard from '@/components/movie-card';
import CastCard from '@/components/person-card';
import NextLink from '@/components/UI/NextLink';
import {sliderListOptions} from '@/helpers';

const Index = props => {
    const {
        items = [],
        title,
        type = 'movie',
        movieId,
        movieTitle,
        emptyMessage,
        listType
    } = props;

    const {t} = useTranslation();

    return (
        <section className="slider-info-wrapper">
            <h3>{t(title)}</h3>
            <div className={styles.sliderListSlider}>
                <Swiper
                    {...sliderListOptions}
                    modules={[Navigation]}
                    navigation={{
                        prevEl: `.swiper-${listType}-prev`,
                        nextEl: `.swiper-${listType}-next`
                    }}
                >
                    {items.length > 0 ? (
                        <>
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
                                        <p>{t('movie.viewMore')}</p>
                                    </NextLink>
                                </SwiperSlide>
                            }
                        </>
                    ) : (
                        <h3 className={styles.sliderListEmpty}>
                            {t(emptyMessage)} {movieTitle}
                        </h3>
                    )}
                </Swiper>
                <button className={`swiper-nav-prev swiper-${listType}-prev`}>
                    <span/>
                </button>
                <button className={`swiper-nav-next swiper-${listType}-next`}>
                    <span/>
                </button>
            </div>
        </section>
    )
}

export default Index;
