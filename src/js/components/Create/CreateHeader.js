import React from 'react';
import PropTypes from 'prop-types';
import user from '../../../img/user.svg';
import arrow from '../../../img/arrow.svg';
import logo from '../../../img/logo.png';
import { NavLink } from 'react-router-dom';
import bee from '../../../img/bee.png';

const CreateHeader = ({ logout, login,memberButton,handlememberButton }) => {
    console.log(login);
    return (
        <div className="createHeader">
            <NavLink
                className="createHeader__left"
                to="/"
            >            <img src={logo}></img>
            </NavLink>
            <div className="createHeader__center">
              
            </div>
            <div className="createHeader__right">
                <div className="createHeader__member"
                    onMouseEnter={()=>{handlememberButton('true');}}
                    onMouseLeave={()=>{handlememberButton('false');}}
                >
                    <img src={login ? login.photoURL?login.photoURL:bee : user}className={'createHeader__member--member'} />
                    <img src={arrow} className={login?'createHeader__member--arrow':'displayNone'}></img>
                    <div className={memberButton==='true'&&login?'createHeader__member--option':'displayNone'}>
                        <div onClick={logout}>LOGOUT</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

CreateHeader.propTypes = {
    logout: PropTypes.func,
    login: PropTypes.any,
    memberButton: PropTypes.string,
    handlememberButton: PropTypes.func,
   
};
export default CreateHeader;
