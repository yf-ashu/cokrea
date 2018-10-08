import React, { Component } from 'react';
import Login from '../Create/Login';
import CreateHeader from '../Create/CreateHeader';
import CreateMain from '../Create/CreateMain';
import PropTypes from 'prop-types';

import firebase from 'firebase/app';
require('firebase/auth');

class Create extends Component {
    constructor(props) {
        super(props);
        this.checkLogin = this.checkLogin.bind(this);
        this.logout = this.logout.bind(this);
    }

  
    checkLogin(loginData,userData) {
        this.props.getUserData(loginData,userData);
  
    }
    logout() {
        let that = this;
        firebase
            .auth()
            .signOut()
            .then(function() {
                console.log('email sign out');
                let loginData=null;
                let userData=null;
                that.props.getUserData(loginData,userData);

            })
            .catch(function(error) {
                console.log(error);
            });
    }

 
    render() {
        // console.log(this.props.loginStatus);
        // console.log(this.props.userData);

        let displayItem = '';
        
        if (!this.props.loginStatus) {
            displayItem = <Login checkLogin={this.checkLogin.bind(this)}/>;
        } else {
            displayItem = (
                <CreateMain
                    userData={this.props.userData}
                />
            );
        }
        return (
            <div className="create">
                <CreateHeader
                    login={this.props.loginStatus}
                    logout={this.logout}
                />
                {displayItem}
            </div>
        );
    }
}
Create.propTypes = {
    getUserData: PropTypes.func.isRequired,
    loginStatus:PropTypes.any,
    userData:PropTypes.any
  
};
export default Create;
