import * as React from 'react';
import { Spin } from 'antd';

class Loading extends React.Component {
    style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        minHeight: 300,
    };

    render() {
        if(this.props.isLoading) {
            return (
                <div style={{ ...this.style }}> <Spin size="large"/> </div>
            )
        }
        if(this.props.error) {
            return (
                <div style={{ ...this.style, color: '#c80000', ...this.props.style }}>{ this.props.error }</div>
            )
        }
        return this.props.children;
    }
}

export default Loading;
