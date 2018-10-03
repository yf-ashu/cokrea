import React from 'react';
import PropTypes from 'prop-types';
import Input from '../element/Input';
import edit from '../../../img/edit.svg';
import back from '../../../img/back.svg';
import next from '../../../img/next.svg';

const EditorHeader = ({ scale, onClick, onSave, onHistory, unable }) => {
    return (
        <div className="editorHeader">
            <div className="editorHeader__left"> </div>
            <div className="editorHeader__center">
                <div className="editorHeader__search">
                    <Input src={edit} type="text" id="headerInputp" />
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
                <div className="editorHeader__history">
                    <button
                        className="editorHeader__recovery"
                        onClick={onHistory}
                        data-data="recovery"
                        disabled={unable[0].length === 0 ? true : false}
                    >
                        <img src={back} />
                    </button>
                    <button
                        className="editorHeader__redo"
                        onClick={onHistory}
                        data-data="redo"
                        disabled={unable[1].length === 0 ? true : false}
                    >
                        <img src={next} />
                    </button>
                </div>
            </div>
            <div className="editorHeader__right">
                <button className="editorHeader__button--save" onClick={onSave}>
                    SAVE
                </button>
                <button className="editorHeader__button--share">SHARE</button>
                <div className="editorHeader__member" />
            </div>
        </div>
    );
};

EditorHeader.propTypes = {
    scale: PropTypes.any,
    onClick: PropTypes.func,
    onSave: PropTypes.func,
    onHistory: PropTypes.func,
    unable: PropTypes.array

    // textContent: PropTypes.any
};
export default EditorHeader;
