import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import icon from '../../../img/icon.png';
import screen from '../../../img/screen.png';
import screenText02 from '../../../img/screenText02.png';
import screenText from '../../../img/screenText.png';
import screenImage from '../../../img/screenImage.png';
import screenImage02 from '../../../img/bee.png';
import finger from '../../../img/finger.png';

import { authInfomation } from '../element/auth';
require('firebase/auth');

require('firebase/database');
import Loading from '../element/Loading';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }
    componentDidMount() {
        let authCheck = data => {
            // //console.log(data);
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
                                跟朋友們一起來製作美麗的圖像吧！
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
                        <div className="screen">
                            <img src={screen} />
                            <div>
                                <div className="screen--image02">
                                    <img src={screenImage02} />
                                </div>
                                <div className="screen--image">
                                    <img src={screenImage} />
                                </div>
                                <div className="screen--text02">
                                    <img src={screenText02} />
                                </div>
                                <div className="screen--text">
                                    <img src={screenText} />
                                </div>
                                <div className="finger" >
                                    <img src={finger} />

                                </div>
                                <div className="flower" >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
Home.propTypes = {
    getUserData: PropTypes.func.isRequired,
    loginStatus: PropTypes.any,
    userData: PropTypes.any
};
export default Home;
