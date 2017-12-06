import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';

const { Header, Sider, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;

const styles = {
    fullHeight: {
        height: '100%'
    }
}

export default class HomeApp extends Component {
    render() {
        return (
            <Layout style={styles.fullHeight}>
                <Header>header</Header>
                <Layout>
                    <Sider collapsible={true}>
                        <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
                            <Menu.Item key='1'>
                                <Icon type='dashboard' />
                                <span>工作台</span>
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
                                    <span>权限管理</span>
                                </Menu.Item>
                            </SubMenu>
                            <Menu.Item key='9'>
                                <Icon type='book' />
                                <span>帮助</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Content>main content</Content>
                </Layout>
            </Layout>
        );
    }
}