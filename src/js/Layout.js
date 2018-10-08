import React, { Component } from 'react';
import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom';
import Editor from './components/container/Editor';
import Create from './components/container/Create';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginStatus: null,
            projectID: null,
            userData: null
        };
        this.getUserData = this.getUserData.bind(this);
    }
  
    getUserData(loginData, userdata) {
        this.setState({
            loginStatus: loginData,
            userData: userdata
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
                                />
                            )}
                        />
                        <Route
                            path="/edit/:id"
                    
                            render={() => (
                                <Editor
                                    userData={this.state.userData}
                                    loginStatus={this.state.loginStatus}
                                />
                            )}
                        />
                    </Switch>{' '}
                </div>
            </BrowserRouter>
        );
    }
}
export default Layout;
