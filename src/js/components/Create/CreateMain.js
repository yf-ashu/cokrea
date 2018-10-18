import React, { Component } from 'react';
import CreateMainItem from './CreateMainItem';
import { connectFetch, random } from '../element/constant';
import { initFirebase } from '../element/auth';

import PropTypes from 'prop-types';
import firebase from 'firebase/app';

require('firebase/storage');
class CreateMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: [], //畫面要顯示的東西
            projectName: 'New Project'
        };
        this.addNewProject = this.addNewProject.bind(this);
       

    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            nextProps.userData !== prevState.userData && nextProps.userData!==null
        ) {
            return {
                project: nextProps.userData.project?nextProps.userData.project:[]
            };
        } else return null;
    }
    componentDidMount() {
        let projectCheck;
        if (this.props.userData) {
            //拿到projectid 名稱
            projectCheck = this.props.userData.project;
        } else {
            projectCheck = [];
        }
        this.setState({
            project: projectCheck
        });
    }
    addNewProject() {
        let projectId = random();
        let projectArray =
        this.props.userData.project ?  this.props.userData.project:[];
        let data = {
            projectId: projectId,
            link: '/dashboard/edit/' + projectId,
            contentEditable: false,
            projectName: this.state.projectName
        };
        projectArray.unshift(data);
        this.setState({
            project: projectArray
        });
        console.log(projectArray);
        //送使用者名字跟
        let sendData = {
            project: projectArray,
            userId: this.props.userData.userId,
            newItem: projectArray[0].projectId,
            projectName: this.state.projectName
        };
        let target = '/app/addNewProject';
        let payload = {
            method: 'POST',
            body: JSON.stringify(sendData),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        };
        let getMemberData = (data) => {
            if (!firebase.apps.length) {
                initFirebase();
              
            }
            let storage = firebase.storage();
            console.log(storage);
         
            let url=
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
            firebase.storage().ref().child(projectId + '/canvas.png')
                .putString(url, 'data_url')
                .then(function() {
                    console.log('Uploaded a base64url string!');
                });
            console.log(data);
            this.props.checkLogin(null,data,null,null);
        };
        connectFetch(target, payload, getMemberData);
    }

   
   
    render() {
        // console.log(this.props.userData.project);
        let createMain = this.state.project?this.state.project.map(data => {
            let id=data.projectId;
            return (
                <CreateMainItem
                    key={data.projectId}
                    linkTo={data.link}
                    id={data.projectId}
                    project={data}
                    projectImg={this.props.projectImg?this.props.projectImg[id]:null}
                    deleteProject={this.props.deleteProject}
                />
            );
        }):null;
        return (
            <div className="createMain">
                <div className="createMainItem">
                    <div className="createMainItem__inner">
                        <div
                            className="createMainItem__default"
                            onClick={this.addNewProject}
                        >
                            <span />
                            <span />
                        </div>
                        <span>click + add new project</span>
                    </div>
                    <div className="createMainItem__bottom" />
                </div>
                {createMain}
            </div>
        );
    }
}
CreateMain.propTypes = {
    userData: PropTypes.any,
    projectImg:PropTypes.object,
    checkLogin: PropTypes.func,
    deleteProject: PropTypes.func
};
export default CreateMain;
