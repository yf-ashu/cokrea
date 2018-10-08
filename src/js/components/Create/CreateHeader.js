import React from 'react';
import PropTypes from 'prop-types';
import Input from '../element/Input';
import search from '../../../img/search.svg';
import user from '../../../img/user.svg';

const CreateHeader = ({ logout, login }) => {
    console.log(login);
    return (
        <div className="createHeader">
            <div className="createHeader__left"> </div>
            <div className="createHeader__center">
                {' '}
                <div className={login?'createHeader__search':'createHeader__search displayNone'}>
                    <Input
                        src={search}
                        type="text"
                        id="searchInput"
                        className="input-control input-edit"
                    />
                </div>
            </div>
            <div className="createHeader__right">
                <div className="createHeader__member">
                    <img src={login?login.photoURL:user} />
                </div>
                <button onClick={logout} className={login?'':'displayNone'}>Logout</button>
            </div>
        </div>
    );
};

CreateHeader.propTypes = {
    logout: PropTypes.func,
    login: PropTypes.any
    // onClick: PropTypes.func,
    // onSave: PropTypes.func,
    // onHistory: PropTypes.func,
    // unable: PropTypes.array

    // textContent: PropTypes.any
};
export default CreateHeader;
