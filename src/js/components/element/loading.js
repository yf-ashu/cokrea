import React from 'react';
import PropTypes from 'prop-types';

const loading = ({loading}) => {
    return <div className={loading?'loading':'loading displayOpacity'} />;
};

loading.propTypes = {
    loading:PropTypes.bool
};
export default loading;
