import React from 'react';
import PropTypes from 'prop-types';

const EditorMain = ({
    onDrop,
    onDragEnter,
    onDragOver,
    children,
    style,
    scale,
    onMouseDown
}) => {
    let outerStyle;
    if (scale < 1) {
        outerStyle = {
            width: '100%',
            height: style.height * scale + 200
        };
    } else {
        outerStyle = {
            width: style.width * scale + 200,
            height: style.height * scale + 200
        };
    }
    return (
        <div className="editorMain">
            <div className="editorMain__canvas--outer" style={outerStyle}>
                <div
                    className="editorMain__canvas"
                    onDrop={onDrop}
                    onDragEnter={onDragEnter}
                    onDragOver={onDragOver}
                    data-role="drag-drop-container"
                    style={style}
                    onMouseDown={onMouseDown}
                >
                    {children}
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
    scale: PropTypes.number
};
export default EditorMain;
