import React from 'react';
import PropTypes from 'prop-types';
import sample1 from '../../../img/sample1.png';

const CreateMainSideItem = ({ sampleName, onClick,data}) => {
    return (
        <div className="createMainSideItem" 
            onClick={onClick}
            data-data={data}
        >

            <div className="createMainSideItem--main">
                <img src={sample1}></img>
            </div>

            <div className="createMainSideItem--text">{sampleName}</div>
         
        </div>
    );
};
CreateMainSideItem.propTypes = {
    sampleName: PropTypes.string.isRequired,
    onClick:PropTypes.func,
    data:PropTypes.string,

};
export default CreateMainSideItem;
