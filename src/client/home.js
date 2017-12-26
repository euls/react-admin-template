import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import AdminApp from './pages/admin';
import './less/home.less';

render(<HashRouter><AdminApp></AdminApp></HashRouter>, document.getElementById('app'));