import React from 'react';
import PropTypes from 'prop-types';
const Input = ({
    type,
    id,
    value,
    onChange,
    src,
    className,
    disabled,
    onBlur,
    text
}) => (
    <div className="input">
        <label htmlFor={id}> {text}</label>
        <img className="input__icon" src={src} />
        <input
            type={type}
            className={className}
            id={id}
            value={value}
            onChange={onChange}
            disabled={disabled}
            onBlur={onBlur}
        />
    </div>
);
Input.propTypes = {
    type: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.string,
    src: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.string,
    onBlur: PropTypes.func,
    text: PropTypes.string,

};
export default Input;
