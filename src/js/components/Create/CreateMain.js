import React, { Component } from 'react';
import CreateMainItem from './CreateMainItem';
import CreateMainSideItem from './CreateMainSideItem';
import sample from '../element/sample.json';
import triangle from '../../../img/triangle.png';

import { connectFetch, random } from '../element/constant';
import { initFirebase } from '../element/auth';

import PropTypes from 'prop-types';
import firebase from 'firebase/app';

require('firebase/storage');
class CreateMain extends Component {
    constructor(props) {
        super(props);
        this.createMain= React.createRef();
        this.state = {
            project: [], //畫面要顯示的東西
            projectName: 'New Project',
            contorllSideBar: false
        };
        this.addNewProject = this.addNewProject.bind(this);
        this.contorllSideBar = this.contorllSideBar.bind(this);
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            nextProps.userData !== prevState.userData &&
            nextProps.userData !== null
        ) {
            return {
                project: nextProps.userData.project
                    ? nextProps.userData.project
                    : []
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
    contorllSideBar() {
        let select = this.createMain.current;
        console.log(this.createMain);
        if (this.state.contorllSideBar) {
            select.style.gridTemplateColumns = '60px 5fr';
        } else {
            select.style.gridTemplateColumns = '300px 5fr';
        }
        this.setState({
            contorllSideBar: !this.state.contorllSideBar
        });

        console.log(select);
    }
    addNewProject(e) {
        console.log(e.currentTarget.dataset.data);
        console.log('新增檔案=====================================');

        let projectId = random();
        let url, imgUrl;

        let projectArray = this.props.userData.project
            ? this.props.userData.project
            : [];
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
        let event = e.currentTarget.dataset.data;
        let that=this;
        if (e.currentTarget.dataset.data === 'default') {
            sendData.editMainStyle = [
                {
                    scale: 1,
                    style: [
                        { width: 800 },
                        { height: 1200 },
                        { transform: 'scale(1)' },
                        { transformOrigin: '0 0' },
                        { backgroundColor: '#ffffff' }
                    ]
                }
            ];
        } else {
            let data = sample.sample[e.currentTarget.dataset.data];
            sendData.editMainStyle = data.editMainStyle;
            sendData.display = data.display;
            url=data.src;
        }

        let target = '/app/addNewProject';
        let payload = {
            method: 'POST',
            body: JSON.stringify(sendData),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        };
        let getMemberData = data => {
            if (!firebase.apps.length) {
                initFirebase();
            }

            if (event !== 'default') {
                console.log(event);
                firebase
                    .storage()
                    .ref('sample/' + event + '.png')
                    .getDownloadURL()
                    .then(url => {
                        console.log(url);
                        console.log(url);
                        imgUrl = that.props.projectImg?that.props.projectImg:{};
                        imgUrl[projectId] = url;
                        console.log(imgUrl);

                    });
            }else{
                url =
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

            }
            console.log(url);
            firebase
                .storage()
                .ref()
                .child(projectId + '/canvas.png')
                .putString(url, 'data_url')
                .then(function() {
                    console.log('Uploaded a base64url string!');
                });
            console.log(data);
            console.log(this.props.projectImg);
            this.props.checkLogin(null, data, null, imgUrl);
        };
        connectFetch(target, payload, getMemberData);
    }

    render() {
        // console.log(this.props.userData.project);
        let createMain = this.state.project
            ? this.state.project.map(data => {
                let id = data.projectId;
                return (
                    <CreateMainItem
                        key={data.projectId}
                        linkTo={data.link}
                        id={data.projectId}
                        project={data}
                        projectImg={
                            this.props.projectImg
                                ? this.props.projectImg[id]
                                : null
                        }
                        deleteProject={this.props.deleteProject}
                    />
                );
            })
            : null;
        let createMainSideItem = sample
            ? Object.keys(sample.sample).map((data, index) => {
                let sampleData = sample.sample;
                console.log(sample.sample[data]);

                return (
                    <CreateMainSideItem
                        key={'createMainSideItem'+index}
                        sampleName={sampleData[data].sampleName}
                        data={'sample' + (index + 1)}
                        onClick={this.addNewProject}
                    />
                );
            })
            : null;
        console.log(sample);
        return (
            <div className="createMain" ref={this.createMain}>
                <div className="createMainSide">
                    <div className="createMainSide--main">
                        <div className={this.state.contorllSideBar?'createMainSide--header':'displayNone'}>
                    Sample
                        </div>
                        {createMainSideItem}
                    </div>
                    <div
                        className="createMainSide--controller"
                        onClick={this.contorllSideBar}
                    >
                        <img className={this.state.contorllSideBar?'rotateLeft':'rotateRight'} src={triangle}></img>
                    </div>
                </div>
                <div className="createMainCenter">
                    <div className="createMainItem">
                        <div className="createMainItem__inner">
                            <div
                                className="createMainItem__default"
                                data-data="default"
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
            </div>
        );
    }
}
CreateMain.propTypes = {
    userData: PropTypes.any,
    projectImg: PropTypes.object,
    checkLogin: PropTypes.func,
    deleteProject: PropTypes.func
};
export default CreateMain;
