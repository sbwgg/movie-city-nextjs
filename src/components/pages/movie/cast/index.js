import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import ImageComponent from '@/components/UI/ImageComponent';
import {IMAGE_PATH} from '@/constants';
import FemaleFallback from '@/assets/svg/female-fallback.svg';
import MaleFallback from '@/assets/svg/male-fallback.svg';

const Cast = props => {
    const {
        castData = []
    } = props;

    const castSwiperOptions = {
        slidesPerView: 2.5,

        breakpoints: {
            1024: {
                slidesPerView: 6.5
            }
        }
    };

    return (
        <section className="overflow-hidden">
            <Swiper {...castSwiperOptions}>
                {castData.map(item =>
                    <SwiperSlide key={item.id} className="!h-auto">
                        <figure>
                            <ImageComponent
                                src={IMAGE_PATH(item.profile_path)}
                                fallBackSrc={item.gender === 1 ? FemaleFallback : MaleFallback}
                                width={300}
                                height={450}
                                alt={item.name}
                                className="h-full"
                            />
                            <figcaption>
                                <p>{item.name}</p>
                                <p>{item.character}</p>
                            </figcaption>
                        </figure>
                    </SwiperSlide>
                )}
            </Swiper>
        </section>
    )
}

export default Cast;