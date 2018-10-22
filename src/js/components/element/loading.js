import React from 'react';
import PropTypes from 'prop-types';

const loading = ({loading}) => {
    return( <div className={loading?'loading':'loading displayOpacity'}>
    
        <div className="loading__outer">
            <div className="loading__face">
                <div className="loading__eye loading__eye--1"></div>
                <div className="loading__eye loading__eye--2"></div>
                <div className="loading__mouth"></div>
            </div>
        </div>
        <div className="loading__text">Loading...</div>
    </div>);
};

loading.propTypes = {
    loading:PropTypes.bool
};
export default loading;
