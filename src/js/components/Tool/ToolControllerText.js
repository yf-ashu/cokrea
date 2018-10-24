import React from 'react';
import PropTypes from 'prop-types';
import bold from '../../../img/bold.svg';
import italic from '../../../img/italic.svg';

const ToolControllerText = ({ display, action, style, controllCurrent }) => {
    console.log(display);
    console.log(style);
    // let find = display.findIndex(data => data.style);
    let find,
        findwhere,
        option = [];
    if (controllCurrent[2] != null) {
        find = display[controllCurrent[2]].style;
        findwhere = Object.assign({}, ...find);
    }
    for (let i = 16; i < 73; i++) {
        option.push(i);
    }
    return (
        <div className="toolControllerText">
            <div className="toolControllerText--icon">
                <div
                    className={
                        findwhere
                            ? findwhere['fontWeight'] === 700
                                ? 'itemclick toolControllerText--icon-img'
                                : 'toolControllerText--icon-img'
                            : 'toolControllerText--icon-img'
                    }
                >
                    <img
                        src={bold}
                        id="fontBold"
                        data-value={
                            findwhere
                                ? findwhere['fontWeight'] === 700
                                    ? 400
                                    : 700
                                : null
                        }
                        data-data="fontWeight"
                        onClick={action.detailChangeNum}
                    />
                </div>
                <div
                    className={
                        findwhere
                            ? findwhere['fontStyle'] !== 'normal'
                                ? 'itemclick toolControllerText--icon-img'
                                : 'toolControllerText--icon-img'
                            : 'toolControllerText--icon-img'
                    }
                >
                    <img
                        src={italic}
                        id="fontItalic"
                        data-value={
                            findwhere
                                ? findwhere['fontStyle'] === 'normal'
                                    ? 'italic'
                                    : 'normal'
                                : null
                        }
                        data-data="fontStyle"
                        onClick={action.detailChangeStr}
                    />
                </div>
            </div>
            <div className="toolController--color">
                <label htmlFor="textColor">color</label>
                <input
                    id="textColor"
                    type="color"
                    value={findwhere ? findwhere['color'] : 'transparent'}
                    data-value={findwhere ? findwhere['color'] : 'transparent'}
                    data-data="color"
                    onChange={action.detailChangeStr}
                />
            </div>
            <div className="toolController--color">
                <label htmlFor="textbgColor">Background-color</label>
                <input
                    id="textbgColor"
                    type="color"
                    value={
                        findwhere ? findwhere['backgroundColor'] : 'transparent'
                    }
                    data-value={
                        findwhere ? findwhere['backgroundColor'] : 'transparent'
                    }
                    data-data="backgroundColor"
                    onChange={action.detailChangeStr}
                />
            </div>
            <div className="toolController--select">
                <label htmlFor="textSize">Font size</label>
                <select
                    name="textSize"
                    id="textSize"
                    value={findwhere ? findwhere['fontSize'] : 47}
                    onChange={action.detailChangeNum}
                    data-data="fontSize"
                >
                    {option.map(data => {
                        return (
                            <option
                                key={data}
                                value={data}
                                selected={
                                    data === +findwhere['fontSize']
                                        ? 'selected'
                                        : null
                                }
                            >
                                {data}{' '}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
};

ToolControllerText.propTypes = {
    display: PropTypes.any,
    style: PropTypes.any,
    action: PropTypes.any.isRequired,
    controllCurrent: PropTypes.any
};
export default ToolControllerText;
