import React, { Component } from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import Loadable from 'react-loadable';
import Loading from '../components/loading';

const EmptyComponent = Loadable({
  loader: () => import('./empty'),
  loading: Loading
});

const PermissionsManager = Loadable({
    loader: () => import('./security/permissions-manager'),
    loading: Loading
});

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
                <Header className='header'><div className='logout'><a href='/signout'>注销</a></div></Header>
                <Layout>
                    <Sider collapsible={true}>
                        <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
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
                    </Sider>
                    <Content>
                        <Switch>
                            <Route exact path='/' component={EmptyComponent}/>
                            <Route exact path='/dashboard' component={EmptyComponent}/>
                            <Route exact path='/security/permissions' component={PermissionsManager}/>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}