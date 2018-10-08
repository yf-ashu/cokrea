import React from 'react';
import PropTypes from 'prop-types';
import Input from '../element/Input';
import edit from '../../../img/edit.svg';
import back from '../../../img/back.svg';
import next from '../../../img/next.svg';
import { NavLink } from 'react-router-dom';
import user from '../../../img/user.svg';
import download from '../../../img/download.svg';
import share from '../../../img/share.svg';

const EditorHeader = ({
    scale,
    onClick,
    onDownload,
    onHistory,
    unable,
    login,
    saveData
}) => {
    return (
        <div className="editorHeader">
            <NavLink className="editorHeader__left" to="/" />
            <div className="editorHeader__center">
                <div className="editorHeader__search">
                    <Input
                        src={edit}
                        type="text"
                        id="headerInput"
                        className="input-control input-edit"
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
                <button
                    className="editorHeader__button--save"
                    onClick={saveData}
                >
                    SAVE
                </button>
                <button
                    className="editorHeader__button--download"
                    onClick={onDownload}
                >
                    <img src={download} />
                </button>

                <button className="editorHeader__button--share">
                    {' '}
                    <button>
                        {' '}
                        <img src={share} />
                    </button>
                </button>

                <div className="createHeader__member">
                    <img src={login ? login.photoURL : user} />
                </div>
            </div>
        </div>
    );
};

EditorHeader.propTypes = {
    scale: PropTypes.any,
    onClick: PropTypes.func,
    onDownload: PropTypes.func,
    onHistory: PropTypes.func,
    unable: PropTypes.array,
    login: PropTypes.any,
    saveData: PropTypes.func

    // textContent: PropTypes.any
};
export default EditorHeader;
