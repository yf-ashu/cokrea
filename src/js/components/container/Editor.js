import React, { Component } from 'react';
import EditorHeader from '../Editor/EditorHeader';
import EditorSelect from '../Editor/EditorSelect';
import ToolButton from '../Editor/ToolButton';
import EditorMain from '../Editor/Editormain';
import EditorItem from '../Editor/EditorItem';
import ToolController from '../Editor/ToolController';
import ToolButtonItem from '../Editor/ToolButtonItem';
import {
    random,
    constant,
    styleSetting,
    initFirebase,
    connectFetch
} from '../element/constant';
import EditorPreview from '../Editor/EditorPreview';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
require('firebase/auth');
require('firebase/database');

// 圖片
import font from '../../../img/font.svg';
import close from '../../../img/close.svg';
import picture from '../../../img/picture.svg';
import square from '../../../img/square.svg';
import EditorShare from '../Editor/EditorShare';

class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: [], //控制中間元素出現
            type: { type: null, name: null }, //控制左邊按鈕是否顯示
            buttonItem: [], //控制左邊預設按鈕出現
            editMainStyle: [
                {
                    scale: 1,
                    style: [
                        { width: 800 },
                        { height: 2000 },
                        { transform: 'scale(1)' },
                        { transformOrigin: '0 0' },
                        { backgroundColor: '#ffffff' }
                    ]
                }
            ], //主畫布的style
            controllCurrent: ['page', null, null, null],
            fileUpload: { imgUrl: null, file: null },
            mouseEvent: 'true',
            saveButton: false,
            history: [],
            redoItem: [],
            loginStatus: null,
            userData: null
            //前面是public是否有,後面是特定某些人有
        };
        //按 button 顯示在 display
        this.handleClickButton = this.handleClickButton.bind(this);
        this.handleCloseButton = this.handleCloseButton.bind(this);
        this.toolButtonItemDragStart = this.toolButtonItemDragStart.bind(this);
        this.toolButtonItemDrop = this.toolButtonItemDrop.bind(this);
        this.clickToolButtonItem = this.clickToolButtonItem.bind(this);
        this.controllSetting = this.controllSetting.bind(this);
        this.cancelDefault = this.cancelDefault.bind(this);
        this.headerSizeClick = this.headerSizeClick.bind(this);
        this.editorItemClick = this.editorItemClick.bind(this);
        this.addNewItem = this.addNewItem.bind(this);
        this.elementOnMouseDown = this.elementOnMouseDown.bind(this);
        this.init = this.init.bind(this);
        this.changeSize = this.changeSize.bind(this);
        this.changeSizeset = this.changeSizeset.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.changeLayer = this.changeLayer.bind(this);
        this.recordStep = this.recordStep.bind(this);
        this.redoStep = this.redoStep.bind(this);
        this.saveData = this.saveData.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
        this.connectDb = this.connectDb.bind(this);

    }

    componentWillMount() {
        this.checkLogin();
    }
    connectDb(database) {
        let connectedRef = database.ref('.info/connected');
        connectedRef.on('value', function(snap) {
            if (snap.val() === true) {
                alert('connected');
            } else {
                alert('not connected');
            }
        });
        db.ref('/projectData/' + data.projectId).once('value', snapshot => {
            if (snapshot.exists()) {
                let getData = snapshot.val();
                if (data.share) {
                    getData.share = data.share;
                }
                getData.updateTime = now.getTime();
                if (data.display) {
                    getData.display = data.display;
                }
                if (data.editMainStyle) {
                    getData.editMainStyle = data.editMainStyle;
                }

                db.ref('/projectData/' + data.projectId).update(
                    getData,
                    error => {
                        if (error) {
                            res.send({
                                error: 'Create project Error'
                            });
                        } else {
                            res.send({
                                success: 'Create project'
                            });
                        }
                    }
                );
            }
        });
    }
    checkLogin() {
        let projectData = location.href.split('edit/')[1];
        let database
        if (!this.props.loginStatus) {
            if (!firebase.apps.length) {
                database = initFirebase().database();
                console.log('有進來');
            }
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    console.log('有登入');
                    let data = {
                        id: user.uid
                    };
                    console.log(user);
                    let target = '/app/getAccount';
                    let payload = {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: new Headers({
                            'Content-Type': 'application/json'
                        })
                    };
                    // let getProjectData = data => {
                    //     console.log(data);

                    //     if (data.display) {
                    //         this.setState({
                    //             display: data.display,
                    //             editMainStyle: data.editMainStyle
                    //         });
                    //     } else {
                    //         this.setState({
                    //             display: []
                    //         });
                    //     }
                    // };

                    // let getMemberData = data => {
                    //     console.log(user, data);
                    //     this.setState({
                    //         loginStatus: user,
                    //         userData: data
                    //     });
                        // let projectSendData = {
                        //     userId: user.uid,
                        //     projectId: projectData
                        // };
                        // let target = '/app/getProject';
                        // let payload = {
                        //     method: 'POST',
                        //     body: JSON.stringify(projectSendData),
                        //     headers: new Headers({
                        //         'Content-Type': 'application/json'
                        //     })
                        // };

                        // connectFetch(target, payload, getProjectData);
                    // };
                    connectFetch(target, payload, getMemberData);
                } else {
                    window.location.pathname = '/';
                    console.log('沒有登入');
                }
            });
        } else {
            this.setState({
                loginStatus: this.props.loginStatus,
                userData: this.props.userData
            });

            let projectSendData = {
                userId: this.props.loginStatus.uid,
                projectId: projectData
            };
            let target = '/app/getProject';
            let payload = {
                method: 'POST',
                body: JSON.stringify(projectSendData),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            };

            let getProjectData = data => {
                console.log(data);

                if (data.display) {
                    this.setState({
                        display: data.display,
                        editMainStyle: data.editMainStyle
                    });
                } else {
                    this.setState({
                        display: []
                    });
                }
            };
            connectFetch(target, payload, getProjectData);
        }
    }

    recordStep(value) {
        let record = this.state.history;
        record.push(JSON.stringify(value));
        this.setState({
            history: record,
            redoItem: []
        });
    }
    redoStep(e) {
        let record = this.state.history.slice(0);
        let newRecord;
        let redoRecord = this.state.redoItem;
        if (e.currentTarget.dataset.data === 'recovery') {
            newRecord = record.pop();
            redoRecord.push(newRecord);
            newRecord = JSON.parse(newRecord);

            this.recoveryItem(
                newRecord.old.func.split('-'),
                newRecord.old.id,
                newRecord.old.value
            );
        } else {
            newRecord = redoRecord.pop();
            record.push(newRecord);
            newRecord = JSON.parse(newRecord);

            this.redoItem(
                newRecord.now.func.split('-'),
                newRecord.now.id,
                newRecord.now.value
            );
        }

        this.setState({
            history: record,
            redoItem: redoRecord
        });
    }
    recoveryItem(action, id, value) {
        console.log(action, id, value);
        let copy = [];
        copy = this.state[action[1]];

        if (action[1] === 'display') {
            if (action[0] === 'addNewItem') {
                copy.splice(id[1], 1);
            } else if (action[0] === 'changeLayer') {
                let previous = copy[id[0]];
                let now = copy[id[1]];
                copy[id[0]] = now;
                copy[id[1]] = previous;
            } else if (action[0] === 'changeLayerDelete') {
                copy.splice(id[1], 0, value[0]); //生成
            } else {
                let find = this.state[action[1]].findIndex(data => {
                    return data.key === id[0];
                });
                copy[find][value[1]] = value[0];
            }
        } else {
            copy[0][value[1]] = value[0];
        }

        this.setState({
            [action[1]]: copy,
            controllCurrent: ['page', null, null, null]
        });
    }
    redoItem(action, id, value) {
        let copy = [];
        copy = this.state[action[1]];
        if (action[1] === 'display') {
            if (action[0] === 'addNewItem') {
                copy.splice(id[1], 0, value[0]); //生成
            } else if (action[0] === 'changeLayer') {
                let previous = copy[id[0]];
                let now = copy[id[1]];
                copy[id[0]] = now;
                copy[id[1]] = previous;
            } else if (action[0] === 'changeLayerDelete') {
                copy.splice(id[1], 1);
            } else {
                let find = this.state[action[1]].findIndex(data => {
                    return data.key === id[0];
                });
                copy[find][value[1]] = value[0];
            }
        } else {
            copy = this.state[action[1]];
            copy[0][value[1]] = value[0];
        }
        this.setState({
            [action[1]]: copy,
            controllCurrent: ['page', null, null, null]
        });
    }
    handleClickButton(e) {
        let type = {
            type: e.currentTarget.attributes.type.value,
            name: e.currentTarget.dataset.name
        };
        if (type.type !== this.state.type.type) {
            this.setState({
                type: type,
                buttonItem: constant.buttonDisplay[type.type]
            });
        } else {
            this.setState({
                type: { type: null, name: null }
            });
        }
    }
    handleCloseButton() {
        this.setState({
            type: { type: null, name: null }
        });
    }

    controllSetting(state, object, inner, value, string) {
        let copy, copyFirst;
        if (state === 'display') {
            let copyDisplay = +this.state.controllCurrent[2];
            copyFirst = this.state[state].slice(0);
            copy = copyFirst[copyDisplay];
        } else {
            copyFirst = this.state[state].slice(0);
            copy = copyFirst[0];
        }
        let find = copy[object].findIndex(data => data[inner]);
        let opt = [];
        let old = Object.assign({}, [...copy[object]]);
        old = Object.keys(old).map(function(key) {
            opt.push(old[key]);
            return old[key];
        });
        if (value !== null) {
            if (find < 0) {
                copy[object].push({ [inner]: value });
            } else {
                copy[object][find] = { [inner]: parseInt(value) };
            }
        }
        if (string !== null) {
            if (find < 0) {
                copy[object].push({ [inner]: value });
            } else {
                copy[object][find] = { [inner]: string };
            }
        }

        this.setState({
            [state]: copyFirst
        });

        this.recordStep({
            old: {
                func: 'controllSetting-' + state,
                id: state === 'display' ? [copy.key, find] : [0, find],
                value: [old, object]
            },

            now: {
                func: 'controllSetting-' + state,
                id: state === 'display' ? [copy.key, find] : [0, find],
                value: [copy[object], object]
            }
        });
    }
    clickToolButtonItem(e) {
        let send;
        if (e.currentTarget.dataset.send) {
            send = e.currentTarget.dataset.send;
            if (!this.state.fileUpload.file) {
                alert('Please select a image to upload.');
            }
        }
        let type = {
            type: e.currentTarget.attributes.type.value,
            format: e.currentTarget.dataset.format,
            send: send
        };
        this.addNewItem(type, document.querySelector('.editorMain'), send);
    }
    toolButtonItemDragStart(e) {
        let data = {
            type: e.currentTarget.attributes.type.value,
            format: e.currentTarget.dataset.format
        };
        e.dataTransfer.setData('text/plain', JSON.stringify(data));
    }
    toolButtonItemDrop(e) {
        let type = JSON.parse(e.dataTransfer.getData('text/plain'));
        this.addNewItem(type, e);
    }
    //放大縮小 要重寫
    headerSizeClick(e) {
        let copyDisplay = this.state.editMainStyle.slice(0);
        let copy = copyDisplay[0];
        if (e.currentTarget.dataset.num === '0') {
            if (copy.scale <= 0.25) {
                let find = copy.style.findIndex(data => data.transform);
                copy.style[find] = { transform: 'scale(0.25)' };
            } else if (copy.scale <= 1) {
                let data = (copy.scale = parseFloat(copy.scale - 0.25));
                let find = copy.style.findIndex(data => data.transform);
                copy.style[find] = { transform: 'scale(' + data + ')' };
                let findTransform = copy.style.findIndex(
                    data => data['transformOrigin']
                );
                copy.style[findTransform] = {
                    transformOrigin: 'top center'
                };
            } else {
                let data = (copy.scale = parseFloat(copy.scale - 0.25));
                let find = copy.style.findIndex(data => data.transform);
                copy.style[find] = { transform: 'scale(' + data + ')' };
            }
        } else {
            if (copy.scale > 5) {
                let find = copy.style.findIndex(data => data.transform);
                copy.style[find] = { transform: 'scale(5)' };
            } else if (copy.scale >= 1) {
                let data = (copy.scale = parseFloat(copy.scale + 0.25));
                let find = copy.style.findIndex(data => data.transform);
                copy.style[find] = { transform: 'scale(' + data + ')' };
                let findTransform = copy.style.findIndex(
                    data => data['transformOrigin']
                );
                copy.style[findTransform] = { transformOrigin: '0 0' };
            } else {
                let data = (copy.scale = parseFloat(copy.scale + 0.25));
                let find = copy.style.findIndex(data => data.transform);
                copy.style[find] = { transform: 'scale(' + data + ')' };
            }
        }
        this.setState({
            editMainStyle: copyDisplay
        });
    }

    addNewItem(type, e, special) {
        if (type) {
            let check = this.state.buttonItem.findIndex(
                object => object.type === type.type
            );
            let canvaWidthX =
                (document.querySelector('.editorMain').offsetWidth -
                    this.state.editMainStyle[0].style[0].width) /
                2;
            let width =
                special === 'img'
                    ? this.state.fileUpload.file.width *
                      this.state.buttonItem[check].size.width
                    : this.state.buttonItem[check].size.width *
                      this.state.editMainStyle[0].style[0].width;
            let height =
                special === 'img'
                    ? this.state.fileUpload.file.height *
                      this.state.buttonItem[check].size.width
                    : this.state.buttonItem[check].size.height;
            let textContent =
                type === 'img'
                    ? null
                    : this.state.buttonItem[check].textContent;
            let randomClass = random();
            let array =
                this.state.display.length === 0 ? [] : this.state.display;
            let style = [
                {
                    width: '100%'
                },
                {
                    height: '100%'
                }
            ];
            let tmp = styleSetting(type);

            let value = {
                tag: type.type,
                key: randomClass,
                attribute: {
                    className:
                        'editorMain__item ' +
                        randomClass +
                        ' editorMain__item--' +
                        type.type,
                    id: randomClass,
                    format: type.format,
                    type: type.type,
                    src: this.state.fileUpload.imgUrl
                },
                textContent: textContent,

                option: [{ contentEditable: 'false' }],

                style: style.concat(tmp),

                outside: [
                    {
                        width: 'auto'
                    },
                    {
                        height: 'auto'
                    },
                    {
                        left: e.pageX
                            ? e.pageX - canvaWidthX - 60 - width / 2
                            : 0
                    },
                    {
                        top: e.pageY
                            ? (e.pageY -
                                  100 -
                                  (height / 2) *
                                      this.state.editMainStyle[0].scale +
                                  document.querySelector('.editorMain')
                                      .scrollTop -
                                  80) /
                              this.state.editMainStyle[0].scale
                            : 0
                    }
                ]
            };
            array.push(value);
            this.recordStep({
                old: {
                    func: 'addNewItem-display',
                    id: [randomClass, array.length - 1],
                    value: [{}, '']
                },

                now: {
                    func: 'addNewItem-display',
                    id: [randomClass, array.length - 1],
                    value: [value, '']
                }
            });

            this.setState({
                display: array
            });
        }
    }
    cancelDefault(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    canInterEdit(e) {
        e.preventDefault();
        e.stopPropagation();
        let copyDisplay = +this.state.controllCurrent[2];
        let copy = this.state.display.slice(0);
        copy[copyDisplay].option[0].contentEditable = 'true';
        this.setState({
            mouseEvent: 'false',
            display: copy
        });
    }
    onBlur(e) {
        let copyDisplay = +this.state.controllCurrent[2];
        let copy = this.state.display.slice(0);
        console.log(copy[copyDisplay]);
        copy[copyDisplay].option[0]
            ? (copy[copyDisplay].option[0].contentEditable = 'false')
            : '';
        copy[copyDisplay].textContent = e.currentTarget.innerHTML;
        this.setState({
            mouseEvent: 'true',
            display: copy
        });
        // that.recordStep({
        //     old: {
        //         func: 'changePosition-display',
        //         id: result.id,
        //         value: [opt, 'outside']
        //     },
        //     now: {
        //         func: 'changePosition-display',
        //         id: result.id,
        //         value: [result.value, 'outside']
        //     }
        // })

        let that = this;
        let move = function(e) {
            if (e.target.className === 'editorMain__canvas--inner') {
                that.setState({
                    controllCurrent: ['page', null, null, null]
                });
                return;
            }
        };
        document.addEventListener('click', move);
        this.init(e, move);
    }
    //移動座標時
    changePosition(e, elem, pre, init) {
        e.preventDefault();
        e.stopPropagation();
        let currentX = e.pageX;
        let currentY = e.pageY;
        let distanceX = currentX - pre[0];
        let distanceY = currentY - pre[1];
        let copyDisplay = parseInt(
            this.state.display.findIndex(data => data.key === elem.dataset.id)
        );
        let copy = this.state.display.slice(0);
        let left = distanceX / this.state.editMainStyle[0].scale + +init.left;
        let top = distanceY / this.state.editMainStyle[0].scale + +init.top;
        copy[copyDisplay].outside[0] = {
            width: init.width
        };
        copy[copyDisplay].outside[1] = {
            height: init.height
        };
        copy[copyDisplay].outside[2] = {
            left: left
        };
        copy[copyDisplay].outside[3] = {
            top: top
        };
        this.setState({
            display: copy
        });

        return {
            id: [elem.dataset.id, copyDisplay],
            value: copy[copyDisplay].outside
        };
    }
    //偵測目前點到誰
    editorItemClick(e) {
        e.preventDefault();
        e.stopPropagation();
        let copy = this.state.controllCurrent.slice(0);
        let copyDisplay = this.state.display.findIndex(
            data => data.key === e.currentTarget.dataset.id
        );
        copy[0] = this.state.display[copyDisplay].attribute.format;
        copy[1] = this.state.display[copyDisplay];
        copy[2] = copyDisplay;
        copy[3] = e.currentTarget;
        this.setState({
            controllCurrent: copy
        });
    }
    //要移動
    elementOnMouseDown(e) {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.focus();

        this.editorItemClick(e);
        let elem = e.currentTarget;
        let that = this;
        let pre = [e.pageX, e.pageY];
        let copyDisplay = parseInt(
            this.state.display.findIndex(data => data.key === elem.dataset.id)
        );
        let copy = this.state.display.slice(0);
        let init = {
            width: e.currentTarget.parentNode.offsetWidth,
            height: e.currentTarget.parentNode.offsetHeight,
            left: +e.currentTarget.parentNode.style.left.split('px')[0],
            top: +e.currentTarget.parentNode.style.top.split('px')[0]
        };
        let result;
        let opt = [];
        let old = Object.assign({}, [...copy[copyDisplay].outside]);
        old = Object.keys(old).map(function(key) {
            opt.push(old[key]);
            return old[key];
        });
        let move = function(e) {
            e.preventDefault();
            result = that.changePosition(e, elem, pre, init);
        };
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', function() {
            document.removeEventListener('mousemove', move);
            result
                ? that.recordStep({
                    old: {
                        func: 'changePosition-display',
                        id: result.id,
                        value: [opt, 'outside']
                    },
                    now: {
                        func: 'changePosition-display',
                        id: result.id,
                        value: [result.value, 'outside']
                    }
                })
                : null;
            result = null;
        });
    }
    init(e, move) {
        e.preventDefault();
        e.stopPropagation();
        setTimeout(function() {
            document.removeEventListener('click', move);
        }, 100);
        let classname = e.currentTarget.className.split(' ')[0];
        if (classname === 'editorMain__canvas') {
            this.setState({
                controllCurrent: ['page', null]
            });
            e.currentTarget.blur();
        } else {
            e.currentTarget.blur();
        }
    }
    changeSizeset(e, pre, init, pull) {
        let currentX = e.pageX;
        let currentY = e.pageY;
        let distanceX = currentX - pre[0];
        let distanceY = currentY - pre[1];
        let copyDisplay = this.state.controllCurrent[2];
        let copy = this.state.display.slice(0);
        let left, top, height, width;
        switch (pull) {
        case 'tl': {
            left =
                    distanceX / this.state.editMainStyle[0].scale + +init.left;
            top = distanceY / this.state.editMainStyle[0].scale + +init.top;
            height =
                    +init.height -
                    distanceY / this.state.editMainStyle[0].scale;
            width =
                    +init.width - distanceX / this.state.editMainStyle[0].scale;
            break;
        }
        case 'tr': {
            left = +init.left;
            top = distanceY / this.state.editMainStyle[0].scale + +init.top;
            height =
                    +init.height -
                    distanceY / this.state.editMainStyle[0].scale;
            width =
                    distanceX / this.state.editMainStyle[0].scale + +init.width;
            break;
        }
        case 'bl': {
            left =
                    distanceX / this.state.editMainStyle[0].scale + +init.left;
            top = +init.top;
            height =
                    +init.height +
                    distanceY / this.state.editMainStyle[0].scale;
            width =
                    +init.width - distanceX / this.state.editMainStyle[0].scale;
            break;
        }
        case 'br': {
            left = +init.left;
            top = +init.top;
            height =
                    +init.height +
                    distanceY / this.state.editMainStyle[0].scale;
            width =
                    +init.width + distanceX / this.state.editMainStyle[0].scale;
            break;
        }
        }
        copy[copyDisplay].outside[0] = {
            width: width
        };
        copy[copyDisplay].outside[1] = {
            height: height
        };
        copy[copyDisplay].outside[2] = {
            left: left
        };
        copy[copyDisplay].outside[3] = {
            top: top
        };

        this.setState({
            display: copy
        });
        return {
            id: [copy[copyDisplay].key, copyDisplay],
            value: copy[copyDisplay].outside
        };
    }
    changeSize(e) {
        e.preventDefault();
        e.stopPropagation();
        let that = this;
        let pre = [e.pageX, e.pageY];
        let target = document.querySelector('.editorMain__item--select');
        let init = {
            width: +target.offsetWidth,
            height: +target.offsetHeight,
            left: +target.style.left.split('px')[0],
            top: +target.style.top.split('px')[0]
        };
        let pull = e.currentTarget.dataset.data;

        let opt = [
            { width: init.width },
            { height: init.height },
            { left: init.left },
            { top: init.top }
        ];
        let result;

        let move = function(e) {
            result = that.changeSizeset(e, pre, init, pull);
        };
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', function() {
            document.removeEventListener('mousemove', move);
            result
                ? that.recordStep({
                    old: {
                        func: 'changeSize-display',
                        id: result.id,
                        value: [opt, 'outside']
                    },
                    now: {
                        func: 'changeSize-display',
                        id: result.id,
                        value: [result.value, 'outside']
                    }
                })
                : null;
            result = null;
        });
    }
    handleImageUpload(e) {
        console.log(e.currentTarget);
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            let img = new Image();
            let that = this;
            img.onload = function() {
                console.log(img.width);
                that.setState({
                    fileUpload: {
                        file: img,
                        imgUrl: reader.result
                    }
                });
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
    }
    changeLayer(e) {
        e.preventDefault();
        e.stopPropagation();
        let copy = this.state.display.slice(0);
        let copyDisplay = this.state.controllCurrent.slice(0);
        if (e.currentTarget.dataset.data === 'layerdown') {
            let previous = copy[copyDisplay[2] - 1];
            let now = copy[copyDisplay[2]];
            copy[copyDisplay[2]] = previous;
            copy[copyDisplay[2] - 1] = now;
            copyDisplay[2] = copyDisplay[2] - 1;

            this.recordStep({
                old: {
                    func: 'changeLayer-display',
                    id: [copyDisplay[2] + 1, copyDisplay[2]],
                    value: [{}, '']
                },

                now: {
                    func: 'changeLayer-display',
                    id: [copyDisplay[2] + 1, copyDisplay[2]],
                    value: [{}, '']
                }
            });
        } else if (e.currentTarget.dataset.data === 'layerup') {
            let next = copy[copyDisplay[2] + 1];
            let now = copy[copyDisplay[2]];
            copy[copyDisplay[2]] = next;
            copy[copyDisplay[2] + 1] = now;
            copyDisplay[2] = copyDisplay[2] + 1;
            this.recordStep({
                old: {
                    func: 'changeLayer-display',
                    id: [copyDisplay[2] - 1, copyDisplay[2]],
                    value: [{}, '']
                },

                now: {
                    func: 'changeLayer-display',
                    id: [copyDisplay[2] - 1, copyDisplay[2]],
                    value: [{}, '']
                }
            });
        } else {
            console.log(copy[copyDisplay[2]]);
            this.recordStep({
                old: {
                    func: 'changeLayerDelete-display',
                    id: [null, copy[copyDisplay[2]]],
                    value: [copy[copyDisplay[2]], '']
                },

                now: {
                    func: 'changeLayerDelete-display',
                    id: [null, copy[copyDisplay[2]]],
                    value: [{}, '']
                }
            });
            copy.splice(copyDisplay[2], 1);
            copyDisplay = ['page', null, null, null];
        }
        this.setState({
            display: copy,
            controllCurrent: copyDisplay
        });

        console.log(copy);
        console.log(copyDisplay);
    }
    saveData() {
        let sendData = {
            userId: this.state.loginStatus.uid,
            display: this.state.display,
            editMainStyle: this.state.editMainStyle,
            projectId: location.href.split('edit/')[1],
            share: this.state.share
        };
        let target = '/app/manageProject';
        let payload = {
            method: 'POST',
            body: JSON.stringify(sendData),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        };

        console.log(sendData);
        let getMemberData = data => {
            console.log(data);
        };
        connectFetch(target, payload, getMemberData);
    }
    render() {
        let item = this.state.display.map(data => {
            return (
                <EditorItem
                    key={data.key}
                    tag={data.tag}
                    attribute={data.attribute}
                    outside={Object.assign({}, ...data.outside)}
                    option={Object.assign({}, ...data.option)}
                    style={Object.assign({}, ...data.style)}
                    onMouseDown={
                        this.state.mouseEvent === 'true'
                            ? this.elementOnMouseDown.bind(this)
                            : null
                    }
                    onBlur={this.onBlur}
                    onDoubleClick={this.canInterEdit.bind(this)}
                    textContent={data.textContent}
                />
            );
        });

        let buttonItem = this.state.buttonItem.map(data => {
            return (
                <ToolButtonItem
                    key={'toolButton__item--' + data.type}
                    onClick={this.clickToolButtonItem}
                    type={data.type}
                    format={data.format}
                    className={'toolButton__item--' + data.type}
                    id={data.type}
                    onDragStart={this.toolButtonItemDragStart}
                    src={data.src}
                />
            );
        });

        return (
            <div className="editor">
                {/* 可以拆出去 */}
                <EditorShare loginStatus={this.state.loginStatus} />
                <EditorPreview
                    editMainStyle={this.state.editMainStyle}
                    display={this.state.display}
                    fileUpload={this.state.fileUpload}
                    saveButton={this.state.saveButton}
                    closeButton={() => {
                        this.setState({ saveButton: false });
                    }}
                />
                <EditorHeader
                    scale={this.state.editMainStyle[0].scale}
                    onClick={this.headerSizeClick}
                    onDownload={() => {
                        this.setState({ saveButton: true });
                    }}
                    login={this.state.loginStatus}
                    onHistory={this.redoStep}
                    unable={[this.state.history, this.state.redoItem]}
                    saveData={this.saveData}
                />
                <div className="toolButton">
                    <div
                        className={
                            this.state.type.type === null
                                ? 'toolButton__item--display'
                                : 'toolButton__item--display slideTozero'
                        }
                    >
                        <div className="toolButton__item--header">
                            {this.state.type.name}
                            <div
                                className="toolButton__item--close"
                                onClick={this.handleCloseButton}
                            >
                                <img src={close} />
                            </div>
                        </div>
                        <div className="toolButton__items">
                            <div
                                className={
                                    this.state.type.name === 'Image'
                                        ? 'toolButton__items--image'
                                        : 'toolButton__items--image displayNone'
                                }
                            >
                                Upload Image
                                <input
                                    name="uploading"
                                    className="fileUpload"
                                    type="file"
                                    onChange={e => this.handleImageUpload(e)}
                                />
                                <img
                                    src={this.state.fileUpload.imgUrl}
                                    className="toolButton__items--upload"
                                />
                                <button
                                    className="toolButton__items--upload-button"
                                    type="img"
                                    data-format="image"
                                    data-send="img"
                                    onClick={this.clickToolButtonItem}
                                >
                                    確定上傳
                                </button>
                            </div>
                            <div className="toolButton__items--inner">
                                {buttonItem}
                            </div>
                        </div>
                    </div>
                    <div className="toolButton">
                        <ToolButton
                            onClick={this.handleClickButton}
                            src={font}
                            type="text"
                            name="Text"
                            displayName="Add Text"
                            id="textAll"
                            className={
                                this.state.type.type === 'text'
                                    ? 'itemclick'
                                    : ''
                            }
                        />
                        <ToolButton
                            onClick={this.handleClickButton}
                            src={picture}
                            type="img"
                            name="Image"
                            displayName="Add Image"
                            id="imgAll"
                            className={
                                this.state.type.type === 'img'
                                    ? 'itemclick'
                                    : ''
                            }
                        />
                        <ToolButton
                            onClick={this.handleClickButton}
                            src={square}
                            type="square"
                            name="Square"
                            displayName="Add Shape"
                            id="squareAll"
                            className={
                                this.state.type.type === 'square'
                                    ? 'itemclick'
                                    : ''
                            }
                        />
                    </div>
                </div>

                <EditorMain
                    onDrop={this.toolButtonItemDrop}
                    onDragEnter={this.cancelDefault}
                    onDragOver={this.cancelDefault}
                    style={Object.assign(
                        {},
                        ...this.state.editMainStyle[0].style
                    )}
                    scale={this.state.editMainStyle[0].scale}
                    onMouseDown={
                        this.state.mouseEvent === 'true'
                            ? this.init.bind(this)
                            : null
                    }
                    controllCurrent={this.state.controllCurrent}
                    changeSize={this.changeSize}
                    select={
                        <EditorSelect
                            controllCurrent={this.state.controllCurrent}
                            changeSize={this.changeSize}
                            onMouseDown={this.changeLayer}
                            display={this.state.display}
                        />
                    }
                >
                    {item}
                </EditorMain>
                <ToolController
                    editMainStyle={this.state.editMainStyle[0]}
                    display={this.state.display}
                    controll={this.controllSetting}
                    controllCurrent={this.state.controllCurrent}
                />
            </div>
        );
    }
}
Editor.propTypes = {
    userData: PropTypes.any,
    loginStatus: PropTypes.any
};
export default Editor;
