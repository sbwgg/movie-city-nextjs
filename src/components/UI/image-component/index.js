import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import fallbackImage from '@/assets/images/icons/test-img.svg';
import styles from './index.module.scss';
import classNames from 'classnames';

const Index = props => {
    const {src, fallBackSrc = fallbackImage, wrapperClass, ...rest} = props;
    const [imgSrc, setImgSrc] = useState(src);
    const [isError, setError] = useState(false);

    useEffect(() => {
        setImgSrc(src);
    }, [src]);


    return (
        <div className={
            classNames([
                wrapperClass,
                styles.ImageComponentContainer,
                isError && `${styles.ImageComponentFallback} fallback-img`
            ])
        }>
            <Image
                src={src ? imgSrc : fallBackSrc}
                width={props.width || 300}
                height={props.height || 450}
                quality={80}
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
