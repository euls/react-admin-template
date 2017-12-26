import React, { Component } from 'react';
import { withRouter, Switch, Route, Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import AppHeader from '../components/header';
import AppMenu from '../components/menu';
import AppTracer from '../components/tracer';
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

const { Sider, Content, Footer, Header } = Layout;

const styles = {
    fullHeight: {
        height: '100%'
    }
}

export default withRouter((props) => {
    const { location } = props;
    return (
        <Layout style={styles.fullHeight}>
            <AppHeader></AppHeader>
            <Layout>
                <Sider collapsible={true}>
                    <AppMenu style={styles.fullHeight} location={location}></AppMenu>
                </Sider>
                <Layout>
                    <Header style={{backgroundColor: '#F0F2F5', padding: '0', height: '1rem'}}>
                        <AppTracer location={location}></AppTracer>
                    </Header>
                    <Content>
                        <Switch>
                            <Route exact path='/' component={EmptyComponent} />
                            <Route exact path='/dashboard' component={EmptyComponent} />
                            <Route exact path='/security/permissions' component={PermissionsManager} />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
});