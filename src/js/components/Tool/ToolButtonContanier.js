import React from 'react';
import PropTypes from 'prop-types';
import ToolButton from '../Tool/ToolButton';
import font from '../../../img/font.svg';
import close from '../../../img/close.svg';
import picture from '../../../img/picture.svg';
import ToolButtonItem from '../Tool/ToolButtonItem';

const ToolButtonContanier = ({
    type,
    handleImageUpload,
    handleCloseButton,
    imgUrl,
    uploadToolButtonImage,
    handleClickButton,
    buttonItem,
    dragStartToolButtonItem
}) => {


    let buttonItemInter = buttonItem.map((data, index) => {
        return (
            <ToolButtonItem
                key={'toolButton__item--' + data.type + '-' + index}
                onClick={uploadToolButtonImage}
                type={data.type}
                format={data.format}
                className={'toolButton__item--' + data.type}
                id={data.type}
                onDragStart={dragStartToolButtonItem}
                src={data.src}
            />
        );
    });
    return (



        <div className="toolButton">
            <div
                className={
                    type.type === null
                        ? 'toolButton__item--display'
                        : 'toolButton__item--display slideTozero'
                }
            >
                <div className="toolButton__item--header">
                    {type.name}
                    <div
                        className="toolButton__item--close"
                        onClick={handleCloseButton}
                    >
                        <img src={close} />
                    </div>
                </div>
                <div className="toolButton__items">
                    <div
                        className={
                            type.name === 'Image'
                                ? 'toolButton__items--image'
                                : 'toolButton__items--image displayNone'
                        }
                    >
                    Upload Image
                        <input
                            name="uploading"
                            className="fileUpload"
                            type="file"
                            onChange={handleImageUpload}
                        />
                        <img
                            src={imgUrl}
                            className="toolButton__items--upload"
                        />
                        <button
                            className="toolButton__items--upload-button"
                            type="img"
                            data-format="image"
                            data-send="img"
                            onClick={uploadToolButtonImage}
                        >
                        確定上傳
                        </button>
                    </div>
                    <div className="toolButton__items--inner">
                        {buttonItemInter}
                    </div>
                </div>
            </div>
            <div className="toolButton">
                <ToolButton
                    onClick={handleClickButton}
                    src={font}
                    type="text"
                    name="Text"
                    displayName="Add Text"
                    id="textAll"
                    className={
                        type.type === 'text'
                            ? 'itemclick'
                            : ''
                    }
                />
                <ToolButton
                    onClick={handleClickButton}
                    src={picture}
                    type="img"
                    name="Image"
                    displayName="Add Image"
                    id="imgAll"
                    className={
                        type.type === 'img'
                            ? 'itemclick'
                            : ''
                    }
                />
            </div>
        </div>
    );
};

ToolButtonContanier.propTypes = {
    handleImageUpload: PropTypes.func.isRequired,
    handleCloseButton: PropTypes.func.isRequired,
    imgUrl: PropTypes.string.isRequired,
    uploadToolButtonImage: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    handleClickButton: PropTypes.func.isRequired,
    buttonItem: PropTypes.array.isRequired,
    dragStartToolButtonItem: PropTypes.func.isRequired
};
export default ToolButtonContanier;
