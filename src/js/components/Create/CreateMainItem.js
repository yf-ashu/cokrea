import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const CreateMainItem = ({ linkTo, id, project,projectImg,deleteProject}) => {
    return (
        <div className="createMainItem">
            <div className="createMainItem__inner">
                <div className="createMainItem__display">
                    <img src={projectImg}></img>

                    {/* <div className="createMainItem__toggle">
                        <span />
                        <span />
                        <span />
                    </div> */}
                    <NavLink
                        id={id}
                        className="createMainItem__button"
                        to={linkTo}
                    >
                        EDIT
                    </NavLink>

                </div>

            </div>
            <div className="createMainItem__bottom">
                <div
                    suppressContentEditableWarning
                    contentEditable={project.contentEditable}
                >
                    {project.projectName}
                </div>
                <div className="createMainItem__delete" onClick={deleteProject} data-data={id}> 
                </div>
            </div>
        </div>
    );
};
CreateMainItem.propTypes = {
    linkTo: PropTypes.string.isRequired,
    id:PropTypes.string.isRequired,
    project:PropTypes.any,
    projectImg:PropTypes.string,
    deleteProject:PropTypes.object

};
export default CreateMainItem;
