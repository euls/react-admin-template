import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const SubMenu = Menu.SubMenu;

export default class AppMenu extends Component {
    render() {
        return (
            <Menu {...this.props} theme='light' mode='inline' defaultSelectedKeys={['1']}>
                <Menu.Item key='1'>
                    <Icon type='dashboard' />
                    <span><Link to='/dashboard'>工作台</Link></span>
                </Menu.Item>
                <SubMenu key="permissions" title={<span><Icon type="team" /><span>系统安全</span></span>}>
                    <Menu.Item key="5">
                        <Icon type="user" />
                        <span>用户管理</span>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Icon type="team" />
                        <span>角色管理</span>
                    </Menu.Item>
                    <Menu.Item key="7">
                        <Icon type="key" />
                        <Link to='/security/permissions' style={{ display: 'initial' }}>权限管理</Link>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item key='9'>
                    <Icon type='book' />
                    <span>帮助</span>
                </Menu.Item>
            </Menu>
        );
    }
}