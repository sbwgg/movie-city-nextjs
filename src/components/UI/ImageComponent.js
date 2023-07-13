import React, { useState } from 'react';
import Image from 'next/image';
import ImageLoader from '@/assets/images/poster_loader.gif';

const ImageComponent = props => {
    const [isLoaded, setLoaded] = useState(false);

    return (
        <>
            {!isLoaded &&
                <Image src={ImageLoader}
                       className="w-full h-full absolute top-0 left-0 z-[2]"
                       width={300}
                       height={450}
                       alt="loaded"
                />
            }
            <Image {...props} quality={80} priority
                   onLoad={() => setLoaded(false)}
                   onLoadingComplete={() => setLoaded(true)}
            />
        </>
    )
}

export default ImageComponent;