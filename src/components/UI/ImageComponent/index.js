import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import fallbackImage from '@/assets/images/icons/test-img.svg';
import styles from './index.module.scss';
import classNames from 'classnames';

const Index = props => {
    const {src, fallBackSrc = fallbackImage, ...rest} = props;
    const [imgSrc, setImgSrc] = useState(src);
    const [isError, setError] = useState(false);

    useEffect(() => {
        setImgSrc(src);
    }, [src]);


    return (
        <div className={
            classNames([styles.ImageComponentContainer, isError && styles.ImageComponentFallback])
        }>
            <Image
                src={src ? imgSrc : fallBackSrc}
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
