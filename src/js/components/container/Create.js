import React, { Component } from 'react';
import Login from '../Create/Login';
import CreateHeader from '../Create/CreateHeader';
import CreateMain from '../Create/CreateMain';
import PropTypes from 'prop-types';

import firebase from 'firebase/app';
import Loading from '../element/loading';
require('firebase/auth');

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:true
          
        };
        this.checkLogin = this.checkLogin.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        // database
        // .ref('temp/' + projectData + '/nowclick/' + user.uid)
        // .set(null);
        this.props.loginStatus&&this.props.userData?this.setState({
            loading:false
        }):null;
        console.log('有進來',this.props.loginStatus);
    }
    
    checkLogin(loginData,userData,database,projectImg) {
        this.props.getUserData(loginData,userData,database,projectImg);
        console.log('拿到使用者資料');

  
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
                that.props.getUserData(loginData,userData,null);

            })
            .catch(function(error) {
                console.log(error);
            });
    }

   
 
    render() {
        // console.log(this.props.loginStatus);
        // console.log(this.props.userData);

        let displayItem = '';
        
        if (!this.props.loginStatus||!this.props.userData) {
            displayItem = <Login checkLogin={this.checkLogin.bind(this)}
                loading={()=>{this.setState({loading:false});}}
            />;
        } else {
            displayItem = (
                <CreateMain
                    userData={this.props.userData}
                    projectImg={this.props.projectImg}
                />
            );
        }
        return (
            <div className="create">
                <Loading loading={this.state.loading}/>
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
    userData:PropTypes.any,
    projectImg:PropTypes.object
  
};
export default Create;
