import React, { Component } from 'react';
import EditorHeader from '../Editor/EditorHeader';
import EditorSelect from '../Editor/EditorSelect';
import EditorShare from '../Editor/EditorShare';
import ToolButtonContanier from '../Tool/ToolButtonContanier';
import EditorMain from '../Editor/Editormain';
import EditorItem from '../Editor/EditorItem';
import ToolController from '../Tool/ToolController';
import { random, constant, styleSetting } from '../element/constant';
import { documentEvent, changeLayer } from './editorFunction/changeEditor';
import { recoveryItem, redoItem } from './editorFunction/recordEditor';
import { authInfomation, firebaseSet,firebaseOnsite,firebaseGetProjectData } from '../element/auth';
import EditorPreview from '../Editor/EditorPreview';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
require('firebase/auth');
require('firebase/database');
require('firebase/storage');

// 圖片

import Loading from '../element/loading';
const projectData = {};
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
            controllCurrent: ['page', null, null, null], //第一個是種類，第二個是主要的，第三個是移圖層用的
            fileUpload: { imgUrl: null, file: null },
            mouseEvent: 'true',
            saveButton: false,
            shareButton: [false, false],
            history: [],
            redoItem: [],
            loginStatus: null,
            projectData: null,
            database: null,
            othercontrollCurrent: [],
            loading: true,
            downloadUrl: null,
            intervalId: null,
            saved: [false, '已存檔'],
            trashCan: {},
            locationHref: null

            //前面是public是否有,後面是特定某些人有
        };
        //按 button 顯示在 display
        this.handleClickButton = this.handleClickButton.bind(this);
        this.handleCloseButton = this.handleCloseButton.bind(this);
        this.dragStartToolButtonItem = this.dragStartToolButtonItem.bind(this);
        this.dropToolButtonItem = this.dropToolButtonItem.bind(this);
        this.uploadToolButtonImage = this.uploadToolButtonImage.bind(this);
        this.controllSetting = this.controllSetting.bind(this);
        this.cancelDefault = this.cancelDefault.bind(this);
        this.headerSizeClick = this.headerSizeClick.bind(this);
        this.editorItemClick = this.editorItemClick.bind(this);
        this.addNewItem = this.addNewItem.bind(this);
        this.changePosition = this.changePosition.bind(this);
        this.init = this.init.bind(this);
        this.changeSize = this.changeSize.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.recordStep = this.recordStep.bind(this);
        this.redoStep = this.redoStep.bind(this);
        this.saveData = this.saveData.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
        this.connectDb = this.connectDb.bind(this);
        this.changeProjectName = this.changeProjectName.bind(this);
        this.changeProjectNameonBlur = this.changeProjectNameonBlur.bind(this);
        this.getProjectData = this.getProjectData.bind(this);
        this.copyLayer = this.copyLayer.bind(this);
    }

    componentDidMount() {
        projectData.href = location.href.split('edit/')[1];
        this.checkLogin();
        console.log(projectData);
    }
    componentWillUnmount() {
        firebase
            .database()
            .ref('/projectData/' + projectData.href)
            .off();
        firebase
            .database()
            .ref(
                'temp/' +
                    projectData.href +
                    '/nowclick/' +
                    this.state.loginStatus.uid
            )
            .set(null);
    }

    saveData(e, display) {
        this.setState({
            saved: [true, '儲存中']
        });
        let getData = Object.assign({}, this.state.projectData);
        let database = this.state.database[0];

        if (this.state.display) {
            getData.display = display ? display : this.state.display;
        }

        if (this.state.projectData.share[0].public === 'public') {
            console.log('公開中');
            delete getData.share;
            database.ref('/public/' + projectData.href).update(getData);
        }

        getData.editMainStyle = this.state.editMainStyle;
        database
            .ref('/projectData/' + projectData.href)
            .update(getData, error => {
                if (error) {
                    console.log('error');
                } else {
                    console.log('完成');
                    this.setState({
                        saved: [true, '已存檔']
                    });

                    setTimeout(() => {
                        this.setState({
                            saved: [false, '已存檔']
                        });
                    }, 5000);
                }
            });
        let copyNowclick = this.state.controllCurrent.slice(0);
        firebaseSet('temp', 'nowclick/' + this.state.loginStatus.uid, [
            copyNowclick,
            this.state.loginStatus.displayName
        ]);

        let copy = Object.assign({}, this.props.projectImg);
        copy[projectData.href] = this.state.downloadUrl;
        this.props.getUserData(null, null, null, copy);
        console.log('已存檔');
    }

    checkLogin() {
        let storage, database;
        if (!this.props.loginStatus) {
            console.log('沒有登入資訊');
            let authCheck = data => {
                if (data) {
                    console.log(data);
                    this.props.getUserData(data[0], data[1], data[2], data[3]);
                    this.setState(
                        {
                            database: data[2],
                            loginStatus: data[0]
                        },
                        () => {
                            this.getProjectData();
                        }
                    );
                } else {
                    window.location.pathname = '/';
                    console.log('沒有登入');
                }
            };
            authInfomation(authCheck);
        } else {
            database = firebase.database();
            storage = firebase.storage();
            this.setState(
                {
                    database: [database, storage],
                    loginStatus: this.props.loginStatus
                },
                () => this.getProjectData()
            );
        }
    }

    getProjectData() {
        let that=this;
        firebaseGetProjectData(that);
    }
    connectDb(database, user) {
        console.log('連接', user);
        let that = this;

        database
            .ref('/projectData/' + projectData.href)
            .on('value', snapshot => {
                if (snapshot.exists()) {
                    let data = snapshot.val();
                    that.setState({
                        projectData: data,
                        display: data.display ? data.display : [],
                        editMainStyle: data.editMainStyle
                            ? data.editMainStyle
                            : []
                    });
                }
            });
        firebaseOnsite(that,user);
     
    }
    recordStep(value) {
        let record = this.state.history;
        record.push(JSON.stringify(value));
        this.setState({
            history: record,
            redoItem: []
        });
        this.saveData();
    }

    redoStep(e) {
        let elem = e.currentTarget;
        let result;
        this.setState(state => {
            let recoveryItems = state.history;
            let redoItems = state.redoItem;
            let newRecord = [];
            let redoInit = (recovery, redo, option) => {
                newRecord = recovery.pop();
                redo.push(newRecord);
                newRecord = JSON.parse(newRecord);
                let item = [
                    newRecord[option],
                    state[newRecord[option].func.split('-')[1]]
                ];
                result = option === 'old' ? recoveryItem(item) : redoItem(item);
            };
            if (elem.dataset.data === 'recovery') {
                redoInit(recoveryItems, redoItems, 'old');
            } else {
                redoInit(redoItems, recoveryItems, 'now');
            }
            return {
                controllCurrent: ['page', null, null, null],
                history: recoveryItems,
                redoItem: redoItems,
                [result[0]]: result[1]
            };
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
            type: { type: null, name: null },
            buttonItem: []
        });
    }
    changeProjectName(e) {
        let getData = this.state.projectData;
        getData.projectName = e.currentTarget.value;
        this.setState({
            projectData: getData
        });
    }
    changeProjectNameonBlur(e) {
        this.props.changeProjectName(e.currentTarget.value, projectData.href);
        this.saveData();
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

    dragStartToolButtonItem(e) {
        let data = {
            type: e.currentTarget.attributes.type.value,
            format: e.currentTarget.dataset.format
        };
        e.dataTransfer.setData('text/plain', JSON.stringify(data));
    }
    dropToolButtonItem(e) {
        let type = JSON.parse(e.dataTransfer.getData('text/plain'));
        this.addNewItem(type, e);
    }
    headerSizeClick(copyDisplay) {
        console.log(copyDisplay);
        this.setState({
            editMainStyle: copyDisplay
        });
    }


    addNewItem(type, e, special) {
        console.log(type, e.currentTarget, special);
        if (type) {
            let check;
            if (type.type === 'img' && special !== 'img') {
                check = this.state.buttonItem.findIndex(object => {
                    return object.format[1] === type.format.split(',')[1];
                });
            } else {
                check = this.state.buttonItem.findIndex(
                    object => object.type === type.type
                );
            }
            let array =
            this.state.display.length === 0 ? [] : this.state.display;
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
                type.type === 'img'
                    ? 'img'
                    : this.state.buttonItem[check].textContent;
            let randomClass = random();
           
            let style = [
                {
                    width: '100%'
                },
                {
                    height: '100%'
                }
            ];
            let src;
            if (special === 'img') {
                src = this.state.fileUpload.imgUrl;
            } else if (type.type === 'img') {
                src = this.state.buttonItem[check].src;
            } else {
                src = '';
            }
            let tmp = styleSetting(type);

            const value = {
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
                    src: src
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
        this.cancelDefault(e);
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
        if (copy[copyDisplay].option[0].contentEditable === 'true') {
            copy[copyDisplay].option[0]
                ? (copy[copyDisplay].option[0].contentEditable = 'false')
                : '';
            let pretextContent = copy[copyDisplay].textContent;
            copy[copyDisplay].textContent = e.currentTarget.innerHTML;
            this.setState({
                mouseEvent: 'true',
                display: copy
            });

            this.recordStep({
                old: {
                    func: 'onBlur-display',
                    id: [copy[copyDisplay].key],
                    value: [pretextContent, 'textContent']
                },
                now: {
                    func: 'onBlur-display',
                    id: [copy[copyDisplay].key],
                    value: [e.currentTarget.innerHTML, 'textContent']
                }
            });

            let that = this;
            let move = function(e) {
                if (e.target.className === 'editorMain__canvas--inner') {
                    that.setState({
                        controllCurrent: ['page', null, null, null]
                    });
            
                    firebaseSet(
                        'temp',
                        'nowclick/' + that.state.loginStatus.uid,
                        [
                            ['page', null, null, null],
                            that.state.loginStatus.displayName
                        ]
                    );

                    return;
                }
            };
            document.addEventListener('click', move);
            this.init(e, move);
        }
    }

    //偵測目前點到誰
    editorItemClick(e) {
        this.cancelDefault(e);
        let copy = this.state.controllCurrent.slice(0);
        let copyDisplay = this.state.display.findIndex(
            data => data.key === e.currentTarget.dataset.id
        );
        copy[0] = this.state.display[copyDisplay].attribute.format;
        copy[1] = this.state.display[copyDisplay];
        copy[2] = copyDisplay;
        this.setState({
            controllCurrent: copy
        });
        firebaseSet('temp', 'nowclick/' + this.state.loginStatus.uid, [
            copy,
            this.state.loginStatus.displayName
        ]);
    }

    changePosition(e) {
        this.cancelDefault(e);
        e.currentTarget.focus();
        this.editorItemClick(e);
        let elem = e.currentTarget;
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
        let opt = [];
        let old = Object.assign({}, [...copy[copyDisplay].outside]);
        old = Object.keys(old).map(function(key) {
            opt.push(old[key]);
            return old[key];
        });
        documentEvent(elem, pre, init, opt, 'changePosition', this);
    }
    changeSize(e) {
        this.cancelDefault(e);
        let pre = [e.pageX, e.pageY];
        let target = document.querySelector('.editorMain__item--select');
        let init = {
            width: +target.offsetWidth,
            height: +target.offsetHeight,
            left: +target.style.left.split('px')[0],
            top: +target.style.top.split('px')[0]
        };

        let elem = e.currentTarget;
        let opt = [
            { width: init.width },
            { height: init.height },
            { left: init.left },
            { top: init.top }
        ];

        documentEvent(elem, pre, init, opt, 'changeSize', this);
    }

    init(e, move) {
        this.cancelDefault(e);

        setTimeout(function() {
            document.removeEventListener('click', move);
        }, 100);
        let classname = e.currentTarget.className.split(' ')[0];
        if (classname === 'editorMain__canvas') {
            this.setState({
                controllCurrent: ['page', null, null, null]
            });

            firebaseSet('temp', 'nowclick/' + this.state.loginStatus.uid, [
                ['page', null, null, null],
                this.state.loginStatus.displayName
            ]);
            e.currentTarget.blur();
        } else {
            e.currentTarget.blur();
        }
    }
    uploadToolButtonImage(e) {
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
    handleImageUpload(e) {
        let reader = new FileReader();
        let file = e.target.files[0];
        let that = this;

        reader.onloadend = () => {
            let img = new Image();
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

    copyLayer() {
        let copy = JSON.stringify(
            Object.assign({}, this.state.controllCurrent[1])
        );
        let randomClass = random();
        let copyTerm = JSON.parse(copy);
        copyTerm.attribute.className =
            'editorMain__item ' +
            randomClass +
            ' editorMain__item--' +
            copyTerm.attribute.type;
        copyTerm.attribute.id = randomClass;
        copyTerm.key = randomClass;
        let insert = this.state.display.slice(0);
        insert.push(copyTerm);
        this.setState({
            display: insert
        });
        console.log(copyTerm);
    }

    render() {
        // console.log(this.props.loginStatus);
        // console.log(this.props.userData);
        // console.log(this.state.trashCan);

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
                            ? this.changePosition.bind(this)
                            : null
                    }
                    onTouchStart={() => {
                        console.log('觸碰');
                    }}
                    onBlur={this.onBlur}
                    onDoubleClick={this.canInterEdit.bind(this)}
                    textContent={data.textContent}
                />
            );
        });
        // console.log(item)
        let color = ['red', 'yellow', 'orange', 'blue', 'purple', 'green'];
        let other = Object.keys(this.state.othercontrollCurrent).map(
            (data, index) => {
                let name = this.state.othercontrollCurrent[data][1];
                let main = this.state.othercontrollCurrent[data][0][1]
                    ? this.state.othercontrollCurrent[data][0][1].outside
                    : '';
                let trans = Object.assign({}, ...main);
                if (data === this.state.loginStatus.uid) {
                } else {
                    return (
                        <div
                            className={
                                this.state.othercontrollCurrent[data][0][1]
                                    ? 'editorMain__item--select-outer--' +
                                      color[index] +
                                      ' editorMain__item--select-outer'
                                    : 'displayNone'
                            }
                            style={trans}
                        >
                            <div
                                className={
                                    'editorMain__item--select--name--' +
                                    color[index] +
                                    ' editorMain__item--select--name'
                                }
                            >
                                {name}
                            </div>
                        </div>
                    );
                }
            }
        );

        return (
            <div className="editor">
                <div className="smallSize">
                    <span>請換至平板或電腦使用</span>{' '}
                </div>

                <Loading loading={this.state.loading} />
                {/* 可以拆出去 */}
                <EditorShare
                    loginStatus={this.state.loginStatus}
                    projectData={this.state.projectData}
                    closeButton={() => {
                        let shareButton = this.state.shareButton;
                        shareButton[0] = false;
                        this.setState({ shareButton: shareButton });
                    }}
                    shareLink={this.state.shareButton}
                    database={this.state.database}
                />

                <EditorPreview
                    editMainStyle={this.state.editMainStyle}
                    projectData={this.state.projectData}
                    display={this.state.display}
                    fileUpload={this.state.fileUpload}
                    saveButton={this.state.saveButton}
                    closeButton={() => {
                        this.setState({ saveButton: false });
                    }}
                    downloadUrl={downloadUrl => {
                        this.setState({
                            downloadUrl: downloadUrl
                        });
                    }}
                />
                <EditorHeader
                    editMainStyle={this.state.editMainStyle[0]}
                    // onClick={this.headerSizeClick}
                    onDownload={() => {
                        this.setState({ saveButton: true });
                    }}
                    loginStatus={this.state.loginStatus}
                    onHistory={this.redoStep}
                    unable={[
                        this.state.history,
                        this.state.redoItem,
                        this.state.shareButton[1]
                    ]}
                    saveData={this.saveData}
                    shareLink={() => {
                        console.log(this.state.shareButton);
                        if (this.state.shareButton[1]) {
                            let shareButton = this.state.shareButton;
                            shareButton[0] = true;
                            this.setState({ shareButton: shareButton });
                        } else {
                            alert('only owner can set');
                        }
                    }}
                    projectName={
                        this.state.projectData
                            ? this.state.projectData.projectName
                            : ''
                    }
                    onChange={this.changeProjectName}
                    onBlur={this.changeProjectNameonBlur}
                    saved={this.state.saved}
                    headerSizeClick={this.headerSizeClick}
                />
                <ToolButtonContanier
                    type={this.state.type}
                    handleCloseButton={this.handleCloseButton}
                    handleImageUpload={e => this.handleImageUpload(e)}
                    imgUrl={this.state.fileUpload.imgUrl}
                    uploadToolButtonImage={this.uploadToolButtonImage}
                    buttonItem={this.state.buttonItem}
                    handleClickButton={this.handleClickButton}
                    dragStartToolButtonItem={this.dragStartToolButtonItem}
                />

                <EditorMain
                    onDrop={this.dropToolButtonItem}
                    onDragEnter={this.cancelDefault}
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
                            onMouseDown={e => {
                                let that = this;
                                changeLayer(e, that, projectData);
                            }}
                            onCopy={this.copyLayer}
                            display={this.state.display}
                        />
                    }
                    otherSelect={other}
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
    loginStatus: PropTypes.any,
    getUserData: PropTypes.any,
    changeProjectName: PropTypes.any,
    projectImg: PropTypes.string
};
export default Editor;
