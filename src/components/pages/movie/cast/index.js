import React, {useRef} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import styles from './index.module.scss';
import ImageComponent from '@/components/UI/ImageComponent';
import {IMAGE_PATH} from '@/constants';
import FemaleFallback from '@/assets/svg/female-fallback.svg';
import MaleFallback from '@/assets/svg/male-fallback.svg';
import {useTranslation} from 'next-i18next';

const Cast = props => {
    const {
        cast = []
    } = props;

    const slidePrev = useRef(null);
    const slideNext = useRef(null);
    const {t} = useTranslation();

    const castSwiperOptions = {
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
        <section className="movie-info-wrapper">
            <h3>{t('movie.cast')}</h3>
            <div className={styles.castSlider}>
                <Swiper {...castSwiperOptions}>
                    {cast.map(item =>
                        <SwiperSlide key={item.id} className="!h-auto p-3">
                            <figure className={styles.castCard}>
                                <ImageComponent
                                    src={IMAGE_PATH(item.profile_path)}
                                    fallBackSrc={item.gender === 1 ? FemaleFallback : MaleFallback}
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
