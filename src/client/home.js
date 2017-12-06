import React from 'react';
import {render} from 'react-dom';
import fetch from 'isomorphic-fetch';
import HomeApp from './pages/home-app';
import './less/home.less';

render(<HomeApp/>, document.getElementById('app'));