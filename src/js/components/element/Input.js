import React from 'react';
import PropTypes from 'prop-types';
const Input = ({ type, id, value, handleChange,src }) => (
    <div className="input">
        <img className="input__icon" src={src} />
        <input
            type={type}
            className="input-control"
            id={id}
            value={value}
            onChange={handleChange}
        />
    </div>
);
Input.propTypes = {
    type: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.string,
    src: PropTypes.string,
    handleChange: PropTypes.func
};
export default Input;
