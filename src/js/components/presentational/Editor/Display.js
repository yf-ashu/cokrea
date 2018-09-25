import React from 'react';
import PropTypes from 'prop-types';

const Display = ({ tag, attribute, textContent }) => {
    let child = React.createElement(tag, attribute, textContent);
    return <div className="item">{child}</div>;
};

Display.propTypes = {
    tag: PropTypes.any,
    attribute: PropTypes.any,
    textContent: PropTypes.any
};
export default Display;
