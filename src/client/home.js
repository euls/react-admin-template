import React from 'react';
import {render} from 'react-dom';
import fetch from 'isomorphic-fetch';
import AdminApp from './pages/admin';
import './less/home.less';

render(<AdminApp/>, document.getElementById('app'));