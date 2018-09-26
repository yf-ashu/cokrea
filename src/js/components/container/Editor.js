import React, { Component } from 'react';
import EditorHeader from '../presentational/Editor/EditorHeader';
import ToolButton from '../presentational/Editor/ToolButton';
import EditorMain from '../presentational/Editor/Editormain';
import EditorItem from '../presentational/Editor/EditorItem';
import ToolController from '../presentational/Editor/ToolController';
import ToolButtonItem from '../presentational/Editor/ToolButtonItem';
import Constant from '../../components/element/Constant';

const random = () => {
    let date = Date.now().toString();
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_';
    let random = '';
    for (let i = 1; i < 15; i += 3) {
        let str = possible.charAt(Math.floor(Math.random() * possible.length));

        if (i === 1) {
            random =
                str +
                date.slice(0, i + 2) +
                str +
                date.slice(i + 2, date.length);
        } else {
            random =
                random.slice(0, i + 2) +
                str +
                random.slice(i + 2, random.length);
        }
    }
    return random;
};
class Editor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: [], //控制中間元素出現
            type: { type: null, name: null }, //控制左邊按鈕是否顯示
            buttonItem: [], //控制左邊預設按鈕出現
            editMainStyle: {
                scale: 1,
                style: [
                    { width: 800 },
                    { height: 2000 },
                    { transform: 'scale(1)' },
                    { transformOrigin: '0 0' },
                    { backgroundColor: '#ffffff' }
                ]
            }, //主畫布的style
            controllCurrent: ['page', null, null],
            fileUpload: { imgUrl: null, file: null },
            mouseEvent: 'true'
        };
        //按 button 顯示在 display
        this.handleClickButton = this.handleClickButton.bind(this);
        this.handleCloseButton = this.handleCloseButton.bind(this);
        this.toolButtonItemDragStart = this.toolButtonItemDragStart.bind(this);
        this.toolButtonItemDrop = this.toolButtonItemDrop.bind(this);
        this.toolButtonItemClick = this.toolButtonItemClick.bind(this);
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
    }
    handleClickButton(e) {
        let type = {
            type: e.currentTarget.attributes.type.value,
            name: e.currentTarget.dataset.name
        };
        if (type.type !== this.state.type.type) {
            this.setState({
                type: type,
                buttonItem: Constant.buttonDisplay[type.type]
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
        console.log(state);
        console.log(this.state[state][object]);
        let copy = Object.assign({}, this.state[state]);
        let find = copy[object].findIndex(data => data[inner]);
        if (value !== null) {
            copy[object][find] = { [inner]: parseInt(value) };
        }
        if (string !== null) {
            copy[object][find] = { [inner]: string };
        }
        console.log(copy[object][find]);
        this.setState({
            editMainStyle: copy
        });
    }
    toolButtonItemClick(e) {
        let send;
        if (e.currentTarget.dataset.send) {
            e.currentTarget.dataset.send;
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
    //放大縮小
    headerSizeClick(e) {
        let copy = Object.assign({}, this.state.editMainStyle);
        if (e.currentTarget.dataset.num === '0') {
            if (copy.scale <= 0.25) {
                let find = copy.style.findIndex(data => data.transform);
                copy.style[find] = { transform: 'scale(0.25)' };
            } else if (copy.scale <= 1) {
                let data = (copy.scale = parseFloat(copy.scale - 0.25));
                let find = copy.style.findIndex(data => data.transform);
                copy.style[find] = { transform: 'scale(' + data + ')' };
                let findTransform = copy.style.findIndex(
                    data => data['transform-origin']
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
            editMainStyle: copy
        });
    }

    addNewItem(type, e, special) {
        console.log(type, e.currentTarget);
        if (type) {
            let check = this.state.buttonItem.findIndex(
                object => object.type === type.type
            );
            let canvaWidthX =
                (document.querySelector('.editorMain').offsetWidth -
                    this.state.editMainStyle.style[0].width) /
                2;
            console.log(e.currentTarget);
            let width =
                special === 'img'
                    ? 500 * this.state.editMainStyle.style[0].width
                    : this.state.buttonItem[check].size.width *
                      this.state.editMainStyle.style[0].width;
            let height = this.state.buttonItem[check].size.height;
            let textContent =
                type === 'img'
                    ? null
                    : this.state.buttonItem[check].textContent;
            let randomClass = random();
            let array =
                this.state.display.length === 0 ? [] : this.state.display;
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
                    contentEditable: type.format === 'text' ? 'true' : 'false',
                    src: this.state.fileUpload.imgUrl
                },
                textContent: textContent,

                style: [{ width: '100%' }, { height: '100%' }],
                outside: [
                    {
                        width: width
                    },
                    {
                        height: height
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
                                      this.state.editMainStyle.scale +
                                  document.querySelector('.editorMain')
                                      .scrollTop -
                                  80) /
                              this.state.editMainStyle.scale
                            : 0
                    }
                ]
            };
            console.log(array);
            array.push(value);
            this.setState({
                display: array
            });
        }
    }
    cancelDefault(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    canInterEdit() {
        console.log('有近來雙吉');
        this.setState({
            mouseEvent: 'false'
        });
    }
    onBlur() {
        console.log('沒關注');
        this.setState({
            mouseEvent: 'true',
            controllCurrent: ['page', null]
        });
    }
    //移動座標時
    changePosition(e, elem, pre, init) {
        let currentX = e.pageX;
        let currentY = e.pageY;
        let distanceX = currentX - pre[0];
        let distanceY = currentY - pre[1];
        let copyDisplay = parseInt(
            this.state.display.findIndex(data => data.key === elem.dataset.id)
        );
        let copy = this.state.display.slice(0);
        let left = distanceX / this.state.editMainStyle.scale + +init.left;
        let top = distanceY / this.state.editMainStyle.scale + +init.top;

        copy[copyDisplay].outside[2] = {
            left: left
        };
        copy[copyDisplay].outside[3] = {
            top: top
        };

        this.setState({
            display: copy
        });
    }
    //偵測目前點到誰
    editorItemClick(e) {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
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
    }
    //要移動
    elementOnMouseDown(e) {
        e.nativeEvent.stopImmediatePropagation();
        this.editorItemClick(e);
        let elem = e.currentTarget;
        let that = this;
        let pre = [e.pageX, e.pageY];
        let init = {
            left: +e.currentTarget.style.left.split('px')[0],
            top: +e.currentTarget.style.top.split('px')[0]
        };
        let move = function(e) {
            e.preventDefault();

            that.changePosition(e, elem, pre, init);
        };
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', function() {
            document.removeEventListener('mousemove', move);
        });
    }
    init() {
        // console.log(e.currentTarget);
        //    this.setState({controllCurrent: ['page', null]})
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
            left = distanceX / this.state.editMainStyle.scale + +init.left;
            top = distanceY / this.state.editMainStyle.scale + +init.top;
            height =
                    +init.height - distanceY / this.state.editMainStyle.scale;
            width =
                    +init.width - distanceX / this.state.editMainStyle.scale;
            break;
        }
        case 'tr': {
            left = +init.left ;
            top = distanceY / this.state.editMainStyle.scale + +init.top;
            height =
                    +init.height - distanceY / this.state.editMainStyle.scale;
            width =
                      distanceX / this.state.editMainStyle.scale + +init.width;
            break;
        }
        case 'bl': {
            left = distanceX / this.state.editMainStyle.scale + +init.left;
            top = +init.top ;
            height =
                    +init.height + distanceY / this.state.editMainStyle.scale;
            width =
            +init.width-  distanceX / this.state.editMainStyle.scale  ;
            break;
        }
        case 'br': {
            left =  +init.left;
            top = +init.top ;
            height =
                    +init.height + distanceY / this.state.editMainStyle.scale;
            width =
            +init.width+  distanceX / this.state.editMainStyle.scale  ;
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
    }
    changeSize(e) {
        let that = this;
        let pre = [e.pageX, e.pageY];
        let target = document.querySelector('.editorMain__item--select');
        let init = {
            width: +target.style.width.split('px')[0],
            height: +target.style.height.split('px')[0],
            left: +target.style.left.split('px')[0],
            top: +target.style.top.split('px')[0]
        };
        let pull = e.currentTarget.dataset.data;
        let move = function(e) {
            that.changeSizeset(e, pre, init, pull);
        };
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', function() {
            document.removeEventListener('mousemove', move);
        });
    }
    handleImageUpload(e) {
        e.preventDefault();
        console.log(e.currentTarget);
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                fileUpload: {
                    file: file,
                    imgUrl: reader.result
                }
            });
        };
        reader.readAsDataURL(file);
    }
    render() {
        let item = this.state.display.map(data => {
            return (
                <EditorItem
                    key={data.key}
                    outside={Object.assign({}, ...data.outside)}
                    tag={data.tag}
                    attribute={data.attribute}
                    textContent={data.textContent}
                    style={Object.assign({}, ...data.style)}
                    onMouseDown={
                        this.state.mouseEvent === 'true'
                            ? this.elementOnMouseDown.bind(this)
                            : null
                    }
                    contentEditable={data.attribute.contentEditable}
                    onBlur={this.onBlur}
                    onDoubleClick={this.canInterEdit.bind(this)}
                />
            );
        });

        let buttonItem = this.state.buttonItem.map(data => {
            return (
                <ToolButtonItem
                    key={'toolButton__item--' + data.type}
                    onClick={this.toolButtonItemClick}
                    type={data.type}
                    format={data.format}
                    className={'toolButton__item--' + data.type}
                    id={data.type}
                    onDragStart={this.toolButtonItemDragStart}
                    src={data.src}
                />
            );
        });
        console.log(this.state.controllCurrent);
        return (
            <div className="editor">
                <EditorHeader
                    scale={this.state.editMainStyle.scale}
                    onClick={this.headerSizeClick}
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
                                <img src="../src/img/close.svg" />
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
                                    data-format="Image"
                                    data-send="img"
                                    onClick={this.toolButtonItemClick}
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
                            src="../src/img/font.svg"
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
                            src="../src/img/picture.svg"
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
                            src="../src/img/square.svg"
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
                    style={Object.assign({}, ...this.state.editMainStyle.style)}
                    scale={this.state.editMainStyle.scale}
                    onClick={this.init}
                >
                    {item}
                    <div
                        className="editorMain__item--select"
                        style={
                            this.state.controllCurrent[1] !== null
                                ? Object.assign(
                                    {},
                                    ...this.state.controllCurrent[1].outside
                                )
                                : {}
                        }
                        data-id={
                            this.state.controllCurrent[1] !== null
                                ? this.state.controllCurrent[1].key
                                : {}
                        }
                        // onMouseDown={this.elementOnMouseDown}
                    >
                        <div className="editorMain__item--select-outside">
                            <div
                                className="editorMain__item--select-inside-tl"
                                onMouseDown={this.changeSize}
                                data-data="tl"
                            />
                            <div
                                className="editorMain__item--select-inside-tr"
                                onMouseDown={this.changeSize}
                                data-data="tr"
                            />
                            <div className="editorMain__item--select-inside-bl" 
                               onMouseDown={this.changeSize}
                            data-data="bl"
                            />
                            <div className="editorMain__item--select-inside-br" 
                               onMouseDown={this.changeSize}
                               data-data="br"/>
                        </div>
                    </div>
                </EditorMain>
                <ToolController
                    editMainStyle={this.state.editMainStyle}
                    controll={this.controllSetting}
                    controllCurrent={this.state.controllCurrent[0]}
                />
            </div>
        );
    }
}

export default Editor;
