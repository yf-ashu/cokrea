import React from 'react';
import PropTypes from 'prop-types';

const ToolControllerPageSetting = ({ style, action }) => {
    return (
        <div className="toolControllerPageSetting">
            <div className="toolControllerPageSetting--size">
                <div className="toolControllerPageSetting--size-item">
                    <label htmlFor="pageWidth">Width</label>
                    <input
                        type="number"
                        id="pageWidth"
                        value={style.style[0].width}
                        data-data="width"
                        onChange={action.pageonChangeNum}
                    />
                </div>
                <div className="toolControllerPageSetting--size-item">
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
            <div className="toolControllerPageSetting--color">
                <label htmlFor="pageWidth">Background-color</label>
                <input
                    type="color"
                    value={style.style[4]['backgroundColor']}
                    data-data='backgroundColor'
                    onChange={action.pageonChangeStr}
                />
            </div>
        </div>
    );
};

ToolControllerPageSetting.propTypes = {
    style: PropTypes.any.isRequired,
    action: PropTypes.any.isRequired
};
export default ToolControllerPageSetting;
