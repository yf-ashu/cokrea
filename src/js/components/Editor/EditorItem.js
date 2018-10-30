import React from 'react';
import PropTypes from 'prop-types';

const EditorItem = ({
    tag,
    attribute,
    option,
    style,
    outside,
    onMouseDown,
    onBlur,
    onDoubleClick,textContent
}) => {
    let Tag = tag;
    if (tag !== 'img') {
        option.dangerouslySetInnerHTML = { __html: textContent };
    }

    return (
        <div
            className="editorMain__items"
            style={outside}
            data-id={attribute.id}
            draggable="false"
        >
            <Tag
                onDoubleClick={onDoubleClick}
                data-id={attribute.id}
                className={attribute.className}
                id={attribute.id}
                type={attribute.type}
                data-format={attribute.format}
                style={style}
                suppressContentEditableWarning
                src={attribute.src}
                onBlur={onBlur}
                draggable="false"
                onMouseDown={onMouseDown}
                tabIndex="-1"
                {...option}
            >
            </Tag>
        </div>
    );
};

EditorItem.propTypes = {
    tag: PropTypes.string.isRequired,
    attribute: PropTypes.any.isRequired,
    option: PropTypes.any,
    style: PropTypes.any,
    outside: PropTypes.any,
    onBlur: PropTypes.func,
    onMouseDown: PropTypes.func,
    onDoubleClick: PropTypes.func,
    textContent:PropTypes.string,

};
export default EditorItem;
