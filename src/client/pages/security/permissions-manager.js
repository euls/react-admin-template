import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from '../../components/loading';

const PermissionList = Loadable({
    loader: () => import('../../components/security/permission-list'),
    loading: Loading
});

const PermissionEditor = Loadable({
    loader: () => import('../../components/security/permission-editor'),
    loading: Loading
});

export default class PermissionsManager extends Component {
    render = () => {
        return (
            <Switch>
                <Route exact path='/security/permissions' component={PermissionList}/>
                <Route path='/security/permissions/create' component={PermissionEditor}/>
            </Switch>
        );
    }
}