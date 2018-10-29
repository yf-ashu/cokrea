import React, { Component } from 'react';
import CreateHeader from '../Create/CreateHeader';
import { initFirebase } from '../element/auth';
import firebase from 'firebase/app';
import Loading from '../element/Loading';
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
        database.ref('/public/' + projectData).off();
        database.ref('/public/' + projectData).on('value', snapshot => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                this.setState({
                    projectData: snapshot.val(),
                    display: snapshot.val().display,
                    editMainStyle: snapshot.val().editMainStyle,
                    loading: false
                });
            } else {
                // location.reload()
                this.setState({
                    projectData: 'No allow',
                    loading: false
                });
            }
        });
    }
    render() {
        let item = this.state.display
            ? this.state.display.map((data, index) => {
                let Tag = data.tag;
                return (
                    <div
                        key={index}
                        className={
                            this.state.projectData === 'No allow'
                                ? 'displayNone'
                                : 'public__items'
                        }
                        style={Object.assign({}, ...data.outside)}
                    >
                        <Tag
                            className={
                                this.state.projectData === 'No allow'
                                    ? 'displayNone'
                                    : 'public__item'
                            }
                            type={data.attribute.type}
                            style={Object.assign({}, ...data.style)}
                            src={data.attribute.src}
                        >
                            {data.tag !== 'img' ? data.textContent : null}
                        </Tag>
                    </div>
                );
            })
            : null;
        console.log(item);
        return (
            <div className="public__views">
                <Loading loading={this.state.loading} />
      
                <CreateHeader />
                <div className="public__outer">
                    <div
                        className={
                            this.state.projectData === 'No allow'
                                ? 'displayNone'
                                : 'public__canvas'
                        }
                        style={
                            this.state.editMainStyle
                                ? Object.assign(
                                    {},
                                    ...this.state.editMainStyle[0].style
                                )
                                : null
                        }
                    >
                        {' '}
                        {item}
                    </div>
                    <div
                        className={
                            this.state.projectData === 'No allow'
                                ? 'public__close'
                                : 'displayNone'
                        }
                    >   
                        <div className="public__close--inner">此編輯頁面非公開</div>
                    </div>
                </div>
            </div>
        );
    }
}
Public.propTypes = {
  
};
export default Public;
