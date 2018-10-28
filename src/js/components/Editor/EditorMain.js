import React from 'react';
import PropTypes from 'prop-types';

const EditorMain = ({
    onDrop,
    onDragEnter,
    children,
    style,
    scale,
    onMouseDown,
    otherSelect,
    select,
    editorMain
}) => {
    let outerStyle;
    if (scale < 1) {
        outerStyle = {
            width: 'auto',
            minWidth: style.width * scale + 200,
            height: style.height * scale + 200
        };
    } else {
        outerStyle = {
            width: style.width * scale + 200,
            height: style.height * scale + 200
        };
    }
    return (
        <div className="editorMain"   ref={editorMain}>
            <div className="editorMain__canvas--outer" style={outerStyle}>
                <div
                    className="editorMain__canvas"
                    onDrop={onDrop}
                    onDragEnter={onDragEnter}
                    onDragOver={onDragEnter}
                    data-role="drag-drop-container"
                    style={style}
                >
                    <div className="editorMain__canvas--inner"
                        onMouseDown={onMouseDown}

                    >{children}</div>
                    {select}
                    {otherSelect}
                </div>
            </div>
        </div>
    );
};

EditorMain.propTypes = {
    onDrop: PropTypes.func.isRequired,
    onDragEnter: PropTypes.func.isRequired,
    onDragOver: PropTypes.func.isRequired,
    children: PropTypes.any,
    style: PropTypes.any.isRequired,
    onMouseDown: PropTypes.func,
    scale: PropTypes.number,
    select: PropTypes.any,
    otherSelect: PropTypes.any,
    editorMain: PropTypes.any
};
export default EditorMain;
