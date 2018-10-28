import React from 'react';
import PropTypes from 'prop-types';

const EditorSelect = ({
    controllCurrent,
    changeSize,
    onMouseDown,
    display,
    onCopy,
    editorSelect,
    editorSelectClick
}) => {
    let id = controllCurrent[1] !== null ? controllCurrent[1].key : '';

    let style =
        controllCurrent[1] !== null
            ? Object.assign({}, ...display[controllCurrent[2]].outside)
            : {};
    if (id) {
        let target = editorSelectClick;
        style.width = +target.offsetWidth;
        style.height = +target.offsetHeight;
    }

    return (
        <div
            className={
                controllCurrent[1] ? 'editorMain__item--select' : 'displayNone'
            }
            ref={editorSelect}
            style={style}
            data-id={controllCurrent[1] !== null ? controllCurrent[1].key : {}}
        >
            {/* <svg
                width={
                    controllCurrent[1] !== null
                        ? style.width
                        : 0
                }
                height={
                    controllCurrent[1] !== null
                        ? style.height
                        : 0
                }
            
                className="editorMain__item--select-svg"
            /> */}
            <div className="editorMain__item--select-svg" />

            <div className="editorMain__item--select-outside">
                <div
                    className="editorMain__item--select-inside-tl"
                    onMouseDown={changeSize}
                    data-data="tl"
                />
                <div
                    className="editorMain__item--select-inside-tr"
                    onMouseDown={changeSize}
                    data-data="tr"
                />
                <div
                    className="editorMain__item--select-inside-bl"
                    onMouseDown={changeSize}
                    data-data="bl"
                />
                <div
                    className="editorMain__item--select-inside-br"
                    onMouseDown={changeSize}
                    data-data="br"
                />
            </div>
            <div className="editorMain__item--select__features">
                <button
                    className={
                        controllCurrent[2] === display.length - 1
                            ? 'editorMain__item--select__features--up-unable '
                            : 'editorMain__item--select__features--up'
                    }
                    onMouseDown={onMouseDown}
                    data-data="layerup"
                    disabled={
                        controllCurrent[2] === display.length - 1 ? true : false
                    }
                />
                <button
                    className={
                        controllCurrent[2] === 0
                            ? 'editorMain__item--select__features--down-unable '
                            : 'editorMain__item--select__features--down'
                    }
                    onMouseDown={onMouseDown}
                    data-data="layerdown"
                    disabled={controllCurrent[2] === 0 ? true : false}
                />
                <button
                    className="editorMain__item--select__features--copy"
                    onMouseDown={onCopy}
                    data-data="layercopy"
                />
                <button
                    className="editorMain__item--select__features--delete"
                    onMouseDown={onMouseDown}
                    data-data="layerdelete"
                />
            </div>
        </div>
    );
};

EditorSelect.propTypes = {
    controllCurrent: PropTypes.any,
    changeSize: PropTypes.func,
    onMouseDown: PropTypes.func,
    onCopy: PropTypes.func,
    display: PropTypes.any,
    editorSelectClick: PropTypes.string,
    editorSelect: PropTypes.string
};
export default EditorSelect;
