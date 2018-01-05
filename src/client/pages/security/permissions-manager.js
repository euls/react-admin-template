import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from '../../components/loading';

const PermissionEditor = Loadable({
    loader: () => import('./permission-editor'),
    loading: Loading
});

const PermissionList = Loadable({
    loader: () => import('../../components/security/permission-list'),
    loading: Loading
});

export default class PermissionsManager extends Component {
    render = () => {
        return (
            <Switch>
                <Route exact path='/security/permissions' component={PermissionList}/>
                <Route path='/security/permissions/create' render = {()=>{
                    return (<h1>Create Permission</h1>);
                }}/>
            </Switch>
        );
    }
}