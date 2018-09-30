import React from 'react';
import PropTypes from 'prop-types';

const ToolControllerPageSetting = ({ style, action,display }) => {
    // console.log(display)
    // console.log(style)

    return (
        <div className="toolControllerPageSetting">
            <div className="toolController--size">
                <div className="toolController--size-item">
                    <label htmlFor="pageWidth">Width</label>
                    <input
                        type="number"
                        id="pageWidth"
                        value={style.style[0].width}
                        data-data="width"
                        onChange={action.pageonChangeNum}
                    />
                </div>
                <div className="toolController--size-item">
                    <label htmlFor="pageHeight">Height</label>
                    <input
                        type="number"
                        id="pageHeight"
                        value={style.style[1].height}
                        data-data="height"
                        onChange={action.pageonChangeNum}
                    />
                </div>
            </div>
            <div className="toolController--color">
                <label htmlFor="pageWidth">Background-color</label>
                <input
                    type="color"
                    value={style.style[4]['backgroundColor']}
                    data-value={style.style[4]['backgroundColor']}
                    data-data='backgroundColor'
                    onChange={action.pageonChangeStr}
                />
            </div>
         
        </div>
    );
};

ToolControllerPageSetting.propTypes = {
    display: PropTypes.any,
    style: PropTypes.any,
    action: PropTypes.any.isRequired
};
export default ToolControllerPageSetting;
