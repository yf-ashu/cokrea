import React from 'react';
import PropTypes from 'prop-types';

const EditorItem = ({
    tag,
    attribute,
    textContent,
    style,
    onClick,
    outside,
    contenteditable,
    onMousedown
}) => {
    let Tag = tag;
    return (
        <div className="editorMain__items" style={outside} >
            <Tag
                className={attribute.className}
                id={attribute.id}
                type={attribute.type}
                style={style}
                onClick={onClick}
                contenteditable={contenteditable}
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
    contenteditable:PropTypes.string,
    onMousedown:PropTypes.func,
};
export default EditorItem;
