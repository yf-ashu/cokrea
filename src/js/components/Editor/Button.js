import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, name, type,className }) => {
    return (
        <button onClick={onClick} type={type} className={className}>
            {name}
        </button>
    );
};
Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired

};
export default Button;
