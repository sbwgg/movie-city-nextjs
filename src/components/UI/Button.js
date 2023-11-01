import React from 'react';

const Button = props => {
    const {
        children,
        design,
        className,
        regular,
        ...rest
    } = props;

    const classes = () => {
        return regular ? className : `btn${design ? ` btn-${design}` : ''}${className ? ` ${className}` : ''}`
    }

    return (
        <button className={classes()} {...rest}>
            {children}
        </button>
    )
};

export default Button;
