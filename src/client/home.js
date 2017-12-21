import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import AdminApp from './pages/admin';
import './less/home.less';

hydrate(<HashRouter>
    <AdminApp></AdminApp>
</HashRouter>, document.getElementById('app'));