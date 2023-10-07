import React from 'react';

const Button = props => {
    const {
        children,
        design,
        className,
        ...rest
    } = props;

    const classes = () => {
        return `btn${design ? ` btn-${design}` : ''}${className ? ` ${className}` : ''}`
    }

    return (
        <button className={classes()} {...rest}>
            {children}
        </button>
    )
};

export default Button;
