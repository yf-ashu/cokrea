import React, { Component } from 'react';
import CreateMainItem from './CreateMainItem';
import { connectFetch, random ,initFirebase} from '../element/constant';
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
    componentDidMount() {
        let projectCheck;
        if (this.props.userData.project) {
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
            this.state.project.length === 0 ? [] : this.state.project;
        let data = {
            projectId: projectId,
            link: '/edit/' + projectId,
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
        let getMemberData = () => {
            if (!firebase.apps.length) {
                initFirebase();
              
            }
            let storage = firebase.storage();
            console.log(storage);
            //    storage
            //    .ref('init.png')
            //    .getDownloadURL()
            //    .then(url => {
            //        console.log(url)
            let url=
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=';
            firebase.storage().ref().child(projectId + '/canvas.png')
                .putString(url, 'data_url')
                .then(function() {
                    console.log('Uploaded a base64url string!');
                });
            //    })

           
        };
        connectFetch(target, payload, getMemberData);
    }

   
   
    render() {
        let createMain = this.state.project.map(data => {
            // console.log(data);
            let id=data.projectId;
            return (
                <CreateMainItem
                    key={data.projectId}
                    linkTo={data.link}
                    id={data.projectId}
                    project={data}
                    projectImg={this.props.projectImg?this.props.projectImg[id]:null}
                />
            );
        });
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
                    </div>
                    <div className="createMainItem__bottom" />
                </div>
                {createMain}
            </div>
        );
    }
}
CreateMain.propTypes = {
    userData: PropTypes.any.isRequired,
    projectImg:PropTypes.object
};
export default CreateMain;
