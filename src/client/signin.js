import React from 'react';
import {hydrate} from 'react-dom';
import LoginForm from './pages/signin';

hydrate(<LoginForm/>, document.getElementById('app'));