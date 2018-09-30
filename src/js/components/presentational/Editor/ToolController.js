import React, { Component } from 'react';
import ToolControllerPageSetting from './ToolControllerPageSetting';
import ToolControllerText from './ToolControllerText';
import ToolControllerPage from './ToolControllerPage';
const components = {
    pageSetting: ToolControllerPageSetting,
    text: ToolControllerText,
    page: ToolControllerPage
};
class ToolController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'pageSetting',
            editMainStyle: this.props.editMainStyle,
            display: this.props.display
        };
        console.log(this.props.display);
        console.log(this.props.editMainStyl);

        this.controllerDisplay = this.controllerDisplay.bind(this);
        this.handleClickLi = this.handleClickLi.bind(this);
        this.handlePageOnChangeNum = this.handlePageOnChangeNum.bind(this);
        this.handlePageOnChangeStr = this.handlePageOnChangeStr.bind(this);
        this.handleDetailOnChangeNum = this.handleDetailOnChangeNum.bind(this);
        this.handleDetailOnChangeStr = this.handleDetailOnChangeStr.bind(this);
    }

    controllerDisplay() {
        this.props.controll('test123');
    }
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

        // console.log(this.state.editMainStyle.style);
        // console.log(value);
    }

    handlePageOnChangeNum(e) {
        this.props.controll(
            'editMainStyle',
            'style',
            e.currentTarget.dataset.data,
            e.currentTarget.value,
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
        console.log(this.state.current);
        let Item;
        if (this.state.current === 'pageSetting') {
            Item = components[this.state.current];
        } else {
            if (this.props.controllCurrent[0] !== this.state.current) {
                Item = components[this.props.controllCurrent[0]];
            }else{
                Item = components[this.state.current]; 
            }
        }

        console.log(this.props.controllCurrent[0]);
        // console.log(Item)
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
        // console.log(this.props.controllCurrent)
        // console.log(this.props.display)
        // console.log(this.props.editMainStyle)

        // console.log(this.state.display)
        // console.log(this.state.editMainStyle)

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
                            data-data={this.props.controllCurrent[0]}
                            onClick={this.handleClickLi}
                        >
                            {this.props.controllCurrent[0]}
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
export default ToolController;
