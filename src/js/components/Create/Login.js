import React, { Component } from 'react';
import Input from '../element/Input';
import user from '../../../img/user.svg';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
require('firebase/auth');
import { initFirebase, connectFetch } from '../element/constant';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            connect: null,
            storage: null
        };
        this.signupWithEmail = this.signupWithEmail.bind(this);
        this.loginWithEmail = this.loginWithEmail.bind(this);
        this.loginWithFB = this.loginWithFB.bind(this);
        this.loginWithGoogle = this.loginWithGoogle.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    componentDidMount() {
        let storage;
        if (!firebase.apps.length) {
            let connect = initFirebase();
            storage = connect.storage();
            this.setState({
                connect: connect,
                storage: storage
            });
        }
        storage = firebase.storage();
        this.setState({
            storage: storage
        });
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log('有登入');
                let data = {
                    id: user.uid
                };
                console.log(user);
                let target = '/app/getAccount';
                let payload = {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                };
                let getMemberData = data => {
                    let imgUrl = {};
                    data.project.map(projectdata => {
                        console.log(projectdata.projectId);
                        storage
                            .ref(projectdata.projectId + '/canvas.png')
                            .getDownloadURL()
                            .then(url => {
                                imgUrl[projectdata.projectId] = url;
                                if (
                                    Object.keys(imgUrl).length ===
                                    data.project.length
                                ) {
                                    console.log(imgUrl);

                                    this.props.checkLogin(
                                        user,
                                        data,
                                        this.state.connect,
                                        imgUrl
                                    );
                                    this.props.loading();
                                }
                                // console.log(data.project);
                            })
                            .catch(function(error) {
                                console.log(error);
                            });
                    });
                    console.log(user, data);
                };
                console.log('在這裡');

                connectFetch(target, payload, getMemberData);
            } else {
                this.props.loading();
                console.log('沒有登入');
            }
        });
    }

    handleInput(e, type) {
        this.setState({
            [type]: e.currentTarget.value
        });
    }
    loginWithFB() {
        let provider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(function(result) {
                console.log(result);
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
            })
            .catch(function(error) {
                // Handle Errors here.
                console.log(error);
            });
    }
    loginWithGoogle() {
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(function(result) {
                console.log(result);
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
        if (password.length < 4) {
            alert('請輸入密碼');
            return;
        }
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(e => {
                console.log(e);
            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        return (
            <div className="login">
                <div className="login__main">
                    <div className="login__inner">
                        <Input
                            src={user}
                            type="text"
                            id="loginUser"
                            className="input-login input-control"
                            onChange={e => {
                                this.handleInput(e, 'userName');
                            }}
                            value={this.state.userName}
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
                        />
                        <div className="login__buttons">
                            <button
                                className="login__button"
                                onClick={this.signupWithEmail}
                            >
                                Register
                            </button>
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
                            Facebook
                        </button>
                        <button
                            className="login__google"
                            onClick={this.loginWithGoogle}
                        >
                            Google
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
Login.propTypes = {
    checkLogin: PropTypes.func.isRequired,
    loading: PropTypes.any
};
export default Login;
