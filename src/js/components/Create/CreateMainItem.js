import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const CreateMainItem = ({ linkTo, id, project, canEdit, onBlur }) => {
    return (
        <div className="createMainItem">
            <div className="createMainItem__inner">
                <div className="createMainItem__display">
                    <div className="createMainItem__toggle">
                        <span />
                        <span />
                        <span />
                    </div>
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
                    onBlur={onBlur}
                    contentEditable={project.contentEditable}
                >
                    {project.projectName}
                </div>
                <button onClick={canEdit} data-data={id}>
                    更改
                </button>
            </div>
        </div>
    );
};
CreateMainItem.propTypes = {
    linkTo: PropTypes.string.isRequired,
    id:PropTypes.string.isRequired,
    project:PropTypes.any,
    canEdit:PropTypes.func.isRequired,
    onBlur:PropTypes.func
};
export default CreateMainItem;
