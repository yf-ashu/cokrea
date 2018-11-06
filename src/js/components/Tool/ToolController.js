import React, { Component } from 'react';
import ToolControllerPageSetting from './ToolControllerPageSetting';
import ToolControllerText from './ToolControllerText';
import ToolControllerPage from './ToolControllerPage';
import ToolControllerImage from './ToolControllerImage';
import PropTypes from 'prop-types';

const components = {
    pageSetting: ToolControllerPageSetting,
    text: ToolControllerText,
    page: ToolControllerPage,
    image:ToolControllerImage,
};
class ToolController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'pageSetting',
           
        };


        this.handleClickLi = this.handleClickLi.bind(this);
        this.handlePageOnChangeNum = this.handlePageOnChangeNum.bind(this);
        this.handlePageOnChangeStr = this.handlePageOnChangeStr.bind(this);
        this.handleDetailOnChangeNum = this.handleDetailOnChangeNum.bind(this);
        this.handleDetailOnChangeStr = this.handleDetailOnChangeStr.bind(this);
    }

    // controllerDisplay() {
    //     this.props.controll('test123');
    // }
    handleClickLi(e) {
        this.setState({
            current: e.currentTarget.dataset.data
        });
    }

    handleDetailOnChangeNum(e) {
        let value;
        if (e.currentTarget.value) {
            value = e.currentTarget.value;
        } else {
            value = e.currentTarget.dataset.value;
        }
        this.props.controll(
            'display',
            'style',
            e.currentTarget.dataset.data,
            value,
            null
        );
    }
    handleDetailOnChangeStr(e) {
        let value;
        if (e.currentTarget.value) {
            value = e.currentTarget.value;
        } else {
            value = e.currentTarget.dataset.value;
        }

        this.props.controll(
            'display',
            'style',
            e.currentTarget.dataset.data,
            null,
            value
        );
    }

    handlePageOnChangeNum(e) {
        let value;
        //console.log(e.currentTarget.value);
        if(+e.currentTarget.value<1){
            value=10;
        }else{
            value=+e.currentTarget.value;
        }
        this.props.controll(
            'editMainStyle',
            'style',
            e.currentTarget.dataset.data,
            value,
            null
        );
    }
    handlePageOnChangeStr(e) {
        this.props.controll(
            'editMainStyle',
            'style',
            e.currentTarget.dataset.data,
            null,
            e.currentTarget.value
        );
    }
    render() {
     
        let Item;
        let str=this.props.controllCurrent[0].split(',')[0];
        if (this.state.current === 'pageSetting') {
            Item = components[this.state.current];
        } else {
            if (this.props.controllCurrent[0] !== this.state.current) {
                Item = components[str];
            }else{
                Item = components[this.state.current]; 
            }
        }

        let display = (
            <Item
                controllCurrent={this.props.controllCurrent}
                display={this.props.display}
                style={this.props.editMainStyle}
                action={{
                    pageonChangeNum: this.handlePageOnChangeNum,
                    pageonChangeStr: this.handlePageOnChangeStr,
                    detailChangeNum: this.handleDetailOnChangeNum,
                    detailChangeStr: this.handleDetailOnChangeStr
                }}
            />
        );

        return (
            <div className="toolController">
                <div className="toolController__header">
                    <ul>
                        <li
                            className={
                                this.state.current === 'pageSetting'
                                    ? ''
                                    : 'toolController--click'
                            }
                            data-data={str}
                            onClick={this.handleClickLi}
                        >
                            {str}
                        </li>
                        <li
                            onClick={this.handleClickLi}
                            className={
                                this.state.current === 'pageSetting'
                                    ? 'toolController--click'
                                    : ''
                            }
                            data-data={'pageSetting'}
                        >
                            Page Setting
                        </li>
                    </ul>
                </div>
                {display}
            </div>
        );
    }
}
ToolController.propTypes = {
    controll: PropTypes.any,
    controllCurrent: PropTypes.any,
    editMainStyle: PropTypes.any.isRequired,
    display: PropTypes.array
};
export default ToolController;
