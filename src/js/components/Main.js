import React, { Component } from 'react';
import Display from './presentational/Controller/Display';
import Button from './presentational/Controller/Button';
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: [],
            style: [
                { left: 100, top: 100, width: 100, height: 100 },
                { left: 100, top: 200, width: 100, height: 100 }
            ],
            x: null,
            y: null
        };
        //按 button 顯示在 display
        this.handleClick = this.handleClick.bind(this);
        this.showPosition = this.showPosition.bind(this);
        this.MouseMove = this.MouseMove.bind(this);
        this.test = this.test.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.onDrag = this.onDrag.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
    }

    handleClick(e) {
        console.log(this.state.display);
        let array = this.state.display.length === 0 ? [] : this.state.display;
        let value = {};
        console.log(e.target.attributes.type.value);
        switch (e.target.attributes.type.value) {
        case 'img': {
            value = {
                tag: e.target.attributes.type.value,
                attribute: {
                    className: 'test123',
                    id: '123',
                    type: e.target.attributes.type.value
                }
            };
            break;
        }
        case 'text': {
            value = {
                tag: e.target.attributes.type.value,
                attribute: {
                    className: 'test123',
                    id: '123',
                    type: e.target.attributes.type.value
                },
                textContent: 'Hello',
                style: {
                    background: 'blue',
                    color: 'white'
                }
            };
            break;
        }
        default: {
            value = {
                tag: e.target.attributes.type.value,
                attribute: {
                    className: 'test123',
                    id: '123',
                    type: e.target.attributes.type.value
                },
                textContent: 'Hello',
                style: {
                    style: {
                        background: 'blue',
                        color: 'white'
                    }
                }
            };
            break;
        }
        }

        console.log(value);
        array.push(value);
        this.setState({
            display: array
        });
    }
    MouseMove(e) {
        let mouse = e.target.getBoundingClientRect();
        //   let mousePotion = {
        //     x: mouse.s,
        //     y: mouse.top
        // };
        // this.setState({ x: e.screenX, y: e.screenY });
        // console.log(mousePotion, '滑鼠');
    }
    showPosition(e) {
        // let mouse = document.body.getBoundingClientRect();
        let elem = e.currentTarget;
        let rect = elem.getBoundingClientRect();
        console.log(elem);
        // console.log({ x: e.clientX, y: e.clientY });
        let options = {
            x: rect.left,
            y: rect.top
        };
        // document.addEventListener('mousemove',(e)=>{
        //   // setInterval( this.test(e) , 1000)
        //   this.test(e)
        // });
        let that=this;
        let move=function(e){
            // console.log('有放開');
            that.test(e,elem);
        };
        document.addEventListener('mousemove',move);

        document.addEventListener('mouseup',function(){
            document.removeEventListener('mousemove',move);
        });
    }
    mouseUp(e) {
        // let mouse = document.body.getBoundingClientRect();
        // document.removeEventListener('mousemove', (e)=>{
        //   setInterval( this.test(e) , 1000)
        // });
        document.removeEventListener('mousemove');
    }
    onDrag(e) {
        // let img = document.createElement("img");
        // img.src = "URL to 500px image";
        // e.dataTransfer.setDragImage(img, 0, 0);
        // var clone = this.cloneNode(true);
        // e.dataTransfer.setDragImage(clone, 0, 0);

        // let dragImg = new Image(0,0);
        // dragImg.src =
        // 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        // e.dataTransfer.setDragImage(new Image(), 0, 0);
        console.log('有在');
    }
    test(e, elem) {
        // e.preventDefault();
        // console.log(e.target);
        let location = this.state.style;
        console.log({ x: e.clientX, y: e.clientY });
        console.log(elem);

        if (elem.className === 'itemController1') {
            location[0] = {
                left: e.clientX - 100 / 2,
                top: e.clientY - 100 / 2,
                width: 100,
                height: 100
            };
        } else if (elem.className === 'itemController2') {
            location[1] = {
                left: e.clientX - 100 / 2,
                top: e.clientY - 100 / 2,
                width: 100,
                height: 100
            };
        }

        this.setState({
            style: location
        });
    }
    dragEnd(e) {
        let location = this.state.style;

        if (e.target.className === 'itemController1') {
            location[0] = {
                left: e.clientX - 100 / 2,
                top: e.clientY - 100 / 2,
                width: 100,
                height: 100
            };
        } else if (e.target.className === 'itemController2') {
            location[1] = {
                left: e.clientX - 100 / 2,
                top: e.clientY - 100 / 2,
                width: 100,
                height: 100
            };
        }

        this.setState({
            style: location
        });
    }
    render() {
        let item = this.state.display.map((data, index) => {
            return (
                <Display
                    key={index}
                    tag={data.tag}
                    attribute={Object.assign(data.attribute, data.style)}
                    textContent={data.textContent + index}
                />
            );
        });
        return (
            <div className="mainController">
                <Button
                    onClick={this.handleClick}
                    name="TEXT"
                    type="h1"
                    className="itemController "
                />
                <Button
                    onClick={this.handleClick}
                    name="IMG"
                    type="img"
                    className="itemController "
                />
                {item}
                <div
                    className="itemController1"
                    onMouseDown={this.showPosition}
                    style={this.state.style[0]}
                    // onMouseUp={this.mouseUp}
                    // onDragStart={this.onDrag}
                    // onDrag={this.test}
                    // draggable="true"
                    // onDragEnd={this.dragEnd}
                >
                    111
                </div>
                <div
                    className="itemController2"
                    onMouseDown={this.showPosition}
                    style={this.state.style[1]}
                    // onMouseUp={this.mouseUp}
                    // onDragStart={this.onDrag}
                    // onDrag={this.test}
                    // draggable="true"
                    // onDragEnd={this.dragEnd}
                >
                    222
                </div>
            </div>
        );
    }
}
export default Main;
