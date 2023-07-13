import React from 'react';

const Button = props => {
    const {
        children,
        design,
        ...rest
    } = props;

    const classes = () => {
        return `btn${design ? ` btn-${design}` : ''}`
    }

    return (
        <button className={classes()} {...rest}>
            {children}
        </button>
    )
};

export default Button;