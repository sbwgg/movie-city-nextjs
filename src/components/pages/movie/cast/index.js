import React, {useRef} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import NextLink from '@/components/UI/NextLink';
import {Navigation} from 'swiper/modules';
import styles from './index.module.scss';
import {useTranslation} from 'next-i18next';
import {sliderListOptions} from '@/helpers';
import ImageComponent from '@/components/UI/image-component';
import {IMAGE_PATH} from '@/constants';
import FemaleFallback from '@/assets/svg/female-fallback.svg';
import MaleFallback from '@/assets/svg/male-fallback.svg';

const Cast = props => {
    const {
        cast = [],
        movieId
    } = props;

    const slidePrev = useRef(null);
    const slideNext = useRef(null);
    const {t} = useTranslation();

    return (
        <section className="movie-info-wrapper">
            <h3>{t('movie.cast')}</h3>
            <div className={styles.castSlider}>
                <Swiper
                    {...sliderListOptions}
                    modules={[Navigation]}
                    navigation={{
                        prevEl: slidePrev.current,
                        nextEl: slideNext.current
                    }}
                >
                    {cast.map(item =>
                        <SwiperSlide key={item.id} className="!h-auto p-3">
                            <figure className={styles.castCard}>
                                <ImageComponent
                                    src={IMAGE_PATH(item.profile_path)}
                                    fallBackSrc={cast.gender === 1 ? FemaleFallback : MaleFallback}
                                    width={300}
                                    height={450}
                                    alt={item.name}
                                    className="w-full"
                                />
                                <figcaption className={styles.castCardInfo}>
                                    <h4 className="text-oneline">{item.name}</h4>
                                    <h5 className="text-oneline">{item.character}</h5>
                                </figcaption>
                            </figure>
                        </SwiperSlide>
                    )}
                    <SwiperSlide className="!h-auto p-3">
                        <NextLink
                            className={styles.castCardMore}
                            href={`/movie/${movieId}/cast`}>
                            <p>View More</p>
                        </NextLink>
                    </SwiperSlide>
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

export default Cast;
