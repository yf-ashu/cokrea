import React, { Component } from 'react';

const test = () => {
    let displayTest = [
        {
            tag: 'h2',
            key: 'M153M8U12W65n39G558',
            attribute: {
                className:
                    'editorMain__item M153M8U12W65n39G558 editorMain__item--h2',
                id: 'M153M8U12W65n39G558',
                format: 'text',
                type: 'h2',
                contentEditable: 'false',
                src: null
            },
            textContent: 'Lorem ipsum dolor sit amet .',

            style: [
                {
                    width: '100%'
                },
                {
                    height: '100%'
                },
                {
                    backgroundColor: 'transparent'
                },
                {
                    color: '#6fb837'
                },
                {
                    fontWeight: 700
                },
                {
                    fontStyle: 'normal'
                },
                {
                    fontSize: 22
                }
            ],

            outside: [
                {
                    width: 640
                },
                {
                    height: 55
                },
                {
                    left: 0
                },
                {
                    top: 0
                }
            ]
        },
        {
            tag: 'h1',
            key: 'M153M8U12W65n39G4564',
            attribute: {
                className:
                    'editorMain__item M153M8U12W65n39G558 editorMain__item--h2',
                id: 'M153M8U12W65n39G4564',
                format: 'text',
                type: 'h1',
                contentEditable: 'false',
                src: null
            },
            textContent: '111Lorem ipsum dolor, sit amet .',

            style: [
                {
                    width: '100%'
                },
                {
                    height: '100%'
                },
                {
                    backgroundColor: '#6fb837'
                },
                {
                    color: '#000000'
                },
                {
                    fontWeight: 400
                },
                {
                    fontStyle: 'normal'
                },
                {
                    fontSize: 45
                }
            ],

            outside: [
                {
                    width: 647
                },
                {
                    height: 55
                },
                {
                    left: 150
                },
                {
                    top: 250
                }
            ]
        },
        {
            tag: 'img',
            key: 'M153M8U12W65n39G558',
            attribute: {
                className:
                    'editorMain__item M153M8U12W65n39G558 editorMain__item--h2',
                id: 'M153M8U12W65n39G558',
                format: 'text',
                type: 'h2',
                contentEditable: 'false',
                src: '../src/img/self-01.jpg'
            },
            textContent: null,

            style: [
                {
                    width: '100%'
                },
                {
                    height: '100%'
                },
                {
                    backgroundColor: 'transparent'
                },
                {
                    color: '#6fb837'
                },
                {
                    fontWeight: 700
                },
                {
                    fontStyle: 'normal'
                },
                {
                    fontSize: 22
                }
            ],

            outside: [
                {
                    width: 640
                },
                {
                    height: 550
                },
                {
                    left: 100
                },
                {
                    top: 100
                }
            ]
        }
    ];
    return displayTest;
};
class EditorPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMainStyle: this.props.editMainStyle,
            display: this.props.display,
            downloadUrl: null
        };
    }
    componentDidMount() {
        this.updateCanvas();
    }
    componentWillReceiveProps() {
            this.updateCanvas();
        
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props === nextProps && this.state === nextState) {
            return false;
        }

        return true;
    }
    updateCanvas() {
        let display = this.props.display;
        let editMainStyle = this.props.editMainStyle[0];
        const canvas = this.refs.canvas;

        const ctx = canvas.getContext('2d');
        canvas.width = editMainStyle.style[0].width * 0.5;
        canvas.height = editMainStyle.style[1].height * 0.5;

        ctx.clearRect(
            0,
            0,
            editMainStyle.style[0].width,
            editMainStyle.style[1].height
        );
        ctx.scale(0.5, 0.5);
        ctx.textBaseline = 'top';
        ctx.textAlign = 'start';
        // ctx.textAlign="center"

        if (display.length === 0) {
            ctx.fillStyle = editMainStyle.style[4].backgroundColor;
            ctx.fillRect(
                0,
                0,
                editMainStyle.style[0].width,
                editMainStyle.style[1].height
            );
            let dataURL = canvas.toDataURL();

            this.setState({
                downloadUrl: dataURL
            });
            return;
        } else {
            ctx.globalCompositeOperation = 'source-over';
            // ctx.globalCompositeOperation = 'destination-atop'

            ctx.fillStyle = editMainStyle.style[4].backgroundColor;
            ctx.fillRect(
                0,
                0,
                editMainStyle.style[0].width,
                editMainStyle.style[1].height
            );

            let loop = (display, index) => {
                if (index === display.length) {
                    let dataURL = canvas.toDataURL();

                    this.setState({
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
                        // ctx.fillRect(0,0,30,30)
                        // console.log(img)
                        console.log('第一次');

                        loop(display, ++index);
                    };
                    img.src = display[index].attribute.src;
                    // img.src='../src/img/self-01.jpg'
                    // console.log(display[index].attribute.src)
                } else {
                    let find = display[index].style.findIndex(
                        data => data.color
                    );
                    console.log(find);
                    console.log(display[index].style[find].backgroundColor);
                    let findWeight = display[index].style.findIndex(
                        data => data.fontWeight
                    );
                    let findSize = display[index].style.findIndex(
                        data => data.fontSize
                    );

                    let font = `${
                        display[index].style[findWeight].fontWeight
                    } ${display[index].style[findSize].fontSize} Helvetica`;
                    console.log(font);
                    ctx.font = `${
                        display[index].style[findWeight].fontWeight
                    } ${display[index].style[findSize].fontSize}px Helvetica`;
                    ctx.fillStyle = display[index].style[find].color;
                    // ctx.fillStyle='#rrggbb'
                    ctx.fillText(
                        display[index].attribute.textContent,
                        display[index].outside[2].left + 16,
                        display[index].outside[3].top + 16
                    );
                    loop(display, ++index);
                }
            };
            loop(display, 0);

            // display.map(data => {
            //     // console.log(data);
            //     console.log(data.tag)
            //     if (data.tag === 'img') {
            //         let img = new Image();

            //         img.onload = function() {
            //             ctx.drawImage(
            //                 img,
            //                 data.outside[2].left + 16,
            //                 data.outside[3].top + 16,
            //                 data.outside[0].width - 32,
            //                 data.outside[1].height - 32
            //             );
            //             ctx.fillRect(0,0,30,30)
            //             console.log(img)
            //             console.log('第一次')

            //         };
            //         img.src = data.attribute.src;
            //         console.log('第2次')

            //     } else {
            //         console.log('第3次')

            //         // ctx.fillStyle=data.style[4].backgroundColor;
            //         let find = data.style.findIndex(data => data.color);
            //         console.log(find)
            //         console.log(data.style[find].backgroundColor)
            //         ctx.font = '700 47px Helvetica';
            //         ctx.fillStyle=data.style[find].color;
            //         // ctx.fillStyle='#rrggbb'
            //         ctx.fillText(
            //             data.attribute.textContent,
            //             data.outside[2].left + 16,
            //             data.outside[3].top + 16
            //         );

            //     }
            // });
        }

        //47-9  16-12 22-11 33-10 44-9

        // ctx.font = '47px';
        // ctx.fillText('asdaisd', 16, 16);
        // ctx.fillRect(0,0, 100, 100);
        // let dataURL=
        // console.log(dataURL)
        // console.log(dataURL)

        // this.setState({
        //     downloadUrl:canvas.toBlob(function(blob){
        //         console.log(blob);
        //     }, "image/png", 1)
        // })
    }
    downloadFile() {
        // canvas.toBlob(function(blob){
        //     link.href = URL.createObjectURL(blob);
        //     console.log(blob);
        //     console.log(link.href); // this line should be here
        //   },'image/png');

        let element = document.createElement('a');
        let file = this.state.downloadUrl;
        element.href = file;
        element.download = 'myFile.png';
        element.click();
    }

    render() {
        let display = this.props.display;
        let editMainStyle = this.props.editMainStyle[0];
        console.log(display);
        // console.log(this.state.downloadUrl)
        return (
            <div
                className={
                    this.props.saveButton
                        ? 'editorPreview'
                        : 'editorPreview displayNone'
                }
            >
                <div className="editorPreview-main" id="editorPreview-canvas">
                    <div className="editorPreview-canvas">
                        <canvas className="mainCanvas" ref="canvas" />
                    </div>

                    <div className="editorPreview-controller">
                        <button
                            className="editorPreview--button"
                            onClick={this.downloadFile.bind(this)}
                        >
                            Download
                        </button>
                        <button
                            className="editorPreview--close"
                            onClick={this.props.closeButton}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
export default EditorPreview;
