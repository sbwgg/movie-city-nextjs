import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';

const Index = props => {
    const {
        id,
        type = 'text',
        className,
        name,
        placeholder,
        onChange,
        ...rest
    } = props;

    return (
        <div className={classNames([styles.inputWrapper, className ? className : ''])}>
            <input type={type}
                   id={id}
                   name={name}
                   placeholder={placeholder}
                   onChange={onChange}
                   {...rest}
            />
        </div>
    )
}

export default Index;