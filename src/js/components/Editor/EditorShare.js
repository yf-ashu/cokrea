import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connectFetch } from '../element/constant';
import close from '../../../img/close.svg';

class EditorShare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
            shareLink: 'share close',
            checkLink: [],
            inputCheck: '',
            share: []
        };
        this.checkShare = this.checkShare.bind(this);
        this.checkLink = this.checkLink.bind(this);
        this.updateShare = this.updateShare.bind(this);
        this.deleteAllowList = this.deleteAllowList.bind(this);
    }
    componentDidUpdate(nextProps) {
        if (nextProps.projectData && this.state.selected === null) {
            console.log(nextProps.projectData.share[0].public);
            this.setState({
                selected: nextProps.projectData.share[0].public
            });
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.projectData !== prevState.projectData) {
            return {
                share: nextProps.projectData
            };
        } else return null;
    }

    checkShare(e) {
        let copy = this.props.projectData.share;
        copy[0] = {
            public: e.currentTarget.value
        };
        this.setState({
            selected: e.currentTarget.value,
            share: copy
        });
    }

    checkLink(e, value) {
        console.log(value);
        let insert;
        if (value === 'keypress') {
            let share = this.props.projectData.share;
            if (this.props.projectData.share[1][0] === 'no data') {
                insert = [];
            } else {
                insert = this.props.projectData.share[1];
            }
            console.log(insert);
            insert.push(this.state.inputCheck);
            share[1] = insert;
            console.log(share);

            this.setState({
                share: share,
                inputCheck: ''
            });
        } else {
            this.setState({
                inputCheck: e.currentTarget.value
            });
        }
    }
    updateShare() {
        console.log(this.state.selected);
        let projectData = location.href.split('edit/')[1];
        let projectSendData = {
            userId: this.props.loginStatus.uid,
            projectId: projectData,
            share: this.state.share.share
        };
        let target = '/app/manageProject';
        let payload = {
            method: 'POST',
            body: JSON.stringify(projectSendData),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        };

        let getProjectData = data => {
            console.log(data);
        };
        connectFetch(target, payload, getProjectData);
        let getData = this.props.projectData;
        if (this.state.selected === 'public') {
            delete getData.share;
            this.props.database.ref('/public/' + projectData).update(getData);
            console.log('有public');
        }
        // this.state.storage
        // .child(projectData + '/canvas.png')
        // .putString(this.state.downloadUrl, 'data_url')
        // .then(function(snapshot) {
        //     console.log('Uploaded a base64url string!');
        // });
    }
    deleteAllowList(e) {
        let number = e.currentTarget.dataset.data;
        let copy = this.state.share.share;
        copy[1].splice(number, 1);
        if(copy[1].length===0){
            copy[1].push('no data');
        }
        this.setState({
            share: copy
        });
    }

    render() {
        // console.log(this.state.share);
        // console.log(this.props.projectData);

        return (
            <div className="editorShare">
                <div
                    className={
                        this.props.shareLink[0]
                            ? 'editorShare__inner'
                            : 'editorShare__inner displayNone'
                    }
                >
                    <div className="editorShare__header">
                        Share
                        <div className="editorShare__close">
                            <img src={close} onClick={this.props.closeButton} />
                        </div>
                    </div>
                    <div className="editorShare__options">
                        <div className="editorShare__option">
                            <label
                                className={
                                    this.state.selected === 'public'
                                        ? 'editorShare__option-item editorShare__border'
                                        : 'editorShare__option-item'
                                }
                                htmlFor="public"
                            >
                                <input
                                    type="radio"
                                    id="public"
                                    name="publicRadio"
                                    value="public"
                                    checked={this.state.selected === 'public'}
                                    onChange={this.checkShare}
                                />
                                <div className="editorShare__option-text">
                                    <span>public</span>
                                    <span>every can visit</span>
                                </div>
                            </label>
                        </div>
                        <div className="editorShare__option">
                            <label
                                className={
                                    this.state.selected === 'private'
                                        ? 'editorShare__option-item editorShare__border'
                                        : 'editorShare__option-item'
                                }
                                htmlFor="private"
                            >
                                <input
                                    type="radio"
                                    id="private"
                                    name="hiddenRadio"
                                    value="private"
                                    checked={this.state.selected === 'private'}
                                    onChange={this.checkShare}
                                />
                                <div className="editorShare__option-text">
                                    <span>private</span>
                                    <span>only allow list can edit</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="editorShare__shareLinksetting">
                        <div>Enter email to allow list</div>
                        <input
                            type="text"
                            id="shareLink"
                            name="shareLink"
                            value={this.state.inputCheck}
                            className="editorShare__shareLink"
                            onChange={this.checkLink}
                            onKeyPress={e => {
                                if (e.key == 'Enter') {
                                    this.checkLink(e, 'keypress');
                                }
                            }}
                            disabled={
                                this.state.selected === 'public' ? true : false
                            }
                        />
                    </div>
                    <div className="editorShare__shareLinkList">
                        <div>Allow List</div>
                        {/* {this.state.share} */}
                        {(this.state.share
                            ? this.state.share.share[1]
                                ? this.state.share.share[1]
                                : []
                            : []
                        ).map((data, index) => {
                            return (
                                <div
                                    className="editorShare__shareLinkList-item"
                                    key={index}
                                >
                                    <div> {data}</div>
                                    {this.state.share.share[1][0] ===
                                    'no data' ? null : (
                                            <img
                                                src={close}
                                                onClick={this.deleteAllowList}
                                                data-data={index}
                                            />
                                        )}
                                </div>
                            );
                        })}
                    </div>
                    <div className="editorShare__shareLinkBlock">
                        <div>share link</div>
                        <input
                            type="text"
                            id="shatrLink"
                            name="shatrLink"
                            value={this.state.shareLink}
                            className="editorShare__shareLink"
                            readOnly
                        />
                    </div>
                    <button
                        className="editorShare__button"
                        onClick={this.updateShare}
                    >
                        SAVE
                    </button>
                </div>
            </div>
        );
    }
}
EditorShare.propTypes = {
    projectData: PropTypes.object.isRequired,
    loginStatus: PropTypes.object.isRequired,
    database:PropTypes.object.isRequired,
    shareLink: PropTypes.any,
    closeButton: PropTypes.any,
    
};
export default EditorShare;
