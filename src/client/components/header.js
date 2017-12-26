import React, { Component } from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

export default class AppHeader extends Component {
    render() {
        return (
            <Header className='header'>
                <div className='logout'>
                    <a href='/signout'>注销</a>
                </div>
            </Header>);
    }
}