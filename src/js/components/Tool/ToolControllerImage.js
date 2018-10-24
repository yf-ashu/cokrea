import React from 'react';
import PropTypes from 'prop-types';
import circle from '../../../img/circle.svg';

const ToolControllerImage = ({ display, action, controllCurrent }) => {
    let find,
        findwhere;
    if (controllCurrent[2] != null) {
        find = display[controllCurrent[2]].style;
        findwhere = Object.assign({}, ...find);
        console.log(findwhere);
    }
    return (
        <div className="toolControllerImage">
          
            <div className="toolControllerText--icon">
                <div
                    className={
                        findwhere
                            ? findwhere['borderRadius'] === '50%'
                                ? 'itemclick toolControllerText--icon-img'
                                : 'toolControllerText--icon-img'
                            : 'toolControllerText--icon-img'
                    }
                >
                    <img
                        src={circle}
                        id="fontBold"
                        data-value={
                            findwhere
                                ? findwhere['borderRadius'] === '50%'
                                    ? '0'
                                    : '50%'
                                : null
                        }
                        data-data="borderRadius"
                        onClick={action.detailChangeStr}
                    />
                </div>
          
            </div>
        </div>
    );
};

ToolControllerImage.propTypes = {
    display: PropTypes.any,
    action: PropTypes.any.isRequired,
    controllCurrent: PropTypes.any
};
export default ToolControllerImage;
