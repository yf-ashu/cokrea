import React from 'react';
import PropTypes from 'prop-types';

const ToolButton = ({
    onClick,
    name,
    type,
    src,
    displayName,
    id,
    className
}) => {
    return (
        <div>
            <button
                onClick={onClick}
                type={type}
                className={'toolButton__all ' + className}
                id={id}
                data-name={name}
            >
                <img className="toolButton__icon" src={src} />
                <div className="toolButton__alert_tringle" />
                <div className="toolButton__alert">{displayName}</div>
            </button>
        </div>
    );
};
ToolButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    displayName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};
export default ToolButton;
