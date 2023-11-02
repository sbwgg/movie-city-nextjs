import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import fallbackImage from '@/assets/images/icons/test-img.svg';
import PosterLoader from '@/assets/images/ezgif-5-3c8de345c7.gif';
import styles from './index.module.scss';

const Index = props => {
    const {src, fallBackSrc = fallbackImage, wrapperClass, ...rest} = props;
    const [loading, setLoading] = useState(true);
    const [imgSrc, setImgSrc] = useState(src);
    const [isError, setError] = useState(false);

    useEffect(() => {
        setImgSrc(src);
    }, [src]);


    return (
        <div className={
            classNames([
                wrapperClass,
                styles.NextImageContainer,
                isError && `${styles.NextImageFallback} fallback-img`
            ])
        }>
            <Image
                src={loading ? PosterLoader : src ? imgSrc : fallBackSrc}
                width={props.width || 300}
                height={props.height || 450}
                quality={80}
                onLoad={() => setLoading(false)}
                onError={() => {
                    setImgSrc(fallBackSrc);
                    setError(true);
                }}
                {...rest}
            />
        </div>
    )
}

export default Index;
