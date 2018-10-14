import React, { Component } from 'react';
import CreateHeader from '../Create/CreateHeader';
import { initFirebase } from '../element/constant';
import firebase from 'firebase/app';
import Loading from '../element/loading';
require('firebase/database');
class Public extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            projectData: null,
            display: [],
            editMainStyle: null
        };
    }

    componentDidMount() {
        let database;
        if (!firebase.apps.length) {
            let connect = initFirebase();
            database = connect.database();
        } else {
            database = firebase.database();
        }
        let projectData = location.href.split('views/')[1];
        database.ref('/public/' + projectData).on('value', snapshot => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                this.setState({
                    projectData: snapshot.val(),
                    display: snapshot.val().display,
                    editMainStyle: snapshot.val().editMainStyle,
                    loading:false
                });
            }else{
                this.setState({
                    projectData:'No allow'
                }); 
            }
        });
    }
    render() {
        let item = (this.state.display?this.state.display:[]).map((data,index) => {
            let Tag = data.tag;
            return (
                <div
                    key={index}
                    className="public__items"
                    style={Object.assign({}, ...data.outside)}
                >
                    <Tag
                        className='public__item'
                        type={data.attribute.type}
                        style={Object.assign({}, ...data.style)}
                        src={data.attribute.src}
                    >{data.tag!=='img'?data.textContent:null}</Tag>
                </div>
            );
        });
        return (
            <div className="public__views">
                <Loading loading={this.state.loading} />
                {this.state.projectData==='No allow'?alert('沒有公開存取'):null}
                <CreateHeader />
                <div className="public__outer">
                    <div
                        className="public__canvas"
                        style={
                            this.state.editMainStyle
                                ? Object.assign(
                                    {},
                                    ...this.state.editMainStyle[0].style
                                )
                                : null
                        }
                    >
                        {item}
                    </div>
                </div>
            </div>
        );
    }
}
Public.propTypes = {
    // getUserData: PropTypes.func.isRequired,
    // loginStatus:PropTypes.any,
    // userData:PropTypes.any
};
export default Public;
