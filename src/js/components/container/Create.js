import React, { Component } from 'react';
import CreateHeader from '../Create/CreateHeader';
import CreateMain from '../Create/CreateMain';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { initFirebase, authInfomation } from '../element/auth';
import Loading from '../element/loading';

import firebase from 'firebase/app';
require('firebase/auth');

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            memberButton: 'false',
            logout: false,
            loading: true,
            unloadAction: null
        };
        this.checkLogin = this.checkLogin.bind(this);
        this.logout = this.logout.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.initCheck = this.initCheck.bind(this);
    }

    componentDidMount() {
        console.log();
        let unloadAction = e => {


            let storage = firebase.storage().ref();
            Object.keys(that.props.projectImg).map(projectData => {
                console.log(that.props.projectImg[projectData].split(':')[0]);
                if (
                    that.props.projectImg[projectData].split(':')[0]==='data'
                ) {
                    console.log('上傳')

let image=new Image();
image.src=that.props.projectImg[projectData]
console.log(image.size)

                    storage
                        .child(projectData + '/canvas.png')
                        .putString(that.props.projectImg[projectData], 'data_url')
                        .then(function() {
                            console.log('Uploaded a base64url string!');
                        });
                }
            });
            e.preventDefault();
            e.returnValue = '';
        };
        let that = this;
        window.addEventListener('beforeunload', unloadAction);
        this.setState({
            unloadAction: unloadAction
        });
        if (this.props.userData === null || this.props.loginStatus === null) {
            console.log('都沒有3');
            this.initCheck();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.state.unloadAction);
    }
    initCheck() {
        if (!firebase.apps.length) {
            initFirebase();
        }

        let authCheck = data => {
            console.log('要檔案');
            if (data) {
                this.props.getUserData(data[0], data[1], data[2], data[3]);
                setTimeout(() => {
                    this.setState({
                        loading: false
                    });
                }, 700);
            } else {
                // location.pathname='/'
                this.setState({
                    logout: true
                });
            }
        };
        authInfomation(authCheck);
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            nextProps.userData !== prevState.userData &&
            nextProps.userData !== null
        ) {
            console.log('有改變');
            return {
                loading: false
            };
        } else if (
            nextProps.userData !== prevState.userData &&
            nextProps.userData === null &&
            nextProps.loginStatus === null
        ) {
            console.log(nextProps.userData);
            console.log('都沒有');

            return {};
        } else return null;
    }
    componentDidUpdate() {
        if (this.props.userData === null || this.props.loginStatus === null) {
            console.log('都沒有2');
        }
    }
    checkLogin(loginData, userData, database, projectImg) {
        console.log('要檔案２');
        this.props.getUserData(loginData, userData, database, projectImg);
    }
    logout() {
        firebase
            .auth()
            .signOut()
            .then(() => {
                console.log('email sign out');
                this.setState({
                    logout: true
                });
                this.props.logout();
            })

            .catch(function(error) {
                console.log(error);
            });
    }
    deleteProject(e) {
        let copy = Object.assign({}, this.props.userData);
        let find = copy.project.findIndex(data => {
            return data.projectId === e.currentTarget.dataset.data;
        });
        alert('確認刪除');
        console.log(find);
        copy.project.splice(find, 1);
        this.props.handleDeleteProject(copy, e.currentTarget.dataset.data);
    }

    render() {
        console.log(this.props.loginStatus);
        console.log(this.props.userData);

        let displayItem = '';

        if (
            this.state.logout === true &&
            !this.props.loginStatus &&
            !this.props.userData
        ) {
            return <Redirect to="/" />;
        } else if (
            this.props.loginStatus === null ||
            this.props.userData === null
        ) {
            console.log('測看看3');
        } else {
            console.log('測看看２');

            displayItem = (
                <CreateMain
                    userData={this.props.userData}
                    projectImg={this.props.projectImg}
                    deleteProject={this.deleteProject}
                    checkLogin={this.checkLogin.bind(this)}
                />
            );
        }
        return (
            <div className="create">
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
                {displayItem}
            </div>
        );
    }
}
Create.propTypes = {
    getUserData: PropTypes.func.isRequired,
    loginStatus: PropTypes.any,
    userData: PropTypes.any,
    projectImg: PropTypes.object,
    logout: PropTypes.func.isRequired,
    handleDeleteProject: PropTypes.func.isRequired
};
export default Create;
