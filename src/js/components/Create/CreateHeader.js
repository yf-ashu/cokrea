import React from 'react';
import PropTypes from 'prop-types';
// import Input from '../element/Input';
// import search from '../../../img/search.svg';
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
                {' '}
                {/* <div className={login?'createHeader__search':'createHeader__search displayNone'}>
                    <Input
                        src={search}
                        type="text"
                        id="searchInput"
                        className="input-control input-edit"
                    />
                </div> */}
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
    // onHistory: PropTypes.func,
    // unable: PropTypes.array

    // textContent: PropTypes.any
};
export default CreateHeader;
