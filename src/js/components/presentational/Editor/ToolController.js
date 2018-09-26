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
            editMainStyle: this.props.editMainStyle
        };
        this.controllerDisplay = this.controllerDisplay.bind(this);
        this.handleClickLi = this.handleClickLi.bind(this);
        this.handlePageOnChangeNum = this.handlePageOnChangeNum.bind(this);
        this.handlePageOnChangeStr = this.handlePageOnChangeStr.bind(this);
    }

    controllerDisplay() {
        this.props.controll('test123');
    }
    handleClickLi(e) {
        this.setState({
            current: e.currentTarget.dataset.data
        });
    }
    handlePageOnChangeNum(e) {
        // this.setState({
        //     [name]: event.target.value,
        //   });
        this.props.controll(
            'editMainStyle',
            'style',
            e.currentTarget.dataset.data,
            e.currentTarget.value,
            null
        );

        console.log(this.state.editMainStyle.style);
        console.log(e.currentTarget);
    }
    handlePageOnChangeStr(e) {
        // this.setState({
        //     [name]: event.target.value,
        //   });
        this.props.controll(
            'editMainStyle',
            'style',
            e.currentTarget.dataset.data,
            null,
            e.currentTarget.value
        );

        console.log(e.currentTarget.dataset.data);
        console.log(e.currentTarget);
    }
    render() {
        let Item = components[this.state.current];
        let display = (
            <Item
                style={this.state.editMainStyle}
                action={{
                    pageonChangeNum: this.handlePageOnChangeNum,
                    pageonChangeStr: this.handlePageOnChangeStr
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
                            data-data={this.props.controllCurrent}
                            onClick={this.handleClickLi}
                        >
                            {this.props.controllCurrent}
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
