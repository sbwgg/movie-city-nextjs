import React from 'react';
import Image from 'next/image';

const ImageComponent = props => {
    return (
        <Image {...props} quality={80}/>
    )
}

export default ImageComponent;
