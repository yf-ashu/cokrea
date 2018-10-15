import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Editor from './components/container/Editor';
import Create from './components/container/Create';
import Public from './components/container/Public';
import {
    connectFetch
} from './components/element/constant';
class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginStatus: null,
            userData: null,
            database: null,
            projectImg:null
        };
        this.getUserData = this.getUserData.bind(this);
        this.changeProjectName=this.changeProjectName.bind(this);
    }
    changeProjectName(name,id){
        console.log(this.state.loginStatus);
        let data = {
            userEmail: this.state.loginStatus.email,
            userId: this.state.loginStatus.uid,
            projectId:id,
            projectName:name
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
        console.log('收到更改');
        connectFetch(target, payload, getMemberData);
    }
    getUserData(loginStatus, userData, database,projectImg) {
        console.log(loginStatus);
        this.setState({
            loginStatus: loginStatus,
            userData: userData,
            database: database,
            projectImg:projectImg
        });
    }
    render() {
        return (
            <BrowserRouter>
                <div className="main">
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={() => (
                                <Create
                                    getUserData={this.getUserData}
                                    userData={this.state.userData}
                                    loginStatus={this.state.loginStatus}
                                    projectImg={this.state.projectImg}
                                />
                            )}
                        />
                        <Route
                            path="/edit/:id"
                            exact
                            render={() => (
                                <Editor
                                    userData={this.state.userData}
                                    loginStatus={this.state.loginStatus}
                                    changeProjectName={this.changeProjectName}
                                    getUserData={this.getUserData}
                                />
                            )}
                        />
                        <Route path="/views/:id"exact render={() => <Public database={this.state.database}/>} />
                    </Switch>{' '}
                </div>
            </BrowserRouter>
        );
    }
}
export default Layout;
