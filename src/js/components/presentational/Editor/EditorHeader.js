import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../element/Input';
const EditorHeader = ({ scale, onClick }) => {
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
                <div className="editorHeader__scale">
                    <button
                        id="editorHeader__scale--subtract"
                        data-num="0"
                        onClick={onClick}
                    >
                        -
                    </button>

                    <div
                        className="editorHeader__scale--main"
                        id="editorHeader__scale--main"
                    >
                        {scale * 100 + '%'}
                    </div>
                    <button
                        id="editorHeader__scale--add"
                        data-num="1"
                        onClick={onClick}
                    >
                        +
                    </button>
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
    scale: PropTypes.any,
    onClick: PropTypes.func
    // textContent: PropTypes.any
};
export default EditorHeader;
