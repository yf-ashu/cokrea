import React from 'react';
// import PropTypes from 'prop-types';
import Input from '../../element/Input';
const EditorHeader = () => {
    return (
        <div className="editorHeader">
            <div className="editorHeader__left"> </div>
            <div className="editorHeader__center">
                <div className="editorHeader__search">
                    <Input
                        src="../src/img/edit.svg"
                        type="text"
                        id="headerInputp"
                    />
                </div>
            </div>
            <div className="editorHeader__right">
                <button className="editorHeader__button--save">SAVE</button>
                <button className="editorHeader__button--share">SHARE</button>
                <div className="editorHeader__member" />
            </div>
        </div>
    );
};

EditorHeader.propTypes = {
    // tag: PropTypes.any,
    // attribute: PropTypes.any,
    // textContent: PropTypes.any
};
export default EditorHeader;
