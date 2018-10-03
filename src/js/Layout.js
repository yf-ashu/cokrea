import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Editor from './components/container/Editor';
class Layout extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {}
    render() {
        return (
            <BrowserRouter>
                <div className="main">
                    <Editor />
                </div>
            </BrowserRouter>
        );
    }
}
export default Layout;
