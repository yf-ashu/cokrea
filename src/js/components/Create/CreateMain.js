import React, { Component } from 'react';
import CreateMainItem from './CreateMainItem';
import { connectFetch, random } from '../element/constant';
import PropTypes from 'prop-types';

class CreateMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: [], //畫面要顯示的東西
            projectName: 'New Project'
        };
        this.addNewProject = this.addNewProject.bind(this);
        this.canInterEdit = this.canInterEdit.bind(this);
        this.onBlur = this.onBlur.bind(this);


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
        let getMemberData = data => {
            console.log(data);
        };
        connectFetch(target, payload, getMemberData);
    }

    onBlur(e) {
        console.log(e.currentTarget);
    }
    canInterEdit(e) {
        e.preventDefault();
        e.stopPropagation();
        let find = this.state.project.findIndex(data => {
            return data.projectId === e.currentTarget.dataset.data;
        });
        let copy = this.state.project.slice(0);
        copy[find].contentEditable = 'true';
        console.log(copy[find]);
        this.setState({});
    }
    render() {
        let createMain = this.state.project.map(data => {
            // console.log(data);
            return (
                <CreateMainItem
                    key={data.projectId}
                    linkTo={data.link}
                    id={data.projectId}
                    project={data}
                    canEdit={this.canInterEdit}
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
};
export default CreateMain;
