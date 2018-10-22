import React from 'react';
import PropTypes from 'prop-types';

const ToolButtonItem = ({
    onClick,
    onDragStart,
    id,
    type,
    className,
    src,
    format
}) => {

    return (
        <div
            onClick={onClick}
            type={type}
            className={'toolButton__item ' + className}
            id={id}
            onDragStart={onDragStart}
            draggable="true"
            data-format={format}
            // data-special={}
        >
            <img src={src} />
        </div>
    );
};
ToolButtonItem.propTypes = {
    onClick: PropTypes.func.isRequired,
    onDragStart: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    format: PropTypes.string.isRequired
};
export default ToolButtonItem;
