import React from 'react';
import classNames from 'classnames';
import {DebounceInput} from 'react-debounce-input';
import styles from './index.module.scss';

const Index = props => {
    const {
        id,
        type = 'text',
        className,
        name,
        placeholder,
        onChange,
        debounce,
        ...rest
    } = props;

    return (
        <div className={classNames([styles.inputWrapper, className ? className : ''])}>
            {debounce ? (
                <DebounceInput
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    {...rest}
                />
            ) : (
                <input
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange}
                    {...rest}
                />
            )}
        </div>
    )
}

export default Index;