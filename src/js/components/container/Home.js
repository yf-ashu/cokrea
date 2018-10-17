import React, { Component } from 'react';
import icon from '../../../img/icon.png';
import { NavLink, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import firebase from 'firebase/app';
import { initFirebase, authInfomation } from '../element/auth';
require('firebase/auth');

require('firebase/database');
import Loading from '../element/loading';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }
    componentDidMount() {
        let storage, database;
        if (!firebase.apps.length) {
            let connect = initFirebase();
            database = connect.database();
            storage = connect.storage();
            this.setState({
                database: database,
                storage: storage
            });
        }
        database = firebase.database();
        storage = firebase.storage();
        this.setState({
            database: database,
            storage: storage
        });
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
        if (this.props.loginStatus === null || this.props.userData === null) {
            authInfomation(authCheck);
        }
    }

    render() {
        if (this.props.loginStatus || this.props.userData) {
            return <Redirect to="/dashboard" />;
        }
        return (
            <div className="home">
                <Loading loading={this.state.loading} />

                <div className="home__header">
                    <div className="home__header--logo">
                        <img src={icon} />
                    </div>
                    <div className="home__header--login">
                        <NavLink className="home__header--link" to="/login">
                            {' '}
                            Log In
                        </NavLink>
                    </div>
                </div>
                <div className="home__main">
                    <div className="home__text">
                        <div className="home__text--inner">
                            <div className="home__title">
                                <span>Cowork</span> <br />
                                inspire your kreations !
                            </div>
                            <div className="home__subtitle">
                                用簡單的方式來製作美麗的圖像吧！
                            </div>
                            <button className="home__main--login">
                                {' '}
                                <NavLink
                                    className="home__header--link"
                                    to="/login"
                                >
                                    {' '}
                                    Login to START{' '}
                                </NavLink>
                            </button>
                        </div>
                    </div>

                    <div className="home__image">
                        <div className="webpage">
                            <div className="screen" />
                            <div className="screen--text02" />

                            <div className="screen--text" />
                            <div className="screen--image02" />

                            <div className="screen--image" />
                            <div className="finger" />


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
Home.propTypes = {
    getUserData: PropTypes.func.isRequired,
    loginStatus:PropTypes.any,
    userData:PropTypes.any
};
export default Home;
