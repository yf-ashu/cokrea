// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connectFetch } from '../element/constant';
import edit from '../../../img/edit.svg';
import Input from '../element/Input';

class EditorShare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'private',
            share: [
                {
                    public: 'private'
                },
                null
            ],
            shareLink: 'share close'
        };
        this.checkShare = this.checkShare.bind(this);
        this.checkLink = this.checkLink.bind(this);

        this.updateShare = this.updateShare.bind(this);
    }
    checkShare(e) {
        let copy = this.state.share;
        copy[0] = {
            public: e.currentTarget.value
        };
        this.setState({
            selected: e.currentTarget.value,
            share: copy
        });
        this.updateShare();
    }
    checkLink() {}
    updateShare() {
        let projectData = location.href.split('edit/')[1];
        let projectSendData = {
            userId: this.props.loginStatus.uid,
            projectId: projectData,
            share: this.state.share
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
    }

    render() {
        console.log(this.props.share);
        return (
            <div className="editorShare">
                <div className="editorShare__options">
                    <label className="editorShare__option" htmlFor="public">
                        <input
                            type="radio"
                            id="public"
                            name="publicRadio"
                            value="public"
                            checked={this.state.selected === 'public'}
                            onChange={this.checkShare}
                        />
                        <div>
                            <span>public</span>{' '}
                        </div>
                    </label>

                    <label className="editorShare__option" htmlFor="private">
                        <input
                            type="radio"
                            id="private"
                            name="hiddenRadio"
                            value="private"
                            checked={this.state.selected === 'private'}
                            onChange={this.checkShare}
                        />
                        <div>private</div>
                    </label>
                </div>
                <div className="editorShare__shareLinksetting">
                    <div>Enter email</div>
                    <input
                        type="text"
                        id="shatrLink"
                        name="shatrLink"
                        value={this.state.shareLink}
                        className="editorShare__shareLink"
                    />
                </div>
                <div className="editorShare__shareLinkList">
                    <div>share link</div>
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
            </div>
        );
    }
}
EditorShare.propTypes = {
    // tag: PropTypes.string.isRequired,
    // attribute: PropTypes.any.isRequired,
    // option: PropTypes.any,
    // style: PropTypes.any,
    // outside: PropTypes.any,
    // onBlur: PropTypes.func,
    // onMouseDown: PropTypes.func,
    // onDoubleClick: PropTypes.func,
    // textContent:PropTypes.string
};
export default EditorShare;
