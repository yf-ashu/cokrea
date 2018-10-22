import React, { Component } from 'react';
import PropTypes from 'prop-types';
import close from '../../../img/close.svg';

class EditorPreview extends Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.state = {
            downloadUrl: null,
            display: [],
            editMainStyle: [],
            scale: 1
        };
        this.updateCanvas = this.updateCanvas.bind(this);
    }
    componentDidMount() {
        this.updateCanvas();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            nextProps.display !== prevState.display ||
            nextProps.editMainStyle !== prevState.editMainStyle
        ) {
            return {
                display: nextProps.display,
                editMainStyle: nextProps.editMainStyle
            };
        } else return null;
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.display !== this.props.display ||
            prevProps.editMainStyle !== this.props.editMainStyle
        ) {
            //Perform some operation here
            this.setState({
                display: this.props.display ? this.props.display : [],
                editMainStyle: this.props.editMainStyle
            });
            // console.log('canvas更改');
            this.updateCanvas();
        }
    }

    updateCanvas() {
        let scare = 1;
        let display = this.props.display;
        let editMainStyle = this.props.editMainStyle[0];
        const canvas = this.canvas;

        const ctx = canvas.getContext('2d');
        canvas.width = editMainStyle.style[0].width * scare;
        canvas.height = editMainStyle.style[1].height * scare;
        ctx.clearRect(
            0,
            0,
            editMainStyle.style[0].width,
            editMainStyle.style[1].height
        );
        ctx.textBaseline = 'top';
        ctx.textAlign = 'start';
        if (display.length === 0) {
            ctx.fillStyle = editMainStyle.style[4].backgroundColor;
            ctx.fillRect(
                0,
                0,
                editMainStyle.style[0].width,
                editMainStyle.style[1].height
            );
            let dataURL = canvas.toDataURL();
            this.props.downloadUrl(dataURL);
            this.setState({
                downloadUrl: dataURL
            });

            return;
        } else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = editMainStyle.style[4].backgroundColor;
            ctx.fillRect(
                0,
                0,
                editMainStyle.style[0].width,
                editMainStyle.style[1].height
            );
            ctx.scale(scare, scare);

            let loop = (display, index) => {
                if (index === display.length) {
                    // console.log()
                    let dataURL = canvas.toDataURL();

                    let that = this;
                    // let dataURL = canvas.toBlob(
                    //     function(blob) {
                    //         let url = URL.createObjectURL(blob);
                    //         console.log(url);
                    //         // console.log(dataURL);
                    //         that.props.downloadUrl(url);
                    //         that.setState({
                    //             downloadUrl: url
                    //         });
                    //     },
                    //     'image/jpeg',
                    //     0.8
                    // );
                    // console.log(test2);
                    that.props.downloadUrl(dataURL);
                    that.setState({
                        downloadUrl: dataURL
                    });
                    return;
                }
                if (display[index].tag === 'img') {
                    let img = new Image();

                    img.onload = function() {
                        ctx.drawImage(
                            img,
                            display[index].outside[2].left + 16,
                            display[index].outside[3].top + 16,
                            display[index].outside[0].width - 32,
                            display[index].outside[1].height - 32
                        );

                        loop(display, ++index);
                    };
                    img.src = display[index].attribute.src;
                } else {
                    let findColor = display[index].style.findIndex(
                        data => data.color
                    );
                    let findWeight = display[index].style.findIndex(
                        data => data.fontWeight
                    );
                    let findSize = display[index].style.findIndex(
                        data => data.fontSize
                    );
                    let findBGColor = display[index].style.findIndex(
                        data => data.backgroundColor
                    );
                    // console.log(findBGColor);
                    // console.log(display[index].outside);

                    ctx.fillStyle =
                        display[index].style[findBGColor].backgroundColor;
                    ctx.fillRect(
                        display[index].outside[2].left,
                        display[index].outside[3].top,
                        display[index].outside[0].width,
                        display[index].outside[1].height
                    );

                    ctx.font = `${
                        display[index].style[findWeight].fontWeight
                    } ${display[index].style[findSize].fontSize}px Helvetica`;
                    ctx.fillStyle = display[index].style[findColor].color;
                    ctx.save();

                    ctx.beginPath();

                    ctx.rect(
                        display[index].outside[2].left,
                        0,
                        display[index].outside[0].width,
                        editMainStyle.style[1].height
                    );
                    ctx.closePath();

                    ctx.clip();

                    ctx.fillText(
                        display[index].textContent,
                        display[index].outside[2].left + 16,
                        display[index].outside[3].top + 16
                    );
                    ctx.restore();

                    loop(display, ++index);
                }
            };
            loop(display, 0);
        }
    }
    downloadFile() {
        let element = document.createElement('a');
        let file = this.state.downloadUrl;
        element.href = file;
        console.log(this.props.projectData);
        element.download = this.props.projectData.projectName+'.png';
        element.click();
    }

    render() {
        return (
            <div
                className={
                    this.props.saveButton
                        ? 'editorPreview'
                        : 'editorPreview displayNone'
                }
            >
                <div className="editorPreview__main" id="editorPreview__canvas">
                    <div className="editorPreview__canvas">
                        <canvas
                            className="mainCanvas"
                            ref={ref => {
                                this.canvas = ref;
                            }}
                        />
                    </div>

                    <div className="editorPreview__controller">
                        <button
                            className="editorPreview--button"
                            onClick={this.downloadFile.bind(this)}
                        >
                            Download
                        </button>
                        <div
                            className="editorPreview--close"
                            onClick={this.props.closeButton}
                        >
                            <img src={close} onClick={this.props.closeButton} />
                        </div>
                        {/* <div className="editorPreview__scale">
                        <button
                            id="editorPreview__scale--subtract"
                            data-num="0"
                        >
                            -
                        </button>

                        <div
                            className="editorPreview__scale--main"
                            id="editorPreview__scale--main"
                        >
                            {this.state.scale * 100 + '%'}
                        </div>
                        <button
                            id="editorPreview__scale--add"
                            data-num="1"
                        >
                            +
                        </button>
                    </div> */}
                    </div>
                </div>
            </div>
        );
    }
}
EditorPreview.propTypes = {
    display: PropTypes.array.isRequired,
    editMainStyle: PropTypes.array.isRequired,
    saveButton: PropTypes.any,
    closeButton: PropTypes.any,
    downloadUrl: PropTypes.string,
    projectData:PropTypes.string
};
export default EditorPreview;
