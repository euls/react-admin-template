import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AdminApp from './pages/admin';
import './less/home.less';

hydrate(<BrowserRouter>
    <AdminApp></AdminApp>
</BrowserRouter>, document.getElementById('app'));