import { firebaseSet } from '../../element/auth';

export const documentEvent = (elem, pre, init, opt, func, that) => {
    console.log(elem);
    let result;
    let move = e => {
        e.preventDefault();
        result =
            func === 'changeSize'
                ? changeSizeset(e, elem, pre, init, that)
                : changePositionset(e, elem, pre, init, that);
    };
    const resultFunction = () => {
        result
            ? that.recordStep({
                old: {
                    func: func + '-display',
                    id: result.id,
                    value: [opt, 'outside']
                },
                now: {
                    func: func + '-display',
                    id: result.id,
                    value: [result.value, 'outside']
                }
            })
            : null;
        result = null;
    };
    document.addEventListener('touchmove', move, { passive: false });
    document.addEventListener('touchend', () => {
        document.removeEventListener('touchmove', move);
        resultFunction();
    });

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', move);
        resultFunction();
    });
};
export const changeSizeset = (e, elem, pre, init, that) => {
    let currentX, currentY, distanceX, distanceY, copyDisplay;
    if (e.type === 'mousemove') {
        currentX = e.pageX;
        currentY = e.pageY;
    } else {
        currentX = e.touches[0].pageX;
        currentY = e.touches[0].pageY;
    }

    distanceX = currentX - pre[0];
    distanceY = currentY - pre[1];

    copyDisplay = that.state.controllCurrent[2];
    let copy = that.state.display.slice(0);
    let left, top, height, width;
    switch (elem.dataset.data) {
    case 'tl': {
        left = distanceX / that.state.editMainStyle[0].scale + +init.left;
        top = distanceY / that.state.editMainStyle[0].scale + +init.top;
        height =
                +init.height - distanceY / that.state.editMainStyle[0].scale;
        width = +init.width - distanceX / that.state.editMainStyle[0].scale;
        break;
    }
    case 'tr': {
        left = +init.left;
        top = distanceY / that.state.editMainStyle[0].scale + +init.top;
        height =
                +init.height - distanceY / that.state.editMainStyle[0].scale;
        width = distanceX / that.state.editMainStyle[0].scale + +init.width;
        break;
    }
    case 'bl': {
        left = distanceX / that.state.editMainStyle[0].scale + +init.left;
        top = +init.top;
        height =
                +init.height + distanceY / that.state.editMainStyle[0].scale;
        width = +init.width - distanceX / that.state.editMainStyle[0].scale;
        break;
    }
    case 'br': {
        left = +init.left;
        top = +init.top;
        height =
                +init.height + distanceY / that.state.editMainStyle[0].scale;
        width = +init.width + distanceX / that.state.editMainStyle[0].scale;
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

    let copyCurrent = that.state.controllCurrent.slice(0);
    copyCurrent[1] = that.state.display[copyDisplay];

    that.setState({
        display: copy,
        controllCurrent: copyCurrent
    });

    return {
        id: [copy[copyDisplay].key, copyDisplay],
        value: copy[copyDisplay].outside
    };
};
export const changePositionset = (e, elem, pre, init, that) => {
    let currentX, currentY, distanceX, distanceY, copyDisplay;
    if (e.type === 'mousemove') {
        currentX = e.pageX;
        currentY = e.pageY;
    } else {
        currentX = e.touches[0].pageX;
        currentY = e.touches[0].pageY;
    }

    distanceX = currentX - pre[0];
    distanceY = currentY - pre[1];
    copyDisplay = parseInt(
        that.state.display.findIndex(data => data.key === elem.dataset.id)
    );

    let copy = that.state.display.slice(0);
    let left = distanceX / that.state.editMainStyle[0].scale + +init.left;
    let top = distanceY / that.state.editMainStyle[0].scale + +init.top;
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

    let copyCurrent = that.state.controllCurrent.slice(0);
    copyCurrent[1] = that.state.display[copyDisplay];

    that.setState({
        display: copy,
        controllCurrent: copyCurrent
    });
    return {
        id: [elem.dataset.id, copyDisplay],
        value: copy[copyDisplay].outside
    };
};
export const changeLayer = (e, that ) => {
    let copy = that.state.display.slice(0);
    let copyDisplay = that.state.controllCurrent.slice(0);
    console.log(copyDisplay);
    if (e.currentTarget.dataset.data === 'layerdown') {
        let previous = copy[copyDisplay[2] - 1];
        let now = copy[copyDisplay[2]];
        copy[copyDisplay[2]] = previous;
        copy[copyDisplay[2] - 1] = now;
        copyDisplay[2] = copyDisplay[2] - 1;

        that.recordStep({
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
        that.recordStep({
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
        let name = copyDisplay[1].key;

        that.recordStep({
            old: {
                func: 'changeLayerDelete-display',
                id: [name, copyDisplay[2]],
                value: [copy[copyDisplay[2]], '']
            },

            now: {
                func: 'changeLayerDelete-display',
                id: [name, copyDisplay[2]],
                value: [{}, '']
            }
        });
        let trash = that.state.trashCan;
        console.log(trash);
        trash[name] = {
            func: 'changeLayerDelete-display',
            id: [name, copyDisplay[2]],
            value: [copy[copyDisplay[2]], '']
        };

        firebaseSet('temp', 'trash', trash);

        copy.splice(copyDisplay[2], 1);
        copyDisplay = ['page', null, null, null];
        that.setState({
            trashCan: trash
        });
    }

    that.setState({
        display: copy,
        controllCurrent: copyDisplay
    });
    that.saveData(null, copy);
};
