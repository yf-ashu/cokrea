import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Editor from './components/container/Editor';
import Create from './components/container/Create';
import Public from './components/container/Public';
import Home from './components/container/Home';
import Login from './components/create/Login';

import { connectFetch } from './components/element/constant';
class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginStatus: null,
            userData: null,
            database: null,
            projectImg: null
        };
        this.getUserData = this.getUserData.bind(this);
        this.changeProjectName = this.changeProjectName.bind(this);
        this.handleDeleteProject = this.handleDeleteProject.bind(this);
    }
    componentDidUpdate(){
        console.log('改變了');
    }

    handleDeleteProject(project, id) {
        console.log(this.state.database);
        let data = {
            userEmail: this.state.loginStatus.email,
            userId: this.state.loginStatus.uid,
            project: project.project
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
            this.setState({
                userData: data
            });
        };
        connectFetch(target, payload, getMemberData);
        this.state.database.ref('/projectData/' + id).set(null);
    }
    changeProjectName(name, id) {
        console.log(this.state.loginStatus);
        let data = {
            userEmail: this.state.loginStatus.email,
            userId: this.state.loginStatus.uid,
            projectId: id,
            projectName: name
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
            this.setState({
                userData: data
            });
        };
        console.log('收到更改');
        connectFetch(target, payload, getMemberData);
        console.log(this.state.userData);
    }
    getUserData(loginStatusout, userDataout, databaseout, projectImgout) {
        console.log('有傳送');
        let loginStatus = this.state.loginStatus,
            userData = this.state.userData,
            database = this.state.database,
            projectImg = this.state.projectImg;
        if (loginStatusout) {
            console.log('有送入1');
            loginStatus = loginStatusout;
        }
        if (userDataout) {
            console.log('有送入');
            userData = userDataout;
        }
        if (databaseout) {
            database = databaseout;
        }
        if (projectImgout) {
            projectImg = projectImgout;
        }
        this.setState({
            loginStatus: loginStatus,
            userData: userData,
            database: database,
            projectImg: projectImg
        });
    }
    logout() {
        this.setState({
            database: null,
            loginStatus: null,
            userData: null,
            projectImg: null
        });
    }
    render() {
        console.log(this.state.userData);
        console.log(this.state.loginStatus);
        console.log(this.state.database);
        console.log(this.state.projectImg);
        let projectData = location.pathname.split('/')[1];
        console.log(projectData);
        // if(this.state.loginStatus || this.state.userData){
        //   window.location.pathname = '/dashboard';
        // }

        return (
            <BrowserRouter>
                <div className="main">
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={() => (
                                <Home
                                    getUserData={this.getUserData}
                                    userData={this.state.userData}
                                    loginStatus={this.state.loginStatus}
                                />
                            )}
                        />

                        <Route
                            path="/login"
                            exact
                            render={() => (
                                <Login
                                    getUserData={this.getUserData}
                                    loading={() => {
                                        this.setState({ loading: false });
                                    }}
                                    userData={this.state.userData}
                                    loginStatus={this.state.loginStatus}
                                />
                            )}
                        />
                        <Route
                            path="/signup"
                            exact
                            render={() => (
                                <Login
                                    getUserData={this.getUserData}
                                    loading={() => {
                                        this.setState({ loading: false });
                                    }}
                                    userData={this.state.userData}
                                    loginStatus={this.state.loginStatus}
                                />
                            )}
                        />

                        <Route
                            path="/dashboard"
                            exact
                            render={() => (
                                <Create
                                    getUserData={this.getUserData}
                                    userData={this.state.userData}
                                    loginStatus={this.state.loginStatus}
                                    projectImg={this.state.projectImg}
                                    handleDeleteProject={
                                        this.handleDeleteProject
                                    }
                                    logout={this.logout.bind(this)}
                                />
                            )}
                        />

                        <Route
                            path="/dashboard/edit/:id"
                            exact
                            render={() => (
                                <Editor
                                    userData={this.state.userData}
                                    loginStatus={this.state.loginStatus}
                                    changeProjectName={this.changeProjectName}
                                    getUserData={this.getUserData}
                                    projectImg={this.state.projectImg}

                                />
                            )}
                        />
                        <Route
                            path="/views/:id"
                            exact
                            render={() => (
                                <Public database={this.state.database} />
                            )}
                        />
                    </Switch>{' '}
                </div>
            </BrowserRouter>
        );
    }
}
export default Layout;
