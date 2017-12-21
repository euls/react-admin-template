import React from 'react';
import {hydrate} from 'react-dom';
import LoginForm from './pages/signin';

const initialState = window.__INITIAL_STATE__;
hydrate(<LoginForm error={initialState.error}/>, document.getElementById('app'));