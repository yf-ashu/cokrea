import React from 'react';
import PropTypes from 'prop-types';

const EditorItem = ({
    tag,
    attribute,
    textContent,
    style,
    onClick,
    outside,
    contentEditable,
    onMouseDown,onBlur,onDoubleClick
}) => {
    let Tag = tag;
    return (
        <div
            className="editorMain__items"
            style={outside}
            data-id={attribute.id}
            onMouseDown={onMouseDown}
            onBlur={onBlur}
            onDoubleClick={onDoubleClick}
        >
            <Tag
                className={attribute.className}
                id={attribute.id}
                type={attribute.type}
                data-format={attribute.format}
                style={style}
                onClick={onClick}
                contentEditable={contentEditable}
                suppressContentEditableWarning
                src={attribute.src}
                // onBlur={onBlur}

            >
                {textContent}
            </Tag>
        </div>
    );
};

EditorItem.propTypes = {
    tag: PropTypes.string.isRequired,
    attribute: PropTypes.any.isRequired,
    textContent: PropTypes.string,
    style: PropTypes.any,
    outside: PropTypes.any,
    onClick: PropTypes.func,
    onBlur: PropTypes.func,
    contentEditable: PropTypes.string,
    onMouseDown: PropTypes.func,
    onDoubleClick:PropTypes.func
};
export default EditorItem;
