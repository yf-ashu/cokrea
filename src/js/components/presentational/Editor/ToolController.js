import React from 'react';
import PropTypes from 'prop-types';

const ToolController = () => {
    return <div className="toolController">
    <div className="toolController__header">
    <ul>
        <li>1</li>
        <li>Page Setting</li>
    </ul>
     </div>
    </div>;
};

ToolController.propTypes = {
    tag: PropTypes.any,
    attribute: PropTypes.any,
    textContent: PropTypes.any
};
export default ToolController;
