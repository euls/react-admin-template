import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AdminApp from './pages/admin';
import './less/home.less';

render(<BrowserRouter>
    <AdminApp></AdminApp>
</BrowserRouter>, document.getElementById('app'));