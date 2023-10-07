import React from 'react';
import classNames from 'classnames';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import {useTranslation} from 'next-i18next';
import styles from './index.module.scss';
import MediaCard from '@/components/media-card';
import CastCard from '@/components/person-card';
import NextLink from '@/components/UI/NextLink';
import {sliderListOptions} from '@/helpers';

const Index = props => {
    const {
        items = [],
        title,
        sliderType = 'movie',
        mediaId,
        mediaTitle,
        mediaType = 'movie',
        emptyMessage,
        listType
    } = props;

    const {t} = useTranslation();

    return (
        <section className={classNames(['slider-info-wrapper', props.className])}>
            {title && <h3>{t(title)}</h3>}
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
                                        className={`!h-auto full-sized${sliderType === 'cast' ? ' p-3' : ''}`}
                                    >
                                        {sliderType === 'cast' ?
                                            <CastCard member={item}/> :
                                            <MediaCard media={item} delay={index} mediaType={item.media_type || mediaType}/>
                                        }
                                    </SwiperSlide>
                                )
                            })}
                            {sliderType === 'cast' &&
                                <SwiperSlide className="!h-auto p-3">
                                    <NextLink
                                        className='view-more-link'
                                        href={`/media/${mediaType}/${mediaId}/cast`}>
                                        <p>{t('media.viewMore')}</p>
                                    </NextLink>
                                </SwiperSlide>
                            }
                        </>
                    ) : (
                        <>
                            {emptyMessage && <h3 className={styles.sliderListEmpty}>
                                {t(emptyMessage)} {mediaTitle}
                            </h3>}
                        </>
                    )}
                </Swiper>
                <button className={`swiper-nav-prev swiper-${listType}-prev`} aria-label="Slide Prev">
                    <span/>
                </button>
                <button className={`swiper-nav-next swiper-${listType}-next`} aria-label="Slide Next">
                    <span/>
                </button>
            </div>
        </section>
    )
}

export default Index;
