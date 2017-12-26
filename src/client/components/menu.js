import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const SubMenu = Menu.SubMenu;

function cascadeOpenKeys(pathname) {
    const paths = pathname.split('/').filter(item => '' !== item);
    let openKeys = [];
    paths.forEach((item, idx) => {
        const entry = paths.slice(0, idx);
        openKeys.push('/' + entry.join('/'));
    });
    return openKeys;
}

export default class AppMenu extends Component {
    render() {
        const { location } = this.props;
        const openKeys = cascadeOpenKeys(location.pathname);
        return (
            <Menu {...this.props} theme='light' mode='inline' defaultSelectedKeys={[location.pathname]} defaultOpenKeys={openKeys} selectedKeys={[location.pathname]}>
                <Menu.Item key='/dashboard'>
                    <Icon type='dashboard' />
                    <span><Link to='/dashboard'>工作台</Link></span>
                </Menu.Item>
                <SubMenu key="/security" title={<span><Icon type="team" /><span>系统安全</span></span>}>
                    <Menu.Item key="5">
                        <Icon type="user" />
                        <span>用户管理</span>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Icon type="team" />
                        <span>角色管理</span>
                    </Menu.Item>
                    <Menu.Item key="/security/permissions">
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