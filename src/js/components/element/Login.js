import React, { Component } from 'react';
import Input from './Input';
import user from '../../../img/user.svg';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
require('firebase/auth');
import { connectFetch } from './constant';
import {  authInfomation } from './auth';
import CreateHeader from '../Create/CreateHeader';
import Loading from './loading';
import { Redirect, NavLink } from 'react-router-dom';
import iconColor from '../../../img/icon-color.png';

class Login extends Component {
    constructor(props) {
        +super(props);
        this.state = {
            userName: '',
            password: '',
            database: null,
            storage: null,
            loading: true
        };
        this.signupWithEmail = this.signupWithEmail.bind(this);
        this.loginWithEmail = this.loginWithEmail.bind(this);
        this.loginWithFB = this.loginWithFB.bind(this);
        this.loginWithGoogle = this.loginWithGoogle.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    componentDidMount() {
       
        let authCheck = data => {
            console.log(data);
            if (data) {
                this.props.getUserData(data[0], data[1], data[2], data[3]);
            } else {
                this.setState({
                    loading: false
                });
            }
        };

        authInfomation(authCheck);
    }

    handleInput(e, type) {
        this.setState({
            [type]: e.currentTarget.value
        });
    }
    addTodatabase(result){
        let data = {
            userEmail: result.user.providerData[0].email,
            userId: result.user.uid,
            providerId: result.user.providerData[0].providerId
        };
        let target = '/app/manageAccount';
        let payload = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        };
        let getMemberData = data => {
            console.log('有', data);
        };
        connectFetch(target, payload, getMemberData);
    }
    loginWithFB() {
        let that=this;
        let provider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(function(result) {
                that.addTodatabase(result);
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    loginWithGoogle() {
        let that=this;

        let provider = new firebase.auth.GoogleAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(function(result) {
                that.addTodatabase(result);
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    loginWithEmail() {
        let email = this.state.userName;
        let password = this.state.password;
        if (!email || !password) return alert('請輸入');
        let mailForm = /^[\w]+@[\w_]+(\.\w{2,4})/;
        if (!mailForm.test(email)) {
            return alert('格式錯誤');
        }

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(function(result) {
                console.log('創完了');

                console.log(result);
            })
            .catch(function(error) {
                if (
                    error.code == 'auth/invalid-email' ||
                    error.code == 'auth/user-not-found'
                ) {
                    alert('查無此Email。');
                } else if (error.code == 'auth/wrong-password') {
                    alert('密碼錯誤，請重新輸入。');
                } else {
                    alert(error.message, false);
                }
                console.log(error);
            });
    }
    signupWithEmail() {
        let email = this.state.userName;
        let password = this.state.password;

        let mailForm = /^[\w]+@[\w_]+(\.\w{2,4})/;
        if (!email || !password) return alert('請輸入');
        if (!mailForm.test(email)) {
            alert('格式錯誤');
            return;
        }
        if (password.length < 7) {
            alert('請輸入密碼');
            return;
        }let that=this;
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(function(result)  {
                alert('註冊成功並自動登入');
                that.addTodatabase(result);
                console.log(result);
            })
            .catch(error => { 
                console.log('再觀察');
                console.log(error);
            });
    }
    render() {
        if (this.props.loginStatus && this.props.userData) {
            return <Redirect to="/dashboard" />;
        }
        let address = location.pathname.split('/')[1];
        console.log(address);
        return (
            <div className="login">
                <Loading loading={this.state.loading} />
                <CreateHeader
                    login={this.props.loginStatus}
                    logout={this.logout}
                    memberButton={this.state.memberButton}
                    handlememberButton={e => {
                        this.setState({
                            memberButton: e
                        });
                    }}
                />

                {address==='login'?(
                    <div className="loginMain">
                        <div className="login__main">
                            <div className="login__inner">
                                <img src={iconColor} />
                                <Input
                                    src={user}
                                    type="text"
                                    id="loginUser"
                                    className="input-login input-control"
                                    onChange={e => {
                                        this.handleInput(e, 'userName');
                                    }}
                                    value={this.state.userName}
                                    text="Email"
                                />
                                <Input
                                    src={user}
                                    type="password"
                                    id="loginPwd"
                                    className="input-login input-control"
                                    onChange={e => {
                                        this.handleInput(e, 'password');
                                    }}
                                    value={this.state.password}
                                    text="Password"
                                />
                                <div className="login__buttons">
                        
                                    <button
                                        className="login__button"
                                        onClick={this.loginWithEmail}
                                    >
                                        Login
                                    </button>
                                </div>
                                <div className="login__line" />
                                <button
                                    className="login__fb"
                                    onClick={this.loginWithFB}
                                >
                                    Login with Facebook
                                </button>
                                <button
                                    className="login__google"
                                    onClick={this.loginWithGoogle}
                                >
                                    Login with Google
                                </button>
                                <NavLink to="/signup" className="login__link">
                                    New here? Create an account.
                                </NavLink>
                            </div>
                        </div>
                    </div>):

                    (       <div className="loginMain">
                        <div className="login__main">
                            <div className="login__inner">
                                <img src={iconColor} />
                                <Input
                                    src={user}
                                    type="text"
                                    id="loginUser"
                                    className="input-login input-control"
                                    onChange={e => {
                                        this.handleInput(e, 'userName');
                                    }}
                                    value={this.state.userName}
                                    text="Email"
                                />
                                <Input
                                    src={user}
                                    type="password"
                                    id="loginPwd"
                                    className="input-login input-control"
                                    onChange={e => {
                                        this.handleInput(e, 'password');
                                    }}
                                    value={this.state.password}
                                    text="Password"
                                    placeholder="at least 6 characters."
                                />
                                <div className="login__buttons">
                            
                                    <button
                                        className="login__button"
                                        onClick={this.signupWithEmail}
                                    >
                                    Signup
                                    </button>
                                </div>
                           
                            </div>
                        </div>
                    </div>)
                }
            </div>
        );
    }
}
Login.propTypes = {
    getUserData: PropTypes.func.isRequired,
    loading: PropTypes.any,
    loginStatus: PropTypes.string,
    userData: PropTypes.string
};
export default Login;
