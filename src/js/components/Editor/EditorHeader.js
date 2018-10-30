import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../element/Input';
import edit from '../../../img/edit.svg';
import back from '../../../img/back.svg';
import backDark from '../../../img/back-dark.svg';
import nextDark from '../../../img/next-dark.svg';

import firebase from 'firebase/app';
require('firebase/auth');
import next from '../../../img/next.svg';
import { NavLink } from 'react-router-dom';
import user from '../../../img/user.svg';
import download from '../../../img/download.svg';
import share from '../../../img/share.svg';
import arrow from '../../../img/arrow.svg';
import logo from '../../../img/logo.png';
import bee from '../../../img/bee.png';


class EditorHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            memberButton:false
        };
        this.logout=this.logout.bind(this);
        this.headerSizeClick = this.headerSizeClick.bind(this);

    }

    headerSizeClick(e) {
        let elem=e.currentTarget;
        this.setState((state,props)=> {
            let  copy = JSON.parse(JSON.stringify(props.editMainStyle));
            if (elem.dataset.num === '0') {
                if (copy.scale <= 0.25) {
                    let find = copy.style.findIndex(data => data.transform);
                    copy.style[find] = { transform: 'scale(0.25)' };
                } else if (copy.scale <= 1) {
                    let data = (copy.scale = parseFloat(copy.scale - 0.25));
                    let find = copy.style.findIndex(data => data.transform);
                    copy.style[find] = { transform: 'scale(' + data + ')' };
                    let findTransform = copy.style.findIndex(
                        data => data['transformOrigin']
                    );
                    copy.style[findTransform] = {
                        transformOrigin: 'top center'
                    };
                } else {
                    let data = (copy.scale = parseFloat(copy.scale - 0.25));
                    let find = copy.style.findIndex(data => data.transform);
                    copy.style[find] = { transform: 'scale(' + data + ')' };
                }
            } else {
                if (copy.scale > 5) {
                    let find = copy.style.findIndex(data => data.transform);
                    copy.style[find] = { transform: 'scale(5)' };
                } else if (copy.scale >= 1) {
                    let data = (copy.scale = parseFloat(copy.scale + 0.25));
                    let find = copy.style.findIndex(data => data.transform);
                    copy.style[find] = { transform: 'scale(' + data + ')' };
                    let findTransform = copy.style.findIndex(
                        data => data['transformOrigin']
                    );
                    copy.style[findTransform] = { transformOrigin: '0 0' };
                } else {
                    let data = (copy.scale = parseFloat(copy.scale + 0.25));
                    let find = copy.style.findIndex(data => data.transform);
                    copy.style[find] = { transform: 'scale(' + data + ')' };
                }
            }
            let copyDisplay=[];
            copyDisplay.push(copy);
            this.props.headerSizeClick(copyDisplay);

            return {
                editMainStyle: copyDisplay
            };

        });
     
    }
    logout() {
        firebase
            .auth()
            .signOut()
            .then(function() {
                console.log('email sign out');
                window.location.pathname = '/dashboard';
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    render() {
        const {
            editMainStyle,
            onDownload,
            onHistory,
            unable,
            loginStatus,
            saveData,
            shareLink,
            projectName,
            onChange,
            onBlur,
            saved
        } = this.props;

        return (
            <div className="editorHeader">
                <NavLink
                    className="editorHeader__left"
                    to="/dashboard"
                >            <img src={logo}></img>
                </NavLink>
                <div className="editorHeader__center">
                    <div className="editorHeader__search">
                        <Input
                            src={edit}
                            type="text"
                            id="headerInput"
                            className="input-control input-edit"
                            value={projectName}
                            onChange={onChange}
                            disabled={unable[2] === true ? false : true}
                            onBlur={onBlur}
                        />
                    </div>
                    <div className="editorHeader__scale">
                        <button
                            id="editorHeader__scale--subtract"
                            data-num="0"
                            onClick={this.headerSizeClick}
                        >
                            -
                        </button>

                        <div
                            className="editorHeader__scale--main"
                            id="editorHeader__scale--main"
                        >
                            {editMainStyle.scale * 100 + '%'}
                        </div>
                        <button
                            id="editorHeader__scale--add"
                            data-num="1"
                            onClick={this.headerSizeClick}
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
                            <img src={unable[0].length === 0?backDark:back} />
                        </button>
                        <button
                            className="editorHeader__redo"
                            onClick={onHistory}
                            data-data="redo"
                            disabled={unable[1].length === 0 ? true : false}
                        >
                            <img src={unable[1].length === 0?nextDark:next}  />
                        </button>
                    </div>
                </div>
                <div className="editorHeader__right">
                    <button
                        className={saved[0]?'editorHeader__button--save':'editorHeader__button--unsave'}
                        onClick={saveData}
                        disabled={saved[0]?true:false}
                    >
                        SAVE
                        <div className={saved[0]?'editorHeader__button--saveHint':'editorHeader__button--saveHint displayOpacity'}>{saved[1]}</div>
                        <div className={saved[0]?'editorHeader__button--saveHint_tringle':'editorHeader__button--saveHint_tringle displayOpacity'}></div>

                    </button>
                    <button
                        className="editorHeader__button--download"
                        onClick={onDownload}
                    >
                        <img src={download} />
                    </button>

                    <button
                        className="editorHeader__button--share"
                        onClick={shareLink}
                    >
                        {' '}
                        <button>
                            {' '}
                            <img src={share} />
                        </button>
                    </button>

                    <div className="editorHeader__member"
                        onMouseEnter={()=>{this.setState({memberButton:true});}}
                        onMouseLeave={()=>{this.setState({memberButton:false});}}
                    >
                        <img src={loginStatus ? loginStatus.photoURL?loginStatus.photoURL:bee : user}className={'editorHeader__member--member'} />
                        <img src={arrow} className={'editorHeader__member--arrow'}></img>
                        <div className={this.state.memberButton?'editorHeader__member--option':'displayNone'}>
                            <div onClick={this.logout}>LOGOUT</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

EditorHeader.propTypes = {
    editMainStyle: PropTypes.any,
    onDownload: PropTypes.func,
    onHistory: PropTypes.func,
    unable: PropTypes.array,
    loginStatus: PropTypes.any,
    saveData: PropTypes.func,
    onBlur: PropTypes.func,
    shareLink:PropTypes.any,
    offline:PropTypes.any,
    projectName:PropTypes.string,
    onChange:PropTypes.func,
    saved:PropTypes.string,
    headerSizeClick: PropTypes.func
};
export default EditorHeader;
