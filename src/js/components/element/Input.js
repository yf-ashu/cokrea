import React from 'react';
import PropTypes from 'prop-types';
const Input = ({ type, id, value, onChange,src,className }) => (
    <div className="input">
        <img className="input__icon" src={src} />
        <input
            type={type}
            className={className}
            id={id}
            value={value}
            onChange={onChange}
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
};
export default Input;
