import React from 'react';
import PropTypes from 'prop-types';

const EditorMain = ({ onDrop, onDragEnter, onDragOver, children, style }) => {
    return (
        <div className="editorMain">
            <div className="editorMain__canvas--outer">
                <div
                    className="editorMain__canvas"
                    onDrop={onDrop}
                    onDragEnter={onDragEnter}
                    onDragOver={onDragOver}
                    data-role="drag-drop-container"
                    style={style}
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
    style: PropTypes.any.isRequired
    // attribute: PropTypes.any,
    // textContent: PropTypes.any
};
export default EditorMain;
