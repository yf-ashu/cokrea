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
            display: [],//控制中間元素出現
            toolButtonType: { type: null, name: null },//控制左邊按鈕是否顯示
            buttonItem: [],//控制左邊按鈕選項出現
            editMainStyle: [{ width: 600 }, { height: 2000 }],//主畫布的style
            controllType:[]
        };
        //按 button 顯示在 display
        this.handleClickButton = this.handleClickButton.bind(this);
        this.handleCloseButton = this.handleCloseButton.bind(this);
        this.toolButtonItemDragStart = this.toolButtonItemDragStart.bind(this);
        this.toolButtonItemDrop = this.toolButtonItemDrop.bind(this);
        this.toolButtonItemClick = this.toolButtonItemClick.bind(this);
        this.cancelDefault = this.cancelDefault.bind(this);
        this.addNewItem = this.addNewItem.bind(this);
    }
    handleClickButton(e) {
        let type = {
            type: e.currentTarget.attributes.type.value,
            name: e.currentTarget.dataset.name
        };
        if (type.type !== this.state.toolButtonType.type) {
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
    toolButtonItemClick(e) {
        let type = {
            type: e.currentTarget.id,
            format: e.currentTarget.dataset.format
        };
        this.addNewItem(type, document.querySelector('.editorMain'));
    }
    toolButtonItemDragStart(e) {
        let data = {
            type: e.currentTarget.attributes.type.value,
            format: e.currentTarget.dataset.format
        };

        console.log(data);
        e.dataTransfer.setData('text/plain', JSON.stringify(data));
    }
    toolButtonItemDrop(e) {
        // e.currentTarget.attributes.type.value
        e.preventDefault();
        e.stopPropagation();
        let type = JSON.parse(e.dataTransfer.getData('text/plain'));
        this.addNewItem(type, e);
    }

    addNewItem(type, e) {
console.log(e.pageY)
console.log(type)
        if (type) {
            console.log(document.querySelector('.editorMain').scrollHeight)
            console.log( document.querySelector('.editorMain').scrollTop
            )
            console.log(e.currentTarget.offsetHeight*0.4)
            let check = this.state.buttonItem.findIndex(
                object => object.type === type.type
            );
            let canvaWidthX=(document.querySelector('.editorMain').offsetWidth-this.state.editMainStyle[0].width)/2
            let canvaWidthY=(document.querySelector('.editorMain').scrollHeight-e.currentTarget.offsetHeight*0.4)/2
            console.log(canvaWidthY)
            let width = this.state.buttonItem[check].size.width * this.state.editMainStyle[0].width;
            let height = this.state.buttonItem[check].size.height;
            let textContent = this.state.buttonItem[check].textContent;
            let randomClass = random();
            let array =
                this.state.display.length === 0 ? [] : this.state.display;
            let value = {
                tag: type.type,
                key: randomClass,
                attribute: {
                    className: 'editorMain__item ' + randomClass + ' editorMain__item--'+type.type,
                    id: randomClass,
                    type: type.type,
                    contenteditable:type.format==='text'?'true':'false'
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
                        left: e.pageX ? e.pageX-canvaWidthX-width/2-60 : 0
                    },
                    {
                        top: e.pageY
                            ? (e.pageY -
                            100-
                              height / 2/2 +
                              document.querySelector('.editorMain').scrollTop-80)/0.4
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

    render() {
        let item = this.state.display.map(data => {
            console.log(data.attribute.contenteditable)
            return (
                <EditorItem
                    key={data.key}
                    outside={Object.assign({}, ...data.outside)}
                    tag={data.tag}
                    attribute={data.attribute}
                    textContent={data.textContent}
                    style={Object.assign({}, ...data.style)}
                    onClick={this.toolButtonItemClick}
                    contenteditable={data.attribute.contenteditable}
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
        return (
            <div className="editor">
                <EditorHeader />
                <div className="toolButton">
                    <div
                        className={
                            this.state.toolButtonType.type === null
                                ? 'toolButton__item--display'
                                : 'toolButton__item--display slideTozero'
                        }
                    >
                        <div className="toolButton__item--header">
                            {this.state.toolButtonType.name}
                            <div
                                className="toolButton__item--close"
                                onClick={this.handleCloseButton}
                            >
                                <img src="../src/img/close.svg" />
                            </div>
                        </div>
                        <div className="toolButton__items">
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
                                this.state.toolButtonType.type === 'text'
                                    ? 'toolButton__all--click'
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
                                this.state.toolButtonType.type === 'img'
                                    ? 'toolButton__all--click'
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
                                this.state.toolButtonType.type === 'square'
                                    ? 'toolButton__all--click'
                                    : ''
                            }
                        />
                    </div>
                </div>

                <EditorMain
                    onDrop={this.toolButtonItemDrop}
                    onDragEnter={this.cancelDefault}
                    onDragOver={this.cancelDefault}
                    style={Object.assign({},...this.state.editMainStyle)}
                >
                    {item}
                    <div className="editorMain__item--select">
                    <div className="editorMain__item--select-outside">
                    <h2 className="editorMain__item--select-inside" contenteditable="true">
                    </h2>
                    </div>
                    </div>

                </EditorMain>
                <ToolController />
            </div>
        );
    }
}

export default Editor;
