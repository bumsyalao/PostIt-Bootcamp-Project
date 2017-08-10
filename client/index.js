import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import routes from './routes';

const store = creaeStore(
    (state = {}) => state,
    applyMiddleware(thunk)
);

render(
    <provider store={store}>
        <Router history ={browserHistory} routes={routes} />
    </provider>, document.getElementById('app'));